import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace the script block to add reset listener
old_script = """grossSalaryInput.addEventListener("input", updateActiveQuickButton);"""
new_script = """grossSalaryInput.addEventListener("input", updateActiveQuickButton);
      
      const form = grossSalaryInput.closest("form");
      if (form) {
        form.addEventListener("reset", () => {
          setTimeout(() => {
            updateActiveQuickButton();
          }, 0);
        });
      }"""

content = content.replace(old_script, new_script)

with open('index.html', 'w') as f:
    f.write(content)
print("Reset patched in index.html.")
