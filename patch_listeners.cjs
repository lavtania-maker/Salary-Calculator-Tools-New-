const fs = require('fs');

const files = ['src/epf-kwsp.ts', 'src/pcb-calculator.ts'];

const listenerLogic = `
  const userTypeNodeExt = document.getElementById("userType") as HTMLSelectElement | null;
  if (userTypeNodeExt) {
    userTypeNodeExt.addEventListener("change", function (this: HTMLSelectElement) {
      const companyGroup = document.getElementById("companyNameGroup");
      const companyInput = document.getElementById("companyName") as HTMLInputElement;
      const hiringGroup = document.getElementById("hiringQuestionGroup");
      const hiringInput = document.getElementById("hiringStatus") as HTMLSelectElement;

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
    });
  }
`;

files.forEach(f => {
   let content = fs.readFileSync(f, 'utf8');
   if (!content.includes('userTypeNodeExt.addEventListener')) {
      // Find `if (emailForm) {` or we can just stick it right before it
      content = content.replace('if (emailForm) {', listenerLogic + '\n  if (emailForm) {');
      fs.writeFileSync(f, content, 'utf8');
      console.log('Patched', f);
   }
});
