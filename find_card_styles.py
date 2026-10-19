import re, glob

# Check CSS
with open("public/calculator-styles.css") as f:
    css = f.read()

print("=== CSS CARD STYLES ===")
card_classes = [".card", ".content-card", ".seo-card", ".calc-card", ".result-card", ".blog-card", ".stat-card", "#resultCard", "#socsoResultCard", "#hourlyResultCard", "#epfResultCard", "#leaveResultCard", "#otResultCard"]

for cls in card_classes:
    matches = re.finditer(rf'([^{{}}]*{re.escape(cls)}[^{{}}]*\{{[^}}]*\}})', css)
    for m in matches:
        print(m.group(0).strip().replace("\n", " "))

