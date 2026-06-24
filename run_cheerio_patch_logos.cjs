const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const files = [
  'index.html',
  'socso-perkeso.html',
  'pcb-income-tax.html',
  'epf-kwsp.html',
  'annual-leave-calculator.html'
];


const tools = [
  { file: 'index.html', title: 'Salary Calculator', desc: 'Calculate your exact take home pay after EPF, SOCSO, EIS & PCB deductions.', link: '/',
    icon: `<div style="background: #eff6ff; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg></div>`
  },
  { file: 'socso-perkeso.html', title: 'SOCSO Calculator', desc: 'Check employee and employer PERKESO & EIS contribution rates.', link: '/socso-perkeso',
    icon: `<div style="background: #eff6ff; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>`
  },
  { file: 'pcb-income-tax.html', title: 'PCB Calculator', desc: 'Calculate your monthly tax deduction (MTD) for employees & employers.', link: '/pcb-income-tax',
    icon: `<div style="background: #eff6ff; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7 12 2"/></svg></div>`
  },
  { file: 'epf-kwsp.html', title: 'EPF Calculator', desc: 'Calculate Employee 11% and Employer 13% KWSP contribution rates.', link: '/epf-kwsp',
    icon: `<div style="background: #eff6ff; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.5-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/></svg></div>`
  },
  { file: 'annual-leave-calculator.html', title: 'Annual Leave Calculator', desc: 'Calculate accurate pro-rated annual leave entitlement under Employment Act.', link: '/annual-leave-calculator',
    icon: `<div style="background: #eff6ff; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg></div>`
  },
];

function generateOtherCalculators(currentFile) {
  let html = '<!-- Other Calculators Section -->';
  html += '<section class="blog-section other-calculators-section" style="border-top: 1px solid #e2e8f0; background: #f8fafc; padding: 40px 0;">';
  html += '<div class="container">';
  html += '<div style="margin-bottom: 32px;">';
  html += '<h2 style="font-size: 1.875rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Try Our Other Free Calculators</h2>';
  html += '<p style="color: #64748b; font-size: 1rem;">Free, instant and accurate HR calculation tools for Malaysia.</p>';
  html += '</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">';

  tools.forEach(tool => {
    if (tool.file !== currentFile) {
      html += '<a href="' + tool.link + '" class="calc-card" style="padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s; display: block;">';
      html += tool.icon;
      html += '<h3 style="color: #2563eb; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">' + tool.title + '</h3>';
      html += '<p style="color: #64748b; font-size: 0.875rem; line-height: 1.5; margin: 0;">' + tool.desc + '</p>';
      html += '</a>';
    }
  });

  html += '</div></div></section>';
  return html;
}

function processFile(file) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const $ = cheerio.load(content, { decodeEntities: false });

  $('.other-calculators-section').remove();

  if ($('footer.footer').length > 0) {
     $('footer.footer').before(generateOtherCalculators(file));
  } else if ($('footer').length > 0) {
     $('footer').first().before(generateOtherCalculators(file));
  }

  let newHtml = $.html();
  fs.writeFileSync(filePath, newHtml, 'utf8');
  console.log('Processed ' + file);
}

files.forEach(processFile);
console.log('Icons added.');
