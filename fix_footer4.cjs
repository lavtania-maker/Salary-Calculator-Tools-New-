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

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the first .footer-col completely
  const regex = /<div class="footer-col">\s*<a href="\/" class="logo"[^>]*>[\s\S]*?<\/a>\s*<p[^>]*>[\s\S]*?<\/p>\s*<div[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<!-- Quick Links -->/g;
  
  const replacement = `<div class="footer-col" style="display: flex; flex-direction: column; align-items: flex-start; max-width: max-content; margin: 0 auto;">
            <a href="/" class="logo" style="margin-bottom: 24px; display: block; align-self: flex-start;">
              <img src="/logo-small.png?v=3" alt="SalaryCalculator.my" referrerpolicy="no-referrer" width="250" height="44" style="height: 44px !important; width: auto !important; max-width: none !important; object-fit: contain; object-position: left center; display: block; margin: 0; padding: 0;">
            </a>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0; text-align: left; padding: 0;">
              Accurate Malaysia salary calculator.<br>
              Instantly calculate take-home pay after EPF, SOCSO, EIS &amp; PCB.
            </p>
            <div style="font-size: 15px; color: #64748b; text-align: left; margin: 0; padding: 0;">
              <p style="margin: 0 0 8px 0; padding: 0;">© 2026 SalaryCalculator.my. All rights reserved.</p>
              <p style="margin: 0; padding: 0;">Data is estimated for reference only</p>
            </div>
          </div>

          <!-- Quick Links -->`;
          
  if (content.match(regex)) {
    content = content.replace(regex, replacement);
  } else {
    console.log(`Regex not matched in ${file}`);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
