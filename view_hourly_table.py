with open("hourly-rate.html") as f:
    html = f.read()

pos = html.find('<table')
if pos != -1:
    print("=== Table in hourly-rate.html ===")
    print(html[pos:pos+1000])

