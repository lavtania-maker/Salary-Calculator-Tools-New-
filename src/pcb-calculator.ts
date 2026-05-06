// Simplified Malaysia PCB Tax Calculator
import { collection, addDoc } from "firebase/firestore";
// If db fails to import, we will gracefully handle it
let db: any = null;
import("./firebase.ts").then(fb => {
  db = fb.db;
}).catch(e => {
  console.warn("Firebase not ready", e);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pcbForm") as HTMLFormElement;
  const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
  const resultCard = document.getElementById("resultCard") as HTMLElement;
  const resultContent = document.getElementById("resultContent") as HTMLElement;
  const placeholderText = document.getElementById("placeholderText") as HTMLElement;
  const pcbDisclaimer = document.getElementById("pcbDisclaimer") as HTMLElement;
  
  const resPcb = document.getElementById("resPcb") as HTMLElement;
  const resGross = document.getElementById("resGross") as HTMLElement;
  const resEpf = document.getElementById("resEpf") as HTMLElement;
  const resRelief = document.getElementById("resRelief") as HTMLElement;
  const resChargeable = document.getElementById("resChargeable") as HTMLElement;

  const resEffectiveRate = document.getElementById("resEffectiveRate") as HTMLElement;
  const resTaxBracket = document.getElementById("resTaxBracket") as HTMLElement;
  
  const resAnnualIncome = document.getElementById("resAnnualIncome") as HTMLElement;
  const resAnnualTax = document.getElementById("resAnnualTax") as HTMLElement;
  const resAnnualPcb = document.getElementById("resAnnualPcb") as HTMLElement;

  const downloadReportBtn = document.getElementById("downloadReportBtn") as HTMLButtonElement | null;
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
  
  // Last stored calculation payload
  let lastCalculation: any = null;

  const formatRM = (val: number) => {
    return "RM " + val.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculatePcb = () => {
    // Get values
    const salaryStr = (document.getElementById("grossSalary") as HTMLInputElement).value;
    const salary = parseFloat(salaryStr) || 0;
    
    if (salary <= 0) {
      placeholderText.style.display = "block";
      resultContent.classList.remove("show");
      return;
    }

    const bonusStr = (document.getElementById("bonus") as HTMLInputElement).value;
    const bonus = parseFloat(bonusStr) || 0;

    const epfRateStr = (document.getElementById("epfRate") as HTMLSelectElement).value;
    const epfRate = parseFloat(epfRateStr) / 100 || 0.11;

    const isNonResident = (document.getElementById("taxStatus") as HTMLSelectElement).value === "non-resident";
    const hasSpouse = false;
    
    const childrenCount = 0;

    const zakatStr = (document.getElementById("zakat") as HTMLInputElement).value;
    const zakat = parseFloat(zakatStr) || 0;

    const totalIncome = salary + bonus;

    // Simplified EPF calculation (11% of salary)
    const epfDeduction = totalIncome * epfRate;
    // LHDN allows RM 4,000 max EPF relief per year -> ~333.33/mo
    const epfMaxMonthly = 4000 / 12;
    const epfRelief = Math.min(epfDeduction, epfMaxMonthly);

    // Personal relief (RM 9,000 / year => RM 750 / monthly)
    let totalMonthlyRelief = 9000 / 12;
    
    // Spouse relief (RM 4,000 / year => RM 333.33 / monthly)
    if (hasSpouse) totalMonthlyRelief += 4000 / 12;
    // Child relief (RM 2,000 / yr per child => RM 166.67 / monthly per child)
    totalMonthlyRelief += (childrenCount * 2000) / 12;
    
    let chargeable = totalIncome - epfRelief - totalMonthlyRelief;
    if (chargeable < 0) chargeable = 0;

    let tax = 0;
    let bracket = "0%";

    if (isNonResident) {
      // Flat 30% for non-residents
      tax = chargeable * 0.30;
      bracket = "30%";
    } else {
      // Simplified Monthly Tax Brackets
      const brackets = [
        { limit: 416.67, rate: 0 },
        { limit: 1666.67, rate: 0.01, label: "1%" },
        { limit: 2916.67, rate: 0.03, label: "3%" },
        { limit: 4166.67, rate: 0.06, label: "6%" },
        { limit: 5833.33, rate: 0.11, label: "11%" },
        { limit: 8333.33, rate: 0.19, label: "19%" },
        { limit: 33333.33, rate: 0.25, label: "25%" },
        { limit: 50000.00, rate: 0.26, label: "26%" },
        { limit: 166666.67, rate: 0.28, label: "28%" },
        { limit: Infinity, rate: 0.30, label: "30%" }
      ];

      let remaining = chargeable;
      let previousLimit = 0;

      for (let i = 0; i < brackets.length; i++) {
        const size = brackets[i].limit - previousLimit;
        if (remaining > size) {
          tax += size * brackets[i].rate;
          remaining -= size;
          previousLimit = brackets[i].limit;
          if (brackets[i].label) bracket = brackets[i].label;
        } else {
          tax += remaining * brackets[i].rate;
          if (brackets[i].label) bracket = brackets[i].label;
          break;
        }
      }
    }

    // Apply zakat / rebate
    tax = tax - zakat;
    if (tax < 0) tax = 0;

    const effectiveRate = totalIncome > 0 ? (tax / totalIncome) * 100 : 0;
    const finalReliefAndZakat = totalMonthlyRelief + zakat;

    // Display
    resGross.textContent = formatRM(totalIncome);
    resEpf.textContent = formatRM(epfDeduction);
    resRelief.textContent = formatRM(finalReliefAndZakat);
    resChargeable.textContent = formatRM(chargeable);
    
    resPcb.textContent = formatRM(tax);
    resEffectiveRate.textContent = effectiveRate.toFixed(2) + "%";
    resTaxBracket.textContent = bracket;

    resAnnualIncome.textContent = formatRM(totalIncome * 12);
    resAnnualTax.textContent = formatRM(tax * 12);
    resAnnualPcb.textContent = formatRM(tax * 12);
    
    lastCalculation = {
      salary: salary.toFixed(2),
      bonus: bonus.toFixed(2),
      epf: epfDeduction.toFixed(2),
      relief: finalReliefAndZakat.toFixed(2),
      pcb: tax.toFixed(2),
      totalDeductions: (epfDeduction + tax).toFixed(2),
      netSalary: (totalIncome - epfDeduction - tax).toFixed(2),
      annualIncome: (totalIncome * 12).toFixed(2),
      annualPcb: (tax * 12).toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      taxBracket: bracket,
      taxStatus: isNonResident ? "non-resident" : "resident",
      epfRate: (epfRate * 100).toFixed(0),
      chargeable: chargeable.toFixed(2)
    };

    // Show result panel
    placeholderText.style.display = "none";
    resultContent.classList.add("show");
  };

  const grossSalaryInput = document.getElementById("grossSalary") as HTMLInputElement;
  const calculateBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;

  grossSalaryInput.addEventListener("input", () => {
    const salary = parseFloat(grossSalaryInput.value) || 0;
    calculateBtn.disabled = salary <= 0;
  });

  // Calculate only on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Optional: show loading state on button
    const originalText = calculateBtn.textContent || "Calculate";
    calculateBtn.textContent = "Calculating...";
    calculateBtn.disabled = true;

    setTimeout(() => {
      calculatePcb();
      calculateBtn.textContent = originalText;
      calculateBtn.disabled = false;
      
      // Show disclaimer after calculation
      if (pcbDisclaimer) pcbDisclaimer.style.display = "block";
      
      // Smooth scroll to result on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      }
    }, 300);
  });

  resetBtn.addEventListener("click", () => {
    // Timeout needed to let the form reset values before calculating
    setTimeout(() => {
      placeholderText.style.display = "block";
      resultContent.classList.remove("show");
      calculateBtn.disabled = true;
      if (pcbDisclaimer) pcbDisclaimer.style.display = "none";
    }, 10);
  });

  // Modal logic
  if (downloadReportBtn && emailModal) {
    downloadReportBtn.addEventListener("click", () => {
      if (modalFormContent && modalSuccessContent && modalFeedback) {
          modalFormContent.style.display = "block";
          modalSuccessContent.style.display = "none";
          modalFeedback.style.display = "none";
      }
      const modalTitle = document.getElementById("modalTitle");
      const modalDescription = document.getElementById("modalDescription");
      if (modalTitle) modalTitle.textContent = "Download PCB Report";
      if (modalDescription) modalDescription.textContent = "Enter your email to receive your PCB breakdown and tax report.";
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
      let originalText = "Download PDF";
      if (submitBtn) {
        originalText = submitBtn.textContent || "Download PDF";
        submitBtn.textContent = "Processing...";
        submitBtn.disabled = true;
      }
  
      try {
        // Start showing processing state
        if (submitBtn) {
          originalText = submitBtn.textContent || "Download PDF";
          submitBtn.textContent = "Processing...";
          submitBtn.disabled = true;
        }

        // Fire off background data saving (non-blocking for UI transition)
        const savePromise = (async () => {
          if (db) {
            try {
              await addDoc(collection(db, "leads"), {
                email,
                role,
                isHiring,
                company,
                phone,
                source: "pcb_calculator",
                createdAt: new Date().toISOString()
              });
            } catch (fbErr) {
              console.error("Firebase error (non-blocking):", fbErr);
            }
          }
        })();

        // Small delay to make "Processing..." visible but not annoying
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Transition UI
        if (modalFormContent && modalSuccessContent && modalFeedback) {
          modalFormContent.style.display = "none";
          modalSuccessContent.style.display = "block";
          modalFeedback.style.display = "block";
          
          const mobileActionButtons = document.getElementById("mobileActionButtons");
          const mobileFallbackText = document.getElementById("mobileFallbackText");
          if (mobileActionButtons) mobileActionButtons.style.display = "flex";
          if (mobileFallbackText) mobileFallbackText.style.display = "block";
        }
        
        if (viewFileBtn && lastCalculation) {
            const queryParams = new URLSearchParams({
              salary: lastCalculation.salary,
              bonus: lastCalculation.bonus,
              epf: lastCalculation.epf,
              relief: lastCalculation.relief,
              pcb: lastCalculation.pcb,
              annualIncome: lastCalculation.annualIncome,
              annualPcb: lastCalculation.annualPcb,
              effectiveRate: lastCalculation.effectiveRate,
              taxBracket: lastCalculation.taxBracket,
              taxStatus: lastCalculation.taxStatus,
              epfRate: lastCalculation.epfRate,
              chargeable: lastCalculation.chargeable,
              company: company || "SalaryCalc MY"
            }).toString();
            viewFileBtn.href = `/pcbreport.html?${queryParams}`;
            
            // Close modal when user clicks the view button
            viewFileBtn.addEventListener("click", () => {
              if (emailModal) emailModal.style.display = "none";
            });
        }
        
        // Wait for save to finish in background if we really want to, but we've already shown success
        await savePromise;

      } catch (err) {
        console.error("Submission error:", err);
        // Fallback: still show success if possible
        if (modalFormContent && modalSuccessContent) {
           modalFormContent.style.display = "none";
           modalSuccessContent.style.display = "block";
        }
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
