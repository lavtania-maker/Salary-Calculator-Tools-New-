import re

files = [
    "overtime-pay-calculator.html",
    "hourly-rate.html"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Add * to Working Days Per Week if missing
    content = re.sub(
        r'<label class="form-label" for="workingDays([^"]*)">\s*Working Days Per Week\s*</label>',
        r'<label class="form-label" for="workingDays\1">Working Days Per Week <span style="color: red">*</span></label>',
        content
    )
    
    # Add * to Normal Hours Per Day
    content = re.sub(
        r'<label class="form-label" for="normalHours([^"]*)">\s*Normal Hours Per Day\s*</label>',
        r'<label class="form-label" for="normalHours\1">Normal Hours Per Day <span style="color: red">*</span></label>',
        content
    )
    
    # Add * to Working Hours Per Day
    content = re.sub(
        r'<label class="form-label" for="workingHours([^"]*)">\s*Working Hours Per Day\s*</label>',
        r'<label class="form-label" for="workingHours\1">Working Hours Per Day <span style="color: red">*</span></label>',
        content
    )

    with open(file, 'w') as f:
        f.write(content)

