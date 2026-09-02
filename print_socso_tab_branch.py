with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('tool === "socso"')
if pos != -1:
    print(html[pos-100:pos+1500])
else:
    pos2 = html.find('else if (tool === "socso")')
    print(html[pos2-100:pos2+1500])

