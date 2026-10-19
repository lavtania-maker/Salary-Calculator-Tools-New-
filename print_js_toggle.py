import re

with open("socso-perkeso.html") as f:
    html = f.read()

pos = html.find('const layoutSalary = document.getElementById("layoutSalary");')
print("=== JS snippet around layoutSalary in socso-perkeso.html ===")
print(html[pos-300:pos+1500])

