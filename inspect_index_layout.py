with open("index.html") as f:
    html = f.read()

import re

# Find top header, navbar, hero, calculator-area
pos_nav = html.find('<header')
if pos_nav == -1: pos_nav = html.find('class="navbar"')
pos_hero = html.find('class="hero"')
pos_calc = html.find('class="calculator-area"')

print("Navbar position:", pos_nav)
print("Hero position:", pos_hero)
print("Calculator area position:", pos_calc)

# Let's inspect the hero section html
if pos_hero != -1:
    print("\n=== HERO SECTION HTML ===")
    print(html[pos_hero:pos_hero+1000])

# Let's inspect the calculator area html
if pos_calc != -1:
    print("\n=== CALCULATOR AREA HTML ===")
    print(html[pos_calc:pos_calc+1200])

