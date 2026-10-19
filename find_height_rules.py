import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Find rules containing height, padding, or margin >= 50px or vh
matches = re.finditer(r'([^{}]*)\{([^{}]*)\}', css)
for m in matches:
    selector = m.group(1).strip()
    body = m.group(2).strip()
    if any(k in body for k in ["min-height", "height", "padding-top", "margin-top", "padding-bottom", "margin-bottom"]):
        # Check for numbers >= 50 or vh
        found_nums = re.findall(r'(\d+)\s*(px|vh|rem|%)', body)
        for num, unit in found_nums:
            if (unit in ["px", "rem"] and int(num) >= 50) or (unit in ["vh", "%"] and int(num) >= 20):
                print(f"Selector: {selector}\n  -> {body[:150]}\n")
                break

