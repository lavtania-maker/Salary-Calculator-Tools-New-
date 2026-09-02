const fs = require('fs');
const glob = require('glob');

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
  content = content.replace(/src="\/logo-small\.png"/g, 'src="/logo-small.png?v=2"');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
