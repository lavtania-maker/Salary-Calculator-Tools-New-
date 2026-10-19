with open("socso-perkeso.html") as f:
    html = f.read()

hero_pos = html.find('class="hero"')
socso_pos = html.find('id="layoutSocso"')

print("=== Content between hero and layoutSocso in socso-perkeso.html ===")
print(html[hero_pos:hero_pos+1500])

