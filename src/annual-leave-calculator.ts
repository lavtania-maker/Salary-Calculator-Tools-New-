import { generatePDFReport } from "./lib/pdf-generator";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("leaveForm") as HTMLFormElement;
  const resetBtn = document.getElementById("leaveResetBtn") as HTMLButtonElement;
  const resultCard = document.getElementById("leaveResultCard") as HTMLElement;
  const resultContent = document.getElementById("leaveResultsContent") as HTMLElement;
  const placeholderText = document.getElementById("leavePlaceholder") as HTMLElement;

  const resTotalEntitlement = document.getElementById("resTotalEntitlement") as HTMLElement;
  const resProratedLeave = document.getElementById("resProratedLeave") as HTMLElement;
  const resLeaveTaken = document.getElementById("resLeaveTaken") as HTMLElement;
  const resRemainingBalance = document.getElementById("resRemainingBalance") as HTMLElement;
  const resSuggestedAction = document.getElementById("resSuggestedAction") as HTMLElement;
  const resYearsOfService = document.getElementById("resYearsOfService") as HTMLElement;

  const startDateInput = document.getElementById("leaveStartDate") as HTMLInputElement;
  const calcYearSelect = document.getElementById("leaveCalcYear") as HTMLSelectElement;
  const customYearInput = document.getElementById("leaveCustomYearInput") as HTMLInputElement;
  const entitlementInput = document.getElementById("leaveEntitlement") as HTMLInputElement;
  const takenInput = document.getElementById("leaveTaken") as HTMLInputElement;
  const submitBtn = document.getElementById("leaveSubmitBtn") as HTMLButtonElement;

  const downloadReportBtn = document.getElementById("downloadLeaveReportBtn") as HTMLButtonElement | null;
  const emailModal = document.getElementById("emailModal") as HTMLElement | null;
  const closeModalBtn = document.getElementById("closeModal") as HTMLElement | null;
  const emailForm = document.getElementById("emailForm") as HTMLFormElement | null;

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNavMenu.classList.toggle("open");
    });
  }

  let lastCalculation: any = null;

  // Auto-update category & entitlement when start date changes
  startDateInput.addEventListener("change", () => {
    updateCategoryAndEntitlement();
  });

  calcYearSelect.addEventListener("change", () => {
    updateCategoryAndEntitlement();
  });

  customYearInput.addEventListener("input", () => {
    if (calcYearSelect.value === "custom") {
      updateCategoryAndEntitlement();
    }
  });

  const getTargetYear = () => {
    if (calcYearSelect.value === "custom" && customYearInput.value) {
      return parseInt(customYearInput.value, 10);
    }
    return new Date().getFullYear();
  };

  const updateCategoryAndEntitlement = () => {
    if (!startDateInput.value) return;

    const startDate = new Date(startDateInput.value);
    const targetYear = getTargetYear();
    const warningEl = document.getElementById("leaveWarning") as HTMLElement | null;
    let warningMsg = "";

    const today = new Date();
    if (startDate > today) {
      warningMsg = "Warning: Employee join date is in the future.";
    }

    if (targetYear < startDate.getFullYear()) {
         entitlementInput.value = "0";
         if (warningEl) {
             warningEl.style.display = "block";
             warningEl.textContent = "Error: Employee joined after the selected calculation year.";
         }
         submitBtn.disabled = true;
         return;
    }

    // Calculate completed years and months by end of target year
    const currentDate = new Date(targetYear, 11, 31);
    let totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
      totalMonths--;
    }
    if (totalMonths < 0) totalMonths = 0;

    const years = Math.floor(totalMonths / 12);

    const yearsOfService = years;

    if (yearsOfService < 2) {
      entitlementInput.value = "8";
    } else if (yearsOfService >= 2 && yearsOfService < 5) {
      entitlementInput.value = "12";
    } else {
      entitlementInput.value = "16";
    }
    
    if (warningEl) {
        if (warningMsg) {
            warningEl.style.display = "block";
            warningEl.textContent = warningMsg;
        } else {
            warningEl.style.display = "none";
        }
    }
    
    submitBtn.disabled = false;
  };

  const calculateLeave = () => {
    if (!startDateInput.value) return;

    const startDate = new Date(startDateInput.value);
    const targetYear = getTargetYear();
    const warningEl = document.getElementById("leaveWarning") as HTMLElement | null;
    let warningMsgs: string[] = [];

    const baseEntitlement = parseFloat(entitlementInput.value) || 0;
    const leaveTaken = parseFloat(takenInput.value) || 0;

    const today = new Date();
    if (startDate > today) {
      warningMsgs.push("Join date is in the future.");
    }

    const currentDate = new Date(targetYear, 11, 31);
    let totalMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
    if (currentDate.getDate() < startDate.getDate()) {
      totalMonths--;
    }
    if (totalMonths < 0) totalMonths = 0;

    let yearsOfService = Math.floor(totalMonths / 12);

    let minEntitlement = 8;
    if (yearsOfService >= 2 && yearsOfService < 5) minEntitlement = 12;
    if (yearsOfService >= 5) minEntitlement = 16;

    if (baseEntitlement < minEntitlement) {
      warningMsgs.push(`Custom entitlement (${baseEntitlement} days) is below the Malaysian minimum requirement (${minEntitlement} days).`);
    }

    let proratedLeave = baseEntitlement;
    const proratedItem = document.getElementById("resProratedItem");

    // Pro-rated rule: ONLY use pro-rated calculation if employee joined DURING the selected calculation year
    if (startDate.getFullYear() === targetYear) {
      if (proratedItem) proratedItem.style.display = "flex";
      
      // Calculate months worked this year
      let monthsWorked = 12 - startDate.getMonth();
      if (startDate.getDate() > 15) {
        monthsWorked -= 0.5;
      }
      if (monthsWorked < 0) monthsWorked = 0;
      
      proratedLeave = Math.round(((monthsWorked / 12) * baseEntitlement) * 10) / 10;
    } else if (targetYear < startDate.getFullYear()) {
      proratedLeave = 0;
      if (proratedItem) proratedItem.style.display = "none";
    } else {
      proratedLeave = baseEntitlement; // Full entitlement
      if (proratedItem) proratedItem.style.display = "none";
    }

    if (leaveTaken > proratedLeave && startDate.getFullYear() === targetYear) {
      warningMsgs.push(`Leave taken exceeds pro-rated entitlement.`);
    } else if (leaveTaken > proratedLeave) {
      warningMsgs.push(`Leave taken exceeds entitlement.`);
    }

    if (warningEl) {
      if (warningMsgs.length > 0) {
        warningEl.style.display = "block";
        warningEl.innerHTML = `<strong>Warnings:</strong><ul style="margin: 4px 0 0 16px; padding: 0;">` + warningMsgs.map(msg => `<li>${msg}</li>`).join('') + `</ul>`;
      } else {
        warningEl.style.display = "none";
      }
    }

    const remainingBalance = Math.round((proratedLeave - leaveTaken) * 10) / 10;
    const months = totalMonths % 12;

    resYearsOfService.textContent = `${yearsOfService} Year${yearsOfService !== 1 ? 's' : ''} ${months} Month${months !== 1 ? 's' : ''}`;
    resTotalEntitlement.textContent = `${baseEntitlement} Days`;
    resProratedLeave.textContent = `${proratedLeave} Days`;
    resLeaveTaken.textContent = `${leaveTaken} Days`;
    resRemainingBalance.textContent = `${remainingBalance >= 0 ? remainingBalance : 0} Days`;

    if (remainingBalance > 4) {
      resSuggestedAction.textContent = `Employee still has ${remainingBalance} leave days remaining. Consider planning leave before year-end.`;
      resSuggestedAction.style.color = "#0f172a";
    } else if (remainingBalance > 0 && remainingBalance <= 4) {
      resSuggestedAction.textContent = `Employee is running low on leave balance (${remainingBalance} days left).`;
      resSuggestedAction.style.color = "#b45309"; // Amber
    } else if (remainingBalance < 0) {
      resSuggestedAction.textContent = `Employee has exceeded allocated leave entitlement by ${Math.abs(remainingBalance)} days.`;
      resSuggestedAction.style.color = "#dc2626"; // Red
    } else {
      resSuggestedAction.textContent = `Leave balance is exactly 0. All entitled leaves have been utilized.`;
      resSuggestedAction.style.color = "#0f172a";
    }

    lastCalculation = {
      startDate: startDateInput.value,
      targetYear,
      yearsOfServiceText: `${yearsOfService} Year${yearsOfService !== 1 ? 's' : ''} ${months} Month${months !== 1 ? 's' : ''}`,
      baseEntitlement,
      proratedLeave,
      leaveTaken,
      remainingBalance
    };

    placeholderText.style.display = "none";
    resultContent.style.display = "block";

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'click_calculate_leave', {
        event_category: 'calculator',
      });
    }
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = submitBtn.textContent || "Calculate";
      submitBtn.textContent = "Calculating...";
      submitBtn.disabled = true;

      setTimeout(() => {
        calculateLeave();
        submitBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16.01" y2="14"></line>
            <line x1="16" y1="18" x2="16.01" y2="18"></line>
            <line x1="12" y1="14" x2="12.01" y2="14"></line>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
            <line x1="8" y1="14" x2="8.01" y2="14"></line>
            <line x1="8" y1="18" x2="8.01" y2="18"></line>
          </svg>
          Calculate
        `;
        submitBtn.disabled = false;
        
        if (window.innerWidth < 768) {
          setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
      }, 300);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'click_reset_leave', { event_category: 'calculator' });
      }
      setTimeout(() => {
        placeholderText.style.display = "block";
        resultContent.style.display = "none";
      }, 10);
    });
  }

  // Modal logic
  if (downloadReportBtn && emailModal) {
    downloadReportBtn.addEventListener("click", () => {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'click_download_leave', { event_category: 'calculator' });
      }
      const modalFormContent = document.getElementById("modalFormContent");
      const modalSuccessContent = document.getElementById("modalSuccessContent");
      
      if (modalFormContent && modalSuccessContent) {
        modalFormContent.style.display = "block";
        modalSuccessContent.style.display = "none";
      }
      emailModal.style.display = "flex";
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

  const closeSuccessBtn = document.getElementById("closeSuccessModal");
  if (closeSuccessBtn && emailModal) {
    closeSuccessBtn.addEventListener("click", (e) => {
      e.preventDefault();
      emailModal.style.display = "none";
    });
  }

  const userType = document.getElementById("userType") as HTMLSelectElement;

  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = emailForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      let originalText = "Submit & Download";
      if (submitBtn) {
        originalText = submitBtn.textContent || "Submit & Download";
        submitBtn.textContent = "Processing...";
        submitBtn.disabled = true;
      }

      try {
        const emailInput = document.getElementById("userEmail") as HTMLInputElement;
        const userTypeSelect = document.getElementById("userType") as HTMLSelectElement;
        const phoneInput = document.getElementById("userPhone") as HTMLInputElement;
        
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          email: emailInput?.value || "",
          userType: userTypeSelect?.value || "",
          userPhone: phoneInput?.value || "",
          download_via: "Annual Leave Calculator"
        };
        
        await fetch("/api/salary-sheet", {
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(sheetPayload)
        });

        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'submit_lead_leave', { event_category: 'lead' });
        }

        if (lastCalculation) {
          generatePDFReport({
            title: "Annual Leave Report",
            fileName: "Annual_Leave_Report",
            data: [
              { label: "Join Date", value: lastCalculation.startDate },
              { label: "Calculation Year", value: lastCalculation.targetYear },
              { label: "Years of Service", value: lastCalculation.yearsOfServiceText },
              { label: "Base Entitlement", value: `${lastCalculation.baseEntitlement} Days` },
              { label: "Pro-Rated Entitlement", value: `${lastCalculation.proratedLeave} Days` },
              { label: "Leave Taken", value: `${lastCalculation.leaveTaken} Days` },
              { label: "Remaining Leave Balance", value: `${lastCalculation.remainingBalance} Days` }
            ]
          });
        }

        
        const modalFormContent = document.getElementById("modalFormContent");
        const modalSuccessContent = document.getElementById("modalSuccessContent");
        
        if (modalFormContent && modalSuccessContent) {
          modalFormContent.style.display = "none";
          if(emailModal) emailModal.style.display = "none";
        }
        
      } catch (err) {
        console.error("Submission error:", err);
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
