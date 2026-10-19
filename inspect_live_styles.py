with open("live-styles.txt") as f:
    text = f.read()

print("Length:", len(text))
print("Contains hero:", "hero" in text)
print("Contains main-layout:", "main-layout" in text)
print("Contains card:", "card" in text)

# Print all CSS selectors in live-styles.txt
import re
selectors = re.findall(r'([^{}\n]+)\s*\{', text)
print("\nFirst 30 selectors in live-styles.txt:")
for s in selectors[:30]:
    s_clean = s.strip()
    if not s_clean.startswith('@') and len(s_clean) < 80:
        print("  ", s_clean)

