import fs from 'fs';

const files = ['index.html', 'pcb-calculator.html', 'epf-kwsp.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix PCB calculator card-header-flex
  content = content.replace(/<div class="card-header-flex">\s*<div class="icon-circle">(.*?)<\/div>\s*<h2>(.*?)<\/h2>\s*<\/div>/g, '<h2><span>$1</span> $2</h2>');

  // Fix EPF calculator section-title-wrap
  // EPF doesn't have icons, just an accent line. We can give them standard icons.
  content = content.replace(/<div class="section-title-wrap">\s*<div class="section-accent"><\/div>\s*<h2>What is EPF \(KWSP\)\?<\/h2>\s*<\/div>/g, '<h2><span>🏛️</span> What is EPF (KWSP)?</h2>');
  content = content.replace(/<div class="section-title-wrap">\s*<div class="section-accent"><\/div>\s*<h2>How EPF Works in Malaysia<\/h2>\s*<\/div>/g, '<h2><span>⚙️</span> How EPF Works in Malaysia</h2>');
  content = content.replace(/<div class="section-title-wrap">\s*<div class="section-accent"><\/div>\s*<h2>How to Calculate EPF Contribution<\/h2>\s*<\/div>/g, '<h2><span>🧮</span> How to Calculate EPF Contribution</h2>');
  content = content.replace(/<div class="section-title-wrap">\s*<div class="section-accent"><\/div>\s*<h2>EPF Contribution Table \(2026 Updated\)<\/h2>\s*<\/div>/g, '<h2><span>📊</span> EPF Contribution Table (2026 Updated)</h2>');
  content = content.replace(/<div class="section-title-wrap">\s*<div class="section-accent"><\/div>\s*<h2>Legal & Compliance<\/h2>\s*<\/div>/g, '<h2><span>⚖️</span> Legal & Compliance</h2>');

  // Fix index.html SOCSO
  content = content.replace(/<h2[^>]*>\s*What is SOCSO \(PERKESO\)\?\s*<\/h2>/g, '<h2><span>🛡️</span> What is SOCSO (PERKESO)?</h2>');
  content = content.replace(/<h2[^>]*>\s*How SOCSO Works\s*<\/h2>/g, '<h2><span>⚙️</span> How SOCSO Works</h2>');
  content = content.replace(/<h2[^>]*>\s*How to Calculate SOCSO Contribution\s*<\/h2>/g, '<h2><span>🧮</span> How to Calculate SOCSO Contribution</h2>');
  content = content.replace(/<div class="content-card">\s*<h2[^>]*>\s*SOCSO Contribution Table \(2026 Updated\)\s*<\/h2>/g, '<div class="content-card">\n          <h2><span>📊</span> SOCSO Contribution Table (2026 Updated)</h2>');
  content = content.replace(/<h2[^>]*>\s*Official SOCSO Calculator\s*<\/h2>/g, '<h2><span>🏛️</span> Official SOCSO Calculator</h2>');

  // Also replace h3 inline styles inside the SEO sections
  content = content.replace(/<h3[^>]*>/g, '<h3>');

  fs.writeFileSync(file, content, 'utf8');
});
