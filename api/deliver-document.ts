import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return new Response(JSON.stringify({ error: 'Email and type are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating email send for development.');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return new Response(JSON.stringify({ success: true, simulated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ error: 'Invalid document type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ error: 'Unable to send email. Please try again.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(JSON.stringify({ error: 'Unable to send email. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
