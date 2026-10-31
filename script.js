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
    footer_top: "Back to Top ↑",

    policy_back_home: "Back to Studio",
    policy_badge: "Official Studio & Apps Policy",
    policy_hero_title: `Privacy Policy & <span class="gradient-text">Data Protection</span>`,
    policy_hero_sub: "At MANOO Tech, your privacy is fundamental to how we engineer our software. This policy outlines our commitment to transparency, data safety, and compliance across our studio web platforms and Google Play Android applications.",
    policy_meta_compliance: "Google Play & GDPR Compliant",
    policy_last_updated: "Last Updated: September 2026 | Effective Immediately",
    policy_toc_heading: "Policy Sections",
    toc_1: "1. Introduction & Scope",
    toc_2: "2. Zero Data Sale",
    toc_3: "3. Device Permissions",
    toc_4: "4. Third-Party Services",
    toc_5: "5. Data Security",
    toc_6: "6. Children's Privacy",
    toc_7: "7. User Rights & Deletion",
    toc_8: "8. Terms of Service",
    toc_9: "9. Contact Controller",
    sec1_title: "1. Introduction & Scope",
    sec1_body: `<p>This Privacy Policy applies to all digital software products developed, operated, and published by <strong>MANOO Tech</strong> ("we", "our", or "the Studio"), including our official web platforms and all Android applications distributed via the Google Play Store (including MuziPlay, Brixy, and future titles).</p><p>By installing, accessing, or using any of our applications or web services, you acknowledge the terms described in this policy. We recommend reading this document carefully to understand how your privacy is protected.</p>`,
    sec2_title: "2. Privacy by Design & Zero Personal Data Sale",
    sec2_body: `<p>MANOO Tech operates strictly under a <strong>Privacy-by-Design</strong> philosophy. We believe great software should serve users without intruding on their personal digital lives.</p><div class="policy-highlight-box"><strong>Our Core Promise:</strong> We do <em>not</em> collect, harvest, monetize, rent, or sell your personal identifiers, names, phone numbers, contact lists, GPS locations, or personal files to data brokers or third-party advertisers.</div><p>We build high-performance software, audio engines, and immersive casual games. Monetizing personal data is not, and will never be, part of our business model.</p>`,
    sec3_title: "3. Device Permissions & On-Device Processing",
    sec3_body: `<p>Our mobile applications request only the minimum runtime permissions required to deliver their advertised functionality:</p><ul><li><strong>Local Storage & Media Access:</strong> Utilized exclusively on-device by media players (such as MuziPlay) to index and play back your local music tracks and display album artwork. Your media files are never transmitted to our servers.</li><li><strong>Foreground Service:</strong> Used to maintain continuous audio playback and playback notification controls when you navigate away from the app.</li><li><strong>Network Connectivity:</strong> Used strictly to fetch remote streaming media, check application updates, or download synchronized lyrics requested explicitly by you.</li><li><strong>Haptic / Vibration Feedback:</strong> Used within our game engines (such as Brixy) to provide tactile feedback during gameplay.</li></ul>`,
    sec4_title: "4. Third-Party Services & Diagnostics",
    sec4_body: `<p>To ensure stability, prevent app crashes, and deliver updates, our applications may utilize standard SDKs provided by Google:</p><ul><li><strong>Google Play Services:</strong> Enables core platform features, app integrity verification, and in-app updates.</li><li><strong>Performance Diagnostics & Crash Reports:</strong> Anonymous, aggregated diagnostic telemetry (such as device model, OS version, and stack traces) helps us identify and fix bugs rapidly.</li><li><strong>Contextual Advertising:</strong> If an ad-supported version of a game or utility is deployed, standard Google advertising partners may serve contextual ads in accordance with Google Play Developer policies. You can reset your Google Advertising ID at any time via Android Device Settings.</li></ul>`,
    sec5_title: "5. Data Security & Storage Standards",
    sec5_body: `<p>We employ rigorous engineering safeguards. Any network communications initiated by our web platforms or applications use modern encryption protocols (HTTPS/TLS 1.3).</p><p>We do not retain permanent user profiles on remote databases. Any technical records maintained by third-party diagnostic services are automatically rotated and purged in compliance with industry data retention standards.</p>`,
    sec6_title: "6. Children's Privacy (COPPA Compliance)",
    sec6_body: `<p>Protecting the privacy of children is of paramount concern to MANOO Tech. Our applications are engineered for general audiences and do not knowingly collect personal data from children under the age of 13 (or under 16 within the European Economic Area).</p><p>If you are a parent or guardian and believe that your child has provided us with personal information without parental consent, please contact us immediately at <a href="mailto:manootech2030@gmail.com" class="gradient-cyan">manootech2030@gmail.com</a>, and we will promptly purge such data from our systems.</p>`,
    sec7_title: "7. User Rights & Data Deletion Requests",
    sec7_body: `<p>In accordance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Google Play Developer Policies, all users possess fundamental rights regarding their digital data:</p><ul><li><strong>Right to Access:</strong> You may request a summary of any technical correspondence or diagnostic records associated with your email.</li><li><strong>Right to Erasure (Data Deletion):</strong> You may request the irrevocable deletion of any email correspondence or support logs.</li><li><strong>Right to Opt-Out:</strong> You can opt out of personalized advertisements by disabling interest-based ads in your Android device settings.</li></ul><div class="policy-highlight-box"><strong>Submit a Deletion Request:</strong> Send an email with subject <code>"Data Deletion Request"</code> to <a href="mailto:manootech2030@gmail.com?subject=Data%20Deletion%20Request%20-%20MANOO%20Tech" class="gradient-cyan"><strong>manootech2030@gmail.com</strong></a>. Requests are confirmed and executed within 48 business hours.</div>`,
    sec8_title: "8. Terms of Service & Intellectual Property",
    sec8_body: `<p>All applications, software architectures, logos, audio algorithms, game mechanics, and graphical assets published under <strong>MANOO Tech</strong> are protected by international copyright and intellectual property laws.</p><p>You are granted a non-exclusive, revocable, personal license to install and use our applications via official distribution channels (such as Google Play). You may not reverse-engineer, decompile, redistribute, or extract proprietary software modules without prior written consent from MANOO Tech.</p>`,
    sec9_title: "9. Contact the Studio Data Controller",
    sec9_body: `<p>If you have questions, regulatory inquiries, or feedback regarding this Privacy Policy and our data handling practices, our engineering and compliance team is directly available:</p><div class="policy-contact-banner"><h4 data-i18n="policy_banner_title">MANOO Tech Engineering & Compliance</h4><p data-i18n="policy_banner_sub">Direct point of contact for Google Play compliance, data rights, and technical inquiries.</p><a href="mailto:manootech2030@gmail.com" class="btn-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>manootech2030@gmail.com</span></a></div>`,
    policy_banner_title: "MANOO Tech Engineering & Compliance",
    policy_banner_sub: "Direct point of contact for Google Play compliance, data rights, and technical inquiries.",

    // MuziPlay Specific Privacy Policy (English)
    nav_general_policy: "Studio Policy",
    muzi_priv_badge: "Official Application Privacy Policy",
    muzi_priv_hero_title: `MuziPlay <span class="gradient-text">Privacy Policy</span>`,
    muzi_priv_hero_sub: "Comprehensive Privacy & Data Protection Policy for the MuziPlay Android application. This policy details our strict on-device data handling, runtime permissions, and compliance with Google Play Developer Policies.",
    muzi_priv_pub: `Developer & Publisher: <strong>MANOO Tech</strong> • Contact: <strong>manootech2030@gmail.com</strong>`,
    muzi_priv_view_play: "View on Google Play Store",
    muzi_priv_last_updated: "Effective Date: October 2026 | Last Updated: October 31, 2026",
    muzi_toc_1: "1. Scope & App Identity",
    muzi_toc_2: "2. Zero Data Collection & Sale",
    muzi_toc_3: "3. Android Permissions",
    muzi_toc_4: "4. Local Storage & Audio Processing",
    muzi_toc_5: "5. Streaming & Downloader Privacy",
    muzi_toc_6: "6. Third-Party Services & SDKs",
    muzi_toc_7: "7. User Rights & Data Deletion",
    muzi_toc_8: "8. Children's Privacy (COPPA)",
    muzi_toc_9: "9. Data Security & Encryption",
    muzi_toc_10: "10. Contact & Controller",

    muzi_sec1_title: "1. Scope & Application Identity",
    muzi_sec1_body: `<p>This Privacy Policy applies solely to the Android application <strong>MuziPlay</strong> (Application ID: <code>com.aistudio.muziplay.xnxfyx</code>), developed, published, and maintained by <strong>MANOO Tech</strong> ("we", "our", or "the Studio").</p><p>MuziPlay is an all-in-one Android media utility that features an ad-free streaming browser, high-speed universal media downloader, synchronized lyrics engine, and an offline studio-grade DSP audio player with Equalizer Pro and Smart Audio Isolation.</p><p>By installing, updating, or using MuziPlay, you agree to the practices outlined in this policy. If you do not agree with any terms, please do not install or use the application.</p>`,

    muzi_sec2_title: "2. Privacy by Design & Zero Personal Data Sale",
    muzi_sec2_body: `<p>MuziPlay is engineered under a strict <strong>Privacy-by-Design</strong> philosophy. The application does not require you to create an account, log in, or provide any personal identification (such as name, email address, phone number, physical address, or payment details) to access its core features.</p><div class="policy-highlight-box"><strong>Zero Personal Data Sale:</strong> We do <em>not</em> collect, log, sell, rent, lease, or monetize your personal identity, contact lists, GPS location, device contacts, or local audio files. We have never sold personal data to data brokers or third parties, and we never will.</div>`,

    muzi_sec3_title: "3. Android Runtime Permissions & Technical Necessity",
    muzi_sec3_body: `<p>In compliance with Google Play Developer Policy requirements, MuziPlay requests only the minimum necessary runtime permissions strictly required to perform its media playback and download functions:</p><ul><li><strong>READ_MEDIA_AUDIO / READ_EXTERNAL_STORAGE:</strong> Required solely to discover, scan, and play your locally stored music tracks and display embedded album art inside the audio player. Your audio tracks remain strictly on your device; they are never uploaded, analyzed on cloud servers, or transmitted externally.</li><li><strong>FOREGROUND_SERVICE & FOREGROUND_SERVICE_MEDIA_PLAYBACK:</strong> Required to maintain smooth, continuous audio playback when you navigate outside the app or when your phone screen is locked. It provides the persistent notification controls (Play, Pause, Skip, Previous).</li><li><strong>POST_NOTIFICATIONS:</strong> Required on Android 13 (API 33) and above to display playback status notifications, media controls, and download progress.</li><li><strong>INTERNET & ACCESS_NETWORK_STATE:</strong> Required to enable user-initiated media streaming, fetch synchronized lyrics requested by the user, verify app updates via Google Play, and check network availability.</li><li><strong>WAKE_LOCK:</strong> Required to prevent Android system sleep from interrupting continuous music playback while your screen is off.</li></ul>`,

    muzi_sec4_title: "4. Local Storage & On-Device Audio DSP Processing",
    muzi_sec4_body: `<p>MuziPlay incorporates high-fidelity audio engineering features, including Equalizer Pro, Bass Boost, 3D Spatial Audio, and Smart Audio Isolation (vocal filtering):</p><ul><li><strong>100% On-Device Processing:</strong> All audio equalization, frequency processing, and sound isolation algorithms execute entirely within your device's local CPU/DSP hardware. None of your audio data is sent to external servers or AI cloud processors.</li><li><strong>Playlists & Favorites:</strong> Your custom playlists, favorite tracks, playback history, and equalizer presets are stored strictly inside your local app sandbox.</li></ul>`,

    muzi_sec5_title: "5. Streaming Browser & Downloader Privacy",
    muzi_sec5_body: `<p>When using MuziPlay's streaming browser or downloading media:</p><ul><li><strong>Browsing Privacy:</strong> The in-app streaming browser connects directly between your device and the destination websites you choose to visit. MANOO Tech does not act as a proxy, nor do we monitor, inspect, log, or record your browsing URLs, search queries, or downloaded files.</li><li><strong>Downloaded Content:</strong> Files downloaded via the app are saved directly to your device storage in the destination folder selected by you. We maintain no remote log or catalog of what you download.</li></ul>`,

    muzi_sec6_title: "6. Third-Party Services & Google Play SDKs",
    muzi_sec6_body: `<p>To deliver seamless app updates, license validation, and crash stability, MuziPlay integrates official Google developer tools:</p><ul><li><strong>Google Play Services:</strong> Used for app integrity, licensing, in-app updates, and security verification. Subject to Google's Privacy Policy.</li><li><strong>Anonymized Diagnostics & Crash Reports:</strong> If an unforeseen app crash occurs, standard anonymous telemetry (such as device model, Android OS version, and stack trace logs) may be collected to help us resolve the crash. No personal data or user identifiers are included in these crash reports.</li><li><strong>Advertising (if applicable):</strong> If an ad-supported version is deployed, Google advertising networks may serve contextual or standard ads in strict compliance with Google Play Developer Policies. You can reset or delete your Google Advertising ID anytime via <em>Android Settings &gt; Google &gt; Ads</em>.</li></ul>`,

    muzi_sec7_title: "7. User Rights & Data Deletion Mechanism",
    muzi_sec7_body: `<p>In adherence to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Google Play App Data Deletion requirements:</p><ul><li><strong>Local Data Removal:</strong> You can completely erase all local app data, preferences, playlists, and cached lyrics at any time simply by clearing app storage via <em>Android Settings &gt; Apps &gt; MuziPlay &gt; Clear Storage / Clear Data</em>, or by uninstalling the application.</li><li><strong>Support Communications Deletion:</strong> If you have ever emailed our support team and wish to have all correspondence, email records, and diagnostic logs permanently deleted, you may submit a request:</li></ul><div class="policy-highlight-box"><strong>Submit a Deletion Request:</strong> Send an email with subject <code>"Data Deletion Request - MuziPlay"</code> to <a href="mailto:manootech2030@gmail.com?subject=Data%20Deletion%20Request%20-%20MuziPlay" class="gradient-cyan"><strong>manootech2030@gmail.com</strong></a>. All associated email correspondence will be permanently purged within 48 business hours.</div>`,

    muzi_sec8_title: "8. Children's Privacy (COPPA Compliance)",
    muzi_sec8_body: `<p>MuziPlay is designed for a general audience and is not directed to children under the age of 13 (or under 16 within the European Economic Area). We do not knowingly collect personal information from children.</p><p>If you are a parent or legal guardian and believe that your child has provided personal information to us, please contact us immediately at <a href="mailto:manootech2030@gmail.com" class="gradient-cyan">manootech2030@gmail.com</a>, and we will promptly take steps to delete any such data.</p>`,

    muzi_sec9_title: "9. Data Security & Encryption Standards",
    muzi_sec9_body: `<p>We prioritize user data protection through industry-standard technical safeguards:</p><ul><li><strong>Encryption in Transit:</strong> Any outgoing network requests initiated by MuziPlay (such as fetching lyrics or verifying updates) utilize secure cryptographic protocols (HTTPS / TLS 1.3).</li><li><strong>Local Sandboxing:</strong> Android's application sandbox isolates MuziPlay from other apps on your device, preventing unauthorized third-party apps from accessing MuziPlay's internal files.</li></ul>`,

    muzi_sec10_title: "10. Contact Developer & Data Controller",
    muzi_sec10_body: `<p>If you have any questions, regulatory inquiries, or concerns regarding this Privacy Policy or MuziPlay's data protection practices, please contact our engineering and compliance team:</p><div class="policy-contact-banner"><h4 data-i18n="muzi_contact_banner_title">MANOO Tech — MuziPlay Compliance Team</h4><p data-i18n="muzi_contact_banner_sub">Direct point of contact for Google Play compliance, data rights, and technical queries.</p><a href="mailto:manootech2030@gmail.com?subject=MuziPlay%20Privacy%20Inquiry" class="btn-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>manootech2030@gmail.com</span></a></div>`,
    muzi_contact_banner_title: "MANOO Tech — MuziPlay Compliance Team",
    muzi_contact_banner_sub: "Direct point of contact for Google Play compliance, data rights, and technical queries."
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
    footer_top: "العودة للأعلى ↑",

    policy_back_home: "العودة للاستوديو",
    policy_badge: "وثيقة الخصوصية الرسمية للاستوديو والتطبيقات",
    policy_hero_title: `سياسة الخصوصية و<span class="gradient-text">حماية البيانات</span>`,
    policy_hero_sub: "في <bdi dir=\"ltr\">MANOO Tech</bdi>، تُعد خصوصيتك ركيزة أساسية في أسلوب تصميمنا وتطويرنا للبرمجيات. توضح هذه الوثيقة التزامنا الصارم بالشفافية وأمان البيانات والامتثال لمعايير متجر Google Play العالمية عبر منصاتنا وتطبيقات الأندرويد.",
    policy_meta_compliance: "متوافق مع معايير Google Play و GDPR",
    policy_last_updated: "آخر تحديث: سبتمبر 2026 | سارية المفعول فوراً",
    policy_toc_heading: "أقسام السياسة",
    toc_1: "1. المقدمة ونطاق التطبيق",
    toc_2: "2. عدم بيع البيانات نهائياً",
    toc_3: "3. أذونات الجهاز والمعالجة",
    toc_4: "4. خدمات الطرف الثالث",
    toc_5: "5. معايير أمان البيانات",
    toc_6: "6. حماية خصوصية الأطفال",
    toc_7: "7. حقوق المستخدمين ومسح البيانات",
    toc_8: "8. الشروط وحقوق الملكية",
    toc_9: "9. التواصل مع مسؤول الخصوصية",
    sec1_title: "1. المقدمة ونطاق التطبيق",
    sec1_body: `<p>تنطبق سياسة الخصوصية هذه على جميع المنتجات والبرمجيات الرقمية المطورة والمُدارة والمنشورة بواسطة <strong><bdi dir="ltr">MANOO Tech</bdi></strong> («الاستوديو» أو «نحن»)، بما يشمل موقعنا الإلكتروني الرسمي وجميع تطبيقات الموبايل المنشورة على متجر Google Play (مثل MuziPlay و Brixy وأي إصدارات قادمة).</p><p>يعتبر تنزيلك أو تثبيتك أو استخدامك لأي من تطبيقاتنا أو خدمات الويب الخاصة بنا إقراراً وموافقةً على الشروط والممارسات الموضحة في هذه الوثيقة. نوصي بقراءة هذه السياسة بعناية لفهم كيفية صون خصوصيتك الرقمية.</p>`,
    sec2_title: "2. الخصوصية بالتصميم وعدم بيع البيانات نهائياً",
    sec2_body: `<p>يعمل استوديو MANOO Tech وفق فلسفة هندسية صارمة تُعرف بـ <strong>الخصوصية بالتصميم (Privacy-by-Design)</strong>؛ نؤمن بأن البرمجيات الممتازة يجب أن تخدم المستخدم دون أدنى تطفل على حياته الرقمية.</p><div class="policy-highlight-box"><strong>تعهدنا الراسخ:</strong> نحن <em>لا نجمع، ولا نخزن، ولا نتاجر، ولا نؤجر، ولا نبيع</em> بياناتك ومعرفاتك الشخصية، أو اسمك، أو أرقام هواتفك، أو جهات اتصالك، أو موقعك الجغرافي، أو ملفاتك الخاصة لأي وسطاء بيانات أو شركات إعلانية.</div><p>نحن نبني برمجيات فائقة الأداء، ومحركات صوتية، وألعاب تفاعلية ممتعة. إن التربح من البيانات الشخصية للمستخدمين ليس جزءاً من نموذج عملنا ولن يكون كذلك أبداً.</p>`,
    sec3_title: "3. أذونات الجهاز والمعالجة المحلية",
    sec3_body: `<p>تطلب تطبيقاتنا فقط الحد الأدنى الصارم من أذونات التشغيل اللازمة لتقديم وظائفها الأساسية:</p><ul><li><strong>أذونات الوسائط والتخزين المحلي:</strong> تُستخدم محلياً وحصرياً داخل جهازك بواسطة مشغل الوسائط (مثل MuziPlay) لفهرسة وتشغيل ملفاتك الصوتية المخزنة وعرض أغلفة الألبومات. لا يتم نقل أي من ملفاتك الصوتية إلى خوادمنا إطلاقاً.</li><li><strong>خدمة العمل في الخلفية (Foreground Service):</strong> تُستخدم للحفاظ على استمرار تشغيل الصوت وعرض عناصر التحكم في الإشعارات وشاشة القفل أثناء استخدام تطبيقات أخرى.</li><li><strong>الاتصال بالإنترنت:</strong> يُستخدم حصرياً لتشغيل البث عبر الويب، أو فحص التحديثات، أو تنزيل الكلمات المتزامنة التي يطلبها المستخدم بنفسه.</li><li><strong>الاهتزاز والتفاعل اللمسي (Haptic Feedback):</strong> يُستخدم في ألعابنا (مثل Brixy) لإعطاء تجربة لمسية ممتعة أثناء مطابقة المكعبات.</li></ul>`,
    sec4_title: "4. خدمات الطرف الثالث والبيانات التقنية",
    sec4_body: `<p>لضمان استقرار التطبيقات ومنع حدوث أعطال مفاجئة ومتابعة الأداء، قد تتكامل تطبيقاتنا مع أدوات برمجية قياسية مقدمة من شركة Google:</p><ul><li><strong>خدمات Google Play (Google Play Services):</strong> لتمكين الميزات الأساسية للنظام، والتحقق من سلامة التطبيق، وإجراء التحديثات الداخلية السلسة.</li><li><strong>تشخيص الأعطال وتقارير الأداء:</strong> بيانات تقنية مجهولة ومجمعة (مثل طراز الهاتف، وإصدار الأندرويد، وسجل تتبع الأخطاء البرمجية) تساعدنا في اكتشاف الأعطال وحلها فوراً.</li><li><strong>الإعلانات العامة غير المخصصة:</strong> في حال توفر إصدار مجاني مدعوم بإعلانات، قد تعرض شبكات Google الإعلانية إعلانات سياقية متوافقة مع سياسات مطوري Google Play. يمكنك في أي وقت إعادة ضبط معرّف الإعلانات الخاص بك من إعدادات جهازك بنظام Android.</li></ul>`,
    sec5_title: "5. معايير أمان وتخزين البيانات",
    sec5_body: `<p>نلتزم بأعلى معايير الحماية التقنية؛ تتم جميع الاتصالات الشبكية في مواقعنا وتطبيقاتنا عبر بروتوكولات التشفير الحديثة (HTTPS / TLS 1.3).</p><p>نحن لا نحتفظ بأي ملفات تعريف دائمة للمستخدمين على خوادم بعيدة، وتخضع السجلات التقنية المجهولة لدى خدمات التحليلات المعتمدة لسياسات تدوير ومسح دورية تلقائية بما يتوافق مع المعايير العالمية.</p>`,
    sec6_title: "6. حماية خصوصية الأطفال (COPPA)",
    sec6_body: `<p>حماية خصوصية الأطفال تحظى بأولوية قصوى لدينا. جميع تطبيقاتنا مصممة للجمهور العام، ونحن لا نقوم عن قصد أو علم بجمع أي بيانات شخصية من الأطفال دون سن 13 عاماً (أو دون سن 16 عاماً في المنطقة الاقتصادية الأوروبية).</p><p>إذا كنت ولي أمر أو وصياً واكتشفت أن طفلك قد زودنا بمعلومات شخصية دون موافقتك، يرجى مراسلتنا فوراً عبر <a href="mailto:manootech2030@gmail.com" class="gradient-cyan">manootech2030@gmail.com</a>، وسنتخذ فوراً الإجراءات الفورية لمسح تلك البيانات نهائياً.</p>`,
    sec7_title: "7. حقوق المستخدمين ومسح البيانات (GDPR / Google Play)",
    sec7_body: `<p>بموجب اللائحة العامة لحماية البيانات (GDPR) وقوانين الخصوصية العالمية وسياسات Google Play، يتمتع جميع المستخدمين بحقوق كاملة تجاه بياناتهم الرقمية:</p><ul><li><strong>حق الاطلاع والاستعلام:</strong> يمكنك طلب نسخة من أي سجلات تواصل أو بيانات تقنية مجهولة مرتبطة بمراسلاتك.</li><li><strong>حق المسح والحذف النهائي (Right to Erasure):</strong> يمكنك طلب حذف أي مراسلات دعم فني أو بيانات مرتبطة بك بشكل نهائي لا رجعة فيه.</li><li><strong>حق إلغاء التخصيص:</strong> يمكنك إلغاء الإعلانات المخصصة من خلال تعطيلها مباشرة من إعدادات جهازك الأندرويد.</li></ul><div class="policy-highlight-box"><strong>طريقة تقديم طلب مسح البيانات:</strong> أرسل بريداً إلكترونياً بعنوان <code>"Data Deletion Request"</code> إلى <a href="mailto:manootech2030@gmail.com?subject=Data%20Deletion%20Request%20-%20MANOO%20Tech" class="gradient-cyan"><strong>manootech2030@gmail.com</strong></a>، وسيتم تأكيد وتنفيذ طلبك خلال 48 ساعة عمل كحد أقصى.</div>`,
    sec8_title: "8. الشروط والأحكام وحقوق الملكية الفكرية",
    sec8_body: `<p>جميع التطبيقات، والمعماريات البرمجية، والشعارات، وخوارزميات الصوت، وميكانيكا الألعاب، والأصول الرسومية المنشورة تحت اسم <strong><bdi dir="ltr">MANOO Tech</bdi></strong> محمية بموجب قوانين حقوق النشر والملكية الفكرية الدولية.</p><p>يُمنح المستخدم ترخيصاً شخصياً غير حصري وقابلاً للإلغاء لتنزيل واستخدام التطبيقات من القنوات الرسمية (مثل Google Play). يُحظر تماماً تفكيك التطبيقات هندسياً، أو إعادة تجميعها، أو استخراج أجزاء برمجية منها لأغراض تجارية دون إذن كتابي مسبق من إدارة الاستوديو.</p>`,
    sec9_title: "9. التواصل المباشر مع مسؤول الخصوصية بالاستوديو",
    sec9_body: `<p>إذا كان لديك أي استفسار قانوني، أو تنظيمي، أو فني يتعلق بهذه السياسة وممارسات أمان البيانات لدينا، فإن فريق الامتثال والهندسة متاح للتواصل مباشرة:</p><div class="policy-contact-banner"><h4 data-i18n="policy_banner_title">فريق الهندسة والامتثال بـ MANOO Tech</h4><p data-i18n="policy_banner_sub">نقطة التواصل المباشرة للامتثال لمتجر Google Play وحقوق البيانات والاستفسارات القانونية.</p><a href="mailto:manootech2030@gmail.com" class="btn-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>manootech2030@gmail.com</span></a></div>`,
    policy_banner_title: "فريق الهندسة والامتثال بـ MANOO Tech",
    policy_banner_sub: "نقطة التواصل المباشرة للامتثال لمتجر Google Play وحقوق البيانات والاستفسارات القانونية.",

    // MuziPlay Specific Privacy Policy (Arabic)
    nav_general_policy: "سياسة الاستوديو العامة",
    muzi_priv_badge: "وثيقة سياسة الخصوصية الرسمية للتطبيق",
    muzi_priv_hero_title: `سياسة خصوصية تطبيق <span class="gradient-text">MuziPlay</span>`,
    muzi_priv_hero_sub: "سياسة الخصوصية وحماية البيانات الرسمية والشاملة لتطبيق الأندرويد MuziPlay. توضح هذه الوثيقة التزامنا الصارم بمعالجة البيانات محلياً داخل جهازك، وتفاصيل أذونات التشغيل، والامتثال الكامل لسياسات مطوري متجر Google Play.",
    muzi_priv_pub: `المطور والناشر: <strong><bdi dir="ltr">MANOO Tech</bdi></strong> • للتواصل: <strong>manootech2030@gmail.com</strong>`,
    muzi_priv_view_play: "مشاهدة التطبيق على متجر Google Play",
    muzi_priv_last_updated: "تاريخ السريان: أكتوبر 2026 | آخر تحديث: 31 أكتوبر 2026",
    muzi_toc_1: "1. النطاق وهوية التطبيق",
    muzi_toc_2: "2. عدم جمع أو بيع البيانات",
    muzi_toc_3: "3. أذونات نظام أندرويد",
    muzi_toc_4: "4. التخزين ومعالجة الصوت محلياً",
    muzi_toc_5: "5. خصوصية البث والتحميل",
    muzi_toc_6: "6. خدمات الطرف الثالث وحزم SDK",
    muzi_toc_7: "7. حقوق المستخدمين وحذف البيانات",
    muzi_toc_8: "8. حماية خصوصية الأطفال (COPPA)",
    muzi_toc_9: "9. أمان البيانات والتشفير",
    muzi_toc_10: "10. التواصل مع المطور والمسؤول",

    muzi_sec1_title: "1. النطاق وهوية التطبيق",
    muzi_sec1_body: `<p>تنطبق سياسة الخصوصية هذه حصرياً وبشكل خاص على تطبيق نظام الأندرويد <strong>MuziPlay</strong> (معرّف الحزمة البرمجية: <code>com.aistudio.muziplay.xnxfyx</code>)، والمطور والمنشور والمُدار بالكامل بواسطة استوديو <strong><bdi dir="ltr">MANOO Tech</bdi></strong> («الاستوديو» أو «نحن»).</p><p>تطبيق MuziPlay هو مركز وسائط متكامل يجمع بين متصفح ويب لبث الوسائط بدون إعلانات، ومحمّل وسائط فائق السرعة، ومحرك مزامنة كلمات الأغاني (Lyrics)، ومشغل صوت احترافي بمعالجة DSP وميزات Equalizer Pro وعزل الصوت الذكي Smart Audio Isolation.</p><p>يعد تثبيتك أو استخدامك أو تحديثك لتطبيق MuziPlay موافقة صريحة على الممارسات والشروط الموضحة في هذه الوثيقة.</p>`,

    muzi_sec2_title: "2. الخصوصية بالتصميم وعدم بيع البيانات الشخصية نهائياً",
    muzi_sec2_body: `<p>تمت هندسة تطبيق MuziPlay وفق فلسفة صارمة تُعرف بـ <strong>الخصوصية بالتصميم (Privacy-by-Design)</strong>. لا يتطلب منك التطبيق إنشاء أي حساب، أو تسجيل الدخول، أو تقديم أي معلومات تعريفية شخصية (مثل الاسم، أو البريد الإلكتروني، أو رقم الهاتف، أو العنوان، أو بيانات الدفع) للوصول إلى ميزاته الأساسية.</p><div class="policy-highlight-box"><strong>عدم بيع البيانات نهائياً:</strong> نحن <em>لا نجمع، ولا نخزن، ولا نبيع، ولا نؤجر، ولا نتربح</em> من بيانات هويتك الشخصية، أو جهات اتصالك، أو موقعك الجغرافي، أو ملفاتك الصوتية. لم نقم أبداً ببيع بيانات شخصية لأي وسطاء بيانات أو أطراف ثالثة ولن نفعل ذلك إطلاقاً.</div>`,

    muzi_sec3_title: "3. أذونات تشغيل نظام أندرويد والضرورة التقنية",
    muzi_sec3_body: `<p>امتثالاً لمتطلبات سياسات مطوري متجر Google Play، يطلب تطبيق MuziPlay الحد الأدنى فقط من أذونات التشغيل اللازمة تقنياً لأداء وظائف تشغيل وتنزيل الوسائط:</p><ul><li><strong>READ_MEDIA_AUDIO / READ_EXTERNAL_STORAGE:</strong> مطلوب حصرياً لاكتشاف وفهرسة وتشغيل المقاطع الصوتية المخزنة على هاتفك وعرض أغلفة الألبومات. تظل ملفاتك الصوتية بالكامل داخل جهازك، ولا يتم أبداً رفعها أو فحصها على خوادم سحابية أو إرسالها خارج هاتفك.</li><li><strong>FOREGROUND_SERVICE & FOREGROUND_SERVICE_MEDIA_PLAYBACK:</strong> مطلوب لضمان استمرار تشغيل الموسيقى بسلاسة ودون انقطاع عند الخروج من التطبيق أو إغلاق الشاشة، وتوفير أزرار التحكم الثابتة في لوحة الإشعارات وشاشة القفل (تشغيل، إيقاف، المسار التالي، السابق).</li><li><strong>POST_NOTIFICATIONS:</strong> مطلوب في نظام أندرويد 13 (API 33) فما فوق لعرض إشعارات حالة التشغيل وأدوات التحكم في الوسائط ونسبة تقدم التنزيل.</li><li><strong>INTERNET & ACCESS_NETWORK_STATE:</strong> مطلوب لتمكين تشغيل البث عند طلبك، وتحميل كلمات الأغاني المتزامنة، والتحقق من سلامة التطبيق وتحديثاته عبر Google Play.</li><li><strong>WAKE_LOCK:</strong> مطلوب لمنع وضع السكون بالنظام من مقاطعة تشغيل المقاطع الصوتية أثناء قفل الشاشة.</li></ul>`,

    muzi_sec4_title: "4. التخزين المحلي ومعالجة الصوت DSP داخل الجهاز",
    muzi_sec4_body: `<p>يحتوي MuziPlay على ميزات هندسية صوتية فائقة الدقة تشمل معادل الصوت Equalizer Pro، وتضخيم Bass، والصوت المجسم 3D، وعزل الصوت الذكي Smart Audio Isolation:</p><ul><li><strong>معالجة داخل الجهاز بنسبة 100%:</strong> جميع خوارزميات معالجة الترددات وعزل الصوت تعمل كلياً على معالج جهازك المحلي. لا يتم إرسال أي صوتيات إلى خوادم خارجية أو معالجات سحابية.</li><li><strong>قوائم التشغيل والمفضلات:</strong> تُحفظ قوائم التشغيل الخاصة بك، وسجل الاستماع، وإعدادات المعادل حصرياً داخل مساحة التخزين المعزولة للتطبيق (Sandbox).</li></ul>`,

    muzi_sec5_title: "5. خصوصية متصفح البث وتنزيل الوسائط",
    muzi_sec5_body: `<p>عند استخدام متصفح البث أو تنزيل الوسائط داخل MuziPlay:</p><ul><li><strong>خصوصية التصفح:</strong> يتصل المتصفح مباشرة بين جهازك والمواقع التي تختار زيارتها. لا تعمل MANOO Tech كوسيط (Proxy)، ولا نراقب أو نسجل أو نفحص روابط التصفح أو استعلامات البحث أو الملفات المحملة.</li><li><strong>المحتوى المُنزّل:</strong> تُحفظ الملفات التي تقوم بتنزيلها مباشرة في مجلد التخزين الذي تحدده على هاتفك، ولا نحتفظ بأي سجلات أو فهارس لما تقوم بتنزيله.</li></ul>`,

    muzi_sec6_title: "6. خدمات الطرف الثالث وحزم Google Play SDK",
    muzi_sec6_body: `<p>لضمان استقرار التطبيق وتوفير التحديثات الموثوقة والتحقق من التراخيص، يتكامل MuziPlay مع أدوات مطوري Google الرسمية:</p><ul><li><strong>خدمات Google Play (Google Play Services):</strong> تُستخدم لأمان وسلامة التطبيق، وإجراء التحديثات السلسة، والتحقق من سلامة البيئة البرمجية. تخضع لسياسة خصوصية Google.</li><li><strong>تقارير الأعطال والتشخيص المجهولة:</strong> في حال حدوث عطل غير متوقع، قد يتم إرسال بيانات تقنية مجهولة المصدر (مثل طراز الهاتف وإصدار الأندرويد وسجل تتبع الخطأ) لمساعدتنا في إصلاح العطل بسرعة. لا تحتوي هذه التقارير على أي بيانات شخصية.</li><li><strong>شبكات الإعلانات (إن وجدت):</strong> في حال توفر إصدار مجاني مدعوم بإعلانات، قد تقدم شبكات Google إعلانات سياقية متوافقة تماماً مع معايير Google Play. يمكنك إعادة تعيين معرّف الإعلانات أو حذفه في أي وقت من إعدادات هاتفك.</li></ul>`,

    muzi_sec7_title: "7. حقوق المستخدمين وآلية الحذف النهائي للبيانات",
    muzi_sec7_body: `<p>التزاماً باللائحة العامة لحماية البيانات (GDPR) وقانون خصوصية المستهلك بكاليفورنيا (CCPA) ومتطلبات حذف بيانات التطبيقات في Google Play:</p><ul><li><strong>حذف البيانات المحلية:</strong> يمكنك مسح كافة بيانات التطبيق المحلية والإعدادات وقوائم التشغيل وكلمات الأغاني المؤقتة في أي وقت عبر <em>إعدادات الأندرويد &gt; التطبيقات &gt; MuziPlay &gt; مسح التخزين / مسح البيانات</em>، أو ببساطة بإلغاء تثبيت التطبيق.</li><li><strong>حذف سجلات الدعم الفني:</strong> إذا تواصلت سابقاً مع فريق الدعم وترغب في حذف جميع المراسلات وسجلات البريد نهائياً:</li></ul><div class="policy-highlight-box"><strong>طريقة تقديم طلب الحذف:</strong> أرسل بريداً بعنوان <code>"Data Deletion Request - MuziPlay"</code> إلى <a href="mailto:manootech2030@gmail.com?subject=Data%20Deletion%20Request%20-%20MuziPlay" class="gradient-cyan"><strong>manootech2030@gmail.com</strong></a>، وسيتم مسح وتأكيد حذف كافة المراسلات خلال 48 ساعة عمل.</div>`,

    muzi_sec8_title: "8. حماية خصوصية الأطفال (COPPA)",
    muzi_sec8_body: `<p>تطبيق MuziPlay مصمم وموجّه للجمهور العام، وليس موجهاً للأطفال دون سن 13 عاماً (أو دون سن 16 عاماً في المنطقة الاقتصادية الأوروبية). نحن لا نجمع عن قصد أي معلومات من الأطفال.</p><p>إذا كنت أحد الوالدين واكتشفت أن طفلك قد زودنا بمعلومات دون موافقتك، يرجى مراسلتنا فوراً عبر <a href="mailto:manootech2030@gmail.com" class="gradient-cyan">manootech2030@gmail.com</a> لمسحها في الحال.</p>`,

    muzi_sec9_title: "9. معايير أمان وتشفير البيانات",
    muzi_sec9_body: `<p>نطبق أفضل المعايير التقنية لحماية البيانات:</p><ul><li><strong>التشفير أثناء النقل:</strong> تتم كافة الطلبات الشبكية التي يطلبها التطبيق (مثل تنزيل الكلمات أو فحص التحديثات) عبر بروتوكولات مشفرة وآمنة (HTTPS / TLS 1.3).</li><li><strong>عزل التطبيق (Sandboxing):</strong> يعزل نظام الأندرويد تطبيق MuziPlay عن التطبيقات الأخرى، مما يمنع التطبيقات غير المصرح لها من الوصول لملفات التطبيق الداخلية.</li></ul>`,

    muzi_sec10_title: "10. التواصل المباشر مع مطور التطبيق",
    muzi_sec10_body: `<p>إذا كان لديك أي استفسار قانوني أو تنظيمي أو تقني يخص سياسة الخصوصية هذه أو ممارسات حماية البيانات في MuziPlay، فإن فريقنا متاح للتواصل مباشرة:</p><div class="policy-contact-banner"><h4 data-i18n="muzi_contact_banner_title">فريق الامتثال والهندسة بتطبيق MuziPlay - MANOO Tech</h4><p data-i18n="muzi_contact_banner_sub">نقطة التواصل المباشرة للامتثال لمتجر Google Play، وحقوق حذف البيانات، والاستفسارات التقنية.</p><a href="mailto:manootech2030@gmail.com?subject=MuziPlay%20Privacy%20Inquiry" class="btn-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>manootech2030@gmail.com</span></a></div>`,
    muzi_contact_banner_title: "فريق الامتثال والهندسة بتطبيق MuziPlay - MANOO Tech",
    muzi_contact_banner_sub: "نقطة التواصل المباشرة للامتثال لمتجر Google Play، وحقوق حذف البيانات، والاستفسارات التقنية."
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
  if (!header) return;
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
