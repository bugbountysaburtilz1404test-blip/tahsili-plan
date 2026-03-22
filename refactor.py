import sys, re

def remove_sect(c, start, end):
    pattern = re.compile(start + '.*?' + end, re.DOTALL)
    # just replace with empty string or the end marker? 
    # if I replace with empty, the end marker is gone. 
    # in the previous script I replaced with end marker.
    # if end marker has regex, re.sub parses it as groups, which errors.
    # So I will use a literal replace using string.find instead for safety.
    idx1 = c.find(start)
    idx2 = c.find(end)
    if idx1 != -1 and idx2 != -1:
        return c[:idx1] + c[idx2:]
    return c

def get_content(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def save_content(filename, c):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(c)

# --- schedule.html ---
c = get_content('schedule.html')
c = remove_sect(c, '<!-- Stats Section -->', '<!-- AI Schedule Generator Section -->')
c = remove_sect(c, '<!-- Content Hub Section -->', '<!-- Progress Tracker -->')
c = remove_sect(c, '<!-- Study Path Section -->', '<!-- Footer & Contact -->')
c = re.sub(r'<h2 class="hero-title">.*?</h2>', '<h2 class="hero-title">صانع الجداول <span class="highlight">الذكي</span></h2>', c, flags=re.DOTALL)
c = re.sub(r'<p class="hero-subtitle">.*?</p>', '<p class="hero-subtitle">ارسم مسار نجاحك مفصلاً بالذكاء الاصطناعي</p>', c, flags=re.DOTALL)
c = re.sub(r'<div class="hero-buttons">.*?</div>\s*</div>\s*</header>', '</div>\n        </div>\n    </header>', c, flags=re.DOTALL)
c = re.sub(r'<div class="free-notice glass-card">.*?</div>', '', c, flags=re.DOTALL)
c = re.sub(r'<!-- Sections Modal -->.*?</div>\s*</div>\s*</div>', '', c, flags=re.DOTALL)
save_content('schedule.html', c)

# --- library.html ---
c = get_content('library.html')
c = remove_sect(c, '<!-- Stats Section -->', '<!-- Content Hub Section -->')
c = remove_sect(c, '<!-- Progress Tracker -->', '<!-- Study Path Section -->')
c = remove_sect(c, '<!-- Study Path Section -->', '<!-- Channels Section -->')
c = re.sub(r'<h2 class="hero-title">.*?</h2>', '<h2 class="hero-title">المكتبة <span class="highlight">الشاملة</span></h2>', c, flags=re.DOTALL)
c = re.sub(r'<p class="hero-subtitle">.*?</p>', '<p class="hero-subtitle">أفضل المصادر، التجميعات، والقنوات في مكان واحد</p>', c, flags=re.DOTALL)
c = re.sub(r'<div class="hero-buttons">.*?</div>\s*</div>\s*</header>', '</div>\n        </div>\n    </header>', c, flags=re.DOTALL)
c = re.sub(r'<div class="free-notice glass-card">.*?</div>', '', c, flags=re.DOTALL)
c = re.sub(r'<!-- Sections Modal -->.*?</div>\s*</div>\s*</div>', '', c, flags=re.DOTALL)
save_content('library.html', c)

# --- tips.html ---
c = get_content('tips.html')
c = remove_sect(c, '<!-- Stats Section -->', '<!-- Exam Countdown -->')
c = remove_sect(c, '<!-- AI Schedule Generator Section -->', '<!-- Content Hub Section -->')
c = remove_sect(c, '<!-- Content Hub Section -->', '<!-- Experiences Preview Section -->')
c = remove_sect(c, '<!-- Progress Tracker -->', '<!-- Study Path Section -->')
c = remove_sect(c, '<!-- Channels Section -->', '<!-- Footer & Contact -->')
c = re.sub(r'<h2 class="hero-title">.*?</h2>', '<h2 class="hero-title">النصائح <span class="highlight">الذهبية</span></h2>', c, flags=re.DOTALL)
c = re.sub(r'<p class="hero-subtitle">.*?</p>', '<p class="hero-subtitle">خلاصة تجارب ناجحة لتختصر عليك الطريق</p>', c, flags=re.DOTALL)
c = re.sub(r'<div class="hero-buttons">.*?</div>\s*</div>\s*</header>', '</div>\n        </div>\n    </header>', c, flags=re.DOTALL)
c = re.sub(r'<div class="free-notice glass-card">.*?</div>', '', c, flags=re.DOTALL)
c = re.sub(r'<!-- Sections Modal -->.*?</div>\s*</div>\s*</div>', '', c, flags=re.DOTALL)
save_content('tips.html', c)
