import { generateUUIDv7 } from './uuid';
import { leadStorage } from './indexedDB';

interface LeadFormData {
  full_name: string;
  phone: string;
  email: string;
  departure_date: string;
  return_date: string;
  destination: string;
  consent: boolean;
}

interface LeadRow {
  lead_uuid: string;
  full_name: string;
  phone: string;
  email: string;
  departure_date: string;
  return_date: string;
  destination: string;
  consent: boolean;
  created_at: string;
}

interface ChatLogRow {
  timestamp: string;
  question: string;
  answer: string;
  lead_uuid?: string;
}

// Google Apps Script Web App URL - Replace with your actual deployment URL
// This should be the Web App URL from Google Apps Script deployment, NOT the Google Sheet ID
// IMPORTANT: Make sure this URL is from a properly deployed Google Apps Script with "Anyone" access
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyWmwhqVE-HVVFMUBgHfqM4yYpbyc6KX76ETG-tv2tplUpcQnGf2L1yLS4KUUdWOW5QqQ/exec';

// N8N Webhook URL - Updated with your actual webhook URL
const N8N_WEBHOOK_URL = 'https://nadavyigal.app.n8n.cloud/webhook-test/c40ac49a-a12d-4332-b12d-2c63665a6792';

async function callN8NWebhook(leadData: LeadRow): Promise<void> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (response.status === 200) {
      console.log('N8N webhook called successfully');
    } else {
      console.error(`N8N webhook failed with status: ${response.status}`);
      const event = new CustomEvent('n8n_webhook_failed', {
        detail: { 
          status: response.status,
          message: 'הבקשה נשלחה בהצלחה, אך ייתכן עיכוב בעיבוד'
        }
      });
      window.dispatchEvent(event);
    }
  } catch (error) {
    console.error('N8N webhook error:', error);
    const event = new CustomEvent('n8n_webhook_failed', {
      detail: { 
        error: error,
        message: 'הבקשה נשלחה בהצלחה, אך ייתכן עיכוב בעיבוד'
      }
    });
    window.dispatchEvent(event);
  }
}

export async function submitLeadToSheets(formData: LeadFormData): Promise<{ success: boolean; leadUuid: string }> {
  const leadUuid = generateUUIDv7();
  const now = new Date().toISOString();
  
  const leadRow: LeadRow = {
    lead_uuid: leadUuid,
    full_name: formData.full_name,
    phone: formData.phone,
    email: formData.email,
    departure_date: formData.departure_date,
    return_date: formData.return_date,
    destination: formData.destination,
    consent: formData.consent,
    created_at: now
  };

  // Google Sheets URL is now configured

  try {
    console.log('Submitting lead to Google Sheets:', leadRow);
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addLead',
        data: leadRow
      }),
      mode: 'cors' // Changed back to 'cors' since the script supports it
    });
    console.log('Google Sheets submission completed');

    // With no-cors mode, we can't read the response, so we assume success
    // and handle any actual failures through the retry mechanism
    await callN8NWebhook(leadRow);
    
    window.dispatchEvent(new CustomEvent('lead_created', {
      detail: { leadUuid, leadData: leadRow }
    }));
    
    return { success: true, leadUuid };
    
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    
    // Store locally for retry
    try {
      await leadStorage.storeLead(leadRow);
      console.log('Lead stored locally for retry');
    } catch (storageError) {
      console.error('Failed to store lead locally:', storageError);
    }
    
    // Still return success to not block user experience
    return { success: true, leadUuid };
  }
}

export async function logChatToSheets(question: string, answer: string, leadUuid?: string): Promise<void> {

  const chatLogRow: ChatLogRow = {
    timestamp: new Date().toISOString(),
    question,
    answer,
    lead_uuid: leadUuid
  };

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addChatLog',
        data: chatLogRow
      }),
      mode: 'no-cors' // Changed from 'cors' to 'no-cors'
    });
  } catch (error) {
    console.error('Error logging chat to sheets:', error);
  }
}

// Retry mechanism for failed submissions
export async function retryPendingLeads(): Promise<void> {
  try {
    const pendingLeads = await leadStorage.getPendingLeads();
    
    for (const lead of pendingLeads) {
      if (lead.retry_count >= 10) {
        continue;
      }
      
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'addLead',
            data: lead
          }),
          mode: 'no-cors' // Changed from 'cors' to 'no-cors'
        });

        // With no-cors, assume success and clean up
        await callN8NWebhook(lead);
        await leadStorage.removeLead(lead.lead_uuid);
        
        window.dispatchEvent(new CustomEvent('lead_created', {
          detail: { leadUuid: lead.lead_uuid, leadData: lead }
        }));
        
        console.log(`Successfully retried lead: ${lead.lead_uuid}`);
        
      } catch (error) {
        console.error(`Retry failed for lead ${lead.lead_uuid}:`, error);
        await leadStorage.incrementRetryCount(lead.lead_uuid);
      }
    }
  } catch (error) {
    console.error('Error during retry process:', error);
  }
}

// Health check functions
export async function checkGoogleSheetsHealth(): Promise<'ok' | 'error'> {
  if (GOOGLE_SHEETS_URL === 'YOUR_SCRIPT_ID_PLACEHOLDER') {
    return 'error';
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'healthCheck'
      }),
      mode: 'no-cors' // Changed from 'cors' to 'no-cors'
    });

    // With no-cors mode, we can't read the response status
    // So we'll assume it's working if no error is thrown
    return 'ok';
  } catch (error) {
    console.error('Google Sheets health check failed:', error);
    return 'error';
  }
}

export async function checkN8NHealth(): Promise<'ok' | 'error'> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        health_check: true,
        timestamp: new Date().toISOString()
      }),
    });

    return response.status === 200 ? 'ok' : 'error';
  } catch (error) {
    console.error('N8N health check failed:', error);
    return 'error';
  }
}

// Start retry mechanism
let retryInterval: NodeJS.Timeout;

export function startRetryMechanism(): void {
  if (retryInterval) {
    clearInterval(retryInterval);
  }
  
  retryInterval = setInterval(() => {
    retryPendingLeads();
  }, 15 * 60 * 1000);
  
  setTimeout(() => {
    retryPendingLeads();
  }, 5000);
}

export function stopRetryMechanism(): void {
  if (retryInterval) {
    clearInterval(retryInterval);
  }
}