// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // AI Schedule Generator Logic
    const aiForm = document.getElementById('aiForm');
    const loadingState = document.getElementById('loading');
    const aiResult = document.getElementById('aiResult');
    const resultBox = document.getElementById('aiResult');
    const submitBtn = aiForm.querySelector('button');

    aiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form Values
        const name = document.getElementById('studentName').value;
        const level = document.getElementById('studentLevel').value;
        const days = document.getElementById('studyDays').value;
        
        // UI Updates
        submitBtn.style.display = 'none';
        aiResult.classList.add('hidden');
        loadingState.classList.remove('hidden');
        
        // Simulate AI Processing Network Request
        setTimeout(() => {
            loadingState.classList.add('hidden');
            submitBtn.style.display = 'block';
            submitBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> إعادة التوليد';
            
            // Build the dynamic response based on inputs
            let planText = ``;
            if (level === 'beginner') {
                planText = `كطالب في البداية وتحتاج للوصول للـ +95 خلال ${days} يوماً، يجب التركيز ٦٠٪ على مرحلة التأسيس (فهم المفاهيم من ناصر عبدالكريم أو يلو) و ٤٠٪ للتدريب على التجميعات.`;
            } else if (level === 'intermediate') {
                planText = `مستواك ممتاز يا ${name}! وضعك الحالي يتيح لك تقسيم الـ ${days} يوماً إلى ٤٠٪ مراجعة سريعة لنقاط الضعف و ٦٠٪ حل تجميعات مكثفة (مثل تجميعات غشام والتدريب على سرعة الحل).`;
            } else {
                planText = `أنت في مرحلة متقدمة وما تحتاجه في الـ ${days} يوم المتبقية هو ١٠٠٪ تدريب على تسريبات وأصعب أفكار التجميعات، بالإضافة لمراجعة دورية لقوانين الدفتر الخارجي لضمان عدم النسيان.`;
            }

            const htmlResponse = `
                <h3 style="color: var(--accent-primary); margin-bottom: 10px;">
                    <i class="fa-solid fa-check-circle"></i> تم بناء خطتك بنجاح يا ${name}!
                </h3>
                <p style="margin-bottom: 15px;">بناءً على المعطيات التي أدخلتها، هذا هو المسار الأمثل لك:</p>
                <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; border-left: 3px solid var(--accent-purple);">
                    <p><strong>استراتيجية المذاكرة:</strong> ${planText}</p>
                    <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                    <p style="font-size: 0.9em; color: var(--text-secondary);">
                    <i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i> نصيحة إضافية: لا تنسَ أن الأحياء تعتمد على الحفظ المستمر، خصص لها وقتاً قبل النوم يومياً.
                    </p>
                </div>
            `;
            
            resultBox.innerHTML = htmlResponse;
            resultBox.classList.remove('hidden');
            
            // Scroll down a bit to see the result
            resultBox.scrollIntoView({behavior: "smooth", block: "nearest"});
            
        }, 2000); // 2 second mock delay
    });
});
