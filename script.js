/**
 * MANOO TECH - Technology & Software Development
 * Master Script: Bilingual i18n (EN/AR), Dual-Theme (Dark/Light), Canvas, Modals, Testing Gateways
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initParticleCanvas();
  initStickyHeader();
  initMobileMenu();
  initModals();
  initClipboard();
  initForms();
  initStatsCounter();
});

/* --------------------------------------------------------------------------
   Theme Management (Dark / Futuristic Platinum Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('manootech_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // default dark

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('manootech_theme', newTheme);
      showToast(newTheme === 'light' ? (currentLang === 'ar' ? 'تم تفعيل الوضع المضيء' : 'Light Mode Activated') : (currentLang === 'ar' ? 'تم تفعيل الوضع الليلي' : 'Dark Mode Activated'));
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeToggleIcon');
  if (!themeIcon) return;

  if (theme === 'light') {
    // Sun icon for switching back to dark
    themeIcon.innerHTML = `
      <svg class="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeIcon.setAttribute('title', 'Switch to Dark Mode');
  } else {
    // Moon icon for switching to light
    themeIcon.innerHTML = `
      <svg class="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeIcon.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --------------------------------------------------------------------------
   Bilingual i18n System (English & Arabic RTL)
   -------------------------------------------------------------------------- */
let currentLang = 'en';

const translations = {
  en: {
    nav_home: "Home",
    nav_apps: "Flagship Apps",
    nav_services: "Services",
    nav_pipeline: "Pipeline",
    nav_contact: "Contact",
    nav_cta: "Get In Touch",
    lang_btn_text: "العربية",

    hero_title: `Turning <span class="gradient-text">Inspiring Ideas</span> Into <span class="gradient-cyan">Living Experiences</span> On Your Screen`,
    hero_subtitle: "MANOO Tech designs, develops, and deploys high-performance Android applications and scalable modern web platforms. From cutting-edge media engines to casual game architectures, we bring robust software to life.",
    hero_explore_btn: "Explore Flagship Apps",
    hero_contact_btn: "Get In Touch",
    stat_releases: "Play Store Releases",
    stat_perf: "Native Performance",
    stat_uptime: "Architecture Stability",

    visual_caption_tag: "Official Tech Suite",
    visual_caption_sub: "Production & Innovation Hub",

    apps_section_badge: "Flagship Android Portfolio",
    apps_section_title: "Engineered For Performance & High User Engagement",
    apps_section_desc: "Explore our state-of-the-art mobile applications engineered for native performance and published on the Google Play Store.",

    muziplay_type: "Media Streaming & Audio DSP",
    app_status_live: "Google Play Release",
    muziplay_title: `MuziPlay <span class="subtitle-dim">— Ultimate All-in-One Media Hub</span>`,
    muziplay_desc: "MuziPlay seamlessly integrates an ad-free streaming browser with a high-velocity universal media downloader, synchronized lyrics, and an offline studio-grade DSP audio player with Equalizer Pro and Smart Audio Isolation.",
    muzi_f1: "<strong>Ad-Free Streaming & Downloader:</strong> Fetch videos & audio on the fly with zero ads.",
    muzi_f2: "<strong>Live Synced Lyrics:</strong> Real-time lyrics scrolling with instant copy & karaoke sync.",
    muzi_f3: "<strong>Equalizer Pro & Spatial FX:</strong> Studio-grade 3D audio, bass booster, and frequency tuning.",
    muzi_f4: "<strong>Smart Audio Isolation:</strong> Filter vocals and isolate instrumentals on device.",
    app_btn_play: "Get on Google Play",

    brixy_type: "Candy & Fruit Match-3 Adventure",
    brixy_title: `Brixy <span class="subtitle-dim">— Sweet Candy & Fruit Match-3 Adventure</span>`,
    brixy_desc: "Embark on a delightful candy & fruit matching adventure with Brixy! Match vibrant drops and sweets, blast through obstacles with hammers, rockets, and bombs, and conquer hundreds of handcrafted levels at fluid 60 FPS.",
    brixy_f1: "<strong>Addictive Match-3 Mechanics:</strong> Satisfying cascades with candies, drops, and obstacles.",
    brixy_f2: "<strong>Super Boosters:</strong> Rockets, explosive bombs, hammers, and board-clearing fish.",
    brixy_f3: "<strong>Exciting Progression Map:</strong> Conquer hundreds of stages and collect 3-star ratings.",
    brixy_f4: "<strong>Native 60 FPS Performance:</strong> Ultra-responsive touch physics and optimized battery usage.",

    services_badge: "Comprehensive Solutions",
    services_title: "End-to-End Technology & Software Development",
    services_desc: "We partner with businesses, creators, and innovators to architect, code, and deploy mission-critical software solutions.",
    service_1_title: "Android Mobile Apps",
    service_1_desc: "High-efficiency Android applications built with Kotlin and Jetpack Compose. Clean architecture, battery-conscious background workers, and seamless OS integrations.",
    service_2_title: "Custom Web Platforms",
    service_2_desc: "Responsive corporate websites, interactive dashboards, and SaaS applications with lightning load times, modern aesthetics, and rock-solid SEO performance.",
    service_3_title: "Play Store Publishing",
    service_3_desc: "Complete management of the Google Play Console lifecycle: policy compliance, production rollout, store listing ASO, and versioning.",
    service_4_title: "Media & Audio DSP Engines",
    service_4_desc: "Custom media playback engines, hardware-accelerated video rendering, audio decoders, and digital signal processing (DSP) equalizer filtering pipelines.",
    service_5_title: "Mobile Game Engineering",
    service_5_desc: "Engaging 2D/3D casual games, puzzle mechanics, real-time particle rendering, combo math systems, and cross-device hardware scaling for maximum retention.",
    service_6_title: "Cloud Backends & APIs",
    service_6_desc: "Scalable REST and GraphQL server architectures, real-time databases, authentication flows, and automated CI/CD deployment pipelines.",

    pipeline_badge: "Structured Execution",
    pipeline_title: "Our Production Roadmap",
    pipeline_desc: "A proven 4-stage engineering lifecycle transforming concepts into verified, high-rating digital products.",
    step_1_title: "Architecture & UX",
    step_1_desc: "Defining core specs, user flows, database schemas, and wireframing high-converting visual interfaces.",
    step_2_title: "Agile Coding",
    step_2_desc: "Writing clean, maintainable, modular native and web code with unit tests, CI/CD, and performance benchmarks.",
    step_3_title: "QA & Device Testing",
    step_3_desc: "Multi-device compatibility validation, crash profiling, memory leak detection, and 60 FPS performance tuning.",
    step_4_title: "Store Launch",
    step_4_desc: "Google Play Console production approval, global CDN rollout, real-time analytics monitoring, and versioning.",

    contact_badge: "Let's Build Together",
    contact_title: "Ready to Launch Your Next Software Breakthrough?",
    contact_desc: "Whether you need a custom native Android app, a modern web platform, or guidance on navigating Google Play Console closed testing, MANOO Tech is ready to assist.",
    direct_inquiry_label: "Direct Engineering Inquiries",
    response_time_label: "Response Time",
    response_time_val: "Within 24 Hours / Worldwide Support",
    contact_name_label: "Your Name",
    contact_email_label: "Your Email",
    contact_inquiry_label: "Inquiry Type",
    contact_msg_label: "Project Details & Requirements",
    contact_submit_btn: "Send Project Inquiry",

    footer_summary: "Architecting next-generation mobile applications and high-impact web platforms. Committed to craftsmanship, performance, and Google Play compliance.",
    footer_nav_title: "Navigation",
    footer_apps_title: "Google Play Apps",
    footer_hq_title: "Headquarters",
    footer_email_label: "Direct Email:",
    footer_status_label: "Status:",
    footer_status_val: "Taking Client Projects",
    footer_rights: "© 2026 MANOO Tech. All rights reserved. Technology & Software Development.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_top: "Back to Top ↑"
  },

  ar: {
    nav_home: "الرئيسية",
    nav_apps: "تطبيقاتنا",
    nav_services: "خدماتنا",
    nav_pipeline: "مراحل التطوير",
    nav_contact: "تواصل معنا",
    nav_cta: "تواصل معنا",
    lang_btn_text: "English",

    hero_title: `نحول الأفكار <span class="gradient-text">الملهمة</span> إلى <span class="gradient-cyan">واقع حيّ</span> على شاشتك`,
    hero_subtitle: "تقوم <bdi dir=\"ltr\">MANOO Tech</bdi> بتصميم وتطوير ونشر تطبيقات أندرويد أصلية فائقة الأداء ومواقع ويب عصرية قابلة للتوسع. من محركات الوسائط المتطورة إلى ألعاب الموبايل الشيقة، نصنع تجارب رقمية متكاملة على متجر Google Play وعبر الويب.",
    hero_explore_btn: "استكشف التطبيقات الرائدة",
    hero_contact_btn: "تواصل معنا",
    stat_releases: "تطبيقات على متجر Play",
    stat_perf: "أداء أصلي 100%",
    stat_uptime: "استقرار وثبات البرمجيات",

    visual_caption_tag: "الحزمة البرمجية الرسمية",
    visual_caption_sub: "مركز الإنتاج والابتكار",

    apps_section_badge: "تطبيقات الأندرويد الرائدة",
    apps_section_title: "برمجيات مصممة لأعلى كفاءة وتجربة مستخدم ممتعة",
    apps_section_desc: "استكشف أحدث تطبيقاتنا المطورة بأعلى معايير الأداء والمنشورة على متجر Google Play.",

    muziplay_type: "بث الوسائط ومعالج الصوت DSP",
    app_status_live: "إصدار متجر Google Play معتمد",
    muziplay_title: `MuziPlay <span class="subtitle-dim">— مركز الوسائط المتكامل ومشغل الصوت المتقدم</span>`,
    muziplay_desc: "يجمع MuziPlay بين متصفح ويب ومحمل وسائط فائق السرعة، مع عرض متزامن لكلمات الأغاني (Lyrics)، ومشغل وسائط احترافي مزود بميزات Equalizer Pro وعزل الصوت الذكي Smart Audio Isolation.",
    muzi_f1: "<strong>تشغيل وتحميل بدون إعلانات:</strong> تنزيل مباشر للفيديوهات والصوتيات بأعلى جودة.",
    muzi_f2: "<strong>عرض كلمات الأغاني حياً:</strong> مزامنة فورية لكلمات الأغاني مع إمكانية النسخ.",
    muzi_f3: "<strong>معادل Equalizer Pro ومؤثرات 3D:</strong> تحكم احترافي في الترددات وتضخيم Bass.",
    muzi_f4: "<strong>عزل الصوت الذكي:</strong> تقنية Smart Audio Isolation لعزل الصوت والموسيقى محلياً.",
    app_btn_play: "تحميل من Google Play",

    brixy_type: "مغامرة مطابقة الحلوى والفواكه",
    brixy_title: `Brixy <span class="subtitle-dim">— مغامرة مطابقة الحلوى والفواكه الممتعة</span>`,
    brixy_desc: "عش أروع مغامرات مطابقة الحلوى والفواكه مع Brixy! طابق الحلوى وقطرات الجيلي الملونة، فجر الصواريخ والقنابل والشواكيش لتخطي العقبات، وتحدّ مئات المراحل المشوقة بسلاسة 60 إطار بالثانية.",
    brixy_f1: "<strong>ميكانيكا Match-3 إدمانية:</strong> مؤثرات تساقط ممتعة مع قطع الحلوى والقطرات والشكولاتة.",
    brixy_f2: "<strong>معززات خارقة:</strong> صواريخ نفاثة، قنابل متفجرة، شاكوش التكسير، وسمكة التنظيف.",
    brixy_f3: "<strong>خريطة مراحل ممتعة:</strong> خوض مئات المستويات المتتالية وجمع النجوم الثلاثة.",
    brixy_f4: "<strong>أداء أصلي 60 FPS:</strong> فيزياء لمس فائقة السرعة مع استهلاك مثالي لبطارية الهاتف.",

    services_badge: "حلول برمجية متكاملة",
    services_title: "خدمات شاملة لتطوير المواقع وتطبيقات الموبايل",
    services_desc: "نبتكر ونبرمج الحلول الرقمية بأعلى معايير الجودة لمساعدة رواد الأعمال والشركات على تحقيق طموحاتهم البرمجية.",
    service_1_title: "تطبيقات أندرويد أصلية",
    service_1_desc: "تطبيقات عالية الكفاءة مبرمجة بلغة Kotlin وواجهات Jetpack Compose العصرية، مع بنية برمجية نظيفة وتوافق تام مع نظام الأندرويد.",
    service_2_title: "مواقع وتطبيقات الويب",
    service_2_desc: "مواقع شركات فاخرة، لوحات تحكم تفاعلية، وتطبيقات ويب سحابية (SaaS) بسرعات تحميل فائقة وتوافق تام مع محركات البحث SEO.",
    service_3_title: "نشر وإدارة Google Play",
    service_3_desc: "إدارة كاملة لحسابات Google Play Console، إطلاق الإصدارات، وتحسين الظهور في المتجر ASO.",
    service_4_title: "محركات الوسائط ومعالجة الصوت DSP",
    service_4_desc: "تطوير مشغلات الفيديو والصوت الاحترافية، دعم معالجات الصوت الرقمي DSP، الرسوم البيانية للطيف الصوتي والترميز المتقدم.",
    service_5_title: "برمجة وتطوير ألعاب الموبايل",
    service_5_desc: "ألعاب كاجوال ثنائية وثلاثية الأبعاد، فيزياء واقعية وممتعة، أنظمة الجواهر والكومبو، مع أعلى معدلات أداء واستقرار.",
    service_6_title: "الأنظمة السحابية والـ APIs",
    service_6_desc: "بناء قواعد البيانات وخوادم REST/GraphQL القابلة للزيادة، الربط مع منصات Firebase والسحابة، وأنظمة التوثيق الأمنية.",

    pipeline_badge: "منهجية العمل والإنتاج",
    pipeline_title: "خارطة طريق هندسة البرمجيات",
    pipeline_desc: "منهجية احترافية مكونة من 4 خطوات مدروسة لتحويل الفكرة الأولية إلى تطبيق ناجح على متجر جوجل بلاي.",
    step_1_title: "01 التخطيط وواجهات المستخدم",
    step_1_desc: "تحديد المتطلبات بدقة، رسم تدفق المستخدم، وتصميم واجهات تفاعلية جذابة وفائقة السهولة.",
    step_2_title: "02 البرمجة المرنة (Agile)",
    step_2_desc: "كتابة كود برمجي نظيف وقوي مع اختبارات الأداء والتأكد من استقرار كل ميزة يتم بناؤها.",
    step_3_title: "03 اختبارات الجودة وتوافق الأجهزة",
    step_3_desc: "اختبارات التوافق على مختلف طرازات الأجهزة، فحص الأعطال واستهلاك الذاكرة، وضبط الأداء السلس بمعدل 60 إطاراً في الثانية.",
    step_4_title: "04 الإطلاق الرسمي على المتجر",
    step_4_desc: "الحصول على موافقة جوجل بلاي النهائية، التوزيع العالمي، ومتابعة التقييمات والتحديثات الدورية.",

    contact_badge: "لنبدأ العمل معاً",
    contact_title: "هل لديك فكرة مشروع أو تطبيق وترغب في إطلاقه؟",
    contact_desc: "سواء كنت بحاجة لبرمجة تطبيق أندرويد مخصص، موقع ويب حديث، أو اجتياز مرحلة التيستنج على متجر جوجل بلاي، فريق <bdi dir=\"ltr\">MANOO Tech</bdi> مستعد لمساعدتك خطوة بخطوة.",
    direct_inquiry_label: "البريد الإلكتروني المباشر",
    response_time_label: "سرعة الرد",
    response_time_val: "خلال 24 ساعة / دعم واستشارات مستمرة",
    contact_name_label: "الاسم الكريم",
    contact_email_label: "بريدك الإلكتروني",
    contact_inquiry_label: "نوع الطلب أو الخدمة",
    contact_msg_label: "تفاصيل المشروع أو متطلباتك",
    contact_submit_btn: "إرسال تفاصيل المشروع",

    footer_summary: "استوديو هندسي متخصص في بناء وتطوير تطبيقات الموبايل المتقدمة ومنصات الويب العصرية، مع الالتزام الصارم بمعايير الأداء ومتطلبات متجر Google Play.",
    footer_nav_title: "أقسام الموقع",
    footer_apps_title: "تطبيقات جوجل بلاي",
    footer_hq_title: "بيانات التواصل",
    footer_email_label: "البريد الإلكتروني المباشر:",
    footer_status_label: "حالة استقبال المشاريع:",
    footer_status_val: "متاح للمشاريع الجديدة",
    footer_rights: "© 2026 <bdi dir=\"ltr\">MANOO Tech</bdi>. جميع الحقوق محفوظة. استوديو تطوير البرمجيات والتطبيقات.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "الشروط والأحكام",
    footer_top: "العودة للأعلى ↑"
  }
};

function initLanguage() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  const storedLang = localStorage.getItem('manootech_lang') || 'en';
  applyLanguage(storedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const targetLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(targetLang);
      localStorage.setItem('manootech_lang', targetLang);
      showToast(targetLang === 'ar' ? 'تم تحويل اللغة إلى العربية' : 'Switched language to English');
    });
  }
}

function applyLanguage(lang) {
  currentLang = lang;
  const isRtl = lang === 'ar';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

  const dict = translations[lang] || translations.en;

  // Update text nodes that have data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update button labels or placeholders
  const langBtnText = document.getElementById('langBtnText');
  if (langBtnText) {
    langBtnText.textContent = dict.lang_btn_text;
  }
}

/* --------------------------------------------------------------------------
   Interactive Cyber Background Canvas
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 22000), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(0, 210, 255, ' : 'rgba(59, 130, 246, '
    });
  }

  let mouse = { x: null, y: null, maxDist: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.5)';
      ctx.fill();

      // Connect with mouse
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 210, 255, ${0.25 * (1 - dist / mouse.maxDist)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect neighbor particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   Sticky Header & Scroll Spy
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Mobile Drawer Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive Screenshot Tab Switcher
   -------------------------------------------------------------------------- */
window.switchScreenshot = function (imgId, srcPath, btn) {
  const img = document.getElementById(imgId);
  if (!img) return;

  // Toggle active class on sibling tabs
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.preview-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // Smooth fade transition
  img.style.opacity = '0.2';
  setTimeout(() => {
    img.src = srcPath;
    img.style.opacity = '1';
  }, 160);
};

/* --------------------------------------------------------------------------
   Interactive Modals (Privacy Policy)
   -------------------------------------------------------------------------- */
function initModals() {
  const policyModal = document.getElementById('policyModal');
  const modalCloses = document.querySelectorAll('.modal-close-btn, .modal-backdrop');

  // Open Privacy Policy Modal
  window.openPolicyModal = function () {
    if (!policyModal) return;
    policyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close modals
  modalCloses.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      if (e.target === elem || elem.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   Clipboard Copy Helper
   -------------------------------------------------------------------------- */
function initClipboard() {
  document.querySelectorAll('.copy-id-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const copiedMsg = currentLang === 'ar' ? 'تم نسخ المعرف بنجاح' : `Copied: "${textToCopy}"`;
        showToast(copiedMsg);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${currentLang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>`;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2200);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Notifications
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   Form Handlers (Contact Inquiries)
   -------------------------------------------------------------------------- */
function initForms() {
  // Main Consultation / Contact Form
  const mainContactForm = document.getElementById('mainContactForm');
  const feedbackMsg = document.getElementById('contactFeedback');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = mainContactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = currentLang === 'ar' ? 'جاري إرسال الرسالة...' : 'Transmitting Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = currentLang === 'ar' ? 'إرسال تفاصيل المشروع' : 'Send Project Inquiry';
        if (feedbackMsg) {
          feedbackMsg.className = 'submit-feedback-msg success';
          feedbackMsg.innerHTML = currentLang === 'ar' 
            ? `<strong>شكراً لك!</strong> تم توجيه رسالتك إلى <code>manootech2030@gmail.com</code>. سيتواصل معك أحد مهندسينا خلال 24 ساعة عمل.`
            : `<strong>Thank you!</strong> Your message has been routed to <code>manootech2030@gmail.com</code>. Our senior engineers will follow up within 24 business hours.`;
        }
        showToast(currentLang === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Inquiry received! We will reply promptly.');
        mainContactForm.reset();
      }, 900);
    });
  }
}

/* --------------------------------------------------------------------------
   Hero Stats Counter Animation
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statElements.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const stepTime = 25;
          const increment = Math.ceil(target / 40) || 1;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.innerHTML = count + `<span>${suffix}</span>`;
          }, stepTime);
        });
      }
    },
    { threshold: 0.5 }
  );

  const statsRow = document.querySelector('.hero-stats-row');
  if (statsRow) observer.observe(statsRow);
}
