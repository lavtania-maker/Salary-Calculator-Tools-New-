import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

function normalizeSheetPayload(body: any) {
  const payload: any = { ...body };

  // Map incoming keys to the exact headers in Google Sheets
  if (payload["Email"]) payload.email = payload["Email"];
  if (payload["User Type"]) payload.userType = payload["User Type"];
  if (payload["Company Name"]) payload.companyName = payload["Company Name"];
  if (payload["Hiring Status"]) payload.hiringStatus = payload["Hiring Status"];
  if (payload["User Phone"]) payload.userPhone = payload["User Phone"];
  if (payload.phoneNumber) payload.userPhone = payload.phoneNumber;

  // Cleanup uppercase exact keys
  delete payload["Email"];
  delete payload["User Type"];
  delete payload["Company Name"];
  delete payload["Hiring Status"];
  delete payload["User Phone"];
  delete payload.phoneNumber;

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
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Routes

  // Expose public config (script URLs) to the static HTML frontend
  app.get("/api/config", (req, res) => {
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
      "/annual-leave-calculator": "annual-leave-calculator.html",
      "/annual-leave-calculator.html": "annual-leave-calculator.html",
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
