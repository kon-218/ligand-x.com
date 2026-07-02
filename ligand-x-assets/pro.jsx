// ============================================================
// ProPage — licensed modules and upgrade paths
// ============================================================

const PRO_MODULES = [
  {
    title: "Quantum chemistry (QC)",
    icon: "sigma",
    desc: "ORCA-backed geometry, frequencies, charges, Fukui indices, and related property calculations.",
    tags: ["ORCA", "QC worker", "charges"],
  },
  {
    title: "ADMET screening",
    icon: "flask",
    desc: "Batch drug-likeness and ADMET property screening across a project molecule library.",
    tags: ["batch SMILES", "properties", "cache"],
  },
  {
    title: "Boltz-2",
    icon: "atom",
    desc: "GPU-backed Boltz-2 workflows for structure and protein-ligand binding affinity prediction.",
    tags: ["GPU", "affinity", "reports"],
  },
  {
    title: "ABFE and RBFE",
    icon: "scale",
    desc: "Alchemical free-energy workflows for absolute affinity estimates and lead-optimization networks.",
    tags: ["OpenFE", "MBAR", "GPU-long"],
  },
  {
    title: "REINVENT",
    icon: "network",
    desc: "Generative design workflows for molecule generation and optimization against project objectives.",
    tags: ["generation", "optimization", "private worker"],
  },
];

const WHY_PRO_POINTS = [
  {
    title: "More evidence before you synthesize",
    desc: "Run ADMET, affinity prediction, free energies, and QC in the same project as your docking and MD, before you spend on synthesis or assays.",
  },
  {
    title: "Keep sensitive work local",
    desc: "Pro modules run in private containers on your workstation or server. Structures and results stay on your hardware.",
  },
  {
    title: "Fewer tools to stitch together",
    desc: "Stop copying poses, tables, and scripts between notebooks, cloud apps, and viewers every time you need a new readout.",
  },
];

const DECISION_MAP_ROWS = [
  {
    question: "Which hits to make?",
    without: "Docking scores and a spreadsheet",
    modules: "ADMET + QC + Boltz-2",
    result: "Shortlist with ADMET flags and affinity estimates",
  },
  {
    question: "Which binders advance?",
    without: "Pose review and rough affinity guesses",
    modules: "Boltz-2 + ABFE/RBFE",
    result: "Rank order backed by affinity and free energies",
  },
  {
    question: "What to make next?",
    without: "Notebook ideation and one-off scripts",
    modules: "REINVENT + ADMET",
    result: "Novel structures scored to project filters",
  },
];

const PRO_EDITIONS = [
  {
    name: "Free",
    badge: "Open core",
    desc: "Run the local CADD workbench with core structure, docking, MD, sequence, editor, and project workflows.",
    items: ["No license file", "Local Docker deployment", "Public launcher & prebuilt images"],
  },
  {
    name: "Academic",
    badge: "Licensed",
    desc: "Unlock Pro modules for academic labs and research groups.",
    items: ["Signed Academic license", "All Pro modules", "Private image access"],
  },
  {
    name: "Pro",
    badge: "Commercial",
    desc: "Licensed commercial use with the paid Pro module entitlements listed in your agreement.",
    items: ["Commercial license", "Selected Pro entitlements", "Registry token access"],
  },
];

const ProModuleCard = ({ proModule }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div className="feature-icon" style={{ width: 44, height: 44 }}>
        <Icon name={proModule.icon} size={24} style={{ color: '#b7791f' }} />
      </div>
      <h3 style={{ margin: 0, fontSize: 18 }}>{proModule.title}</h3>
    </div>
    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14, lineHeight: 1.55 }}>{proModule.desc}</p>
    <div className="tools" style={{ marginTop: 'auto' }}>
      {proModule.tags.map((tag) => <span className="tool-pill" key={tag}>{tag}</span>)}
    </div>
  </div>
);

const ProEditionCard = ({ edition }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 20 }}>{edition.name}</h3>
      <span className="tag">{edition.badge}</span>
    </div>
    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, minHeight: 66 }}>{edition.desc}</p>
    <ul style={{ margin: '16px 0 0', paddingLeft: 18, color: 'var(--ink-2)', fontSize: 14 }}>
      {edition.items.map((item) => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
    </ul>
  </div>
);

const WhyProCard = ({ point }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
    <h3 style={{ margin: '0 0 10px', fontSize: 18 }}>{point.title}</h3>
    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6 }}>{point.desc}</p>
  </div>
);

const ProFitCard = ({ row }) => (
  <div className="pro-fit-card">
    <h3 className="pro-fit-question">{row.question}</h3>
    <div className="pro-fit-rows">
      <div className="pro-fit-row">
        <span className="pro-fit-label">Without</span>
        <span>{row.without}</span>
      </div>
      <div className="pro-fit-row">
        <span className="pro-fit-label">Pro</span>
        <span className="pro-fit-modules">{row.modules}</span>
      </div>
    </div>
    <p className="pro-fit-result">{row.result}</p>
  </div>
);

const ProPage = () => (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-6)', borderBottom: '1px solid var(--border)' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <div>
            <div className="eyebrow"><span className="dot" />Ligand-X Pro</div>
            <h1 style={{ fontSize: 'clamp(38px, 5vw, 68px)', margin: '14px 0 18px', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 600 }}>
              Go beyond docking and MD with licensed analysis modules.
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 720, margin: 0, lineHeight: 1.6 }}>
              Add QC, ADMET, Boltz-2, binding free energies, and generative design to your local Ligand-X install.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => window.__nav('contact')}>
                <Icon name="scale" size={16} />
                Request license
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => window.__nav('features')}>
                Compare features
                <Icon name="arrow" size={14} />
              </button>
            </div>
            <div className="hero-meta" style={{ marginTop: 20 }}>
              <span>Academic licenses</span>
              <span>Commercial Pro</span>
              <span>Private GHCR images</span>
              <span>Local deployment</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)', boxShadow: 'var(--shadow)' }}>
            <div className="mono" style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 12 }}>LICENSED PRO STACK</div>
            <div style={{ display: 'grid', gap: 9 }}>
              {[
                "QC and ADMET",
                "Boltz-2 affinity",
                "ABFE and RBFE free energy",
                "REINVENT generation",
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '11px 13px' }}>
                  <Icon name="check" size={14} style={{ color: '#2f855a' }} />
                  <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: '18px 0 0', lineHeight: 1.55 }}>
              Runs locally through private containers with license-based module access.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Why Pro</div>
            <h2>When docking alone is not enough.</h2>
          </div>
          <p className="sub">
            For biotech, pharma, and academic teams who want ADMET, affinity, or free-energy readouts before committing synthesis or compute spend.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
          {WHY_PRO_POINTS.map((point) => <WhyProCard point={point} key={point.title} />)}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Where Pro fits</div>
            <h2>Typical workflows after the first dock or MD pass.</h2>
          </div>
          <p className="sub">
            Examples of questions teams answer with Pro modules, not a module checklist.
          </p>
        </div>
        <div className="pro-fit-grid">
          {DECISION_MAP_ROWS.map((row) => <ProFitCard row={row} key={row.question} />)}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Modules</div>
            <h2>What Pro adds on top of Open Core.</h2>
          </div>
          <p className="sub">
            Same local UI, projects, and job tracking. Private containers for the modules your license covers.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {PRO_MODULES.map((proModule) => <ProModuleCard proModule={proModule} key={proModule.title} />)}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Editions</div>
            <h2>Free, Academic, or Commercial Pro.</h2>
          </div>
          <p className="sub">
            Open Core is free. Academic and Commercial Pro licenses unlock advanced modules via a signed license file and private image access.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {PRO_EDITIONS.map((edition) => <ProEditionCard edition={edition} key={edition.name} />)}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.7fr)', gap: 'var(--sp-7)', alignItems: 'center' }}>
          <div>
            <div className="eyebrow"><span className="dot" />Deployment</div>
            <h2 style={{ marginTop: 14 }}>Private containers, same Ligand-X UI.</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
              The launcher checks your license, pulls the private Pro images it needs, and starts only the services your license covers. Your data still runs on your hardware.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10, marginTop: 18 }}>
              {[
                "Deployment modes: launcher, local server, headless Compose",
                "Data locality: structures and results remain local",
                "License models: Academic and Commercial",
                "Outputs: reports, trajectories, affinity estimates, generated molecules",
              ].map((item) => (
                <div key={item} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 12px', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <CodeBlock
            label="pro-images"
            copyText={`LIGANDX_PRO_IMAGE_PREFIX=ghcr.io/kon-218/ligand-x-pro\n# license unlocks private services\nmake pull\nmake prod`}
          >
            <Kw>LIGANDX_PRO_IMAGE_PREFIX</Kw>=<Str>ghcr.io/kon-218/ligand-x-pro</Str>{"\n"}
            <Comment># license unlocks private services</Comment>{"\n"}
            <Cmd><Fn>make</Fn> pull</Cmd>{"\n"}
            <Cmd><Fn>make</Fn> prod</Cmd>
          </CodeBlock>
        </div>
      </div>
    </section>

    <section className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Getting started</div>
            <h2>How to get a license.</h2>
          </div>
          <p className="sub">
            After you submit a request, we help you pick modules, set up deployment, and activate your license.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            "Pick a deployment target: desktop, workstation, or server",
            "Choose the modules you need",
            "Receive an Academic or Commercial Pro license",
            "Install via launcher or Docker Compose",
            "Pull private Pro images with registry credentials",
            "Optional help validating your first workflow",
          ].map((step, index) => (
            <div key={step} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="tag" style={{ minWidth: 28, justifyContent: 'center' }}>{index + 1}</span>
              <span style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center', padding: '24px 0' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot" />Get Pro</div>
        <h2 style={{ marginTop: 16, fontSize: 'clamp(28px, 3vw, 42px)', maxWidth: 760, margin: '16px auto 16px' }}>
          Screen locally. Add Pro when you need deeper analysis.
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 620, margin: '0 auto 32px', fontSize: 16 }}>
          Tell us which modules you need and we'll help you get a license set up.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => window.__nav('contact')}>
            <Icon name="scale" size={16} />
            Request license
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => window.__nav('download')}>
            <Icon name="download" size={16} />
            Install Ligand-X
          </button>
        </div>
      </div>
    </section>
  </div>
);

Object.assign(window, { ProPage });
