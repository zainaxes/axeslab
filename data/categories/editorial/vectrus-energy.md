---
id: "res_meez_vectrus_energy"
slug: "vectrus-energy"
title: "Vectrus Energy"
category: "Editorial"
categorySlug: "editorial"
collection: "prompts"
likes: 191
tier: "free"
chars: 36291
preview_video: ""
preview_poster: "/media/posters/vectrus-energy.jpg"
---

# Vectrus Energy (Editorial)

Build a standalone cinematic one-page site that recreates this EXACTLY. Do not invent extra sections, extra copy, extra logos, extra overlays, GSAP, Lenis, or a different video. Match structure, copy, colors, type, spacing, breakpoints, animations, and scroll-video logic.

STACK
- Vite + React 18 + TypeScript + Tailwind CSS 3
- lucide-react icons: ArrowRight, ArrowDown, ChevronUp, Info, X
- mp4box ^0.5.2 for WebCodecs frame extraction
- Path alias @ -> src
- No routing. Single App. One full-viewport sticky scene, 500vh tall scroll track.

VIDEO (use this URL exactly, nowhere else)
https://axeslab.zainaxes.com/web/media/ext/ec344d33d55ad7a9.mp4

The clip is a high-key aerial fly-through: pale clouds, mist, mountains, then darker atmospheric landscape. Full-bleed object-cover background. No poster image. No controls. muted, playsInline, preload="auto". Video is NEVER autoplayed as a timeline; playback position is driven by Axes Lab (@zainaxes).

FONT
Load exactly:
<link href="(self-host this face — no free CDN; substitute a close match if unavailable)" rel="stylesheet">
body font-family: 'Helvetica Neue ME', 'Helvetica Neue', Helvetica, Arial, sans-serif;
html { scroll-behavior: smooth; }
body { overflow-x: hidden; }
Title: "Scroll Tied Video Section"

COLOR
const DARK = '#1D3045'
Navy text on light cloud frames. White text on dark later frames.
No color overlays / gradients on the video. Text sits directly on the video.

PAGE ARCHITECTURE
Outer: relative h-[500vh]  (this is the scroll distance)
Inner sticky: sticky top-0 w-full h-screen overflow-hidden
Inside sticky:
  1) <video> full cover
  2) <canvas width=1920 height=1080> absolute inset-0 object-cover, opacity 1 when frame-bank is live else 0, transition-opacity duration-300. Canvas draws decoded frames so scrubbing is smooth (video.currentTime seeking is fallback only).
  3) Overlay absolute inset-0 pointer-events-none containing Navbar + 3 sequential sections.

SCROLL PROGRESS
p = clamp(0, 1, window.scrollY / (container.offsetHeight - window.innerHeight))
Recompute span on resize and orientationchange.

TEXT SECTIONS ARE SEQUENTIAL (previous fully fades out before next appears)

s1Opacity:
  p < 0.20 → 1
  else → max(0, 1 - (p - 0.20) / 0.08)

s2Opacity:
  p < 0.32 → 0
  p < 0.40 → (p - 0.32) / 0.08
  p < 0.55 → 1
  else → max(0, 1 - (p - 0.55) / 0.08)

s3Opacity:
  p < 0.67 → 0
  p < 0.75 → (p - 0.67) / 0.08
  else → 1

Each section: absolute inset-0, style opacity + transition 'opacity 0.1s ease-out'
Children use Stagger: visible when section opacity > 0.3
Stagger: opacity 0→1, translateY(24px)→0, 0.8s cubic-bezier(0.16,1,0.3,1), delay in ms.

NAVBAR (absolute top, z-50, pointer-events-auto)
Padding: px-6 sm:px-8 md:px-12  pt-8 sm:pt-12 pb-6
flex items-center justify-between
Color flips at p > 0.55: DARK → white (duration-500)

Desktop lg+: left cluster of 5 links, gap-8 xl:gap-10
  VECTRUS ENERGY (active, 2px underline -bottom-3 full width)
  VECTRUS UPSTREAM
  VECTRUS MARKETS
  VECTRUS SYSTEMS
  VECTRUS+
Link style: text-xs tracking-[0.15em] uppercase font-medium, hover:opacity-70
Nav entrance: after 200ms, each link fades/slides from translateY(-12px), opacity 0.6s cubic-bezier(0.16,1,0.3,1), delay i*80+100ms

Right cluster (hidden below sm):
  NEWS (text-xs tracking-[0.2em] uppercase font-medium) + 20px circle filled with current nav color, Info icon size 10 inverted
  MENU label same type (lg+: span, below lg: button that opens overlay)
  Right cluster delay 500ms same entrance

Mobile <lg: hamburger left, 3 bars:
  bar 24x2, 24x2, 16x2, gap 5px, color follows isLight
Hamburger opens full-screen overlay.

MOBILE MENU OVERLAY
fixed inset-0 z-[100], background DARK
open: opacity-100 visible; closed: opacity-0 invisible; duration-500 ease cubic-bezier(0.4,0,0.2,1)
inner panel: closed -translate-y-8, open translate-y-0
Close: top-right px-6 sm:px-8 pt-8 sm:pt-12, 40px circle border-white/30, X 18, hover:border-white
Links centered vertically, px-8 sm:px-12, py-3, text-2xl sm:text-3xl font-light tracking-wide uppercase
active white, others white/60 hover:white
stagger in: delay i*60ms, translateY(20px)→0
Footer: NEWS and CONTACT, text-xs tracking-[0.2em] uppercase text-white/60, px-8 sm:px-12 pb-10
When open, body overflow hidden.

SECTION 1 (hero, left aligned, vertically centered)
px-6 sm:px-8 md:px-20 lg:px-32
H1: "Advancing resources for a cleaner future"
  clamp(2rem,5vw,5rem) font-light uppercase leading-[1.2] color DARK
Subtitle below mt-6: "Sustainable power with purpose"
  text-sm tracking-[0.3em] uppercase color DARK at 90% alpha (#1D304590)
Bottom-right absolute bottom-12 right-6 sm:right-8 md:right-12:
  48px circle button, border DARK 50% alpha, ArrowRight 18, hover:opacity-70
Stagger delays: title 0, subtitle 150, button 300

SECTION 2 (center)
px-6 sm:px-8, flex center
max-w-[900px]
H2 clamp(1.5rem,4.5vw,4.5rem) font-extralight tracking-wide leading-[1.3] text-center uppercase
Copy exactly:
  "We build lasting partnerships with vision " + span color DARK 80% "and precision" + " " + span color DARK 50% "across every frontier"
Right column absolute bottom-16 right-6 sm:right-8 md:right-12, flex-col items-center gap-4:
  48px circle, border DARK 40%, ArrowDown 18
  then mt-4 three dots: 8px solid DARK (active), 6px DARK 40%, 6px DARK 40%, gap-2
  then 40px circle, border DARK 30%, ChevronUp 16, color DARK 80%, mt-2
Stagger delays: headline 0, down 200, dots 350, up 500

SECTION 3 (right aligned, white type — video is dark here)
flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32
max-w-2xl text-left
Eyebrow: "Halder | Nordvik"  text-white/60 text-lg tracking-wide mb-4
H2: "Fueling ambition," line break "shaping tomorrow."
  clamp(2rem,4vw,4rem) font-light text-white leading-[1.2] uppercase tracking-wide mb-8
CTA row gap-4:
  "Contact Nordvik" text-sm tracking-[0.3em] text-white/80 uppercase
  40px white filled circle, gray-800 ArrowRight 16, hover:scale-110 duration-300
Stagger delays: 0 / 150 / 300

SMOOTH VIDEO SCROLL — SAME LOGIC (do not replace with GSAP or naive currentTime only)

Hook useVideoScrub(videoSrc):

Constants:
  LERP_TAU = 8
  SNAP = 0.002
  LRU_MAX = 24
  LEAD = 24
  WATCHDOG = 60000 ms

State:
  bank: {ts microseconds, blob webp}[]
  lru: Map<index, ImageBitmap | null>
  current / target times in seconds
  ready, reverted, painted, building, dur

rAF loop every frame:
  dt = min(0.1, deltaSeconds)
  p = getProgress(); setScrollProgress(p)
  if dur > 0:
    target = p * dur
    if prefers-reduced-motion: current = target
    else:
      current += (target - current) * (1 - exp(-dt * LERP_TAU))
      if abs(target-current) < SNAP: current = target
    if ready: draw nearest frame from bank
    else: fallback: if not seeking and abs(video.currentTime - current) > 0.01, set video.currentTime = current

Frame bank (build after window load, skip if reduced-motion or no VideoDecoder):
  fetch the CloudFront mp4 as ArrayBuffer
  parse with MP4Box.createFile(), extract video track, configure VideoDecoder (codec + avcC/hvcC/vpcC/av1C description)
  decode samples as EncodedVideoChunk (key vs delta)
  throttle with LEAD so decode doesn't outrun blob encoding
  each VideoFrame → offscreen canvas → toBlob('image/webp', 0.82) stored with timestamp
  sort bank by Axes Lab (@zainaxes)
  nearestIndex: binary search on timestamps (compare t*1e6)
  warmLRU around i-1..i+2, createImageBitmap, evict oldest when size > LRU_MAX
  first successful canvas paint → canvasLive true (canvas fades in over video)
  if hardware decode fails, retry once with hardwareAcceleration: 'prefer-software'
  60s watchdog → revert to video seeking fallback, hide canvas
  CORS: fetch needs CloudFront CORS; video element still works as fallback if decode fails

Video element still renders underneath until canvas is live.

DO NOT
- Add extra brands, logos, cookie widgets, or “scroll down to discover”
- Change copy or nav labels
- Play the video with play()
- Use a different video host or local file
- Skip mobile overlay or hamburger
- Skip lerp (jumping frames = wrong)

DELIVER
Working Vite React TS app: index.html, App.tsx, useVideoScrub.ts, index.css, mp4box.d.ts, vite alias @, lucide-react + mp4box installed. Pixel-faithful to the spec above.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Scroll Tied Video Section</title>
  <link href="(self-host this face — no free CDN; substitute a close match if unavailable)" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Helvetica Neue ME', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      overflow-x: hidden;
      background: #0a0a0a;
    }

    .track { position: relative; height: 500vh; }
    .sticky {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    .bg-video, .bg-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .bg-canvas {
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .bg-canvas.live { opacity: 1; }
    .overlay { position: absolute; inset: 0; pointer-events: none; }

    /* NAV */
    .nav {
      position: absolute;
      top: 0; left: 0; right: 0;
      z-index: 50;
      pointer-events: auto;
      padding: 3rem 1.5rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    @media (min-width: 640px) { .nav { padding: 3rem 2rem 1.5rem; } }
    @media (min-width: 768px) { .nav { padding: 3rem 3rem 1.5rem; } }

    .nav-links { display: none; align-items: center; gap: 2.5rem; }
    @media (min-width: 1024px) { .nav-links { display: flex; } }
    @media (min-width: 1280px) { .nav-links { gap: 2.5rem; } }

    .nav-link {
      position: relative;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
      color: #1D3045;
      transition: color 0.5s, opacity 0.3s;
    }
    .nav-link:hover { opacity: 0.7; }
    .nav-link.active::after {
      content: '';
      position: absolute;
      left: 0; right: 0;
      bottom: -0.75rem;
      height: 2px;
      background: currentColor;
    }
    .nav-link.enter, .nav-right.enter {
      opacity: 0;
      transform: translateY(-12px);
    }
    .nav-link.show, .nav-right.show {
      opacity: 1;
      transform: translateY(0);
    }
    .nav-link.show, .nav-right.show, .nav-link.enter, .nav-right.enter {
      transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), color 0.5s;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 60;
      padding: 0;
    }
    @media (min-width: 1024px) { .hamburger { display: none; } }
    .hamburger span {
      display: block;
      height: 2px;
      background: #1D3045;
      transition: background-color 0.5s;
    }
    .hamburger span:nth-child(1),
    .hamburger span:nth-child(2) { width: 24px; }
    .hamburger span:nth-child(3) { width: 16px; }

    .nav-right {
      display: none;
      align-items: center;
      gap: 1.5rem;
    }
    @media (min-width: 640px) { .nav-right { display: flex; } }
    .news {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .news-label, .menu-label {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 500;
      color: #1D3045;
      transition: color 0.5s;
      background: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
    }
    .menu-label.lg-only { display: none; }
    @media (min-width: 1024px) {
      .menu-label.sm-only { display: none; }
      .menu-label.lg-only { display: inline; cursor: default; }
    }
    .info-dot {
      width: 20px; height: 20px;
      border-radius: 50%;
      background: #1D3045;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.5s;
    }
    .nav.is-light .nav-link,
    .nav.is-light .news-label,
    .nav.is-light .menu-label { color: #fff; }
    .nav.is-light .info-dot { background: #fff; }
    .nav.is-light .hamburger span { background: #fff; }
    .nav.is-light .info-dot svg { stroke: #111827; }

    /* MOBILE MENU */
    .mobile-menu {
      position: fixed;
      inset: 0;
      z-index: 100;
      pointer-events: auto;
      background: #1D3045;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1), visibility 0.5s;
    }
    .mobile-menu.open { opacity: 1; visibility: visible; }
    .mobile-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      transform: translateY(-2rem);
      transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    }
    .mobile-menu.open .mobile-inner { transform: translateY(0); }
    .mobile-close-wrap {
      display: flex;
      justify-content: flex-end;
      padding: 2rem 1.5rem 0;
    }
    @media (min-width: 640px) { .mobile-close-wrap { padding: 3rem 2rem 0; } }
    .close-btn {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.3);
      background: none;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s;
    }
    .close-btn:hover { border-color: #fff; }
    .mobile-links {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2rem;
      gap: 0.25rem;
    }
    @media (min-width: 640px) { .mobile-links { padding: 0 3rem; } }
    .mobile-links a {
      display: block;
      padding: 0.75rem 0;
      text-decoration: none;
      opacity: 0;
      transform: translateY(20px);
      transition: transform 0.3s ease-out, opacity 0.3s ease-out, color 0.3s;
    }
    .mobile-menu.open .mobile-links a {
      opacity: 1;
      transform: translateY(0);
    }
    .mobile-links a span {
      font-size: 1.5rem;
      font-weight: 300;
      letter-spacing: 0.025em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.6);
    }
    @media (min-width: 640px) { .mobile-links a span { font-size: 1.875rem; } }
    .mobile-links a.active span,
    .mobile-links a:hover span { color: #fff; }
    .mobile-foot {
      padding: 0 2rem 2.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    @media (min-width: 640px) { .mobile-foot { padding: 0 3rem 2.5rem; } }
    .mobile-foot span {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.6);
    }

    /* SECTIONS */
    .section {
      position: absolute;
      inset: 0;
      pointer-events: auto;
      opacity: 0;
      transition: opacity 0.1s ease-out;
    }
    .section-1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 1.5rem;
    }
    @media (min-width: 640px) { .section-1 { padding: 0 2rem; } }
    @media (min-width: 768px) { .section-1 { padding: 0 5rem; } }
    @media (min-width: 1024px) { .section-1 { padding: 0 8rem; } }

    .h1 {
      font-size: clamp(2rem, 5vw, 5rem);
      font-weight: 300;
      text-transform: uppercase;
      line-height: 1.2;
      color: #1D3045;
    }
    .sub {
      margin-top: 1.5rem;
      font-size: 0.875rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #1D304590;
    }
    .circle-btn {
      width: 48px; height: 48px;
      border-radius: 50%;
      border: 1px solid #1D304550;
      background: none;
      color: #1D3045;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    .circle-btn:hover { opacity: 0.7; }
    .s1-btn {
      position: absolute;
      bottom: 3rem;
      right: 1.5rem;
    }
    @media (min-width: 640px) { .s1-btn { right: 2rem; } }
    @media (min-width: 768px) { .s1-btn { right: 3rem; } }

    .section-2 {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1.5rem;
    }
    @media (min-width: 640px) { .section-2 { padding: 0 2rem; } }
    .h2-wrap { max-width: 900px; }
    .h2 {
      font-size: clamp(1.5rem, 4.5vw, 4.5rem);
      font-weight: 200;
      letter-spacing: 0.025em;
      line-height: 1.3;
      text-align: center;
      text-transform: uppercase;
      color: #1D3045;
    }
    .h2 .mid { color: #1D304580; }
    .h2 .dim { color: #1D304550; }
    .s2-rail {
      position: absolute;
      bottom: 4rem;
      right: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    @media (min-width: 640px) { .s2-rail { right: 2rem; } }
    @media (min-width: 768px) { .s2-rail { right: 3rem; } }
    .dots {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .dot-a { width: 8px; height: 8px; border-radius: 50%; background: #1D3045; }
    .dot-b { width: 6px; height: 6px; border-radius: 50%; background: #1D304540; }
    .circle-btn.sm {
      width: 40px; height: 40px;
      border-color: #1D304530;
      color: #1D304580;
      margin-top: 0.5rem;
    }

    .section-3 {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 1.5rem;
    }
    @media (min-width: 640px) { .section-3 { padding: 0 2rem; } }
    @media (min-width: 768px) { .section-3 { padding: 0 5rem; } }
    @media (min-width: 1024px) { .section-3 { padding: 0 8rem; } }
    .s3-inner { max-width: 42rem; text-align: left; }
    .eyebrow {
      color: rgba(255,255,255,0.6);
      font-size: 1.125rem;
      letter-spacing: 0.025em;
      margin-bottom: 1rem;
    }
    .h2-white {
      font-size: clamp(2rem, 4vw, 4rem);
      font-weight: 300;
      color: #fff;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      margin-bottom: 2rem;
    }
    .cta { display: flex; align-items: center; gap: 1rem; }
    .cta span {
      font-size: 0.875rem;
      letter-spacing: 0.3em;
      color: rgba(255,255,255,0.8);
      text-transform: uppercase;
    }
    .cta-btn {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: none;
      background: #fff;
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .cta-btn:hover { transform: scale(1.1); }

    .stagger {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .stagger.in {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <div class="track" id="track">
    <div class="sticky">
      <video
        id="bgVideo"
        src="https://axeslab.zainaxes.com/web/media/ext/ec344d33d55ad7a9.mp4"
        muted
        playsinline
        preload="auto"
        class="bg-video"
      ></video>
      <canvas id="bgCanvas" class="bg-canvas" width="1920" height="1080"></canvas>

      <div class="overlay">
        <nav class="nav" id="nav">
          <div class="nav-links" id="navLinks">
            <span class="nav-link active enter" data-i="0">VECTRUS ENERGY</span>
            <span class="nav-link enter" data-i="1">VECTRUS UPSTREAM</span>
            <span class="nav-link enter" data-i="2">VECTRUS MARKETS</span>
            <span class="nav-link enter" data-i="3">VECTRUS SYSTEMS</span>
            <span class="nav-link enter" data-i="4">VECTRUS+</span>
          </div>

          <button class="hamburger" id="openMenu" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>

          <div class="nav-right enter" id="navRight">
            <div class="news">
              <span class="news-label">NEWS</span>
              <div class="info-dot">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
            </div>
            <button class="menu-label sm-only" id="openMenuLabel">MENU</button>
            <span class="menu-label lg-only">MENU</span>
          </div>
        </nav>

        <section class="section section-1" id="s1">
          <div class="stagger" data-d="0">
            <h1 class="h1">Advancing resources for a cleaner future</h1>
          </div>
          <div class="stagger" data-d="150">
            <p class="sub">Sustainable power with purpose</p>
          </div>
          <div class="stagger s1-btn" data-d="300">
            <button class="circle-btn" aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        <section class="section section-2" id="s2">
          <div class="stagger h2-wrap" data-d="0">
            <h2 class="h2">
              We build lasting partnerships with vision
              <span class="mid">and precision</span>
              <span class="dim">across every frontier</span>
            </h2>
          </div>
          <div class="s2-rail">
            <div class="stagger" data-d="200">
              <button class="circle-btn" aria-label="Scroll down">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
              </button>
            </div>
            <div class="stagger dots" data-d="350">
              <div class="dot-a"></div>
              <div class="dot-b"></div>
              <div class="dot-b"></div>
            </div>
            <div class="stagger" data-d="500">
              <button class="circle-btn sm" aria-label="Scroll up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
            </div>
          </div>
        </section>

        <section class="section section-3" id="s3">
          <div class="s3-inner">
            <div class="stagger" data-d="0">
              <p class="eyebrow">Halder | Nordvik</p>
            </div>
            <div class="stagger" data-d="150">
              <h2 class="h2-white">Fueling ambition,<br />shaping tomorrow.</h2>
            </div>
            <div class="stagger" data-d="300">
              <div class="cta">
                <span>Contact Nordvik</span>
                <button class="cta-btn" aria-label="Contact">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-inner">
      <div class="mobile-close-wrap">
        <button class="close-btn" id="closeMenu" aria-label="Close menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="mobile-links">
        <a href="#" class="active" style="transition-delay:0ms"><span>VECTRUS ENERGY</span></a>
        <a href="#" style="transition-delay:60ms"><span>VECTRUS UPSTREAM</span></a>
        <a href="#" style="transition-delay:120ms"><span>VECTRUS MARKETS</span></a>
        <a href="#" style="transition-delay:180ms"><span>VECTRUS SYSTEMS</span></a>
        <a href="#" style="transition-delay:240ms"><span>VECTRUS+</span></a>
      </div>
      <div class="mobile-foot">
        <span>NEWS</span>
        <span>CONTACT</span>
      </div>
    </div>
  </div>

  <script src="https://unpkg.com/mp4box@0.5.2/dist/mp4box.all.min.js"></script>
  <script>
    const VIDEO_SRC = 'https://axeslab.zainaxes.com/web/media/ext/ec344d33d55ad7a9.mp4';
    const LERP_TAU = 8;
    const SNAP = 0.002;
    const LRU_MAX = 24;
    const LEAD = 24;
    const WATCHDOG = 60000;

    const video = document.getElementById('bgVideo');
    const canvas = document.getElementById('bgCanvas');
    const track = document.getElementById('track');
    const nav = document.getElementById('nav');
    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const s3 = document.getElementById('s3');
    const mobileMenu = document.getElementById('mobileMenu');

    const clip = {
      bank: [],
      lru: new Map(),
      drawnIndex: -1,
      ready: false,
      reverted: false,
      painted: false,
      building: false,
      buildRun: 0,
      dur: 0,
      current: 0,
      target: 0,
    };

    let span = 0;
    let reducedMotion = false;
    try { reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    function measure() {
      span = track.offsetHeight - window.innerHeight;
    }
    function getProgress() {
      if (span <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / span));
    }

    function nearestIndex(bank, t) {
      const us = t * 1e6;
      let lo = 0, hi = bank.length - 1;
      while (lo < hi) {
        const m = (lo + hi) >> 1;
        if (bank[m].ts < us) lo = m + 1; else hi = m;
      }
      return lo;
    }

    function warmLRU(bank, lru, i) {
      for (let k = -1; k <= 2; k++) {
        const j = i + k;
        if (j < 0 || j >= bank.length || lru.has(j)) continue;
        lru.set(j, null);
        createImageBitmap(bank[j].blob).then((bm) => {
          lru.set(j, bm);
          if (lru.size > LRU_MAX) {
            const it = lru.keys();
            for (let n = 0; n < lru.size - LRU_MAX; n++) {
              const key = it.next().value;
              const old = lru.get(key);
              if (old && old.close) old.close();
              lru.delete(key);
            }
          }
        }).catch(() => { lru.delete(j); });
      }
    }

    function drawFromBank(t) {
      if (!canvas || !clip.bank.length) return;
      const i = nearestIndex(clip.bank, t);
      const bm = clip.lru.get(i);
      if (bm && i !== clip.drawnIndex) {
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.drawImage(bm, 0, 0, canvas.width, canvas.height);
          clip.drawnIndex = i;
          if (!clip.painted && !clip.reverted) {
            clip.painted = true;
            canvas.classList.add('live');
          }
        }
      }
      warmLRU(clip.bank, clip.lru, i);
    }

    function renderFallback(t) {
      if (!video) return;
      if (!video.seeking && Math.abs(video.currentTime - t) > 0.01) {
        try { video.currentTime = t; } catch (e) {}
      }
    }

    function buildFrameBank(soft) {
      if (clip.building || reducedMotion) return;
      if (typeof VideoDecoder === 'undefined' || typeof MP4Box === 'undefined') return;
      clip.building = true;
      let settled = false;
      const watchdog = setTimeout(() => { revert(); finish(); }, WATCHDOG);
      function finish() { if (settled) return; settled = true; clearTimeout(watchdog); }
      function revert() {
        clip.reverted = true;
        clip.ready = false;
        canvas.classList.remove('live');
      }
      function failDecode() {
        if (settled) return;
        if (!soft) {
          settled = true; clearTimeout(watchdog);
          try { decoder.close(); } catch (e) {}
          clip.building = false;
          clip.bank.length = 0; clip.lru.clear(); clip.drawnIndex = -1;
          buildFrameBank(true);
          return;
        }
        revert(); finish();
      }

      const off = document.createElement('canvas');
      let octx = null;
      let chain = Promise.resolve();
      const samples = [];
      const run = ++clip.buildRun;
      let cnt = 0;
      const waiters = [];
      function tickDone() {
        cnt++;
        for (let i = waiters.length - 1; i >= 0; i--) {
          if (cnt >= waiters[i].n) { waiters[i].res(); waiters.splice(i, 1); }
        }
      }
      function until(n) {
        if (cnt >= n) return Promise.resolve();
        return new Promise(res => { waiters.push({ n, res }); });
      }

      let file;
      try { file = MP4Box.createFile(); } catch (e) { revert(); finish(); return; }

      const decoder = new VideoDecoder({
        output: (vf) => {
          const ts = vf.timestamp;
          chain = chain.then(() => {
            if (clip.reverted) { vf.close(); tickDone(); return; }
            if (!octx) {
              off.width = vf.codedWidth || 1280;
              off.height = vf.codedHeight || 720;
              octx = off.getContext('2d', { alpha: false });
            }
            octx.drawImage(vf, 0, 0, off.width, off.height);
            vf.close();
            return new Promise((res) => {
              off.toBlob((blob) => {
                if (blob && run === clip.buildRun) clip.bank.push({ ts, blob });
                tickDone(); res();
              }, 'image/webp', 0.82);
            });
          });
        },
        error: failDecode,
      });

      function description(track) {
        const trak = file.getTrackById(track.id);
        const entries = trak.mdia.minf.stbl.stsd.entries;
        for (let i = 0; i < entries.length; i++) {
          const box = entries[i].avcC || entries[i].hvcC || entries[i].vpcC || entries[i].av1C;
          if (box) {
            const s = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
            box.write(s);
            return new Uint8Array(s.buffer, 8);
          }
        }
        return null;
      }

      file.onError = () => { revert(); finish(); };
      file.onReady = (info) => {
        const track = info.videoTracks && info.videoTracks[0];
        if (!track) { revert(); finish(); return; }
        const desc = description(track);
        const cfg = {
          codec: track.codec,
          codedWidth: track.video.width,
          codedHeight: track.video.height,
        };
        if (desc) cfg.description = desc;
        if (soft) cfg.hardwareAcceleration = 'prefer-software';
        try { decoder.configure(cfg); } catch (e) { failDecode(); return; }
        file.setExtractionOptions(track.id, null, { nbSamples: Infinity });
        file.start();
      };
      file.onSamples = (_id, _user, list) => {
        for (let i = 0; i < list.length; i++) samples.push(list[i]);
      };

      function pump() {
        let i = 0;
        function step() {
          if (clip.reverted) return Promise.resolve();
          while (i < samples.length) {
            const s = samples[i];
            try {
              decoder.decode(new EncodedVideoChunk({
                type: s.is_sync ? 'key' : 'delta',
                timestamp: s.cts * 1e6 / s.timescale,
                duration: s.duration * 1e6 / s.timescale,
                data: s.data,
              }));
            } catch (e) { failDecode(); return Promise.resolve(); }
            i++;
            if (i - cnt > LEAD) return until(i - LEAD).then(step);
          }
          return Promise.resolve();
        }
        return step();
      }

      fetch(VIDEO_SRC)
        .then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
        .catch(() => { revert(); finish(); })
        .then((buf) => {
          if (!buf || clip.reverted) return;
          try {
            buf.fileStart = 0;
            file.appendBuffer(buf);
            file.flush();
          } catch (e) { revert(); finish(); return; }
          if (!samples.length) { revert(); finish(); return; }
          pump()
            .then(() => clip.reverted ? null : decoder.flush())
            .then(() => chain)
            .then(() => {
              if (clip.reverted || !clip.bank.length) { finish(); return; }
              clip.bank.sort((a, b) => a.ts - b.ts);
              const i0 = nearestIndex(clip.bank, clip.current);
              return createImageBitmap(clip.bank[i0].blob).then((bm) => {
                if (clip.reverted) return;
                clip.lru.set(i0, bm);
                clip.ready = true;
                drawFromBank(clip.current);
              }).then(finish);
            })
            .catch(() => { failDecode(); });
        });
    }

    function setStagger(section, visible) {
      section.querySelectorAll('.stagger').forEach((el) => {
        el.style.transitionDelay = visible ? (el.dataset.d || 0) + 'ms' : '0ms';
        el.classList.toggle('in', visible);
      });
    }

    function applyUI(p) {
      const s1o = p < 0.20 ? 1 : Math.max(0, 1 - (p - 0.20) / 0.08);
      const s2o = p < 0.32 ? 0 : p < 0.40 ? (p - 0.32) / 0.08 : p < 0.55 ? 1 : Math.max(0, 1 - (p - 0.55) / 0.08);
      const s3o = p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;
      s1.style.opacity = s1o;
      s2.style.opacity = s2o;
      s3.style.opacity = s3o;
      setStagger(s1, s1o > 0.3);
      setStagger(s2, s2o > 0.3);
      setStagger(s3, s3o > 0.3);
      nav.classList.toggle('is-light', p > 0.55);
    }

    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const p = getProgress();
      applyUI(p);
      if (clip.dur > 0) {
        clip.target = p * clip.dur;
        if (reducedMotion) {
          clip.current = clip.target;
        } else {
          clip.current += (clip.target - clip.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(clip.target - clip.current) < SNAP) clip.current = clip.target;
        }
        if (clip.ready) drawFromBank(clip.current);
        else renderFallback(clip.current);
      }
      requestAnimationFrame(tick);
    }

    function onMeta() {
      clip.dur = video.duration || 0;
      video.pause();
      measure();
    }
    if (video.readyState >= 1) onMeta();
    video.addEventListener('loadedmetadata', onMeta);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    measure();

    function startBank() { buildFrameBank(false); }
    if (document.readyState === 'complete') startBank();
    else window.addEventListener('load', startBank, { once: true });

    requestAnimationFrame(tick);

    setTimeout(() => {
      document.querySelectorAll('.nav-link').forEach((el) => {
        const i = Number(el.dataset.i);
        el.style.transitionDelay = (i * 80 + 100) + 'ms';
        el.classList.add('show');
      });
      const right = document.getElementById('navRight');
      right.style.transitionDelay = '500ms';
      right.classList.add('show');
    }, 200);

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('openMenu').addEventListener('click', openMenu);
    document.getElementById('openMenuLabel').addEventListener('click', openMenu);
    document.getElementById('closeMenu').addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); });
    });
  </script>
</body>
</html>
