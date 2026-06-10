var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_url = require("url");
var import_resend = require("resend");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
import_dotenv.default.config({ path: "/vercel/share/.env.project", override: false });
import_dotenv.default.config({ path: "/vercel/share/.env.snowflake", override: false });
var CURRENT_FILENAME = typeof import_meta.url !== "undefined" ? (0, import_url.fileURLToPath)(import_meta.url) : __filename;
var CURRENT_DIRNAME = typeof import_meta.url !== "undefined" ? import_path.default.dirname(CURRENT_FILENAME) : __dirname;
var resendClient = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (key && key !== "MY_RESEND_API_KEY") {
      resendClient = new import_resend.Resend(key);
    }
  }
  return resendClient;
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/config", (req, res) => {
    res.json({
      googleSheetsScriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || "",
      socsoSheetsScriptUrl: process.env.SOCSO_SHEETS_SCRIPT_URL || "",
      epfSheetsScriptUrl: process.env.EPF_SHEETS_SCRIPT_URL || "",
      epfSheetId: process.env.EPF_SHEET_ID || "",
      epfSheetName: process.env.EPF_SHEET_NAME || ""
    });
  });
  app.post("/api/salary-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1lkK2LBrFUPtRZMDGgHdnaYw-IcPGUtylVhp7fpe_I_0";
      if (!scriptUrl) {
        return res.status(500).json({ error: "GOOGLE_SHEETS_SCRIPT_URL not configured" });
      }
      let targetSheetId = sheetId;
      let targetScriptUrl = scriptUrl;
      const actn = typeof req.body.action === "string" ? req.body.action.toLowerCase() : "";
      const dl = typeof req.body.download_via === "string" ? req.body.download_via.toLowerCase() : "";
      if (actn.includes("annual leave") || dl.includes("annual leave")) {
        targetSheetId = "14qNhk_A8THVB_eWsUi3Hyve7Sw6NLJRY-oF4HIqpDwA";
        targetScriptUrl = process.env.ANNUAL_LEAVE_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL;
      }
      if (!targetScriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }
      const payload = { ...req.body, sheetId: targetSheetId };
      const appsRes = await fetch(targetScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const appsText = await appsRes.text();
      console.log("[API] salary-sheet response:", appsRes.status, appsText.slice(0, 100));
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("[API] salary-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/pcb-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.VITE_PCB_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const targetSheetId = "1T6QfXmRl-0T2b_dog8_VSXVYCVJj-ifcH4Jf-Uv_dTw";
      if (!scriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }
      const payload = { ...req.body, sheetId: targetSheetId };
      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const appsText = await appsRes.text();
      console.log("[API] pcb-sheet response:", appsRes.status, appsText.slice(0, 100));
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("[API] pcb-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/epf-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.EPF_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1ZjzvFhb1xA5x1SB8OJgUgkUwlaSnIHrMWeqjte2uw7k";
      const sheetName = process.env.EPF_SHEET_NAME || "Sheet1";
      console.log("[v0] /api/epf-sheet called");
      console.log("[v0] scriptUrl set:", !!scriptUrl);
      if (!scriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }
      const payload = {
        ...req.body,
        sheetId,
        sheetName
      };
      console.log("[v0] Forwarding to Apps Script:", scriptUrl.slice(0, 60) + "...");
      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const appsText = await appsRes.text();
      console.log("[v0] Apps Script response status:", appsRes.status);
      console.log("[v0] Apps Script response body:", appsText);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("[API] epf-sheet error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/socso-sheet", async (req, res) => {
    try {
      const scriptUrl = process.env.SOCSO_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEETS_SCRIPT_URL;
      const sheetId = "1rUCrHGE6kdfw17iQgtC1K426JdQZWbBZPl-uwTy3CkE";
      if (!scriptUrl) {
        return res.status(500).json({ error: "Script URL not configured" });
      }
      const payload = { ...req.body, sheetId };
      const appsRes = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const appsText = await appsRes.text();
      console.log("[API] socso-sheet response:", appsRes.status, appsText.slice(0, 100));
      res.status(200).json({ success: true });
    } catch (err) {
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
      if (resend) {
        let subject = "Your Documents from SalaryCalc Malaysia";
        let typeName = type === "socsoreport" ? "SOCSO Report" : type === "payslip" ? "Salary Payslip" : "Salary Report";
        let text = `Hello,

You have successfully generated your ${typeName}.

`;
        if (data) {
          text += `--- Summary ---
`;
          text += `Salary: RM ${parseFloat(data.salary || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
          if (type === "socsoreport") {
            text += `Employee Contribution: RM ${parseFloat(data.socso || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
            text += `Employer Contribution: RM ${parseFloat(data.socsoEmployer || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
            text += `Total Contribution: RM ${parseFloat(data.socsoTotal || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
          } else {
            text += `Total Deductions: RM ${parseFloat(data.totalDeductions || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
            text += `Net Salary: RM ${parseFloat(data.netSalary || 0).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
`;
          }
        }
        text += `
You can also find more details on our website.

Best regards,
SalaryCalc MY Team`;
        await resend.emails.send({
          from: "SalaryCalc <onboarding@resend.dev>",
          to: email,
          subject,
          text
        });
        console.log(`[API] Email sent successfully to ${email}`);
      } else {
        console.warn("[API] RESEND_API_KEY not configured or placeholder detected. Skipping email send.");
      }
      res.status(200).json({ success: true, message: "Delivery processed" });
    } catch (error) {
      console.error("[API] Error in deliver-document:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      configFile: import_path.default.join(CURRENT_DIRNAME, "vite.config.ts"),
      server: {
        middlewareMode: true,
        hmr: false,
        watch: { usePolling: false }
      },
      // Disable the HMR client injection entirely
      define: {
        __vite_is_modern_browser: "true"
      },
      appType: "custom"
    });
    app.use(vite.middlewares);
    const htmlPages = {
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
      "/annual-leave-calculator.html": "annual-leave-calculator.html"
    };
    app.use(async (req, res, next) => {
      console.log(`[DEBUG] Received request: ${req.method} ${req.url} (originalUrl: ${req.originalUrl}, path: ${req.path})`);
      const urlPath = req.path;
      const htmlFile = htmlPages[urlPath];
      if (!htmlFile) return next();
      try {
        const filePath = import_path.default.join(CURRENT_DIRNAME, htmlFile);
        let html = import_fs.default.readFileSync(filePath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>\n?/g, "");
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath, { extensions: ["html"] }));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
