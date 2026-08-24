import fs from 'fs';

const content = fs.readFileSync('server.ts', 'utf8');

const oldXml = `      let xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\`;
      for (const cat of categories) {
        xml += \`  <url>
    <loc>https://salarycalculator.my/blog/category/\${cat}</loc>
    <lastmod>\${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>
  </url>\`;
      }
      for (const post of postsList) {
        const enUrl = \`https://salarycalculator.my/blog/\${post.slug}\`;
        xml += \`  <url>
    <loc>\${enUrl}</loc>
    <lastmod>\${post.lastmod}</lastmod>
  </url>\`;
      }
      xml += \`</urlset>\`;`;

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
      
      // If the request is for sitemap-blog.xml specifically
      if (req.path === '/sitemap-blog.xml') {
        xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\`;
        for (const cat of categories) {
          xml += \`  <url>
    <loc>https://salarycalculator.my/blog/category/\${cat}</loc>
    <lastmod>\${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>
  </url>\`;
        }
        for (const post of postsList) {
          const enUrl = \`https://salarycalculator.my/blog/\${post.slug}\`;
          xml += \`  <url>
    <loc>\${enUrl}</loc>
    <lastmod>\${post.lastmod}</lastmod>
  </url>\`;
        }
        xml += \`</urlset>\`;
      }
`;

let newContent = content.replace(oldXml, newXml);
newContent = newContent.replace('app.get(["/api/sitemap", "/sitemap.xml"], async (req, res) => {', 'app.get(["/api/sitemap", "/sitemap.xml", "/sitemap-blog.xml"], async (req, res) => {');

fs.writeFileSync('server.ts', newContent);
console.log('sitemap logic patched');
