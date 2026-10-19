const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

const contentSection = $('.content-section');
contentSection.html(`
  <div class="container">
    <div class="content-card">
      <div class="section-title-wrap">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">What is an Hourly Rate?</h2>
      </div>
      <p>An hourly rate is the amount of money you earn for every hour of work performed. Unlike a fixed monthly salary, hourly pay directly correlates with the exact amount of time you work. It is essential for determining overtime pay, freelance quotes, and part-time wages.</p>
      
      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Who Uses Hourly Pay?</h2>
      </div>
      <ul style="margin-top: 16px;">
        <li><strong>Part-time employees:</strong> Often paid strictly based on hours clocked in.</li>
        <li><strong>Freelancers:</strong> Use hourly rates to bill clients for project work.</li>
        <li><strong>Interns:</strong> May receive hourly stipends instead of a fixed monthly allowance.</li>
        <li><strong>Contract/Shift workers:</strong> Common in retail, F&B, and manufacturing sectors.</li>
        <li><strong>Employers:</strong> Need hourly rates to calculate statutory overtime pay (OT) in compliance with the Employment Act 1955.</li>
      </ul>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">How to Calculate Hourly Rate</h2>
      </div>
      <p style="margin-top: 16px;">The standard formula used in Malaysia (especially for Employment Act compliance) is based on 26 working days in a month, regardless of whether the month has 28, 30, or 31 days.</p>
      <div class="formula-box" style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #4f46e5; padding: 20px; margin: 24px 0; border-radius: 8px;">
        <strong style="color: #1e293b; font-size: 16px; margin-bottom: 8px; display: block;">Formula:</strong>
        <div style="font-size: 16px; color: #334155;">Hourly Rate = (Monthly Salary ÷ 26) ÷ Normal Working Hours Per Day</div>
      </div>
      <p><em>Note: If you work 5 days a week, your average monthly working days is technically 21.67 (5 days × 52 weeks ÷ 12 months). Our calculator lets you choose your exact working days to get an accurate personal hourly rate.</em></p>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Monthly Salary to Hourly Rate Conversion</h2>
      </div>
      <div class="table-container" style="overflow-x: auto; margin: 24px 0; border: 1px solid #e2e8f0; border-radius: 12px;">
        <table style="width: 100%; min-width: 500px; border-collapse: collapse; text-align: left; background: white;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
              <th style="padding: 16px 20px; color: #1e293b; font-weight: 600;">Monthly Salary</th>
              <th style="padding: 16px 20px; color: #1e293b; font-weight: 600;">Daily Rate (26 days)</th>
              <th style="padding: 16px 20px; color: #1e293b; font-weight: 600;">Hourly Rate (8 hrs)</th>
            </tr>
          </thead>
          <tbody style="color: #475569;">
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 16px 20px;">RM 1,500</td><td style="padding: 16px 20px;">RM 57.69</td><td style="padding: 16px 20px;">RM 7.21</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 16px 20px;">RM 2,000</td><td style="padding: 16px 20px;">RM 76.92</td><td style="padding: 16px 20px;">RM 9.62</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 16px 20px;">RM 3,000</td><td style="padding: 16px 20px;">RM 115.38</td><td style="padding: 16px 20px;">RM 14.42</td></tr>
            <tr><td style="padding: 16px 20px;">RM 4,000</td><td style="padding: 16px 20px;">RM 153.85</td><td style="padding: 16px 20px;">RM 19.23</td></tr>
          </tbody>
        </table>
      </div>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Factors That Affect Hourly Rate</h2>
      </div>
      <ul style="margin-top: 16px;">
        <li><strong>Working days:</strong> Working 5 days a week results in a higher hourly rate compared to 6 days a week for the same monthly salary.</li>
        <li><strong>Working hours:</strong> Shorter daily hours (e.g., 7 hours vs 8 hours) increase your hourly value.</li>
        <li><strong>Allowances:</strong> Fixed monthly allowances are generally included when calculating the "Ordinary Rate of Pay" for overtime purposes.</li>
      </ul>
      
      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Average Hourly Rates in Malaysia</h2>
      </div>
      <p style="margin-top: 16px;">Typical hourly rates vary widely by industry and experience level:</p>
      <ul>
        <li><strong>Retail & F&B (Part-time):</strong> RM 7.00 - RM 12.00 / hour</li>
        <li><strong>Events & Promoters:</strong> RM 10.00 - RM 25.00 / hour</li>
        <li><strong>Freelance Writers/Designers:</strong> RM 30.00 - RM 150.00+ / hour</li>
        <li><strong>Private Tutors:</strong> RM 40.00 - RM 100.00+ / hour</li>
      </ul>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Minimum Wage & Hourly Pay in Malaysia</h2>
      </div>
      <p style="margin-top: 16px;">As of recent regulations, the national minimum wage in Malaysia is RM 1,500 per month. When broken down for hourly workers, the statutory minimum hourly wage is:</p>
      <ul>
        <li>For 6 days/week (48 hours): <strong>RM 7.21 / hour</strong></li>
        <li>For 5 days/week (40 hours): <strong>RM 8.65 / hour</strong></li>
      </ul>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Tips for Employers</h2>
      </div>
      <p style="margin-top: 16px;">When calculating overtime for employees covered under the Employment Act 1955, you must use the statutory formula of (Monthly Salary ÷ 26) to find the daily rate, regardless of whether the employee works 5 or 6 days a week. Use this calculated hourly rate to determine 1.5x, 2.0x, or 3.0x overtime multipliers.</p>

      <div class="section-title-wrap" style="margin-top: 40px;">
        <div class="section-accent"></div>
        <h2 style="margin-bottom: 0;">Tips for Part-Time Workers, Freelancers & Interns</h2>
      </div>
      <p style="margin-top: 16px; margin-bottom: 0;">If you are negotiating a freelance or part-time gig, always factor in expenses that aren't covered by an employer, such as your own EPF/SOCSO contributions, medical insurance, and equipment costs. Your freelance hourly rate should generally be higher than a standard full-time equivalent to account for these overheads.</p>
    </div>
  </div>
`);

// The FAQ section structure
$('.faq-section').html(`
  <div class="container">
    <div class="section-title-wrap" style="justify-content: center; text-align: center;">
      <h2 style="margin-bottom: 0;">Frequently Asked Questions</h2>
    </div>
    <div class="faq-list">
      <details class="faq-item">
        <summary>What is an hourly rate?</summary>
        <div class="faq-content">An hourly rate is the amount of money you earn for every hour you work. It is used to calculate pay for part-time work, freelance projects, and statutory overtime for full-time employees.</div>
      </details>
      <details class="faq-item">
        <summary>How do I calculate hourly pay?</summary>
        <div class="faq-content">To calculate your precise hourly pay based on your actual working schedule: (Monthly Salary) ÷ (Working Days Per Month × Hours Per Day). For statutory overtime calculations under Malaysian law, the formula is (Monthly Salary ÷ 26) ÷ Normal Working Hours.</div>
      </details>
      <details class="faq-item">
        <summary>How many working days are there in a month?</summary>
        <div class="faq-content">For a standard 5-day workweek, there are approximately 21.67 working days per month (5 days × 52 weeks ÷ 12 months). For a 6-day workweek, there are 26 working days.</div>
      </details>
      <details class="faq-item">
        <summary>Can freelancers use this calculator?</summary>
        <div class="faq-content">Yes! Freelancers can use this tool to determine what their target monthly income equates to on an hourly basis, which helps in quoting for client projects.</div>
      </details>
      <details class="faq-item">
        <summary>Does hourly pay include overtime?</summary>
        <div class="faq-content">No, your basic hourly rate is for normal working hours. If you work overtime, your hourly rate is multiplied by an overtime multiplier (e.g., 1.5x for normal days, 2.0x for rest days) based on the Employment Act 1955.</div>
      </details>
      <details class="faq-item">
        <summary>What is Malaysia's minimum hourly wage?</summary>
        <div class="faq-content">Based on the RM1,500 minimum monthly wage, the statutory minimum hourly wage is RM 7.21 (assuming a 6-day workweek / 48-hour week).</div>
      </details>
    </div>
  </div>
`);

fs.writeFileSync('hourly-rate.html', $.html());
