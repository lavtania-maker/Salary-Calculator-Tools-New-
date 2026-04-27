"""
Build a dedicated socso-perkeso/index.html from the main index.html.
The SOCSO layout (lines 1975-6185) is extracted and made visible by default,
so the page works correctly even with JavaScript disabled.
"""

import re
import os

with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

total = len(lines)
print(f"Total lines in index.html: {total}")

# --- Find key boundaries ---
head_end = None          # line with </head>
body_start = None        # line with <body
nav_start = None         # line with <header or <nav (shared nav)
layout_salary_start = None  # layoutSalary div start
layout_socso_start = None   # layoutSocso div start
footer_start = None      # <footer
body_end = None          # </body>

for i, line in enumerate(lines):
    stripped = line.strip()
    if head_end is None and "</head>" in stripped:
        head_end = i
    if body_start is None and stripped.startswith("<body"):
        body_start = i
    if nav_start is None and ('id="siteHeader"' in stripped or '<header' in stripped):
        nav_start = i
    if layout_salary_start is None and 'id="layoutSalary"' in stripped:
        layout_salary_start = i
    if layout_socso_start is None and 'id="layoutSocso"' in stripped:
        layout_socso_start = i
    if footer_start is None and stripped.startswith("<footer"):
        footer_start = i
    if "<!-- Footer -->" in stripped and footer_start is None:
        footer_start = i
    if "</body>" in stripped:
        body_end = i

print(f"head_end: {head_end}")
print(f"body_start: {body_start}")
print(f"nav_start: {nav_start}")
print(f"layout_salary_start: {layout_salary_start}")
print(f"layout_socso_start: {layout_socso_start}")
print(f"footer_start: {footer_start}")
print(f"body_end: {body_end}")

# --- Determine SOCSO section: from layoutSocso start back to its wrapper div ---
# The layoutSocso is inside a wrapper. Find the wrapping div above it (layout_salary_start - a few lines)
# Actually we want everything from body_start up to layout_salary_start (the nav/header),
# then skip layoutSalary, include layoutSocso, then footer onwards.

# Find the line just before layoutSalary (closing of container/wrapper that holds both layouts)
# We'll find the opening wrapper that contains both layouts
wrapper_start = None
for i in range(layout_salary_start - 1, body_start, -1):
    stripped = lines[i].strip()
    if stripped.startswith("<div") or stripped.startswith("<main") or stripped.startswith("<section"):
        wrapper_start = i
        break

print(f"wrapper_start: {wrapper_start}")

# Find the end of layoutSocso div (the line just before footer_start)
socso_end = footer_start  # SOCSO section ends just before footer

# --- Build the SOCSO-dedicated page ---
# Section 1: Everything from line 0 to head_end (the <head>)
head_section = lines[0 : head_end + 1]

# Update title and meta for SOCSO page
head_str = "".join(head_section)
head_str = re.sub(
    r"<title>.*?</title>",
    "<title>SOCSO PERKESO Calculator Malaysia 2025 | Kiraan SOCSO</title>",
    head_str,
    flags=re.DOTALL,
)
head_str = re.sub(
    r'(<meta name="description" content=")[^"]*(")',
    r'\1Kalkulator SOCSO PERKESO Malaysia 2025. Semak kadar caruman majikan dan pekerja dengan mudah.\2',
    head_str,
)

# Section 2: <body> open tag + nav/header (body_start to layout_salary_start - 1, excluding layoutSalary wrapper)
# We need body open + everything before the salary/socso layouts (nav etc)
pre_layouts = lines[body_start : layout_salary_start]

# Section 3: The SOCSO layout itself (layout_socso_start - 2 to socso_end)
# Go back a couple lines from layout_socso_start to catch the opening comment
socso_comment_start = layout_socso_start - 3
for i in range(layout_socso_start, layout_socso_start - 5, -1):
    if "<!-- SOCSO" in lines[i]:
        socso_comment_start = i
        break

socso_section = lines[socso_comment_start : socso_end]

# Section 4: Footer + scripts (footer_start to body_end + 1)
footer_and_scripts = lines[footer_start : total]

# --- Assemble ---
output_lines = []

# Head
output_lines.append(head_str)

# Pre-layouts (body open + nav)
pre_str = "".join(pre_layouts)
output_lines.append(pre_str)

# SOCSO section — remove display:none so it's visible without JS
socso_str = "".join(socso_section)
socso_str = socso_str.replace(
    'style="display: none; opacity: 0; transition: opacity 0.3s ease"',
    'style="display: flex; opacity: 1;"'
)
output_lines.append(socso_str)

# Footer + scripts
output_lines.append("".join(footer_and_scripts))

final_html = "\n".join(output_lines)

# Write output
os.makedirs("socso-perkeso", exist_ok=True)
out_path = "socso-perkeso/index.html"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(final_html)

print(f"\nWrote {out_path} ({len(final_html)} chars)")
