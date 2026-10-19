// Salary Calculator Logic

let lastSalaryCalculation: any = null;

function formatCurrency(amount: number): string {
  return (
    "RM " +
    amount.toLocaleString("en-MY", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

import { getSocsoRates } from "./lib/socso";
import { calculateOfficialPcb } from "./lib/pcb";

export function calculateSalary(scrollOnMobile = false) {
  try {
    const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");

    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click_calculate", {
        event_category: "calculator",
        event_label: "Calculate Button",
      });
    }

    const grossSalaryEl = document.getElementById("grossSalary") as HTMLInputElement | null;
    const bonusEl = document.getElementById("bonus") as HTMLInputElement | null;
    const maritalStatusEl = document.getElementById("maritalStatus") as HTMLSelectElement | null;
    const nationalityEl = document.getElementById("nationality") as HTMLSelectElement | null;
    const childrenEl = document.getElementById("children") as HTMLInputElement | null;

    const grossSalary = grossSalaryEl ? parseFloat(grossSalaryEl.value) || 0 : 0;
    const bonus = bonusEl ? parseFloat(bonusEl.value) || 0 : 0;
    const maritalStatus = maritalStatusEl ? maritalStatusEl.value : "single";
    const nationality = nationalityEl ? nationalityEl.value : "malaysian";
    const childrenCount = childrenEl ? parseInt(childrenEl.value) || 0 : 0;

    const includeEpfEl = document.getElementById("includeEpf") as HTMLInputElement | null;
    const includeSocsoEl = document.getElementById("includeSocso") as HTMLInputElement | null;
    const includeEisEl = document.getElementById("includeEis") as HTMLInputElement | null;
    const includePcbEl = document.getElementById("includePcb") as HTMLInputElement | null;

    const includeEpf = includeEpfEl ? includeEpfEl.checked : true;
    const includeSocso = includeSocsoEl ? includeSocsoEl.checked : true;
    const includeEis = includeEisEl ? includeEisEl.checked : true;
    const includePcb = includePcbEl ? includePcbEl.checked : true;

    // 1. TOTAL INCOME
    const totalIncome = grossSalary + bonus;

    // 2. EPF
    let epf = 0;
    let epfEmployer = 0;
    if (includeEpf && nationality === "malaysian") {
      epf = totalIncome * 0.11;
      epfEmployer = totalIncome <= 5000 ? totalIncome * 0.13 : totalIncome * 0.12;
    }

    // 3. SOCSO
    let socso = 0;
    let socsoEmployer = 0;
    if (includeSocso) {
      const socsoRates = getSocsoRates(totalIncome, "below60", nationality);
      socso = socsoRates.ee;
      socsoEmployer = socsoRates.er;
    }

    // 4. EIS
    let eis = 0;
    let eisEmployer = 0;
    if (includeEis) {
      const eisBase = Math.min(totalIncome, 6000);
      if (eisBase <= 300) {
        eis = 0.5;
        eisEmployer = 0.5;
      } else {
        const bracketMultiplier = Math.ceil(eisBase / 100);
        eis = bracketMultiplier * 0.2 - 0.1;
        eisEmployer = bracketMultiplier * 0.2 - 0.1;
        eis = Math.round(eis * 100) / 100;
        eisEmployer = Math.round(eisEmployer * 100) / 100;
      }
    }

    // 5. PCB (Official HASiL 2026 Computerised Specification)
    let pcb = 0;
    if (includePcb) {
      const pcbResult = calculateOfficialPcb({
        grossSalary,
        bonus,
        epfRate: 0.11,
        includeEpf: includeEpf && nationality === "malaysian",
        maritalStatus,
        childrenCount,
      });
      pcb = pcbResult.monthlyPcb;
    }

    // Update UI elements
    const resGrossMonthly = document.getElementById("resGrossMonthly");
    if (resGrossMonthly) resGrossMonthly.textContent = formatCurrency(totalIncome);

    const resGrossAnnual = document.getElementById("resGrossAnnual");
    if (resGrossAnnual) resGrossAnnual.textContent = formatCurrency(totalIncome * 12);

    // Dynamic Deductions
    const container = document.getElementById("employeeDeductionsContainer");
    let totalDeductions = 0;
    if (container) {
      container.innerHTML = "";
      const addDeduction = (label: string, amount: number) => {
        if (amount > 0) {
          const div = document.createElement("div");
          div.className = "result-item";
          div.innerHTML = `<span>${label}</span><span>- ${formatCurrency(amount)}</span>`;
          container.appendChild(div);
          totalDeductions += amount;
        }
      };

      addDeduction(isMs ? "KWSP (11%)" : "EPF (11%)", epf);
      addDeduction(isMs ? "PERKESO" : "SOCSO", socso);
      addDeduction(isMs ? "SIP (0.2%)" : "EIS (0.2%)", eis);
      const pcbPercent = totalIncome > 0 ? ((pcb / totalIncome) * 100).toFixed(1) : "0";
      addDeduction(`PCB (${pcbPercent}%)`, pcb);
    } else {
      totalDeductions = epf + socso + eis + pcb;
    }

    const resTotalDeductions = document.getElementById("resTotalDeductions");
    if (resTotalDeductions) resTotalDeductions.textContent = "- " + formatCurrency(totalDeductions);

    // Dynamic Employer Contributions
    const employerContainer = document.getElementById("employerContributionsContainer");
    let totalEmployerContribution = 0;
    if (employerContainer) {
      employerContainer.innerHTML = "";
      const addEmployerContribution = (label: string, amount: number) => {
        if (amount > 0) {
          const div = document.createElement("div");
          div.className = "result-item";
          div.innerHTML = `<span>${label}</span><span>${formatCurrency(amount)}</span>`;
          employerContainer.appendChild(div);
          totalEmployerContribution += amount;
        }
      };

      const epfEmployerLabel = totalIncome <= 5000 
        ? (isMs ? "KWSP (13%)" : "EPF (13%)")
        : (isMs ? "KWSP (12%)" : "EPF (12%)");
      addEmployerContribution(epfEmployerLabel, epfEmployer);
      addEmployerContribution(isMs ? "PERKESO" : "SOCSO", socsoEmployer);
      addEmployerContribution(isMs ? "SIP (0.2%)" : "EIS (0.2%)", eisEmployer);
    } else {
      totalEmployerContribution = epfEmployer + socsoEmployer + eisEmployer;
    }

    const resTotalEmployerContribution = document.getElementById("resTotalEmployerContribution");
    if (resTotalEmployerContribution) resTotalEmployerContribution.textContent = formatCurrency(totalEmployerContribution);

    const resTotalEmployerCost = document.getElementById("resTotalEmployerCost");
    if (resTotalEmployerCost) resTotalEmployerCost.textContent = formatCurrency(totalIncome + totalEmployerContribution);

    const resNetMonthly = document.getElementById("resNetMonthly");
    if (resNetMonthly) resNetMonthly.textContent = formatCurrency(totalIncome - totalDeductions);

    const resNetAnnual = document.getElementById("resNetAnnual");
    if (resNetAnnual) resNetAnnual.textContent = formatCurrency((totalIncome - totalDeductions) * 12);

    // Update Visual Bar and Breakdown
    const netSalary = totalIncome - totalDeductions;
    const netPercent = totalIncome > 0 ? (netSalary / totalIncome) * 100 : 0;
    const dedPercent = totalIncome > 0 ? (totalDeductions / totalIncome) * 100 : 0;

    const netPctFormatted = Math.round(netPercent * 10) / 10;
    const dedPctFormatted = Math.round(dedPercent * 10) / 10;

    const barNet = document.getElementById("barNet");
    if (barNet) barNet.style.width = netPercent + "%";

    const barDeduction = document.getElementById("barDeduction");
    if (barDeduction) barDeduction.style.width = dedPercent + "%";

    const barNetCompact = document.getElementById("barNetCompact");
    if (barNetCompact) barNetCompact.style.width = netPercent + "%";

    const barDedCompact = document.getElementById("barDedCompact");
    if (barDedCompact) barDedCompact.style.width = dedPercent + "%";

    const resPctNetCompact = document.getElementById("resPctNetCompact");
    if (resPctNetCompact) resPctNetCompact.textContent = netPctFormatted.toString();

    const resPctDedCompact = document.getElementById("resPctDedCompact");
    if (resPctDedCompact) resPctDedCompact.textContent = dedPctFormatted.toString();

    const resSummaryNetVal = document.getElementById("resSummaryNetVal");
    if (resSummaryNetVal) resSummaryNetVal.textContent = formatCurrency(netSalary);

    const resSummaryDedVal = document.getElementById("resSummaryDedVal");
    if (resSummaryDedVal) resSummaryDedVal.textContent = formatCurrency(totalDeductions);

    // Income Group Logic
    let incomeGroup = "B40";
    let subGroup = "B1";
    let groupColor = "#ef4444";
    let groupBg = "#fef2f2";
    let groupBorder = "#fee2e2";
    let shortExplanation = "lower income group";
    let shortExplanationMs = "kumpulan pendapatan rendah";

    if (grossSalary >= 15040) {
      incomeGroup = "T20";
      subGroup = "T2";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "upper income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (grossSalary >= 11820) {
      incomeGroup = "T20";
      subGroup = "T1";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "upper income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (grossSalary >= 10300) {
      incomeGroup = "M40";
      subGroup = "M4";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (grossSalary >= 8700) {
      incomeGroup = "M40";
      subGroup = "M3";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (grossSalary >= 7110) {
      incomeGroup = "M40";
      subGroup = "M2";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (grossSalary >= 5250) {
      incomeGroup = "M40";
      subGroup = "M1";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (grossSalary >= 3970) {
      incomeGroup = "B40";
      subGroup = "B4";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (grossSalary >= 3170) {
      incomeGroup = "B40";
      subGroup = "B3";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (grossSalary >= 2500) {
      incomeGroup = "B40";
      subGroup = "B2";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else {
      incomeGroup = "B40";
      subGroup = "B1";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    }
    const groupLabel = document.getElementById("resIncomeGroupLabel");
    if (groupLabel) {
      groupLabel.textContent = `${incomeGroup} (${subGroup})`;
      groupLabel.style.backgroundColor = groupColor;
    }

    const groupBarB40 = document.getElementById("groupBarB40");
    if (groupBarB40) groupBarB40.style.opacity = incomeGroup === "B40" ? "1" : "0.2";

    const groupBarM40 = document.getElementById("groupBarM40");
    if (groupBarM40) groupBarM40.style.opacity = incomeGroup === "M40" ? "1" : "0.2";

    const groupBarT20 = document.getElementById("groupBarT20");
    if (groupBarT20) groupBarT20.style.opacity = incomeGroup === "T20" ? "1" : "0.2";

    const descriptionEl = document.getElementById("resIncomeGroupDescription");
    if (descriptionEl) {
      const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");
      
      descriptionEl.innerHTML = isMs 
        ? `Dengan jumlah pendapatan bulanan anda, anda berada dalam <strong style="color: ${groupColor}; font-weight: 800;">kategori ${incomeGroup} (${subGroup}) (${shortExplanationMs})</strong> di Malaysia.`
        : `With your total monthly income, you're in the <strong style="color: ${groupColor}; font-weight: 800;">${incomeGroup} (${subGroup}) category (${shortExplanation})</strong> in Malaysia.`;
    }

    const section = document.getElementById("incomeGroupSection");
    if (section) {
      section.style.backgroundColor = groupBg;
      section.style.borderColor = groupBorder;
      section.style.display = "block";
    }

    // Toggle result visibility
    const placeholder = document.getElementById("placeholder");
    if (placeholder) placeholder.style.display = "none";

    const results = document.getElementById("results");
    if (results) {
      results.classList.add("show");
      results.style.display = "block";
    }

    lastSalaryCalculation = {
      grossSalary,
      bonus,
      totalIncome,
      epf,
      epfEmployer,
      socso,
      socsoEmployer,
      eis,
      eisEmployer,
      pcb,
      netSalary: totalIncome - totalDeductions,
      totalDeductions,
      incomeGroup: `${incomeGroup} (${subGroup})`
    };

    updatePremiumIncomeJourney(totalIncome, grossSalary);

    if (scrollOnMobile && typeof window !== "undefined" && window.innerWidth < 768 && grossSalary > 0) {
      scrollToResultsOnMobile();
    }
  } catch (err) {
    console.error("Salary calculation error:", err);
  }
}

function scrollToResultsOnMobile() {
  if (typeof window === "undefined" || window.innerWidth >= 768) return;

  const target = document.getElementById("resultCard") || document.getElementById("results");
  if (!target) return;

  requestAnimationFrame(() => {
    const navbar = document.querySelector(".navbar") as HTMLElement | null;
    const navHeight = navbar ? navbar.getBoundingClientRect().height : 54;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const targetRect = target.getBoundingClientRect();
    const targetTop = targetRect.top + scrollY - navHeight - 16;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  });
}

// Expose on window for any inline handlers
(window as any).calculateSalary = calculateSalary;

function initSalaryCalculator() {
  let shouldScrollOnMobileAfterCalc = false;

  const form = document.getElementById("salaryForm") as HTMLFormElement | null;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const shouldScroll = shouldScrollOnMobileAfterCalc;
      shouldScrollOnMobileAfterCalc = false;
      calculateSalary(shouldScroll);
    });
  }

  const calcBtn = document.getElementById("calculateBtn") as HTMLButtonElement | null;
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      if (form) {
        if (!form.checkValidity()) {
          shouldScrollOnMobileAfterCalc = false;
          if (typeof form.reportValidity === "function") {
            form.reportValidity();
          }
          return;
        }
        shouldScrollOnMobileAfterCalc = true;
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
      } else {
        calculateSalary(true);
      }
    });
  }

  const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement | null;
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const placeholder = document.getElementById("placeholder");
      if (placeholder) placeholder.style.display = "block";

      const results = document.getElementById("results");
      if (results) {
        results.classList.remove("show");
        results.style.display = "none";
      }
    });
  }

  const downloadReportBtn = document.getElementById(
    "downloadReportBtn",
  ) as HTMLButtonElement | null;
  const downloadPayslipBtn = document.getElementById(
    "downloadPayslipBtn",
  ) as HTMLButtonElement | null;
  const emailModal = document.getElementById(
    "emailModal",
  ) as HTMLElement | null;
  const closeModalBtn = document.getElementById(
    "closeModal",
  ) as HTMLElement | null;
  const emailForm = document.getElementById(
    "emailForm",
  ) as HTMLFormElement | null;
  const userEmail = document.getElementById(
    "userEmail",
  ) as HTMLInputElement | null;
  const userName = document.getElementById(
    "userName",
  ) as HTMLInputElement | null;
  const userType = document.getElementById(
    "userType",
  ) as HTMLSelectElement | null;
  const userPhone = document.getElementById(
    "userPhone",
  ) as HTMLInputElement | null;
  const hiringQuestionGroup = document.getElementById(
    "hiringQuestionGroup",
  ) as HTMLElement | null;
  const hiringStatus = document.getElementById(
    "hiringStatus",
  ) as HTMLSelectElement | null;
  const companyNameGroup = document.getElementById(
    "companyNameGroup",
  ) as HTMLElement | null;
  const companyName = document.getElementById(
    "companyName",
  ) as HTMLInputElement | null;
  const modalFormContent = document.getElementById(
    "modalFormContent",
  ) as HTMLElement | null;
  const modalSuccessContent = document.getElementById(
    "modalSuccessContent",
  ) as HTMLElement | null;
  const modalFeedback = document.getElementById(
    "modalFeedback",
  ) as HTMLElement | null;

  if (downloadReportBtn) {
    downloadReportBtn.addEventListener("click", () => {
      if (emailModal) {
        emailModal.style.display = "flex";
      }
    });
  }

  if (downloadPayslipBtn) {
    downloadPayslipBtn.addEventListener("click", () => {
      if (emailModal) {
        emailModal.style.display = "flex";
      }
    });
  }

  if (closeModalBtn && emailModal) {
    closeModalBtn.addEventListener("click", () => {
      emailModal.style.display = "none";
    });
  }

  if (emailModal) {
    emailModal.addEventListener("click", (e) => {
      if (e.target === emailModal) emailModal.style.display = "none";
    });
  }

  if (userType) {
    userType.addEventListener("change", () => {
      const isEmployer = userType.value === "Employer / HR";
      if (companyNameGroup) companyNameGroup.style.display = isEmployer ? "block" : "none";
      if (hiringQuestionGroup) hiringQuestionGroup.style.display = isEmployer ? "block" : "none";
    });
  }

  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = userEmail ? userEmail.value.trim() : "";
      const name = userName ? userName.value.trim() : "";
      const role = userType ? userType.value : "";
      let phone = userPhone ? userPhone.value.trim() : "";
      if (phone) {
        phone = phone.replace(/\D/g, '').replace(/^(60|0)/, '');
        phone = '+60' + phone;
      }
      const comp = companyName ? companyName.value.trim() : "";
      const hire = hiringStatus ? hiringStatus.value : "";

      const submitBtn = emailForm.querySelector(
        'button[type="submit"]',
      ) as HTMLButtonElement | null;
      let originalText = "Submit & Download";
      if (submitBtn) {
        originalText = submitBtn.textContent || "Submit & Download";
        submitBtn.textContent = "Generating your report...";
        submitBtn.disabled = true;
      }

      try {
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          name: name,
          email: email,
          userType: role,
          hiringStatus: hire || "",
          companyName: comp || "",
          userPhone: phone || "",
          action: "Download Salary Report",
          download_via: "Download Salary Report"
        };

        const dbPayload: any = {
          email: email,
          name: name,
          userType: role,
          action: "Download Salary Report",
          createdAt: new Date().toISOString()
        };
        if (comp) dbPayload.companyName = comp;
        if (hire) dbPayload.hiringStatus = hire;
        if (phone) {
          dbPayload.phoneNumber = phone;
          dbPayload.userPhone = phone;
        }

        if (lastSalaryCalculation) {
          dbPayload.salary = lastSalaryCalculation.grossSalary;
          dbPayload.bonus = lastSalaryCalculation.bonus;
          dbPayload.employeeEpf = lastSalaryCalculation.epf;
          dbPayload.employerEpf = lastSalaryCalculation.epfEmployer;
          dbPayload.employeeSocso = lastSalaryCalculation.socso;
          dbPayload.employerSocso = lastSalaryCalculation.socsoEmployer;
          dbPayload.employeeEis = lastSalaryCalculation.eis;
          dbPayload.employerEis = lastSalaryCalculation.eisEmployer;
          dbPayload.employeePcb = lastSalaryCalculation.pcb;
          dbPayload.netSalary = lastSalaryCalculation.netSalary;
          dbPayload.totalDeductions = lastSalaryCalculation.totalDeductions;
        }

        // 1. Store lead in Firestore (non-blocking in background)
        Promise.all([
          import("firebase/firestore"),
          import("./firebase")
        ]).then(([{ collection, addDoc }, { db }]) => {
          addDoc(collection(db, "leads"), dbPayload).catch((fErr) => {
            console.warn("Firestore leads record error:", fErr);
          });
        }).catch((err) => {
          console.warn("Firestore import error:", err);
        });

        // 2. Submit to Google Sheet via server proxy (non-blocking in background)
        fetch("/api/salary-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        }).catch((sErr) => {
          console.warn("Google Sheets record error:", sErr);
        });

        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "submit_lead_salary", {
            event_category: "lead",
          });
        }

        const calc = lastSalaryCalculation || {
          grossSalary: 0,
          bonus: 0,
          totalIncome: 0,
          epf: 0,
          epfEmployer: 0,
          socso: 0,
          socsoEmployer: 0,
          eis: 0,
          eisEmployer: 0,
          pcb: 0,
          netSalary: 0,
          totalDeductions: 0,
          incomeGroup: "-"
        };

        // 3. Generate & Download PDF Report
        const { generatePDFReport } = await import("./lib/pdf-generator");
        await generatePDFReport({
          title: "Salary & Take Home Pay Report",
          fileName: "Salary_Report",
          data: [
            { label: "Gross Monthly Salary", value: `RM ${calc.grossSalary.toFixed(2)}` },
            { label: "Bonus / Other Income", value: `RM ${calc.bonus.toFixed(2)}` },
            { label: "Employee EPF Deduction (11%)", value: `RM ${calc.epf.toFixed(2)}` },
            { label: "Employee SOCSO Deduction", value: `RM ${calc.socso.toFixed(2)}` },
            { label: "Employee EIS Deduction", value: `RM ${calc.eis.toFixed(2)}` },
            { label: "Monthly PCB Tax Deduction", value: `RM ${calc.pcb.toFixed(2)}` },
            { label: "Net Take Home Pay", value: `RM ${calc.netSalary.toFixed(2)}` },
            { label: "Employer EPF Contribution", value: `RM ${calc.epfEmployer.toFixed(2)}` },
            { label: "Employer SOCSO Contribution", value: `RM ${calc.socsoEmployer.toFixed(2)}` },
            { label: "Employer EIS Contribution", value: `RM ${calc.eisEmployer.toFixed(2)}` },
            { label: "Income Category", value: calc.incomeGroup }
          ]
        });

        if (modalFormContent) modalFormContent.style.display = "none";
        if (modalSuccessContent) modalSuccessContent.style.display = "block";
        if (modalFeedback) {
          modalFeedback.textContent = "Thank you! Your Salary report has been downloaded.";
          modalFeedback.style.display = "block";
        }

        if (role === "Employer / HR" || role === "Employer/HR") {
          const hiringModal = document.getElementById("hiringIntentModal");
          if (hiringModal) {
            hiringModal.style.display = "flex";
            (window as any)._currentLeadEmail = email;
            (window as any)._currentLeadType = "Salary Calculator";
          }
        }
      } catch (err: any) {
        console.error("Critical submission error handled:", err);
        if (modalFeedback) {
          modalFeedback.textContent = err.message || "Failed to generate report. Please try again.";
          modalFeedback.style.color = "#dc2626";
          modalFeedback.style.display = "block";
        } else {
          alert("Failed to generate report. Please try again.");
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

  // --- Share Calculation Feature ---
  const shareBtn = document.getElementById("shareCalculationBtn");
  const shareModal = document.getElementById("shareCalculationModal");
  const closeShareModalBtn = document.getElementById("closeShareModal");
  const shareUrlInput = document.getElementById("shareCalculationUrlInput") as HTMLInputElement | null;
  const shareDirectCopyBtn = document.getElementById("shareDirectCopyBtn");
  const shareChannelCopy = document.getElementById("shareChannelCopy");
  const shareChannelWhatsapp = document.getElementById("shareChannelWhatsapp") as HTMLAnchorElement | null;
  const shareChannelX = document.getElementById("shareChannelX") as HTMLAnchorElement | null;
  const shareChannelThreads = document.getElementById("shareChannelThreads") as HTMLAnchorElement | null;
  const shareSuccessAlert = document.getElementById("shareCopySuccessAlert");
  const sharedResultBanner = document.getElementById("sharedResultBanner");
  const createOwnBtn = document.getElementById("createOwnCalculationBtn");
  const createOwnContainer = document.getElementById("createOwnCalculationContainer");

  const buildShareUrl = () => {
    const grossVal = (document.getElementById("grossSalary") as HTMLInputElement)?.value || "0";
    const bonusVal = (document.getElementById("bonus") as HTMLInputElement)?.value || "0";
    const statusVal = (document.getElementById("maritalStatus") as HTMLSelectElement)?.value || "single";
    const natVal = (document.getElementById("nationality") as HTMLSelectElement)?.value || "malaysian";
    const epfVal = (document.getElementById("includeEpf") as HTMLInputElement)?.checked ? "1" : "0";
    const socsoVal = (document.getElementById("includeSocso") as HTMLInputElement)?.checked ? "1" : "0";
    const eisVal = (document.getElementById("includeEis") as HTMLInputElement)?.checked ? "1" : "0";
    const pcbVal = (document.getElementById("includePcb") as HTMLInputElement)?.checked ? "1" : "0";

    const url = new URL(window.location.href);
    url.searchParams.set("gross", grossVal);
    url.searchParams.set("bonus", bonusVal);
    url.searchParams.set("status", statusVal);
    url.searchParams.set("nat", natVal);
    url.searchParams.set("epf", epfVal);
    url.searchParams.set("socso", socsoVal);
    url.searchParams.set("eis", eisVal);
    url.searchParams.set("pcb", pcbVal);
    url.searchParams.set("shared", "1");
    return url.toString();
  };

  let copyTimeout: any = null;
  const executeCopy = async (url: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      if (shareDirectCopyBtn) {
        shareDirectCopyBtn.textContent = "✓ Copied";
        shareDirectCopyBtn.classList.add("copied");
      }
      if (shareSuccessAlert) {
        shareSuccessAlert.style.display = "flex";
      }
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        if (shareDirectCopyBtn) {
          shareDirectCopyBtn.textContent = "Copy";
          shareDirectCopyBtn.classList.remove("copied");
        }
        if (shareSuccessAlert) {
          shareSuccessAlert.style.display = "none";
        }
      }, 3000);
    } catch (err) {
      console.error("Clipboard copy error:", err);
    }
  };

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      calculateSalary();
      const shareUrl = buildShareUrl();
      if (shareUrlInput) shareUrlInput.value = shareUrl;

      if (shareChannelWhatsapp) {
        const text = `Check out my Malaysia salary calculation on SalaryCalculator.my: ${shareUrl}`;
        shareChannelWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      }

      if (shareChannelX) {
        const text = `Check my salary calculation: ${shareUrl}`;
        shareChannelX.href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
      }

      if (shareChannelThreads) {
        const text = `Check my salary calculation: ${shareUrl}`;
        shareChannelThreads.href = `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`;
      }

      if (shareDirectCopyBtn) {
        shareDirectCopyBtn.textContent = "Copy";
        shareDirectCopyBtn.classList.remove("copied");
      }
      if (shareSuccessAlert) {
        shareSuccessAlert.style.display = "none";
      }

      if (shareModal) shareModal.style.display = "flex";
    });
  }

  if (closeShareModalBtn && shareModal) {
    closeShareModalBtn.addEventListener("click", () => {
      shareModal.style.display = "none";
    });
  }

  if (shareModal) {
    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) {
        shareModal.style.display = "none";
      }
    });
  }

  if (shareChannelCopy) {
    shareChannelCopy.addEventListener("click", (e) => {
      e.preventDefault();
      const url = shareUrlInput?.value || buildShareUrl();
      executeCopy(url);
    });
  }

  if (shareDirectCopyBtn) {
    shareDirectCopyBtn.addEventListener("click", () => {
      const url = shareUrlInput?.value || buildShareUrl();
      executeCopy(url);
    });
  }

  if (createOwnBtn) {
    createOwnBtn.addEventListener("click", () => {
      if (sharedResultBanner) sharedResultBanner.style.display = "none";
      if (createOwnContainer) createOwnContainer.style.display = "none";
      window.history.replaceState({}, document.title, window.location.pathname);
      const grossInput = document.getElementById("grossSalary") as HTMLInputElement | null;
      if (grossInput) {
        grossInput.focus();
        grossInput.select();
      }
      const formEl = document.getElementById("salaryForm");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Check URL parameters for shared calculation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("gross")) {
    const grossParam = urlParams.get("gross");
    const grossInput = document.getElementById("grossSalary") as HTMLInputElement | null;
    if (grossInput && grossParam) {
      grossInput.value = grossParam;
      grossInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (urlParams.has("bonus")) {
      const bonusInput = document.getElementById("bonus") as HTMLInputElement | null;
      if (bonusInput) bonusInput.value = urlParams.get("bonus") || "0";
    }

    if (urlParams.has("status")) {
      const statusSelect = document.getElementById("maritalStatus") as HTMLSelectElement | null;
      if (statusSelect) statusSelect.value = urlParams.get("status") || "single";
    }

    if (urlParams.has("nat")) {
      const natSelect = document.getElementById("nationality") as HTMLSelectElement | null;
      if (natSelect) natSelect.value = urlParams.get("nat") || "malaysian";
    }

    if (urlParams.has("epf")) {
      const epfCheck = document.getElementById("includeEpf") as HTMLInputElement | null;
      if (epfCheck) epfCheck.checked = urlParams.get("epf") === "1";
    }
    if (urlParams.has("socso")) {
      const socsoCheck = document.getElementById("includeSocso") as HTMLInputElement | null;
      if (socsoCheck) socsoCheck.checked = urlParams.get("socso") === "1";
    }
    if (urlParams.has("eis")) {
      const eisCheck = document.getElementById("includeEis") as HTMLInputElement | null;
      if (eisCheck) eisCheck.checked = urlParams.get("eis") === "1";
    }
    if (urlParams.has("pcb")) {
      const pcbCheck = document.getElementById("includePcb") as HTMLInputElement | null;
      if (pcbCheck) pcbCheck.checked = urlParams.get("pcb") === "1";
    }

    // Automatically calculate
    calculateSalary();

    if (urlParams.get("shared") === "1") {
      if (sharedResultBanner) sharedResultBanner.style.display = "flex";
      if (createOwnContainer) createOwnContainer.style.display = "block";
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSalaryCalculator);
} else {
  initSalaryCalculator();
}


function updatePremiumIncomeJourney(totalIncome: number, grossSalary: number) {
  const section = document.getElementById("premiumIncomeJourneySection");
  if (!section) return;

  const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");

  let currentGroup = "B40";
  let nextGroup = "M40";
  let lowerBound = 0;
  let upperBound = 5250; 
  let isT20 = false;
  
  if (grossSalary >= 11820) {
    currentGroup = "T20";
    nextGroup = "None";
    lowerBound = 11820;
    upperBound = 11820;
    isT20 = true;
  } else if (totalIncome >= 5250) {
    currentGroup = "M40";
    nextGroup = "T20";
    lowerBound = 5250;
    upperBound = 11820;
  } else {
    currentGroup = "B40";
    nextGroup = "M40";
    lowerBound = 0;
    upperBound = 5250;
  }

  let progressPct = 0;
  let trackPct = 0;
  let amountNeeded = 0;
  
  if (isT20) {
    progressPct = 100;
    trackPct = 100;
  } else {
    amountNeeded = upperBound - grossSalary;
    if (amountNeeded < 0) amountNeeded = 0;
    progressPct = Math.round((grossSalary / upperBound) * 100);
    if (progressPct > 100) progressPct = 100;

    if (grossSalary < 5250) {
      const segmentRatio = Math.min(grossSalary / 5249, 1);
      trackPct = segmentRatio * 45;
    } else if (grossSalary < 11820) {
      const segmentRatio = Math.min((grossSalary - 5250) / (11819 - 5250), 1);
      trackPct = 50 + (segmentRatio * 45);
    }
  }
  
  if (trackPct > 100) trackPct = 100;
  if (trackPct < 0) trackPct = 0;
  
  const badge = document.getElementById("journeyCurrentBadge");
  if (badge) {
    badge.textContent = currentGroup;
    badge.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
    badge.style.boxShadow = `0 4px 14px -4px ${currentGroup === "B40" ? "rgba(239, 68, 68, 0.4)" : currentGroup === "M40" ? "rgba(202, 138, 4, 0.4)" : "rgba(22, 163, 74, 0.4)"}`;
  }

  const trackFill = document.getElementById("journeyTrackFill");
  if (trackFill) {
    trackFill.style.transform = `scaleX(${trackPct / 100})`;
    trackFill.style.transformOrigin = "left";
    trackFill.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }

  const youAreHere = document.getElementById("journeyYouAreHere");
  if (youAreHere) {
    youAreHere.style.left = `${trackPct}%`;
    youAreHere.style.color = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
    youAreHere.innerHTML = isMs 
      ? `Anda di sini <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 2px auto 0"><polyline points="6 9 12 15 18 9"></polyline></svg>` 
      : `You are here <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: 2px auto 0"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  }
  
  const nodeB40 = document.getElementById("nodeB40");
  const nodeM40 = document.getElementById("nodeM40");
  const nodeT20 = document.getElementById("nodeT20");
  
  if (nodeB40) nodeB40.style.borderColor = "#ef4444";
  if (nodeM40) nodeM40.style.borderColor = grossSalary >= 5250 ? (currentGroup === "M40" ? "#eab308" : "#16a34a") : "#e2e8f0";
  if (nodeT20) nodeT20.style.borderColor = grossSalary >= 11820 ? "#16a34a" : "#e2e8f0";

  const nextGoalContent = document.getElementById("nextGoalContent");
  const maxGoalContent = document.getElementById("maxGoalContent");
  
  if (isT20) {
    if (nextGoalContent) nextGoalContent.style.display = "none";
    if (maxGoalContent) maxGoalContent.style.display = "block";
  } else {
    if (nextGoalContent) nextGoalContent.style.display = "block";
    if (maxGoalContent) maxGoalContent.style.display = "none";
    
    const nextGoalTitle = document.getElementById("nextGoalTitle");
    if (nextGoalTitle) {
      nextGoalTitle.textContent = isMs ? `Sasaran: ${nextGroup}` : `Next Goal: ${nextGroup}`;
    }
    
    const nextGoalAmount = document.getElementById("nextGoalAmount");
    if (nextGoalAmount) {
      nextGoalAmount.textContent = `RM ${amountNeeded.toFixed(2)}`;
    }
  }

  const milestoneGroup = document.getElementById("insightMilestoneGroup");
  if (milestoneGroup) {
    if (isT20) {
      milestoneGroup.textContent = isMs ? "Kumpulan T20" : "T20 Income Group";
      milestoneGroup.style.color = "#16a34a";
    } else {
      milestoneGroup.textContent = isMs ? `Kumpulan ${nextGroup}` : `${nextGroup} Income Group`;
      milestoneGroup.style.color = nextGroup === "M40" ? "#ca8a04" : "#16a34a";
    }
  }

  const milestoneRange = document.getElementById("insightMilestoneRange");
  if (milestoneRange) {
    if (isT20) {
      milestoneRange.textContent = isMs ? "RM11,820 & ke atas" : "RM11,820 & above";
    } else if (nextGroup === "M40") {
      milestoneRange.textContent = "RM5,250 - RM11,819";
    } else {
      milestoneRange.textContent = isMs ? "RM11,820 & ke atas" : "RM11,820 & above";
    }
  }

  const milestoneMsg = document.getElementById("insightMilestoneMsg");
  if (milestoneMsg) {
    if (isT20) {
      milestoneMsg.textContent = isMs ? "Anda telah mencapai tahap pendapatan tertinggi (T20)" : "You have reached the top income tier (T20)";
    } else {
      milestoneMsg.textContent = isMs ? "Teruskan usaha! Anda semakin hampir." : "Keep going! You're getting closer.";
    }
  }
  
  const milestoneIconBg = document.getElementById("insightMilestoneIconBg");
  if (milestoneIconBg) {
    if (isT20) {
      milestoneIconBg.style.background = "#dcfce7";
      milestoneIconBg.innerHTML = "🏆";
    } else if (nextGroup === "M40") {
      milestoneIconBg.style.background = "#fef9c3";
      milestoneIconBg.innerHTML = "🏕️";
    } else {
      milestoneIconBg.style.background = "#e0e7ff";
      milestoneIconBg.innerHTML = "🏔️";
    }
  }

  const progressPctEl = document.getElementById("insightProgressPct");
  if (progressPctEl) {
    progressPctEl.textContent = progressPct.toString();
  }
  
  const progressPctWrapper = document.getElementById("insightProgressPctWrapper");
  if (progressPctWrapper) {
    progressPctWrapper.style.color = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }
  
  const progressBar = document.getElementById("insightProgressBar");
  if (progressBar) {
    progressBar.style.width = `${progressPct}%`;
    progressBar.style.background = currentGroup === "B40" ? "#ef4444" : currentGroup === "M40" ? "#eab308" : "#16a34a";
  }
  
  const progressBg = document.getElementById("insightProgressBg");
  if (progressBg) {
    progressBg.style.background = currentGroup === "B40" ? "#fee2e2" : currentGroup === "M40" ? "#fef9c3" : "#dcfce7";
  }

  const progressRemaining = document.getElementById("insightProgressRemaining");
  if (progressRemaining) {
    if (isT20) {
      progressRemaining.textContent = isMs ? "Sasaran tercapai" : "Goal reached";
    } else {
      progressRemaining.textContent = isMs ? `RM ${amountNeeded.toFixed(2)} lagi sebulan` : `RM ${amountNeeded.toFixed(2)} more per month`;
    }
  }

  const progressLabel = document.getElementById("insightProgressLabel");
  if (progressLabel) {
    if (isT20) {
      progressLabel.textContent = "";
    } else {
      progressLabel.textContent = isMs ? `untuk capai ${nextGroup}` : `to reach ${nextGroup}`;
    }
  }
  
  if (section.style.display === "none" || section.style.opacity === "0") {
    section.style.display = "block";
    setTimeout(() => {
      section.style.opacity = "1";
    }, 50);
  }
}


// Expose global UI helpers
const _lastToggleTimes: Record<string, number> = {};
(window as any).toggleResultSection = function (sectionId: string) {
  const now = Date.now();
  if (_lastToggleTimes[sectionId] && now - _lastToggleTimes[sectionId] < 120) {
    return;
  }
  _lastToggleTimes[sectionId] = now;
  const section = document.getElementById(sectionId);
  if (!section) return;
  const indicator = section.querySelector(".toggle-indicator");
  if (section.classList.contains("collapsed")) {
    section.classList.remove("collapsed");
    if (indicator) indicator.textContent = "▼";
  } else {
    section.classList.add("collapsed");
    if (indicator) indicator.textContent = "▶";
  }
};

(window as any).openTab = function (evt: any, tabName: string) {
  const contents = document.getElementsByClassName("contribution-content");
  for (let i = 0; i < contents.length; i++) {
    (contents[i] as HTMLElement).style.display = "none";
    contents[i].classList.remove("active");
  }
  const tabs = document.getElementsByClassName("seo-tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = tabs[i].className.replace(" active", "");
  }
  const target = document.getElementById(tabName);
  if (target) {
    target.style.display = "block";
    target.classList.add("active");
  }
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += " active";
  }
};

(window as any).clearAndRefreshLogs = function () {
  const content = document.getElementById("errorLogContent");
  if (content) content.innerHTML = '<p style="color:#64748b;text-align:center;padding:20px;">No error logs recorded.</p>';
  try {
    localStorage.removeItem("salary_calculator_error_logs");
  } catch (e) {}
};

// Expose share progress globally
(window as any).shareProgress = function(platform: string) {
  const url = encodeURIComponent(window.location.href);
  const isMs = typeof window !== "undefined" && (window.location.pathname.startsWith("/ms/") || window.location.pathname === "/ms" || document.documentElement.lang === "ms");
  const text = encodeURIComponent(
    isMs 
      ? "Saya baru sahaja semak kumpulan pendapatan isi rumah guna Kalkulator Gaji Malaysia! Semak gaji anda di sini:"
      : "I just checked my household income group using the Malaysian Salary Calculator! Check yours here:"
  );
  
  if (platform === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  } else if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  } else if (platform === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
  } else if (platform === 'threads') {
    window.open(`https://threads.net/intent/post?text=${text} ${url}`, '_blank');
  }
};
