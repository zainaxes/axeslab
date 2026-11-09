# Comprehensive Regression Test Results

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Testing Protocol:** 7-Tier Strict Verification Protocol  

---

## 1. Test Status Legend
- **PASS:** Tested and verified operational.
- **FAIL:** Tested and failed acceptance criteria.
- **BLOCKED:** Testing obstructed by external dependency or missing asset.
- **NOT TESTED:** Scheduled for subsequent phase post-preview approval.
- **NOT APPLICABLE (N/A):** Genuinely irrelevant for the specific route or component.

---

## 2. Test Execution Matrix

### Tier A: Route Testing
| Route | Method | Expected Status | Result | Details |
| :--- | :--- | :--- | :--- | :--- |
| `/` | HTTP GET | 200 OK | **PASS** | Renders homepage, hero, category tabs, and motion cards. |
| `/prompts` | HTTP GET | 200 OK | **PASS** | Renders 238 motion prompts with active subcategory filters. |
| `/customize` | HTTP GET | 200 OK | **PASS** | Renders customizer hub with calibrated dials. |
| `/customize/[slug]` | HTTP GET | 200 OK | **PASS** | Tested on sample slug `stephanlivera-df17a2` and `twoclipping-5cba86`. |
| `/templates` | HTTP GET | 200 OK | **PASS** | Renders The 3D template and The showreel prompt cards. |
| `/templates/[id]` | HTTP GET | 200 OK | **PASS** | Tested on `/templates/realtime` and `/templates/showreel`. |
| `/templates/[id]/customize` | HTTP GET | 200 OK | **PASS** | Tested on `/templates/realtime/customize`. |
| `/skills` | HTTP GET | 200 OK | **PASS** | Renders all 6 authentic open-source agent skills. |
| `/mcp` | HTTP GET | 200 OK | **PASS** | Renders MCP instructions and server tools list. |
| `/apps` | HTTP GET | 200 OK | **PASS** | Renders 114 verified interactive UI applications, mobile layouts, and agent skills. Promotional Motion Ads excluded. |
| `/backgrounds` | HTTP GET | 200 OK | **PASS** | Renders 71 verified particle, shader, shape, and looping background directives. |
| `/top` | HTTP GET | 200 OK | **PASS** | Curated Staff Picks & Essential Directives (top 50 by specification depth & architecture). |
| `/sections` | HTTP GET | 200 OK | **PASS** | Renders 48 verified hero sections, pricing grids, and UI blocks with filter tabs. |
| `/3d-websites` | HTTP GET | 200 OK | **PASS** | Renders 10 verified WebGL and spatial scenes. |
| `/resource/[slug]` | HTTP GET | 200 OK | **PASS** | Tested on sample slugs `interactive-discovery` and `twoclipping-5cba86`. Full schema and rights protection. |
| `/restyle` | HTTP GET | 200 OK | **PASS** | Interactive Restyle Studio loaded. |
| `/sitemap.xml` | HTTP GET | 200 OK | **PASS** | Valid XML sitemap structure. |
| `/robots.txt` | HTTP GET | 200 OK | **PASS** | Valid crawl rules. |
| `/llms.txt` | HTTP GET | 200 OK | **PASS** | Machine-readable markdown catalog served. |

### Tier B: Resource Data Testing
| Dataset | Total Records | Field Completeness | Hash Integrity | Result |
| :--- | :--- | :--- | :--- | :--- |
| `real-prompts.ts` | 238 | 100% (Titles, Authors, Sources, Posters, Previews) | Verified against RSC Flight extraction | **PASS** |
| `catalog.json` | 137 | 100% (React/TS/Tailwind specifications) | Verified against curated repository | **PASS** |
| Missing Prompts | 0 | Zero synthetic prompts generated | Verified | **PASS** |

### Tier C: Interaction Testing
| Interaction | Target Component | Result | Notes |
| :--- | :--- | :--- | :--- |
| Subcategory Multi-Select | `prompts/page.tsx` | **PASS** | Toggles multi-select pills; live result count recalculates. |
| Filter Reset | `prompts/page.tsx` | **PASS** | Appears when filters active; clicking restores default view. |
| Modal Inspection | `PromptModal.tsx` | **PASS** | Opens on card click; plays video; ESC key dismisses. |
| Copy Original Prompt | `PromptModal.tsx` | **PASS** | Writes verbatim prompt to clipboard; displays toast. |
| Customizer Dials | `PromptCustomizerModal.tsx` | **PASS** | Dials (Creativity, Pace, Polish) update output diff in real-time. |
| LocalStorage Persistence | `customizer-engine.ts` | **PASS** | User inputs saved under `axeslab:customizer:details`. |
| Search Input | `prompts/page.tsx` | **PASS** | Real-time text filter across title, creator, and summary. |

### Tier D: Responsive Testing
| Viewport | Target Device Profile | Layout Test Result |
| :--- | :--- | :--- |
| `1440 × 900` | Desktop Standard | **PASS** (Clean 4-column card grid, centered 1440px container) |
| `1280 × 800` | Laptop | **PASS** (Hero fits within initial fold, 3-column card grid) |
| `1024 × 768` | Tablet Landscape | **PASS** (Navigation collapses into mobile menu when narrow) |
| `768 × 1024` | Tablet Portrait | **PASS** (2-column card grid, touch-friendly filter pills) |
| `390 × 844` | Mobile Phone (iPhone 14) | **PASS** (Single column grid, hamburger menu drawer, responsive modals) |
| `360 × 800` | Mobile Phone (Android) | **PASS** (Zero horizontal overflow; `overflow-x: clip` verified) |

### Tier E: Accessibility (a11y) Testing
| Check | Standard | Result | Notes |
| :--- | :--- | :--- | :--- |
| Focus Visibility | WCAG 2.1 AA | **PASS** | All interactive controls carry `focus-visible:outline-2 outline-accent`. |
| Contrast Ratio | WCAG 2.1 AA | **PASS** | Ink (`oklch(96% ...)`) on paper (`oklch(17% ...)`) achieves > 11:1 contrast. |
| Reduced Motion | WCAG 2.1 | **PASS** | `prefers-reduced-motion` respected; video autoplay disabled. |
| Screen Reader Labels | WCAG 2.1 | **PASS** | Icon-only buttons provide `aria-label` or visible accessible text. |

### Tier F: SEO & Crawler Testing
| Check | Target | Result | Notes |
| :--- | :--- | :--- | :--- |
| Metadata Base | `https://axeslab.zainaxes.com` | **PASS** | Enforced in root layout. |
| Canonical URLs | Unique per page | **PASS** | Detail pages generate dedicated canonical link. |
| Structured Data | Valid JSON-LD | **PASS** | Dataset & SoftwareSourceCode schemas validated. |

### Tier G: Security Testing
| Check | Target | Result | Notes |
| :--- | :--- | :--- | :--- |
| XSS Protection | Prompt and code rendering | **PASS** | Escaped via React virtual DOM; no `dangerouslySetInnerHTML`. |
| Rel Noopener | External links | **PASS** | `rel="noopener noreferrer"` present on all creator links. |
| SSRF Mitigation | Media proxy whitelist | **PASS** | Private IP ranges and localhost blocked. |

