import { getMsRoute } from "./lib/route-map";

export interface CalculatorTool {
  path: string;
  title: string;
  description: string;
  borderColor: string;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  svgIcon: string;
}

export const CALCULATOR_TOOLS: CalculatorTool[] = [
  {
    path: "/",
    title: "Salary Calculator",
    description: "Calculate your exact take home pay after EPF, SOCSO, EIS & PCB deductions.",
    borderColor: "#fde68a",
    bgColor: "#fffbeb",
    iconBgColor: "#fef3c7",
    textColor: "#d97706",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path><circle cx="14" cy="9" r="1"></circle></svg>`
  },
  {
    path: "/socso-perkeso",
    title: "SOCSO Calculator",
    description: "Check employee and employer PERKESO & EIS contribution rates.",
    borderColor: "#bbf7d0",
    bgColor: "#f0fdf4",
    iconBgColor: "#dcfce7",
    textColor: "#166534",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
  },
  {
    path: "/pcb-income-tax",
    title: "PCB Calculator",
    description: "Calculate your monthly tax deduction (MTD) for employees & employers.",
    borderColor: "#bae6fd",
    bgColor: "#f0f9ff",
    iconBgColor: "#e0f2fe",
    textColor: "#075985",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#075985" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5V6.5"></path></svg>`
  },
  {
    path: "/epf-kwsp",
    title: "EPF Calculator",
    description: "Calculate EPF (KWSP) employee and employer contribution amounts.",
    borderColor: "#fecaca",
    bgColor: "#fef2f2",
    iconBgColor: "#fee2e2",
    textColor: "#991b1b",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#991b1b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M3 7v1a3 3 0 0 0 6 0V7m6 0v1a3 3 0 0 0 6 0V7M9 7h6"></path><path d="M5 21V10.85M19 21V10.85M9 21V14M15 21V14"></path><path d="M10.22 2.72a2 2 0 0 1 3.56 0L15 5H9l1.22-2.28Z"></path></svg>`
  },
  {
    path: "/annual-leave-calculator",
    title: "Annual Leave Calculator",
    description: "Calculate accurate pro-rated annual leave entitlement under Employment Act.",
    borderColor: "#e9d5ff",
    bgColor: "#faf5ff",
    iconBgColor: "#ede9fe",
    textColor: "#5b21b6",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>`
  },
  {
    path: "/overtime-pay-calculator",
    title: "Overtime Pay Calculator",
    description: "Calculate OT pay according to the Malaysian Employment Act.",
    borderColor: "#fde68a",
    bgColor: "#fffbeb",
    iconBgColor: "#fef3c7",
    textColor: "#b45309",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
  },
  {
    path: "/hourly-rate",
    title: "Hourly Rate Calculator",
    description: "Calculate your exact hourly rate, daily rate, and working hour breakdown.",
    borderColor: "#bfdbfe",
    bgColor: "#eff6ff",
    iconBgColor: "#dbeafe",
    textColor: "#1d4ed8",
    svgIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 16 10"></polyline><line x1="12" y1="2" x2="12" y2="4"></line></svg>`
  }
];

export const CALCULATOR_TOOLS_MS: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Kalkulator Gaji",
    description: "Kira gaji bersih anda selepas potongan KWSP, PERKESO, SIP & PCB."
  },
  "/socso-perkeso": {
    title: "Kalkulator SOCSO",
    description: "Semak kadar caruman PERKESO & SIP untuk pekerja dan majikan."
  },
  "/pcb-income-tax": {
    title: "Kalkulator PCB",
    description: "Kira potongan cukai bulanan (PCB) untuk pekerja & majikan."
  },
  "/epf-kwsp": {
    title: "Kalkulator KWSP",
    description: "Kira jumlah caruman pekerja dan majikan KWSP."
  },
  "/annual-leave-calculator": {
    title: "Kalkulator Cuti Tahunan",
    description: "Kira kelayakan cuti tahunan mengikut Akta Kerja Malaysia."
  },
  "/overtime-pay-calculator": {
    title: "Kalkulator Kerja Lebih Masa",
    description: "Kira bayaran Overtime (OT) mengikut Akta Kerja Malaysia."
  },
  "/hourly-rate": {
    title: "Kalkulator Kadar Gaji Sejam",
    description: "Kira kadar gaji Sejam, Harian, dan pecahan waktu kerja anda."
  }
};

export function normalizePath(p: string): string {
  let clean = (p || "/").split("?")[0].split("#")[0].toLowerCase();
  if (clean.endsWith(".html")) {
    clean = clean.substring(0, clean.length - 5);
  }
  if (clean === "" || clean === "/index") {
    clean = "/";
  }
  if (clean === "/hourly-rate-calculator") {
    clean = "/hourly-rate";
  }
  if (!clean.startsWith("/")) {
    clean = "/" + clean;
  }
  return clean;
}

export function renderOtherCalculators(containerOrSelector?: HTMLElement | string | null): void {
  const currentPath = normalizePath(window.location.pathname);
  const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms");
  
  // Filter out the current route
  let remaining = CALCULATOR_TOOLS.filter(tool => normalizePath(tool.path) !== currentPath);
  if (remaining.length > 6) {
    remaining = remaining.slice(0, 6);
  }

  // Find container
  let container: HTMLElement | null = null;
  if (typeof containerOrSelector === "string") {
    container = document.querySelector(containerOrSelector);
  } else if (containerOrSelector instanceof HTMLElement) {
    container = containerOrSelector;
  } else {
    container = document.querySelector(".other-calculators-section .container") || document.querySelector(".other-calculators-section");
  }

  if (!container) return;

  const cardsHtml = remaining.map(tool => {
    const msInfo = CALCULATOR_TOOLS_MS[tool.path];
    const toolTitle = (isMs && msInfo) ? msInfo.title : tool.title;
    const toolDesc = (isMs && msInfo) ? msInfo.description : tool.description;
    return `
    <a href="${isMs ? getMsRoute(tool.path) : tool.path}" class="other-calc-card hover-lift" style="padding: 24px; border: 1px solid ${tool.borderColor}; border-radius: 12px; background: ${tool.bgColor}; text-decoration: none; box-shadow: 0 2px 4px -1px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: block;" onmouseover="this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 10px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.05)';">
      <div style="background: ${tool.iconBgColor}; width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        ${tool.svgIcon}
      </div>
      <h3 style="color: ${tool.textColor}; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">${toolTitle}</h3>
      <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 0;">${toolDesc}</p>
    </a>
  `;
  }).join("");

  const sectionTitle = isMs ? "Cuba Kalkulator Percuma Kami Yang Lain" : "Try Our Other Free Calculators";
  const sectionSubtitle = isMs ? "Alat pengiraan sumber manusia yang percuma, pantas dan tepat untuk Malaysia." : "Free, instant and accurate HR calculation tools for Malaysia.";

  const sectionContent = `
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
      <h2 class="seo-title" style="color: #2563eb !important;">${sectionTitle}</h2>
      <p class="seo-subtitle" style="color: #64748b; font-size: 1rem; margin-bottom: 24px;">${sectionSubtitle}</p>
      <div class="other-calculators-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  container.innerHTML = sectionContent;
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderOtherCalculators());
  } else {
    renderOtherCalculators();
  }
}

// Add data-label to all table cells for mobile responsive cards
if (typeof document !== "undefined") { document.addEventListener("DOMContentLoaded", () => {
  const tables = document.querySelectorAll(".table-responsive table, .table-container table, .seo-table-wrapper table");
  tables.forEach(table => {
    const headers = Array.from(table.querySelectorAll("th")).map(th => th.textContent?.trim() || "");
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      cells.forEach((cell, index) => {
        if (headers[index]) {
          cell.setAttribute("data-label", headers[index]);
        }
      });
    });
  });
}); }
