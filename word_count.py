import glob
import re

files = [
    'index.html',
    'epf-kwsp.html',
    'socso-perkeso.html',
    'pcb-income-tax.html',
    'annual-leave-calculator.html',
    'overtime-pay-calculator.html',
    'hourly-rate.html',
    'mincal.html',
    'payslip.html'
]

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # simple extraction of body
        body_match = re.search(r'<body.*?>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
        if body_match:
            body_content = body_match.group(1)
            # remove scripts and styles
            body_content = re.sub(r'<script.*?>.*?</script>', '', body_content, flags=re.DOTALL | re.IGNORECASE)
            body_content = re.sub(r'<style.*?>.*?</style>', '', body_content, flags=re.DOTALL | re.IGNORECASE)
            # remove all html tags
            text = re.sub(r'<[^>]+>', ' ', body_content)
            # count words
            words = text.split()
            print(f"{file}: {len(words)} words")
        else:
            print(f"{file}: No body found")
    except Exception as e:
        pass
