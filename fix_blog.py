import re

with open("api/blog.ts", "r") as f:
    content = f.read()

# Fix 1: Route maps
if "import { ROUTE_MAP, getEnRoute } from '../src/lib/route-map';" not in content:
    content = "import { ROUTE_MAP, getEnRoute } from '../src/lib/route-map';\n" + content

# Fix 2: Lang switcher
old_switcher = """    const langSwitcher = `
      <div class="lang-switcher" style="display: flex; gap: 8px; align-items: center; margin-left: auto; font-weight: 500;">
        <a href="${enUrl}" style="color: ${isMs ? 'var(--text-muted)' : 'var(--primary-color)'}; text-decoration: none;">EN</a>
        <span style="color: var(--border-color);">|</span>
        <a href="${msUrl}" style="color: ${isMs ? 'var(--primary-color)' : 'var(--text-muted)'}; text-decoration: none;">BM</a>
      </div>
    `;
    $('.desktop-nav').append(langSwitcher);
    $('.mobile-nav').prepend(langSwitcher);"""
# Note: blog.ts might not have langSwitcher injected directly? Let's check.
