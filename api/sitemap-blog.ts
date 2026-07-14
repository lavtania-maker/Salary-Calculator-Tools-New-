import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  authDomain: "gen-lang-client-0273291777.firebaseapp.com",
  projectId: "gen-lang-client-0273291777",
  storageBucket: "gen-lang-client-0273291777.firebasestorage.app",
  messagingSenderId: "235978759653",
  appId: "1:235978759653:web:fb82260c62f98fc80ce30c"
};

const DB_ID = "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918";
const COLL = "blog_posts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app, DB_ID);
    
    const postsRef = collection(db, COLL);
    const q = query(postsRef, where("status", "==", "published"));
    const querySnapshot = await getDocs(q);

    const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave"];
    const categories = new Set<string>(PREDEFINED_CATEGORIES);
    const categoryLastMods = new Map<string, string>();
    const posts: { slug: string; lastmod: string }[] = [];
    let maxArticleLastmod = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug;
      if (!slug) return;
      
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

      // Collect categories
      const rawCats = Array.isArray(data.category) ? data.category : [data.category || ''];
      const articleCats = rawCats.filter(Boolean).map((c: string) => {
        let catSlug = c.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
        if (catSlug === 'perkeso') catSlug = 'socso';
        return catSlug;
      });

      articleCats.forEach((catSlug: string) => {
        categories.add(catSlug);
        if (lastmod) {
          const currentMax = categoryLastMods.get(catSlug);
          if (!currentMax || lastmod > currentMax) {
            categoryLastMods.set(catSlug, lastmod);
          }
        }
      });

      posts.push({ slug, lastmod });
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Blog landing page
    const blogLandingLastmod = maxArticleLastmod && maxArticleLastmod > "2026-06-25" 
      ? maxArticleLastmod 
      : "2026-06-25";

    xml += `  <url>\n`;
    xml += `    <loc>https://salarycalculator.my/blog</loc>\n`;
    xml += `    <lastmod>${blogLandingLastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    // 2. Blog category pages
    const sortedCategories = Array.from(categories).sort();
    sortedCategories.forEach((catSlug) => {
      const catLastmod = categoryLastMods.get(catSlug) || blogLandingLastmod;
      xml += `  <url>\n`;
      xml += `    <loc>https://salarycalculator.my/blog/category/${catSlug}</loc>\n`;
      xml += `    <lastmod>${catLastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. Published blog articles
    posts.forEach((post) => {
      xml += `  <url>\n`;
      xml += `    <loc>https://salarycalculator.my/blog/${post.slug}</loc>\n`;
      if (post.lastmod) {
        xml += `    <lastmod>${post.lastmod}</lastmod>\n`;
      }
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
