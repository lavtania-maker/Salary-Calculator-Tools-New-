import re

with open("socso-perkeso.html") as f:
    html = f.read()

matches = [m.start() for m in re.finditer(r'tool\s*===\s*["\']', html)]
for pos in matches:
    print("=== Found tool === at ===")
    print(html[pos-50:pos+300])

