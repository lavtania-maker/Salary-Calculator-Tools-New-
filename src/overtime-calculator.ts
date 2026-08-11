// Overtime Calculator Logic

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { generatePDFReport } from "./lib/pdf-generator";

let lastOTCalculation: any = null;

export function calculateOvertime() {
  try {
    const salaryEl = document.getElementById("salary") as HTMLInputElement | null;
    const workingDaysEl = document.getElementById("workingDays") as HTMLSelectElement | null;
    const normalHoursEl = document.getElementById("normalHours") as HTMLInputElement | null;
    const overtimeTypeEl = document.getElementById("overtimeType") as HTMLSelectElement | null;
    const otHoursEl = document.getElementById("otHours") as HTMLInputElement | null;
    const isManualLabourEl = document.getElementById("isManualLabour") as HTMLInputElement | null;

    const parseNum = (val: string) => parseFloat(val.replace(/[^0-9.]/g, "")) || 0;

    const salary = salaryEl ? parseNum(salaryEl.value) : 0;
    const workingDays = workingDaysEl ? parseFloat(workingDaysEl.value) || 5 : 5;
    const normalHours = normalHoursEl ? parseFloat(normalHoursEl.value) || 8 : 8;
    const overtimeType = (overtimeTypeEl && overtimeTypeEl.value) ? overtimeTypeEl.value : "Normal Working Day";
    const otHours = otHoursEl ? parseNum(otHoursEl.value) : 0;
    const isManualLabour = isManualLabourEl ? isManualLabourEl.checked : false;

    const otPlaceholder = document.getElementById("otPlaceholder");
    const otResultsContent = document.getElementById("otResultsContent");

    if (salary <= 0) {
      if (otPlaceholder) otPlaceholder.style.display = "block";
      if (otResultsContent) otResultsContent.style.display = "none";
      return;
    }

    // EA 1955 Statutory Rates:
    // Daily Rate (ORP) = Salary / 26
    // Hourly Rate (HRP) = Daily Rate / Normal Working Hours
    const dailyRate = salary / 26;
    const hourlyRate = dailyRate / normalHours;

    let multiplier = 1.5;
    if (overtimeType === "Rest Day") {
      multiplier = 2.0;
    } else if (overtimeType === "Public Holiday") {
      multiplier = 3.0;
    }

    const otRatePerHour = hourlyRate * multiplier;
    const otPay = otHours * otRatePerHour;
    const estimatedGrossPay = salary + otPay;

    // Eligibility under EA 1955
    const isEligible = salary <= 4000 || isManualLabour;
    const eligibilityStatus = isEligible ? "Eligible (EA 1955 Covered)" : "Reference Rate (Salary > RM4,000)";
    const eligibilityText = isEligible
      ? "Covered under EA 1955 statutory overtime provisions."
      : "Under EA 1955, employees earning > RM4,000 (non-manual) OT rates depend on employment contract.";

    // Show results / Hide placeholder
    if (otPlaceholder) otPlaceholder.style.display = "none";
    if (otResultsContent) otResultsContent.style.display = "block";

    const resTotalOTPay = document.getElementById("resTotalOTPay");
    if (resTotalOTPay) resTotalOTPay.textContent = "RM " + otPay.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Update DOM
    const resHourlyRate = document.getElementById("resHourlyRate");
    if (resHourlyRate) resHourlyRate.textContent = "RM " + hourlyRate.toFixed(2);

    const resDailyRate = document.getElementById("resDailyRate");
    if (resDailyRate) resDailyRate.textContent = "RM " + dailyRate.toFixed(2);

    const resTotalOTHours = document.getElementById("resTotalOTHours");
    if (resTotalOTHours) resTotalOTHours.textContent = `${otHours} hours`;

    const resMultiplierApplied = document.getElementById("resMultiplierApplied");
    if (resMultiplierApplied) resMultiplierApplied.textContent = `${multiplier.toFixed(1)}x (${overtimeType || 'Normal Working Day'})`;

    const resEligibilityStatus = document.getElementById("resEligibilityStatus");
    if (resEligibilityStatus) resEligibilityStatus.textContent = eligibilityStatus;

    const resEligibilityText = document.getElementById("resEligibilityText");
    if (resEligibilityText) resEligibilityText.textContent = eligibilityText;

    const resGrossPay = document.getElementById("resGrossPay");
    if (resGrossPay) resGrossPay.textContent = "RM " + estimatedGrossPay.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const complianceWarning = document.getElementById("complianceWarning");
    if (complianceWarning) {
      complianceWarning.style.display = otHours > 104 ? "block" : "none";
    }

    lastOTCalculation = {
      salary,
      workingDays,
      normalHours,
      overtimeType: overtimeType || "Normal Working Day",
      otHours,
      isManualLabour,
      dailyRate,
      hourlyRate,
      multiplier,
      otPay,
      estimatedGrossPay,
      eligibilityStatus
    };
  } catch (err) {
    console.error("Overtime calculation error:", err);
  }
}

// Expose on window for any inline handlers
(window as any).calculateOvertime = calculateOvertime;

function initOvertimeCalculator() {
  const form = document.getElementById("otForm") as HTMLFormElement | null;
  if (form) {
    // 1. Handle form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateOvertime();
    });

    // 2. Explicitly handle Calculate button click as fallback
    const calcBtn = form.querySelector('button[type="submit"]');
    if (calcBtn) {
      calcBtn.addEventListener("click", (e) => {
        e.preventDefault();
        calculateOvertime();
      });
    }
  }

  const resetBtn = document.getElementById("otResetBtn") as HTMLButtonElement | null;
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      lastOTCalculation = null;
      const otPlaceholder = document.getElementById("otPlaceholder");
      if (otPlaceholder) otPlaceholder.style.display = "block";
      const otResultsContent = document.getElementById("otResultsContent");
      if (otResultsContent) otResultsContent.style.display = "none";
      const resHourlyRate = document.getElementById("resHourlyRate");
      if (resHourlyRate) resHourlyRate.textContent = "RM 0.00";
      const resDailyRate = document.getElementById("resDailyRate");
      if (resDailyRate) resDailyRate.textContent = "RM 0.00";
      const resTotalOTHours = document.getElementById("resTotalOTHours");
      if (resTotalOTHours) resTotalOTHours.textContent = "0 hours";
      const resMultiplierApplied = document.getElementById("resMultiplierApplied");
      if (resMultiplierApplied) resMultiplierApplied.textContent = "-";
      const resGrossPay = document.getElementById("resGrossPay");
      if (resGrossPay) resGrossPay.textContent = "RM 0.00";
    });
  }

  const downloadOTReportBtn = document.getElementById(
    "downloadOTReportBtn",
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

  if (downloadOTReportBtn) {
    downloadOTReportBtn.addEventListener("click", () => {
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
          action: "Download Overtime Report",
          download_via: "Download Overtime Report"
        };

        const dbPayload: any = {
          email: email,
          name: name,
          userType: role,
          action: "Download Overtime Report",
          createdAt: new Date().toISOString()
        };
        if (comp) dbPayload.companyName = comp;
        if (hire) dbPayload.hiringStatus = hire;
        if (phone) {
          dbPayload.phoneNumber = phone;
          dbPayload.userPhone = phone;
        }

        if (lastOTCalculation) {
          dbPayload.salary = lastOTCalculation.salary;
          dbPayload.workingDays = lastOTCalculation.workingDays;
          dbPayload.normalHours = lastOTCalculation.normalHours;
          dbPayload.overtimeType = lastOTCalculation.overtimeType;
          dbPayload.otHours = lastOTCalculation.otHours;
          dbPayload.dailyRate = lastOTCalculation.dailyRate;
          dbPayload.hourlyRate = lastOTCalculation.hourlyRate;
          dbPayload.otPay = lastOTCalculation.otPay;
          dbPayload.grossPay = lastOTCalculation.estimatedGrossPay;
        }

        try {
          await addDoc(collection(db, "leads"), dbPayload);
        } catch (fErr) {
          console.error("Firestore leads error:", fErr);
        }

        try {
          const sheetRes = await fetch("/api/salary-sheet", {
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
          (window as any).gtag("event", "submit_lead_overtime", {
            event_category: "lead",
          });
        }

        const calc = lastOTCalculation || {
          salary: 0,
          workingDays: 5,
          normalHours: 8,
          overtimeType: "Normal Working Day",
          otHours: 0,
          dailyRate: 0,
          hourlyRate: 0,
          multiplier: 1.5,
          otPay: 0,
          estimatedGrossPay: 0
        };

        generatePDFReport({
          title: "Overtime Pay Report",
          fileName: "Overtime_Report",
          data: [
            { label: "Monthly Basic Salary", value: `RM ${calc.salary.toFixed(2)}` },
            { label: "Working Days / Week", value: `${calc.workingDays} Days` },
            { label: "Normal Hours / Day", value: `${calc.normalHours} Hours` },
            { label: "Overtime Type", value: calc.overtimeType },
            { label: "OT Hours Worked", value: `${calc.otHours} hrs` },
            { label: "Calculated Hourly Rate (HRP)", value: `RM ${calc.hourlyRate.toFixed(2)}` },
            { label: "OT Rate Multiplier", value: `${calc.multiplier}x` },
            { label: "Total Overtime Pay", value: `RM ${calc.otPay.toFixed(2)}` },
            { label: "Estimated Total Gross Pay", value: `RM ${calc.estimatedGrossPay.toFixed(2)}` }
          ]
        });

        if (modalFormContent) modalFormContent.style.display = "none";
        if (modalSuccessContent) modalSuccessContent.style.display = "block";
        if (modalFeedback) {
          modalFeedback.textContent = "Thank you! Your Overtime report has been downloaded.";
          modalFeedback.style.display = "block";
        }

        if (role === "Employer / HR" || role === "Employer/HR") {
          const hiringModal = document.getElementById("hiringIntentModal");
          if (hiringModal) {
            hiringModal.style.display = "flex";
            (window as any)._currentLeadEmail = email;
            (window as any)._currentLeadType = "Overtime Calculator";
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
  document.addEventListener("DOMContentLoaded", initOvertimeCalculator);
} else {
  initOvertimeCalculator();
}
