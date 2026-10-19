const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('hourly-rate.html', 'utf8');
const $ = cheerio.load(html);

// 3. Update Calculator Form
$('#calculatorForm').html(`
  <!-- Monthly Salary -->
  <div class="form-group">
    <label class="form-label" for="monthlySalary">Monthly Salary (RM) <span style="color: #dc2626">*</span></label>
    <div style="color: #dc2626; font-size: 13px; font-weight: 400; margin-bottom: 10px; margin-top: -6px;">*Required</div>
    <input type="number" id="monthlySalary" class="form-input" placeholder="e.g. 3000" min="0" step="1">
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
    <!-- Working Days Per Week -->
    <div class="form-group">
      <label class="form-label" for="workingDaysSelect">Working Days Per Week</label>
      <select id="workingDaysSelect" class="form-select">
        <option value="5">5 Days</option>
        <option value="5.5">5.5 Days</option>
        <option value="6">6 Days</option>
      </select>
    </div>

    <!-- Working Hours Per Day -->
    <div class="form-group">
      <label class="form-label" for="workingHours">Working Hours Per Day</label>
      <input type="number" id="workingHours" class="form-input" value="8" min="1" max="24" step="0.5">
    </div>
  </div>

  <!-- Employment Type -->
  <div class="form-group">
    <label class="form-label" for="employmentType">Employment Type</label>
    <select id="employmentType" class="form-select">
      <option value="full-time">Full-Time</option>
      <option value="part-time">Part-Time</option>
      <option value="freelance">Freelance</option>
      <option value="internship">Internship</option>
    </select>
  </div>

  <div class="form-actions" style="margin-top: 24px; gap: 16px;">
    <button type="reset" id="resetBtn" class="btn btn-outline" style="flex: 1;">Reset</button>
    <button type="button" id="calculateBtn" class="btn btn-primary" style="flex: 2;">Calculate</button>
  </div>
`);

fs.writeFileSync('hourly-rate.html', $.html());
