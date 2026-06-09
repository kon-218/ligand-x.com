// ============================================================
// DownloadPage — launcher-first install + source/CLI paths
// ============================================================

const OS_OPTIONS = [
  {
    id: "windows",
    name: "Windows",
    icon: "windows",
    sub: "Docker Desktop + WSL 2 backend",
    archs: [
      { arch: "x86_64", file: "ligandx-launcher-windows-amd64-installer.exe", url: "https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligandx-launcher-windows-amd64-installer.exe" },
    ],
    notes: [
      "Recommended path for non-terminal users",
      "GPU acceleration requires WSL 2 GPU passthrough and NVIDIA Container Toolkit for WSL 2",
    ],
  },
  {
    id: "macos",
    name: "macOS",
    icon: "apple",
    sub: "Docker Desktop",
    archs: [
      { arch: "Universal (M1/M2/M3 & Intel)", file: "ligandx-launcher-darwin-universal.dmg", url: "https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligandx-launcher-darwin-universal.dmg" },
    ],
    notes: [
      "Drag the app from the DMG into Applications",
      "On unsigned builds, right-click the app and choose Open on first launch",
    ],
  },
  {
    id: "linux",
    name: "Linux",
    icon: "linux",
    sub: "Docker Engine + Compose v2",
    archs: [
      { arch: "x86_64", file: "ligandx-launcher-linux-amd64.AppImage", url: "https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligandx-launcher-linux-amd64.AppImage" },
    ],
    notes: [
      "Make the AppImage executable before running it",
      "Install NVIDIA Container Toolkit for GPU services on Linux",
    ],
  },
];

const INSTALL_PATHS = [
  {
    title: "Desktop launcher",
    desc: "Downloads runtime files, imports a license when available, pulls selected images, and starts Ligand-X.",
    code: `# Recommended desktop path
# 1. Pick your OS above
# 2. Download the launcher
# 3. Open it and click Install & Start

# Linux only, after download
chmod +x ligandx-launcher-linux-amd64.AppImage
./ligandx-launcher-linux-amd64.AppImage`,
  },
  {
    title: "Production / headless CLI",
    desc: "For servers and deployments where you want explicit control over environment variables and Docker Compose.",
    code: `curl -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip
unzip runtime.zip -d ligand-x && cd ligand-x
cp .env.production.template .env.production   # then edit secrets
docker compose --env-file .env.production pull
docker compose --env-file .env.production up -d`,
  },
];


const InstallPathCarousel = () => {
  const scrollerRef = React.useRef(null);
  const [active, setActive] = React.useState(0);

  const scrollToCard = (index) => {
    const next = Math.max(0, Math.min(INSTALL_PATHS.length - 1, index));
    const scroller = scrollerRef.current;
    const card = scroller?.children[next];
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActive(next);
  };

  const syncActiveFromScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    const cards = Array.from(scroller.children);
    const nearest = cards.reduce((best, card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - scrollerCenter);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    setActive(nearest.index);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: 12 }}>
          {String(active + 1).padStart(2, '0')} / {String(INSTALL_PATHS.length).padStart(2, '0')}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => scrollToCard(active - 1)} disabled={active === 0} style={{ opacity: active === 0 ? 0.45 : 1 }} title="Previous install path">
            <Icon name="chev" size={13} style={{ transform: 'rotate(90deg)' }} />
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => scrollToCard(active + 1)} disabled={active === INSTALL_PATHS.length - 1} style={{ opacity: active === INSTALL_PATHS.length - 1 ? 0.45 : 1 }} title="Next install path">
            <Icon name="chev" size={13} style={{ transform: 'rotate(-90deg)' }} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        onScroll={syncActiveFromScroll}
        style={{
          display: 'flex',
          gap: 14,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPadding: 0,
          paddingBottom: 8,
          scrollbarWidth: 'thin',
        }}
      >
        {INSTALL_PATHS.map((path, index) => (
          <div key={path.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-4)', minWidth: 0, flex: '0 0 min(820px, calc(100vw - 64px))', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span className="mono" style={{ color: 'var(--muted-2)', fontSize: 12 }}>{String(index + 1).padStart(2, '0')}</span>
              <h3 style={{ margin: 0, fontSize: 18 }}>{path.title}</h3>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, minHeight: 42, marginTop: 0 }}>{path.desc}</p>
            <div style={{ minWidth: 0, marginTop: 'auto' }}>
              <CodeBlock label="commands" copyText={path.code}>
                {path.code.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.startsWith('#') ? <Comment>{line}</Comment> : <Cmd>{line}</Cmd>}{i < path.code.split('\n').length - 1 ? "\n" : null}
                  </React.Fragment>
                ))}
              </CodeBlock>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EDITIONS = [
  { name: "Free", access: "No license file", modules: "Core modules only" },
  { name: "Academic", access: "Signed license file", modules: "All Pro modules" },
  { name: "Pro", access: "Signed license file", modules: "Paid Pro entitlements listed in the license" },
];

const MODULES = [
  { group: "Open core", items: ["structure", "docking", "md", "alignment", "msa", "ketcher", "pocket-finder", "projects"] },
  { group: "Pro images", items: ["licensing", "admet", "qc", "boltz2", "reinvent", "abfe", "rbfe"] },
  { group: "Pro workers", items: ["worker-qc", "worker-gpu-long", "worker-reinvent"] },
];

const RELEASE_NOTES = [
  { v: "0.1.0", date: "2026-02-27", tag: "current repo", items: ["Initial public release", "Desktop launcher flow", "Open-core services with licensed Pro modules", "Next.js 16 / React 19 frontend"] },
];

const DownloadPage = () => {
  const [selectedOS, setSelectedOS] = React.useState("windows");
  const [copiedText, setCopiedText] = React.useState(null);
  const active = OS_OPTIONS.find((o) => o.id === selectedOS);

  const copyText = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1400);
  };

  return (
    <div className="page-fade">
      <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow"><span className="dot" />Download · current repository</div>
          <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
            Get Ligand-X with the desktop launcher.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 720, margin: 0 }}>
            The current install path is launcher-first. The launcher pulls selected open-core and licensed Pro
            container images, writes local configuration, and opens the app at localhost:3000.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dot" />Launcher downloads</div>
              <h2>Pick your OS.</h2>
            </div>
            <p className="sub">
              Assets are published on the GitHub Releases page. Docker must already be installed and running.
            </p>
          </div>

          <div className="os-grid">
            {OS_OPTIONS.map((os) => (
              <div
                key={os.id}
                className={`os-card ${selectedOS === os.id ? "selected" : ""}`}
                onClick={() => setSelectedOS(os.id)}
              >
                <div className="os-logo"><Icon name={os.icon} size={36} /></div>
                <div className="os-name">{os.name}</div>
                <div className="os-sub">{os.sub}</div>
                <div className="arch-list">
                  {os.archs.map((a) => (
                    <div className="arch-row" key={a.file}>
                      <span>{a.arch}</span>
                      <span className="size">launcher</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5) var(--sp-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name={active.icon} size={24} style={{ color: 'var(--ink)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{active.name} launcher</div>
                  <div className="mono" style={{ color: 'var(--muted)', fontSize: 12 }}>{active.sub}</div>
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => window.open('https://github.com/kon-218/ligand-x-launcher/releases', '_blank')}>
                <Icon name="download" size={13} />
                Releases
                <Icon name="external" size={11} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {active.archs.map((a) => (
                <div key={a.file} style={{ display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 16, alignItems: 'center', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{a.arch}</span>
                  <span className="mono" style={{ color: 'var(--muted)', fontSize: 12.5 }}>{a.file}</span>
                  <a
                    href={a.url}
                    download={a.file}
                    className="dl-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
                  >
                    <Icon name="download" size={12} /> Download
                  </a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 8 }}>Platform notes</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--ink-2)' }}>
                {active.notes.map((n, i) => <li key={i} style={{ marginBottom: 4 }}>{n}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dot" />Install paths</div>
              <h2>Launcher or production CLI.</h2>
            </div>
            <p className="sub">
              Use the launcher for desktop installs. Use the CLI for servers and automation.
            </p>
          </div>
          <InstallPathCarousel />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dot" />Licensing</div>
              <h2>Open core with licensed Pro modules.</h2>
            </div>
            <p className="sub">
              The public repository is PolyForm Noncommercial. Commercial use and Pro modules require a Ligand-X Pro license.
            </p>
          </div>
          <table className="src-table">
            <thead><tr><th>Edition</th><th>License</th><th>Access</th><th></th></tr></thead>
            <tbody>
              {EDITIONS.map((e) => (
                <tr key={e.name}>
                  <td>{e.name}</td>
                  <td className="mono">{e.access}</td>
                  <td>{e.modules}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dot" />Container images</div>
              <h2>Public images plus private Pro namespace.</h2>
            </div>
            <p className="sub">
              Public images are under <span className="mono">ghcr.io/kon-218/ligand-x</span>. Pro images are under <span className="mono">ghcr.io/kon-218/ligand-x-pro</span> and require licensed registry access.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {MODULES.map((m) => (
              <div key={m.group} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-4)' }}>
                <h3 style={{ marginTop: 0, fontSize: 18 }}>{m.group}</h3>
                <div className="tools">
                  {m.items.map((item) => <span className="tool-pill" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span className="dot" />Release notes</div>
              <h2>Current local baseline.</h2>
            </div>
            <a href="https://github.com/kon-218/ligand-x-launcher/releases" target="_blank" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-strong)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Full changelog <Icon name="external" size={12} />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {RELEASE_NOTES.map((r) => (
              <div key={r.v} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-4) var(--sp-5)', display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>v{r.v}</div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{r.date}</div>
                  <span style={{ display: 'inline-block', marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 8px', background: 'var(--ok)', color: '#fff', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.tag}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)' }}>
                  {r.items.map((it, i) => <li key={i} style={{ marginBottom: 3 }}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { DownloadPage });
