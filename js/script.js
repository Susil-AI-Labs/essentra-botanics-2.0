/* =========================================================
   Essentra Botanics — Scripts
   Navigation, counters, reveal, testimonials, forms
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Apply editable content from js/content.js ---------- */
  const CFG = window.SITE_CONFIG || {};
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const safeAssetUrl = (value) => {
    const str = String(value || "").trim();
    if (!str) return "";
    const isHttp = /^https?:\/\//i.test(str);
    const isRelativeAsset = /^(assets\/|\.\.\/assets\/)/i.test(str);
    return isHttp || isRelativeAsset ? str : "";
  };

  function applyConfig() {
    if (!window.SITE_CONFIG) return;
    const c = CFG.company || {};

    // Phone (tel:) links
    if (c.phone) {
      $$('a[href^="tel:"]').forEach((a) => {
        a.href = "tel:" + c.phone;
        if (/^\d/.test(a.textContent.trim())) a.textContent = c.phone;
      });
    }

    // WhatsApp links
    if (c.whatsapp) {
      $$('a[href*="wa.me"]').forEach((a) => {
        a.href = "https://wa.me/" + c.whatsapp;
        if (/^\d/.test(a.textContent.trim())) a.textContent = c.whatsapp.replace(/^91/, "");
      });
    }

    // Social links
    $$('a[href*="instagram.com"]').forEach((a) => { if (c.instagram) a.href = c.instagram; });
    $$('a[href*="facebook.com"]').forEach((a) => { if (c.facebook) a.href = c.facebook; });
    $$('a[href*="essentrabotanics.com"]').forEach((a) => { if (c.website) a.href = c.website; });
    const setTileValue = (selector, value) => {
      const el = $(selector + " .contact__tile-value");
      if (el && value) el.textContent = value;
    };
    setTileValue('.contact__tile[href^="tel:"]', c.phone);
    setTileValue('.contact__tile[href*="wa.me"]', c.whatsapp && c.whatsapp.replace(/^91/, ""));
    setTileValue('.contact__tile[href*="instagram.com"]', c.instagramHandle);
    setTileValue('.contact__tile[href*="facebook.com"]', c.facebookName);
    const brandName = $(".contact__brand h3");
    if (brandName && c.name) brandName.textContent = c.name;

    // Security hardening for all external blank-target links
    $$('a[target="_blank"]').forEach((a) => {
      const rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (!rel.includes("noopener")) rel.push("noopener");
      if (!rel.includes("noreferrer")) rel.push("noreferrer");
      a.setAttribute("rel", rel.join(" "));
    });

    // Google Map
    if (c.mapQuery) {
      const map = $(".contact__map iframe");
      if (map) map.src = "https://www.google.com/maps?q=" + encodeURIComponent(c.mapQuery) + "&output=embed";
    }

    // Hero
    const h = CFG.hero;
    if (h) {
      const set = (sel, val) => { const el = $(sel); if (el && val != null) el.textContent = val; };
      const eyebrow = $(".hero__eyebrow");
      if (eyebrow && h.eyebrow) eyebrow.innerHTML = '<i class="fa-solid fa-seedling"></i> ' + esc(h.eyebrow);
      const title = $(".hero__title");
      if (title && h.titleLine1) title.innerHTML = esc(h.titleLine1) + '<br /><span class="text-accent">' + esc(h.titleLine2 || "") + "</span>";
      set(".hero__subtitle", h.subtitle);
      const btns = $$(".hero__cta .btn");
      if (btns[0] && h.primaryBtn) btns[0].innerHTML = esc(h.primaryBtn) + ' <i class="fa-solid fa-arrow-right"></i>';
      if (btns[1] && h.secondaryBtn) btns[1].textContent = h.secondaryBtn;
    }

    // Products
    const grid = $("#productsGrid");
    if (grid && Array.isArray(CFG.products)) {
      grid.innerHTML = CFG.products.map((p) => `
        <article class="product-card reveal">
          <div class="product-card__img" style="background-image:url('${esc(safeAssetUrl(p.image))}')">
            ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
          </div>
          <div class="product-card__body">
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.desc)}</p>
          </div>
        </article>`).join("");
    }

    // Testimonials
    const tTrack = $("#testimonialTrack");
    if (tTrack && Array.isArray(CFG.testimonials)) {
      tTrack.innerHTML = CFG.testimonials.map((t) => `
        <figure class="testimonial">
          <div class="testimonial__stars">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
          <blockquote>"${esc(t.quote)}"</blockquote>
          <figcaption>
            <span class="testimonial__avatar">${esc((t.name || "?").charAt(0))}</span>
            <div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div>
          </figcaption>
        </figure>`).join("");
    }
  }
  applyConfig();

  const scrollTopBtn = $("#scrollTop");
  const header = $("#header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    scrollTopBtn.classList.toggle("show", window.scrollY > 500);
  };

  /* ---------- Mobile navigation ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const closeBtn = $("#navClose");
  const overlay = $("#navOverlay");

  const openNav = () => {
    nav.classList.add("open");
    overlay.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    nav.classList.remove("open");
    overlay.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", openNav);
  closeBtn.addEventListener("click", closeNav);
  overlay.addEventListener("click", closeNav);
  $$(".nav__link").forEach((l) => l.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  /* ---------- Active link on scroll (scrollspy) ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");
  const spy = () => {
    const pos = window.scrollY + 120;
    let current = "";
    sections.forEach((s) => {
      if (pos >= s.offsetTop) current = s.id;
    });
    navLinks.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + current)
    );
  };

  window.addEventListener("scroll", () => { onScroll(); spy(); }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$(".counter__num");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Testimonials carousel ---------- */
  const track = $("#testimonialTrack");
  const slides = $$(".testimonial", track);
  const dotsWrap = $("#testimonialDots");
  let index = 0;
  let timer;

  if (dotsWrap) dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    if (!dotsWrap) return;
    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => { goTo(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap ? $$("button", dotsWrap) : [];

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle("active", di === index));
  };
  const next = () => goTo(index + 1);
  const startTimer = () => { timer = setInterval(next, 5000); };
  const resetTimer = () => { clearInterval(timer); startTimer(); };

  if (slides.length) {
    startTimer();
    const vp = $(".testimonials__viewport");
    vp.addEventListener("mouseenter", () => clearInterval(timer));
    vp.addEventListener("mouseleave", startTimer);
  }

  /* ---------- Scroll to top ---------- */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Initialize
  onScroll();
  spy();
})();
