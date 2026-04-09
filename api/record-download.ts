export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, userType, hiringStatus, companyName, userPhone, download_via } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Google Sheets Web App URL - set this in your environment variables
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.warn('GOOGLE_SHEETS_URL is not set. Data will not be recorded to Google Sheets.');
      // Return success anyway for development
      return new Response(JSON.stringify({ 
        success: true, 
        simulated: true,
        message: 'GOOGLE_SHEETS_URL not configured. Data not recorded.' 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Prepare data for Google Sheets
    // Columns: timestamp, email, userType, hiringStatus, companyName, userPhone, download_via
    const sheetData = {
      timestamp: new Date().toISOString(),
      email: email || '',
      userType: userType || '',
      hiringStatus: hiringStatus || '',
      companyName: companyName || '',
      userPhone: userPhone || '',
      download_via: download_via || '',
    };

    // Send to Google Sheets Web App
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to record to Google Sheets' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error recording download:', error);
    return new Response(JSON.stringify({ error: 'Failed to record download' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
