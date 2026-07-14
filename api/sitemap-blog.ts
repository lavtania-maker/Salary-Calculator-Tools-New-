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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add blog landing page URL
    xml += `  <url>\n`;
    xml += `    <loc>https://salarycalculator.my/blog</loc>\n`;
    xml += `    <lastmod>2026-06-25</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

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

      xml += `  <url>\n`;
      xml += `    <loc>https://salarycalculator.my/blog/${slug}</loc>\n`;
      if (lastmod) {
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
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
