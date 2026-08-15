const content = window.websiteContent;

const elements = {
  brandName: document.querySelector("#brandName"),
  brandLink: document.querySelector("#brandLink"),
  mainNav: document.querySelector("#mainNav"),
  navMenu: document.querySelector("#navMenu"),
  menuToggle: document.querySelector(".menu-toggle"),
  heroContent: document.querySelector("#heroContent"),
  capabilitySection: document.querySelector("#capabilitySection"),
  capabilityStrip: document.querySelector("#capabilityStrip"),
  aboutContent: document.querySelector("#aboutContent"),
  projectHeading: document.querySelector("#projectHeading"),
  projectTabs: document.querySelector("#projectTabs"),
  projectGrid: document.querySelector("#projectGrid"),
  serviceHeading: document.querySelector("#serviceHeading"),
  servicesGrid: document.querySelector("#servicesGrid"),
  processHeading: document.querySelector("#processHeading"),
  processGrid: document.querySelector("#processGrid"),
  contactContent: document.querySelector("#contactContent"),
  footerContent: document.querySelector("#footerContent"),
  videoModal: document.querySelector("#videoModal"),
  videoModalClose: document.querySelector("#videoModalClose"),
  videoPlayer: document.querySelector("#videoPlayer"),
  videoModalCategory: document.querySelector("#videoModalCategory"),
  videoModalTitle: document.querySelector("#videoModalTitle")
};

let activeCategory = content.portfolio.allCategoryLabel;
let lastVideoTrigger = null;

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMultiline(value = "") {
  return escapeHTML(value).replaceAll("\n", "<br>");
}

function getLinkTarget(url = "") {
  return url.startsWith("http") ? "_blank" : "_self";
}

function getButtonClass(style = "outline") {
  const styles = {
    dark: "btn-dark",
    light: "btn-light",
    outline: "btn-outline"
  };

  return styles[style] || styles.outline;
}

function getProjectCategories() {
  const categories = content.portfolio.projects.map((project) => project.category);
  return [content.portfolio.allCategoryLabel, ...new Set(categories)];
}

function getGoogleDriveId(url = "") {
  const pathMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/i);
  if (pathMatch) return pathMatch[1];

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes("drive.google.com")) {
      return parsedUrl.searchParams.get("id") || "";
    }
  } catch {
    return "";
  }

  return "";
}

function getYouTubeId(url = "") {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (hostname.endsWith("youtube.com")) {
      if (parsedUrl.pathname === "/watch") return parsedUrl.searchParams.get("v") || "";
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
      if (["shorts", "embed"].includes(pathParts[0])) return pathParts[1] || "";
    }
  } catch {
    return "";
  }

  return "";
}

function isDirectVideo(url = "") {
  return /\.(mp4|webm|ogg|mov)(?:[?#].*)?$/i.test(url);
}

function getProjectMedia(project) {
  const source = project.videoSource || project.link || "";
  const driveId = getGoogleDriveId(source);
  const linkedDriveId = getGoogleDriveId(project.link || "");
  const youtubeId = getYouTubeId(source);

  if (driveId) {
    return {
      thumbnail: project.thumbnail || `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveId)}&sz=w1000`,
      playerType: "external",
      playerUrl: project.link || source
    };
  }

  if (youtubeId) {
    return {
      thumbnail: project.thumbnail || `https://i.ytimg.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg`,
      playerType: "embed",
      playerUrl: `https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`
    };
  }

  if (isDirectVideo(source)) {
    return {
      thumbnail: project.thumbnail || (linkedDriveId
        ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(linkedDriveId)}&sz=w1000`
        : ""),
      playerType: "video",
      playerUrl: source
    };
  }

  return {
    thumbnail: project.thumbnail || "",
    playerType: "external",
    playerUrl: project.link || source
  };
}

function renderSeo() {
  document.title = content.site.title;
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription) {
    metaDescription.setAttribute("content", content.site.description);
  }
}

function renderNavigation() {
  elements.mainNav.setAttribute("aria-label", content.site.accessibility.navigationLabel);
  elements.brandLink.setAttribute("aria-label", content.site.accessibility.brandHomeLabel);
  elements.menuToggle.setAttribute("aria-label", content.site.accessibility.menuOpenLabel);
  elements.brandName.textContent = content.site.brandName;

  const navLinks = content.navigation
    .map((item) => `<a href="${escapeHTML(item.target)}">${escapeHTML(item.label)}</a>`)
    .join("");

  const navButton = `<a class="nav-cta" href="${escapeHTML(content.navButton.target)}">${escapeHTML(content.navButton.label)}</a>`;
  elements.navMenu.innerHTML = navLinks + navButton;
}

/* HERO LOAD ANIMATION */
function renderHero() {
  elements.heroContent.innerHTML = `
    <div class="hero-intro hero-load-item">
      <p>${escapeHTML(content.hero.smallText)}</p>
      <span>${escapeHTML(content.hero.role)}</span>
    </div>

    <div class="hero-title hero-load-item">
      <h1>${formatMultiline(content.hero.headline)}</h1>
    </div>

    <div class="hero-side">
      <div class="portrait-wrap hero-portrait" data-parallax="0.08">
        <img src="${escapeHTML(content.site.profileImage)}" alt="${escapeHTML(content.site.accessibility.profileAlt)}">
      </div>
      <p class="hero-description hero-load-item">${escapeHTML(content.hero.description)}</p>
      <div class="hero-actions">
        <a class="btn btn-dark" href="${escapeHTML(content.hero.primaryButton.target)}">${escapeHTML(content.hero.primaryButton.label)}</a>
        <a class="btn btn-light" href="${escapeHTML(content.hero.secondaryButton.target)}">${escapeHTML(content.hero.secondaryButton.label)}</a>
      </div>
    </div>
  `;
}

function renderCapabilityStrip() {
  elements.capabilitySection.setAttribute("aria-label", content.site.accessibility.capabilityLabel);
  elements.capabilityStrip.innerHTML = content.capabilityStrip
    .map((item) => `<span>${escapeHTML(item)}</span>`)
    .join("");
}

function renderAbout() {
  const paragraphs = content.about.paragraphs
    .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
    .join("");

  const badges = content.about.badges
    .map((badge) => `<span>${escapeHTML(badge)}</span>`)
    .join("");

  elements.aboutContent.innerHTML = `
    <div class="section-kicker reveal">
      <p>${escapeHTML(content.about.label)}</p>
    </div>

    <div class="about-content reveal">
      <h2>${escapeHTML(content.about.headline)}</h2>
      <div class="about-copy">${paragraphs}</div>
      <div class="badge-list" aria-label="${escapeHTML(content.site.accessibility.creativeHighlightsLabel)}">${badges}</div>
    </div>
  `;
}

function renderSectionHeading(element, label, headline) {
  element.innerHTML = `
    <p>${escapeHTML(label)}</p>
    <h2>${escapeHTML(headline)}</h2>
  `;
}

function renderProjectTabs() {
  const categories = getProjectCategories();
  elements.projectTabs.setAttribute("aria-label", content.site.accessibility.projectCategoriesLabel);

  if (!categories.includes(activeCategory)) {
    activeCategory = content.portfolio.allCategoryLabel;
  }

  elements.projectTabs.innerHTML = categories
    .map((category) => {
      const activeClass = category === activeCategory ? " is-active" : "";
      return `<button class="tab-button${activeClass}" type="button" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`;
    })
    .join("");
}

/* CARD HOVER EFFECT */
function renderProjectCard(project, index) {
  const tags = (project.tags || []).map((tag) => `<span>${escapeHTML(tag)}</span>`).join("");
  const target = getLinkTarget(project.link);
  const allowedOrientations = ["vertical", "landscape"];
  const orientation = allowedOrientations.includes(project.orientation)
    ? project.orientation
    : content.portfolio.defaultOrientation;
  const projectIndex = content.portfolio.projects.indexOf(project);
  const media = getProjectMedia(project);
  const canPlayInline = media.playerType !== "external";
  const titleTag = canPlayInline ? "button" : "a";
  const titleAction = canPlayInline
    ? `type="button" data-watch-project="${projectIndex}"`
    : `href="${escapeHTML(project.link)}" target="${target}" rel="noopener"`;
  const placeholder = `
    <div class="project-media-placeholder">
      <span>${escapeHTML(project.category)}</span>
      <strong>${escapeHTML(content.portfolio.placeholderLabel)}</strong>
    </div>
  `;
  const mediaBlock = media.playerType === "video"
    ? `
      <div class="project-media project-media-trigger project-media-inline ${escapeHTML(orientation)}" data-inline-media="${projectIndex}">
        ${placeholder}
        <video
          class="project-inline-video"
          data-project-video="${projectIndex}"
          src="${escapeHTML(media.playerUrl)}"
          ${media.thumbnail ? `poster="${escapeHTML(media.thumbnail)}"` : ""}
          controls
          muted
          playsinline
          preload="none"
          aria-label="${escapeHTML(content.portfolio.playLabel)} ${escapeHTML(project.title)}"
        ></video>
        <span class="project-category">${escapeHTML(project.category)}</span>
        <span class="project-play" aria-hidden="true"><i></i></span>
        <div class="project-video-error" role="status">
          <strong>${escapeHTML(content.portfolio.videoErrorLabel)}</strong>
          <a href="${escapeHTML(project.link)}" target="${target}" rel="noopener">${escapeHTML(content.portfolio.videoErrorAction)}</a>
        </div>
      </div>
    `
    : `
      <${canPlayInline ? "button" : "a"}
        class="project-media project-media-trigger ${escapeHTML(orientation)}"
        ${canPlayInline
          ? `type="button" data-watch-project="${projectIndex}"`
          : `href="${escapeHTML(project.link)}" target="${target}" rel="noopener"`
        }
        aria-label="${escapeHTML(content.portfolio.playLabel)} ${escapeHTML(project.title)}"
      >
        ${placeholder}
        ${media.thumbnail
          ? `<img src="${escapeHTML(media.thumbnail)}" alt="${escapeHTML(project.title)} preview" loading="lazy">`
          : ""
        }
        <span class="project-category">${escapeHTML(project.category)}</span>
        <span class="project-play" aria-hidden="true"><i></i></span>
      </${canPlayInline ? "button" : "a"}>
    `;

  return `
    <article class="project-card reveal reveal-card" style="--reveal-delay: ${Math.min(index * 90, 360)}ms">
      ${mediaBlock}
      <div class="project-content">
        <h3><${titleTag} class="project-title-link" ${titleAction}>${escapeHTML(project.title)}</${titleTag}></h3>
        <p>${escapeHTML(project.description)}</p>
        <span class="project-platform"><strong>${escapeHTML(content.portfolio.platformLabel)}</strong>${escapeHTML(project.platform)}</span>
        <div class="project-tags">${tags}</div>
        <div class="project-actions">
          ${canPlayInline
            ? `<button class="project-link" type="button" data-watch-project="${projectIndex}"><span class="project-link-play" aria-hidden="true"></span>${escapeHTML(content.portfolio.buttonLabel)}</button>`
            : `<a class="project-link" href="${escapeHTML(project.link)}" target="${target}" rel="noopener"><span class="project-link-play" aria-hidden="true"></span>${escapeHTML(content.portfolio.buttonLabel)}</a>`
          }
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const allLabel = content.portfolio.allCategoryLabel;
  const filteredProjects = activeCategory === allLabel
    ? content.portfolio.projects
    : content.portfolio.projects.filter((project) => project.category === activeCategory);

  elements.projectGrid.innerHTML = filteredProjects.map(renderProjectCard).join("");
  bindInlineVideoPreviews();
  observeRevealElements();
}

function renderServices() {
  elements.servicesGrid.innerHTML = content.services.items
    .map((service, index) => `
      <article class="service-card reveal reveal-card" style="--reveal-delay: ${Math.min(index * 90, 360)}ms">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHTML(service.title)}</h3>
        <p>${escapeHTML(service.description)}</p>
      </article>
    `)
    .join("");
}

function renderProcess() {
  elements.processGrid.innerHTML = content.process.steps
    .map((step, index) => `
      <article class="process-card reveal reveal-card" style="--reveal-delay: ${Math.min(index * 90, 360)}ms">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <p>${escapeHTML(step)}</p>
      </article>
    `)
    .join("");
}

function renderContact() {
  const buttons = content.contact.links
    .filter((link) => link.showInContact)
    .map((link) => `
      <a class="btn ${getButtonClass(link.style)}" href="${escapeHTML(link.url)}" target="${getLinkTarget(link.url)}" rel="noopener">${escapeHTML(link.label)}</a>
    `)
    .join("");

  elements.contactContent.innerHTML = `
    <div>
      <p class="contact-label">${escapeHTML(content.contact.label)}</p>
      <h2>${escapeHTML(content.contact.headline)}</h2>
      <p>${escapeHTML(content.contact.description)}</p>
      <p class="contact-note">${escapeHTML(content.contact.note)}</p>
    </div>
    <div class="contact-actions">${buttons}</div>
  `;
}

function renderFooter() {
  const socialLinks = content.contact.links
    .filter((link) => link.showInFooter)
    .map((link) => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener">${escapeHTML(link.label)}</a>`)
    .join("");

  elements.footerContent.innerHTML = `
    <div>
      <strong>${escapeHTML(content.site.brandName)}</strong>
      <p>${escapeHTML(content.site.footerDescription)}</p>
    </div>
    <p>&copy; ${new Date().getFullYear()} ${escapeHTML(content.site.brandName)}. ${escapeHTML(content.site.copyrightText)}</p>
    <div class="footer-links">${socialLinks}</div>
  `;
}

function setActiveCategory(category) {
  activeCategory = category;
  renderProjectTabs();
  renderProjects();
}

function pauseOtherProjectVideos(activeVideo) {
  elements.projectGrid.querySelectorAll(".project-inline-video").forEach((video) => {
    if (video === activeVideo || video.paused) return;
    video.pause();
    delete video.dataset.hoverPlaying;
    delete video.dataset.userPlaying;
  });
}

function bindInlineVideoPreviews() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  elements.projectGrid.querySelectorAll(".project-media-inline").forEach((mediaElement) => {
    const video = mediaElement.querySelector(".project-inline-video");
    if (!video) return;

    mediaElement.addEventListener("mouseenter", () => {
      if (!canHover.matches || video.dataset.userPlaying === "true") return;

      pauseOtherProjectVideos(video);
      video.muted = true;
      video.dataset.hoverPlaying = "true";
      video.play().catch(() => {
        delete video.dataset.hoverPlaying;
      });
    });

    mediaElement.addEventListener("mouseleave", () => {
      if (video.dataset.hoverPlaying !== "true" || video.dataset.userPlaying === "true") return;
      video.pause();
      delete video.dataset.hoverPlaying;
    });

    video.addEventListener("click", () => {
      video.dataset.userPlaying = "true";
      delete video.dataset.hoverPlaying;
    });

    video.addEventListener("play", () => {
      pauseOtherProjectVideos(video);
      mediaElement.classList.add("is-playing");
    });

    video.addEventListener("pause", () => {
      mediaElement.classList.remove("is-playing");
    });

    video.addEventListener("ended", () => {
      mediaElement.classList.remove("is-playing");
      delete video.dataset.hoverPlaying;
      delete video.dataset.userPlaying;
    });

    video.addEventListener("error", () => {
      mediaElement.classList.add("has-video-error");
      mediaElement.classList.remove("is-playing");
    });
  });
}

function playInlineProject(projectIndex) {
  const video = elements.projectGrid.querySelector(`[data-project-video="${projectIndex}"]`);
  if (!video) return false;

  pauseOtherProjectVideos(video);
  video.dataset.userPlaying = "true";
  delete video.dataset.hoverPlaying;
  video.muted = false;
  video.closest(".project-media")?.scrollIntoView({ behavior: "smooth", block: "center" });
  video.play().catch(() => {
    video.muted = true;
    video.play().catch(() => {
      video.closest(".project-media")?.classList.add("has-video-error");
    });
  });

  return true;
}

function openProjectPlayer(projectIndex, trigger) {
  const project = content.portfolio.projects[projectIndex];
  if (!project) return;

  const media = getProjectMedia(project);
  if (media.playerType === "video" && playInlineProject(projectIndex)) {
    return;
  }

  if (media.playerType === "external") {
    window.open(project.link, getLinkTarget(project.link), "noopener");
    return;
  }

  const allowedOrientations = ["vertical", "landscape"];
  const orientation = allowedOrientations.includes(project.orientation)
    ? project.orientation
    : content.portfolio.defaultOrientation;

  lastVideoTrigger = trigger;
  elements.videoModalClose.setAttribute("aria-label", content.portfolio.closePlayerLabel);
  elements.videoModalClose.innerHTML = "<span aria-hidden=\"true\">&times;</span>";
  elements.videoModalCategory.textContent = project.category;
  elements.videoModalTitle.textContent = project.title;
  elements.videoPlayer.className = `video-player-shell ${orientation}`;

  elements.videoPlayer.innerHTML = `
    <iframe
      src="${escapeHTML(media.playerUrl)}"
      title="${escapeHTML(project.title)}"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>
  `;

  elements.videoModal.hidden = false;
  elements.videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => elements.videoModal.classList.add("is-open"));
  elements.videoModalClose.focus();
}

function closeProjectPlayer() {
  if (elements.videoModal.hidden) return;

  elements.videoModal.classList.remove("is-open");
  elements.videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    elements.videoModal.hidden = true;
    elements.videoPlayer.innerHTML = "";
    if (lastVideoTrigger?.isConnected) lastVideoTrigger.focus();
    lastVideoTrigger = null;
  }, 260);
}

function toggleMobileMenu(forceClose = false) {
  const shouldOpen = forceClose ? false : !elements.navMenu.classList.contains("is-open");
  elements.navMenu.classList.toggle("is-open", shouldOpen);
  elements.menuToggle.classList.toggle("is-open", shouldOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  document.body.classList.toggle("menu-open", shouldOpen);
}

/* SCROLL REVEAL ANIMATION */
function observeRevealElements() {
  const revealElements = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        const delay = Number.parseInt(entry.target.style.getPropertyValue("--reveal-delay"), 10) || 0;
        window.setTimeout(() => {
          entry.target.style.removeProperty("--reveal-delay");
          if (entry.target.classList.contains("reveal-card")) {
            entry.target.classList.remove("reveal", "reveal-card");
          }
        }, delay + 950);
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

function observeActiveSection() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  });

  sections.forEach((section) => observer.observe(section));
}

function enableSmoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;

    const targetElement = document.querySelector(link.getAttribute("href"));
    if (!targetElement) return;

    event.preventDefault();
    toggleMobileMenu(true);
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* GRADIENT ANIMATION */
/* PARALLAX RINGAN */
function enableLightParallax() {
  /* REDUCED MOTION SUPPORT */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parallaxItems = document.querySelectorAll("[data-parallax]");

  if (reduceMotion || parallaxItems.length === 0) return;

  let isTicking = false;

  function updateParallax() {
    parallaxItems.forEach((item) => {
      const speed = Number.parseFloat(item.dataset.parallax) || 0.08;
      const rect = item.getBoundingClientRect();
      const viewportOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const movement = Math.max(Math.min(viewportOffset * -speed, 18), -18);
      item.style.setProperty("--parallax-y", `${movement}px`);
    });

    isTicking = false;
  }

  function requestParallaxUpdate() {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(updateParallax);
  }

  updateParallax();
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);
}

function bindEvents() {
  elements.projectTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    setActiveCategory(button.dataset.category);
  });

  elements.menuToggle.addEventListener("click", () => toggleMobileMenu());

  elements.projectGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-watch-project]");
    if (!trigger) return;
    openProjectPlayer(Number.parseInt(trigger.dataset.watchProject, 10), trigger);
  });

  elements.projectGrid.addEventListener("error", (event) => {
    if (event.target.matches(".project-media img")) {
      event.target.hidden = true;
    }
  }, true);

  elements.videoModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-video]")) closeProjectPlayer();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.videoModal.hidden) closeProjectPlayer();
  });
}

function renderWebsite() {
  renderSeo();
  renderNavigation();
  renderHero();
  renderCapabilityStrip();
  renderAbout();
  renderSectionHeading(elements.projectHeading, content.portfolio.label, content.portfolio.headline);
  renderProjectTabs();
  renderProjects();
  renderSectionHeading(elements.serviceHeading, content.services.label, content.services.headline);
  renderServices();
  renderSectionHeading(elements.processHeading, content.process.label, content.process.headline);
  renderProcess();
  renderContact();
  renderFooter();
  bindEvents();
  enableSmoothScroll();
  enableLightParallax();
  observeRevealElements();
  observeActiveSection();
  window.requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });
}

renderWebsite();
