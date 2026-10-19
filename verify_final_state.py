import re, glob

with open("public/calculator-styles.css") as f:
    css = f.read()

# Check :root variables
print("=== ROOT CARD TOKENS ===")
tokens = [line for line in css.splitlines() if '--card-' in line or '--border' in line]
for t in tokens:
    print(" ", t.strip())

# Check Master Unified Card Rule
print("\n=== MASTER CARD RULE ===")
pos = css.find("/* UNIFIED REUSABLE CARD DESIGN SYSTEM */")
if pos != -1:
    print(css[pos:pos+1000])

