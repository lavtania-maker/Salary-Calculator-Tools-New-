import re

with open("index.html") as f:
    index_html = f.read()

with open("public/calculator-styles.css") as f:
    css = f.read()

print("=== Inline style of #placeholder and #resultCard in index.html ===")
for id_name in ["placeholder", "resultCard", "socsoPlaceholder", "socsoResultCard", "layoutSalary", "layoutSocso"]:
    m = re.search(r'id=["\']' + id_name + r'["\'][^>]*', index_html)
    if m:
        print(f"  #{id_name}: {m.group(0)}")

print("\n=== CSS rules for #placeholder, #resultCard, .card, .main-layout ===")
for selector in ["#placeholder", "#resultCard", "#socsoPlaceholder", "#socsoResultCard", ".card", ".main-layout", ".result-panel"]:
    matches = re.findall(rf'([^{{}}]*{re.escape(selector)}[^{{}}]*\{{[^}}]*\}})', css)
    for m in matches[:5]:
        print("  ", m.strip().replace("\n", " "))
