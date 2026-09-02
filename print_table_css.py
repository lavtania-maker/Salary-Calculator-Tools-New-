with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()

print("=== LINES 614-670 (Contribution Table) ===")
for i in range(613, min(670, len(lines))):
    print(f"{i+1}: {lines[i]}")

print("\n=== LINES 2220-2260 (Generic Table) ===")
for i in range(2219, min(2260, len(lines))):
    print(f"{i+1}: {lines[i]}")

print("\n=== LINES 2775-2800 (Table Containers) ===")
for i in range(2774, min(2800, len(lines))):
    print(f"{i+1}: {lines[i]}")

