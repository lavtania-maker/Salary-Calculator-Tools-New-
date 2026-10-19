import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add min-height to hiring banner
    content = re.sub(
        r'<!-- Standalone Hiring CTA Banner -->\s*<div class="content-card" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 24px 28px; border-radius: 12px;">',
        r'<!-- Standalone Hiring CTA Banner -->\n        <div class="content-card" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 24px 28px; border-radius: 12px; min-height: 250px; box-sizing: border-box;">',
        content,
        flags=re.IGNORECASE | re.MULTILINE
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done fixing hiring banner cls.")
