import re

for fname in ["index.html", "socso-perkeso.html"]:
    with open(fname) as f:
        html = f.read()
    print(f"=== {fname} inline styles with height/min-height/margin/padding/flex/grid ===")
    styles = re.findall(r'style=["\']([^"\']*)["\']', html)
    for s in set(styles):
        if any(k in s for k in ["height", "margin", "padding", "gap", "justify", "flex"]):
            print(f"  {s}")
