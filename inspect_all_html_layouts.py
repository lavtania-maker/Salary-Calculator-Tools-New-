import re

files = ["index.html", "socso-perkeso.html", "epf-kwsp.html", "pcb-income-tax.html", "annual-leave-calculator.html", "overtime-pay-calculator.html", "hourly-rate.html"]

for fname in files:
    try:
        with open(fname) as f:
            html = f.read()
        print(f"=== {fname} ===")
        matches = [m.group(0) for m in re.finditer(r'<div[^>]*id=["\']layout[^"\']*["\'][^>]*>', html)]
        for match in matches:
            print(" ", match)
    except Exception as e:
        print(fname, e)
