const fs = require('fs');

let serverSource = fs.readFileSync('server.ts', 'utf8');

// We want to add a function to normalize payload keys before sending to Google Sheets
const normalizeFunction = `
function normalizeSheetPayload(body: any) {
    const payload: any = { ...body };
    
    // Exact mapping required by Apps Script / Sheet
    if (payload.email) payload["Email"] = payload.email;
    if (payload.userType) payload["User Type"] = payload.userType;
    if (payload.companyName) payload["Company Name"] = payload.companyName;
    if (payload.hiringStatus) payload["Hiring Status"] = payload.hiringStatus;
    if (payload.userPhone) payload["User Phone"] = payload.userPhone;
    if (payload.phoneNumber) payload["User Phone"] = payload.phoneNumber;

    // Remove old keys if they differ
    delete payload.email;
    delete payload.userType;
    delete payload.companyName;
    delete payload.hiringStatus;
    delete payload.userPhone;
    delete payload.phoneNumber;
    
    return payload;
}
`;

// Inject into server.ts after imports
if (!serverSource.includes('normalizeSheetPayload')) {
    serverSource = serverSource.replace(/dotenv\.config.*?\n/s, match => match + '\n' + normalizeFunction + '\n');
}

// Replace payload definitions in endpoints
serverSource = serverSource.replace(/const payload = \{ \.\.\.req\.body/g, 'const payload = { ...normalizeSheetPayload(req.body)');
fs.writeFileSync('server.ts', serverSource, 'utf8');
console.log('Patched server.ts with normalizeSheetPayload');
