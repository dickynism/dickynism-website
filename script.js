(() => {
  "use strict";
  const { projects, translations } = window.siteData;
  const root = document.documentElement;
  const depth = document.body.dataset.depth || "";
  const page = document.body.dataset.page || "home";
  let lang = localStorage.getItem("lang") || root.lang || "id";
  if (!translations[lang]) lang = "id";

  const path = (value) => /^https?:\/\//i.test(value) ? value : depth + value;
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = path("assets/logo.svg");
  document.head.appendChild(favicon);
  const get = (object, key) => key.split(".").reduce((value, part) => value && value[part], object);
  const drivePreview = (url) => {
    const match = url.match(/\/d\/([^/?]+)|[?&]id=([^&]+)/);
    return match ? `https://drive.google.com/file/d/${match[1] || match[2]}/preview` : url;
  };

  function renderChrome() {
    const t = translations[lang];
    document.querySelector("#siteHeader").innerHTML = `
      <nav class="navbar container" aria-label="${t.nav.menu}">
        <a class="brand" href="${path("index.html")}" aria-label="DICKYNISM">
          <img class="brand-mark" src="${path("assets/logo.svg")}" alt="" width="36" height="36">
          <span class="brand-word">DICKYNISM</span>
        </a>
        <button class="menu-toggle" type="button" aria-label="${t.nav.menu}" aria-expanded="false"><span></span><span></span></button>
        <div class="nav-menu" id="navMenu">
          ${["portfolio", "services", "packages", "faq", "about", "contact"].map(key => `<a class="${page === key ? "active" : ""}" href="${path(key + ".html")}">${t.nav[key]}</a>`).join("")}
          <div class="language-toggle" aria-label="${t.nav.language}"><button type="button" data-lang="id">ID</button><button type="button" data-lang="en">EN</button></div>
        </div>
      </nav>`;
    document.querySelector("#siteFooter").innerHTML = `<div class="container footer-inner"><span class="footer-brand">DICKYNISM</span><a href="https://www.instagram.com/dickynism/?hl=en">Instagram</a><a href="https://www.linkedin.com/in/dicky-christa-kurniawan-11405a1ab/">LinkedIn</a><a href="https://wa.me/6282228009011">WhatsApp</a><a href="mailto:halo.dickynism@gmail.com">halo.dickynism@gmail.com</a></div>`;
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
    return items.map(project => {
      const orientation = project.orientation === "landscape" ? "landscape" : "vertical";
      const width = orientation === "landscape" ? "1920" : "1080";
      const height = orientation === "landscape" ? "1080" : "1920";
      return `<article class="project-card" data-category="${project.category}" data-slug="${project.slug}"><a class="project-card-link" href="${path("portfolio/" + project.slug + ".html")}"><div class="project-thumb ${orientation}"><img src="${path(project.thumbnail)}" alt="${project.title}" width="${width}" height="${height}" loading="lazy"></div><div class="project-caption"><span class="project-category">${project.category} · ${project.platform}</span><h3>${project.title}</h3><p class="project-tagline">${lang === "id" ? project.descriptionId : project.description}</p></div></a></article>`;
    }).join("");
  }

  function stats(t) { return `<div class="stats-grid">${t.stats.map(item => `<div class="stat"><div class="stat-value">${item[0]}</div><div class="stat-label">${item[1]}</div></div>`).join("")}</div>`; }
  function timeline(t) {
    const companies = [["2019","GREAT VISINEMA"],["2021","EIGHT PRODUCTION"],["2022","PT. Tristar Global Indonesia"],["2024","PT. Aksara Digital Creative"],["2025","PT. SFS Group (Spencers Indonesia)"]];
    return `<div class="timeline">${companies.map((item,i) => `<div class="timeline-row"><span class="timeline-year">${item[0]}</span><span class="timeline-company">${item[1]}</span><span class="timeline-role">${t.timeline.roles[i]}</span></div>`).join("")}</div>`;
  }
  function head(label,title,level="h2") { return `<div class="section-head"><span class="eyebrow">${label}</span><${level}>${title}</${level}></div>`; }
  function faqMarkup(t) {
    return t.faqItems.map(item => `<div class="faq-item"><button class="faq-question" type="button" aria-expanded="false"><span>${item[0]}</span><span aria-hidden="true">+</span></button><div class="faq-answer"><p>${item[1]}</p></div></div>`).join("");
  }
  function initFaq() {
    document.querySelectorAll(".faq-question").forEach(button => button.addEventListener("click", () => {
      const item=button.parentElement;
      item.classList.toggle("open");
      button.setAttribute("aria-expanded",String(item.classList.contains("open")));
      button.lastElementChild.textContent=item.classList.contains("open")?"−":"+";
    }));
  }

  function renderHome(t) {
    const processTitle = lang === "id"
      ? "Dari brief ke video yang siap diuji."
      : "From brief to a video ready to test.";

    document.querySelector("#pageContent").innerHTML = `
      <section class="hero hero-editorial">
        <div class="container hero-shell">
          <div class="hero-topline">
            <span class="eyebrow">${t.hero.eyebrow}</span>
            <span class="availability"><span class="status-dot"></span>${t.hero.badge}</span>
          </div>
          <div class="hero-composition">
            <h1>${t.hero.before}<em>${t.hero.highlight}</em>${t.hero.after}</h1>
            <div class="hero-intro">
              <p>${t.hero.description}</p>
              <div class="button-row">
                <a class="btn btn-primary" href="#work">${t.hero.primary} <span aria-hidden="true">↘</span></a>
                <a class="btn btn-secondary" href="packages.html">${t.hero.secondary} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section proof-section" aria-label="${lang === "id" ? "Bukti pengalaman" : "Experience proof"}">
        <div class="container">${stats(t)}</div>
      </section>

      <section class="section">
        <div class="container">
          ${head(t.expertise.label, t.expertise.title)}
          <div class="expertise-grid">
            ${t.expertise.items.map((item, i) => `<article class="expertise-item"><span class="number">${String(i + 1).padStart(2, "0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section work-index" id="work">
        <div class="container">
          ${head(t.common.selected, t.portfolio.title)}
          <div class="portfolio-grid">${projectCards(projects.slice(0, 6))}</div>
          <div class="portfolio-more"><a class="btn btn-secondary" href="portfolio.html">${t.common.allWork} <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${head(t.common.process, processTitle)}
          <div class="process-list">
            ${t.services.process.map((item, i) => `<div class="process-row"><span>${String(i + 1).padStart(2, "0")}</span><p>${item[0]}</p><small>${item[1]}</small></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${head(t.about.label, t.about.title)}
          <div class="about-story">
            <img class="portrait" src="assets/profile.png" alt="Dicky Christa Kurniawan" loading="lazy">
            <div class="about-copy">${t.about.text.split("\n\n").map(p => `<p>${p}</p>`).join("")}</div>
          </div>
        </div>
      </section>

      <section class="section cta-band">
        <div class="container cta-inner">
          <h2>${t.common.ctaTitle}</h2>
          <a class="btn btn-primary" href="packages.html">${t.common.start} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section class="section faq-home" id="faq">
        <div class="container faq-shell">
          ${head(t.faqPage.eyebrow, t.faqPage.title)}
          <p class="faq-intro">${t.faqPage.description}</p>
          <div class="faq-list">${faqMarkup(t)}</div>
        </div>
      </section>`;
  }

  function renderPortfolio(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.portfolio.eyebrow}</span><h1>${t.portfolio.title}</h1><p class="page-intro">${t.portfolio.description}</p></div></section><section class="section"><div class="container"><div class="filters"><button class="filter-button active" data-filter="all">${t.portfolio.all}</button>${[...new Set(projects.map(p=>p.category))].map(category=>`<button class="filter-button" data-filter="${category}">${category}</button>`).join("")}</div><div class="portfolio-grid" id="portfolioGrid">${projectCards(projects)}</div></div></section>`;
    document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click",()=>{
      document.querySelectorAll("[data-filter]").forEach(item=>item.classList.remove("active")); button.classList.add("active");
      document.querySelectorAll(".project-card").forEach(card=>card.hidden=button.dataset.filter!=="all"&&card.dataset.category!==button.dataset.filter);
    }));
  }

  function renderPackages(t) {
    const packageCard = (item, index) => `
      <article class="pricing-card ${item.popular ? "featured" : ""}">
        <div class="pricing-top">
          <span class="package-index">${String(index + 1).padStart(2, "0")}</span>
          ${item.popular ? `<span class="package-badge">${t.packages.popular}</span>` : ""}
        </div>
        <h3>${item.name}</h3>
        <p class="package-summary">${item.summary}</p>
        <div class="package-price">
          <small>${t.packages.from}</small>
          <strong>${item.price}</strong>
          <span>${item.delivery}</span>
        </div>
        <ul class="package-features">${item.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        <a class="btn ${item.popular ? "btn-primary" : "btn-secondary"}" href="contact.html?package=${item.id}">
          ${t.packages.choose}<span aria-hidden="true">↗</span>
        </a>
      </article>`;

    document.querySelector("#pageContent").innerHTML = `
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${t.packages.eyebrow}</span>
          <h1>${t.packages.title}</h1>
          <p class="page-intro">${t.packages.description}</p>
        </div>
      </section>
      ${t.packages.groups.map(group => `
        <section class="section package-group-section" id="${group.id}">
          <div class="container">
            <div class="package-group-head">
              <span class="eyebrow">${group.label}</span>
              <h2>${group.title}</h2>
              <p>${group.description}</p>
            </div>
            <div class="pricing-grid pricing-grid-${group.items.length}">
              ${group.items.map(packageCard).join("")}
            </div>
          </div>
        </section>`).join("")}
      <section class="section custom-offer-section">
        <div class="container">
          <div class="custom-offer">
            <div>
              <span class="eyebrow">${t.packages.custom.label}</span>
              <h2>${t.packages.custom.title}</h2>
              <p>${t.packages.custom.description}</p>
              <strong>${t.packages.custom.price}</strong>
            </div>
            <div>
              <ul class="package-features">${t.packages.custom.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
              <a class="btn btn-primary" href="contact.html?package=${t.packages.custom.id}">${t.packages.customCta} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <p class="package-note">${t.packages.note}</p>
        </div>
      </section>`;
  }

  function renderServices(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.services.eyebrow}</span><h1>${t.services.title}</h1></div></section><section class="section"><div class="container"><div class="services-grid">${t.services.items.map((item,i)=>`<article class="service-card"><span class="number">${String(i+1).padStart(2,"0")}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div></div></section><section class="section"><div class="container">${head(t.common.process,lang==="id"?"Alur kerja yang jelas, tanpa kerumitan yang tidak perlu.":"A Clear Workflow, without Unnecessary Complexity")}<div class="process-list">${t.services.process.map((item,i)=>`<div class="process-row"><span>${String(i+1).padStart(2,"0")}</span><p>${item[0]}</p><small>${item[1]}</small></div>`).join("")}</div></div></section>`;
  }
  function renderAbout(t) {
    document.querySelector("#pageContent").innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">${t.about.label}</span><h1>${t.about.title}</h1></div></section><section class="section"><div class="container about-story"><img class="portrait" src="assets/profile.png" alt="Dicky Christa Kurniawan"><div class="about-copy">${t.about.text.split("\n\n").map(p=>`<p>${p}</p>`).join("")}</div></div></section><section class="section"><div class="container">${stats(t)}</div></section><section class="section"><div class="container">${head(t.timeline.label,t.timeline.title)}${timeline(t)}</div></section>`;
  }
  function renderFaq(t) {
    document.querySelector("#pageContent").innerHTML=`
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${t.faqPage.eyebrow}</span>
          <h1>${t.faqPage.title}</h1>
          <p class="page-intro">${t.faqPage.description}</p>
        </div>
      </section>
      <section class="section faq-page">
        <div class="container faq-shell">
          <div class="faq-list">${faqMarkup(t)}</div>
        </div>
      </section>`;
  }

  function renderContact(t) {
    document.querySelector("#contactEyebrow").textContent=t.contact.eyebrow;
    document.querySelector("#contactTitle").innerHTML=t.contact.title;
    document.querySelector("#contactSub").textContent=t.contact.sub;
    document.querySelectorAll("[data-i18n]").forEach(el=>{ const value=get(t,el.dataset.i18n); if(value) el.textContent=value; });
    document.querySelectorAll("#project-type option[data-service]").forEach((option,i)=>option.textContent=t.services.items[i][0]);
    document.querySelectorAll("#budget option[data-budget]").forEach((option,i)=>option.textContent=t.contact.budget[i]);
    const packageSelect=document.querySelector("#package-choice");
    const packageItems=t.packages.groups.flatMap(group=>group.items).concat(t.packages.custom);
    packageSelect.innerHTML=`<option value="">${t.contact.fields.choose}</option>${packageItems.map(item=>`<option value="${item.id}">${item.name} — ${item.price}</option>`).join("")}`;
    const requestedPackage=new URLSearchParams(window.location.search).get("package");
    if(requestedPackage && document.querySelector("#package-choice")) document.querySelector("#package-choice").value=requestedPackage;
    document.querySelector("#faqTitle").textContent=t.common.faq;
    document.querySelector("#faqList").innerHTML=faqMarkup(t);
  }
  function renderDetail(t) {
    const slug=document.body.dataset.slug;
    const project=projects.find(item=>item.slug===slug);
    if(!project) return;
    const media=project.videoSource ? `<video controls preload="none" poster="${path(project.thumbnail)}"><source src="${path(project.videoSource)}" type="video/mp4"></video>` : `<iframe src="${drivePreview(project.link)}" title="${project.title}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.title=`${project.title} | DICKYNISM`;
    document.querySelector("meta[name=description]").content=lang==="id"?project.descriptionId:project.description;
    document.querySelector("meta[property='og:title']").content=project.title;
    document.querySelector("meta[property='og:description']").content=lang==="id"?project.descriptionId:project.description;
    document.querySelector("#pageContent").innerHTML=`<section class="section" style="padding-top:152px"><div class="container detail-shell"><div class="video-wrap ${project.orientation === "landscape" ? "landscape" : "vertical"}">${media}</div><div class="detail-copy"><span class="eyebrow">${project.category} · ${project.platform}</span><h1>${project.title}</h1><p>${lang==="id"?project.descriptionId:project.description}</p>${(lang==="id"?project.storyId:project.story||"").split("\n\n").map(p=>`<p>${p}</p>`).join("")}<a class="btn btn-secondary" href="https://wa.me/6282228009011">${t.common.order}</a><a class="fallback-link" href="${project.link}" target="_blank" rel="noopener">${t.common.fallback}</a></div></div></section>`;
  }

  function openModal(slug) {
    const project = projects.find(item => item.slug === slug); if (!project) return;
    const t = translations[lang];
    const media = project.videoSource
      ? `<video controls autoplay muted playsinline preload="auto" poster="${path(project.thumbnail)}"><source src="${path(project.videoSource)}" type="video/mp4"></video>`
      : `<iframe src="${drivePreview(project.link)}" title="${project.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.querySelector("#modalBody").innerHTML = `
      <div class="modal-video ${project.orientation === "landscape" ? "landscape" : "vertical"}">${media}</div>
      <div class="modal-info">
        <span class="eyebrow">${project.category} · ${project.platform}</span>
        <h3>${project.title}</h3>
        <p>${lang === "id" ? project.descriptionId : project.description}</p>
        ${(lang === "id" ? project.storyId : project.story || "").split("\n\n").map(p => `<p>${p}</p>`).join("")}
        <div class="modal-actions">
          <a class="fallback-link" href="${project.link}" target="_blank" rel="noopener">${t.common.fallback}</a>
          <a class="modal-detail-link" href="${path(`portfolio/${project.slug}.html`)}">${lang === "id" ? "Lihat detail project" : "View project details"}</a>
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



  function initProjectPreviews() {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reduceMotion) return;

    document.querySelectorAll(".project-card").forEach(card => {
      const project = projects.find(item => item.slug === card.dataset.slug);
      if (!project || !project.videoSource) return;

      let preview = null;
      card.addEventListener("mouseenter", () => {
        if (preview) return;
        preview = document.createElement("video");
        preview.className = "project-hover-video";
        preview.src = path(project.videoSource);
        preview.muted = true;
        preview.loop = true;
        preview.playsInline = true;
        preview.preload = "metadata";
        card.querySelector(".project-thumb").appendChild(preview);
        preview.play().catch(() => {});
      });

      card.addEventListener("mouseleave", () => {
        if (!preview) return;
        preview.pause();
        preview.remove();
        preview = null;
      });
    });
  }

  function initImageFallbacks() {
    document.querySelectorAll(".project-thumb img").forEach(image => {
      const hideBrokenImage = () => { image.hidden = true; };
      image.addEventListener("error", hideBrokenImage, { once: true });
      if (image.complete && image.naturalWidth === 0) hideBrokenImage();
    });
  }

  let revealObserver = null;
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
    if(page!=="detail") {
      document.title=page==="home"
        ? (lang==="id" ? "DICKYNISM — AI Video & Editing Profesional" : "DICKYNISM — AI Video & Professional Editing")
        : `${t.nav[page] || "DICKYNISM"} | DICKYNISM`;
    }
    if(page==="home") renderHome(t); else if(page==="portfolio") renderPortfolio(t); else if(page==="services") renderServices(t); else if(page==="packages") renderPackages(t); else if(page==="faq") renderFaq(t); else if(page==="about") renderAbout(t); else if(page==="contact") renderContact(t); else if(page==="detail") renderDetail(t);
    initModal(); initImageFallbacks(); initProjectPreviews(); initFaq(); initReveal();
  }
  render();
})();
