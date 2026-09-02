const fs = require('fs');

const files = [
  'index.html',
  'epf-kwsp.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'blog.html',
  'blog-post-template.html',
  'privacy-policy.html'
];

const newLeftColumn = `<div class="footer-col" style="max-width: max-content; padding-left: 32px; box-sizing: border-box;">
            <a href="/" class="logo" style="margin-bottom: 16px; display: block;">
              <img src="/logo-small.png?v=3" alt="SalaryCalculator.my" width="250" height="44" style="height: 44px !important; width: auto !important; max-width: none !important; object-fit: contain; object-position: left center; display: block; margin: 0; padding: 0;">
            </a>
            <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
              Accurate Malaysia salary calculator.<br>
              Instantly calculate take-home pay after EPF, SOCSO, EIS &amp; PCB.
            </p>
            <div style="font-size: 15px; color: #64748b; margin: 0;">
              <p style="margin: 0 0 8px 0;">© 2026 SalaryCalculator.my. All rights reserved.</p>
              <p style="margin: 0;">Data is estimated for reference only</p>
            </div>
          </div>`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  const regex = /<div class="footer-col" style="display: flex; flex-direction: column;[\s\S]*?<\/div>\s*<!-- Quick Links -->/g;
  
  if (content.match(regex)) {
    content = content.replace(regex, `${newLeftColumn}\n\n          <!-- Quick Links -->`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Regex not matched in ${file}`);
  }
});
