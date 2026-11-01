---
id: "res_wd_scroll_marquee"
slug: "scroll-marquee"
title: "Scroll Marquee"
category: "Marquee"
categorySlug: "marquee"
routeCollection: "sections"
videoUrl: "/media/videos/scroll-marquee.mp4"
posterUrl: "/media/posters/scroll-marquee.jpg"
chars: 3993
tier: "premium"
likes: 90
---

---

**Prompt:**

Create a scroll-driven image marquee section using React, Tailwind CSS, and vanilla JS scroll events (no libraries needed for the marquee itself). The site uses the **Google Font "Kanit"** (weights 300-900) and a dark background color `#0C0C0C`. This section sits directly below a full-screen hero section.

**Section layout:**
- Full-width section with `overflow: hidden`, dark background `#0C0C0C`
- Padding: `pt-24 sm:pt-32 md:pt-40 pb-10`
- Contains two horizontal rows of images stacked vertically with a `gap-3` (12px) between them

**Row 1 images (11 images), scrolls RIGHT as user scrolls down:**
```
https://Axes Lab/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://Axes Lab/assets/hero-codenest-preview-Cgppc2qV.gif
https://Axes Lab/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://Axes Lab/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://Axes Lab/assets/hero-asme-preview-B_nGDnTP.gif
https://Axes Lab/assets/hero-transform-data-preview-Cx5OU29N.gif
https://Axes Lab/assets/hero-vitara-preview-Cjz2QYyU.gif
https://Axes Lab/assets/hero-terra-preview-BFjrCr7T.gif
https://Axes Lab/assets/hero-skyelite-preview-DHaZIgUv.gif
https://Axes Lab/assets/hero-aethera-preview-DknSlcTa.gif
https://Axes Lab/assets/hero-designpro-preview-D8c5_een.gif
```

**Row 2 images (10 images), scrolls LEFT as user scrolls down (opposite direction):**
```
https://Axes Lab/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://Axes Lab/assets/hero-xportfolio-preview-D4A8maiC.gif
https://Axes Lab/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://Axes Lab/assets/hero-nexora-preview-cx5HmUgo.gif
https://Axes Lab/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://Axes Lab/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://Axes Lab/assets/hero-new-era-preview-CocuDUm9.gif
https://Axes Lab/assets/hero-wealth-preview-B70idl_u.gif
https://Axes Lab/assets/hero-luminex-preview-CxOP7ce6.gif
https://Axes Lab/assets/hero-celestia-preview-0yO3jXO8.gif
```

**Image cards:**
- Each image card is exactly `420px wide x 270px tall`
- `flex-shrink-0` so they never collapse
- `rounded-2xl` (16px border radius) with `overflow: hidden`
- Images use `object-cover` to fill the container, with `loading="lazy"`
- `gap-3` (12px) between cards horizontally

**Scroll-driven parallax animation (vanilla JS, not CSS animation):**
- Each row's image array is tripled (`[...ROW, ...ROW, ...ROW]`) to create enough content for continuous scrolling appearance
- On every scroll event (passive listener), calculate offset:
  1. Get the section's bounding rect top relative to the document
  2. `scrolled = window.scrollY - sectionTop + window.innerHeight`
  3. `offset = scrolled * 0.3` (parallax factor of 0.3)
- Row 1: `transform: translateX(${offset - 200}px)` -- moves right as user scrolls
- Row 2: `transform: translateX(${-(offset - 200)}px)` -- moves left as user scrolls
- Initial transform: Row 1 starts at `translateX(-200px)`, Row 2 starts at `translateX(200px)`
- Use `willChange: 'transform'` for GPU acceleration
- Apply transforms directly via refs (not state) for 60fps performance
- Use `{ passive: true }` on the scroll listener
- Run the handler once on mount to set initial position
- Clean up the listener on unmount

**Technical details:**
- React functional component using `useRef` and `useEffect`
- No framer-motion or animation library needed for this section
- Rows are built with flexbox (`flex gap-3`)
- Each row is wrapped in an `overflow-hidden w-full` container
- The outer section also has `overflow-hidden` and `w-full`
- All images have empty `alt=""` since they are decorative

**Font (loaded in HTML head):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
```

CSS base: `font-family: 'Kanit', sans-serif` on html/body.

---
