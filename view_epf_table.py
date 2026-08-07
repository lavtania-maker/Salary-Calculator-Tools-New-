with open("epf-kwsp.html") as f:
    html = f.read()

pos = html.find('tableMonthlyEmp')
if pos != -1:
    print("=== EPF Table in epf-kwsp.html ===")
    print(html[pos-300:pos+800])

