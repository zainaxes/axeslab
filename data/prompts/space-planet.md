---
id: "res_meez_space_planet"
slug: "space-planet"
title: "Space planet"
category: "3D"
categorySlug: "3d"
routeCollection: "3d-websites"
videoUrl: ""
posterUrl: "/media/posters/space-planet.jpg"
chars: 61062
tier: "free"
likes: 57
---

Build a single, self-contained HTML file: a full-viewport space-themed hero section
for a site called "SpaceEdu". No build step, no frameworks, no external JS. All CSS in
one <style> block in <head>, all JS in one <script> block before </body>. It must be
pixel-faithful to the spec below and fully mobile responsive.

════════════════════════════════════════════════════════════════════════
1. CONCEPT
════════════════════════════════════════════════════════════════════════
A cinematic hero. A looping video of a single planet fills the whole viewport as the
background. Centred over it: eyebrow "PLANET", a huge serif planet name, a short cyan
rule, a paragraph, and a glossy white pill button. Flanking the button, cropped by the
left and right screen edges, sit two transparent planet cut-outs with serif labels.

Three planets exist: EARTH, VENUS, MARS. Exactly one is "featured" (its clip is the
background, its name is the headline). The other two occupy the left and right slots.
Clicking a side planet makes it featured; the two slots then re-fill with the other
two. Earth is featured on load. The rotation is fully reversible.

════════════════════════════════════════════════════════════════════════
2. ASSETS — use these exact URLs
════════════════════════════════════════════════════════════════════════
Background clips (10s, 16:9, 1276x720, silent, loop):
  EARTH https://meez.design/web/media/bg-videos/222_1-1.mp4
  VENUS https://meez.design/web/media/bg-videos/224_1niceimage.mp4
  MARS  https://meez.design/web/media/bg-videos/225_38.mp4

Poster / still for each clip (also used as the .sky background-image fallback):
  EARTH https://meez.design/web/bg-previews/201_95.jpg
  VENUS https://meez.design/web/bg-previews/128_Motion-Background-16.jpg
  MARS  https://meez.design/web/bg-previews/129_Motion-Background-17.jpg

Transparent planet cut-outs, 2048x2048 PNG with alpha (the side-slot artwork):
  EARTH https://meez.design/web/bg-previews/151_Motion-Background-031045.jpg
  VENUS https://meez.design/web/bg-previews/178_Thermal-Glow.jpg
  MARS  https://meez.design/web/bg-previews/162_Background-5.jpg

Favicon: use the Earth cut-out URL above, type image/png.

════════════════════════════════════════════════════════════════════════
3. FONTS — load from Google Fonts
════════════════════════════════════════════════════════════════════════
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
Load: Prata 400; Hanken Grotesk 400,500,600,700; Poppins 500,600.
Stacks:
  --font-serif : 'Prata', Georgia, serif
  --font-body  : 'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif
  --font-logo  : 'Poppins', sans-serif
Body text uses --font-body. Headline and the two planet labels use --font-serif.
The wordmark uses --font-logo.

════════════════════════════════════════════════════════════════════════
4. DESIGN SYSTEM — the single most important rule
════════════════════════════════════════════════════════════════════════
The layout is NOT built from rem/%/flex guesswork. It is a fixed composition measured
from a 1353 x 1163 reference, expressed in ONE custom property --u = one design pixel.
EVERY length in the file is calc(N * var(--u)). Do not substitute px values.

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }

:root{
  --dw:1353; --dh:1163; --gutter:25;
  --u:max(min(.72px, calc(100vh / 700)), min(calc(100vw / 1353), calc(100vh / 1163)));
  --dh-px:calc(1163 * var(--u));
  --vshift:calc(max(0px, (100vh - var(--dh-px))) * .42);
  --ink:#ffffff; --cyan:#79dce8; --cyan-logo:#5fd0e1;
  --rule:rgba(255,255,255,.23); --btn-ink:#071227;
}
@supports (height:100dvh){
  :root{
    --u:max(min(.72px, calc(100dvh / 700)), min(calc(100vw / 1353), calc(100dvh / 1163)));
    --vshift:calc(max(0px, (100dvh - var(--dh-px))) * .42);
  }
}
html,body{height:100%}
body{background:#04101f; color:var(--ink); font-family:var(--font-body);
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision; overflow:hidden}

--vshift pushes everything below the nav down on taller-than-design viewports so the
composition stays balanced. --gutter offsets the content column left by half its value
so the optical centre sits at x=664, not 676.

════════════════════════════════════════════════════════════════════════
5. MARKUP
════════════════════════════════════════════════════════════════════════
<div class="stage">                     position:fixed; inset:0; overflow:hidden;
                                        isolation:isolate
  <div class="sky">                     absolute; inset:0; z-index:0;
                                        background-image:url(EARTH STILL);
                                        background-size:cover; background-position:center;
                                        background-repeat:no-repeat
    3 x <video data-planet="earth|venus|mars">
        Earth:  class="is-active" autoplay muted loop playsinline preload="auto"
                src=EARTH CLIP  poster=EARTH STILL  aria-hidden="true"
        Venus & Mars: muted loop playsinline preload="none"
                data-src=CLIP (NOT src)  poster=STILL  aria-hidden="true"
  </div>
  <div class="ui">                      absolute; inset:0; z-index:3
    <header class="navbar">
      <div class="navrow">
        <a class="logo" href="#">space<i>edu</i></a>
        <nav class="links" id="site-nav">
          <a href="#" aria-current="page">Planets</a>
          <a href="#">Tution</a>            (keep this spelling)
          <a href="#">Tutorials</a>
          <a href="#">Blog</a>
          <a class="enroll" href="#">Enroll</a>
        </nav>
        <button class="burger" type="button" aria-label="Open navigation"
                aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="copy">
      <div class="col eyebrow"><span class="ent-mask"><span class="ent-line">PLANET</span></span></div>
      <h1 class="col title"><span class="ent-mask"><span class="ent-line">EARTH</span></span></h1>
      <div class="col rule"><span></span></div>
      <p class="col lede">Learn more about the fascinating details that we call our home,
         Planet Earth. Course enrollment <br>starts today. Early Bird tickets typically
         last a week, don&rsquo;t miss out!</p>
      <div class="col cta">
        <button class="planet planet-l" type="button" data-slot="l">
          3 x <img data-planet="earth|venus|mars" alt="" src="CUTOUT URL">
        </button>
        <button class="planet planet-r" type="button" data-slot="r">
          3 x <img data-planet="earth|venus|mars" alt="" src="CUTOUT URL">
        </button>
        <a href="#">GET STARTED</a>
        <span class="label label-l"></span>     (empty — filled by script)
        <span class="label label-r"></span>
      </div>
    </div>
  </div>
  <button class="scroll" type="button" aria-label="Scroll to next section">
    <svg viewBox="0 0 26 33" fill="none" aria-hidden="true">
      <path d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4" stroke="#ffffff"
            stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>
    </svg>
  </button>
</div>

CRITICAL: all three cut-outs are present in BOTH slots as sibling <img> tags. Switching
reveals one with a class — it must never reassign img.src, or the browser keeps painting
the old planet until the new 2048px file downloads.

════════════════════════════════════════════════════════════════════════
6. CSS — exact values
════════════════════════════════════════════════════════════════════════
BACKDROP
.sky video{position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  display:block; opacity:0; transition:opacity .22s linear}
.sky video.is-active{opacity:1}
@media (prefers-reduced-motion:reduce){ .sky video{display:none} }

SIDE PLANET SLOTS (two slots, not two planets)
.planet{position:absolute; z-index:-1; padding:0; border:0; background:none;
  -webkit-appearance:none; appearance:none; line-height:0; cursor:pointer;
  pointer-events:auto;                      /* .copy disables pointers wholesale */
  transition:transform .45s cubic-bezier(.22,1,.36,1)}
.planet img{display:none; width:100%; height:auto}
.planet img.is-shown{display:block}
.planet:hover{transform:scale(1.045)}
.planet:active{transform:scale(.99)}
.planet-l{width:calc(143 * var(--u)); left:calc(-69.5 * var(--u)); top:calc(-38.3 * var(--u))}
.planet-r{width:calc(143 * var(--u)); right:calc(-64.7 * var(--u)); top:calc(-40.6 * var(--u))}
@media (prefers-reduced-motion:reduce){
  .planet{transition:none} .planet:hover,.planet:active{transform:none} }
(The cut-outs fill ~97% of their square canvas; these box sizes make the rendered
 sphere 139u across with its centre 2u from the left edge / 6.8u from the right.)

LAYOUT
.copy{position:absolute; inset:0; transform:translateY(var(--vshift)); pointer-events:none}
.copy a{pointer-events:auto}
.col{position:absolute; left:0; right:calc(var(--gutter) * var(--u)); text-align:center}

NAV
.navbar{position:absolute; top:0; left:0; right:0; z-index:6; height:calc(88 * var(--u))}
.navbar::after{content:""; position:absolute; left:calc(25 * var(--u));
  right:calc(49 * var(--u)); top:calc(86 * var(--u)); height:calc(2 * var(--u));
  background:var(--rule)}
.navrow{position:absolute; left:calc(25 * var(--u)); right:calc(49 * var(--u)); top:0;
  height:calc(86 * var(--u)); display:flex; align-items:center; justify-content:space-between}
.logo{font-family:var(--font-logo); font-weight:600; font-size:calc(18.4 * var(--u));
  letter-spacing:calc(-0.15 * var(--u)); line-height:1; color:#fff; text-decoration:none;
  white-space:nowrap; position:relative; top:calc(-1 * var(--u))}
.logo i{font-style:normal; color:var(--cyan-logo)}
.burger{display:none; position:relative; width:calc(46 * var(--u)); height:calc(46 * var(--u));
  padding:0; border:0; background:none; cursor:pointer; flex-direction:column;
  align-items:center; justify-content:center; gap:calc(6 * var(--u)); flex:none}
.burger span{display:block; width:calc(24 * var(--u)); height:calc(2 * var(--u));
  border-radius:calc(2 * var(--u)); background:#fff;
  transition:transform .28s cubic-bezier(.4,0,.2,1), opacity .18s linear}
.navrow[data-open="true"] .burger span:nth-child(1){transform:translateY(calc(8 * var(--u))) rotate(45deg)}
.navrow[data-open="true"] .burger span:nth-child(2){opacity:0}
.navrow[data-open="true"] .burger span:nth-child(3){transform:translateY(calc(-8 * var(--u))) rotate(-45deg)}
.links{display:flex; align-items:center}
.links a{position:relative; display:flex; align-items:center; height:calc(86 * var(--u));
  font-size:calc(18.4 * var(--u)); font-weight:400; line-height:1; color:#fff;
  text-decoration:none; padding:0 calc(17.5 * var(--u));
  letter-spacing:calc(-1 * var(--u)); white-space:nowrap}
.links a[aria-current="page"]::after{content:""; position:absolute; left:0; right:0;
  top:calc(83.5 * var(--u)); height:calc(4 * var(--u)); background:var(--cyan);
  border-radius:calc(1 * var(--u))}
.links a:nth-child(3){letter-spacing:calc(-1.75 * var(--u))}
.links a:nth-child(2){margin-left:calc(24 * var(--u))}
.links a:nth-child(3){margin-left:calc(26 * var(--u))}
.links a:nth-child(4){margin-left:calc(27 * var(--u))}
.links a.enroll{margin-left:calc(28.5 * var(--u)); width:calc(107 * var(--u));
  height:calc(38 * var(--u)); border-radius:calc(19 * var(--u)); display:flex;
  align-items:center; justify-content:center; font-size:calc(17 * var(--u));
  font-weight:600; letter-spacing:calc(-0.75 * var(--u)); line-height:1;
  color:var(--btn-ink); text-decoration:none; padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d8ecfe 9%,#dceefe 72%,#f4f9ff 100%);
  box-shadow:0 calc(3 * var(--u)) calc(14 * var(--u)) rgba(255,255,255,.22),
             inset 0 0 0 calc(1.5 * var(--u)) rgba(255,255,255,.92);
  flex:none}

HERO COPY
.eyebrow{top:calc(188.8 * var(--u)); font-size:calc(30.45 * var(--u)); font-weight:500;
  line-height:1; letter-spacing:calc(4 * var(--u)); text-indent:calc(4 * var(--u)); color:#fff}
h1.title{top:calc(268 * var(--u)); font-family:var(--font-serif); font-weight:400;
  font-size:calc(112.4 * var(--u)); line-height:1; letter-spacing:calc(2 * var(--u));
  text-indent:calc(2 * var(--u)); color:#fff}
.rule{top:calc(405.5 * var(--u)); height:calc(5 * var(--u)); font-size:0; line-height:0;
  padding-right:calc(2 * var(--u))}
.rule span{display:inline-block; vertical-align:top; width:calc(100 * var(--u));
  height:100%; border-radius:calc(2.5 * var(--u)); background:var(--cyan)}
p.lede{top:calc(433.2 * var(--u)); font-size:calc(18.36 * var(--u)); font-weight:400;
  line-height:calc(30 * var(--u)); color:rgba(255,255,255,.95)}

CTA ROW
.cta{top:calc(597 * var(--u)); height:calc(66 * var(--u)); isolation:isolate}
.cta a{display:inline-flex; align-items:center; justify-content:center;
  width:calc(216 * var(--u)); height:calc(66 * var(--u)); border-radius:calc(33 * var(--u));
  font-size:calc(17 * var(--u)); font-weight:700; letter-spacing:0; text-indent:0;
  line-height:1; color:var(--btn-ink); text-decoration:none; padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d6e8f8 4%,#d9ecfe 72%,#ffffff 100%);
  box-shadow:0 calc(10 * var(--u)) calc(18 * var(--u)) calc(-8 * var(--u)) rgba(255,255,255,.50),
             0 0 calc(26 * var(--u)) rgba(255,255,255,.18),
             inset 0 0 0 calc(2 * var(--u)) rgba(255,255,255,.9)}
.label{position:absolute; top:calc(33 * var(--u)); font-family:var(--font-serif);
  font-weight:400; font-size:calc(17.8 * var(--u)); letter-spacing:calc(4.6 * var(--u));
  line-height:1; color:#fff; white-space:nowrap}
.label.label-l{left:calc(111 * var(--u))}
.label.label-r{right:calc(104 * var(--u))}

SCROLL CONTROL
.scroll{position:absolute; z-index:4; left:50%;
  margin-left:calc((-48 - (var(--gutter) / 2)) * var(--u)); bottom:calc(68 * var(--u));
  width:calc(96 * var(--u)); height:calc(96 * var(--u)); border-radius:50%;
  background:rgba(24,30,42,.70); -webkit-backdrop-filter:blur(calc(6 * var(--u)));
  backdrop-filter:blur(calc(6 * var(--u))); border:0; display:flex; align-items:center;
  justify-content:center; cursor:pointer}
.scroll svg{width:calc(20 * var(--u)); height:calc(25 * var(--u)); display:block}

FOCUS
.scroll:focus-visible,.links a:focus-visible,.enroll:focus-visible,
.cta a:focus-visible,.logo:focus-visible{
  outline:calc(2 * var(--u)) solid var(--cyan); outline-offset:calc(3 * var(--u))}
.planet:focus-visible{outline:calc(2 * var(--u)) solid var(--cyan);
  outline-offset:calc(6 * var(--u)); border-radius:50%}

════════════════════════════════════════════════════════════════════════
7. RESPONSIVE — six tiers, in this exact source order
════════════════════════════════════════════════════════════════════════
A) NAV COLLAPSE  @media (max-width:1030px), (max-height:620px)
Threshold is derived: below ~1030px the desktop labels fall under ~14px with sub-40px
touch targets. The SAME <a> elements re-compose into a panel — never duplicate markup.
  .navrow{left:calc(25 * var(--u)); right:calc(25 * var(--u))}
  .burger{display:flex}
  .links{position:absolute; top:calc(96 * var(--u)); right:0; z-index:5;
    width:min(calc(324 * var(--u)), calc(100vw - 50 * var(--u)));
    flex-direction:column; align-items:stretch; padding:calc(12 * var(--u));
    border-radius:calc(20 * var(--u)); background:rgba(9,21,42,.84);
    backdrop-filter:blur(calc(18 * var(--u)));
    border:calc(1 * var(--u)) solid rgba(255,255,255,.14);
    box-shadow:0 calc(18 * var(--u)) calc(44 * var(--u)) rgba(2,8,20,.55);
    opacity:0; visibility:hidden; transform:translateY(calc(-10 * var(--u)));
    transition:opacity .24s ease, transform .28s cubic-bezier(.4,0,.2,1), visibility .28s}
  .navrow[data-open="true"] .links{opacity:1; visibility:visible; transform:none}
  .links a:nth-child(n){margin-left:0; height:auto; justify-content:flex-start;
    padding:calc(14 * var(--u)) calc(16 * var(--u)); font-size:calc(19 * var(--u));
    letter-spacing:calc(-.6 * var(--u))}
  .links a + a{border-top:calc(1 * var(--u)) solid rgba(255,255,255,.08)}
  .links a[aria-current="page"]::after{top:auto; bottom:calc(9 * var(--u));
    left:calc(16 * var(--u)); right:auto; width:calc(26 * var(--u)); height:calc(3 * var(--u))}
  .links a.enroll{margin:calc(14 * var(--u)) 0 calc(2 * var(--u)); width:100%;
    height:calc(46 * var(--u)); border-radius:calc(23 * var(--u)); justify-content:center;
    padding-top:calc(2 * var(--u)); font-size:calc(18 * var(--u));
    letter-spacing:calc(-.4 * var(--u)); border-top:0}
  .links a.enroll::after{content:none}

B) TABLET  @media (min-width:580px) and (max-width:1030px) and (min-height:621px)
The hero is a centred symmetric composition — it is re-proportioned, NOT stacked. The
flanking planet / button / planet row is the section's signature and must survive.
  :root{--gutter:0;
    --u:min(max(min(.85px, calc(100vh / 780)), min(calc(100vw / 900), calc(100vh / 1163))), 1.15px);
    --dh-px:calc(1120 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .38)}
  (repeat inside @supports (height:100dvh) with 100dvh)
  .navbar::after{left:calc(25 * var(--u)); right:calc(25 * var(--u))}
  p.lede br{display:none}
  p.lede{max-width:calc(620 * var(--u)); margin-left:auto; margin-right:auto; text-wrap:pretty}
  .label.label-r{right:calc(116 * var(--u))}

C) PHONE  @media (max-width:579px), (max-height:620px)
Below the nav the interface FLOWS (flex column) instead of being absolutely pinned, so
it adapts to however many lines the copy wraps onto.
  :root{--gutter:0;
    --u:max(min(.92px, calc(100vh / 620)), min(calc(100vw / 430), calc(100vh / 880)));
    --dh-px:calc(880 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .34)}
  (repeat inside @supports (height:100dvh))
  .navbar{height:calc(76 * var(--u))}
  .navbar::after{left:calc(24 * var(--u)); right:calc(24 * var(--u)); top:calc(74 * var(--u))}
  .navrow{left:calc(24 * var(--u)); right:calc(24 * var(--u)); height:calc(74 * var(--u))}
  .links{top:calc(84 * var(--u))}
  .copy{top:calc(76 * var(--u)); display:flex; flex-direction:column; align-items:center;
    padding:calc(56 * var(--u)) calc(26 * var(--u)) 0}
  .col{position:static; width:100%; right:auto}
  .eyebrow{font-size:calc(20 * var(--u)); letter-spacing:calc(5 * var(--u)); text-indent:calc(5 * var(--u))}
  h1.title{font-size:calc(86 * var(--u)); margin-top:calc(15 * var(--u))}
  .rule{margin-top:calc(20 * var(--u)); height:calc(5 * var(--u)); padding-right:0}
  .rule span{width:calc(84 * var(--u))}
  p.lede{margin-top:calc(19 * var(--u)); font-size:calc(15.5 * var(--u));
    line-height:calc(26 * var(--u)); max-width:calc(400 * var(--u)); text-wrap:balance}
  p.lede br{display:none}
  .cta{top:auto; margin-top:calc(32 * var(--u)); height:calc(60 * var(--u)); position:relative}
  .cta a{width:calc(190 * var(--u)); height:calc(60 * var(--u)); border-radius:calc(30 * var(--u))}
  .label{top:50%; transform:translateY(-50%); font-size:calc(16 * var(--u));
    letter-spacing:calc(4 * var(--u))}
  .label.label-l{left:calc(56 * var(--u))}
  .label.label-r{right:calc(60 * var(--u))}
  .planet-l{width:calc(89 * var(--u)); left:calc(-44.5 * var(--u)); top:calc(-17 * var(--u))}
  .planet-r{width:calc(89 * var(--u)); right:calc(-44.5 * var(--u)); top:calc(-18.3 * var(--u))}
  .scroll{width:calc(74 * var(--u)); height:calc(74 * var(--u));
    margin-left:calc(-37 * var(--u)); bottom:calc(49 * var(--u))}
  .scroll svg{width:calc(15.5 * var(--u)); height:calc(19.5 * var(--u))}

D) @media (max-height:660px){ .scroll{display:none} }   /* no room for it */

E) SHORT  @media (max-height:620px)
  :root{--u:max(min(.85px, calc(100vh / 470)), min(calc(100vw / 640), calc(100vh / 560)));
    --dh-px:calc(560 * var(--u)); --vshift:0px}
  .copy{padding-top:calc(26 * var(--u))}
  h1.title{font-size:calc(64 * var(--u)); margin-top:calc(8 * var(--u))}
  .rule{margin-top:calc(12 * var(--u))}
  p.lede{margin-top:calc(12 * var(--u))}
  .cta{margin-top:calc(20 * var(--u))}
  .label{top:50%; transform:translateY(-50%); font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(58 * var(--u))}
  .label.label-r{right:calc(58 * var(--u))}
@media (min-width:821px) and (max-height:660px){ .copy{transform:none} }

F) NARROW PHONE  @media (max-width:500px)   — declared LAST so it wins inside tier E
Below ~500px the label / button / label triad can no longer share a line, so the two
labels drop to their own band beneath the button, still left- and right-anchored.
  .label{top:calc(100% + 34 * var(--u)); transform:none; font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(6 * var(--u))}
  .label.label-r{right:calc(6 * var(--u))}

@media (prefers-reduced-motion:reduce){ .links,.burger span{transition:none} }

════════════════════════════════════════════════════════════════════════
8. ENTRANCE ANIMATION — runs once, then deletes itself
════════════════════════════════════════════════════════════════════════
Motion language: DRAW hairlines scale from centre · REVEAL type rises out of a mask ·
RISE copy lifts a short distance · SETTLE pills arrive with a small scale resolve ·
FADE the full-bleed backdrop resolves in (it fades, never translates — a translate
would drag a bare edge into frame).

In <head>, BEFORE the stylesheet, a blocking inline script so the opening frame is
composed rather than flashing the finished page:
  (function(){try{
    if(!window.matchMedia||!matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.documentElement.classList.add('anim');
    }
  }catch(e){}})();

@keyframes ent-reveal{from{transform:translateY(115%)}to{transform:translateY(0)}}
@keyframes ent-rise{from{opacity:0;transform:translateY(var(--rise,10px))}to{opacity:1;transform:none}}
@keyframes ent-settle{from{opacity:0;transform:translateY(var(--rise,8px)) scale(.965)}to{opacity:1;transform:none}}
@keyframes ent-draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes ent-fade{from{opacity:0}to{opacity:1}}

.anim{--e-expo:cubic-bezier(.16,1,.3,1); --e-quint:cubic-bezier(.22,1,.36,1);
      --e-slow:cubic-bezier(.4,0,.2,1)}
.ent-mask,.ent-line{display:block}
.anim .ent-mask{overflow:hidden; padding-top:.18em; margin-top:-.18em}
.anim .ent-line{transform:translateY(115%); will-change:transform}
.anim .navbar::after,.anim .links a[aria-current="page"]::after,.anim .rule span{transform:scaleX(0)}
.anim .logo,.anim .links a,.anim .burger,.anim p.lede,.anim .label,.anim .cta a,
.anim .scroll,.anim .sky{opacity:0}
.anim .sky{will-change:opacity}

Sequence (all `both` fill):
  .anim.play .sky                               ent-fade   1.6s  --e-slow   .25s
  .anim.play .navbar::after                     ent-draw    .9s  --e-expo   .12s
  .anim.play .logo              --rise 8u       ent-rise    .6s  --e-quint  .20s
  .anim.play .links a           --rise 8u       ent-rise   .55s  --e-quint
    nth-child(1) .26s · (2) .31s · (3) .36s · (4) .41s
  .anim.play .links a.enroll, .burger  --rise 8u  ent-settle .6s --e-quint  .46s
  .anim.play .links a[aria-current]::after      ent-draw   .55s  --e-expo   .60s
  .anim.play .eyebrow .ent-line                 ent-reveal .75s  --e-expo   .30s
  .anim.play h1.title .ent-line                 ent-reveal .95s  --e-expo   .44s
  .anim.play .rule span                         ent-draw   .65s  --e-expo   .78s
  .anim.play p.lede             --rise 12u      ent-rise    .7s  --e-quint  .86s
  .anim.play .label.label-l     --rise 8u       ent-rise    .6s  --e-quint 1.04s
  .anim.play .label.label-r     --rise 8u       ent-rise    .6s  --e-quint 1.10s
  .anim.play .cta a             --rise 8u       ent-settle  .7s  --e-quint 1.14s
  .anim.play .scroll                            ent-settle  .6s  --e-quint 1.42s

Driver script: if <html> lacks .anim, return. Otherwise wait for document.fonts.ready
(with a 500ms guard timeout so a font stall cannot block the page), then two nested
requestAnimationFrame calls, then add .play. After 2150ms remove BOTH .anim and .play,
leaving the page in its authored static state with no timers or residual transforms.

════════════════════════════════════════════════════════════════════════
9. PLANET SWITCHER — JS behaviour
════════════════════════════════════════════════════════════════════════
const ORDER = ['earth','venus','mars'];
Per planet store: name (uppercase), cut-out URL, still URL, and lede HTML:
  earth: "Learn more about the fascinating details that we call our home, Planet Earth.
          Course enrollment <br>starts today. Early Bird tickets typically last a week,
          don&rsquo;t miss out!"
  venus: "The hottest world in our solar system, wrapped in clouds of sulfuric acid.
          Course enrollment <br>starts today. Early Bird tickets typically last a week,
          don&rsquo;t miss out!"
  mars:  "The rust-red desert world, home to the tallest volcano we know of. Course
          enrollment <br>starts today. Early Bird tickets typically last a week,
          don&rsquo;t miss out!"

show(next):
  1. bail if unknown or already featured
  2. for each clip: if it is `next` and has no src but has data-src, assign src from
     data-src (first-use fetch). Toggle .is-active on the matching clip; .play() it
     (catch the rejected promise); .pause() every other clip.
  3. set .sky background-image to that planet's still — keeps reduced-motion users,
     who never see the clip, on the correct planet
  4. set the h1's .ent-line textContent to the planet name
  5. set p.lede innerHTML to that planet's lede
  6. rest = ORDER minus `next`; slot L gets rest[0], slot R gets rest[1]. For each slot:
     toggle .is-shown on the img whose data-planet matches — DO NOT touch img.src —
     set the button's data-planet, set aria-label "Show <NAME>", set the label text.

warm(planet): if that clip has no src but has data-src, set preload='auto', assign
src, call load(). Bind it to pointerenter AND focus on both buttons so the fetch starts
on intent rather than on click. After first paint, requestIdleCallback(warm all,
{timeout:4000}) — fall back to setTimeout 2500ms — to pull the remaining clips down.

Bind click on both buttons -> show(this.dataset.planet). Call show('earth') once at the
end of setup to establish the initial state.

════════════════════════════════════════════════════════════════════════
10. BURGER MENU — JS behaviour
════════════════════════════════════════════════════════════════════════
set(open) writes navrow.dataset.open, the button's aria-expanded, and its aria-label
("Open navigation" / "Close navigation"). Initialise with set(false). Toggle on button
click (stopPropagation). Close on: a document click outside the menu and button, Escape
(then return focus to the button), and any click on a link inside the menu.

════════════════════════════════════════════════════════════════════════
11. ACCESSIBILITY
════════════════════════════════════════════════════════════════════════
· Side planets are real <button type="button"> with a dynamic aria-label — keyboard
  operable, focus-visible ringed in --cyan.
· Videos are aria-hidden="true", muted, playsinline (required for iOS autoplay).
· Cut-out <img> tags carry alt="" — they are decorative; the labels carry the meaning.
· prefers-reduced-motion: no entrance sequence at all (the .anim class is never added),
  clips hidden in favour of the still, no planet hover/press transforms, no nav
  transitions.
· .copy spans the whole frame with pointer-events:none so it can never swallow nav
  clicks; only .copy a and .planet re-enable pointers.

════════════════════════════════════════════════════════════════════════
12. ACCEPTANCE CHECKS
════════════════════════════════════════════════════════════════════════
· Loads with EARTH featured, VENUS left, MARS right. Only the Earth clip has a src.
· Clicking a side planet swaps the visible cut-out in the SAME FRAME (measurable at
  <2ms) — no flash of the previous planet.
· Earth -> Venus -> Mars -> Earth returns to the exact initial state.
· Backdrop crossfades in .22s; headline, lede, both cut-outs and both labels all update
  together.
· body never scrolls horizontally at any width from 320px to 2560px.
· Entrance runs once; afterwards <html> carries neither .anim nor .play.

---

## HTML Code

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SpaceEdu — Planet Earth</title>
<link rel="icon" type="image/png" href="https://meez.design/web/bg-previews/103_Animated-Background-134830.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://meez.design/web/bg-previews/004_Motion-Background-12.jpg" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Poppins:wght@500;600&family=Prata&display=block" rel="stylesheet">

<script>
/* set before paint so the opening frame is composed, never a flash of
   finished page. If scripting is unavailable the class is never added and
   the site simply renders in its final state. */
(function(){try{
  if(!window.matchMedia||!matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.classList.add('anim');
  }
}catch(e){}})();
</script>
<style>
/* ---------- design system ----------
   Every length below is a measured design pixel from the reference
   (1353 x 1163). --u is one design pixel, resolved against the viewport. */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --dw:1353;                 /* design width  */
  --dh:1163;                 /* design height */
  --gutter:25;               /* right gutter -> content centre sits at x=664 */
  --u:max(min(.72px, calc(100vh / 700)), min(calc(100vw / 1353), calc(100vh / 1163)));
  --dh-px:calc(1163 * var(--u));           /* composition height at current scale */
  --vshift:calc(max(0px, (100vh - var(--dh-px))) * .42);

  --ink:#ffffff;
  --cyan:#79dce8;
  --cyan-logo:#5fd0e1;
  --rule:rgba(255,255,255,.23);
  --btn-ink:#071227;

  --font-serif:'Prata',Georgia,serif;
  --font-body:'Hanken Grotesk',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-logo:'Poppins',sans-serif;
}
@supports (height:100dvh){
  :root{
    --u:max(min(.72px, calc(100dvh / 700)), min(calc(100vw / 1353), calc(100dvh / 1163)));
    --vshift:calc(max(0px, (100dvh - var(--dh-px))) * .42);
  }
}

html,body{height:100%}
body{
  background:#04101f;
  color:var(--ink);
  font-family:var(--font-body);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision;
  overflow:hidden;
}

.stage{
  position:fixed;
  inset:0;
  overflow:hidden;
  isolation:isolate;
}

/* ---------- layer 0 : backdrop ---------- */
.sky{
  position:absolute;
  inset:0;
  background-image:url(https://meez.design/web/bg-previews/203_81.jpg);
  background-size:cover;
  background-position:center center;
  background-repeat:no-repeat;
  z-index:0;
}

/* One clip per planet, stacked. Only the featured one is opaque; the rest are
   paused and transparent, so the swap is a crossfade rather than a reload. */
.sky video{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  opacity:0;
  transition:opacity .22s linear;
}
.sky video.is-active{opacity:1}

@media (prefers-reduced-motion:reduce){
  /* the still on .sky is swapped alongside the clip, so this stays in sync */
  .sky video{display:none}
}

/* ---------- layer 1 : side planets ----------
   Two slots, not two planets: whichever pair is not currently featured fills
   them, so the artwork and label are set from script rather than authored. */
.planet{
  position:absolute;
  z-index:-1;
  padding:0;
  border:0;
  background:none;
  -webkit-appearance:none;
  appearance:none;
  line-height:0;
  cursor:pointer;
  pointer-events:auto;        /* .copy switches these off wholesale */
  transition:transform .45s cubic-bezier(.22,1,.36,1);
}
/* every planet is present in both slots and only revealed — swapping a src at
   click time would leave the old planet on screen until the new file arrived */
.planet img{display:none;width:100%;height:auto}
.planet img.is-shown{display:block}
.planet:hover{transform:scale(1.045)}
.planet:active{transform:scale(.99)}
/* The cutouts sit tight in their canvas (97% fill), so the boxes are trimmed to
   hold the sphere at the size the composition was drawn around: 139u across,
   centred 2u from the left edge and 6.8u from the right. */
.planet-l{
  width:calc(143 * var(--u));
  left:calc(-69.5 * var(--u));
  top:calc(-38.3 * var(--u));
}
.planet-r{
  width:calc(143 * var(--u));
  right:calc(-64.7 * var(--u));
  top:calc(-40.6 * var(--u));
}
@media (prefers-reduced-motion:reduce){
  .planet{transition:none}
  .planet:hover,.planet:active{transform:none}
}

/* ---------- layer 3 : interface ---------- */
.ui{position:absolute;inset:0;z-index:3}

/* everything below the nav shifts down together on taller-than-design viewports,
   so the composition stays balanced instead of stranding the copy at the top */
.copy{
  position:absolute;
  inset:0;
  transform:translateY(var(--vshift));
  pointer-events:none;          /* it spans the frame — never swallow nav clicks */
}
.copy a{pointer-events:auto}

/* content column: centred, offset left by half the gutter */
.col{
  position:absolute;
  left:0;
  right:calc(var(--gutter) * var(--u));
  text-align:center;
}

/* ---------- navigation ---------- */
.navbar{
  position:absolute;
  top:0;left:0;right:0;
  z-index:6;
  height:calc(88 * var(--u));
}
.navbar::after{               /* hairline under the nav */
  content:"";
  position:absolute;
  left:calc(25 * var(--u));
  right:calc(49 * var(--u));
  top:calc(86 * var(--u));
  height:calc(2 * var(--u));
  background:var(--rule);
}
.navrow{
  position:absolute;
  left:calc(25 * var(--u));
  right:calc(49 * var(--u));
  top:0;
  height:calc(86 * var(--u));
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.logo{
  font-family:var(--font-logo);
  font-weight:600;
  font-size:calc(18.4 * var(--u));
  letter-spacing:calc(-0.15 * var(--u));
  line-height:1;
  color:#fff;
  text-decoration:none;
  white-space:nowrap;
  position:relative;
  top:calc(-1 * var(--u));
}
.logo i{font-style:normal;color:var(--cyan-logo)}

/* --- menu trigger: only ever visible once the desktop links stand down --- */
.burger{
  display:none;
  position:relative;
  width:calc(46 * var(--u));
  height:calc(46 * var(--u));
  padding:0;
  border:0;
  background:none;
  cursor:pointer;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:calc(6 * var(--u));
  flex:none;
}
.burger span{
  display:block;
  width:calc(24 * var(--u));
  height:calc(2 * var(--u));
  border-radius:calc(2 * var(--u));
  background:#fff;
  transition:transform .28s cubic-bezier(.4,0,.2,1), opacity .18s linear;
}
.navrow[data-open="true"] .burger span:nth-child(1){transform:translateY(calc(8 * var(--u))) rotate(45deg)}
.navrow[data-open="true"] .burger span:nth-child(2){opacity:0}
.navrow[data-open="true"] .burger span:nth-child(3){transform:translateY(calc(-8 * var(--u))) rotate(-45deg)}

.links{display:flex;align-items:center}
.links a{
  position:relative;
  display:flex;
  align-items:center;
  height:calc(86 * var(--u));
  font-size:calc(18.4 * var(--u));
  font-weight:400;
  line-height:1;
  color:#fff;
  text-decoration:none;
  padding:0 calc(17.5 * var(--u));
  letter-spacing:calc(-1 * var(--u));
  white-space:nowrap;
}
/* the active marker is drawn by the link itself, so it can never drift away
   from its label the way a separately-positioned bar would */
.links a[aria-current="page"]::after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  top:calc(83.5 * var(--u));
  height:calc(4 * var(--u));
  background:var(--cyan);
  border-radius:calc(1 * var(--u));
}
.links a:nth-child(3){letter-spacing:calc(-1.75 * var(--u))}
.links a:nth-child(2){margin-left:calc(24 * var(--u))}
.links a:nth-child(3){margin-left:calc(26 * var(--u))}
.links a:nth-child(4){margin-left:calc(27 * var(--u))}
.links a.enroll{
  margin-left:calc(28.5 * var(--u));
  width:calc(107 * var(--u));
  height:calc(38 * var(--u));
  border-radius:calc(19 * var(--u));
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:calc(17 * var(--u));
  font-weight:600;
  letter-spacing:calc(-0.75 * var(--u));
  line-height:1;
  color:var(--btn-ink);
  text-decoration:none;
  padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d8ecfe 9%,#dceefe 72%,#f4f9ff 100%);
  box-shadow:0 calc(3 * var(--u)) calc(14 * var(--u)) rgba(255,255,255,.22),
             inset 0 0 0 calc(1.5 * var(--u)) rgba(255,255,255,.92);
  flex:none;
}
/* ---------- hero copy ---------- */
.eyebrow{
  top:calc(188.8 * var(--u));
  font-size:calc(30.45 * var(--u));
  font-weight:500;
  line-height:1;
  letter-spacing:calc(4 * var(--u));
  text-indent:calc(4 * var(--u));   /* cancel trailing tracking */
  color:#fff;
}
h1.title{
  top:calc(268 * var(--u));
  font-family:var(--font-serif);
  font-weight:400;
  font-size:calc(112.4 * var(--u));
  line-height:1;
  letter-spacing:calc(2 * var(--u));
  text-indent:calc(2 * var(--u));
  color:#fff;
}
.rule{
  top:calc(405.5 * var(--u));
  height:calc(5 * var(--u));
  font-size:0;
  line-height:0;
  padding-right:calc(2 * var(--u));
}
.rule span{
  display:inline-block;
  vertical-align:top;
  width:calc(100 * var(--u));
  height:100%;
  border-radius:calc(2.5 * var(--u));
  background:var(--cyan);
}
p.lede{
  top:calc(433.2 * var(--u));
  font-size:calc(18.36 * var(--u));
  font-weight:400;
  line-height:calc(30 * var(--u));
  color:rgba(255,255,255,.95);
}

/* ---------- call to action row ---------- */
.cta{
  top:calc(597 * var(--u));
  height:calc(66 * var(--u));
  isolation:isolate;
}
.cta a{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:calc(216 * var(--u));
  height:calc(66 * var(--u));
  border-radius:calc(33 * var(--u));
  font-size:calc(17 * var(--u));
  font-weight:700;
  letter-spacing:calc(0 * var(--u));
  text-indent:calc(0 * var(--u));
  line-height:1;
  color:var(--btn-ink);
  text-decoration:none;
  padding-top:calc(2 * var(--u));
  background:linear-gradient(180deg,#ffffff 0%,#d6e8f8 4%,#d9ecfe 72%,#ffffff 100%);
  box-shadow:0 calc(10 * var(--u)) calc(18 * var(--u)) calc(-8 * var(--u)) rgba(255,255,255,.50), 0 0 calc(26 * var(--u)) rgba(255,255,255,.18), inset 0 0 0 calc(2 * var(--u)) rgba(255,255,255,.9);
}

.label{
  position:absolute;
  top:calc(33 * var(--u));
  font-family:var(--font-serif);
  font-weight:400;
  font-size:calc(17.8 * var(--u));
  letter-spacing:calc(4.6 * var(--u));
  line-height:1;
  color:#fff;
  white-space:nowrap;
}
.label.label-l{left:calc(111 * var(--u))}
.label.label-r{right:calc(104 * var(--u))}

/* ---------- scroll control ---------- */
.scroll{
  position:absolute;
  z-index:4;
  left:50%;
  margin-left:calc((-48 - (var(--gutter) / 2)) * var(--u));
  bottom:calc(68 * var(--u));
  width:calc(96 * var(--u));
  height:calc(96 * var(--u));
  border-radius:50%;
  background:rgba(24,30,42,.70);
  -webkit-backdrop-filter:blur(calc(6 * var(--u)));
  backdrop-filter:blur(calc(6 * var(--u)));
  border:0;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
}
.scroll svg{
  width:calc(20 * var(--u));
  height:calc(25 * var(--u));
  display:block;
}


/* =========================================================
   NAVIGATION TRANSFORMATION
   Derived, not assumed: the desktop nav stays until its labels
   would fall under ~14px with sub-40px touch targets, which is
   --u < .761, i.e. a viewport narrower than ~1030px. Below that
   the same <a> elements are re-composed into a panel — no second
   copy of the markup, so the links and the CTA remain one source.
   ========================================================= */
@media (max-width:1030px), (max-height:620px){
  .navrow{
    left:calc(25 * var(--u));
    right:calc(25 * var(--u));
  }
  .burger{display:flex}

  .links{
    position:absolute;
    top:calc(96 * var(--u));
    right:0;
    z-index:5;
    width:min(calc(324 * var(--u)), calc(100vw - 50 * var(--u)));
    flex-direction:column;
    align-items:stretch;
    padding:calc(12 * var(--u));
    border-radius:calc(20 * var(--u));
    background:rgba(9,21,42,.84);
    -webkit-backdrop-filter:blur(calc(18 * var(--u)));
    backdrop-filter:blur(calc(18 * var(--u)));
    border:calc(1 * var(--u)) solid rgba(255,255,255,.14);
    box-shadow:0 calc(18 * var(--u)) calc(44 * var(--u)) rgba(2,8,20,.55);
    opacity:0;
    visibility:hidden;
    transform:translateY(calc(-10 * var(--u)));
    transition:opacity .24s ease, transform .28s cubic-bezier(.4,0,.2,1), visibility .28s;
  }
  .navrow[data-open="true"] .links{
    opacity:1;
    visibility:visible;
    transform:none;
  }

  /* the row-spacing rules are a desktop concern; neutralise them here */
  .links a:nth-child(n){
    margin-left:0;
    height:auto;
    justify-content:flex-start;
    padding:calc(14 * var(--u)) calc(16 * var(--u));
    font-size:calc(19 * var(--u));
    letter-spacing:calc(-.6 * var(--u));
  }
  .links a + a{border-top:calc(1 * var(--u)) solid rgba(255,255,255,.08)}
  .links a[aria-current="page"]::after{
    top:auto;
    bottom:calc(9 * var(--u));
    left:calc(16 * var(--u));
    right:auto;
    width:calc(26 * var(--u));
    height:calc(3 * var(--u));
  }
  .links a.enroll{
    margin:calc(14 * var(--u)) 0 calc(2 * var(--u));
    width:100%;
    height:calc(46 * var(--u));
    border-radius:calc(23 * var(--u));
    justify-content:center;
    padding-top:calc(2 * var(--u));
    font-size:calc(18 * var(--u));
    letter-spacing:calc(-.4 * var(--u));
    border-top:0;
  }
  .links a.enroll::after{content:none}
}

/* =========================================================
   RESPONSIVE
   The scene is anchored to the real viewport edges so it always
   fills — never a blank band at top or bottom. Below 820px the
   interface reflows.
   ========================================================= */

/* =========================================================
   TABLET ARCHITECTURE  (601–1030px, normal height)
   The hero is a centred, symmetric composition, so it does not
   want stacking — it wants to be re-proportioned. The scale is
   re-based on a 900px design width so type returns to comfortable
   size, the paragraph is released from its desktop line break to
   wrap on its own measure, and the planet · CTA · planet row keeps
   its flanking arrangement, which is the section's signature.
   ========================================================= */
@media (min-width:580px) and (max-width:1030px) and (min-height:621px){
  :root{
    --gutter:0;
    --u:min(
        max(min(.85px, calc(100vh / 780)),
            min(calc(100vw / 900), calc(100vh / 1163))),
        1.15px);
    --dh-px:calc(1120 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .38);
  }
  @supports (height:100dvh){
    :root{
      --u:min(
          max(min(.85px, calc(100dvh / 780)),
              min(calc(100vw / 900), calc(100dvh / 1163))),
          1.15px);
      --vshift:calc(max(0px, (100dvh - var(--dh-px))) * .38);
    }
  }

  .navbar::after{left:calc(25 * var(--u));right:calc(25 * var(--u))}

  /* released from the desktop line break; wraps on its own measure */
  p.lede br{display:none}
  p.lede{
    max-width:calc(620 * var(--u));
    margin-left:auto;
    margin-right:auto;
    text-wrap:pretty;
  }

  /* the flanking labels sit symmetrically once the gutter is gone */
  .label.label-r{right:calc(116 * var(--u))}
}

@media (max-width:579px), (max-height:620px){
  :root{
    --gutter:0;
    --u:max(min(.92px, calc(100vh / 620)), min(calc(100vw / 430), calc(100vh / 880)));
    --dh-px:calc(880 * var(--u));
    --vshift:calc(max(0px, (100vh - var(--dh-px))) * .34);
  }
  @supports (height:100dvh){
    :root{
      --u:max(min(.92px, calc(100dvh / 620)), min(calc(100vw / 430), calc(100dvh / 880)));
      --vshift:calc(max(0px, (100dvh - var(--dh-px))) * .34);
    }
  }
  .navbar{height:calc(76 * var(--u))}
  .navbar::after{left:calc(24 * var(--u));right:calc(24 * var(--u));top:calc(74 * var(--u))}
  .navrow{left:calc(24 * var(--u));right:calc(24 * var(--u));height:calc(74 * var(--u))}
  .links{top:calc(84 * var(--u))}

  /* below the nav the interface flows instead of being pinned, so the block
     adapts to however many lines the copy wraps onto */
  .copy{
    top:calc(76 * var(--u));
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:calc(56 * var(--u)) calc(26 * var(--u)) 0;
  }
  .col{position:static;width:100%;right:auto}

  .eyebrow{font-size:calc(20 * var(--u));letter-spacing:calc(5 * var(--u));text-indent:calc(5 * var(--u))}
  h1.title{font-size:calc(86 * var(--u));margin-top:calc(15 * var(--u))}
  .rule{margin-top:calc(20 * var(--u));height:calc(5 * var(--u));padding-right:0}
  .rule span{width:calc(84 * var(--u))}
  p.lede{
    margin-top:calc(19 * var(--u));
    font-size:calc(15.5 * var(--u));
    line-height:calc(26 * var(--u));
    max-width:calc(400 * var(--u));
    text-wrap:balance;             /* even line lengths — no stranded closing words */
  }
  p.lede br{display:none}

  .cta{top:auto;margin-top:calc(32 * var(--u));height:calc(60 * var(--u));position:relative}
  .cta a{width:calc(190 * var(--u));height:calc(60 * var(--u));border-radius:calc(30 * var(--u))}

  .label{
    top:50%;
    transform:translateY(-50%);
    font-size:calc(16 * var(--u));
    letter-spacing:calc(4 * var(--u));
  }
  .label.label-l{left:calc(56 * var(--u))}
  .label.label-r{right:calc(60 * var(--u))}

  .planet-l{width:calc(89 * var(--u));left:calc(-44.5 * var(--u));top:calc(-17 * var(--u))}
  .planet-r{width:calc(89 * var(--u));right:calc(-44.5 * var(--u));top:calc(-18.3 * var(--u))}

  .scroll{
    width:calc(74 * var(--u));height:calc(74 * var(--u));
    margin-left:calc(-37 * var(--u));
    bottom:calc(49 * var(--u));
  }
  .scroll svg{width:calc(15.5 * var(--u));height:calc(19.5 * var(--u))}
}

/* very short viewports (landscape phones, short desktop windows):
   compress the stack and retire the scroll control, which has no room */
@media (max-height:660px){
  .scroll{display:none}
}
@media (max-height:620px){
  :root{
    --u:max(min(.85px, calc(100vh / 470)), min(calc(100vw / 640), calc(100vh / 560)));
    --dh-px:calc(560 * var(--u));
    --vshift:0px;
  }
  .copy{padding-top:calc(26 * var(--u))}
  h1.title{font-size:calc(64 * var(--u));margin-top:calc(8 * var(--u))}
  .rule{margin-top:calc(12 * var(--u))}
  p.lede{margin-top:calc(12 * var(--u))}
  .cta{margin-top:calc(20 * var(--u))}
  .label{top:50%;transform:translateY(-50%);font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(58 * var(--u))}
  .label.label-r{right:calc(58 * var(--u))}
}
@media (min-width:821px) and (max-height:660px){
  .copy{transform:none}
}

/* Narrow phones only: below ~500px the label / button / label triad can no
   longer share a line without crowding, so the two labels drop to their own
   band beneath the button — still left- and right-anchored, so the flanking
   relationship the section is built on survives the change. Declared last so
   it also wins inside the short-window tier. */
@media (max-width:500px){
  .label{top:calc(100% + 34 * var(--u));transform:none;font-size:calc(15 * var(--u))}
  .label.label-l{left:calc(6 * var(--u))}
  .label.label-r{right:calc(6 * var(--u))}
}

@media (prefers-reduced-motion:reduce){
  .links,.burger span{transition:none}
}
.scroll:focus-visible,.links a:focus-visible,.enroll:focus-visible,.cta a:focus-visible,.logo:focus-visible{
  outline:calc(2 * var(--u)) solid var(--cyan);
  outline-offset:calc(3 * var(--u));
}
.planet:focus-visible{
  outline:calc(2 * var(--u)) solid var(--cyan);
  outline-offset:calc(6 * var(--u));
  border-radius:50%;
}

/* =========================================================
   ENTRANCE — one sequence, once, then nothing.
   Motion language, derived from the composition itself:
     DRAW    hairlines scale from their centre (three rules share it)
     REVEAL  primary type rises out of a mask (the title lockup)
     RISE    supporting copy lifts a short distance
     SETTLE  pills arrive with a small scale resolve
     FADE    the backdrop resolves in — the slow layer underneath
   The planets live in the backdrop clip, which carries its own motion.
   ========================================================= */
.ent-mask,.ent-line{display:block}

@keyframes ent-reveal{from{transform:translateY(115%)}to{transform:translateY(0)}}
@keyframes ent-rise{from{opacity:0;transform:translateY(var(--rise,10px))}to{opacity:1;transform:none}}
@keyframes ent-settle{from{opacity:0;transform:translateY(var(--rise,8px)) scale(.965)}to{opacity:1;transform:none}}
@keyframes ent-draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
/* the backdrop is full-bleed, so it fades rather than rising — a translate
   would drag a bare edge into frame */
@keyframes ent-fade{from{opacity:0}to{opacity:1}}

.anim{--e-expo:cubic-bezier(.16,1,.3,1);--e-quint:cubic-bezier(.22,1,.36,1);
      --e-slow:cubic-bezier(.4,0,.2,1)}

/* resting states held before play, so nothing flashes unanimated */
.anim .ent-mask{overflow:hidden;padding-top:.18em;margin-top:-.18em}
.anim .ent-line{transform:translateY(115%);will-change:transform}
.anim .navbar::after,
.anim .links a[aria-current="page"]::after,
.anim .rule span{transform:scaleX(0)}
.anim .logo,.anim .links a,.anim .burger,.anim p.lede,
.anim .label,.anim .cta a,.anim .scroll,
.anim .sky{opacity:0}
.anim .sky{will-change:opacity}

/* --- the sequence --- */
.anim.play .sky{animation:ent-fade 1.6s var(--e-slow) .25s both}
.anim.play .navbar::after{animation:ent-draw .9s var(--e-expo) .12s both}
.anim.play .logo{--rise:calc(8 * var(--u));animation:ent-rise .6s var(--e-quint) .20s both}
.anim.play .links a{--rise:calc(8 * var(--u));animation:ent-rise .55s var(--e-quint) both}
.anim.play .links a:nth-child(1){animation-delay:.26s}
.anim.play .links a:nth-child(2){animation-delay:.31s}
.anim.play .links a:nth-child(3){animation-delay:.36s}
.anim.play .links a:nth-child(4){animation-delay:.41s}
.anim.play .links a.enroll,
.anim.play .burger{--rise:calc(8 * var(--u));animation:ent-settle .6s var(--e-quint) .46s both}
.anim.play .links a[aria-current="page"]::after{animation:ent-draw .55s var(--e-expo) .60s both}

.anim.play .eyebrow .ent-line{animation:ent-reveal .75s var(--e-expo) .30s both}
.anim.play h1.title .ent-line{animation:ent-reveal .95s var(--e-expo) .44s both}
.anim.play .rule span{animation:ent-draw .65s var(--e-expo) .78s both}
.anim.play p.lede{--rise:calc(12 * var(--u));animation:ent-rise .7s var(--e-quint) .86s both}

.anim.play .label.label-l{--rise:calc(8 * var(--u));animation:ent-rise .6s var(--e-quint) 1.04s both}
.anim.play .label.label-r{--rise:calc(8 * var(--u));animation:ent-rise .6s var(--e-quint) 1.10s both}
.anim.play .cta a{--rise:calc(8 * var(--u));animation:ent-settle .7s var(--e-quint) 1.14s both}
.anim.play .scroll{animation:ent-settle .6s var(--e-quint) 1.42s both}

</style>
</head>
<body>
<div class="stage">
  <div class="sky">
    <video data-planet="earth" class="is-active" autoplay muted loop playsinline preload="auto"
           src="https://meez.design/web/media/bg-videos/227_82.mp4"
           poster="https://meez.design/web/bg-previews/058_Aurora-Waves.jpg"
           aria-hidden="true"></video>
    <!-- the other two stay unfetched until their planet is chosen -->
    <video data-planet="venus" muted loop playsinline preload="none"
           data-src="https://meez.design/web/media/bg-videos/228_84.mp4"
           poster="https://meez.design/web/bg-previews/074_Cosmic-Vortex.jpg"
           aria-hidden="true"></video>
    <video data-planet="mars" muted loop playsinline preload="none"
           data-src="https://meez.design/web/media/bg-videos/229_96.mp4"
           poster="https://meez.design/web/bg-previews/015_Background-086.jpg"
           aria-hidden="true"></video>
  </div>

  <div class="ui">
    <header class="navbar">
      <div class="navrow">
        <a class="logo" href="#">space<i>edu</i></a>
        <nav class="links" id="site-nav">
          <a href="#" aria-current="page">Planets</a>
          <a href="#">Tution</a>
          <a href="#">Tutorials</a>
          <a href="#">Blog</a>
          <a class="enroll" href="#">Enroll</a>
        </nav>
        <button class="burger" type="button" aria-label="Open navigation"
                aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <div class="copy">
    <div class="col eyebrow"><span class="ent-mask"><span class="ent-line">PLANET</span></span></div>
    <h1 class="col title"><span class="ent-mask"><span class="ent-line">EARTH</span></span></h1>
    <div class="col rule"><span></span></div>
    <p class="col lede">Learn more about the fascinating details that we call our home, Planet Earth. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!</p>

    <div class="col cta">
      <button class="planet planet-l" type="button" data-slot="l">
        <img data-planet="earth" alt="" src="https://meez.design/web/bg-previews/014_Background-085.jpg">
        <img data-planet="venus" alt="" src="https://meez.design/web/bg-previews/001_Motion-Background-10.jpg">
        <img data-planet="mars"  alt="" src="https://meez.design/web/bg-previews/002_Motion-Background-2.jpg">
      </button>
      <button class="planet planet-r" type="button" data-slot="r">
        <img data-planet="earth" alt="" src="https://meez.design/web/bg-previews/006_Cosmic-Drift.jpg">
        <img data-planet="venus" alt="" src="https://meez.design/web/bg-previews/007_Digital-Pulse.jpg">
        <img data-planet="mars"  alt="" src="https://meez.design/web/bg-previews/008_Liquid-Motion.jpg">
      </button>
      <a href="#">GET STARTED</a>
      <span class="label label-l"></span>
      <span class="label label-r"></span>
    </div>
    </div>
  </div>

  <button class="scroll" type="button" aria-label="Scroll to next section">
    <svg viewBox="0 0 26 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4"
            stroke="#ffffff" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"/>
    </svg>
  </button>
</div>
<script>
(function(){
  var row = document.querySelector('.navrow'),
      btn = document.querySelector('.burger'),
      menu = document.getElementById('site-nav');
  if(!row || !btn || !menu) return;
  function set(open){
    row.dataset.open = open ? 'true' : 'false';
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  set(false);
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    set(row.dataset.open !== 'true');
  });
  document.addEventListener('click', function(e){
    if(row.dataset.open === 'true' && !menu.contains(e.target) && e.target !== btn){ set(false); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && row.dataset.open === 'true'){ set(false); btn.focus(); }
  });
  menu.addEventListener('click', function(e){
    if(e.target.closest('a')) set(false);
  });
})();

/* ---- entrance: runs once, then removes itself entirely ---- */
(function(){
  var root = document.documentElement;
  if(!root.classList.contains('anim')) return;
  var started = false;
  function start(){
    if(started) return; started = true;
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        root.classList.add('play');
        /* when the last tween lands, drop every entrance rule so the page is
           left in exactly its authored static state — no timers, no loops,
           no residual transforms, nothing left running. */
        setTimeout(function(){ root.classList.remove('anim','play'); }, 2150);
      });
    });
  }
  /* hold for the faces so the masked reveal runs on real metrics */
  if(document.fonts && document.fonts.ready){
    var guard = setTimeout(start, 500);
    document.fonts.ready.then(function(){ clearTimeout(guard); start(); });
  } else { start(); }
})();

/* ---- planet switcher ----
   Three planets, one featured at a time. The featured planet is the backdrop
   clip; the other two fill the left and right slots in a fixed order, so the
   arrangement is a pure function of which one is featured. */
(function(){
  var ORDER = ['earth','venus','mars'];

  var PLANETS = {
    earth:{
      name:'EARTH',
      still:'https://meez.design/web/bg-previews/010_Vapor-Trail.jpg',
      lede:'Learn more about the fascinating details that we call our home, Planet Earth. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!'
    },
    venus:{
      name:'VENUS',
      still:'https://meez.design/web/bg-previews/065_Ember-Trail.jpg',
      lede:'The hottest world in our solar system, wrapped in clouds of sulfuric acid. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!'
    },
    mars:{
      name:'MARS',
      still:'https://meez.design/web/bg-previews/059_Crystal-Bloom.jpg',
      lede:'The rust-red desert world, home to the tallest volcano we know of. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!'
    }
  };

  var sky    = document.querySelector('.sky'),
      clips  = document.querySelectorAll('.sky video'),
      title  = document.querySelector('h1.title .ent-line'),
      lede   = document.querySelector('p.lede'),
      slots  = {
        l:{ btn:document.querySelector('.planet-l'), label:document.querySelector('.label-l') },
        r:{ btn:document.querySelector('.planet-r'), label:document.querySelector('.label-r') }
      };
  if(!sky || !clips.length || !title || !lede || !slots.l.btn || !slots.r.btn) return;

  var featured = null;

  function show(next){
    if(!PLANETS[next] || next === featured) return;
    featured = next;

    /* backdrop: fetch the clip the first time it is asked for, then crossfade */
    for(var i=0;i<clips.length;i++){
      var clip = clips[i], on = clip.dataset.planet === next;
      if(on && !clip.getAttribute('src') && clip.dataset.src){
        clip.src = clip.dataset.src;
      }
      clip.classList.toggle('is-active', on);
      if(on){ var p = clip.play(); if(p && p.catch) p.catch(function(){}); }
      else { clip.pause(); }
    }
    /* keeps reduced-motion users, who never see the clip, on the right planet */
    sky.style.backgroundImage = 'url(' + PLANETS[next].still + ')';

    title.textContent = PLANETS[next].name;
    lede.innerHTML = PLANETS[next].lede;

    /* the two that are not featured, in their fixed order. Every planet is
       already in the slot, so this reveals one rather than loading one. */
    var rest = ORDER.filter(function(k){ return k !== next; });
    ['l','r'].forEach(function(side, i){
      var key = rest[i], slot = slots[side];
      var imgs = slot.btn.querySelectorAll('img');
      for(var j=0;j<imgs.length;j++){
        imgs[j].classList.toggle('is-shown', imgs[j].dataset.planet === key);
      }
      slot.btn.dataset.planet = key;
      slot.btn.setAttribute('aria-label', 'Show ' + PLANETS[key].name);
      slot.label.textContent = PLANETS[key].name;
    });
  }

  /* Give a clip its source before it is asked for, so the click lands on
     something already buffering instead of starting the download itself. */
  function warm(planet){
    for(var i=0;i<clips.length;i++){
      var c = clips[i];
      if(c.dataset.planet === planet && !c.getAttribute('src') && c.dataset.src){
        c.preload = 'auto';
        c.src = c.dataset.src;
        c.load();
      }
    }
  }

  ['l','r'].forEach(function(side){
    var btn = slots[side].btn;
    btn.addEventListener('click', function(){ show(this.dataset.planet); });
    /* intent, well before the click */
    btn.addEventListener('pointerenter', function(){ warm(this.dataset.planet); });
    btn.addEventListener('focus', function(){ warm(this.dataset.planet); });
  });

  show('earth');

  /* once the page has settled, pull the remaining clips down in the background */
  function warmRest(){ ORDER.forEach(warm); }
  if(window.requestIdleCallback){ requestIdleCallback(warmRest, {timeout:4000}); }
  else { setTimeout(warmRest, 2500); }
})();
</script>
</body>
</html>
