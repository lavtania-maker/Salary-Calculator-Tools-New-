import re

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

    # Remove *Required in <p> or <div> tags
    content = re.sub(r'<p\s+style="[^"]*">\*Required</p>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<div\s+style="[^"]*">\*Required</div>', '', content, flags=re.IGNORECASE)

    with open(file, 'w') as f:
        f.write(content)

