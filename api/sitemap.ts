import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from "fs";
import path from "path";

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

// Helper to extract the maximum lastmod from sitemap-pages.xml
function getSitemapPagesLastmod(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "sitemap-pages.xml");
    if (!fs.existsSync(filePath)) {
      return "2026-07-08";
    }
    const content = fs.readFileSync(filePath, "utf8");
    const lastmodRegex = /<lastmod>([^<]+)<\/lastmod>/g;
    let match;
    let maxDate = "";
    while ((match = lastmodRegex.exec(content)) !== null) {
      const dateStr = match[1].trim();
      if (dateStr && (!maxDate || dateStr > maxDate)) {
        maxDate = dateStr;
      }
    }
    return maxDate || "2026-07-08";
  } catch (error) {
    console.error("Error reading sitemap-pages.xml lastmod:", error);
    return "2026-07-08";
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app, DB_ID);
    
    const postsRef = collection(db, COLL);
    const q = query(postsRef, where("status", "==", "published"));
    const querySnapshot = await getDocs(q);

    let maxArticleLastmod = "";

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
    });

    const blogLandingLastmod = maxArticleLastmod && maxArticleLastmod > "2026-06-25" 
      ? maxArticleLastmod 
      : "2026-06-25";

    const pagesLastmod = getSitemapPagesLastmod();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xml += `  <sitemap>\n`;
    xml += `    <loc>https://salarycalculator.my/sitemap-pages.xml</loc>\n`;
    xml += `    <lastmod>${pagesLastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
    xml += `  <sitemap>\n`;
    xml += `    <loc>https://salarycalculator.my/sitemap-blog.xml</loc>\n`;
    xml += `    <lastmod>${blogLandingLastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
    xml += `</sitemapindex>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    res.status(500).send("Error generating sitemap index");
  }
}
