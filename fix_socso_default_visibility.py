with open("socso-perkeso.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Hide layoutSalary, show layoutSocso
html = html.replace('<div class="main-layout" id="layoutSalary">', '<div class="main-layout" id="layoutSalary" style="display: none; opacity: 0; transition: opacity 0.3s ease">')
html = html.replace('<div class="main-layout" id="layoutSocso" style="display: none; opacity: 0; transition: opacity 0.3s ease">', '<div class="main-layout" id="layoutSocso">')

# 2. Hide salarySeoContent, show socsoSeoContent
html = html.replace('<section class="content-section" id="salarySeoContent">', '<section class="content-section" id="salarySeoContent" style="display: none;">')
html = html.replace('<section class="content-section" id="socsoSeoContent" style="display: none;">', '<section class="content-section" id="socsoSeoContent">')

# 3. Check blogGrid if present
html = html.replace('id="blogGridSalary"', 'id="blogGridSalary" style="display: none;"')
html = html.replace('id="blogGridSocso" style="display: none;"', 'id="blogGridSocso"')

with open("socso-perkeso.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated socso-perkeso.html default layout visibility!")
