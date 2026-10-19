import re
import os

files = [
    "index.html",
    "socso-perkeso.html",
    "pcb-income-tax.html",
    "epf-kwsp.html",
    "annual-leave-calculator.html",
    "overtime-pay-calculator.html",
    "hourly-rate.html"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Pattern for <p style="..."> (Optional) </p>
    content = re.sub(r'<p[^>]*>\s*\(Optional\)\s*</p>', '', content, flags=re.IGNORECASE)
    
    with open(file, 'w') as f:
        f.write(content)

