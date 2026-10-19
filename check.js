const fs = require('fs');
const html = fs.readFileSync('dist/blog/how-to-calculate-pcb-monthly-tax-deduction-in-malaysia-formula-example.html', 'utf8');
console.log(html.includes('!important'));
