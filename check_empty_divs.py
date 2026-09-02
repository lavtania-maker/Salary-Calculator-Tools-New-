import re, glob

for fname in sorted(glob.glob("*.html")):
    with open(fname) as f:
        html = f.read()
    
    # Check for ad-slot or empty container divs
    matches = re.findall(r'<div[^>]*class=["\'][^"\']*ad-slot[^"\']*["\'][^>]*>(.*?)</div>', html, re.DOTALL)
    for m in matches:
        if m.strip() == "":
            print(f"{fname}: ad-slot with whitespace found!")
            
    # Check for empty sections or containers
    empty_containers = re.findall(r'<(div|section|main)[^>]*style=["\'][^"\']*margin[^"\']*["\'][^>]*>\s*</\1>', html)
    if empty_containers:
        print(f"{fname}: empty container with margin found!")

