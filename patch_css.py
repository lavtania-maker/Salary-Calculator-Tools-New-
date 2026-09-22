import re

with open('calculator-styles.css', 'r') as f:
    content = f.read()

# Find the start of the quick salary block
idx = content.find('/* Quick Salary Buttons */')
if idx != -1:
    content = content[:idx]

new_css = """/* Quick Salary Buttons */
.quick-salary-wrapper {
  margin-top: 12px;
  margin-bottom: 24px;
}
.quick-salary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.quick-salary-title {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #1e293b !important; /* slate-800 */
  display: flex;
  align-items: center;
  gap: 6px;
}
.quick-salary-hint {
  font-size: 12px !important;
  color: #64748b !important; /* slate-500 */
}
.quick-salary-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.btn-quick-salary {
  appearance: none !important;
  -webkit-appearance: none !important;
  background-color: #ffffff !important;
  border: 1px solid #cbd5e1 !important; /* slate-300 */
  border-radius: 20px !important;
  padding: 6px 14px !important;
  font-size: 12px !important;
  font-family: inherit !important;
  font-weight: 500 !important;
  color: #475569 !important; /* slate-600 */
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
  outline: none !important;
  box-shadow: none !important;
  line-height: 1.5 !important;
  height: auto !important;
  min-height: 0 !important;
  width: auto !important;
  display: inline-block !important;
  text-align: center !important;
}
.btn-quick-salary:hover {
  border-color: #94a3b8 !important; /* slate-400 */
  color: #1e293b !important;
}
.btn-quick-salary.active {
  background-color: #eff6ff !important; /* blue-50 */
  border-color: #bfdbfe !important; /* blue-200 */
  color: #2563eb !important; /* blue-600 */
  font-weight: 600 !important;
}
"""

content += new_css

with open('calculator-styles.css', 'w') as f:
    f.write(content)

print("CSS patched.")
