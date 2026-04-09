import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Resend
  // It will use process.env.RESEND_API_KEY automatically if available
  const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

  // API Route to submit to Google Sheets
  app.post('/api/submit_to_sheet', async (req, res) => {
    try {
      console.log('[v0] Received submission:', req.body);
      
      const data = req.body;
      
      // Get access token
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      
      if (!clientEmail || !privateKey) {
        console.error('[v0] Missing Google credentials');
        return res.status(500).json({ success: false, error: 'Missing Google credentials' });
      }

      // Generate JWT
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

      // Get access token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error('[v0] Token error:', tokenData);
        return res.status(500).json({ success: false, error: 'Failed to get access token' });
      }
      
      const accessToken = tokenData.access_token;
      console.log('[v0] Got access token');
      
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
      
      console.log('[v0] Appending row:', rowData);
      
      // Append to sheet
      const SPREADSHEET_ID = '1L7MOhIOVb_XQaIZNH8HrO4Puc-5YTQ-WYI5j0-N_Om4';
      const SHEET_NAME = 'salary';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G:append?valueInputOption=USER_ENTERED`;
      
      const sheetResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData]
        }),
      });

      if (!sheetResponse.ok) {
        const error = await sheetResponse.json();
        console.error('[v0] Sheet error:', error);
        return res.status(500).json({ success: false, error: 'Failed to append to sheet' });
      }

      const result = await sheetResponse.json();
      console.log('[v0] Sheet updated successfully:', result);
      
      return res.status(200).json({ 
        success: true,
        message: 'Data submitted to Google Sheets successfully',
        result
      });
      
    } catch (error) {
      console.error('[v0] Error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // API Route to deliver document
  app.post('/api/deliver-document', async (req, res) => {
    try {
      const { email, type } = req.body;

      if (!email || !type) {
        return res.status(400).json({ error: 'Email and type are required' });
      }

      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Simulating email send for development.');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.status(200).json({ success: true, simulated: true });
      }

      let subject = '';
      let text = '';
      let html = '';
      let downloadLink = '';

      if (type === 'report') {
        subject = 'Your Salary Report is Ready';
        downloadLink = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/templates/salary-report-template.pdf'; // Placeholder link
        text = `Thank you for using our Salary Calculator.\n\nHere is your requested Salary Report.\n\nYou can download it here: ${downloadLink}`;
        html = `<p>Thank you for using our Salary Calculator.</p><p>Here is your requested <strong>Salary Report</strong>.</p><p>You can download it here: <a href="${downloadLink}">Download Report</a></p>`;
      } else if (type === 'payslip') {
        subject = 'Your Salary Payslip is Ready';
        downloadLink = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/templates/salary-payslip-template.pdf'; // Placeholder link
        text = `Thank you for using our Salary Calculator.\n\nHere is your requested Salary Payslip.\n\nYou can download it here: ${downloadLink}`;
        html = `<p>Thank you for using our Salary Calculator.</p><p>Here is your requested <strong>Salary Payslip</strong>.</p><p>You can download it here: <a href="${downloadLink}">Download Payslip</a></p>`;
      } else {
        return res.status(400).json({ error: 'Invalid document type' });
      }

      const data = await resend.emails.send({
        from: 'Salary Calculator <noreply@salarycalc.com>', // Replace with verified domain in production
        to: [email],
        subject: subject,
        text: text,
        html: html,
      });

      if (data.error) {
        console.error('Resend API Error:', data.error);
        return res.status(500).json({ error: data.error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Serve static files from root directory
  const rootPath = process.cwd();
  app.use(express.static(rootPath));
  
  // Serve HTML files
  app.get('/', (req, res) => {
    res.sendFile(path.join(rootPath, 'index.html'));
  });
  
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(rootPath, 'admin.html'));
  });
  
  app.get('/payslip', (req, res) => {
    res.sendFile(path.join(rootPath, 'payslip.html'));
  });
  
  app.get('/report', (req, res) => {
    res.sendFile(path.join(rootPath, 'report.html'));
  });
  
  app.get('/mincal', (req, res) => {
    res.sendFile(path.join(rootPath, 'mincal.html'));
  });

  const startListening = (port: number) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
        server.close();
        startListening(port + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };

  startListening(PORT);
}

startServer();
