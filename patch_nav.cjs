const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && !f.includes('test') && !f.includes('admin') && !f.includes('template'));

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('Hourly Rate Calculator')) return;
  const $ = cheerio.load(html);
  
  // Desktop Dropdown
  const dtDropdown = $('.dropdown-menu');
  if (dtDropdown.length) {
    if (!dtDropdown.html().includes('hourly-rate')) {
      dtDropdown.append('\n              <a href="/hourly-rate" class="dropdown-item" role="menuitem">Hourly Rate Calculator</a>');
    }
  }

  // Mobile Dropdown
  const mobDropdown = $('#mobileDropdown');
  if (mobDropdown.length) {
    if (!mobDropdown.html().includes('hourly-rate')) {
      mobDropdown.append('\n          <a href="/hourly-rate" class="mobile-submenu-item">Hourly Rate Calculator</a>');
    }
  }

  fs.writeFileSync(file, $.html());
});
