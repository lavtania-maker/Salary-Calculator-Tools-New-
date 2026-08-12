// SOCSO Calculator Logic

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
// import { generatePDFReport } from "./lib/pdf-generator";

let lastSocsoCalculation: any = null;

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

export function calculateSocsoOnly() {
  try {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "click_calculate_socso", {
        event_category: "SOCSO Calculator",
        event_label: "Calculate Button",
      });
    }

    const salaryEl = document.getElementById("socsoGrossSalary") as HTMLInputElement | null;
    const salary = salaryEl ? parseFloat(salaryEl.value) || 0 : 0;

    const ageInput = document.querySelector('input[name="socsoAge"]:checked') as HTMLInputElement | null;
    const age = ageInput ? ageInput.value : "below60";

    const nationalityInput = document.querySelector('input[name="socsoNationality"]:checked') as HTMLInputElement | null;
    const nationality = nationalityInput ? nationalityInput.value : "malaysian";

    if (salary <= 0) return;

    const socsoRates = getSocsoRates(salary, age, nationality);
    const socsoEmployer = socsoRates.er;
    const socsoEmployee = socsoRates.ee;

    const socsoResultsContent = document.getElementById("socsoResultsContent");
    const socsoPlaceholder = document.getElementById("socsoPlaceholder");

    if (socsoResultsContent) {
      socsoResultsContent.classList.add("show");
      socsoResultsContent.style.display = "block";
    }

    if (socsoPlaceholder) {
      socsoPlaceholder.style.display = "none";
    }

    const resEmp = document.getElementById("socsoEmployeeCardVal");
    if (resEmp) resEmp.textContent = "RM " + socsoEmployee.toFixed(2);

    const resEmpr = document.getElementById("socsoEmployerCardVal");
    if (resEmpr) resEmpr.textContent = "RM " + socsoEmployer.toFixed(2);

    const resTotal = document.getElementById("socsoTotalCardVal");
    if (resTotal) resTotal.textContent = "RM " + socsoRates.total.toFixed(2);

    const resAnnualEmp = document.getElementById("socsoAnnualEmployeeCardVal");
    if (resAnnualEmp) resAnnualEmp.textContent = "RM " + (socsoEmployee * 12).toFixed(2);

    const resAnnualEmpr = document.getElementById("socsoAnnualEmployerCardVal");
    if (resAnnualEmpr) resAnnualEmpr.textContent = "RM " + (socsoEmployer * 12).toFixed(2);

    lastSocsoCalculation = {
      salary,
      age,
      nationality,
      socsoEmployee,
      socsoEmployer,
      totalSocso: socsoRates.total
    };
  } catch (err) {
    console.error("SOCSO calculation error:", err);
  }
}

// Expose on window
(window as any).calculateSocsoOnly = calculateSocsoOnly;

function initSocsoCalculator() {
  // Ensure SOCSO layout is visible on socso-perkeso page
  const layoutSalary = document.getElementById("layoutSalary");
  const layoutSocso = document.getElementById("layoutSocso");

  if (layoutSocso) {
    layoutSocso.style.display = "grid";
    layoutSocso.style.opacity = "1";
  }
  if (layoutSalary && window.location.pathname.includes("socso-perkeso")) {
    layoutSalary.style.display = "none";
  }

  const form = document.getElementById("socsoForm") as HTMLFormElement | null;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateSocsoOnly();
    });
  }

  const resetBtn = document.getElementById("socsoResetBtn") as HTMLButtonElement | null;
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const socsoPlaceholder = document.getElementById("socsoPlaceholder");
      if (socsoPlaceholder) socsoPlaceholder.style.display = "block";

      const socsoResultsContent = document.getElementById("socsoResultsContent");
      if (socsoResultsContent) {
        socsoResultsContent.classList.remove("show");
        socsoResultsContent.style.display = "none";
      }
    });
  }

  const downloadSocsoReportBtn = document.getElementById(
    "downloadSocsoReportBtn",
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

  if (downloadSocsoReportBtn) {
    downloadSocsoReportBtn.addEventListener("click", () => {
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
          action: "Download SOCSO Report",
          download_via: "Download SOCSO Report"
        };

        const dbPayload: any = {
          email: email,
          name: name,
          userType: role,
          action: "Download SOCSO Report",
          createdAt: new Date().toISOString()
        };
        if (comp) dbPayload.companyName = comp;
        if (hire) dbPayload.hiringStatus = hire;
        if (phone) {
          dbPayload.phoneNumber = phone;
          dbPayload.userPhone = phone;
        }

        if (lastSocsoCalculation) {
          dbPayload.salary = lastSocsoCalculation.salary;
          dbPayload.ageGroup = lastSocsoCalculation.age;
          dbPayload.nationality = lastSocsoCalculation.nationality;
          dbPayload.employeeSocso = lastSocsoCalculation.socsoEmployee;
          dbPayload.employerSocso = lastSocsoCalculation.socsoEmployer;
          dbPayload.socsoTotal = lastSocsoCalculation.totalSocso;
        }

        try {
          await addDoc(collection(db, "leads"), dbPayload);
        } catch (fErr) {
          console.error("Firestore leads error:", fErr);
        }

        try {
          const sheetRes = await fetch("/api/socso-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sheetPayload),
          });
          if (!sheetRes.ok) {
            console.error("Google Sheets Webhook error:", await sheetRes.text());
          }
        } catch (sErr) {
          console.error("Google Sheets request error:", sErr);
        }

        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "submit_lead_socso", {
            event_category: "lead",
          });
        }

        const calc = lastSocsoCalculation || {
          salary: 0,
          age: "below60",
          nationality: "malaysian",
          socsoEmployee: 0,
          socsoEmployer: 0,
          totalSocso: 0
        };

        import("./lib/pdf-generator").then(({ generatePDFReport }) => {
          generatePDFReport({
          title: "SOCSO Contribution Report",
          fileName: "SOCSO_Report",
          data: [
            { label: "Monthly Gross Salary", value: `RM ${calc.salary.toFixed(2)}` },
            { label: "Age Group", value: calc.age === "above60" ? "Above 60" : "Under 60" },
            { label: "Nationality", value: calc.nationality === "foreigner" ? "Foreigner" : "Malaysian" },
            { label: "Employee SOCSO Contribution", value: `RM ${calc.socsoEmployee.toFixed(2)}` },
            { label: "Employer SOCSO Contribution", value: `RM ${calc.socsoEmployer.toFixed(2)}` },
            { label: "Total Combined SOCSO Contribution", value: `RM ${calc.totalSocso.toFixed(2)}` }
          ]
        });
        });

        if (modalFormContent) modalFormContent.style.display = "none";
        if (modalSuccessContent) modalSuccessContent.style.display = "block";
        if (modalFeedback) {
          modalFeedback.textContent = "Thank you! Your SOCSO report has been downloaded.";
          modalFeedback.style.display = "block";
        }

        if (role === "Employer / HR" || role === "Employer/HR") {
          const hiringModal = document.getElementById("hiringIntentModal");
          if (hiringModal) {
            hiringModal.style.display = "flex";
            (window as any)._currentLeadEmail = email;
            (window as any)._currentLeadType = "SOCSO Calculator";
          }
        }
      } catch (err) {
        console.error("Critical submission error handled:", err);
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
  document.addEventListener("DOMContentLoaded", initSocsoCalculator);
} else {
  initSocsoCalculator();
}
