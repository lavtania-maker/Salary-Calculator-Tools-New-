import re

with open("public/calculator-styles.css", "r") as f:
    css = f.read()

# Remove the Safe UI Fixes block
idx = css.find("/* Safe UI Fixes */")
if idx != -1:
    css = css[:idx].strip()

# Add the proper fixes
css += """
/* --- CLEAN UI FIXES --- */
/* Reset any overly aggressive card-title changes made previously */
.card-title {
  margin-bottom: 24px !important;
}
.form-section-title {
  font-size: 1.15rem !important;
  font-weight: 700 !important;
  color: var(--text-main) !important;
  border-bottom: 1px solid var(--border) !important;
  padding-bottom: 8px !important;
  margin-bottom: 16px !important;
  margin-top: 24px !important;
}

/* Make inputs look a bit better */
.form-input, .form-select, select, input[type="text"], input[type="number"], input[type="email"] {
  min-height: 48px !important;
  height: 48px !important;
  padding: 0 16px !important;
  border-radius: 8px !important;
  font-size: 16px !important;
}

/* input-group handles its own border-radius and clipping */
.input-group {
  border-radius: 8px !important;
}
.input-group .form-input, .input-group input, .input-prefix, .input-postfix {
  border-radius: 0 !important;
  height: 48px !important;
}

/* Checkbox alignment fix */
.statutory-grid {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
  margin-top: 12px !important;
}

.checkbox-item {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  min-height: 44px !important;
  padding: 8px 12px !important;
  font-size: 15px !important;
  background: #f9fafb !important;
  border: 1px solid var(--border) !important;
  border-radius: 6px !important;
  flex: 1 1 calc(50% - 12px) !important;
  cursor: pointer !important;
}

/* Button sizing */
.btn, .btn-primary, .btn-outline, button[type="submit"] {
  min-height: 48px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}

.form-actions {
  display: flex !important;
  gap: 12px !important;
  margin-top: 24px !important;
}
"""

with open("public/calculator-styles.css", "w") as f:
    f.write(css)
print("done")
