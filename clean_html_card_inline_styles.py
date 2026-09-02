import re, glob

html_files = sorted(glob.glob("*.html"))

# Classes that are card components
card_classes = [
    'other-calc-card', 'content-card', 'seo-card', 'calc-card', 'result-card',
    'blog-card', 'stat-card', 'official-card', 'card'
]

cleaned_count = 0

for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    original_html = html
    
    # Clean inline border/border-radius/background on card elements
    # Pattern to match elements with class="...card..." and style="..."
    def clean_style_attr(match):
        full_tag = match.group(0)
        style_content = match.group(1)
        
        # Split style properties
        props = [p.strip() for p in style_content.split(';') if p.strip()]
        new_props = []
        for p in props:
            key = p.split(':')[0].strip().lower()
            # Remove border, border-radius, box-shadow, and colored card background if it's on a card link or card container
            if key in ['border', 'border-radius', 'box-shadow', 'border-color']:
                continue
            if key == 'background' and any(c in p for c in ['#fffbeb', '#f0f9ff', '#f0fdf4', '#fef2f2', '#faf5ff', '#eff6ff', '#fde68a', '#bae6fd', '#bbf7d0', '#fecaca', '#e9d5ff']):
                continue
            new_props.append(p)
        
        if new_props:
            new_style = '; '.join(new_props)
            return full_tag.replace(style_content, new_style)
        else:
            # Remove style attribute if empty
            return re.sub(r'\s*style="[^"]*"', '', full_tag)

    # Replace inline styles on elements that have one of the card classes
    for cls in card_classes:
        pattern = re.compile(rf'(<[a-z0-9]+\b[^>]*class="[^"]*\b{cls}\b[^"]*"[^>]*style="([^"]*)")[^>]*>', re.I)
        html = re.sub(pattern, clean_style_attr, html)

    if html != original_html:
        with open(fname, "w") as f:
            f.write(html)
        print(f"Cleaned card inline styles in {fname}")
        cleaned_count += 1

print(f"\nTotal files updated: {cleaned_count}")

