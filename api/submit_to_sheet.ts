import type { VercelRequest, VercelResponse } from '@vercel/node';

const SPREADSHEET_ID = '1L7MOhIOVb_XQaIZNH8HrO4Puc-5YTQ-WYI5j0-N_Om4';
const SHEET_NAME = 'salary';

// Generate JWT and get access token
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!clientEmail || !privateKey) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY');
  }

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
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

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`);
  }
  
  return data.access_token;
}

// Append row to Google Sheet
async function appendToSheet(accessToken: string, rowData: string[]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G:append?valueInputOption=USER_ENTERED`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowData]
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to append to sheet: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('[v0 API] Received submission:', req.body);
    
    const data = req.body;
    
    // Get access token
    const accessToken = await getAccessToken();
    console.log('[v0 API] Got access token');
    
    // Prepare row data matching header: timestamp, email, who_are_you, are_you_hiring, company_name, phone_number, download_via
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.who_are_you || '',
      data.are_you_hiring || '',
      data.company_name || '',
      data.phone_number || '',
      data.download_via || '',
    ];
    
    console.log('[v0 API] Appending row:', rowData);
    
    // Append to sheet
    const result = await appendToSheet(accessToken, rowData);
    
    console.log('[v0 API] Sheet updated successfully:', result);
    
    return res.status(200).json({ 
      success: true,
      message: 'Data submitted to Google Sheets successfully',
      result
    });
    
  } catch (error) {
    console.error('[v0 API] Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
