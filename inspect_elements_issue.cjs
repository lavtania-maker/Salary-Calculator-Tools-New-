const fs = require('fs');
const cheerio = require('cheerio');

const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));

// Check socso-perkeso.html
const html = fs.readFileSync('socso-perkeso.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- SOCSO H2s in raw file:');
$('h2').each((i, el) => {
  const i18n = $(el).attr('data-i18n');
  const text = $(el).text().trim();
  console.log(`H2 #${i}: "${text}" | data-i18n="${i18n}" | msJson[${i18n}]="${msJson[i18n] ? msJson[i18n].substring(0, 40) : 'MISSING'}"`);
});

// Check FAQs in all files
console.log('\n--- Checking FAQs in index.html, socso, epf, pcb, etc:');
const files = ['index.html', 'epf-kwsp.html', 'socso-perkeso.html', 'pcb-income-tax.html', 'annual-leave-calculator.html', 'overtime-pay-calculator.html', 'hourly-rate.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const $f = cheerio.load(content);
  console.log(`\nFILE: ${f}`);
  $f('details, .faq-item, .faq-card, .faq-accordion, summary').each((i, el) => {
    const i18n = $f(el).attr('data-i18n');
    console.log(`  FAQ el tag=${el.tagName} data-i18n=${i18n} text="${$f(el).text().trim().substring(0, 40)}"`);
  });
});
