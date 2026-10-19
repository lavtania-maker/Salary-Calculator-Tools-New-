import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Search for form controls, input, select, button, table rules in CSS
lines = css.splitlines()
control_keywords = ['input', 'select', 'button', '.btn', 'table', 'th', 'td', 'checkbox', 'radio', 'label', 'form-group', 'input-group']

for i, l in enumerate(lines):
    if any(k in l.lower() for k in control_keywords) and '{' in l and not l.strip().startswith('/*'):
        print(f"Line {i+1}: {l.strip()[:100]}")

