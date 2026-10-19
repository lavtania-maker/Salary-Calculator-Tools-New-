import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# The `.card { padding: 32px !important; }` might be causing issues. Let's remove it.
css = re.sub(r'\.card\s*\{\s*padding:\s*32px\s*!important;\s*\}', '', css)

# Revert button flex in .form-actions
css = re.sub(r'\.form-actions \.btn\s*\{\s*flex:\s*1\s*!important;\s*\}', '', css)

# Remove the custom .statutory-grid and .checkbox-item css I added entirely at the end
css = re.sub(r'/\* Fix Checkboxes \*/.*?border-radius: 8px !important;\n\}', '', css, flags=re.DOTALL)

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
