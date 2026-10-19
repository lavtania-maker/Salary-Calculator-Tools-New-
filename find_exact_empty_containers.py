import re, glob

for fname in sorted(glob.glob("*.html")):
    with open(fname) as f:
        html = f.read()
    
    # Search for empty div/section/main tags that have style or class
    matches = re.finditer(r'<(div|section|main)[^>]*>\s*</\1>', html)
    for m in matches:
        tag = m.group(0)
        if any(k in tag for k in ["margin", "padding", "height", "gap", "style"]):
            # Get line number
            line_no = html[:m.start()].count("\n") + 1
            print(f"{fname}:{line_no}: {tag[:120]}")
