import fs from 'fs';

let content = fs.readFileSync('public/robots.txt', 'utf8');

content = content.replace('Disallow: /mincal\n', '');
content = content.replace('Disallow: /payslip\n', '');
content = content.replace('Disallow: /payslip-generator\n', '');

fs.writeFileSync('public/robots.txt', content);
console.log('patched');
