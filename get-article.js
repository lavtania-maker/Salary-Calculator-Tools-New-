import fs from 'fs';
const html = fs.readFileSync('dist/blog/basic-salary-vs-gross-salary-vs-net-salary-in-malaysia-whats-the-difference.html', 'utf8');
const h2s = html.match(/<h2[^>]*>.*?<\/h2>/g);
console.log(h2s);
