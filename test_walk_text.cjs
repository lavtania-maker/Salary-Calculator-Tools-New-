const cheerio = require('cheerio');
const html = `<p>Hello <strong>World</strong>!</p>`;
const $ = cheerio.load(html);

$('*').addBack().contents().filter(function() {
    return this.type === 'text' && this.data.trim().length > 0;
}).each(function() {
    console.log(`Text node: "${this.data.trim()}"`);
});
