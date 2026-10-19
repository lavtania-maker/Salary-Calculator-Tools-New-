// SOCSO Calculator Logic

let lastSocsoCalculation: any = null;

import { getSocsoRates, getLindung24JamRate } from "./lib/socso";

(window as any).getLindung24JamRate = getLindung24JamRate;

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
    const totalSocso = Number((socsoEmployer + socsoEmployee).toFixed(2));

    const lindungCheckbox = document.getElementById("lindungCheckbox") as HTMLInputElement | null;
    const isLindungIncluded = nationality === "foreigner" || (lindungCheckbox ? lindungCheckbox.checked : false);
    const lindungContribution = isLindungIncluded ? getLindung24JamRate(salary) : 0;

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

    const resLindung = document.getElementById("lindungCardVal");
    if (resLindung) resLindung.textContent = "RM " + lindungContribution.toFixed(2);

    const resTotal = document.getElementById("socsoTotalCardVal");
    if (resTotal) resTotal.textContent = "RM " + totalSocso.toFixed(2);

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
      lindungContribution,
      totalSocso,
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
        fetch("/api/socso-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        }).catch((sErr) => {
          console.warn("Google Sheets record error:", sErr);
        });

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

        // 3. Generate & Download PDF Report
        const { generatePDFReport } = await import("./lib/pdf-generator");
        await generatePDFReport({
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
  document.addEventListener("DOMContentLoaded", initSocsoCalculator);
} else {
  initSocsoCalculator();
}
