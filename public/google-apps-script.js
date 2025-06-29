/**
 * Google Apps Script for handling lead submissions and chat logs
 * Deploy this as a web app with execute permissions set to "Anyone"
 */

// Your Google Sheet ID from the URL
const SPREADSHEET_ID = '1b8uTtwBkfhauEaEtbr0JrHWWMVMbaNYbPChXAEm-D8Y';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
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
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addLeadToSheet(leadData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let sheet = spreadsheet.getSheetByName('leads_raw');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('leads_raw');
      sheet.getRange(1, 1, 1, 9).setValues([[
        'lead_uuid', 'full_name', 'phone', 'email', 
        'departure_date', 'return_date', 'destination', 
        'consent', 'created_at'
      ]]);
      
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    const row = [
      leadData.lead_uuid,
      leadData.full_name,
      leadData.phone,
      leadData.email,
      leadData.departure_date,
      leadData.return_date,
      leadData.destination,
      leadData.consent ? 'Yes' : 'No',
      leadData.created_at
    ];
    
    sheet.appendRow(row);
    sheet.autoResizeColumns(1, 9);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, leadUuid: leadData.lead_uuid }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding lead to sheet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addChatLogToSheet(chatData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    let sheet = spreadsheet.getSheetByName('chat_logs');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('chat_logs');
      sheet.getRange(1, 1, 1, 4).setValues([[
        'timestamp', 'question', 'answer', 'lead_uuid'
      ]]);
      
      const headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#34a853');
      headerRange.setFontColor('white');
    }
    
    const row = [
      chatData.timestamp,
      chatData.question,
      chatData.answer,
      chatData.lead_uuid || ''
    ];
    
    sheet.appendRow(row);
    sheet.autoResizeColumns(1, 4);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error adding chat log to sheet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
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
        spreadsheet: sheetName
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Health check failed:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'Dikla Travel Insurance Google Apps Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}