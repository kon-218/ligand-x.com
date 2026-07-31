// ============================================================
// ProPage — licensed modules and upgrade paths
// ============================================================

const PRO_MODULES = shippingModules()
  .filter((module) => module.edition === "pro")
  .map((module) => ({
    title: module.name,
    icon: module.icon,
    desc: module.summary,
    tags: [module.short, module.category, module.edition],
  }));

const WHY_PRO_POINTS = [
  {
    title: "More evidence before you synthesize",
    desc: "Run ADMET, affinity prediction, free energies, and QC in the same project as your docking and MD before you spend on synthesis or assays.",
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
    items: ["No license file", "Local Docker deployment", "Public launcher and prebuilt images"],
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
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--sp-4)", display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div className="feature-icon" style={{ width: 44, height: 44 }}>
        <Icon name={proModule.icon} size={24} style={{ color: "#b7791f" }} />
      </div>
      <h3 style={{ margin: 0, fontSize: 18 }}>{proModule.title}</h3>
    </div>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>{proModule.desc}</p>
    <div className="tools" style={{ marginTop: "auto" }}>
      {proModule.tags.map((tag) => <span className="tool-pill" key={tag}>{tag}</span>)}
    </div>
  </div>
);

const ProEditionCard = ({ edition }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--sp-5)" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 20 }}>{edition.name}</h3>
      <span className="tag">{edition.badge}</span>
    </div>
    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, minHeight: 66 }}>{edition.desc}</p>
    <ul style={{ margin: "16px 0 0", paddingLeft: 18, color: "var(--ink-2)", fontSize: 14 }}>
      {edition.items.map((item) => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
    </ul>
  </div>
);

const WhyProCard = ({ point }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--sp-5)" }}>
    <h3 style={{ margin: "0 0 10px", fontSize: 18 }}>{point.title}</h3>
    <p style={{ margin: 0, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{point.desc}</p>
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
    <section style={{ padding: "var(--sp-8) 0 var(--sp-6)", borderBottom: "1px solid var(--border)" }}>
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)", gap: "var(--sp-8)", alignItems: "center" }}>
          <div>
            <div className="eyebrow"><span className="dot" />{SITE_COPY.pro.eyebrow}</div>
            <h1 style={{ fontSize: "clamp(38px, 5vw, 68px)", margin: "14px 0 18px", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 600 }}>{SITE_COPY.pro.h1}</h1>
            <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 720, margin: 0, lineHeight: 1.6 }}>{SITE_COPY.pro.lede}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => window.__nav("contact")}>
                <Icon name="scale" size={16} />
                {CTA.license}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => window.__nav("features")}>
                {CTA.features}
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

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--sp-5)", boxShadow: "var(--shadow)" }}>
            <div className="mono" style={{ color: "var(--muted)", fontSize: 12, marginBottom: 12 }}>LICENSED PRO STACK</div>
            <div style={{ display: "grid", gap: 9 }}>
              {["QC and ADMET", "Boltz-2 affinity", "ABFE and RBFE free energy", "REINVENT generation"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "11px 13px" }}>
                  <Icon name="check" size={14} style={{ color: "#2f855a" }} />
                  <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "18px 0 0", lineHeight: 1.55 }}>Runs locally through private containers with license-based module access.</p>
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
          <p className="sub">For biotech, pharma, and academic teams who want ADMET, affinity, or free-energy readouts before committing synthesis or compute spend.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
          {WHY_PRO_POINTS.map((point) => <WhyProCard point={point} key={point.title} />)}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Where Pro fits</div>
            <h2>Typical workflows after the first dock or MD pass.</h2>
          </div>
          <p className="sub">Examples of questions teams answer with Pro modules, not a module checklist.</p>
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
          <p className="sub">Same local UI, projects, and job tracking. Private containers for the modules your license covers.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {PRO_MODULES.map((proModule) => <ProModuleCard proModule={proModule} key={proModule.title} />)}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="dot" />Editions</div>
            <h2>Free, Academic, or Commercial Pro.</h2>
          </div>
          <p className="sub">Open Core is free. Academic and Commercial Pro licenses unlock advanced modules via a signed license file and private image access.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
          {PRO_EDITIONS.map((edition) => <ProEditionCard edition={edition} key={edition.name} />)}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "var(--sp-5)" }}>
          <div>
            <div className="eyebrow"><span className="dot" />Ready to compare licenses?</div>
            <h2 style={{ margin: "10px 0 0" }}>Tell us which modules you need.</h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => window.__nav("contact")}>{CTA.license}</button>
            <button className="btn btn-secondary btn-lg" onClick={() => window.__nav("download")}>{CTA.download}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

Object.assign(window, { ProPage });
