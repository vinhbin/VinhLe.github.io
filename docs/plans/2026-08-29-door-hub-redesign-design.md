# Door Hub Redesign — "The Void Hallway"

**Date:** 2026-08-29
**Status:** Design approved (brainstormed with Vinh), not yet built
**Concept:** Doraemon Anywhere-Door-inspired hub. A liminal-void hallway of glowing doors; each door opens a differently-themed, fully functional room. Coherent, not chaotic.

## Goals

1. Memorable, interactive portfolio that shows range without sacrificing the 30-second recruiter path.
2. Every room has a real job (functional content), not just a costume.
3. One coherent system: shared transitions, shared data, shared escape hatch.
4. Stays plain HTML/CSS/JS on GitHub Pages — no framework, no build step.

## Architecture

```
index.html      → the hallway (liminal void, 5 doors)
terminal.html   → The Terminal (green phosphor hacker shell)
phone.html      → The Phone (modern phone UI)
retro.html      → Retro Windows (Win95 desktop)
game.html       → The Arcade (Outage Runner mini-game)
classic.html    → today's vintage-gold one-page site, intact
shared/void.css → door-swing transition, escape hatch, accent tokens
shared/void.js  → transition logic, shared helpers
shared/data.js  → single source of truth: projects, experience, skills, education, links
```

## The Hallway (`index.html`)

- Near-black void (#050507), drifting particles, faint fog gradient.
- Five doors in a loose arc, each ajar with its room's light leaking through:
  - Terminal → green phosphor
  - Phone → cool white-blue
  - Retro Windows → teal CRT flicker
  - Arcade → magenta neon
  - Classic view → warm gold (callback to current site identity)
- Hover: door opens a few degrees, light spills, brass-plaque tooltip (name + one-liner).
- Click: door swings open full-screen, leak color floods viewport, room fades in. This door-swing is the ONE transition used site-wide.
- Header text: name, "Backend-Focused Software Engineer," "Pick a door."
- Corner link: "recruiter in a hurry? → classic view."

## Rooms

### The Terminal (`terminal.html`)
Real working shell: `help`, `whoami`, `ls projects`, `open <project>`, `resume`, `skills`, `contact`, hidden `sudo hire me`. Tab-completion and command history required. Renders from `data.js`. Scanline/CRT styling.

### The Phone (`phone.html`)
Lock screen (name + clock) → unlock → home screen of functional apps:
- Messages: auto-typed intro thread; reply box composes a real mailto.
- Photos: project screenshots gallery.
- Notes: about + education.
- LinkedIn / GitHub / Devpost: real links.
Full-bleed on actual mobile devices.

### Retro Windows (`retro.html`)
Win95 gray, pixel font, boot chime. Draggable/closable windows:
- "My Projects" folder → Earlier Work archive (VibeCheck, CareCircle, FinanceFlow, TripBoard, SmartBook, Heart Disease).
- resume.txt in Notepad.
- Working Minesweeper.
- Easter egg: deleting System32 triggers fake blue screen.

### The Arcade (`game.html`)
**Outage Runner** — 60-second WATTLINE-themed mini-game: pilot a battery cart through a dark Atlanta grid, restore power to houses before their timers expire. Score screen credits "inspired by WATTLINE — Best Hack for Good" with real project link. Canvas-based, keyboard + touch controls. Deliberately small and finishable.

## Coherence Invariants

1. **One escape hatch:** same glowing door icon, bottom-left of every room, reversed door-swing back to hallway.
2. **One data source:** `shared/data.js` feeds terminal, phone, retro, and classic — resume updates happen once.
3. **One accent thread:** each room's interactive elements use its door-leak color from the hallway.

## Recruiter Path & SEO

- `classic.html` = current site, keeps professional meta tags/OG previews.
- Resume and LinkedIn link to `vinhle.xyz/classic.html`; socials link to `vinhle.xyz` (the hallway).
- Hallway carries minimal but real meta description naming Vinh + role.

## Mobile

- Hallway: vertical stack of doors, same glow/swing.
- Phone room: full-bleed, feels native.
- Arcade: touch controls; if device can't do it justice, offer the WATTLINE link gracefully.

## Build Order

1. `classic.html` split + `shared/data.js` extraction (content parity guaranteed first).
2. Hallway with door transitions.
3. The Terminal (cheapest, most on-brand).
4. Retro Windows.
5. The Phone.
6. The Arcade (long pole, last).

## Out of Scope (v1)

- Sound design beyond the retro boot chime.
- Additional doors (blog, 3D room) — the hallway makes adding doors later trivial.
- Backend/analytics of any kind.
