with open("socso-perkeso.html") as f:
    html = f.read()

pos1 = html.find('id="layoutSalary"')
pos2 = html.find('id="layoutSocso"')

print("layoutSalary pos:", pos1)
print("layoutSocso pos:", pos2)

