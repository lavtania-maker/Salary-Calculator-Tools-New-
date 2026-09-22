import re

with open('calculator-styles.css', 'r') as f:
    content = f.read()

# Replace wrapper CSS
old_wrapper = """.quick-salary-wrapper {
  margin-top: 12px;
  margin-bottom: 24px;
}"""

new_wrapper = """.quick-salary-wrapper {
  margin-top: 12px;
  margin-bottom: 24px;
  background-color: #f8fafc !important; /* very light slate/blue-gray */
  padding: 10px 12px !important;
  border-radius: 8px !important;
  border: 1px solid #f1f5f9 !important;
}"""

content = content.replace(old_wrapper, new_wrapper)

with open('calculator-styles.css', 'w') as f:
    f.write(content)

print("Wrapper CSS patched.")
