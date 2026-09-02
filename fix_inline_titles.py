import glob, re

for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Replace the inline styled Salary Option div
    # <div style="font-size: 18px; font-weight: 700; margin-top: 32px; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
    #   Salary Option
    # </div>
    # and similar ones
    new_content = re.sub(
        r'<div style="font-size:\s*18px;\s*font-weight:\s*700;\s*margin-top:\s*32px;\s*margin-bottom:\s*24px;\s*border-bottom:\s*1px solid #e2e8f0;\s*padding-bottom:\s*8px;">(.*?)</div>',
        r'<h3 class="form-section-title">\1</h3>',
        content,
        flags=re.DOTALL
    )
    
    # Also for "Statutory Contributions"
    # <div style="font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1e293b">Statutory Contributions</div>
    new_content = re.sub(
        r'<div style="font-size:\s*16px;\s*font-weight:\s*700;\s*margin-bottom:\s*16px;\s*color:\s*#1e293b">\s*Statutory Contributions\s*</div>',
        r'<h3 class="form-section-title">Statutory Contributions</h3>',
        new_content,
        flags=re.DOTALL
    )
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed titles in {filepath}")
