import * as cheerio from "cheerio";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, query, where, getDocs } from "firebase/firestore";
import blogPostHandler from "./api/blog-post";
import blogHandler from "./api/blog";
import { ROUTE_MAP, REVERSE_ROUTE_MAP, getEnRoute, getMsRoute } from "./src/lib/route-map";
import { FULL_TEXT_MAP_MS } from "./src/lib/translations-ms";

function transformPage($: cheerio.CheerioAPI, enRoute: string, isMsRoute: boolean) {
  const msRoute = getMsRoute(enRoute);

  if (isMsRoute) {
    // Language Swap
    $('html').attr('lang', 'ms');

    // Load locales
    let msJson: any = {};
    try {
      const localesPath = path.join(process.cwd(), 'locales/ms.json');
      if (fs.existsSync(localesPath)) {
        msJson = JSON.parse(fs.readFileSync(localesPath, 'utf8'));
      }
    } catch (e) {
      console.error("[SERVER] Error loading ms.json:", e);
    }

    // 1. Translate elements with data-i18n
    $('[data-i18n]').each((_, el) => {
      const key = $(el).attr('data-i18n');
      if (key && msJson[key]) {
        $(el).html(msJson[key]);
      }
    });

    // 2. Comprehensive translation for all text elements & breadcrumbs
    $('option, label, h1, h2, h3, h4, h5, h6, th, td, button, p, span, a, div, summary, li, strong, em, b').each((_, el) => {
      if ($(el).children().length === 0) {
        const text = $(el).text().trim();
        if (FULL_TEXT_MAP_MS[text]) {
          $(el).text(FULL_TEXT_MAP_MS[text]);
        } else if (text === 'Home') {
          $(el).text('Laman Utama');
        } else if (text === 'Free Tools') {
          $(el).text('Kalkulator Percuma');
        } else if (text === 'Blog') {
          $(el).text('Blog');
        } else if (text === 'Privacy Policy') {
          $(el).text('Dasar Privasi');
        } else if (text === 'Try Our Other Free Calculators') {
          $(el).text('Cuba Kalkulator Percuma Kami Yang Lain');
        } else if (text === 'Explore More Articles') {
          $(el).text('Terokai Artikel Terkini');
        } else if (text === 'Download Report') {
          $(el).text('Muat Turun Laporan');
        }
      }
    });

    // Translate Breadcrumbs specifically
    $('.breadcrumb, .breadcrumbs, nav[aria-label="breadcrumb"]').find('a, span').each((_, el) => {
      const text = $(el).text().trim();
      if (text === 'Home') $(el).text('Laman Utama');
      if (text === 'Free Tools') $(el).text('Kalkulator Percuma');
      if (FULL_TEXT_MAP_MS[text]) $(el).text(FULL_TEXT_MAP_MS[text]);
    });

    // 3. Input placeholders
    $('input[placeholder], textarea[placeholder]').each((_, el) => {
      const ph = $(el).attr('placeholder');
      if (ph) {
        let newPh = ph;
        if (newPh.includes('e.g.')) {
          newPh = newPh.replace('e.g.', 'cth.');
        }
        if (newPh === 'Your Name') newPh = 'Nama Anda';
        if (newPh === 'Your Company Name') newPh = 'Nama Syarikat Anda';
        if (newPh === 'Search articles...') newPh = 'Cari artikel...';
        if (newPh === 'Type keyword and press Enter...') newPh = 'Taip kata kunci dan tekan Enter...';
        if (newPh !== ph) {
           $(el).attr('placeholder', newPh);
        }
      }
    });

    // Canonical & Hreflang
    const canonicalUrl = 'https://salarycalculator.my' + msRoute;
    const enUrl = 'https://salarycalculator.my' + enRoute;

    $('link[rel="canonical"]').attr('href', canonicalUrl);
    $('link[rel="alternate"]').remove();
    $('head').append(`<link rel="alternate" hreflang="en" href="${enUrl}" />`);
    $('head').append(`<link rel="alternate" hreflang="ms" href="${canonicalUrl}" />`);
    $('head').append(`<link rel="alternate" hreflang="x-default" href="${enUrl}" />`);

        // Meta updates
    const currentTitle = $('title').text();
    let desc = $('meta[name="description"]').attr('content') || '';
    let ogTitle = $('meta[property="og:title"]').attr('content') || '';
    let ogDesc = $('meta[property="og:description"]').attr('content') || '';

    // Custom MS SEO map
    const SEO_MS: Record<string, { title: string; desc: string; h1: string }> = {
      "/ms/": {
        title: "Kalkulator Gaji Malaysia 2026: Kira Gaji Bersih Anda",
        desc: "Kira gaji bersih anda dengan tepat. Kalkulator gaji Malaysia 2026 percuma kami menolak caruman EPF, SOCSO, EIS dan PCB secara automatik mengikut akta terkini.",
        h1: "Kalkulator Gaji Malaysia"
      },
      "/ms/kalkulator-epf": {
        title: "Kalkulator EPF Malaysia 2026",
        desc: "Kira caruman EPF (KWSP) bahagian pekerja dan majikan dengan mudah. Gunakan kalkulator EPF Malaysia 2026 yang percuma dan pantas ini.",
        h1: "Kalkulator EPF Malaysia"
      },
      "/ms/kalkulator-socso": {
        title: "Kalkulator SOCSO Malaysia 2026",
        desc: "Semak jadual caruman PERKESO (SOCSO) dan SIP (EIS) 2026. Kira kadar potongan majikan dan pekerja dengan tepat menggunakan kalkulator SOCSO ini.",
        h1: "Kalkulator SOCSO Malaysia"
      },
      "/ms/kalkulator-pcb": {
        title: "Kalkulator PCB Malaysia 2026",
        desc: "Kira Potongan Cukai Berjadual (PCB) bulanan anda. Kalkulator cukai pendapatan LHDN ini dikemaskini mengikut struktur cukai rasmi Malaysia 2026.",
        h1: "Kalkulator PCB Malaysia"
      },
      "/ms/kalkulator-cuti-tahunan": {
        title: "Kalkulator Cuti Tahunan Malaysia 2026",
        desc: "Kira kelayakan cuti tahunan pro-rata berdasarkan Akta Kerja 1955 Malaysia. Ketahui hak cuti berbayar mengikut tempoh perkhidmatan anda.",
        h1: "Kalkulator Cuti Tahunan Malaysia"
      },
      "/ms/kalkulator-overtime": {
        title: "Kalkulator Overtime Malaysia 2026",
        desc: "Kira bayaran kerja lebih masa (OT) dengan betul. Kalkulator OT Malaysia ini membantu anda mengira kadar bayaran untuk hari biasa, cuti rehat, dan cuti am.",
        h1: "Kalkulator Overtime Malaysia"
      },
      "/ms/kadar-gaji-sejam": {
        title: "Kalkulator Kadar Gaji Sejam Malaysia 2026",
        desc: "Tukar gaji bulanan kepada kadar sejam, harian, atau pro-rata mengikut piawaian undang-undang Malaysia. Sesuai untuk pekerja separuh masa atau pengiraan OT.",
        h1: "Kalkulator Kadar Gaji Sejam Malaysia"
      },
      "/ms/kalkulator-gaji-minimum": {
        title: "Kalkulator Gaji Minimum Malaysia 2026",
        desc: "Semak jika gaji anda menepati standard Gaji Minimum terkini di Malaysia. Pastikan pematuhan undang-undang buruh untuk majikan dan pekerja.",
        h1: "Kalkulator Gaji Minimum Malaysia"
      },
      "/ms/penjana-payslip": {
        title: "Penjana Payslip Malaysia",
        desc: "Jana slip gaji profesional secara percuma yang lengkap dengan pengiraan EPF, SOCSO, EIS dan PCB. Sesuai untuk PKS dan majikan di Malaysia.",
        h1: "Penjana Payslip Malaysia"
      },
      "/ms/dasar-privasi": {
        title: "Dasar Privasi",
        desc: "Baca dasar privasi kami mengenai perlindungan data peribadi anda di SalaryCalculator.my. Privasi dan kerahsiaan anda adalah keutamaan kami.",
        h1: "Dasar Privasi"
      }
    };

    const msRouteNormalized = msRoute.replace(/\/$/, '') || '/ms/';
    const seoData = SEO_MS[msRouteNormalized];

    if (seoData) {
      $('title').text(seoData.title);
      $('meta[name="description"]').attr('content', seoData.desc);
      $('meta[property="og:title"]').attr('content', seoData.title);
      $('meta[property="og:description"]').attr('content', seoData.desc);
      $('meta[property="og:url"]').attr('content', canonicalUrl);
      
      // Look for the main h1 and update it if exists
      const h1El = $('h1').first();
      if (h1El.length > 0) {
        h1El.text(seoData.h1);
        // remove data-i18n attribute so client side js doesn't overwrite it incorrectly
        h1El.removeAttr('data-i18n');
      }
    } else {
      const translateMeta = (text: string) => {
        if (!text) return text;
        let res = text;
        if (res.includes('Salary Calculator')) res = res.replace(/Salary Calculator/g, 'Kalkulator Gaji');
        if (res.includes('EPF Calculator')) res = res.replace(/EPF Calculator/g, 'Kalkulator EPF (KWSP)');
        if (res.includes('SOCSO & EIS Calculator')) res = res.replace(/SOCSO & EIS Calculator/g, 'Kalkulator SOCSO & EIS');
        else if (res.includes('SOCSO Calculator')) res = res.replace(/SOCSO Calculator/g, 'Kalkulator SOCSO');
        if (res.includes('PCB Income Tax Calculator')) res = res.replace(/PCB Income Tax Calculator/g, 'Kalkulator PCB & Cukai Pendapatan');
        else if (res.includes('PCB Calculator')) res = res.replace(/PCB Calculator/g, 'Kalkulator PCB');
        if (res.includes('Annual Leave Calculator')) res = res.replace(/Annual Leave Calculator/g, 'Kalkulator Cuti Tahunan');
        if (res.includes('Overtime Pay Calculator')) res = res.replace(/Overtime Pay Calculator/g, 'Kalkulator Overtime (OT)');
        else if (res.includes('Overtime Calculator')) res = res.replace(/Overtime Calculator/g, 'Kalkulator Overtime');
        if (res.includes('Hourly Rate Calculator')) res = res.replace(/Hourly Rate Calculator/g, 'Kalkulator Kadar Gaji Sejam');
        if (res.includes('Minimum Wage Calculator')) res = res.replace(/Minimum Wage Calculator/g, 'Kalkulator Gaji Minimum');
        if (res.includes('Payslip Generator')) res = res.replace(/Payslip Generator/g, 'Penjana Slip Gaji');
        if (res.includes('Privacy Policy')) res = res.replace(/Privacy Policy/g, 'Dasar Privasi');
        res = res.replace(/Calculate your exact take home pay/gi, 'Kira gaji bersih anda');
        res = res.replace(/Calculate employee and employer/gi, 'Kira caruman pekerja dan majikan');
        res = res.replace(/Calculate /g, 'Kira ');
        res = res.replace(/ for FREE/g, ' secara PERCUMA');
        res = res.replace(/Free, instant and accurate HR calculation tools for Malaysia/gi, 'Kalkulator HR percuma, pantas dan tepat untuk Malaysia');
        return res;
      };
      $('title').text(translateMeta(currentTitle));
      if (desc) $('meta[name="description"]').attr('content', translateMeta(desc));
      if (ogTitle) $('meta[property="og:title"]').attr('content', translateMeta(ogTitle));
      if (ogDesc) $('meta[property="og:description"]').attr('content', translateMeta(ogDesc));
      $('meta[property="og:url"]').attr('content', canonicalUrl);
    }
    // Rewrite internal links
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const cleanHref = href.split('#')[0].split('?')[0];
        const anchor = href.slice(cleanHref.length);
        if (ROUTE_MAP[cleanHref]) {
          $(el).attr('href', ROUTE_MAP[cleanHref] + anchor);
        }
      }
    });

    // Update Language Switcher
    $('.lang-en').attr('href', enRoute);
    $('.lang-ms').attr('href', msRoute);
    $('.lang-ms').css('color', 'var(--primary-color)').css('font-weight', '600');
    $('.lang-en').css('color', 'var(--text-muted)').css('font-weight', '400');
  } else {
    // EN route
    const isBlog = enRoute.startsWith('/blog');
    const canonicalUrl = 'https://salarycalculator.my' + enRoute;
    const msUrl = 'https://salarycalculator.my' + msRoute;

    $('link[rel="canonical"]').attr('href', canonicalUrl);
    $('link[rel="alternate"]').remove();

    if (!isBlog) {
      $('head').append(`<link rel="alternate" hreflang="ms" href="${msUrl}" />`);
      $('head').append(`<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`);
      $('head').append(`<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
    }

    $('.lang-en').attr('href', enRoute);
    $('.lang-ms').attr('href', msRoute);
    $('.lang-en').css('color', 'var(--primary-color)').css('font-weight', '600');
    $('.lang-ms').css('color', 'var(--text-muted)').css('font-weight', '400');
  }

  const isNoIndexPage = ['/admin', '/blog-admin', '/epfreport', '/socsoreport', '/pcbreport', '/report'].includes(enRoute);
  if (!isNoIndexPage) {
    if ($('meta[name="robots"]').length > 0) {
      $('meta[name="robots"]').attr('content', 'index, follow');
    } else {
      $('head').append('<meta name="robots" content="index, follow">');
    }
  }
}




dotenv.config();

if (process.env.NODE_ENV !== "production" && fs.existsSync("/app/.dev.env.json")) {
  try {
    const devEnv = JSON.parse(fs.readFileSync("/app/.dev.env.json", "utf8"));
    for (const key in devEnv) {
      if (!process.env[key]) {
        process.env[key] = devEnv[key];
      }
    }
  } catch (e) {
    console.error("Error loading /app/.dev.env.json:", e);
  }
}

function normalizeSheetPayload(body: any) {
  const payload: any = { ...body };

  const name = payload.Name || payload.name || "";
  const email = payload.Email || payload.email || "";
  const userType = payload["User Type"] || payload.userType || "";
  const companyName = payload["Company Name"] || payload.companyName || "";
  const hiringStatus = payload["Hiring Status"] || payload.hiringStatus || "";
  const userPhone = payload["User Phone"] || payload.userPhone || payload.phoneNumber || "";
  const timestamp = payload.timestamp || payload.Timestamp || payload.createdAt || new Date().toISOString();
  const downloadVia = payload.download_via || payload.Action || payload.action || "";

  // Provide both formats to maximize compatibility with Google Apps Script
  payload.Name = name;
  payload.name = name;

  payload.Email = email;
  payload.email = email;
  
  payload["User Type"] = userType;
  payload.userType = userType;
  
  payload["Company Name"] = companyName;
  payload.companyName = companyName;
  
  payload["Hiring Status"] = hiringStatus;
  payload.hiringStatus = hiringStatus;
  
  payload["User Phone"] = userPhone;
  payload.userPhone = userPhone;

  payload.Timestamp = timestamp;
  payload.timestamp = timestamp;

  payload.Action = downloadVia;
  payload.action = downloadVia;
  payload.download_via = downloadVia;

  console.log("[SERVER] Normalized payload keys:", Object.keys(payload));
  return payload;
}

// In the Vercel sandbox, project env vars live in /vercel/share/.env.project
dotenv.config({ path: "/vercel/share/.env.project", override: false });
dotenv.config({ path: "/vercel/share/.env.snowflake", override: false });

const CURRENT_FILENAME =
  typeof import.meta.url !== "undefined"
    ? fileURLToPath(import.meta.url)
    : __filename;
const CURRENT_DIRNAME =
  typeof import.meta.url !== "undefined"
    ? path.dirname(CURRENT_FILENAME)
    : __dirname;

// Lazy initialization of Resend to avoid crash if key is missing
let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (key && key !== "MY_RESEND_API_KEY") {
      resendClient = new Resend(key);
    }
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

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
  const fbApp = initializeApp(firebaseConfig);
  const db = initializeFirestore(fbApp, { experimentalForceLongPolling: true }, DB_ID);

  app.use(express.json());

  // Platform health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Helper function to ensure single shared Blog Admin account is synced
  async function syncAdminAccount() {
    const apiKey = firebaseConfig.apiKey;
    const email = process.env.BLOG_ADMIN_EMAIL || "blog-admin@salarycalculator.my";
    const password = process.env.BLOG_ADMIN_PASSWORD || "SalaryAdmin2026!";

    try {
      let signInRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
      let signInData = await signInRes.json();
      let idToken = signInData.idToken;

      if (signInData.error) {
        const errMsg = signInData.error.message;
        if (errMsg === "EMAIL_NOT_FOUND" || errMsg.includes("USER_NOT_FOUND")) {
          let signUpRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, returnSecureToken: true })
          });
          let signUpData = await signUpRes.json();
          idToken = signUpData.idToken;
        }
      }

      if (idToken) {
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/gen-lang-client-0273291777/databases/${DB_ID}/documents/admins/${encodeURIComponent(email)}?key=${apiKey}`;
        await fetch(firestoreUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`
          },
          body: JSON.stringify({
            fields: {
              email: { stringValue: email },
              role: { stringValue: "admin" },
              updatedAt: { timestampValue: new Date().toISOString() }
            }
          })
        });
      }
    } catch (err) {
      console.error("Error syncing admin account:", err);
    }
  }

  // Trigger sync on server start
  syncAdminAccount();

  app.get("/api/admin/config", (req, res) => {
    const adminEmail = process.env.BLOG_ADMIN_EMAIL || "blog-admin@salarycalculator.my";
    res.json({ adminEmail });
  });

  // 301 Redirects for retired/404 URLs reported by Google Search Console
  const redirectsMap: Record<string, string> = {
    "/epf-contribution-guide-2026": "/blog/how-to-calculate-epf-kwsp-in-malaysia-formula-contribution-rates",
    "/malaysia-salary-guide-2026": "/blog/how-to-calculate-gaji-bersih-net-salary-in-malaysia-formula-example-salary-calculator",
    "/annual-leave-malaysia-2026": "/blog/annual-leave-al-in-malaysia-entitlement-rules-how-to-calculate",
    "/socso-malaysia-2026": "/blog/epf-socso-eis-malaysia-latest-contribution-rates-employer-guide-2026",
    "/pcb-tax-deduction-202": "/blog/how-to-calculate-pcb-monthly-tax-deduction-in-malaysia-formula-example",
    "/pcb-tax-deduction-2026": "/blog/how-to-calculate-pcb-monthly-tax-deduction-in-malaysia-formula-example",
    "/calculate-overtime-pay": "/overtime-pay-calculator"
  };

  app.use((req, res, next) => {
    const cleanPath = req.path.toLowerCase().replace(/\/$/, "");
    if (redirectsMap[cleanPath]) {
      res.redirect(301, redirectsMap[cleanPath]);
      return;
    }
    next();
  });

  app.get("/api/blog", (req, res) => {
    return blogHandler(req as any, res as any);
  });

  app.get("/blog", (req, res) => { 
    return blogHandler(req as any, res as any);
  });



  app.get("/blog/category/:category", (req, res) => {
    req.query.category = req.params.category;
    return blogHandler(req as any, res as any);
  });

  app.get("/api/blog-post", (req, res) => {
    return blogPostHandler(req as any, res as any);
  });

  app.get("/blog/:slug", (req, res, next) => {
    if (req.params.slug && req.params.slug !== "category" && !req.params.slug.includes(".")) {
      req.query.slug = req.params.slug;
      return blogPostHandler(req as any, res as any);
    }
    next();
  });

  app.get("/:slug", (req, res, next) => {
    const slug = req.params.slug;
    const reserved = ["ms", "hourly-rate", "hourly-rate-calculator", "blog", "epf-kwsp", "socso-perkeso", "pcb-income-tax", "annual-leave-calculator", "privacy-policy", "admin", "blog-admin", "mincal", "payslip-generator", "report", "overtime-pay-calculator", "epfreport", "socsoreport", "payslip", "api"];
    if (slug && !slug.includes(".") && !reserved.includes(slug)) {
      req.query.slug = slug;
      return blogPostHandler(req as any, res as any);
    }
    next();
  });

  // Expose dynamic sitemap index
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
          const lastmodRegex = /<lastmod>([^<]+)<\/lastmod>/g;
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

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://salarycalculator.my/sitemap-pages.xml</loc>
    <lastmod>${pagesLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://salarycalculator.my/sitemap-blog.xml</loc>
    <lastmod>${blogLandingLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

      if (req.path === "/sitemap-blog.xml") {
        xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
        for (const cat of categories) {
          xml += `  <url>\n    <loc>https://salarycalculator.my/blog/category/${cat}</loc>\n    <lastmod>${categoryLastMods.get(cat) || "2026-06-25"}</lastmod>\n  </url>\n`;
        }
        for (const post of postsList) {
          const enUrl = `https://salarycalculator.my/blog/${post.slug}`;
          xml += `  <url>\n    <loc>${enUrl}</loc>\n    <lastmod>${post.lastmod}</lastmod>\n  </url>\n`;
        }
        xml += `</urlset>`;
      }

      res.setHeader("Content-Type", "application/xml");
      res.status(200).send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  // API Routes

  // Expose public config (script URLs) to the static HTML frontend
  app.get("/api/config", (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=600"); // 10 minutes cache to avoid render blocking dependency chain delay
    res.json({
      googleSheetsScriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || "",
      socsoSheetsScriptUrl: process.env.SOCSO_SHEETS_SCRIPT_URL || "",
      epfSheetsScriptUrl: process.env.EPF_SHEETS_SCRIPT_URL || "",
      epfSheetId: process.env.EPF_SHEET_ID || "",
      epfSheetName: process.env.EPF_SHEET_NAME || "",
    });
  });

  // Helper to forward payloads to Google Apps Script and verify successful write
  async function forwardToGoogleAppsScript(scriptUrl: string, payload: any): Promise<{ success: boolean; error?: string }> {
    if (!scriptUrl) {
      return { success: false, error: "Google Apps Script URL is not configured" };
    }
    try {
      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[Google Apps Script Response]:", appsRes.status, appsText.slice(0, 200));

      if (!appsRes.ok) {
        return { success: false, error: `Google Apps Script returned HTTP ${appsRes.status}: ${appsText}` };
      }

      let parsed: any = null;
      try {
        parsed = JSON.parse(appsText);
      } catch {
        if (appsText.toLowerCase().includes("error") || appsText.toLowerCase().includes("exception")) {
          return { success: false, error: appsText };
        }
        return { success: true };
      }

      if (parsed) {
        if (parsed.error) {
          return { success: false, error: parsed.error };
        }
        if (parsed.success === false || parsed.status === "error" || parsed.status === "failed") {
          return { success: false, error: parsed.message || parsed.error || "Google Sheet write rejected" };
        }
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to communicate with Google Apps Script" };
    }
  }

  // Server-side proxy for Homepage Salary sheet submission
  app.post("/api/salary-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1lkK2LBrFUPtRZMDGgHdnaYw-IcPGUtylVhp7fpe_I_0"; // Salary Calculator ID

      if (!scriptUrl) {
        return res
          .status(500)
          .json({ success: false, error: "GOOGLE_SHEETS_SCRIPT_URL not configured" });
      }

      // Check if it's from Annual Leave Calculator
      let targetSheetId = sheetId;
      let targetScriptUrl = scriptUrl;
      const actn =
        typeof req.body.action === "string"
          ? req.body.action.toLowerCase()
          : "";
      const dl =
        typeof req.body.download_via === "string"
          ? req.body.download_via.toLowerCase()
          : "";

      if (actn.includes("annual leave") || dl.includes("annual leave")) {
        targetSheetId = "14qNhk_A8THVB_eWsUi3Hyve7Sw6NLJRY-oF4HIqpDwA";
        targetScriptUrl =
          process.env.ANNUAL_LEAVE_SHEETS_SCRIPT_URL ||
          process.env.GOOGLE_SHEETS_SCRIPT_URL;
      } else if (actn.includes("overtime") || dl.includes("overtime")) {
        targetScriptUrl =
          process.env.VITE_OVERTIME_SHEETS_SCRIPT_URL ||
          process.env.OVERTIME_SHEETS_SCRIPT_URL ||
          process.env.GOOGLE_SHEETS_SCRIPT_URL;
      } else if (actn.includes("hourly") || dl.includes("hourly")) {
        targetScriptUrl =
          process.env.HOURLY_SHEETS_SCRIPT_URL ||
          process.env.GOOGLE_SHEETS_SCRIPT_URL;
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId: targetSheetId,
      };

      const result = await forwardToGoogleAppsScript(targetScriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] salary-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for PCB sheet submission
  app.post("/api/pcb-sheet", async (req, res) => {
    try {
      console.log("[INCOMING] /api/pcb-sheet payload:", req.body);
      const scriptUrl =
        process.env.VITE_PCB_SHEETS_SCRIPT_URL ||
        process.env.PCB_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;

      const targetSheetId = "1T6QfXmRl-0T2b_dog8_VSXVYCVJj-ifcH4Jf-Uv_dTw"; // PCB Calculator ID

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "PCB script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId: targetSheetId,
      };

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] pcb-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for EPF sheet submission — avoids CORS preflight
  app.post("/api/epf-sheet", async (req, res) => {
    try {
      console.log("[INCOMING] /api/epf-sheet payload:", req.body);
      const scriptUrl =
        process.env.EPF_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1ZjzvFhb1xA5x1SB8OJgUgkUwlaSnIHrMWeqjte2uw7k"; // EPF Calculator ID
      const sheetName = process.env.EPF_SHEET_NAME || "Sheet1";

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "EPF script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId,
        sheetName,
      };

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] epf-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for SOCSO sheet submission — avoids CORS preflight
  app.post("/api/socso-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.SOCSO_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1rUCrHGE6kdfw17iQgtC1K426JdQZWbBZPl-uwTy3CkE"; // SOCSO Calculator ID

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "SOCSO script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] socso-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for Annual Leave sheet submission
  app.post("/api/annual-leave-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.ANNUAL_LEAVE_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "14qNhk_A8THVB_eWsUi3Hyve7Sw6NLJRY-oF4HIqpDwA";

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "Annual Leave script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] annual-leave-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for Overtime sheet submission
  app.post("/api/overtime-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.VITE_OVERTIME_SHEETS_SCRIPT_URL ||
        process.env.OVERTIME_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "Overtime script URL not configured" });
      }

      const payload = normalizeSheetPayload(req.body);

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] overtime-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Server-side proxy for Hourly Rate sheet submission
  app.post("/api/hourly-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.HOURLY_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;

      if (!scriptUrl) {
        return res.status(500).json({ success: false, error: "Hourly Rate script URL not configured" });
      }

      const payload = normalizeSheetPayload(req.body);

      const result = await forwardToGoogleAppsScript(scriptUrl, payload);
      if (!result.success) {
        return res.status(500).json({ success: false, error: result.error || "Failed to write row to Google Sheet" });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] hourly-sheet error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post("/api/deliver-document", async (req, res) => {
    try {
      const { email, type, data } = req.body;

      console.log(
        `[API] Delivery request received for ${email}, type: ${type}`,
      );

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const resend = getResend();

      // Send email if Resend is configured
      if (resend) {
        let subject = "Your Documents from SalaryCalc Malaysia";
        let typeName =
          type === "socsoreport"
            ? "SOCSO Report"
            : type === "payslip"
              ? "Salary Payslip"
              : "Salary Report";

        let text = `Hello,\n\nYou have successfully generated your ${typeName}.\n\n`;

        if (data) {
          text += `--- Summary ---\n`;
          text += `Salary: RM ${parseFloat(data.salary || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;

          if (type === "socsoreport") {
            text += `Employee Contribution: RM ${parseFloat(data.socso || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;
            text += `Employer Contribution: RM ${parseFloat(data.socsoEmployer || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;
            text += `Total Contribution: RM ${parseFloat(data.socsoTotal || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;
          } else {
            text += `Total Deductions: RM ${parseFloat(data.totalDeductions || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;
            text += `Net Salary: RM ${parseFloat(data.netSalary || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}\n`;
          }
        }

        text += `\nYou can also find more details on our website.\n\nBest regards,\nSalaryCalculator.my Team`;

        await resend.emails.send({
          from: "SalaryCalc <onboarding@resend.dev>",
          to: email,
          subject: subject,
          text: text,
        });

        console.log(`[API] Email sent successfully to ${email}`);
      } else {
        console.warn(
          "[API] RESEND_API_KEY not configured or placeholder detected. Skipping email send.",
        );
      }

      // Always return success if we reached this point to satisfy the client
      res.status(200).json({ success: true, message: "Delivery processed" });
    } catch (error: any) {
      console.error("[API] Error in deliver-document:", error);
      // Still return JSON even on error to prevent client-side parsing failures
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // 301 Permanent Redirects for renamed routes
  app.get(["/pcb-income-tax", "/pcb-income-tax.html"], (req, res) => {
    res.redirect(301, "/pcb-calculator");
  });
  app.get(["/hourly-rate", "/hourly-rate.html"], (req, res) => {
    res.redirect(301, "/hourly-rate-calculator");
  });
  app.get(["/payslip", "/payslip.html"], (req, res) => {
    res.redirect(301, "/payslip-generator");
  });

  const htmlPages: Record<string, string> = {
    "/": "index.html",
    "/index.html": "index.html",
    "/admin": "admin.html",
    "/admin.html": "admin.html",
    "/mincal": "mincal.html",
    "/mincal.html": "mincal.html",
    "/payslip-generator": "payslip.html",
    "/payslip-generator.html": "payslip.html",
    "/report": "report.html",
    "/report.html": "report.html",
    "/epf-kwsp": "epf-kwsp.html",
    "/epf-kwsp.html": "epf-kwsp.html",
    "/socso-perkeso": "socso-perkeso.html",
    "/socso-perkeso.html": "socso-perkeso.html",
    "/epfreport": "epfreport.html",
    "/epfreport.html": "epfreport.html",
    "/socsoreport": "socsoreport.html",
    "/socsoreport.html": "socsoreport.html",
    "/privacy-policy": "privacy-policy.html",
    "/privacy-policy.html": "privacy-policy.html",
    "/pcb-calculator": "pcb-income-tax.html",
    "/pcb-calculator.html": "pcb-income-tax.html",
    "/annual-leave-calculator": "annual-leave-calculator.html",
    "/annual-leave-calculator.html": "annual-leave-calculator.html",
    "/overtime-pay-calculator": "overtime-pay-calculator.html",
    "/overtime-pay-calculator.html": "overtime-pay-calculator.html",
    "/hourly-rate-calculator": "hourly-rate.html",
    "/hourly-rate-calculator.html": "hourly-rate.html",
    "/blog": "blog.html",
    "/blog.html": "blog.html",
    "/blog-post-template": "blog-post-template.html",
    "/blog-post-template.html": "blog-post-template.html",
  };

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      configFile: path.join(process.cwd(), "vite.config.ts"),
      server: {
        middlewareMode: true,
        hmr: false,
        watch: { usePolling: false },
      },
      // Disable the HMR client injection entirely
      define: {
        __vite_is_modern_browser: "true",
      },
      appType: "custom",
    });
    app.use(express.static(path.join(process.cwd(), 'public')));

    app.use((req, res, next) => {
      if (req.path.endsWith('.xml')) {
        res.setHeader('Content-Type', 'application/xml');
      }
      next();
    });

    app.use((req, res, next) => {
      if (req.path === '/index.html' || req.path === '/index') {
        return res.redirect(308, '/');
      }
      next();
    });
    
    // Custom HTML GET/HEAD handler MUST run BEFORE vite.middlewares to apply transformPage for all pages!
    app.use(async (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      if (req.path.startsWith('/api/') || (req.path.includes('.') && !req.path.endsWith('.html'))) {
        return next();
      }

      console.log(
        `[DEBUG] Received request: ${req.method} ${req.url} (originalUrl: ${req.originalUrl}, path: ${req.path})`,
      );
      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\/$/, '') || '/');
      
      if (isMsRoute && enRoute === null) {
        return res.status(404).send('Not Found');
      }

      const htmlFile = enRoute ? htmlPages[enRoute] || (req.path.endsWith('.html') ? req.path.slice(1) : undefined) : undefined;
      if (!htmlFile) return next();

      try {
        const filePath = fs.existsSync(path.join(CURRENT_DIRNAME, htmlFile))
          ? path.join(CURRENT_DIRNAME, htmlFile)
          : path.join(process.cwd(), htmlFile);
        if (!fs.existsSync(filePath)) return next();
        let html = fs.readFileSync(filePath, "utf-8");
        html = await vite.transformIndexHtml("/" + htmlFile, html);
        // Strip @vite/client WebSocket script — it cannot connect through the v0 proxy
        html = html.replace(
          /<script type="module" src="\/@vite\/client"><\/script>\n?/g,
          "",
        );
        const $ = cheerio.load(html);
        transformPage($, enRoute, isMsRoute);

        res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");
        if (req.method === 'HEAD') {
          return res.end();
        }
        return res.send($.html());
      } catch (e) {
        next(e);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use((req, res, next) => {
      if (req.path === '/index.html' || req.path === '/index') {
        return res.redirect(308, '/');
      }
      
      // Also redirect www if needed
      if (req.hostname === 'www.salarycalculator.my') {
        return res.redirect(308, 'https://salarycalculator.my' + req.originalUrl);
      }
      next();
    });

    // Disable auto html extension serving in express.static so app.get("*all") handles page HTML transformations
    app.use(express.static(distPath, {
      extensions: [],
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".xml")) {
          res.setHeader("Content-Type", "application/xml");
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else if (filePath.includes(path.sep + "assets" + path.sep) || filePath.includes("/assets/")) {
          // Serve all compiled hashed assets with 1 year cache life to prevent unoptimized bandwidth wastage
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          // Serve other unhashed assets (e.g., calculator-styles.css, public logos) with immediate revalidation
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
      }
    }));

    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
      const isMsRoute = req.path.startsWith('/ms/') || req.path === '/ms';
      const enRoute = isMsRoute ? getEnRoute(req.path) : (req.path.replace(/\/$/, '') || '/');
      
      if (isMsRoute && enRoute === null) {
        return res.status(404).send('Not Found');
      }
      
      let htmlFile = enRoute ? htmlPages[enRoute] : undefined;
      if (!htmlFile && enRoute === '/') htmlFile = 'index.html';
      
      if (htmlFile) {
        const filePath = path.join(distPath, htmlFile);
        if (fs.existsSync(filePath)) {
          const rawHtml = fs.readFileSync(filePath, 'utf8');
          const $ = cheerio.load(rawHtml);
          transformPage($, enRoute as string, isMsRoute);
          
          res.status(200).setHeader("Content-Type", "text/html");
          return res.send($.html());
        }
      }

      // If none of the static files matched, check if it's a blog post
      if (req.path.startsWith('/blog/') && !req.path.includes('.')) {
        const slug = req.path.replace(/\/$/, '').split('/').pop();
        if (slug && slug !== 'blog' && slug !== 'category') {
          req.query.slug = slug;
          return blogPostHandler(req as any, res as any);
        }
      }

      // fallback to index.html
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
