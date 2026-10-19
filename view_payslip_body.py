with open("payslip.html") as f:
    html = f.read()

pos = html.find('<body>')
if pos != -1:
    print(html[pos:pos+2000])

