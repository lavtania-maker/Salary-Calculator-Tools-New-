import re

with open("api/blog-post.ts", "r") as f:
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

new_switcher = """    $('.lang-en').attr('href', enUrl);
    $('.lang-ms').attr('href', msUrl);
    if (isMs) {
       $('.lang-ms').css('color', 'var(--primary-color)');
       $('.lang-en').css('color', 'var(--text-muted)');
    } else {
       $('.lang-en').css('color', 'var(--primary-color)');
       $('.lang-ms').css('color', 'var(--text-muted)');
    }"""

content = content.replace(old_switcher, new_switcher)

# Fix 3: URLs when translation is missing
# Old: const msUrl = post && post.translations && post.translations.ms ? '/ms/blog/' + post.translations.ms : (isMs ? '/ms/blog/' + slug : '/ms/');
# New: const msUrl = post && post.translations && post.translations.ms ? '/ms/blog/' + post.translations.ms : '/ms/blog';
old_url_logic = "const msUrl = post && post.translations && post.translations.ms ? '/ms/blog/' + post.translations.ms : (isMs ? '/ms/blog/' + slug : '/ms/');"
new_url_logic = "const msUrl = post && post.translations && post.translations.ms ? '/ms/blog/' + post.translations.ms : '/ms/blog';"
content = content.replace(old_url_logic, new_url_logic)

# Fix 4: Internal Links rewriting for MS pages
# After the switcher, if isMs, rewrite all links based on ROUTE_MAP
rewrite_links = """
    if (isMs) {
      $('a').each((_, el) => {
         const href = $(el).attr('href');
         if (href && ROUTE_MAP[href]) {
            $(el).attr('href', ROUTE_MAP[href]);
         }
      });
    }
"""
if "ROUTE_MAP[href]" not in content:
    content = content.replace(new_switcher, new_switcher + rewrite_links)

with open("api/blog-post.ts", "w") as f:
    f.write(content)
print("Fixed api/blog-post.ts")
