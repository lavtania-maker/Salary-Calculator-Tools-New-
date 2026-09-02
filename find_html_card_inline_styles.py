import re, glob

html_files = sorted(glob.glob("*.html"))

for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    # Find tags with card in class and style attribute
    card_tags = re.findall(r'<[a-z0-9]+\b[^>]*class="[^"]*(?:card|result-panel|info-block)[^"]*"[^>]*>', html, re.I)
    inline_card_tags = [t for t in card_tags if 'style=' in t]
    
    print(f"=== {fname}: {len(inline_card_tags)} cards with inline style attribute ===")
    for t in inline_card_tags[:15]:
        print("  ", t[:120])

