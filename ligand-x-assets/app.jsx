// ============================================================
// App — top nav, page router, tweaks integration
// ============================================================

const PAGES = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "docs", label: "Docs" },
  { id: "pro", label: "Pro" },
  { id: "download", label: "Download" },
];

const ROUTES = [...PAGES, { id: "contact", label: "Contact" }];

const TopNav = ({ page, onNav, version = "v0.1.0" }) => (
  <header className="topnav">
    <div className="container-wide topnav-inner">
      <div className="brand" onClick={() => onNav('home')}>
        <BrandMark />
        <span>Ligand-X</span>
        <small>BETA</small>
      </div>
      <nav className="nav-links">
        {PAGES.map((p) => (
          <button
            key={p.id}
            className={page === p.id ? "active" : ""}
            onClick={() => onNav(p.id)}
          >
            {p.label}
          </button>
        ))}
      </nav>
      <div className="nav-right">
        <span className="ver">{version}</span>
        <button className="btn btn-ghost btn-sm" title="Search">
          <Icon name="search" size={14} />
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => window.open('https://github.com/kon-218/ligand-x-launcher', '_blank')}
        >
          <Icon name="github" size={14} />
          Star
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => onNav('download')}>
          <Icon name="download" size={13} />
          Download
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="foot" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
    <div className="container-wide">
      <div className="foot-inner">
        <div>
          <div className="brand" style={{ marginBottom: 12 }}>
            <BrandMark />
            <span>Ligand-X</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, maxWidth: 320, margin: 0 }}>
            A free, self-hosted computational chemistry platform for the full drug-discovery
            pipeline. Built by Konstantin Nomerotski.
          </p>
        </div>
        <div>
          <h6>Product</h6>
          <ul>
            <li><a onClick={() => window.__nav('features')}>Features</a></li>
            <li><a onClick={() => window.__nav('docs')}>Docs</a></li>
            <li><a onClick={() => window.__nav('pro')}>Pro</a></li>
            <li><a onClick={() => window.__nav('download')}>Download</a></li>
            <li><a onClick={() => window.__nav('contact')}>Contact</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/releases" target="_blank">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h6>Resources</h6>
          <ul>
            <li><a onClick={() => { window.__nav('docs'); requestAnimationFrame(() => window.__navDocs && window.__navDocs('api-reference')); }}>API reference</a></li>
          </ul>
        </div>
        <div>
          <h6>Project</h6>
          <ul>
            <li><a href="https://github.com/kon-218/ligand-x-launcher" target="_blank">GitHub</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/issues" target="_blank">Issues</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/discussions" target="_blank">Discussions</a></li>
            <li><a onClick={() => window.__nav('contact')}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <span>© 2026 Konstantin Nomerotski · PolyForm Noncommercial</span>
        <span>v0.1.0 · current repository</span>
      </div>
    </div>
  </footer>
);

// ============================================================
// Page router with hash sync
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "spacious"
}/*EDITMODE-END*/;

const App = () => {
  // Page state from hash
  const getHashPage = () => {
    const h = (window.location.hash || "").replace("#", "");
    return ROUTES.find((p) => p.id === h) ? h : "home";
  };
  const [page, setPage] = React.useState(getHashPage);

  const onNav = (id) => {
    window.location.hash = id;
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  React.useEffect(() => {
    window.__nav = onNav;
    const onHash = () => setPage(getHashPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Tweaks (returns [values, setter])
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply density to root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', tweaks.density);
  }, [tweaks.density]);

  let PageComp;
  switch (page) {
    case "features":  PageComp = <FeaturesPage />; break;
    case "pro":       PageComp = <ProPage />; break;
    case "docs":      PageComp = <DocsPage />; break;
    case "download":  PageComp = <DownloadPage />; break;
    case "contact":   PageComp = <ContactPage />; break;
    default:          PageComp = <HomePage />;
  }

  return (
    <>
      <TopNav page={page} onNav={onNav} />
      <main>{PageComp}</main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Density">
          <TweakRadio
            label="Spacing"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: "spacious", label: "Spacious" },
              { value: "compact",  label: "Compact" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Jump to page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {ROUTES.map((p) => (
              <TweakButton
                key={p.id}
                label={p.label}
                onClick={() => onNav(p.id)}
                secondary={page !== p.id}
              />
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
