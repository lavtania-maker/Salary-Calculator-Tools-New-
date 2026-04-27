import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  app.use(express.json());

  // API Routes

  // Expose public config (script URLs) to the static HTML frontend
  app.get("/api/config", (req, res) => {
    res.json({
      googleSheetsScriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || "",
      socsoSheetsScriptUrl: process.env.SOCSO_SHEETS_SCRIPT_URL || "",
    });
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

  // Serve socso-perkeso page explicitly so it uses its own index.html
  // (Vite SPA mode would otherwise always fall back to the root index.html)
  app.get(["/socso-perkeso", "/socso-perkeso/"], (req, res) => {
    res.sendFile(path.join(__dirname, "socso-perkeso", "index.html"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get(["/socso-perkeso", "/socso-perkeso/"], (req, res) => {
      res.sendFile(path.join(distPath, "socso-perkeso", "index.html"));
    });
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
