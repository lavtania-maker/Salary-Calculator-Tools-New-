/**
 * SOCSO PERKESO Calculator — Google Sheets Web App
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CONFIGURATION — uses Script Properties (the Apps Script equivalent of
 * environment variables). Values are never hard-coded in source.
 *
 * HOW TO SET SCRIPT PROPERTIES:
 *   1. In the Apps Script editor click the gear icon → "Project Settings".
 *   2. Scroll to "Script Properties" and add the two keys below:
 *
 *      Key                  │ Value (example)
 *      ─────────────────────┼──────────────────────────────────────────
 *      SOCSO_SPREADSHEET_ID │ 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
 *      SOCSO_SHEET_NAME     │ socso
 *
 *   SOCSO_SPREADSHEET_ID : found in the spreadsheet URL
 *     https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
 *
 *   SOCSO_SHEET_NAME : the exact tab name inside that spreadsheet (default: socso)
 *
 * HOW TO DEPLOY:
 *   1. Open a NEW Google Spreadsheet (different from the main salary calculator).
 *   2. Add a sheet tab named exactly the value you set for SOCSO_SHEET_NAME.
 *   3. Extensions → Apps Script → paste this file → save.
 *   4. Set the two Script Properties described above.
 *   5. Deploy → New Deployment → Web App
 *        Execute as : Me
 *        Who can access : Anyone
 *   6. Copy the Web App URL and replace YOUR_SOCSO_GOOGLE_SHEETS_WEB_APP_URL_HERE
 *      in both  index.html  and  socso-perkeso/index.html.
 *
 * COLUMNS written (in order):
 *   A: Timestamp  B: Email  C: User Type  D: Hiring Status
 *   E: Company Name  F: User Phone  G: Download Via
 */

// ── Config helpers ────────────────────────────────────────────────────────────

/**
 * Returns all Script Properties as an object.
 * Throws a descriptive error if a required key is missing.
 */
function getConfig() {
  var props = PropertiesService.getScriptProperties();

  var spreadsheetId = props.getProperty("SOCSO_SPREADSHEET_ID");
  var sheetName     = props.getProperty("SOCSO_SHEET_NAME") || "socso";

  if (!spreadsheetId) {
    throw new Error(
      "Missing Script Property: SOCSO_SPREADSHEET_ID. " +
      "Go to Project Settings → Script Properties and add it."
    );
  }

  return {
    spreadsheetId: spreadsheetId,
    sheetName: sheetName
  };
}

/**
 * Opens the target sheet, auto-creating it with a header row if absent.
 */
function getOrCreateSheet(spreadsheetId, sheetName) {
  var ss    = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Write header row if the sheet is completely empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Email",
      "User Type",
      "Hiring Status",
      "Company Name",
      "User Phone",
      "Download Via"
    ]);
    // Freeze the header row for readability
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// ── HTTP handlers ─────────────────────────────────────────────────────────────

/**
 * Handles POST requests sent by the website's download modal.
 * Payload (JSON):
 *   { timestamp, email, userType, hiringStatus, companyName, userPhone, download_via }
 */
function doPost(e) {
  try {
    var config = getConfig();
    var sheet  = getOrCreateSheet(config.spreadsheetId, config.sheetName);

    // Read from e.parameter (application/x-www-form-urlencoded — no CORS preflight)
    // This is the most reliable way to receive data from a no-cors browser fetch
    var timestamp    = e.parameter.timestamp    || new Date().toISOString();
    var email        = e.parameter.email        || "";
    var userType     = e.parameter.userType     || "";
    var hiringStatus = e.parameter.hiringStatus || "";
    var companyName  = e.parameter.companyName  || "";
    var userPhone    = e.parameter.userPhone    || "";
    var downloadVia  = e.parameter.download_via || "Download SOCSO Report";

    sheet.appendRow([
      timestamp,
      email,
      userType,
      hiringStatus,
      companyName,
      userPhone,
      downloadVia
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

/**
 * Health-check endpoint — open the Web App URL in a browser to verify config.
 * Returns: { status, spreadsheetId, sheetName }
 */
function doGet(e) {
  try {
    var config = getConfig();

    // If form fields are present, record the submission (sent as GET + query string
    // to avoid CORS preflight that blocks POST from the browser)
    if (e.parameter && e.parameter.email) {
      var sheet = getOrCreateSheet(config.spreadsheetId, config.sheetName);
      sheet.appendRow([
        e.parameter.timestamp    || new Date().toISOString(),
        e.parameter.email        || "",
        e.parameter.userType     || "",
        e.parameter.hiringStatus || "",
        e.parameter.companyName  || "",
        e.parameter.userPhone    || "",
        e.parameter.download_via || "Download SOCSO Report"
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Health check when no form fields present
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "ok",
        spreadsheetId: config.spreadsheetId,
        sheetName: config.sheetName
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
