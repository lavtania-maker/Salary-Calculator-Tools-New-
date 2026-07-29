const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

// 1. Replace the Form
$('#calculatorForm').html(`
  <!-- Monthly Salary -->
  <div class="form-group">
    <label class="form-label" for="monthlySalary">Monthly Salary (RM) <span style="color: #dc2626">*</span></label>
    <input type="number" id="monthlySalary" class="form-input" value="7000" min="0" step="1">
  </div>

  <!-- Calculation Method -->
  <div class="form-group">
    <label class="form-label" for="calcMethod">Calculation Method</label>
    <select id="calcMethod" class="form-select">
      <option value="statutory">Statutory EA 1955 Rule (26 Days)</option>
      <option value="calendar">Calendar Average (52 Weeks / 12 Months)</option>
    </select>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
    <!-- Working Days Per Week -->
    <div class="form-group">
      <label class="form-label" for="workingDaysSelect">Working Days Per Week</label>
      <select id="workingDaysSelect" class="form-select" disabled>
        <option value="5">5 Days</option>
        <option value="5.5">5.5 Days</option>
        <option value="6">6 Days</option>
      </select>
      <div id="workingDaysNote" style="font-size: 11px; color: #64748b; margin-top: 4px;">Statutory Ordinary Rate of Pay (ORP) uses a fixed 26-day monthly divisor under Section 60I of EA 1955.</div>
    </div>

    <!-- Working Hours Per Day -->
    <div class="form-group">
      <label class="form-label" for="workingHours">Working Hours Per Day</label>
      <input type="number" id="workingHours" class="form-input" value="8" min="1" max="24" step="0.5">
    </div>
  </div>

  <!-- Employment Type -->
  <div class="form-group">
    <label class="form-label" for="employmentType">Employment Type</label>
    <select id="employmentType" class="form-select">
      <option value="full-time">Full-Time</option>
      <option value="part-time">Part-Time</option>
      <option value="freelance">Freelance / Contract</option>
      <option value="internship">Intern</option>
    </select>
  </div>

  <div class="form-actions" style="margin-top: 24px; gap: 16px;">
    <button type="reset" id="resetBtn" class="btn btn-outline" style="flex: 1;">Reset</button>
    <button type="button" id="calculateBtn" class="btn btn-primary" style="flex: 2;">Calculate Hourly Rate</button>
  </div>
`);

// 2. Replace the Results Panel
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
      <span style="display: block; color: #166534; font-weight: 600; margin-bottom: 4px;">Your Hourly Rate</span>
      <span id="resHourlyRate" style="font-size: 32px; font-weight: 800; color: #15803d;">RM 0.00</span>
      <span id="resSubtitleTag" style="display: block; color: #15803d; font-size: 13px; font-weight: 500; margin-top: 4px;">(Statutory EA 1955 Rate)</span>
    </div>

    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Daily Salary (ORP)</span>
      <span id="resDailySalary" style="font-weight: 600;">RM 0.00</span>
    </div>
    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Monthly Working Hours</span>
      <span id="resMonthlyHours" style="font-weight: 600;">0 hours</span>
    </div>
    <div class="result-item" style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between;">
      <span>Calculation Method</span>
      <span id="resActiveMethod" style="font-weight: 600; font-size: 13px; color: #475569;">26 Days (Statutory)</span>
    </div>

    <!-- Overtime Rates Breakdown -->
    <div id="otRatesPanel" style="margin-top: 24px; display: none;">
      <span style="display: block; color: #1e293b; font-weight: 600; font-size: 14px; margin-bottom: 12px;">Overtime Multipliers (Statutory)</span>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="background: white; border: 1px solid #e2e8f0; padding: 12px 8px; border-radius: 8px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Normal (1.5x)</div>
          <div id="resOT15" style="font-size: 14px; font-weight: 700; color: #1e293b;">RM 0.00</div>
        </div>
        <div style="background: white; border: 1px solid #e2e8f0; padding: 12px 8px; border-radius: 8px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Rest Day (2.0x)</div>
          <div id="resOT20" style="font-size: 14px; font-weight: 700; color: #1e293b;">RM 0.00</div>
        </div>
        <div style="background: white; border: 1px solid #e2e8f0; padding: 12px 8px; border-radius: 8px; text-align: center;">
          <div style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Holiday (3.0x)</div>
          <div id="resOT30" style="font-size: 14px; font-weight: 700; color: #1e293b;">RM 0.00</div>
        </div>
      </div>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 12px; margin-top: 24px;">
      <span style="display: block; color: #1e40af; font-weight: 600; font-size: 14px; margin-bottom: 8px;">Calculation Breakdown</span>
      <div id="resCalcSteps" style="font-size: 13px; color: #3b82f6;">
        <!-- Steps go here -->
      </div>
    </div>

    <button id="downloadReportBtn" class="btn btn-primary" style="width: 100%; margin-top: 24px;">Download Hourly Rate Report</button>
  </div>
</div>
`);

fs.writeFileSync('hourly-rate.html', $.html());
