// Salary Calculator Logic

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { generatePDFReport } from "./lib/pdf-generator";

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

function getSocsoRates(salary: number, age: string, nationality = "malaysian") {
  if (!salary || salary <= 0)
    return { er: 0, ee: 0, total: 0, er_only: 0, bracket: 0 };
  const capped = Math.min(salary, 6000);
  let bracketIndex = 0;

  if (capped <= 30) bracketIndex = 1;
  else if (capped <= 50) bracketIndex = 2;
  else if (capped <= 70) bracketIndex = 3;
  else if (capped <= 100) bracketIndex = 4;
  else if (capped <= 140) bracketIndex = 5;
  else if (capped <= 200) bracketIndex = 6;
  else if (salary > 6000) bracketIndex = 65;
  else {
    bracketIndex = Math.floor((capped - 200.01) / 100) + 7;
  }

  const er_act4_table = [
    0, 0.4, 0.7, 1.1, 1.5, 2.1, 2.95, 4.35, 6.15, 7.85, 9.65, 11.35,
    13.15, 14.85, 16.65, 18.35, 20.15, 21.85, 23.65, 25.35, 27.15,
    28.85, 30.65, 32.35, 34.15, 35.85, 37.65, 39.35, 41.15, 42.85,
    44.65, 46.35, 48.15, 49.85, 51.65, 53.35, 55.15, 56.85, 58.65,
    60.35, 62.15, 63.85, 65.65, 67.35, 69.15, 70.85, 72.65, 74.35,
    76.15, 77.85, 79.65, 81.35, 83.15, 84.85, 86.65, 88.35, 90.15,
    91.85, 93.65, 95.35, 97.15, 98.85, 100.65, 102.35, 104.15, 104.15,
  ];
  const er_only_table = [
    0, 0.3, 0.5, 0.8, 1.1, 1.5, 2.1, 3.1, 4.4, 5.6, 6.9, 8.1, 9.4, 10.6,
    11.9, 13.1, 14.4, 15.6, 16.9, 18.1, 19.4, 20.6, 21.9, 23.1, 24.4,
    25.6, 26.9, 28.1, 29.4, 30.6, 31.9, 33.1, 34.4, 35.6, 36.9, 38.1,
    39.4, 40.6, 41.9, 43.1, 44.4, 45.6, 46.9, 48.1, 49.4, 50.6, 51.9,
    53.1, 54.4, 55.6, 56.9, 58.1, 59.4, 60.6, 61.9, 63.1, 64.4, 65.6,
    66.9, 68.1, 69.4, 70.6, 71.9, 73.1, 74.4, 74.4,
  ];
  const ee_table = [
    0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.85, 1.25, 1.75, 2.25, 2.75, 3.25,
    3.75, 4.25, 4.75, 5.25, 5.75, 6.25, 6.75, 7.25, 7.75, 8.25, 8.75,
    9.25, 9.75, 10.25, 10.75, 11.25, 11.75, 12.25, 12.75, 13.25, 13.75,
    14.25, 14.75, 15.25, 15.75, 16.25, 16.75, 17.25, 17.75, 18.25,
    18.75, 19.25, 19.75, 20.25, 20.75, 21.25, 21.75, 22.25, 22.75,
    23.25, 23.75, 24.25, 24.75, 25.25, 25.75, 26.25, 26.75, 27.25,
    27.75, 28.25, 28.75, 29.25, 29.75, 29.75,
  ];

  const bracket_er_act4 = er_act4_table[bracketIndex] || 0;
  const bracket_er_only = er_only_table[bracketIndex] || 0;
  const bracket_ee = ee_table[bracketIndex] || 0;

  if (age === "above60" || nationality === "foreigner") {
    return {
      er: bracket_er_only,
      ee: 0,
      total: bracket_er_only,
      er_only: bracket_er_only,
      bracket: bracketIndex,
    };
  }
  return {
    er: bracket_er_act4,
    ee: bracket_ee,
    total: Number((bracket_er_act4 + bracket_ee).toFixed(2)),
    er_only: bracket_er_only,
    bracket: bracketIndex,
  };
}

export function calculateSalary() {
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

    const grossSalary = grossSalaryEl ? parseFloat(grossSalaryEl.value) || 0 : 0;
    const bonus = bonusEl ? parseFloat(bonusEl.value) || 0 : 0;
    const maritalStatus = maritalStatusEl ? maritalStatusEl.value : "single";
    const nationality = nationalityEl ? nationalityEl.value : "malaysian";

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

    // 5. PCB
    let pcb = 0;
    if (includePcb) {
      const annualIncome = totalIncome * 12;
      const epfRelief = Math.min(epf * 12, 4000);
      const personalRelief = 9000;
      let spouseRelief = 0;
      let childRelief = 0;

      switch (maritalStatus) {
        case "single":
          break;
        case "married_spouse_not_working_no_child":
        case "married_spouse_not_working":
          spouseRelief = 4000;
          break;
        case "married_1_child_spouse_not_working":
          spouseRelief = 4000;
          childRelief = 2000;
          break;
        case "married_2_children_spouse_not_working":
          spouseRelief = 4000;
          childRelief = 4000;
          break;
        case "married_spouse_working_no_child":
        case "married_spouse_working":
          break;
        case "married_1_child_spouse_working":
          childRelief = 2000;
          break;
        case "married_2_children_spouse_working":
          childRelief = 4000;
          break;
      }

      const totalRelief = personalRelief + epfRelief + spouseRelief + childRelief;
      const taxableIncome = annualIncome - totalRelief;

      if (taxableIncome > 0) {
        let annualTax = 0;
        if (taxableIncome <= 5000) {
          annualTax = 0;
        } else if (taxableIncome <= 20000) {
          annualTax = (taxableIncome - 5000) * 0.01;
        } else if (taxableIncome <= 35000) {
          annualTax = 150 + (taxableIncome - 20000) * 0.03;
        } else if (taxableIncome <= 50000) {
          annualTax = 600 + (taxableIncome - 35000) * 0.08;
        } else if (taxableIncome <= 70000) {
          annualTax = 1800 + (taxableIncome - 50000) * 0.11;
        } else if (taxableIncome <= 100000) {
          annualTax = 4000 + (taxableIncome - 70000) * 0.19;
        } else if (taxableIncome <= 400000) {
          annualTax = 9700 + (taxableIncome - 100000) * 0.25;
        } else if (taxableIncome <= 600000) {
          annualTax = 84700 + (taxableIncome - 400000) * 0.26;
        } else if (taxableIncome <= 2000000) {
          annualTax = 136700 + (taxableIncome - 600000) * 0.28;
        } else {
          annualTax = 528700 + (taxableIncome - 2000000) * 0.3;
        }

        if (taxableIncome <= 35000) {
          annualTax = Math.max(0, annualTax - 400);
        }

        pcb = annualTax / 12;
      }
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

    if (totalIncome >= 15870) {
      incomeGroup = "T20";
      subGroup = "T2";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "top income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (totalIncome >= 11820) {
      incomeGroup = "T20";
      subGroup = "T1";
      groupColor = "#16a34a";
      groupBg = "#f0fdf4";
      groupBorder = "#dcfce7";
      shortExplanation = "top income group";
      shortExplanationMs = "kumpulan pendapatan tertinggi";
    } else if (totalIncome >= 9450) {
      incomeGroup = "M40";
      subGroup = "M4";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 7690) {
      incomeGroup = "M40";
      subGroup = "M3";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 6340) {
      incomeGroup = "M40";
      subGroup = "M2";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 5250) {
      incomeGroup = "M40";
      subGroup = "M1";
      groupColor = "#ca8a04";
      groupBg = "#fefce8";
      groupBorder = "#fef9c3";
      shortExplanation = "middle income group";
      shortExplanationMs = "kumpulan pendapatan pertengahan";
    } else if (totalIncome >= 4310) {
      incomeGroup = "B40";
      subGroup = "B4";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (totalIncome >= 3440) {
      incomeGroup = "B40";
      subGroup = "B3";
      groupColor = "#ef4444";
      groupBg = "#fef2f2";
      groupBorder = "#fee2e2";
      shortExplanation = "lower income group";
      shortExplanationMs = "kumpulan pendapatan rendah";
    } else if (totalIncome >= 2560) {
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
        ? `Berdasarkan jumlah pendapatan bulanan anda, anda berada dalam <strong style="color: ${groupColor}; font-weight: 800;">kategori ${incomeGroup} (${subGroup}) (${shortExplanationMs})</strong> di Malaysia.`
        : `With your total monthly income, you’re in the <strong style="color: ${groupColor}; font-weight: 800;">${incomeGroup} (${subGroup}) category (${shortExplanation})</strong> in Malaysia.`;
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
  } catch (err) {
    console.error("Salary calculation error:", err);
  }
}

// Expose on window for any inline handlers
(window as any).calculateSalary = calculateSalary;

function initSalaryCalculator() {
  const form = document.getElementById("salaryForm") as HTMLFormElement | null;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateSalary();
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
      const phone = userPhone ? userPhone.value.trim() : "";
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
        addDoc(collection(db, "leads"), dbPayload).catch((fErr) => {
          console.warn("Firestore leads record error:", fErr);
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSalaryCalculator);
} else {
  initSalaryCalculator();
}
