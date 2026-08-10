// ============================================================
// App — top nav, page router, tweaks integration
// ============================================================

const ROUTES = SITE_ROUTES;
const PAGES = SITE_ROUTES.filter((route) => route.primary);
const routeFor = (id) => ROUTES.find((route) => route.id === id) || ROUTES[0];

const syncDocumentSeo = (pageId) => {
  const seo = seoForRoute(pageId);
  if (seo) applyPageSeo(seo);
};

// Below 640px `.nav-links` is display:none and there was no replacement, so the
// only reachable route from the header was Download. The panel renders the same
// ROUTES list as the desktop nav — no third copy of the navigation to drift.
const TopNav = ({ page, onNav, theme, onThemeToggle, version = "v0.1.0" }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => { setMenuOpen(false); }, [page]);

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 641px)');
    const onChange = () => { if (mq.matches) setMenuOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
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
        <a
          className="btn btn-primary btn-sm"
          href="/download/"
          aria-label="Download Ligand-X"
          onClick={(event) => onNav('download', event)}
        >
          <Icon name="download" size={13} />
          <span className="btn-label">Download</span>
        </a>
        <button
          className="btn btn-ghost btn-sm nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={17} />
        </button>
      </div>
    </div>

    {menuOpen && (
      <nav className="mobile-nav" id="mobile-nav" aria-label="Site">
        {ROUTES.filter((p) => p.primary || p.id === "contact").map((p) => (
          <a
            key={p.id}
            href={p.path}
            className={page === p.id ? "active" : ""}
            aria-current={page === p.id ? "page" : undefined}
            onClick={(event) => onNav(p.id, event)}
          >
            {p.label}
            <Icon name="arrow" size={15} />
          </a>
        ))}
        <a
          className="mobile-nav-ext"
          href="https://github.com/kon-218/ligand-x-launcher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" size={15} />
          Star on GitHub
          <Icon name="external" size={13} />
        </a>
      </nav>
    )}
  </header>
  );
};

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
            <li><a href="/features/" onClick={(event) => window.__nav('features', event)}>Features</a></li>
            <li><a href="/docs/" onClick={(event) => window.__nav('docs', event)}>Docs</a></li>
            <li><a href="/pro/" onClick={(event) => window.__nav('pro', event)}>Pro</a></li>
            <li><a href="/download/" onClick={(event) => window.__nav('download', event)}>Download</a></li>
            <li><a href="/contact/" onClick={(event) => window.__nav('contact', event)}>Request license</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/releases" target="_blank">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h6>Topics</h6>
          <ul>
            <li><a href="/molecular-docking/" onClick={(event) => window.__nav('molecular-docking', event)}>Molecular docking</a></li>
            <li><a href="/molecular-dynamics/" onClick={(event) => window.__nav('molecular-dynamics', event)}>Molecular dynamics</a></li>
            <li><a href="/docking-to-md/" onClick={(event) => window.__nav('docking-to-md', event)}>Docking to MD</a></li>
            <li><a href="/docs/requirements/" onClick={(event) => window.__nav('docs', event, { path: '/docs/requirements/' })}>Requirements</a></li>
            <li><a href="/docs/first-launch/" onClick={(event) => window.__nav('docs', event, { path: '/docs/first-launch/' })}>First launch</a></li>
            <li><a href="/docs/configuration/" onClick={(event) => window.__nav('docs', event, { path: '/docs/configuration/' })}>Configuration</a></li>
            <li><a href="/docs/guides/docking/" onClick={(event) => window.__nav('docs', event, { path: '/docs/guides/docking/' })}>Docking guide</a></li>
            <li><a href="/docs/guides/molecular-dynamics/" onClick={(event) => window.__nav('docs', event, { path: '/docs/guides/molecular-dynamics/' })}>MD guide</a></li>
            <li><a href="/docs/#api-reference" onClick={(event) => { window.__nav('docs', event); requestAnimationFrame(() => window.__navDocs && window.__navDocs('api-reference')); }}>API reference</a></li>
          </ul>
        </div>
        <div>
          <h6>Project</h6>
          <ul>
            <li><a href="https://github.com/kon-218/ligand-x-launcher" target="_blank">GitHub</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/issues" target="_blank">Issues</a></li>
            <li><a href="https://github.com/kon-218/ligand-x-launcher/discussions" target="_blank">Discussions</a></li>
            <li><a href="/contact/" onClick={(event) => window.__nav('contact', event)}>Request license</a></li>
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

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "spacious"
}/*EDITMODE-END*/;

const App = () => {
  const getPathPage = () => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const route = ROUTES.find((candidate) => candidate.path.replace(/\/+$/, "") === path);
    if (route) return route.id;
    if (path.startsWith("/docs/")) return "docs";
    return "home";
  };
  const [page, setPage] = React.useState(getPathPage);
  const [docsPathKey, setDocsPathKey] = React.useState(
    () => window.location.pathname.replace(/\/+$/, "") + "/" || "/docs/",
  );

  const getInitialTheme = () => {
    const stored = window.localStorage && window.localStorage.getItem('ligandx-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'light';
  };
  const [theme, setTheme] = React.useState(getInitialTheme);

  const onNav = (id, event, options = {}) => {
    if (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
    }
    const route = routeFor(id);
    const nextPath = options.path || route.path;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: id }, '', nextPath);
    }
    setPage(id);
    if (id === "docs") {
      setDocsPathKey(nextPath.replace(/\/+$/, "") + "/");
    }
    if (id === "docs" && options.path && options.path !== "/docs/") {
      // Docs deep links apply their own title/description inside DocsPage.
    } else {
      syncDocumentSeo(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  React.useEffect(() => {
    document.documentElement.classList.remove('app-loading');
    window.__nav = onNav;
    syncDocumentSeo(getPathPage());
    const onPopState = () => {
      const next = getPathPage();
      setPage(next);
      if (next === "docs") {
        setDocsPathKey(window.location.pathname.replace(/\/+$/, "") + "/");
      } else {
        syncDocumentSeo(next);
      }
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

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

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
    case "docs":      PageComp = <DocsPage key={docsPathKey} />; break;
    case "download":  PageComp = <DownloadPage />; break;
    case "contact":   PageComp = <ContactPage />; break;
    case "molecular-docking":
    case "molecular-dynamics":
    case "docking-to-md":
      PageComp = <LandingPage landingId={page} />;
      break;
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
