with open("public/calculator-styles.css") as f:
    lines = f.readlines()

print(f"Total lines in CSS: {len(lines)}")
print("=== Lines 2850 to end ===")
print("".join(lines[2850:]))

