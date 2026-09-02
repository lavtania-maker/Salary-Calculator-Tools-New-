import re

for fname in ["index.html", "socso-perkeso.html"]:
    with open(fname) as f:
        html = f.read()
    
    print(f"=== {fname} STRUCTURE ===")
    hero_pos = html.find('class="hero"')
    calc_pos = html.find('class="calculator-area"')
    print("hero_pos:", hero_pos, "calc_pos:", calc_pos)
    if hero_pos != -1:
        print("Hero section snippet:")
        print(html[hero_pos:hero_pos+1000])

