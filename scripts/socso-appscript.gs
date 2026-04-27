/**
 * SOCSO PERKESO Calculator — Google Sheets Web App
 *
 * HOW TO DEPLOY:
 * 1. Open a NEW Google Spreadsheet (different sheet_id from the main salary calculator).
 * 2. In that spreadsheet create a sheet tab named exactly: socso
 * 3. Go to Extensions → Apps Script, paste this entire file, and save.
 * 4. Click Deploy → New Deployment → Web App.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and replace YOUR_SOCSO_GOOGLE_SHEETS_WEB_APP_URL_HERE
 *    in both index.html and socso-perkeso/index.html.
 *
 * COLUMNS written to the "socso" sheet (in order):
 *   A: Timestamp
 *   B: Email
 *   C: User Type
 *   D: Hiring Status
 *   E: Company Name
 *   F: User Phone
 *   G: Download Via
 */

var SHEET_NAME = "socso";

// ── Handle POST requests from the website ────────────────────────────────────
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create the sheet + header row if it does not exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Email",
        "User Type",
        "Hiring Status",
        "Company Name",
        "User Phone",
        "Download Via",
      ]);
    }

    // Ensure header row exists (first run after manual sheet creation)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Email",
        "User Type",
        "Hiring Status",
        "Company Name",
        "User Phone",
        "Download Via",
      ]);
    }

    // Parse the JSON body sent by the website
    var data = JSON.parse(e.postData.contents);

    var timestamp    = data.timestamp    || new Date().toISOString();
    var email        = data.email        || "";
    var userType     = data.userType     || "";
    var hiringStatus = data.hiringStatus || "";
    var companyName  = data.companyName  || "";
    var userPhone    = data.userPhone    || "";
    var downloadVia  = data.download_via || "Download SOCSO Report";

    // Append one row per submission
    sheet.appendRow([
      timestamp,
      email,
      userType,
      hiringStatus,
      companyName,
      userPhone,
      downloadVia,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Handle GET requests (health-check / browser test) ────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", sheet: SHEET_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}
