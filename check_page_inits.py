import re

for fname in ["index.html", "socso-perkeso.html", "epf-kwsp.html", "pcb-income-tax.html"]:
    with open(fname) as f:
        html = f.read()
    
    print(f"=== {fname} INIT LOGIC ===")
    pos = html.find('Initial Routing Logic')
    if pos != -1:
        print(html[pos:pos+300])

