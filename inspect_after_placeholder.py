with open("index.html") as f:
    html = f.read()

pos = html.find('id="placeholder"')
print(html[pos+1000:pos+3500])

