with open("public/calculator-styles.css") as f:
    css = f.read()

# Let's search for every section in calculator-styles.css that defines card styling
card_classes = ['.card', '.content-card', '.seo-card', '.calc-card', '.result-card', '.blog-card', '.stat-card', '.official-card', '.other-calc-card', '#resultCard', '#socsoResultCard', '#hourlyResultCard', '#epfResultCard', '#leaveResultCard', '#otResultCard']

lines = css.splitlines()
in_block = False
block_lines = []

for i, l in enumerate(lines):
    if any(c in l for c in card_classes) and '{' in l:
        print(f"Line {i+1}: {l}")

