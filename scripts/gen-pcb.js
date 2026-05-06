import fs from 'fs';
import path from 'path';

const htmlTemplate = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');

// Extract everything from start to <div class="calculator-area">
const headMatch = htmlTemplate.match(/([\s\S]*?<div class="calculator-area">)/);
const head = headMatch ? headMatch[1] : '';

// Create a new layout for PCB inside calculator-area
const pcbHtml = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 id="heroTitle">PCB (Monthly Tax Deduction) Calculator</h1>
          <p id="heroSubtitle">
            Calculate your Monthly Tax Deduction (PCB) instantly. Free tool for employees and employers.
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <main class="container">
        <div class="main-layout" id="layoutPcb">
          <!-- Left Side: Form Input -->
          <section class="card">
            <h2 class="card-title">Enter Details</h2>
            <form id="pcbForm" action="#resultCard" method="GET">
              
              <div class="form-group">
                <label class="form-label" for="grossSalary" style="display: flex; align-items: center; gap: 6px">
                  Gross Monthly Salary
                </label>
                <div class="input-group">
                  <span class="input-prefix">RM</span>
                  <input type="number" id="grossSalary" name="grossSalary" class="form-input" placeholder="0" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="ageBracket">Age Group</label>
                <select id="ageBracket" name="ageBracket" class="form-select">
                  <option value="below60">Below 60 years old</option>
                  <option value="above60">60 years old and above</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="nationality">Nationality</label>
                <select id="nationality" name="nationality" class="form-select">
                  <option value="malaysian">Malaysian</option>
                  <option value="foreigner">Foreigner</option>
                </select>
              </div>

              <div class="form-actions" style="margin-top: 20px; margin-bottom: 24px">
                <button type="reset" id="resetBtn" class="btn btn-outline">
                  Reset
                </button>
                <button type="submit" class="btn btn-primary">
                  Calculate
                </button>
              </div>
            </form>
          </section>

          <!-- Right Side: Result Panel -->
          <section class="card result-panel" id="resultCard">
            <h2 class="card-title">PCB Calculation Result</h2>
            <div id="placeholderText" class="placeholder-text">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 12px auto; display: block; color: #9ca3af"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Fill your salary to see results
            </div>

            <div id="resultContent" class="result-content">
              <div class="highlight-box">
                <span class="highlight-label">PCB (MTD) DEDUCTION</span>
                <span class="highlight-value" id="resPcb">RM 0.00</span>
              </div>
              
              <div style="margin-top: 24px;">
                <div class="result-item">
                  <span>Gross Salary</span>
                  <span id="resGross" style="font-weight: 600;">RM 0.00</span>
                </div>
                <div class="result-item">
                  <span>EPF Deduction (Assumption: 11%)</span>
                  <span id="resEpf" style="font-weight: 600; color: var(--danger)">RM 0.00</span>
                </div>
                <div class="result-item total">
                  <span>Chargeable Income (Estimated)</span>
                  <span id="resChargeable">RM 0.00</span>
                </div>
              </div>

              <!-- CTA Group -->
              <div class="cta-group">
                <button class="btn btn-primary" id="downloadPdfBtn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download as PDF
                </button>
              </div>
            </div>
            
             <p style="font-size: 0.8rem; color: #6b7280; margin-top: 20px; line-height: 1.4; text-align: center;">
              ⚠️ Disclaimer: The results generated by this calculator are estimates only and may differ from official PCB (MTD) calculations by LHDN. It should not be used as a substitute for official guidance.
            </p>
          </section>
        </div>
      </main>
    </div>

    <!-- SEO Content Section -->
    <section class="content-section" style="background: white; padding-bottom: 60px;">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        
        <div class="content-card">
          <h2>What is PCB (Monthly Tax Deduction)</h2>
          <p>PCB (Potongan Cukai Bulanan) is a monthly tax deduction made by employers from an employee’s salary to pay income tax progressively throughout the year. It is part of Malaysia’s tax system managed by LHDN.</p>
          <p>PCB is not an additional tax. It is a method of paying your income tax in advance. At the end of the year, the total PCB deducted will be reconciled with your actual tax payable.</p>
        </div>

        <div class="content-card">
          <h2>How PCB Works in Malaysia</h2>
          <p>PCB is calculated based on an employee’s monthly income after deducting statutory contributions such as EPF and applying applicable tax reliefs.</p>
          <p>Employers are responsible for:</p>
          <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Calculating PCB</li>
            <li>Deducting it from salaries</li>
            <li>Submitting it monthly to LHDN</li>
          </ul>
          <p>The amount may change depending on salary increases, bonuses, or changes in tax relief.</p>
        </div>

        <div class="content-card">
          <h2>How to Calculate PCB</h2>
          <p>PCB calculation typically considers:</p>
          <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Monthly salary</li>
            <li>EPF contributions</li>
            <li>Tax reliefs</li>
            <li>Annual tax rates</li>
          </ul>
          <p>The calculation follows Malaysia’s progressive tax system, where higher income is taxed at higher rates. Because the formula is complex, most employers use a PCB calculator to estimate deductions quickly.</p>
        </div>

        <div class="content-card">
          <h2>PCB Tax Rates Malaysia</h2>
          <p>Malaysia uses a progressive tax rate system, where tax rates increase as income increases. PCB follows these rates and distributes the tax payment monthly.</p>
          <p>Instead of referring manually to tax tables, employers often use automated calculators to determine accurate deductions.</p>
        </div>

        <div class="content-card">
          <h2>PCB vs Income Tax</h2>
          <p>PCB is a monthly deduction, while income tax is calculated annually.</p>
          <p>PCB acts as a prepayment of income tax. If the total PCB deducted matches your tax payable, no additional payment is required. Otherwise, you may need to pay extra or receive a refund.</p>
        </div>

        <div class="content-card">
          <h2>How to Pay PCB</h2>
          <p>Employers can pay PCB through the e-PCB system provided by LHDN.</p>
          <p>Payments must be made monthly within the required deadline. Late payments may result in penalties.</p>
        </div>

        <div class="content-card">
          <h2>PCB Number (Tax File Number)</h2>
          <p>A PCB number refers to the employee’s income tax reference number issued by LHDN.</p>
          <p>This number is used for tax reporting and PCB submission.</p>
        </div>

        <div class="content-card">
          <h2>Is PCB Compulsory in Malaysia</h2>
          <p>Yes, PCB is compulsory for employees who meet the taxable income threshold.</p>
          <p>Employers are legally required to deduct PCB and submit it to LHDN.</p>
        </div>

        <div class="content-card">
          <h2>Who Should Pay PCB</h2>
          <p>PCB applies to employees earning taxable income in Malaysia.</p>
          <p>This includes:</p>
          <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px; color: var(--text-muted); font-size: 0.9rem;">
            <li>Salaried employees</li>
            <li>Individuals with regular monthly income</li>
            <li>Employees above the tax threshold</li>
          </ul>
          <p>Employers are responsible for deducting and submitting PCB.</p>
        </div>

        <div class="content-card">
          <h2>Frequently Asked Questions</h2>
          <h3 style="margin-top: 10px;">What is PCB in Malaysia?</h3>
          <p>PCB is a monthly tax deduction used to pay income tax progressively.</p>
          
          <h3 style="margin-top: 10px;">How is PCB calculated?</h3>
          <p>It is based on salary, EPF, tax reliefs, and tax rates set by LHDN.</p>

          <h3 style="margin-top: 10px;">Is PCB the same as income tax?</h3>
          <p>No. PCB is a monthly deduction, while income tax is annual.</p>

          <h3 style="margin-top: 10px;">Do I still need to file tax?</h3>
          <p>Yes, annual tax filing is still required.</p>

          <h3 style="margin-top: 10px;">What happens if PCB is incorrect?</h3>
          <p>You may need to pay extra tax or receive a refund.</p>
        </div>
      </div>
    </section>

    <!-- Email Capture Modal -->
    <div id="emailModal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 12px; padding: 24px; width: 90%; max-width: 400px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; margin: 0;">Download Report</h3>
          <button type="button" id="closeModalBtn" style="background: none; border: none; cursor: pointer; color: #6b7280;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p style="margin-bottom: 20px; font-size: 0.95rem; color: #4b5563;">Enter your email to receive the PDF report.</p>
        <form id="emailCaptureForm">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Email Address</label>
            <input type="email" id="captureEmail" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; outline: none; transition: border-color 0.2s;" />
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem;">Your Role</label>
            <select id="captureRole" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; outline: none; background: white;">
              <option value="Employee">Employee</option>
              <option value="Employer">Employer</option>
              <option value="Jobseeker">Jobseeker</option>
            </select>
          </div>
          <button type="submit" style="width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer;">Download PDF</button>
        </form>
      </div>
    </div>
`;

// Extract footer
const footMatch = htmlTemplate.match(/(<footer class="footer">[\s\S]*?)<\/body>/);
const foot = footMatch ? footMatch[1] : '';

// Inject TS script for logic
const scriptTags = `
    <script type="module" src="/src/pcb-calculator.ts"></script>
`;

let newHtml = head + pcbHtml + foot + scriptTags + '\n  </body>\n</html>';

// Change active nav
newHtml = newHtml.replace('id="navBtnSalary" class="nav-item active-nav"', 'id="navBtnSalary" class="nav-item"');
newHtml = newHtml.replace('id="mobileNavBtnSalary" class="mobile-nav-item active-nav"', 'id="mobileNavBtnSalary" class="mobile-nav-item"');
// Note we should insert a nav button for PCB just next to SOCSO, but user said "Use existing global navbar" and "Do NOT change anything outside this feature".
// If I change navbar in this page, it's fine as long as I don't modify index.html layout. Wait, I should add the new link to the navbar in this page? The user says "Use existing global navbar". I'll just keep the existing HTML and maybe don't highlight anything, or keep the existing nav. I'll leave the nav content alone.

fs.writeFileSync(path.join(process.cwd(), 'pcb-calculator.html'), newHtml, 'utf8');
console.log('pcb-calculator.html written');
