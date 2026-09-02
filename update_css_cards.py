import re

with open("public/calculator-styles.css") as f:
    css = f.read()

# 1. Update :root to include standard card design tokens
root_replacement = """:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary: #4b5563;
  --bg-light: #ffffff;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #475569;
  --border: #f1f5f9;
  --border-input: #cbd5e1;
  --success: #059669;
  --danger: #dc2626;

  /* Reusable Design Tokens for Card System */
  --card-border-color: #f1f5f9;
  --card-border-width: 1px;
  --card-border-style: solid;
  --card-border: var(--card-border-width) var(--card-border-style) var(--card-border-color);
  --card-radius: 12px;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --card-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02);

  --shadow-soft: var(--card-shadow);
  --shadow-hover: var(--card-shadow-hover);
}"""

css = re.sub(r':root\s*\{[^}]*\}', root_replacement, css, count=1)

# Add master standardized card system right after root/resets
master_card_css = """

/* ========================================================= */
/* UNIFIED REUSABLE CARD DESIGN SYSTEM                       */
/* ========================================================= */
.card,
.content-card,
.seo-card,
.calc-card,
.result-card,
.blog-card,
.stat-card,
.official-card,
.other-calc-card,
.doc-card,
.featured-card,
.table-card,
.sidebar-card,
.login-card,
.article-cta,
.info-block,
.results-container,
.take-home-card,
.takehome-card,
#resultCard,
#socsoResultCard,
#hourlyResultCard,
#epfResultCard,
#leaveResultCard,
#otResultCard {
  background-color: var(--card-bg) !important;
  background: var(--card-bg) !important;
  border: var(--card-border) !important;
  border-radius: var(--card-radius) !important;
  box-shadow: var(--card-shadow) !important;
  box-sizing: border-box !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease !important;
}

.card:hover,
.content-card:hover,
.seo-card:hover,
.blog-card:hover,
.other-calc-card:hover,
.official-card:hover {
  border-color: #e2e8f0 !important;
  box-shadow: var(--card-shadow-hover) !important;
}
"""

pos_after_reset = css.find("body {")
if pos_after_reset != -1:
    css = css[:pos_after_reset] + master_card_css + "\n" + css[pos_after_reset:]

# Replace old hardcoded border/radius/shadow declarations for cards in the rest of CSS
# Replace border: 1px solid #E2E8F0 !important; with border: var(--card-border) !important;
css = css.replace("border: 1px solid #E2E8F0 !important;", "border: var(--card-border) !important;")
css = css.replace("border: 1px solid #E2E8F0;", "border: var(--card-border);")
css = css.replace("border: 1px solid #f1f5f9 !important;", "border: var(--card-border) !important;")
css = css.replace("border: 1px solid #f1f5f9;", "border: var(--card-border);")
css = css.replace("border: 1px solid #bae6fd;", "border: var(--card-border);")
css = css.replace("border: 1px solid #bfdbfe;", "border: var(--card-border);")
css = css.replace("border-radius: 20px;", "border-radius: var(--card-radius);")
css = css.replace("border-radius: 20px !important;", "border-radius: var(--card-radius) !important;")
css = css.replace("border-radius: 16px;", "border-radius: var(--card-radius);")
css = css.replace("border-radius: 16px !important;", "border-radius: var(--card-radius) !important;")

with open("public/calculator-styles.css", "w") as f:
    f.write(css)

print("Updated public/calculator-styles.css successfully!")

