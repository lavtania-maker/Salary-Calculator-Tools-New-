with open("socso-perkeso.html") as f:
    html = f.read()

pos2 = html.find('id="layoutSocso"')
print(html[pos2-50:pos2+300])
