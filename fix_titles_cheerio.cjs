const fs = require('fs');
const { globSync } = require('glob');
const cheerio = require('cheerio');

const files = globSync('*.html');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(content);
  
  let changed = false;
  $('div').each((i, el) => {
     const text = $(el).text().trim();
     if (text === 'Salary Option' || text === 'Statutory Contributions' || text === 'Optional Settings' || text === 'Other Options') {
        if ($(el).attr('style') && ($(el).attr('style').includes('font-weight') || $(el).attr('style').includes('margin-bottom'))) {
           $(el).replaceWith(`<h3 class="form-section-title">${text}</h3>`);
           changed = true;
        }
     }
  });
  
  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log(`Fixed titles in ${file}`);
  }
});
