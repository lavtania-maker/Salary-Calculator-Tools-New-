import re

with open("socso-perkeso.html") as f:
    html = f.read()

# Let's inspect everything between hero and layoutSocso in socso-perkeso.html
pos_hero_end = html.find('</section>', html.find('class="hero"'))
pos_socso = html.find('id="layoutSocso"')

between = html[pos_hero_end:pos_socso]

print("Length of content between hero end and layoutSocso:", len(between))

# Find any elements in 'between' that do NOT have display: none or are outside layoutSalary
# Let's check if layoutSalary is the only thing between hero end and layoutSocso
print("First 500 chars of between:")
print(between[:500])

print("Last 500 chars of between:")
print(between[-500:])

