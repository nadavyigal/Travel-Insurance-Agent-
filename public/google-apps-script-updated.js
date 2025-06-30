/**
 * Google Apps Script for handling lead submissions and chat logs
 * Deploy this as a web app with execute permissions set to "Anyone"
 * 
 * IMPORTANT: After pasting this code:
 * 1. Click on "Settings" (gear icon)
 * 2. Enable "Show 'appsscript.json' manifest file in editor"
 * 3. Add the appsscript.json file with proper OAuth scopes
 */

// Your Google Sheet ID from the URL
const SPREADSHEET_ID = '1b8uTtwBkfhauEaEtbr0JrHWWMVMbaNYbPChXAEm-D8Y';

function doPost(e) {
  console.log('Received POST request:', e.postData.contents);
  
  try {
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    if (data.action === 'addLead') {
      return addLeadToSheet(data.data);
    } else if (data.action === 'addChatLog') {
      return addChatLogToSheet(data.data);
    } else if (data.action === 'healthCheck') {
      return healthCheck();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addLeadToSheet(leadData) {
  console.log('Adding lead to sheet:', leadData);
  
  try {
    // Test access to spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Successfully opened spreadsheet:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName('leads_raw');
    if (!sheet) {
      console.log('Creating new sheet: leads_raw');
      sheet = spreadsheet.insertSheet('leads_raw');
      
      // Set headers
      const headers = [
        'lead_uuid', 'full_name', 'phone', 'email', 
        'departure_date', 'return_date', 'destination', 
        'consent', 'created_at'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      
      console.log('Headers set successfully');
    }
    
    // Prepare row data
    const row = [
      leadData.lead_uuid || '',
      leadData.full_name || '',
      leadData.phone || '',
      leadData.email || '',
      leadData.departure_date || '',
      leadData.return_date || '',
      leadData.destination || '',
      leadData.consent ? 'Yes' : 'No',
      leadData.created_at || new Date().toISOString()
    ];
    
    console.log('Appending row:', row);
    sheet.appendRow(row);
    
    // Auto-resize columns
    try {
      sheet.autoResizeColumns(1, 9);
    } catch (resizeError) {
      console.log('Could not auto-resize columns:', resizeError.toString());
    }
    
    console.log('Lead added successfully');
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        leadUuid: leadData.lead_uuid,
        message: 'Lead added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding lead to sheet:', error.toString());
    console.error('Stack trace:', error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to add lead to sheet',
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addChatLogToSheet(chatData) {
  console.log('Adding chat log to sheet:', chatData);
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let sheet = spreadsheet.getSheetByName('chat_logs');
    if (!sheet) {
      console.log('Creating new sheet: chat_logs');
      sheet = spreadsheet.insertSheet('chat_logs');
      
      // Updated headers to include tracking info
      const headers = [
        'timestamp', 'question', 'answer', 'tracking_id', 'tracking_type', 'lead_uuid'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#34a853');
      headerRange.setFontColor('white');
      
      console.log('Headers set successfully');
    }
    
    // Handle both old and new schema
    const row = [
      chatData.timestamp,
      chatData.question,
      chatData.answer,
      chatData.tracking_id || chatData.lead_uuid || '',
      chatData.tracking_type || (chatData.lead_uuid ? 'lead' : 'session'),
      chatData.lead_uuid || (chatData.tracking_type === 'lead' ? chatData.tracking_id : '')
    ];
    
    console.log('Appending row:', row);
    sheet.appendRow(row);
    
    // Auto-resize columns
    try {
      sheet.autoResizeColumns(1, 6);
    } catch (resizeError) {
      console.log('Could not auto-resize columns:', resizeError.toString());
    }
    
    console.log('Chat log added successfully');
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Chat log added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding chat log to sheet:', error.toString());
    console.error('Stack trace:', error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to add chat log to sheet',
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function healthCheck() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetName = spreadsheet.getName();
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        spreadsheet: sheetName,
        sheetsAccess: true
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Health check failed:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        sheetsAccess: false
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Dikla Travel Insurance Google Apps Script is running',
      timestamp: new Date().toISOString(),
      version: '2.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Manual test function
function testAddLead() {
  const testData = {
    lead_uuid: 'test_' + new Date().getTime(),
    full_name: 'Test User',
    phone: '050-1234567',
    email: 'test@example.com',
    departure_date: '2024-01-01',
    return_date: '2024-01-10',
    destination: 'Test Destination',
    consent: true,
    created_at: new Date().toISOString()
  };
  
  const result = addLeadToSheet(testData);
  console.log('Test result:', result.getContent());
} 