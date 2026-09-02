import os
import re

modal_html = """
    <!-- Lead Modal -->
    <div id="emailModal" class="modal-overlay">
      <div class="modal">
        <span class="modal-close" id="closeModal">&times;</span>

        <div id="modalFormContent">
          <h2 id="modalTitle" style="color: #2563eb !important;">Download Report</h2>
          <p id="modalDescription">
            Enter your email address to receive your detailed PDF report.
          </p>
          <form id="emailForm">
            <div class="form-group">
              <label class="form-label" for="userName">Full Name <span style="color: red">*</span></label>
              <input type="text" id="userName" class="form-input" placeholder="Your Name" required="">
            </div>
            <div class="form-group">
              <label class="form-label" for="userEmail">Email Address <span style="color: red">*</span></label>
              <input type="email" id="userEmail" class="form-input" placeholder="you@example.com" required="">
            </div>
            <div class="form-group">
              <label class="form-label" for="userType">Who are you? <span style="color: red">*</span></label>
              <select id="userType" class="form-select" required="">
                <option value="" disabled="" selected="">Select an option</option>
                <option value="Employer / HR">Employer / HR</option>
                <option value="Employee">Employee</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>

            <div class="form-group" id="companyNameGroup" style="display: none">
              <label class="form-label" for="companyName">Company Name <span style="color: red">*</span></label>
              <input type="text" id="companyName" class="form-input" placeholder="Your Company Name">
            </div>

            <div class="form-group" id="hiringQuestionGroup" style="display: none">
              <label class="form-label" for="hiringStatus">Hiring Status <span style="color: red">*</span></label>
              <select id="hiringStatus" class="form-select">
                <option value="" disabled="" selected="">Select status</option>
                <option value="Hiring Now">Hiring Now</option>
                <option value="Planning to Hire Within 3 Months">
                  Planning to Hire Within 3 Months
                </option>
                <option value="Not Hiring Yet">Not Hiring Yet</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="userPhone">Contact Number <span class="helper-text">(Optional)</span></label>
              <input type="tel" id="userPhone" class="form-input" placeholder="e.g. +60123456789">
            </div>
            <button type="submit" class="btn btn-primary">
              Submit &amp; Download
            </button>
          </form>
        </div>

        <div id="modalSuccessContent" style="display: none; padding: 20px 0">
          <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div id="modalFeedback">Thank you! Your report has been downloaded.</div>

          <div id="mobileActionButtons" style="
              display: none;
              margin-top: 20px;
              flex-direction: column;
              gap: 10px;
            ">
            <a id="viewFileBtn" href="#" target="_blank" class="btn btn-primary" style="
                width: 100%;
                text-align: center;
                text-decoration: none;
                display: inline-block;
              ">View File Now</a>
            <p style="
                font-size: 13px;
                color: #64748b;
                text-align: center;
                margin: 0;
              " id="mobileFallbackText">
              If the file didn't open automatically, click the button above.
            </p>
          </div>
        </div>
      </div>
    </div>"""

files_to_check = [
    "index.html",
    "hourly-rate.html",
    "overtime-pay-calculator.html",
    "socso-perkeso.html",
    "epf-kwsp.html",
    "pcb-income-tax.html",
    "annual-leave-calculator.html"
]

modal_regex = re.compile(r'<!-- (?:Lead|Email) Modal -->.*?<div id="emailModal".*?</div>\s*</div>\s*</div>', re.DOTALL)

for file in files_to_check:
    if os.path.exists(file):
        with open(file, "r") as f:
            content = f.read()
        
        new_content = modal_regex.sub(modal_html, content)
        if new_content != content:
            with open(file, "w") as f:
                f.write(new_content)
            print(f"Updated modal in {file}")
        else:
            print(f"Could not find or replace modal in {file}")
