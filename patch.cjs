const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const startTag = '// Expose dynamic sitemap index';
const endTag = '  // API Routes';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag);

if (startIdx !== -1 && endIdx !== -1) {
  const newRoute = `// Expose dynamic sitemap index
  app.get(["/api/sitemap", "/sitemap.xml", "/sitemap-blog.xml"], async (req, res) => {
    try {
      const postsRef = collection(db, COLL);
      const q = query(postsRef, where("status", "==", "published"));
      const querySnapshot = await getDocs(q);

      let maxArticleLastmod = "";
      const postsList = [];
      const categoriesSet = new Set();
      const categoryLastMods = new Map();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let lastmod = '';
        if (data.updatedAt && data.updatedAt.toDate) {
          lastmod = data.updatedAt.toDate().toISOString();
        } else if (data.publishedAt) {
          if (typeof data.publishedAt === 'string') {
            lastmod = new Date(data.publishedAt).toISOString();
          } else if (data.publishedAt.toDate) {
            lastmod = data.publishedAt.toDate().toISOString();
          }
        } else if (data.updatedAt) {
          lastmod = new Date(data.updatedAt).toISOString();
        }

        if (lastmod) {
          if (!maxArticleLastmod || lastmod > maxArticleLastmod) {
            maxArticleLastmod = lastmod;
          }
        }

        if (data.slug) {
          postsList.push({
            slug: data.slug,
            lastmod: lastmod || "2026-06-25",
            translations: data.translations
          });
        }

        if (data.category) {
          categoriesSet.add(data.category);
          if (lastmod && (!categoryLastMods.get(data.category) || lastmod > categoryLastMods.get(data.category))) {
            categoryLastMods.set(data.category, lastmod);
          }
        }
      });

      const categories = Array.from(categoriesSet);
      const blogLandingLastmod = maxArticleLastmod && maxArticleLastmod > "2026-06-25"
         ? maxArticleLastmod
         : "2026-06-25";

      let pagesLastmod = "2026-07-08";
      try {
        const path = require('path');
        const filePath = path.join(process.cwd(), "public", "sitemap-pages.xml");
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf8");
          const lastmodRegex = /<lastmod>([^<]+)<\\/lastmod>/g;
          let match;
          let maxDate = "";
          while ((match = lastmodRegex.exec(content)) !== null) {
            const dateStr = match[1].trim();
            if (dateStr && (!maxDate || dateStr > maxDate)) {
              maxDate = dateStr;
            }
          }
          if (maxDate) pagesLastmod = maxDate;
        }
      } catch (err) {
        console.error("Error reading sitemap-pages.xml in server.ts:", err);
      }

      let xml = \`<?xml version="1.0" encoding="UTF-8"?>
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
        xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\`;
        for (const cat of categories) {
          xml += \`  <url>\\n    <loc>https://salarycalculator.my/blog/category/\${cat}</loc>\\n    <lastmod>\${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>\\n  </url>\\n\`;
        }
        for (const post of postsList) {
          const enUrl = \`https://salarycalculator.my/blog/\${post.slug}\`;
          xml += \`  <url>\\n    <loc>\${enUrl}</loc>\\n    <lastmod>\${post.lastmod}</lastmod>\\n  </url>\\n\`;
        }
        xml += \`</urlset>\`;
      }

      res.setHeader("Content-Type", "application/xml");
      res.status(200).send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

`;
  
  content = content.substring(0, startIdx) + newRoute + content.substring(endIdx);
  fs.writeFileSync('server.ts', content);
  console.log('patched successfully');
} else {
  console.log('not found');
}
