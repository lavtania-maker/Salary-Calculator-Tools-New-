import re

with open('hourly-rate.html', 'r') as f:
    content = f.read()

search = 'const phoneValue = userPhoneInput ? userPhoneInput.value.trim() : "";'
replacement = """let phoneValue = userPhoneInput ? userPhoneInput.value.trim() : "";
        if (phoneValue) {
          phoneValue = phoneValue.replace(/\\D/g, '').replace(/^(60|0)/, '');
          phoneValue = '+60' + phoneValue;
        }"""
        
content = content.replace(search, replacement)

with open('hourly-rate.html', 'w') as f:
    f.write(content)
