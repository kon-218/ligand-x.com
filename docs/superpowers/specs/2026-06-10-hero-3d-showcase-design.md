# Hero 3D Showcase — Design Spec

**Date:** 2026-06-10  
**Status:** Approved  

---

## Overview

Replace the existing hero section in `home.jsx` with a full-viewport hero that features a live, interactive 3D molecular viewer as the dominant visual. Text left, viewer right (Schrödinger-style layout). Three structures cycle via a swipe/drag gesture — a unique differentiator vs. competitors who use static images.

---

## Layout

- **Full viewport height** (`100vh`, min 520px, max 700px)
- **Text block** — left half, `max-width: 440px`, `padding-left: 44px`
- **Viewer panel** — right 52% of the hero, absolutely positioned
- **Nav bar** — `position: absolute`, dark frosted glass (`backdrop-filter: blur`)
- **Background** — dark gradient `#05080d → #071410`, subtle teal atmospheric glow bottom-right via `::after` pseudo-element

### Text block content
- Eyebrow: `"Free · self-hosted · open-source"` — teal mono, with `::before` line decoration
- Headline: `"Your own CADD workbench."` — `"CADD"` in `<em>` coloured `#4dbfb3`
- Tagline: `"Protein prep, docking, MD, and more — on your hardware, under your control."`
- CTAs: `"Download free"` (primary teal) + `"View docs →"` (ghost)

---

## 3D Viewer

### Library
**3Dmol.js** loaded from CDN. Lightweight (~500 KB), no backend needed, loads PDB directly from RCSB by accession code.

### Structure source
**EGFR kinase domain · PDB 4W52** — fetched from `https://files.rcsb.org/download/4W52.pdb` on page load.

### Three states

| # | Name | Representation | Default |
|---|------|---------------|---------|
| 1 | Protein | Cartoon ribbon, colour `#2a9d8f` (teal) | No |
| 2 | Complex | Cartoon protein (teal) + stick ligand (gold) + H-bond dashes | **Yes** |
| 3 | Ligand | Stick/sphere erlotinib only, atoms colour-coded in gold palette | No |

**State 2 is the default** — it is the most scientifically meaningful view and communicates the tool's purpose instantly.

**Protein rendering:** `viewer.setStyle({chain: protein chains}, {cartoon: {color: '#2a9d8f'}})`  
**Ligand rendering:** `viewer.setStyle({resn: 'AQ4'}, {stick: {colorscheme: 'goldCarbon'}})` — erlotinib is residue `AQ4` in 4W52.  
**H-bonds:** Drawn as dashed cylinders via `viewer.addCylinder()` between known donor/acceptor atom pairs. Colour `#ead8b8`, opacity 0.5. Atom pairs are hardcoded from the known erlotinib–EGFR crystal contacts.  
**Ligand-only state:** Hide all protein chains (`viewer.setStyle({chain: 'A'}, {})`) and enlarge the ligand (`sphere` + `stick` combo).

### Viewer config
```js
const viewer = $3Dmol.createViewer(container, {
  backgroundColor: 'transparent',
  antialias: true,
  id: 'hero-viewer'
});
```
Container is a `div` sized to fill the right panel. `background: transparent` lets the hero gradient show through.

---

## Interaction mechanic

### Drag to rotate
Event listeners are added directly to the 3Dmol canvas element (or its container). 3Dmol handles rotation natively on drag — we do not block or override it. We only intercept `mouseup`/`touchend` to evaluate whether the gesture was a swipe.

### Swipe to switch structure
On `mouseup` / `touchend`, evaluate the gesture:
- **Threshold:** horizontal displacement `> 80px` OR drag speed `> 0.5 px/ms`
- **Left swipe** → next structure (wraps: 3 → 1)
- **Right swipe** → previous structure (wraps: 1 → 3)
- If threshold not met → treat as a rotation, no structure change

Transition between structures: CSS `opacity` crossfade (`transition: opacity 0.45s ease`). The incoming structure fades in while the outgoing fades out simultaneously.

### Dot indicators
Three dots at the bottom of the viewer, vertically centred. Teal active state (`#2a9d8f` fill + glow), dark inactive. Clicking a dot jumps directly to that structure. Dots are outside the drag overlay so they receive click events normally.

### Structure badge
Small monospace label top-right of the viewer area, e.g. `"Complex · erlotinib · 4W52"`. Updates on every structure change. Teal text, dark bordered pill.

### Drag hint
Below the dots: `"← drag to rotate · swipe to switch →"` in mono, muted teal colour. Fades out after 4 seconds on first interaction.

---

## Colour palette

All colours are already defined in `styles.css` CSS variables:

| Role | Colour | CSS var / source |
|------|--------|-----------------|
| Protein ribbons | `#2a9d8f` / `#1f7a72` / `#4dbfb3` | `--accent`, `--accent-strong`, hero `em` |
| Ligand atoms (primary) | `#c8922a` | derived from gold system |
| Ligand atoms (light) | `#ead8b8` | pro card border |
| Ligand atoms (dark) | `#9a6700` | pro badge text |
| H-bond dashes | `#ead8b8` at 30% opacity | — |
| CTA button | `#2a9d8f` | `--accent` |
| Eyebrow / badge | `#2a9d8f` | `--accent` |
| Dot (active) | `#2a9d8f` | `--accent` |
| Hero background | `#05080d` | dark hero base |
| Headline em | `#4dbfb3` | existing `.hero-b em` |

---

## Files changed

| File | Change |
|------|--------|
| `ligand-x-assets/home.jsx` | Replace `HeroSection` component with new `HeroShowcase` |
| `index.html` | Add 3Dmol.js CDN `<script>` tag before existing scripts |
| `ligand-x-assets/styles.css` | Add `.hero-showcase` styles (viewer sizing, dot styles, badge, hint) |

No new files need to be created. Everything is additive to the existing single-page static site.

---

## Constraints

- **Fully static** — no backend, no build step. 3Dmol.js and PDB fetch are the only new network requests.
- **CDN fallback** — if the RCSB fetch fails (offline/slow), show a CSS placeholder animation and hide the badge.
- **Mobile** — on viewports < 768px, stack layout vertically (viewer above text). Touch swipe works via `touchstart`/`touchend` events already included in the mechanic.
- **Performance** — 3Dmol.js is loaded with `defer`. The PDB file (~500 KB) is fetched once and cached by the browser.

---

## Out of scope

- Replacing any other section (workflow story, features, Pro section, download)
- Backend/API integration
- Animating the molecule automatically (no auto-spin)
- Adding more than 3 structures to the switcher
