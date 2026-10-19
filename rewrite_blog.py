import re

with open("api/blog.ts", "r") as f:
    content = f.read()

# Add isMs
content = content.replace('export default async function handler(req: any, res: any) {', 'export default async function handler(req: any, res: any) {\n  const isMs = req.query?.lang === "ms";')

# Filter by language
filter_logic = """    // Filter by language
    allPosts = allPosts.filter(p => {
        if (isMs) {
            return p.translations && p.translations.en;
        } else {
            return !p.translations || !p.translations.en;
        }
    });

    // Filter by category if requested"""
content = content.replace('    // Filter by category if requested', filter_logic)

# Rewrite links in `card` function
# Need to pass isMs to `card(p, large)`
content = content.replace('function card(p: any, large: boolean) {', 'function card(p: any, large: boolean, isMs: boolean = false) {')
content = content.replace('href="/blog/${p.slug || p.id}"', 'href="${isMs ? \'/ms/blog/\' : \'/blog/\'}${p.slug || p.id}"')
content = content.replace('card(filteredPosts[0], true)', 'card(filteredPosts[0], true, isMs)')
content = content.replace('card(filteredPosts[1], true)', 'card(filteredPosts[1], true, isMs)')
content = content.replace('card(filteredPosts[i], false)', 'card(filteredPosts[i], false, isMs)')

# Update lang switchers and internal links inside the HTML
lang_switcher_update = """    // 5.1 Update Lang Switcher
    const enUrl = isMs ? "/blog" : req.path;
    const msUrl = isMs ? req.path : "/ms/blog";
    $('.lang-en').attr('href', "/blog");
    $('.lang-ms').attr('href', "/ms/blog");
    if (isMs) {
       $('.lang-ms').css('color', 'var(--primary-color)');
       $('.lang-en').css('color', 'var(--text-muted)');
       $('html').attr('lang', 'ms');
       $('a').each((_, el) => {
           const href = $(el).attr('href');
           // Simple internal link mapping if needed
           if (href === '/epf-kwsp') $(el).attr('href', '/ms/kalkulator-epf');
           if (href === '/socso-perkeso') $(el).attr('href', '/ms/kalkulator-socso');
           if (href === '/pcb-income-tax') $(el).attr('href', '/ms/kalkulator-pcb');
           if (href === '/annual-leave-calculator') $(el).attr('href', '/ms/kalkulator-cuti-tahunan');
           if (href === '/overtime-pay-calculator') $(el).attr('href', '/ms/kalkulator-overtime');
           if (href === '/hourly-rate') $(el).attr('href', '/ms/kadar-gaji-sejam');
           if (href === '/mincal') $(el).attr('href', '/ms/kalkulator-gaji-minimum');
           if (href === '/payslip') $(el).attr('href', '/ms/penjana-slip-gaji');
           if (href === '/privacy-policy') $(el).attr('href', '/ms/dasar-privasi');
           if (href === '/') $(el).attr('href', '/ms/');
       });
       
       // Change title text
       $('title').text($('title').text().replace('HR Blog Malaysia', 'Blog HR Malaysia'));
       
       // Change category tab texts if any
       $('#categoryTabs .tab[data-cat="salary"]').text('Gaji');
       $('#categoryTabs .tab[data-cat="annual-leave"]').text('Cuti Tahunan');
       $('#categoryTabs .tab[data-cat="overtime"]').text('Kerja Lebih Masa');
       $('#categoryTabs .tab[data-cat="hourly-rate"]').text('Gaji Sejam');
    } else {
       $('.lang-en').css('color', 'var(--primary-color)');
       $('.lang-ms').css('color', 'var(--text-muted)');
    }
    
    $('link[rel="canonical"]').attr('href', 'https://salarycalculator.my' + (isMs ? '/ms/blog' : '/blog'));
    $('head').append(`<link rel="alternate" hreflang="en" href="https://salarycalculator.my/blog" />`);
    $('head').append(`<link rel="alternate" hreflang="ms" href="https://salarycalculator.my/ms/blog" />`);
    $('head').append(`<link rel="alternate" hreflang="x-default" href="https://salarycalculator.my/blog" />`);
"""
content = content.replace("$('#articlesContainer').html(renderedHtml);", "$('#articlesContainer').html(renderedHtml);\n" + lang_switcher_update)

with open("api/blog.ts", "w") as f:
    f.write(content)
print("Rewrote api/blog.ts")
