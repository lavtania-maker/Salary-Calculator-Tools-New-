const fs = require('fs');
let content = fs.readFileSync('src/annual-leave-calculator.ts', 'utf8');

const regex1 = /const submitBtn = document\.getElementById\([\s\S]*?\) as HTMLButtonElement;/;
const rep1 = `const submitBtn = document.getElementById(
    "leaveSubmitBtn",
  ) as HTMLButtonElement;

  const categorySelect = document.getElementById(
    "employeeCategory",
  ) as HTMLSelectElement | null;
  const employmentTypeSelect = document.getElementById(
    "employmentType",
  ) as HTMLSelectElement | null;
  
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      if (categorySelect.value === "below-2") entitlementInput.value = "8";
      else if (categorySelect.value === "2-5") entitlementInput.value = "12";
      else if (categorySelect.value === "above-5") entitlementInput.value = "16";
    });
  }`;

let newContent = content.replace(regex1, rep1);

const regex2 = /const yearsOfService = years;[\s\S]*?entitlementInput\.value = "16";\s*}/;
const rep2 = `const yearsOfService = years;

    let categoryVal = "below-2";
    if (yearsOfService < 2) {
      entitlementInput.value = "8";
      categoryVal = "below-2";
    } else if (yearsOfService >= 2 && yearsOfService < 5) {
      entitlementInput.value = "12";
      categoryVal = "2-5";
    } else {
      entitlementInput.value = "16";
      categoryVal = "above-5";
    }

    if (categorySelect) {
      categorySelect.value = categoryVal;
    }`;

newContent = newContent.replace(regex2, rep2);

fs.writeFileSync('src/annual-leave-calculator.ts', newContent);
console.log('Patched');
