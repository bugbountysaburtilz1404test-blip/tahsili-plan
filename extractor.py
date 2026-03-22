import os
import re

IN = r"c:\Users\pc\Documents\tel\تعريف"
OUT_DIR = r"c:\Users\pc\Documents\tel\مصادر خام"

os.makedirs(OUT_DIR, exist_ok=True)

with open(IN, "r", encoding="utf-8") as f:
    raw = f.read()

msgs = [m.strip() for m in raw.split("====================") if m.strip()]

cats = {
    "1-تجارب_الطلاب": [],
    "2-نصائح_ذهبية": [],
    "3-مصادر_وشروحات": [],
    "4-تسريبات_وتجميعات": [],
    "5-جداول_وخطط_مذاكرة": [],
    "6-تحفيز": [],
    "7-أسئلة_وأجوبة_متفرقة": []
}

def clean_msg(msg):
    lines = msg.split('\n')
    lines = [l.strip() for l in lines if l.strip()]
    content = [l for l in lines if not re.match(r'^[\d,.]+[KM]?$', l) and not re.match(r'^\d{2}:\d{2}\s*(AM|PM)$', l) and not re.match(r'^edited', l) and not re.match(r'^\d+$', l)]
    return '\n'.join(content)

for raw_msg in msgs:
    msg = clean_msg(raw_msg)
    if len(msg) < 50:
        continue
    
    # Keyword detection
    is_exp = bool(re.search(r'(تجربتي|تجربة|درجتي|حصلت على|المئوية|١٠٠|٩٩|٩٨|99|100|98|دفعة)', msg))
    is_tip = bool(re.search(r'(نصيحة|نصائح|أنصحك|مهم جدا|انتبه|تنبيه|غلطتي|غلطة|نصيحتي)', msg))
    is_src = bool(re.search(r'(يلو|ناصر عبدالكريم|غشام|المعاصر|فرح إبراهيم|أينشتاين|محمد العمري|أحمد سكول|النبلاء|كتاب|دورة|مقطع)', msg))
    is_leak = bool(re.search(r'(تسريب|تسريبات|تجميع|تجميعات|الحوت|الكنز|بصمة فرح|جهاد|سايفر)', msg))
    is_plan = bool(re.search(r'(جدول|خطة|أيام|شهر|شهرين|أسبوع|نظم وقتك|تقسيم)', msg))
    is_mot = bool(re.search(r'(لا تستسلم|توكل|يأس|طموح|حلم|دعاء|الوتر|استجابة|مستقبلك|تفائل|اجتهد)', msg))
    is_faq = bool(re.search(r'(كيف|متى|هل|طريقة|رأيكم|استفسار|سوال|سؤال)', msg))

    # Determine primary category based on priority
    # Experience (Long + Keywords)
    if is_exp and len(msg) > 300:
        cats["1-تجارب_الطلاب"].append(msg)
    elif is_mot and len(msg) > 100 and not is_src and not is_leak:
        cats["6-تحفيز"].append(msg)
    elif is_leak and len(msg) > 100:
        cats["4-تسريبات_وتجميعات"].append(msg)
    elif is_plan and len(msg) > 100:
        cats["5-جداول_وخطط_مذاكرة"].append(msg)
    elif is_src and len(msg) > 100:
        cats["3-مصادر_وشروحات"].append(msg)
    elif is_tip and len(msg) > 60:
        cats["2-نصائح_ذهبية"].append(msg)
    elif is_faq and len(msg) > 80:
        cats["7-أسئلة_وأجوبة_متفرقة"].append(msg)
    elif len(msg) > 200:
        cats["7-أسئلة_وأجوبة_متفرقة"].append(msg)

for c, items in cats.items():
    if not items: continue
    # Sort by length descending, as longer usually means more detailed/better
    items.sort(key=len, reverse=True)
    with open(os.path.join(OUT_DIR, f"{c}.md"), "w", encoding="utf-8") as f:
        title = c.split('-')[1].replace('_', ' ')
        f.write(f"# {title}\n\n")
        f.write(f"> تم استخراج وتصنيف {len(items)} رسالة/فقرة في هذا الملف.\n\n")
        
        for i, item in enumerate(items):
            f.write(f"## {i+1}\n\n")
            f.write(item)
            f.write("\n\n---\n\n")

print(f"Extraction successful. Categories created in {OUT_DIR}")
for c, i in cats.items():
    print(f"{c}: {len(i)} items")
