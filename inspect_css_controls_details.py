with open("public/calculator-styles.css") as f:
    css = f.read()

# Print CSS rules for form controls
lines = css.splitlines()

def print_block(start_keyword, max_lines=40):
    found = False
    count = 0
    for i, line in enumerate(lines):
        if start_keyword in line and '{' in line:
            found = True
        if found:
            print(f"{i+1}: {line}")
            count += 1
            if count >= max_lines or (count > 1 and line.strip() == '}'):
                break

print("=== .form-input & .form-select ===")
print_block(".form-input, .form-select", 30)

print("\n=== .btn-primary ===")
print_block(".btn-primary {", 25)

print("\n=== .checkbox-item ===")
print_block(".checkbox-item {", 25)

print("\n=== .radio-segment ===")
print_block(".radio-segment {", 25)

print("\n=== table ===")
print_block("table {", 25)

