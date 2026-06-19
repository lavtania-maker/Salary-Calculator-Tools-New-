import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
// Simplified Malaysia PCB Tax Calculator

import { generatePDFReport } from "./lib/pdf-generator";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pcbForm") as HTMLFormElement;
  const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
  const resultCard = document.getElementById("resultCard") as HTMLElement;
  const resultContent = document.getElementById("resultContent") as HTMLElement;
  const placeholderText = document.getElementById(
    "placeholderText",
  ) as HTMLElement;
  const pcbDisclaimer = document.getElementById("pcbDisclaimer") as HTMLElement;

  const resPcb = document.getElementById("resPcb") as HTMLElement;
  const resGross = document.getElementById("resGross") as HTMLElement;
  const resEpf = document.getElementById("resEpf") as HTMLElement;
  const resRelief = document.getElementById("resRelief") as HTMLElement;
  const resChargeable = document.getElementById("resChargeable") as HTMLElement;

  const resEffectiveRate = document.getElementById(
    "resEffectiveRate",
  ) as HTMLElement;
  const resTaxBracket = document.getElementById("resTaxBracket") as HTMLElement;

  const resAnnualIncome = document.getElementById(
    "resAnnualIncome",
  ) as HTMLElement;
  const resAnnualTax = document.getElementById("resAnnualTax") as HTMLElement;
  const resAnnualPcb = document.getElementById("resAnnualPcb") as HTMLElement;

  const resTakeHomeSalary = document.getElementById(
    "resTakeHomeSalary",
  ) as HTMLElement;
  const resTakeHomeGross = document.getElementById(
    "resTakeHomeGross",
  ) as HTMLElement;
  const resTakeHomeEpf = document.getElementById(
    "resTakeHomeEpf",
  ) as HTMLElement;
  const resTakeHomePcb = document.getElementById(
    "resTakeHomePcb",
  ) as HTMLElement;
  const resTakeHomeTaxRate = document.getElementById(
    "resTakeHomeTaxRate",
  ) as HTMLElement;

  const downloadReportBtn = document.getElementById(
    "downloadReportBtn",
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
  const viewFileBtn = document.getElementById(
    "viewFileBtn",
  ) as HTMLAnchorElement | null;

  // Last stored calculation payload
  let lastCalculation: any = null;

  const formatRM = (val: number) => {
    return (
      "RM " +
      val.toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const calculatePcb = () => {
    // Get values
    const salaryStr = (
      document.getElementById("grossSalary") as HTMLInputElement
    ).value;
    const salary = parseFloat(salaryStr) || 0;

    if (salary <= 0) {
      placeholderText.style.display = "block";
      resultContent.classList.remove("show");
      return;
    }

    const bonusStr = (document.getElementById("bonus") as HTMLInputElement)
      .value;
    const bonus = parseFloat(bonusStr) || 0;

    const epfRateStr = (document.getElementById("epfRate") as HTMLSelectElement)
      .value;
    const epfRate = parseFloat(epfRateStr) / 100 || 0.11;

    const isNonResident =
      (document.getElementById("taxStatus") as HTMLSelectElement).value ===
      "non-resident";
    const hasSpouse = false;

    const childrenCount = 0;

    const zakatStr = (document.getElementById("zakat") as HTMLInputElement)
      .value;
    const zakat = parseFloat(zakatStr) || 0;

    const totalIncome = salary + bonus;

    // EPF deduction
const epfDeduction = totalIncome * epfRate;
const annualIncome = (totalIncome - epfDeduction) * 12;
const personalRelief = 9000;
let totalRelief = personalRelief;
if (hasSpouse) totalRelief += 4000;
totalRelief += (childrenCount * 2000);
const taxableIncome = annualIncome - totalRelief;
let tax = 0;
let bracket = '0%';
let annualTax = 0;
if (isNonResident) {
  annualTax = annualIncome * 0.30;
  bracket = '30%';
  tax = annualTax / 12;
} else {
  if (taxableIncome > 0) {
    if (taxableIncome <= 5000) {
      annualTax = 0;
      bracket = '0%';
    } else if (taxableIncome <= 20000) {
      annualTax = (taxableIncome - 5000) * 0.01;
      bracket = '1%';
    } else if (taxableIncome <= 35000) {
      annualTax = 150 + (taxableIncome - 20000) * 0.03;
      bracket = '3%';
    } else if (taxableIncome <= 50000) {
      annualTax = 600 + (taxableIncome - 35000) * 0.06;
      bracket = '6%';
    } else if (taxableIncome <= 70000) {
      annualTax = 1500 + (taxableIncome - 50000) * 0.11;
      bracket = '11%';
    } else if (taxableIncome <= 100000) {
      annualTax = 3700 + (taxableIncome - 70000) * 0.19;
      bracket = '19%';
    } else if (taxableIncome <= 400000) {
      annualTax = 9400 + (taxableIncome - 100000) * 0.25;
      bracket = '25%';
    } else if (taxableIncome <= 600000) {
      annualTax = 84400 + (taxableIncome - 400000) * 0.26;
      bracket = '26%';
    } else if (taxableIncome <= 2000000) {
      annualTax = 136400 + (taxableIncome - 600000) * 0.28;
      bracket = '28%';
    } else {
      annualTax = 528400 + (taxableIncome - 2000000) * 0.30;
      bracket = '30%';
    }
    tax = annualTax / 12;
  }
}
tax = tax - zakat;
if (tax < 0) tax = 0;
let chargeable = taxableIncome > 0 ? taxableIncome / 12 : 0;
const effectiveRate = totalIncome > 0 ? (tax / totalIncome) * 100 : 0;
const finalReliefAndZakat = (totalRelief/12) + zakat;


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

    // Take Home Salary updates
    const takeHomeSalary = totalIncome - epfDeduction - tax;
    resTakeHomeSalary.textContent = formatRM(takeHomeSalary);
    resTakeHomeGross.textContent = formatRM(totalIncome);
    resTakeHomeEpf.textContent = "-" + formatRM(epfDeduction);
    resTakeHomePcb.textContent = "-" + formatRM(tax);
    resTakeHomeTaxRate.textContent =
      effectiveRate.toFixed(1) + "% of gross salary";

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
      chargeable: chargeable.toFixed(2),
    };

    // Show result panel
    placeholderText.style.display = "none";
    resultContent.classList.add("show");
  };

  const grossSalaryInput = document.getElementById(
    "grossSalary",
  ) as HTMLInputElement;
  const calculateBtn = form.querySelector(
    "button[type='submit']",
  ) as HTMLButtonElement;

  grossSalaryInput.addEventListener("input", () => {
    // const salary = parseFloat(grossSalaryInput.value) || 0;
    // calculateBtn.disabled = salary <= 0;
  });

  // Calculate only on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optional: show loading state on button
    const originalHTML = calculateBtn.innerHTML;
    calculateBtn.innerHTML = "Calculating...";
    calculateBtn.disabled = true;

    setTimeout(() => {
      calculatePcb();
      calculateBtn.innerHTML = originalHTML;
      calculateBtn.disabled = false;

      // Show disclaimer after calculation
      if (pcbDisclaimer) pcbDisclaimer.style.display = "block";

      // Smooth scroll to result on mobile
      if (window.innerWidth < 768) {
        setTimeout(
          () =>
            resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          100,
        );
      }
    }, 300);
  });

  resetBtn.addEventListener("click", () => {
    // Timeout needed to let the form reset values before calculating
    setTimeout(() => {
      placeholderText.style.display = "block";
      resultContent.classList.remove("show");
      // calculateBtn.disabled = true;
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
      if (modalDescription)
        modalDescription.textContent =
          "Enter your email to receive your PCB breakdown and tax report.";
      emailModal.style.display = "flex";

      const companyGroup = document.getElementById("companyNameGroup");
      const companyInput = document.getElementById(
        "companyName",
      ) as HTMLInputElement;
      const hiringGroup = document.getElementById("hiringQuestionGroup");
      const hiringInput = document.getElementById(
        "hiringStatus",
      ) as HTMLSelectElement;

      if (companyGroup) companyGroup.style.display = "none";
      if (companyInput) {
        companyInput.required = false;
        companyInput.value = "";
      }
      if (hiringGroup) hiringGroup.style.display = "none";
      if (hiringInput) {
        hiringInput.required = false;
        hiringInput.value = "";
      }
      const userTypeNode = document.getElementById(
        "userType",
      ) as HTMLSelectElement;
      if (userTypeNode) userTypeNode.value = "";
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

  const userTypeNodeExt = document.getElementById(
    "userType",
  ) as HTMLSelectElement | null;
  if (userTypeNodeExt) {
    userTypeNodeExt.addEventListener(
      "change",
      function (this: HTMLSelectElement) {
        const companyGroup = document.getElementById("companyNameGroup");
        const companyInput = document.getElementById(
          "companyName",
        ) as HTMLInputElement;
        const hiringGroup = document.getElementById("hiringQuestionGroup");
        const hiringInput = document.getElementById(
          "hiringStatus",
        ) as HTMLSelectElement;

        if (this.value === "Employer / HR" || this.value === "Employer/HR") {
          if (companyGroup) companyGroup.style.display = "block";
          if (companyInput) companyInput.required = true;
          if (hiringGroup) hiringGroup.style.display = "block";
          if (hiringInput) hiringInput.required = true;
        } else {
          if (companyGroup) companyGroup.style.display = "none";
          if (companyInput) {
            companyInput.required = false;
            companyInput.value = "";
          }
          if (hiringGroup) hiringGroup.style.display = "none";
          if (hiringInput) {
            hiringInput.required = false;
            hiringInput.value = "";
          }
        }
      },
    );
  }

  if (emailForm) {
    emailForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = userEmail ? userEmail.value : "";
      const role = userType ? userType.value : "";
      const isHiring = "";
      const company = "";
      const phone = userPhone ? userPhone.value : "";

      const submitBtn = emailForm.querySelector(
        'button[type="submit"]',
      ) as HTMLButtonElement | null;
      let originalText = "Submit & Download";
      if (submitBtn) {
        originalText = submitBtn.textContent || "Submit & Download";
        submitBtn.textContent = "Processing...";
        submitBtn.disabled = true;
      }

      try {
        // Data saving to Google Sheets
        const companyInputExt = document.getElementById(
          "companyName",
        ) as HTMLInputElement;
        const hiringInputExt = document.getElementById(
          "hiringStatus",
        ) as HTMLSelectElement;
        const sheetPayload = {
          timestamp: new Date().toISOString(),
          Email: email,
          "User Type": role,
          "Hiring Status": hiringInputExt?.value || "",
          "Company Name": companyInputExt?.value?.trim() || "",
          "User Phone": phone,
          download_via: "PCB Calculator",
          ...(lastCalculation ? {
            "Gross Salary": lastCalculation.salary,
            "Bonus": lastCalculation.bonus,
            "Annual Income": lastCalculation.annualIncome,
            "Total Reliefs": lastCalculation.relief,
            "Tax Bracket": lastCalculation.taxBracket,
            "Monthly PCB": lastCalculation.pcb,
            "Net Salary": lastCalculation.netSalary,
            "Tax Status": lastCalculation.taxStatus === "resident" ? "Resident" : "Non-Resident"
          } : {})
        };

        const dbPayload = {
          email: email,
          userType: role,
          action: "Download PCB Report",
          createdAt: new Date().toISOString(),
          ...(lastCalculation ? {
            salary: lastCalculation.salary,
            bonus: lastCalculation.bonus,
            annualIncome: lastCalculation.annualIncome,
            relief: lastCalculation.relief,
            taxBracket: lastCalculation.taxBracket,
            pcb: lastCalculation.pcb,
            netSalary: lastCalculation.netSalary,
            taxStatus: lastCalculation.taxStatus
          } : {})
        };
        if (companyInputExt?.value?.trim())
          (dbPayload as any).companyName = companyInputExt?.value?.trim();
        if (hiringInputExt?.value)
          (dbPayload as any).hiringStatus = hiringInputExt?.value;
        if (phone) (dbPayload as any).phoneNumber = phone;

        try {
          await addDoc(collection(db, "leads"), dbPayload);
        } catch (err) {
          console.error("Firestore error:", err);
        }

        try {
          await fetch("/api/pcb-sheet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sheetPayload),
          });
        } catch (err) {
          console.error("Google Sheets Webhook error:", err);
        }

        if (lastCalculation) {
          generatePDFReport({
            title: "PCB (Income Tax) Report",
            fileName: "PCB_Report",
            data: [
              {
                label: "Gross Salary",
                value: `RM ${parseFloat(lastCalculation.salary).toFixed(2)}`,
              },
              {
                label: "Bonus",
                value: `RM ${parseFloat(lastCalculation.bonus).toFixed(2)}`,
              },
              {
                label: "Tax Status",
                value:
                  lastCalculation.taxStatus === "resident"
                    ? "Resident"
                    : "Non-Resident",
              },
              {
                label: "EPF Rate",
                value: `${parseFloat(lastCalculation.epfRate)}%`,
              },
              {
                label: "Annual Income",
                value: `RM ${parseFloat(lastCalculation.annualIncome).toFixed(2)}`,
              },
              {
                label: "Total Tax Reliefs",
                value: `RM ${parseFloat(lastCalculation.relief).toFixed(2)}`,
              },
              {
                label: "Chargeable Income",
                value: `RM ${parseFloat(lastCalculation.chargeable).toFixed(2)}`,
              },
              { label: "Tax Bracket", value: lastCalculation.taxBracket },
              {
                label: "Effective Tax Rate",
                value: `${lastCalculation.effectiveRate}%`,
              },
              {
                label: "Monthly PCB Deducted",
                value: `-RM ${parseFloat(lastCalculation.pcb).toFixed(2)}`,
              },
              {
                label: "Take Home Salary",
                value: `RM ${parseFloat(lastCalculation.netSalary).toFixed(2)}`,
              },
            ],
          });
        }

        // Small delay to make "Processing..." visible but not annoying
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Transition UI
        if (modalFormContent && modalSuccessContent && modalFeedback) {
          modalFormContent.style.display = "none";
          if (emailModal) emailModal.style.display = "none";

          if (role === "Employer / HR" || role === "Employer/HR") {
            const hiringModal = document.getElementById("hiringIntentModal");
            if (hiringModal) {
              hiringModal.style.display = "flex";
              (window as any)._currentLeadEmail = email;
              (window as any)._currentLeadType = "PCB Calculator";
            }
          }
          modalFeedback.textContent =
            "Thank you! Your PCB report has been downloaded.";
          modalFeedback.style.display = "block";

          const mobileActionButtons = document.getElementById(
            "mobileActionButtons",
          );
          const mobileFallbackText =
            document.getElementById("mobileFallbackText");
          if (mobileActionButtons) mobileActionButtons.style.display = "none";
          if (mobileFallbackText) mobileFallbackText.style.display = "none";
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
