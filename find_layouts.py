import re

for fname in ["index.html", "socso-perkeso.html", "epf-kwsp.html", "pcb-income-tax.html", "annual-leave-calculator.html", "overtime-pay-calculator.html", "hourly-rate.html"]:
    try:
        with open(fname) as f:
            html = f.read()
        matches = re.findall(r'id=["\'](layout[^"\']*)["\']', html)
        print(fname, matches)
    except Exception as e:
        print(fname, e)
