import re, glob

html_files = sorted(glob.glob("*.html"))
all_card_classes = set()

for fname in html_files:
    with open(fname) as f:
        html = f.read()
    
    classes = re.findall(r'class="([^"]+)"', html)
    for c in classes:
        for cls in c.split():
            if any(k in cls.lower() for k in ['card', 'box', 'panel', 'cta', 'block']):
                all_card_classes.add(cls)

print("All card-related classes found across HTML files:")
for c in sorted(all_card_classes):
    print(" -", c)

