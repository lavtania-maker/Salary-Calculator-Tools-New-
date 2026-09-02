import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add results-container if not present
    content = re.sub(
        r'<section class="card result-panel" id="resultCard">',
        r'<section class="card result-panel results-container" id="resultCard">',
        content,
        flags=re.IGNORECASE
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done fixing pcb cls.")
