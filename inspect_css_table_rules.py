with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()

table_selectors = ['.contribution-table', '.styled-table', '.seo-table', 'table', '.table-responsive', '.table-container', '.seo-table-wrapper']

for i, l in enumerate(lines):
    if any(ts in l for ts in table_selectors) and '{' in l and not l.strip().startswith('/*'):
        print(f"Line {i+1}: {l.strip()[:100]}")

