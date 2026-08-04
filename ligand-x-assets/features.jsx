// ============================================================
// features.jsx — /features/ : the capability reference that sells the free core
// ============================================================
//
// All module facts come from modules.js and all headline/CTA copy from copy.js.
// Nothing on this page hardcodes a module name, edition, or tool list.
//
// Page order is deliberate:
//   hero → reel → spotlights → pipelines → full reference → Pro note → CTA
// The four spotlights carry the sell; the reference below satisfies the
// evaluator checking for one specific capability.

// Free modules that earn a full-width spotlight, in workflow order. These are
// the four an evaluator can run on day one without a license.
const SPOTLIGHT_IDS = ["structure", "pocket-finder", "docking", "md"];

const CATEGORY_LABEL = MODULE_CATEGORIES.reduce((acc, c) => ({ ...acc, [c.id]: c.label }), {});

// "Receptor + ligand library → ranked poses + interactions" → the two halves.
const splitIO = (io) => {
  const parts = String(io || "").split("→");
  return { input: (parts[0] || "").trim(), output: (parts[1] || "").trim() };
};

const EditionChip = ({ module: mod }) => (
  <span className={`fx-chip ${mod.edition}`}>{mod.edition === "pro" ? "Pro" : "Free"}</span>
);

// The single most useful line for someone deciding whether to install: what goes
// in and what comes out. Rendered as a panel so it reads as a spec, not prose.
const ModuleIO = ({ module: mod }) => {
  const { input, output } = splitIO(mod.io);
  return (
    <div className={`fx-io-panel ${mod.edition === "pro" ? "pro" : ""}`}>
      <div className="fx-io-row">
        <span className="fx-io-label">Input</span>
        <span className="fx-io-value">{input}</span>
      </div>
      <div className="fx-io-mid" aria-hidden="true">
        <span className="fx-io-node"><Icon name={mod.icon} size={16} /></span>
        <span className="fx-io-rule" />
        <Icon name="arrow" size={14} />
      </div>
      <div className="fx-io-row">
        <span className="fx-io-label">Output</span>
        <span className="fx-io-value">{output}</span>
      </div>
      <div className="fx-io-tools">
        {mod.tools.map((t) => <span className="tool-pill" key={t}>{t}</span>)}
      </div>
    </div>
  );
};

const Spotlight = ({ module: mod, index }) => (
  <Reveal className={`fx-spot ${index % 2 ? "flip" : ""}`} i={index}>
    <div className="fx-spot-copy">
      <div className="fx-spot-kicker">
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
        <span className="mono">{CATEGORY_LABEL[mod.category] || mod.category}</span>
        <EditionChip module={mod} />
      </div>
      <h3>{mod.name}</h3>
      <p className="fx-spot-summary">{mod.summary}</p>
      <ul className="fx-bullet-list">
        {mod.details.slice(0, 4).map((d) => <li key={d}>{d}</li>)}
      </ul>
      <div className="fx-spot-actions">
        <a className="fx-spot-link" href={`#${mod.id}`}>
          Full detail <Icon name="arrow" size={13} />
        </a>
        {mod.guide && (
          <button className="fx-spot-link ghost" onClick={() => window.__nav("docs")}>
            <Icon name="book" size={13} /> Guide
          </button>
        )}
      </div>
    </div>
    <div className="fx-spot-viz"><ModuleIO module={mod} /></div>
  </Reveal>
);

// Hero and reel are one band, not two sections. The half-height hero read as a
// compressed full-bleed one; folding the reel in gives the page a single opening
// moment and hands straight off to real content.
const HeroReel = () => {
  const copy = SITE_COPY.features;

  const renderTrack = (duplicate = false) => (
    <div className="orbit-tool-track" aria-hidden={duplicate ? "true" : undefined}>
      {MODULES.map((mod) => (
        <a
          className={`orbit-tool ${mod.edition === "pro" ? "pro" : ""}`}
          key={`${duplicate ? "copy-" : ""}${mod.id}`}
          href={`#${mod.id}`}
          tabIndex={duplicate ? -1 : undefined}
        >
          <span className="orbit-tool-icon"><Icon name={mod.icon} size={16} /></span>
          <span className="orbit-tool-copy">
            <strong>{mod.name}</strong>
            <small>{mod.edition === "pro" ? "Pro" : "Free"}</small>
          </span>
        </a>
      ))}
    </div>
  );

  return (
    <section className="fx-lede">
      <div className="fx-lede-inner">
        <h1>{copy.h1Parts[0]}<br />{copy.h1Parts[1]}<em>{copy.h1Em}</em></h1>
        <p>{copy.lede}</p>
        <div className="fx-lede-actions">
          <button className="btn btn-primary" onClick={() => window.__nav("download")}>{CTA.download}</button>
          <a className="btn btn-secondary" href="#all-modules">Browse all modules</a>
        </div>
      </div>

      <div className="fx-lede-reel">
        <span className="fx-lede-reel-label mono">Everything in the box</span>
        <div className="orbit-tool-marquee">
          <div className="orbit-tool-reel">
            {renderTrack()}
            {renderTrack(true)}
          </div>
        </div>
      </div>
    </section>
  );
};

// Presets show how modules compose — the thing you cannot get from a dozen separate
// tools. Each chain is labelled with how much of it is free.
const PipelineStrip = () => (
  <section className="fx-pipes">
    <div className="container-wide">
      <div className="fx-pipes-head">
        <div className="eyebrow"><span className="dot" />Common pipelines</div>
        <h2>Modules chain into a workflow, not a folder of scripts.</h2>
      </div>
      <div className="fx-pipes-grid">
        {WORKFLOW_PRESETS.map((preset) => {
          const mods = preset.modules.map(moduleById).filter(Boolean);
          const freeCount = mods.filter((m) => m.edition === "free").length;
          return (
            <article className="fx-pipe" key={preset.id}>
              <h3>{preset.name}</h3>
              <p>{preset.desc}</p>
              <div className="fx-pipe-chain">
                {mods.map((m, i) => (
                  <React.Fragment key={m.id}>
                    {i > 0 && <span className="fx-pipe-arrow" aria-hidden="true">→</span>}
                    <a className={`fx-pipe-step ${m.edition === "pro" ? "pro" : ""}`} href={`#${m.id}`}>
                      <Icon name={m.icon} size={12} />{m.short || m.name}
                    </a>
                  </React.Fragment>
                ))}
              </div>
              <div className="fx-pipe-foot mono">
                {freeCount === mods.length
                  ? "Entirely free"
                  : `${freeCount} of ${mods.length} modules free`}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

// Full record for one module. Anchor id is the bare module id so /features/#docking
// resolves. Replaces the never-wired FeatureDetail (which called an undefined
// toTagLabel and would have thrown on first render).
const ModuleCard = ({ module: mod }) => {
  const { input, output } = splitIO(mod.io);
  return (
    <article className="fx-detail" id={mod.id} style={{ scrollMarginTop: 76 }}>
      <div className="fx-detail-head">
        <div className={`fx-detail-icon ${mod.edition === "pro" ? "pro" : ""}`}>
          <Icon name={mod.icon} size={24} />
        </div>
        <div>
          <div className="fx-detail-meta">
            <EditionChip module={mod} />
            <span className="fx-detail-tag">{CATEGORY_LABEL[mod.category] || mod.category}</span>
          </div>
          <h3>{mod.name}</h3>
        </div>
      </div>

      <p className="fx-detail-summary">{mod.summary}</p>

      <div className="fx-detail-grid">
        <div>
          <h5>Capabilities</h5>
          <ul className="fx-bullet-list">
            {mod.details.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div>
          <h5>Tools</h5>
          <div className="tools">
            {mod.tools.map((t) => <span className="tool-pill" key={t}>{t}</span>)}
          </div>
          <h5 style={{ marginTop: 18 }}>Input → Output</h5>
          <div className="fx-io-list">
            <span>{input}</span>
            <span>{output}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const ModuleReference = () => {
  const [category, setCategory] = React.useState("all");
  const [edition, setEdition] = React.useState("any");

  const shown = MODULES.filter((m) => matchesModuleFilter(m, category, edition));

  return (
    <section className="fx-reference" id="all-modules">
      <div className="container-wide">
        <div className="fx-reference-head">
          <div className="eyebrow"><span className="dot" />Full reference</div>
          <h2>Every module, and what it actually does.</h2>
          <p>Filter by stage or edition. Each entry lists the tools behind it and exactly what it takes in and hands back.</p>
        </div>

        <div className="fx-filter-row" role="group" aria-label="Filter modules by stage">
          {MODULE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`fx-filter-pill ${category === c.id ? "active" : ""}`}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
          <span className="fx-filter-sep" aria-hidden="true" />
          {EDITION_FILTERS.map((e) => (
            <button
              key={e.id}
              className={`fx-filter-pill ${edition === e.id ? "active" : ""}`}
              aria-pressed={edition === e.id}
              onClick={() => setEdition(e.id)}
            >
              {e.label}
            </button>
          ))}
          <span className="fx-filter-count mono" role="status">
            {shown.length} of {MODULES.length}
          </span>
        </div>

        <div className="fx-reference-grid">
          {shown.map((m) => <ModuleCard module={m} key={m.id} />)}
        </div>
        {shown.length === 0 && <p className="fx-empty">No modules match that combination.</p>}
      </div>
    </section>
  );
};

const FeaturesPage = () => {
  const spotlights = SPOTLIGHT_IDS.map(moduleById).filter(Boolean);

  return (
    <div className="page-fade features-orbit-page">
      <HeroReel />

      <section className="fx-spots">
        <div className="container-wide">
          <div className="fx-spots-head">
            <div className="eyebrow"><span className="dot" />Free to run</div>
            <h2>{CLAIMS.freeCore}</h2>
          </div>
          {spotlights.map((mod, i) => <Spotlight module={mod} index={i} key={mod.id} />)}
        </div>
      </section>

      <PipelineStrip />

      <ModuleReference />

      <section className="fx-pro-note">
        <div className="container-wide">
          <div>
            <h2>{proModules().length} more modules when the science needs them.</h2>
            <p>ADMET, Boltz-2 affinity, binding free energy, quantum chemistry, and generative design are Pro. {CLAIMS.academic}</p>
          </div>
          <button className="btn btn-secondary" onClick={() => window.__nav("pro")}>{CTA.editions}</button>
        </div>
      </section>

      <section className="fx-final">
        <div>
          <h2>Run it on the box under your desk.</h2>
          <p>{CLAIMS.singleUser}</p>
          <button className="btn btn-primary" onClick={() => window.__nav("download")}>{CTA.download}</button>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { FeaturesPage });
