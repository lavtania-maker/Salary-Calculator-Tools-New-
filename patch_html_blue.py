import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace the title span yellow svg to blue svg
old_svg = """<svg width="14" height="14" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">"""
new_svg = """<svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">"""

content = content.replace(old_svg, new_svg)

with open('index.html', 'w') as f:
    f.write(content)

print("HTML patched to blue.")
