// ============================================================
// ProPage — sales page for licensed upgrades and advanced services
// ============================================================

const PRO_MODULES = [
  {
    title: "Property risk: Quantum Chemistry",
    icon: "sigma",
    desc: "ORCA-backed geometry, frequency, charge, Fukui, and property calculations for ligand design.",
    tags: ["ORCA", "QC worker", "charges"],
  },
  {
    title: "Property risk: ADMET",
    icon: "flask",
    desc: "Batch drug-likeness and ADMET property screening for project molecule libraries.",
    tags: ["batch SMILES", "properties", "cache"],
  },
  {
    title: "Binding confidence: Boltz-2",
    icon: "atom",
    desc: "GPU-backed Boltz-2 workflows for structure and protein-ligand binding affinity prediction.",
    tags: ["GPU", "affinity", "reports"],
  },
  {
    title: "Binding confidence: ABFE and RBFE",
    icon: "scale",
    desc: "Alchemical free-energy workflows for absolute affinity estimates and lead-optimization networks.",
    tags: ["OpenFE", "MBAR", "GPU-long"],
  },
  {
    title: "Design expansion: REINVENT",
    icon: "network",
    desc: "Generative design workflows for molecule generation and optimization against project objectives.",
    tags: ["generation", "optimization", "private worker"],
  },
];

const WHY_PRO_POINTS = [
  {
    title: "Prioritize compounds with more evidence",
    desc: "Combine docking, MD, ADMET, affinity prediction, and free-energy workflows in one project context before spending synthesis or assay budget.",
  },
  {
    title: "Keep sensitive discovery work local",
    desc: "Run licensed Pro services through private containers on your own workstation or server while keeping structures and results on your hardware.",
  },
  {
    title: "Reduce workflow fragmentation",
    desc: "Stop moving structures, poses, tables, and scripts across disconnected notebooks, cloud tools, and viewers for each decision cycle.",
  },
];

const DECISION_MAP_ROWS = [
  {
    gate: "Hit triage: what enters synthesis this cycle?",
    baseline: "Docking-heavy triage with manual spreadsheet filtering and limited liability checks.",
    proWorkflow: "ADMET + QC + Boltz-2",
    output: "Ranked shortlist with confidence tiering, liabilities flags, and charge sanity checks.",
    impact: "Reduces low-probability synthesis picks and shortens sprint-level triage decisions.",
  },
  {
    gate: "Lead series selection: which binders advance?",
    baseline: "Pose inspection and mixed-tool affinity proxies with weak uncertainty framing.",
    proWorkflow: "Boltz-2 + ABFE and RBFE",
    output: "Affinity confidence package with rank ordering and free-energy evidence.",
    impact: "Improves go/no-go confidence before committing assay and medicinal chemistry bandwidth.",
  },
  {
    gate: "Design expansion: what should we make next?",
    baseline: "Medicinal chemistry ideation across disconnected notebooks and scoring scripts.",
    proWorkflow: "REINVENT + ADMET + project constraints",
    output: "Proposal set of novel structures with objective-aware scoring and filter traceability.",
    impact: "Increases idea throughput while keeping proposals aligned to project objectives.",
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
    desc: "Unlock Pro modules for academic labs and research groups that need advanced computational workflows.",
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

const ProPage = () => (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-6)', borderBottom: '1px solid var(--border)' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <div>
            <div className="eyebrow"><span className="dot" />Ligand-X Pro</div>
            <h1 style={{ fontSize: 'clamp(38px, 5vw, 68px)', margin: '14px 0 18px', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 600 }}>
              Move from screening and simulation into higher-confidence prioritization.
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 720, margin: 0, lineHeight: 1.6 }}>
              Upgrade the local Ligand-X environment with licensed modules grouped around the decisions
              teams make every week: property risk, binding confidence, design expansion, and mechanistic insight.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => window.__nav('contact')}>
                <Icon name="scale" size={16} />
                Contact sales
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
            <h2>Built for teams past first-pass docking.</h2>
          </div>
          <p className="sub">
            Pro is for biotech, pharma, and academic teams that need stronger evidence before committing synthesis, assay, or additional compute budget.
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
            <div className="eyebrow"><span className="dot" />Decision map</div>
            <h2>Map pharma decision gates to operational evidence.</h2>
          </div>
          <p className="sub">
            Evaluate Pro by decision gate, evidence artifact, and operational impact, not just by module inventory.
          </p>
        </div>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
            <thead>
              <tr>
                {[
                  "Program decision gate",
                  "Baseline today",
                  "Pro workflow",
                  "Decision output artifact",
                  "Commercial impact",
                ].map((header) => (
                  <th key={header} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 13, letterSpacing: '0.01em', color: 'var(--ink-3)', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DECISION_MAP_ROWS.map((row, idx) => (
                <tr key={row.gate}>
                  <td style={{ padding: '14px 16px', borderBottom: idx === DECISION_MAP_ROWS.length - 1 ? 'none' : '1px solid var(--border)', color: 'var(--ink-2)', fontWeight: 500, verticalAlign: 'top', lineHeight: 1.45 }}>{row.gate}</td>
                  <td style={{ padding: '14px 16px', borderBottom: idx === DECISION_MAP_ROWS.length - 1 ? 'none' : '1px solid var(--border)', color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.45 }}>{row.baseline}</td>
                  <td style={{ padding: '14px 16px', borderBottom: idx === DECISION_MAP_ROWS.length - 1 ? 'none' : '1px solid var(--border)', color: 'var(--ink-2)', verticalAlign: 'top', lineHeight: 1.45 }}>{row.proWorkflow}</td>
                  <td style={{ padding: '14px 16px', borderBottom: idx === DECISION_MAP_ROWS.length - 1 ? 'none' : '1px solid var(--border)', color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.45 }}>{row.output}</td>
                  <td style={{ padding: '14px 16px', borderBottom: idx === DECISION_MAP_ROWS.length - 1 ? 'none' : '1px solid var(--border)', color: 'var(--muted)', verticalAlign: 'top', lineHeight: 1.45 }}>{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Advanced services</div>
            <h2>Pro modules support the decisions after the first screen.</h2>
          </div>
          <p className="sub">
            Keep the same local UI, projects, job tracking, and Docker deployment model while adding private services for higher-value prioritization work.
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
            <h2>Choose the right access model.</h2>
          </div>
          <p className="sub">
            Free runs the open-core workbench. Academic and Pro licenses unlock advanced modules through signed license files and private image access.
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
            <h2 style={{ marginTop: 14 }}>Private services, same local Ligand-X experience.</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
              The launcher and gateway verify signed licenses, request access to the private Pro image namespace,
              and start only the services covered by the active license. Your scientific data still runs on your hardware.
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
            <div className="eyebrow"><span className="dot" />What happens next</div>
            <h2>Clear purchase and onboarding path.</h2>
          </div>
          <p className="sub">
            After you contact us, we scope deployment, align modules to your workflows, and help you activate the right license path.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            "Discuss deployment target: desktop, workstation, or server",
            "Identify required modules by workflow and decision goals",
            "Issue Academic or Pro license access",
            "Install through launcher or Docker Compose",
            "Pull private Pro images via registry credentials",
            "Optional onboarding to validate your first workflow",
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
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot" />Upgrade path</div>
        <h2 style={{ marginTop: 16, fontSize: 'clamp(28px, 3vw, 42px)', maxWidth: 760, margin: '16px auto 16px' }}>
          Move from screened hits to higher-confidence prioritization while staying local and private.
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 620, margin: '0 auto 32px', fontSize: 16 }}>
          Contact us for module selection, license activation, and deployment support for your team.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => window.__nav('contact')}>
            <Icon name="scale" size={16} />
            Contact sales
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
