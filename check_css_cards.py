import re

with open("public/calculator-styles.css") as f:
    css = f.read()

keywords = ["placeholder", "resultCard", "main-layout", "calculator-area", "content-section", "content-card", "seo-card"]

for kw in keywords:
    print(f"=== CSS rules for {kw} ===")
    matches = re.findall(rf'([^{{}}]*{kw}[^{{}}]*\{{[^}}]*\}})', css, re.DOTALL)
    for m in matches[:10]:
        print(m.strip()[:200])
        print("---")
