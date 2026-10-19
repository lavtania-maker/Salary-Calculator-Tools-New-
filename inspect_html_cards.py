import re, glob

html_files = glob.glob("*.html")
print("HTML Files found:", html_files)

for fname in sorted(html_files):
    with open(fname) as f:
        html = f.read()
    
    inline_borders = re.findall(r'style="[^"]*border[^"]*"', html)
    print(f"\n=== {fname}: {len(inline_borders)} inline border styles ===")
    for ib in inline_borders[:10]:
        print("  ", ib)

