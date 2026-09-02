import os
import re

html_mincal = """    <!-- How This Calculation Works -->
    <section class="content-section" style="padding-top: 40px; padding-bottom: 0px; background-color: #f8fafc;">
      <div class="container">
        <div class="content-card">
          <h2 style="color: #2563eb !important; margin-bottom: 16px;">How This Tool Works</h2>
          
          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">Who should use this tool?</h3>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            This tool is designed for employers, HR professionals, and employees in Malaysia to quickly verify if a monthly salary meets the current national minimum wage requirements.
          </p>

          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">3-Step Guide to Input Data</h3>
          <ol style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>Enter Basic Salary:</strong> Input the employee's monthly basic salary in RM.</li>
            <li style="margin-bottom: 8px;"><strong>Calculate:</strong> Click the calculate button to process the input.</li>
            <li style="margin-bottom: 8px;"><strong>Review Status:</strong> The tool will instantly indicate whether the salary complies with the minimum wage law.</li>
          </ol>

          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">Statutory Guidelines Summary</h3>
          <div class="table-responsive" style="margin-top: 10px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="background-color: #eff6ff; border-bottom: 2px solid #bfdbfe;">
                  <th style="padding: 12px; color: #1e40af; font-weight: 600;">Guideline</th>
                  <th style="padding: 12px; color: #1e40af; font-weight: 600;">Details</th>
                </tr>
              </thead>
              <tbody style="font-size: 15px; color: #334155;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px; font-weight: 500;">Current Minimum Wage</td>
                  <td style="padding: 12px;">RM 1,700 per month (Effective February 2026)</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px; font-weight: 500;">Governing Law</td>
                  <td style="padding: 12px;">Minimum Wages Order under the National Wages Consultative Council Act 2011</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: 500;">Applicability</td>
                  <td style="padding: 12px;">All private sector employees in Malaysia (excluding domestic servants)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
"""

html_payslip = """    <!-- How This Calculation Works -->
    <section class="content-section" style="padding-top: 40px; padding-bottom: 0px; background-color: #f8fafc;">
      <div class="container">
        <div class="content-card">
          <h2 style="color: #2563eb !important; margin-bottom: 16px;">How This Tool Works</h2>
          
          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">Who should use this tool?</h3>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            This tool is designed for small business owners, freelancers, and HR administrators in Malaysia who need a quick and professional way to generate standard salary payslips for their employees.
          </p>

          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">3-Step Guide to Input Data</h3>
          <ol style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>Enter Employee Details:</strong> Fill in the employee's name, ID, position, and the relevant pay period.</li>
            <li style="margin-bottom: 8px;"><strong>Input Earnings & Deductions:</strong> Add the basic salary, allowances, and any statutory deductions like EPF, SOCSO, EIS, and PCB.</li>
            <li style="margin-bottom: 8px;"><strong>Generate PDF:</strong> Click the generate button to instantly download a professional, formatted payslip in PDF format.</li>
          </ol>

          <h3 style="color: #1e293b; font-size: 1.1rem; margin-top: 20px; margin-bottom: 10px;">Statutory Guidelines Summary</h3>
          <div class="table-responsive" style="margin-top: 10px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="background-color: #eff6ff; border-bottom: 2px solid #bfdbfe;">
                  <th style="padding: 12px; color: #1e40af; font-weight: 600;">Guideline</th>
                  <th style="padding: 12px; color: #1e40af; font-weight: 600;">Details</th>
                </tr>
              </thead>
              <tbody style="font-size: 15px; color: #334155;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px; font-weight: 500;">Payslip Issuance</td>
                  <td style="padding: 12px;">Employers must issue a payslip detailing wages and deductions under the Employment Act 1955.</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px; font-weight: 500;">Record Keeping</td>
                  <td style="padding: 12px;">Employment records (including payslips) must be kept for at least 7 years.</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: 500;">Required Details</td>
                  <td style="padding: 12px;">Basic wages, overtime, allowances, and itemized statutory deductions (EPF, SOCSO, EIS, PCB).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
"""

def update_file(filename, html_content):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "How This Tool Works" in content:
        print(f"{filename} already updated")
        return
        
    target = "<!-- Other Calculators Section -->"
    if target in content:
        new_content = content.replace(target, html_content + "\n" + target, 1)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"Target not found in {filename}")

update_file("mincal.html", html_mincal)
update_file("payslip.html", html_payslip)

