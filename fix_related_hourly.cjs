const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

const relatedGrid = $('.tools-grid');
if (relatedGrid.length) {
  relatedGrid.html(`
    <a href="/" class="tool-card">
      <div class="tool-icon">💰</div>
      <h3>Salary Calculator</h3>
      <p>Calculate your net salary after EPF, SOCSO, EIS, and PCB deductions.</p>
    </a>
    <a href="/overtime-pay-calculator" class="tool-card">
      <div class="tool-icon">⏱️</div>
      <h3>Overtime Calculator</h3>
      <p>Calculate your OT pay based on the Employment Act 1955.</p>
    </a>
    <a href="/epf-kwsp" class="tool-card">
      <div class="tool-icon">🏦</div>
      <h3>EPF Calculator</h3>
      <p>Calculate your Employee Provident Fund contributions accurately.</p>
    </a>
    <a href="/pcb-income-tax" class="tool-card">
      <div class="tool-icon">📝</div>
      <h3>PCB Calculator</h3>
      <p>Estimate your monthly tax deductions accurately for 2024.</p>
    </a>
    <a href="/socso-perkeso" class="tool-card">
      <div class="tool-icon">🛡️</div>
      <h3>SOCSO Calculator</h3>
      <p>Calculate your SOCSO & EIS contributions seamlessly.</p>
    </a>
    <a href="/annual-leave-calculator" class="tool-card">
      <div class="tool-icon">🏖️</div>
      <h3>Annual Leave Calculator</h3>
      <p>Calculate your prorated annual leave entitlement and encashment.</p>
    </a>
    <a href="/employee-cost-calculator" class="tool-card">
      <div class="tool-icon">💼</div>
      <h3>Employee Cost Calculator</h3>
      <p>Calculate the total cost of hiring an employee including statutory contributions.</p>
    </a>
  `);
}

fs.writeFileSync('hourly-rate.html', $.html());
