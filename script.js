(() => {
  "use strict";
  const { projects, translations } = window.siteData;
  const root = document.documentElement;
  const depth = document.body.dataset.depth || "";
  const page = document.body.dataset.page || "home";
  let lang = localStorage.getItem("lang") || root.lang || "id";
  if (!translations[lang]) lang = "id";

  const path = (value) => depth + value;
  const get = (object, key) => key.split(".").reduce((value, part) => value && value[part], object);
  const drivePreview = (url) => {
    const match = url.match(/\/d\/([^/?]+)|[?&]id=([^&]+)/);
    return match ? `https://drive.google.com/file/d/${match[1] || match[2]}/preview` : url;
  };

  function renderChrome() {
    const t = translations[lang];
    document.querySelector("#siteHeader").innerHTML = `
      <nav class="navbar container" aria-label="${t.nav.menu}">
        <a class="brand" href="${path("index.html")}">DICKYNISM.INK</a>
        <button class="menu-toggle" type="button" aria-label="${t.nav.menu}" aria-expanded="false"><span></span><span></span></button>
        <div class="nav-menu" id="navMenu">
          ${["home","portfolio","services","about","contact"].map(key => `<a class="${page === key ? "active" : ""}" href="${path(key === "home" ? "index.html" : `${key}.html`)}">${t.nav[key]}</a>`).join("")}
          <a class="btn btn-primary" href="${path("contact.html")}">${t.nav.cta}</a>
          <div class="language-toggle" aria-label="${t.nav.language}"><button type="button" data-lang="id">ID</button><button type="button" data-lang="en">EN</button></div>
        </div>
      </nav>`;
    document.querySelector("#siteFooter").innerHTML = `<div class="container footer-inner"><span class="footer-brand">DICKYNISM.INK</span><a href="https://www.instagram.com/dickynism/?hl=en">Instagram</a><a href="https://www.linkedin.com/in/dicky-christa-kurniawan-11405a1ab/">LinkedIn</a><a href="https://wa.me/6282228009011">WhatsApp</a><a href="mailto:halo.dickynism@gmail.com">halo.dickynism@gmail.com</a></div>`;
    document.querySelectorAll("[data-lang]").forEach(button => {
      button.classList.toggle("active", button.dataset.lang === lang);
      button.addEventListener("click", () => { localStorage.setItem("lang", button.dataset.lang); lang = button.dataset.lang; render(); });
    });
    const toggle = document.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => {
      const open = document.querySelector("#navMenu").classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
  }

  function projectCards(items) {
    return items.map(project => `<article class="project-card" data-category="${project.category}" data-slug="${project.slug}"><a class="project-card-link" href="${path(`portfolio/${project.slug}.html`)}"><div class="project-thumb"><img src="${path(project.thumbnail)}" alt="${project.title}" width="1080" height="1350" loading="lazy"></div><span class="project-category">${project.category}</span><h3>${project.title}</h3></a></article>`).join("");
  }
  function stats(t) { return `<div class="stats-grid">${t.stats.map(item => `<div class="stat"><div class="stat-value">${item[0]}</div><div class="stat-label">${item[1]}</div></div>`).join("")}</div>`; }
  function timeline(t) {
    const companies = [["2019","GREAT VISINEMA"],["2021","EIGHT PRODUCTION"],["2022","PT. Tristar Global Indonesia"],["2024","PT. Aksara Digital Creative"],["2025","PT. SFS Group (Spencers Indonesia)"]];
    return `<div class="timeline">${companies.map((item,i) => `<div class="timeline-row"><span class="timeline-year">${item[0]}</span><span class="timeline-company">${item[1]}</span><span class="timeline-role">${t.timeline.roles[i]}</span></div>`).join("")}</div>`;
  }
  function head(label,title,level="h2") { return `<div class="section-head"><span class="eyebrow">${label}</span><${level}>${title}</${level}></div>`; }

  function renderHome(t) {
    document.querySelector("#pageContent").innerHTML = `
      <section class="hero"><div class="container hero-inner"><div class="hero-topline"><span class="eyebrow">${t.hero.eyebrow}</span><span class="availability"><span class="status-dot"></span>${t.hero.badge}</span></div><h1>${t.hero.before}<em>${t.hero.highlight}</em>${t.hero.after}</h1><p class="hero-description">${t.hero.description}</p><div class="button-row"><a class="btn btn-primary" href="#work">${t.hero.primary}</a><a class="btn btn-secondary" href="contact.html">${t.hero.secondary}</a></div></div></section>
      <div class="marquee"><div class="marquee-track container"><span>SPENCERS INDONESIA</span><span>BURNX</span><span>PADEL</span></div></div>
      <section class="section"><div class="container">${stats(t)}</div></section>
      <section class="section"><div class="container">${head(t.expertise.label,t.expertise.title)}<div class="expertise-grid">${t.expertise.items.map((item,i)=>`<article class="expertise-item"><span class="number">${String(i+1).padStart(2,"0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div></div></section>
      <section class="section"><div class="container">${head(t.about.label,t.about.title)}<div class="about-story"><img class="portrait" src="assets/profile.png" alt="Dicky Christa Kurniawan" loading="lazy">${t.about.text.split("\n\n").map(p=>`<p>${p}</p>`).join("")}</div></div></section>
      <section class="section" id="work"><div class="container">${head(t.common.selected,t.portfolio.title)}<div class="portfolio-grid">${projectCards(projects.slice(0,6))}</div><div class="portfolio-more"><a class="btn btn-secondary" href="portfolio.html">${t.common.allWork}</a></div></div></section>
      <section class="section"><div class="container">${head(t.timeline.label,t.timeline.title)}${timeline(t)}</div></section>
      <section class="section cta-band"><div class="container cta-inner"><h2>${t.common.ctaTitle}</h2><a class="btn btn-primary" href="contact.html">${t.common.start}</a></div></section>`;
  }

  function renderPortfolio(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.portfolio.eyebrow}</span><h1>${t.portfolio.title}</h1></div></section><section class="section"><div class="container"><div class="filters"><button class="filter-button active" data-filter="all">${t.portfolio.all}</button>${[...new Set(projects.map(p=>p.category))].map(category=>`<button class="filter-button" data-filter="${category}">${category}</button>`).join("")}</div><div class="portfolio-grid" id="portfolioGrid">${projectCards(projects)}</div></div></section>`;
    document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click",()=>{
      document.querySelectorAll("[data-filter]").forEach(item=>item.classList.remove("active")); button.classList.add("active");
      document.querySelectorAll(".project-card").forEach(card=>card.hidden=button.dataset.filter!=="all"&&card.dataset.category!==button.dataset.filter);
    }));
  }

  function renderServices(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.services.eyebrow}</span><h1>${t.services.title}</h1></div></section><section class="section"><div class="container"><div class="services-grid">${t.services.items.map((item,i)=>`<article class="service-card"><span class="number">${String(i+1).padStart(2,"0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div></div></section><section class="section"><div class="container">${head(t.common.process,lang==="id"?"Alur kerja yang jelas, tanpa kerumitan yang tidak perlu.":"A Clear Workflow, without Unnecessary Complexity")}<div class="process-list">${t.services.process.map((item,i)=>`<div class="process-row"><span>${String(i+1).padStart(2,"0")}</span><p>${item[0]}</p><small>${item[1]}</small></div>`).join("")}</div></div></section>`;
  }
  function renderAbout(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.about.label}</span><h1>${t.about.title}</h1></div></section><section class="section"><div class="container about-story"><img class="portrait" src="assets/profile.png" alt="Dicky Christa Kurniawan">${t.about.text.split("\n\n").map(p=>`<p>${p}</p>`).join("")}</div></section><section class="section"><div class="container">${stats(t)}</div></section><section class="section"><div class="container">${head(t.timeline.label,t.timeline.title)}${timeline(t)}</div></section>`;
  }
  function renderContact(t) {
    document.querySelector("#contactTitle").innerHTML=t.contact.title;
    document.querySelector("#contactSub").textContent=t.contact.sub;
    document.querySelectorAll("[data-i18n]").forEach(el=>{ const value=get(t,el.dataset.i18n); if(value) el.textContent=value; });
    document.querySelectorAll("#project-type option[data-service]").forEach((option,i)=>option.textContent=t.services.items[i][0]);
    document.querySelectorAll("#budget option[data-budget]").forEach((option,i)=>option.textContent=t.contact.budget[i]);
    document.querySelector("#faqList").innerHTML=t.faqItems.map(item=>`<div class="faq-item"><button class="faq-question" type="button" aria-expanded="false">${item[0]}</button><div class="faq-answer">${item[1]}</div></div>`).join("");
    document.querySelectorAll(".faq-question").forEach(button=>button.addEventListener("click",()=>{ const item=button.parentElement; item.classList.toggle("open"); button.setAttribute("aria-expanded",String(item.classList.contains("open"))); }));
  }
  function renderDetail(t) {
    const slug=document.body.dataset.slug;
    const project=projects.find(item=>item.slug===slug);
    if(!project) return;
    const media=project.videoSource ? `<video controls preload="none" poster="${path(project.thumbnail)}"><source src="${path(project.videoSource)}" type="video/mp4"></video>` : `<iframe src="${drivePreview(project.link)}" title="${project.title}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.title=`${project.title} | DICKYNISM.INK`;
    document.querySelector("meta[name=description]").content=lang==="id"?project.descriptionId:project.description;
    document.querySelector("meta[property='og:title']").content=project.title;
    document.querySelector("meta[property='og:description']").content=lang==="id"?project.descriptionId:project.description;
    document.querySelector("#pageContent").innerHTML=`<section class="section" style="padding-top:152px"><div class="container detail-shell"><div class="video-wrap">${media}</div><div class="detail-copy"><span class="eyebrow">${project.category} · ${project.platform}</span><h1>${project.title}</h1><p>${lang==="id"?project.descriptionId:project.description}</p>${(lang==="id"?project.storyId:project.story||"").split("\n\n").map(p=>`<p>${p}</p>`).join("")}<a class="btn btn-secondary" href="https://wa.me/6282228009011">${t.common.order}</a><a class="fallback-link" href="${project.link}" target="_blank" rel="noopener">${t.common.fallback}</a></div></div></section>`;
  }

  function openModal(slug) {
    const project = projects.find(item => item.slug === slug); if (!project) return;
    const t = translations[lang];
    const media = project.videoSource
      ? `<video controls autoplay muted playsinline preload="auto" poster="${path(project.thumbnail)}"><source src="${path(project.videoSource)}" type="video/mp4"></video>`
      : `<iframe src="${drivePreview(project.link)}" title="${project.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.querySelector("#modalBody").innerHTML = `
      <div class="modal-video">${media}</div>
      <div class="modal-info">
        <span class="eyebrow">${project.category} · ${project.platform}</span>
        <h3>${project.title}</h3>
        <p>${lang === "id" ? project.descriptionId : project.description}</p>
        ${(lang === "id" ? project.storyId : project.story || "").split("\n\n").map(p => `<p>${p}</p>`).join("")}
        <div class="modal-actions">
          <a class="btn btn-secondary" href="https://wa.me/6282228009011">${t.common.order}</a>
          <a class="fallback-link" href="${project.link}" target="_blank" rel="noopener">${t.common.fallback}</a>
          <a class="modal-detail-link" href="${path(`portfolio/${project.slug}.html`)}">${lang === "id" ? "Lihat cerita lengkap" : "View full story"}</a>
        </div>
      </div>`;
    const modal = document.querySelector("#videoModal");
    modal.hidden = false; document.body.style.overflow = "hidden";
    const video = modal.querySelector("video"); if (video) video.play().catch(() => {});
  }
  function closeModal() {
    const modal = document.querySelector("#videoModal"); if (!modal || modal.hidden) return;
    modal.hidden = true; modal.querySelector("#modalBody").innerHTML = ""; document.body.style.overflow = "";
  }
  function initModal() {
    if (document.querySelector("#videoModal")) return;
    const modal = document.createElement("div"); modal.className = "modal"; modal.id = "videoModal"; modal.hidden = true;
    modal.innerHTML = `<div class="modal-backdrop" data-modal-close></div><div class="modal-dialog" role="dialog" aria-modal="true"><button class="modal-close" data-modal-close aria-label="Tutup">&times;</button><div class="modal-body" id="modalBody"></div></div>`;
    document.body.appendChild(modal);
    document.addEventListener("click", e => {
      const closer = e.target.closest("[data-modal-close]");
      if (closer) { closeModal(); return; }
      const link = e.target.closest(".project-card-link");
      if (link && e.button === 0 && !e.metaKey && !e.ctrlKey) { e.preventDefault(); openModal(link.closest(".project-card").dataset.slug); }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }
  let revealObserver = null;
  function initFloat() {
    if (document.querySelector(".wa-float")) return;
    const wa = document.createElement("a");
    wa.className = "wa-float";
    wa.href = "https://wa.me/6282228009011";
    wa.target = "_blank"; wa.rel = "noopener";
    wa.setAttribute("aria-label", "Chat WhatsApp");
    wa.innerHTML = `<span class="wa-float-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span><span class="wa-float-label">${lang === "id" ? "Chat WhatsApp" : "Chat on WhatsApp"}</span>`;
    document.body.appendChild(wa);
  }
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (!revealObserver) revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in"); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    const targets = document.querySelectorAll(".hero, .page-hero, .section > .container > *, .project-card, .service-card, .expertise-item, .process-row, .timeline-row, .faq-item, .stat, .cta-band");
    targets.forEach((el, i) => {
      if (!el.hasAttribute("data-reveal")) { el.setAttribute("data-reveal", ""); el.style.setProperty("--i", (i % 6) * 70 + "ms"); }
      if (!el.classList.contains("in")) revealObserver.observe(el);
    });
  }

  function render() {
    root.lang=lang; renderChrome();
    const t=translations[lang];
    if(page==="home") renderHome(t); else if(page==="portfolio") renderPortfolio(t); else if(page==="services") renderServices(t); else if(page==="about") renderAbout(t); else if(page==="contact") renderContact(t); else if(page==="detail") renderDetail(t);
    initModal(); initReveal(); initFloat();
  }
  render();
})();
