with open("index.html") as f:
    html = f.read()

pos = html.find('id="resultCard"')
print("=== #resultCard HTML ===")
print(html[pos-100:pos+3000])

