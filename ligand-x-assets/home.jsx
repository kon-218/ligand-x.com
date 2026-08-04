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
  { name: "ADMET", decision: "Developability and liability screening" },
  { name: "Boltz-2", decision: "Structure and affinity prediction" },
  { name: "ABFE/RBFE", decision: "Compare binding free energies across analogs" },
  { name: "GenAI", decision: "Explore and optimize new chemotypes" },
];

// Four acts of the scroll story. Three are free — that ordering is the pitch:
// you can do real work before anything asks for a license.
const WORKFLOW_ACTS = [
  {
    label: "Prepare",
    title: "Structures cleaned, pockets found",
    copy: "Fetch a target by PDB, review the structure, strip waters and alternates, then detect pockets or draw your own search box",
    steps: ["PDB fetch", "component review", "cleanup job", "simulation-ready"],
  },
  {
    label: "Screen",
    title: "Create or import a library, dock it, and compare poses",
    copy: "SMILES in, 3D out, with RDKit descriptors computed on creation. Dock a whole folder in a single job, then compare ranked poses and their interactions in the viewer.",
    steps: ["molecule library", "RDKit 3D", "Vina docking", "ranked poses"],
  },
  {
    label: "Simulate",
    title: "Molecular dynamics without the shell scripts",
    copy: "Pick a complex, choose a force field and water model, set your parameters, and watch progress stream over a WebSocket until the trajectory is ready to review.",
    steps: ["force field", "solvation", "live job feed", "trajectory"],
  },
  {
    label: "Go further",
    title: "Free energy and quantum chemistry, same project",
    copy: "When ranking matters, add ABFE and RBFE networks, ORCA quantum chemistry, ADMET screening, and generative design — against the same molecule records you already built.",
    steps: ["ABFE / RBFE", "QC & ADMET", "generative design", "one project"],
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
    text: "Run teaching labs, docking, and MD on local hardware. No cloud account required.",
  },
  {
    title: "Startup discovery team",
    text: "Keep early target and ligand work on your own machines, with one place for structures and job history.",
  },
  {
    title: "Computational chemist",
    text: "Prep a structure, dock a library, and launch MD without copying files between five different tools.",
  },
];

// Hero viewer uses the real Mol* engine (same library + representation
// recipe as the Ligand-X app). Erlotinib (AQ4), the ligand from 1M17 (EGFR
// kinase). The hero shows the LIGAND ONLY — the protein already appears in the
// OrbitStory viewer further down the page, so this keeps the two distinct.
//
// The vendored PDB is pre-trimmed to the 29 AQ4 atoms plus their CONECT
// records (252KB → 5.9KB). It used to carry the whole kinase and get filtered
// in the browser on every load; there is nothing left to filter, so the fetch
// is handed straight to Mol*. CONECT survives the trim, so bond orders come
// from the file rather than distance inference.
const HERO_PDB_URL = '/ligand-x-assets/molstar/1M17.pdb?v=20260801a';
const HERO_CARBON  = 0x2a9d8f; // brand teal for ligand carbons (element-symbol theme)
const HERO_LABEL   = 'Ligand · erlotinib';

const HeroShowcase = () => {
  const viewerRef    = React.useRef(null);   // Mol* canvas container
  const pluginRef    = React.useRef(null);   // Mol* PluginContext
  const idleTimer    = React.useRef(null);
  const touched      = React.useRef(false);
  const lastSpinDirection = React.useRef(1);
  const dragSample = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [failed,  setFailed]  = React.useState(false);
  const [hintOn,  setHintOn]  = React.useState(true);
  const [promptOn, setPromptOn] = React.useState(false);

  // Frame the ligand. Matches the extraRadius the old ligand-only view used, so
  // the molecule sits at the same scale in the panel as it did before.
  const frameLigand = (plugin, ligandData) => {
    const sphere = ligandData && ligandData.boundary && ligandData.boundary.sphere;
    const cam = plugin.managers && plugin.managers.camera;
    if (sphere && cam && cam.focusSphere) {
      try { cam.focusSphere(sphere, { durationMs: 0, extraRadius: 3 }); return; } catch (e) { /* fall through */ }
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

      // Built manually rather than via loadStructureFromUrl so the ligand
      // component is addressable for camera framing (mirrors the app's
      // MiniMolstarViewer recipe: fetch text + rawData).
      const pdbText = await fetch(HERO_PDB_URL).then((r) => {
        if (!r.ok) throw new Error('PDB fetch failed: ' + r.status);
        return r.text();
      });
      if (cancelled) { try { plugin.dispose(); } catch (e) {} return; }
      const data = await plugin.builders.data.rawData({ data: pdbText, label: '1M17' });
      const trajectory = await plugin.builders.structure.parseTrajectory(data, 'pdb');
      const model = await plugin.builders.structure.createModel(trajectory);
      const structure = await plugin.builders.structure.createStructure(model);

      const ligand = await plugin.builders.structure.tryCreateComponentStatic(structure, 'ligand');
      if (ligand) {
        await plugin.builders.structure.representation.addRepresentation(ligand, {
          type: 'ball-and-stick',
          color: 'element-symbol',
          colorParams: { carbonColor: { name: 'uniform', params: { value: HERO_CARBON } } },
          typeParams: { multipleBonds: 'symmetric' },
        });
      }

      if (cancelled) { try { plugin.dispose(); } catch (e) {} return; }

      frameLigand(plugin, ligand && ligand.data);

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

  const ready = !loading && !failed;
  const waiting = !ready;

  return (
    <section className="hero hero-interactive">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1><em>Ligand-X.</em><br />Integrated.<br />Self-hosted.<br />Reliable.</h1>
            <p className="hero-lede">
              A free desktop app for computational drug discovery. Dock, simulate,
              and keep your structures and results on your own hardware.
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
              {waiting && (
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
                <div className="hero-struct-badge">{HERO_LABEL}</div>
              )}
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
      <div className="hero-meta" style={{ margin: 0, padding: '18px 0', justifyContent: 'center' }}>
        <span>Built with Open Source tools</span>
        <span>Runs locally on your hardware</span>
        <span>Always free for Academics</span>
      </div>
    </div>
  </section>
);

// Five DISTINCT failure modes — conversion, provenance, parsing, job durability,
// traceability. The previous list said "your files are scattered" five different
// ways, which the h2, the lede and the closing line then said twice more. One
// idea stated seven times reads as padding; five different ones read as someone
// who has actually done this.
const PAIN_ITEMS = [
  "PDBQT to dock, SDF for the library, PDB for the viewer.",
  "A receptor prepped at pH 7.4, and no note of it by Thursday.",
  "Vina writes a log. Something still has to read it.",
  "The trajectory needed nine hours. The laptop slept at six.",
  "“Which run produced this pose?”",
];

// Closes forward, not sideways: the old ending restated the headline, so the
// scroll story arrived unannounced. "Four moves" is the explicit handoff into
// OrbitStory's four acts.
const PainValueSection = () => (
  <section className="section pain-section">
    <div className="container pain-grid">
      <div>
        <h2>The chemistry was never the hard part.</h2>
        <p className="pain-lede">
          Every method below is solved, published, and available for free. What costs you the afternoon is the format conversion, the log parsing, and the run nobody can reconstruct three weeks later.
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
          None of that is chemistry. Ligand-X handles the conversions, keeps every job and result attached to the project that produced it, and lets you wire protein &rarr; docking &rarr; MD on one canvas and press run. What is left is the actual work &mdash; four moves.
        </p>
      </div>
    </div>
  </section>
);

// Scroll-scrubbed structure behind the acts. `armed` is set by OrbitStory's
// IntersectionObserver: the hero owns the main thread during first paint, and
// this only builds once the scene is within ~1.5 viewports.
const OrbitMolstar = ({ progress, armed }) => {
  const hostRef = React.useRef(null);
  const pluginRef = React.useRef(null);
  const cameraRef = React.useRef(null);
  const progressRef = React.useRef(progress);
  const [state, setState] = React.useState("waiting");

  const applyCamera = React.useCallback((nextProgress) => {
    const plugin = pluginRef.current;
    if (!plugin || !plugin.canvas3d) return;
    const camera = plugin.canvas3d.camera;
    const current = camera.state;
    if (!cameraRef.current) {
      const dx = current.position[0] - current.target[0];
      const dz = current.position[2] - current.target[2];
      if (Math.hypot(dx, dz) < 0.001) return;
      cameraRef.current = {
        target: [...current.target],
        dx,
        dz,
        y: current.position[1],
      };
    }
    const base = cameraRef.current;
    const angle = nextProgress * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    camera.setState({
      target: base.target,
      position: [
        base.target[0] + base.dx * cos - base.dz * sin,
        base.y,
        base.target[2] + base.dx * sin + base.dz * cos,
      ],
    }, 0);
  }, []);

  React.useEffect(() => {
    progressRef.current = progress;
    applyCamera(progress);
  }, [progress, applyCamera]);

  React.useEffect(() => {
    if (!armed) return undefined;
    let cancelled = false;
    const init = async () => {
      if (cancelled || !hostRef.current || pluginRef.current) return;
      setState("loading");
      try {
        const molstar = await loadMolstar();
        if (cancelled || !hostRef.current) return;
        const viewer = await molstar.Viewer.create(hostRef.current, {
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
          pdbProvider: "rcsb",
          emdbProvider: "rcsb",
        });
        if (cancelled) {
          try { viewer.plugin.dispose(); } catch (e) {}
          return;
        }
        pluginRef.current = viewer.plugin;
        if (viewer.plugin.canvas3d) {
          const dark = document.documentElement.getAttribute("data-theme") === "dark";
          viewer.plugin.canvas3d.setProps({
            transparentBackground: true,
            camera: { helper: { axes: { name: "off", params: {} } } },
            // Depth fog fades geometry toward the background colour. Against black
            // that reads as depth; against near-white it just erases the far half
            // of the protein, so light mode turns it off.
            cameraFog: dark ? { name: "on", params: { intensity: 15 } } : { name: "off", params: {} },
            // Fallback only — transparentBackground lets the themed section
            // colour show through, so this just avoids a flash of the wrong one.
            renderer: { backgroundColor: dark ? 0x070c0b : 0xf9f9f8 },
          });
        }
        if (viewer.plugin.canvas3dContext) viewer.plugin.canvas3dContext.setProps({ pixelScale: 1.5 });
        await viewer.loadStructureFromUrl("/ligand-x-assets/molstar/4W52.pdb?v=20260728", "pdb", false);
        if (cancelled) return;
        cameraRef.current = null;
        setState("ready");
        requestAnimationFrame(() => requestAnimationFrame(() => applyCamera(progressRef.current)));
      } catch (error) {
        console.warn("[home] Mol* scroll scene unavailable:", error);
        if (!cancelled) setState("failed");
      }
    };

    init();
    return () => {
      cancelled = true;
      if (pluginRef.current) {
        try { pluginRef.current.dispose(); } catch (e) {}
      }
      pluginRef.current = null;
    };
  }, [armed, applyCamera]);

  return <div ref={hostRef} className={`orbit-molstar ${state === "ready" ? "ready" : ""}`} aria-hidden="true" />;
};

const OrbitStory = () => {
  const sceneRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [armed, setArmed] = React.useState(false);

  // Build the scene shortly before it is needed, never during the hero's paint.
  React.useEffect(() => {
    const node = sceneRef.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") { setArmed(true); return undefined; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setArmed(true);
        observer.disconnect();
      }
    }, { rootMargin: "150% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const span = Math.max(1, sceneRef.current.offsetHeight - window.innerHeight + 56);
      setProgress(Math.min(1, Math.max(0, (56 - rect.top) / span)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const actProgress = progress * (WORKFLOW_ACTS.length - 1);
  const active = Math.min(WORKFLOW_ACTS.length - 1, Math.max(0, Math.round(actProgress)));

  return (
    <section ref={sceneRef} id="workflow" className="orbit-scene" aria-label="The Ligand-X workflow">
      <div className="orbit-sticky">
        <div className="orbit-aura" />
        <div className="orbit-viz">
          <OrbitMolstar progress={progress} armed={armed} />
        </div>
        <div className="orbit-acts">
          {WORKFLOW_ACTS.map((act, i) => {
            const local = actProgress - i;
            const fade = Math.max(0, 1 - Math.abs(local) * 1.35);
            const eased = fade * fade * (3 - 2 * fade);
            return (
              <article
                className={`orbit-act ${act.pro ? "pro" : ""}`}
                key={act.label}
                aria-hidden={eased < 0.1}
                style={{ opacity: eased, pointerEvents: eased > 0.6 ? "auto" : "none", transform: `translateY(${local * 54}px) rotateX(${-local * 9}deg) scale(${0.96 + eased * 0.04})` }}
              >
                <div className="orbit-act-kicker">
                  {String(i + 1).padStart(2, "0")} / {act.label}
                  {act.free && <span>Free</span>}
                  {act.pro && <span>Pro</span>}
                </div>
                <h2>{act.title}</h2>
                <p>{act.copy}</p>
                <div className="orbit-steps">
                  {act.steps.map((step, stepIndex) => <span className={stepIndex === act.steps.length - 1 ? "result" : ""} key={step}>{step}</span>)}
                </div>
              </article>
            );
          })}
        </div>
        <div className="orbit-progress" aria-label={`Workflow stage ${active + 1} of ${WORKFLOW_ACTS.length}`}>
          {WORKFLOW_ACTS.map((_, i) => <span className={i === active ? "active" : ""} key={i}>{String(i + 1).padStart(2, "0")}</span>)}
          <i><b style={{ width: `${progress * 100}%` }} /></i>
        </div>
      </div>
    </section>
  );
};

const OpenCoreProSection = () => (
  <section className="section capability-map-section">
    <div className="container">
      <div className="section-head">
        <div>
          <h2>Start with the local workbench. Add Pro when you need it.</h2>
        </div>
        <p className="sub">
          Open Core covers day-to-day prep, docking, and MD. Pro adds property screening, binding prediction, and generative design.
        </p>
      </div>
      <div className="edition-map">
        <Reveal className="edition-card" i={0}>
          <h3>Open Core</h3>
          <p>Project setup, target prep, docking, MD, and structure review on your own hardware.</p>
          <div className="capability-cloud">
            {CORE_LABELS.map((item) => <span key={item}>{item}</span>)}
          </div>
        </Reveal>
        <Reveal className="edition-card pro-edition-card" i={1}>
          <h3>Pro</h3>
          <p>Licensed add-ons for ADMET, binding free energies, structure prediction, and generative design.</p>
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
          <h2>Your structures and results stay on your hardware.</h2>
        </div>
        <p className="sub">
          Built for sensitive structures, unpublished targets, and teams who want reproducible workflows without uploading everything to a cloud service.
        </p>
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
          <h2>For labs, startups, and solo computational chemists.</h2>
        </div>
        <p className="sub">
          Local execution, one project per experiment, and a clear upgrade path to Pro modules.
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
  ["02", "Open the Ligand-X launcher", "Download the launcher for your OS. No terminal needed."],
  ["03", "Select modules and start", "Enable Free modules, or add licensed Pro modules"],
  ["04", "Open localhost:3000", "Frontend, gateway, and workers all live"],
];

const QuickStartSection = () => (
  <section className="section quick-story-section">
    <div className="container quick-story-grid">
      <div>
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
                <span style={{ color: "var(--code-success)" }}>ready at http://localhost:3000</span>
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
      <h2>Start local. Add Pro when you need it.</h2>
      <p>
        Run the open-core workbench for projects, structures, docking, and MD. Compare Free and Pro when you need ADMET, binding prediction, or generative design.
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
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div className="page-fade">
    <HeroShowcase />
    <CredibilityBand />
    <PainValueSection />
    <OrbitStory />
    <OpenCoreProSection />
    <ArchitectureProofSection />
    <UseCasesSection />
    <QuickStartSection />
    <CTASection />
  </div>
);

Object.assign(window, { HomePage });
