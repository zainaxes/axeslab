---
id: "res_axes_northstar"
slug: "northstar"
title: "Northstar"
category: "Agency"
categorySlug: "agency"
source: "Axes Lab Curated"
tier: "free"
---

# Northstar

Build a single-file standalone HTML page (index.html) that recreates this Nexeus landing page PIXEL-EXACTLY. Do not invent extra sections, nav bars, extra CTAs, or restyle anything. One full-viewport cinematic page: looping background video + left-aligned hero + glass footer. No frameworks. No build step. Inline CSS and JS only.

==================================================
EXACT MEDIA (must use these URLs, no substitutes)
==================================================
Background video (CloudFront):
https://meez.design/web/media/ext/45790b279ed922a2.mp4

Poster (CloudFront WebP, shown before/while video loads):
https://meez.design/web/media/ext/ec27534816f88643.webp

Video attributes: autoplay muted loop playsinline
aria-label: "Painted alpine panorama: a lone hiker with a pink backpack faces a snow-capped peak above a sea of clouds"
Video filter: saturate(0.86)
Fallback page background: #1d8fb8 (sky-blue, matches the painting)

==================================================
FONTS
==================================================
@font-face Instrument Serif (400) — display / headline
@font-face Plus Jakarta Sans (weight range 200–800) — body
Fallbacks: Georgia serif for display; system-ui sans-serif for body.
If local woff2 files are unavailable, load:
- Instrument Serif 400 from Google Fonts
- Plus Jakarta Sans 400 and 500 from Google Fonts
-webkit-font-smoothing: antialiased

Type tokens:
--font-display: 'Instrument Serif', Georgia, serif
--font-body: 'Plus Jakarta Sans', system-ui, sans-serif
--fw-regular: 400   (nav links, column headings, wordmark, CTA label)
--fw-medium: 450    (eyebrow, lede, footer tagline, legal) — if the font has no 450, use 500
--text-primary: #fff
--text-heading: rgba(255,255,255,.86)
--text-muted: rgba(255,255,255,.68)
--text-invert: #000

==================================================
COPY (verbatim)
==================================================
<title>Nexeus — Build your future now</title>
Eyebrow: Ready when you are
H1: Build your future now
Lede: From branding and websites to marketing and growth systems, everything you need to move forward starts right here.
CTA: Take Control  (href="#")
Footer wordmark: Nexeus
Footer tagline: Change your future today using marketing and growth systems everything you need starts here.
Column SOLUTIONS:
  Revenue Acceleration
  Search Visibility
  Conversion Optimization
  Customer Automation
Column CAPABILITIES:
  Web Architecture
  Brand Systems
  Growth Marketing
  E-commerce Infrastructure
Column RESOURCES:
  Case Studies
  Growth Insights
  Playbooks
  Industry Reports
Legal: ® 2025 Nexeus all rights reserved.
Socials (href="#"): LinkedIn, GitHub, Medium — with matching SVG icons and aria-labels.

==================================================
LAYOUT SYSTEM (desktop / landscape)
==================================================
html, body: height 100%; overflow hidden; background #1d8fb8
Design frame: 1600 × 780
Unit: --u: min(calc(100vw / 1600), calc(100vh / 780), 1.6px)
Frame width: --fw: calc(1600 * var(--u))

.viewport: position fixed; inset 0; overflow hidden

BACKGROUND VIDEO:
.bg: absolute inset 0; overflow hidden; background #1d8fb8
video: position absolute; right 0; bottom calc(-45 * var(--u));
width calc(1668 * var(--u)); height calc(1037 * var(--u));
min-width 100%; min-height calc(100% + 45 * var(--u));
object-fit cover; object-position right bottom

.scrim: absolute left/right/top 0; height 0 by default; pointer-events none
Aspect-ratio scrims (only these):
- min-aspect-ratio 17/10: height 450u, gradient rgba(4,20,32) .48 → .25 → 0
- min-aspect-ratio 19/10: height 470u, .58 → .31 → 0
- min-aspect-ratio 21/10: video object-position right 76%; height 480u, .56 → .30 → 0
- min-aspect-ratio 5/4 AND max-aspect-ratio 31/20: height 410u, .26 → .13 → 0

.stage: absolute; left 50%; top 0; width var(--fw); height 100%; translateX(-50%); pointer-events none
.stage > * pointer-events auto
.abs: position absolute

HERO (absolute positions in --u units):
.eyebrow: left 46.6u, top 128.2u, font-size 15.0u, weight medium, line-height 1, letter-spacing 0.2163u, color white, uppercase, nowrap
.headline-mask: left 46.0u, top 163.0u
.headline: Instrument Serif, weight 400, font-size 71.2u, line-height 1, letter-spacing 0.5696u, white, nowrap
.lede: left 46.4u, top 245.2u, width 432u, font-size 17.0u, weight medium, line-height 22.9u, letter-spacing -0.15232u, white
.cta: left 46.8u, top 335.0u, width 157.0u, height 40.6u, border-radius 4.2u, background #fff, display block, no underline
.cta:hover: background #eef2f3; translateY(-1.5u); box-shadow 0 8u 22u rgba(0,0,0,.20)
.cta span: absolute left 32.0u, top 13.8u, font-size 15.8u, weight 400, line-height 1, letter-spacing 0.057828u, color #000, nowrap
CTA transition: background/transform/box-shadow .25s ease

==================================================
FOOTER (glass pane, desktop)
==================================================
.footer: absolute left/right/bottom 0; height 342u
backdrop-filter: blur(50u) saturate(0.85)
background (THREE stacked gradients):
1) linear-gradient(90deg, rgba(255,255,255,0.022) 0, rgba(255,255,255,0.072) 20u, rgba(255,255,255,0) 58u)
2) linear-gradient(270deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.05) 20u, rgba(255,255,255,0) 58u)
3) linear-gradient(180deg, rgba(34,14,0,0.28) 0%, rgba(70,34,0,0.24) 52%, rgba(160,120,48,0.6) 100%)
--hair: max(1px, 1u)
inset box-shadow hairlines: white 0.145 left, 0.125 right, 0.17 bottom, 0.03 top
overflow hidden

.finner: absolute left 50%; top 0; translateX(-50%); width var(--fw); height 100%

LOGO MARK (white 8-spoke starburst / asterisk, viewBox 0 0 100 100):
left 26.6u, top 36.2u, size 25.4u × 25.4u
Exact SVG paths (fill #fff):
M 45.13 1.28 L 54.87 1.28 L 54.87 42.42 L 45.13 38.09 Z
M 79.47 12.10 L 87.90 20.53 L 58.80 49.62 L 53.45 38.13 Z
M 98.72 45.13 L 98.72 54.87 L 57.58 54.87 L 61.91 45.13 Z
M 87.90 79.47 L 79.47 87.90 L 50.38 58.80 L 61.87 53.45 Z
M 54.87 98.72 L 45.13 98.72 L 45.13 57.58 L 54.87 61.91 Z
M 20.53 87.90 L 12.10 79.47 L 41.20 50.38 L 46.55 61.87 Z
M 1.28 54.87 L 1.28 45.13 L 42.42 45.13 L 38.09 54.87 Z
M 12.10 20.53 L 20.53 12.10 L 49.62 41.20 L 38.13 46.55 Z

.wordmark: left 62.8u, top 36.0u, font-size 23.4u, weight 400, letter-spacing 0.2808u, white, nowrap
.tagline: left 26.6u, top 73.0u, width 274u, font-size 13.5u, weight medium, line-height 17.4u, letter-spacing -0.18576u, muted white

Columns top 37.0u:
.c1 left 938.4u  .c2 left 1185.0u  .c3 left 1450.6u
h3: 15.84u, weight 400, letter-spacing 0.183744u, color text-heading, nowrap
ul: absolute top 31.0u, no list-style
li line-height 25.27u nowrap
a: 15.55u, weight 400, letter-spacing -0.07775u, white, no underline; hover opacity .6 (transition .2s)

.rule: left 26.6u, width 1546.8u, top 207.5u, height max(1px,1u), background rgba(255,255,255,.42)
.legal: left 26.6u, top 271.2u, font-size 14.0u, weight medium, letter-spacing -0.30422u, muted, nowrap
.socials: left 1375.8u, top 264.4u, flex, gap 47.1u
.socials a: 30u × 30u, color #fff, hover opacity .68
Icons: LinkedIn viewBox 0 0 30 30; GitHub viewBox 0 0 24 24; Medium viewBox 0 0 1043.63 592.71 — use the standard filled-white path icons matching those viewBoxes (LinkedIn square+in, GitHub octocat, Medium three circles).

==================================================
RESPONSIVE — portrait / narrow (max-aspect-ratio: 5/4)
==================================================
--u: calc(100vw / 780)
--pad: clamp(20px, 5.6vw, 56px)
Switch from absolute artboard to stacked flex column.
.viewport: flex column; min-height 100dvh
.stage: relative, width 100%, flex column
.bg video: left 0 right 0 bottom 0; width 100%; height 106%; object-fit cover; object-position 80% bottom
.scrim: fixed; height min(56vh, 560u); gradient rgba(6,22,34) .42 → .26 → 0
.abs becomes static
Hero: left/right padding --pad
eyebrow: margin-top clamp(28px,7vh,72px); font-size clamp(10.5px,2.9vw,15px); letter-spacing .09em; still uppercase
headline: wrap allowed; font-size clamp(34px,9.4vw,72px); line-height 1.04
lede: max-width 38ch; font-size clamp(14.5px,3.9vw,18px); line-height 1.42
cta: inline-flex centered; width auto; min-width clamp(140px,40vw,190px); height clamp(42px,6vh,52px); padding 0 clamp(20px,6vw,34px); radius 4px; span static
Footer: relative; height auto; margin-top auto; padding clamp(22px,3.4vh,40px) --pad clamp(20px,3vh,34px)
footer bg: linear-gradient(180deg, rgba(14,9,4,.58), rgba(26,16,5,.60) 55%, rgba(52,36,12,.66)); blur 28px saturate .9
.brandrow: flex align center; gap clamp(9px,2.6vw,14px)
.nav: 3-column grid; gap clamp(14px,3.4vw,30px)
.footrow: flex space-between wrap
Type uses the clamp() sizes listed in the source (do not improvise)

MOBILE architecture @ max-aspect-ratio 5/4 AND max-width 648px:
html/body overflow visible (so legal/socials are not clipped on short phones)
hero headline: clamp(32px,10.2vw,56px); max-width 15ch; text-wrap balance
lede max-width 34ch
.nav: 2-column grid; .c3 (RESOURCES) grid-column 1 / -1; .c3 ul columns: 2
.col a: inline-block; padding-block clamp(9px,1.1vh,11px) for tap targets
.footrow: nowrap, legal nowrap, socials flex-none
@ max-width 380px: legal wraps; footrow wraps
@ max-height 620px: tighter eyebrow margin-top

==================================================
ENTRANCE ANIMATION (first load only)
==================================================
Head script BEFORE paint:
If prefers-reduced-motion is NOT reduce, add class js-enter on <html>.
If JS fails, never add the class — content must render fully visible.

While html.js-enter:
eyebrow, lede, cta, mark, wordmark, tagline, .col, legal, .socials a { opacity: 0 }
.headline-mask { clip-path: inset(-45% -8% -6px -3%) }
.headline { transform: translate3d(0,118%,0) }
.rule { transform: scaleX(0); transform-origin left center }
prefers-reduced-motion: show everything immediately; disable transitions globally.

Body script: Web Animations API, run once (dataset.entered).
Easings:
EXPO   = cubic-bezier(.16,1,.3,1)
SOFT   = cubic-bezier(.22,.65,.28,1)
SETTLE = cubic-bezier(.33,1,.68,1)
On max-width 648px: travel scale d=0.62, tempo t=0.85; else d=1, t=1

Timeline (delay * t, duration in ms, Y travel * d):
eyebrow:  rise 12px, 560ms, delay 60, SOFT
headline: 118% → 0, 950ms, delay 170, EXPO
lede:     rise 14px, 660ms, delay 430, SOFT
cta:      opacity 0 + Y12 + scale(.985) → none, 580ms, delay 620, SETTLE
mark + wordmark: rise 10px, 540ms, delay 600, SOFT
tagline:  rise 10px, 540ms, delay 670, SOFT
each .col: rise 14px, 580ms, delay 720 + i*70, SOFT
.rule:    scaleX 0→1, 720ms, delay 980, EXPO
legal:    rise 8px, 500ms, delay 1120, SOFT
each .socials a: rise 8px, 500ms, delay 1170 + i*60, SOFT

On complete: remove js-enter, cancel all animations so no residual transforms remain.
Do NOT animate the background video — it is the stage.

==================================================
HTML STRUCTURE (must match)
==================================================
.viewport
  .bg > video
  .scrim
  .stage
    p.eyebrow
    .headline-mask > h1.headline
    p.lede
    a.cta > span
  footer.footer > .finner
    .brandrow > svg.mark + span.wordmark
    p.tagline
    nav.nav > .col.c1 / .col.c2 / .col.c3
    .rule
    .footrow > p.legal + .socials

Viewport meta: width=device-width, initial-scale=1, viewport-fit=cover
lang=en

OUTPUT: one complete index.html with all CSS and JS inlined, matching this spec exactly.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Nexeus — Build your future now</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=block" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;background:#1d8fb8}
body{font-family:var(--font-body);-webkit-font-smoothing:antialiased}
:root{
  --font-display:'Instrument Serif',Georgia,serif;
  --font-body:'Plus Jakarta Sans',system-ui,sans-serif;
  --fw-regular:400;
  --fw-medium:450;
  --text-primary:#fff;
  --text-heading:rgba(255,255,255,.86);
  --text-muted:rgba(255,255,255,.68);
  --text-invert:#000;
  --u:min(calc(100vw / 1600), calc(100vh / 780), 1.6px);--fw:calc(1600 * var(--u))}
.viewport{position:fixed;inset:0;overflow:hidden}
.bg{position:absolute;inset:0;overflow:hidden;background:#1d8fb8}
.scrim{position:absolute;left:0;right:0;top:0;height:0;pointer-events:none}
.bg img,.bg video{position:absolute;right:0;bottom:calc(-45 * var(--u));
  width:calc(1668 * var(--u));height:calc(1037 * var(--u));
  min-width:100%;min-height:calc(100% + 45 * var(--u));
  object-fit:cover;object-position:right bottom;display:block;
  filter:saturate(0.86)}
.stage{position:absolute;left:50%;top:0;width:var(--fw);height:100%;transform:translateX(-50%);pointer-events:none}
.stage > *{pointer-events:auto}
.abs{position:absolute}

.eyebrow{left:calc(46.6 * var(--u));top:calc(128.2 * var(--u));font-size:calc(15.0 * var(--u));font-weight:var(--fw-medium);line-height:1;letter-spacing:calc(0.21630000000000002 * var(--u));color:var(--text-primary);text-transform:uppercase;white-space:nowrap}
.headline-mask{left:calc(46.0 * var(--u));top:calc(163.0 * var(--u))}
.headline{font-family:var(--font-display);font-weight:var(--fw-regular);font-size:calc(71.2 * var(--u));line-height:1;letter-spacing:calc(0.5696 * var(--u));color:var(--text-primary);white-space:nowrap}
.lede{left:calc(46.4 * var(--u));top:calc(245.2 * var(--u));width:calc(432 * var(--u));font-size:calc(17.0 * var(--u));font-weight:var(--fw-medium);line-height:calc(22.9 * var(--u));letter-spacing:calc(-0.15231999999999998 * var(--u));color:var(--text-primary)}
.cta{left:calc(46.8 * var(--u));top:calc(335.0 * var(--u));width:calc(157.0 * var(--u));height:calc(40.6 * var(--u));border-radius:calc(4.2 * var(--u));background:#fff;display:block;text-decoration:none;transition:background .25s ease,transform .25s ease,box-shadow .25s ease}
.cta:hover{background:#eef2f3;transform:translateY(calc(-1.5 * var(--u)));box-shadow:0 calc(8 * var(--u)) calc(22 * var(--u)) rgba(0,0,0,.20)}
.cta span{position:absolute;left:calc(32.0 * var(--u));top:calc(13.800000000000011 * var(--u));font-size:calc(15.8 * var(--u));font-weight:var(--fw-regular);line-height:1;letter-spacing:calc(0.057828000000000004 * var(--u));color:var(--text-invert);white-space:nowrap}

.footer{position:absolute;left:0;right:0;bottom:0;height:calc(342 * var(--u));
 -webkit-backdrop-filter:blur(calc(50 * var(--u))) saturate(0.85);backdrop-filter:blur(calc(50 * var(--u))) saturate(0.85);
 background:linear-gradient(90deg,rgba(255,255,255,0.022) 0,rgba(255,255,255,0.072) calc(20 * var(--u)),rgba(255,255,255,0) calc(58 * var(--u))),linear-gradient(270deg,rgba(255,255,255,0.02) 0,rgba(255,255,255,0.05) calc(20 * var(--u)),rgba(255,255,255,0) calc(58 * var(--u))),linear-gradient(180deg,rgba(34,14,0,0.28) 0%,rgba(70,34,0,0.24) 52%,rgba(160,120,48,0.6) 100%);overflow:hidden;
 --hair:max(1px, calc(1 * var(--u)));
 box-shadow:inset var(--hair) 0 0 rgba(255,255,255,0.145),
            inset calc(-1 * var(--hair)) 0 0 rgba(255,255,255,0.125),
            inset 0 calc(-1 * var(--hair)) 0 rgba(255,255,255,0.17),
            inset 0 var(--hair) 0 rgba(255,255,255,0.03)}
.finner{position:absolute;left:50%;top:0;transform:translateX(-50%);width:var(--fw);height:100%}
.mark{left:calc(26.6 * var(--u));top:calc(36.200000000000045 * var(--u));width:calc(25.4 * var(--u));height:calc(25.4 * var(--u));display:block}
.wordmark{left:calc(62.8 * var(--u));top:calc(36.0 * var(--u));font-size:calc(23.4 * var(--u));font-weight:var(--fw-regular);line-height:1;letter-spacing:calc(0.2808 * var(--u));color:var(--text-primary);white-space:nowrap}
.tagline{left:calc(26.6 * var(--u));top:calc(73.0 * var(--u));width:calc(274 * var(--u));font-size:calc(13.5 * var(--u));font-weight:var(--fw-medium);line-height:calc(17.4 * var(--u));letter-spacing:calc(-0.18576 * var(--u));color:var(--text-muted)}
.col{top:calc(37.0 * var(--u))}
.col h3{font-size:calc(15.84 * var(--u));font-weight:var(--fw-regular);line-height:1;letter-spacing:calc(0.183744 * var(--u));color:var(--text-heading);white-space:nowrap}
.col ul{position:absolute;top:calc(31.0 * var(--u));left:0;list-style:none}
.col li{line-height:calc(25.27 * var(--u));white-space:nowrap}
.col a{font-size:calc(15.55 * var(--u));font-weight:var(--fw-regular);letter-spacing:calc(-0.07775 * var(--u));color:var(--text-primary);text-decoration:none;transition:opacity .2s ease}
.col a:hover{opacity:.6}
.c1{left:calc(938.4 * var(--u))} .c2{left:calc(1185.0 * var(--u))} .c3{left:calc(1450.6 * var(--u))}
.rule{left:calc(26.6 * var(--u));width:calc(1546.8 * var(--u));top:calc(207.5 * var(--u));height:max(1px,calc(1 * var(--u)));background:rgba(255,255,255,.42)}
.legal{left:calc(26.6 * var(--u));top:calc(271.20000000000005 * var(--u));font-size:calc(14.0 * var(--u));font-weight:var(--fw-medium);line-height:1;letter-spacing:calc(-0.30422 * var(--u));color:var(--text-muted);white-space:nowrap}
.socials{left:calc(1375.8 * var(--u));top:calc(264.4 * var(--u));display:flex;gap:calc(47.1 * var(--u))}
.socials a{display:block;width:calc(30.0 * var(--u));height:calc(30.0 * var(--u));color:#fff;transition:opacity .2s ease}
.socials a:hover{opacity:.68}
.socials svg{width:100%;height:100%;display:block;fill:currentColor}

@media (min-aspect-ratio: 17/10){
  .scrim{height:calc(450 * var(--u));
    background:linear-gradient(180deg,rgba(4,20,32,.48) 0%,rgba(4,20,32,.25) 46%,rgba(4,20,32,0) 100%)}
}
@media (min-aspect-ratio: 19/10){
  .scrim{height:calc(470 * var(--u));
    background:linear-gradient(180deg,rgba(4,20,32,.58) 0%,rgba(4,20,32,.31) 48%,rgba(4,20,32,0) 100%)}
}
@media (min-aspect-ratio: 21/10){
  .bg img,.bg video{object-position:right 76%}
  .scrim{height:calc(480 * var(--u));
    background:linear-gradient(180deg,rgba(4,20,32,.56) 0%,rgba(4,20,32,.30) 48%,rgba(4,20,32,0) 100%)}
}
@media (min-aspect-ratio: 5/4) and (max-aspect-ratio: 31/20){
  .scrim{height:calc(410 * var(--u));
    background:linear-gradient(180deg,rgba(4,20,32,.26) 0%,rgba(4,20,32,.13) 45%,rgba(4,20,32,0) 100%)}
}

@media (max-aspect-ratio: 5/4){
  :root{--u:calc(100vw / 780);--pad:clamp(20px, 5.6vw, 56px)}
  .scrim{position:fixed;height:min(56vh,calc(560 * var(--u)));background:linear-gradient(180deg,rgba(6,22,34,.42) 0%,rgba(6,22,34,.26) 42%,rgba(6,22,34,0) 100%)}
  html,body{overflow:hidden}
  .viewport{display:flex;flex-direction:column;min-height:100dvh}
  .stage{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;pointer-events:auto}
  .finner{position:static;left:auto;transform:none;width:auto;height:auto}
  .bg{position:fixed;inset:0}
  .bg img,.bg video{position:absolute;top:auto;left:0;right:0;bottom:0;width:100%;height:106%;min-width:0;min-height:0;object-fit:cover;object-position:80% bottom}

  .abs{position:static}
  .eyebrow,.headline-mask,.lede,.cta{margin-left:var(--pad);margin-right:var(--pad)}
  .eyebrow{margin-top:clamp(28px,7vh,72px);font-size:clamp(10.5px,2.9vw,15px);letter-spacing:.09em}
  .headline-mask{margin-top:clamp(10px,1.6vh,18px)}
  .headline{white-space:normal;font-size:clamp(34px,9.4vw,72px);line-height:1.04;letter-spacing:0}
  .lede{width:auto;max-width:38ch;font-size:clamp(14.5px,3.9vw,18px);line-height:1.42;letter-spacing:-.006em;margin-top:clamp(12px,1.8vh,20px)}
  .cta{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;
        width:auto;min-width:clamp(140px,40vw,190px);height:clamp(42px,6vh,52px);
        padding:0 clamp(20px,6vw,34px);border-radius:4px;margin-top:clamp(16px,2.6vh,30px)}
  .cta span{position:static;font-size:clamp(14px,3.7vw,16px)}

  .footer{position:relative;top:auto;left:auto;right:auto;height:auto;margin-top:auto;
           padding:clamp(22px,3.4vh,40px) var(--pad) clamp(20px,3vh,34px);overflow:visible;
           background:linear-gradient(180deg,rgba(14,9,4,.58) 0%,rgba(26,16,5,.60) 55%,rgba(52,36,12,.66) 100%);
           -webkit-backdrop-filter:blur(28px) saturate(.9);backdrop-filter:blur(28px) saturate(.9)}
  .tagline{text-wrap:pretty}
  .brandrow{display:flex;align-items:center;gap:clamp(9px,2.6vw,14px)}
  .mark{width:clamp(20px,5.4vw,26px);height:clamp(20px,5.4vw,26px);flex:none}
  .wordmark{font-size:clamp(18px,5vw,24px);letter-spacing:0}
  .tagline{width:auto;max-width:42ch;font-size:clamp(11.5px,3.1vw,14px);line-height:1.32;margin-top:clamp(8px,1.4vh,14px)}
  .nav{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,3.4vw,30px);
        margin-top:clamp(18px,3vh,34px)}
  .col h3{font-size:clamp(10.5px,2.8vw,14px);letter-spacing:.03em;white-space:normal}
  .col ul{position:static;margin-top:clamp(9px,1.6vh,16px)}
  .col li{line-height:1.55;white-space:normal}
  .col a{font-size:clamp(11.5px,3vw,15px);letter-spacing:-.005em}
  .rule{width:auto;margin:clamp(16px,2.6vh,30px) 0 clamp(12px,2vh,22px)}
  .footrow{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .legal{font-size:clamp(11px,2.9vw,13.5px);letter-spacing:-.01em;white-space:normal}
  .socials{display:flex;gap:clamp(18px,5.4vw,40px)}
  .socials a{width:clamp(21px,5.6vw,28px);height:clamp(21px,5.6vw,28px)}
}
@media (max-aspect-ratio: 5/4) and (max-width: 648px){
  html,body{overflow:visible}
  body{min-height:100dvh}
  .viewport{position:relative;min-height:100dvh}
  .bg,.scrim{position:fixed}

  .stage{padding-bottom:clamp(16px,3.6vh,36px)}
  .eyebrow{margin-top:max(clamp(22px,5.6vh,52px),calc(env(safe-area-inset-top) + 14px))}
  .headline{font-size:clamp(32px,10.2vw,56px);line-height:1.07;max-width:15ch;text-wrap:balance}
  .lede{max-width:34ch;font-size:clamp(14.5px,4.1vw,17px);line-height:1.44;text-wrap:pretty}

  .nav{grid-template-columns:repeat(2,minmax(0,1fr));
        gap:clamp(15px,4.4vw,26px) clamp(14px,4vw,22px);margin-top:clamp(16px,2.6vh,30px)}
  .c3{grid-column:1 / -1}
  .c3 ul{columns:2;column-gap:clamp(14px,4vw,22px)}
  .c3 li{break-inside:avoid}

  .col li{line-height:1.26}
  .col a{display:inline-block;padding-block:clamp(9px,1.1vh,11px)}

  .footrow{flex-direction:row;align-items:center;justify-content:space-between;
            gap:clamp(12px,4vw,20px);flex-wrap:nowrap}
  .legal{white-space:nowrap}
  .socials{gap:clamp(16px,4.8vw,26px);flex:none}
  .rule{margin:clamp(14px,2.2vh,26px) 0 clamp(11px,1.8vh,20px)}
}
@media (max-aspect-ratio: 5/4) and (max-width: 380px){
  .legal{white-space:normal}
  .footrow{flex-wrap:wrap;gap:clamp(12px,3.4vw,16px)}
}
@media (max-aspect-ratio: 5/4) and (max-height:620px){
  .eyebrow{margin-top:clamp(14px,4vh,30px)}
}

html.js-enter .eyebrow,html.js-enter .lede,html.js-enter .cta,
html.js-enter .mark,html.js-enter .wordmark,html.js-enter .tagline,
html.js-enter .col,html.js-enter .legal,html.js-enter .socials a{opacity:0}
html.js-enter .headline-mask{clip-path:inset(-45% -8% -6px -3%)}
html.js-enter .headline{transform:translate3d(0,118%,0)}
html.js-enter .rule{transform:scaleX(0);transform-origin:left center}
html.js-enter .headline,html.js-enter .cta,
html.js-enter .lede,html.js-enter .col{will-change:transform,opacity}
@media (prefers-reduced-motion:reduce){
  html.js-enter .eyebrow,html.js-enter .lede,html.js-enter .cta,html.js-enter .mark,
  html.js-enter .wordmark,html.js-enter .tagline,html.js-enter .col,html.js-enter .legal,
  html.js-enter .socials a{opacity:1}
  html.js-enter .headline,html.js-enter .rule{transform:none}
  html.js-enter .headline-mask{clip-path:none}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<script>
(function(){try{
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    document.documentElement.classList.add('js-enter');
}catch(e){}})();
</script>
</head>
<body>
<div class="viewport">
  <div class="bg"><video src="https://meez.design/web/media/ext/45790b279ed922a2.mp4" poster="https://meez.design/web/media/ext/ec27534816f88643.webp" autoplay muted loop playsinline aria-label="Painted alpine panorama: a lone hiker with a pink backpack faces a snow-capped peak above a sea of clouds"></video></div>
  <div class="scrim"></div>
  <div class="stage">
    <p class="abs eyebrow">Ready when you are</p>
    <div class="abs headline-mask"><h1 class="headline">Build your future now</h1></div>
    <p class="abs lede">From branding and websites to marketing and growth systems, everything you need to move forward starts right here.</p>
    <a class="abs cta" href="#"><span>Take Control</span></a>
  </div>
  <footer class="footer"><div class="finner">
    <div class="brandrow">
      <svg class="abs mark" viewBox="0 0 100 100" aria-hidden="true"><g fill="#fff"><path d="M 45.13 1.28 L 54.87 1.28 L 54.87 42.42 L 45.13 38.09 Z"/><path d="M 79.47 12.10 L 87.90 20.53 L 58.80 49.62 L 53.45 38.13 Z"/><path d="M 98.72 45.13 L 98.72 54.87 L 57.58 54.87 L 61.91 45.13 Z"/><path d="M 87.90 79.47 L 79.47 87.90 L 50.38 58.80 L 61.87 53.45 Z"/><path d="M 54.87 98.72 L 45.13 98.72 L 45.13 57.58 L 54.87 61.91 Z"/><path d="M 20.53 87.90 L 12.10 79.47 L 41.20 50.38 L 46.55 61.87 Z"/><path d="M 1.28 54.87 L 1.28 45.13 L 42.42 45.13 L 38.09 54.87 Z"/><path d="M 12.10 20.53 L 20.53 12.10 L 49.62 41.20 L 38.13 46.55 Z"/></g></svg>
      <span class="abs wordmark">Nexeus</span>
    </div>
    <p class="abs tagline">Change your future today using marketing and growth systems everything you need starts here.</p>
    <nav class="nav">
      <div class="abs col c1"><h3>SOLUTIONS</h3><ul>
        <li><a href="#">Revenue Acceleration</a></li><li><a href="#">Search Visibility</a></li>
        <li><a href="#">Conversion Optimization</a></li><li><a href="#">Customer Automation</a></li></ul></div>
      <div class="abs col c2"><h3>CAPABILITIES</h3><ul>
        <li><a href="#">Web Architecture</a></li><li><a href="#">Brand Systems</a></li>
        <li><a href="#">Growth Marketing</a></li><li><a href="#">E-commerce Infrastructure</a></li></ul></div>
      <div class="abs col c3"><h3>RESOURCES</h3><ul>
        <li><a href="#">Case Studies</a></li><li><a href="#">Growth Insights</a></li>
        <li><a href="#">Playbooks</a></li><li><a href="#">Industry Reports</a></li></ul></div>
    </nav>
    <div class="abs rule"></div>
    <div class="footrow">
      <p class="abs legal">&#174; 2025 Nexeus all rights reserved.</p>
      <div class="abs socials">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 30 30"><path d="M25.2 0H4.8A4.8 4.8 0 0 0 0 4.8v20.4A4.8 4.8 0 0 0 4.8 30h20.4a4.8 4.8 0 0 0 4.8-4.8V4.8A4.8 4.8 0 0 0 25.2 0Zm0 25.2H4.8V4.8h20.4v20.4Z"/><path d="M10.05 12.3H7.5v9.45h2.55V12.3ZM8.77 11.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18.05 12.06c-1.28 0-2.13.5-2.62 1.18V12.3h-2.5v9.45h2.55v-5.06c0-1.19.6-1.87 1.63-1.87.97 0 1.45.64 1.45 1.87v5.06h2.55v-5.56c0-2.57-1.27-4.13-3.06-4.13Z"/></svg></a>
        <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3Z"/></svg></a>
        <a href="#" aria-label="Medium"><svg viewBox="0 0 1043.63 592.71"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 278.98-147.17 278.98s-147.17-124.92-147.17-278.98S683.1 17.38 764.39 17.38s147.17 124.92 147.17 278.98M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.93-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.94 51.76 249.94"/></svg></a>
      </div>
    </div>
  </div></footer>
</div>

<script>
(function(){
  var root = document.documentElement;
  if (!root.classList.contains('js-enter')) return;
  if (root.dataset.entered) return;
  root.dataset.entered = '1';

  var EXPO   = 'cubic-bezier(.16,1,.3,1)',
      SOFT   = 'cubic-bezier(.22,.65,.28,1)',
      SETTLE = 'cubic-bezier(.33,1,.68,1)';

  var small = window.matchMedia('(max-width:648px)').matches;
  var d = small ? 0.62 : 1,
      t = small ? 0.85 : 1;
  var anims = [];

  function Y(px){ return 'translate3d(0,' + (px * d).toFixed(2) + 'px,0)'; }
  function tw(el, frames, dur, delay, ease){
    if (!el) return;
    anims.push(el.animate(frames, {duration: dur, delay: delay * t, easing: ease, fill: 'both'}));
  }
  function each(sel, fn){ Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  var one = function(s){ return document.querySelector(s); };
  var rise = function(px){ return [{opacity:0, transform:Y(px)}, {opacity:1, transform:'none'}]; };

  tw(one('.eyebrow'),  rise(12), 560,  60, SOFT);
  tw(one('.headline'), [{transform:'translate3d(0,118%,0)'},{transform:'translate3d(0,0,0)'}],
                       950, 170, EXPO);
  tw(one('.lede'),     rise(14), 660, 430, SOFT);
  tw(one('.cta'),      [{opacity:0, transform:Y(12)+' scale(.985)'},
                        {opacity:1, transform:'none'}], 580, 620, SETTLE);

  tw(one('.mark'),     rise(10), 540, 600, SOFT);
  tw(one('.wordmark'), rise(10), 540, 600, SOFT);
  tw(one('.tagline'),  rise(10), 540, 670, SOFT);
  each('.col', function(el, i){ tw(el, rise(14), 580, 720 + i * 70, SOFT); });
  tw(one('.rule'),     [{transform:'scaleX(0)'},{transform:'scaleX(1)'}], 720, 980, EXPO);
  tw(one('.legal'),    rise(8), 500, 1120, SOFT);
  each('.socials a', function(el, i){ tw(el, rise(8), 500, 1170 + i * 60, SOFT); });

  var settled = false;
  function finish(){
    if (settled) return; settled = true;
    root.classList.remove('js-enter');
    for (var i = 0; i < anims.length; i++){ try { anims[i].cancel(); } catch (e) {} }
    anims.length = 0;
  }
  Promise.all(anims.map(function(a){ return a.finished; })).then(finish, finish);
})();
</script>
</body>
</html>
