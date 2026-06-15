const fs = require('fs');
let content = fs.readFileSync('annual-leave-calculator.html', 'utf8');

const newFields = `              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
                <div class="form-group">
                  <label class="form-label" for="employmentType">Employment Type</label>
                  <select id="employmentType" class="form-select">
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="employeeCategory">Employee Category</label>
                  <select id="employeeCategory" class="form-select">
                    <option value="below-2">Below 2 Years</option>
                    <option value="2-5">2-5 Years</option>
                    <option value="above-5">Above 5 Years</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Public Holiday Included?</label>
                <div style="display: flex; gap: 16px; margin-top: 8px;">
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="radio" name="publicHolidayIncluded" value="yes"> Yes
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="radio" name="publicHolidayIncluded" value="no" checked> No
                  </label>
                </div>
              </div>\n\n`;

const re = /<div\s+style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px"\s*>\s*<div class="form-group">\s*<label class="form-label" for="leaveCalcYear"/;
const match = content.match(re);
if (content.includes('id="employmentType"')) {
    console.log('Already inserted');
} else if (match) {
    content = content.replace(re, newFields + match[0]);
    fs.writeFileSync('annual-leave-calculator.html', content);
    console.log('Inserted HTML fields in annual-leave-calculator.html');
} else {
    console.log('Regex did not match.');
}
