const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

// 4. Update Results Panel
$('.result-panel').html(`
<div class="card" id="hourlyResultCard" style="background: #f8fafc;">
  <h2 class="card-title" style="color: #2563eb !important;">Calculation Results</h2>
  
  <div id="resultsPlaceholder" class="placeholder-text">
    <div style="display: flex; justify-content: center; margin-bottom: 16px;">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    </div>
    <p>Enter details to see hourly rate breakdown</p>
    <noscript>
      <p style="color: #dc2626; font-weight: 600; margin-top: 10px; background-color: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #f87171; text-align: left;">
        JavaScript is required to calculate your results. Please enable JavaScript to use this calculator.
      </p>
    </noscript>
  </div>

  <div id="resultsContent" style="display: none;">
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 24px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
      <span style="display: block; color: #166534; font-weight: 600; margin-bottom: 8px;">Your Hourly Rate</span>
      <span id="resHourlyRate" style="font-size: 32px; font-weight: 800; color: #15803d;">RM 0.00</span>
    </div>

    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Daily Salary</span>
      <span id="resDailySalary" style="font-weight: 600;">RM 0.00</span>
    </div>
    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Monthly Working Hours</span>
      <span id="resMonthlyHours" style="font-weight: 600;">0 hours</span>
    </div>
    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Monthly Salary</span>
      <span id="resMonthlySalary" style="font-weight: 600;">RM 0.00</span>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 12px; margin-top: 24px;">
      <span style="display: block; color: #1e40af; font-weight: 600; font-size: 14px; margin-bottom: 8px;">Calculation Breakdown</span>
      <div style="font-size: 13px; color: #3b82f6;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Monthly Days × Daily Hours</span>
          <span id="resCalc1" style="font-weight: 600;"></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Monthly Salary ÷ Monthly Hrs</span>
          <span id="resCalc2" style="font-weight: 600;"></span>
        </div>
      </div>
    </div>

    <button id="downloadReportBtn" class="btn btn-primary" style="width: 100%; margin-top: 24px;">Download Report PDF</button>
  </div>
</div>
`);

// The CSS style elements like calculator-section etc
$('.content-section').html($('.content-section').html().replace(/<h2/g, '<h2 style="font-size: 1.5rem; color: #1e293b; margin-top: 32px; margin-bottom: 16px; font-weight: 700;"'));

fs.writeFileSync('hourly-rate.html', $.html());
