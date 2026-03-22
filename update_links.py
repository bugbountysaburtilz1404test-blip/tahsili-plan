import glob

replacements = {
    'href="#tips"': 'href="tips.html"',
    'href="#ai-schedule"': 'href="schedule.html"',
    'href="#content-hub"': 'href="library.html"',
    'href="#channels"': 'href="library.html#channels"',
    'href="#hero"': 'href="index.html"',
    "onclick=\"document.getElementById('ai-schedule').scrollIntoView({behavior: 'smooth'})\"": "",
    "onclick=\"document.getElementById('content-hub').scrollIntoView({behavior: 'smooth'})\"": "",
    "onclick=\"closeSectionsModal(true)\"": "onclick=\"closeSectionsModal()\""
}

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
