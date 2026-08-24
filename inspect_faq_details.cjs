const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(content);

console.log('FAQ section in index.html:');
$('#faq, .faq-section, .faq-container, details').each((i, el) => {
  console.log('El:', el.tagName, 'class:', $(el).attr('class'), 'id:', $(el).attr('id'));
  console.log('HTML snippet:', $(el).html().substring(0, 300));
});

