import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import blogPostHandler from "./api/blog-post";

dotenv.config();

function normalizeSheetPayload(body: any) {
  const payload: any = { ...body };

  const email = payload.Email || payload.email || "";
  const userType = payload["User Type"] || payload.userType || "";
  const companyName = payload["Company Name"] || payload.companyName || "";
  const hiringStatus = payload["Hiring Status"] || payload.hiringStatus || "";
  const userPhone = payload["User Phone"] || payload.userPhone || payload.phoneNumber || "";
  const timestamp = payload.timestamp || payload.Timestamp || payload.createdAt || new Date().toISOString();
  const downloadVia = payload.download_via || payload.Action || payload.action || "";

  // Provide both formats to maximize compatibility with Google Apps Script
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
  const db = getFirestore(fbApp, DB_ID);

  app.use(express.json());

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

  app.get("/api/sitemap-blog", async (req, res) => {
    try {
      const postsRef = collection(db, COLL);
      const q = query(postsRef, where("status", "==", "published"));
      const querySnapshot = await getDocs(q);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

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
  });

  // Also expose at /sitemap-blog.xml directly for preview
  app.get("/sitemap-blog.xml", (req, res) => {
    res.redirect("/api/sitemap-blog");
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
      console.log(
        "[API] salary-sheet response:",
        appsRes.status,
        appsText.slice(0, 100),
      );

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
      fs.appendFileSync(
        "server_logs.txt",
        "PCB Payload: " + JSON.stringify(req.body) + "\n",
      );

      const scriptUrl =
        process.env.VITE_PCB_SHEETS_SCRIPT_URL ||
        process.env.GOOGLE_SHEETS_SCRIPT_URL;

      const targetSheetId = "1T6QfXmRl-0T2b_dog8_VSXVYCVJj-ifcH4Jf-Uv_dTw"; // PCB Calculator ID

      if (!scriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
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
      console.log(
        "[API] pcb-sheet response:",
        appsRes.status,
        appsText.slice(0, 100),
      );

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] pcb-sheet error:", err);
      res.status(500).json({ error: err.message });
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

      console.log("[v0] /api/epf-sheet called");
      console.log("[v0] scriptUrl set:", !!scriptUrl);

      if (!scriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }

      const payload = {
        ...normalizeSheetPayload(req.body),
        sheetId,
        sheetName,
      };

      console.log(
        "[v0] Forwarding to Apps Script:",
        scriptUrl.slice(0, 60) + "...",
      );
      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[v0] Apps Script response status:", appsRes.status);
      console.log("[v0] Apps Script response body:", appsText);

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] epf-sheet error:", err);
      res.status(500).json({ error: err.message });
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
        return res.status(500).json({ error: "Script URL not configured" });
      }

      const payload = { ...normalizeSheetPayload(req.body), sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log(
        "[API] socso-sheet response:",
        appsRes.status,
        appsText.slice(0, 100),
      );

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] socso-sheet error:", err);
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

        text += `\nYou can also find more details on our website.\n\nBest regards,\nSalaryCalc MY Team`;

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
    app.use(express.static(distPath, {
      extensions: ["html"],
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        } else {
          // Serve all other static assets (images, CSS, JS, fonts) with 1 year cache life to prevent unoptimized bandwidth wastage
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));

    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
      // If none of the static files matched, check if it's a blog post
      if (req.path.startsWith('/blog/')) {
        return res.sendFile(path.join(distPath, "blog-post-template.html"));
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
