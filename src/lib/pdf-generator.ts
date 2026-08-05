export interface PDFReportOptions {
  title: string;
  data: Array<{ label: string; value: string | number }>;
  fileName: string;
}

export async function generatePDFReport(options: PDFReportOptions) {
  let html2pdf: any;
  try {
    const m = await import("html2pdf.js");
    html2pdf = m.default || m;
  } catch (e) {
    console.error("Failed to load html2pdf", e);
    return;
  }

  // Find main metrics for cards
  let mainIndex = options.data.length - 1;
  const keywords = ["net ", "final", "pro-rated", "total", "employee contribution", "take home"];
  for (let i = 0; i < options.data.length; i++) {
    const lbl = options.data[i].label.toLowerCase();
    if (keywords.some((k) => lbl.includes(k))) {
      mainIndex = i;
      if (lbl.includes("net ") || lbl.includes("final") || lbl.includes("take home")) break;
    }
  }

  const indices = new Set<number>();
  indices.add(0);
  indices.add(mainIndex);

  if (options.data.length > 2) {
    let middle = 1;
    while (indices.has(middle) && middle < options.data.length) middle++;
    if (middle < options.data.length) {
      indices.add(middle);
    }
  }

  const cards = Array.from(indices)
    .sort((a, b) => a - b)
    .map((i) => options.data[i]);

  let cardsHtml = "";
  cards.forEach((card) => {
    const isMain = card === options.data[mainIndex];
    const bg = isMain ? "#EFF6FF" : "#FFFFFF";
    const border = isMain ? "#2563EB" : "#E2E8F0";
    const labelColor = isMain ? "#2563EB" : "#475569";
    const valueColor = isMain ? "#2563EB" : "#1E293B";

    cardsHtml += `
      <div style="width: 100%; box-sizing: border-box; background: ${bg}; border: 1px solid ${border}; border-radius: 8px; padding: 16px; text-align: center;">
        <div style="font-size: 11px; color: ${labelColor}; text-transform: uppercase; margin-bottom: 6px; font-weight: 600;">${card.label}</div>
        <div style="font-size: 18px; color: ${valueColor}; font-weight: bold;">${card.value}</div>
      </div>
    `;
  });

  let tableRowsHtml = "";
  options.data.forEach((item, index) => {
    const valStr = String(item.value);
    const isDeduction =
      valStr.includes("-RM") || valStr.includes("- RM") || valStr.startsWith("-");
    const isPositiveAddition = !isDeduction && index !== options.data.length - 1 && (valStr.includes("RM") || typeof item.value === 'number');
    let color = "#1E293B";
    if (isDeduction) {
      color = "#DC2626";
    } else if (isPositiveAddition || index === options.data.length - 1) {
      color = "#2563EB";
    }
    const fontWeight = index === options.data.length - 1 ? "bold" : "normal";
    const bgColor = index % 2 === 0 ? "#ffffff" : "#f8fafc";

    tableRowsHtml += `
      <tr style="background-color: ${bgColor}; border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 14px 16px; font-size: 13px; color: #1E293B; font-weight: ${fontWeight};">${item.label}</td>
        <td style="text-align: right; padding: 14px 16px; font-size: 13px; color: ${color}; font-weight: ${fontWeight};">${item.value}</td>
      </tr>
    `;
  });

  const dateStr = new Date().toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.maxWidth = "750px";
  container.style.margin = "0 auto";
  container.style.padding = "20px";
  container.style.fontFamily = "Helvetica, Arial, sans-serif";
  container.style.color = "#1E293B";
  container.style.backgroundColor = "#FFFFFF";
  container.style.boxSizing = "border-box";

  container.innerHTML = `
    <!-- Document Header -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; width: 100%; box-sizing: border-box;">
      <div>
        <h1 style="color: #2563EB; font-size: 24px; font-weight: bold; margin: 0 0 5px 0;">SalaryCalculator.my</h1>
        <p style="color: #64748B; font-size: 12px; margin: 0;">Accurate Malaysian HR & Payroll Tools</p>
      </div>
      <div style="text-align: right;">
        <h2 style="color: #2563EB; font-size: 18px; font-weight: bold; margin: 0 0 5px 0; text-align: right;">${options.title}</h2>
        <p style="color: #64748B; font-size: 11px; margin: 0; text-align: right;">Generated on: ${dateStr}</p>
      </div>
    </div>
    
    <hr style="border: 0; border-top: 1px solid #E2E8F0; margin-bottom: 30px; width: 100%; box-sizing: border-box;" />

    <!-- Summary Cards Container -->
    <div style="display: grid; grid-template-columns: repeat(${cards.length}, 1fr); gap: 10px; width: 100%; box-sizing: border-box; margin-bottom: 30px;">
      ${cardsHtml}
    </div>

    <!-- Detailed Breakdown Table -->
    <table style="width: 100%; box-sizing: border-box; border-collapse: collapse; margin-top: 20px; margin-bottom: 30px;">
      <thead>
        <tr style="background-color: #F8FAFC; border-bottom: 2px solid #2563EB;">
          <th style="text-align: left; padding: 12px 16px; font-size: 12px; color: #2563EB; text-transform: uppercase;">Category / Description</th>
          <th style="text-align: right; padding: 12px 16px; font-size: 12px; color: #2563EB; text-transform: uppercase;">Amount / Value</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
    </table>

    <!-- Footer -->
    <div style="margin-top: auto; padding-top: 40px; width: 100%; box-sizing: border-box;">
      <hr style="border: 0; border-top: 1px solid #E2E8F0; margin-bottom: 15px;" />
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <p style="color: #64748B; font-size: 10px; line-height: 1.5; max-width: 70%; margin: 0;">
          Official Disclaimer: This report is generated for descriptive purposes based on official Malaysian statutory schedules (LHDN PCB, EPF, SOCSO/PERKESO, and Employment Act 1955 guidelines). Generated via salarycalculator.my.
        </p>
        <p style="color: #2563EB; font-size: 11px; font-weight: bold; margin: 0;">
          salarycalculator.my
        </p>
      </div>
    </div>
  `;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${options.fileName}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, windowWidth: 800 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(container).save();

  try {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "pdf_download_success", {
        event_category: "calculator",
        report_name: options.fileName,
        method: "auto_download",
      });
    }
  } catch (e) {}
}
