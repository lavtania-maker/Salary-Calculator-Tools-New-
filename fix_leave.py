import re

file = "annual-leave-calculator.html"
with open(file, 'r') as f:
    content = f.read()

content = re.sub(
    r'<label class="form-label" for="leaveCalcDate">Calculation Date</label>',
    r'<label class="form-label" for="leaveCalcDate">Calculation Date <span class="helper-text">(Optional)</span></label>',
    content
)

with open(file, 'w') as f:
    f.write(content)
