import re

with open("socso-perkeso.html") as f:
    html = f.read()

hero_end = html.find('</section>', html.find('class="hero"'))
socso_start = html.find('id="layoutSocso"')

between = html[hero_end:socso_start]

# Find all tags inside 'between' that have style attributes or classes
tags = re.findall(r'<([a-z0-9]+)\b([^>]*)>', between)
print(f"Total tags in 'between': {len(tags)}")

# Are there any tags inside 'between' that are NOT inside #layoutSalary?
# layoutSalary starts at <div class="main-layout" id="layoutSalary"...>
salary_start = between.find('id="layoutSalary"')
print("salary_start in 'between':", salary_start)

# Let's count open/close divs inside layoutSalary in 'between'
salary_content = between[salary_start:]
open_divs = len(re.findall(r'<div\b', salary_content))
close_divs = salary_content.count('</div>')
print(f"Inside salary_content: open_divs={open_divs}, close_divs={close_divs}")

