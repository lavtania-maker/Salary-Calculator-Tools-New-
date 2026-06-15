const fs = require('fs');
const files = ['pcb-income-tax.html', 'epf-kwsp.html'];
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
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('id="companyNameGroup"')) {
      // Find the end of the userType select div
      const regex = /(<select id="userType"[\s\S]*?<\/select>\s*<\/div>)/;
      content = content.replace(regex, match => match + '\n' + appendHtml);
      fs.writeFileSync(f, content, 'utf8');
      console.log('Patched HTML for', f);
  }
});
