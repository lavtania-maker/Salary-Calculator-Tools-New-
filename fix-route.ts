import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

const target = '      let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;\n' +
'      for (const cat of categories) {\n' +
'        xml += `  <url>\\n    <loc>https://salarycalculator.my/blog/category/${cat}</loc>\\n    <lastmod>${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>\\n  </url>`;\n' +
'      }\n' +
'      for (const post of postsList) {\n' +
'        const enUrl = `https://salarycalculator.my/blog/${post.slug}`;\n' +
'        xml += `  <url>\\n    <loc>${enUrl}</loc>\\n    <lastmod>${post.lastmod}</lastmod>\\n  </url>`;\n' +
'      }\n' +
'      xml += `</urlset>`;';

const newXml = `      let xml = \`<?xml version="1.0" encoding="UTF-8"?>
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
      
      if (req.path === '/sitemap-blog.xml') {
        xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\`;
        for (const cat of categories) {
          xml += \`  <url>\\n    <loc>https://salarycalculator.my/blog/category/\${cat}</loc>\\n    <lastmod>\${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>\\n  </url>\`;
        }
        for (const post of postsList) {
          const enUrl = \`https://salarycalculator.my/blog/\${post.slug}\`;
          xml += \`  <url>\\n    <loc>\${enUrl}</loc>\\n    <lastmod>\${post.lastmod}</lastmod>\\n  </url>\`;
        }
        xml += \`</urlset>\`;
      }`;

if (content.includes(target)) {
  content = content.replace(target, newXml);
  content = content.replace('app.get(["/api/sitemap", "/sitemap.xml"], async', 'app.get(["/api/sitemap", "/sitemap.xml", "/sitemap-blog.xml"], async');
  fs.writeFileSync('server.ts', content);
  console.log('patched');
} else {
  console.log('not found');
}
