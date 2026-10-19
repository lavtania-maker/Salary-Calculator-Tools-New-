import re

with open("public/calculator-styles.css") as f:
    css = f.read()

print("=== SEARCHING FOR !important CONFLICTS IN CSS ===")

# Search for main-layout rules
matches = re.finditer(r'(\.main-layout[^{}]*)\{([^{}]*)\}', css)
for m in matches:
    print("MAIN-LAYOUT:", m.group(1).strip())
    print(" ", m.group(2).strip().replace('\n', ' '))
    print()

# Search for hero rules
matches = re.finditer(r'(\.hero[^{}]*)\{([^{}]*)\}', css)
for m in matches:
    print("HERO:", m.group(1).strip())
    print(" ", m.group(2).strip().replace('\n', ' '))
    print()

