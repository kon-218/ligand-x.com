// ============================================================
// FeaturesPage — current open-core + Pro capability reference
// ============================================================

const FEATURES = MODULES.map((module) => ({
  id: module.id,
  icon: module.icon,
  tier: module.edition === "pro" ? "Pro" : "Open Core",
  edition: module.edition,
  category: module.category,
  tag: module.category,
  title: module.name,
  summary: module.summary,
  details: module.details,
  tools: module.tools,
  formats: [module.io],
}));

const CATEGORIES = MODULE_CATEGORIES.map(({ id, label }) => ({ id, label }));

const MODULE_STEP_LABELS = {
  structure: "Cleaning",
  "pocket-finder": "Binding-Site",
  docking: "Docking",
  admet: "ADMET",
  editor: "Molecule",
  qc: "Quantum",
  alignment: "Alignment",
  md: "MD",
  "free-energy": "FEP",
  reinvent: "GenAI",
  boltz2: "Boltz-2",
};

const FEATURE_WORKFLOW_PRESETS = [
  {
    id: "preset-docking",
    name: "Docking workflow",
    desc: "Clean a target, find a pocket, dock a library, score with ADMET.",
    modules: ["structure", "pocket-finder", "docking", "admet"],
  },
  {
    id: "preset-admet",
    name: "ADMET screen",
    desc: "Triage a library against drug-likeness and basic property risk.",
    modules: ["editor", "admet", "qc"],
  },
  {
    id: "preset-fep",
    name: "FEP campaign",
    desc: "Align a series, run MD, then drive an RBFE campaign.",
    modules: ["alignment", "md", "free-energy"],
  },
  {
    id: "preset-gen",
    name: "Generative loop",
    desc: "Generate candidates with GenAI, dock, predict affinity, and re-score with ADMET.",
    modules: ["reinvent", "docking", "boltz2", "admet"],
  },
];

// In-page scroll only. The app's router treats any hash change as a page
// navigation (see app.jsx's hashchange listener), so these links must
// preventDefault before the hash actually changes or they get redirected home.
const jumpTo = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

const filterFeature = (feature, category, edition = "any") => {
  if (category !== "all" && feature.tag !== category) return false;
  if (edition !== "any" && feature.edition !== edition) return false;
  return true;
};

const toTagLabel = (tag) => {
  if (!tag) return "";
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const FeatureDetail = ({ feature }) => (
  <div className="fx-detail">
    <div className="fx-detail-head">
      <div className={`fx-detail-icon ${feature.tier === "Pro" ? "pro" : ""}`}>
        <Icon name={feature.icon} size={26} style={{ color: feature.tier === "Pro" ? "#b7791f" : "var(--accent-strong)" }} />
      </div>
      <div>
        <div className="fx-detail-meta">
          <span className={`fx-detail-tier ${feature.tier === "Pro" ? "pro" : ""}`}>{feature.tier}</span>
          <span className="fx-detail-tag">{toTagLabel(feature.tag)}</span>
        </div>
        <h3>{feature.title}</h3>
      </div>
    </div>

    <p className="fx-detail-summary">{feature.summary}</p>

    <div className="fx-detail-grid">
      <div>
        <h5>Capabilities</h5>
        <ul className="fx-bullet-list">
          {feature.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
      <div>
        <h5>Tools</h5>
        <div className="tools">
          {feature.tools.map((t) => <span className="tool-pill" key={t}>{t}</span>)}
        </div>
        <h5 style={{ marginTop: 20 }}>Input -> Output</h5>
        <div className="fx-io-list">
          {feature.formats.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>

    <div className="fx-detail-actions">
      {feature.tier === "Pro" ? (
        <button className="btn btn-primary btn-sm" onClick={() => window.__nav('pro')}>
          <Icon name="scale" size={12} />
          Explore Pro
        </button>
      ) : (
        <button className="btn btn-secondary btn-sm" onClick={() => window.__nav('docs')}>
          <Icon name="book" size={12} />
          Docs
        </button>
      )}
      <button className="btn btn-secondary btn-sm">
        <Icon name="play" size={12} />
        Demo
      </button>
    </div>
  </div>
);

const WorkflowShowcase = ({ featureMap, onPreview }) => (
  <section className="fx-workflow-section" id="workflows" style={{ scrollMarginTop: 72 }}>
    <div className="fx-workflow-head">
      <div>
        <div className="eyebrow"><span className="dot" />Workflows</div>
        <h2>Custom pipelines you compose inside a project.</h2>
      </div>
      <button className="btn btn-secondary btn-sm">
        Open builder
        <Icon name="arrow" size={12} />
      </button>
    </div>
    <p className="fx-workflow-sub">
      Chain modules into a reusable pipeline scoped to your project. Start from a preset,
      swap modules in or out, and rerun the flow in minutes.
    </p>

    <div className="fx-workflow-grid">
      {FEATURE_WORKFLOW_PRESETS.map((preset, idx) => {
        const modules = preset.modules.map((id) => featureMap[id]).filter(Boolean);
        const proCount = modules.filter((m) => m.tier === "Pro").length;
        return (
          <article className="fx-workflow-card" key={preset.id}>
            <div className="fx-workflow-top">
              <span className="fx-workflow-preset">Preset · {String(idx + 1).padStart(2, "0")}</span>
            </div>
            <h4>{preset.name}</h4>
            <p>{preset.desc}</p>

            <div className="fx-workflow-chain">
              {modules.map((mod, i) => (
                <React.Fragment key={mod.id}>
                  <div className={`fx-workflow-step ${mod.tier === "Pro" ? "pro" : ""}`}>
                    <Icon name={mod.icon} size={13} />
                    <span>{MODULE_STEP_LABELS[mod.id] || mod.title.split(" ")[0]}</span>
                  </div>
                  {i < modules.length - 1 && <span className="fx-workflow-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="fx-workflow-foot">
              <div className="fx-workflow-meta">
                <span>{modules.length} steps</span>
                <span>{proCount} pro</span>
                <span>~{modules.length * 4} min</span>
              </div>
              <button className="fx-workflow-preview" onClick={() => modules[0] && onPreview(modules[0].id)}>
                Preview
                <Icon name="arrow" size={11} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

const FEATURE_ACTS = [
  {
    label: "Prepare",
    title: "Structures cleaned, pockets found",
    copy: "Import by PDB accession, review detected components, strip waters and alternates, then run pocket finding or draw a custom search box in Å.",
    steps: ["RCSB fetch", "component review", "cleaning job", "pocket box"],
  },
  {
    label: "Dock",
    title: "Vina docking against your own library",
    copy: "SMILES in, 3D out — RDKit descriptors computed on creation. Dock a folder of ligands in one job, then inspect poses and interactions in the Mol* viewer.",
    steps: ["molecule library", "RDKit 3D", "Vina exhaustiveness", "saved poses"],
  },
  {
    label: "Simulate",
    title: "Molecular dynamics without the shell scripts",
    copy: "Pick a complex, a force field and water model, set your parameters, and watch progress stream over a WebSocket until the trajectory is ready to review.",
    steps: ["force field", "solvation", "live job feed", "trajectory"],
  },
  {
    label: "Free energy",
    title: "ABFE, RBFE and QC in the same queue",
    copy: "Build a perturbation network across a series, monitor convergence and cycle closure, and hand quantum chemistry the same molecule record.",
    steps: ["ABFE protocol", "perturbation network", "convergence", "cycle closure"],
    pro: true,
  },
];

const OrbitMolstar = ({ progress }) => {
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
          viewer.plugin.canvas3d.setProps({
            transparentBackground: true,
            camera: { helper: { axes: { name: "off", params: {} } } },
            renderer: { backgroundColor: 0x070c0b },
          });
        }
        if (viewer.plugin.canvas3dContext) viewer.plugin.canvas3dContext.setProps({ pixelScale: 1.5 });
        await viewer.loadStructureFromUrl("/ligand-x-assets/molstar/4W52.pdb?v=20260728", "pdb", false);
        if (cancelled) return;
        cameraRef.current = null;
        setState("ready");
        requestAnimationFrame(() => requestAnimationFrame(() => applyCamera(progressRef.current)));
      } catch (error) {
        console.warn("[features] Mol* structure preview unavailable:", error);
        if (!cancelled) setState("failed");
      }
    };

    // Start immediately while the visitor is reading the full-height hero.
    // Mol* and the structure are both served locally, so the scroll scene is
    // normally ready before it enters the viewport.
    init();
    return () => {
      cancelled = true;
      if (pluginRef.current) {
        try { pluginRef.current.dispose(); } catch (e) {}
      }
      pluginRef.current = null;
    };
  }, [applyCamera]);

  return <div ref={hostRef} className={`orbit-molstar ${state === "ready" ? "ready" : ""}`} aria-hidden="true" />;
};

const OrbitStory = () => {
  const sceneRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

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

  const actProgress = progress * (FEATURE_ACTS.length - 1);
  const active = Math.min(FEATURE_ACTS.length - 1, Math.max(0, Math.round(actProgress)));

  return (
    <section ref={sceneRef} className="orbit-scene" aria-label="Ligand-X workflow">
      <div className="orbit-sticky">
        <div className="orbit-aura" />
        <div className="orbit-viz">
          <OrbitMolstar progress={progress} />
        </div>
        <div className="orbit-acts">
          {FEATURE_ACTS.map((act, i) => {
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
                <div className="orbit-act-kicker">{String(i + 1).padStart(2, "0")} / {act.label}{act.pro && <span>Pro</span>}</div>
                <h2>{act.title}</h2>
                <p>{act.copy}</p>
                <div className="orbit-steps">
                  {act.steps.map((step, stepIndex) => <span className={stepIndex === act.steps.length - 1 ? "result" : ""} key={step}>{step}</span>)}
                </div>
              </article>
            );
          })}
        </div>
        <div className="orbit-progress" aria-label={`Workflow stage ${active + 1} of 4`}>
          {FEATURE_ACTS.map((_, i) => <span className={i === active ? "active" : ""} key={i}>{String(i + 1).padStart(2, "0")}</span>)}
          <i><b style={{ width: `${progress * 100}%` }} /></i>
        </div>
      </div>
    </section>
  );
};

const ToolBanner = () => {
  const renderTools = (duplicate = false) => (
    <div className="orbit-tool-track" aria-hidden={duplicate ? "true" : undefined}>
      {FEATURES.map((feature) => (
        <div className={`orbit-tool ${feature.tier === "Pro" ? "pro" : ""}`} key={`${duplicate ? "copy-" : ""}${feature.id}`}>
          <span className="orbit-tool-icon"><Icon name={feature.icon} size={16} /></span>
          <span className="orbit-tool-copy">
            <strong>{feature.title}</strong>
            <small>{feature.tier}</small>
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="orbit-tool-banner" aria-labelledby="orbit-tool-title">
      <div className="orbit-tool-banner-head">
        <span className="orbit-tool-count">Integrated discovery toolkit</span>
        <h2 id="orbit-tool-title">One workbench. The whole discovery loop.</h2>
        <p>From structure preparation to generative design, every tool shares the same projects, molecules, and results.</p>
      </div>
      <div className="orbit-tool-marquee">
        <div className="orbit-tool-reel">
          {renderTools()}
          {renderTools(true)}
        </div>
      </div>
    </section>
  );
};

const FeaturesPage = () => (
  <div className="page-fade features-orbit-page">
    <section className="orbit-hero">
      <div className="orbit-hero-inner">
        <div className="orbit-badge"><span />Self-hosted CADD workbench</div>
        <h1>The whole pipeline,<br />on <em>your</em> hardware.</h1>
        <p>Prepare proteins, edit ligands, dock, simulate, and compute free energies in one workbench. Every structure, job, and result stays on machines you control.</p>
        <div className="orbit-hero-actions">
          <button className="btn btn-primary" onClick={() => window.__nav("download")}>Download launcher</button>
          <button className="btn btn-secondary" onClick={() => window.__nav("docs")}>Read the docs</button>
        </div>
        <div className="orbit-tech"><span>AutoDock Vina · OpenMM</span><span>Mol* viewer</span><span>PolyForm Noncommercial</span></div>
      </div>
      <div className="orbit-scroll-cue"><span>Scroll</span><Icon name="arrowDown" size={14} /></div>
    </section>

    <OrbitStory />

    <ToolBanner />

    <section className="orbit-leverage">
      <div className="container-wide">
        <div className="orbit-leverage-head">
          <div className="eyebrow"><span className="dot" />Built for scientific leverage</div>
          <h2>Spend your time on the question, not the plumbing.</h2>
          <p>Ligand-X turns a fragmented computational workflow into one continuous scientific workspace—from the first structure to the evidence behind a decision.</p>
        </div>
        <div className="orbit-outcomes">
          {[
            {
              index: "01",
              label: "Continuity",
              title: "Keep the scientific context intact.",
              copy: "Structures, ligands, poses, trajectories, and calculations live in the same project record. Every result remains connected to the inputs and choices that produced it.",
              note: "One project · traceable artefacts · reusable inputs",
            },
            {
              index: "02",
              label: "Iteration",
              title: "Move from hypothesis to comparison faster.",
              copy: "Prepare a target once, test a ligand series, inspect poses, and push the strongest candidates into simulation or free-energy workflows without rebuilding the setup.",
              note: "Prepare → dock → simulate → compare",
            },
            {
              index: "03",
              label: "Control",
              title: "Use serious compute without surrendering your data.",
              copy: "Run locally, use the hardware you already control, and keep proprietary structures and results inside your network while workers handle long-running jobs.",
              note: "Self-hosted · GPU-aware · private by default",
            },
          ].map((outcome) => (
            <article className="orbit-outcome" key={outcome.index}>
              <div className="orbit-outcome-meta"><span>{outcome.index}</span><span>{outcome.label}</span></div>
              <h3>{outcome.title}</h3>
              <p>{outcome.copy}</p>
              <div className="orbit-outcome-note">{outcome.note}</div>
            </article>
          ))}
        </div>

        <div className="orbit-capability-index">
          <div className="orbit-capability-intro">
            <span className="mono">Capability index</span>
            <h3>Use the workflow you need today. Extend it tomorrow.</h3>
          </div>
          <div className="orbit-capability-groups">
            <div>
              <span className="orbit-capability-label">Open Core</span>
              <div className="orbit-capability-list">
                {FEATURES.filter((feature) => feature.tier === "Open Core").map((feature) => (
                  <span key={feature.id}><Icon name={feature.icon} size={13} />{feature.title}</span>
                ))}
              </div>
            </div>
            <div className="pro">
              <span className="orbit-capability-label">Pro compute</span>
              <div className="orbit-capability-list">
                {FEATURES.filter((feature) => feature.tier === "Pro").map((feature) => (
                  <span key={feature.id}><Icon name={feature.icon} size={13} />{feature.title}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="orbit-final">
      <div><h2>Run it on the box under your desk.</h2><p>One launcher, one container stack, no data leaving your network.</p><button className="btn btn-primary" onClick={() => window.__nav("download")}>Download launcher</button></div>
    </section>
  </div>
);

Object.assign(window, { FeaturesPage });
