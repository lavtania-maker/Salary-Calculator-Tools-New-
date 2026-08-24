const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'index.html',
  'epf-kwsp.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'annual-leave-calculator.html',
  'overtime-pay-calculator.html',
  'hourly-rate.html'
];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const $ = cheerio.load(html);
  console.log(`\n================================`);
  console.log(`FILE: ${f}`);
  $('details').each((i, el) => {
    const summary = $(el).find('summary').text().trim();
    const body = $(el).find('div, p').text().trim();
    console.log(`FAQ #${i+1}:`);
    console.log(`  Q: "${summary}"`);
    console.log(`  A: "${body.substring(0, 80)}..."`);
  });
});
