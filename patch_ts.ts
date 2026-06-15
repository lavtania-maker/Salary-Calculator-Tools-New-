import * as fs from "fs";

const htmls = [
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
];

const appendHtml = `
            <div class="form-group" id="companyNameGroup" style="display: none">
              <label class="form-label" for="companyName">Company Name <span style="color: red">*</span></label>
              <input type="text" id="companyName" class="form-input" placeholder="Your Company Name" />
            </div>

            <div class="form-group" id="hiringQuestionGroup" style="display: none">
              <label class="form-label" for="hiringStatus">Hiring Status <span style="color: red">*</span></label>
              <select id="hiringStatus" class="form-select">
                <option value="" disabled selected>Select status</option>
                <option value="Hiring Now">Hiring Now</option>
                <option value="Planning to Hire Within 3 Months">Planning to Hire Within 3 Months</option>
                <option value="Not Hiring Yet">Not Hiring Yet</option>
              </select>
            </div>
`;

htmls.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");

  // Insert HTML after userType select group
  if (!content.includes('id="companyNameGroup"')) {
    const matchPattern =
      /<select id="userType" class="form-select" required>[\s\S]*?<\/select>\s*<\/div>/;
    content = content.replace(
      matchPattern,
      (match) => match + "\n" + appendHtml,
    );
    fs.writeFileSync(f, content, "utf8");
    console.log("Appended HTML to", f);
  }
});

const tsFiles = [
  "src/pcb-calculator.ts",
  "src/epf-kwsp.ts",
  "src/annual-leave-calculator.ts",
];

const toggleLogic = `
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
`;

const extractLogic = `
      const companyInput = document.getElementById("companyName") as HTMLInputElement;
      const hiringInputObj = document.getElementById("hiringStatus") as HTMLSelectElement;

      const companyValue = companyInput ? companyInput.value.trim() : "";
      const hiringValue = hiringInputObj ? hiringInputObj.value : "";
`;

tsFiles.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");

  if (
    !content.includes(
      'const companyInput = document.getElementById("companyName")',
    )
  ) {
    // we add listener to userType inside the DOMContentLoaded block or where it is fetched
    // Wait, normally `userType` is tracked
    // let's just make it easier. We will find document.getElementById("userType").addEventListener("change", ...)
    const userTypeChangeMatches = content.match(
      /userType\[?\w*\]?\.addEventListener\("change",\s*function\s*\(\w*\)\s*\{/,
    );

    let hasAddedLogic = false;

    if (userTypeChangeMatches) {
      // Already has adding listener probably or we can just replace
    } else if (
      content.includes('const userType = document.getElementById("userType")')
    ) {
      // Add listener
      const listenerAdd = `\n  const userType = document.getElementById("userType") as HTMLSelectElement;
  if (userType) {
    userType.addEventListener("change", function () {
      ${toggleLogic}
    });
  }\n`;
      content = content.replace(
        'const userType = document.getElementById("userType") as HTMLSelectElement;',
        listenerAdd,
      );
      hasAddedLogic = true;
    }

    if (hasAddedLogic) {
      let payloadPattern = /userPhone:\s*phoneValue,?\n\s*download_via:/;
      if (content.match(payloadPattern)) {
        content = content.replace(
          payloadPattern,
          (match) =>
            `companyName: companyValue,\n                hiringStatus: hiringValue,\n                ` +
            match,
        );
      }

      // We need to inject extracting logic before `payload`
      if (content.includes("const phoneValue =")) {
        content = content.replace(
          /(const phoneValue = .*?;)/,
          (match) => match + "\n" + extractLogic,
        );
      }

      // We also need to hide them when modal opens
      // In these tool files, modal is opened via click
      if (content.includes('emailModal.style.display = "flex";')) {
        const openModalClear = `
      const companyGroup = document.getElementById("companyNameGroup");
      const companyInput = document.getElementById("companyName") as HTMLInputElement;
      const hiringGroup = document.getElementById("hiringQuestionGroup");
      const hiringInput = document.getElementById("hiringStatus") as HTMLSelectElement;
      
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
      const userTypeNode = document.getElementById("userType") as HTMLSelectElement;
      if (userTypeNode) userTypeNode.value = "";
`;
        content = content.replace(
          'emailModal.style.display = "flex";',
          'emailModal.style.display = "flex";\n' + openModalClear,
        );
      }

      fs.writeFileSync(f, content, "utf8");
      console.log("Patched TS", f);
    }
  }
});
