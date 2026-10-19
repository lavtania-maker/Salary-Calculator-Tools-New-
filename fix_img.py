import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add width and height to logo-small.png if missing
    content = re.sub(
        r'<img src="/logo-small\.png" alt="SalaryCalculator\.my" class="login-logo" onerror="this\.style\.display = \'none\'">',
        r'<img src="/logo-small.png" alt="SalaryCalculator.my" class="login-logo" width="250" height="44" onerror="this.style.display = \'none\'">',
        content,
        flags=re.IGNORECASE | re.MULTILINE
    )
    
    content = re.sub(
        r'<img src="/logo-small\.png" alt="SalaryCalculator\.my" onerror="this\.style\.display = \'none\'">',
        r'<img src="/logo-small.png" alt="SalaryCalculator.my" width="250" height="44" onerror="this.style.display = \'none\'">',
        content,
        flags=re.IGNORECASE | re.MULTILINE
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done fixing images.")
