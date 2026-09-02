const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

// 1. Update Head
$('title').text('Hourly Rate Calculator Malaysia | Convert Monthly Salary to Hourly Wage');
$('meta[name="description"]').attr('content', 'Convert your monthly salary into an hourly rate instantly. Suitable for full-time employees, part-time workers, freelancers, interns, HR professionals, and employers in Malaysia.');
$('meta[name="keywords"]').attr('content', 'hourly rate calculator malaysia, calculate hourly rate, monthly to hourly salary malaysia, part time rate malaysia, freelance rate malaysia, hourly wage calculator');
$('link[rel="canonical"]').attr('href', 'https://salarycalculator.my/hourly-rate');

// 2. Update H1 and descriptions
$('.hero h1').text('Hourly Rate Calculator Malaysia');
$('.hero p').text('Convert your monthly salary into an hourly rate instantly. Suitable for full-time employees, part-time workers, freelancers, and interns.');

// 3. Update Calculator Form
$('#otForm').html(`
  <!-- Monthly Salary -->
  <div class="input-group">
    <label for="monthlySalary">Monthly Salary (RM) <span class="required">*</span></label>
    <div class="input-prefix-wrapper">
      <span class="prefix">RM</span>
      <input type="number" id="monthlySalary" placeholder="e.g. 3000" min="0" step="1" required>
    </div>
  </div>

  <!-- Working Days Per Week -->
  <div class="input-group" style="margin-top: 24px;">
    <label>Working Days Per Week</label>
    <div class="radio-group" style="display: flex; gap: 16px;">
      <label class="radio-label" style="display: flex; align-items: center; gap: 8px;">
        <input type="radio" name="workingDays" value="5" checked>
        <span>5 Days</span>
      </label>
      <label class="radio-label" style="display: flex; align-items: center; gap: 8px;">
        <input type="radio" name="workingDays" value="5.5">
        <span>5.5 Days</span>
      </label>
      <label class="radio-label" style="display: flex; align-items: center; gap: 8px;">
        <input type="radio" name="workingDays" value="6">
        <span>6 Days</span>
      </label>
    </div>
  </div>

  <!-- Working Hours Per Day -->
  <div class="input-group" style="margin-top: 24px;">
    <label for="workingHours">Working Hours Per Day</label>
    <input type="number" id="workingHours" class="input-field" value="8" min="1" max="24" step="0.5" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
  </div>

  <!-- Employment Type -->
  <div class="input-group" style="margin-top: 24px;">
    <label for="employmentType">Employment Type</label>
    <select id="employmentType" class="select-input" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <option value="full-time">Full-Time</option>
      <option value="part-time">Part-Time</option>
      <option value="freelance">Freelance</option>
      <option value="internship">Internship</option>
    </select>
  </div>

  <div class="button-group" style="margin-top: 32px; display: flex; flex-direction: column; gap: 12px;">
    <button type="button" class="btn-primary" id="calculateBtn" style="width: 100%; justify-content: center;">
      Calculate Hourly Rate
    </button>
    <button type="button" class="btn-secondary" id="resetBtn" style="width: 100%; justify-content: center;">
      Reset
    </button>
  </div>
`);
$('#otForm').attr('id', 'calculatorForm');

// 4. Update Results Panel
$('.result-panel').html(`
  <div class="card" id="hourlyResultCard" style="background: #f8fafc; border-radius: 16px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
    <div class="results-header" style="margin-bottom: 24px;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0;">Calculation Results</h3>
    </div>

    <!-- Initial Placeholder -->
    <div id="resultsPlaceholder" class="results-placeholder" style="display: block; text-align: center; padding: 48px 24px; background: #ffffff; border-radius: 16px; border: 2px dashed #e2e8f0;">
      <div class="placeholder-icon" style="color: #94a3b8; margin-bottom: 16px; display: flex; justify-content: center;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <p style="color: #64748b; margin: 0; line-height: 1.6;">Enter your details and click calculate to see your hourly rate breakdown.</p>
    </div>

    <!-- Results Content -->
    <div id="resultsContent" class="results-content" style="display: none; opacity: 0; transition: opacity 0.3s ease;">
      
      <!-- Highlight Card -->
      <div class="summary-card total-earnings" style="background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: white; padding: 32px 24px; border-radius: 16px; margin-bottom: 24px; text-align: center; box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);">
        <div style="font-size: 15px; font-weight: 500; opacity: 0.9; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Your Hourly Rate</div>
        <div id="resHourlyRate" style="font-size: 48px; font-weight: 800; letter-spacing: -0.02em; margin: 8px 0;">RM 0.00</div>
        <div style="font-size: 14px; opacity: 0.8;">/ hour</div>
      </div>

      <!-- Breakdown Grid -->
      <div class="results-grid" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        
        <div class="result-row" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <span style="color: #64748b; font-size: 15px; font-weight: 500;">Daily Salary</span>
          <span id="resDailySalary" style="font-weight: 700; color: #1e293b; font-size: 16px;">RM 0.00</span>
        </div>
        
        <div class="result-row" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <span style="color: #64748b; font-size: 15px; font-weight: 500;">Monthly Working Hours</span>
          <span id="resMonthlyHours" style="font-weight: 700; color: #1e293b; font-size: 16px;">0 hours</span>
        </div>

        <div class="result-row" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <span style="color: #64748b; font-size: 15px; font-weight: 500;">Monthly Salary</span>
          <span id="resMonthlySalary" style="font-weight: 700; color: #1e293b; font-size: 16px;">RM 0.00</span>
        </div>

      </div>

      <!-- Calculation Breakdown Note -->
      <div class="info-box" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 32px;">
        <h4 style="color: #334155; font-size: 15px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Calculation Breakdown
        </h4>
        <div style="font-size: 14px; color: #475569; line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span>Monthly Days × Daily Hours</span>
            <strong id="resCalc1" style="color: #1e293b;">0 × 0 = 0 hrs</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
            <span>Monthly Salary ÷ Monthly Hrs</span>
            <strong id="resCalc2" style="color: #1e293b;">RM0 ÷ 0 = RM0.00</strong>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <button class="btn-primary" id="downloadReportBtn" style="width: 100%; justify-content: center; padding: 14px 24px; font-size: 16px; font-weight: 600; border-radius: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download Detailed Report (PDF)
      </button>
    </div>
  </div>
`);

// 5. Update SEO Content
const contentSection = $('.content-section');
contentSection.html(`
  <h2>What is an Hourly Rate?</h2>
  <p>An hourly rate is the amount of money you earn for every hour of work performed. Unlike a fixed monthly salary, hourly pay directly correlates with the exact amount of time you work. It is essential for determining overtime pay, freelance quotes, and part-time wages.</p>
  
  <h2>Who Uses Hourly Pay?</h2>
  <ul>
    <li><strong>Part-time employees:</strong> Often paid strictly based on hours clocked in.</li>
    <li><strong>Freelancers:</strong> Use hourly rates to bill clients for project work.</li>
    <li><strong>Interns:</strong> May receive hourly stipends instead of a fixed monthly allowance.</li>
    <li><strong>Contract/Shift workers:</strong> Common in retail, F&B, and manufacturing sectors.</li>
    <li><strong>Employers:</strong> Need hourly rates to calculate statutory overtime pay (OT) in compliance with the Employment Act 1955.</li>
  </ul>

  <h2>How to Calculate Hourly Rate</h2>
  <p>The standard formula used in Malaysia (especially for Employment Act compliance) is based on 26 working days in a month, regardless of whether the month has 28, 30, or 31 days.</p>
  <div class="formula-box" style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #4f46e5; padding: 20px; margin: 24px 0; border-radius: 8px;">
    <strong style="color: #1e293b; font-size: 16px; margin-bottom: 8px; display: block;">Formula:</strong>
    <div style="font-size: 16px; color: #334155;">Hourly Rate = (Monthly Salary ÷ 26) ÷ Normal Working Hours Per Day</div>
  </div>
  <p><em>Note: If you work 5 days a week, your average monthly working days is technically 21.67 (5 days × 52 weeks ÷ 12 months). Our calculator lets you choose your exact working days to get an accurate personal hourly rate.</em></p>

  <h2>Monthly Salary to Hourly Rate Conversion</h2>
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

  <h2>Factors That Affect Hourly Rate</h2>
  <ul>
    <li><strong>Working days:</strong> Working 5 days a week results in a higher hourly rate compared to 6 days a week for the same monthly salary.</li>
    <li><strong>Working hours:</strong> Shorter daily hours (e.g., 7 hours vs 8 hours) increase your hourly value.</li>
    <li><strong>Allowances:</strong> Fixed monthly allowances are generally included when calculating the "Ordinary Rate of Pay" for overtime purposes.</li>
  </ul>

  <h2>Average Hourly Rates in Malaysia</h2>
  <p>Typical hourly rates vary widely by industry and experience level:</p>
  <ul>
    <li><strong>Retail & F&B (Part-time):</strong> RM 7.00 - RM 12.00 / hour</li>
    <li><strong>Events & Promoters:</strong> RM 10.00 - RM 25.00 / hour</li>
    <li><strong>Freelance Writers/Designers:</strong> RM 30.00 - RM 150.00+ / hour</li>
    <li><strong>Private Tutors:</strong> RM 40.00 - RM 100.00+ / hour</li>
  </ul>

  <h2>Minimum Wage & Hourly Pay in Malaysia</h2>
  <p>As of recent regulations, the national minimum wage in Malaysia is RM 1,500 per month. When broken down for hourly workers, the statutory minimum hourly wage is:</p>
  <ul>
    <li>For 6 days/week (48 hours): <strong>RM 7.21 / hour</strong></li>
    <li>For 5 days/week (40 hours): <strong>RM 8.65 / hour</strong></li>
  </ul>

  <h2>Tips for Employers</h2>
  <p>When calculating overtime for employees covered under the Employment Act 1955, you must use the statutory formula of (Monthly Salary ÷ 26) to find the daily rate, regardless of whether the employee works 5 or 6 days a week. Use this calculated hourly rate to determine 1.5x, 2.0x, or 3.0x overtime multipliers.</p>

  <h2>Tips for Part-Time Workers, Freelancers & Interns</h2>
  <p>If you are negotiating a freelance or part-time gig, always factor in expenses that aren't covered by an employer, such as your own EPF/SOCSO contributions, medical insurance, and equipment costs. Your freelance hourly rate should generally be higher than a standard full-time equivalent to account for these overheads.</p>
`);

$('.faq-section').html(`
  <h2>Frequently Asked Questions</h2>
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
`);

// Replace specific JSON-LD for FAQ
let newJsonLd = `
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an hourly rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An hourly rate is the amount of money you earn for every hour you work. It is used to calculate pay for part-time work, freelance projects, and statutory overtime for full-time employees."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate hourly pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate your precise hourly pay based on your actual working schedule: (Monthly Salary) ÷ (Working Days Per Month × Hours Per Day)."
      }
    }
  ]
}
`;
$('script[type="application/ld+json"]').first().text(newJsonLd);

// Remove ALL existing script tags that have inline JavaScript related to calculator
$('script').each((i, el) => {
  const content = $(el).html();
  if (content && (content.includes('calculateBtn') || content.includes('calculateOT') || content.includes('calculateOvertime'))) {
    $(el).remove();
  }
});

let scriptLogic = `
  document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsPlaceholder = document.getElementById('resultsPlaceholder');
    const resultsContent = document.getElementById('resultsContent');
    
    // Inputs
    const monthlySalaryInput = document.getElementById('monthlySalary');
    const workingHoursInput = document.getElementById('workingHours');
    const employmentTypeSelect = document.getElementById('employmentType');

    // Outputs
    const resHourlyRate = document.getElementById('resHourlyRate');
    const resDailySalary = document.getElementById('resDailySalary');
    const resMonthlyHours = document.getElementById('resMonthlyHours');
    const resMonthlySalary = document.getElementById('resMonthlySalary');
    const resCalc1 = document.getElementById('resCalc1');
    const resCalc2 = document.getElementById('resCalc2');

    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR'
      }).format(amount);
    }

    function calculate() {
      const monthlySalary = parseFloat(monthlySalaryInput.value) || 0;
      const workingHours = parseFloat(workingHoursInput.value) || 8;
      const checkedDays = document.querySelector('input[name="workingDays"]:checked');
      const workingDaysPerWeek = checkedDays ? parseFloat(checkedDays.value) : 5;

      if (monthlySalary <= 0 || workingHours <= 0) return;

      // Calculate Monthly Working Days
      let monthlyWorkingDays = 21.67;
      if (workingDaysPerWeek === 5.5) monthlyWorkingDays = 23.83;
      if (workingDaysPerWeek === 6) monthlyWorkingDays = 26;

      const monthlyWorkingHours = monthlyWorkingDays * workingHours;
      const hourlyRate = monthlySalary / monthlyWorkingHours;
      const dailySalary = monthlySalary / monthlyWorkingDays;

      if (resHourlyRate) resHourlyRate.textContent = formatCurrency(hourlyRate);
      if (resDailySalary) resDailySalary.textContent = formatCurrency(dailySalary);
      if (resMonthlyHours) resMonthlyHours.textContent = monthlyWorkingHours.toFixed(2) + ' hours';
      if (resMonthlySalary) resMonthlySalary.textContent = formatCurrency(monthlySalary);

      if (resCalc1) resCalc1.innerHTML = \`\${monthlyWorkingDays.toFixed(2)} days × \${workingHours} hrs = <strong>\${monthlyWorkingHours.toFixed(2)} hrs</strong>\`;
      if (resCalc2) resCalc2.innerHTML = \`\${formatCurrency(monthlySalary)} ÷ \${monthlyWorkingHours.toFixed(2)} hrs = <strong>\${formatCurrency(hourlyRate)}/hr</strong>\`;

      if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
      if (resultsContent) {
        resultsContent.style.display = 'block';
        setTimeout(() => {
          resultsContent.style.opacity = '1';
        }, 10);
      }
      
      if (typeof gtag === 'function') {
        gtag('event', 'calculate_hourly', {
          'salary': monthlySalary,
          'days': workingDaysPerWeek
        });
      }
    }

    if(calculateBtn) calculateBtn.addEventListener('click', calculate);
    
    if(resetBtn) resetBtn.addEventListener('click', () => {
      if(monthlySalaryInput) monthlySalaryInput.value = '';
      if(workingHoursInput) workingHoursInput.value = '8';
      const defaultDay = document.querySelector('input[name="workingDays"][value="5"]');
      if(defaultDay) defaultDay.checked = true;
      if(employmentTypeSelect) employmentTypeSelect.value = 'full-time';
      
      if (resultsContent) {
        resultsContent.style.opacity = '0';
        setTimeout(() => {
          resultsContent.style.display = 'none';
          if(resultsPlaceholder) resultsPlaceholder.style.display = 'block';
        }, 300);
      }
    });

    // Handle Download Flow (reuse existing modal logic)
    const downloadBtn = document.getElementById('downloadReportBtn');
    if(downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const modal = document.getElementById('emailModal');
        if(modal) modal.style.display = 'flex';
        if (typeof gtag === 'function') {
          gtag('event', 'download_hourly_report_click');
        }
      });
    }

    // Modal close hooks
    const modalClose = document.getElementById('modalClose');
    if(modalClose) {
      modalClose.addEventListener('click', () => {
        const modal = document.getElementById('emailModal');
        if(modal) modal.style.display = 'none';
      });
    }

    // Modal submit hook
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
      emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = emailForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Processing...';
        submitBtn.disabled = true;

        try {
          // Prepare data
          const monthlySalary = parseFloat(monthlySalaryInput ? monthlySalaryInput.value : 0) || 0;
          const workingHours = parseFloat(workingHoursInput ? workingHoursInput.value : 8) || 8;
          const checkedDays = document.querySelector('input[name="workingDays"]:checked');
          const workingDaysRaw = checkedDays ? checkedDays.value : "5";
          
          let monthlyWorkingDays = 21.67;
          if (workingDaysRaw == '5.5') monthlyWorkingDays = 23.83;
          if (workingDaysRaw == '6') monthlyWorkingDays = 26;

          const monthlyWorkingHours = monthlyWorkingDays * workingHours;
          const hourlyRate = monthlySalary / (monthlyWorkingHours || 1);

          const formData = new FormData(emailForm);
          const data = {
            name: formData.get('userName'),
            email: formData.get('userEmail'),
            companyName: formData.get('companyName'),
            phone: formData.get('userPhone'),
            userType: formData.get('userType'),
            hiringStatus: formData.get('hiringStatus'),
            calculatorType: 'HourlyRate',
            salary: monthlySalary,
            workingDays: workingDaysRaw,
            workingHours: workingHours,
            hourlyRate: hourlyRate,
            timestamp: new Date().toISOString()
          };

          // Try to submit to sheet
          try {
            await fetch("https://script.google.com/macros/s/AKfycbye4H3j2gWkGf-uO0j4Fk19sC3d3l90W8HiyRXXi7rJc0kF87n5-WbK64fSjBfT654W/exec", {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
          } catch(e) {}
          
          // Try to submit to Firestore
          if (window.db && window.firebaseFirestore) {
            try {
              const { collection, addDoc } = window.firebaseFirestore;
              await addDoc(collection(window.db, "leads"), data);
            } catch(e) {}
          }

          // Show success
          const mfc = document.getElementById('modalFormContent');
          const msc = document.getElementById('modalSuccessContent');
          if(mfc) mfc.style.display = 'none';
          if(msc) msc.style.display = 'block';
          
          if (typeof gtag === 'function') {
            gtag('event', 'generate_lead_hourly');
          }
          
        } catch (error) {
          console.error(error);
          alert('Something went wrong. Please try again.');
        } finally {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
    }
  });
`;

// Append our new script
$('body').append('<script>' + scriptLogic + '</script>');

fs.writeFileSync('hourly-rate.html', $.html());
