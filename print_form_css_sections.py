with open("public/calculator-styles.css") as f:
    css = f.read()

lines = css.splitlines()

print("=== LINES 320 to 380 (Buttons Base) ===")
for i in range(319, min(380, len(lines))):
    print(f"{i+1}: {lines[i]}")

print("\n=== LINES 430 to 570 (Forms Base) ===")
for i in range(429, min(570, len(lines))):
    print(f"{i+1}: {lines[i]}")

print("\n=== LINES 3280 to 3330 (End of File Controls) ===")
for i in range(3279, len(lines)):
    print(f"{i+1}: {lines[i]}")

