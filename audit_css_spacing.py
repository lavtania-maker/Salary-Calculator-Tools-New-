import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Let us find any rule with high values (>= 32px or 2rem or 100vh or 100%)
lines = css.splitlines()
for i, line in enumerate(lines):
    if any(k in line for k in ["margin", "padding", "gap", "height"]):
        # Check for numbers >= 32
        matches = re.findall(r'(\d+)\s*px', line)
        nums = [int(m) for m in matches if int(m) >= 32]
        if nums or "100vh" in line or "100%" in line:
            print(f"Line {i+1}: {line.strip()}")
