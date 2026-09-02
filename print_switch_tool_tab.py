with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('function switchToolTab(')
print("=== switchToolTab in socso-perkeso.html ===")
print(html[pos:pos+2000])

