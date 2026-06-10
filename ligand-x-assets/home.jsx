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

function frameSelection(viewer, selection, scale = 1) {
  viewer.zoomTo(selection);
  if (scale !== 1 && typeof viewer.zoom === 'function') {
    viewer.zoom(scale);
  }
}

function applyStructure(viewer, index) {
  const proteinCore = { chain: 'A', resi: '696-944' };
  const ligand      = { resn: 'AQ4' };

  if (index === 0) {
    viewer.setStyle(proteinCore, { cartoon: { color: '#2a9d8f', opacity: 1 } });
    frameSelection(viewer, proteinCore, 1.16);
    return;
  }

  if (index === 1) {
    viewer.setStyle(proteinCore, { cartoon: { color: '#2a9d8f', opacity: 1 } });
    viewer.setStyle(ligand, {
      stick:  { colorscheme: 'Jmol', radius: 0.18 },
      sphere: { colorscheme: 'Jmol', radius: 0.30 },
    });
    if (typeof viewer.addHBonds === 'function') {
      viewer.addHBonds(ligand, proteinCore, {
        color: '#ead8b8', opacity: 0.45, dashed: true,
      });
    }
    frameSelection(viewer, proteinCore, 1.16);
    return;
  }

  if (index === 2) {
    viewer.setStyle(ligand, {
      stick:  { colorscheme: 'Jmol', radius: 0.22 },
      sphere: { colorscheme: 'Jmol', radius: 0.38 },
    });
    frameSelection(viewer, ligand, 1.25);
    return;
  }
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
  const viewerRef  = React.useRef(null);
  const viewer3d   = React.useRef(null);
  const dragStart  = React.useRef(null);
  const hintTimer  = React.useRef(null);
  const [current, setCurrent] = React.useState(HERO_DEFAULT);
  const [loading,  setLoading]  = React.useState(true);
  const [hintOn,   setHintOn]   = React.useState(true);

  React.useEffect(() => {
    if (!viewerRef.current || typeof $3Dmol === 'undefined') return;

    const viewer = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'transparent',
      backgroundAlpha: 0,
      antialias: true,
    });
    viewer3d.current = viewer;
    if (typeof viewer.setBackgroundColor === 'function') {
      viewer.setBackgroundColor(0x000000, 0);
    }

    $3Dmol.download('pdb:1M17', viewer, {}, () => {
      viewer.setStyle({}, {});
      applyStructure(viewer, HERO_DEFAULT);
      viewer.render();
      viewerRef.current.style.opacity = '1';
      setLoading(false);
    });

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
      const isSwipe = Math.abs(dx) > 80 || (Math.abs(dx) > 10 && dt > 0 && Math.abs(dx) / dt > 0.5);
      if (isSwipe) {
        setCurrent(prev =>
          dx < 0
            ? (prev + 1) % HERO_STRUCTURES.length
            : (prev + HERO_STRUCTURES.length - 1) % HERO_STRUCTURES.length
        );
        setHintOn(false);
      }
    };

    const blockNonRotateNavigation = (e) => {
      const isMousePan = e.type === 'mousedown' && e.button !== 0;
      const isModifierDrag = e.type === 'mousedown' && (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey);
      const isWheelZoom = e.type === 'wheel';
      const isMultiTouch = e.touches && e.touches.length > 1;
      const isDoubleClick = e.type === 'dblclick';
      const isContextMenu = e.type === 'contextmenu';
      if (isMousePan || isModifierDrag || isWheelZoom || isMultiTouch || isDoubleClick || isContextMenu) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    el.addEventListener('wheel',      blockNonRotateNavigation, { capture: true, passive: false });
    el.addEventListener('mousedown',  blockNonRotateNavigation, true);
    el.addEventListener('touchstart', blockNonRotateNavigation, { capture: true, passive: false });
    el.addEventListener('touchmove',  blockNonRotateNavigation, { capture: true, passive: false });
    el.addEventListener('dblclick',   blockNonRotateNavigation, true);
    el.addEventListener('contextmenu', blockNonRotateNavigation, true);

    el.addEventListener('mousedown',  onDown);
    el.addEventListener('mouseup',    onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend',   onUp);

    hintTimer.current = setTimeout(() => setHintOn(false), 4000);

    return () => {
      el.removeEventListener('wheel',      blockNonRotateNavigation, true);
      el.removeEventListener('mousedown',  blockNonRotateNavigation, true);
      el.removeEventListener('touchstart', blockNonRotateNavigation, true);
      el.removeEventListener('touchmove',  blockNonRotateNavigation, true);
      el.removeEventListener('dblclick',   blockNonRotateNavigation, true);
      el.removeEventListener('contextmenu', blockNonRotateNavigation, true);
      el.removeEventListener('mousedown',  onDown);
      el.removeEventListener('mouseup',    onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend',   onUp);
      clearTimeout(hintTimer.current);
    };
  }, []);

  React.useEffect(() => {
    if (!viewer3d.current || loading) return;
    const v   = viewer3d.current;
    const el  = viewerRef.current;
    el.style.opacity = '0';
    const tid = setTimeout(() => {
      v.setStyle({}, {});
      v.removeAllShapes();
      applyStructure(v, current);
      v.render();
      el.style.opacity = '1';
    }, 180);
    return () => clearTimeout(tid);
  }, [current, loading]);

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
              {loading && (
                <div className="hero-viewer-loading">
                  <div className="hero-viewer-spinner" />
                </div>
              )}
              <div
                ref={viewerRef}
                className="hero-viewer-container"
                style={{ opacity: 0 }}
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
                      className={"hero-dot" + (i === current ? " active" : "")}
                      onClick={() => setCurrent(i)}
                      aria-label={s.label}
                    />
                  ))}
                </div>
                <div className={"hero-drag-hint" + (hintOn ? "" : " hidden")}>
                  drag to rotate · swipe to switch
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
        <span>Built by Konstantin Nomerotski</span>
        <span>Runs locally on your hardware</span>
        <span>PolyForm Noncommercial</span>
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
            <div key={i} className="pain-list-row">
              <span className="mono pain-index">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </div>
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
          <WorkflowRow key={stage.n} stage={stage} first={i === 0} />
        ))}
      </div>
    </div>
  </section>
);

const WorkflowRow = ({ stage, first }) => (
  <div className="workflow-row-grid" style={{
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
  </div>
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
        {["No required cloud upload for sensitive structures", "Use local CPU/GPU resources", "Works for desktop or server deployment", "Suitable for academic labs, startups, and internal research environments"].map((item) => (
          <div className="local-value-item" key={item}><Icon name="check" size={16} /><span>{item}</span></div>
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
        <div className="edition-card">
          <h3>Open Core</h3>
          <p>Everyday local workflows for project setup, target preparation, screening, simulation, and review.</p>
          <div className="capability-cloud">
            {CORE_LABELS.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="edition-card pro-edition-card">
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
        </div>
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
          {SERVICES.map((svc) => (
            <div className="service-cell" key={svc.name}>
              <strong>{svc.name}</strong>
              <span>{svc.detail}</span>
            </div>
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
        {USE_CASES.map((item) => (
          <div className="use-case-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
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
          {INSTALL_STEPS.map(([n, title, sub]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, alignItems: 'baseline' }}>
              <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 13 }}>{n}</span>
              <div>
                <div style={{ fontWeight: 500 }}>{title}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{sub}</div>
              </div>
            </div>
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
