import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
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

const catMap: Record<string, string> = {
  'salary': 'Salary',
  'epf': 'EPF',
  'socso': 'SOCSO',
  'annual-leave': 'Annual Leave',
  'pcb-income-tax': 'PCB / Income Tax'
};

export default async function handler(req: any, res: any) {
  const slug = req.query?.slug || req.params?.slug;
  
  if (!slug || typeof slug !== 'string') {
    return res.status(400).send("Missing slug");
  }

  try {
    let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    const db = getFirestore(app, DB_ID);
    
    const postsRef = collection(db, COLL);
    const q = query(postsRef, where("slug", "==", slug), where("status", "==", "published"), limit(1));
    const querySnapshot = await getDocs(q);

    let templatePath = path.join(process.cwd(), 'public', 'blog-post-template.html');
    if (!fs.existsSync(templatePath)) {
       templatePath = path.join(process.cwd(), 'dist', 'blog-post-template.html');
       if (!fs.existsSync(templatePath)) {
           templatePath = path.join(process.cwd(), 'blog-post-template.html');
       }
    }
    const html = fs.readFileSync(templatePath, 'utf-8');
    const $ = cheerio.load(html);

    if (querySnapshot.empty) {
      // Return 404 populated template
      $('title').text("Article Not Found – HR & Salary Blog Malaysia");
      $('#loading-skeleton').css('display', 'none');
      $('#article-main').css('display', 'block');
      $('#article-title').text("Article Not Found");
      $('#article-content').html('<p>The article you are looking for does not exist or may have been removed. Browse the <a href="/blog">full blog</a> instead.</p>');
      
      $('head').prepend('<script>window.__SSR_COMPLETE = true;</script>');
      
      res.setHeader("Content-Type", "text/html");
      return res.status(404).send($.html());
    }

    const doc = querySnapshot.docs[0];
    const post = doc.data();
    
    $('title').text(post.title + " – HR & Salary Blog Malaysia");
    
    if (post.metaDesc) $('meta[name="description"]').attr('content', post.metaDesc);
    else if (post.excerpt) $('meta[name="description"]').attr('content', post.excerpt);

    if (post.metaTitle) $('meta[name="title"]').attr('content', post.metaTitle);
    else $('meta[name="title"]').attr('content', post.title);

    if (post.metaKeywords) $('meta[name="keywords"]').attr('content', post.metaKeywords);

    $('link[rel="canonical"]').attr('href', "https://salarycalculator.my/blog/" + slug);

    $('#breadcrumb-title').text(post.title);
    $('#article-title').text(post.title);

    let cats = Array.isArray(post.category) ? post.category : [post.category || ""];
    let catLinks = cats.filter((c: string) => c).map((c: string) => {
      let catSlug = c.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
      if (catSlug === 'perkeso') catSlug = 'socso';
      let displayCat = catMap[catSlug] || c.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
      return '<a href="/blog/category/' + catSlug + '" style="color: inherit; text-decoration: none;">' + displayCat + '</a>';
    });

    if (catLinks.length > 0) {
      $('#article-category').html(catLinks.join(' <span class="bullet" style="margin: 0 8px;">•</span> '));
      $('#bullet-1').css('display', 'inline');
    } else {
      $('#article-category').text('');
      $('#bullet-1').css('display', 'none');
    }

    if (post.publishedAt) {
      const dt = new Date(post.publishedAt);
      $('#article-date').text(isNaN(dt.getTime()) ? post.publishedAt : dt.toLocaleDateString("en-MY", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }));
      $('#bullet-2').css('display', 'inline');
    } else {
      $('#bullet-2').css('display', 'none');
    }

    if (post.readTime) {
      $('#article-read-time').text(post.readTime + " min read");
    } else {
      const words = (post.content || "").split(" ").length;
      const readTime = Math.ceil(words / 200);
      $('#article-read-time').text(readTime + " min read");
    }

    // Set content
    const $content = cheerio.load(post.content || "", null, false);
    
    // Wrap tables
    $content('table').each((i, el) => {
      $(el).wrap('<div class="table-wrapper"></div>');
    });
    
    // TOC
    const headings = $content('h2');
    if (headings.length >= 2) {
      headings.each((index, el) => {
        let headingId = $(el).attr('id');
        if (!headingId) {
          headingId = "heading-" + index;
          $(el).attr('id', headingId); 
        }
        $('#toc-list').append(`<li><a href="#${headingId}">${$(el).text()}</a></li>`);
      });
      $('#article-toc').css('display', 'block');
    } else {
      $('#article-toc').css('display', 'none');
    }

    $('#article-content').html($content.html() || "");

    if (post.readMoreUrl) {
      $('#read-more-link').attr('href', post.readMoreUrl);
      $('#read-more-container').css('display', 'block');
    } else {
      $('#read-more-container').css('display', 'none');
    }

    // Schema
    let dateMod = post.updatedAt || post.publishedAt || "";
    if (dateMod && dateMod.toDate) {
      dateMod = dateMod.toDate().toISOString();
    } else if (dateMod && typeof dateMod === 'string') {
      const d = new Date(dateMod);
      if (!isNaN(d.getTime())) dateMod = d.toISOString();
    }
    
    let datePub = post.publishedAt || "";
    if (datePub && typeof datePub === 'string') {
      const d = new Date(datePub);
      if (!isNaN(d.getTime())) datePub = d.toISOString();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt || "",
      datePublished: datePub,
      dateModified: dateMod,
      author: [
        {
          "@type": "Organization",
          name: "SalaryCalculator.my Team",
          url: "https://salarycalculator.my/",
        },
      ],
      publisher: {
        "@type": "Organization",
        name: "SalaryCalculator.my",
      },
      mainEntityOfPage: "https://salarycalculator.my/blog/" + slug,
    };

    $('head').append(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);

    $('#loading-skeleton').css('display', 'none');
    $('#article-main').css('display', 'block');

    $('head').prepend('<script>window.__SSR_COMPLETE = true;</script>');

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).send($.html());
  } catch (error) {
    console.error("Error loading article:", error);
    res.status(500).send("Error loading article");
  }
}
