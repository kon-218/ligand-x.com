// ============================================================
// HomePage - product-led Ligand-X overview
// ============================================================

const CORE_CAPABILITIES = [
  { name: "Project workspace", decision: "Keep assets tied to one experiment" },
  { name: "Molecule library", decision: "Track ligands, formats, and generated molecules" },
  { name: "Ketcher editing", decision: "Draw, edit, import, and export chemical structures" },
  { name: "Mol* viewing", decision: "Review proteins, complexes, pockets, and poses" },
  { name: "Protein cleaning", decision: "Prepare raw structures for modeling" },
  { name: "Pocket finding", decision: "Identify candidate binding sites" },
  { name: "Docking", decision: "Screen ligands and compare poses" },
  { name: "MD", decision: "Move promising complexes into simulation" },
  { name: "MSA/alignment", decision: "Add sequence context around targets" },
];

const CORE_LABELS = [
  "Project workspace", "Molecule library", "Ketcher editing", "Mol* viewing", "Protein cleaning",
  "Pocket finding", "Docking", "MD", "MSA/alignment",
];

const HOME_PRO_MODULES = [
  { name: "QC", decision: "Electronic properties, charges, Fukui indices, and frequencies" },
  { name: "ADMET", decision: "Property and liability screening" },
  { name: "Boltz-2", decision: "Structure and affinity prediction" },
  { name: "ABFE/RBFE", decision: "Binding free-energy prioritization" },
  { name: "GenAI", decision: "Generative design and optimization" },
];

const STORY_STAGES = [
  {
    n: "01",
    eyebrow: "Create a project",
    title: "Start with a persistent workspace, not another folder tree.",
    text: "Import proteins, ligands, structures, and generated assets into one project so the experiment has a durable record from the first file onward.",
    points: ["Project-scoped proteins, molecules, pockets, jobs, and outputs", "Ketcher editing with SMILES, SDF, and PDB import/export", "Mol* review for proteins, complexes, pockets, and poses"],
    annotType: "files",
    annotValue: "project.json · 1M17.pdb · leads.sdf",
    cli: "lx new && lx import …",
  },
  {
    n: "02",
    eyebrow: "Prepare the target",
    title: "Turn raw structures into modeling-ready systems.",
    text: "Clean proteins, detect components, handle waters, ions, metals, and ligands, find pockets, and align sequences before the calculation starts.",
    points: ["PDB, mmCIF, SDF, and SMILES-to-3D handling", "Protein cleanup and component detection", "Pocket finding plus pairwise and multiple-sequence alignment"],
    annotType: "outputs",
    annotValue: "cleaned.pdb · pockets[] · alignment",
    cli: "lx prep --align --pockets",
  },
  {
    n: "03",
    eyebrow: "Screen and simulate",
    title: "Move from docked poses to MD trajectories without leaving the app.",
    text: "Dock ligands, review ranked poses, inspect interactions, run MD, and track jobs through the same local workspace.",
    points: ["AutoDock Vina docking with receptor and ligand preparation", "Batch results, affinity scores, interactions, and pose downloads", "OpenMM minimization, equilibration, trajectories, checkpoints, and analytics"],
    annotType: "outputs",
    annotValue: "poses[] · scores · trajectory.dcd",
    cli: "lx dock && lx md",
  },
  {
    n: "04",
    eyebrow: "Prioritize with Pro",
    title: "Add advanced modules when the project needs stronger decisions.",
    text: "Licensed Pro services extend the same workflow with property risk, binding confidence, design expansion, and mechanistic insight.",
    points: ["QC and ADMET for property risk", "Boltz-2, ABFE, and RBFE for binding confidence", "GenAI workflows for design expansion"],
    annotType: "inputs",
    annotValue: "license key · target.pdb · ligand.sdf",
    cli: "lx pro boltz · lx pro abfe",
    pro: true,
  },
];

const SERVICES = [
  { name: "Jobs survive refreshes", detail: "restart the page without losing the run" },
  { name: "Live progress on every run", detail: "watch setup, execution, and outputs update" },
  { name: "One project record", detail: "inputs, jobs, and results stay connected" },
  { name: "Your own CPU/GPU", detail: "use the hardware you already control" },
  { name: "Desktop or server", detail: "same workflow for local and headless installs" },
  { name: "No managed cloud", detail: "keep structures and results on your machine" },
];

const USE_CASES = [
  {
    title: "Academic lab",
    text: "Run teaching, docking, MD, and local project workflows without managed cloud infrastructure.",
  },
  {
    title: "Startup discovery team",
    text: "Keep early target and ligand work private while standardizing project assets and computational jobs.",
  },
  {
    title: "Computational chemist",
    text: "Move from cleaned structures to docked poses to MD trajectories without manually stitching tools together.",
  },
];

// Hero viewer uses the real Mol* engine (same library + representation
// recipe as the Ligand-X app). 1M17 = EGFR kinase with erlotinib (AQ4).
const HERO_PDB_URL = 'https://files.rcsb.org/download/1M17.pdb';
const HERO_CARBON  = 0x2a9d8f; // brand teal for ligand carbons (element-symbol theme)
const HERO_CHAIN   = 'A';
const HERO_RESI    = [696, 944]; // kinase domain core — crops the floppy terminal tails
const HERO_LIGAND  = 'AQ4';      // erlotinib

// Keep only the folded kinase core (chain A, 696-944) + the ligand, dropping
// waters, ions, other chains, and the disordered termini that read as
// "unfolded" trailing strands. Mirrors the prior 3Dmol hero crop.
function cleanHeroPdb(text) {
  const [lo, hi] = HERO_RESI;
  const out = [];
  for (const line of text.split('\n')) {
    const rec = line.slice(0, 6);
    if (rec === 'ATOM  ') {
      const chain = line[21];
      const resSeq = parseInt(line.slice(22, 26), 10);
      if (chain === HERO_CHAIN && resSeq >= lo && resSeq <= hi) out.push(line);
    } else if (rec === 'HETATM') {
      if (line.slice(17, 20).trim() === HERO_LIGAND) out.push(line);
    } else if (rec.startsWith('CRYST') || rec.startsWith('SCALE')) {
      out.push(line);
    }
  }
  out.push('END');
  return out.join('\n');
}

const HERO_STRUCTURES = [
  { label: 'Protein · EGFR · 1M17',     key: 'protein' },
  { label: 'Complex · erlotinib · 1M17', key: 'complex' },
  { label: 'Ligand · erlotinib',         key: 'ligand'  },
];
const HERO_DEFAULT = 1;

const MoleculeScene = () => (
  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 400 }}>
    <svg viewBox="0 0 560 560" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="hero-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7BCAB8" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#E8F5F2" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F5F3ED" stopOpacity="0" />
        </radialGradient>
        <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(14,138,126,0.10)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="560" fill="url(#hero-grid)" />
      <circle cx="280" cy="280" r="240" fill="url(#hero-aura)" />
      <g transform="translate(280 280)">
        <circle r="200" fill="none" stroke="#0E8A7E" strokeOpacity="0.16" strokeWidth="38" />
        <circle r="160" fill="none" stroke="#0E8A7E" strokeOpacity="0.22" strokeWidth="6" strokeDasharray="2 6" />
        <path d="M -180 30 a 180 180 0 0 1 320 -80" fill="none" stroke="#0E8A7E" strokeWidth="9" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M 160 -80 a 180 180 0 0 1 -10 230" fill="none" stroke="#0a6b61" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.55" />
        <path d="M -100 130 a 140 140 0 0 1 0 -190" fill="none" stroke="#0a6b61" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.55" />
        <line x1="-22" y1="14" x2="14" y2="-6" stroke="#0E1412" strokeWidth="3" />
        <line x1="14" y1="-6" x2="34" y2="22" stroke="#0E1412" strokeWidth="3" />
        <line x1="14" y1="-6" x2="42" y2="-32" stroke="#0E1412" strokeWidth="3" />
        <line x1="-22" y1="14" x2="-44" y2="-16" stroke="#0E1412" strokeWidth="3" />
        <line x1="-44" y1="-16" x2="-72" y2="6" stroke="#0E1412" strokeWidth="3" />
        <line x1="34" y1="22" x2="60" y2="46" stroke="#0E1412" strokeWidth="3" />
        <circle cx="-22" cy="14" r="10" fill="#0E1412" />
        <circle cx="14" cy="-6" r="10" fill="#0E1412" />
        <circle cx="34" cy="22" r="9" fill="#c44b3a" />
        <circle cx="42" cy="-32" r="9" fill="#3a73c4" />
        <circle cx="-44" cy="-16" r="9" fill="#0E1412" />
        <circle cx="-72" cy="6" r="8" fill="#c44b3a" />
        <circle cx="60" cy="46" r="8" fill="#0E1412" />
      </g>
      <g fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#7a8480">
        <line x1="430" y1="180" x2="370" y2="220" stroke="#b0b8b5" strokeWidth="1" />
        <text x="436" y="184">pocket A</text>
        <line x1="120" y1="380" x2="200" y2="320" stroke="#b0b8b5" strokeWidth="1" />
        <text x="40" y="396">&#x2212;9.4 kcal/mol</text>
        <line x1="430" y1="430" x2="350" y2="370" stroke="#b0b8b5" strokeWidth="1" />
        <text x="436" y="434">trajectory · 5 ns</text>
      </g>
    </svg>
  </div>
);

const HeroShowcase = () => {
  const viewerRef    = React.useRef(null);   // Mol* canvas container
  const pluginRef    = React.useRef(null);   // Mol* PluginContext
  const sceneRef     = React.useRef(null);   // { molstar, polymer, ligand, *Data }
  const idleTimer    = React.useRef(null);
  const touched      = React.useRef(false);
  const lastSpinDirection = React.useRef(1);
  const dragSample = React.useRef(null);
  const [current, setCurrent] = React.useState(HERO_DEFAULT);
  const [loading, setLoading] = React.useState(true);
  const [failed,  setFailed]  = React.useState(false);
  const [hintOn,  setHintOn]  = React.useState(true);
  const [promptOn, setPromptOn] = React.useState(false);

  // Show / hide representations + reframe the camera for each switcher state.
  // Visibility is driven by representation opacity (alpha 0/1), the same
  // mechanism the app's toggleComponentVisibility uses.
  const applyState = (index) => {
    const plugin = pluginRef.current;
    const scene  = sceneRef.current;
    if (!plugin || !scene) return;

    const showPolymer = index !== 2;  // protein + complex
    const showLigand  = index !== 0;  // complex + ligand

    try {
      const b = plugin.state.data.build();
      let changed = false;
      const setAlpha = (sel, show) => {
        if (!sel) return;
        b.to(sel).update((old) => ({
          ...old,
          type: { ...old.type, params: { ...(old.type && old.type.params), alpha: show ? 1 : 0 } },
        }));
        changed = true;
      };
      setAlpha(scene.polymer, showPolymer);
      setAlpha(scene.ligand, showLigand);
      if (changed) b.commit();
    } catch (e) {
      console.warn('[hero] representation toggle failed:', e);
    }

    let sphere = scene.structureData && scene.structureData.boundary && scene.structureData.boundary.sphere;
    if (index === 2 && scene.ligandData && scene.ligandData.boundary) sphere = scene.ligandData.boundary.sphere;
    else if (index === 0 && scene.polymerData && scene.polymerData.boundary) sphere = scene.polymerData.boundary.sphere;

    const cam = plugin.managers && plugin.managers.camera;
    if (sphere && cam && cam.focusSphere) {
      try { cam.focusSphere(sphere, { durationMs: 420, extraRadius: index === 2 ? 3 : 1 }); return; } catch (e) { /* fall through */ }
    }
    if (plugin.canvas3d) plugin.canvas3d.requestCameraReset();
  };

  const startSpin = () => {
    const plugin = pluginRef.current;
    if (!plugin || !plugin.canvas3d) return;
    const direction = lastSpinDirection.current < 0 ? -1 : 1;
    plugin.canvas3d.setProps({ trackball: { animate: { name: 'spin', params: { speed: 0.18 * direction } } } });
  };
  const stopSpin = () => {
    const plugin = pluginRef.current;
    if (!plugin || !plugin.canvas3d) return;
    plugin.canvas3d.setProps({ trackball: { animate: { name: 'off', params: {} } } });
  };
  // Resume the gentle spin 4s after the last interaction.
  const scheduleIdleSpin = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(startSpin, 4000);
  };

  React.useEffect(() => {
    let cancelled = false;
    const el = viewerRef.current;

    const init = async () => {
      const molstar = await loadMolstar();
      if (cancelled || !viewerRef.current) return;

      const viewer = await molstar.Viewer.create(viewerRef.current, {
        layoutIsExpanded: false,
        layoutShowControls: false,
        layoutShowRemoteState: false,
        layoutShowSequence: false,
        layoutShowLog: false,
        layoutShowLeftPanel: false,
        viewportShowExpand: false,
        viewportShowControls: false,
        viewportShowSettings: false,
        viewportShowSelectionMode: false,
        viewportShowAnimation: false,
        viewportShowTrajectoryControls: false,
        pdbProvider: 'rcsb',
        emdbProvider: 'rcsb',
      });
      if (cancelled) { try { viewer.plugin.dispose(); } catch (e) {} return; }

      const plugin = viewer.plugin;
      pluginRef.current = plugin;

      // Transparent background, no axis widget. Throw-to-spin inertia:
      // staticMoving:false keeps the last rotation delta alive after pointer
      // release; dynamicDampingFactor controls how fast it decays per frame
      // (lower = longer coast). Default is staticMoving:true / factor:0.2
      // which stops dead on release.
      if (plugin.canvas3d) {
        plugin.canvas3d.setProps({
          transparentBackground: true,
          camera: { helper: { axes: { name: 'off', params: {} } } },
          trackball: { staticMoving: false, dynamicDampingFactor: 0.055 },
        });
      }

      // Disable hover highlights. The highlight system is two-layered: the
      // lociHighlights manager records which atoms are highlighted (data), and
      // the renderer draws them. Setting renderer.highlightStrength to 0 only
      // dims the draw — atoms are still marked and outline effects still show.
      // Patching the manager methods to no-ops stops highlights being recorded.
      const lh = plugin.managers.interactivity.lociHighlights;
      lh.highlight = () => {};
      lh.highlightOnly = () => {};
      lh.highlightOnlyExtend = () => {};

      // HiDPI sharpness. pixelScale is a Canvas3DContext prop, NOT a renderer
      // prop — setting it on canvas3d.renderer is silently ignored. In Mol*'s
      // default "scaled" mode the drawing buffer renders at CSS-pixel
      // resolution (pixelScale 1 ignores devicePixelRatio), so on high-DPR
      // phones the browser upscales it and the hero looks pixelated. Render the
      // buffer at 2x CSS resolution instead (the param's max; retina-sharp on
      // dpr<=2, far sharper on dpr 3, capped so phones don't render 9x pixels).
      if (plugin.canvas3dContext) {
        plugin.canvas3dContext.setProps({ pixelScale: 2 });
      }

      // Build the structure manually so we keep refs for the switcher
      // (mirrors the app's MiniMolstarViewer recipe: fetch text + rawData).
      const pdbText = await fetch(HERO_PDB_URL).then((r) => {
        if (!r.ok) throw new Error('PDB fetch failed: ' + r.status);
        return r.text();
      });
      if (cancelled) { try { plugin.dispose(); } catch (e) {} return; }
      const data = await plugin.builders.data.rawData({ data: cleanHeroPdb(pdbText), label: '1M17' });
      const trajectory = await plugin.builders.structure.parseTrajectory(data, 'pdb');
      const model = await plugin.builders.structure.createModel(trajectory);
      const structure = await plugin.builders.structure.createStructure(model);

      const polymer = await plugin.builders.structure.tryCreateComponentStatic(structure, 'polymer');
      let polymerRepr = null;
      if (polymer) {
        polymerRepr = await plugin.builders.structure.representation.addRepresentation(polymer, {
          type: 'cartoon',
          color: 'chain-id',
        });
      }

      const ligand = await plugin.builders.structure.tryCreateComponentStatic(structure, 'ligand');
      let ligandRepr = null;
      if (ligand) {
        ligandRepr = await plugin.builders.structure.representation.addRepresentation(ligand, {
          type: 'ball-and-stick',
          color: 'element-symbol',
          colorParams: { carbonColor: { name: 'uniform', params: { value: HERO_CARBON } } },
          typeParams: { multipleBonds: 'symmetric' },
        });
      }

      if (cancelled) { try { plugin.dispose(); } catch (e) {} return; }

      sceneRef.current = {
        molstar,
        polymer: polymerRepr,
        ligand: ligandRepr,
        polymerData: polymer && polymer.data,
        ligandData: ligand && ligand.data,
        structureData: structure && structure.data,
      };

      applyState(current);

      // Disable click-to-select and click-to-focus. Both behaviors subscribe
      // to plugin.behaviors.interaction.click (an RxJS Subject). Patching
      // next() to a no-op after the structure is loaded (so initial camera
      // framing is unaffected) silences all click interactions in one place.
      plugin.behaviors.interaction.click.next = () => {};

      setLoading(false);

      // Gentle invitation: spin briefly, show the drag prompt, until the
      // visitor takes over.
      setTimeout(() => {
        if (cancelled || touched.current) return;
        setPromptOn(true);
        startSpin();
        scheduleIdleSpin();
      }, 1100);
    };

    // Defer the ~5MB load until the browser is idle so it never blocks LCP.
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 250));
    const ricId = ric(() => {
      init().catch((err) => {
        if (cancelled) return;
        console.warn('[hero] Mol* init failed:', err);
        setFailed(true);
        setLoading(false);
      });
    });

    const rememberThrowDirection = (e) => {
      const sample = dragSample.current;
      if (!sample || e.pointerId !== sample.pointerId) return;
      const dx = e.clientX - sample.x;
      if (Math.abs(dx) < 4) return;
      lastSpinDirection.current = dx > 0 ? 1 : -1;
      dragSample.current = { pointerId: e.pointerId, x: e.clientX };
    };

    const onGrab = (e) => {
      touched.current = true;
      setHintOn(false);
      setPromptOn(false);
      stopSpin();
      clearTimeout(idleTimer.current);
      if (typeof e.pointerId === 'number') {
        dragSample.current = { pointerId: e.pointerId, x: e.clientX };
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
      } else {
        scheduleIdleSpin();
      }
    };
    const onMove = (e) => rememberThrowDirection(e);
    // Schedule idle spin from release so the throw coast plays out fully
    // before the gentle spin resumes.
    const onRelease = (e) => {
      rememberThrowDirection(e);
      dragSample.current = null;
      scheduleIdleSpin();
    };
    // Prevent Mol*'s scroll-zoom — viewer is rotate-only. Mol* attaches its
    // wheel handler directly to the canvas element, so a bubbling listener on
    // the container fires AFTER Mol* already zoomed. A capturing listener fires
    // first, stopPropagation() prevents the event from ever reaching the canvas.
    const blockZoom = (e) => e.stopPropagation();
    if (el) {
      el.addEventListener('pointerdown', onGrab);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onRelease);
      el.addEventListener('pointercancel', onRelease);
      el.addEventListener('wheel', onGrab, { passive: true });
      el.addEventListener('wheel', blockZoom, { capture: true, passive: true });
    }
    const hintTimer = setTimeout(() => setHintOn(false), 5500);

    return () => {
      cancelled = true;
      clearTimeout(idleTimer.current);
      clearTimeout(hintTimer);
      if (window.cancelIdleCallback && typeof ricId === 'number') {
        try { window.cancelIdleCallback(ricId); } catch (e) {}
      }
      if (el) {
        el.removeEventListener('pointerdown', onGrab);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onRelease);
        el.removeEventListener('pointercancel', onRelease);
        el.removeEventListener('wheel', onGrab);
        el.removeEventListener('wheel', blockZoom, { capture: true });
      }
      const p = pluginRef.current;
      if (p) { try { p.dispose(); } catch (e) {} pluginRef.current = null; }
    };
  }, []);

  // React to switcher changes once the scene is live.
  React.useEffect(() => {
    if (loading || failed) return;
    applyState(current);
  }, [current, loading, failed]);

  const ready = !loading && !failed;

  return (
    <section className="hero hero-interactive">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="dot" /> The local CADD workbench</div>
            <h1>Integrated.<br />Self-hosted.<br />Reliable.<br /><em>Ligand-X</em></h1>
            <p className="hero-lede">
              A free, self-hosted desktop app for computational drug discovery — docking,
              MD, and more, running on your own hardware.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-lg" onClick={() => window.__nav("download")}>
                <Icon name="download" size={16} />
                Download Ligand-X
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => window.open("https://github.com/kon-218/ligand-x-launcher", "_blank")}
              >
                <Icon name="github" size={16} />
                Star
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => window.__nav("docs")}>
                Read the docs
                <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>

          <div className="hero-interactive-visual">
            <div className="hero-viewer-panel">
              <div className={"hero-viewer-poster" + (ready ? " hidden" : "")} aria-hidden="true">
                <MoleculeScene />
              </div>

              {loading && (
                <div className="hero-viewer-loading">
                  <div className="hero-viewer-spinner" />
                </div>
              )}

              <div
                ref={viewerRef}
                className="hero-viewer-container"
                style={{ opacity: ready ? 1 : 0 }}
              />

              {ready && promptOn && !touched.current && (
                <div className="hero-spin-prompt" aria-hidden="true">
                  <span className="hero-spin-touch" />
                  <svg className="hero-spin-hand" viewBox="0 0 28 32" focusable="false">
                    <path d="M13.2 2.7c1.2 0 2.1 0.9 2.1 2.1v9.4l1.1-1.7c0.5-0.8 1.6-1.1 2.4-0.6 0.4 0.2 0.7 0.6 0.8 1l0.8-1.1c0.6-0.8 1.7-0.9 2.5-0.3 0.4 0.3 0.6 0.7 0.7 1.2l0.2-0.2c0.7-0.6 1.8-0.5 2.4 0.2 0.4 0.5 0.5 1.1 0.3 1.7l-1.9 7.2c-0.9 3.7-4.3 6.4-8.1 6.4h-2.2c-2.8 0-5.4-1.4-6.9-3.8l-4.1-6.3c-0.6-0.9-0.3-2.1 0.6-2.7 0.8-0.5 1.8-0.4 2.5 0.3l4.7 4.3v-15c0-1.2 0.9-2.1 2.1-2.1Z" />
                    <path d="M15.3 14.2v5.1M19.6 12.9v6.4M23.6 12.7v6.2" />
                  </svg>
                </div>
              )}

              {ready && (
                <div className="hero-struct-badge">
                  {HERO_STRUCTURES[current].label}
                </div>
              )}

              {failed && (
                <div className="hero-struct-badge hero-struct-badge-static">
                  {HERO_STRUCTURES[HERO_DEFAULT].label}
                </div>
              )}

              <div className="hero-dot-bar">
                <div className="hero-dot-row">
                  {HERO_STRUCTURES.map((s, i) => (
                    <button
                      key={s.key}
                      className={"hero-dot" + (i === current ? " active" : "")}
                      onClick={() => {
                        touched.current = true;
                        setPromptOn(false);
                        stopSpin();
                        scheduleIdleSpin();
                        setCurrent(i);
                      }}
                      aria-label={s.label}
                    />
                  ))}
                </div>
                <div className={"hero-drag-hint" + (hintOn && ready ? "" : " hidden")}>
                  drag to rotate · scroll to zoom
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CredibilityBand = () => (
  <section className="local-value-section" style={{ borderBottom: '1px solid var(--border)' }}>
    <div className="container">
      <div className="hero-meta" style={{ margin: 0, padding: '18px 0' }}>
        <span>Built with Open Source tools</span>
        <span>Runs locally on your hardware</span>
        <span>Always free for Academics</span>
      </div>
    </div>
  </section>
);

const PAIN_ITEMS = [
  "Structures live in one folder. Ligands live somewhere else.",
  "Docking outputs need manual parsing before they're useful.",
  "MD setup becomes a separate workflow from the docking review.",
  "Results are hard to connect back to the original experiment.",
  "Reproducing a calculation means reconstructing the full script chain.",
];

const PainValueSection = () => (
  <section className="section pain-section">
    <div className="container pain-grid">
      <div>
        <div className="eyebrow"><span className="dot" />Pain / value</div>
        <h2>Built for the work between tools.</h2>
        <p className="pain-lede">
          Ligand-X is for teams that need serious computational chemistry workflows, but do not want their discovery process spread across scripts, folders, cloud tools, and disconnected viewers.
        </p>
      </div>
      <div className="pain-panel">
        <div className="pain-list">
          {PAIN_ITEMS.map((item, i) => (
            <Reveal key={i} className="pain-list-row" i={i}>
              <span className="mono pain-index">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </Reveal>
          ))}
        </div>
        <p className="pain-statement">
          Ligand-X keeps proteins, molecules, pockets, jobs, poses, trajectories, and generated outputs in one project workspace.
        </p>
      </div>
    </div>
  </section>
);

const WorkflowSection = () => (
  <section className="section workflow-table-section">
    <div className="container">
      <div className="section-head" style={{ marginBottom: 48 }}>
        <div>
          <div className="eyebrow"><span className="dot" />Main workflow</div>
          <h2>From target setup to project decisions.</h2>
        </div>
        <p className="sub">

        </p>
      </div>
      <div>
        {STORY_STAGES.map((stage, i) => (
          <WorkflowRow key={stage.n} stage={stage} first={i === 0} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const WorkflowRow = ({ stage, first, index = 0 }) => (
  <Reveal className="workflow-row-grid" i={index} style={{
    display: 'grid',
    gridTemplateColumns: '72px 1fr 1fr',
    gap: '0 32px',
    padding: '40px 0',
    borderTop: `1px solid ${first ? 'var(--ink-2, #444)' : 'var(--border)'}`,
    alignItems: 'start',
  }}>
    <div>
      <div style={{
        fontSize: 30, fontWeight: 600, lineHeight: 1,
        color: stage.pro ? '#b45309' : 'var(--accent)',
        fontFamily: 'var(--font-mono)',
      }}>{stage.n}</div>
      <div style={{
        marginTop: 10, fontSize: 10, fontFamily: 'var(--font-mono)',
        color: 'var(--muted-2)', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>{stage.eyebrow}</div>
    </div>
    <div>
      <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{stage.title}</h3>
      <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: '12px 0 0' }}>{stage.text}</p>
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {stage.points.map((b) => (
        <li key={b} style={{
          display: 'flex', gap: 10, padding: '8px 0',
          borderTop: '1px solid var(--border)',
          fontSize: 14, color: 'var(--ink-2)', alignItems: 'baseline',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: stage.pro ? '#b45309' : 'var(--accent)', flexShrink: 0 }}>→</span>
          {b}
        </li>
      ))}
    </ul>
  </Reveal>
);

const LocalValueSection = () => (
  <section className="section local-value-section">
    <div className="container local-value-grid">
      <div>
        <div className="eyebrow"><span className="dot" />Why local matters</div>
        <h2>Your structures and results stay on your hardware.</h2>
        <p>
          Ligand-X is designed for sensitive structures, early ligand ideas, internal targets, and teams that want reproducible workflows without forcing every calculation through a managed cloud app.
        </p>
      </div>
      <div className="local-value-list">
        {["No required cloud upload for sensitive structures", "Use local CPU/GPU resources", "Works for desktop or server deployment", "Suitable for academic labs, startups, and internal research environments"].map((item, i) => (
          <Reveal className="local-value-item" key={item} i={i}><Icon name="check" size={16} /><span>{item}</span></Reveal>
        ))}
      </div>
    </div>
  </section>
);

const OpenCoreProSection = () => (
  <section className="section capability-map-section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="dot" />Open Core vs Pro</div>
          <h2>Start with the local workbench. Add advanced decision modules when needed.</h2>
        </div>
        <p className="sub">
          Each layer is framed by the decisions it supports, from day-to-day project execution to higher-confidence prioritization.
        </p>
      </div>
      <div className="edition-map">
        <Reveal className="edition-card" i={0}>
          <h3>Open Core</h3>
          <p>Everyday local workflows for project setup, target preparation, screening, simulation, and review.</p>
          <div className="capability-cloud">
            {CORE_LABELS.map((item) => <span key={item}>{item}</span>)}
          </div>
        </Reveal>
        <Reveal className="edition-card pro-edition-card" i={1}>
          <h3>Pro</h3>
          <p>Licensed services for higher-confidence prioritization once the project needs more evidence.</p>
          <div className="module-decision-list">
            {HOME_PRO_MODULES.map((item) => (
              <div className="module-decision" key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.decision}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const ArchitectureProofSection = () => (
  <section className="section local-section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="dot" />Why it's reliable</div>
          <h2>Your work persists, reproduces, and stays on your machine.</h2>
        </div>
      </div>
      <div className="service-board">
        <div className="service-grid proof-grid">
          {SERVICES.map((svc, i) => (
            <Reveal className="service-cell" key={svc.name} i={i}>
              <strong>{svc.name}</strong>
              <span>{svc.detail}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const UseCasesSection = () => (
  <section className="section use-cases-section">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="dot" />Use cases</div>
          <h2>Built for teams that need workflow control.</h2>
        </div>
        <p className="sub">
          Ligand-X fits small teams and individual computational chemists who want local execution, project continuity, and a path to advanced methods.
        </p>
      </div>
      <div className="use-case-grid">
        {USE_CASES.map((item, i) => (
          <Reveal className="use-case-card" key={item.title} i={i}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const INSTALL_STEPS = [
  ["01", "Install Docker", "Docker Desktop or Docker Engine + Compose plugin"],
  ["02", "Open the Ligand-X launcher", "Download the launcher for your OS — no terminal needed"],
  ["03", "Select modules and start", "Enable Free modules, or add licensed Pro modules"],
  ["04", "Open localhost:3000", "Frontend, gateway, and workers all live"],
];

const QuickStartSection = () => (
  <section className="section quick-story-section">
    <div className="container quick-story-grid">
      <div>
        <div className="eyebrow"><span className="dot" />Installation</div>
        <h2>Use the launcher for desktops, or Compose for servers.</h2>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
          {INSTALL_STEPS.map(([n, title, sub], i) => (
            <Reveal key={n} i={i} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, alignItems: 'baseline' }}>
              <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 13 }}>{n}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{title}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <CodeBlock
        tabs={[
          {
            label: "desktop",
            copy: "Install Docker\nOpen Ligand-X launcher\nSelect modules\nStart",
            content: (
              <>
                <Comment># Desktop path</Comment>{"\n"}
                <Cmd>Install Docker Desktop or Docker Engine</Cmd>{"\n"}
                <Cmd>Open the Ligand-X launcher</Cmd>{"\n"}
                <Cmd>Select Free or licensed Pro modules</Cmd>{"\n"}
                <span style={{ color: "#7ee787" }}>ready at http://localhost:3000</span>
              </>
            ),
          },
          {
            label: "server",
            copy: "curl -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip\nunzip runtime.zip -d ligand-x && cd ligand-x\ncp .env.production.template .env.production   # then edit secrets\ndocker compose --env-file .env.production pull\ndocker compose --env-file .env.production up -d",
            content: (
              <>
                <Cmd><Fn>curl</Fn> -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip</Cmd>{"\n"}
                <Cmd><Fn>unzip</Fn> runtime.zip -d ligand-x && <Kw>cd</Kw> ligand-x</Cmd>{"\n"}
                <Cmd><Fn>cp</Fn> .env.production.template .env.production   <Comment># then edit secrets</Comment></Cmd>{"\n"}
                <Cmd><Fn>docker</Fn> compose --env-file .env.production pull</Cmd>{"\n"}
                <Cmd><Fn>docker</Fn> compose --env-file .env.production up -d</Cmd>
              </>
            ),
          },
        ]}
      />
    </div>
  </section>
);

const CTASection = () => (
  <section className="section final-story-cta">
    <div className="container final-story-inner">
      <div className="eyebrow"><span className="dot" />Open core + licensed Pro</div>
      <h2>Start local. Add advanced modules when the project needs them.</h2>
      <p>
        Run the open-core workbench for projects, structures, docking, and MD. Compare Free and Pro when your team needs property risk, binding confidence, generative design.
      </p>
      <div className="hero-cta">
        <button className="btn btn-primary btn-lg" onClick={() => window.__nav('download')}>
          <Icon name="download" size={16} />
          Download Ligand-X
        </button>
        <button className="btn btn-secondary btn-lg" onClick={() => window.__nav('pro')}>
          Compare Free and Pro
          <Icon name="arrow" size={14} />
        </button>
        <button className="btn btn-secondary btn-lg" onClick={() => window.__nav('contact')}>
          Contact for access
        </button>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div className="page-fade">
    <HeroShowcase />
    <CredibilityBand />
    <PainValueSection />
    <WorkflowSection />
    <LocalValueSection />
    <OpenCoreProSection />
    <ArchitectureProofSection />
    <UseCasesSection />
    <QuickStartSection />
    <CTASection />
  </div>
);

Object.assign(window, { HomePage });
