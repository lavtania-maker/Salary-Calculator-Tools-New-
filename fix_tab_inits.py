import re

files_map = {
    "index.html": "salary",
    "socso-perkeso.html": "socso",
    "epf-kwsp.html": "epf",
    "pcb-income-tax.html": "pcb"
}

for fname, default_tool in files_map.items():
    with open(fname) as f:
        content = f.read()
    
    # Fix initial routing block
    # Replace the if (window.location.pathname === "/socso-perkeso") ... block
    pattern = r'// Initial Routing Logic\s*if\s*\(window\.location\.pathname\s*===\s*["\']/socso-perkeso["\']\)\s*\{\s*switchToolTab\("socso",\s*false,\s*false\);\s*\}\s*else\s*\{\s*switchToolTab\("salary",\s*false,\s*false\);\s*\}'
    
    replacement = f'// Initial Routing Logic\n        if (window.location.pathname === "/socso-perkeso") {{\n          switchToolTab("socso", false, false);\n        }} else if (window.location.pathname === "/pcb-income-tax") {{\n          switchToolTab("pcb", false, false);\n        }} else if (window.location.pathname === "/epf-kwsp") {{\n          switchToolTab("epf", false, false);\n        }} else {{\n          switchToolTab("{default_tool}", false, false);\n        }}'
    
    new_content = re.sub(pattern, replacement, content)
    
    # Also check popstate replacement
    pop_pattern = r'const path = window\.location\.pathname;\s*if\s*\(path\s*===\s*["\']/socso-perkeso["\']\)\s*\{\s*switchToolTab\("socso",\s*false,\s*false\);\s*\}\s*else\s*\{\s*switchToolTab\("salary",\s*false,\s*false\);\s*\}'
    
    pop_replacement = f'const path = window.location.pathname;\n          if (path === "/socso-perkeso") {{\n            switchToolTab("socso", false, false);\n          }} else if (path === "/pcb-income-tax") {{\n            switchToolTab("pcb", false, false);\n          }} else if (path === "/epf-kwsp") {{\n            switchToolTab("epf", false, false);\n          }} else {{\n            switchToolTab("{default_tool}", false, false);\n          }}'
    
    new_content = re.sub(pop_pattern, pop_replacement, new_content)
    
    if new_content != content:
        with open(fname, "w") as f:
            f.write(new_content)
        print(f"Updated {fname} default tab to {default_tool}")
    else:
        print(f"No match in {fname}")

