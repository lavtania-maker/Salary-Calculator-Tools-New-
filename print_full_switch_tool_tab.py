with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('function switchToolTab(')
print(html[pos:pos+3500])

