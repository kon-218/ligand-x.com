// ============================================================
// ContactPage — license request form
// ============================================================

const CONTACT_TOPICS = [
  "Academic license access",
  "Commercial Pro modules",
  "Deployment support",
  "Private image access",
  "Custom workflow integration",
  "Training or collaboration",
];

// /pro/ routes three different buyers here through one form, so it sets
// window.__contactTopic before navigating and we open on the right option.
// Read once and cleared, so a later visit from the nav starts neutral.
const takeContactTopic = () => {
  const topic = typeof window !== "undefined" && window.__contactTopic;
  if (typeof window !== "undefined") window.__contactTopic = null;
  return CONTACT_TOPICS.includes(topic) ? topic : "Commercial Pro modules";
};

const ContactPage = () => {
  // Lazy initializer: read the incoming topic exactly once, on mount.
  const [topic] = React.useState(takeContactTopic);

  return (
  <div className="page-fade">
    <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="eyebrow"><span className="dot" />Request license</div>
        <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
          Request a Ligand-X Pro license.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 720, margin: 0 }}>
          Academic licenses, commercial Pro access, deployment questions, or help picking modules.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 0.7fr)', gap: 'var(--sp-7)', alignItems: 'start' }}>
          <div className="contact-form-panel" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-6)' }}>
            <form className="contact-form" action="https://formsubmit.co/support@ligand-x.com" method="POST">
              <input type="hidden" name="_subject" value="New Ligand-X license request" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
              <input type="hidden" name="product" value="Ligand-X" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)' }}>
                  First name
                  <input name="firstname" placeholder="Your name" required style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)' }}>
                  Last name
                  <input name="lastname" placeholder="Your last name" required style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
                </label>
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Work email
                <input name="email" type="email" placeholder="name@example.com" required style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Organization
                <input name="organization" placeholder="Lab, university, or company" required style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                What do you need?
                <select name="topic" defaultValue={topic} required style={{ padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit', background: 'var(--surface)' }}>
                  {CONTACT_TOPICS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-2)', marginTop: 14 }}>
                Message
                <textarea name="message" placeholder="Tell us which modules, deployment setup, timeline, and support needs you have." required style={{ minHeight: 170, padding: '11px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', font: 'inherit', resize: 'vertical' }} />
              </label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                <button type="submit" className="btn btn-primary btn-lg">
                  <Icon name="scale" size={16} />
                  Request license
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
              <li>Modules needed: {proModules().map((mod) => mod.short || mod.name).join(", ")}</li>
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
};

Object.assign(window, { ContactPage });
