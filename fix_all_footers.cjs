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

const standardFooterGrid = `<div class="footer-grid">
          <!-- Logo + Description -->
          <div class="footer-col" style="display: flex; flex-direction: column; align-items: flex-start; max-width: max-content; margin: 0 auto;">
            <a href="/" class="logo" style="margin-bottom: 20px; display: block; align-self: flex-start;">
              <img src="/logo-small.png?v=3" alt="SalaryCalculator.my" referrerpolicy="no-referrer" width="250" height="44" style="height: 44px !important; width: auto !important; max-width: none !important; object-fit: contain; object-position: left center; display: block; margin: 0; padding: 0;">
            </a>
            <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0; text-align: left; padding: 0;">
              Accurate Malaysia salary calculator.<br>
              Instantly calculate take-home pay after EPF, SOCSO, EIS &amp; PCB.
            </p>
            <div style="font-size: 15px; color: #64748b; text-align: left; margin: 0; padding: 0; align-self: flex-start;">
              <p style="margin: 0 0 8px 0; padding: 0;">© 2026 SalaryCalculator.my. All rights reserved.</p>
              <p style="margin: 0; padding: 0;">Data is estimated for reference only</p>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col footer-col-links">
            <h4>Quick Links</h4>
            <a href="/" class="footer-link">Salary Calculator</a>
            <a href="/socso-perkeso" class="footer-link">SOCSO Calculator</a>
            <a href="/pcb-income-tax" class="footer-link">PCB Calculator</a>
            <a href="/epf-kwsp" class="footer-link">EPF Calculator</a>
            <a href="/annual-leave-calculator" class="footer-link">Annual Leave Calculator</a>
            <a href="/overtime-pay-calculator" class="footer-link">Overtime Pay Calculator</a>
            <a href="/blog" class="footer-link">Blog</a>
            <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
          </div>
        </div>`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Try to match the existing footer grid
  const regex = /<div class="footer-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/g;
  
  if (content.match(regex)) {
    content = content.replace(regex, `${standardFooterGrid}\n      </div>\n    </footer>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    // maybe one less </div> or different whitespace? Let's just match footer-grid up to the end of it
    const regex2 = /<div class="footer-grid">[\s\S]*?(?=<\/div>\s*<\/footer>|<\/div>\s*<\/div>\s*<\/footer>)/;
    const match = content.match(regex2);
    if(match) {
        content = content.replace(regex2, standardFooterGrid);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated with fallback regex: ${file}`);
    } else {
        console.log(`Regex not matched in ${file}`);
    }
  }
});
