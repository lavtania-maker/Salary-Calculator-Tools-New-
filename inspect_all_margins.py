import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Search for any selectors with margin-top, margin-bottom, padding-top, padding-bottom, gap, min-height
lines = css.splitlines()
for i, line in enumerate(lines):
    if any(k in line for k in ["margin", "padding", "gap", "height", "flex"]) and "!" in line:
        if any(c in line for c in ["vh", "rem", "px", "%"]):
            print(f"Line {i+1}: {line.strip()}")

