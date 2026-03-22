import glob, re

new_grid = """<div class="sections-grid">
                        <a href="schedule.html" class="sec-card" onclick="closeSectionsModal()">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                            <div class="sec-content">
                                <span class="sec-title">صانع الجداول</span>
                                <span class="sec-desc">أداة تسوي لك جدول مفصّل بالذكاء الاصطناعي</span>
                            </div>
                        </a>
                        <a href="experiences.html" class="sec-card" onclick="closeSectionsModal()">
                            <i class="fa-solid fa-star"></i>
                            <div class="sec-content">
                                <span class="sec-title">تجارب المتفوقين</span>
                                <span class="sec-desc">قصص وأسرار طلاب جابوا +95</span>
                            </div>
                        </a>
                        <a href="library.html" class="sec-card" onclick="closeSectionsModal()">
                            <i class="fa-solid fa-book"></i>
                            <div class="sec-content">
                                <span class="sec-title">المكتبة الشاملة</span>
                                <span class="sec-desc">أهم المصادر، التجميعات، والكتب المطلوبة</span>
                            </div>
                        </a>
                        <a href="tips.html" class="sec-card" onclick="closeSectionsModal()">
                            <i class="fa-solid fa-lightbulb"></i>
                            <div class="sec-content">
                                <span class="sec-title">نصائح ذهبية</span>
                                <span class="sec-desc">زبدة النصائح عشان تختصر على نفسك التعب</span>
                            </div>
                        </a>
                        <a href="library.html#channels" class="sec-card" onclick="closeSectionsModal()">
                            <i class="fa-brands fa-telegram"></i>
                            <div class="sec-content">
                                <span class="sec-title">القنوات المهمة</span>
                                <span class="sec-desc">دليلك لأهم جروبات وقنوات التليجرام بالتحصيلي</span>
                            </div>
                        </a>
                    </div>"""

for html_file in ['index.html', 'schedule.html', 'library.html', 'tips.html']:
    with open(html_file, 'r', encoding='utf-8') as f:
        c = f.read()
    
    # Replace the modal grid
    pattern = re.compile(r'<div class="sections-grid">.*?</div>\s*</div>\s*</div>', re.DOTALL)
    replacement = new_grid + "\n                </div>\n            </div>"
    c = re.sub(pattern, replacement, c)
    
    # Cache bust css
    c = c.replace('style.css?v=19', 'style.css?v=20')

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(c)
