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
    
    labels = re.findall(r'<label class="form-label".*?</label>', content, flags=re.DOTALL)
    print(f"--- {file} ---")
    for label in labels:
        text = re.sub(r'<[^>]+>', '', label).strip()
        text = re.sub(r'\s+', ' ', text)
        print(text)

