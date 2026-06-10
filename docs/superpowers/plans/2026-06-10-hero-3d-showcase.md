# Hero 3D Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `HomeHero` component with a full-viewport dark hero featuring a live 3Dmol.js viewer of EGFR 4W52, switchable between protein, complex, and ligand-only views via drag swipe.

**Architecture:** 3Dmol.js is loaded as a plain CDN `<script>` tag (available before React mounts). A `useEffect` in `HeroShowcase` creates the viewer, downloads 4W52 from RCSB, and applies one of three `setStyle` presets. Swipe detection runs on `mouseup`/`touchend` events on the viewer container — 3Dmol handles rotation natively on its own canvas events. Structure switching crossfades via CSS `opacity` transition.

**Tech Stack:** React 18 (CDN/Babel, no build step), 3Dmol.js v2 (CDN), CSS transitions, vanilla JS gesture detection.

---

### Task 1: Add 3Dmol.js CDN script to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the script tag**

Open `index.html`. On line 25 (immediately before the React CDN `<script>` tags), add:

```html
<script src="https://3dmol.org/build/3Dmol-min.js"></script>
```

The surrounding block should look like:

```html
  <script src="https://3dmol.org/build/3Dmol-min.js" integrity="sha384-jNVrIfISjVoQoaV1PRW7Z0GIgqyxYVNEKpTfz5Sn/+z8/XXuNRr43E0h+0aU+Cwv" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
```

Do NOT add `defer` — 3Dmol must be available synchronously, before Babel processes the JSX.

> **SRI note:** The hash above was computed from the current `3Dmol-min.js` build. If you upgrade 3Dmol.js in future, recompute it with:
> ```bash
> curl -s "https://3dmol.org/build/3Dmol-min.js" | openssl dgst -sha384 -binary | openssl base64 -A
> ```
> and update the `integrity` attribute.

- [ ] **Step 2: Verify 3Dmol loads**

Serve the site locally:

```bash
cd /home/konstantin-nomerotski/Documents/website/ligand-x
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. Open DevTools console and run:

```js
typeof $3Dmol
```

Expected output: `"object"`

If you see `"undefined"`: check the Network tab for a failed request to `3dmol.org`. Try the minified URL: `https://3dmol.org/build/3Dmol-min.js`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add 3Dmol.js CDN script for hero viewer"
```

---

### Task 2: Add hero-showcase CSS

**Files:**
- Modify: `ligand-x-assets/styles.css`
- Modify: `index.html` (version bump)

- [ ] **Step 1: Append styles to styles.css**

Add the following block at the very end of `ligand-x-assets/styles.css`:

```css
/* ── Hero Showcase (3D viewer hero) ── */
.hero-showcase {
  position: relative;
  min-height: calc(100svh - 56px);
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #05080d 0%, #071410 55%, #080a0e 100%);
  overflow: hidden;
}
.hero-showcase::after {
  content: '';
  position: absolute;
  right: -10%;
  bottom: -20%;
  width: 60%;
  height: 70%;
  background: radial-gradient(ellipse, #2a9d8f08 0%, transparent 65%);
  pointer-events: none;
}
.hero-showcase-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 44px 60px;
}
.hero-showcase-copy {
  max-width: 440px;
}
.hero-showcase-copy .eyebrow {
  color: #2a9d8f;
  display: flex;
  align-items: center;
  gap: 0;
}
.hero-showcase-copy .eyebrow::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 1px;
  background: #2a9d8f;
  margin-right: 10px;
  flex-shrink: 0;
}
.hero-showcase-copy h1 {
  margin-top: 16px;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 700;
  color: #f1f5f9;
}
.hero-showcase-copy h1 em {
  color: #4dbfb3;
  font-style: normal;
}
.hero-showcase-copy .hero-lede {
  color: #7a8f87;
  font-size: 15px;
  line-height: 1.65;
  margin: 16px 0 32px;
}
.hero-showcase-copy .btn-primary {
  background: #2a9d8f;
  color: #fff;
  border-color: #2a9d8f;
}
.hero-showcase-copy .btn-primary:hover {
  background: #1f7a72;
  border-color: #1f7a72;
}
.hero-showcase-copy .btn-secondary {
  background: transparent;
  border-color: #1a2820;
  color: #7a8f87;
}
.hero-showcase-copy .btn-secondary:hover {
  border-color: #2a9d8f;
  color: #4dbfb3;
}
.hero-viewer-panel {
  position: relative;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-viewer-container {
  width: 100%;
  height: 100%;
  transition: opacity 0.35s ease;
}
.hero-viewer-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-viewer-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #1a3530;
  border-top-color: #2a9d8f;
  animation: hero-spin 0.9s linear infinite;
}
@keyframes hero-spin { to { transform: rotate(360deg); } }
.hero-struct-badge {
  position: absolute;
  top: 16px;
  right: 12px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: #2a9d8f;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: rgba(5, 8, 13, 0.85);
  border: 1px solid #1a2820;
  border-radius: 4px;
  padding: 4px 10px;
  pointer-events: none;
  backdrop-filter: blur(4px);
}
.hero-dot-bar {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
.hero-dot-row {
  display: flex;
  gap: 10px;
  pointer-events: all;
}
.hero-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid #1a3530;
  background: #0e1e1a;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  padding: 0;
}
.hero-dot.active {
  background: #2a9d8f;
  border-color: #4dbfb3;
  box-shadow: 0 0 8px #2a9d8f66;
}
.hero-dot:hover:not(.active) {
  border-color: #2a9d8f;
}
.hero-drag-hint {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #2a3d38;
  letter-spacing: 1px;
  transition: opacity 0.5s;
  pointer-events: none;
  white-space: nowrap;
}
.hero-drag-hint.hidden {
  opacity: 0;
}
@media (max-width: 768px) {
  .hero-showcase-inner {
    grid-template-columns: 1fr;
    padding: 80px 24px 40px;
  }
  .hero-viewer-panel {
    height: 340px;
    order: -1;
  }
  .hero-showcase-copy {
    max-width: 100%;
  }
}
```

- [ ] **Step 2: Bump version strings in index.html**

In `index.html`, change every occurrence of `?v=20260609a` to `?v=20260610a`. There are references on lines 23 (styles.css) and lines 36–45 (the JSX scripts). Update all of them:

```html
<link rel="stylesheet" href="/ligand-x-assets/styles.css?v=20260610a" />
```

```html
<script type="text/babel" src="/ligand-x-assets/tweaks-panel.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/shared.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/home.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/features.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/pro.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/contact.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/api-reference.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/docs.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/download.jsx?v=20260610a"></script>
<script type="text/babel" src="/ligand-x-assets/app.jsx?v=20260610a"></script>
```

- [ ] **Step 3: Commit**

```bash
git add ligand-x-assets/styles.css index.html
git commit -m "feat: add hero-showcase CSS and bump asset version strings"
```

---

### Task 3: Implement applyStructure helper

**Files:**
- Modify: `ligand-x-assets/home.jsx` — insert before line 145 (the `HomeHero` definition)

- [ ] **Step 1: Verify erlotinib residue name in 4W52**

Before writing the renderer, confirm the ligand residue name. Fetch the PDB:

```bash
curl -s "https://files.rcsb.org/download/4W52.pdb" | grep "^HETATM" | awk '{print $4}' | sort -u
```

Expected output includes `AQ4` (erlotinib), `HOH` (water), and possibly `EDO`/`GOL` (cryoprotectants). If the ligand is named something other than `AQ4`, update all `resn: 'AQ4'` references in the next step accordingly.

- [ ] **Step 2: Add the applyStructure function**

In `home.jsx`, insert the following directly above the `MoleculeScene` definition (before line 98):

```jsx
function applyStructure(viewer, index) {
  const nonLigand = { not: { resn: ['AQ4', 'HOH', 'EDO', 'GOL'] } };
  const ligand    = { resn: 'AQ4' };

  if (index === 0) {
    // Protein only — teal cartoon ribbon
    viewer.setStyle(nonLigand, { cartoon: { color: '#2a9d8f', opacity: 1 } });
    return;
  }

  if (index === 1) {
    // Complex — teal protein + gold ligand + optional H-bonds
    viewer.setStyle(nonLigand, { cartoon: { color: '#2a9d8f', opacity: 1 } });
    viewer.setStyle(ligand, {
      stick:  { color: '#c8922a', radius: 0.18 },
      sphere: { color: '#c8922a', radius: 0.32 },
    });
    if (typeof viewer.addHBonds === 'function') {
      viewer.addHBonds(ligand, nonLigand, {
        color: '#ead8b8', opacity: 0.45, dashed: true,
      });
    }
    return;
  }

  if (index === 2) {
    // Ligand only — gold sticks/spheres, zoomed in
    viewer.setStyle(ligand, {
      stick:  { color: '#c8922a', radius: 0.22 },
      sphere: { color: '#c8922a', radius: 0.45 },
    });
    viewer.zoomTo(ligand);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add ligand-x-assets/home.jsx
git commit -m "feat: add applyStructure helper for 3 hero viewer states"
```

---

### Task 4: Build HeroShowcase component and wire into HomePage

**Files:**
- Modify: `ligand-x-assets/home.jsx`

- [ ] **Step 1: Add HERO_STRUCTURES constant**

Directly below the `applyStructure` function (after Task 3's addition), add:

```jsx
const HERO_STRUCTURES = [
  { label: 'Protein · EGFR · 4W52',     key: 'protein' },
  { label: 'Complex · erlotinib · 4W52', key: 'complex' },
  { label: 'Ligand · erlotinib',         key: 'ligand'  },
];
const HERO_DEFAULT = 1;
```

- [ ] **Step 2: Replace HomeHero with HeroShowcase**

Delete the entire `HomeHero` function (currently lines 145–187). Replace it with:

```jsx
const HeroShowcase = () => {
  const viewerRef  = React.useRef(null);
  const viewer3d   = React.useRef(null);
  const dragStart  = React.useRef(null);
  const hintTimer  = React.useRef(null);
  const [current, setCurrent] = React.useState(HERO_DEFAULT);
  const [loading,  setLoading]  = React.useState(true);
  const [hintOn,   setHintOn]   = React.useState(true);

  // Init viewer and load PDB once on mount
  React.useEffect(() => {
    if (!viewerRef.current || typeof $3Dmol === 'undefined') return;

    const viewer = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'transparent',
      antialias: true,
    });
    viewer3d.current = viewer;

    $3Dmol.download('pdb:4W52', viewer, {}, () => {
      viewer.setStyle({}, {});
      applyStructure(viewer, HERO_DEFAULT);
      viewer.zoomTo();
      viewer.render();
      setLoading(false);
    });

    // Gesture detection — 3Dmol handles rotation natively;
    // we only check at mouseup/touchend whether a swipe occurred.
    const el = viewerRef.current;

    const onDown = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      dragStart.current = { x, t: Date.now() };
    };
    const onUp = (e) => {
      if (!dragStart.current) return;
      const x  = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = x - dragStart.current.x;
      const dt = Date.now() - dragStart.current.t;
      dragStart.current = null;
      const isSwipe = Math.abs(dx) > 80 || (dt > 0 && Math.abs(dx) / dt > 0.5);
      if (isSwipe) {
        setCurrent(prev =>
          dx < 0
            ? (prev + 1) % HERO_STRUCTURES.length
            : (prev + HERO_STRUCTURES.length - 1) % HERO_STRUCTURES.length
        );
        setHintOn(false);
      }
    };

    el.addEventListener('mousedown',  onDown);
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend',   onUp);

    hintTimer.current = setTimeout(() => setHintOn(false), 4000);

    return () => {
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend',   onUp);
      clearTimeout(hintTimer.current);
    };
  }, []);

  // Re-render whenever the active structure changes
  React.useEffect(() => {
    if (!viewer3d.current || loading) return;
    const v   = viewer3d.current;
    const el  = viewerRef.current;
    el.style.opacity = '0';
    setTimeout(() => {
      v.setStyle({}, {});
      v.removeAllShapes();
      applyStructure(v, current);
      v.render();
      el.style.opacity = '1';
    }, 180);
  }, [current, loading]);

  return (
    <section className="hero-showcase">
      <div className="hero-showcase-inner">

        <div className="hero-showcase-copy">
          <div className="eyebrow">Free · self-hosted · open-source</div>
          <h1>Your own <em>CADD</em><br />workbench.</h1>
          <p className="hero-lede">
            Protein prep, docking, MD, and more —<br />
            on your hardware, under your control.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => window.__nav('download')}>
              <Icon name="download" size={16} />
              Download free
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => window.__nav('docs')}>
              View docs
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>

        <div className="hero-viewer-panel">
          {loading && (
            <div className="hero-viewer-loading">
              <div className="hero-viewer-spinner" />
            </div>
          )}
          <div
            ref={viewerRef}
            className="hero-viewer-container"
            style={{ opacity: loading ? 0 : 1 }}
          />
          {!loading && (
            <div className="hero-struct-badge">
              {HERO_STRUCTURES[current].label}
            </div>
          )}
          <div className="hero-dot-bar">
            <div className="hero-dot-row">
              {HERO_STRUCTURES.map((s, i) => (
                <button
                  key={s.key}
                  className={'hero-dot' + (i === current ? ' active' : '')}
                  onClick={() => setCurrent(i)}
                  aria-label={s.label}
                />
              ))}
            </div>
            <div className={'hero-drag-hint' + (hintOn ? '' : ' hidden')}>
              ← drag to rotate · swipe to switch →
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
```

- [ ] **Step 3: Update HomePage to use HeroShowcase**

Find the `HomePage` function (near line 483 after your edits). Change `<HomeHero />` to `<HeroShowcase />`:

```jsx
const HomePage = () => (
  <div className="page-fade">
    <HeroShowcase />
    <CredibilityBand />
    ...
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080`. Expected behaviour:

1. Dark hero renders with IBM Plex text on the left.
2. Teal spinner appears on the right while 4W52 downloads from RCSB (~1–3s on a normal connection).
3. Spinner is replaced by the 3D molecule. Default view is the complex (teal protein + gold ligand). Badge reads `"Complex · erlotinib · 4W52"`.
4. Three dots visible at the bottom of the viewer, middle dot is active teal.
5. Drag hint text visible, fades after 4 seconds.
6. All sections below the hero still render (CredibilityBand, PainValue, Workflow, etc.).

If the molecule doesn't appear after 5+ seconds: check DevTools Network tab for the RCSB request (`files.rcsb.org/download/4W52.pdb`). If blocked by CORS or network, try loading the page via a local server (not `file://`).

If you see a console error `$3Dmol is not defined`: 3Dmol.js failed to load — check the script tag in `index.html`.

- [ ] **Step 5: Commit**

```bash
git add ligand-x-assets/home.jsx
git commit -m "feat: replace HomeHero with HeroShowcase 3D viewer component"
```

---

### Task 5: Manual verification of all interactions

**Files:** No code changes.

- [ ] **Step 1: Test three structure states**

Open `http://localhost:8080`. With the molecule loaded:

| Action | Expected |
|--------|----------|
| Click dot 1 (left) | Protein only — teal cartoon, no ligand. Badge: `Protein · EGFR · 4W52`. |
| Click dot 2 (middle) | Complex — teal ribbon + gold ligand sticks. Badge: `Complex · erlotinib · 4W52`. |
| Click dot 3 (right) | Ligand only — gold ligand zoomed in, no protein. Badge: `Ligand · erlotinib`. |
| Click dot 2 again | Returns to complex. Viewer crossfades (opacity dip visible). |

- [ ] **Step 2: Test swipe gesture**

| Gesture | Expected |
|---------|----------|
| Click and drag left > 80px | Switches to next structure (wraps 3→1). |
| Click and drag right > 80px | Switches to previous structure (wraps 1→3). |
| Short slow drag < 80px | Rotates molecule only — no structure switch. |
| Fast short drag (< 80px but speed > 0.5px/ms) | Switches structure. |

- [ ] **Step 3: Test mobile layout**

In DevTools, enable device emulation at 390px width (iPhone 14 size). Expected:
- Viewer panel appears above the text block (order: -1).
- Viewer height is 340px.
- Text block spans full width.
- CTAs are reachable without horizontal scrolling.

- [ ] **Step 4: Test loading fallback**

In DevTools Network tab, set throttle to "Slow 3G". Reload the page. Expected:
- Spinner shows and persists for several seconds.
- Once the PDB loads, spinner disappears and molecule appears.
- No console errors during the wait.

---

### Task 6: Push to GitHub and confirm deployment

**Files:** No code changes.

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

- [ ] **Step 2: Watch GitHub Actions**

Go to `https://github.com/kon-218/ligand-x.com/actions`. The "Deploy static site to GitHub Pages" workflow should trigger. Wait for it to complete (usually 1–2 minutes).

- [ ] **Step 3: Verify on live site**

Open `https://www.ligand-x.com` in a fresh private window. Verify:
- [ ] Dark hero renders (not the old light hero)
- [ ] 3D molecule loads and is interactive
- [ ] Swipe and dot switching work
- [ ] Page loads without console errors
- [ ] All other sections intact below the hero
