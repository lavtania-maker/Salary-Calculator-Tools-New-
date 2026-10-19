import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix Google Fonts asynchronous loading to synchronous
    content = re.sub(
        r'<link rel="preload" as="style" href="https://fonts\.googleapis\.com/css2\?family=Inter:wght@400;500;600;700&amp;display=swap">\s*<link href="https://fonts\.googleapis\.com/css2\?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet" media="print" onload="this\.media=\'all\'">\s*<noscript>\s*<link href="https://fonts\.googleapis\.com/css2\?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\s*</noscript>',
        r'<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">',
        content,
        flags=re.IGNORECASE | re.MULTILINE | re.DOTALL
    )

    # Fix main stylesheet asynchronous loading
    content = re.sub(
        r'<link rel="preload" href="/calculator-styles\.css\?v=[0-9]+" as="style">\s*<link href="/calculator-styles\.css\?v=[0-9]+" rel="stylesheet" media="print" onload="this\.media=\'all\'">',
        r'<link href="/calculator-styles.css?v=20260710" rel="stylesheet">',
        content,
        flags=re.IGNORECASE | re.MULTILINE | re.DOTALL
    )
    
    # Also handle cases where there is a noscript block for calculator-styles.css (if any)
    content = re.sub(
        r'<link href="/calculator-styles\.css\?v=[0-9]+" rel="stylesheet" media="print" onload="this\.media=\'all\'">\s*<noscript>\s*<link href="/calculator-styles\.css\?v=[0-9]+" rel="stylesheet" />\s*</noscript>',
        r'<link href="/calculator-styles.css?v=20260710" rel="stylesheet">',
        content,
        flags=re.IGNORECASE | re.MULTILINE | re.DOTALL
    )

    with open(filepath, 'w') as f:
        f.write(content)

for html_file in glob.glob('*.html'):
    fix_file(html_file)

print("Done fixing links.")
