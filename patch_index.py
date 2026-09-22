import re

with open('index.html', 'r') as f:
    content = f.read()

html_to_insert = """
              <div class="quick-salary-wrapper">
                <div class="quick-salary-header">
                  <span class="quick-salary-title">
                    ⚡ Quick Salary
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted)">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </span>
                  <span class="quick-salary-hint">Select a common amount</span>
                </div>
                <div class="quick-salary-buttons" id="quickSalaryButtons">
                  <button type="button" class="btn-quick-salary" data-val="2000">RM 2,000</button>
                  <button type="button" class="btn-quick-salary" data-val="2500">RM 2,500</button>
                  <button type="button" class="btn-quick-salary" data-val="3000">RM 3,000</button>
                  <button type="button" class="btn-quick-salary" data-val="3500">RM 3,500</button>
                  <button type="button" class="btn-quick-salary" data-val="4000">RM 4,000</button>
                  <button type="button" class="btn-quick-salary" data-val="5000">RM 5,000</button>
                </div>
              </div>
"""

# Find the end of the input-group for grossSalary and inject right before the end of form-group
search_pattern = r'(<input type="number" id="grossSalary" name="grossSalary" class="form-input" placeholder="0" required="" inputmode="decimal">\s*</div>)'

if re.search(search_pattern, content):
    content = re.sub(search_pattern, r'\1' + '\n' + html_to_insert, content)
else:
    print("Pattern not found!")

# Add a script tag just before </body> to handle click events.
script_to_insert = """
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const quickButtons = document.querySelectorAll(".btn-quick-salary");
    const grossSalaryInput = document.getElementById("grossSalary");
    
    if (quickButtons.length > 0 && grossSalaryInput) {
      quickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const val = btn.getAttribute("data-val");
          if (val) {
            grossSalaryInput.value = val;
            updateActiveQuickButton();
            // Optional: trigger input event in case other listeners need it
            grossSalaryInput.dispatchEvent(new Event('input'));
          }
        });
      });

      grossSalaryInput.addEventListener("input", updateActiveQuickButton);

      function updateActiveQuickButton() {
        const currentVal = grossSalaryInput.value;
        quickButtons.forEach(btn => {
          if (btn.getAttribute("data-val") === currentVal) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
    }
  });
</script>
</body>
"""

content = content.replace("</body>", script_to_insert)

with open('index.html', 'w') as f:
    f.write(content)

print("Patch index.html applied.")
