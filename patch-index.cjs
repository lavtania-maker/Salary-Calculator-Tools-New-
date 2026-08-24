const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const s1 = 'let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;';
const idx1 = content.indexOf(s1);

if (idx1 !== -1) {
  const replacement1 = `let xml = \`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://salarycalculator.my/sitemap-pages.xml</loc>
    <lastmod>\${pagesLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salarycalculator.my/sitemap-blog.xml</loc>
    <lastmod>\${blogLandingLastmod}</lastmod>
  </sitemap>
</sitemapindex>\`;
      if (req.path === "/sitemap-blog.xml") {
        xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\`;`;
        
  content = content.substring(0, idx1) + replacement1 + content.substring(idx1 + s1.length);
  
  // now replace the closing tag
  const s2 = 'xml += `</urlset>`;';
  const idx2 = content.indexOf(s2, idx1);
  if (idx2 !== -1) {
    const replacement2 = `xml += \`</urlset>\`;\n      }`;
    content = content.substring(0, idx2) + replacement2 + content.substring(idx2 + s2.length);
  }
  
  // also need to replace the route
  content = content.replace('app.get(["/api/sitemap", "/sitemap.xml"]', 'app.get(["/api/sitemap", "/sitemap.xml", "/sitemap-blog.xml"]');
  
  fs.writeFileSync('server.ts', content);
  console.log('patched');
} else {
  console.log('not found');
}
