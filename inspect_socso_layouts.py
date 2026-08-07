import re

with open("socso-perkeso.html") as f:
    html = f.read()

matches = [(m.start(), m.group(0)) for m in re.finditer(r'<div[^>]*class=["\']main-layout["\'][^>]*>', html)]
for pos, match in matches:
    print(pos, match)
