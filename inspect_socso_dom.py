import re

with open("socso-perkeso.html") as f:
    html = f.read()

pos1 = html.find('id="layoutSalary"')
pos2 = html.find('id="layoutSocso"')

snippet = html[pos1:pos2]
print(f"Length of snippet: {len(snippet)} bytes")

open_divs = len(re.findall(r'<div\b', snippet))
close_divs = snippet.count('</div>')
print(f"Open divs in snippet: {open_divs}, Close divs in snippet: {close_divs}")

# Find all direct children or top-level tags inside main
main_pos = html.find('<main class="container">')
print("main_pos:", main_pos)

