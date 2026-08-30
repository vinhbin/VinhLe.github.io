# Apple Launch Redesign — "The Phone"

**Date:** 2026-08-29
**Status:** Design approved (brainstormed with Vinh), not yet built
**Supersedes:** `2026-08-29-door-hub-redesign-design.md` (the 5-door hallway)
**Concept:** The site becomes a single-product Apple launch page. The product is the phone (phone.html). index.html sells it the way apple.com sells an iPhone — dark, huge type, scroll-driven story — then hands you the real, working phone seamlessly.

## Decisions made

- Terminal-style / RPG SYSTEM hallway is gone entirely (boot sequence, wisps, menu).
- terminal.html, retro.html, game.html are archived: moved to `archive/`, live but unlinked.
- Unbranded product — headline is just **"The phone."** No "VinhPhone" / model-name gag.
- No price band. Closing CTA is copy + buttons only.
- classic.html unchanged; remains the recruiter quick view.

## Site structure

```
index.html      → the launch page (dark, apple.com/iphone style)
phone.html      → the product itself (content unchanged)
classic.html    → recruiter quick view (linked from nav + footer)
archive/        → terminal.html, retro.html, game.html (live, unlinked)
shared/data.js  → single source of truth; specs table renders from it
```

## Landing page anatomy (index.html)

1. **Nav** — sticky frosted-glass bar. *Vinh Le* left; *Quick View · GitHub · LinkedIn* right. Thin and quiet.
2. **Hero** — full viewport, near-black. Huge gradient headline **"The phone."**, subline *"The portfolio. In your pocket."* The phone floats center showing its real lock screen (name, clock, notification previews), slow ambient float, soft reflection. Pills: **Try it →** (primary, iOS blue) and **Quick view** (ghost).
3. **Scroll story** — phone goes `position: sticky`, pinned while three copy moments scroll past; its screen swaps to match:
   - *"Messages. Straight from Vinh."* — iMessage intro thread; copy: real texts, replies compose a real email.
   - *"Photos. A life in sixteen shots."* — photo grid; copy mentions SF, travel, videography.
   - *"Apps. Real work inside."* — home screen / project apps; copy names WATTLINE + awards.
   Screens are lightweight static mockups (DOM/images), NOT phone.html embedded — page stays fast.
4. **Tech Specs** — Apple's specs-table layout rendered from `data.js`: Chip → *Georgia Tech M.S. CS*; Languages / Backend / Databases / AI-ML rows from `skills`; *"In the box"* → experience entries; Awards row in gold.
5. **Closing band** — *"Pick it up."* with **Try it →** and **Hire** (mailto). No price.
6. **Footer** — quick view · github · linkedin · devpost · email · © 2026.

Copy voice: Apple product-page cadence — short declarative sentences, period-heavy, zero jargon.

## The seamless handoff

Clicking **Try it →** plays one move: the phone mockup scales up toward the viewer while the page fades to black, then navigates to phone.html — which already boots on pure black showing the same lock screen. Black-to-black, lock-screen-to-lock-screen: continuity.

- **View Transitions API**: `@view-transition { navigation: auto }` with matching `view-transition-name` on the landing mockup and phone.html's phone frame. Chrome/Edge/newer Safari morph one into the other across the page load. Few lines of CSS, no framework.
- **Fallback** (Firefox, older Safari): scale-up + fade-to-black still lands on phone.html's black lock screen. A sessionStorage flag tells phone.html it came from the landing page in case it should skip any entrance flourish.
- **Reduced motion**: plain navigation, no morph, everything visible immediately.

## Mobile

- Hero mockup renders near-full-width on real phones, so "Try it" barely moves — expands to full-bleed and phone.html takes over feeling native.
- Scroll story stacks copy above the sticky phone instead of beside it.

## Cleanup

- **Archive move:** `git mv terminal.html retro.html game.html archive/`; fix their relative refs (`shared/…`, `images/…` → `../shared/…`, `../images/…`). All three keep working at `vinhle.xyz/archive/…`.
- **data.js:** `rooms[]` shrinks to what's live (phone, classic). All other content untouched.
- **index.html:** full rewrite. Boot, SYSTEM window, wisps canvas, `voidBoot` flag all deleted. New meta description/OG pitching the phone instead of "five doors."
- **void.js escape hatch:** restyled site-wide from glowing isekai door to a quiet `‹ vinhle.xyz` corner link (phone.html + archived rooms).
- **classic.html:** untouched; resume/LinkedIn keep linking there directly.

## Build order (site shippable at every step)

1. Archive move + path fixes.
2. Landing skeleton: nav, hero, phone mockup with live lock screen.
3. Scroll story — sticky phone, three screen swaps.
4. Specs table + closing band + footer from data.js.
5. The handoff: View Transitions + fallback, phone.html corner link.
6. Mobile + reduced-motion pass, meta, README.

## Out of scope (v1)

- Re-surfacing archived rooms (e.g. as a "Classics" folder app inside the phone) — easy later.
- Sound design, analytics, any backend.
