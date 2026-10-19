import re

with open("public/calculator-styles.css") as f:
    css = f.read()

card_selectors = [
    ".card", ".content-card", ".seo-card", ".calc-card", ".result-card",
    ".blog-card", ".stat-card", ".official-card", ".info-block", ".article-cta",
    ".wrapper", "#resultCard", "#socsoResultCard", "#hourlyResultCard",
    "#epfResultCard", "#leaveResultCard", "#otResultCard", ".results-container",
    ".results-card"
]

pattern = r'([^{}]*\{[^{}]*\})'
matches = re.findall(pattern, css)

for m in matches:
    sel_part = m.split('{')[0]
    body_part = m.split('{')[1]
    if any(cs in sel_part for cs in card_selectors):
        if any(attr in body_part for attr in ['border', 'box-shadow', 'background', 'border-radius']):
            clean_body = body_part.strip().replace('\n', ' ')
            print(f"SELECTOR: {sel_part.strip()}")
            print(f"BODY: {clean_body}")
            print("-" * 60)

