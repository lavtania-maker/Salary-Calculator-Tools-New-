with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('switchToolTab')
pos_init = html.find('switchToolTab(', pos + 100)
while pos_init != -1:
    print("=== Found switchToolTab call at ===")
    print(html[pos_init-100:pos_init+200])
    pos_init = html.find('switchToolTab(', pos_init + 100)

