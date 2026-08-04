// ============================================================
// pro.jsx — /pro/ : the editions page. Its job is a DECISION, not a pitch.
// ============================================================
//
// The nav calls this route "Editions" (routes.js) and copy.js gives it the
// headline "Which edition of Ligand-X do you need?". The previous version of
// this file ignored both and rendered a second capability pitch — it hardcoded
// five Pro modules when the registry has seven, under four names that did not
// match /features/. Nothing here hardcodes a module fact: rows come from
// modules.js, headlines and claims from copy.js.
//
// Page order routes three different buyers and then removes their objections:
//   hero → three doors → matrix → academic → methods → licensing → close
//
// Deliberately NOT on this page: module capability cards (that is /features/,
// at higher fidelity), a "what you have today is inadequate" comparison, and a
// six-step "how to request" list. People arrive here already convinced.

const PRO_MODULE_METHOD = {
  // What actually runs, in the buyer's vocabulary. Engine names come from
  // module.tools; this is the one sentence a reviewer wants that a tool pill
  // cannot carry — which method, and what it is honest about.
  admet: "Property and liability models over your library. Predictions are cached per project so a rescreen is free.",
  boltz2: "The published Boltz-2 model, run on your own GPU. Nothing about the target or the series leaves the machine.",
  "free-energy": "Alchemical ABFE with Boresch restraints and RBFE networks planned by LOMAP. MBAR overlap diagnostics ship with every run, so you can see when a leg is undersampled instead of trusting the number.",
  qc: "ORCA under a guided setup. You choose the method and basis; the workbench handles submission, queueing, and parsing.",
  qmmm: "ASH drives ORCA and OpenMM over a prepared complex with a QM region you select.",
  kinetics: "WESTPA weighted-ensemble and RAMD steered unbinding on a dedicated worker queue.",
  reinvent: "REINVENT campaigns under multi-objective scoring, with generated molecules landing back in the project library ready to dock.",
};

// The three people who open this page. Each gets a different next action —
// the previous page pointed all of them at one "Request license" button.
const DOORS = [
  {
    id: "academic",
    kicker: "University, institute, or non-profit",
    title: "Every Pro module, at no cost",
    body: "Academic licenses are free and cover the full module set — including binding free energy and Boltz-2. Send us your institutional email and what you plan to work on.",
    cta: "Apply for an academic license",
    topic: "Academic license access",
    nav: "contact",
    featured: true,
  },
  {
    id: "evaluating",
    kicker: "Deciding whether this fits",
    title: "Start on the free core",
    body: "Preparation, pocket finding, docking, and molecular dynamics need no license, no account, and no license file. Install it and run a target you already know before you talk to anyone.",
    cta: null, // uses CTA.download
    nav: "download",
  },
  {
    id: "commercial",
    kicker: "Company or contract research",
    title: "Commercial Pro, scoped to you",
    body: "Pricing is quoted per organization — it depends on which modules you need, how many installs, and what support you want. Tell us the workflow and we will come back with a scope and a number.",
    cta: "Talk about commercial licensing",
    topic: "Commercial Pro modules",
    nav: "contact",
  },
];

// The procurement and IT questions, answered before they are asked. These stall
// more deals at this stage than anything scientific.
const LICENSE_FACTS = [
  {
    q: "How is a license enforced?",
    a: "A signed license file, verified locally against a public key bundled with the install. There is no phone-home and no license server.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Validation is a local signature check, so an air-gapped or network-isolated install works exactly like a connected one.",
  },
  {
    q: "What does a license actually unlock?",
    a: "Pull access to the private module images, and the entitlements inside them. The free core keeps running whatever your license does.",
  },
  {
    q: "What happens when it expires?",
    a: "Pro modules stop accepting new jobs. Your projects, structures, results, and the entire free core are untouched and stay usable.",
  },
  {
    q: "Where does our data go?",
    a: CLAIMS.selfHosted,
  },
  {
    q: "Can it run on our own cluster?",
    a: "Yes — the desktop launcher, a shared workstation, or headless Docker Compose on your own hardware all run the same images.",
  },
];

// ── Matrix ───────────────────────────────────────────────────
// One row per module, straight from the registry projection. This is the
// artifact people screenshot and forward to whoever holds the budget.

// aria-label rather than a visually-hidden span: an absolutely-positioned
// .sr-only child inside an unpositioned table cell pushed the document to
// 605px wide at a 390px viewport, so the whole page scrolled sideways.
const CELL = {
  yes: <span className="px-cell yes" role="img" aria-label="Included"><Icon name="check" size={15} /></span>,
  no: <span className="px-cell no" role="img" aria-label="Not included">—</span>,
};

const EditionMatrix = () => {
  const grouped = MODULE_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
    ...c,
    modules: MODULES.filter((m) => m.category === c.id),
  }));

  return (
    <div className="px-matrix-wrap">
      <table className="px-matrix">
        <thead>
          <tr>
            <th scope="col" className="px-matrix-corner">Module</th>
            <th scope="col">
              <strong>Free</strong>
              <small>No license file</small>
            </th>
            <th scope="col" className="academic">
              <strong>Academic</strong>
              <small>Free to qualifying labs</small>
            </th>
            <th scope="col" className="commercial">
              <strong>Commercial Pro</strong>
              <small>Quoted per organization</small>
            </th>
          </tr>
        </thead>
        {grouped.map((group) => (
          <tbody key={group.id}>
            <tr className="px-matrix-group">
              <th scope="colgroup" colSpan={4}>{group.label}</th>
            </tr>
            {group.modules.map((mod) => {
              const isPro = mod.edition === "pro";
              return (
                <tr key={mod.id} className={isPro ? "pro" : ""}>
                  <th scope="row">
                    {/* Deep-links to the module's full entry on /features/ — this
                        page deliberately carries no capability detail of its own. */}
                    <a
                      href={`/features/#${mod.id}`}
                      onClick={(event) => {
                        window.__nav("features", event);
                        requestAnimationFrame(() => {
                          const target = document.getElementById(mod.id);
                          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                        });
                      }}
                    >
                      <Icon name={mod.icon} size={15} />
                      {mod.name}
                    </a>
                  </th>
                  <td>{isPro ? CELL.no : CELL.yes}</td>
                  <td className="academic">{CELL.yes}</td>
                  <td className="commercial">
                    {isPro ? <span className="px-cell scoped">By agreement</span> : CELL.yes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────

const Door = ({ door, index }) => (
  <Reveal className={`px-door ${door.featured ? "featured" : ""}`} i={index}>
    <span className="px-door-kicker mono">{door.kicker}</span>
    <h3>{door.title}</h3>
    <p>{door.body}</p>
    <button
      className={`btn ${door.featured ? "btn-primary" : "btn-secondary"}`}
      onClick={() => {
        if (door.topic) window.__contactTopic = door.topic;
        window.__nav(door.nav);
      }}
    >
      {door.cta || CTA.download}
      <Icon name={door.nav === "download" ? "download" : "arrow"} size={14} />
    </button>
  </Reveal>
);

const ProPage = () => {
  const copy = SITE_COPY.pro;
  const pro = proModules();
  const free = freeModules();

  return (
    <div className="page-fade px-page">
      {/* Hero and doors are ONE tinted band. The measure-limiting wrapper has to
          nest inside .container-wide, never share its element — container-wide is
          `margin: 0 auto`, so a max-width on the same node re-centres the hero in
          a narrower box and knocks it out of alignment with every section below. */}
      <section className="px-lede">
        <div className="container-wide">
          <div className="px-lede-inner">
            <div className="orbit-badge"><span />{copy.eyebrow}</div>
            <h1>{copy.h1}</h1>
            <p>{copy.lede}</p>
            <div className="px-lede-stats mono">
              <span><b>{free.length}</b> modules free</span>
              <span><b>{pro.length}</b> Pro modules</span>
              <span><b>All {MODULES.length}</b> free for academics</span>
            </div>
          </div>

          <div className="px-doors">
            {DOORS.map((door, i) => <Door door={door} index={i} key={door.id} />)}
          </div>
        </div>
      </section>

      <section className="px-section" id="compare">
        <div className="container-wide">
          <div className="px-section-head">
            <div className="eyebrow"><span className="dot" />Module coverage</div>
            <h2>Every module, and which edition unlocks it.</h2>
            <p>
              The free core is a complete structure-based workflow on its own — it is not a trial.
              Pro modules extend it where the science needs more than a docking score.
            </p>
          </div>

          <EditionMatrix />

          <p className="px-matrix-note">
            Commercial licenses cover the modules named in your agreement, so the third column
            depends on your scope. Free modules never require a license file.
          </p>
        </div>
      </section>

      <section className="px-academic">
        <div className="container-wide px-academic-inner">
          <div>
            <div className="eyebrow"><span className="dot" />Academic licensing</div>
            <h2>{CLAIMS.academic}</h2>
            <p>
              Not a reduced tier and not a time-limited trial — a signed academic license entitles
              you to the same {pro.length} Pro modules a commercial customer runs, including binding
              free energy and Boltz-2 affinity prediction.
            </p>
            <p className="px-academic-ask">
              We ask for two things in return: use it for research rather than contract work for
              industry, and cite Ligand-X and the underlying engines in anything you publish.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => { window.__contactTopic = "Academic license access"; window.__nav("contact"); }}
            >
              Apply for an academic license
              <Icon name="arrow" size={14} />
            </button>
          </div>
          <ul className="px-academic-list">
            {pro.map((mod) => (
              <li key={mod.id}>
                <Icon name="check" size={14} />
                <span>{mod.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-section px-methods">
        <div className="container-wide">
          <div className="px-section-head">
            <div className="eyebrow"><span className="dot" />What runs, and how honest it is</div>
            <h2>We do not publish accuracy numbers. Here is what we tell you instead.</h2>
            <p>
              Every Pro module is a published method with a named engine behind it, not an in-house
              black box. You can read what it runs, see the diagnostics it emits, and check it
              against your own series — which is the only figure that should decide anything.
            </p>
          </div>

          <div className="px-methods-grid">
            {pro.map((mod, i) => (
              <Reveal className="px-method" key={mod.id} i={i}>
                <div className="px-method-head">
                  <span className="px-method-icon"><Icon name={mod.icon} size={18} /></span>
                  <h3>{mod.name}</h3>
                </div>
                <p>{PRO_MODULE_METHOD[mod.id] || mod.summary}</p>
                <div className="px-method-tools">
                  {mod.tools.map((tool) => <span className="tool-pill" key={tool}>{tool}</span>)}
                </div>
                <div className="px-method-io mono">{mod.io}</div>
              </Reveal>
            ))}
          </div>

          <div className="px-benchmark">
            <div>
              <h3>Benchmark it on your own series.</h3>
              <p>
                A vendor MUE on a public set tells you very little about your target class, and you
                would re-run it anyway. Bring a series where you already know the answer. Academic
                licenses cover this outright; for commercial evaluation we will scope a licence for
                the exercise and help you set the comparison up.
              </p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => { window.__contactTopic = "Commercial Pro modules"; window.__nav("contact"); }}
            >
              Set up an evaluation
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-section px-licensing">
        <div className="container-wide">
          <div className="px-section-head">
            <div className="eyebrow"><span className="dot" />Licensing mechanics</div>
            <h2>How the license behaves once it is installed.</h2>
            <p>The questions your IT and procurement teams will ask, answered before the call.</p>
          </div>

          <div className="px-licensing-grid">
            <dl className="px-faq">
              {LICENSE_FACTS.map((fact) => (
                <div className="px-faq-item" key={fact.q}>
                  <dt>{fact.q}</dt>
                  <dd>{fact.a}</dd>
                </div>
              ))}
            </dl>

            <div className="px-licensing-side">
              <p className="px-licensing-side-note">
                A licensed install is the same stack with more images pulled. Nothing about your
                existing deployment changes.
              </p>
              <CodeBlock
                label="licensed install"
                copyText={"LIGANDX_PRO_IMAGE_PREFIX=ghcr.io/kon-218/ligand-x-pro\n# your license file decides which images start\nmake pull\nmake prod"}
              >
                <Kw>LIGANDX_PRO_IMAGE_PREFIX</Kw>=<Str>ghcr.io/kon-218/ligand-x-pro</Str>{"\n"}
                <Comment># your license file decides which images start</Comment>{"\n"}
                <Cmd><Fn>make</Fn> pull</Cmd>{"\n"}
                <Cmd><Fn>make</Fn> prod</Cmd>
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      <section className="px-final">
        <div className="container-wide px-final-inner">
          <div className="px-final-card">
            <h2>Academic?</h2>
            <p>Every module, free, on an institutional email. There is nothing to negotiate.</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => { window.__contactTopic = "Academic license access"; window.__nav("contact"); }}
            >
              Apply now
              <Icon name="arrow" size={14} />
            </button>
          </div>
          <div className="px-final-card">
            <h2>Commercial?</h2>
            <p>Tell us the target class and the workflow. We will come back with a module scope and a quote.</p>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => { window.__contactTopic = "Commercial Pro modules"; window.__nav("contact"); }}
            >
              {CTA.license}
              <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { ProPage });
