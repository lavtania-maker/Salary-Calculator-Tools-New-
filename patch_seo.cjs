const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetContent = `    <section class="content-section" id="salarySeoContent">
      <div class="container">`;

const replaceContent = `    <section class="content-section" id="salarySeoContent">
      <div class="container">
        <!-- New SEO Section 1: Salary Reference Table -->
        <div class="seo-card">
          <h2 class="seo-title">
            Monthly Salary Breakdown – Quick Reference (2026)
          </h2>
          <p class="seo-subtitle" style="text-align: left; margin-bottom: 20px;">
            Not sure how much you'll take home each month? Use this
            quick reference table to see estimated deductions and net
            pay for common salary levels in Malaysia. All figures are
            based on 2026 official rates for a single Malaysian citizen
            under 55 years old, with standard individual relief only.
          </p>
          <div class="seo-table-wrapper" style="margin-bottom: 16px;">
            <table class="seo-table">
              <thead>
                <tr>
                  <th>Monthly Salary</th>
                  <th>EPF (11%)</th>
                  <th>SOCSO</th>
                  <th>EIS</th>
                  <th>PCB</th>
                  <th>Take Home</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RM 2,000</td>
                  <td>RM 220.00</td>
                  <td>RM 3.00</td>
                  <td>RM 4.00</td>
                  <td>RM 0.00</td>
                  <td>RM 1,773.00</td>
                </tr>
                <tr>
                  <td>RM 3,000</td>
                  <td>RM 330.00</td>
                  <td>RM 4.50</td>
                  <td>RM 6.00</td>
                  <td>RM 0.00</td>
                  <td>RM 2,659.50</td>
                </tr>
                <tr>
                  <td>RM 5,000</td>
                  <td>RM 550.00</td>
                  <td>RM 7.50</td>
                  <td>RM 10.00</td>
                  <td>RM 97.00</td>
                  <td>RM 4,335.50</td>
                </tr>
                <tr>
                  <td>RM 8,000</td>
                  <td>RM 880.00</td>
                  <td>RM 9.00</td>
                  <td>RM 12.00</td>
                  <td>RM 410.30</td>
                  <td>RM 6,688.70</td>
                </tr>
                <tr>
                  <td>RM 10,000</td>
                  <td>RM 1,100.00</td>
                  <td>RM 9.00</td>
                  <td>RM 12.00</td>
                  <td>RM 748.50</td>
                  <td>RM 8,130.50</td>
                </tr>
                <tr>
                  <td>RM 15,000</td>
                  <td>RM 1,650.00</td>
                  <td>RM 9.00</td>
                  <td>RM 12.00</td>
                  <td>RM 1,850.00</td>
                  <td>RM 11,479.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="color: var(--text-muted, #64748b); font-size: 0.95rem; line-height: 1.6;">
            SOCSO and EIS are capped at RM6,000 salary ceiling.
            PCB amounts below RM10 are shown as RM0 per LHDN rules.
            Figures are estimates — use the calculator above for
            your exact numbers.
          </p>
        </div>

        <!-- New SEO Section 2: Step-by-Step Calculation Example -->
        <div class="seo-card">
          <h2 class="seo-title">
            How Your Salary is Calculated – RM5,000 Example
          </h2>
          <p class="seo-subtitle" style="text-align: left; margin-bottom: 24px;">
            Want to understand exactly what gets deducted from your
            payslip? Here is a real example using a gross monthly salary
            of RM5,000, calculated using 2026 official government rates.
            This example applies to a single Malaysian citizen under
            55 years old.
          </p>
          
          <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 12px; font-weight: 600;">What Gets Deducted From You (Employee)</h3>
          <div class="seo-table-wrapper" style="margin-bottom: 24px;">
            <table class="seo-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Calculation</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gross Monthly Salary</td>
                  <td>—</td>
                  <td>RM 5,000.00</td>
                </tr>
                <tr>
                  <td>EPF</td>
                  <td>11% of RM5,000</td>
                  <td>- RM 550.00</td>
                </tr>
                <tr>
                  <td>SOCSO</td>
                  <td>Official PERKESO table</td>
                  <td>- RM 7.50</td>
                </tr>
                <tr>
                  <td>EIS</td>
                  <td>Official PERKESO table</td>
                  <td>- RM 10.00</td>
                </tr>
                <tr>
                  <td>PCB (Tax)</td>
                  <td>Progressive rate</td>
                  <td>- RM 97.00</td>
                </tr>
                <tr style="font-weight: 600; background-color: rgba(0,0,0,0.03);">
                  <td>Take Home Pay</td>
                  <td></td>
                  <td>RM 4,335.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 12px; font-weight: 600;">What Your Employer Pays On Top</h3>
          <div class="seo-table-wrapper" style="margin-bottom: 16px;">
            <table class="seo-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Calculation</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EPF Employer</td>
                  <td>13% of RM5,000</td>
                  <td>+ RM 650.00</td>
                </tr>
                <tr>
                  <td>SOCSO Employer</td>
                  <td>Official PERKESO table</td>
                  <td>+ RM 70.25</td>
                </tr>
                <tr>
                  <td>EIS Employer</td>
                  <td>Same as employee rate</td>
                  <td>+ RM 10.00</td>
                </tr>
                <tr style="font-weight: 600; background-color: rgba(0,0,0,0.03);">
                  <td>Total Cost to Employer</td>
                  <td></td>
                  <td>RM 5,730.25</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="color: var(--text-muted, #64748b); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Your employer pays an extra RM730.25 on top of your salary
            every month — this never appears on your payslip but is the
            real cost of hiring you.
          </p>

          <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 12px; font-weight: 600;">How PCB RM97.00 Was Worked Out</h3>
          <ol style="color: var(--text-light, #334155); line-height: 1.8; margin-left: 20px; font-size: 0.95rem; margin-bottom: 0;">
            <li>Monthly salary after EPF: RM5,000 − RM550 = RM4,450</li>
            <li>Annualise it: RM4,450 × 12 = RM53,400</li>
            <li>Deduct individual relief: RM53,400 − RM9,000 = RM44,400 taxable income</li>
            <li>Tax on first RM5,000: 0% = RM0</li>
            <li>Tax on next RM15,000: 1% = RM150</li>
            <li>Tax on next RM15,000: 3% = RM450</li>
            <li>Tax on remaining RM9,400: 6% = RM564</li>
            <li>Total annual tax: RM1,164 ÷ 12 = RM97.00/month</li>
          </ol>
        </div>

        <!-- New SEO Section 3: Understanding Your Deductions -->
        <div class="seo-card">
          <h2 class="seo-title">
            Understanding Your Monthly Deductions
          </h2>
          <p class="seo-subtitle" style="text-align: left; margin-bottom: 24px;">
            Every Malaysian employee's payslip has the same four
            statutory deductions. Here is what each one means, who
            manages it, and how it affects your take-home pay.
          </p>
          
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 8px; font-weight: 600;">EPF – Employees Provident Fund (KWSP)</h3>
            <p style="color: var(--text-light, #334155); line-height: 1.6; font-size: 0.95rem; margin: 0;">
              EPF is your mandatory retirement savings, managed by KWSP
              (Kumpulan Wang Simpanan Pekerja). Every month, a portion of
              your salary is set aside so you have savings when you retire.
              The standard employee contribution is 11% of your gross salary.
              Your employer also contributes an additional 13% (for salaries
              up to RM5,000) or 12% (above RM5,000) — separate from your
              salary, not deducted from it. Employees aged 55–60 contribute
              a reduced rate of 5.5%, while those above 60 may opt out
              entirely. Non-citizens contribute 2% starting from 2025.
            </p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 8px; font-weight: 600;">SOCSO – Social Security Organisation (PERKESO)</h3>
            <p style="color: var(--text-light, #334155); line-height: 1.6; font-size: 0.95rem; margin: 0;">
              SOCSO is your social security protection, managed by PERKESO.
              It covers you if you suffer a work-related injury or develop a
              disability. Contributions follow an official table based on your
              salary bracket, with a ceiling of RM6,000 per month (updated
              October 2024). Employees under 60 years old are required to
              contribute. Both you and your employer contribute, with the
              employer paying the larger share.
            </p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 8px; font-weight: 600;">EIS – Employment Insurance System (PERKESO)</h3>
            <p style="color: var(--text-light, #334155); line-height: 1.6; font-size: 0.95rem; margin: 0;">
              EIS is also managed by PERKESO and acts as a financial safety
              net if you lose your job due to retrenchment or redundancy.
              It provides temporary income replacement and job placement
              support while you look for new work. Contributions follow a
              table-based rate of approximately 0.2% each for employee and
              employer, with the same RM6,000 ceiling as SOCSO. EIS applies
              to employees aged 18 to 60.
            </p>
          </div>

          <div style="margin-bottom: 12px;">
            <h3 style="font-size: 1.1rem; color: var(--text-main, #0f172a); margin-bottom: 8px; font-weight: 600;">PCB – Monthly Tax Deduction (LHDN)</h3>
            <p style="color: var(--text-light, #334155); line-height: 1.6; font-size: 0.95rem; margin: 0;">
              PCB stands for Potongan Cukai Bulanan — your monthly income
              tax deduction managed by LHDN (Lembaga Hasil Dalam Negeri).
              Instead of paying a lump sum at year-end, PCB spreads your
              tax across 12 monthly deductions. The rate is progressive,
              from 0% to 30% depending on your annual income. Tax residents
              (182+ days in Malaysia per year) enjoy lower progressive rates,
              while non-residents pay a flat 30%. Reliefs including individual
              relief (RM9,000), spouse, and child relief can reduce your
              taxable income and lower your PCB amount.
            </p>
          </div>
        </div>

        <!-- New SEO Section 4: FAQ -->
        <div class="seo-card">
          <h2 class="seo-title">Frequently Asked Questions</h2>
          <style>
            .faq-item {
              border-bottom: 1px solid var(--border-color, #e2e8f0);
              padding: 16px 0;
            }
            .faq-item:last-child {
              border-bottom: none;
            }
            .faq-question {
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              font-weight: 600;
              color: var(--text-main, #0f172a);
              font-size: 1.05rem;
              margin: 0;
              user-select: none;
            }
            .faq-icon {
              transition: transform 0.3s ease;
              font-size: 1.2rem;
              color: var(--text-muted, #64748b);
            }
            .faq-item.active .faq-icon {
              transform: rotate(45deg);
            }
            .faq-answer {
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.3s ease;
              color: var(--text-light, #334155);
              line-height: 1.6;
              font-size: 0.95rem;
            }
            .faq-answer p {
              margin: 12px 0 0 0;
            }
          </style>
          
          <div class="faq-accordion">
            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">How accurate are these calculations? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>All calculations are based on the latest 2026 official rates published by KWSP (EPF), PERKESO (SOCSO and EIS), and LHDN (PCB tax). We follow the exact contribution tables and tax formulas used by these government bodies. Results are estimates — your actual payslip may differ slightly due to additional reliefs, allowances, or employer-specific policies.</p></div>
            </div>
            
            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">Is my salary data saved anywhere? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>No. Every calculation runs entirely in your browser. We do not store, collect, or share any information you enter. Your salary details remain completely private.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">What should I enter as gross salary? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>Gross salary is your base pay plus any fixed monthly allowances such as transport, housing, or meal allowances — before any deductions. Do not include one-off bonuses or overtime unless paid every month. For bonus calculations, use the Bonus/Allowance field provided.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">Why is my PCB showing RM0? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>PCB only applies once your monthly income after EPF exceeds RM2,851 (single) or RM3,851 (married). If your salary is below these thresholds, no monthly tax is deducted. You may still need to file a tax return with LHDN even if PCB is RM0.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">Why does SOCSO stop at RM6,000? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>SOCSO and EIS contributions are capped at RM6,000 per month. Anyone earning above RM6,000 pays the same fixed maximum as someone earning exactly RM6,000. The ceiling was raised from RM5,000 to RM6,000 in October 2024.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">Does this calculator work for foreigners? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>Yes. Select Foreigner under Nationality. Foreign employees contribute EPF at 2% (from 2025 onwards). PCB for non-residents is charged at a flat 30% rate.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">How often are the rates updated? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>We review and update all rates every January when the new tax year begins. Any mid-year government changes — such as the SOCSO ceiling update in October 2024 — are applied as soon as they take effect.</p></div>
            </div>

            <div class="faq-item" onclick="this.classList.toggle('active'); const ans = this.querySelector('.faq-answer'); ans.style.maxHeight = this.classList.contains('active') ? ans.scrollHeight + 'px' : '0'">
              <h3 class="faq-question">What is the difference between employee and employer contributions? <span class="faq-icon">+</span></h3>
              <div class="faq-answer"><p>Employee contributions are deducted from your gross salary and reduce your take-home pay. Employer contributions are paid separately by your company and do not reduce what you receive — but they represent the true total cost of employing you.</p></div>
            </div>
          </div>
        </div>`;

if(html.indexOf(targetContent) !== -1) {
  html = html.replace(targetContent, replaceContent);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Successfully injected new SEO sections");
} else {
  console.error("Target content not found. Check if the string matches.");
}
