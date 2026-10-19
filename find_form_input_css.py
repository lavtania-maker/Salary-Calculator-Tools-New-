with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()
for i, l in enumerate(lines):
    if '.form-input' in l or '.form-select' in l or '.btn' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")

