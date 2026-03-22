// ══════════════════════════════════════════════════════════════
// مسارك للـ +95 — Optimized Interactive Script v3
// ══════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

    // ─── Lightweight Particles (GPU-optimized) ───
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = window.innerWidth < 768 ? 15 : 30; // Less on mobile
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resizeCanvas();
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeCanvas, 200); // Debounced resize
        });

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.s = Math.random() * 1.5 + 0.5;
                this.sx = (Math.random() - 0.5) * 0.3;
                this.sy = (Math.random() - 0.5) * 0.3;
                this.o = Math.random() * 0.3 + 0.08;
            }
            update() {
                this.x += this.sx;
                this.y += this.sy;
                if (this.x < 0 || this.x > w) this.sx *= -1;
                if (this.y < 0 || this.y > h) this.sy *= -1;
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, w, h);
            // Batch draw all particles
            ctx.fillStyle = 'rgba(126, 200, 139, 0.2)';
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                ctx.globalAlpha = p.o;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, 6.2832);
                ctx.fill();
            }
            // Draw connecting lines (optimized: skip sqrt, use squared distance)
            ctx.globalAlpha = 1;
            ctx.lineWidth = 0.4;
            const maxDist2 = 18000; // ~134px squared
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < maxDist2) {
                        ctx.strokeStyle = `rgba(126,200,139,${0.05 * (1 - d2 / maxDist2)})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ─── Hamburger Menu ───
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function closeMenu() {
        if (!hamburger) return;
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                hamburger.classList.add('active');
                navLinks.classList.add('open');
                if (mobileOverlay) mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    if (navLinks) navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // ─── Navbar Scroll + Back to Top (single listener) ───
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(() => {
                if (navbar) navbar.classList.toggle('scrolled', lastScrollY > 80);
                if (backToTop) backToTop.classList.toggle('visible', lastScrollY > 500);
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Scroll Animations (Intersection Observer) ───
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length) {
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // ─── Animated Stat Counters ───
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        el.textContent = current.toLocaleString('ar-SA');
                        if (progress < 1) requestAnimationFrame(updateCounter);
                        else el.textContent = target.toLocaleString('ar-SA') + '+';
                    }
                    requestAnimationFrame(updateCounter);
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(s => statsObserver.observe(s));
    }

    // ─── Confetti Helper ───
    function spawnConfetti(x, y) {
        const colors = ['#22c55e', '#7EC88B', '#E8A849', '#5BA8C8', '#fbbf24', '#a78bfa'];
        for (let i = 0; i < 30; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
            piece.style.top = (y + (Math.random() - 0.5) * 50) + 'px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.width = (Math.random() * 8 + 4) + 'px';
            piece.style.height = (Math.random() * 8 + 4) + 'px';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 1600);
        }
    }

    // ─── AI Schedule Generator ───
    const aiForm = document.getElementById('aiForm');
    const loadingState = document.getElementById('loading');
    const resultBox = document.getElementById('aiResult');
    
    if (aiForm) {
        const submitBtn = aiForm.querySelector('button[type="submit"]');
        const aiProgressBar = document.getElementById('ai-progress');
        const aiProgressFill = document.getElementById('ai-progress-fill');

        aiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('studentName').value;
            const level = document.getElementById('studentLevel').value;
            const days = document.getElementById('studyDays').value;

            submitBtn.style.display = 'none';
            resultBox.classList.add('hidden');
            loadingState.classList.remove('hidden');
            aiProgressBar.classList.remove('hidden');

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress > 90) progress = 90;
                aiProgressFill.style.width = progress + '%';
            }, 300);

            setTimeout(() => {
                clearInterval(progressInterval);
                aiProgressFill.style.width = '100%';

                setTimeout(() => {
                    loadingState.classList.add('hidden');
                    aiProgressBar.classList.add('hidden');
                    aiProgressFill.style.width = '0%';
                    submitBtn.style.display = 'flex';
                    submitBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> إعادة التوليد';

                    let planText = '';
                    if (level === 'beginner') {
                        planText = `كطالب في البداية وتحتاج للوصول للـ +95 خلال ${days} يوماً، يجب التركيز ٦٠٪ على مرحلة التأسيس (فهم المفاهيم من ناصر عبدالكريم أو يلو) و ٤٠٪ للتدريب على التجميعات.`;
                    } else if (level === 'intermediate') {
                        planText = `مستواك ممتاز يا ${name}! وضعك الحالي يتيح لك تقسيم الـ ${days} يوماً إلى ٤٠٪ مراجعة سريعة لنقاط الضعف و ٦٠٪ حل تجميعات مكثفة (مثل تجميعات غشام والتدريب على سرعة الحل).`;
                    } else {
                        planText = `أنت في مرحلة متقدمة وما تحتاجه في الـ ${days} يوم المتبقية هو ١٠٠٪ تدريب على تسريبات وأصعب أفكار التجميعات، بالإضافة لمراجعة دورية لقوانين الدفتر الخارجي لضمان عدم النسيان.`;
                    }

                    resultBox.innerHTML = `
                        <h3 style="color: var(--accent-primary); margin-bottom: 10px;">
                            <i class="fa-solid fa-check-circle"></i> تم بناء خطتك بنجاح يا ${name}!
                        </h3>
                        <p style="margin-bottom: 15px;">بناءً على المعطيات التي أدخلتها، هذا هو المسار الأمثل لك:</p>
                        <div style="background: rgba(0,0,0,0.35); padding: 20px; border-radius: 16px; border-right: 4px solid var(--accent-primary);">
                            <p><strong style="color:var(--accent-secondary)">⚡ استراتيجية المذاكرة:</strong> ${planText}</p>
                            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.08); margin: 12px 0;">
                            <p style="font-size: 0.9em; color: var(--text-secondary);">
                            <i class="fa-solid fa-lightbulb" style="color:#fbbf24;"></i> نصيحة إضافية: لا تنسَ أن الأحياء تعتمد على الحفظ المستمر، خصص لها وقتاً قبل النوم يومياً.
                            </p>
                        </div>
                    `;
                    resultBox.classList.remove('hidden');
                    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Confetti on generate
                    const rect = submitBtn.getBoundingClientRect();
                    spawnConfetti(rect.left + rect.width / 2, rect.top);
                }, 400);
            }, 2200);
        });
    }

    // ─── Exam Countdown Timer ───
    const countdownEl = document.getElementById('exam-countdown');
    if (countdownEl) {
        // Tahsili exam dates — update yearly
        const examDates = [
            new Date('2026-06-10T08:00:00+03:00'), // Period 1
            new Date('2026-06-20T08:00:00+03:00'), // Period 2
        ];
        
        function updateCountdown() {
            const now = new Date();
            let targetDate = null;
            let periodLabel = '';
            
            for (let i = 0; i < examDates.length; i++) {
                if (examDates[i] > now) {
                    targetDate = examDates[i];
                    periodLabel = i === 0 ? 'الفترة الأولى' : 'الفترة الثانية';
                    break;
                }
            }
            
            if (!targetDate) {
                countdownEl.innerHTML = '<span class="countdown-label">انتهت فترات الاختبار لهذا العام 🎉</span>';
                return;
            }
            
            const diff = targetDate - now;
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            
            countdownEl.innerHTML = `
                <span class="countdown-label"><i class="fa-solid fa-clock"></i> ${periodLabel}</span>
                <div class="countdown-boxes">
                    <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-unit">يوم</span></div>
                    <div class="cd-sep">:</div>
                    <div class="cd-box"><span class="cd-num">${hours}</span><span class="cd-unit">ساعة</span></div>
                    <div class="cd-sep">:</div>
                    <div class="cd-box"><span class="cd-num">${mins}</span><span class="cd-unit">دقيقة</span></div>
                </div>
            `;
        }
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }

    // ─── Daily Motivational Quote ───
    const quoteEl = document.getElementById('daily-quote');
    if (quoteEl) {
        const quotes = [
            '"المراجعة أهم من المذاكرة نفسها" — بدون مراجعة = كأنك ما ذاكرت!',
            '"إذا شعرت بالتردد أو الكسل — عدّ إلى 5 ثم تحرّك فوراً!"',
            '"لازم يكون عندك طموح. قول ليش في غيري جابو 100 وأنا لا؟"',
            '"٦٥% من الأسئلة نسخ لصق من التجميعات!" — ركّز على غشام',
            '"أكبر غلط إنك تذاكر قدرات وتحصيلي مع بعض" — واحد واحد!',
            '"الأحياء ٩٩% من أسئلته منسوخة من التجميعات بالحرف!"',
            '"تحطمت كثير لكن أمي قالت: تختبرين يعني تختبرين" — وجابت ١٠٠!',
            '"التسريبات: محمد ثم محمد ثم محمد — طلع من الاختبار لقى أسئلته عنده!"',
            '"اقرأ الأسئلة أولاً قبل الدرس — عقلك لا إرادياً يحدد المواضيع المهمة"',
            '"خصص دفتر خارجي للقوانين وراجعه يومياً — هذي الحركة فادتني مرة!"',
            '"كل ساعة بالمذاكرة قاعدة ترفع درجتك — لا تستهين بأي وقت!"',
            '"ما فيه شي اسمه متأخر — في ناس بدأوا بشهر ونص وجابوا +95!"',
        ];
        const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
        quoteEl.textContent = quotes[dayIndex];
    }

    // ─── Quick Progress Tracker (localStorage) ───
    const progressTracker = document.getElementById('progress-tracker');
    if (progressTracker) {
        const subjects = [
            { key: 'math', name: 'الرياضيات', icon: 'fa-calculator' },
            { key: 'physics', name: 'الفيزياء', icon: 'fa-atom' },
            { key: 'chemistry', name: 'الكيمياء', icon: 'fa-flask' },
            { key: 'biology', name: 'الأحياء', icon: 'fa-dna' },
        ];

        function getProgress() {
            try {
                return JSON.parse(localStorage.getItem('tahsili-progress') || '{}');
            } catch { return {}; }
        }

        function saveProgress(data) {
            localStorage.setItem('tahsili-progress', JSON.stringify(data));
        }

        function renderProgress() {
            const data = getProgress();
            let html = '';
            subjects.forEach(sub => {
                const val = data[sub.key] || 0;
                html += `
                    <div class="prog-item">
                        <div class="prog-header">
                            <span><i class="fa-solid ${sub.icon}"></i> ${sub.name}</span>
                            <span class="prog-pct">${val}%</span>
                        </div>
                        <div class="prog-bar-bg">
                            <div class="prog-bar-fill" style="width:${val}%"></div>
                        </div>
                        <input type="range" min="0" max="100" value="${val}" class="prog-slider" data-key="${sub.key}">
                    </div>
                `;
            });
            progressTracker.innerHTML = html;

            // Bind sliders
            progressTracker.querySelectorAll('.prog-slider').forEach(slider => {
                slider.addEventListener('input', (e) => {
                    const key = e.target.dataset.key;
                    const val = parseInt(e.target.value);
                    const data = getProgress();
                    data[key] = val;
                    saveProgress(data);
                    // Update display
                    const item = e.target.closest('.prog-item');
                    item.querySelector('.prog-pct').textContent = val + '%';
                    item.querySelector('.prog-bar-fill').style.width = val + '%';
                });
            });
        }
        renderProgress();
    }

});
