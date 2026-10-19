import re

for fname in ["index.html", "socso-perkeso.html", "epf-kwsp.html", "pcb-income-tax.html", "annual-leave-calculator.html", "overtime-pay-calculator.html", "hourly-rate.html"]:
    try:
        with open(fname) as f:
            lines = f.readlines()
        print(f"=== Checking {fname} ===")
        for i, line in enumerate(lines):
            if any(k in line for k in ["100px", "80px", "60px", "100vh", "min-height", "gap", "margin", "padding"]):
                # print lines with large values or min-height/padding/margin
                if any(v in line for v in ["100px", "80px", "60px", "100vh", "margin-bottom: 40", "margin-bottom: 32", "margin-top: 40", "margin-top: 60", "padding: 40", "padding: 60", "min-height"]):
                    print(f"Line {i+1}: {line.strip()[:120]}")
    except Exception as e:
        pass
