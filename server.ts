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
