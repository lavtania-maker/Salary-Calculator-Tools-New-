for fname in ["epf-kwsp.html", "pcb-income-tax.html"]:
    with open(fname) as f:
        html = f.read()
    print(f"=== {fname} snippet around script end ===")
    pos = html.rfind('</script>')
    print(html[pos-500:pos])

