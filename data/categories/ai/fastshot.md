---
id: "res_meez_fastshot"
slug: "fastshot"
title: "Fastshot"
category: "AI"
categorySlug: "ai"
collection: "prompts"
likes: 46
tier: "free"
chars: 54806
preview_video: "https://meez.design/web/prompt-previews/prompt-media/7d9ebbbaf8e0e081.mp4"
preview_poster: "https://meez.design/web/prompt-previews/prompt-media/685b827bb6e32ba9-c.jpg"
---

# Fastshot (AI)

Recreate this page as ONE self-contained HTML file (inline CSS + JS). Match it pixel-faithfully. Do not invent extra sections, extra pages, extra copy, or a different visual language. The entire website is this single full-viewport hero.

════════════════════════════════════════════════════════════════
CRITICAL — COMPOSER RIGHT CLUSTER (this is where one-shot gens fail)
════════════════════════════════════════════════════════════════

The bottom of the prompt card is ONE toolbar row. Left: three chips. Right: “Sonnet 4.5”, paperclip, orange send circle.

DO NOT do any of the following (these are the usual mistakes):
- wrapping model + attach + send in a flex row with align-items:center
- giving the send button the same height as the chips
- vertically centering the send circle with the “Sonnet 4.5” text
- putting the send button on its own row or in the card’s vertical center
- adding padding/min-size around the paperclip (it is a raw SVG, not a padded icon button)
- using gap: 8px / 12px / 16px guesses between those three controls

DESKTOP MUST use absolute coordinates inside the toolbar, copied from the measured 1560×1008 frame.

Card (absolute frame coords): x=425, y=413, w=708, h=143, radius=26
Toolbar strip (.tools) inside the card:
  left  = (444 − 425) = 19u from card left
  top   = (505 − 413) = 92u from card top
  height = 30u   ← this is the CHIP row height
  right ≈ card right (formula: right: calc((425 + 708 − 1134)*var(--u)) which is −1u)

Chips fill that 30u-tall strip. The send circle is TALLER than the chips and is NOT centered on them.

RIGHT CLUSTER (.right):
  position:absolute; inset:0; pointer-events:none
  each child: position:absolute; pointer-events:auto
  (left offsets are relative to .tools, whose left edge is frame-x 444)

  MODEL “Sonnet 4.5” + chevron
    left: (955 − 444 − 0.8) = 510.2u
    top:  15.5u
    font-size: 10.4u, weight 400, color #98999C, line-height 1
    display:inline-flex; align-items:center; gap: 6.2u
    chevron SVG width: 6.8u
    The 10.4u text sits in the LOWER-MIDDLE of the 30u chip row (top 15.5 + height 10.4 = 25.9, so it sits above the chip baseline, not vertically centered with the 35u send).

  ATTACH paperclip
    left: (1043.15 − 444) = 599.15u
    top:  (515.14 − 505) = 10.14u
    color #A9AAAD
    SVG width: 19.79u  (no button padding, no background, no 32px hit box)
    hover color #fff

  SEND circle
    left: (1084 − 444) = 640u
    top:  (507 − 505) = 2u
    size: 35 × 35u, border-radius 50%
    So: send top is 2u below the chip-row top; send bottom is at 2+35=37u, which HANGS 7u BELOW the 30u chip row.
    Right padding: card right (1133) − send right (1084+35=1119) = 14u from the card’s inner right edge.
    Horizontal gaps (do not invent others):
      attach right ≈ 599.15+19.79 = 618.94u
      send left = 640u
      gap attach→send ≈ 21.06u
      model starts at 510.2u; leave the natural width of “Sonnet 4.5” + 6.2u + chevron; do not stretch it.

VISUAL CHECK (desktop screenshot):
  All three chips, the model label, the paperclip, and the send circle share one horizontal band near the BOTTOM of the glass card.
  Placeholder text is a separate band near the TOP of the card (33u from card top). Two bands, not one.
  The orange circle is the largest control on that band. Chips are 30u tall pills. Send is a 35u circle that slightly overshoots the chip row downward.
  “Sonnet 4.5” is small muted text sitting left of the paperclip, vertically aligned to the chip TEXT, not to the send circle’s center.
  Paperclip sits between the model label and the send circle, slightly higher than the model text, lower than the send’s top.

TABLET (600–1180 wide AND height ≥ 600) is the ONLY place the right cluster becomes flex:
  .right { position:static; display:flex; align-items:center; margin-left:auto; gap:0 }
  .right > * { position:static }
  .attach { margin-left: clamp(9px, 1.4vw, 20px) }
  .send   { margin-left: clamp(9px, 1.3vw, 18px); width/height: clamp(32px, 3.5vw, 38px) }
  Toolbar stays ONE ROW: chips left, controls right. Do not wrap the send onto a second row.

PHONE (max-width 599, or height < 600 with width ≤ 1180):
  .tools { flex-direction:column; align-items:stretch; gap:12px }
  chips wrap on row 1
  .right { position:static; display:flex; align-items:center; justify-content:flex-start }
  .attach { margin-left:auto }   ← paperclip + send hug the right; model stays left
  .send { margin-left:14px; width:40px; height:40px }
  Still not a centered send. Model left, attach+send right, same second row.

════════════════════════════════════════════════════════════════
PRODUCT
════════════════════════════════════════════════════════════════
Fastshot landing hero.
<title>Fastshot — Describe an app. We'll build it.</title>
<meta name="description" content="Fastshot turns a written description into a working app.">
viewport: width=device-width, initial-scale=1, viewport-fit=cover

BACKGROUND VIDEO (REQUIRED — this exact URL, no substitute, no still image)
https://axeslab.zainaxes.com/web/media/ext/3d16a1c80d75577d.mp4
<video> covering the full viewport: autoplay muted loop playsinline, object-fit:cover, z-index 0.
Page behind it: #0a0d12. html/body height 100%, body overflow:hidden.
The video is a dawn lake-and-mountains landscape. CSS must not pan/zoom/ken-burns it. UI sits on top.

FONTS
Google Fonts Inter variable: opsz 14..32, wght 100..900, font-display:block
--font-text: Inter, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
--font-display: Inter, var(--font-text)
Display roles: font-variation-settings: "opsz" 32
body: font-synthesis:none; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:geometricPrecision
Weights actually used (do not synthesize others): 400, display 410, 480 proof, 500 brand/labels, 520 CTA

REFERENCE LAYOUT (DESKTOP)
Frame 1560 × 1008. 1 unit (--u) = 1 reference px.
:root {
  --u: min(0.06410256vw, 0.12400794vh);
  --vu: 0.09920635vh;
  --inset-top: 41; --inset-bottom: 106;
}
@supports (height:100dvh) {
  --u: min(0.06410256vw, 0.12400794dvh);
  --vu: 0.09920635dvh;
}
@media (min-width:1561px) { --inset-top:27; --inset-bottom:74; }
The composition scales as one block and is never clipped. Video always covers the viewport (no letterboxing).

CSS VARIABLES (copy exactly)
Nav:
--brand-x:225; --brand-y:45; --mark:34; --brand-gap:12; --brand-fs:18.49;
--links-y:50.5; --links-gap:50; --links-fs:21.69;
--cta-x:1195; --cta-y:42; --cta-w:140; --cta-h:43; --cta-r:12; --cta-fs:15.70; --cta-dy:2;
Hero:
--hero-gap:51;
--h1-y:323; --h1-fs:36.25; --display-ls:0.0018em;
--nav-ls:-0.0115em; --brand-ls:-0.0154em; --cta-ls:-0.0127em; --body-ls:0.007em;
--label-ls:normal; --model-ls:normal; --proof-ls:0.0065em;
--w-regular:400; --w-display-wght:410; --w-medium:500; --w-semibold:600;
--w-display:var(--w-display-wght); --w-nav:400; --w-brand:500; --w-cta:520;
--w-body:var(--w-regular); --w-label:var(--w-medium);
--w-model:var(--w-regular); --w-proof:480;
Composer:
--card-x:425; --card-y:413; --card-w:708; --card-h:143; --card-r:26;
--ph-x:452; --ph-y:446; --ph-fs:9.97;
--chips-x:444; --chips-y:505; --chip-h:30; --chip-r:9; --chip-fs:9.0; --chip-gap:5.5;
--son-fs:10.4; --son-top:15.5; --chev-gap:6.2;
--chev-x:1013.5; --chev-y:522.3;
--att-x:1043.2; --att-y:515.1;
--send-x:1084; --send-y:507; --send-d:35;
Footer:
--by-y:799; --by-fs:14.01; --logo-y:867; --logo-gap:62;

PAGE STRUCTURE
.stage (position:fixed; inset:0; overflow:hidden; background:#0a0d12)
  .stage-video (absolute; inset:0; width/height 100%; object-fit:cover; z-index:0)
  .frame (absolute; inset:0; z-index:1; flex column)
    padding: calc(var(--inset-top)*var(--vu)) calc(225*var(--u)) calc(var(--inset-bottom)*var(--vu));
    hidden checkbox #menu
    header.nav (height: calc(43*var(--u)); flex; align-items:center; justify-content:space-between)
    .sheet (mobile menu; display:none on desktop)
    main.hero (flex:1; column; align center; justify center; gap: calc(var(--hero-gap)*var(--vu)); padding-bottom: calc(4*var(--vu)))
    footer.proof (flex:none; column; align center; gap: calc(52.3*var(--vu)))

NAV LEFT — brand
Link “Fastshot”, aria-label “Fastshot home”
Mark 34×34: circle #9C86CE r=17, circle #FFFFFF r=8.6, circle #151519 r=3.7
Wordmark: Inter, 18.49u, weight 500, letter-spacing -0.0154em, translateY(1u), opsz 32
text-shadow: 0 1u 10u rgba(0,0,0,.30)
gap 12u

NAV CENTER — absolutely centered
position:absolute; left:50%; transform:translateX(-50%);
top: calc((50.5 − 41)*var(--u));
gap 50u
Features · Examples · Pricing · Docs  (href="#")
21.69u, weight 400, Inter, letter-spacing -0.0115em, line-height 1.2, white
text-shadow: 0 1u 12u rgba(0,0,0,.32)
hover opacity .72, transition opacity .18s ease

NAV RIGHT — Get Started
140×43u, radius 12u, Inter 15.70u, weight 520, letter-spacing -0.0127em
align-self flex-start; margin-top: calc((42 − 41)*var(--u))
background: linear-gradient(180deg, #3d3d3f 0%, #1d1d20 100%)
box-shadow: inset 0 1u 0 rgba(255,255,255,.10), 0 2u 14u rgba(0,0,0,.28)
inner span translateY(2u)
hover filter:brightness(1.16); active translateY(1px)

HEADLINE
“Describe an app. We'll build it.”
Inter, 36.25u, weight 410, line-height 1.10, letter-spacing 0.0018em, white, opsz 32
text-shadow: 0 2u 22u rgba(0,0,0,.30)

COMPOSER CARD
<form class="card" onsubmit="return false">
708×143u, radius 26u, margin-right: 3u
background: rgba(41,41,43,.955)
backdrop-filter: blur(26u) saturate(112%)
box-shadow: inset 0 0 0 1px rgba(214,228,255,.14), 0 22u 60u rgba(0,0,0,.30)
position:relative  (required so .ph and .tools can be absolutely placed)

PLACEHOLDER (a <p>, not an input)
“Build a fintech tracking app with bank level privacy and...”
position:absolute
left: (452−425)=27u
top:  (446−413)=33u
right: 24u
color #8B8C8E, 9.97u, weight 400, line-height 1.35, letter-spacing 0.007em
white-space:nowrap; overflow:hidden

CHIPS (left side of the 30u toolbar)
.chips { display:flex; align-items:center; gap: 5.5u }
Each chip: height 30u, radius 9u, font 9.0u weight 500, color #909093, line-height 1
background: linear-gradient(180deg, rgba(255,255,255,.088) 0%, rgba(255,255,255,.050) 45%, rgba(255,255,255,.038) 100%)
border: 1px solid rgba(255,255,255,.05)
hover: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.07)); color #c8c8cb
label span translateY(2u)
Chip 1 “Attach Screens”  style="--cw:107;--pl:12;--ig:3.7"   icon width 15.06u
Chip 2 “Attach a Figma”  style="--cw:108;--pl:16;--ig:3.9"   icon width 11.8u
Chip 3 “Today's Theme”   style="--cw:107;--pl:15.8;--ig:2.9" icon width 12.13u
Icons are FILLED currentColor blob paths (not outline/stroke icons).

SEND STYLING
background: linear-gradient(163deg, #FBBC94 0%, #F49D70 46%, #E88654 100%)
box-shadow: 0 3u 12u rgba(210,110,60,.34)
white filled UP-arrow SVG, width 11.66u, flex-centered in the circle
aria-label “Build it”
hover brightness(1.07); active scale(.95)

FOOTER
“Built by Axes Lab (@zainaxes) from”
Inter, 14.01u, weight 480, letter-spacing 0.0065em, color rgba(255,255,255,.95), opsz 32
text-shadow: 0 1u 12u rgba(0,0,0,.35)
Three white wordmark SVGs, gap 62u, drop-shadow 0 1u 10u rgba(0,0,0,.30)
Google 96.84u · Cisco 67.29u · Adobe 88.68u
Filled currentColor wordmarks (white on the photo).

FOCUS
:focus-visible { outline: 2px solid #F8B285; outline-offset: 3px; border-radius: 4px; }
Reset: *,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }
button,input,textarea { font:inherit; color:inherit; background:none; border:0 }
img,svg { display:block }

MOBILE MENU
Burger 38×38, radius 11, background rgba(255,255,255,.10), border 1px solid rgba(255,255,255,.14), two-bar icon 17×12
CSS-only: hidden checkbox #menu + label.burger
.sheet: grid-template-rows 0fr → 1fr, 0.32s cubic-bezier(.4,0,.2,1)
Panel: rgba(24,24,27,.86), blur 20px, radius 16, border rgba(255,255,255,.09)
Links 15px; Get Started height 40, radius 11, font 15

RESPONSIVE — implement all three architectures

1) DESKTOP (default): unit-scaled 1560×1008 composition above. .burger and .sheet { display:none }. Absolute toolbar as specified.

2) TABLET: @media (min-width:600px) and (max-width:1180px) and (min-height:600px)
--u: 1px
Fluid DESKTOP, not phone. One-line headline. ONE-ROW toolbar (chips left, controls right).
.frame padding: clamp(24px,3.4vh,44px) clamp(28px,4.2vw,60px) clamp(26px,4.4vh,56px)
Nav stays horizontal with all four links + Get Started visible.
.h1: clamp(27px,4.3vw,44px); line-height 1.12
.card: width min(100%, clamp(516px,74vw,760px)); height:auto; margin-right:0
  padding clamp(15px,1.9vw,24px); radius clamp(17px,2.1vw,26px)
  display:flex; flex-direction:column; gap: clamp(20px,3.2vh,44px)
.ph: position:static; white-space:normal; clamp(11px,1.35vw,14px); line-height 1.4
.tools: position:static; height:auto; display:flex; flex-direction:row; flex-wrap:wrap; gap: clamp(10px,1.4vw,18px)
.chips: nowrap; gap clamp(6px,0.85vw,10px)
.chip: width:auto; height clamp(29px,3.4vh,34px); padding 0 clamp(7px,1vw,13px); font clamp(9.6px,1.12vw,12.5px)
.model: clamp(9.8px,1.12vw,12.5px)
Proof gap clamp(15px,2.5vh,30px)

3) COMPACT: @media (max-width:599px), (max-height:599px) and (max-width:1180px)
--u: 1px
padding:
  max(18px, env(safe-area-inset-top))
  max(clamp(18px,5.2vw,40px), env(safe-area-inset-right))
  max(20px, env(safe-area-inset-bottom))
  max(clamp(18px,5.2vw,40px), env(safe-area-inset-left));
Hide .links and header .cta. Show burger. Brand 30px mark.
.h1: width 100%; max-width:15ch; clamp(29px,7.6vw,50px); line-height 1.14; letter-spacing -.012em
.card: width 100%; max-width 600px; height auto; column; gap clamp(16px,4.6vh,34px); padding clamp(13px,3.4vw,18px)
.ph: nowrap ellipsis; clamp(9.4px,2.95vw,14px)
Extra short: @media (max-width:1180px) and (max-height:560px) { .hero gap 16px; .h1 clamp(24px,5.4vh,34px); .proof gap 10px; padding-top 10px }

ENTRANCE (once on first paint; never loops; not scroll-bound)
Head script: document.documentElement.classList.add('anim')
Only under prefers-reduced-motion: no-preference
--e-primary: cubic-bezier(.16,1,.3,1)
--e-soft:    cubic-bezier(.22,1,.36,1)
@keyframes:
  e-settle-down  opacity 0, translateY(-5u) → none
  e-settle-up    opacity 0, translateY(6u) → none
  e-mark         scale(.9) → none
  e-focus        opacity 0, translateY(14u), blur(6u) → none / blur 0   (headline only)
  e-panel        opacity 0, translateY(18u) scale(.985) → none
  e-populate     opacity 0, translateY(4u) → none
  e-send         scale(.82) → none
animation-fill: both
brand         e-settle-down  .58s soft     .06s
mark          e-mark         .62s primary  .06s
nav links     e-settle-down  .50s soft     .16s, stagger +0.05s (.16 .21 .26 .31)
Get Started   e-settle-down  .55s soft     .34s
headline      e-focus       1.00s primary  .30s
composer      e-panel        .90s primary  .62s
placeholder   e-populate     .50s soft     .88s
chip row      e-populate     .50s soft     .94s
.right        e-populate     .50s soft    1.00s
.send         e-send         .50s primary 1.00s
proof caption e-settle-up    .55s soft    1.08s
logos         e-settle-up    .55s soft    1.16s, stagger +0.06s (1.16 1.22 1.28)
will-change transform,opacity on .h1 and .card while animating
After last logo animationend OR 2600ms timeout: remove class "anim" from <html>
prefers-reduced-motion: reduce → animation/transition duration .01ms

INTERACTION
Chips / model / attach / send are presentational. Form does not submit. Links are "#".
No JS except the anim class + teardown. Mobile menu is the checkbox.

OUTPUT
One HTML file. Dark full-bleed hero. Match colors, radii, shadows, letter-spacing, and the three responsive architectures.
Do not add a second section below the fold.
Desktop composer: absolute toolbar. Right cluster is NOT a flex-centered group.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Fastshot — Describe an app. We'll build it.</title>
<meta name="description" content="Fastshot turns a written description into a working app.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=block" rel="stylesheet">
<style>
/* Standalone: Inter variable (Google Fonts) with opsz 14–32. Display roles pin "opsz" 32. */

/* ─────────────────────────────────────────────────────────────
   Reference frame: 1560 × 1008. 1 unit (--u) == 1 reference px.
   --u = min(viewport-width/1560, viewport-height/1008) so the
   composition scales proportionally and is never clipped, while
   the photograph behind it always covers the viewport edge to
   edge — no letterboxing at the top or bottom at any size.
   ───────────────────────────────────────────────────────────── */
:root{
  --u: min(0.06410256vw, 0.12400794vh);
  --vu: 0.09920635vh;

  /* Outer vertical insets. At the prototype's own size these are its measured values.
     Wider-than-reference screens get a tighter crop: the composition scales with width,
     so holding the prototype's inset proportion there leaves the header and the proof
     row floating too far off the edges. */
  --inset-top:41; --inset-bottom:106;

  /* families */
  --font-text:Inter,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --font-display:Inter,var(--font-text);
  --opsz-display:"opsz" 32;

  /* nav */
  --brand-x:225;   --brand-y:45;    --mark:34;   --brand-gap:12;  --brand-fs:18.49;
  /* nav link spacing — prototype measures 36.1; widened for breathing room */
  --links-y:50.5;  --links-gap:50;--links-fs:21.69;
  --cta-x:1195;    --cta-y:42;      --cta-w:140; --cta-h:43; --cta-r:12; --cta-fs:15.70; --cta-dy:2;
  /* hero */
  --hero-gap:51;
  --h1-y:323;      --h1-fs:36.25;    --display-ls:0.0018em;
  --nav-ls:-0.0115em; --brand-ls:-0.0154em; --cta-ls:-0.0127em; --body-ls:0.007em;
  --label-ls:normal; --model-ls:normal; --proof-ls:0.0065em;
  /* Weight scale — only weights that physically exist in the loaded font. */
  --w-regular:400; --w-display-wght:410; --w-medium:500; --w-semibold:600;

  /* role -> scale step */
  --w-display:var(--w-display-wght);  --w-nav:400;
  --w-brand:500;    --w-cta:520;
  --w-body:var(--w-regular);    --w-label:var(--w-medium);
  --w-model:var(--w-regular);   --w-proof:480;
  --card-x:425;    --card-y:413;    --card-w:708;--card-h:143;--card-r:26;
  --ph-x:452;      --ph-y:446;      --ph-fs:9.97;
  --chips-x:444;   --chips-y:505;   --chip-h:30; --chip-r:9;  --chip-fs:9.0; --chip-gap:5.5;
  --son-fs:10.4;    --son-top:15.5;  --chev-gap:6.2;
  --chev-x:1013.5; --chev-y:522.3;
  --att-x:1043.2;  --att-y:515.1;
  --send-x:1084;   --send-y:507;    --send-d:35;
  /* footer */
  --by-y:799;      --by-fs:14.01;
  --logo-y:867;    --logo-gap:62;
}
@supports (height:100dvh){ :root{ --u: min(0.06410256vw, 0.12400794dvh); --vu: 0.09920635dvh } }
/* beyond the reference width the frame is scaled up by Axes Lab (@zainaxes), so pull the chrome in */
@media (min-width:1561px){ :root{ --inset-top:27; --inset-bottom:74 } }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  background:#0a0d12;
  color:#fff;
  font-family:Inter,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-synthesis:none;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision;
  overflow:hidden;
}
img,svg{display:block}
button,input,textarea{font:inherit;color:inherit;background:none;border:0}
:focus-visible{outline:2px solid #F8B285;outline-offset:3px;border-radius:4px}

.stage{
  position:fixed;inset:0;overflow:hidden;
  background:#0a0d12;
}
.stage-video{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;z-index:0;
}
.frame{
  position:absolute;inset:0;z-index:1;
  display:flex;flex-direction:column;
  padding:calc(var(--inset-top)*var(--vu)) calc(225*var(--u)) calc(var(--inset-bottom)*var(--vu));
}
.nav{
  position:relative;flex:none;
  height:calc(43*var(--u));
  display:flex;align-items:center;justify-content:space-between;
}
.hero{
  flex:1 1 auto;min-height:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:calc(var(--hero-gap)*var(--vu));padding-bottom:calc(4*var(--vu));
}
.proof{
  flex:none;
  display:flex;flex-direction:column;align-items:center;
  gap:calc(52.3*var(--vu));
}

/* ── nav ─────────────────────────────────────────────── */
.brand{
  align-self:flex-start;margin-top:calc(4*var(--u));
  height:calc(var(--mark)*var(--u));
  display:flex;align-items:center;gap:calc(var(--brand-gap)*var(--u));
  text-decoration:none;color:#fff;
}
.mark{width:calc(var(--mark)*var(--u));height:calc(var(--mark)*var(--u));flex:none}
.brand span{
  transform:translateY(calc(1*var(--u)));
  font-size:calc(var(--brand-fs)*var(--u));font-weight:var(--w-brand);line-height:1;
  
  text-shadow:0 calc(1*var(--u)) calc(10*var(--u)) rgba(0,0,0,.30);
  letter-spacing:var(--brand-ls);
  font-family:var(--font-display);
  font-variation-settings:var(--opsz-display);
}
.links{
  position:absolute;left:50%;transform:translateX(-50%);
  top:calc((var(--links-y) - 41)*var(--u));
  display:flex;align-items:flex-start;gap:calc(var(--links-gap)*var(--u));
}
.links a{
  font-size:calc(var(--links-fs)*var(--u));font-weight:var(--w-nav);line-height:1.2;
  color:#fff;text-decoration:none;white-space:nowrap;
  text-shadow:0 calc(1*var(--u)) calc(12*var(--u)) rgba(0,0,0,.32);
  transition:opacity .18s ease;
  letter-spacing:var(--nav-ls);
  font-family:var(--font-display);
  font-variation-settings:var(--opsz-display);
}
.links a:hover{opacity:.72}
.cta{
  align-self:flex-start;margin-top:calc((var(--cta-y) - 41)*var(--u));
  width:calc(var(--cta-w)*var(--u));height:calc(var(--cta-h)*var(--u));
  border-radius:calc(var(--cta-r)*var(--u));
  display:flex;align-items:center;justify-content:center;
  font-size:calc(var(--cta-fs)*var(--u));font-weight:var(--w-cta);line-height:1;
  color:#fff;text-decoration:none;white-space:nowrap;
  background:linear-gradient(180deg,#3d3d3f 0%,#1d1d20 100%);
  box-shadow:inset 0 calc(1*var(--u)) 0 rgba(255,255,255,.10),
             0 calc(2*var(--u)) calc(14*var(--u)) rgba(0,0,0,.28);
  transition:filter .18s ease,transform .18s ease;
  letter-spacing:var(--cta-ls);
  font-family:var(--font-display);
  font-variation-settings:var(--opsz-display);
}
.cta span{display:block;transform:translateY(calc(var(--cta-dy)*var(--u)))}
.cta:hover{filter:brightness(1.16)}
.cta:active{transform:translateY(1px)}

/* ── headline ────────────────────────────────────────── */
.h1{
  font-family:var(--font-display);
  text-align:center;
  font-size:calc(var(--h1-fs)*var(--u));font-weight:var(--w-display);line-height:1.10;
  letter-spacing:var(--display-ls);
  color:#fff;
  text-shadow:0 calc(2*var(--u)) calc(22*var(--u)) rgba(0,0,0,.30);
  font-variation-settings:var(--opsz-display);
}

/* ── prompt card ─────────────────────────────────────── */
.card{
  position:relative;flex:none;margin-right:calc(3*var(--u));
  width:calc(var(--card-w)*var(--u));height:calc(var(--card-h)*var(--u));
  border-radius:calc(var(--card-r)*var(--u));
  background:rgba(41,41,43,.955);
  -webkit-backdrop-filter:blur(calc(26*var(--u))) saturate(112%);
  backdrop-filter:blur(calc(26*var(--u))) saturate(112%);
  box-shadow:inset 0 0 0 1px rgba(214,228,255,.14),
             0 calc(22*var(--u)) calc(60*var(--u)) rgba(0,0,0,.30);
}
.ph{
  position:absolute;left:calc((var(--ph-x) - var(--card-x))*var(--u));
  top:calc((var(--ph-y) - var(--card-y))*var(--u));
  right:calc(24*var(--u));
  font-size:calc(var(--ph-fs)*var(--u));font-weight:var(--w-body);line-height:1.35;
  color:#8B8C8E;white-space:nowrap;overflow:hidden;
  letter-spacing:var(--body-ls);
}
.ph .caret{display:none}
.tools{
  position:absolute;left:calc((var(--chips-x) - var(--card-x))*var(--u));
  right:calc((var(--card-x) + var(--card-w) - 1134)*var(--u));
  top:calc((var(--chips-y) - var(--card-y))*var(--u));
  height:calc(var(--chip-h)*var(--u));
  display:flex;align-items:center;justify-content:space-between;
}
.chips{display:flex;align-items:center;gap:calc(var(--chip-gap)*var(--u))}
.chip{
  display:inline-flex;align-items:center;
  height:calc(var(--chip-h)*var(--u));
  padding-left:calc(var(--pl)*var(--u));width:calc(var(--cw)*var(--u));
  gap:calc(var(--ig)*var(--u));
  border-radius:calc(var(--chip-r)*var(--u));
  background:linear-gradient(180deg,rgba(255,255,255,.088) 0%,rgba(255,255,255,.050) 45%,rgba(255,255,255,.038) 100%);
  border:1px solid rgba(255,255,255,.05);
  color:#909093;white-space:nowrap;cursor:pointer;
  font-size:calc(var(--chip-fs)*var(--u));font-weight:var(--w-label);line-height:1;
  transition:background .18s ease,color .18s ease;
  letter-spacing:var(--label-ls);
}
.chip:hover{background:linear-gradient(180deg,rgba(255,255,255,.14),rgba(255,255,255,.07));color:#c8c8cb}
.chip .ic{flex:none;height:auto}
.chip span{transform:translateY(calc(2*var(--u)))}
.ic-chip1{width:calc(15.06*var(--u))}
.ic-chip2{width:calc(11.8*var(--u))}
.ic-chip3{width:calc(12.13*var(--u))}
.right{position:absolute;inset:0;pointer-events:none}
.right > *{position:absolute;pointer-events:auto}
.model{
  left:calc((955 - 444 - 0.8)*var(--u));top:calc(var(--son-top)*var(--u));
  display:inline-flex;align-items:center;gap:calc(var(--chev-gap)*var(--u));
  font-size:calc(var(--son-fs)*var(--u));font-weight:var(--w-model);line-height:1;
  color:#98999C;cursor:pointer;white-space:nowrap;
  transition:color .18s ease;
  letter-spacing:var(--model-ls);
}
.model:hover{color:#d0d1d4}
.ic-chevron{width:calc(6.8*var(--u))}
.attach{
  left:calc((1043.15 - 444)*var(--u));top:calc((515.14 - 505)*var(--u));
  color:#A9AAAD;cursor:pointer;
  transition:color .18s ease;
}
.attach:hover{color:#fff}
.ic-attach{width:calc(19.79*var(--u))}
.send{
  left:calc((var(--send-x) - 444)*var(--u));top:calc((var(--send-y) - var(--chips-y))*var(--u));
  width:calc(var(--send-d)*var(--u));height:calc(var(--send-d)*var(--u));
  border-radius:50%;flex:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(163deg,#FBBC94 0%,#F49D70 46%,#E88654 100%);
  box-shadow:0 calc(3*var(--u)) calc(12*var(--u)) rgba(210,110,60,.34);
  color:#fff;
  transition:filter .18s ease,transform .18s ease;
}
.send:hover{filter:brightness(1.07)}
.send:active{transform:scale(.95)}
.ic-arrow{width:calc(11.66*var(--u))}

/* ── proof ───────────────────────────────────────────── */
.by{
  text-align:center;
  font-size:calc(var(--by-fs)*var(--u));font-weight:var(--w-proof);line-height:1.2;
  color:rgba(255,255,255,.95);
  text-shadow:0 calc(1*var(--u)) calc(12*var(--u)) rgba(0,0,0,.35);
  letter-spacing:var(--proof-ls);
  font-family:var(--font-display);
  font-variation-settings:var(--opsz-display);
}
.logos{
  display:flex;align-items:center;justify-content:center;
  gap:calc(var(--logo-gap)*var(--u));color:#fff;
}
.logos svg{height:auto;filter:drop-shadow(0 calc(1*var(--u)) calc(10*var(--u)) rgba(0,0,0,.30))}
.ic-google{width:calc(96.84*var(--u))}
.ic-cisco{width:calc(67.29*var(--u))}
.ic-adobe{width:calc(88.68*var(--u))}

/* mobile-only chrome, hidden on the reference layout */
.burger{display:none}
.sheet{display:none}

/* ─────────────────────────────────────────────────────────────
   Fluid layout for narrow / portrait viewports. The frame stops
   scaling as one block and reflows instead, still filling the
   full viewport height with no dead space.
   ───────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════════
   TABLET
   Desktop scales the whole 1560x1008 composition by Axes Lab (@zainaxes), which holds while --u
   stays near 1. Measured, the composer's micro-labels (9u) and body (10u) fall
   under 8px/9px once --u drops past ~0.88, and at 1024x768 they reach 5.9px and
   6.5px. That is where the desktop model stops being legible -- not where it
   stops fitting. The lowest common laptop is 1280 wide, so desktop is left
   untouched and tablet space is picked up at 1180 (exactly iPad Air landscape)
   and below, gated on height so phone-landscape stays compact.

   Architecture: tablets get a FLUID version of the DESKTOP composition, not the
   phone's. Same vertical order, same one-line headline, same single-row composer
   toolbar with chips left and controls right. Only the fixed 1560 grid is traded
   for fluid sizing, so it reads as the same design at a smaller scale rather
   than as a widened mobile layout.
   ═══════════════════════════════════════════════════════════════════════════ */
@media (min-width:600px) and (max-width:1180px) and (min-height:600px){
  :root{ --u:1px }

  .frame{
    position:absolute;inset:0;transform:none;width:100%;height:100%;
    display:flex;flex-direction:column;
    padding:clamp(24px,3.4vh,44px) clamp(28px,4.2vw,60px) clamp(26px,4.4vh,56px);
  }

  /* the nav still fits its desktop composition at this size, so it keeps it */
  .nav{
    position:relative;flex:none;height:auto;
    display:flex;align-items:center;justify-content:space-between;
    gap:clamp(14px,2.2vw,30px);
  }
  .brand{align-self:auto;margin-top:0;height:auto;gap:clamp(9px,1.1vw,13px)}
  .mark{width:clamp(27px,3.1vw,36px);height:clamp(27px,3.1vw,36px)}
  .brand span{transform:none;font-size:clamp(15.5px,1.8vw,19.3px)}
  .links{position:static;transform:none;top:auto;display:flex;gap:clamp(18px,3.2vw,50px)}
  .links a{font-size:clamp(14px,1.8vw,21.69px)}
  .cta{
    align-self:auto;margin-top:0;width:auto;height:auto;
    padding:clamp(8px,1vh,12px) clamp(15px,1.9vw,26px);
    border-radius:clamp(9px,1.1vw,12px);
    font-size:clamp(12.5px,1.45vw,15.7px);
  }
  .cta span{transform:none}
  .burger,.sheet{display:none}

  .hero{
    flex:1 1 auto;min-height:0;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:clamp(26px,4.2vh,52px);padding-bottom:0;
  }
  .h1{
    width:auto;text-align:center;
    font-size:clamp(27px,4.3vw,44px);line-height:1.12;
  }

  .card{
    position:relative;flex:none;margin-right:0;
    width:min(100%,clamp(516px,74vw,760px));height:auto;
    padding:clamp(15px,1.9vw,24px);
    border-radius:clamp(17px,2.1vw,26px);
    display:flex;flex-direction:column;gap:clamp(20px,3.2vh,44px);
  }
  .ph{
    position:static;right:auto;white-space:normal;
    font-size:clamp(11px,1.35vw,14px);line-height:1.4;
  }
  /* single-row toolbar preserved — it is the composer's desktop identity */
  .tools{
    position:static;height:auto;
    display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;
    gap:clamp(10px,1.4vw,18px);
  }
  .chips{display:flex;flex-wrap:nowrap;gap:clamp(6px,0.85vw,10px);min-width:0}
  .chip{
    width:auto;flex:0 0 auto;
    height:clamp(29px,3.4vh,34px);
    padding:0 clamp(7px,1vw,13px);gap:clamp(4px,0.6vw,6px);
    border-radius:clamp(8px,0.95vw,10px);
    font-size:clamp(9.6px,1.12vw,12.5px);
  }
  .chip span{transform:none}
  .chip .ic{width:clamp(10.5px,1.3vw,15px)}
  .right{
    position:static;pointer-events:auto;margin-left:auto;
    display:flex;align-items:center;justify-content:flex-end;gap:0;
  }
  .right > *{position:static}
  .model{font-size:clamp(9.8px,1.12vw,12.5px);gap:clamp(5px,0.65vw,7px)}
  .ic-chevron{width:clamp(6.5px,0.78vw,9px)}
  .attach{margin-left:clamp(9px,1.4vw,20px)}
  .ic-attach{width:clamp(15px,1.85vw,21px)}
  .send{
    margin-left:clamp(9px,1.3vw,18px);
    width:clamp(32px,3.5vw,38px);height:clamp(32px,3.5vw,38px);
  }
  .ic-arrow{width:clamp(9.5px,1.15vw,13px)}

  .proof{
    flex:none;padding-top:0;
    display:flex;flex-direction:column;align-items:center;
    gap:clamp(15px,2.5vh,30px);
  }
  .by{width:auto;font-size:clamp(11px,1.3vw,14.5px)}
  .logos{width:auto;gap:clamp(32px,5vw,68px)}
  .ic-google{width:clamp(64px,7.8vw,100px)}
  .ic-cisco{width:clamp(45px,5.5vw,70px)}
  .ic-adobe{width:clamp(58px,7vw,90px)}
}

/* Compact — phones, and any window too short to seat the tablet composition. */
@media (max-width:599px), (max-height:599px) and (max-width:1180px){
  :root{ --u:1px }
  .frame{
    left:0;top:0;transform:none;width:100%;height:100%;
    display:flex;flex-direction:column;
    padding:max(18px,env(safe-area-inset-top))
            max(clamp(18px,5.2vw,40px),env(safe-area-inset-right))
            max(20px,env(safe-area-inset-bottom))
            max(clamp(18px,5.2vw,40px),env(safe-area-inset-left));
  }
  .brand,.cta{align-self:auto;margin-top:0}
  .links{position:static;transform:none}
  .card{position:relative}
  .nav{height:auto}
  .hero{padding-bottom:0}

  .brand{height:auto;gap:11px}
  .mark{width:30px;height:30px}
  .brand span{font-size:clamp(17px,4.6vw,20px);transform:none}
  .cta span{transform:none}

  .nav{display:flex;align-items:center;gap:10px;flex:none}
  .brand{margin-right:auto}
  .links{display:none}
  .nav .cta{display:none}
  .burger{
    display:flex;width:38px;height:38px;border-radius:11px;
    align-items:center;justify-content:center;cursor:pointer;
    background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.14);
  }
  .burger svg{width:17px;height:12px;color:#fff}

  .hero{
    flex:1 1 auto;min-height:0;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:clamp(20px,4.4vh,40px);
  }
  .h1{
    width:100%;max-width:15ch;
    font-size:clamp(29px,7.6vw,50px);line-height:1.14;letter-spacing:-.012em;
    text-shadow:0 2px 22px rgba(0,0,0,.34);
  }
  .card{
    width:100%;max-width:600px;height:auto;margin-right:0;
    padding:clamp(13px,3.4vw,18px);
    border-radius:clamp(18px,4.6vw,26px);
    display:flex;flex-direction:column;gap:clamp(16px,4.6vh,34px);
    -webkit-backdrop-filter:blur(26px) saturate(112%);
    backdrop-filter:blur(26px) saturate(112%);
  }
  .ph{
    position:static;right:auto;
    font-size:clamp(9.4px,2.95vw,14px);line-height:1.4;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  .tools{
    position:static;height:auto;
    flex-direction:column;align-items:stretch;gap:12px;
  }
  .chips{
    flex-wrap:wrap;align-content:flex-start;
    gap:clamp(3.5px,1vw,8px);
    row-gap:clamp(6px,1.6vw,8px);
  }
  .chip{
    height:clamp(34px,8.4vw,38px);flex:0 0 auto;
    padding:0 clamp(5px,1.6vw,13px);
    gap:clamp(2.8px,0.9vw,6px);
    border-radius:clamp(8px,2.6vw,10px);
    font-size:clamp(7.6px,2.44vw,12.5px);
  }
  .chip span{transform:none}
  .chip .ic{width:clamp(8.5px,2.6vw,14px)}
  .right{position:static;display:flex;align-items:center;justify-content:flex-start;gap:0;pointer-events:auto}
  .right > *{position:static}
  .attach{margin-left:auto}
  .chip{width:auto}
  .model{font-size:clamp(11.5px,3.2vw,12.5px);gap:7px}
  .ic-chevron{width:8px}
  .ic-attach{width:20px}
  .send{margin-left:14px;width:40px;height:40px}
  .ic-arrow{width:10px}

  .proof{
    flex:none;display:flex;flex-direction:column;align-items:center;
    gap:clamp(14px,2.6vh,24px);padding-top:clamp(16px,3vh,28px);
  }
  .by{width:auto;font-size:clamp(12.5px,3.4vw,14.5px)}
  .logos{width:auto;gap:clamp(30px,8vw,62px)}
  .ic-google{width:clamp(64px,17vw,96px)}
  .ic-cisco{width:clamp(45px,12vw,67px)}
  .ic-adobe{width:clamp(58px,15.5vw,88px)}

  .sheet{
    position:absolute;z-index:40;
    top:calc(max(18px,env(safe-area-inset-top)) + 38px);
    left:max(clamp(18px,5.2vw,40px),env(safe-area-inset-left));
    right:max(clamp(18px,5.2vw,40px),env(safe-area-inset-right));
    display:grid;grid-template-rows:0fr;
    transition:grid-template-rows .32s cubic-bezier(.4,0,.2,1);
  }
  .sheet > div{overflow:hidden}
  .sheet nav{
    display:flex;flex-direction:column;gap:2px;
    margin-top:12px;padding:8px;
    border-radius:16px;
    background:rgba(24,24,27,.86);
    -webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,.09);
  }
  .sheet a{
    padding:11px 14px;border-radius:11px;
    color:#fff;text-decoration:none;font-size:15px;
  }
  .sheet a:hover{background:rgba(255,255,255,.07)}
  .sheet .cta{
    width:auto;height:40px;margin-top:6px;padding:0 18px;border-radius:11px;
    font-size:15px;justify-content:center;
  }
  .sheet .cta span{transform:none}
  #menu:checked ~ .sheet{grid-template-rows:1fr}
}
@media (max-width:1180px) and (max-height:560px){
  .hero{gap:16px}
  .h1{font-size:clamp(24px,5.4vh,34px)}
  .proof{gap:10px;padding-top:10px}
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENTRANCE — one sequence, once, on first paint. Nothing loops, nothing is
   scroll-bound, nothing survives completion.

   DIRECTION
   The photograph is a still dawn landscape. It is the stage and never moves.
   The interface settles onto it. Motion is derived from where a thing lives:
   chrome anchored to an edge arrives from that edge; content that sits over
   the water rises out of it; the headline pulls into focus like a lens
   finding its subject, which is the one gesture that belongs to a photograph.

   VOCABULARY  (four behaviours, no more)
     A  focus-rise   headline only    — rise + defocus->focus
     B  settle       edge chrome      — short travel from its own edge
     C  panel-lift   the composer     — rises as one object, micro scale
     D  populate     panel contents   — opacity-led, minimal travel

   TIMELINE (s)         start   dur
     brand group        0.06    0.58   B  (mark scales inside the group)
     nav links          0.16    0.50   B  stagger 0.05
     Get Started        0.34    0.55   B
     headline           0.30    1.00   A  overlaps the nav, takes the eye
     composer panel     0.62    0.90   C  arrives after the promise is read
     placeholder        0.88    0.50   D
     chip row           0.94    0.50   D
     controls + send    1.00    0.50   D  send adds a scale settle
     proof caption      1.08    0.55   B  from the bottom edge
     partner logos      1.16    0.55   B  stagger 0.06
   complete            ~1.83
   ═══════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: no-preference){
  :root{
    --e-primary:cubic-bezier(.16,1,.3,1);
    --e-soft:cubic-bezier(.22,1,.36,1);
  }
  @keyframes e-settle-down{ from{opacity:0;transform:translateY(calc(-5*var(--u)))} to{opacity:1;transform:none} }
  @keyframes e-settle-up  { from{opacity:0;transform:translateY(calc(6*var(--u)))}  to{opacity:1;transform:none} }
  @keyframes e-mark       { from{transform:scale(.9)}  to{transform:none} }
  @keyframes e-focus      { from{opacity:0;transform:translateY(calc(14*var(--u)));filter:blur(calc(6*var(--u)))}
                            to  {opacity:1;transform:none;filter:blur(0)} }
  @keyframes e-panel      { from{opacity:0;transform:translateY(calc(18*var(--u))) scale(.985)} to{opacity:1;transform:none} }
  @keyframes e-populate   { from{opacity:0;transform:translateY(calc(4*var(--u)))} to{opacity:1;transform:none} }
  @keyframes e-send       { from{transform:scale(.82)} to{transform:none} }

  html.anim .brand      { animation:e-settle-down .58s var(--e-soft)    .06s both }
  html.anim .mark       { animation:e-mark        .62s var(--e-primary) .06s both }
  html.anim .links a    { animation:e-settle-down .50s var(--e-soft)    .16s both }
  html.anim .links a:nth-child(2){ animation-delay:.21s }
  html.anim .links a:nth-child(3){ animation-delay:.26s }
  html.anim .links a:nth-child(4){ animation-delay:.31s }
  html.anim .cta        { animation:e-settle-down .55s var(--e-soft)    .34s both }
  html.anim .h1         { animation:e-focus      1.00s var(--e-primary) .30s both }
  html.anim .card       { animation:e-panel       .90s var(--e-primary) .62s both }
  html.anim .ph         { animation:e-populate    .50s var(--e-soft)    .88s both }
  html.anim .chips      { animation:e-populate    .50s var(--e-soft)    .94s both }
  html.anim .right      { animation:e-populate    .50s var(--e-soft)   1.00s both }
  html.anim .send       { animation:e-send        .50s var(--e-primary)1.00s both }
  html.anim .by         { animation:e-settle-up   .55s var(--e-soft)   1.08s both }
  html.anim .logos svg  { animation:e-settle-up   .55s var(--e-soft)   1.16s both }
  html.anim .logos svg:nth-of-type(2){ animation-delay:1.22s }
  html.anim .logos svg:nth-of-type(3){ animation-delay:1.28s }

  html.anim .h1, html.anim .card{ will-change:transform,opacity }
}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.01ms !important;animation-duration:.01ms !important}
}
</style>
<script>document.documentElement.classList.add('anim')</script>
</head>
<body>
<div class="stage">
  <video class="stage-video" src="https://axeslab.zainaxes.com/web/media/ext/3d16a1c80d75577d.mp4" autoplay muted loop playsinline></video>
  <div class="frame">

    <input type="checkbox" id="menu" hidden>

    <header class="nav">
      <a class="brand" href="#" aria-label="Fastshot home">
        <svg class="mark" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="17" cy="17" r="17" fill="#9C86CE"/>
          <circle cx="17" cy="17" r="8.6" fill="#FFFFFF"/>
          <circle cx="17" cy="17" r="3.7" fill="#151519"/>
        </svg>
        <span>Fastshot</span>
      </a>

      <nav class="links" aria-label="Primary">
        <a href="#">Features</a>
        <a href="#">Examples</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
      </nav>

      <label class="burger" for="menu" aria-label="Open menu">
        <svg viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect y="1" width="17" height="1.6" rx=".8" fill="currentColor"/>
          <rect y="8.4" width="17" height="1.6" rx=".8" fill="currentColor"/>
        </svg>
      </label>

      <a class="cta" href="#"><span>Get Started</span></a>
    </header>

    <div class="sheet"><div><nav aria-label="Mobile">
      <a href="#">Features</a><a href="#">Examples</a><a href="#">Pricing</a><a href="#">Docs</a>
      <a class="cta" href="#"><span>Get Started</span></a>
    </nav></div></div>

    <main class="hero">
      <h1 class="h1">Describe an app. We'll build it.</h1>

      <form class="card" onsubmit="return false">
        <p class="ph">Build a fintech tracking app with bank level privacy and...</p>

        <div class="tools">
          <div class="chips">
            <button type="button" class="chip" style="--cw:107;--pl:12;--ig:3.7"><svg class="ic ic-chip1" viewBox="2.61 10.43 15.059999999999999 10.590000000000002" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M15.17 20.67 L4.67 20.6 L3.67 20.29 L3.1 19.5 L2.97 18.0 L2.96 12.5 L3.43 11.33 L4.5 10.82 L7.0 10.86 L8.83 11.33 L9.34 12.5 L10.0 12.96 L11.33 13.15 L12.83 12.73 L13.54 14.67 L15.67 15.26 L17.13 16.83 L17.32 18.17 L17.0 19.63 L15.17 20.67 Z M13.17 12.4 L10.55 11.17 L11.83 10.78 L14.17 10.9 L14.35 11.67 L13.17 12.4 Z M5.31 13.83 L7.23 12.67 L7.33 11.99 L6.17 11.78 L4.89 12.17 L4.45 13.33 L5.31 13.83 Z M5.52 18.5 L6.58 17.0 L8.17 16.9 L9.67 17.5 L11.83 16.55 L12.97 15.67 L13.22 15.0 L9.0 13.79 L7.36 14.0 L4.87 15.83 L4.73 18.0 L5.52 18.5 Z M14.51 19.5 L15.94 18.17 L14.67 16.53 L11.25 18.67 L11.83 19.3 L14.51 19.5 Z" fill="currentColor"/></svg><span>Attach Screens</span></button>
            <button type="button" class="chip" style="--cw:108;--pl:16;--ig:3.9"><svg class="ic ic-chip2" viewBox="4.680000000000001 9.24 11.799999999999997 13.120000000000001" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M10.17 22.01 L7.93 21.5 L6.74 18.17 L5.03 16.33 L5.27 14.83 L6.7 13.83 L6.54 11.0 L7.33 10.05 L8.5 9.59 L10.67 9.98 L12.83 9.6 L14.83 9.8 L15.83 10.77 L16.13 11.67 L15.96 13.5 L14.31 14.67 L15.53 16.5 L15.42 17.67 L14.32 18.0 L13.06 15.5 L13.92 14.5 L13.33 13.95 L12.38 14.67 L12.51 16.17 L12.0 16.98 L10.87 16.67 L10.73 14.5 L10.0 14.07 L9.13 14.5 L8.84 16.5 L7.91 17.33 L7.83 19.5 L9.33 21.19 L10.67 20.75 L11.94 18.83 L13.33 18.78 L13.0 19.77 L10.17 22.01 Z M9.62 13.0 L10.59 12.33 L10.5 10.92 L8.17 11.0 L7.91 11.67 L8.19 12.5 L9.62 13.0 Z M13.57 13.17 L14.65 12.5 L14.8 12.0 L13.83 10.91 L12.83 10.88 L12.23 11.33 L12.12 12.33 L12.67 12.98 L13.57 13.17 Z M6.96 16.17 L7.59 15.0 L7.33 14.39 L6.97 14.5 L6.64 15.67 L6.64 16.17 L6.96 16.17 Z" fill="currentColor"/></svg><span>Attach a Figma</span></button>
            <button type="button" class="chip" style="--cw:107;--pl:15.8;--ig:2.9"><svg class="ic ic-chip3" viewBox="3.42 9.8 12.129999999999999 10.789999999999997" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M14.0 20.24 L12.48 19.83 L12.5 18.0 L11.33 17.98 L8.5 18.91 L6.12 17.67 L3.77 13.67 L3.85 12.67 L4.77 11.0 L6.5 10.27 L11.67 10.15 L14.24 11.0 L15.1 12.33 L15.2 14.5 L14.9 15.83 L13.51 17.67 L14.6 19.33 L14.0 20.24 Z M9.37 17.5 L10.72 16.17 L7.24 14.67 L7.09 13.67 L7.83 13.31 L11.17 14.05 L11.54 14.5 L10.85 16.0 L12.17 16.25 L12.83 15.67 L13.54 13.67 L13.57 12.67 L13.03 12.0 L11.5 11.38 L9.17 11.68 L7.5 11.44 L5.69 12.33 L5.63 13.67 L6.98 16.33 L8.5 17.37 L9.37 17.5 Z" fill="currentColor"/></svg><span>Today's Theme</span></button>
          </div>

          <div class="right">
            <button type="button" class="model">Sonnet 4.5 <svg class="ic ic-chevron" viewBox="3.48 5.3100000000000005 6.8 4.2299999999999995" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M7.67 9.19 L6.3 9.0 L3.83 6.67 L3.83 5.66 L4.83 5.68 L7.33 7.71 L9.17 6.02 L9.93 6.0 L9.9 7.0 L7.67 9.19 Z" fill="currentColor"/></svg></button>
            <button type="button" class="attach" aria-label="Attach a file"><svg class="ic ic-attach" viewBox="4.15 4.140000000000001 19.79 20.400000000000002" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M19.5 14.2 L18.33 14.21 L17.83 13.83 L18.62 12.17 L18.44 10.0 L16.17 10.07 L15.56 9.33 L16.0 8.74 L18.23 8.17 L18.43 5.17 L19.17 4.49 L20.1 5.17 L20.5 7.88 L23.0 8.76 L23.59 9.67 L23.35 10.33 L22.83 10.54 L21.17 9.82 L20.38 10.0 L20.23 13.5 L19.5 14.2 Z M20.5 24.19 L8.33 24.17 L6.17 23.05 L5.0 21.67 L4.5 19.67 L4.58 8.83 L5.0 7.5 L6.5 5.94 L8.0 5.48 L12.83 5.53 L13.67 5.68 L14.04 6.17 L13.33 6.9 L7.67 6.96 L6.08 8.33 L6.0 20.0 L6.72 21.5 L9.33 22.89 L20.48 22.67 L21.47 21.17 L21.51 15.83 L21.12 14.33 L22.33 13.95 L23.08 15.0 L22.99 21.67 L22.18 23.17 L20.5 24.19 Z M10.67 21.04 L9.67 20.88 L9.58 20.17 L12.33 17.03 L14.17 15.96 L16.84 15.33 L16.83 15.97 L13.17 18.3 L10.67 21.04 Z" fill="currentColor"/></svg></button>
            <button type="submit" class="send" aria-label="Build it"><svg class="ic ic-arrow" viewBox="8.41 8.24 11.659999999999998 14.8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M14.67 22.69 L14.04 22.5 L13.79 21.83 L13.17 12.34 L12.33 12.35 L10.17 14.33 L9.17 14.28 L8.76 13.5 L13.5 8.88 L14.33 8.59 L19.25 13.0 L19.72 14.0 L19.33 14.62 L18.5 14.63 L16.5 12.79 L15.43 12.67 L15.18 21.67 L14.67 22.69 Z" fill="currentColor"/></svg></button>
          </div>
        </div>
      </form>
    </main>

    <footer class="proof">
      <p class="by">Built by Axes Lab (@zainaxes) from</p>
      <div class="logos">
        <svg class="ic ic-google" viewBox="3.78 8.530000000000001 96.84 32.08" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M18.25 33.02 L13.25 32.81 L9.0 30.74 L5.75 27.35 L4.13 22.5 L4.14 18.75 L5.93 14.25 L9.06 11.0 L13.75 8.88 L19.0 9.0 L23.38 11.0 L24.12 12.25 L22.25 14.12 L19.75 12.73 L14.75 12.14 L12.25 12.88 L9.75 14.76 L7.83 18.25 L7.48 21.75 L8.0 24.22 L10.54 27.75 L12.25 28.91 L16.25 29.78 L20.5 28.88 L22.41 27.5 L23.72 25.5 L24.0 23.27 L16.75 22.81 L16.16 21.25 L16.75 19.86 L26.5 19.82 L27.66 20.75 L27.34 25.25 L25.56 28.75 L22.15 31.75 L18.25 33.02 Z M83.5 32.79 L81.5 32.65 L81.01 31.5 L81.12 10.5 L81.5 9.78 L82.5 9.56 L84.0 9.82 L84.41 10.75 L84.59 31.5 L83.5 32.79 Z M38.75 33.04 L35.0 33.01 L32.34 31.75 L30.0 29.26 L29.0 26.75 L29.08 23.75 L30.04 21.25 L32.04 19.0 L35.75 17.32 L37.75 17.28 L40.75 18.13 L43.5 20.58 L44.76 23.0 L44.77 27.0 L43.74 29.5 L41.5 31.84 L38.75 33.04 Z M55.75 33.01 L52.5 32.89 L49.89 31.75 L47.21 28.75 L46.43 26.25 L46.99 22.25 L48.18 20.25 L50.87 18.0 L53.5 17.21 L56.25 17.27 L59.5 18.92 L61.75 21.71 L62.29 23.5 L62.06 27.75 L61.0 29.8 L59.0 31.78 L55.75 33.01 Z M71.75 40.26 L69.25 39.96 L67.0 38.83 L65.07 36.75 L64.94 35.5 L67.25 34.26 L69.75 36.78 L73.0 36.95 L74.92 35.5 L75.6 32.5 L74.75 32.04 L73.0 32.94 L70.25 32.92 L67.25 31.66 L64.29 28.0 L64.3 22.5 L65.77 20.0 L68.75 17.73 L72.0 17.21 L75.0 18.54 L76.5 17.67 L78.0 17.6 L78.92 19.0 L78.56 35.0 L77.75 36.97 L76.0 38.88 L74.0 39.95 L71.75 40.26 Z M94.75 33.02 L91.75 32.84 L89.64 31.75 L87.37 29.5 L86.36 27.0 L86.42 23.0 L87.36 21.0 L90.5 18.06 L93.0 17.27 L97.0 18.15 L100.27 22.5 L99.75 23.63 L90.72 27.75 L90.87 28.75 L93.0 30.05 L95.5 29.84 L97.75 28.08 L100.0 29.38 L99.95 30.5 L98.5 31.75 L94.75 33.02 Z M38.71 29.75 L40.94 27.75 L41.63 25.75 L41.6 23.75 L39.63 21.0 L36.25 20.31 L34.5 21.1 L33.01 22.75 L32.72 26.75 L33.75 28.51 L35.25 29.68 L38.71 29.75 Z M91.1 24.5 L96.0 22.5 L96.09 21.25 L93.75 20.12 L91.75 20.95 L89.73 23.75 L90.0 24.62 L91.1 24.5 Z M54.94 30.0 L57.93 28.5 L58.98 26.75 L59.09 24.5 L57.23 21.25 L54.0 20.31 L52.25 20.93 L51.0 22.1 L50.12 23.75 L50.01 25.75 L51.42 28.75 L53.0 29.78 L54.94 30.0 Z M72.55 30.0 L73.73 29.5 L75.31 27.75 L75.62 23.75 L73.75 21.15 L71.0 20.56 L69.5 21.13 L68.25 22.41 L67.5 26.25 L69.0 28.82 L70.75 29.91 L72.55 30.0 Z" fill="currentColor"/></svg>
        <svg class="ic ic-cisco" viewBox="5.0200000000000005 7.0 67.28999999999999 35.36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M23.75 24.86 L22.0 24.67 L21.48 23.0 L21.5 8.5 L21.77 7.75 L22.75 7.35 L24.24 7.75 L24.58 8.5 L24.54 23.75 L23.75 24.86 Z M54.75 25.09 L53.54 24.75 L53.17 23.75 L53.16 9.0 L53.5 7.87 L55.0 7.53 L56.05 8.5 L56.09 20.25 L55.84 24.0 L54.75 25.09 Z M16.0 22.27 L14.25 22.34 L13.56 21.25 L13.67 13.75 L14.75 12.66 L16.0 13.06 L16.52 14.25 L16.55 21.25 L16.0 22.27 Z M31.75 21.79 L30.25 21.79 L29.67 20.75 L29.64 13.5 L30.5 12.6 L31.75 12.91 L32.51 14.25 L32.4 20.75 L31.75 21.79 Z M62.75 22.06 L61.5 21.79 L61.08 20.75 L61.1 14.0 L61.53 13.0 L62.5 12.67 L63.75 13.19 L64.08 14.5 L63.92 21.0 L62.75 22.06 Z M47.75 21.77 L46.0 21.82 L45.27 21.0 L45.43 14.5 L46.75 12.92 L47.57 13.25 L48.09 14.5 L47.75 21.77 Z M70.75 22.33 L69.75 22.16 L69.16 21.0 L69.28 17.25 L70.5 16.44 L71.5 16.82 L71.96 17.75 L71.89 21.25 L70.75 22.33 Z M7.0 22.03 L5.75 21.81 L5.37 21.0 L5.43 17.5 L6.25 16.69 L7.75 16.95 L8.29 18.0 L8.28 21.25 L7.0 22.03 Z M39.5 22.05 L38.25 22.02 L37.39 21.0 L37.44 18.25 L38.5 16.89 L39.75 17.18 L40.27 18.25 L40.29 21.0 L39.5 22.05 Z M36.5 41.82 L32.5 41.83 L31.29 40.5 L32.0 39.13 L34.75 39.37 L35.92 38.75 L35.58 37.75 L33.25 36.88 L31.2 34.5 L32.0 31.63 L34.0 30.26 L37.5 30.32 L38.76 31.5 L38.0 33.02 L35.25 32.99 L34.43 33.75 L34.86 34.75 L37.67 35.5 L39.33 37.75 L38.58 40.5 L36.5 41.82 Z M50.5 41.84 L46.1 41.75 L44.49 40.75 L43.0 38.68 L42.7 36.25 L43.11 33.75 L44.25 32.17 L46.75 30.44 L50.25 30.18 L51.2 31.25 L51.0 33.01 L47.5 33.31 L46.13 34.5 L45.81 35.75 L46.0 37.54 L47.19 38.75 L50.96 39.25 L51.18 40.75 L50.5 41.84 Z M62.0 42.01 L58.83 42.0 L56.75 41.04 L54.46 37.75 L54.4 35.25 L55.25 33.0 L56.83 31.25 L58.75 30.35 L61.5 30.25 L63.5 31.16 L66.0 34.36 L65.83 38.5 L64.0 40.93 L62.0 42.01 Z M19.25 41.76 L16.25 41.84 L14.25 41.04 L12.77 39.5 L12.05 37.75 L11.99 35.5 L12.75 33.25 L14.75 31.19 L16.5 30.37 L19.25 30.33 L20.49 31.5 L20.21 33.25 L17.0 33.51 L15.75 34.38 L15.12 36.0 L15.52 37.75 L16.5 38.71 L20.28 39.0 L20.45 40.75 L19.25 41.76 Z M26.75 41.77 L25.0 41.77 L24.47 40.75 L24.56 31.5 L25.5 30.35 L27.0 30.67 L27.61 31.5 L27.61 40.75 L26.75 41.77 Z M61.3 39.0 L62.92 37.25 L63.08 35.0 L61.65 33.25 L59.75 33.11 L58.14 34.25 L57.49 36.5 L59.0 38.84 L61.3 39.0 Z" fill="currentColor"/></svg>
        <svg class="ic ic-adobe" viewBox="5.140000000000001 12.34 88.68 24.570000000000004" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ><path d="M36.25 36.27 L31.0 35.97 L27.79 33.75 L26.2 31.0 L26.05 26.5 L27.25 23.5 L29.75 20.99 L31.89 20.0 L36.32 19.5 L36.75 13.18 L37.5 12.69 L40.25 12.69 L41.03 13.75 L41.15 34.75 L40.25 35.92 L36.25 36.27 Z M69.75 36.29 L62.75 36.03 L61.92 35.25 L61.91 13.75 L62.5 12.77 L66.0 13.0 L66.49 19.75 L70.25 19.61 L72.5 20.2 L75.0 22.23 L76.78 25.5 L76.81 29.75 L75.77 32.5 L73.5 34.87 L69.75 36.29 Z M24.5 36.08 L20.75 35.95 L19.08 31.5 L17.75 30.77 L12.0 30.79 L11.18 31.5 L9.53 36.0 L6.25 36.22 L5.49 35.75 L12.18 15.25 L13.0 14.34 L16.75 14.15 L18.16 15.0 L25.09 35.25 L24.5 36.08 Z M17.03 27.0 L17.47 26.0 L15.75 20.16 L15.0 19.5 L12.68 26.5 L13.5 27.16 L17.03 27.0 Z M52.5 36.51 L48.5 36.06 L46.52 34.75 L44.77 32.5 L43.78 28.75 L43.93 25.5 L45.67 22.25 L48.5 20.12 L51.25 19.52 L54.25 19.86 L56.5 21.23 L58.75 24.0 L59.61 26.75 L59.47 30.0 L58.51 32.75 L55.34 35.75 L52.5 36.51 Z M89.0 36.52 L86.0 36.56 L82.8 35.75 L80.5 33.69 L79.25 31.41 L78.86 28.0 L79.41 24.75 L81.25 21.86 L84.0 19.93 L87.0 19.59 L89.5 19.98 L92.0 21.98 L93.1 23.75 L93.47 28.0 L92.95 29.0 L84.0 29.05 L83.2 29.5 L83.5 30.93 L85.75 32.89 L92.2 32.75 L92.58 34.25 L92.18 35.75 L89.0 36.52 Z M89.12 26.0 L89.55 25.25 L89.02 24.0 L87.0 22.75 L85.23 23.0 L83.3 25.25 L84.0 26.18 L89.12 26.0 Z M35.82 33.0 L36.68 31.75 L36.67 24.0 L36.25 23.08 L35.0 22.89 L32.25 23.94 L31.02 25.25 L30.27 29.0 L30.75 30.85 L32.25 32.4 L33.5 32.97 L35.82 33.0 Z M52.46 33.0 L54.64 31.0 L55.18 27.0 L54.22 24.25 L52.75 23.09 L51.5 22.92 L48.9 24.75 L48.14 27.0 L48.11 29.25 L48.83 31.5 L49.97 32.75 L52.46 33.0 Z M68.41 33.0 L70.0 32.57 L71.75 31.04 L72.66 27.0 L71.25 24.03 L69.75 23.08 L67.5 22.91 L66.18 24.0 L66.16 32.25 L66.75 32.98 L68.41 33.0 Z" fill="currentColor"/></svg>
      </div>
    </footer>

  </div>
</div>

<script>
/* Tear the entrance down the moment it finishes: removing the class drops every
   animation declaration, so the page is left in its authored static state with
   no compositor layers, no running animations and nothing able to replay. */
(function(){
  var root = document.documentElement;
  if (!root.classList.contains('anim')) return;
  var settled = false;
  function settle(){
    if (settled) return;
    settled = true;
    clearTimeout(guard);
    root.classList.remove('anim');
  }
  var guard = setTimeout(settle, 2600);            // fires even in a background tab
  var last = document.querySelector('.logos svg:last-of-type');
  if (last) last.addEventListener('animationend', settle, {once:true});
})();
</script>
</body>
</html>
