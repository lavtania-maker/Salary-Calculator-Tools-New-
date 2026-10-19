import re, glob

html_files = sorted(glob.glob("*.html"))

updated_files = []

for fname in html_files:
    if fname in ['payslip.html']: # Skip payslip line inputs as they are specifically styled for print template
        continue

    with open(fname) as f:
        html = f.read()
    
    orig = html
    
    # Clean inline background/border on buttons
    # e.g., <button ... style="font-size: 1.05rem"> or <button ... style="flex: 1;">
    # We keep flex layout if needed or move to CSS
    
    # Remove hardcoded font-size or width on btn if btn class is present
    def clean_btn_style(m):
        full = m.group(0)
        style = m.group(1)
        props = [p.strip() for p in style.split(';') if p.strip()]
        new_props = []
        for p in props:
            k = p.split(':')[0].strip().lower()
            if k in ['font-size', 'font-family', 'border-radius', 'height']:
                continue
            new_props.append(p)
        if new_props:
            return full.replace(style, '; '.join(new_props))
        else:
            return re.sub(r'\s*style="[^"]*"', '', full)

    html = re.sub(r'<button\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*style="([^"]*)"[^>]*>', clean_btn_style, html)

    # Clean inline radio & checkbox styles (width: 20px; height: 20px; etc)
    html = re.sub(r'(<input\b[^>]*type="(?:radio|checkbox)"[^>]*)\s*style="[^"]*"([^>]*>)', r'\1\2', html)

    if html != orig:
        with open(fname, "w") as f:
            f.write(html)
        updated_files.append(fname)

print("Updated files:", updated_files)

