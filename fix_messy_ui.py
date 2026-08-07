import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Fix input group radius
css += "\n.input-group .form-input, .input-group input { border-radius: 0 !important; }\n"

# Fix input group prefix height
css += ".input-prefix { border-radius: 8px 0 0 8px !important; }\n"

# Reset buttons to balanced
css = re.sub(r'\.form-actions \.btn-outline\s*\{\s*flex:\s*1\s*!important;\s*\}', '.form-actions .btn-outline { flex: 0.4 !important; }', css)

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
