---
id: "res_axes_ai_trip_planner"
slug: "ai-trip-planner"
title: "AI Trip Planner"
category: "SaaS"
source: "Axes Lab Curated"
tier: "free"
---

# AI Trip Planner

**Build a single-page React + TypeScript landing page for a travel app called "Wandor" using Vite, Tailwind CSS, and lucide-react. The page is a full-viewport hero section with a looping background video, a frosted-glass prompt card, and a navigation bar.**

**Fonts (load in index.html `<head>`):**
- Google Fonts link: `https://fonts.googleapis.com/css2?family=Special+Elite&family=Geist:wght@400;500;600;700&display=swap`
- Include preconnect to fonts.googleapis.com and fonts.gstatic.com (crossorigin).
- Body / UI font: "Geist" (sans-serif), weights 400/500/600/700.
- Logo font: "Special Elite" (typewriter serif), used only for the wordmark.
- Page title: `Wandor — Where will you go next?`

**Tailwind config (tailwind.config.js) — extend theme:**
- `fontFamily.sans`: `['Geist', 'sans-serif']`
- `fontFamily.display`: `['Special Elite', 'serif']`
- Custom colors under key `wandor`:
  - `dark: '#0a0a0a'`
  - `text: '#1a1a1a'`
  - `muted: '#767676'`
  - `prompt: '#905831'` (a brown/terracotta)

**Global CSS (index.css):**
- Standard Tailwind directives (base/components/utilities).
- `body`: `font-family: 'Geist', sans-serif; overflow-x: hidden; background: #fff;`

**Layout — single `<section>` that fills the viewport:**
- Section: `relative min-h-svh w-full overflow-hidden`.

**Background video (z-0):**
- `<video>` absolutely positioned `inset-0 w-full h-full object-cover z-0`.
- Exact `src`: `https://meez.design/web/media/prompt-media/v/4274a69e25d7e8a7.mp4`
- Attributes: `autoPlay muted loop playsInline`.

**Top gradient overlay (z-1):**
- Absolutely positioned `inset-x-0 top-0 h-[687px] pointer-events-none z-[1]`.
- Inline style background: `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)` — a white-to-transparent vertical fade covering the top 687px so the nav and headline read clearly over the video.

**Content wrapper (z-2):**
- `relative z-[2] max-w-[1360px] mx-auto`.

**Navigation bar:**
- `<nav>`: `flex items-center justify-between px-20 pt-6 pb-4` (mobile: `px-6 pt-5`).
- Left: wordmark `<span className="font-display text-[40px] text-black leading-none select-none">wandor</span>` (mobile: `text-[32px]`).
- Center: absolutely centered group `absolute left-1/2 -translate-x-1/2 flex gap-8` (hidden on mobile via `max-md:hidden`). Three buttons: "Discover", "Pricing", "FAQs". Each button: `bg-transparent border-none cursor-pointer font-sans text-[15px] font-medium uppercase text-wandor-text tracking-[0.04em] transition-opacity hover:opacity-55`.
- Right: flex group `flex items-center gap-8`:
  - "Login" button (hidden on mobile): `bg-transparent border-none cursor-pointer font-sans text-[15px] font-semibold uppercase text-[#292929] tracking-[0.04em] transition-opacity hover:opacity-55`.
  - "Plan My Trip" button: `bg-wandor-dark text-[#fafafa] border-none cursor-pointer font-sans text-[15px] font-medium uppercase tracking-[0.04em] px-5 py-3.5 rounded-full transition-all hover:bg-[#333] active:scale-95`.

**Hero body:**
- Container: `flex flex-col items-center px-6 pt-16 pb-24 text-center`.
- Headline `<h1>`: `font-sans text-[clamp(40px,6vw,68px)] font-medium text-wandor-text leading-[1.05] tracking-[-0.04em] max-w-[820px] mb-5`. Text: "Where will you go next?"
- Subtitle `<p>`: `font-sans text-xl font-medium text-wandor-muted leading-relaxed max-w-[500px] mb-10`. Text: "Tell our AI where you're going and what you love. We'll create a personalized itinerary for you."

**Liquid glass prompt card:**
- Wrapper `<div>`: `relative w-[701px] max-md:w-[calc(100vw-48px)] min-h-[208px] bg-white/[0.06] border-[3px] border-white rounded-[44px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-[20px]`. This is the liquid-glass effect: very low-opacity white fill, thick white border, heavy backdrop blur, soft shadow, large pill radius.
- Prompt text `<p>`: absolutely positioned `left-[29px] top-[57px] -translate-y-1/2 w-[609px] max-md:w-[calc(100%-58px)] font-sans text-xl max-md:text-[17px] font-medium text-wandor-prompt leading-relaxed break-words`. Text: "I'm planning a 7-day trip to Japan in October. I love food, hidden cafes, scenic hikes, and want to avoid crowds...." (note the trailing "....").
- "Plan My Trip" CTA button inside card: `absolute bottom-[21px] right-[21px] w-[156px] h-14 bg-black border-none rounded-[44px] shadow-[0_0_2px_0_rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center font-sans text-base font-medium text-[#fafafa] uppercase tracking-[0.02em] transition-all hover:bg-[#333] active:scale-95`. Text: "Plan My Trip".
- Hidden file input: `<input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" />`.
- Upload button: `absolute left-[21px] top-[137px] w-11 h-11 bg-transparent border border-white/70 rounded-full cursor-pointer flex items-center justify-center backdrop-blur-[14px] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`. `aria-label="Upload inspiration"`. On click, trigger the hidden file input via a ref. Inside, render the lucide-react `Upload` icon: `<Upload className="w-[18px] h-[18px] text-wandor-text flex-shrink-0" />`.

**Interactions / animations:**
- All buttons use `transition-opacity` / `transition-all` / `transition-transform` with `hover:opacity-55`, `hover:bg-[#333]`, `hover:scale-105`, and `active:scale-95` for tactile micro-interactions.
- The glass card and upload button use `backdrop-blur-[20px]` / `backdrop-blur-[14px]` for the liquid-glass frosted effect over the video.
- The video autoplays muted and loops continuously for ambient motion.
- The top white-to-transparent gradient overlay ensures the nav and headline remain legible over the video.

**Responsive behavior:**
- At `max-width: 760px` (Tailwind `max-md`): nav padding shrinks to `px-6 pt-5`, logo drops to 32px, center nav links and Login button hide, glass card becomes `calc(100vw - 48px)` wide with prompt text at 17px and width `calc(100%-58px)`.

**App structure:**
- `src/App.tsx` imports `Hero` from `@/components/Hero` and renders it inside a wrapping `<div>`.
- `Hero.tsx` contains all the markup above plus a `NavButton` helper component for the centered links.
- Use the `@/` path alias (maps to `src/`) configured in `vite.config.ts` via `resolve.alias`.

---

## Source Code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wandor — Where will you go next?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { font-family: 'Geist', sans-serif; overflow-x: hidden; background: #fff; }

    .hero { position: relative; min-height: 100svh; width: 100%; overflow: hidden; }

    .hero-video {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; z-index: 0;
    }

    .hero-overlay {
      position: absolute; inset-inline: 0; top: 0; height: 687px;
      background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      pointer-events: none; z-index: 1;
    }

    .hero-content { position: relative; z-index: 2; max-width: 1360px; margin-inline: auto; }

    nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 24px 80px 16px; position: relative;
    }

    .logo { font-family: 'Special Elite', serif; font-size: 40px; color: #000; line-height: 1; user-select: none; }

    .nav-links { position: absolute; left: 50%; transform: translateX(-50%); display: flex; gap: 32px; }

    .nav-links button {
      background: none; border: none; cursor: pointer;
      font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 500;
      text-transform: uppercase; color: #1a1a1a; letter-spacing: 0.04em; transition: opacity 0.15s;
    }
    .nav-links button:hover { opacity: 0.55; }

    .nav-actions { display: flex; align-items: center; gap: 32px; }

    .btn-login {
      background: none; border: none; cursor: pointer;
      font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 600;
      text-transform: uppercase; color: #292929; letter-spacing: 0.04em; transition: opacity 0.15s;
    }
    .btn-login:hover { opacity: 0.55; }

    .btn-plan {
      background: #0a0a0a; color: #fafafa; border: none; cursor: pointer;
      font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.04em;
      padding: 14px 20px; border-radius: 9999px; transition: background 0.15s, transform 0.1s;
    }
    .btn-plan:hover { background: #333; }
    .btn-plan:active { transform: scale(0.95); }

    .hero-body {
      display: flex; flex-direction: column; align-items: center;
      padding: 64px 24px 96px; text-align: center;
    }

    h1 {
      font-family: 'Geist', sans-serif; font-size: clamp(40px, 6vw, 68px);
      font-weight: 500; color: #1a1a1a; line-height: 1.05; letter-spacing: -0.04em;
      max-width: 820px; margin-bottom: 20px;
    }

    .subtitle {
      font-family: 'Geist', sans-serif; font-size: 20px; font-weight: 500;
      color: #767676; line-height: 1.4; max-width: 500px; margin-bottom: 40px;
    }

    .glass-card {
      position: relative; width: 701px; height: 208px;
      background: rgba(255,255,255,0.06); border: 3px solid white;
      border-radius: 44px; box-shadow: 0 0 4px 0 rgba(0,0,0,0.15); overflow: hidden;
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    }

    .card-prompt {
      position: absolute; left: 29px; top: 57px; transform: translateY(-50%); width: 609px;
      font-family: 'Geist', sans-serif; font-size: 20px; font-weight: 500;
      color: #905831; line-height: 1.4; word-break: break-word;
    }

    .card-cta {
      position: absolute; bottom: 21px; right: 21px; width: 156px; height: 56px;
      background: #000; border: none; border-radius: 44px;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.05); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Geist', sans-serif; font-size: 16px; font-weight: 500;
      color: #fafafa; text-transform: uppercase; letter-spacing: 0.02em;
      transition: background 0.15s, transform 0.1s;
    }
    .card-cta:hover { background: #333; }
    .card-cta:active { transform: scale(0.95); }

    .upload-btn {
      position: absolute; left: 21px; top: 137px; width: 44px; height: 44px;
      background: transparent; border: 1px solid rgba(255,255,255,0.7);
      border-radius: 44px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      transition: transform 0.15s; padding: 0;
    }
    .upload-btn:hover { transform: scale(1.05); }
    .upload-btn:focus-visible { outline: 2px solid white; outline-offset: 2px; }

    .upload-icon { width: 18px; height: 18px; flex-shrink: 0; }

    #file-input { display: none; }

    @media (max-width: 760px) {
      nav { padding: 20px 24px 16px; }
      .logo { font-size: 32px; }
      .nav-links, .btn-login { display: none; }
      .glass-card { width: calc(100vw - 48px); height: auto; min-height: 208px; }
      .card-prompt { width: calc(100% - 58px); font-size: 17px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <video class="hero-video"
      src="https://meez.design/web/media/prompt-media/v/4274a69e25d7e8a7.mp4"
      autoplay muted loop playsinline></video>

    <div class="hero-overlay"></div>

    <div class="hero-content">
      <nav>
        <span class="logo">wandor</span>
        <div class="nav-links">
          <button>Discover</button>
          <button>Pricing</button>
          <button>FAQs</button>
        </div>
        <div class="nav-actions">
          <button class="btn-login">Login</button>
          <button class="btn-plan">Plan My Trip</button>
        </div>
      </nav>

      <div class="hero-body">
        <h1>Where will you go next?</h1>
        <p class="subtitle">Tell our AI where you're going and what you love. We'll create a personalized itinerary for you.</p>

        <div class="glass-card">
          <p class="card-prompt">I'm planning a 7-day trip to Japan in October. I love food, hidden cafés, scenic hikes, and want to avoid crowds....</p>
          <button class="card-cta">plan My trip</button>
          <input type="file" id="file-input" accept="image/*,.pdf" />
          <button class="upload-btn" aria-label="Upload inspiration"
            onclick="document.getElementById('file-input').click()">
            <svg class="upload-icon" viewBox="0 0 19.5001 19.5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M0.750049 14.75C0.750049 15.68 0.750049 16.145 0.852269 16.5265C1.12967 17.5617 1.93832 18.3704 2.97359 18.6478C3.35509 18.75 3.82008 18.75 4.75005 18.75H14.75C15.68 18.75 16.145 18.75 16.5265 18.6478C17.5618 18.3704 18.3704 17.5617 18.6478 16.5265C18.75 16.145 18.75 15.68 18.75 14.75"
                stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.25 5.24997C14.25 5.24997 10.9358 0.75001 9.75003 0.75C8.56413 0.74999 5.25005 5.25 5.25005 5.25M9.75003 1.75V13.75"
                stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
