import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add results-container to any div with id ending in ResultCard
    content = re.sub(
        r'<div class="card" id="([a-zA-Z0-9_]*ResultCard)"',
        r'<div class="card results-container" id="\1"',
        content,
        flags=re.IGNORECASE
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done fixing more classes.")
