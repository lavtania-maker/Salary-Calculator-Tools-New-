import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add results-container to result cards
    content = re.sub(
        r'(<div class="card" id="resultCard">)',
        r'<div class="card results-container" id="resultCard">',
        content,
        flags=re.IGNORECASE
    )
    
    content = re.sub(
        r'(<div class="card" id="hourlyResultCard"[^>]*>)',
        r'\1'.replace('class="card"', 'class="card results-container"'),
        content,
        flags=re.IGNORECASE
    )
    
    # Just in case, general replacement for other calculators
    # e.g., id="leaveResultCard", id="pcbResultCard", id="socsoResultCard", id="epfResultCard"
    content = re.sub(
        r'<div class="card" id="([a-zA-Z0-9]+ResultCard)">',
        r'<div class="card results-container" id="\1">',
        content,
        flags=re.IGNORECASE
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done applying results-container.")
