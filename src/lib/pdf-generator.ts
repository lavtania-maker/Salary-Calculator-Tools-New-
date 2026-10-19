import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export interface PDFReportOptions {
  title: string;
  data: Array<{ label: string; value: string | number }>;
  fileName: string;
}

export interface PDFReportResult {
  success: boolean;
  blobUrl: string;
  fileName: string;
}

export async function generatePDFReport(options: PDFReportOptions): Promise<PDFReportResult> {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
    const margin = 14;

    // Header Background Band
    doc.setFillColor(37, 99, 235); // Primary Blue #2563EB
    doc.rect(0, 0, pageWidth, 24, "F");

    // Header Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("SalaryCalculator.my", margin, 15);

    // Header Subtitle
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(224, 231, 255);
    doc.text("Official Malaysian Statutory & Payroll Tools", pageWidth - margin, 15, { align: "right" });

    // Document Title
    let currentY = 35;
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(options.title, margin, currentY);

    // Document Subtitle / Date
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) + " " + now.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Generated: ${dateStr}`, pageWidth - margin, currentY, { align: "right" });

    // Decorative line
    currentY += 4;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    // Find key metrics for summary highlight cards
    let mainIndex = options.data.length - 1;
    const keywords = ["net ", "final", "pro-rated", "take home", "hourly rate", "total socso", "total epf", "monthly pcb"];
    for (let i = 0; i < options.data.length; i++) {
      const lbl = options.data[i].label.toLowerCase();
      if (keywords.some((k) => lbl.includes(k))) {
        mainIndex = i;
        if (lbl.includes("net ") || lbl.includes("take home") || lbl.includes("final")) break;
      }
    }

    const indices = new Set<number>();
    indices.add(0);
    indices.add(mainIndex);
    if (options.data.length > 2) {
      let mid = 1;
      while (indices.has(mid) && mid < options.data.length) mid++;
      if (mid < options.data.length) indices.add(mid);
    }

    const cards = Array.from(indices)
      .sort((a, b) => a - b)
      .map((i) => options.data[i])
      .filter(Boolean);

    currentY += 6;
    if (cards.length > 0) {
      const cardGap = 4;
      const totalWidth = pageWidth - margin * 2;
      const cardWidth = (totalWidth - cardGap * (cards.length - 1)) / cards.length;
      const cardHeight = 20;

      cards.forEach((card, idx) => {
        const cardX = margin + idx * (cardWidth + cardGap);
        const isMain = card === options.data[mainIndex];

        if (isMain) {
          doc.setFillColor(239, 246, 255); // #EFF6FF
          doc.setDrawColor(37, 99, 235); // #2563EB
        } else {
          doc.setFillColor(248, 250, 252); // #F8FAFC
          doc.setDrawColor(226, 232, 240); // #E2E8F0
        }

        doc.roundedRect(cardX, currentY, cardWidth, cardHeight, 2, 2, "FD");

        // Card Label
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        if (isMain) {
          doc.setTextColor(37, 99, 235);
        } else {
          doc.setTextColor(100, 116, 139);
        }
        const cleanLabel = (card.label || "").toUpperCase();
        doc.text(cleanLabel, cardX + cardWidth / 2, currentY + 6.5, { align: "center", maxWidth: cardWidth - 4 });

        // Card Value
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        if (isMain) {
          doc.setTextColor(37, 99, 235);
        } else {
          doc.setTextColor(30, 41, 59);
        }
        doc.text(String(card.value || "-"), cardX + cardWidth / 2, currentY + 14.5, { align: "center", maxWidth: cardWidth - 4 });
      });

      currentY += cardHeight + 8;
    }

    // Prepare table data
    const tableBody = options.data.map((item) => {
      const valStr = String(item.value ?? "-");
      return [item.label, valStr];
    });

    // AutoTable Breakdown
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["Statutory & Calculation Breakdown", "Amount / Rate"]],
      body: tableBody,
      theme: "grid",
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9.5,
        cellPadding: 4,
      },
      styles: {
        fontSize: 9,
        cellPadding: 3.5,
        textColor: [30, 41, 59],
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: "auto", fontStyle: "normal" },
        1: { halign: "right", fontStyle: "bold", cellWidth: 55 },
      },
      didParseCell: (hookData) => {
        if (hookData.section === "body") {
          const rowIndex = hookData.row.index;
          const isLastRow = rowIndex === tableBody.length - 1;
          const rawValue = String(tableBody[rowIndex]?.[1] || "");

          if (isLastRow) {
            hookData.cell.styles.fontStyle = "bold";
            hookData.cell.styles.fillColor = [239, 246, 255];
            hookData.cell.styles.textColor = [37, 99, 235];
          } else if (rawValue.includes("-RM") || rawValue.includes("- RM") || rawValue.startsWith("-")) {
            if (hookData.column.index === 1) {
              hookData.cell.styles.textColor = [220, 38, 38]; // Red for deductions
            }
          }
        }
      },
    });

    // Footer at the bottom
    const finalY = (doc as any).lastAutoTable?.finalY || currentY + 40;
    const footerY = Math.max(finalY + 12, pageHeight - 25);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    const disclaimer =
      "Official Disclaimer: This report is generated for informative reference based on official Malaysian statutory guidelines (LHDN PCB, KWSP/EPF, SOCSO/PERKESO, EIS, and Employment Act 1955). Verify all figures with official statutory bodies.";
    doc.text(disclaimer, margin, footerY, { maxWidth: pageWidth - margin * 2 - 35 });

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text("salarycalculator.my", pageWidth - margin, footerY, { align: "right" });

    // Download execution with safe fallbacks
    const cleanFileName = (options.fileName || "Salary_Report").replace(/[^a-zA-Z0-9_-]/g, "_");
    const fullFileName = `${cleanFileName}.pdf`;

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    try {
      doc.save(fullFileName);
    } catch (saveErr) {
      console.warn("Direct doc.save() failed, using blob link fallback:", saveErr);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fullFileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 2000);
    }

    // Attach to any viewFileBtn on the page if present
    const viewFileBtn = document.getElementById("viewFileBtn") as HTMLAnchorElement | null;
    if (viewFileBtn) {
      viewFileBtn.href = blobUrl;
      viewFileBtn.download = fullFileName;
    }
    const mobileActionButtons = document.getElementById("mobileActionButtons");
    if (mobileActionButtons) {
      mobileActionButtons.style.display = "flex";
    }

    try {
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "pdf_download_success", {
          event_category: "calculator",
          report_name: options.fileName,
          method: "jspdf_auto",
        });
      }
    } catch (e) {}

    return {
      success: true,
      blobUrl,
      fileName: fullFileName,
    };
  } catch (err) {
    console.error("PDF Generation error:", err);
    throw err;
  }
}
