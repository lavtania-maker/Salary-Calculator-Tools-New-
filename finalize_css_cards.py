import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# Replace any remaining hardcoded radius or shadow in card blocks with CSS variables
css = css.replace("border-radius: 12px !important;", "border-radius: var(--card-radius) !important;")
css = css.replace("border-radius: 10px !important;", "border-radius: var(--card-radius) !important;")
css = css.replace("border-radius: 16px !important;", "border-radius: var(--card-radius) !important;")
css = css.replace("border-radius: 20px !important;", "border-radius: var(--card-radius) !important;")

css = css.replace("box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;", "box-shadow: var(--card-shadow) !important;")
css = css.replace("box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02) !important;", "box-shadow: var(--card-shadow) !important;")
css = css.replace("box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;", "box-shadow: var(--card-shadow) !important;")

with open("public/calculator-styles.css", "w") as f:
    f.write(css)

print("Finalized CSS card tokens and properties!")

