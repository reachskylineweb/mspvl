import re, os

# Fix facilities.html library heading
with open('d:/msvpl/facilities.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix library h2 heading
c = c.replace(
    '<h2 style="color: var(--primary-color); margin-bottom: 20px;">Library & Resource Centre</h2>',
    '<span class="label-badge">Library</span>\n                    <h2 class="accent-heading" style="margin-top: 10px;">Library &amp; Resource Centre</h2>'
)

with open('d:/msvpl/facilities.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('facilities.html - library heading fixed')

# Now do a final pass on ALL html pages to:
# 1. Fix any stray h3 accent-color → primary-color 
# 2. Fix section-title margin-bottom inline style cleanup
# 3. Fix any raw "padding: 100px 0" sections still remaining

pages = [
    'index.html','about.html','admission.html','advantages.html',
    'alumni-zone.html','contact.html','courses.html','facilities.html',
    'gallery.html','information-technology.html','mechanical-engineering.html',
    'civil-engineering.html','electrical-and-electronics-engineering.html',
    'electronics-and-communication-engineering.html','automobile-engineering.html',
    'computer-engineering.html','placements.html','student-zone.html',
    'parent-zone.html','prebook-admission.html'
]

sec_classes = ['sec-white', 'sec-blue-tint', 'sec-yellow-tint', 'sec-grad-blue', 'sec-light', 'sec-grad-mixed']

for page in pages:
    path = f'd:/msvpl/{page}'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    changed = False

    # Replace any remaining bare padding sections
    patterns = [
        ('section style="padding: 100px 0;"', 'section class="sec-white"'),
        ('section style="padding: 80px 0;"', 'section class="sec-blue-tint"'),
        ('section style="padding: 60px 0;"', 'section class="sec-light"'),
        ('section style="padding: 120px 0; background: var(--white);"', 'section class="sec-white"'),
        ('section style="padding: 100px 0; background: var(--light-bg);"', 'section class="sec-grad-blue"'),
        ('section style="padding: 60px 0; background: var(--light-bg); border-bottom: 1px solid var(--border-color);"', 'section class="page-hero"'),
    ]
    for old, new in patterns:
        if old in c:
            c = c.replace(old, new)
            changed = True

    # Fix h3 accent-color to primary
    new_c = re.sub(
        r'<h3 style="([^"]*?)color: var\(--accent-color\);([^"]*?)">',
        lambda m: f'<h3 style="{m.group(1)}color: var(--primary-color);{m.group(2)}">',
        c
    )
    if new_c != c:
        c = new_c
        changed = True

    # Fix h2 accent-color to accent-heading
    new_c = re.sub(
        r'<h2 style="color: var\(--accent-color\)[^"]*">',
        '<h2 class="accent-heading">',
        c
    )
    if new_c != c:
        c = new_c
        changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f'Fixed: {page}')

print('All done.')
