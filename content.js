const websiteContent = {
  // EDIT INFORMASI WEBSITE DI SINI
  site: {
    title: "Dicky Creative Works | Short-Form Video Ads & Creative Direction",
    description: "Portfolio Dicky Creative Works untuk short-form video ads, UGC-style creative, script writing, product commercial, dan video editing.",
    brandName: "Dicky Creative Works",
    profileImage: "assets/profile.png",
    footerDescription: "Short-Form Video Ads, Script & Creative Direction",
    copyrightText: "All rights reserved.",
    accessibility: {
      navigationLabel: "Main navigation",
      brandHomeLabel: "Dicky Creative Works home",
      menuOpenLabel: "Open navigation menu",
      capabilityLabel: "Capabilities",
      creativeHighlightsLabel: "Creative highlights",
      projectCategoriesLabel: "Project categories",
      profileAlt: "Dicky Creative Works profile portrait"
    }
  },

  navigation: [
    { label: "Home", target: "#home" },
    { label: "Projects", target: "#projects" },
    { label: "Services", target: "#services" },
    { label: "About", target: "#about" },
    { label: "Contact", target: "#contact" }
  ],

  navButton: {
    label: "Start a Project",
    target: "#contact"
  },

  // EDIT HERO DI SINI
  hero: {
    smallText: "Creative Video & Script Writer",
    role: "Available for freelance & project-based work",
    headline: "Short-Form Ads\nBuilt to Perform",
    description: "Saya membantu brand mengubah product insight menjadi video ads yang cepat menarik perhatian, mudah dipahami, dan siap digunakan untuk campaign.",
    primaryButton: {
      label: "View Work",
      target: "#projects"
    },
    secondaryButton: {
      label: "Contact Dicky",
      target: "#contact"
    }
  },

  capabilityStrip: [
    "Creative built for attention, clarity, and action",
    "AI-Assisted Video",
    "Meta Ads",
    "Instagram Reels",
    "YouTube Shorts",
    "Script Writing",
    "Video Editing"
  ],

  // EDIT ABOUT DI SINI
  about: {
    label: "About Dicky",
    headline: "Turning Product Insights into Videos People Want to Watch",
    paragraphs: [
      "Saya mengembangkan short-form video untuk paid ads dan organic content, mulai dari riset angle, hook, script, hingga arahan visual. Tujuannya sederhana: membuat pesan brand lebih cepat dipahami dan lebih menarik untuk ditonton.",
      "Setiap project dikerjakan dengan perpaduan storytelling, marketing awareness, dan visual direction. Selain ads, saya juga menangani product commercial, event highlight, serta cinematic editing untuk kebutuhan brand."
    ],
    badges: [
      "Audience & Angle Research",
      "Hook Development",
      "Script & Storyboard",
      "Visual Direction",
      "Performance Mindset",
      "Platform-Native Format"
    ]
  },

  // EDIT PORTFOLIO DI SINI
  portfolio: {
    label: "Selected Work",
    headline: "Ads, Product Stories, and Visuals Made for Digital",
    allCategoryLabel: "All",
    buttonLabel: "Watch Project",
    closePlayerLabel: "Close video player",
    playLabel: "Play",
    placeholderLabel: "Short Video Preview",
    videoErrorLabel: "Preview tidak dapat diputar langsung.",
    videoErrorAction: "Buka video",
    platformLabel: "Format",
    defaultOrientation: "vertical",

    // Tambahkan portfolio baru dengan copy-paste salah satu contoh object di bawah.
    // Jika category diganti atau ditambah, tab filter akan otomatis mengikuti.
    // Gunakan orientation: "vertical" untuk video Reels/Shorts 9:16.
    // Jika nanti ada video horizontal, gunakan orientation: "landscape".
    // Thumbnail Google Drive dan YouTube akan diambil otomatis dari link.
    // Agar video bisa diputar langsung di card, tambahkan videoSource berupa URL/file .mp4.
    // Contoh: videoSource: "assets/videos/nama-video.mp4"
    // Link Google Drive tetap bisa dipakai untuk mengambil thumbnail otomatis.
    // Untuk link lain, kamu tetap bisa menambahkan thumbnail: "assets/nama-file.jpg".
    projects: [
      {
        title: "Spencer's MealBlend - AI Short Video Ads",
        category: "AI Ads",
        description: "A series of AI-assisted vertical ads exploring multiple hooks and visual angles for Meta campaign testing.",
        platform: "Meta Ads, Instagram Reels",
        link: "https://drive.google.com/open?id=1102dQFULTB5iDX33KWeBiZ7N1WhQWKWe&usp=drive_fs",
        videoSource: "assets/videos/mealblend-ai-ads.mp4",
        thumbnail: "assets/thumbnails/mealblend-ai-ads.jpg",
        orientation: "vertical",
        tags: ["AI Video", "Meta Ads", "Reels"]
      },
      {
        title: "BurnX Matcha - UGC Style Testimonial Ads",
        category: "UGC Style",
        description: "Testimonial-led creative combining a relatable pain point, clear product benefit, and direct-response CTA.",
        platform: "Instagram Reels, Meta Ads",
        link: "https://drive.google.com/file/d/14Zq5Ei77HC7m7dbPRfKTkKDChCPT6uF_/view?usp=sharing",
        videoSource: "assets/videos/burnx-matcha-ugc.mp4",
        thumbnail: "assets/thumbnails/burnx-matcha-ugc.jpg",
        orientation: "vertical",
        tags: ["UGC", "Testimonial", "CTA"]
      },
      {
        title: "MealBlend Men - Motion Graphic Ads",
        category: "AI Ads",
        description: "Motion-led product ad designed to communicate the offer quickly while keeping the visual premium.",
        platform: "Meta Ads, Reels",
        link: "https://drive.google.com/open?id=1K0jCt2jH136E_6elWicPTy6kM3v0_oBG&usp=drive_fs",
        videoSource: "assets/videos/mealblend-men-motion.mp4",
        thumbnail: "assets/thumbnails/mealblend-men-motion.jpg",
        orientation: "vertical",
        tags: ["Motion", "Performance", "Reels"]
      },
      {
        title: "Artisan Tea Series - Product Launch Video",
        category: "Commercial",
        description: "Launch reel pairing atmospheric product visuals with concise, social-first messaging.",
        platform: "Instagram Reels, Meta Ads",
        link: "https://drive.google.com/file/d/1EQw5btXT9qpADDt9JUfiGKhNv0WsZT9p/view?usp=sharing",
        videoSource: "assets/videos/artisan-tea-launch.mp4",
        thumbnail: "assets/thumbnails/artisan-tea-launch.jpg",
        orientation: "vertical",
        tags: ["Launch", "Product", "Social"]
      },
      {
        title: "Padel Lifestyle UGC Ads",
        category: "UGC Style",
        description: "UGC-style lifestyle concept built around a relatable active-wellness audience.",
        platform: "Instagram Reels, Meta Ads",
        link: "https://drive.google.com/file/d/1AJFmfuvECBhKg_KJmHSqN-TYujoEttCj/view?usp=sharing",
        videoSource: "assets/videos/padel-lifestyle-ugc.mp4",
        thumbnail: "assets/thumbnails/padel-lifestyle-ugc.jpg",
        orientation: "vertical",
        tags: ["Lifestyle", "UGC", "Wellness"]
      },
      {
        title: "Before After Transformation Concept",
        category: "AI Ads",
        description: "A clear before-after narrative designed to make the product outcome easy to understand.",
        platform: "Meta Ads",
        link: "https://drive.google.com/open?id=1SZaS_IIXGIA1VHu-XL-UvQPm_g6Xty3Q&usp=drive_fs",
        videoSource: "assets/videos/before-after-transformation.mp4",
        thumbnail: "assets/thumbnails/before-after-transformation.jpg",
        orientation: "vertical",
        tags: ["AI", "Story", "Conversion"]
      },
      {
        title: "AI Product Commercial Video",
        category: "Commercial",
        description: "AI-assisted product commercial focused on premium presentation, visual rhythm, and brand recall.",
        platform: "Website, Instagram Reels",
        link: "https://drive.google.com/open?id=1W0M7HwaWjy2gmXUqVqw-0oc1Js860FF_&usp=drive_fs",
        videoSource: "assets/videos/ai-product-commercial.mp4",
        thumbnail: "assets/thumbnails/ai-product-commercial.jpg",
        orientation: "vertical",
        tags: ["Commercial", "Brand", "Product"]
      },
      {
        title: "Event Highlight Editing",
        category: "Event",
        description: "Fast-paced event recap shaped around key moments, atmosphere, and clean transitions.",
        platform: "Instagram, YouTube Shorts",
        link: "https://drive.google.com/file/d/1-OPcAuM0LJ7rf6vQA2bVJTvaB5MSrvkb/view?usp=sharing",
        thumbnail: "assets/thumbnails/event-highlight-editing.jpg",
        orientation: "vertical",
        tags: ["Event", "Editing", "Shorts"]
      },
      {
        title: "Cinematic Brand Video",
        category: "Cinematic",
        description: "Cinematic brand edit balancing mood, pacing, color, and clear visual storytelling.",
        platform: "YouTube, Instagram Reels",
        link: "https://drive.google.com/open?id=1krbTRcBTjue_Z7L8SbVoT5xrnRtWcq_T&usp=drive_fs",
        videoSource: "assets/videos/cinematic-brand.mp4",
        thumbnail: "assets/thumbnails/cinematic-brand.jpg",
        orientation: "vertical",
        tags: ["Cinematic", "Color", "Story"]
      }
    ]
  },

  // EDIT SERVICES DI SINI
  services: {
    label: "Services",
    headline: "Creative Support from First Idea to Final Cut",
    items: [
      {
        title: "Performance Video Ads",
        description: "Konsep short-form ads yang dibangun dari audience insight, product angle, dan objective campaign."
      },
      {
        title: "UGC-Style Creative",
        description: "Video bergaya natural dan relatable untuk Instagram Reels, YouTube Shorts, serta Meta Ads."
      },
      {
        title: "Script, Hook & CTA",
        description: "Hook, script, messaging angle, dan CTA yang membuat alur video lebih fokus dan mudah dipahami."
      },
      {
        title: "Creative Direction",
        description: "Storyboard, shot direction, reference visual, dan creative brief yang siap digunakan saat produksi."
      },
      {
        title: "Product & Brand Video",
        description: "Video produk dengan presentasi yang clean, premium, dan tetap selaras dengan karakter brand."
      },
      {
        title: "Editing & Creative Review",
        description: "Editing, pacing, visual polish, dan review creative untuk menghasilkan video yang siap dipublikasikan."
      }
    ]
  },

  // EDIT PROCESS DI SINI
  process: {
    label: "Process",
    headline: "A Clear Workflow, without Unnecessary Complexity",
    steps: [
      "Define the goal and deliverables",
      "Research the audience and offer",
      "Build the angle, hook, and script",
      "Develop the visual direction",
      "Produce or edit the video",
      "Review, refine, and deliver"
    ]
  },

  // EDIT FAQ DI SINI
  faq: {
    label: "FAQ",
    headline: "Pertanyaan yang Sering Ditanyakan",
    items: [
      {
        q: "Berapa revisi yang disertakan?",
        a: "Setiap project termasuk 2x revisi. Revisi tambahan dihitung per request."
      },
      {
        q: "Berapa lama proses pengerjaannya?",
        a: "Tergantung scope: 1 video ads biasanya 3-5 hari kerja, sudah termasuk script & editing."
      },
      {
        q: "Tools AI apa yang dipakai?",
        a: "AI video generation (Seedance, Kling, FLUX) membantu produksi. Hasil akhir tetap di-edit dan di-review manual agar sesuai dengan brand."
      },
      {
        q: "Apakah hasil video bebas dipakai untuk iklan berbayar?",
        a: "Ya, semua deliverable siap pakai untuk Meta Ads, TikTok, dan platform lainnya."
      },
      {
        q: "Format apa yang didukung?",
        a: "9:16 (Reels/Shorts), 1:1, dan 16:9 - menyesuaikan kebutuhan campaign."
      },
      {
        q: "Bagaimana alur kerjasamanya?",
        a: "Diskusi brief - proposal & harga - produksi (script, visual, edit) - revisi - deliver."
      }
    ]
  },

  // EDIT CONTACT DI SINI
  contact: {
    label: "Start a Project",
    headline: "Punya produk, brief, atau ide yang ingin dikembangkan?",
    description: "Ceritakan target audiens, objective campaign, dan format yang dibutuhkan. Saya akan membantu mengubahnya menjadi konsep video yang jelas dan siap dikerjakan.",
    note: "Belum punya brief lengkap? Tidak masalah. Gambaran singkat tentang produk dan goal sudah cukup untuk memulai.",
    links: [
      {
        label: "Chat via WhatsApp",
        url: "https://wa.me/6282228009011",
        style: "light",
        showInContact: true,
        showInFooter: false
      },
      {
        label: "Send an Email",
        url: "mailto:halo.dickynism@gmail.com",
        style: "dark",
        showInContact: true,
        showInFooter: false
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/dickynism/?hl=en",
        showInContact: false,
        showInFooter: true
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/dicky-christa-kurniawan-11405a1ab/",
        showInContact: false,
        showInFooter: true
      }
    ]
  }
};

window.websiteContent = websiteContent;
