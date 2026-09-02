import re

with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()
card_pattern = re.compile(r'card|result|panel|calc|box|wrapper|info-block|stat|article-cta', re.IGNORECASE)

matches = []
for i, line in enumerate(lines):
    if any(cls in line for cls in ['.card', '.content-card', '.seo-card', '.calc-card', '.result-card', '.blog-card', '.stat-card', '.official-card', '.info-block', '.article-cta', '#resultCard', '#socsoResultCard', '.results-container']):
        matches.append((i+1, line.strip()))

print(f"Total card selector lines found in CSS: {len(matches)}")
for line_num, text in matches:
    print(f"Line {line_num}: {text[:100]}")

