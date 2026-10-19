import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Replace the problematic .card-title rule
css = re.sub(
    r'\.card-title, \.result-panel h2, \.form-header h2\s*\{[^}]*\}',
    r'.form-section-title { font-size: 28px !important; font-weight: 700 !important; color: #1e293b !important; margin-bottom: 24px !important; letter-spacing: -0.01em !important; }\n.card-title { font-size: 28px !important; margin-bottom: 24px !important; letter-spacing: -0.01em !important; }',
    css,
    flags=re.DOTALL
)

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
