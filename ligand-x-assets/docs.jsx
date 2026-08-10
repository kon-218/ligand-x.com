// ============================================================
// DocsPage — Getting Started + Guides
// ============================================================

const DOCS_SECTIONS = [
  { id: "overview",  title: "Overview" },
  { id: "prereqs",   title: "Before you install" },
  { id: "install",   title: "Installation" },
  { id: "first-run", title: "First run" },
  { id: "next",      title: "Next steps" },
];

// GUIDES / GETTING_STARTED_PAGES live in shared plain scripts (also used by the build).
const GUIDES = window.GUIDES;
const GETTING_STARTED_PAGES = window.GETTING_STARTED_PAGES || [];

// ============================================================
// Benchmarks & validation
// ============================================================

const BENCHMARKS = [
  {
    id: "benchmark-overview",
    navTitle: "Overview",
    title: "Benchmarks & validation",
    path: "/docs/benchmarks/",
    eyebrow: "Documentation · Scientific validation",
    desc: "Method-specific studies with pinned protocols, complete denominators, limitations, and reproducibility notes.",
    status: "index",
    sections: [
      { id: "scope", title: "Scope" },
      { id: "studies", title: "Studies" },
      { id: "publication", title: "Publication" },
    ],
  },
  {
    id: "benchmark-docking",
    navTitle: "Molecular docking",
    title: "Vina vs Vinardo on Astex Diverse",
    path: "/docs/benchmarks/docking/",
    eyebrow: "Benchmark · Molecular docking",
    desc: "A controlled 85-complex redocking comparison separates pose generation from pose ranking.",
    status: "draft",
    sections: [
      { id: "finding", title: "Finding" },
      { id: "results", title: "Results" },
      { id: "methods", title: "Methods" },
      { id: "interpretation", title: "Interpretation" },
      { id: "limitations", title: "Limitations" },
      { id: "reproduce", title: "Reproduce" },
    ],
  },
  {
    id: "benchmark-molecular-dynamics",
    navTitle: "Molecular dynamics",
    title: "Molecular dynamics",
    path: "/docs/benchmarks/molecular-dynamics/",
    eyebrow: "Benchmark · Molecular dynamics",
    desc: "A reserved page for audited stability, reproducibility, and performance studies.",
    status: "planned",
    sections: [{ id: "status", title: "Status" }],
  },
  {
    id: "benchmark-binding-affinity",
    navTitle: "Binding affinity",
    title: "Binding affinity",
    path: "/docs/benchmarks/binding-affinity/",
    eyebrow: "Benchmark · Binding affinity",
    desc: "A reserved page for audited affinity-prediction studies.",
    status: "planned",
    sections: [{ id: "status", title: "Status" }],
  },
  {
    id: "benchmark-free-energy",
    navTitle: "Free-energy calculations",
    title: "Free-energy calculations",
    path: "/docs/benchmarks/free-energy/",
    eyebrow: "Benchmark · Free energy",
    desc: "A reserved page for audited absolute and relative binding free-energy studies.",
    status: "planned",
    sections: [{ id: "status", title: "Status" }],
  },
  {
    id: "benchmark-quantum-chemistry",
    navTitle: "Quantum chemistry",
    title: "Quantum chemistry",
    path: "/docs/benchmarks/quantum-chemistry/",
    eyebrow: "Benchmark · Quantum chemistry",
    desc: "A reserved page for audited electronic-structure and molecular-property studies.",
    status: "planned",
    sections: [{ id: "status", title: "Status" }],
  },
];

const docsViewFromPath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") + "/";
  const gettingStarted = GETTING_STARTED_PAGES.find((candidate) => candidate.path === path);
  if (gettingStarted) return gettingStarted.id;
  const guide = GUIDES.find((candidate) => candidate.path === path);
  if (guide) return guide.id;
  const benchmark = BENCHMARKS.find((candidate) => candidate.path === path);
  if (benchmark) return benchmark.id;
  return "getting-started";
};

const BenchmarkStatus = ({ status }) => (
  <span className={`benchmark-status benchmark-status-${status}`}>
    {status === "draft" ? "Pre-publication draft" : status}
  </span>
);

const BenchmarkMetric = ({ label, vina, vinardo, note }) => (
  <div className="benchmark-metric">
    <span className="benchmark-metric-label">{label}</span>
    <div className="benchmark-metric-values">
      <span><small>Vina</small><strong>{vina}</strong></span>
      <span><small>Vinardo</small><strong>{vinardo}</strong></span>
    </div>
    <p>{note}</p>
  </div>
);

const BenchmarkView = ({ benchmark, benchmarkRefs, onSelect }) => {
  if (benchmark.status === "index") {
    return (
      <>
        <h2 id="scope" ref={(node) => benchmarkRefs.current.scope = node} style={{ marginTop: 0 }}>
          Scope
        </h2>
        <p>
          These pages document scientific validation separately from product guides. A benchmark is
          published here only with a named dataset, a pinned protocol, an explicit denominator,
          quantitative metrics, limitations, and enough provenance to reproduce the analysis.
        </p>
        <div className="callout benchmark-principle">
          Performance, predictive accuracy, and workflow reproducibility are different claims. Each
          study reports only the claims its protocol can support.
        </div>

        <h2 id="studies" ref={(node) => benchmarkRefs.current.studies = node}>Studies</h2>
        <div className="benchmark-study-grid">
          {BENCHMARKS.filter((item) => item.status !== "index").map((item) => (
            <button key={item.id} className="benchmark-study-card" onClick={() => onSelect(item.id)}>
              <span>
                <strong>{item.navTitle}</strong>
                <BenchmarkStatus status={item.status} />
              </span>
              <p>{item.desc}</p>
              <span className="benchmark-study-link">
                {item.status === "draft" ? "Read study" : "View planned page"}
                <Icon name="arrow" size={12} />
              </span>
            </button>
          ))}
        </div>

        <h2 id="publication" ref={(node) => benchmarkRefs.current.publication = node}>Publication</h2>
        <p>
          The paper citation, arXiv record, supplementary materials, and versioned result archives
          will be linked here when the preprint is public. Until then, the docking page is labelled
          as a pre-publication draft.
        </p>
      </>
    );
  }

  if (benchmark.status === "planned") {
    return (
      <>
        <h2 id="status" ref={(node) => benchmarkRefs.current.status = node} style={{ marginTop: 0 }}>
          Benchmark in preparation
        </h2>
        <div className="benchmark-placeholder">
          <BenchmarkStatus status="planned" />
          <h3>No results are reported here yet.</h3>
          <p>
            This page will be completed after the dataset, protocol, acceptance criteria, and
            reproducibility package have been locked. It will include methods, quantitative
            results, uncertainty, limitations, and downloadable supporting material.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 id="finding" ref={(node) => benchmarkRefs.current.finding = node} style={{ marginTop: 0 }}>
        Finding
      </h2>
      <div className="benchmark-finding">
        <span className="mono">85 paired redocking cases</span>
        <p>
          Vinardo generated more precise poses than Vina, improving the sub-1 Å success rate and
          median RMSD. It did not improve top-1 success at the conventional 2 Å threshold. Both
          methods sampled a correct pose much more often than they ranked one first, identifying
          pose ranking—not pose generation—as the principal remaining limitation.
        </p>
      </div>

      <h2 id="results" ref={(node) => benchmarkRefs.current.results = node}>Results</h2>
      <div className="benchmark-metric-grid">
        <BenchmarkMetric
          label="Top-1 RMSD ≤ 2 Å"
          vina="62.4%"
          vinardo="60.0%"
          note="Vina retained a small top-ranked-pose advantage."
        />
        <BenchmarkMetric
          label="Top-1 RMSD ≤ 1 Å"
          vina="36.5%"
          vinardo="45.9%"
          note="Vinardo produced substantially more sub-ångström top poses."
        />
        <BenchmarkMetric
          label="Best-of-10 RMSD ≤ 2 Å"
          vina="84.7%"
          vinardo="87.1%"
          note="Both scoring functions usually generated a correct pose."
        />
        <BenchmarkMetric
          label="Median top-1 RMSD"
          vina="1.27 Å"
          vinardo="1.17 Å"
          note="Vinardo improved the median pose geometry."
        />
      </div>

      <div className="benchmark-table-wrap">
        <table className="port-table benchmark-table">
          <thead>
            <tr>
              <th>Scoring function</th>
              <th>Top-1 ≤ 2 Å</th>
              <th>Top-1 ≤ 1 Å</th>
              <th>Best-of-10 ≤ 2 Å</th>
              <th>Median RMSD</th>
              <th>Ranking efficiency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Vina</strong></td>
              <td>62.4%</td>
              <td>36.5%</td>
              <td>84.7%</td>
              <td>1.27 Å</td>
              <td>74%</td>
            </tr>
            <tr>
              <td><strong>Vinardo</strong></td>
              <td>60.0%</td>
              <td>45.9%</td>
              <td>87.1%</td>
              <td>1.17 Å</td>
              <td>69%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="benchmark-caption">
        Ranking efficiency is top-1 success divided by best-of-10 success: the share of sampled
        correct poses promoted to rank one. Paired top-1 changes were +6 cases gained and −8 lost
        for Vinardo relative to Vina.
      </p>

      <h2 id="methods" ref={(node) => benchmarkRefs.current.methods = node}>Methods</h2>
      <p>
        The study used all 85 protein–ligand complexes in the Astex Diverse subset distributed with
        the PoseBusters benchmark archive. Each supplied generated conformer was redocked into its
        receptor; the crystal ligand was retained only as the fixed-frame RMSD reference.
      </p>
      <dl className="benchmark-methods">
        <div><dt>Design</dt><dd>Paired, controlled redocking; scoring function was the only changed variable</dd></div>
        <div><dt>Dataset</dt><dd>Astex Diverse / PoseBusters, 85 of 85 complexes</dd></div>
        <div><dt>Preparation</dt><dd>Identical archived receptor and ligand PDBQT inputs for both arms</dd></div>
        <div><dt>Search box</dt><dd>Crystal-ligand extent plus 4 Å, identical in both arms</dd></div>
        <div><dt>Docking</dt><dd>Seed 20260720, exhaustiveness 32, CPU auto, 10 output modes</dd></div>
        <div><dt>Pose metric</dt><dd>Symmetry-aware, fixed-frame RDKit CalcRMS after removing all hydrogens</dd></div>
      </dl>
      <p>
        Preparation was held constant by reusing each archived run package’s
        <code> prepared-receptor.pdbqt</code> and <code>prepared-ligand.pdbqt</code>. The analysis
        harness reproduced the archived per-mode RMSD values for all 81 originally scorable cases
        and corrected four hydrogen-handling failures before this comparison was interpreted.
      </p>
      <p>
        Dataset source:{" "}
        <a href="https://zenodo.org/records/8278563" target="_blank" rel="noopener noreferrer">
          PoseBusters benchmark archive, Zenodo record 8278563
        </a>.
      </p>

      <h2 id="interpretation" ref={(node) => benchmarkRefs.current.interpretation = node}>
        Interpretation
      </h2>
      <p>
        A direct switch from Vina to Vinardo is not a free top-1 accuracy improvement. Vinardo
        produces a larger and more precise pool of correct poses, but converts less of that
        sampling headroom into a rank-one result. Neither method promotes more than roughly
        three-quarters of its sampled correct poses to the top rank.
      </p>
      <div className="callout">
        The useful result is the decomposition: residual error on this benchmark is dominated by
        pose ranking. Increasing exhaustiveness alone is unlikely to close a gap when a correct
        pose is already present in more than 84% of ten-pose outputs.
      </div>

      <h2 id="limitations" ref={(node) => benchmarkRefs.current.limitations = node}>Limitations</h2>
      <ul>
        <li>
          This is native-ligand-informed redocking, not blind docking. The box uses both the crystal
          ligand centroid and its extent, leaking native position and size information.
        </li>
        <li>
          Results describe one 85-complex benchmark and should not be generalized to every target
          class, ligand chemistry, or prospective screening workflow.
        </li>
        <li>
          The comparison measures RMSD-based pose recovery. PoseBusters validity was part of the
          archived release audit but is not reported as a Vina–Vinardo outcome in this scoring arm.
        </li>
        <li>
          Crystallographic waters were not included. The energy range and ten-mode output also make
          best-of-N results protocol-specific.
        </li>
      </ul>

      <h2 id="reproduce" ref={(node) => benchmarkRefs.current.reproduce = node}>Reproduce</h2>
      <p>
        The audit keeps experiment code separate from analysis. Tables can be regenerated from the
        saved per-case JSON without running docking again.
      </p>
      <CodeBlock
        label="analysis"
        copyText={"cd scripts/benchmarks/astex_audit\n../../../.pixi/envs/base/bin/python analyse_score.py"}
      >
        <Cmd><Fn>cd</Fn> scripts/benchmarks/astex_audit</Cmd>{"\n"}
        <Cmd>../../../.pixi/envs/base/bin/python analyse_score.py</Cmd>
      </CodeBlock>
      <p className="benchmark-caption">
        This is a pre-publication example derived from the August 2, 2026 audit. Versioned source,
        raw results, the paper citation, and supplementary material links should replace this note
        when the public release package is frozen.
      </p>
    </>
  );
};

// ============================================================
// Guide video embeds
// ============================================================

const GUIDE_VIDEOS = {
  "protein-cleaning": {
    id: "QjBEVPHYAHE",
    title: "Protein cleaning video",
  },
  docking: {
    id: "QI_l-w5ilUM",
    title: "Docking example video",
  },
};

const GuideVideo = ({ guide }) => {
  const video = GUIDE_VIDEOS[guide.id];
  if (!video) return null;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
        {video.title}
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    </div>
  );
};

// ============================================================
// GuideView — renders a single guide
// ============================================================

const GuideView = ({ guide, guideRefs, activeGuideSection }) => {
  const isProBadge = guide.isPro && (
    <span style={{
      display: 'inline-block', background: 'oklch(0.92 0.08 60)', color: '#b45309',
      borderRadius: 4, fontSize: 11, fontWeight: 600, padding: '2px 7px',
      fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginLeft: 8,
    }}>Pro</span>
  );

  return (
    <>
      <h2
        id="prereqs"
        ref={(r) => guideRefs.current.prereqs = r}
        style={{ marginTop: 0 }}
      >
        Prerequisites
      </h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        {guide.prereqs.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <GuideVideo guide={guide} />

      <h2 id="walkthrough" ref={(r) => guideRefs.current.walkthrough = r}>
        Walkthrough
      </h2>
      {guide.steps.map((step, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 16px',
          marginBottom: 28, alignItems: 'start',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: guide.isPro ? 'oklch(0.92 0.08 60)' : 'color-mix(in oklch, var(--accent) 15%, transparent)',
            border: `1px solid ${guide.isPro ? '#e5c882' : 'color-mix(in oklch, var(--accent) 30%, transparent)'}`,
            color: guide.isPro ? '#b45309' : 'var(--accent-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0,
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>
              {step.title}
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              {step.body}
            </p>
          </div>
        </div>
      ))}

      <h2 id="outputs" ref={(r) => guideRefs.current.outputs = r}>
        Expected outputs
      </h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        {guide.outputs.map((o, i) => <li key={i} style={{ fontFamily: o.includes('·') ? 'inherit' : 'inherit' }}>{o}</li>)}
      </ul>

      <h2 id="tips" ref={(r) => guideRefs.current.tips = r}>Tips</h2>
      {guide.tips.map((tip, i) => (
        <div key={i} className="callout" style={{ marginBottom: 12 }}>
          {tip}
        </div>
      ))}
    </>
  );
};

// ============================================================
// Getting Started shared helpers + page views
// ============================================================

const DocsPageLink = ({ pageId, children }) => (
  <button
    type="button"
    className="docs-page-link"
    onClick={() => window.__navDocs && window.__navDocs(pageId)}
  >
    {children}
  </button>
);

const DocsStepList = ({ steps }) =>
  steps.map((step, index) => (
    <div
      key={step.title}
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: "0 16px",
        marginBottom: 28,
        alignItems: "start",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "color-mix(in oklch, var(--accent) 15%, transparent)",
          border: "1px solid color-mix(in oklch, var(--accent) 30%, transparent)",
          color: "var(--accent-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          flexShrink: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: "var(--ink)" }}>
          {step.title}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--ink-2)" }}>
          {step.body}
        </p>
      </div>
    </div>
  ));

const RequirementsView = ({ page, sectionRefs }) => {
  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  return (
    <>
      <h2 id="overview" ref={setRef("overview")} style={{ marginTop: 0 }}>Overview</h2>
      {page.overview.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="callout" style={{ marginBottom: 20 }}>
        Already installed? Continue with{" "}
        <DocsPageLink pageId="first-launch">First launch</DocsPageLink>
        {" "}for the wizard, or{" "}
        <DocsPageLink pageId="configuration">Configuration</DocsPageLink>
        {" "}for <code>.env.production</code> tuning.
      </div>

      <h2 id="hardware" ref={setRef("hardware")}>Hardware</h2>
      <table className="port-table">
        <thead>
          <tr><th>Component</th><th>Minimum</th><th>Recommended</th></tr>
        </thead>
        <tbody>
          {page.hardwareRows.map(([component, minimum, recommended]) => (
            <tr key={component}>
              <td>{component}</td>
              <td>{minimum}</td>
              <td>{recommended}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="software" ref={setRef("software")}>Software</h2>
      {page.software.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.links && item.links.length > 0 && (
            <ul style={{ paddingLeft: 18, marginTop: 0, marginBottom: 16, lineHeight: 1.7 }}>
              {item.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer" style={{ color: "var(--accent-strong)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
      <CodeBlock
        label="check"
        copyText={`docker version\ndocker compose version`}
      >
        <Cmd><Fn>docker</Fn> version</Cmd>{"\n"}
        <Cmd><Fn>docker</Fn> compose version</Cmd>
      </CodeBlock>

      <h2 id="gpu" ref={setRef("gpu")}>GPU</h2>
      <p>{page.gpuIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Need</th><th>Modules</th></tr>
        </thead>
        <tbody>
          {page.gpuRows.map(([need, modules]) => (
            <tr key={need}>
              <td>{need}</td>
              <td>{modules}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {page.gpuPlatforms.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </React.Fragment>
      ))}

      <h2 id="disk" ref={setRef("disk")}>Disk and downloads</h2>
      <p>{page.diskIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Service group</th><th>Edition</th><th>Approx. size</th><th>Notes</th></tr>
        </thead>
        <tbody>
          {page.diskRows.map(([name, edition, size, notes]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{edition}</td>
              <td className="mono">{size}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="network" ref={setRef("network")}>Network and ports</h2>
      <p>{page.networkIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Default port</th><th>Env key</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          {page.portRows.map(([port, envKey, purpose]) => (
            <tr key={`${port}-${envKey}`}>
              <td className="mono">{port}</td>
              <td className="mono">{envKey}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="callout">{page.portNote}</div>

      <h2 id="platforms" ref={setRef("platforms")}>Platform notes</h2>
      {page.platforms.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </React.Fragment>
      ))}

      <h2 id="optional" ref={setRef("optional")}>Optional Pro tools</h2>
      {page.optional.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </React.Fragment>
      ))}

      {page.tips.map((tip, index) => (
        <div key={index} className="callout" style={{ marginBottom: 12 }}>
          {tip}
        </div>
      ))}

      <h2 id="next" ref={setRef("next")}>Next steps</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <NextCard
          title="Installation guide"
          desc="Download the launcher or use the headless Compose path."
          icon="book"
          onClick={() => window.__navDocs && window.__navDocs("getting-started")}
        />
        <NextCard
          title="First launch"
          desc="Account, license, Download & continue, Start services, and Open Ligand-X."
          icon="network"
          onClick={() => window.__navDocs && window.__navDocs("first-launch")}
        />
        <NextCard
          title="Configuration"
          desc="Find .env.production and understand what Start preserves or rewrites."
          icon="book"
          onClick={() => window.__navDocs && window.__navDocs("configuration")}
        />
        <NextCard
          title="Download Ligand-X"
          desc="Get the Windows, macOS, or Linux launcher build."
          icon="target"
          onClick={() => window.__nav("download")}
        />
      </div>
    </>
  );
};

const FirstLaunchView = ({ page, sectionRefs }) => {
  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  return (
    <>
      <h2 id="overview" ref={setRef("overview")} style={{ marginTop: 0 }}>Overview</h2>
      {page.overview.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="callout" style={{ marginBottom: 20 }}>
        Need hardware, Docker, GPU, or disk planning first? See <DocsPageLink pageId="requirements">Requirements</DocsPageLink>.
        {" "}For <code>.env.production</code> and advanced Start behaviour, see <DocsPageLink pageId="configuration">Configuration</DocsPageLink>.
      </div>

      <h2 id="wizard" ref={setRef("wizard")}>First-run setup</h2>
      <p>
        On first launch the launcher walks through account, license, and services.
        Use Back to return to earlier steps without discarding progress.
      </p>
      <DocsStepList steps={page.wizardSteps} />

      <h2 id="download" ref={setRef("download")}>Downloading images</h2>
      <p>
        Choosing <strong>Download &amp; continue</strong> (or <strong>Continue</strong> when images
        are already present) runs the following sequence. Progress appears in the download log.
      </p>
      <DocsStepList steps={page.pullSteps} />

      <h2 id="start" ref={setRef("start")}>Start and open</h2>
      <p>
        Image download installs and configures; it does not leave containers running by itself.
        Finish with:
      </p>
      <ol style={{ paddingLeft: 20, lineHeight: 1.7, color: "var(--ink-2)" }}>
        {page.startSteps.map((step, index) => (
          <li key={index} style={{ marginBottom: 8 }}>{step}</li>
        ))}
      </ol>

      <h2 id="files" ref={setRef("files")}>Where files live</h2>
      <p>{page.filesIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Platform</th><th>Default runtime path</th></tr>
        </thead>
        <tbody>
          {page.filesPathRows.map(([platform, path]) => (
            <tr key={platform}>
              <td>{platform}</td>
              <td className="mono">{path}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Full file inventory, editor workflow, and path overrides are in{" "}
        <DocsPageLink pageId="configuration">Configuration</DocsPageLink>.
      </p>

      {page.tips.map((tip, index) => (
        <div key={index} className="callout" style={{ marginBottom: 12 }}>
          {tip}
        </div>
      ))}

      <h2 id="next" ref={setRef("next")}>Next steps</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <NextCard
          title="Configuration"
          desc="Edit .env.production and see what Start preserves, rewrites, or reconciles."
          icon="book"
          onClick={() => window.__navDocs && window.__navDocs("configuration")}
        />
        <NextCard
          title="Run your first docking job"
          desc="Prepare a receptor and ligand, configure the search box, and review ranked poses."
          icon="target"
          onClick={() => window.__navDocs && window.__navDocs("docking")}
        />
        <NextCard
          title="Clean a protein structure"
          desc="Import a raw PDB, strip unwanted components, and produce a modeling-ready receptor."
          icon="flask"
          onClick={() => window.__navDocs && window.__navDocs("protein-cleaning")}
        />
        <NextCard
          title="Browse editions"
          desc="Compare Free, Academic, and Pro and request a license when you need advanced modules."
          icon="network"
          onClick={() => window.__nav("pro")}
        />
      </div>
    </>
  );
};

const CustomConfigurationView = ({ page, sectionRefs }) => {
  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  return (
    <>
      <h2 id="overview" ref={setRef("overview")} style={{ marginTop: 0 }}>Overview</h2>
      {page.overview.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="callout" style={{ marginBottom: 20 }}>
        Still on first run? Start with <DocsPageLink pageId="first-launch">First launch</DocsPageLink>.
        {" "}Prerequisites: <DocsPageLink pageId="requirements">Requirements</DocsPageLink>.
      </div>

      <h2 id="files" ref={setRef("files")}>Find your files</h2>
      <p>{page.filesIntro}</p>
      {page.filesUi.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </React.Fragment>
      ))}
      <p>{page.filesPathsIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Platform</th><th>Default runtime path</th><th>Notes</th></tr>
        </thead>
        <tbody>
          {page.filesPathRows.map(([platform, path, notes]) => (
            <tr key={platform}>
              <td>{platform}</td>
              <td className="mono">{path}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Important paths</h3>
      <table className="port-table">
        <thead>
          <tr><th>Path (relative)</th><th>What it is</th></tr>
        </thead>
        <tbody>
          {page.filesImportant.map(([path, purpose]) => (
            <tr key={path}>
              <td className="mono">{path}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CodeBlock
        label="overrides"
        copyText={`# Optional: relocate runtime or launcher config before starting the app\nexport LIGANDX_RUNTIME_DIR=/data/ligand-x/runtime\nexport LIGANDX_LAUNCHER_CONFIG_DIR=/data/ligand-x/launcher-config`}
      >
        <Comment># Optional: relocate runtime or launcher config before starting the app</Comment>{"\n"}
        <Cmd><Kw>export</Kw> LIGANDX_RUNTIME_DIR=/data/ligand-x/runtime</Cmd>{"\n"}
        <Cmd><Kw>export</Kw> LIGANDX_LAUNCHER_CONFIG_DIR=/data/ligand-x/launcher-config</Cmd>
      </CodeBlock>

      <h2 id="customise" ref={setRef("customise")}>Customise .env.production</h2>
      <p>{page.customiseIntro}</p>
      {page.customiseGroups.map((group) => (
        <React.Fragment key={group.title}>
          <h3>{group.title}</h3>
          <table className="port-table">
            <thead>
              <tr><th>Variable</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              {group.rows.map(([name, purpose]) => (
                <tr key={name}>
                  <td className="mono">{name}</td>
                  <td>{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}

      <h2 id="env-on-start" ref={setRef("env-on-start")}>What Start does to a customised .env.production</h2>
      <p>{page.envOnStartIntro}</p>

      <h3>Preserved (only filled when still a placeholder)</h3>
      <p>{page.envOnStartPreserved}</p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: "var(--ink-2)" }}>
        {page.envOnStartPreservedKeys.map((item) => (
          <li key={item} style={{ marginBottom: 6 }}>{item}</li>
        ))}
      </ul>

      <h3>Rewritten or adjusted on every Start</h3>
      {page.envOnStartRewritten.map((item) => (
        <div key={item.title} style={{ marginBottom: 16 }}>
          <p style={{ margin: "0 0 6px", fontWeight: 600, color: "var(--ink)" }}>{item.title}</p>
          <p style={{ margin: 0 }}>{item.body}</p>
        </div>
      ))}

      <h3>Credential reconciliation</h3>
      <p>{page.envOnStartReconcile}</p>

      <h3>Warnings the launcher may log</h3>
      {page.envOnStartWarnings.map((warning, index) => (
        <div key={index} className="callout" style={{ marginBottom: 12 }}>
          {warning}
        </div>
      ))}

      <h2 id="ports" ref={setRef("ports")}>Ports and networking</h2>
      <p>{page.portsIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Variable</th><th>Default</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          {page.portRows.map(([name, fallback, purpose]) => (
            <tr key={name}>
              <td className="mono">{name}</td>
              <td className="mono">{fallback}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="callout">{page.bindNote}</div>

      <h2 id="workers" ref={setRef("workers")}>Workers and resources</h2>
      <p>{page.workersIntro}</p>
      <table className="port-table">
        <thead>
          <tr><th>Variable</th><th>Default</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          {page.workerRows.map(([name, fallback, purpose]) => (
            <tr key={name}>
              <td className="mono">{name}</td>
              <td className="mono">{fallback}</td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Resource ceilings such as <code>WORKER_CPU_CPU_LIMIT</code> and matching memory limits live in
        the same file. Raise them on a larger workstation after the first start; the launcher only
        lowers limits that would prevent Docker from creating containers.
      </p>

      <h2 id="advanced" ref={setRef("advanced")}>Advanced options</h2>
      {page.advanced.map((item) => (
        <React.Fragment key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </React.Fragment>
      ))}

      <h3>Useful environment overrides</h3>
      <CodeBlock
        label="shell"
        copyText={`# Relocate the runtime directory before starting the launcher\nexport LIGANDX_RUNTIME_DIR=/data/ligand-x/runtime`}
      >
        <Comment># Relocate the runtime directory before starting the launcher</Comment>{"\n"}
        <Cmd><Kw>export</Kw> LIGANDX_RUNTIME_DIR=/data/ligand-x/runtime</Cmd>
      </CodeBlock>

      {page.tips.map((tip, index) => (
        <div key={index} className="callout" style={{ marginBottom: 12 }}>
          {tip}
        </div>
      ))}

      <h2 id="next" ref={setRef("next")}>Next steps</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <NextCard
          title="First launch"
          desc="Account, license, Download & continue, Start services, and Open Ligand-X."
          icon="network"
          onClick={() => window.__navDocs && window.__navDocs("first-launch")}
        />
        <NextCard
          title="Requirements"
          desc="Confirm Docker, disk, GPU, and free ports while troubleshooting Start."
          icon="book"
          onClick={() => window.__navDocs && window.__navDocs("requirements")}
        />
        <NextCard
          title="Run your first docking job"
          desc="Prepare a receptor and ligand, configure the search box, and review ranked poses."
          icon="target"
          onClick={() => window.__navDocs && window.__navDocs("docking")}
        />
        <NextCard
          title="Installation guide"
          desc="Desktop downloads and the headless Compose path."
          icon="flask"
          onClick={() => window.__navDocs && window.__navDocs("getting-started")}
        />
      </div>
    </>
  );
};

const GettingStartedHubView = ({ page, sectionRefs }) => {
  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  return (
    <>
      <h2 id="overview" ref={setRef("overview")} style={{ marginTop: 0 }}>Choose a guide</h2>
      {page.overview.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        {page.hubCards.map((card) => (
          <NextCard
            key={card.id}
            title={card.title}
            desc={card.desc}
            icon={card.id === "first-launch" ? "network" : "book"}
            onClick={() => window.__navDocs && window.__navDocs(card.id)}
          />
        ))}
      </div>
    </>
  );
};

const GettingStartedView = ({ page, sectionRefs }) => {
  if (page.kind === "hub") {
    return <GettingStartedHubView page={page} sectionRefs={sectionRefs} />;
  }
  if (page.id === "requirements") {
    return <RequirementsView page={page} sectionRefs={sectionRefs} />;
  }
  if (page.id === "configuration") {
    return <CustomConfigurationView page={page} sectionRefs={sectionRefs} />;
  }
  return <FirstLaunchView page={page} sectionRefs={sectionRefs} />;
};

// ============================================================
// DocsPage
// ============================================================

const DocsPage = () => {
  const [activeSection, setActiveSection] = React.useState("overview");
  const [docView, setDocView] = React.useState(docsViewFromPath);
  const [activeGuideSection, setActiveGuideSection] = React.useState("prereqs");
  const [activeBenchmarkSection, setActiveBenchmarkSection] = React.useState("scope");
  const [activeGettingStartedSection, setActiveGettingStartedSection] = React.useState("overview");
  const sectionRefs = React.useRef({});
  const guideRefs = React.useRef({});
  const benchmarkRefs = React.useRef({});
  const gettingStartedRefs = React.useRef({});

  const setDocsPath = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({ page: "docs" }, "", path);
    }
  };

  // Expose a helper so the footer "API reference" link can navigate here directly
  React.useEffect(() => {
    window.__navDocs = (view) => {
      if (view === "api-reference") {
        setDocsPath("/docs/");
        setDocView("api-reference");
      } else {
        const gettingStarted = GETTING_STARTED_PAGES.find((candidate) => candidate.id === view);
        const guide = GUIDES.find((candidate) => candidate.id === view);
        if (gettingStarted && gettingStarted.path) setDocsPath(gettingStarted.path);
        else if (guide && guide.path) setDocsPath(guide.path);
        else setDocsPath("/docs/");
        setDocView(view || "getting-started");
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    const onPopState = () => setDocView(docsViewFromPath());
    window.addEventListener("popstate", onPopState);
    return () => {
      delete window.__navDocs;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  React.useEffect(() => {
    if (typeof applyPageSeo !== "function") return;
    const gettingStarted = GETTING_STARTED_PAGES.find((page) => page.id === docView);
    if (gettingStarted) {
      applyPageSeo({
        title: gettingStarted.seoTitle || `${gettingStarted.title} — Ligand-X documentation`,
        description: gettingStarted.seoDescription || gettingStarted.desc,
        path: gettingStarted.path,
      });
      return;
    }
    const guide = GUIDES.find((g) => g.id === docView);
    if (guide) {
      applyPageSeo({
        title: `${guide.title} guide — Ligand-X documentation`,
        description: `${guide.desc} Free self-hosted Ligand-X walkthrough.`,
        path: guide.path,
      });
      return;
    }
    const benchmark = BENCHMARKS.find((b) => b.id === docView);
    if (benchmark) {
      applyPageSeo({
        title: `${benchmark.title} — Ligand-X documentation`,
        description: benchmark.desc,
        path: benchmark.path,
      });
      return;
    }
    if (docView === "api-reference") {
      applyPageSeo({
        title: "API reference — Ligand-X documentation",
        description: SITE_COPY.docs.seo.description,
        path: "/docs/",
      });
      return;
    }
    applyPageSeo({
      title: SITE_COPY.docs.seo.title,
      description: SITE_COPY.docs.seo.description,
      path: "/docs/",
    });
  }, [docView]);

  const isApiRef = docView === "api-reference";
  const currentGettingStarted = GETTING_STARTED_PAGES.find((page) => page.id === docView) || null;
  const currentBenchmark = BENCHMARKS.find((benchmark) => benchmark.id === docView) || null;
  const currentGuide = (!isApiRef && !currentBenchmark && !currentGettingStarted && docView !== "getting-started")
    ? GUIDES.find((g) => g.id === docView)
    : null;

  const switchToGuide = (id) => {
    const guide = GUIDES.find((candidate) => candidate.id === id);
    setDocsPath(guide && guide.path ? guide.path : "/docs/");
    setDocView(id);
    setActiveGuideSection("prereqs");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchToApiRef = () => {
    setDocsPath("/docs/");
    setDocView("api-reference");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchToBenchmark = (id) => {
    const benchmark = BENCHMARKS.find((candidate) => candidate.id === id) || BENCHMARKS[0];
    setDocsPath(benchmark.path);
    setDocView(benchmark.id);
    setActiveBenchmarkSection(benchmark.sections[0].id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchToGettingStartedPage = (id) => {
    const page = GETTING_STARTED_PAGES.find((candidate) => candidate.id === id);
    if (!page) return;
    setDocsPath(page.path);
    setDocView(page.id);
    setActiveGettingStartedSection(page.sections[0].id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const switchToGettingStarted = (sectionId) => {
    setDocsPath("/docs/");
    setDocView("getting-started");
    if (sectionId) {
      setActiveSection(sectionId);
      // defer scroll until re-render populates refs
      requestAnimationFrame(() => {
        const el = sectionRefs.current[sectionId];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Scroll-spy for getting-started view
  React.useEffect(() => {
    if (docView !== "getting-started" || isApiRef) return;
    const onScroll = () => {
      const top = window.scrollY + 100;
      let current = "overview";
      for (const s of DOCS_SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.offsetTop <= top) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [docView]);

  // Scroll-spy for guide view
  React.useEffect(() => {
    if (!currentGuide) return;
    const GUIDE_SECTION_IDS = ["prereqs", "walkthrough", "outputs", "tips"];
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = "prereqs";
      for (const id of GUIDE_SECTION_IDS) {
        const el = guideRefs.current[id];
        if (el && el.offsetTop <= top) current = id;
      }
      setActiveGuideSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentGuide]);

  // Scroll-spy for benchmark pages
  React.useEffect(() => {
    if (!currentBenchmark) return;
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = currentBenchmark.sections[0].id;
      for (const section of currentBenchmark.sections) {
        const element = benchmarkRefs.current[section.id];
        if (element && element.offsetTop <= top) current = section.id;
      }
      setActiveBenchmarkSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentBenchmark]);

  // Scroll-spy for getting-started sub-pages (e.g. first configuration)
  React.useEffect(() => {
    if (!currentGettingStarted) return;
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = currentGettingStarted.sections[0].id;
      for (const section of currentGettingStarted.sections) {
        const element = gettingStartedRefs.current[section.id];
        if (element && element.offsetTop <= top) current = section.id;
      }
      setActiveGettingStartedSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentGettingStarted]);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const scrollToGuideSection = (id) => {
    const el = guideRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveGuideSection(id);
    }
  };

  const scrollToBenchmarkSection = (id) => {
    const element = benchmarkRefs.current[id];
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveBenchmarkSection(id);
    }
  };

  const scrollToGettingStartedSection = (id) => {
    const element = gettingStartedRefs.current[id];
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveGettingStartedSection(id);
    }
  };

  return (
    <div className="page-fade">
      {/* API Reference — rendered as a self-contained view */}
      {isApiRef && (
        <ApiReferencePage onBack={() => switchToGettingStarted(null)} />
      )}

      {/* Header — only shown for getting-started and guide views */}
      {!isApiRef && <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-wide">
          {currentBenchmark ? (
            <>
              <button
                onClick={() => currentBenchmark.status === "index"
                  ? switchToGettingStarted(null)
                  : switchToBenchmark("benchmark-overview")}
                className="docs-back"
              >
                ← {currentBenchmark.status === "index" ? "Docs" : "Benchmarks & validation"}
              </button>
              <div className="eyebrow">
                <span className="dot" />{currentBenchmark.eyebrow}
              </div>
              <h1 className="benchmark-title">{currentBenchmark.title}</h1>
              <p className="benchmark-deck">{currentBenchmark.desc}</p>
              <div className="benchmark-header-meta">
                <BenchmarkStatus status={currentBenchmark.status} />
                {currentBenchmark.status === "draft" && (
                  <span className="tag">Astex Diverse · n = 85</span>
                )}
              </div>
            </>
          ) : currentGettingStarted ? (
            <>
              <button
                onClick={() => switchToGettingStarted(null)}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  display: "flex", alignItems: "center", gap: 6,
                  color: "var(--muted)", fontSize: 13, marginBottom: 16,
                  fontFamily: "var(--font-mono)",
                }}
              >
                ← Docs
              </button>
              <div className="eyebrow">
                <span className="dot" />{currentGettingStarted.eyebrow}
              </div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "12px 0 12px", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 600 }}>
                {currentGettingStarted.title}
              </h1>
              <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 680, margin: 0 }}>
                {currentGettingStarted.desc}
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap", alignItems: "center" }}>
                <span className="read-time-pill">
                  <Icon name="clock" size={13} />
                  <span>{currentGettingStarted.time} read</span>
                </span>
              </div>
            </>
          ) : currentGuide ? (
            <>
              <button
                onClick={() => switchToGettingStarted(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: 'var(--muted)', fontSize: 13, marginBottom: 16,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ← Docs
              </button>
              <div className="eyebrow">
                <span className="dot" />{currentGuide.eyebrow}
                {currentGuide.isPro && (
                  <span style={{
                    marginLeft: 8, background: 'oklch(0.92 0.08 60)', color: '#b45309',
                    borderRadius: 4, fontSize: 11, fontWeight: 600, padding: '1px 7px',
                    fontFamily: 'var(--font-mono)',
                  }}>Pro</span>
                )}
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '12px 0 12px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
                {currentGuide.title}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 640, margin: 0 }}>
                {currentGuide.desc}
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="read-time-pill">
                  <Icon name="clock" size={13} />
                  <span>{currentGuide.time} read</span>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow"><span className="dot" />Documentation · Getting started</div>
              <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
                Install Ligand-X with the launcher or CLI.
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 680, margin: 0 }}>
                Desktop launcher and headless Compose install paths. Check{" "}
                <DocsPageLink pageId="requirements">Requirements</DocsPageLink> before you download,
                then <DocsPageLink pageId="first-launch">First launch</DocsPageLink> after the
                launcher opens. Technical env tuning lives in{" "}
                <DocsPageLink pageId="configuration">Configuration</DocsPageLink>.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => window.open('https://github.com/kon-218/ligand-x-launcher', '_blank')}>
                  <Icon name="github" size={13} />
                  github.com/kon-218/ligand-x-launcher
                  <Icon name="external" size={11} />
                </button>
                <span className="tag">v0.1.0 · current repo</span>
                <span className="tag">launcher-first install</span>
              </div>
            </>
          )}
        </div>
      </section>}

      {/* Body — getting-started and guide views only */}
      {!isApiRef && <section style={{ padding: 'var(--sp-7) 0 var(--sp-9)' }}>
        <div className="container-wide">
          <div className="docs-layout">

            {/* LEFT NAV */}
            <aside className="docs-side">
              <h6>Getting started</h6>
              <ul>
                <li>
                  <button
                    className={docView === "getting-started" ? "active" : ""}
                    onClick={() => switchToGettingStarted(null)}
                  >
                    Installation guide
                  </button>
                </li>
                {GETTING_STARTED_PAGES.filter((page) => page.nav !== false).map((page) => (
                  <li key={page.id}>
                    <button
                      className={docView === page.id ? "active" : ""}
                      onClick={() => switchToGettingStartedPage(page.id)}
                    >
                      {page.title}
                    </button>
                  </li>
                ))}
              </ul>

              <h6>Guides</h6>
              <ul>
                {GUIDES.map((g) => (
                  <li key={g.id}>
                    <button
                      className={docView === g.id ? "active" : ""}
                      onClick={() => switchToGuide(g.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}
                    >
                      <span>{g.title}</span>
                      {g.isPro && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)',
                          color: '#b45309', letterSpacing: '0.05em', flexShrink: 0,
                        }}>PRO</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <h6>Benchmarks & validation</h6>
              <ul>
                {BENCHMARKS.map((benchmark) => (
                  <li key={benchmark.id}>
                    <button
                      className={docView === benchmark.id ? "active" : ""}
                      onClick={() => switchToBenchmark(benchmark.id)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}
                    >
                      <span>{benchmark.navTitle}</span>
                      {benchmark.status === "draft" && (
                        <span className="benchmark-nav-status">DRAFT</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <h6>Reference</h6>
              <ul>
                <li><button onClick={() => window.__nav('features')}>Capability reference</button></li>
                <li>
                  <button
                    className={docView === "api-reference" ? "active" : ""}
                    onClick={switchToApiRef}
                  >
                    REST API
                  </button>
                </li>
                <li><button>File formats</button></li>
                <li><button>CLI</button></li>
              </ul>
              <h6>Theory</h6>
              <ul>
                <li><button>Docking</button></li>
                <li><button>MD</button></li>
                <li><button>Free energy</button></li>
                <li><button>Quantum chemistry</button></li>
              </ul>
            </aside>

            {/* MAIN */}
            <main className="docs-main">
              {currentBenchmark ? (
                <BenchmarkView
                  benchmark={currentBenchmark}
                  benchmarkRefs={benchmarkRefs}
                  onSelect={switchToBenchmark}
                />
              ) : currentGettingStarted ? (
                <GettingStartedView
                  page={currentGettingStarted}
                  sectionRefs={gettingStartedRefs}
                />
              ) : currentGuide ? (
                <GuideView
                  guide={currentGuide}
                  guideRefs={guideRefs}
                  activeGuideSection={activeGuideSection}
                />
              ) : (
                <>
                  {/* Overview */}
                  <h2 id="overview" ref={(r) => sectionRefs.current.overview = r}>Overview</h2>
                  <p>
                    <strong>Ligand-X</strong> is a containerized, self-hosted platform for computer-aided drug discovery.
                    It bundles structure preparation, docking, molecular dynamics, binding-site analysis,
                    sequence tools, molecule editing, and optional Pro modules behind a single web interface.
                  </p>
                  <p>
                    The stack runs locally in Docker. A Next.js frontend talks to a FastAPI gateway; jobs are
                    coordinated through PostgreSQL, Redis, RabbitMQ, and Celery workers.
                  </p>

                  {/* Before you install */}
                  <h2 id="prereqs" ref={(r) => sectionRefs.current.prereqs = r}>Before you install</h2>
                  <p>
                    You need Docker Compose v2 running, about 16&nbsp;GB RAM, and roughly 20&nbsp;GB free disk for a
                    minimal Free install. A GPU is optional unless you plan Boltz-2 or binding free-energy work.
                  </p>
                  <div className="callout" style={{ marginBottom: 16 }}>
                    Full hardware tables, image download sizes, free ports, GPU setup, and platform notes: <DocsPageLink pageId="requirements">Requirements</DocsPageLink>.
                  </div>

                  {/* Install */}
                  <h2 id="install" ref={(r) => sectionRefs.current.install = r}>Installation</h2>
                  <p>
                    For desktop use, install the Ligand-X launcher from GitHub Releases. The launcher downloads the
                    runtime bundle, pulls selected images, and manages the stack without a git clone.
                  </p>
                  <CodeBlock
                    label="desktop"
                    copyText={`# Download from https://github.com/kon-218/ligand-x-launcher/releases\n# Windows: ligandx-windows-amd64.exe\n# macOS: ligandx-darwin-universal.dmg\n# Linux: ligandx-linux-amd64.AppImage`}
                  >
                    <Comment># Download from https://github.com/kon-218/ligand-x-launcher/releases</Comment>{"\n"}
                    <Comment># Windows: ligandx-windows-amd64.exe</Comment>{"\n"}
                    <Comment># macOS: ligandx-darwin-universal.dmg</Comment>{"\n"}
                    <Comment># Linux: ligandx-linux-amd64.AppImage</Comment>
                  </CodeBlock>
                  <p style={{ marginTop: 12 }}>
                    Prefer comparing install options in the browser? See the{" "}
                    <button
                      type="button"
                      onClick={() => window.__nav("download")}
                      style={{
                        background: "none", border: "none", padding: 0, cursor: "pointer",
                        color: "var(--accent-strong)", fontWeight: 600, textDecoration: "underline", font: "inherit",
                      }}
                    >
                      Download page
                    </button>
                    .
                  </p>

                  <h3>Production / headless CLI</h3>
                  <p>
                    For servers, download the public runtime bundle, edit secrets, and pull images from GHCR.
                    Confirm prerequisites on the <DocsPageLink pageId="requirements">Requirements</DocsPageLink> page first.
                  </p>
                  <CodeBlock
                    label="production"
                    copyText={`curl -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip\nunzip runtime.zip -d ligand-x && cd ligand-x\ncp .env.production.template .env.production   # then edit secrets\ndocker compose --env-file .env.production pull\ndocker compose --env-file .env.production up -d`}
                  >
                    <Cmd><Fn>curl</Fn> -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip</Cmd>{"\n"}
                    <Cmd><Fn>unzip</Fn> runtime.zip -d ligand-x && <Kw>cd</Kw> ligand-x</Cmd>{"\n"}
                    <Cmd><Fn>cp</Fn> .env.production.template .env.production   <Comment># then edit secrets</Comment></Cmd>{"\n"}
                    <Cmd><Fn>docker</Fn> compose --env-file .env.production pull</Cmd>{"\n"}
                    <Cmd><Fn>docker</Fn> compose --env-file .env.production up -d</Cmd>
                  </CodeBlock>

                  {/* First run */}
                  <h2 id="first-run" ref={(r) => sectionRefs.current['first-run'] = r}>First run</h2>
                  <p>
                    Desktop users: open the launcher, create an account, choose Free or import a license,
                    select services, then <strong>Download &amp; continue</strong>, <strong>Start services</strong>,
                    and <strong>Open Ligand-X</strong>. Headless installs can verify Compose health endpoints after{" "}
                    <code>docker compose up</code>.
                  </p>
                  <div className="callout" style={{ marginBottom: 16 }}>
                    First-run walkthrough: <DocsPageLink pageId="first-launch">First launch</DocsPageLink>.
                    {" "}Ports, <code>.env.production</code>, and Start behaviour: <DocsPageLink pageId="configuration">Configuration</DocsPageLink>.
                  </div>
                  <CodeBlock
                    label="verify"
                    copyText={`docker compose --env-file .env.production ps\ncurl http://localhost:8000/health\ncurl http://localhost:8000/api/services/health\n# launcher users: Open Ligand-X (APP_PORT, default 8080)`}
                  >
                    <Cmd><Fn>docker</Fn> compose --env-file .env.production ps</Cmd>{"\n"}
                    <Cmd><Fn>curl</Fn> http://localhost:8000/health</Cmd>{"\n"}
                    <Cmd><Fn>curl</Fn> http://localhost:8000/api/services/health</Cmd>{"\n"}
                    <span style={{ color: 'oklch(0.78 0.10 200)' }}>{"Launcher users: Open Ligand-X (APP_PORT, default 8080)"}</span>
                  </CodeBlock>

                  {/* Next */}
                  <h2 id="next" ref={(r) => sectionRefs.current.next = r}>Next steps</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                    <NextCard
                      title="Requirements"
                      desc="Hardware, Docker, GPU, disk budgets, free ports, and platform notes."
                      icon="book"
                      onClick={() => switchToGettingStartedPage("requirements")}
                    />
                    <NextCard
                      title="First launch"
                      desc="Account, license, Download & continue, Start services, and Open Ligand-X."
                      icon="network"
                      onClick={() => switchToGettingStartedPage("first-launch")}
                    />
                    <NextCard
                      title="Configuration"
                      desc=".env.production, ports, workers, and what Start preserves or rewrites."
                      icon="book"
                      onClick={() => switchToGettingStartedPage("configuration")}
                    />
                    <NextCard
                      title="Run your first docking job"
                      desc="Prepare a receptor and ligand, configure the search box, and review ranked poses."
                      icon="target"
                      onClick={() => switchToGuide("docking")}
                    />
                  </div>
                </>
              )}
            </main>

            {/* RIGHT TOC */}
            <aside className="docs-toc">
              <h6>On this page</h6>
              {currentBenchmark ? (
                <ul>
                  {currentBenchmark.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        className={activeBenchmarkSection === section.id ? "active" : ""}
                        onClick={() => scrollToBenchmarkSection(section.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : currentGettingStarted ? (
                <ul>
                  {currentGettingStarted.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        className={activeGettingStartedSection === section.id ? "active" : ""}
                        onClick={() => scrollToGettingStartedSection(section.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : currentGuide ? (
                <ul>
                  {currentGuide.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        className={activeGuideSection === s.id ? "active" : ""}
                        onClick={() => scrollToGuideSection(s.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {DOCS_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        className={activeSection === s.id ? "active" : ""}
                        onClick={() => scrollTo(s.id)}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </aside>

          </div>
        </div>
      </section>}
    </div>
  );
};

const NextCard = ({ title, desc, icon, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 18,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 0.15s, transform 0.15s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <Icon name={icon} size={18} style={{ color: 'var(--accent-strong)' }} />
      <span style={{ fontWeight: 600, fontSize: 15 }}>{title}</span>
    </div>
    <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: 0, lineHeight: 1.55 }}>{desc}</p>
    {onClick && (
      <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-strong)', display: 'flex', alignItems: 'center', gap: 4 }}>
        Continue <Icon name="arrow" size={11} />
      </div>
    )}
  </div>
);

Object.assign(window, { DocsPage });
