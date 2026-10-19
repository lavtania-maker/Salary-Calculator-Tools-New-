import re

with open("index.html") as f:
    html = f.read()

# Find placeholder div
p_match = re.search(r'<div id="placeholder"[^>]*>(.*?)</div>\s*<!--', html, re.DOTALL)
if p_match:
    print("=== INDEX.HTML PLACEHOLDER ===")
    print(p_match.group(1)[:1000])

r_match = re.search(r'<div id="resultCard"[^>]*>(.*?)</div>\s*<!--', html, re.DOTALL)
if r_match:
    print("=== INDEX.HTML RESULT CARD ===")
    print(r_match.group(1)[:500])
