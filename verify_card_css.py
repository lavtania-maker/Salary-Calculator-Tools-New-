import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Let's check all occurrences of .card, .content-card, .seo-card, .result-card, .calc-card, .blog-card, .stat-card, .official-card, .other-calc-card
card_classes = ['.card', '.content-card', '.seo-card', '.calc-card', '.result-card', '.blog-card', '.stat-card', '.official-card', '.other-calc-card', '#resultCard', '#socsoResultCard', '#hourlyResultCard', '#epfResultCard', '#leaveResultCard', '#otResultCard']

# Find all blocks containing any of these card classes
blocks = re.findall(r'([^{}]*\{[^{}]*\})', css)

print("=== CHECKING ALL CARD CSS BLOCKS FOR OVERRIDES ===")
override_count = 0
for b in blocks:
    sel = b.split('{')[0].strip()
    body = b.split('{')[1].strip().replace('\n', ' ')
    if any(cls in sel for cls in card_classes):
        if any(prop in body for prop in ['border:', 'border-radius:', 'box-shadow:', 'background-color:', 'background:']):
            # Print if it has hardcoded non-var border or radius
            if any(hard in body for hard in ['#E2E8F0', '#bae6fd', '#bfdbfe', '#2563eb', '16px', '20px']):
                print(f"SELECTOR: {sel}\n  BODY: {body}\n")
                override_count += 1

print(f"Total potential hardcoded overrides found: {override_count}")

