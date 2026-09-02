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
  'privacy-policy.html',
  'hourly-rate.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // We want to strictly capture the first .footer-col up to Quick Links
  const regex = /<div class="footer-col" [^>]*>[\s\S]*?<!-- Quick Links -->/g;
  
  const newColumn = `<div class="footer-col" style="max-width: max-content; padding-left: 32px; box-sizing: border-box; display: flex; flex-direction: column;">
            <a href="/" class="logo" style="margin-bottom: 16px; display: block; order: 1;">
              <img src="/logo-small.png?v=99" alt="SalaryCalculator.my" width="250" height="44" style="height: 44px !important; width: auto !important; max-width: none !important; object-fit: contain; object-position: left center; display: block; margin: 0; padding: 0;">
            </a>
            <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; order: 2;" data-i18n="accurate_malaysia_salary_calculator_inst_0c4a26">
              Accurate Malaysia salary calculator.<br>
              Instantly calculate take-home pay after EPF, SOCSO, EIS &amp; PCB.
            </p>
            <div style="font-size: 15px; color: #64748b; margin: 0; order: 3;">
              <p style="margin: 0 0 8px 0;" data-i18n="_2026_salarycalculatormy_all_rights_rese_2ead1b">© 2026 SalaryCalculator.my. All rights reserved.</p>
              <p style="margin: 0;" data-i18n="data_is_estimated_for_reference_only_e819d1">Data is estimated for reference only</p>
            </div>
          </div>
          <!-- Quick Links -->`;
          
  if (content.match(regex)) {
    content = content.replace(regex, newColumn);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Regex not matched in ${file}`);
  }
});
