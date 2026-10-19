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
    
    # We want to replace using replace, since regex substitution is failing with escaped replacements
    search_str = '<input type="tel" id="userPhone" class="form-input" placeholder="e.g. +60123456789">'
    search_str2 = '<input type="tel" id="userPhone" class="form-input" placeholder="+60123456789">'
    replace_str = '<div class="input-group">\n                <span class="input-prefix">+60</span>\n                <input type="tel" id="userPhone" class="form-input" placeholder="12 345 6789">\n              </div>'
    
    if search_str in content:
        content = content.replace(search_str, replace_str)
    if search_str2 in content:
        content = content.replace(search_str2, replace_str)
    
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

ts_pattern = 'const phone = userPhone ? userPhone.value.trim() : "";'
ts_pattern2 = 'const phone = userPhone ? userPhone.value : "";'

ts_replacement = """let phone = userPhone ? userPhone.value.trim() : "";
      if (phone) {
        phone = phone.replace(/\\D/g, '').replace(/^(60|0)/, '');
        phone = '+60' + phone;
      }"""

ts_replacement2 = """let phone = userPhone ? userPhone.value : "";
      if (phone) {
        phone = phone.replace(/\\D/g, '').replace(/^(60|0)/, '');
        phone = '+60' + phone;
      }"""

for filepath in ts_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    if ts_pattern in content:
        content = content.replace(ts_pattern, ts_replacement)
    if ts_pattern2 in content:
        content = content.replace(ts_pattern2, ts_replacement2)
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Patch applied.")
