const http = require('http');
const cheerio = require('cheerio');

const pages = [
  { url: '/ms/', name: 'Home / Salary' },
  { url: '/ms/kalkulator-epf', name: 'EPF' },
  { url: '/ms/kalkulator-socso', name: 'SOCSO' },
  { url: '/ms/kalkulator-pcb', name: 'PCB' },
  { url: '/ms/kalkulator-cuti-tahunan', name: 'Annual Leave' },
  { url: '/ms/kalkulator-overtime', name: 'Overtime' },
  { url: '/ms/kadar-gaji-sejam', name: 'Hourly Rate' },
  { url: '/ms/kalkulator-gaji-minimum', name: 'Min Wage' },
  { url: '/ms/penjana-payslip', name: 'Payslip' },
  { url: '/ms/dasar-privasi', name: 'Privacy Policy' }
];

async function checkPage(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, length: data.length, html: data });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  for (const p of pages) {
    const res = await checkPage(p.url);
    if (res.error) {
      console.log(`[FAIL] ${p.url}: ${res.error}`);
      continue;
    }
    const $ = cheerio.load(res.html);
    
    console.log(`\n========================================`);
    console.log(`PAGE: ${p.name} (${p.url}) [Status ${res.statusCode}]`);
    console.log(`Title: ${$('title').text()}`);
    console.log(`Meta Desc: ${$('meta[name="description"]').attr('content')}`);
    console.log(`Canonical: ${$('link[rel="canonical"]').attr('href')}`);
    console.log(`H1: ${$('h1').text().trim().replace(/\s+/g, ' ')}`);
    console.log(`H2s (${$('h2').length}):`, $('h2').map((i, el) => $(el).text().trim().replace(/\s+/g, ' ')).get().slice(0, 5));
    console.log(`Nav items:`, $('.nav-item, .mobile-nav-item').map((i, el) => $(el).text().trim()).get().slice(0, 6));
    
    // Check if there are English words in paragraphs or headings
    const paragraphs = $('p, h2, h3, li, th, td, summary, label').map((i, el) => $(el).text().trim()).get();
    
    // Look for common English phrases that might indicate untranslated content
    const englishIndicators = [
      'Calculate', 'Contributions', 'Gross Monthly Salary', 'Take Home Pay',
      'Frequently Asked Questions', 'What is', 'How to calculate', 'Statutory',
      'Deductions', 'Employer', 'Employee', 'Overview', 'Understanding',
      'Table', 'Rates', 'Guide', 'Free Tools', 'Salary Calculator'
    ];
    
    const untranslatedMatches = [];
    paragraphs.forEach(text => {
      if (text.length > 5 && !text.includes('SalaryCalculator.my')) {
        for (const ind of englishIndicators) {
          if (text.includes(ind) && !untranslatedMatches.includes(text.substring(0, 60))) {
            untranslatedMatches.push(text.substring(0, 60));
          }
        }
      }
    });
    
    console.log(`Potential untranslated sample text count: ${untranslatedMatches.length}`);
    if (untranslatedMatches.length > 0) {
      console.log(`Samples:`, untranslatedMatches.slice(0, 4));
    }
  }
}

run();
