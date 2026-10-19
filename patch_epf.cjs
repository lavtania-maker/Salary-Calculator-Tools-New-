const fs = require('fs');
const path = 'epf-kwsp.html';
let code = fs.readFileSync(path, 'utf8');

const oldStr = `                    <div id="projectionContent" style="display: none; margin-top: 12px; overflow: hidden; border: 1px solid #f1f5f9; border-radius: 12px;">
                      <div class="table-container" style="margin: 0; padding: 0; border: none; border-radius: 0; overflow-x: auto;">
                        <div class="table-responsive" style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;"><table style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 15px;" data-i18n="monthly_yearly_employee_epf_rm_0_00_rm_0_86b1f6">
                          <thead>
                            <tr style="background: #ffffff;">
                              <th style="padding: 12px 14px; text-align: left; color: #64748b; font-weight: 600; border-bottom: 1px solid #ffffff;"></th>
                              <th style="padding: 12px 10px; text-align: center; color: #1e4ed8; font-weight: 700; border-bottom: 1px solid #ffffff;" data-i18n="monthly_9030e3">Monthly</th>
                              <th style="padding: 12px 10px; text-align: center; color: #1e4ed8; font-weight: 700; border-bottom: 1px solid #ffffff;" data-i18n="yearly_cf5ea7">Yearly</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style="padding: 12px 14px; border-bottom: 1px solid #ffffff;" data-i18n="employee_epf_00a625">
                                <span style="font-weight: 600; color: #475569;">Employee EPF</span>
                              </td>
                              <td id="tableMonthlyEmp" style="padding: 12px 10px; text-align: center; font-weight: 700; color: #059669; border-bottom: 1px solid #ffffff;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyEmp" style="padding: 12px 10px; text-align: center; font-weight: 700; color: #059669; border-bottom: 1px solid #ffffff;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 14px; border-bottom: 1px solid #ffffff;" data-i18n="employer_epf_a105c1">
                                <span style="font-weight: 600; color: #475569;">Employer EPF</span>
                              </td>
                              <td id="tableMonthlyEmpr" style="padding: 12px 10px; text-align: center; font-weight: 700; color: #b45309; border-bottom: 1px solid #ffffff;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyEmpr" style="padding: 12px 10px; text-align: center; font-weight: 700; color: #b45309; border-bottom: 1px solid #ffffff;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                            <tr style="background: #ffffff;">
                              <td style="padding: 14px 14px;" data-i18n="total_epf_savings_861cf4">
                                <span style="font-weight: 800; color: #1e3a8a;">Total EPF Savings</span>
                              </td>
                              <td id="tableMonthlyTotal" style="padding: 14px 10px; text-align: center; font-weight: 800; color: #1e3a8a;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyTotal" style="padding: 14px 10px; text-align: center; font-weight: 800; color: #1e3a8a;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                          </tbody>
                        </table></div>
                      </div>
                    </div>`;

const newStr = `                    <div id="projectionContent" style="display: none; margin-top: 12px; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc;">
                      <div class="table-container" style="margin: 0; padding: 0; border: none; border-radius: 0; overflow-x: auto;">
                        <div class="table-responsive" style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;"><table style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 15px;" data-i18n="monthly_yearly_employee_epf_rm_0_00_rm_0_86b1f6">
                          <thead>
                            <tr style="background: #ffffff;">
                              <th style="padding: 12px 16px; text-align: left; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;"></th>
                              <th style="padding: 12px 16px; text-align: right; color: #1e4ed8; font-weight: 700; border-bottom: 1px solid #e2e8f0;" data-i18n="monthly_9030e3">Monthly</th>
                              <th style="padding: 12px 16px; text-align: right; color: #1e4ed8; font-weight: 700; border-bottom: 1px solid #e2e8f0;" data-i18n="yearly_cf5ea7">Yearly</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;" data-i18n="employee_epf_00a625">
                                <span style="font-weight: 600; color: #475569;">Employee EPF</span>
                              </td>
                              <td id="tableMonthlyEmp" style="padding: 12px 16px; text-align: right; font-weight: 700; color: #059669; border-bottom: 1px solid #e2e8f0;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyEmp" style="padding: 12px 16px; text-align: right; font-weight: 700; color: #059669; border-bottom: 1px solid #e2e8f0;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;" data-i18n="employer_epf_a105c1">
                                <span style="font-weight: 600; color: #475569;">Employer EPF</span>
                              </td>
                              <td id="tableMonthlyEmpr" style="padding: 12px 16px; text-align: right; font-weight: 700; color: #b45309; border-bottom: 1px solid #e2e8f0;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyEmpr" style="padding: 12px 16px; text-align: right; font-weight: 700; color: #b45309; border-bottom: 1px solid #e2e8f0;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                            <tr style="background: #ffffff;">
                              <td style="padding: 12px 16px;" data-i18n="total_epf_savings_861cf4">
                                <span style="font-weight: 800; color: #1e3a8a;">Total EPF Savings</span>
                              </td>
                              <td id="tableMonthlyTotal" style="padding: 12px 16px; text-align: right; font-weight: 800; color: #1e3a8a;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                              <td id="tableYearlyTotal" style="padding: 12px 16px; text-align: right; font-weight: 800; color: #1e3a8a;" data-i18n="rm_000_0aa47d">RM 0.00</td>
                            </tr>
                          </tbody>
                        </table></div>
                      </div>
                    </div>`;

if (code.includes(oldStr)) {
  code = code.replace(oldStr, newStr);
  fs.writeFileSync(path, code);
  console.log('patched epf-kwsp.html');
} else {
  console.error('not found in epf-kwsp.html');
}

const pathIndex = 'index.html';
let codeIndex = fs.readFileSync(pathIndex, 'utf8');

if (codeIndex.includes(oldStr)) {
  codeIndex = codeIndex.replace(oldStr, newStr);
  fs.writeFileSync(pathIndex, codeIndex);
  console.log('patched index.html');
} else {
  console.error('not found in index.html');
}
