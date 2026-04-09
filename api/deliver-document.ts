// Vercel serverless function for email delivery
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    const resend = new Resend(process.env.RESEND_API_KEY);

    let subject = '';
    let text = '';
    let html = '';
    let downloadLink = '';

    if (type === 'report') {
      subject = 'Your Salary Report is Ready';
      downloadLink = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/templates/salary-report-template.pdf';
      text = `Thank you for using our Salary Calculator.\n\nHere is your requested Salary Report.\n\nYou can download it here: ${downloadLink}`;
      html = `<p>Thank you for using our Salary Calculator.</p><p>Here is your requested <strong>Salary Report</strong>.</p><p>You can download it here: <a href="${downloadLink}">Download Report</a></p>`;
    } else if (type === 'payslip') {
      subject = 'Your Salary Payslip is Ready';
      downloadLink = 'https://s3-ap-southeast-1.amazonaws.com/ricebowl/templates/salary-payslip-template.pdf';
      text = `Thank you for using our Salary Calculator.\n\nHere is your requested Salary Payslip.\n\nYou can download it here: ${downloadLink}`;
      html = `<p>Thank you for using our Salary Calculator.</p><p>Here is your requested <strong>Salary Payslip</strong>.</p><p>You can download it here: <a href="${downloadLink}">Download Payslip</a></p>`;
    } else {
      return res.status(400).json({ error: 'Invalid document type' });
    }

    const data = await resend.emails.send({
      from: 'Salary Calculator <noreply@salarycalc.com>',
      to: [email],
      subject: subject,
      text: text,
      html: html,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
