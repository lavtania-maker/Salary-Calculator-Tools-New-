const fs = require('fs');

const files = [
  'index.html',
  'epf-kwsp.html',
  'pcb-income-tax.html',
  'socso-perkeso.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html'
];

const newCard = `
      <a href="/overtime-pay-calculator" class="calc-card hover-lift" style="padding: 24px; border: 1px solid #fcd34d; border-radius: 12px; background: #fffbeb; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s; display: block;">
        <div style="background: #fde68a; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3 style="color: #b45309; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">Overtime Pay Calculator</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">Calculate OT pay according to the Malaysian Employment Act.</p>
      </a>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('href="/overtime-pay-calculator"')) continue;

  const insertIndex = content.lastIndexOf('</div>\n  </div>\n </section>');
  if (insertIndex > -1) {
    content = content.substring(0, insertIndex) + newCard + '\n    ' + content.substring(insertIndex);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
