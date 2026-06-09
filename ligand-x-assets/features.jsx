// ============================================================
// FeaturesPage — current open-core + Pro capability reference
// ============================================================

const FEATURES = [
  {
    id: "structure",
    icon: "funnel",
    tier: "Open Core",
    tag: "structure",
    title: "Structure and Protein Cleaning",
    summary: "Prepare PDB structures for downstream modeling with component detection, repair, and cleanup.",
    details: [
      "Fetch or import PDB structures",
      "Identify chains, ligands, waters, ions, and metals",
      "Repair missing atoms and incomplete residues",
      "Optional water and ion removal",
      "Export simulation-ready PDB assets",
    ],
    tools: ["PDBFixer", "BioPython", "RDKit", "OpenBabel"],
    formats: ["PDB / mmCIF -> cleaned PDB"],
  },
  {
    id: "docking",
    icon: "target",
    tier: "Open Core",
    tag: "docking",
    title: "Molecular Docking",
    summary: "Single and batch ligand pose prediction with AutoDock Vina and interactive result review.",
    details: [
      "Receptor and ligand PDBQT preparation",
      "Configurable binding box and exhaustiveness",
      "Ranked poses with affinity scores",
      "Interaction summaries and pose downloads",
      "Mol* visualization for docked complexes",
    ],
    tools: ["AutoDock Vina", "Meeko", "RDKit", "OpenBabel", "Mol*"],
    formats: ["PDB + SDF / SMILES -> ranked poses"],
  },
  {
    id: "md",
    icon: "wave",
    tier: "Open Core",
    tag: "simulation",
    title: "Molecular Dynamics",
    summary: "OpenMM molecular dynamics workflows for minimization, equilibration, and trajectory generation.",
    details: [
      "Protein-ligand system construction",
      "OpenMM/OpenFF force-field setup",
      "Minimization, NVT, and NPT stages",
      "GPU acceleration when CUDA is available",
      "Trajectory and checkpoint outputs",
    ],
    tools: ["OpenMM", "OpenFF", "AmberTools", "MDAnalysis"],
    formats: ["PDB + ligand -> PDB / DCD / metrics"],
  },
  {
    id: "alignment",
    icon: "network",
    tier: "Open Core",
    tag: "structure",
    title: "Molecule and Structure Alignment",
    summary: "Align ligands and structures for comparison, mapping previews, and workflow setup.",
    details: [
      "3D molecule alignment for ligand series",
      "Reference-based pose comparison",
      "Geometry and RMSD outputs",
      "Prepared inputs for docking and free-energy workflows",
    ],
    tools: ["RDKit", "Kartograf", "OpenFE helpers"],
    formats: ["SDF series -> aligned structures"],
  },
  {
    id: "msa",
    icon: "book",
    tier: "Open Core",
    tag: "sequence",
    title: "Sequence Tools and MSA",
    summary: "Pairwise and multiple-sequence analysis for protein-family context and target comparison.",
    details: [
      "Pairwise sequence alignment workflows",
      "Multiple sequence alignment service",
      "Cached sequence results",
      "Outputs for target comparison and reporting",
    ],
    tools: ["EMBOSS", "MSA service", "FastAPI"],
    formats: ["FASTA -> alignments and reports"],
  },
  {
    id: "editor",
    icon: "atom",
    tier: "Open Core",
    tag: "structure",
    title: "Molecule Editor and Library",
    summary: "Draw, import, save, and reuse molecules and project assets inside the web app.",
    details: [
      "Ketcher molecule drawing and editing",
      "SMILES, SDF, and PDB import/export",
      "Persistent project molecule library",
      "Saved structures, poses, and generated assets",
    ],
    tools: ["Ketcher", "RDKit", "PostgreSQL"],
    formats: ["SMILES / SDF / PDB -> project assets"],
  },
  {
    id: "pocket-finder",
    icon: "search",
    tier: "Open Core",
    tag: "structure",
    title: "Binding-Site and Pocket Finding",
    summary: "Detect candidate binding pockets and prepare search regions for structure-based workflows.",
    details: [
      "Pocket prediction for imported protein structures",
      "Binding-site summaries for docking setup",
      "Reusable pocket coordinates in projects",
      "Integration with downstream pose workflows",
    ],
    tools: ["P2Rank", "DeepPocket assets", "FastAPI"],
    formats: ["PDB -> pocket candidates"],
  },
  {
    id: "qc",
    icon: "sigma",
    tier: "Pro",
    tag: "simulation",
    title: "Quantum Chemistry",
    summary: "Licensed ORCA-backed calculations for geometries, charges, energetics, and molecular properties.",
    details: [
      "Geometry optimization and single-point jobs",
      "Frequency, charge, and Fukui analyses",
      "ORCA parser integration",
      "Worker-backed long-running calculations",
    ],
    tools: ["ORCA", "RDKit", "Pro QC worker"],
    formats: ["SDF / XYZ -> energies, charges, properties"],
  },
  {
    id: "admet",
    icon: "flask",
    tier: "Pro",
    tag: "structure",
    title: "ADMET Prediction",
    summary: "Licensed screening for drug-likeness and ADMET properties across single molecules or batches.",
    details: [
      "Batch SMILES screening",
      "Drug-likeness and property summaries",
      "Cached project-level predictions",
      "Private Pro container image",
    ],
    tools: ["PyTorch", "RDKit", "ADMET service"],
    formats: ["SMILES / SDF -> ADMET table"],
  },
  {
    id: "boltz2",
    icon: "atom",
    tier: "Pro",
    tag: "structure",
    title: "Boltz-2 Affinity Prediction",
    summary: "Licensed GPU service for Boltz-2 structure and binding-affinity prediction workflows.",
    details: [
      "Protein-ligand affinity prediction",
      "GPU-backed execution",
      "Project outputs and downloadable reports",
      "Private Pro image with licensed access",
    ],
    tools: ["Boltz-2", "CUDA", "Pro GPU worker"],
    formats: ["Target + ligand -> affinity prediction"],
  },
  {
    id: "free-energy",
    icon: "scale",
    tier: "Pro",
    tag: "simulation",
    title: "ABFE and RBFE Workflows",
    summary: "Licensed alchemical free-energy calculations for single ligands and lead-optimization series.",
    details: [
      "Absolute binding free energy workflows",
      "Relative binding free energy networks",
      "Mapping previews and overlap analysis",
      "GPU-long worker execution",
    ],
    tools: ["OpenFE", "OpenMM", "LOMAP", "MBAR"],
    formats: ["PDB + ligand series -> DG / DDG"],
  },
  {
    id: "reinvent",
    icon: "sigma",
    tier: "Pro",
    tag: "structure",
    title: "REINVENT Generative Design",
    summary: "Licensed de novo molecule generation and optimization workflows backed by private workers.",
    details: [
      "Configuration generation for REINVENT runs",
      "Worker-backed molecule generation",
      "Project-level result handling",
      "Private Pro service and worker images",
    ],
    tools: ["REINVENT", "RDKit", "Pro worker"],
    formats: ["Objective config -> generated molecules"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All capabilities" },
  { id: "core", label: "Open Core" },
  { id: "structure", label: "Structure" },
  { id: "simulation", label: "Simulation" },
  { id: "sequence", label: "Sequence" },
  { id: "pro", label: "Pro" },
];

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

const WORKFLOW_PRESETS = [
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

const filterFeature = (feature, category) => {
  if (category === "all") return true;
  if (category === "core") return feature.tier === "Open Core";
  if (category === "pro") return feature.tier === "Pro";
  return feature.tag === category;
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
  <section className="fx-workflow-section">
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
      {WORKFLOW_PRESETS.map((preset, idx) => {
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

const FeaturesPage = () => {
  const [selectedId, setSelectedId] = React.useState("docking");
  const [cat, setCat] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const listRef = React.useRef(null);
  const detailRef = React.useRef(null);
  const [listMaxHeight, setListMaxHeight] = React.useState(null);

  const featureMap = React.useMemo(
    () => Object.fromEntries(FEATURES.map((f) => [f.id, f])),
    []
  );

  const filtered = FEATURES.filter((f) => {
    if (!filterFeature(f, cat)) return false;
    if (!query.trim()) return true;
    const needle = query.trim().toLowerCase();
    return [
      f.title,
      f.summary,
      f.tier,
      f.tag,
      ...f.details,
      ...f.tools,
      ...f.formats,
    ].join(" ").toLowerCase().includes(needle);
  });

  React.useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some((f) => f.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = filtered.find((f) => f.id === selectedId) || filtered[0] || null;
  const grouped = {
    core: filtered.filter((f) => f.tier === "Open Core"),
    pro: filtered.filter((f) => f.tier === "Pro"),
  };

  React.useEffect(() => {
    if (!detailRef.current) return;
    const sync = () => {
      if (!detailRef.current) return;
      setListMaxHeight(detailRef.current.offsetHeight);
    };
    sync();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    if (ro) ro.observe(detailRef.current);
    window.addEventListener("resize", sync);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [selectedId, cat, query]);

  return (
    <div className="page-fade">
      <section style={{ padding: 'var(--sp-9) 0 var(--sp-7)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow"><span className="dot" />Features</div>
          <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
            Open-core workflows with licensed Pro services.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 720, margin: 0 }}>
            Ligand-X combines local structure handling, docking, MD, sequence analysis, editing, and project storage
            with licensed Pro modules for quantum chemistry, ADMET, Boltz-2, free energy, and REINVENT.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--sp-7) 0 0' }}>
        <div className="container">
          <div className="fx-controls">
            <label className="fx-search">
              <Icon name="search" size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules, tools, methods..."
              />
            </label>
            <div className="fx-filter-row">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`fx-filter-pill ${cat === c.id ? "active" : ""}`}
                  onClick={() => setCat(c.id)}
                >
                  {c.label}
                  <span className="fx-filter-count">
                    {FEATURES.filter((f) => filterFeature(f, c.id)).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--sp-5) 0 var(--sp-9)' }}>
        <div className="container">
          <div className="fx-split">
            <aside
              ref={listRef}
              className="fx-list"
              style={listMaxHeight ? { maxHeight: `${listMaxHeight}px` } : undefined}
            >
              {grouped.core.length > 0 && (
                <>
                  <div className="fx-group-title">Open Core</div>
                  {grouped.core.map((f) => (
                    <button
                      key={f.id}
                      className={`fx-row ${selected?.id === f.id ? "active" : ""}`}
                      onClick={() => setSelectedId(f.id)}
                    >
                      <div className="feature-icon">
                        <Icon name={f.icon} size={22} style={{ color: "var(--accent-strong)" }} />
                      </div>
                      <div className="fx-row-copy">
                        <div className="feature-title">{f.title}</div>
                        <div className="feature-summary">{f.summary}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {grouped.pro.length > 0 && (
                <>
                  <div className="fx-group-title">Pro</div>
                  {grouped.pro.map((f) => (
                    <button
                      key={f.id}
                      className={`fx-row pro ${selected?.id === f.id ? "active" : ""}`}
                      onClick={() => setSelectedId(f.id)}
                    >
                      <div className="feature-icon pro">
                        <Icon name={f.icon} size={22} style={{ color: "#b7791f" }} />
                      </div>
                      <div className="fx-row-copy">
                        <div className="feature-title">{f.title}</div>
                        <div className="feature-summary">{f.summary}</div>
                      </div>
                      <span className="fx-pro-badge">PRO</span>
                    </button>
                  ))}
                </>
              )}
            </aside>

            <main ref={detailRef}>
              {selected ? (
                <FeatureDetail feature={selected} />
              ) : (
                <div className="fx-empty">No capabilities match your filters.</div>
              )}
            </main>
          </div>

          <WorkflowShowcase featureMap={featureMap} onPreview={setSelectedId} />
        </div>
      </section>

      <CTASection />
    </div>
  );
};

Object.assign(window, { FeaturesPage });
