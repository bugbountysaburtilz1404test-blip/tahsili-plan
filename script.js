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

    // Quiz System Logic
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizArena = document.getElementById('quiz-arena');
    const questionImg = document.getElementById('question-img');
    const optionsBtns = document.querySelectorAll('.btn-option');
    const answerFeedback = document.getElementById('answer-feedback');
    const nextQBtn = document.getElementById('next-q-btn');
    const qCounterEl = document.getElementById('q-counter');
    const qTotalEl = document.getElementById('q-total');
    const qScoreEl = document.getElementById('q-score');

    let quizData = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // Fetch quiz data
    
    // المدمجة لتعمل بدون انترنت (Local Storage Data)
    const rawData = [
    {
        "id": 1,
        "image": "quiz_data/q_1.png",
        "answer": "ج"
    },
    {
        "id": 2,
        "image": "quiz_data/q_2.png",
        "answer": "ج"
    },
    {
        "id": 3,
        "image": "quiz_data/q_3.png",
        "answer": "أ"
    },
    {
        "id": 4,
        "image": "quiz_data/q_4.png",
        "answer": "ج"
    },
    {
        "id": 5,
        "image": "quiz_data/q_5.png",
        "answer": "أ"
    },
    {
        "id": 6,
        "image": "quiz_data/q_6.png",
        "answer": "ب"
    },
    {
        "id": 7,
        "image": "quiz_data/q_7.png",
        "answer": "أ"
    },
    {
        "id": 8,
        "image": "quiz_data/q_8.png",
        "answer": "د"
    },
    {
        "id": 9,
        "image": "quiz_data/q_9.png",
        "answer": "ب"
    },
    {
        "id": 10,
        "image": "quiz_data/q_10.png",
        "answer": "ب"
    },
    {
        "id": 14,
        "image": "quiz_data/q_14.png",
        "answer": "ب"
    },
    {
        "id": 15,
        "image": "quiz_data/q_15.png",
        "answer": "أ"
    },
    {
        "id": 19,
        "image": "quiz_data/q_19.png",
        "answer": "أ"
    },
    {
        "id": 20,
        "image": "quiz_data/q_20.png",
        "answer": "أ"
    },
    {
        "id": 21,
        "image": "quiz_data/q_21.png",
        "answer": "ب"
    },
    {
        "id": 22,
        "image": "quiz_data/q_22.png",
        "answer": "ب"
    },
    {
        "id": 23,
        "image": "quiz_data/q_23.png",
        "answer": "أ"
    },
    {
        "id": 24,
        "image": "quiz_data/q_24.png",
        "answer": "ج"
    },
    {
        "id": 25,
        "image": "quiz_data/q_25.png",
        "answer": "ب"
    },
    {
        "id": 26,
        "image": "quiz_data/q_26.png",
        "answer": "د"
    },
    {
        "id": 27,
        "image": "quiz_data/q_27.png",
        "answer": "ج"
    },
    {
        "id": 33,
        "image": "quiz_data/q_33.png",
        "answer": "أ"
    },
    {
        "id": 34,
        "image": "quiz_data/q_34.png",
        "answer": "ج"
    },
    {
        "id": 35,
        "image": "quiz_data/q_35.png",
        "answer": "ب"
    },
    {
        "id": 42,
        "image": "quiz_data/q_42.png",
        "answer": "ب"
    },
    {
        "id": 43,
        "image": "quiz_data/q_43.png",
        "answer": "ج"
    },
    {
        "id": 44,
        "image": "quiz_data/q_44.png",
        "answer": "ج"
    },
    {
        "id": 46,
        "image": "quiz_data/q_46.png",
        "answer": "ج"
    },
    {
        "id": 47,
        "image": "quiz_data/q_47.png",
        "answer": "أ"
    },
    {
        "id": 48,
        "image": "quiz_data/q_48.png",
        "answer": "أ"
    },
    {
        "id": 49,
        "image": "quiz_data/q_49.png",
        "answer": "ب"
    },
    {
        "id": 50,
        "image": "quiz_data/q_50.png",
        "answer": "أ"
    },
    {
        "id": 51,
        "image": "quiz_data/q_51.png",
        "answer": "د"
    },
    {
        "id": 52,
        "image": "quiz_data/q_52.png",
        "answer": "ج"
    },
    {
        "id": 53,
        "image": "quiz_data/q_53.png",
        "answer": "ج"
    },
    {
        "id": 54,
        "image": "quiz_data/q_54.png",
        "answer": "ج"
    },
    {
        "id": 55,
        "image": "quiz_data/q_55.png",
        "answer": "أ"
    },
    {
        "id": 56,
        "image": "quiz_data/q_56.png",
        "answer": "ج"
    },
    {
        "id": 61,
        "image": "quiz_data/q_61.png",
        "answer": "د"
    },
    {
        "id": 63,
        "image": "quiz_data/q_63.png",
        "answer": "د"
    },
    {
        "id": 64,
        "image": "quiz_data/q_64.png",
        "answer": "ب"
    },
    {
        "id": 65,
        "image": "quiz_data/q_65.png",
        "answer": "أ"
    },
    {
        "id": 66,
        "image": "quiz_data/q_66.png",
        "answer": "ج"
    },
    {
        "id": 67,
        "image": "quiz_data/q_67.png",
        "answer": "ج"
    },
    {
        "id": 70,
        "image": "quiz_data/q_70.png",
        "answer": "ب"
    },
    {
        "id": 71,
        "image": "quiz_data/q_71.png",
        "answer": "ب"
    },
    {
        "id": 76,
        "image": "quiz_data/q_76.png",
        "answer": "ب"
    },
    {
        "id": 77,
        "image": "quiz_data/q_77.png",
        "answer": "ب"
    },
    {
        "id": 78,
        "image": "quiz_data/q_78.png",
        "answer": "أ"
    },
    {
        "id": 79,
        "image": "quiz_data/q_79.png",
        "answer": "ب"
    },
    {
        "id": 80,
        "image": "quiz_data/q_80.png",
        "answer": "د"
    },
    {
        "id": 81,
        "image": "quiz_data/q_81.png",
        "answer": "ج"
    },
    {
        "id": 82,
        "image": "quiz_data/q_82.png",
        "answer": "ب"
    },
    {
        "id": 83,
        "image": "quiz_data/q_83.png",
        "answer": "د"
    },
    {
        "id": 84,
        "image": "quiz_data/q_84.png",
        "answer": "ج"
    },
    {
        "id": 85,
        "image": "quiz_data/q_85.png",
        "answer": "ب"
    },
    {
        "id": 86,
        "image": "quiz_data/q_86.png",
        "answer": "د"
    },
    {
        "id": 87,
        "image": "quiz_data/q_87.png",
        "answer": "أ"
    },
    {
        "id": 88,
        "image": "quiz_data/q_88.png",
        "answer": "د"
    },
    {
        "id": 89,
        "image": "quiz_data/q_89.png",
        "answer": "ب"
    },
    {
        "id": 90,
        "image": "quiz_data/q_90.png",
        "answer": "ب"
    },
    {
        "id": 91,
        "image": "quiz_data/q_91.png",
        "answer": "ب"
    },
    {
        "id": 92,
        "image": "quiz_data/q_92.png",
        "answer": "أ"
    },
    {
        "id": 93,
        "image": "quiz_data/q_93.png",
        "answer": "د"
    },
    {
        "id": 94,
        "image": "quiz_data/q_94.png",
        "answer": "أ"
    },
    {
        "id": 95,
        "image": "quiz_data/q_95.png",
        "answer": "ج"
    },
    {
        "id": 96,
        "image": "quiz_data/q_96.png",
        "answer": "ب"
    },
    {
        "id": 111,
        "image": "quiz_data/q_111.png",
        "answer": "أ"
    },
    {
        "id": 114,
        "image": "quiz_data/q_114.png",
        "answer": "ب"
    },
    {
        "id": 115,
        "image": "quiz_data/q_115.png",
        "answer": "ج"
    },
    {
        "id": 117,
        "image": "quiz_data/q_117.png",
        "answer": "د"
    },
    {
        "id": 118,
        "image": "quiz_data/q_118.png",
        "answer": "ب"
    },
    {
        "id": 119,
        "image": "quiz_data/q_119.png",
        "answer": "ب"
    },
    {
        "id": 120,
        "image": "quiz_data/q_120.png",
        "answer": "أ"
    },
    {
        "id": 121,
        "image": "quiz_data/q_121.png",
        "answer": "أ"
    },
    {
        "id": 122,
        "image": "quiz_data/q_122.png",
        "answer": "ج"
    },
    {
        "id": 123,
        "image": "quiz_data/q_123.png",
        "answer": "د"
    },
    {
        "id": 124,
        "image": "quiz_data/q_124.png",
        "answer": "ج"
    },
    {
        "id": 125,
        "image": "quiz_data/q_125.png",
        "answer": "ب"
    },
    {
        "id": 127,
        "image": "quiz_data/q_127.png",
        "answer": "ب"
    },
    {
        "id": 128,
        "image": "quiz_data/q_128.png",
        "answer": "أ"
    },
    {
        "id": 136,
        "image": "quiz_data/q_136.png",
        "answer": "ج"
    },
    {
        "id": 137,
        "image": "quiz_data/q_137.png",
        "answer": "ب"
    },
    {
        "id": 138,
        "image": "quiz_data/q_138.png",
        "answer": "ج"
    },
    {
        "id": 139,
        "image": "quiz_data/q_139.png",
        "answer": "ب"
    },
    {
        "id": 140,
        "image": "quiz_data/q_140.png",
        "answer": "د"
    },
    {
        "id": 141,
        "image": "quiz_data/q_141.png",
        "answer": "ج"
    },
    {
        "id": 146,
        "image": "quiz_data/q_146.png",
        "answer": "ب"
    },
    {
        "id": 150,
        "image": "quiz_data/q_150.png",
        "answer": "د"
    },
    {
        "id": 152,
        "image": "quiz_data/q_152.png",
        "answer": "أ"
    },
    {
        "id": 153,
        "image": "quiz_data/q_153.png",
        "answer": "أ"
    },
    {
        "id": 158,
        "image": "quiz_data/q_158.png",
        "answer": "ج"
    },
    {
        "id": 159,
        "image": "quiz_data/q_159.png",
        "answer": "ج"
    },
    {
        "id": 160,
        "image": "quiz_data/q_160.png",
        "answer": "أ"
    },
    {
        "id": 162,
        "image": "quiz_data/q_162.png",
        "answer": "أ"
    },
    {
        "id": 163,
        "image": "quiz_data/q_163.png",
        "answer": "ب"
    },
    {
        "id": 164,
        "image": "quiz_data/q_164.png",
        "answer": "ج"
    },
    {
        "id": 165,
        "image": "quiz_data/q_165.png",
        "answer": "أ"
    },
    {
        "id": 166,
        "image": "quiz_data/q_166.png",
        "answer": "أ"
    },
    {
        "id": 167,
        "image": "quiz_data/q_167.png",
        "answer": "ب"
    },
    {
        "id": 168,
        "image": "quiz_data/q_168.png",
        "answer": "ب"
    },
    {
        "id": 169,
        "image": "quiz_data/q_169.png",
        "answer": "د"
    },
    {
        "id": 170,
        "image": "quiz_data/q_170.png",
        "answer": "ج"
    },
    {
        "id": 171,
        "image": "quiz_data/q_171.png",
        "answer": "ب"
    },
    {
        "id": 172,
        "image": "quiz_data/q_172.png",
        "answer": "ج"
    },
    {
        "id": 173,
        "image": "quiz_data/q_173.png",
        "answer": "ج"
    },
    {
        "id": 182,
        "image": "quiz_data/q_182.png",
        "answer": "أ"
    },
    {
        "id": 184,
        "image": "quiz_data/q_184.png",
        "answer": "ج"
    },
    {
        "id": 185,
        "image": "quiz_data/q_185.png",
        "answer": "أ"
    },
    {
        "id": 186,
        "image": "quiz_data/q_186.png",
        "answer": "أ"
    },
    {
        "id": 187,
        "image": "quiz_data/q_187.png",
        "answer": "ج"
    },
    {
        "id": 192,
        "image": "quiz_data/q_192.png",
        "answer": "ج"
    },
    {
        "id": 193,
        "image": "quiz_data/q_193.png",
        "answer": "ب"
    },
    {
        "id": 194,
        "image": "quiz_data/q_194.png",
        "answer": "ب"
    },
    {
        "id": 195,
        "image": "quiz_data/q_195.png",
        "answer": "أ"
    },
    {
        "id": 196,
        "image": "quiz_data/q_196.png",
        "answer": "ج"
    },
    {
        "id": 197,
        "image": "quiz_data/q_197.png",
        "answer": "أ"
    },
    {
        "id": 199,
        "image": "quiz_data/q_199.png",
        "answer": "أ"
    },
    {
        "id": 200,
        "image": "quiz_data/q_200.png",
        "answer": "د"
    },
    {
        "id": 201,
        "image": "quiz_data/q_201.png",
        "answer": "أ"
    },
    {
        "id": 203,
        "image": "quiz_data/q_203.png",
        "answer": "ب"
    },
    {
        "id": 212,
        "image": "quiz_data/q_212.png",
        "answer": "أ"
    },
    {
        "id": 213,
        "image": "quiz_data/q_213.png",
        "answer": "ج"
    },
    {
        "id": 223,
        "image": "quiz_data/q_223.png",
        "answer": "د"
    },
    {
        "id": 225,
        "image": "quiz_data/q_225.png",
        "answer": "ب"
    },
    {
        "id": 226,
        "image": "quiz_data/q_226.png",
        "answer": "ج"
    },
    {
        "id": 227,
        "image": "quiz_data/q_227.png",
        "answer": "أ"
    },
    {
        "id": 228,
        "image": "quiz_data/q_228.png",
        "answer": "أ"
    },
    {
        "id": 229,
        "image": "quiz_data/q_229.png",
        "answer": "أ"
    },
    {
        "id": 230,
        "image": "quiz_data/q_230.png",
        "answer": "أ"
    },
    {
        "id": 231,
        "image": "quiz_data/q_231.png",
        "answer": "ج"
    },
    {
        "id": 233,
        "image": "quiz_data/q_233.png",
        "answer": "ج"
    },
    {
        "id": 237,
        "image": "quiz_data/q_237.png",
        "answer": "ج"
    },
    {
        "id": 242,
        "image": "quiz_data/q_242.png",
        "answer": "ج"
    },
    {
        "id": 243,
        "image": "quiz_data/q_243.png",
        "answer": "ب"
    },
    {
        "id": 244,
        "image": "quiz_data/q_244.png",
        "answer": "ب"
    },
    {
        "id": 251,
        "image": "quiz_data/q_251.png",
        "answer": "ب"
    },
    {
        "id": 252,
        "image": "quiz_data/q_252.png",
        "answer": "ب"
    },
    {
        "id": 253,
        "image": "quiz_data/q_253.png",
        "answer": "د"
    },
    {
        "id": 254,
        "image": "quiz_data/q_254.png",
        "answer": "ج"
    },
    {
        "id": 255,
        "image": "quiz_data/q_255.png",
        "answer": "أ"
    },
    {
        "id": 256,
        "image": "quiz_data/q_256.png",
        "answer": "أ"
    },
    {
        "id": 258,
        "image": "quiz_data/q_258.png",
        "answer": "ج"
    },
    {
        "id": 259,
        "image": "quiz_data/q_259.png",
        "answer": "أ"
    },
    {
        "id": 261,
        "image": "quiz_data/q_261.png",
        "answer": "د"
    },
    {
        "id": 262,
        "image": "quiz_data/q_262.png",
        "answer": "ب"
    },
    {
        "id": 263,
        "image": "quiz_data/q_263.png",
        "answer": "أ"
    },
    {
        "id": 264,
        "image": "quiz_data/q_264.png",
        "answer": "ج"
    },
    {
        "id": 265,
        "image": "quiz_data/q_265.png",
        "answer": "ب"
    },
    {
        "id": 266,
        "image": "quiz_data/q_266.png",
        "answer": "د"
    },
    {
        "id": 267,
        "image": "quiz_data/q_267.png",
        "answer": "أ"
    },
    {
        "id": 279,
        "image": "quiz_data/q_279.png",
        "answer": "أ"
    },
    {
        "id": 280,
        "image": "quiz_data/q_280.png",
        "answer": "د"
    },
    {
        "id": 281,
        "image": "quiz_data/q_281.png",
        "answer": "ب"
    },
    {
        "id": 282,
        "image": "quiz_data/q_282.png",
        "answer": "ب"
    },
    {
        "id": 286,
        "image": "quiz_data/q_286.png",
        "answer": "د"
    },
    {
        "id": 287,
        "image": "quiz_data/q_287.png",
        "answer": "ج"
    },
    {
        "id": 288,
        "image": "quiz_data/q_288.png",
        "answer": "ج"
    },
    {
        "id": 289,
        "image": "quiz_data/q_289.png",
        "answer": "د"
    },
    {
        "id": 290,
        "image": "quiz_data/q_290.png",
        "answer": "أ"
    },
    {
        "id": 291,
        "image": "quiz_data/q_291.png",
        "answer": "أ"
    },
    {
        "id": 292,
        "image": "quiz_data/q_292.png",
        "answer": "أ"
    },
    {
        "id": 293,
        "image": "quiz_data/q_293.png",
        "answer": "ب"
    },
    {
        "id": 294,
        "image": "quiz_data/q_294.png",
        "answer": "أ"
    },
    {
        "id": 295,
        "image": "quiz_data/q_295.png",
        "answer": "ب"
    },
    {
        "id": 296,
        "image": "quiz_data/q_296.png",
        "answer": "د"
    },
    {
        "id": 297,
        "image": "quiz_data/q_297.png",
        "answer": "ب"
    },
    {
        "id": 298,
        "image": "quiz_data/q_298.png",
        "answer": "أ"
    },
    {
        "id": 299,
        "image": "quiz_data/q_299.png",
        "answer": "أ"
    },
    {
        "id": 301,
        "image": "quiz_data/q_301.png",
        "answer": "أ"
    },
    {
        "id": 302,
        "image": "quiz_data/q_302.png",
        "answer": "ج"
    },
    {
        "id": 311,
        "image": "quiz_data/q_311.png",
        "answer": "ب"
    },
    {
        "id": 312,
        "image": "quiz_data/q_312.png",
        "answer": "ب"
    },
    {
        "id": 313,
        "image": "quiz_data/q_313.png",
        "answer": "أ"
    },
    {
        "id": 314,
        "image": "quiz_data/q_314.png",
        "answer": "ب"
    },
    {
        "id": 315,
        "image": "quiz_data/q_315.png",
        "answer": "أ"
    },
    {
        "id": 316,
        "image": "quiz_data/q_316.png",
        "answer": "أ"
    },
    {
        "id": 317,
        "image": "quiz_data/q_317.png",
        "answer": "أ"
    },
    {
        "id": 318,
        "image": "quiz_data/q_318.png",
        "answer": "أ"
    },
    {
        "id": 319,
        "image": "quiz_data/q_319.png",
        "answer": "ج"
    },
    {
        "id": 320,
        "image": "quiz_data/q_320.png",
        "answer": "أ"
    },
    {
        "id": 321,
        "image": "quiz_data/q_321.png",
        "answer": "ج"
    },
    {
        "id": 322,
        "image": "quiz_data/q_322.png",
        "answer": "ج"
    },
    {
        "id": 323,
        "image": "quiz_data/q_323.png",
        "answer": "أ"
    },
    {
        "id": 324,
        "image": "quiz_data/q_324.png",
        "answer": "د"
    },
    {
        "id": 325,
        "image": "quiz_data/q_325.png",
        "answer": "أ"
    },
    {
        "id": 326,
        "image": "quiz_data/q_326.png",
        "answer": "ج"
    },
    {
        "id": 327,
        "image": "quiz_data/q_327.png",
        "answer": "ب"
    },
    {
        "id": 328,
        "image": "quiz_data/q_328.png",
        "answer": "ج"
    },
    {
        "id": 329,
        "image": "quiz_data/q_329.png",
        "answer": "د"
    },
    {
        "id": 330,
        "image": "quiz_data/q_330.png",
        "answer": "أ"
    },
    {
        "id": 331,
        "image": "quiz_data/q_331.png",
        "answer": "ج"
    },
    {
        "id": 332,
        "image": "quiz_data/q_332.png",
        "answer": "ب"
    },
    {
        "id": 333,
        "image": "quiz_data/q_333.png",
        "answer": "ج"
    },
    {
        "id": 334,
        "image": "quiz_data/q_334.png",
        "answer": "ب"
    },
    {
        "id": 335,
        "image": "quiz_data/q_335.png",
        "answer": "ب"
    },
    {
        "id": 336,
        "image": "quiz_data/q_336.png",
        "answer": "د"
    },
    {
        "id": 337,
        "image": "quiz_data/q_337.png",
        "answer": "أ"
    },
    {
        "id": 338,
        "image": "quiz_data/q_338.png",
        "answer": "أ"
    },
    {
        "id": 339,
        "image": "quiz_data/q_339.png",
        "answer": "ب"
    },
    {
        "id": 340,
        "image": "quiz_data/q_340.png",
        "answer": "ج"
    },
    {
        "id": 341,
        "image": "quiz_data/q_341.png",
        "answer": "ج"
    },
    {
        "id": 342,
        "image": "quiz_data/q_342.png",
        "answer": "أ"
    },
    {
        "id": 343,
        "image": "quiz_data/q_343.png",
        "answer": "د"
    },
    {
        "id": 344,
        "image": "quiz_data/q_344.png",
        "answer": "ب"
    },
    {
        "id": 345,
        "image": "quiz_data/q_345.png",
        "answer": "أ"
    },
    {
        "id": 346,
        "image": "quiz_data/q_346.png",
        "answer": "ج"
    },
    {
        "id": 347,
        "image": "quiz_data/q_347.png",
        "answer": "ب"
    },
    {
        "id": 348,
        "image": "quiz_data/q_348.png",
        "answer": "ب"
    },
    {
        "id": 349,
        "image": "quiz_data/q_349.png",
        "answer": "ج"
    },
    {
        "id": 350,
        "image": "quiz_data/q_350.png",
        "answer": "ج"
    },
    {
        "id": 351,
        "image": "quiz_data/q_351.png",
        "answer": "ب"
    },
    {
        "id": 352,
        "image": "quiz_data/q_352.png",
        "answer": "ب"
    },
    {
        "id": 353,
        "image": "quiz_data/q_353.png",
        "answer": "ب"
    },
    {
        "id": 354,
        "image": "quiz_data/q_354.png",
        "answer": "د"
    },
    {
        "id": 355,
        "image": "quiz_data/q_355.png",
        "answer": "ج"
    },
    {
        "id": 356,
        "image": "quiz_data/q_356.png",
        "answer": "د"
    },
    {
        "id": 357,
        "image": "quiz_data/q_357.png",
        "answer": "ج"
    },
    {
        "id": 358,
        "image": "quiz_data/q_358.png",
        "answer": "ج"
    },
    {
        "id": 359,
        "image": "quiz_data/q_359.png",
        "answer": "ج"
    },
    {
        "id": 360,
        "image": "quiz_data/q_360.png",
        "answer": "ب"
    },
    {
        "id": 361,
        "image": "quiz_data/q_361.png",
        "answer": "ج"
    },
    {
        "id": 362,
        "image": "quiz_data/q_362.png",
        "answer": "ب"
    },
    {
        "id": 363,
        "image": "quiz_data/q_363.png",
        "answer": "د"
    },
    {
        "id": 364,
        "image": "quiz_data/q_364.png",
        "answer": "أ"
    },
    {
        "id": 365,
        "image": "quiz_data/q_365.png",
        "answer": "ج"
    },
    {
        "id": 366,
        "image": "quiz_data/q_366.png",
        "answer": "أ"
    },
    {
        "id": 367,
        "image": "quiz_data/q_367.png",
        "answer": "د"
    },
    {
        "id": 368,
        "image": "quiz_data/q_368.png",
        "answer": "أ"
    },
    {
        "id": 369,
        "image": "quiz_data/q_369.png",
        "answer": "د"
    },
    {
        "id": 370,
        "image": "quiz_data/q_370.png",
        "answer": "ج"
    },
    {
        "id": 371,
        "image": "quiz_data/q_371.png",
        "answer": "ب"
    },
    {
        "id": 372,
        "image": "quiz_data/q_372.png",
        "answer": "د"
    },
    {
        "id": 373,
        "image": "quiz_data/q_373.png",
        "answer": "ج"
    },
    {
        "id": 374,
        "image": "quiz_data/q_374.png",
        "answer": "ب"
    },
    {
        "id": 375,
        "image": "quiz_data/q_375.png",
        "answer": "د"
    },
    {
        "id": 376,
        "image": "quiz_data/q_376.png",
        "answer": "ب"
    },
    {
        "id": 377,
        "image": "quiz_data/q_377.png",
        "answer": "ب"
    },
    {
        "id": 378,
        "image": "quiz_data/q_378.png",
        "answer": "ج"
    },
    {
        "id": 379,
        "image": "quiz_data/q_379.png",
        "answer": "ب"
    },
    {
        "id": 380,
        "image": "quiz_data/q_380.png",
        "answer": "ب"
    },
    {
        "id": 381,
        "image": "quiz_data/q_381.png",
        "answer": "ب"
    },
    {
        "id": 382,
        "image": "quiz_data/q_382.png",
        "answer": "ج"
    },
    {
        "id": 383,
        "image": "quiz_data/q_383.png",
        "answer": "د"
    },
    {
        "id": 384,
        "image": "quiz_data/q_384.png",
        "answer": "أ"
    },
    {
        "id": 385,
        "image": "quiz_data/q_385.png",
        "answer": "ج"
    },
    {
        "id": 386,
        "image": "quiz_data/q_386.png",
        "answer": "ب"
    },
    {
        "id": 387,
        "image": "quiz_data/q_387.png",
        "answer": "ب"
    },
    {
        "id": 388,
        "image": "quiz_data/q_388.png",
        "answer": "ب"
    },
    {
        "id": 389,
        "image": "quiz_data/q_389.png",
        "answer": "ج"
    },
    {
        "id": 390,
        "image": "quiz_data/q_390.png",
        "answer": "د"
    },
    {
        "id": 391,
        "image": "quiz_data/q_391.png",
        "answer": "د"
    },
    {
        "id": 392,
        "image": "quiz_data/q_392.png",
        "answer": "ب"
    },
    {
        "id": 393,
        "image": "quiz_data/q_393.png",
        "answer": "د"
    },
    {
        "id": 394,
        "image": "quiz_data/q_394.png",
        "answer": "ب"
    },
    {
        "id": 395,
        "image": "quiz_data/q_395.png",
        "answer": "ب"
    },
    {
        "id": 396,
        "image": "quiz_data/q_396.png",
        "answer": "ب"
    },
    {
        "id": 397,
        "image": "quiz_data/q_397.png",
        "answer": "د"
    },
    {
        "id": 398,
        "image": "quiz_data/q_398.png",
        "answer": "ج"
    },
    {
        "id": 399,
        "image": "quiz_data/q_399.png",
        "answer": "ب"
    },
    {
        "id": 400,
        "image": "quiz_data/q_400.png",
        "answer": "أ"
    },
    {
        "id": 401,
        "image": "quiz_data/q_401.png",
        "answer": "أ"
    },
    {
        "id": 402,
        "image": "quiz_data/q_402.png",
        "answer": "ج"
    },
    {
        "id": 403,
        "image": "quiz_data/q_403.png",
        "answer": "ج"
    },
    {
        "id": 404,
        "image": "quiz_data/q_404.png",
        "answer": "ج"
    },
    {
        "id": 405,
        "image": "quiz_data/q_405.png",
        "answer": "ج"
    },
    {
        "id": 406,
        "image": "quiz_data/q_406.png",
        "answer": "د"
    },
    {
        "id": 407,
        "image": "quiz_data/q_407.png",
        "answer": "ج"
    },
    {
        "id": 408,
        "image": "quiz_data/q_408.png",
        "answer": "ب"
    },
    {
        "id": 409,
        "image": "quiz_data/q_409.png",
        "answer": "أ"
    },
    {
        "id": 410,
        "image": "quiz_data/q_410.png",
        "answer": "ج"
    },
    {
        "id": 411,
        "image": "quiz_data/q_411.png",
        "answer": "أ"
    },
    {
        "id": 412,
        "image": "quiz_data/q_412.png",
        "answer": "ج"
    },
    {
        "id": 413,
        "image": "quiz_data/q_413.png",
        "answer": "د"
    },
    {
        "id": 414,
        "image": "quiz_data/q_414.png",
        "answer": "د"
    },
    {
        "id": 415,
        "image": "quiz_data/q_415.png",
        "answer": "ب"
    },
    {
        "id": 416,
        "image": "quiz_data/q_416.png",
        "answer": "أ"
    },
    {
        "id": 417,
        "image": "quiz_data/q_417.png",
        "answer": "ب"
    },
    {
        "id": 418,
        "image": "quiz_data/q_418.png",
        "answer": "ج"
    },
    {
        "id": 419,
        "image": "quiz_data/q_419.png",
        "answer": "د"
    },
    {
        "id": 420,
        "image": "quiz_data/q_420.png",
        "answer": "أ"
    },
    {
        "id": 421,
        "image": "quiz_data/q_421.png",
        "answer": "د"
    },
    {
        "id": 422,
        "image": "quiz_data/q_422.png",
        "answer": "ب"
    },
    {
        "id": 423,
        "image": "quiz_data/q_423.png",
        "answer": "ج"
    },
    {
        "id": 424,
        "image": "quiz_data/q_424.png",
        "answer": "ج"
    },
    {
        "id": 425,
        "image": "quiz_data/q_425.png",
        "answer": "أ"
    },
    {
        "id": 426,
        "image": "quiz_data/q_426.png",
        "answer": "أ"
    },
    {
        "id": 427,
        "image": "quiz_data/q_427.png",
        "answer": "أ"
    },
    {
        "id": 428,
        "image": "quiz_data/q_428.png",
        "answer": "أ"
    },
    {
        "id": 429,
        "image": "quiz_data/q_429.png",
        "answer": "أ"
    },
    {
        "id": 430,
        "image": "quiz_data/q_430.png",
        "answer": "ج"
    },
    {
        "id": 431,
        "image": "quiz_data/q_431.png",
        "answer": "ج"
    },
    {
        "id": 432,
        "image": "quiz_data/q_432.png",
        "answer": "أ"
    },
    {
        "id": 433,
        "image": "quiz_data/q_433.png",
        "answer": "ج"
    },
    {
        "id": 434,
        "image": "quiz_data/q_434.png",
        "answer": "ب"
    },
    {
        "id": 435,
        "image": "quiz_data/q_435.png",
        "answer": "د"
    },
    {
        "id": 436,
        "image": "quiz_data/q_436.png",
        "answer": "د"
    },
    {
        "id": 437,
        "image": "quiz_data/q_437.png",
        "answer": "ج"
    },
    {
        "id": 439,
        "image": "quiz_data/q_439.png",
        "answer": "ب"
    },
    {
        "id": 440,
        "image": "quiz_data/q_440.png",
        "answer": "أ"
    },
    {
        "id": 441,
        "image": "quiz_data/q_441.png",
        "answer": "د"
    },
    {
        "id": 442,
        "image": "quiz_data/q_442.png",
        "answer": "ج"
    },
    {
        "id": 443,
        "image": "quiz_data/q_443.png",
        "answer": "أ"
    },
    {
        "id": 444,
        "image": "quiz_data/q_444.png",
        "answer": "ج"
    },
    {
        "id": 445,
        "image": "quiz_data/q_445.png",
        "answer": "د"
    },
    {
        "id": 446,
        "image": "quiz_data/q_446.png",
        "answer": "ب"
    },
    {
        "id": 447,
        "image": "quiz_data/q_447.png",
        "answer": "د"
    },
    {
        "id": 448,
        "image": "quiz_data/q_448.png",
        "answer": "أ"
    },
    {
        "id": 449,
        "image": "quiz_data/q_449.png",
        "answer": "ج"
    },
    {
        "id": 450,
        "image": "quiz_data/q_450.png",
        "answer": "ب"
    },
    {
        "id": 451,
        "image": "quiz_data/q_451.png",
        "answer": "ب"
    },
    {
        "id": 452,
        "image": "quiz_data/q_452.png",
        "answer": "ج"
    },
    {
        "id": 453,
        "image": "quiz_data/q_453.png",
        "answer": "ب"
    },
    {
        "id": 454,
        "image": "quiz_data/q_454.png",
        "answer": "د"
    },
    {
        "id": 455,
        "image": "quiz_data/q_455.png",
        "answer": "ج"
    },
    {
        "id": 456,
        "image": "quiz_data/q_456.png",
        "answer": "أ"
    },
    {
        "id": 457,
        "image": "quiz_data/q_457.png",
        "answer": "د"
    },
    {
        "id": 458,
        "image": "quiz_data/q_458.png",
        "answer": "ب"
    },
    {
        "id": 459,
        "image": "quiz_data/q_459.png",
        "answer": "ج"
    },
    {
        "id": 460,
        "image": "quiz_data/q_460.png",
        "answer": "ج"
    },
    {
        "id": 461,
        "image": "quiz_data/q_461.png",
        "answer": "ج"
    },
    {
        "id": 462,
        "image": "quiz_data/q_462.png",
        "answer": "أ"
    },
    {
        "id": 463,
        "image": "quiz_data/q_463.png",
        "answer": "ب"
    },
    {
        "id": 464,
        "image": "quiz_data/q_464.png",
        "answer": "ب"
    },
    {
        "id": 465,
        "image": "quiz_data/q_465.png",
        "answer": "ج"
    },
    {
        "id": 466,
        "image": "quiz_data/q_466.png",
        "answer": "أ"
    },
    {
        "id": 467,
        "image": "quiz_data/q_467.png",
        "answer": "ب"
    },
    {
        "id": 468,
        "image": "quiz_data/q_468.png",
        "answer": "ب"
    },
    {
        "id": 469,
        "image": "quiz_data/q_469.png",
        "answer": "ب"
    },
    {
        "id": 470,
        "image": "quiz_data/q_470.png",
        "answer": "ج"
    },
    {
        "id": 471,
        "image": "quiz_data/q_471.png",
        "answer": "أ"
    },
    {
        "id": 472,
        "image": "quiz_data/q_472.png",
        "answer": "ج"
    },
    {
        "id": 473,
        "image": "quiz_data/q_473.png",
        "answer": "ج"
    },
    {
        "id": 474,
        "image": "quiz_data/q_474.png",
        "answer": "ب"
    },
    {
        "id": 475,
        "image": "quiz_data/q_475.png",
        "answer": "د"
    },
    {
        "id": 476,
        "image": "quiz_data/q_476.png",
        "answer": "ب"
    },
    {
        "id": 477,
        "image": "quiz_data/q_477.png",
        "answer": "د"
    },
    {
        "id": 478,
        "image": "quiz_data/q_478.png",
        "answer": "ج"
    },
    {
        "id": 479,
        "image": "quiz_data/q_479.png",
        "answer": "ب"
    },
    {
        "id": 480,
        "image": "quiz_data/q_480.png",
        "answer": "أ"
    },
    {
        "id": 481,
        "image": "quiz_data/q_481.png",
        "answer": "د"
    },
    {
        "id": 482,
        "image": "quiz_data/q_482.png",
        "answer": "أ"
    },
    {
        "id": 483,
        "image": "quiz_data/q_483.png",
        "answer": "أ"
    },
    {
        "id": 484,
        "image": "quiz_data/q_484.png",
        "answer": "أ"
    },
    {
        "id": 485,
        "image": "quiz_data/q_485.png",
        "answer": "ب"
    },
    {
        "id": 486,
        "image": "quiz_data/q_486.png",
        "answer": "ج"
    },
    {
        "id": 487,
        "image": "quiz_data/q_487.png",
        "answer": "أ"
    },
    {
        "id": 488,
        "image": "quiz_data/q_488.png",
        "answer": "ج"
    },
    {
        "id": 489,
        "image": "quiz_data/q_489.png",
        "answer": "د"
    },
    {
        "id": 490,
        "image": "quiz_data/q_490.png",
        "answer": "ب"
    },
    {
        "id": 491,
        "image": "quiz_data/q_491.png",
        "answer": "ج"
    },
    {
        "id": 492,
        "image": "quiz_data/q_492.png",
        "answer": "ج"
    },
    {
        "id": 493,
        "image": "quiz_data/q_493.png",
        "answer": "ج"
    },
    {
        "id": 494,
        "image": "quiz_data/q_494.png",
        "answer": "أ"
    },
    {
        "id": 495,
        "image": "quiz_data/q_495.png",
        "answer": "أ"
    },
    {
        "id": 496,
        "image": "quiz_data/q_496.png",
        "answer": "ب"
    },
    {
        "id": 497,
        "image": "quiz_data/q_497.png",
        "answer": "ج"
    },
    {
        "id": 498,
        "image": "quiz_data/q_498.png",
        "answer": "ج"
    },
    {
        "id": 499,
        "image": "quiz_data/q_499.png",
        "answer": "ج"
    },
    {
        "id": 500,
        "image": "quiz_data/q_500.png",
        "answer": "ب"
    },
    {
        "id": 501,
        "image": "quiz_data/q_501.png",
        "answer": "أ"
    },
    {
        "id": 502,
        "image": "quiz_data/q_502.png",
        "answer": "ج"
    },
    {
        "id": 503,
        "image": "quiz_data/q_503.png",
        "answer": "ج"
    },
    {
        "id": 504,
        "image": "quiz_data/q_504.png",
        "answer": "ب"
    },
    {
        "id": 505,
        "image": "quiz_data/q_505.png",
        "answer": "د"
    },
    {
        "id": 506,
        "image": "quiz_data/q_506.png",
        "answer": "أ"
    },
    {
        "id": 507,
        "image": "quiz_data/q_507.png",
        "answer": "أ"
    },
    {
        "id": 508,
        "image": "quiz_data/q_508.png",
        "answer": "ج"
    },
    {
        "id": 509,
        "image": "quiz_data/q_509.png",
        "answer": "أ"
    },
    {
        "id": 510,
        "image": "quiz_data/q_510.png",
        "answer": "أ"
    },
    {
        "id": 511,
        "image": "quiz_data/q_511.png",
        "answer": "أ"
    },
    {
        "id": 512,
        "image": "quiz_data/q_512.png",
        "answer": "أ"
    },
    {
        "id": 513,
        "image": "quiz_data/q_513.png",
        "answer": "د"
    },
    {
        "id": 514,
        "image": "quiz_data/q_514.png",
        "answer": "ب"
    },
    {
        "id": 515,
        "image": "quiz_data/q_515.png",
        "answer": "ب"
    },
    {
        "id": 516,
        "image": "quiz_data/q_516.png",
        "answer": "ب"
    },
    {
        "id": 517,
        "image": "quiz_data/q_517.png",
        "answer": "أ"
    },
    {
        "id": 518,
        "image": "quiz_data/q_518.png",
        "answer": "ب"
    },
    {
        "id": 519,
        "image": "quiz_data/q_519.png",
        "answer": "ب"
    },
    {
        "id": 520,
        "image": "quiz_data/q_520.png",
        "answer": "ج"
    },
    {
        "id": 521,
        "image": "quiz_data/q_521.png",
        "answer": "ج"
    },
    {
        "id": 522,
        "image": "quiz_data/q_522.png",
        "answer": "ج"
    },
    {
        "id": 523,
        "image": "quiz_data/q_523.png",
        "answer": "ب"
    },
    {
        "id": 524,
        "image": "quiz_data/q_524.png",
        "answer": "ب"
    },
    {
        "id": 525,
        "image": "quiz_data/q_525.png",
        "answer": "ب"
    },
    {
        "id": 526,
        "image": "quiz_data/q_526.png",
        "answer": "ج"
    },
    {
        "id": 527,
        "image": "quiz_data/q_527.png",
        "answer": "د"
    },
    {
        "id": 528,
        "image": "quiz_data/q_528.png",
        "answer": "أ"
    },
    {
        "id": 529,
        "image": "quiz_data/q_529.png",
        "answer": "أ"
    },
    {
        "id": 530,
        "image": "quiz_data/q_530.png",
        "answer": "ج"
    },
    {
        "id": 531,
        "image": "quiz_data/q_531.png",
        "answer": "ج"
    },
    {
        "id": 532,
        "image": "quiz_data/q_532.png",
        "answer": "أ"
    },
    {
        "id": 533,
        "image": "quiz_data/q_533.png",
        "answer": "د"
    }
];
    quizData = rawData.sort(() => Math.random() - 0.5);
    qTotalEl.textContent = quizData.length;


    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            if(quizData.length === 0) {
                alert('جارٍ تحميل الأسئلة... حاول مجدداً بعد قليل.');
                return;
            }
            startQuizBtn.classList.add('hidden');
            quizArena.classList.remove('hidden');
            loadQuestion();
        });
    }

    function loadQuestion() {
        answered = false;
        answerFeedback.classList.add('hidden');
        nextQBtn.classList.add('hidden');
        
        // Reset buttons
        optionsBtns.forEach(btn => {
            btn.classList.remove('correct-ans', 'wrong-ans');
            btn.disabled = false;
        });

        const q = quizData[currentQuestionIndex];
        questionImg.src = q.image;
        qCounterEl.textContent = currentQuestionIndex + 1;
    }

    optionsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(answered) return;
            answered = true;
            
            // Clean up invisible formatting character that might be in JSON from python
            const rawAns = quizData[currentQuestionIndex].answer;
            const currentAns = typeof rawAns === 'string' ? rawAns.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : rawAns;
            const selectedAnswer = e.target.getAttribute('data-answer');
            
            // Highlight correct and wrong
            optionsBtns.forEach(b => {
                b.disabled = true;
                const optAns = b.getAttribute('data-answer');
                if(optAns === currentAns) {
                    b.classList.add('correct-ans');
                } else if (optAns === selectedAnswer) {
                    b.classList.add('wrong-ans');
                }
            });

            answerFeedback.classList.remove('hidden');
            if(selectedAnswer === currentAns) {
                score++;
                qScoreEl.textContent = score;
                answerFeedback.innerHTML = '<i class="fa-solid fa-check-circle" style="color:#22c55e;"></i> إجابة صحيحة، بطل!';
                answerFeedback.style.color = '#22c55e';
            } else {
                answerFeedback.innerHTML = `<i class="fa-solid fa-times-circle" style="color:#ef4444;"></i> إجابة خاطئة! الصحيح هو: ${currentAns}`;
                answerFeedback.style.color = '#ef4444';
            }

            if(currentQuestionIndex < quizData.length - 1) {
                nextQBtn.classList.remove('hidden');
            } else {
                answerFeedback.innerHTML += '<br><br>🎉 انتهت الأسئلة المتاحة! نتيجتك النهائية: ' + score + ' من ' + quizData.length;
            }
        });
    });

    if (nextQBtn) {
        nextQBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });
    }

});
