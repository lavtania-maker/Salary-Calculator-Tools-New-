import re

files = [
    "index.html",
    "socso-perkeso.html",
    "pcb-income-tax.html"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # The label has: Gross Monthly Salary \n <svg ...> </label>
    # We want to add <span style="color: red">*</span> after Gross Monthly Salary and before <svg
    
    # We can match:
    # (Gross Monthly Salary)
    # (\s*<svg)
    # and replace with:
    # \1 <span style="color: red">*</span>\2
    
    content = re.sub(
        r'(Gross Monthly Salary)(\s*<svg)',
        r'\1 <span style="color: red">*</span>\2',
        content
    )
    
    with open(file, 'w') as f:
        f.write(content)

