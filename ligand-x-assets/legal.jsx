// ============================================================
// LegalPage — /legal/ hub and the individual legal documents
// ============================================================
//
// All text comes from legal.js so the React render and the pre-rendered
// crawlable HTML in scripts/build-site.js cannot state different terms for the
// same URL. This file is presentation only — if you find yourself typing a
// sentence of policy here, it belongs in legal.js instead.
//
// Typography reuses .docs-main / .docs-toc; only the two-column grid is new.

const legalPageForPath = (pathname) => {
  const normalized = (pathname || "/legal/").replace(/\/+$/, "") + "/";
  return LEGAL_PAGES.find((page) => page.path === normalized) || null;
};

const LegalIndex = () => (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="eyebrow"><span className="dot" />Legal</div>
        <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
          Terms, privacy, and licensing.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 720, margin: 0 }}>
          {COMPANY.legalName} is {COMPANY.jurisdiction}. These are the documents that govern this
          website, your personal data, and your right to run Ligand-X.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-5)' }}>
          {LEGAL_INDEX.map((doc, index) => (
            <Reveal key={doc.path} i={index}>
              <a
                href={doc.path}
                onClick={(event) => window.__nav('legal', event, { path: doc.path })}
                style={{
                  display: 'block',
                  height: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--sp-5)',
                  textDecoration: 'none',
                }}
              >
                <h3 style={{ margin: '0 0 10px', fontSize: 19, color: 'var(--ink)' }}>{doc.title}</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.6 }}>{doc.desc}</p>
                <div style={{ marginTop: 16, color: 'var(--accent-strong)', fontSize: 13.5, fontWeight: 600 }}>
                  Read <Icon name="arrow" size={13} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="callout" style={{ marginTop: 'var(--sp-6)' }}>
          Questions about any of this, or about a licence for your organization? Email{' '}
          <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a> or use the{' '}
          <a href="/contact/" onClick={(event) => window.__nav('contact', event)}>licence request form</a>.
        </div>
      </div>
    </section>
  </div>
);

const LegalDocument = ({ doc }) => (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <a
          className="docs-back"
          href="/legal/"
          onClick={(event) => window.__nav('legal', event, { path: '/legal/' })}
        >
          {/* Icon spreads rest props after its own style, so a bare style prop
              would drop its display:block. Repeat it here. */}
          <Icon name="arrow" size={13} style={{ display: 'block', transform: 'rotate(180deg)' }} />
          All legal documents
        </a>
        <div className="eyebrow" style={{ marginTop: 14 }}><span className="dot" />{doc.eyebrow}</div>
        <h1 style={{ fontSize: 'clamp(32px, 3.6vw, 46px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
          {doc.title}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16.5, maxWidth: 720, margin: 0 }}>{doc.desc}</p>
        <p className="mono" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 18, marginBottom: 0 }}>
          Effective {doc.updated} · {COMPANY.legalName}
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="legal-layout">
          <main className="docs-main">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {(section.body || []).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, index) => (
                      <li key={index} style={{ marginBottom: 6 }}>{item}</li>
                    ))}
                  </ul>
                )}
                {(section.after || []).map((paragraph, index) => (
                  <p key={`after-${index}`}>{paragraph}</p>
                ))}
              </section>
            ))}

            <div className="callout" style={{ marginTop: 40 }}>
              Questions about this document? Email{' '}
              <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a>.
            </div>
          </main>

          <aside className="docs-toc">
            <h6>On this page</h6>
            <ul>
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  </div>
);

const LegalPage = () => {
  const doc = legalPageForPath(typeof window !== "undefined" ? window.location.pathname : "/legal/");

  // Deep links land at the top of the document; the hash jump happens after
  // mount because the section elements do not exist until this renders.
  React.useEffect(() => {
    if (!doc) return;
    const hash = (window.location.hash || "").replace("#", "");
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  }, [doc]);

  React.useEffect(() => {
    if (!doc) return;
    applyPageSeo({ title: doc.seoTitle, description: doc.seoDescription, path: doc.path });
  }, [doc]);

  return doc ? <LegalDocument doc={doc} /> : <LegalIndex />;
};

Object.assign(window, { LegalPage });
