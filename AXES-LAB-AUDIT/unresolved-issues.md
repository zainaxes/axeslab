# Unresolved Issues, Decisions & Recommendations

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Status:** Open for User Input & Approval  

---

## 1. Discrepancy & Decision Register

| Issue ID | Affected Routes | Current State | Root Cause | Recommended Action & Decision Needed |
| :--- | :--- | :--- | :--- | :--- |
| **ISSUE-01** | `/about`, `/mcp`, `/web-design` | Copy claims "640+ Prompts". | Legacy marketing figure created before authoritative catalog synchronization. Actual count is **375** verified records (238 motion prompts + 137 curated UI components). | **Recommendation:** Reconcile all text and counters to reflect factual counts (e.g. "375+ Production Directives & Motion Prompts"). Never claim unverified inventory. |
| **ISSUE-02** | `/backgrounds` | Page displays "0 background prompts found". | No records in `catalog.json` or `real-prompts.ts` carry the literal category name "backgrounds". | **Recommendation:** Map `/backgrounds` to query the 11 verified abstract animation, particle shader, and geometric shape records (`Particles` and `Shapes` subcategories), or redirect to `/prompts?sub=Particles,Shapes`. Never populate with fake generated items. |
| **ISSUE-03** | `/apps` | Applications page displays motion ads and showreels. | Filter logic in `apps/page.tsx` searches for the substring "app" in titles, matching promotional motion reels (e.g. "Lego icon app reel"). | **Recommendation:** Refine taxonomy filter to strictly pull from `Website Prompts` (`Product UI` and `Phone` subcategories) and `catalog.json` application screens, excluding `Motion Ads`. |
| **ISSUE-04** | `/top` | Claims "Ranked by verified implementations" and "most saved". | `likes` across all 238 motion prompts are initialized to 0; bookmarks are stored purely in client-side `localStorage`. | **Recommendation:** Relabel honestly as "Curated Staff Picks & Essential Directives" rather than asserting unmeasured global community rankings. |
| **ISSUE-05** | Global Visual Cohesion | Navigation, cards, and modal components share tokens, but layout compositions differ across older sections. | Historical incremental builds created slight variations in card density. | **Recommendation:** Proceed through the Preview Gate: review representative page previews (Homepage, Prompts, Detail, Customizer, Restyle, Mobile) before applying final unified styling. |

---

## 2. Preview Approval Gate (Awaiting User Review)

In accordance with Section 4 of the Critical Project Update:

> **"Wait for approval of the visual direction before applying the redesign to the primary application. Do not perform the redesign directly on the live website or modify the primary application before approval."**

The full audit has been completed without making unauthorized modifications to production layouts. The 13 required audit deliverables are now fully persisted in `AXES-LAB-AUDIT/`.

We are ready to present the representative preview designs and discuss the decision points above with the user.

