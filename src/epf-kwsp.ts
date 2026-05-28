document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("epfForm") as HTMLFormElement;
  const resetBtn = document.getElementById("epfResetBtn") as HTMLButtonElement;
  const resultCard = document.getElementById("epfResultCard") as HTMLElement;
  const resultContent = document.getElementById("epfResultsContent") as HTMLElement;
  const placeholderText = document.getElementById("epfPlaceholder") as HTMLElement;

  const resTotalEpf = document.getElementById("epfTotalCardVal") as HTMLElement;
  const resEmployeeEpf = document.getElementById("epfEmployeeCardVal") as HTMLElement;
  const resEmployerEpf = document.getElementById("epfEmployerCardVal") as HTMLElement;

  const resSalarySummary = document.getElementById("epfSalarySummaryVal") as HTMLElement;
  const resNetSalary = document.getElementById("epfNetSalaryVal") as HTMLElement;
  const resEmployeeRate = document.getElementById("epfEmployeeRate") as HTMLElement;
  const resEmployerRate = document.getElementById("epfEmployerRate") as HTMLElement;
  
  const barEmp = document.getElementById("epfEmpBar") as HTMLElement;
  const barEmpr = document.getElementById("epfEmprBar") as HTMLElement;

  const downloadReportBtn = document.getElementById("downloadEpfReportBtn") as HTMLButtonElement | null;
  const emailModal = document.getElementById("emailModal") as HTMLElement | null;
  const closeModalBtn = document.getElementById("closeModal") as HTMLElement | null;

  const emailForm = document.getElementById("emailForm") as HTMLFormElement | null;
  const userEmail = document.getElementById("userEmail") as HTMLInputElement | null;
  const userType = document.getElementById("userType") as HTMLSelectElement | null;
  const userPhone = document.getElementById("userPhone") as HTMLInputElement | null;

  const hiringQuestionGroup = document.getElementById("hiringQuestionGroup") as HTMLElement | null;
  const hiringStatus = document.getElementById("hiringStatus") as HTMLSelectElement | null;
  const companyNameGroup = document.getElementById("companyNameGroup") as HTMLElement | null;
  const companyName = document.getElementById("companyName") as HTMLInputElement | null;

  const modalFormContent = document.getElementById("modalFormContent") as HTMLElement | null;
  const modalSuccessContent = document.getElementById("modalSuccessContent") as HTMLElement | null;
  const modalFeedback = document.getElementById("modalFeedback") as HTMLElement | null;
  const viewFileBtn = document.getElementById("viewFileBtn") as HTMLAnchorElement | null;

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileNavMenu.classList.toggle("open");
    });
  }

  let lastCalculation: any = null;

  const formatRM = (val: number) => {
    return "RM " + val.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculateEpf = () => {
    const salaryStr = (document.getElementById("epfGrossSalary") as HTMLInputElement).value;
    const salary = parseFloat(salaryStr) || 0;

    if (salary <= 0) {
      placeholderText.style.display = "block";
      resultContent.style.display = "none";
      return;
    }

    const age = (document.querySelector('input[name="epfAge"]:checked') as HTMLInputElement).value;
    const nationality = (document.querySelector('input[name="epfNationality"]:checked') as HTMLInputElement).value;

    const isMalaysian = nationality === "malaysian";
    const isAbove60 = age === "above60";

    let employeeRate = 0;
    let employerRate = 0;
    let employerFlat = 0;

    let empRateStr = "0%";
    let emprRateStr = "0%";

    if (isMalaysian) {
      if (isAbove60) {
        employeeRate = 0.00;
        employerRate = 0.04;
        empRateStr = "0%";
        emprRateStr = "4%";
      } else {
        employeeRate = 0.11;
        employerRate = salary <= 5000 ? 0.13 : 0.12;
        empRateStr = "11%";
        emprRateStr = salary <= 5000 ? "13%" : "12%";
      }
    } else {
      // Foreigner
      if (isAbove60) {
        employeeRate = 0.055;
        employerFlat = 5;
        empRateStr = "5.5%";
        emprRateStr = "Flat RM 5";
      } else {
        employeeRate = 0.11;
        employerFlat = 5;
        empRateStr = "11%";
        emprRateStr = "Flat RM 5";
      }
    }

    const employeeEpf = salary * employeeRate;
    const employerEpf = employerFlat > 0 ? employerFlat : salary * employerRate;
    const totalEpf = employeeEpf + employerEpf;
    const netSalary = salary - employeeEpf;

    if (resTotalEpf) resTotalEpf.textContent = formatRM(totalEpf);
    if (resEmployeeEpf) resEmployeeEpf.textContent = formatRM(employeeEpf);
    if (resEmployerEpf) resEmployerEpf.textContent = formatRM(employerEpf);
    
    if (resSalarySummary) resSalarySummary.textContent = formatRM(salary);
    if (resNetSalary) resNetSalary.textContent = formatRM(netSalary);
    if (resEmployeeRate) resEmployeeRate.textContent = `(${empRateStr})`;
    if (resEmployerRate) resEmployerRate.textContent = `(${emprRateStr})`;
    
    if (barEmp && barEmpr && totalEpf > 0) {
      const empPct = (employeeEpf / totalEpf) * 100;
      const emprPct = 100 - empPct;
      barEmp.style.width = empPct + "%";
      barEmpr.style.width = emprPct + "%";
    }

    lastCalculation = {
      salary: salary.toFixed(2),
      employeeEpf: employeeEpf.toFixed(2),
      employerEpf: employerEpf.toFixed(2),
      totalEpf: totalEpf.toFixed(2),
      netSalary: netSalary.toFixed(2),
      empRateStr,
      emprRateStr,
      age,
      nationality
    };

    placeholderText.style.display = "none";
    resultContent.style.display = "block";

    // trigger GA4
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'click_calculate_epf', {
        event_category: 'calculator',
        value: lastCalculation.salary
      });
    }
  };

  const grossSalaryInput = document.getElementById("epfGrossSalary") as HTMLInputElement;
  const calculateBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

  if (grossSalaryInput && calculateBtn) {
    grossSalaryInput.addEventListener("input", () => {
      calculateBtn.disabled = (parseFloat(grossSalaryInput.value) || 0) <= 0;
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const originalText = calculateBtn.textContent || "Calculate";
      calculateBtn.textContent = "Calculating...";
      calculateBtn.disabled = true;

      setTimeout(() => {
        calculateEpf();
        // Since we copied the HTML structure, the button has the SVG plus Calculate text.
        // It's cleaner to just not overwrite the SVG entirely if we don't have to,
        // but replacing text is fine, wait. I will restore the innerHTML so the SVG stays.
        calculateBtn.innerHTML = `
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
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
        calculateBtn.disabled = false;
        
        if (window.innerWidth < 768) {
          setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
      }, 300);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'click_reset_epf', { event_category: 'calculator' });
      }
      setTimeout(() => {
        placeholderText.style.display = "block";
        resultContent.style.display = "none";
        calculateBtn.disabled = true;
      }, 10);
    });
  }

  // Modal logic
  if (downloadReportBtn && emailModal) {
    downloadReportBtn.addEventListener("click", () => {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'click_download_epf', { event_category: 'calculator' });
      }
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

  if (userType) {
    userType.addEventListener("change", function () {
      if (!hiringQuestionGroup || !hiringStatus || !companyNameGroup || !companyName) return;
      if (this.value === "Employer / HR") {
        hiringQuestionGroup.style.display = "block";
        hiringStatus.required = true;
        companyNameGroup.style.display = "block";
        companyName.required = true;
      } else {
        hiringQuestionGroup.style.display = "none";
        hiringStatus.required = false;
        companyNameGroup.style.display = "none";
        companyName.required = false;
      }
    });
  }

  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = userEmail ? userEmail.value : "";
      const role = userType ? userType.value : "";
      const isHiring = hiringStatus ? hiringStatus.value : "";
      const company = companyName ? companyName.value : "";
      const phone = userPhone ? userPhone.value : "";
  
      const submitBtn = emailForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      let originalText = "Submit & Download";
      if (submitBtn) {
        originalText = submitBtn.textContent || "Submit & Download";
        submitBtn.textContent = "Generating your report...";
        submitBtn.disabled = true;
      }
      
      // Open new window immediately to bypass popup blockers
      const popup = window.open('about:blank', '_blank');
      
      try {
      const savePromise = (async () => {
          try {
            console.log("[v0] EPF sheet submission starting...");
            const payload = {
              timestamp: new Date().toISOString(),
              email,
              userType: role,
              hiringStatus: isHiring,
              companyName: company,
              userPhone: phone,
              download_via: "epf calculator",
            };
            console.log("[v0] EPF payload:", JSON.stringify(payload));
            const response = await fetch("/api/epf-sheet", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const result = await response.json();
            console.log("[v0] EPF sheet response:", response.status, JSON.stringify(result));
            if (!response.ok) {
              console.error("[v0] EPF sheet API error:", result);
            }
          } catch (sheetErr) {
            console.error("[v0] EPF sheet fetch error:", sheetErr);
          }
        })();

        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'submit_lead_epf', { event_category: 'lead' });
        }

        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (modalFormContent && modalSuccessContent) {
          modalFormContent.style.display = "none";
          modalSuccessContent.style.display = "block";
          if (modalFeedback) modalFeedback.style.display = "block";
          
          const mobileActionButtons = document.getElementById("mobileActionButtons");
          const mobileFallbackText = document.getElementById("mobileFallbackText");
          if (mobileActionButtons) mobileActionButtons.style.display = "flex";
          if (mobileFallbackText) mobileFallbackText.style.display = "block";
        }
        
        if (lastCalculation) {
            const queryParams = new URLSearchParams({
              salary: lastCalculation.salary,
              employeeEpf: lastCalculation.employeeEpf,
              employerEpf: lastCalculation.employerEpf,
              totalEpf: lastCalculation.totalEpf,
              netSalary: lastCalculation.netSalary,
              empRateStr: lastCalculation.empRateStr,
              emprRateStr: lastCalculation.emprRateStr,
              age: lastCalculation.age,
              nationality: lastCalculation.nationality,
              company: company || "SalaryCalculator.my"
            }).toString();
            
            const reportUrl = `/epfreport.html?${queryParams}`;
            if (popup) {
              popup.location.href = reportUrl;
            } else {
              // Fallback if popup blocked
              if (viewFileBtn) {
                viewFileBtn.href = reportUrl;
                viewFileBtn.click();
              } else {
                window.location.href = reportUrl;
              }
            }
            
            if (viewFileBtn) {
              viewFileBtn.href = reportUrl;
              viewFileBtn.addEventListener("click", () => {
                if (emailModal) emailModal.style.display = "none";
              });
            }
        } else {
          if (popup) popup.close();
        }
        
        await savePromise;

      } catch (err) {
        console.error("Submission error:", err);
        if (popup) popup.close();
        alert("An error occurred while generating the report. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
