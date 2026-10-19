import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Remove everything after /* --- PREMIUM UI UPDATES --- */
idx = css.find("/* --- PREMIUM UI UPDATES --- */")
if idx != -1:
    css = css[:idx].strip()

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
