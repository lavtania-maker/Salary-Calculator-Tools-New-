import re

for fname in ["index.html", "socso-perkeso.html"]:
    with open(fname) as f:
        html = f.read()
    
    print(f"=== {fname} RESULTS VISIBILITY ===")
    matches = re.findall(r'([^;\n]*(?:placeholder|resultsContent|resultCard)[^;\n]*)', html)
    for m in matches[:15]:
        print("  ", m.strip())

