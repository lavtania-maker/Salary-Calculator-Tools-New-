import * as fs from "fs";

const files = [
  "index.html",
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
];

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");

  // Fix open modal reset logic for hiringGroup
  const searchPattern = `companyGroup.style.display = "none";
          companyInput.required = false;
          companyInput.value = "";`;

  const replacement = `companyGroup.style.display = "none";
          if (companyInput) {
            companyInput.required = false;
            companyInput.value = "";
          }
          if (hiringGroup) hiringGroup.style.display = "none";
          if (hiringInput) {
            hiringInput.required = false;
            hiringInput.value = "";
          }`;

  content = content.replace(searchPattern, replacement);

  fs.writeFileSync(file, content, "utf8");
  console.log("Fixed resets in", file);
});
