// ============================================================
// landings.jsx — topic landings for docking / MD / docking→MD
// ============================================================

const LandingPage = ({ landingId }) => {
  const copy = SITE_COPY.landings[landingId];
  if (!copy) return null;

  const onPrimary = (event) => {
    if (copy.primaryCta.nav) window.__nav(copy.primaryCta.nav, event);
  };

  const onSecondary = (event) => {
    if (copy.secondaryCta.href.startsWith("/docs/guides/")) {
      window.__nav("docs", event, { path: copy.secondaryCta.href });
      return;
    }
    if (copy.secondaryCta.nav) window.__nav(copy.secondaryCta.nav, event);
  };

  return (
    <div className="page-fade landing-page">
      <section className="landing-hero">
        <div className="container">
          <div className="eyebrow"><span className="dot" />{copy.eyebrow}</div>
          <h1>{copy.h1}</h1>
          <p className="landing-lede">{copy.lede}</p>
          <p className="landing-claim">{CLAIMS.freeCore}</p>
          <div className="hero-cta">
            <a
              className="btn btn-primary btn-lg"
              href={copy.primaryCta.href}
              onClick={onPrimary}
            >
              <Icon name="download" size={16} />
              {copy.primaryCta.label}
            </a>
            <a
              className="btn btn-secondary btn-lg"
              href={copy.secondaryCta.href}
              onClick={onSecondary}
            >
              {copy.secondaryCta.label}
              <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="landing-sections">
        <div className="container">
          <div className="landing-grid">
            {copy.sections.map(([heading, body]) => (
              <article key={heading}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {copy.faqs && copy.faqs.length > 0 && (
        <section className="landing-faq">
          <div className="container">
            <h2>Frequently asked questions</h2>
            <div className="landing-faq-list">
              {copy.faqs.map((faq) => (
                <article key={faq.q}>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="landing-related">
        <div className="container">
          <h2>Related</h2>
          <ul>
            <li><a href="/molecular-docking/" onClick={(e) => window.__nav("molecular-docking", e)}>Molecular docking</a></li>
            <li><a href="/molecular-dynamics/" onClick={(e) => window.__nav("molecular-dynamics", e)}>Molecular dynamics</a></li>
            <li><a href="/docking-to-md/" onClick={(e) => window.__nav("docking-to-md", e)}>Docking to MD</a></li>
            <li><a href="/docs/guides/docking/" onClick={(e) => window.__nav("docs", e, { path: "/docs/guides/docking/" })}>Docking guide</a></li>
            <li><a href="/docs/guides/molecular-dynamics/" onClick={(e) => window.__nav("docs", e, { path: "/docs/guides/molecular-dynamics/" })}>MD guide</a></li>
            <li><a href="/features/" onClick={(e) => window.__nav("features", e)}>All capabilities</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { LandingPage });
