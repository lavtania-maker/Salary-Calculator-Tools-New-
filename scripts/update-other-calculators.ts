import * as fs from "fs";
import * as path from "path";
import { CALCULATOR_TOOLS, normalizePath } from "../src/other-calculators";

function generateSectionHtml(routePath: string): string {
  const currentPath = normalizePath(routePath);
  let remaining = CALCULATOR_TOOLS.filter(tool => normalizePath(tool.path) !== currentPath);
  if (remaining.length > 6) {
    remaining = remaining.slice(0, 6);
  }

  const cardsHtml = remaining.map(tool => `
      <a href="${tool.path}" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid ${tool.borderColor}; border-radius: 12px; background: ${tool.bgColor}; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
        <div style="background: ${tool.iconBgColor}; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          ${tool.svgIcon}
        </div>
        <h3 style="color: ${tool.textColor}; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">${tool.title}</h3>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">${tool.description}</p>
      </a>`).join("");

  return `<!-- Other Calculators Section -->
  <section class="content-section other-calculators-section">
    <div class="container">
      <style>
        .other-calculators-section {
          border-top: none !important;
          padding-top: 0 !important;
        }
        .other-calculators-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 20px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        @media (max-width: 1023px) {
          .other-calculators-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 767px) {
          .other-calculators-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      </style>
      <div class="seo-card" style="margin-bottom: 0;">
        <h2 class="seo-title" style="color: #2563eb !important;">Try Our Other Free Calculators</h2>
        <p class="seo-subtitle" style="color: #64748b; font-size: 1rem; margin-bottom: 24px;">Free, instant and accurate HR calculation tools for Malaysia.</p>
        <div class="other-calculators-grid">
${cardsHtml}
        </div>
      </div>
    </div>
  </section>`;
}

const fileToRouteMap: Record<string, string> = {
  "index.html": "/",
  "socso-perkeso.html": "/socso-perkeso",
  "pcb-income-tax.html": "/pcb-income-tax",
  "epf-kwsp.html": "/epf-kwsp",
  "annual-leave-calculator.html": "/annual-leave-calculator",
  "overtime-pay-calculator.html": "/overtime-pay-calculator",
  "hourly-rate.html": "/hourly-rate",
  "mincal.html": "/mincal",
  "payslip.html": "/payslip",
  "report.html": "/report"
};

function updateHtmlFile(filePath: string, routePath: string) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");

  const newSection = generateSectionHtml(routePath);

  // Match existing section regex
  const sectionRegex = /<!--\s*Other Calculators Section\s*-->[\s\S]*?<\/section>/i;
  const sectionRegex2 = /<section\s+class="[^"]*other-calculators-section[^"]*"[\s\S]*?<\/section>/i;

  if (sectionRegex.test(content)) {
    content = content.replace(sectionRegex, newSection);
  } else if (sectionRegex2.test(content)) {
    content = content.replace(sectionRegex2, newSection);
  } else {
    // If not found, insert before footer or body end
    const footerIdx = content.indexOf("<footer");
    if (footerIdx !== -1) {
      content = content.slice(0, footerIdx) + newSection + "\n" + content.slice(footerIdx);
    }
  }

  // Ensure script is referenced
  if (!content.includes("/src/other-calculators.ts")) {
    const bodyEndIdx = content.lastIndexOf("</body>");
    if (bodyEndIdx !== -1) {
      content = content.slice(0, bodyEndIdx) + '  <script type="module" src="/src/other-calculators.ts"></script>\n' + content.slice(bodyEndIdx);
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Updated ${filePath}`);
}

for (const [filename, route] of Object.entries(fileToRouteMap)) {
  updateHtmlFile(path.join(process.cwd(), filename), route);
  const distPath = path.join(process.cwd(), "dist", filename);
  if (fs.existsSync(distPath)) {
    updateHtmlFile(distPath, route);
  }
}
