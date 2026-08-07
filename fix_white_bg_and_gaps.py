import glob
import re

for filepath in sorted(glob.glob('*.html')):
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove min-height: 800px inline styles
    content = re.sub(r'style="min-height:\s*800px;?\s*contain:\s*layout;?"', 'style="contain: layout"', content)
    content = re.sub(r'min-height:\s*800px;?', '', content)

    # Remove min-height: 600px in <style> blocks
    content = re.sub(r'(\.result-panel\s+\.card\s*{\s*)min-height:\s*600px;?', r'\1min-height: 0;', content)
    content = re.sub(r'min-height:\s*600px;?', 'min-height: 0;', content)

    # Replace section off-white background inline styles with pure white (#ffffff)
    content = re.sub(r'background-color:\s*#f8fafc;?', 'background-color: #ffffff;', content)
    content = re.sub(r'background:\s*#f8fafc;?', 'background: #ffffff;', content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Cleaned up html inline min-heights and off-white backgrounds.")
