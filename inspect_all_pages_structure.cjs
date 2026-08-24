const fs = require('fs');
const cheerio = require('cheerio');

const pages = [
  { file: 'index.html', route: '/ms/', name: 'Home' },
  { file: 'epf-kwsp.html', route: '/ms/kalkulator-epf', name: 'EPF' },
  { file: 'socso-perkeso.html', route: '/ms/kalkulator-socso', name: 'SOCSO' },
  { file: 'pcb-income-tax.html', route: '/ms/kalkulator-pcb', name: 'PCB' },
  { file: 'annual-leave-calculator.html', route: '/ms/kalkulator-cuti-tahunan', name: 'Annual Leave' },
  { file: 'overtime-pay-calculator.html', route: '/ms/kalkulator-overtime', name: 'Overtime' },
  { file: 'hourly-rate.html', route: '/ms/kadar-gaji-sejam', name: 'Hourly' },
  { file: 'mincal.html', route: '/ms/kalkulator-gaji-minimum', name: 'Mincal' },
  { file: 'payslip.html', route: '/ms/penjana-payslip', name: 'Payslip' },
  { file: 'privacy-policy.html', route: '/ms/dasar-privasi', name: 'Privacy' }
];

const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));

pages.forEach(p => {
  const content = fs.readFileSync(p.file, 'utf8');
  const $ = cheerio.load(content);
  
  // Find all text elements without data-i18n
  const missingI18n = [];
  $('h1, h2, h3, h4, p, summary, label, button, a, th, td, li, span, div').each((i, el) => {
    // Only look at elements where this is leaf or direct text
    const hasI18n = $(el).attr('data-i18n');
    const parentI18n = $(el).parents('[data-i18n]').length > 0;
    if (!hasI18n && !parentI18n) {
      // Check if element has direct text content
      const directText = $(el).clone().children().remove().end().text().trim();
      if (directText.length > 3 && !directText.match(/^(RM|\d+|[0-9.,%+\-–—/:]+|©.*)$/i) && !directText.includes('SalaryCalculator.my')) {
        missingI18n.push({ tag: el.tagName, text: directText });
      }
    }
  });
  
  console.log(`\n=============================`);
  console.log(`Page ${p.name} (${p.file}) -> Missing i18n direct text count: ${missingI18n.length}`);
  // Deduplicate by text
  const uniqueMissing = [];
  const seen = new Set();
  missingI18n.forEach(m => {
    if (!seen.has(m.text)) {
      seen.add(m.text);
      uniqueMissing.push(m);
    }
  });
  console.log(`Unique missing: ${uniqueMissing.length}`);
  uniqueMissing.slice(0, 15).forEach(m => {
    console.log(`  <${m.tag}>: "${m.text.substring(0, 70)}"`);
  });
});
