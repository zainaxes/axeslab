---
id: "res_wd_f1_racing_hub"
slug: "f1-racing-hub"
title: "F1 Racing Hub"
category: "Mobile App"
categorySlug: "mobile-app"
collection: "apps"
likes: 180
tier: "free"
chars: 10036
preview_video: "/media/videos/f1-racing-hub.mp4"
preview_poster: "/media/posters/f1-racing-hub.webp"
---

# F1 Racing Hub (Mobile App)

# Recreate This Page Exactly — Lewis Hamilton / Silverstone F1 Hero

## Tech stack
- React + TypeScript + Vite
- Tailwind CSS (config extends `fontFamily.sans` = `['"Albert Sans"', 'sans-serif']`, plus custom `f1.dark = rgb(41,41,41)` and `f1.yellow = rgb(237,180,11)`)
- lucide-react for icons (X, Menu used)
- Google Font: **Albert Sans** weights 300;400;500;600;700;800, loaded in index.html via `https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700;800&display=swap`
- Body background: `#0a0e1c`, antialiased
## Overall layout
A full-screen hero section (`relative w-full overflow-hidden font-sans`) with a page background image and dark overlay, then two responsive layouts:

**Page background image (used for both page and inside phone screens):**
```
https://axeslab.zainaxes.com/web/media/ext/4e6314027c373f81.webp
```
- Page: `<img>` absolute inset-0 w-full h-full object-cover z-0, then `<div className="absolute inset-0 bg-black/70 z-[1]" />`

**Desktop (md+):** `hidden md:flex relative z-[2] w-full h-screen items-center justify-center py-6` → a flex row `items-end justify-center gap-[2vw]` containing three phone mockups, each wrapped in `animate-fade-slide-up` with delays 300/500/700. Middle phone has `-mb-6`.

**Mobile (below md):** `md:hidden relative z-[2] flex flex-col items-center gap-[50px] py-[20px] px-[20px]` → same three phones, delays 300/500/700.

## PhoneMockup component
A reusable iPhone-style frame:
- Outer: `flex flex-col items-center`
- Frame: `relative rounded-[clamp(30px,4vw,54px)] bg-black p-[clamp(6px,1vw,12px)] shadow-2xl shadow-black/60`, with inner ring `absolute inset-0 rounded-[clamp(30px,4vw,54px)] ring-1 ring-white/15`
- Screen: `relative w-full h-full rounded-[clamp(24px,3.2vw,44px)] overflow-hidden bg-[#0a0e1c]`
- Dynamic Island: `absolute top-[3%] left-1/2 -translate-x-1/2 w-[30%] h-[4%] bg-black rounded-full z-50`
- Content scaling: inner div sized `390px × contentH` (contentH measured from ResizeObserver), scaled by `scale = screenW / 390`, transform-origin top-left
- Side buttons (neutral-700): left side three buttons at top 19%/26%/35.5% (heights 4.5%/7.3%/7.3%), right side one at 30.8% height 11.4%

**Phone frame sizing (CSS):**
- `.phone-frame { aspect-ratio: 390/844; width: clamp(200px, 75vw, 340px); }`
- `@media (min-width:768px) { width: min(25vw, 42vh); }`
- `@media (min-width:1280px) { width: min(28vw, 48vh, 430px); }`

## Phone navigation (shared, in every screen)
Top nav `absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 h-14 mt-[20px]`:
- Left: F1 logo `<img src="https://axeslab.zainaxes.com/web/media/ext/0727f43267d0f98e.png" className="h-7 w-auto object-contain" />`
- Right: two 14×14 (h-14 w-14) square buttons, no rounding:
  - White button with profile icon `https://axeslab.zainaxes.com/web/media/ext/d817d0589f44a41a.png` (w-5 h-5)
  - Glass button: `background: rgba(255,255,255,0.15); backdropFilter: blur(12px)` containing two white bars (21px and 10px wide, 2px tall, rounded-full, 5px gap)

**Menu overlay (z-50, full screen):** `linear-gradient(160deg, #1a0000 0%, #8B0000 40%, #E10600 100%)`, fade transition 400ms. Links: Biography, Statistics, Career — text-3xl font-bold tracking-tight, stagger slide-in (translateX -20px→0, delay 0.1 + i*0.08s, cubic-bezier(0.16,1,0.3,1)). Hover color `#EDB40B`. Bottom: white "Sign in" button.

## Screen 1 — Lewis Hamilton hero
`relative w-full h-full flex flex-col px-5 pb-0 pt-[76px] overflow-hidden`
- Background: ScreenBackground (BG image + `bg-black/60`)
- PhoneNav
- Location block (z-10, mt-4 mb-2, animate-fade-slide-up delay-300): "United Kingdom" text-white/60 text-[16px] + UK flag `https://axeslab.zainaxes.com/web/media/ext/cd0882933a3261b3.png` (w-6 h-6). Title: text-white font-normal leading-[0.95] tracking-[-0.05em] text-[48px] → "Silverstone" / "England"
- **Driver photo container** (z-[5], absolute fill, flex items-end justify-center): 
  - `<img src="https://axeslab.zainaxes.com/web/media/ext/c6f89e9aa3cfdce0.png" className="w-[calc(140%-5px)] max-w-none h-auto object-contain animate-scale-in delay-500 origin-bottom" />`
  - **Blur overlay** (the key glass effect): `absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none` with inline style:
    ```
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    mask: 'linear-gradient(to bottom, transparent 0%, black 50%)',
    WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 50%)'
    ```
- Bottom content (z-10, absolute bottom-0 px-5 pb-5):
  - Driver avatar selector strip `https://axeslab.zainaxes.com/web/media/ext/95f5fe22951a9f12.png` (h-12 w-auto, animate-fade-slide-up delay-700, mb-3)
  - Name: text-white font-semibold leading-[0.82] tracking-[-0.05em] text-[64px] animate-speed-reveal delay-800 → "Lewis" / "Hamilton"

## Screen 2 — Silverstone circuit + stats
`relative w-full h-full flex flex-col px-5 pb-8 pt-[76px] overflow-hidden`
- Background + PhoneNav
- Location block (z-10, mb-4, animate-fade-slide-up delay-400): same UK/flag/Silverstone England as Screen 1
- Circuit image (z-10, flex-1 flex items-center justify-center -mx-5 px-2 min-h-0, animate-scale-in delay-600): `https://axeslab.zainaxes.com/web/media/ext/5127edfd57ea3450.png` w-full h-full object-contain
- Stats block (z-10, mt-auto pt-4, animate-fade-slide-up delay-800): "Season Points" label + medal icon `https://axeslab.zainaxes.com/web/media/ext/fd5e6c93cb0cf78d.png` (w-6 h-6). Three count-up numbers, each font-semibold tracking-[-0.06em] fontSize 110px lineHeight 0.72:
  - 227 (delay 800) — gradient text `linear-gradient(to bottom, white 0%, rgba(255,255,255,0.4) 50%, transparent 85%)` via bg-clip-text text-transparent
  - 374 (delay 1000) — same gradient
  - 4987 (delay 1200) — solid color `#EDB40B`
- Count-up animation: useCountUp hook, cubic ease-out (1-(1-t)³), duration 2200ms, starts after delay, requestAnimationFrame

## Screen 3 — Scuderia Ferrari team
`relative w-full h-full overflow-hidden`
- Background + PhoneNav
- Team title (absolute top-[100px] left-5 z-10, animate-fade-slide-up delay-300): "Team Name" text-white/60 text-[15px] + Ferrari icon `https://axeslab.zainaxes.com/web/media/ext/01aba650b4c0e9f7.png` (w-5 h-5). Title text-white font-normal leading-[0.83] text-[52px] letterSpacing -0.08em → "Scuderia" / "Ferrari"
- Chassis (absolute top-[245px] left-5 z-10, animate-fade-slide-up delay-500): chassis icon `https://axeslab.zainaxes.com/web/media/ext/8be58f7767f27e36.png` (w-5 h-5) + "Chassis" label. Number text-[#EDB40B] font-semibold leading-[0.79] text-[120px] letterSpacing -0.08em → "SF-26"
- Car image (absolute top-[390px] left-3 right-3 z-10 w-[calc(100%-24px)] h-auto object-contain animate-fade-slide-left delay-700): `https://axeslab.zainaxes.com/web/media/ext/2d28d081a568a3a0.png`
- Bottom driver cards (absolute bottom-0 flex, animate-fade-slide-up delay-900): two side-by-side cards, each w-1/2 h-200px rounded-t-2xl p-3, glass style:
  ```
  background: rgba(20,20,30,0.8),
  border: 1px solid rgba(255,255,255,0.1),
  borderBottom: none,
  backdropFilter: blur(16px)
  ```
  - Leclerc card: "Charles Leclerc" text-white/60 text-[13px] + profile icon (w-4 h-4 opacity-60), stats image `https://axeslab.zainaxes.com/web/media/ext/ea6a6ea3bd472841.png` (h-5), big number "16" text-white font-semibold leading-[0.79] text-[110px] letterSpacing -0.08em
  - Hamilton card: "Lewis Hamilton" + profile icon, stats image `https://axeslab.zainaxes.com/web/media/ext/80681b005d8cacf2.png` (h-5), big number "44"

## Animations (CSS keyframes, all `both` fill-mode)
- **fadeSlideUp**: opacity 0→1, translateY 30px→0, 0.9s cubic-bezier(0.16,1,0.3,1)
- **fadeSlideDown**: translateY -20px→0, 0.7s
- **fadeSlideLeft**: translateX 40px→0, 0.9s
- **fadeSlideRight**: translateX -40px→0, 0.9s
- **scaleIn**: opacity 0→1, scale 0.92→1, 1s
- **fadeIn**: opacity 0→1, 0.8s ease-out
- **speedReveal** (the name reveal): 0% opacity 0 translateX(-100%) skewX(-8deg) blur(8px) → 60% opacity 1 translateX(4%) skewX(-2deg) blur(0) → 100% translateX(0) skewX(0) blur(0), 0.8s
- **raceLineLeft**: scaleX 0→1.1→1 from left
- Delay utilities: delay-100 through delay-1600 (0.1s steps)

## Exact asset URLs (use verbatim)
- Page/phone background: `https://axeslab.zainaxes.com/web/media/ext/4e6314027c373f81.webp`
- F1 logo: `https://axeslab.zainaxes.com/web/media/ext/0727f43267d0f98e.png`
- Profile/search icon: `https://axeslab.zainaxes.com/web/media/ext/d817d0589f44a41a.png`
- UK flag: `https://axeslab.zainaxes.com/web/media/ext/cd0882933a3261b3.png`
- Lewis Hamilton photo: `https://axeslab.zainaxes.com/web/media/ext/c6f89e9aa3cfdce0.png`
- Driver avatar selector: `https://axeslab.zainaxes.com/web/media/ext/95f5fe22951a9f12.png`
- Silverstone circuit: `https://axeslab.zainaxes.com/web/media/ext/5127edfd57ea3450.png`
- Season points medal: `https://axeslab.zainaxes.com/web/media/ext/fd5e6c93cb0cf78d.png`
- Ferrari team icon: `https://axeslab.zainaxes.com/web/media/ext/01aba650b4c0e9f7.png`
- Chassis icon: `https://axeslab.zainaxes.com/web/media/ext/8be58f7767f27e36.png`
- Ferrari SF-26 car: `https://axeslab.zainaxes.com/web/media/ext/2d28d081a568a3a0.png`
- Leclerc stats: `https://axeslab.zainaxes.com/web/media/ext/ea6a6ea3bd472841.png`
- Hamilton stats: `https://axeslab.zainaxes.com/web/media/ext/80681b005d8cacf2.png`

## Color tokens
- Background dark: `#0a0e1c`
- F1 red (menu gradient): `#E10600`, dark red `#8B0000`, near-black `#1a0000`
- Gold/yellow accent: `#EDB40B`
- Glass card: `rgba(20,20,30,0.8)` + `backdropFilter: blur(16px)` + `border: 1px solid rgba(255,255,255,0.1)`
- Nav glass button: `rgba(255,255,255,0.15)` + `blur(12px)`
- Photo bottom blur: `blur(6px)` with vertical mask gradient transparent→black at 50%

## Typography rules
- Font: Albert Sans throughout
- Headlines: font-normal or font-semibold, very tight tracking (-0.05em to -0.08em), tight leading (0.72–0.95)
- Large display numbers: 110–120px, lineHeight 0.72–0.79
- Labels: text-white/60, 13–16px, font-normal
