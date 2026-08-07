import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Add safe checkbox styling
css += """
.statutory-grid {
  gap: 16px !important;
}
.statutory-grid .checkbox-item {
  min-height: 48px !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  padding: 12px 16px !important;
  justify-content: center !important;
  border-radius: 8px !important;
}
"""

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
