// ============================================================
// App — top nav, page router, tweaks integration
// ============================================================

const ROUTES = SITE_ROUTES;
const PAGES = ROUTES.filter((route) => route.primary);


const TopNav = ({ page, onNav, theme, onThemeToggle, version = "v0.1.0" }) => (
  <header className="topnav">
    <div className="container-wide topnav-inner">
      <a className="brand" href="/" onClick={(event) => onNav('home', event)}>
        <BrandMark />
        <span>Ligand-X</span>
        <small>BETA</small>
      </a>
      <nav className="nav-links">
        {PAGES.map((p) => (
          <a
            key={p.id}
            href={p.path}
            className={page === p.id ? "active" : ""}
            onClick={(event) => onNav(p.id, event)}
          >
            {p.label}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <span className="ver">{version}</span>
        <button
          className="btn btn-ghost btn-sm theme-toggle"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={theme === 'dark'}
          onClick={onThemeToggle}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
        </button>
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
        <a className="btn btn-primary btn-sm" href="/download/" onClick={(event) => onNav('download', event)}>
          <Icon name="download" size={13} />
          {CTA.download}
        </a>
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
            <li><a href="/features/" onClick={(event) => window.__nav('features', event)}>Capabilities</a></li>
            <li><a href="/docs/" onClick={(event) => window.__nav('docs', event)}>Docs</a></li>
            <li><a href="/pro/" onClick={(event) => window.__nav('pro', event)}>Editions</a></li>
            <li><a href="/download/" onClick={(event) => window.__nav('download', event)}>{CTA.download}</a></li>
            <li><a href="/contact/" onClick={(event) => window.__nav('contact', event)}>{CTA.license}</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/releases" target="_blank">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h6>Resources</h6>
          <ul>
            <li><a href="/docs/#api-reference" onClick={(event) => { window.__nav('docs', event); requestAnimationFrame(() => window.__navDocs && window.__navDocs('api-reference')); }}>API reference</a></li>
          </ul>
        </div>
        <div>
          <h6>Project</h6>
          <ul>
            <li><a href="https://github.com/kon-218/ligand-x-launcher" target="_blank">GitHub</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/issues" target="_blank">Issues</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/discussions" target="_blank">Discussions</a></li>
            <li><a href="/contact/" onClick={(event) => window.__nav('contact', event)}>{CTA.license}</a></li>
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
  // Page state from the indexable URL path. Old #page links are migrated below.
  const getPathPage = () => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const route = ROUTES.find((candidate) => candidate.path.replace(/\/+$/, "") === path);
    return route ? route.id : "home";
  };
  const [page, setPage] = React.useState(getPathPage);

  const getInitialTheme = () => {
    const stored = window.localStorage && window.localStorage.getItem('ligandx-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'light';
  };
  const [theme, setTheme] = React.useState(getInitialTheme);

  const onNav = (id, event) => {
    if (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
    }
    const route = routeFor(id);
    if (window.location.pathname !== route.path) {
      window.history.pushState({ page: id }, '', route.path);
    }
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  React.useEffect(() => {
    document.documentElement.classList.remove('app-loading');
    window.__nav = onNav;
    const onPopState = () => {
      setPage(getPathPage());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', onPopState);
    const legacyPage = (window.location.hash || "").replace("#", "");
    if (ROUTES.some((route) => route.id === legacyPage)) {
      const route = routeFor(legacyPage);
      window.location.replace(route.path);
    }
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Tweaks (returns [values, setter])
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply density and theme to root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', tweaks.density);
  }, [tweaks.density]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage && window.localStorage.setItem('ligandx-theme', theme);
  }, [theme]);

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
      <TopNav page={page} onNav={onNav} theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
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
