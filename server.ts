import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
// In the Vercel sandbox, project env vars live in /vercel/share/.env.project
dotenv.config({ path: "/vercel/share/.env.project", override: false });
dotenv.config({ path: "/vercel/share/.env.snowflake", override: false });

const CURRENT_FILENAME = typeof import.meta.url !== "undefined" ? fileURLToPath(import.meta.url) : __filename;
const CURRENT_DIRNAME = typeof import.meta.url !== "undefined" ? path.dirname(CURRENT_FILENAME) : __dirname;

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
  const PORT = parseInt(process.env.PORT || "3001", 10);

  app.use(express.json());

  // API Routes

  // Expose public config (script URLs) to the static HTML frontend
  app.get("/api/config", (req, res) => {
    res.json({
      googleSheetsScriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || "",
      socsoSheetsScriptUrl:  process.env.SOCSO_SHEETS_SCRIPT_URL  || "",
      epfSheetsScriptUrl:    process.env.EPF_SHEETS_SCRIPT_URL    || "",
      epfSheetId:            process.env.EPF_SHEET_ID             || "",
      epfSheetName:          process.env.EPF_SHEET_NAME           || "",
    });
  });

  // Server-side proxy for Homepage Salary sheet submission
  app.post("/api/salary-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId   = process.env.GOOGLE_SHEET_ID;

      if (!scriptUrl) {
        return res.status(500).json({ error: "GOOGLE_SHEETS_SCRIPT_URL not configured" });
      }
      if (!sheetId) {
        return res.status(500).json({ error: "GOOGLE_SHEET_ID not configured" });
      }

      const payload = { ...req.body, sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] salary-sheet response:", appsRes.status, appsText.slice(0, 100));

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] salary-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for PCB sheet submission
  app.post("/api/pcb-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.VITE_PCB_SHEETS_SCRIPT_URL;

      if (!scriptUrl) {
        return res.status(500).json({ error: "VITE_PCB_SHEETS_SCRIPT_URL not configured" });
      }

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const appsText = await appsRes.text();
      console.log("[API] pcb-sheet response:", appsRes.status, appsText.slice(0, 100));

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] pcb-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Server-side proxy for EPF sheet submission — avoids CORS preflight
  app.post("/api/epf-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.EPF_SHEETS_SCRIPT_URL;
      const sheetId   = process.env.EPF_SHEET_ID;
      const sheetName = process.env.EPF_SHEET_NAME;

      console.log("[v0] /api/epf-sheet called");
      console.log("[v0] EPF_SHEETS_SCRIPT_URL set:", !!scriptUrl);
      console.log("[v0] EPF_SHEET_ID set:", !!sheetId);
      console.log("[v0] EPF_SHEET_NAME set:", !!sheetName);

      if (!scriptUrl) {
        return res.status(500).json({ error: "EPF_SHEETS_SCRIPT_URL not configured" });
      }
      if (!sheetId) {
        return res.status(500).json({ error: "EPF_SHEET_ID not configured" });
      }
      if (!sheetName) {
        return res.status(500).json({ error: "EPF_SHEET_NAME not configured" });
      }

      const payload = {
        ...req.body,
        sheetId,
        sheetName,
      };

      console.log("[v0] Forwarding to Apps Script:", scriptUrl.slice(0, 60) + "...");
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
      const scriptUrl = process.env.SOCSO_SHEETS_SCRIPT_URL;
      const sheetId   = process.env.SOCSO_SPREADSHEET_ID;

      if (!scriptUrl) {
        return res.status(500).json({ error: "SOCSO_SHEETS_SCRIPT_URL not configured" });
      }
      if (!sheetId) {
        return res.status(500).json({ error: "SOCSO_SPREADSHEET_ID not configured" });
      }

      const payload = { ...req.body, sheetId };

      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const appsText = await appsRes.text();
      console.log("[API] socso-sheet response:", appsRes.status, appsText.slice(0, 100));

      res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("[API] socso-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/deliver-document", async (req, res) => {
    try {
      const { email, type, data } = req.body;
      
      console.log(`[API] Delivery request received for ${email}, type: ${type}`);
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const resend = getResend();

      // Send email if Resend is configured
      if (resend) {
        let subject = "Your Documents from SalaryCalc Malaysia";
        let typeName = type === 'socsoreport' ? 'SOCSO Report' : (type === 'payslip' ? 'Salary Payslip' : 'Salary Report');
        
        let text = `Hello,\n\nYou have successfully generated your ${typeName}.\n\n`;
        
        if (data) {
           text += `--- Summary ---\n`;
           text += `Salary: RM ${parseFloat(data.salary || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
           
           if (type === 'socsoreport') {
             text += `Employee Contribution: RM ${parseFloat(data.socso || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
             text += `Employer Contribution: RM ${parseFloat(data.socsoEmployer || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
             text += `Total Contribution: RM ${parseFloat(data.socsoTotal || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
           } else {
             text += `Total Deductions: RM ${parseFloat(data.totalDeductions || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
             text += `Net Salary: RM ${parseFloat(data.netSalary || 0).toLocaleString('en-MY', {minimumFractionDigits: 2})}\n`;
           }
        }
        
        text += `\nYou can also find more details on our website.\n\nBest regards,\nSalaryCalc MY Team`;

        await resend.emails.send({
          from: 'SalaryCalc <onboarding@resend.dev>',
          to: email,
          subject: subject,
          text: text
        });
        
        console.log(`[API] Email sent successfully to ${email}`);
      } else {
        console.warn("[API] RESEND_API_KEY not configured or placeholder detected. Skipping email send.");
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
      appType: "mpa",
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
      "/report": "report.html",
      "/report.html": "report.html",
      "/epf-kwsp": "epf-kwsp.html",
      "/epf-kwsp.html": "epf-kwsp.html",
      "/socso-perkeso": "index.html",
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
    };

    app.use(async (req, res, next) => {
      const urlPath = req.path;
      const htmlFile = htmlPages[urlPath];
      if (!htmlFile) return next();

      try {
        const filePath = path.join(CURRENT_DIRNAME, htmlFile);
        let html = fs.readFileSync(filePath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        // Strip @vite/client WebSocket script — it cannot connect through the v0 proxy
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>\n?/g, "");
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { extensions: ["html"] }));
    
    // For MPA, we don't necessarily want a single catch-all that returns index.html
    // unless it's truly a fallback.
    app.get("*all", (req, res) => {
      // If none of the static files matched, fallback to index.html
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
