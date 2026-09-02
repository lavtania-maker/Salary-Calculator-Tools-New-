with open("live_calculator-styles.css") as f:
    live_css = f.read()

# Let's save live_css to public/calculator-styles.css
with open("public/calculator-styles.css", "w") as f:
    f.write(live_css)

print("Updated public/calculator-styles.css with exact live production CSS!")
print("File size:", len(live_css))
print("Line count:", len(live_css.splitlines()))

