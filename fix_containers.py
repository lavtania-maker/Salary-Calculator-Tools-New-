import glob
import re

for filepath in sorted(glob.glob('*.html')):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace inline max-width: 1100px with 1200px
    content = content.replace('max-width: 1100px;', 'max-width: 1200px;')
    content = content.replace('max-width:1100px;', 'max-width: 1200px;')
    content = content.replace('max-width: 1100px !important', 'max-width: 1200px !important')

    with open(filepath, 'w') as f:
        f.write(content)

print("Updated inline HTML container max-widths to 1200px.")
