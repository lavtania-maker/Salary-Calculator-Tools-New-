import re, glob

html_files = sorted(glob.glob("*.html"))

for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    # Check table, th, td tags with inline style
    matches = re.finditer(r'<(table|th|td)\b([^>]*style="[^"]*"[^>]*)>', html, re.I)
    m_list = list(matches)
    if m_list:
        print(f"=== {fname}: {len(m_list)} table/cell inline styles ===")
        for m in m_list[:10]:
            print(f"  <{m.group(1)} {m.group(2)[:100]}>")

