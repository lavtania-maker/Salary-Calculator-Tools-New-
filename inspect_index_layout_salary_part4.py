with open("index.html") as f:
    html = f.read()

start_pos = html.find('id="layoutSalary"')
if start_pos != -1:
    print(html[start_pos+6000:start_pos+9000])
