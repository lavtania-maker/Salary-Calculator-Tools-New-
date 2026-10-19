with open("public/calculator-styles.css") as f:
    css = f.read()

# Print :root
pos_root = css.find(":root")
if pos_root != -1:
    print("=== :root ===")
    print(css[pos_root:pos_root+800])

