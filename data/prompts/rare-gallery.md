---
id: "res_meez_rare_gallery"
slug: "rare-gallery"
title: "Rare Gallery"
category: "Curated"
categorySlug: "curated"
collection: "prompts"
likes: 151
tier: "free"
chars: 16852
preview_video: ""
preview_poster: "/media/posters/rare-gallery.jpg"
---

# Rare Gallery (Curated)

Build a single-page luxury brand landing (navbar + full-viewport hero only). Stack: React 18 + TypeScript + Vite + Tailwind CSS 3. No extra UI kits. Use lucide-react only for the Flower2 icon. Page title: Aurevon. Root wrapper: bg-black. html, body { overflow-x: hidden }. Global reset: margin: 0; padding: 0; box-sizing: border-box.

Fonts Load Google Fonts exactly:

https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap

Utility: .font-instrument { font-family: 'Instrument Serif', serif; }

Use Instrument Serif only for the hero H1 and overlay nav links. Logo, nav pill, body copy, and CTA use Tailwind’s default sans (ui-sans-serif, system-ui, …).

Easing (reuse everywhere)

Entrance: cubic-bezier(0.16, 1, 0.3, 1)
Menu overlay / hamburger morph: cubic-bezier(0.76, 0, 0.24, 1)
NAVBAR (fixed)
Fixed top-0 left-0 w-full z-50. Transparent until window.scrollY > 40, then bg-black/80 backdrop-blur-md. Transition: duration-500.

Inner bar: max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20.

Left — logo
Text link “Aurevon”, text-white text-xl md:text-2xl font-semibold tracking-tight z-50.

Center — desktop only (hidden md:flex)
Pill button: px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white/10, items-center gap-2. Label Navigate when closed, Close when overlay is open. Toggles overlay.

Right — desktop only (hidden md:flex)
Flower2 from lucide-react: w-7 h-7 text-white/90.

Right — mobile (md:hidden)
Hamburger w-8 h-8, flex-col items-center justify-center gap-1.5, aria-label="Toggle menu". Two bars: w-6 h-[2px] bg-white. When open: top bar rotate-45 translate-y-[4px], bottom -rotate-45 -translate-y-[4px]. Morph duration-500 with overlay easing.

Navbar entrance (on load)
After 100ms, set mounted. Elements start opacity-0 -translate-y-4, end opacity-100 translate-y-0. duration-700 + entrance easing. Delays when mounted: logo 0ms, Navigate/hamburger 200ms, flower 400ms.

When overlay is open, set document.body.style.overflow = 'hidden'; restore on close.

FULL-SCREEN OVERLAY MENU
fixed inset-0 z-40 bg-black (under navbar z-50). Closed: opacity-0 invisible. Open: opacity-100 visible. Transition duration-700 + overlay easing. Center content: flex flex-col items-center justify-center.

Links, stacked gap-8, centered:

Home
Story
Collection
Inquire
Each: href="#", text-white font-instrument text-4xl md:text-6xl hover:opacity-60. Closed: opacity-0 translate-y-6. Open: opacity-100 translate-y-0. Duration 600ms, overlay easing. Stagger when opening: 150 + index * 80 ms (Home 150, Story 230, Collection 310, Inquire 390). Delay 0 when closing. Clicking a link closes the overlay.

HERO (full viewport)
<section class="relative w-full h-screen overflow-hidden flex items-end justify-center">

Background video (must be this exact URL)

https://axeslab.zainaxes.com/web/media/ext/098ffe06644e148a.mp4
Wrapper: absolute inset-0. Starts scale-105 opacity-0, after 300ms mounted becomes scale-100 opacity-100. Transition duration-[1400ms] + entrance easing.

<video>: that src, autoPlay muted loop playsInline, class="w-full h-full object-cover". No overlay gradient. Video is the only background.

Foreground (bottom-centered)
relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto

H1 (Instrument Serif):
font-instrument text-white text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl mb-5 md:mb-6

Exact copy, with a line break only from sm up:

A carefully curated<br class="hidden sm:block" /> collection beyond compare
On mobile it is one wrapping line; from sm it is two lines: “A carefully curated” then “collection beyond compare”.

Subcopy
text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-md mx-auto
Copy: Reserve your place in our private gallery.

CTA
<a href="#"> “Join the waitlist”
inline-block px-8 py-3.5 bg-white text-black text-sm md:text-base font-medium rounded-full hover:bg-white/90

Hero text/CTA entrance
All three start opacity-0 translate-y-8, end opacity-100 translate-y-0. duration-900 + entrance easing. Mounted after 300ms, then delays: H1 400ms, subcopy 600ms, CTA 800ms. Delay 0 before mounted.

RESPONSIVE CHECKLIST (must match)
Breakpoint	Behavior
Default / mobile
Nav height 64px, padding-x 24px. Hamburger only (no Navigate pill, no flower). Hero padding-bottom 64px. H1 2.5rem / line-height 0.95, no forced H1 break. Subcopy text-base, CTA text-sm. Overlay links text-4xl.
sm (640px)
H1 text-5xl; H1 line break appears.
md (768px)
Nav height 80px, padding-x 40px. Desktop: logo | Navigate pill | flower. Overlay links text-6xl. Hero pb-24. H1 text-6xl, mb-6. Subcopy text-lg, mb-10. CTA text-base.
lg (1024px)
H1 text-7xl.
No other sections, footer, or extra chrome. No video controls, no poster, no extra color overlays. Recreate navbar + hero pixel-faithful to these classes, timings, copy, and the CloudFront URL above.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aurevon</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html, body { overflow-x: hidden; }

    body {
      background: #000;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    body.menu-open { overflow: hidden; }

    .font-instrument { font-family: "Instrument Serif", serif; }

    /* ——— Navbar ——— */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 50;
      background: transparent;
      transition: background-color 500ms, backdrop-filter 500ms, -webkit-backdrop-filter 500ms;
    }

    .nav.scrolled {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .nav-inner {
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }

    .logo {
      color: #fff;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      text-decoration: none;
      z-index: 50;
      opacity: 0;
      transform: translateY(-1rem);
      transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-mounted .logo {
      opacity: 1;
      transform: translateY(0);
    }

    .nav-pill {
      display: none;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      opacity: 0;
      transform: translateY(-1rem);
      transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1), background-color 700ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-mounted .nav-pill {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 200ms, 200ms, 0ms;
    }

    .nav-pill:hover { background: rgba(255, 255, 255, 0.1); }

    .nav-flower {
      display: none;
      align-items: center;
      z-index: 50;
      opacity: 0;
      transform: translateY(-1rem);
      transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-mounted .nav-flower {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 400ms;
    }

    .nav-flower svg {
      width: 1.75rem;
      height: 1.75rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      width: 2rem;
      height: 2rem;
      z-index: 50;
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0;
      transform: translateY(-1rem);
      transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-mounted .hamburger {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 200ms;
    }

    .hamburger span {
      display: block;
      width: 1.5rem;
      height: 2px;
      background: #fff;
      transition: transform 500ms cubic-bezier(0.76, 0, 0.24, 1);
    }

    .hamburger.open span:first-child { transform: rotate(45deg) translateY(4px); }
    .hamburger.open span:last-child { transform: rotate(-45deg) translateY(-4px); }

    /* ——— Overlay ——— */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 40;
      background: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 700ms cubic-bezier(0.76, 0, 0.24, 1), visibility 700ms cubic-bezier(0.76, 0, 0.24, 1);
    }

    .overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .overlay-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .overlay-links a {
      color: #fff;
      font-family: "Instrument Serif", serif;
      font-size: 2.25rem;
      text-decoration: none;
      opacity: 0;
      transform: translateY(1.5rem);
      transition: opacity 600ms cubic-bezier(0.76, 0, 0.24, 1), transform 600ms cubic-bezier(0.76, 0, 0.24, 1), color 600ms cubic-bezier(0.76, 0, 0.24, 1);
    }

    .overlay-links a:hover { opacity: 0.6; }

    .overlay.open .overlay-links a {
      opacity: 1;
      transform: translateY(0);
    }

    .overlay.open .overlay-links a:nth-child(1) { transition-delay: 150ms; }
    .overlay.open .overlay-links a:nth-child(2) { transition-delay: 230ms; }
    .overlay.open .overlay-links a:nth-child(3) { transition-delay: 310ms; }
    .overlay.open .overlay-links a:nth-child(4) { transition-delay: 390ms; }
    .overlay.open .overlay-links a:hover { transition-delay: 150ms; opacity: 0.6; }
    .overlay.open .overlay-links a:nth-child(2):hover { transition-delay: 230ms; }
    .overlay.open .overlay-links a:nth-child(3):hover { transition-delay: 310ms; }
    .overlay.open .overlay-links a:nth-child(4):hover { transition-delay: 390ms; }

    /* ——— Hero ——— */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .hero-video-wrap {
      position: absolute;
      inset: 0;
      transform: scale(1.05);
      opacity: 0;
      transition: transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-mounted .hero-video-wrap {
      transform: scale(1);
      opacity: 1;
    }

    .hero-video-wrap video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 1.5rem 4rem;
      max-width: 56rem;
      margin: 0 auto;
    }

    .hero h1 {
      font-family: "Instrument Serif", serif;
      color: #fff;
      font-size: 2.5rem;
      line-height: 0.95;
      font-weight: 400;
      margin-bottom: 1.25rem;
      opacity: 0;
      transform: translateY(2rem);
      transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-mounted .hero h1 {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 400ms;
    }

    .hero-br { display: none; }

    .hero p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1rem;
      line-height: 1.5;
      margin: 0 auto 2rem;
      max-width: 28rem;
      opacity: 0;
      transform: translateY(2rem);
      transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-mounted .hero p {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 600ms;
    }

    .cta {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #fff;
      color: #000;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25;
      text-decoration: none;
      border-radius: 9999px;
      opacity: 0;
      transform: translateY(2rem);
      transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1), background-color 900ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-mounted .cta {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 800ms, 800ms, 0ms;
    }

    .cta:hover { background: rgba(255, 255, 255, 0.9); }

    @media (min-width: 640px) {
      .hero h1 { font-size: 3rem; }
      .hero-br { display: block; }
    }

    @media (min-width: 768px) {
      .nav-inner {
        padding: 0 2.5rem;
        height: 5rem;
      }

      .logo { font-size: 1.5rem; }

      .nav-pill { display: flex; }
      .nav-flower { display: flex; }
      .hamburger { display: none; }

      .overlay-links a { font-size: 3.75rem; }

      .hero-content { padding-bottom: 6rem; }

      .hero h1 {
        font-size: 3.75rem;
        margin-bottom: 1.5rem;
      }

      .hero p {
        font-size: 1.125rem;
        margin-bottom: 2.5rem;
      }

      .cta { font-size: 1rem; }
    }

    @media (min-width: 1024px) {
      .hero h1 { font-size: 4.5rem; }
    }
  </style>
</head>
<body>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a class="logo" href="#">Aurevon</a>

      <button class="nav-pill" id="navPill" type="button">
        <span id="navPillLabel">Navigate</span>
      </button>

      <div class="nav-flower" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
          <circle cx="12" cy="8" r="2" />
          <path d="M12 10v12" />
          <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
          <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
        </svg>
      </div>

      <button class="hamburger" id="hamburger" type="button" aria-label="Toggle menu">
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div class="overlay" id="overlay">
    <div class="overlay-links">
      <a href="#">Home</a>
      <a href="#">Story</a>
      <a href="#">Collection</a>
      <a href="#">Inquire</a>
    </div>
  </div>

  <section class="hero" id="hero">
    <div class="hero-video-wrap">
      <video
        src="https://axeslab.zainaxes.com/web/media/ext/098ffe06644e148a.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>

    <div class="hero-content">
      <h1>A carefully curated<br class="hero-br" /> collection beyond compare</h1>
      <p>Reserve your place in our private gallery.</p>
      <a class="cta" href="#">Join the waitlist</a>
    </div>
  </section>

  <script>
    (function () {
      var nav = document.getElementById("nav");
      var overlay = document.getElementById("overlay");
      var hamburger = document.getElementById("hamburger");
      var navPill = document.getElementById("navPill");
      var navPillLabel = document.getElementById("navPillLabel");
      var hero = document.getElementById("hero");
      var open = false;

      setTimeout(function () { nav.classList.add("nav-mounted"); }, 100);
      setTimeout(function () { hero.classList.add("hero-mounted"); }, 300);

      window.addEventListener("scroll", function () {
        nav.classList.toggle("scrolled", window.scrollY > 40);
      });

      function setOpen(next) {
        open = next;
        overlay.classList.toggle("open", open);
        hamburger.classList.toggle("open", open);
        navPillLabel.textContent = open ? "Close" : "Navigate";
        document.body.classList.toggle("menu-open", open);
      }

      hamburger.addEventListener("click", function () { setOpen(!open); });
      navPill.addEventListener("click", function () { setOpen(!open); });

      overlay.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { setOpen(false); });
      });
    })();
  </script>
</body>
</html>
