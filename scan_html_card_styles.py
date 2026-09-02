import re, glob

html_files = sorted(glob.glob("*.html"))

for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    # Check any style="...border..." or style="...border-radius..."
    matches = re.finditer(r'<([a-z0-9]+)\b([^>]*style="[^"]*(?:border|box-shadow)[^"]*"[^>]*)>', html, re.I)
    print(f"=== {fname} ===")
    count = 0
    for m in matches:
        tag = m.group(1)
        attrs = m.group(2)
        print(f"  <{tag} {attrs[:120]}>")
        count += 1
    if count == 0:
        print("  No inline border/shadow styles found.")

