const fs = require('fs');
const cheerio = require('cheerio');

const htmlFiles = [
  { file: 'index.html', route: '/ms/' },
  { file: 'epf-kwsp.html', route: '/ms/kalkulator-epf' },
  { file: 'socso-perkeso.html', route: '/ms/kalkulator-socso' },
  { file: 'pcb-income-tax.html', route: '/ms/kalkulator-pcb' },
  { file: 'annual-leave-calculator.html', route: '/ms/kalkulator-cuti-tahunan' },
  { file: 'overtime-pay-calculator.html', route: '/ms/kalkulator-overtime' },
  { file: 'hourly-rate.html', route: '/ms/kadar-gaji-sejam' },
  { file: 'mincal.html', route: '/ms/kalkulator-gaji-minimum' },
  { file: 'payslip.html', route: '/ms/penjana-payslip' },
  { file: 'privacy-policy.html', route: '/ms/dasar-privasi' },
];

const msJson = JSON.parse(fs.readFileSync('locales/ms.json', 'utf8'));

htmlFiles.forEach(({ file, route }) => {
  const content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content);
  
  const untranslatedDataI18n = [];
  const missingDataI18n = [];
  
  $('[data-i18n]').each((_, el) => {
    const key = $(el).attr('data-i18n');
    if (!msJson[key]) {
      untranslatedDataI18n.push({ key, text: $(el).text().trim().substring(0, 40) });
    }
  });
  
  const nonI18nNodes = [];
  $('h1, h2, h3, p, summary, label, button, li').each((_, el) => {
    if (!$(el).attr('data-i18n') && $(el).children().length === 0) {
      const t = $(el).text().trim();
      if (t && t.length > 5 && !t.includes('©') && !t.includes('RM') && !t.match(/^\d+$/)) {
        nonI18nNodes.push(t.substring(0, 60));
      }
    }
  });
  
  console.log(`\n========================================`);
  console.log(`FILE: ${file} for ${route}`);
  console.log(`Total [data-i18n] tags: ${$('[data-i18n]').length}`);
  console.log(`Missing [data-i18n] keys in ms.json: ${untranslatedDataI18n.length}`);
  if (untranslatedDataI18n.length > 0) {
    console.log(`  Sample missing keys:`, untranslatedDataI18n.slice(0, 5));
  }
  console.log(`Elements WITHOUT data-i18n: ${nonI18nNodes.length}`);
  if (nonI18nNodes.length > 0) {
    console.log(`  Sample non-i18n elements:`, nonI18nNodes.slice(0, 5));
  }
});
