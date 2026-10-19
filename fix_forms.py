import re
import os

files = [
    "index.html",
    "socso-perkeso.html",
    "pcb-income-tax.html",
    "epf-kwsp.html",
    "annual-leave-calculator.html",
    "overtime-pay-calculator.html",
    "hourly-rate.html"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # 1. Remove "*Required" tags underneath inputs.
    # Pattern for index.html, socso-perkeso.html, pcb-income-tax.html, epf-kwsp.html
    # <p style="\n color: var(--danger);\n font-size: 13px;\n margin-top: -2px;\n margin-bottom: 4px;\n font-weight: 400;\n ">*Required</p>
    content = re.sub(r'<p\s+style="[^"]*color:\s*var\(--danger\)[^"]*">\*Required</p>', '', content, flags=re.IGNORECASE)
    
    # Pattern for epf-kwsp.html
    # <div style="\n color: var(--danger);\n font-size: 13px;\n font-weight: 400;\n margin-bottom: 12px;\n margin-top: -6px;\n ">*Required</div>
    content = re.sub(r'<div\s+style="[^"]*color:\s*var\(--danger\)[^"]*">\*Required</div>', '', content, flags=re.IGNORECASE)
    
    # Pattern for overtime-pay-calculator.html, annual-leave-calculator.html
    # <div style="color: #dc2626; font-size: 13px; font-weight: 400; margin-bottom: 10px; margin-top: -6px;">*Required</div>
    content = re.sub(r'<div\s+style="[^"]*">\*Required</div>', '', content, flags=re.IGNORECASE)

    # 2. Add * to required fields labels.
    # For Gross Monthly Salary
    content = re.sub(
        r'<label class="form-label" for="grossSalary"([^>]*)>\s*Gross Monthly Salary\s*</label>',
        r'<label class="form-label" for="grossSalary"\1>Gross Monthly Salary <span style="color: red">*</span></label>',
        content
    )
    # For socsoGrossSalary
    content = re.sub(
        r'<label class="form-label" for="socsoGrossSalary"([^>]*)>\s*Gross Monthly Salary\s*</label>',
        r'<label class="form-label" for="socsoGrossSalary"\1>Gross Monthly Salary <span style="color: red">*</span></label>',
        content
    )
    # For epfGrossSalary
    content = re.sub(
        r'<label class="form-label" for="epfGrossSalary"([^>]*)>\s*Gross Monthly Salary\s*</label>',
        r'<label class="form-label" for="epfGrossSalary"\1>Gross Monthly Salary <span style="color: red">*</span></label>',
        content
    )
    # For annual-leave-calculator Employee Start Date
    content = re.sub(
        r'<label class="form-label" for="leaveStartDate">Employee Start Date</label>',
        r'<label class="form-label" for="leaveStartDate">Employee Start Date <span style="color: red">*</span></label>',
        content
    )
    # For annual-leave-calculator leaveEntitlement
    content = re.sub(
        r'<label class="form-label" for="leaveEntitlement">Annual Leave Entitlement</label>',
        r'<label class="form-label" for="leaveEntitlement">Annual Leave Entitlement <span style="color: red">*</span></label>',
        content
    )
    
    # 3. Handle (Optional) for Optional fields
    # Bonus
    content = re.sub(
        r'<label class="form-label" for="bonus"([^>]*)>\s*Bonus / Allowance \(RM\)\s*</label>',
        r'<label class="form-label" for="bonus"\1>Bonus / Allowance (RM) <span class="helper-text">(Optional)</span></label>',
        content
    )
    # Additional Tax Relief
    content = re.sub(
        r'<label class="form-label" for="additionalRelief"([^>]*)>\s*Additional Tax Relief \(RM / Year\)\s*</label>',
        r'<label class="form-label" for="additionalRelief"\1>Additional Tax Relief (RM / Year) <span class="helper-text">(Optional)</span></label>',
        content
    )
    
    # 4. Remove "(Optional)" or "Required" from fields with defaults if any
    # Like Marital Status, EPF Rate, Tax Status, Age Group. They just shouldn't have them, which our script won't add if they don't have them.
    # But wait, did they have (Optional) in the label? Let's check.
    
    # Fix `<span style="color: #dc2626">*</span>` to `<span style="color: red">*</span>` for uniformity across pages in overtime/hourly
    content = re.sub(r'<span style="color: #dc2626">\*</span>', r'<span style="color: red">*</span>', content)

    with open(file, 'w') as f:
        f.write(content)

