with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('id="layoutSocso"')
print(html[pos-100:pos+1200])

