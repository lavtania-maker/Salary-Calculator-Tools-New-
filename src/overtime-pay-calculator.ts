import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { generatePDFReport } from "./lib/pdf-generator";

document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const form = document.getElementById("otForm") as HTMLFormElement;
  const resetBtn = document.getElementById("otResetBtn") as HTMLButtonElement;
  const resultCard = document.getElementById("otResultCard") as HTMLElement;
  const resultContent = document.getElementById("otResultsContent") as HTMLElement;
  const placeholderText = document.getElementById("otPlaceholder") as HTMLElement;

  // Inputs
  const salaryInput = document.getElementById("salary") as HTMLInputElement;
  const workingDaysSelect = document.getElementById("workingDays") as HTMLSelectElement;
  const normalHoursInput = document.getElementById("normalHours") as HTMLInputElement;
  const overtimeTypeSelect = document.getElementById("overtimeType") as HTMLSelectElement;
  const otHoursInput = document.getElementById("otHours") as HTMLInputElement;
  const isManualLabourCheckbox = document.getElementById("isManualLabour") as HTMLInputElement;

  // Validation elements
  const salaryError = document.getElementById("salaryError") as HTMLElement;
  const overtimeTypeError = document.getElementById("overtimeTypeError") as HTMLElement;
  const otHoursError = document.getElementById("otHoursError") as HTMLElement;

  // Advanced Options
  const advancedToggle = document.getElementById("advancedToggle") as HTMLElement;
  const advancedOptions = document.getElementById("advancedOptions") as HTMLElement;
  const includeAllowancesCheckbox = document.getElementById("includeAllowances") as HTMLInputElement;
  const allowanceAmountInput = document.getElementById("allowanceAmount") as HTMLInputElement;
  const useCustomRateCheckbox = document.getElementById("useCustomRate") as HTMLInputElement;
  const customMultiplierInput = document.getElementById("customMultiplier") as HTMLInputElement;

  // Results
  const resTotalOTPay = document.getElementById("resTotalOTPay") as HTMLElement;
  const resHourlyRate = document.getElementById("resHourlyRate") as HTMLElement;
  const resTotalOTHours = document.getElementById("resTotalOTHours") as HTMLElement;
  const resMultiplierApplied = document.getElementById("resMultiplierApplied") as HTMLElement;
  const resGrossPay = document.getElementById("resGrossPay") as HTMLElement;
  const resEligibilityStatus = document.getElementById("resEligibilityStatus") as HTMLElement;
  const resEligibilityText = document.getElementById("resEligibilityText") as HTMLElement;
  const complianceWarning = document.getElementById("complianceWarning") as HTMLElement;
  const customRateWarning = document.getElementById("customRateWarning") as HTMLElement;

  // Modal
  const downloadReportBtn = document.getElementById("downloadOTReportBtn") as HTMLButtonElement;
  const emailModal = document.getElementById("emailModal") as HTMLElement;
  const closeModal = document.getElementById("closeModal") as HTMLElement;
  const emailForm = document.getElementById("emailForm") as HTMLFormElement;
  const modalFormContent = document.getElementById("modalFormContent") as HTMLElement;
  const modalSuccessContent = document.getElementById("modalSuccessContent") as HTMLElement;
  const userTypeSelect = document.getElementById("userType") as HTMLSelectElement;
  const companyNameGroup = document.getElementById("companyNameGroup") as HTMLElement;
  const companyInput = document.getElementById("companyName") as HTMLInputElement;
  const hiringQuestionGroup = document.getElementById("hiringQuestionGroup") as HTMLElement;
  const hiringInput = document.getElementById("hiringStatus") as HTMLSelectElement;
  const userPhoneInput = document.getElementById("userPhone") as HTMLInputElement;
  const userNameInput = document.getElementById("userName") as HTMLInputElement;
  const userEmailInput = document.getElementById("userEmail") as HTMLInputElement;

  let lastResults: any = null;
  let eligibilityStatusGlobal = "Eligible";
  let isComplianceWarningGlobal = false;

  // Helpers
  const sendGtagEvent = (eventName: string, params: any) => {
    if (typeof (window as any).gtag === "function") {
      console.log(`[GA4 Event] ${eventName}`, params);
      (window as any).gtag("event", eventName, params);
    }
  };

  // 1. calculator_view
  sendGtagEvent("calculator_view", { calculator_name: "overtime_pay" });

  // Toggle Advanced Options
  advancedToggle.addEventListener("click", () => {
    const isExpanded = advancedOptions.style.display === "block";
    advancedOptions.style.display = isExpanded ? "none" : "block";
    advancedToggle.querySelector("svg")?.style.setProperty("transform", isExpanded ? "rotate(0deg)" : "rotate(180deg)");
  });

  const validateForm = () => {
    let isValid = true;

    if (!salaryInput.value) {
      salaryInput.classList.add("is-invalid");
      isValid = false;
    }
    if (!overtimeTypeSelect.value) {
      overtimeTypeSelect.classList.add("is-invalid");
      isValid = false;
    }
    if (!otHoursInput.value) {
      otHoursInput.classList.add("is-invalid");
      isValid = false;
    }

    return isValid;
  };

  // Clear errors on input
  [salaryInput, overtimeTypeSelect, otHoursInput].forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
    });
    
    // For select elements, also listen to change
    if (input.tagName === "SELECT") {
      input.addEventListener("change", () => {
        input.classList.remove("is-invalid");
      });
    }
  });

  // Calculate Logic
  const calculateOT = () => {
    if (!salaryInput.value || !otHoursInput.value || !overtimeTypeSelect.value) return;

    const salary = parseFloat(salaryInput.value);
    const otHours = parseFloat(otHoursInput.value);
    const normalHours = parseFloat(normalHoursInput.value) || 8;
    const isManualLabour = isManualLabourCheckbox.checked;
    
    const includeAllowances = includeAllowancesCheckbox.checked;
    const allowanceAmount = includeAllowances ? (parseFloat(allowanceAmountInput.value) || 0) : 0;
    
    const useCustomRate = useCustomRateCheckbox.checked;
    const customMultiplier = useCustomRate ? (parseFloat(customMultiplierInput.value) || 0) : 0;
    const overtimeType = overtimeTypeSelect.value;
    const workingDays = workingDaysSelect.value;

    // Step 1: Rates
    const dailyRate = salary / 26;
    const hourlyRate = dailyRate / normalHours;

    // Step 2: Eligibility
    let isEligible = true;
    let eligibilityLabel = "Eligible";
    let eligibilityStatus = "Eligible for statutory OT pay";
    let statusColor = "#059669"; // success green

    if (salary > 4000 && !isManualLabour) {
      isEligible = false;
      eligibilityLabel = "Not Statutorily Entitled";
      eligibilityStatus = "Not statutorily entitled to OT pay (salary exceeds RM4,000). OT pay may still apply if stated in employment contract.";
      statusColor = "#dc2626"; // danger red
    }

    eligibilityStatusGlobal = eligibilityLabel;

    // Step 3: OT Pay
    let otPay = 0;
    let multiplierStr = "";
    let isCustomRateWarning = false;

    if (useCustomRate && customMultiplier > 0) {
      otPay = otHours * hourlyRate * customMultiplier;
      multiplierStr = `${customMultiplier}x (Custom)`;
      
      let statutoryMin = 1.5;
      if (overtimeType === "Rest Day") statutoryMin = 2.0; // Rest Day is complex, using 2.0 for warning threshold
      if (overtimeType === "Public Holiday") statutoryMin = 3.0;
      if (customMultiplier < statutoryMin) {
        isCustomRateWarning = true;
      }
    } else {
      if (overtimeType === "Normal Working Day") {
        otPay = otHours * hourlyRate * 1.5;
        multiplierStr = "1.5x hourly rate";
      } else if (overtimeType === "Rest Day") {
        if (otHours <= normalHours / 2) {
          otPay = 0.5 * dailyRate;
          multiplierStr = "0.5x daily rate";
        } else if (otHours > normalHours / 2 && otHours <= normalHours) {
          otPay = 1.0 * dailyRate;
          multiplierStr = "1.0x daily rate";
        } else {
          const excess = otHours - normalHours;
          otPay = (1.0 * dailyRate) + (excess * hourlyRate * 2);
          multiplierStr = `1.0x daily rate + 2.0x hourly for ${excess} excess hours`;
        }
      } else if (overtimeType === "Public Holiday") {
        if (otHours <= normalHours) {
          otPay = 2.0 * dailyRate;
          multiplierStr = "2.0x daily rate";
        } else {
          const excess = otHours - normalHours;
          otPay = (2.0 * dailyRate) + (excess * hourlyRate * 3);
          multiplierStr = `2.0x daily rate + 3.0x hourly for ${excess} excess hours`;
        }
      }
    }

    const grossPay = salary + allowanceAmount + otPay;
    const isComplianceWarning = otHours > 104;
    isComplianceWarningGlobal = isComplianceWarning;

    // Display Results
    resTotalOTPay.textContent = `RM ${otPay.toFixed(2)}`;
    resHourlyRate.textContent = `RM ${hourlyRate.toFixed(2)}`;
    resTotalOTHours.textContent = `${otHours} hours`;
    resMultiplierApplied.textContent = multiplierStr;
    resGrossPay.textContent = `RM ${grossPay.toFixed(2)}`;
    resEligibilityStatus.textContent = eligibilityLabel;
    resEligibilityStatus.style.color = statusColor;
    resEligibilityText.textContent = eligibilityStatus;

    complianceWarning.style.display = isComplianceWarning ? "block" : "none";
    customRateWarning.style.display = isCustomRateWarning ? "block" : "none";

    lastResults = {
      salary,
      otHours,
      normalHours,
      overtimeType,
      hourlyRate,
      multiplierStr,
      otPay,
      grossPay,
      workingDays
    };

    placeholderText.style.display = "none";
    resultContent.style.display = "block";

    // 2. click_calculate_overtime
    sendGtagEvent("click_calculate_overtime", { 
      calculator_name: "overtime_pay",
      overtime_type: overtimeType,
      working_days_per_week: workingDays,
      manual_labour: isManualLabour,
      custom_rate_used: useCustomRate
    });

    // 3. calculation_result_shown
    sendGtagEvent("calculation_result_shown", {
      calculator_name: "overtime_pay",
      eligibility_status: eligibilityLabel,
      compliance_flag: isComplianceWarning
    });
  };

  // Event Listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    calculateOT();
    if (window.innerWidth < 768) {
      resultCard.scrollIntoView({ behavior: "smooth" });
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    [salaryInput, overtimeTypeSelect, otHoursInput].forEach(input => {
      input.classList.remove("is-invalid");
    });
    placeholderText.style.display = "block";
    resultContent.style.display = "none";
    advancedOptions.style.display = "none";

    // 4. reset_click
    sendGtagEvent("reset_click", { calculator_name: "overtime_pay" });
  });

  // Modal Handlers
  downloadReportBtn.addEventListener("click", () => {
    emailModal.style.display = "flex";
    modalSuccessContent.style.display = "none";
    modalFormContent.style.display = "block";

    // Pre-fill email if we have it
    const storedEmail = localStorage.getItem("salaryCalc_userEmail");
    if (storedEmail && userEmailInput) {
      userEmailInput.value = storedEmail;
    }

    // Reset conditional groups
    companyNameGroup.style.display = "none";
    companyInput.required = false;
    hiringQuestionGroup.style.display = "none";
    hiringInput.required = false;

    // 5. click_download_overtime
    sendGtagEvent("click_download_overtime", { calculator_name: "overtime_pay" });
  });

  closeModal.addEventListener("click", () => {
    emailModal.style.display = "none";
  });

  emailModal.addEventListener("click", (e) => {
    if (e.target === emailModal) emailModal.style.display = "none";
  });

  // Handle conditional questions based on user type
  userTypeSelect.addEventListener("change", () => {
    if (userTypeSelect.value === "Employer / HR") {
      companyNameGroup.style.display = "block";
      companyInput.required = true;
      hiringQuestionGroup.style.display = "block";
      hiringInput.required = true;
    } else {
      companyNameGroup.style.display = "none";
      companyInput.required = false;
      companyInput.value = "";
      hiringQuestionGroup.style.display = "none";
      hiringInput.required = false;
      hiringInput.value = "";
    }
  });

  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = emailForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.textContent = "Generating your report...";

    const userType = userTypeSelect.value;
    const hiringStatus = hiringInput.value;
    const emailValue = userEmailInput.value.trim();

    // Store in localStorage for persistence
    localStorage.setItem("salaryCalc_hasSubmittedEmail", "true");
    localStorage.setItem("salaryCalc_userEmail", emailValue);

    const data = {
      name: userNameInput.value,
      email: emailValue,
      companyName: companyInput.value,
      phoneNumber: userPhoneInput.value,
      userType: userType,
      hiringStatus: hiringStatus,
      calculatorType: "Overtime Pay",
      action: "Download OT Report",
      createdAt: new Date().toISOString(),
      ...lastResults
    };

    try {
      await addDoc(collection(db, "leads"), data);
      
      // 6. click_submit_overtime
      sendGtagEvent("click_submit_overtime", {
        calculator_name: "overtime_pay",
        user_type: userType,
        hiring_status: hiringStatus
      });

      const appsScriptUrl = (import.meta as any).env.VITE_OVERTIME_SHEETS_SCRIPT_URL;
      if (appsScriptUrl) {
        const payload = {
          timestamp: new Date().toISOString(),
          email: emailValue,
          userType: userType,
          hiringStatus: hiringStatus || "",
          companyName: companyInput.value || "",
          userPhone: userPhoneInput.value || "",
          download_via: "Download Overtime Report"
        };
        const response = await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.status === "duplicate") {
          // Proceed to download
        }
      } else {
        // Fallback to sheet proxy if env var is not set
        await fetch("/api/salary-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            action: "Overtime Pay Download",
            timestamp: new Date().toISOString(),
            userPhone: data.phoneNumber // map to what sheet expects
          }),
        });
      }

      generatePDFReport({
        title: "Overtime Pay Report",
        fileName: "Overtime-Pay-Report",
        data: [
          { label: "Monthly Salary", value: `RM ${lastResults.salary.toFixed(2)}` },
          { label: "Working Days Per Week", value: `${lastResults.workingDays} Days` },
          { label: "Normal Working Hours Per Day", value: `${lastResults.normalHours} Hours` },
          { label: "Overtime Type", value: lastResults.overtimeType },
          { label: "OT Hours Worked", value: `${lastResults.otHours} hours` },
          { label: "Calculated Hourly Rate", value: `RM ${lastResults.hourlyRate.toFixed(2)}` },
          { label: "OT Multiplier Applied", value: lastResults.multiplierStr },
          { label: "Total Overtime Pay", value: `RM ${lastResults.otPay.toFixed(2)}` },
          { label: "Estimated Gross Pay", value: `RM ${lastResults.grossPay.toFixed(2)}` }
        ]
      });

      // 7. pdf_download_success
      sendGtagEvent("pdf_download_success", { calculator_name: "overtime_pay" });
      
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (modalFormContent && modalSuccessContent) {
        modalFormContent.style.display = "none";
        if (emailModal) emailModal.style.display = "none";

        if (userType === "Employer / HR" || userType === "Employer/HR") {
          const hiringModal = document.getElementById("hiringIntentModal");
          if (hiringModal) {
            hiringModal.style.display = "flex";
            (window as any)._currentLeadEmail = emailValue;
            (window as any)._currentLeadType = "Overtime Calculator";
          }
        }
        
        const modalFeedback = document.getElementById("modalFeedback");
        if (modalFeedback) {
          modalFeedback.textContent = "Thank you! Your OT report has been downloaded.";
          modalFeedback.style.display = "block";
        }

        const mobileActionButtons = document.getElementById("mobileActionButtons");
        const mobileFallbackText = document.getElementById("mobileFallbackText");
        if (mobileActionButtons) mobileActionButtons.style.display = "none";
        if (mobileFallbackText) mobileFallbackText.style.display = "none";
      }

    } catch (err) {
      console.error(err);
      alert("Error submitting form. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit & Download";
    }
  });

  // Mobile menu
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNavMenu.classList.toggle("open");
    });
  }
});
