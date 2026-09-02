with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()
for i, l in enumerate(lines):
    if any(k in l for k in ['border:', 'border-radius:', 'box-shadow:']) and not l.strip().startswith('/*'):
        print(f"Line {i+1}: {l.strip()}")

