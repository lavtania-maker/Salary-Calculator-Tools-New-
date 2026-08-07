import re

with open("index.html") as f:
    html = f.read()

start_pos = html.find('id="layoutSalary"')
if start_pos != -1:
    print(html[start_pos:start_pos+3000])
