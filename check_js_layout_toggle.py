import re

for fname in ["index.html", "socso-perkeso.html"]:
    with open(fname) as f:
        html = f.read()
    
    print(f"=== {fname} JS LAYOUT TOGGLE CODE ===")
    matches = re.findall(r'([^;\n]*layoutSalary[^;\n]*)', html)
    for m in matches[:10]:
        print(" ", m.strip())

