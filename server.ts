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

dotenv.config();

function normalizeSheetPayload(body: any) {
  const payload: any = { ...body };

  const email = payload.Email || payload.email || payload["Email Address"] || "";
  const name = payload["Full Name"] || payload["Name"] || payload.fullName || payload.name || payload.Name || "";
  const userType = payload["User Type"] || payload.userType || payload.role || "";
  const companyName = payload["Company Name"] || payload.companyName || "";
  const hiringStatus = payload["Hiring Status"] || payload.hiringStatus || "";
  const userPhone = payload["User Phone"] || payload["Phone Number"] || payload.userPhone || payload.phoneNumber || payload.phone || "";
  const timestamp = payload.Timestamp || payload.timestamp || payload.createdAt || payload["Date & Time"] || payload["Date and Time"] || new Date().toISOString();
  const downloadVia = payload.download_via || payload["Calculator Used"] || payload.calculatorUsed || payload.Action || payload.action || "";

  // Provide all key format variations to maximize compatibility with Google Apps Script columns
  payload.Email = email;
  payload.email = email;
  payload["Email Address"] = email;

  payload.Name = name;
  payload.name = name;
  payload["Full Name"] = name;
  payload.fullName = name;

  payload["User Type"] = userType;
  payload.userType = userType;
  payload.role = userType;

  payload["Company Name"] = companyName;
  payload.companyName = companyName;

  payload["Hiring Status"] = hiringStatus;
  payload.hiringStatus = hiringStatus;

  payload["User Phone"] = userPhone;
  payload.userPhone = userPhone;
  payload.phoneNumber = userPhone;
  payload["Phone Number"] = userPhone;

  payload.Timestamp = timestamp;
  payload.timestamp = timestamp;
  payload["Date & Time"] = timestamp;

  payload.Action = downloadVia;
  payload.action = downloadVia;
  payload.download_via = downloadVia;
  payload["Calculator Used"] = downloadVia;
  payload.calculatorUsed = downloadVia;

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
  const PORT = 3000;

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
    // Wrap to match expected signatures if needed, but Express req/res works for the subset used.
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
    const reserved = ["blog", "epf-kwsp", "socso-perkeso", "pcb-income-tax", "annual-leave-calculator", "privacy-policy", "admin", "blog-admin", "mincal", "payslip-generator", "report", "overtime-pay-calculator", "epfreport", "socsoreport", "payslip", "api"];
    if (slug && !slug.includes(".") && !reserved.includes(slug)) {
      req.query.slug = slug;
      return blogPostHandler(req as any, res as any);
    }
    next();
  });

  // Expose dynamic sitemap index
  app.get(["/api/sitemap", "/sitemap.xml"], async (req, res) => {
    try {
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

      let pagesLastmod = "2026-07-08";
      try {
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
      console.error("Error generating sitemap index in server:", error);
      res.status(500).send("Error generating sitemap index");
    }
  });

  // Also expose at /sitemap-blog.xml directly for preview and indexing
  app.get(["/api/sitemap-blog", "/sitemap-blog.xml"], async (req, res) => {
    try {
      const postsRef = collection(db, COLL);
      const q = query(postsRef, where("status", "==", "published"));
      const querySnapshot = await getDocs(q);

      const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave", "overtime"];
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
        xml += `    <priority>0.6</priority>\n`;
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

  // Server-side proxy for Homepage Salary sheet submission
  app.post("/api/salary-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1lkK2LBrFUPtRZMDGgHdnaYw-IcPGUtylVhp7fpe_I_0"; // Salary Calculator ID

      if (!scriptUrl) {
        return res
          .status(500)
          .json({ error: "GOOGLE_SHEETS_SCRIPT_URL not configured" });
      }

      let targetSheetId = sheetId;
      let targetScriptUrl = scriptUrl;
      const actn = typeof req.body.action === "string" ? req.body.action.toLowerCase() : "";
      const dl = typeof req.body.download_via === "string" ? req.body.download_via.toLowerCase() : "";

      if (actn.includes("annual leave") || dl.includes("annual leave")) {
        targetSheetId = "14qNhk_A8THVB_eWsUi3Hyve7Sw6NLJRY-oF4HIqpDwA";
        targetScriptUrl = process.env.ANNUAL_LEAVE_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL || "";
      }

      if (!targetScriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId: targetSheetId,
      };

      const appsRes = await fetch(targetScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] salary-sheet response:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] salary-sheet error:", err);
      res.status(500).json({ error: err.message });
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
        return res.status(500).json({ error: "PCB script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId: targetSheetId,
      };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] pcb-sheet response:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] pcb-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for EPF sheet submission
  app.post("/api/epf-sheet", async (req, res) => {
    try {
      console.log("[INCOMING] /api/epf-sheet payload:", req.body);
      const scriptUrl =
        process.env.EPF_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1ZjzvFhb1xA5x1SB8OJgUgkUwlaSnIHrMWeqjte2uw7k"; // EPF Calculator ID
      const sheetName = process.env.EPF_SHEET_NAME || "Sheet1";

      if (!scriptUrl) {
        return res.status(500).json({ error: "EPF script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId,
        sheetName,
      };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] epf-sheet response status:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] epf-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for SOCSO sheet submission
  app.post("/api/socso-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.SOCSO_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1rUCrHGE6kdfw17iQgtC1K426JdQZWbBZPl-uwTy3CkE"; // SOCSO Calculator ID

      if (!scriptUrl) {
        return res.status(500).json({ error: "SOCSO script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] socso-sheet response:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] socso-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for Annual Leave sheet submission
  app.post("/api/annual-leave-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.ANNUAL_LEAVE_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "14qNhk_A8THVB_eWsUi3Hyve7Sw6NLJRY-oF4HIqpDwA"; // Annual Leave Calculator ID

      if (!scriptUrl) {
        return res.status(500).json({ error: "Annual leave script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] annual-leave-sheet response:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] annual-leave-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for Overtime sheet submission
  app.post("/api/overtime-sheet", async (req, res) => {
    try {
      const scriptUrl =
        process.env.OVERTIME_SHEETS_SCRIPT_URL ||
        process.env.VITE_OVERTIME_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = process.env.OVERTIME_SHEET_ID || "1lkK2LBrFUPtRZMDGgHdnaYw-IcPGUtylVhp7fpe_I_0";

      if (!scriptUrl) {
        return res.status(500).json({ error: "Overtime script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] overtime-sheet response:", appsRes.status, appsText.slice(0, 100));

      if (!appsRes.ok) {
        return res.status(appsRes.status || 500).json({ error: "Google Sheets script failed: " + appsText });
      }

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] overtime-sheet error:", err);
      res.status(500).json({ error: err.message });
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      configFile: path.join(CURRENT_DIRNAME, "vite.config.ts"),
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
    app.use((req, res, next) => {
      if (req.path.endsWith('.xml')) {
        res.setHeader('Content-Type', 'application/xml');
      }
      next();
    });

    app.use(vite.middlewares);

    // Serve HTML pages for MPA routes — Vite middleware mode does NOT auto-serve HTML
    const htmlPages: Record<string, string> = {
      "/": "index.html",
      "/index.html": "index.html",
      "/admin": "admin.html",
      "/admin.html": "admin.html",
      "/mincal": "mincal.html",
      "/mincal.html": "mincal.html",
      "/payslip": "payslip.html",
      "/payslip.html": "payslip.html",
      "/payslip-generator": "payslip.html",
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
      "/pcb-income-tax": "pcb-income-tax.html",
      "/pcb-income-tax.html": "pcb-income-tax.html",
      "/annual-leave-calculator": "annual-leave-calculator.html",
      "/overtime-pay-calculator": "overtime-pay-calculator.html",
      "/overtime-pay-calculator.html": "overtime-pay-calculator.html",
      "/annual-leave-calculator.html": "annual-leave-calculator.html",
      "/blog": "blog.html",
      "/blog.html": "blog.html",
      "/blog-post-template": "blog-post-template.html",
      "/blog-post-template.html": "blog-post-template.html",
    };

    app.use((req, res, next) => {
      if (req.path === '/index.html' || req.path === '/index') {
        return res.redirect(308, '/');
      }
      next();
    });
    
    app.use(async (req, res, next) => {
      console.log(
        `[DEBUG] Received request: ${req.method} ${req.url} (originalUrl: ${req.originalUrl}, path: ${req.path})`,
      );
      const urlPath = req.path;
      const htmlFile = htmlPages[urlPath];
      if (!htmlFile) return next();

      try {
        const filePath = path.join(CURRENT_DIRNAME, htmlFile);
        let html = fs.readFileSync(filePath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        // Strip @vite/client WebSocket script — it cannot connect through the v0 proxy
        html = html.replace(
          /<script type="module" src="\/@vite\/client"><\/script>\n?/g,
          "",
        );
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      } catch (e) {
        next(e);
      }
    });
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
    app.use(express.static(distPath, {
      extensions: ["html"],
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".xml")) {
          res.setHeader("Content-Type", "application/xml");
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        } else if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        } else if (filePath.includes(path.sep + "assets" + path.sep) || filePath.includes("/assets/")) {
          // Serve all compiled hashed assets with 1 year cache life to prevent unoptimized bandwidth wastage
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          // Serve other unhashed assets (e.g., calculator-styles.css, public logos) with immediate revalidation
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        }
      }
    }));

    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
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
