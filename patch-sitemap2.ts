import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const regex = /let xml = \`<\?xml version="1\.0" encoding="UTF-8"\?><urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9" xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml">\`;[\s\S]*?xml \+= \`<\/urlset>\`;/;

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
      }`;

if (regex.test(content)) {
  content = content.replace(regex, newXml);
  content = content.replace('app.get(["/api/sitemap", "/sitemap.xml"],', 'app.get(["/api/sitemap", "/sitemap.xml", "/sitemap-blog.xml"],');
  fs.writeFileSync('server.ts', content);
  console.log('Patched correctly');
} else {
  console.log('Regex did not match');
}
