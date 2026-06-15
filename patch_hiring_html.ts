import fs from "fs";
import path from "path";

const modalHTML = `
    <!-- Hiring Intent Modal -->
    <div class="modal-overlay" id="hiringIntentModal" style="display:none;">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Just one more thing...</h3>
          <button class="modal-close" id="closeHiringModal">&times;</button>
        </div>
        <div class="modal-body">
          <p style="margin-bottom: 20px; color: var(--text-muted);">To help us provide better insights, please let us know your current hiring plans.</p>
          <form id="hiringIntentForm">
            <div class="form-group">
              <label class="form-label" style="font-weight: 600; margin-bottom: 12px; display: block;">What is your current hiring status?</label>
              <div style="display: flex; flex-direction: column; gap: 12px;" id="hiringRadioGroup">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px; border: 1px solid var(--border); border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                  <input type="radio" name="hiring_status" value="Hiring Now" style="width: 18px; height: 18px;" />
                  <span style="font-weight: 500;">Hiring Now</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px; border: 1px solid var(--border); border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                  <input type="radio" name="hiring_status" value="Planning to Hire Within 3 Months" style="width: 18px; height: 18px;" />
                  <span style="font-weight: 500;">Planning to Hire Within 3 Months</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px; border: 1px solid var(--border); border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                  <input type="radio" name="hiring_status" value="Not Hiring Yet" style="width: 18px; height: 18px;" />
                  <span style="font-weight: 500;">Not Hiring Yet</span>
                </label>
              </div>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 24px;">
              <button type="submit" class="btn btn-primary" style="flex: 1;">Complete</button>
              <button type="button" id="skipHiringModal" class="btn btn-secondary" style="flex: 1; border: 1px solid var(--border); background: #f8fafc; color: var(--text-main);">Skip</button>
            </div>
          </form>
        </div>
      </div>
    </div>
`;

function injectModalHTML(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  if (content.includes('id="hiringIntentModal"')) {
    return false;
  }

  let newContent = content;

  // Inject before </body> or near the end. Let's find </body>
  if (newContent.includes("</body>")) {
    newContent = newContent.replace("</body>", `${modalHTML}\n  </body>`);
  } else {
    newContent += modalHTML;
  }

  fs.writeFileSync(filePath, newContent);
  console.log(`Injected modal to ${filePath}`);
  return true;
}

[
  "index.html",
  "pcb-income-tax.html",
  "epf-kwsp.html",
  "annual-leave-calculator.html",
].forEach((f) => injectModalHTML(f));
