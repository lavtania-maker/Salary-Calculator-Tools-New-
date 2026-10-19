import re

with open("index.html", "r") as f:
    content = f.read()

# Find the form-actions block
actions_match = re.search(r'(\s*<div class="form-actions">.*?</button>\s*</div>)', content, re.DOTALL)
if actions_match:
    actions_block = actions_match.group(1)
    
    # Remove it from its current position
    content = content.replace(actions_block, "", 1)
    
    # Insert it right before </form>
    content = content.replace("</form>", actions_block + "\n            </form>")

with open("index.html", "w") as f:
    f.write(content)
print("done")
