# Apple Launch Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the isekai door-hub hallway with an apple.com-style product launch page for the phone (phone.html), archive the terminal/retro/game rooms, and make "Try it" hand off seamlessly into phone.html.

**Architecture:** Static HTML/CSS/JS on GitHub Pages, no build step. `index.html` is fully rewritten as a dark Apple-style page: frosted nav → hero with a CSS phone mockup → sticky-phone scroll story (IntersectionObserver swaps mockup screens) → Tech Specs rendered from `shared/data.js` → closing CTA. Handoff uses cross-document View Transitions API where supported with a scale-up + fade-to-black fallback. The three retired rooms move to `archive/` with relative paths fixed so they keep working, unlinked.

**Tech Stack:** Plain HTML/CSS/JS (ES5-style, matching existing files), View Transitions API (progressive enhancement), IntersectionObserver, Google Fonts (Inter). No frameworks.

**Design spec:** `docs/plans/2026-08-29-apple-launch-redesign-design.md`

**Working directory:** the `apple-launch` worktree (`.worktrees/apple-launch/`). All paths below are relative to the worktree root. Commit to branch `apple-launch` after every task. Site must stay shippable after each task.

**Verification setup (used by every task):** the site is static with no test suite. Verify with a local server + the `webapp-testing` skill (Playwright):

```bash
cd .worktrees/apple-launch
python -m http.server 8123   # run in background; serve worktree root
```

Then drive `http://localhost:8123/...` with Playwright: load the page, capture console errors (there must be none), check the specific assertions listed in each task, and screenshot. Also verify no failed network requests (404s) on each page checked.

**Deploy note:** the site is served both at `vinhle.xyz/` and `vinhbin.github.io/VinhLe-website/` (a subpath). Never use root-absolute paths like `/images/...` — always relative paths.

---

### Task 1: Archive terminal, retro, and game rooms

**Files:**
- Move: `terminal.html` → `archive/terminal.html`
- Move: `retro.html` → `archive/retro.html`
- Move: `game.html` → `archive/game.html`
- Modify (path fixes): all three moved files

- [ ] **Step 1: Move the files with git**

```bash
cd .worktrees/apple-launch
mkdir archive
git mv terminal.html archive/
git mv retro.html archive/
git mv game.html archive/
```

- [ ] **Step 2: Fix static relative references in all three files**

Every `images/`, `shared/`, and cross-page reference must be prefixed with `../` because the files are now one directory deeper:

```bash
cd .worktrees/apple-launch
sed -i 's|href="images/|href="../images/|g; s|src="images/|src="../images/|g; s|href="shared/|href="../shared/|g; s|src="shared/|src="../shared/|g' archive/terminal.html archive/retro.html archive/game.html
sed -i "s|url('images/bliss.jpg')|url('../images/bliss.jpg')|g" archive/retro.html
sed -i "s|window.location.href = 'index.html'|window.location.href = '../index.html'|g" archive/terminal.html archive/retro.html
sed -i 's|href="classic.html"|href="../classic.html"|g' archive/game.html
```

What each line covers (verified against current source):
- icons at `terminal.html:9`, `retro.html:8`, `game.html:8`; `shared/void.css`, `shared/data.js`, `shared/void.js` includes in all three; two `linkedinpfp.jpg` `<img>`s in retro (lines 550, 595).
- retro's Bliss wallpaper `url('images/bliss.jpg')` at lines 40 and 299.
- terminal's exit at line 591 and retro's Start-menu "Turn Off" at line 1622 (both navigate to `index.html`).
- game's three `classic.html` links (lines 473, 565, 573).

- [ ] **Step 3: Fix retro's dynamically built image and room links**

retro.html renders `VINH.life` photo paths and `VINH.rooms` file paths from `data.js` at runtime; those strings are relative to the *page*, so they break from `archive/`. Two patterns to patch:

```bash
cd .worktrees/apple-launch
sed -i "s|<img src=\"' + esc(l.src)|<img src=\"../' + esc(l.src)|g" archive/retro.html
sed -i "s|a.href = r.file;|a.href = '../' + r.file;|" archive/retro.html
```

This changes line 1445 and line 1467 (`'<img src="' + esc(l.src) + '"...'` → `'<img src="../' + esc(l.src) + '"...'`) and line 1575 (`a.href = r.file;` → `a.href = '../' + r.file;`).

- [ ] **Step 4: Verify no unfixed relative references remain**

```bash
cd .worktrees/apple-launch
grep -n 'href="images/\|src="images/\|href="shared/\|src="shared/\|href="classic\.html"\|url('"'"'images/' archive/*.html
```

Expected: no output. (Data-URI `url(%23...)` matches inside SVG strings don't count and won't match this pattern.)

- [ ] **Step 5: Verify in browser**

Start the local server (see Verification setup). With Playwright check each of:
- `http://localhost:8123/archive/terminal.html` — terminal renders, no console errors, no 404s. Type `help` and confirm output appears.
- `http://localhost:8123/archive/retro.html` — Bliss wallpaper visible (not the fallback), no 404s. Open My Pictures; thumbnails load.
- `http://localhost:8123/archive/game.html` — town renders, no 404s.

- [ ] **Step 6: Commit**

```bash
cd .worktrees/apple-launch
git add -A
git commit -m "archive: move terminal, retro, and game rooms to archive/ with path fixes"
```

---

### Task 2: Shrink rooms[], restyle the escape hatch site-wide

**Files:**
- Modify: `shared/data.js:186-192` (rooms array)
- Rewrite: `shared/void.js` (whole file, it's 44 lines)
- Modify: `shared/void.css:22-41` (hatch styling)

- [ ] **Step 1: Shrink `rooms[]` in `shared/data.js`**

Replace the current 5-entry `rooms:` array (lines 186–192) with:

```js
  rooms: [
    { id: 'phone', file: 'phone.html', name: 'The Phone', accent: '#9fc9ff', blurb: 'Slide to unlock.' },
    { id: 'classic', file: 'classic.html', name: 'The Classic View', accent: '#c9a84c', blurb: 'The portfolio, no games. Quick view.' }
  ]
```

(Archived retro lists these with `'../' + r.file` after Task 1, so its Start-menu links stay valid.)

- [ ] **Step 2: Rewrite `shared/void.js`**

Replace the entire file with:

```js
/* Shared room runtime: sets the accent, plays the enter fade, and injects the
   "back to vinhle.xyz" corner link on every page except the launch page.
   Skips the enter flood when arriving via the launch page's Try-it handoff. */
(function () {
  var body = document.body;
  var accent = body.dataset.accent || '#c9a84c';
  document.documentElement.style.setProperty('--room-accent', accent);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var fromLaunch = false;
  try {
    fromLaunch = sessionStorage.getItem('fromLaunch') === '1';
    if (fromLaunch) sessionStorage.removeItem('fromLaunch');
  } catch (e) {}

  if (!reduced && !fromLaunch) {
    var ov = document.createElement('div');
    ov.className = 'void-enter';
    ov.style.background = accent;
    body.appendChild(ov);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ov.classList.add('void-enter-done'); });
    });
    setTimeout(function () { ov.remove(); }, 900);
  }

  if (body.dataset.room !== 'hallway') {
    var home = /\/archive\//.test(window.location.pathname) ? '../index.html' : 'index.html';
    var hatch = document.createElement('a');
    hatch.className = 'void-hatch';
    hatch.href = home;
    hatch.setAttribute('aria-label', 'Back to vinhle.xyz');
    hatch.innerHTML = '<span aria-hidden="true">&#8249;</span><span>vinhle.xyz</span>';
    body.appendChild(hatch);

    hatch.addEventListener('click', function (e) {
      if (reduced) return; // plain navigation
      e.preventDefault();
      var out = document.createElement('div');
      out.className = 'void-exit';
      body.appendChild(out);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { out.classList.add('void-exit-on'); });
      });
      setTimeout(function () { window.location.href = home; }, 420);
    });
  }
})();
```

- [ ] **Step 3: Restyle the hatch in `shared/void.css`**

Replace the `.void-hatch` block, its `:hover`, and the `.void-hatch svg` rule (lines 22–41) with:

```css
/* Corner link — identical on every page, always bottom-left */
.void-hatch {
  position: fixed; left: 1rem; bottom: 1rem; z-index: 99999;
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 0.9rem; border-radius: 999px;
  background: rgba(0, 0, 0, 0.55); color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font: 500 0.78rem/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  letter-spacing: 0.04em;
  text-decoration: none; cursor: pointer;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}
.void-hatch:hover {
  transform: translateY(-2px);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}
```

Leave the `@media (prefers-reduced-motion)` and `@media print` blocks as they are (they reference `.void-hatch` and still apply).

- [ ] **Step 4: Verify in browser**

With the local server running, Playwright-check:
- `http://localhost:8123/phone.html` — bottom-left shows a quiet dark pill reading `‹ vinhle.xyz`; clicking it lands on `http://localhost:8123/index.html` (still the old hallway at this point — fine).
- `http://localhost:8123/archive/retro.html` — hatch present; its `href` resolves to `../index.html`; Start menu lists exactly two rooms (The Phone, The Classic View) pointing at `../phone.html` / `../classic.html`.
- No console errors on either page.

- [ ] **Step 5: Commit**

```bash
cd .worktrees/apple-launch
git add shared/data.js shared/void.js shared/void.css
git commit -m "shared: rooms[] down to phone+classic, hatch becomes quiet vinhle.xyz corner link"
```

---

### Task 3: Rewrite index.html — skeleton with nav, hero, phone mockup, footer

**Files:**
- Rewrite: `index.html` (whole file)

This task writes the COMPLETE final CSS (including rules for the story/specs/takeoff pieces added in Tasks 4–6 — they're inert until their markup/JS exists) plus the skeleton markup: nav, hero (as the first "moment" over the sticky phone mockup showing its lock screen), footer, and the live-clock JS. After this task the page is a complete, working single-viewport launch page.

- [ ] **Step 1: Replace index.html entirely with:**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Vinh Le — The phone.</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/jpeg" href="images/linkedinpfp.jpg" />
  <meta name="description"
    content="Vinh Le — AI engineer and M.S. CS student at Georgia Tech. The portfolio is a phone: scroll the launch page, then pick it up." />
  <meta property="og:title" content="Vinh Le — The phone." />
  <meta property="og:description" content="AI Engineer | M.S. CS @ Georgia Tech | The portfolio. In your pocket." />
  <meta property="og:image" content="images/linkedinpfp.jpg" />
  <meta property="og:type" content="website" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { background: #000; scroll-behavior: smooth; }
    :root {
      --bg: #000;
      --ink: #f5f5f7;
      --dim: #86868b;
      --blue: #2997ff;
      --btn: #0071e3;
      --accent: #9fc9ff;
    }
    body {
      background: var(--bg);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a { color: var(--blue); text-decoration: none; }
    .skip-link { position: absolute; left: -999px; }
    .skip-link:focus { position: fixed; left: 1rem; top: 1rem; z-index: 10000; background: #000; color: #fff; padding: 0.5rem 1rem; }

    /* ── nav ── */
    .gnav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      height: 48px; padding: 0 max(4vw, 1.2rem);
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.8rem;
    }
    .gnav-name { color: var(--ink); font-weight: 600; letter-spacing: -0.01em; }
    .gnav-links { display: flex; gap: 1.6rem; }
    .gnav-links a { color: rgba(245, 245, 247, 0.75); transition: color 0.2s ease; }
    .gnav-links a:hover { color: #fff; }

    /* ── pills ── */
    .pill {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.65rem 1.35rem; border-radius: 999px;
      font-size: 0.95rem; font-weight: 500;
      transition: filter 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    .pill-blue { background: var(--btn); color: #fff; }
    .pill-blue:hover { filter: brightness(1.15); }
    .pill-ghost { border: 1px solid rgba(245, 245, 247, 0.35); color: var(--ink); }
    .pill-ghost:hover { border-color: #fff; }

    /* ── showcase: sticky phone + scrolling moments ── */
    .showcase { position: relative; }
    .mock-pin {
      position: sticky; top: 0; z-index: 1;
      height: 100vh; height: 100svh;
      display: flex; align-items: flex-end; justify-content: center;
      padding-bottom: 6vh;
    }
    .moments { position: relative; z-index: 2; margin-top: -100vh; margin-top: -100svh; }
    .moment {
      min-height: 100vh; min-height: 100svh;
      display: flex; align-items: center;
      pointer-events: none;
    }
    .moment-hero {
      flex-direction: column; align-items: center; justify-content: flex-start;
      padding-top: calc(48px + 6vh);
      text-align: center;
    }
    .hero-title {
      font-size: clamp(3rem, 9vw, 6.5rem);
      font-weight: 800; letter-spacing: -0.03em; line-height: 1.02;
      background: linear-gradient(180deg, #fff 30%, var(--accent));
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .hero-sub {
      margin-top: 0.6rem;
      font-size: clamp(1.05rem, 2.2vw, 1.5rem);
      color: var(--dim); font-weight: 500;
    }
    .hero-cta { margin-top: 1.4rem; display: flex; gap: 0.9rem; pointer-events: auto; }

    .m-copy {
      pointer-events: auto;
      width: min(400px, 86vw);
      margin-left: auto; margin-right: 7vw;
      opacity: 0; transform: translateY(26px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .moment.in .m-copy { opacity: 1; transform: none; }
    .m-copy h2 { font-size: clamp(1.8rem, 3.4vw, 2.8rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.12; }
    .m-copy p { color: var(--dim); font-size: 1.05rem; line-height: 1.6; margin-top: 0.8rem; }
    .m-copy p b { color: var(--ink); font-weight: 600; }

    /* ── the phone mockup ── */
    .ph-drift { animation: drift 7s ease-in-out infinite alternate; }
    @keyframes drift { from { transform: translateY(-6px); } to { transform: translateY(8px); } }
    .mock {
      position: relative; overflow: hidden; cursor: pointer;
      height: min(62vh, 620px); aspect-ratio: 9 / 19.3;
      border-radius: 44px;
      background: #000;
      border: 2px solid #2a2d34;
      box-shadow: 0 0 0 4px #101216, 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 90px rgba(159, 201, 255, 0.12);
      transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
      view-transition-name: phone;
    }
    .mock .island {
      position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
      width: 32%; height: 22px; border-radius: 999px;
      background: #000; border: 1px solid rgba(255, 255, 255, 0.05);
      z-index: 5;
    }
    .mscreen {
      position: absolute; inset: 0;
      opacity: 0; transition: opacity 0.6s ease;
      background: radial-gradient(circle at 35% 32%, #2a3d55 12%, #0c111c 45%, #05070b 70%);
      display: flex; flex-direction: column;
      color: #fff;
    }
    .mock[data-screen="lock"] .s-lock,
    .mock[data-screen="messages"] .s-messages,
    .mock[data-screen="photos"] .s-photos,
    .mock[data-screen="apps"] .s-apps { opacity: 1; }

    /* lock screen */
    .s-lock { align-items: center; padding-top: 17%; text-align: center; }
    .ml-glyph { opacity: 0.9; }
    .ml-date { margin-top: 10px; font-size: 0.82rem; font-weight: 600; opacity: 0.92; }
    .ml-clock { font-size: 3.3rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; }
    .ml-spacer { flex: 1; }
    .ml-who { font-size: 1.02rem; font-weight: 600; }
    .ml-what { font-size: 0.72rem; color: rgba(255, 255, 255, 0.7); margin-top: 2px; }
    .ml-bar { width: 34%; height: 4px; border-radius: 999px; background: rgba(255, 255, 255, 0.85); margin: 16px 0 12px; }

    /* messages screen */
    .s-messages { padding-top: 44px; }
    .mm-head {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 0.7rem; font-weight: 600;
    }
    .mm-head img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }
    .mm-thread { display: flex; flex-direction: column; gap: 7px; padding: 12px 10px; }
    .mm-b {
      max-width: 78%; padding: 8px 11px; border-radius: 16px;
      font-size: 0.78rem; line-height: 1.35;
    }
    .mm-b.in { background: #2c2c2e; align-self: flex-start; border-bottom-left-radius: 5px; }
    .mm-b.out { background: #0a84ff; align-self: flex-end; border-bottom-right-radius: 5px; }

    /* photos screen */
    .s-photos { padding-top: 44px; }
    .mp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
    .mp-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }

    /* apps screen */
    .s-apps { padding: 52px 12px 0; }
    .ma-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px 8px; }
    .m-app { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .m-app-ic {
      width: 100%; aspect-ratio: 1; max-width: 52px; border-radius: 13px;
      display: grid; place-items: center;
      font-size: 1.15rem; font-weight: 700; color: #fff;
      background-image: linear-gradient(160deg, rgba(255, 255, 255, 0.22), rgba(0, 0, 0, 0.25));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    .m-app span {
      font-size: 0.56rem; color: rgba(255, 255, 255, 0.85);
      max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    /* ── specs ── */
    .specs { max-width: 820px; margin: 14vh auto 0; padding: 0 1.4rem; }
    .specs h2 {
      font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.02em;
      text-align: center; margin-bottom: 3rem;
    }
    .spec-row {
      display: grid; grid-template-columns: 200px 1fr; gap: 1.2rem;
      padding: 1.1rem 0; border-top: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 0.95rem;
    }
    .spec-row dt { color: var(--dim); font-weight: 600; }
    .spec-row dd { color: var(--ink); line-height: 1.55; }
    .spec-gold dd { color: #e6c96e; }

    /* ── closing ── */
    .closing { text-align: center; padding: 16vh 1.4rem 18vh; }
    .closing h2 {
      font-size: clamp(2.4rem, 6vw, 4.5rem); font-weight: 800; letter-spacing: -0.03em;
      background: linear-gradient(180deg, #fff 30%, var(--accent));
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .closing .hero-cta { justify-content: center; }

    /* ── footer ── */
    .foot {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2rem max(4vw, 1.2rem);
      display: flex; flex-wrap: wrap; gap: 1.2rem; justify-content: space-between;
      color: var(--dim); font-size: 0.78rem;
    }
    .foot a { color: var(--dim); transition: color 0.2s ease; }
    .foot a:hover { color: #fff; }
    .foot-links { display: flex; gap: 1.4rem; flex-wrap: wrap; }

    /* ── takeoff handoff ── */
    @view-transition { navigation: auto; }
    #blackout {
      position: fixed; inset: 0; z-index: 9999;
      background: #000; opacity: 0; pointer-events: none;
      transition: opacity 0.5s ease;
    }
    body.takeoff #blackout { opacity: 1; }
    body.takeoff .mock { transform: scale(2.4); }
    body.takeoff .ph-drift { animation: none; }

    /* ── mobile ── */
    @media (max-width: 1100px) {
      .moment:not(.moment-hero) { align-items: flex-end; justify-content: center; }
      .m-copy {
        margin: 0 auto 7vh; text-align: center;
        background: rgba(0, 0, 0, 0.62);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        padding: 1.6rem 1.3rem; border-radius: 18px;
      }
      .mock { height: min(58vh, 560px); }
      .gnav-links { gap: 1.1rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .ph-drift { animation: none; }
      .m-copy, .mscreen, .mock, #blackout { transition: none; }
      .m-copy { opacity: 1; transform: none; }
    }
  </style>
</head>

<body data-room="hallway">
  <a class="skip-link" href="#specs">Skip to the specs</a>

  <nav class="gnav" aria-label="Site">
    <a class="gnav-name" href="index.html">Vinh Le</a>
    <div class="gnav-links">
      <a href="classic.html">Quick View</a>
      <a href="https://github.com/vinhbin" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/vinh-thaile/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </nav>

  <section class="showcase">
    <div class="mock-pin">
      <div class="ph-drift">
        <div class="mock" id="mock" data-screen="lock" aria-hidden="true">
          <div class="island"></div>

          <div class="mscreen s-lock">
            <svg class="ml-glyph" width="15" height="20" viewBox="0 0 21 27" fill="none" stroke="#fff" stroke-width="2"><rect x="1.5" y="11" width="18" height="14.5" rx="4" fill="rgba(255,255,255,0.14)"/><path d="M5.5 11V7.5a5 5 0 0 1 10 0V11"/></svg>
            <div class="ml-date" id="mockDate">Friday, August 29</div>
            <div class="ml-clock" id="mockClock">9:41</div>
            <div class="ml-spacer"></div>
            <div class="ml-who">Vinh Le</div>
            <div class="ml-what">AI Engineer &middot; Georgia Tech</div>
            <div class="ml-bar"></div>
          </div>
          <!-- story screens inserted in Task 4 -->

        </div>
      </div>
    </div>

    <div class="moments" id="moments">
      <div class="moment moment-hero in" data-screen="lock">
        <h1 class="hero-title">The phone.</h1>
        <p class="hero-sub">The portfolio. In your pocket.</p>
        <div class="hero-cta">
          <a class="pill pill-blue" href="phone.html" data-tryit>Try it <span aria-hidden="true">&rarr;</span></a>
          <a class="pill pill-ghost" href="classic.html">Quick view</a>
        </div>
      </div>
      <!-- story moments inserted in Task 4 -->
    </div>
  </section>

  <!-- specs + closing inserted in Task 5 -->

  <footer class="foot">
    <span>&copy; 2026 Vinh Le</span>
    <div class="foot-links">
      <a href="classic.html">Quick View</a>
      <a href="https://github.com/vinhbin" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/vinh-thaile/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://devpost.com/vinhbin" target="_blank" rel="noopener noreferrer">Devpost</a>
      <a href="mailto:vinhhle24@gmail.com">Email</a>
    </div>
  </footer>

  <noscript>
    <p style="text-align:center;padding:1rem;color:#86868b;">JavaScript is off — the interactive phone needs it.
      <a style="color:#2997ff;" href="classic.html">See the classic portfolio instead.</a></p>
  </noscript>

  <div id="blackout" aria-hidden="true"></div>

  <script src="shared/data.js"></script>
  <script>
    (function () {
      var V = window.VINH || {};
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* live clock + date on the mock lock screen */
      var mc = document.getElementById('mockClock');
      var md = document.getElementById('mockDate');
      function tick() {
        var d = new Date();
        var h = d.getHours() % 12 || 12;
        var m = d.getMinutes();
        if (mc) mc.textContent = h + ':' + (m < 10 ? '0' : '') + m;
        if (md) md.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      }
      tick();
      setInterval(tick, 15000);

      /* Task 4 adds: mock screens rendering + scroll-story observer */
      /* Task 5 adds: tech specs rendering */
      /* Task 6 adds: try-it takeoff handoff */
    })();
  </script>
</body>

</html>
```

- [ ] **Step 2: Verify in browser**

With the local server running, Playwright-check `http://localhost:8123/`:
- Title is `Vinh Le — The phone.`; `h1` text is `The phone.`
- No boot sequence, no SYSTEM window, no wisps — first paint is nav + hero + phone.
- Lock screen mockup shows live time and today's date, name, role.
- `Try it →` navigates to phone.html (plain navigation for now); `Quick view` navigates to classic.html.
- No console errors. Screenshot at 1440×900 and 390×844 — phone mockup centered, headline above it, no horizontal scroll.

- [ ] **Step 3: Commit**

```bash
cd .worktrees/apple-launch
git add index.html
git commit -m "index: rewrite as Apple-style launch page — nav, hero, phone mockup, footer"
```

---

### Task 4: Scroll story — sticky phone with screen swaps

**Files:**
- Modify: `index.html` (insert mock screens, story moments, and observer/render JS)

- [ ] **Step 1: Insert the three story screens into the mock**

In `index.html`, replace the line:

```html
          <!-- story screens inserted in Task 4 -->
```

with:

```html
          <div class="mscreen s-messages">
            <div class="mm-head">
              <img src="images/linkedinpfp.jpg" alt="" />
              <span>Vinh</span>
            </div>
            <div class="mm-thread">
              <div class="mm-b in">hey — thanks for stopping by &#128075;</div>
              <div class="mm-b in">i'm vinh. i build backend + AI systems. everything on this phone is real.</div>
              <div class="mm-b in">wanna see?</div>
              <div class="mm-b out">show me &rarr;</div>
            </div>
          </div>

          <div class="mscreen s-photos">
            <div class="mp-grid" id="mockPhotos"></div>
          </div>

          <div class="mscreen s-apps">
            <div class="ma-grid" id="mockApps"></div>
          </div>
```

- [ ] **Step 2: Insert the three story moments**

Replace the line:

```html
      <!-- story moments inserted in Task 4 -->
```

with:

```html
      <div class="moment" data-screen="messages">
        <div class="m-copy">
          <h2>Messages. Straight from Vinh.</h2>
          <p>The intro thread types itself out. Reply, and it composes a <b>real email</b> — no contact form in sight.</p>
        </div>
      </div>
      <div class="moment" data-screen="photos">
        <div class="m-copy">
          <h2>Photos. A life in sixteen shots.</h2>
          <p>San Francisco fog, a Japanese garden, night cities, Muay Thai. A <b>real camera roll</b>, not stock.</p>
        </div>
      </div>
      <div class="moment" data-screen="apps">
        <div class="m-copy">
          <h2>Apps. Real work inside.</h2>
          <p><b>WATTLINE</b> — Best Hack for Good at Hack RenderATL. <b>Trace</b> — 1st place, Actian VectorAI Build. Every app opens.</p>
        </div>
      </div>
```

- [ ] **Step 3: Add the screen-render + observer JS**

In the inline script, replace the line:

```js
      /* Task 4 adds: mock screens rendering + scroll-story observer */
```

with:

```js
      /* photos screen: first 9 real shots from data.js */
      var mp = document.getElementById('mockPhotos');
      if (mp && V.life) {
        V.life.slice(0, 9).forEach(function (l) {
          var img = document.createElement('img');
          img.src = l.src;
          img.alt = '';
          img.loading = 'lazy';
          mp.appendChild(img);
        });
      }

      /* apps screen: project tiles from data.js */
      var ma = document.getElementById('mockApps');
      if (ma && V.projects) {
        var pal = ['#0a84ff', '#ff375f', '#30d158', '#ff9f0a', '#bf5af2', '#64d2ff', '#ffd60a', '#ac8e68'];
        V.projects.slice(0, 8).forEach(function (p, i) {
          var t = document.createElement('div');
          t.className = 'm-app';
          var ic = document.createElement('div');
          ic.className = 'm-app-ic';
          ic.style.backgroundColor = pal[i % pal.length];
          ic.textContent = (p.name || '?').charAt(0);
          var lb = document.createElement('span');
          lb.textContent = p.name;
          t.appendChild(ic);
          t.appendChild(lb);
          ma.appendChild(t);
        });
      }

      /* scroll story: swap the mock's screen as moments pass */
      var mock = document.getElementById('mock');
      var moments = document.querySelectorAll('.moment');
      if ('IntersectionObserver' in window && mock) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              mock.dataset.screen = en.target.dataset.screen;
            } else {
              if (!en.target.classList.contains('moment-hero')) en.target.classList.remove('in');
            }
          });
        }, { threshold: 0.55 });
        moments.forEach(function (m) { io.observe(m); });
      } else {
        moments.forEach(function (m) { m.classList.add('in'); });
      }
```

- [ ] **Step 4: Verify in browser**

Playwright-check `http://localhost:8123/`:
- Scrolling down: phone stays pinned; screen crossfades lock → messages → photos → apps as each copy block scrolls into view; copy blocks fade in.
- Photos grid shows 9 real thumbnails (no broken images); apps grid shows project tiles with names.
- Scroll back up: screens revert correctly (lock at top).
- At 390×844: copy blocks appear as centered translucent cards near the bottom, readable over the phone.
- No console errors.

- [ ] **Step 5: Commit**

```bash
cd .worktrees/apple-launch
git add index.html
git commit -m "index: sticky-phone scroll story — messages, photos, apps screens"
```

---

### Task 5: Tech Specs + closing band

**Files:**
- Modify: `index.html` (insert specs + closing markup and specs-render JS)

- [ ] **Step 1: Insert the specs and closing sections**

In `index.html`, replace the line:

```html
  <!-- specs + closing inserted in Task 5 -->
```

with:

```html
  <section class="specs" id="specs" aria-label="Tech specs">
    <h2>Tech Specs.</h2>
    <dl id="specList"></dl>
  </section>

  <section class="closing">
    <h2>Pick it up.</h2>
    <div class="hero-cta">
      <a class="pill pill-blue" href="phone.html" data-tryit>Try it <span aria-hidden="true">&rarr;</span></a>
      <a class="pill pill-ghost" href="mailto:vinhhle24@gmail.com?subject=Let%27s%20talk">Hire</a>
    </div>
  </section>
```

- [ ] **Step 2: Add the specs-render JS**

In the inline script, replace the line:

```js
      /* Task 5 adds: tech specs rendering */
```

with:

```js
      /* tech specs table, rendered from data.js */
      var dl = document.getElementById('specList');
      function specRow(k, v, gold) {
        var div = document.createElement('div');
        div.className = 'spec-row' + (gold ? ' spec-gold' : '');
        var dt = document.createElement('dt');
        dt.textContent = k;
        var dd = document.createElement('dd');
        dd.textContent = v;
        div.appendChild(dt);
        div.appendChild(dd);
        dl.appendChild(div);
      }
      if (dl && V.skills) {
        specRow('Chip', V.education[0].school + ' — ' + V.education[0].degree);
        Object.keys(V.skills).forEach(function (k) {
          specRow(k, V.skills[k].join(' · '));
        });
        specRow('In the box', V.experience.map(function (e) { return e.title + ' — ' + e.org; }).join('   ·   '));
        specRow('Awards', 'Best Hack for Good — Hack RenderATL  ·  1st Place — Actian VectorAI Build Challenge', true);
        specRow('Battery', 'Muay Thai, travel, videography, good food.');
      }
```

- [ ] **Step 3: Add the mobile stack rule for spec rows**

In the `@media (max-width: 1100px)` block of the CSS (added in Task 3), add as the last rule inside the block:

```css
      .spec-row { grid-template-columns: 1fr; gap: 0.25rem; }
```

- [ ] **Step 4: Verify in browser**

Playwright-check `http://localhost:8123/`:
- Specs section lists: Chip row (Georgia Tech), all 7 skills categories, In the box (both experience entries), gold Awards row, Battery row.
- Closing band shows "Pick it up." with working `Try it →` (→ phone.html) and `Hire` (mailto).
- Skip-link target `#specs` exists. At 390px wide, spec rows stack label-over-value.
- No console errors.

- [ ] **Step 5: Commit**

```bash
cd .worktrees/apple-launch
git add index.html
git commit -m "index: tech specs from data.js + pick-it-up closing band"
```

---

### Task 6: The seamless handoff into phone.html

**Files:**
- Modify: `index.html` (takeoff JS)
- Modify: `phone.html` (view-transition opt-in, one small style insert before `</head>`)

- [ ] **Step 1: Add the takeoff JS to index.html**

In the inline script, replace the line:

```js
      /* Task 6 adds: try-it takeoff handoff */
```

with:

```js
      /* try-it takeoff: scale the phone up, fade to black, hand off to phone.html.
         View Transitions API (opted in via CSS) morphs the mock into the real phone
         where supported; the manual takeoff below is the everywhere-fallback. */
      function takeoff(e) {
        try { sessionStorage.setItem('fromLaunch', '1'); } catch (err) {}
        if (reduced) return; // plain navigation, flag still set
        e.preventDefault();
        document.body.classList.add('takeoff');
        setTimeout(function () { window.location.href = 'phone.html'; }, 520);
      }
      document.querySelectorAll('[data-tryit]').forEach(function (a) {
        a.addEventListener('click', takeoff);
      });
      if (mock) {
        mock.addEventListener('click', takeoff);
      }
```

(`mock` is already defined by Task 4's code above this block.)

- [ ] **Step 2: Opt phone.html into the view transition**

In `phone.html`, find the single occurrence of:

```html
  </style>
</head>
```

and replace it with:

```html
  </style>
  <style>
    /* Cross-document morph from the launch page: the landing mock and this phone
       share a view-transition-name, so supporting browsers animate one into the other. */
    @view-transition { navigation: auto; }
    .phone { view-transition-name: phone; }
  </style>
</head>
```

- [ ] **Step 3: Verify the handoff in browser**

Playwright-check (Chromium supports cross-document view transitions):
- On `http://localhost:8123/`, click `Try it →`: the mock scales up while the page fades to black, then phone.html appears already on its lock screen with NO accent flood flash (the `fromLaunch` flag suppresses `void-enter` — Task 2's void.js).
- Click the mock phone itself: same handoff.
- Reload `http://localhost:8123/phone.html` directly (no flag): the blue accent flood still plays — direct visits keep their entrance.
- Emulate `prefers-reduced-motion: reduce` and click Try it: plain instant navigation, no animation, no errors.
- No console errors on either page.

- [ ] **Step 4: Commit**

```bash
cd .worktrees/apple-launch
git add index.html phone.html
git commit -m "handoff: try-it takeoff with cross-document view transition into phone.html"
```

---

### Task 7: README, final sweep

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README.md**

Read `README.md`. Replace its description of the site structure (the hallway/5-doors/rooms list — however it's currently phrased) with:

```markdown
## Structure

- `index.html` — Apple-style launch page for the phone: hero, sticky-phone scroll story, tech specs from `shared/data.js`, and a seamless "Try it" handoff.
- `phone.html` — the product: a working iPhone (lock screen, iMessage thread that composes real email, Photos, project apps).
- `classic.html` — the classic one-page portfolio; the quick view for recruiters.
- `archive/` — retired rooms (terminal, retro Windows, arcade). Still deployed, just unlinked.
- `shared/data.js` — single source of truth for all content. Edit once; every page updates.
- `shared/void.js` / `void.css` — page transitions + the `‹ vinhle.xyz` corner link.
```

Keep the rest of the README (title, deployment notes, etc.) intact unless it references the five doors — update any such sentence to match the new structure.

- [ ] **Step 2: Full-site verification sweep**

With the local server running, Playwright-check every page:

| URL | Checks |
|---|---|
| `/` | hero, scroll story, specs, closing, footer; no console errors; screenshots at 1440×900 and 390×844 |
| `/phone.html` | loads, lock screen, `‹ vinhle.xyz` hatch → index.html |
| `/classic.html` | unchanged content, hatch reads `‹ vinhle.xyz` |
| `/archive/terminal.html` | shell works, no 404s, hatch → `../index.html` |
| `/archive/retro.html` | Bliss wallpaper, My Pictures thumbnails load, Start-menu room links resolve to `../phone.html` / `../classic.html` |
| `/archive/game.html` | town renders, in-game classic links → `../classic.html` |

Also confirm: `grep -rn "terminal.html\|retro.html\|game.html" index.html classic.html phone.html shared/` returns nothing (no live page links to archived rooms).

- [ ] **Step 3: Commit**

```bash
cd .worktrees/apple-launch
git add README.md
git commit -m "docs: README reflects launch-page structure and archived rooms"
```

---

## Done criteria

Every task committed on `apple-launch`; local Playwright sweep clean. Merging/pushing is a separate decision — use superpowers:finishing-a-development-branch (Vinh pushes to production himself; GitHub Pages deploys from `main`).
