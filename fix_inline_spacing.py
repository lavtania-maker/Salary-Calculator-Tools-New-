import glob, re

html_files = glob.glob("*.html")

replacements = [
    (r'style=["\']([^"\']*)margin-top:\s*(?:32|40|50|60)px;\s*margin-bottom:\s*(?:32|40|50|60)px;?([^"\']*)["\']', r'style="\1margin-top: 16px; margin-bottom: 20px;\2"'),
    (r'style=["\']([^"\']*)margin-bottom:\s*(?:32|40|50|60)px;?([^"\']*)["\']', r'style="\1margin-bottom: 20px;\2"'),
    (r'style=["\']([^"\']*)margin-top:\s*(?:32|40|50|60)px;?([^"\']*)["\']', r'style="\1margin-top: 16px;\2"'),
    (r'style=["\']([^"\']*)padding:\s*60px\s+0;?([^"\']*)["\']', r'style="\1padding: 24px 0;\2"'),
    (r'style=["\']([^"\']*)padding:\s*40px\s+20px;?([^"\']*)["\']', r'style="\1padding: 20px 16px;\2"'),
    (r'style=["\']([^"\']*)margin:\s*(?:40|50|60)px\s+auto;?([^"\']*)["\']', r'style="\1margin: 20px auto;\2"'),
    (r'style=["\']([^"\']*)gap:\s*(?:32|40|50)px;?([^"\']*)["\']', r'style="\1gap: 16px;\2"'),
]

for fname in html_files:
    with open(fname, "r", encoding="utf-8") as f:
        content = f.read()
    
    orig = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    
    if content != orig:
        with open(fname, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Cleaned inline spacing in {fname}")

