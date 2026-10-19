import re, glob

html_files = sorted(glob.glob("*.html"))

print("=== CHECKING TABLE CLASSES AND STYLES ===")
for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    tables = re.findall(r'<table\b[^>]*>', html, re.I)
    if tables:
        print(f"[{fname}] {len(tables)} tables:")
        for t in tables:
            print("  ", t)

