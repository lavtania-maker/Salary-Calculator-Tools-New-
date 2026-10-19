import os
import json
import re

# 1. Update locales
def update_locales():
    for f in ['locales/en.json', 'locales/ms.json']:
        with open(f, 'r') as file:
            data = json.load(file)
        
        is_ms = (f == 'locales/ms.json')
        opt_text = "(Pilihan)" if is_ms else "(Optional)"

        html = f"""
              <label class="form-label" for="userPhone" data-i18n="contact_number_optional_869f92">Contact Number <span class="helper-text">{opt_text}</span></label>
              <div class="input-group">
                <span class="input-prefix">+60</span>
                <input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789">
              </div>
            """
        
        if "contact_number_optional_905fa0" in data:
            data["contact_number_optional_905fa0"] = html
        if "contact_number_optional_5c564a" in data:
            data["contact_number_optional_5c564a"] = html
            
        with open(f, 'w') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
            file.write("\n")

update_locales()

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
    
    # We want to replace:
    # <input type="tel" id="userPhone" class="form-input" placeholder="e.g. +60123456789">
    # or similar
    
    content = re.sub(
        r'<input type="tel" id="userPhone" class="form-input" placeholder=".*?">',
        r'<div class="input-group">\n                <span class="input-prefix">+60</span>\n                <input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789">\n              </div>',
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

# 3. Update TS files
ts_files = [
    'src/salary-calculator.ts',
    'src/epf-kwsp.ts',
    'src/pcb-calculator.ts',
    'src/socso-calculator.ts',
    'src/overtime-calculator.ts',
    'src/annual-leave-calculator.ts'
]

ts_pattern = r'const phone = userPhone \? userPhone\.value(?:\.trim\(\))? : "";'
ts_replacement = """let phone = userPhone ? userPhone.value.trim() : "";
      if (phone) {
        phone = phone.replace(/\\D/g, '').replace(/^(60|0)/, '');
        phone = '+60' + phone;
      }"""

for filepath in ts_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = re.sub(ts_pattern, ts_replacement, content)
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Patch applied.")
