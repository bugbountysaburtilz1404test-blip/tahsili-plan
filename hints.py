def add_hint(filename):
    with open(filename, 'r', encoding='utf-8') as f: c = f.read()
    
    # Library replacements
    if 'دليل المصادر الشامل' in c and '(انقر للدخول)' not in c:
        c = c.replace('<h3>دليل المصادر الشامل</h3>', '<h3>دليل المصادر الشامل <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للدخول)</span></h3>')
        c = c.replace('<h3>الأسئلة الشائعة</h3>', '<h3>الأسئلة الشائعة <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للإجابة)</span></h3>')
        c = c.replace('<h3>تجارب المتفوقين</h3>', '<h3>تجارب المتفوقين <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للقصص)</span></h3>')
        
    c = c.replace('<span class="channel-subs"><i class="fa-solid fa-users"></i> +5K</span>', '<span class="channel-subs"><i class="fa-solid fa-users"></i> +5K <span style="margin-right:10px; color:var(--accent-secondary); font-size:0.85rem;">👈 انقر للدخول</span></span>')
    c = c.replace('<span class="channel-subs"><i class="fa-solid fa-users"></i> +10K</span>', '<span class="channel-subs"><i class="fa-solid fa-users"></i> +10K <span style="margin-right:10px; color:var(--accent-secondary); font-size:0.85rem;">👈 انقر للدخول</span></span>')
    c = c.replace('<span class="channel-subs"><i class="fa-solid fa-users"></i> +8K</span>', '<span class="channel-subs"><i class="fa-solid fa-users"></i> +8K <span style="margin-right:10px; color:var(--accent-secondary); font-size:0.85rem;">👈 انقر للدخول</span></span>')
    c = c.replace('<span class="channel-subs"><i class="fa-solid fa-users"></i> +3K</span>', '<span class="channel-subs"><i class="fa-solid fa-users"></i> +3K <span style="margin-right:10px; color:var(--accent-secondary); font-size:0.85rem;">👈 انقر للدخول</span></span>')

    # Tips / Experiences replacements
    c = c.replace('<h3>معاذ — الدرجة الكاملة</h3>', '<h3>معاذ — الدرجة الكاملة <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للقراءة)</span></h3>')
    c = c.replace('<h3>عبدالعزيز — مئوية بالفترتين!</h3>', '<h3>عبدالعزيز — مئوية بالفترتين! <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للقراءة)</span></h3>')
    c = c.replace('<h3>فهد — ٩٩ بالمنهج الصح</h3>', '<h3>فهد — ٩٩ بالمنهج الصح <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للقراءة)</span></h3>')
    c = c.replace('<h3>طالبة — من متأخرة لمئوية!</h3>', '<h3>طالبة — من متأخرة لمئوية! <span style="font-size:0.8rem; color:var(--accent-secondary); font-weight:normal;">(انقر للقراءة)</span></h3>')

    with open(filename, 'w', encoding='utf-8') as f: f.write(c)

import glob
for fn in glob.glob('*.html'):
    add_hint(fn)
