import os
import json
import re

# 1. Update locales
for f in ['locales/en.json', 'locales/ms.json']:
    with open(f, 'r') as file:
        data = json.load(file)

    is_ms = (f == 'locales/ms.json')

    html = """
              <label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span style="color: red">*</span></label>
              <div class="input-group">
                <span class="input-prefix">+60</span>
                <input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789" required>
              </div>
            """
    
    if "contact_number_optional_905fa0" in data:
        data["contact_number_optional_905fa0"] = html
    if "contact_number_optional_5c564a" in data:
        data["contact_number_optional_5c564a"] = html
        
    if "contact_number_optional_869f92" in data:
        data["contact_number_optional_869f92"] = 'Contact Number <span style="color: red">*</span>'
        
    with open(f, 'w') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
        file.write("\n")

# 2. Update HTML files
html_files = [
    'index.html', 'epf-kwsp.html', 'pcb-income-tax.html', 'socso-perkeso.html', 
    'hourly-rate.html', 'overtime-pay-calculator.html', 'annual-leave-calculator.html'
]

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace label
    content = content.replace(
        '<label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span class="helper-text">(Optional)</span></label>',
        '<label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span style="color: red">*</span></label>'
    )
    # Just in case BM is in there directly
    content = content.replace(
        '<label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span class="helper-text">(Pilihan)</span></label>',
        '<label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span style="color: red">*</span></label>'
    )
    
    # Replace input
    content = content.replace(
        '<input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789">',
        '<input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789" required>'
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Patch applied.")
