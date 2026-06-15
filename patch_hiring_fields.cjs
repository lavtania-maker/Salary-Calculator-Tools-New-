const fs = require('fs');

const files = ['index.html', 'pcb-income-tax.html', 'epf-kwsp.html', 'annual-leave-calculator.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Add the hiring status field after company group
  const hiringHTML = `
            <div class="form-group" id="hiringQuestionGroup" style="display: none">
              <label class="form-label" for="hiringStatus">Hiring Status <span style="color: red">*</span></label>
              <select id="hiringStatus" class="form-select">
                <option value="" disabled selected>Select status</option>
                <option value="Hiring Now">Hiring Now</option>
                <option value="Planning to Hire Within 3 Months">Planning to Hire Within 3 Months</option>
                <option value="Not Hiring Yet">Not Hiring Yet</option>
              </select>
            </div>`;

  if (!content.includes('id="hiringQuestionGroup"')) {
    content = content.replace(
      /id="companyNameGroup" style="display: none">[\s\S]*?<\/div>/,
      match => match + '\n' + hiringHTML
    );
  }

  // Update Javascript to show/hide the hiringQuestionGroup
  if (content.includes('const companyGroup = document.getElementById("companyNameGroup");')) {
    if (!content.includes('const hiringGroup = document.getElementById("hiringQuestionGroup");')) {
      content = content.replace(
        'const companyInput = document.getElementById("companyName");',
        'const companyInput = document.getElementById("companyName");\n          const hiringGroup = document.getElementById("hiringQuestionGroup");\n          const hiringInput = document.getElementById("hiringStatus");'
      );
    }
  }

  // Handle differences in indexing for Employer / HR condition
  content = content.replace(
    'if (companyInput) companyInput.required = true;',
    'if (companyInput) companyInput.required = true;\n            if (hiringGroup) hiringGroup.style.display = "block";\n            if (hiringInput) hiringInput.required = true;'
  );

  content = content.replace(
    /if \(companyInput\) \{\s*companyInput\.required = false;\s*companyInput\.value = "";\s*\}/,
    `if (companyInput) {
              companyInput.required = false;
              companyInput.value = "";
            }
            if (hiringGroup) hiringGroup.style.display = "none";
            if (hiringInput) {
              hiringInput.required = false;
              hiringInput.value = "";
            }`
  );


  // Update modal opening reset
  if (content.match(/companyGroup\.style\.display = "none";\s*companyInput\.required = false;\s*companyInput\.value = "";/)) {
      if (!content.includes('hiringGroup.style.display = "none";')) {
          content = content.replace(
            /companyGroup\.style\.display = "none";\s*companyInput\.required = false;\s*companyInput\.value = "";/,
            match => match + `\n          const hiringGroup = document.getElementById("hiringQuestionGroup");
          const hiringInput = document.getElementById("hiringStatus");
          if (hiringGroup) {
            hiringGroup.style.display = "none";
          }
          if (hiringInput) {
            hiringInput.required = false;
            hiringInput.value = "";
          }`
          );
      }
  }

  // Submit handling update
  if (content.includes('let hiringValue = "";')) {
       // Replaces let hiringValue = "";
       content = content.replace(
           'let hiringValue = "";',
           `const hiringInputObj = document.getElementById("hiringStatus");
          let hiringValue = hiringInputObj ? hiringInputObj.value : "";`
       );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated', file);
});
