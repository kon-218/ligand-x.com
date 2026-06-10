// ============================================================
// Shared components: icons, molecule placeholder, code blocks
// ============================================================

const Icon = ({ name, size = 16, ...rest }) => {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    chev: <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    copy: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></g>,
    github: <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.06c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.07 11.07 0 0 1 12 6.8c.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>,
    docker: <g><rect x="1" y="9" width="3" height="3" fill="currentColor"/><rect x="5" y="9" width="3" height="3" fill="currentColor"/><rect x="9" y="9" width="3" height="3" fill="currentColor"/><rect x="13" y="9" width="3" height="3" fill="currentColor"/><rect x="5" y="5" width="3" height="3" fill="currentColor"/><rect x="9" y="5" width="3" height="3" fill="currentColor"/><rect x="13" y="5" width="3" height="3" fill="currentColor"/><rect x="9" y="1" width="3" height="3" fill="currentColor"/><path d="M17 9c2 0 4 1 5 2-1 4-4 6-9 6-5 0-9-3-9-7" fill="currentColor"/></g>,
    linux: <g transform="scale(1.5)" fill="currentColor"><path d="M8.996 4.497c.104-.076.1-.168.186-.158s.022.102-.098.207c-.12.104-.308.243-.46.323-.291.152-.631.336-.993.336s-.647-.167-.853-.33c-.102-.082-.186-.162-.248-.221-.11-.086-.096-.207-.052-.204.075.01.087.109.134.153.064.06.144.137.241.214.195.154.454.304.778.304s.702-.19.932-.32c.13-.073.297-.204.433-.304M7.34 3.781c.055-.02.123-.031.174-.003.011.006.024.021.02.034-.012.038-.074.032-.11.05-.032.017-.057.052-.093.054-.034 0-.086-.012-.09-.046-.007-.044.058-.072.1-.089m.581-.003c.05-.028.119-.018.173.003.041.017.106.045.1.09-.004.033-.057.046-.09.045-.036-.002-.062-.037-.093-.053-.036-.019-.098-.013-.11-.051-.004-.013.008-.028.02-.034"/><path fillRule="evenodd" d="M8.446.019c2.521.003 2.38 2.66 2.364 4.093-.01.939.509 1.574 1.04 2.244.474.56 1.095 1.38 1.45 2.32.29.765.402 1.613.115 2.465a.8.8 0 0 1 .254.152l.001.002c.207.175.271.447.329.698.058.252.112.488.224.615.344.382.494.667.48.922-.015.254-.203.43-.435.57-.465.28-1.164.491-1.586 1.002-.443.527-.99.83-1.505.871a1.25 1.25 0 0 1-1.256-.716v-.001a1 1 0 0 1-.078-.21c-.67.038-1.252-.165-1.718-.128-.687.038-1.116.204-1.506.206-.151.331-.445.547-.808.63-.5.114-1.126 0-1.743-.324-.577-.306-1.31-.278-1.85-.39-.27-.057-.51-.157-.626-.384-.116-.226-.095-.538.07-.988.051-.16.012-.398-.026-.648a2.5 2.5 0 0 1-.037-.369c0-.133.022-.265.087-.386v-.002c.14-.266.368-.377.577-.451s.397-.125.53-.258c.143-.15.27-.374.443-.56q.036-.037.073-.07c-.081-.538.007-1.105.192-1.662.393-1.18 1.223-2.314 1.811-3.014.502-.713.65-1.287.701-2.016.042-.997-.705-3.974 2.112-4.2q.168-.015.321-.013m2.596 10.866-.03.016c-.223.121-.348.337-.427.656-.08.32-.107.733-.13 1.206v.001c-.023.37-.192.824-.31 1.267s-.176.862-.036 1.128v.002c.226.452.608.636 1.051.601s.947-.304 1.36-.795c.474-.576 1.218-.796 1.638-1.05.21-.126.324-.242.333-.4.009-.157-.097-.403-.425-.767-.17-.192-.217-.462-.274-.71-.056-.247-.122-.468-.26-.585l-.001-.001c-.18-.157-.356-.17-.565-.164q-.069.001-.14.005c-.239.275-.805.612-1.197.508-.359-.09-.562-.508-.587-.918m-7.204.03H3.83c-.189.002-.314.09-.44.225-.149.158-.276.382-.445.56v.002h-.002c-.183.184-.414.239-.61.31-.195.069-.353.143-.46.35v.002c-.085.155-.066.378-.029.624.038.245.096.507.018.746v.002l-.001.002c-.157.427-.155.678-.082.822.074.143.235.22.48.272.493.103 1.26.069 1.906.41.583.305 1.168.404 1.598.305.431-.098.712-.369.75-.867v-.002c.029-.292-.195-.673-.485-1.052-.29-.38-.633-.752-.795-1.09v-.002l-.61-1.11c-.21-.286-.43-.462-.68-.5a1 1 0 0 0-.106-.008M9.584 4.85c-.14.2-.386.37-.695.467-.147.048-.302.17-.495.28a1.3 1.3 0 0 1-.74.19.97.97 0 0 1-.582-.227c-.14-.113-.25-.237-.394-.322a3 3 0 0 1-.192-.126c-.063 1.179-.85 2.658-1.226 3.511a5.4 5.4 0 0 0-.43 1.917c-.68-.906-.184-2.066.081-2.568.297-.55.343-.701.27-.649-.266.436-.685 1.13-.848 1.844-.085.372-.1.749.01 1.097.11.349.345.67.766.931.573.351.963.703 1.193 1.015s.302.584.23.777a.4.4 0 0 1-.212.22.7.7 0 0 1-.307.056l.184.235c.094.124.186.249.266.375 1.179.805 2.567.496 3.568-.218.1-.342.197-.664.212-.903.024-.474.05-.896.136-1.245s.244-.634.53-.791a1 1 0 0 1 .138-.061q.005-.045.013-.087c.082-.546.569-.572 1.18-.303.588.266.81.499.71.814h.13c.122-.398-.133-.69-.822-1.025l-.137-.06a2.35 2.35 0 0 0-.012-1.113c-.188-.79-.704-1.49-1.098-1.838-.072-.003-.065.06.081.203.363.333 1.156 1.532.727 2.644a1.2 1.2 0 0 0-.342-.043c-.164-.907-.543-1.66-.735-2.014-.359-.668-.918-2.036-1.158-2.983M7.72 3.503a1 1 0 0 0-.312.053c-.268.093-.447.286-.559.391-.022.021-.05.04-.119.091s-.172.126-.321.238q-.198.151-.13.38c.046.15.192.325.459.476.166.098.28.23.41.334a1 1 0 0 0 .215.133.9.9 0 0 0 .298.066c.282.017.49-.068.673-.173s.34-.233.518-.29c.365-.115.627-.345.709-.564a.37.37 0 0 0-.01-.309c-.048-.096-.148-.187-.318-.257h-.001c-.354-.151-.507-.162-.705-.29-.321-.207-.587-.28-.807-.279m-.89-1.122h-.025a.4.4 0 0 0-.278.135.76.76 0 0 0-.191.334 1.2 1.2 0 0 0-.051.445v.001c.01.162.041.299.102.436.05.116.109.204.183.274l.089-.065.117-.09-.023-.018a.4.4 0 0 1-.11-.161.7.7 0 0 1-.054-.22v-.01a.7.7 0 0 1 .014-.234.4.4 0 0 1 .08-.179q.056-.069.126-.073h.013a.18.18 0 0 1 .123.05c.045.04.08.09.11.162a.7.7 0 0 1 .054.22v.01a.7.7 0 0 1-.002.17 1.1 1.1 0 0 1 .317-.143 1.3 1.3 0 0 0 .002-.194V3.23a1.2 1.2 0 0 0-.102-.437.8.8 0 0 0-.227-.31.4.4 0 0 0-.268-.102m1.95-.155a.63.63 0 0 0-.394.14.9.9 0 0 0-.287.376 1.2 1.2 0 0 0-.1.51v.015q0 .079.01.152c.114.027.278.074.406.138a1 1 0 0 1-.011-.172.8.8 0 0 1 .058-.278.5.5 0 0 1 .139-.2.26.26 0 0 1 .182-.069.26.26 0 0 1 .178.081c.055.054.094.12.124.21.029.086.042.17.04.27l-.002.012a.8.8 0 0 1-.057.277c-.024.059-.089.106-.122.145.046.016.09.03.146.052a5 5 0 0 1 .248.102 1.2 1.2 0 0 0 .244-.763 1.2 1.2 0 0 0-.11-.495.9.9 0 0 0-.294-.37.64.64 0 0 0-.39-.133z"/></g>,
    apple: <path fill="currentColor" d="M17.5 12.5c0-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.4-2.2-4.1-2.2-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.8-1-1.9 0-3.7 1.1-4.7 2.8C1 12.4 2.4 18.1 4.5 21c1 1.5 2.2 3 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.6-1.4 3.6-2.9 1.1-1.7 1.6-3.4 1.6-3.4-.1 0-3.1-1.2-3.1-4.7zM14.6 4.1c.8-1 1.4-2.4 1.2-3.7-1.2.1-2.6.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.5 1.4.1 2.7-.6 3.5-1.6z"/>,
    windows: <g fill="currentColor"><path d="M2 4.5l9-1.3v9H2zM12 3l10-1.5v11.3H12zM2 13.5h9v9L2 21zM12 13.5h10V23l-10-1.5z"/></g>,
    play: <path fill="currentColor" d="M8 5v14l11-7z"/>,
    search: <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/></g>,
    book: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4H8a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h12z"/></g>,
    clock: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></g>,
    box: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8L12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/></g>,
    flask: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/><path d="M7 14h10"/></g>,
    chip: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM2 9h2M2 15h2M20 9h2M20 15h2M9 2v2M15 2v2M9 20v2M15 20v2"/></g>,
    sigma: <path fill="currentColor" d="M6 4h12v2l-7 6 7 6v2H6v-2l7-6-7-6z"/>,
    atom: <g stroke="currentColor" strokeWidth="1.4" fill="none"><circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g>,
    funnel: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 9v7l-4-2v-5z"/></g>,
    target: <g stroke="currentColor" strokeWidth="1.6" fill="none"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></g>,
    wave: <path d="M2 12c2-3 4-3 5 0s3 3 5 0 3-3 5 0 3 3 5 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>,
    network: <g stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="6" cy="6" r="2.5" fill="currentColor"/><circle cx="18" cy="6" r="2.5" fill="currentColor"/><circle cx="12" cy="18" r="2.5" fill="currentColor"/><path d="M7.5 7.5l3 8M16.5 7.5l-3 8M7 6h10"/></g>,
    scale: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"><path d="M12 3v18M5 8l7-4 7 4M3 12h4l-2 5h-2zM17 12h4l-2 5h-2zM3 17h4M17 17h4"/></g>,
    download: <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12M6 12l6 6 6-6M4 20h16"/></g>,
    external: <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M21 3l-9 9M14 5h-9v14h14v-9"/></g>,
    sun: <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></g>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 7 7 0 1 0 20.5 14.5z" fill="currentColor"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }} {...rest}>
      {paths[name]}
    </svg>
  );
};

// ============================================================
// Molecule placeholder — abstract 3D protein with controls chrome
// Generated procedurally — looks like a molecular viewer screenshot,
// not a hand-drawn protein.
// ============================================================

const MoleculePlaceholder = ({ pdb = "PDB 4W52", live = true }) => {
  // Pre-computed atom positions (alpha-carbon backbone of a folded shape)
  // Using a deterministic spline so it looks protein-like without faking biology.
  const atoms = React.useMemo(() => {
    const points = [];
    const N = 90;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const angle = t * Math.PI * 6 + Math.sin(t * 12) * 0.6;
      const r = 30 + Math.sin(t * 7) * 18 + Math.cos(t * 3) * 8;
      const cx = 50 + Math.cos(angle) * r * 0.5;
      const cy = 50 + Math.sin(angle) * r * 0.5 + Math.cos(t * 5) * 8;
      const z = Math.sin(t * 8) * 20;
      points.push({ x: cx, y: cy, z, t });
    }
    return points;
  }, []);

  // Build ribbon segments grouped into helix/sheet "regions"
  const ribbonPath = React.useMemo(() => {
    return atoms.map((a, i) => (i === 0 ? `M ${a.x} ${a.y}` : `L ${a.x} ${a.y}`)).join(" ");
  }, [atoms]);

  // Helix highlights (a few continuous runs)
  const helixSegments = [
    { from: 8, to: 22, color: "#1f8a8c" },
    { from: 30, to: 44, color: "#2a9d8f" },
    { from: 52, to: 64, color: "#264653" },
    { from: 70, to: 84, color: "#1f8a8c" },
  ];

  return (
    <div className="viewer">
      <div className="viewer-bg" />
      <div className="viewer-protein">
        <svg viewBox="0 0 100 100" width="92%" height="92%" style={{ display: 'block' }}>
          <defs>
            <radialGradient id="atom-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2a9d8f" stopOpacity="0" />
            </radialGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Surface glow */}
          <circle cx="50" cy="50" r="38" fill="url(#atom-glow)" />

          {/* Surface envelope (transparent protein surface) */}
          <ellipse cx="50" cy="50" rx="34" ry="30" fill="#2a9d8f" fillOpacity="0.06" stroke="#2a9d8f" strokeOpacity="0.18" strokeWidth="0.3" />
          <ellipse cx="48" cy="52" rx="28" ry="24" fill="#2a9d8f" fillOpacity="0.04" stroke="#2a9d8f" strokeOpacity="0.14" strokeWidth="0.2" transform="rotate(30 48 52)" />

          {/* Backbone trace */}
          <path d={ribbonPath} fill="none" stroke="#1f6660" strokeWidth="0.4" strokeOpacity="0.5" filter="url(#soft)" />

          {/* Helix segments */}
          {helixSegments.map((seg, i) => {
            const pts = atoms.slice(seg.from, seg.to);
            const path = pts.map((a, idx) => (idx === 0 ? `M ${a.x} ${a.y}` : `L ${a.x} ${a.y}`)).join(" ");
            return (
              <g key={i}>
                <path d={path} fill="none" stroke={seg.color} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
                <path d={path} fill="none" stroke="#fff" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
              </g>
            );
          })}

          {/* Ligand atoms cluster — small molecule in binding pocket */}
          <g transform="translate(38, 56)">
            {[
              { x: 0, y: 0, r: 1.8, c: "#1a1a1a" },
              { x: 3, y: -1, r: 1.6, c: "#1a1a1a" },
              { x: 5, y: 1.5, r: 1.4, c: "#cc2222" },
              { x: 2, y: 2.5, r: 1.4, c: "#3366cc" },
              { x: -2, y: 1.8, r: 1.4, c: "#1a1a1a" },
              { x: -1, y: -2, r: 1.2, c: "#cc2222" },
            ].map((a, i) => (
              <g key={i}>
                <circle cx={a.x} cy={a.y} r={a.r * 0.9} fill="#fff" opacity="0.9" />
                <circle cx={a.x} cy={a.y} r={a.r * 0.7} fill={a.c} />
              </g>
            ))}
            {/* bonds */}
            <g stroke="#444" strokeWidth="0.4" opacity="0.7">
              <line x1="0" y1="0" x2="3" y2="-1" />
              <line x1="3" y1="-1" x2="5" y2="1.5" />
              <line x1="0" y1="0" x2="2" y2="2.5" />
              <line x1="0" y1="0" x2="-2" y2="1.8" />
              <line x1="0" y1="0" x2="-1" y2="-2" />
            </g>
          </g>
        </svg>
      </div>

      <div className="viewer-tag">
        {live && <span className="pulse" />}
        Mol* viewer
      </div>
      <div className="viewer-pdb">{pdb}</div>
      <div className="viewer-controls">
        <button title="Zoom in">+</button>
        <button title="Zoom out">−</button>
        <button title="Reset" style={{ fontSize: 11 }}>↻</button>
      </div>
      <div className="viewer-axes">
        <span>X</span><span>Y</span><span>Z</span>
      </div>
    </div>
  );
};

// ============================================================
// Pipeline animated diagram
// ============================================================

const PipelineDiagram = ({ data, density = "spacious" }) => {
  return (
    <div className="pipeline">
      {data.map((step, i) => (
        <div className="pipeline-step" key={i}>
          <div className="idx">STEP {String(i + 1).padStart(2, "0")}</div>
          <div className="ttl">{step.title}</div>
          <div className="desc">{step.desc}</div>
          {i < data.length - 1 && <div className="arrow" />}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// Code block with copy button + syntax highlighting (lite)
// ============================================================

const CodeBlock = ({ tabs, label, copyText, children }) => {
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = tabs ? tabs[active].copy : copyText || "";
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const content = tabs ? tabs[active].content : children;
  const showCopy = tabs ? !!tabs[active].copy : !!copyText;

  return (
    <div className="code-card">
      <div className="code-head">
        <div className="tabs-mini">
          {tabs ? tabs.map((t, i) => (
            <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)}>
              {t.label}
            </button>
          )) : <span>{label || "shell"}</span>}
        </div>
        {showCopy && (
          <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
            <Icon name={copied ? "check" : "copy"} size={12} />
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <div className="code-body">{content}</div>
    </div>
  );
};

// Render a command line with prompt
const Cmd = ({ children }) => (
  <span><span className="c-prompt">$</span>{children}</span>
);
const Comment = ({ children }) => <span className="c-comment">{children}</span>;
const Kw = ({ children }) => <span className="c-keyword">{children}</span>;
const Str = ({ children }) => <span className="c-string">{children}</span>;
const Fn = ({ children }) => <span className="c-fn">{children}</span>;

// ============================================================
// Mol* lazy loader — injects the vendored standalone bundle once
// and resolves with the global `molstar` namespace. Kept off the
// critical path so the ~5MB viewer never blocks first paint.
// ============================================================

const MOLSTAR_VERSION = '20260610m';
let __molstarPromise = null;

function loadMolstar() {
  if (typeof window !== 'undefined' && window.molstar) return Promise.resolve(window.molstar);
  if (__molstarPromise) return __molstarPromise;

  __molstarPromise = new Promise((resolve, reject) => {
    // Stylesheet (needed for the canvas/viewport chrome even with panels hidden)
    if (!document.getElementById('molstar-css')) {
      const link = document.createElement('link');
      link.id = 'molstar-css';
      link.rel = 'stylesheet';
      link.href = '/ligand-x-assets/molstar/molstar.css?v=' + MOLSTAR_VERSION;
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = '/ligand-x-assets/molstar/molstar.js?v=' + MOLSTAR_VERSION;
    script.async = true;
    script.onload = () => {
      if (window.molstar) resolve(window.molstar);
      else reject(new Error('Mol* loaded but global `molstar` is missing'));
    };
    script.onerror = () => reject(new Error('Failed to load Mol* bundle'));
    document.body.appendChild(script);
  });

  return __molstarPromise;
}

// ============================================================
// Reveal — scroll-into-view animation wrapper.
// Renders a real element (default <div>) so it can REPLACE an
// existing node rather than nest one (keeps grids intact).
// Pass `i` for a stagger index (read by CSS as --reveal-i).
// Motion is gated in CSS behind prefers-reduced-motion.
// ============================================================

const __revealObserver = (typeof IntersectionObserver === 'undefined')
  ? null
  : new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

const Reveal = ({ as = 'div', i = 0, className = '', style, children, ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!__revealObserver) { el.classList.add('is-visible'); return; }
    __revealObserver.observe(el);
    return () => __revealObserver.unobserve(el);
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={('reveal ' + className).trim()}
      style={{ '--reveal-i': i, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ============================================================
// Brand mark
// ============================================================

const BrandMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.55 0.10 200)" />
        <stop offset="100%" stopColor="oklch(0.40 0.08 200)" />
      </linearGradient>
    </defs>
    <circle cx="6" cy="8" r="2.6" fill="url(#bm-g)" />
    <circle cx="18" cy="8" r="2.6" fill="url(#bm-g)" />
    <circle cx="12" cy="18" r="2.6" fill="url(#bm-g)" />
    <path d="M6 8 L12 18 L18 8 L6 8" stroke="oklch(0.40 0.08 200)" strokeWidth="1.2" fill="none" />
  </svg>
);

// Export to window
Object.assign(window, {
  Icon,
  MoleculePlaceholder,
  PipelineDiagram,
  CodeBlock,
  BrandMark,
  Cmd, Comment, Kw, Str, Fn,
  loadMolstar,
  Reveal,
});
