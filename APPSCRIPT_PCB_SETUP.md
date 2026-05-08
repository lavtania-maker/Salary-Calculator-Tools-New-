## PCB Calculator Google Apps Script Setup Guide

### Your Apps Script Code (Already Configured)

Your Apps Script is correctly set up for the PCB report. Here's the code deployed as a Web App:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('1T6QfXmRl-0T2b_dog8_VSXVYCVJj-ifcH4Jf-Uv_dTw')
                              .getSheetByName('pcb');

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput('Bad Request').setMimeType(ContentService.MimeType.TEXT);
  }

  sheet.appendRow([
    data.timestamp,
    data.email,
    data.userType,
    data.hiringStatus,
    data.companyName,
    data.userPhone,
    data.download_via
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
                       .setMimeType(ContentService.MimeType.JSON);
}
```

### Data Format Stored in Google Sheets

The PCB Calculator form submissions will store data in the following format:

| Column | Field | Example |
|--------|-------|---------|
| A | timestamp | 2026-05-08T14:23:45.123Z |
| B | email | user@example.com |
| C | userType | employee / employer |
| D | hiringStatus | hiring / not_hiring |
| E | companyName | ABC Corporation |
| F | userPhone | +60123456789 |
| G | download_via | pcb calculator |

### Required Setup Steps

1. **Deploy Apps Script as Web App:**
   - Go to your Google Apps Script editor
   - Click "Deploy" → "New deployment"
   - Select type: "Web app"
   - Execute as: Your account
   - Who has access: "Anyone"
   - Copy the deployment URL

2. **Add to Environment Variables:**
   - Set `VITE_PCB_SHEETS_SCRIPT_URL` to your deployment URL
   - Format: `https://script.google.com/macros/d/{SCRIPT_ID}/usercontent`

3. **Create "pcb" Sheet:**
   - In your Google Sheet (ID: `1T6QfXmRl-0T2b_dog8_VSXVYCVJj-ifcH4Jf-Uv_dTw`)
   - Add a new sheet named "pcb" if it doesn't exist
   - Add headers: timestamp, email, userType, hiringStatus, companyName, userPhone, download_via

### Important Notes

✓ PCB Calculator has its own dedicated Apps Script URL (different from SOCSO/Salary calculator)
✓ Data is sent via `fetch()` with `mode: "no-cors"` (non-blocking for UI)
✓ Submissions are stored in Google Sheets automatically when users download PCB report
✓ No personal data is stored on our servers - only in your Google Sheet
✓ All submissions include `download_via: "pcb calculator"` for tracking

### Testing

When you click "Download PCB Report" on `/pcb-income-tax` page:
1. A form popup will appear
2. Fill in your details
3. Submit the form
4. Data is saved to Google Sheets in background
5. PDF download continues immediately (non-blocking)

The form data will appear in the "pcb" sheet within seconds.
