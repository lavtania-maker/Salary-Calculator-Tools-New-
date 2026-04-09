import type { VercelRequest, VercelResponse } from '@vercel/node';
const SPREADSHEET_ID = '1L7MOhIOVb_XQaIZNH8HrO4Puc-5YTQ-WYI5j0-N_Om4';
const SHEET_NAME = 'salary';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// ================== AUTH ==================
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google credentials');
  }
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const base64url = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  const signatureInput = `${base64url(header)}.${base64url(claim)}`;
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  const signature = sign
    .sign(privateKey, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  const jwt = `${signatureInput}.${signature}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  return data.access_token;
}
// ================== FIND ROW ==================
async function findRow(accessToken: string, email: string, phone: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  const rows = data.values || [];
  for (let i = 1; i < rows.length; i++) {
    const rowEmail = (rows[i][1] || '').trim(); // B
    const rowPhone = (rows[i][5] || '').trim(); // F
    if (rowEmail === email.trim() && rowPhone === phone.trim()) {
      return i + 1;
    }
  }
  return null;
}
// ================== UPDATE ==================
async function updateRow(accessToken: string, row: number, rowData: string[]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A${row}:G${row}?valueInputOption=USER_ENTERED`;
  await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowData] }),
  });
}
// ================== APPEND ==================
async function appendRow(accessToken: string, rowData: string[]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G:append?valueInputOption=USER_ENTERED`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [rowData] }),
  });
}
// ================== MAIN ==================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  try {
    const data = req.body;
    const accessToken = await getAccessToken();
    const rowData = [
      data.timestamp || new Date().toISOString(), // A
      data.email || '',                           // B
      data.who_are_you || '',                     // C
      data.are_you_hiring || '',                  // D
      data.company_name || '',                   // E
      data.phone_number || '',                   // F
      data.download_via || '',                   // G
    ];
    const existingRow = await findRow(
      accessToken,
      data.email || '',
      data.phone_number || ''
    );
    if (existingRow) {
      await updateRow(accessToken, existingRow, rowData);
    } else {
      await appendRow(accessToken, rowData);
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
