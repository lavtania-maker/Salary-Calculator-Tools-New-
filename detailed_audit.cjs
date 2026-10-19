const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');

const pages = [
  { url: '/ms/', name: 'Home' },
  { url: '/ms/kalkulator-epf', name: 'EPF' },
  { url: '/ms/kalkulator-socso', name: 'SOCSO' },
  { url: '/ms/kalkulator-pcb', name: 'PCB' },
  { url: '/ms/kalkulator-cuti-tahunan', name: 'Annual Leave' },
  { url: '/ms/kalkulator-overtime', name: 'Overtime' },
  { url: '/ms/kadar-gaji-sejam', name: 'Hourly Rate' },
  { url: '/ms/kalkulator-gaji-minimum', name: 'Mincal' },
  { url: '/ms/penjana-payslip', name: 'Payslip' },
  { url: '/ms/dasar-privasi', name: 'Privacy Policy' }
];

async function fetchPage(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => resolve(''));
  });
}

// Common English words/patterns to detect
const englishPatterns = [
  /\bCalculate\b/i, /\bContribution\b/i, /\bEmployer\b/i, /\bEmployee\b/i,
  /\bGross Monthly Salary\b/i, /\bFrequently Asked Questions\b/i,
  /\bWhat is\b/i, /\bHow to calculate\b/i, /\bUnderstanding\b/i,
  /\bAnnual Leave\b/i, /\bOvertime Pay\b/i, /\bHourly Rate\b/i,
  /\bMinimum Wage\b/i, /\bTake Home Pay\b/i, /\bDeductions\b/i,
  /\bTaxable Income\b/i, /\bRelief\b/i, /\bBasic Salary\b/i,
  /\bPublic Holiday\b/i, /\bRest Day\b/i, /\bWorking Days\b/i
];

async function run() {
  const report = {};

  for (const p of pages) {
    const html = await fetchPage(p.url);
    const $ = cheerio.load(html);
    
    // Check title, meta description, canonical, hreflang, h1, nav, footer, breadcrumbs, content
    const pageReport = {
      title: $('title').text(),
      metaDesc: $('meta[name="description"]').attr('content'),
      canonical: $('link[rel="canonical"]').attr('href'),
      hreflangs: $('link[rel="alternate"]').map((i, el) => `${$(el).attr('hreflang')}:${$(el).attr('href')}`).get(),
      h1: $('h1').text().trim().replace(/\s+/g, ' '),
      navLinks: $('.nav-item, .mobile-nav-item, nav a').map((i, el) => `${$(el).text().trim()} -> ${$(el).attr('href')}`).get().slice(0, 10),
      footerLinks: $('.footer a, footer a').map((i, el) => `${$(el).text().trim()} -> ${$(el).attr('href')}`).get().slice(0, 10),
      breadcrumbs: $('.breadcrumb, .breadcrumbs, [aria-label="breadcrumb"]').text().trim().replace(/\s+/g, ' '),
      untranslatedElements: []
    };

    // Find all visible text elements that match English patterns
    $('h1, h2, h3, h4, h5, h6, p, li, summary, td, th, label, button, .faq-answer, span, div').each((i, el) => {
      // Check leaf or shallow text
      const directText = $(el).clone().children().remove().end().text().trim().replace(/\s+/g, ' ');
      const fullText = $(el).text().trim().replace(/\s+/g, ' ');
      
      const targetText = directText.length > 5 ? directText : (fullText.length > 5 && $(el).children().length <= 2 ? fullText : '');
      if (targetText && !targetText.includes('SalaryCalculator.my') && !targetText.match(/^[\d\s.,%+-]+$/)) {
        for (const pattern of englishPatterns) {
          if (pattern.test(targetText)) {
            pageReport.untranslatedElements.push({
              tag: el.tagName,
              class: $(el).attr('class') || '',
              id: $(el).attr('id') || '',
              text: targetText.substring(0, 120)
            });
            break;
          }
        }
      }
    });

    // Deduplicate untranslatedElements
    const seen = new Set();
    pageReport.untranslatedElements = pageReport.untranslatedElements.filter(item => {
      if (seen.has(item.text)) return false;
      seen.add(item.text);
      return true;
    });

    report[p.url] = pageReport;
  }

  fs.writeFileSync('detailed_audit_report.json', JSON.stringify(report, null, 2));
  console.log('Audit complete. Saved to detailed_audit_report.json.');
  
  for (const [url, data] of Object.entries(report)) {
    console.log(`\n--------------------------------------------`);
    console.log(`URL: ${url}`);
    console.log(`Title: ${data.title}`);
    console.log(`H1: ${data.h1}`);
    console.log(`Untranslated Count: ${data.untranslatedElements.length}`);
    if (data.untranslatedElements.length > 0) {
      console.log('Sample untranslated items:');
      data.untranslatedElements.slice(0, 10).forEach((item, idx) => {
        console.log(`  ${idx+1}. <${item.tag}${item.class ? '.' + item.class : ''}>: "${item.text}"`);
      });
    }
  }
}

run();
