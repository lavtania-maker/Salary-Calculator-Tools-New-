import re

with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()

form_classes = ['.form-group', '.form-label', '.input-group', '.input-prefix', '.form-input', '.form-select', '.checkbox-item', '.radio-segments', '.radio-segment', '.btn', '.btn-primary', '.btn-outline']

blocks = re.findall(r'([^{}]*\{[^{}]*\})', css)

for b in blocks:
    sel = b.split('{')[0].strip()
    body = b.split('{')[1].strip().replace('\n', ' ')
    if any(fc in sel for fc in form_classes):
        print(f"SELECTOR: {sel}")
        print(f"  BODY: {body[:140]}")
        print("-" * 50)

