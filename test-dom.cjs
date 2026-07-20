const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<div class="footer-col">([\s\S]*?)<\/div>\s*<!-- Quick Links -->/);
console.log(match ? match[1] : 'Not found');
