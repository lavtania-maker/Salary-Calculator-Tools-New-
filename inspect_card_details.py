import re, glob

html_files = sorted(glob.glob("*.html"))

card_class_list = [
    'blog-card', 'card', 'content-card', 'cta-box', 'doc-card', 'example-box',
    'featured-card', 'highlight-box', 'login-card', 'other-calc-card', 'pcb-calc-box',
    'result-panel', 'seo-card', 'seo-formula-box', 'seo-highlight-box', 'seo-info-box',
    'sidebar-card', 'stat-card', 'table-card', 'take-home-card', 'toc-box', 'official-card',
    'article-cta', 'info-block'
]

print("=== CHECKING INLINE STYLES ON CARD ELEMENTS IN HTML ===")
for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    for cls in card_class_list:
        matches = re.findall(rf'<[a-z0-9]+\b[^>]*class="[^"]*\b{cls}\b[^"]*"[^>]*>', html, re.I)
        for m in matches:
            if 'style=' in m and any(attr in m for attr in ['border', 'background', 'border-radius', 'box-shadow']):
                print(f"[{fname}] {m[:140]}")

