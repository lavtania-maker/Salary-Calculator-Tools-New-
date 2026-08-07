import re, glob

for fname in sorted(glob.glob("*.html")):
    with open(fname) as f:
        html = f.read()
    
    # Check for layout divs
    layouts = re.findall(r'<div[^>]*id=["\']layout[^"\']*["\'][^>]*>', html)
    print(f"=== {fname} ({len(html)} bytes) ===")
    if layouts:
        for l in layouts:
            print("  Layout:", l)
    
    # Check for section or div with inline style margin >= 40px or padding >= 40px
    large_styles = re.findall(r'style=["\'][^"\']*(?:margin|padding)[^"\']*(?:40|50|60|80|100)px[^"\']*["\']', html)
    if large_styles:
        print(f"  Large inline margin/padding ({len(large_styles)} found):")
        for s in large_styles[:5]:
            print("   ", s[:100])

