---
id: "res_meez_palomar_labs"
slug: "palomar-labs"
title: "Palomar Labs"
category: "AI"
categorySlug: "ai"
collection: "prompts"
likes: 89
tier: "free"
chars: 21190
preview_video: "https://meez.design/web/prompt-previews/prompt-media/7d9ebbbaf8e0e081.mp4"
preview_poster: "https://meez.design/web/prompt-previews/prompt-media/685b827bb6e32ba9-c.jpg"
---

# Palomar Labs (AI)

Build a standalone pixel-accurate recreation of the Palomar Labs marketing landing page: fixed navbar + full-viewport video hero only. No other sections. Match this spec exactly. Do not invent extra copy, buttons, gradients, overlays, or decorative blobs.
Stack
React + TypeScript + Vite
Tailwind CSS
lucide-react icons: ChevronDown, ArrowRight, Triangle
Single App.tsx with Navbar, Hero, Trustedby Axes Lab (@zainaxes) assets and URLs (do not change)
Background video (must be this exact CloudFront URL):
https://axeslab.zainaxes.com/web/media/ext/4ee225aa17cc394a.mp4
Fonts in index.html:
<link href="(self-host this face — no free CDN; substitute a close match if unavailable)" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Oswald:wght@500&family=Montserrat:wght@700&family=Roboto+Slab:wght@600&family=Raleway:wght@700&display=swap" rel="stylesheet">
Page title: Palomar - One Unified System for LLMs
Color tokens (Tailwind theme.extend.colors.brand)
dark: #2d3a2e
green: #3d5a3e
light: #f5f3ef
cream: #faf8f5
Font families (Tailwind theme.extend.fontFamily)
helvetica-neue: "Helvetica Neue Light", Helvetica, Arial, sans-serif
playfair: "Playfair Display", serif
oswald: "Oswald", sans-serif
montserrat: "Montserrat", sans-serif
roboto-slab: "Roboto Slab", serif
raleway: "Raleway", sans-serif
Body: font-family: 'Helvetica Neue Light', Helvetica, Arial, sans-serif; with antialiasing. Global * { margin:0; padding:0; box-sizing:border-box; }. html { scroll-behavior: smooth; }. Root app wrapper: font-helvetica-neue. Background of the hero section: bg-brand-cream (#faf8f5).
Animations (global CSS, exact)
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-down {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up   { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fade-down { animation: fade-down 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.stagger-1 { animation-delay: 0ms; }
.stagger-2 { animation-delay: 120ms; }
.stagger-3 { animation-delay: 240ms; }
.stagger-4 { animation-delay: 360ms; }
.stagger-5 { animation-delay: 480ms; }
.stagger-6 { animation-delay: 600ms; }
1) Navbar
Fixed top-0 left-0 right-0 z-50. Transition duration-300.
If window.scrollY > 20: bg-brand-cream/90 backdrop-blur-md shadow-sm
Else: bg-transparent
Inner container: max-w-7xl mx-auto px-6 lg:px-8. Bar: relative flex items-center h-16 md:h-20.
Desktop left links (hidden md:flex items-center gap-8, animate-fade-down stagger-1)
All: text-sm text-brand-dark tracking-wide uppercase hover:opacity-70 transition-opacity
Button: Solutions + ChevronDown w-3.5 h-3.5, flex items-center gap-1
Anchor: Plans
Anchor: News
Center logo (absolute centered)
absolute left-1/2 -translate-x-1/2 flex items-center gap-2 animate-fade-down stagger-2
Lucide Triangle: w-5 h-5 text-brand-dark fill-brand-dark
Text Palomar: text-xl text-brand-dark tracking-tight font-helvetica-neue
Desktop CTA (right)
hidden md:inline-flex items-center ml-auto px-5 py-2.5 bg-brand-dark text-white text-sm tracking-wide uppercase rounded-full hover:bg-brand-green transition-colors animate-fade-down stagger-3 Label: Try It Free
Mobile hamburger (md:hidden, ml-auto, z-50, w-10 h-10, aria-label="Toggle menu")
Two 2px bars (w-6 h-[2px] bg-brand-dark rounded) with transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]:
Top bar at top-[6px]. Open: rotate-45 translate-y-[5px]
Bottom bar at top-[13px]. Open: -rotate-45 When open, lock document.body.style.overflow = 'hidden'.
Mobile overlay (md:hidden)
fixed inset-0 bg-brand-cream z-40 Transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
Open: opacity-100 pointer-events-auto
Closed: opacity-0 pointer-events-none
Inner column: flex flex-col items-center justify-center h-full gap-8, same 500ms ease, delay-100
Open: translate-y-0 opacity-100
Closed: -translate-y-8 opacity-0
Links (each text-3xl text-brand-dark tracking-tight): Solutions, Plans, News CTA: mt-4 inline-flex items-center px-8 py-3.5 bg-brand-dark text-white text-lg tracking-wide rounded-full → Try It Free Clicking any item closes the menu.
No dropdown panel for Solutions — it is a button on desktop and a simple link on mobile.
2) Hero
section.relative.w-full.h-screen.min-h-[700px].overflow-hidden.bg-brand-cream
Video layer
div.absolute.inset-0 wrapping <video>:
src = the CloudFront URL above
autoPlay muted loop playsInline
class: w-full h-full object-cover object-bottom
No dark overlay, no gradient, no poster image
Content column (sits on top of video, left-aligned, not vertically centered)
relative z-10 flex flex-col items-start max-w-7xl mx-auto pt-28 md:pt-36 px-6 lg:px-8
Announcement pill
Anchor, inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-dark/15 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors mb-5 md:mb-6 animate-fade-up stagger-3
Text text-sm text-brand-dark: Live for everyone today! Offering $1MM in credits.
ArrowRight w-3.5 h-3.5 text-brand-dark
Headline
h1 classes: text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.05] tracking-tight max-w-4xl font-helvetica-neue animate-fade-up stagger-4
Exact copy with a line break only from sm and up:
One unified system to build,
test, ship, and observe LLMs
Implementation: first line, then <br className="hidden sm:block" />, then a space, then test, ship, and observe LLMs. On <640px it wraps naturally as one block.
No subtitle, no primary CTA in the hero body.
3) Trusted by (inside Hero, under headline)
Wrapper: w-full mt-8 md:mt-10 animate-fade-up stagger-5
Label: text-left text-xs tracking-[0.25em] uppercase text-brand-dark/50 mb-6 md:mb-8 font-helvetica-neue → Backed by Axes Lab (@zainaxes) row: flex flex-wrap items-center justify-start gap-6 md:gap-12 lg:gap-16 animate-fade-up stagger-6
Five wordmarks as text (not images), text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap:
Meridian — font-playfair (Playfair Display 700)
STELLEX — font-oswald uppercase (Oswald 500)
Luminar — font-montserrat (Montserrat 700)
OVERLAND — font-roboto-slab uppercase (Roboto Slab 600)
Kinetic — font-raleway (Raleway 700)
Responsive rules (must match)
< md (768px): hamburger + full-screen cream overlay; hide desktop links and CTA; nav height h-16; hero padding pt-28 px-6; logo gaps gap-6; headline text-3xl then sm:text-4xl
md+: three left links, centered logo, right pill CTA; nav h-20; hero pt-36; logo gaps md:gap-12
lg+: container px-8; headline lg:text-6xl; logo gaps lg:gap-16
Hero always h-screen with min-h-[700px]
Content always left-aligned (items-start, text-left, justify-start)
Video always object-cover object-bottom so the bottom of the footage stays framed
Visual character
Quiet, editorial, cream/forest. Light Helvetica Neue, not heavy Inter/SF. Centered triangle + Palomar wordmark. Frosted white pill over a full-bleed landscape video. Wordmark “logos” in mixed display fonts, not SVG brand files. Entrance: nav fades down (stagger 0 / 120 / 240ms); pill, headline, backed-by Axes Lab (@zainaxes) up (240 / 360 / 480 / 600ms).
Do not add
Footer, extra sections, search, language switcher, social icons, video controls, mute button, overlay scrim, second headline, hero “Get started” button, Solutions mega-menu content, or any other video URL.
Implement this as one working page that looks identical on desktop and mobile.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Palomar - One Unified System for LLMs</title>
  <link href="(self-host this face — no free CDN; substitute a close match if unavailable)" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Oswald:wght@500&family=Montserrat:wght@700&family=Roboto+Slab:wght@600&family=Raleway:wght@700&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-dark: #2d3a2e;
      --brand-green: #3d5a3e;
      --brand-light: #f5f3ef;
      --brand-cream: #faf8f5;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: "Helvetica Neue Light", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: var(--brand-cream);
      color: var(--brand-dark);
    }

    a { text-decoration: none; color: inherit; }

    button {
      font-family: inherit;
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
    }

    /* ---------- Animations ---------- */
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-down {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-up {
      animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .animate-fade-down {
      animation: fade-down 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .stagger-1 { animation-delay: 0ms; }
    .stagger-2 { animation-delay: 120ms; }
    .stagger-3 { animation-delay: 240ms; }
    .stagger-4 { animation-delay: 360ms; }
    .stagger-5 { animation-delay: 480ms; }
    .stagger-6 { animation-delay: 600ms; }

    /* ---------- Navbar ---------- */
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      transition: background-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
    }
    .nav.scrolled {
      background: rgba(250, 248, 245, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .nav-inner {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    @media (min-width: 1024px) {
      .nav-inner { padding: 0 2rem; }
    }

    .nav-bar {
      position: relative;
      display: flex;
      align-items: center;
      height: 4rem;
    }
    @media (min-width: 768px) {
      .nav-bar { height: 5rem; }
    }

    .nav-left {
      display: none;
      align-items: center;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .nav-left { display: flex; }
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
      text-transform: uppercase;
      color: var(--brand-dark);
      transition: opacity 0.2s;
    }
    .nav-link:hover { opacity: 0.7; }

    .nav-link svg {
      width: 14px;
      height: 14px;
    }

    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo svg {
      width: 20px;
      height: 20px;
      fill: var(--brand-dark);
      color: var(--brand-dark);
    }
    .logo span {
      font-size: 1.25rem;
      letter-spacing: -0.025em;
      color: var(--brand-dark);
    }

    .nav-cta {
      display: none;
      margin-left: auto;
      align-items: center;
      padding: 0.625rem 1.25rem;
      background: var(--brand-dark);
      color: #fff;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
      text-transform: uppercase;
      border-radius: 9999px;
      transition: background-color 0.2s;
    }
    .nav-cta:hover { background: var(--brand-green); }
    @media (min-width: 768px) {
      .nav-cta { display: inline-flex; }
    }

    .hamburger {
      position: relative;
      z-index: 50;
      width: 40px;
      height: 40px;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (min-width: 768px) {
      .hamburger { display: none; }
    }

    .hamburger-icon {
      position: relative;
      width: 24px;
      height: 24px;
    }
    .hamburger-icon span {
      position: absolute;
      left: 0;
      width: 24px;
      height: 2px;
      background: var(--brand-dark);
      border-radius: 9999px;
      transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    .hamburger-icon span:nth-child(1) { top: 6px; }
    .hamburger-icon span:nth-child(2) { top: 13px; }
    .nav.open .hamburger-icon span:nth-child(1) {
      transform: rotate(45deg) translateY(5px);
    }
    .nav.open .hamburger-icon span:nth-child(2) {
      transform: rotate(-45deg);
    }

    .mobile-overlay {
      position: fixed;
      inset: 0;
      background: var(--brand-cream);
      z-index: 40;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      opacity: 0;
      pointer-events: none;
      transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }
    @media (min-width: 768px) {
      .mobile-overlay { display: none; }
    }
    .nav.open .mobile-overlay {
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-overlay-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      transform: translateY(-2rem);
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      transition-delay: 100ms;
    }
    .nav.open .mobile-overlay-inner {
      transform: translateY(0);
      opacity: 1;
    }

    .mobile-link {
      font-size: 1.875rem;
      letter-spacing: -0.025em;
      color: var(--brand-dark);
    }

    .mobile-cta {
      margin-top: 1rem;
      display: inline-flex;
      align-items: center;
      padding: 0.875rem 2rem;
      background: var(--brand-dark);
      color: #fff;
      font-size: 1.125rem;
      letter-spacing: 0.025em;
      border-radius: 9999px;
    }

    /* ---------- Hero ---------- */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 700px;
      overflow: hidden;
      background: var(--brand-cream);
    }

    .hero-video {
      position: absolute;
      inset: 0;
    }
    .hero-video video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: bottom;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 80rem;
      margin: 0 auto;
      padding: 7rem 1.5rem 0;
    }
    @media (min-width: 768px) {
      .hero-content { padding-top: 9rem; }
    }
    @media (min-width: 1024px) {
      .hero-content { padding-left: 2rem; padding-right: 2rem; }
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      border: 1px solid rgba(45, 58, 46, 0.15);
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      margin-bottom: 1.25rem;
      transition: background-color 0.2s;
    }
    .pill:hover { background: rgba(255, 255, 255, 0.8); }
    @media (min-width: 768px) {
      .pill { margin-bottom: 1.5rem; }
    }
    .pill span {
      font-size: 0.875rem;
      color: var(--brand-dark);
    }
    .pill svg {
      width: 14px;
      height: 14px;
      color: var(--brand-dark);
      flex-shrink: 0;
    }

    .headline {
      text-align: left;
      font-size: 1.875rem;
      line-height: 1.05;
      letter-spacing: -0.025em;
      color: var(--brand-dark);
      max-width: 56rem;
      font-weight: 400;
    }
    @media (min-width: 640px) {
      .headline { font-size: 2.25rem; }
      .headline .break { display: block; }
    }
    @media (min-width: 768px) {
      .headline { font-size: 3rem; }
    }
    @media (min-width: 1024px) {
      .headline { font-size: 3.75rem; }
    }
    .headline .break { display: none; }

    /* ---------- Trusted by Axes Lab (@zainaxes) */
    .trusted {
      width: 100%;
      margin-top: 2rem;
    }
    @media (min-width: 768px) {
      .trusted { margin-top: 2.5rem; }
    }

    .trusted-label {
      text-align: left;
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(45, 58, 46, 0.5);
      margin-bottom: 1.5rem;
    }
    @media (min-width: 768px) {
      .trusted-label { margin-bottom: 2rem; }
    }

    .trusted-logos {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .trusted-logos { gap: 3rem; }
    }
    @media (min-width: 1024px) {
      .trusted-logos { gap: 4rem; }
    }

    .trusted-logos span {
      font-size: 1.125rem;
      color: rgba(45, 58, 46, 0.8);
      white-space: nowrap;
    }
    @media (min-width: 768px) {
      .trusted-logos span { font-size: 1.25rem; }
    }
    @media (min-width: 1024px) {
      .trusted-logos span { font-size: 1.5rem; }
    }

    .font-playfair { font-family: "Playfair Display", serif; font-weight: 700; }
    .font-oswald { font-family: "Oswald", sans-serif; font-weight: 500; text-transform: uppercase; }
    .font-montserrat { font-family: "Montserrat", sans-serif; font-weight: 700; }
    .font-roboto-slab { font-family: "Roboto Slab", serif; font-weight: 600; text-transform: uppercase; }
    .font-raleway { font-family: "Raleway", sans-serif; font-weight: 700; }

    body.menu-lock { overflow: hidden; }
  </style>
</head>
<body>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <div class="nav-bar">
        <div class="nav-left animate-fade-down stagger-1">
          <button class="nav-link" type="button">
            Solutions
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <a href="#" class="nav-link">Plans</a>
          <a href="#" class="nav-link">News</a>
        </div>

        <a href="#" class="logo animate-fade-down stagger-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
          <span>Palomar</span>
        </a>

        <a href="#" class="nav-cta animate-fade-down stagger-3">Try It Free</a>

        <button class="hamburger" type="button" aria-label="Toggle menu" id="hamburger">
          <div class="hamburger-icon">
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <div class="mobile-overlay" id="overlay">
      <div class="mobile-overlay-inner">
        <a href="#" class="mobile-link" data-close>Solutions</a>
        <a href="#" class="mobile-link" data-close>Plans</a>
        <a href="#" class="mobile-link" data-close>News</a>
        <a href="#" class="mobile-cta" data-close>Try It Free</a>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-video">
      <video
        src="https://axeslab.zainaxes.com/web/media/ext/4ee225aa17cc394a.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>

    <div class="hero-content">
      <a href="#" class="pill animate-fade-up stagger-3">
        <span>Live for everyone today! Offering $1MM in credits.</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>

      <h1 class="headline animate-fade-up stagger-4">
        One unified system to build,<br class="break" />
        test, ship, and observe LLMs
      </h1>

      <div class="trusted animate-fade-up stagger-5">
        <p class="trusted-label">Backed by</p>
        <div class="trusted-logos animate-fade-up stagger-6">
          <span class="font-playfair">Meridian</span>
          <span class="font-oswald">STELLEX</span>
          <span class="font-montserrat">Luminar</span>
          <span class="font-roboto-slab">OVERLAND</span>
          <span class="font-raleway">Kinetic</span>
        </div>
      </div>
    </div>
  </section>

  <script>
    const nav = document.getElementById("nav");
    const hamburger = document.getElementById("hamburger");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });

    hamburger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("menu-lock", open);
    });

    document.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("menu-lock");
      });
    });
  </script>
</body>
</html>
