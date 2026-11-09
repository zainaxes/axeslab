export interface TemplateItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  subtext?: string;
  poster: string;
  video: string;
  model: string;
  template: string;
  fields: Array<{
    key: string;
    label: string;
    hint: string;
    default: string;
  }>;
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: "realtime",
    slug: "realtime",
    title: "The 3D template",
    description: "The template behind the improved prompts for real-time three.js pieces. It's set up with Prompt Motion's gallery; swap in your subject.",
    poster: "https://media.prompt-motion.com/improved-realtime-1/poster.bb539d45.webp",
    video: "https://media.prompt-motion.com/improved-realtime-1/video.22ccfd17.mp4",
    model: "Opus 5.5",
    template: `<direction>
Build {{subject}} as one self-contained HTML page with three.js.
Style: {{style}}.
The signature shot is {{signature}}. Build everything toward it.
Camera: a film camera, not orbit controls. Every shot uses one named move (dolly, crane, orbit, push-in, rack focus), eased in and out, and the camera never passes through geometry.
Light and materials: a key, fill and rim light with soft shadows, an environment map for reflections, fog for depth, physically based materials with varied roughness, ACES tone mapping. Nothing should look like a default material.
Motion: things react to each other (what's hit moves, what's near lights up), driven by springs or simple physics, never linear tweens.
Banned: default materials and lighting, floating text labels, glows on everything, a slowly spinning object as the whole idea, anything that looks like a tech demo.
</direction>

<structure>
Shots, about three seconds each:
{{shots}}
</structure>

<build>
1. One HTML file, three.js from a CDN, no build step. Model everything in code; no downloaded models, and no textures except the site's own video posters for the cards.
2. Use MeshPhysicalMaterial, a PMREM environment from RoomEnvironment, soft shadows, ACES tone mapping and antialiasing. Add depth of field only on shots that need it.
3. Hold 60fps on a laptop.
4. Add a ?render mode where every frame is computed from time (seeded randomness, no clock), so it can be captured with Playwright into an MP4 at {{size}}.
5. Capture one frame per shot, look at it, and fix anything flat, aliased, clipping or hard to read.
</build>`,
    fields: [
      {
        key: "subject",
        label: "Subject",
        hint: "What to build.",
        default: "the Prompt Motion gallery, reimagined as a 3D space of video cards on curved walls,"
      },
      {
        key: "style",
        label: "Style",
        hint: "The look.",
        default: "soft daylight and white space in Prompt Motion's own: black and white, Geist, one orange accent"
      },
      {
        key: "signature",
        label: "Signature shot",
        hint: "The one frame someone would screenshot.",
        default: "the pull back where the corridors of cards resolve into the letters PROMPT MOTION seen from above"
      },
      {
        key: "shots",
        label: "Shots",
        hint: "The shot list, in order.",
        default: "1. Macro on the edge of one card in soft light, then rack focus onto its playing video (a real poster from the site). 2. Dolly back: it's one of hundreds of cards on a gently curved wall, all playing; a wave of orange light runs along the wall and each card tilts slightly as it passes. 3. Crane up and over the wall: behind it, more walls form corridors. 4. One card unhinges, swings toward the camera with weight and settles; its prompt is printed on its back and lifts off as 3D type, line by line. 5. The signature shot: pull far back and up while the orange light traces the O. 6. Settle on the wordmark and prompt-motion.com."
      },
      {
        key: "size",
        label: "Size",
        hint: "1920x1080 landscape, 1080x1920 vertical, 1080x1080 square.",
        default: "1920x1080"
      }
    ]
  },
  {
    id: "showreel",
    slug: "showreel",
    title: "The showreel prompt",
    description: "The most-used prompt on Prompt Motion: one line asking Opus 5.5 to show off as a motion designer. Our rewrite adds the direction it leaves out, and still needs nothing from you.",
    subtext: "The original is used in 49 videos",
    poster: "https://media.prompt-motion.com/improved-showreel-1/poster.99975d64.webp",
    video: "https://media.prompt-motion.com/improved-showreel-1/video.77d74909.mp4",
    model: "Opus 5.5",
    template: `<direction>
A {{length}}-second motion design showreel that proves you are a world-class motion designer. Concept: {{concept}}. Commit to it and name it in one line before you start. Every shot is made out of the previous one: shapes, type and color transform into the next scene instead of cutting or fading.
One typeface ({{typeface}}), a palette of {{palette}}, one consistent camera language.
Show range: kinetic type, shape morphing, a 2D-to-3D moment, a data or UI moment, and an end title. Give each one an equal share of the time.
Banned: particle bursts, glows, lens flares, camera shake, RGB split, crossfades, generic gradients, bouncy easing, holds longer than half a second, anything that looks like a template.
</direction>

<structure>
{{bpm}} BPM, something happens on every beat.
First bar: hook. Then one technique per bar, each flowing out of the last. Last full bar: the strongest moment. Final half bar: end title, and the final frame matches the first so it loops.
</structure>

<build>
1. One HTML file at {{size}}. Every style is computed from time inside window.seek(t): no CSS animations, no timers, no state carried between frames.
2. Use spring and exponential easing written as functions of time. Blur follows speed and direction on fast moves.
3. Write a soundtrack in code with the Web Audio API (OfflineAudioContext): a kick on every beat, a riser into the last full bar, a hit on each scene change. Render it to WAV.
4. Render with Playwright at 60fps, 3 subframes per frame blended with ffmpeg tmix for motion blur, then mux the audio.
5. Before the full render, render one frame per beat and look at them. Fix anything cluttered, off the beat, overlapping or hard to read.
</build>

<start>
Tell me the concept and show a beat-by-beat storyboard, then build it without asking me anything else. Give me the final MP4.
</start>`,
    fields: [
      {
        key: "concept",
        label: "Concept",
        hint: "The one idea every shot grows out of. Leave it to Opus, or give your own.",
        default: "your pick (e.g. \"ink becomes type becomes architecture\")"
      },
      {
        key: "typeface",
        label: "Typeface",
        hint: "A Google Font, or a few for it to choose from.",
        default: "Geist, Inter or a bold display face from Google Fonts"
      },
      {
        key: "palette",
        label: "Palette",
        hint: "Color names or hex codes, e.g. #FF4F1F, cobalt blue, cream.",
        default: "at most three colors plus black and white"
      },
      {
        key: "length",
        label: "Length (seconds)",
        hint: "15 to 30 works best. Longer gets more scenes.",
        default: "15"
      },
      {
        key: "bpm",
        label: "Tempo (BPM)",
        hint: "Every move lands on this beat. 100 to 128 suits most music.",
        default: "120"
      },
      {
        key: "size",
        label: "Size",
        hint: "1920x1080 landscape, 1080x1920 vertical, 1080x1080 square.",
        default: "1920x1080"
      }
    ]
  }
];
