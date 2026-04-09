/**
 * Google Apps Script for Salary Calculator AI Tools
 * 
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1L7MOhIOVb_XQaIZNH8HrO4Puc-5YTQ-WYI5j0-N_Om4/edit?gid=0#gid=0
 * Sheet Name: sheet salary
 * Service Account: ajobthing-promo@christmas-promo.iam.gserviceaccount.com
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Spreadsheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click Deploy > New deployment
 * 5. Select "Web app" as the type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web App URL
 * 9. Update the GOOGLE_SHEETS_SCRIPT_URL in index.html with the Web App URL
 * 
 * COLUMNS IN "sheet salary":
 * A: timestamp
 * B: email
 * C: phone_number
 * D: who_are_you
 * E: company_name
 * F: download_via
 */

function doPost(e) {
  const sheet = SpreadsheetApp.openById('1L7MOhIOVb_XQaIZNH8HrO4Puc-5YTQ-WYI5j0-N_Om4')
                              .getSheetByName('sheet salary');
  
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Bad Request - Invalid JSON' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // Validate required fields
  if (!data.email) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Email is required' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // Append data to sheet
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.email || '',
    data.phone_number || '',
    data.who_are_you || '',
    data.company_name || '',
    data.download_via || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
                       .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Handle GET requests for testing
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'ok', 
    message: 'Salary Calculator AI Tools - Google Sheets Integration is active' 
  })).setMimeType(ContentService.MimeType.JSON);
}
