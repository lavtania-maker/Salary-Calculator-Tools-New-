import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Form label
css = re.sub(r'\.form-label\s*\{[^}]*\}', 
             r'.form-label {\n  display: block;\n  font-size: 15px !important;\n  font-weight: 600 !important;\n  color: #1e293b;\n  margin-bottom: 8px !important;\n}', 
             css)
             
# Update other places where .form-label is set
css = re.sub(r'font-weight:\s*700\s*!important;\s*\}', r'font-weight: 600 !important; }', css)
css = css.replace("font-weight: 700;", "font-weight: 600;")

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
