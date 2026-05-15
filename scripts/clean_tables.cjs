const fs = require('fs');
let html = fs.readFileSync('epf-kwsp.html', 'utf8');

// Strip inline styles off tr, th, td
html = html.replace(/<tr\s+style="[^"]*">/g, '<tr>');
html = html.replace(/<th\s+style="[^"]*">/g, '<th>');
html = html.replace(/<td\s+style="[^"]*">/g, '<td>');

// Update Official Government Salary Calculators section to be matched better in structure
const calcRegex = /<div class="content-card" style="margin-bottom: 32px; padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba\(0, 0, 0, 0\.05\);">\s*<h2 style="[^"]*">\s*Official Government Salary Calculators\s*<\/h2>/;

// It's already restyled, wait, I just need to remove table styles
fs.writeFileSync('epf-kwsp.html', html);
console.log('Done.')
