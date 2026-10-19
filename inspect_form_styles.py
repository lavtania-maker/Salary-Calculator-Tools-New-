import re, glob

html_files = sorted(glob.glob("*.html"))

print("=== CHECKING INLINE STYLES ON FORM CONTROLS & BUTTONS ===")
for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    # Check input, select, button, table tags with inline styles
    controls = re.findall(r'<(?:input|select|button|table|th|td)\b[^>]*style="[^"]*"[^>]*>', html, re.I)
    print(f"[{fname}] {len(controls)} form/table elements with inline styles")
    for c in controls[:8]:
        print("  ", c[:130])

