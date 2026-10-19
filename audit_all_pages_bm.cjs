const fs = require('fs');
const cheerio = require('cheerio');
const http = require('http');

const pages = [
  { url: '/ms/', name: 'Salary Calculator' },
  { url: '/ms/kalkulator-epf', name: 'EPF Calculator' },
  { url: '/ms/kalkulator-socso', name: 'SOCSO Calculator' },
  { url: '/ms/kalkulator-pcb', name: 'PCB Calculator' },
  { url: '/ms/kalkulator-cuti-tahunan', name: 'Annual Leave Calculator' },
  { url: '/ms/kalkulator-overtime', name: 'Overtime Calculator' },
  { url: '/ms/kadar-gaji-sejam', name: 'Hourly Rate Calculator' },
  { url: '/ms/kalkulator-gaji-minimum', name: 'Minimum Wage Calculator' },
  { url: '/ms/penjana-payslip', name: 'Payslip Generator' },
  { url: '/ms/dasar-privasi', name: 'Privacy Policy' }
];

async function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:3000' + urlPath, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Auditing all 10 BM pages...\n');
  let totalIssues = 0;

  for (const p of pages) {
    try {
      const res = await fetchPage(p.url);
      const $ = cheerio.load(res.body);
      const title = $('title').text();
      const h1 = $('h1').first().text().trim();
      const canonical = $('link[rel="canonical"]').attr('href');
      const lang = $('html').attr('lang');
      const hreflangs = [];
      $('link[rel="alternate"]').each((_, el) => hreflangs.push(`${$(el).attr('hreflang')}: ${$(el).attr('href')}`));

      console.log(`=== ${p.name} (${p.url}) [Status: ${res.status}] ===`);
      console.log(`Lang: ${lang} | Title: ${title}`);
      console.log(`H1: ${h1}`);
      console.log(`Canonical: ${canonical}`);
      console.log(`Hreflangs: ${hreflangs.join(' | ')}`);

      // Check h2 headings
      const h2s = [];
      $('h2').each((_, el) => h2s.push($(el).text().trim()));
      console.log(`H2s (${h2s.length}):`);
      h2s.forEach(h => console.log(`  - ${h}`));

      // Check FAQs
      const faqs = [];
      $('summary').each((_, el) => faqs.push($(el).text().trim()));
      if (faqs.length > 0) {
        console.log(`FAQs (${faqs.length}):`);
        faqs.slice(0, 3).forEach(f => console.log(`  - ${f}`));
      }
      console.log('\n');
    } catch (e) {
      console.error(`Error auditing ${p.url}:`, e.message);
      totalIssues++;
    }
  }
}

run();
