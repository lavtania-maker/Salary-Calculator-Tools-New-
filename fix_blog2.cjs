const fs = require('fs');
const path = 'api/blog.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'res.setHeader("Cache-Control", "public, s-maxage=3600");',
  'res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");'
);

fs.writeFileSync(path, content);
