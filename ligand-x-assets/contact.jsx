// ============================================================
// ContactPage — Ligand-X-specific sales/contact page
// ============================================================

const CONTACT_TOPICS = [
  "Academic license access",
  "Commercial Pro modules",
  "Deployment support",
  "Private image access",
  "Custom workflow integration",
  "Training or collaboration",
];

const ContactPage = () => (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="eyebrow"><span className="dot" />Ligand-X Contact</div>
        <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
          Talk to us about Ligand-X Pro.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 720, margin: 0 }}>
          Use this page for Academic licenses, commercial Pro access, advanced services, and deployment questions.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 0.7fr)', gap: 'var(--sp-7)', alignItems: 'start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-6)' }}>
            <form action="/contact.php" method="get">
              <input type="hidden" name="product" value="Ligand-X" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)' }}>
                  First name
                  <input name="firstname" placeholder="Your name" style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)' }}>
                  Last name
                  <input name="lastname" placeholder="Your last name" style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
                </label>
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Work email
                <input name="email" type="email" placeholder="name@example.com" style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Organization
                <input name="organization" placeholder="Lab, university, or company" style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                What do you need?
                <select name="topic" defaultValue="Commercial Pro modules" style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit', background: 'var(--surface)' }}>
                  {CONTACT_TOPICS.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Message
                <textarea name="subject" placeholder="Tell us which modules, deployment setup, timeline, and support needs you have." style={{ minHeight: 170, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit', resize: 'vertical' }} />
              </label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                <button type="submit" className="btn btn-primary btn-lg">
                  <Icon name="scale" size={16} />
                  Send Ligand-X inquiry
                </button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => window.__nav('pro')}>
                  Back to Pro
                </button>
              </div>
            </form>
          </div>

          <aside style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
            <div className="mono" style={{ color: 'var(--accent-strong)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Useful context</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6 }}>
              <li>License type: Academic or Commercial Pro</li>
              <li>Modules needed: QC, ADMET, Boltz-2, ABFE/RBFE, REINVENT</li>
              <li>Deployment target: desktop, workstation, server, or private cluster</li>
              <li>GPU availability and expected molecule/project scale</li>
            </ul>
            <div style={{ marginTop: 22 }}>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>PRO IMAGE NAMESPACE</div>
              <code style={{ display: 'block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>
                ghcr.io/kon-218/ligand-x-pro
              </code>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
);

Object.assign(window, { ContactPage });
