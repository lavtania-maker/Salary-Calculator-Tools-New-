const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

$('.content-section > .container').append(`
  <div class="content-card" style="margin-bottom: 0; margin-top: 24px;">
    <div class="section-title-wrap">
      <div class="section-accent"></div>
      <h2 style="margin-bottom: 0;">Frequently Asked Questions</h2>
    </div>
    <div class="faq-accordion" style="margin-top: 32px;">
      <details class="faq-item">
        <summary class="faq-title">What is an hourly rate?</summary>
        <div class="faq-content">
          An hourly rate is the amount of money you earn for every hour you work. It is used to calculate pay for part-time work, freelance projects, and statutory overtime for full-time employees.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-title">How do I calculate hourly pay?</summary>
        <div class="faq-content">
          To calculate your precise hourly pay based on your actual working schedule: (Monthly Salary) ÷ (Working Days Per Month × Hours Per Day). For statutory overtime calculations under Malaysian law, the formula is (Monthly Salary ÷ 26) ÷ Normal Working Hours.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-title">How many working days are there in a month?</summary>
        <div class="faq-content">
          For a standard 5-day workweek, there are approximately 21.67 working days per month (5 days × 52 weeks ÷ 12 months). For a 6-day workweek, there are 26 working days.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-title">Can freelancers use this calculator?</summary>
        <div class="faq-content">
          Yes! Freelancers can use this tool to determine what their target monthly income equates to on an hourly basis, which helps in quoting for client projects.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-title">Does hourly pay include overtime?</summary>
        <div class="faq-content">
          No, your basic hourly rate is for normal working hours. If you work overtime, your hourly rate is multiplied by an overtime multiplier (e.g., 1.5x for normal days, 2.0x for rest days) based on the Employment Act 1955.
        </div>
      </details>
      <details class="faq-item">
        <summary class="faq-title">What is Malaysia's minimum hourly wage?</summary>
        <div class="faq-content">
          Based on the RM1,500 minimum monthly wage, the statutory minimum hourly wage is RM 7.21 (assuming a 6-day workweek / 48-hour week).
        </div>
      </details>
    </div>
  </div>
`);

fs.writeFileSync('hourly-rate.html', $.html());
