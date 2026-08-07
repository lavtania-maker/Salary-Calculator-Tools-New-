import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Find rules for explore-more-section, content-section, hero, calculator-area, page-container
selectors = [
    ".explore-more-section",
    ".content-section",
    ".hero",
    ".calculator-area",
    ".page-container",
    ".main-layout",
    "body",
    ".site-footer",
    ".navbar"
]

for sel in selectors:
    print(f"=== Rules for {sel} ===")
    matches = re.findall(rf'([^{{}}]*{re.escape(sel)}[^{{}}]*\{{[^}}]*\}})', css)
    for m in matches:
        print(" ", m.strip().replace("\n", " ")[:150])
