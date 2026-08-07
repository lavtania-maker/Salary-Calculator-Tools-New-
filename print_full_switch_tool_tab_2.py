with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('function switchToolTab(')
print(html[pos+3000:pos+7000])

