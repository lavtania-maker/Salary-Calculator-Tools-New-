import os
import re

def insert_after(filepath, search, insert_text):
    with open(filepath, 'r') as f:
        content = f.read()
    if search in content:
        content = content.replace(search, search + "\n" + insert_text)
    with open(filepath, 'w') as f:
        f.write(content)

def replace_in_file(filepath, search, replacement):
    with open(filepath, 'r') as f:
        content = f.read()
    if search in content:
        content = content.replace(search, replacement)
    with open(filepath, 'w') as f:
        f.write(content)

# 1. blog-admin.html
insert_after('blog-admin.html', 
             '            <option value="overtime">Overtime</option>', 
             '            <option value="hourly-rate">Hourly Rate</option>')

insert_after('blog-admin.html', 
             '                <label><input type="checkbox" value="overtime"> Overtime</label>', 
             '                <label><input type="checkbox" value="hourly-rate"> Hourly Rate</label>')

replace_in_file('blog-admin.html', 
                " 'overtime': 'Overtime' }", 
                " 'overtime': 'Overtime', 'hourly-rate': 'Hourly Rate' }")


# 2. blog.html
insert_after('blog.html', 
             '    <a class="tab" href="/blog/category/overtime" data-cat="overtime">Overtime</a>', 
             '    <a class="tab" href="/blog/category/hourly-rate" data-cat="hourly-rate">Hourly Rate</a>')

# 3. server.ts
replace_in_file('server.ts', 
                'const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave", "overtime"];', 
                'const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave", "overtime", "hourly-rate"];')

# 4. api/sitemap-blog.ts
replace_in_file('api/sitemap-blog.ts', 
                'const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave", "overtime"];', 
                'const PREDEFINED_CATEGORIES = ["salary", "epf", "socso", "pcb-income-tax", "annual-leave", "overtime", "hourly-rate"];')

print("Patched blog files")
