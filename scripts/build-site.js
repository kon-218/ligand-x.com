const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://www.ligand-x.com";

const { SITE_COPY, CLAIMS } = require("../ligand-x-assets/copy.js");
const { SITE_ROUTES } = require("../ligand-x-assets/routes.js");
const { GUIDES } = require("../ligand-x-assets/guides.js");
const { GETTING_STARTED_PAGES } = require("../ligand-x-assets/getting-started.js");

const pageFromCopy = (route) => {
  const block = SITE_COPY[route.id];
  if (!block || !block.seo) {
    throw new Error(`SITE_COPY missing seo block for route ${route.id}`);
  }
  const intro =
    route.id === "home"
      ? `${block.lede} ${block.seo.introTail || ""}`.trim()
      : block.lede;
  return {
    id: route.id,
    path: route.path,
    primary: route.primary !== false,
    title: block.seo.title,
    description: block.seo.description,
    eyebrow: block.eyebrow,
    heading: block.h1,
    intro,
    sections: block.seo.sections || [],
  };
};

const landingFromCopy = (route) => {
  const block = SITE_COPY.landings[route.id];
  if (!block) throw new Error(`SITE_COPY.landings missing ${route.id}`);
  return {
    id: route.id,
    path: block.path,
    primary: false,
    landing: true,
    title: block.seo.title,
    description: block.seo.description,
    eyebrow: block.eyebrow,
    heading: block.h1,
    intro: block.lede,
    sections: block.sections,
    faqs: block.faqs || [],
    actions: [
      { href: block.primaryCta.href, label: block.primaryCta.label },
      { href: block.secondaryCta.href, label: block.secondaryCta.label },
    ],
  };
};

const primaryPages = SITE_ROUTES.filter((route) => !route.landing).map(pageFromCopy);
const landingPages = SITE_ROUTES.filter((route) => route.landing).map(landingFromCopy);

const CRAWLABLE_GUIDE_IDS = [
  "protein-cleaning",
  "docking",
  "molecular-dynamics",
];

const guidePages = GUIDES.filter((guide) => CRAWLABLE_GUIDE_IDS.includes(guide.id)).map(
  (guide) => ({
    id: "docs",
    primary: false,
    guide: true,
    path: guide.path,
    title: `${guide.title} guide — Ligand-X documentation`,
    description: `${guide.desc} Free self-hosted Ligand-X walkthrough.`,
    eyebrow: guide.eyebrow,
    heading: guide.title,
    intro: guide.desc,
    sections: [
      [
        "Prerequisites",
        guide.prereqs.join(" "),
      ],
      ...guide.steps.map((step, index) => [
        `Step ${index + 1}: ${step.title}`,
        step.body,
      ]),
      [
        "Expected outputs",
        guide.outputs.join(" "),
      ],
      [
        "Tips",
        guide.tips.join(" "),
      ],
    ],
  }),
);

const gettingStartedPages = GETTING_STARTED_PAGES.map((page) => ({
  id: "docs",
  primary: false,
  path: page.path,
  title: page.seoTitle || `${page.title} — Ligand-X documentation`,
  description: page.seoDescription || page.desc,
  eyebrow: page.eyebrow,
  heading: page.title,
  intro: page.desc,
  sections: page.seoSections || page.sections.map((section) => [section.title, page.desc]),
  actions:
    page.kind === "hub"
      ? [
          { href: "/docs/first-launch/", label: "First launch" },
          { href: "/docs/configuration/", label: "Configuration" },
        ]
      : [
          { href: "/docs/", label: "Installation guide" },
          { href: "/download/", label: "Download Ligand-X" },
        ],
}));

const benchmarkPages = [
  {
    id: "docs",
    primary: false,
    path: "/docs/benchmarks/",
    title: "Benchmarks and validation — Ligand-X documentation",
    description:
      "Browse reproducible Ligand-X benchmark studies by computational method, including datasets, protocols, results, and limitations.",
    eyebrow: "Documentation · Benchmarks and validation",
    heading: "Scientific benchmarks, method by method.",
    intro:
      "Each study records the dataset, pinned protocol, evaluation metrics, results, limitations, and the materials needed to reproduce the analysis.",
    sections: [
      [
        "Molecular docking",
        "A worked Astex Diverse redocking example compares AutoDock Vina and Vinardo across 85 protein–ligand complexes.",
      ],
      [
        "Planned method pages",
        "Molecular dynamics, binding affinity, free energy, and quantum chemistry pages are scaffolded for future audited results.",
      ],
    ],
  },
  {
    id: "docs",
    primary: false,
    path: "/docs/benchmarks/docking/",
    title: "Vina vs Vinardo docking benchmark — Ligand-X",
    description:
      "Controlled Astex Diverse redocking benchmark comparing AutoDock Vina and Vinardo pose accuracy across 85 protein–ligand complexes.",
    eyebrow: "Benchmark · Molecular docking · Draft",
    heading: "AutoDock Vina versus Vinardo on Astex Diverse.",
    intro:
      "With preparation, search space, seed, and exhaustiveness held constant, Vinardo generated more sub-ångström poses but did not improve top-ranked pose success.",
    sections: [
      [
        "Controlled comparison",
        "Both scoring functions were evaluated across the same 85 Astex Diverse complexes using an identical ligand-extent-plus-4-ångström search box, seed 20260720, exhaustiveness 32, and ten output modes.",
      ],
      [
        "Primary result",
        "Vina achieved 62.4% top-1 success at 2 Å versus 60.0% for Vinardo; Vinardo improved sub-1 Å success from 36.5% to 45.9% and median RMSD from 1.27 Å to 1.17 Å.",
      ],
      [
        "Interpretation",
        "Both methods sampled a correct pose in more than 84% of cases. The remaining accuracy reserve is primarily a pose-ranking problem rather than a pose-generation problem.",
      ],
    ],
  },
  ...[
    ["molecular-dynamics", "Molecular dynamics"],
    ["binding-affinity", "Binding affinity"],
    ["free-energy", "Free-energy calculations"],
    ["quantum-chemistry", "Quantum chemistry"],
  ].map(([slug, title]) => ({
    id: "docs",
    primary: false,
    path: `/docs/benchmarks/${slug}/`,
    title: `${title} benchmark — Ligand-X documentation`,
    description: `Planned Ligand-X ${title.toLowerCase()} benchmark page. Audited results and reproducibility materials will be added after the protocol is locked.`,
    eyebrow: "Documentation · Benchmark planned",
    heading: `${title} benchmark.`,
    intro:
      "This page is reserved for a complete, audited benchmark. Results will be published here only after the dataset, protocol, metrics, and reproducibility package are locked.",
    sections: [
      [
        "Benchmark in preparation",
        "No scientific results are reported on this page yet. The future study will document methods, results, uncertainty, limitations, and reproducibility materials.",
      ],
    ],
  })),
];

const pages = [
  ...primaryPages,
  ...landingPages,
  ...gettingStartedPages,
  ...guidePages,
  ...benchmarkPages,
];

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pageUrl = (page) => `${ORIGIN}${page.path}`;

const navigation = (currentId) =>
  SITE_ROUTES.filter((route) => route.primary)
    .map(
      (route) =>
        `<a href="${route.path}"${route.id === currentId ? ' aria-current="page"' : ""}>${escapeHtml(route.label)}</a>`,
    )
    .join("\n          ");

const faqBlock = (faqs) => {
  if (!faqs || !faqs.length) return "";
  return `
        <div class="seo-static-faqs">
          <h2>Frequently asked questions</h2>
          ${faqs
            .map(
              (faq) => `<section>
            <h3>${escapeHtml(faq.q)}</h3>
            <p>${escapeHtml(faq.a)}</p>
          </section>`,
            )
            .join("\n          ")}
        </div>`;
};

const actionLinks = (page) => {
  const actions = page.actions || [
    { href: "/download/", label: "Download Ligand-X" },
    { href: "https://github.com/kon-218/ligand-x-launcher", label: "View Ligand-X on GitHub" },
  ];
  return actions
    .map((action) => `<a href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>`)
    .join("\n          ");
};

const staticContent = (page) => `
    <div class="seo-static">
      <header class="seo-static-header">
        <a class="seo-static-brand" href="/" aria-label="Ligand-X home">Ligand-X</a>
        <nav aria-label="Primary">
          ${navigation(page.id)}
        </nav>
      </header>
      <main>
        <p class="seo-static-eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.heading)}</h1>
        <p class="seo-static-intro">${escapeHtml(page.intro)}</p>
        ${page.landing ? `<p class="seo-static-claim">${escapeHtml(CLAIMS.freeCore)}</p>` : ""}
        <div class="seo-static-sections">
          ${page.sections
            .map(
              ([heading, copy]) => `<section>
            <h2>${escapeHtml(heading)}</h2>
            <p>${escapeHtml(copy)}</p>
          </section>`,
            )
            .join("\n          ")}
        </div>
        ${faqBlock(page.faqs)}
        <p class="seo-static-actions">
          ${actionLinks(page)}
        </p>
      </main>
      <footer>
        <p>Ligand-X is a self-hosted computational chemistry platform created by Konstantin Nomerotski.</p>
        <nav aria-label="Topic pages">
          <a href="/molecular-docking/">Molecular docking</a>
          <a href="/molecular-dynamics/">Molecular dynamics</a>
          <a href="/docking-to-md/">Docking to MD</a>
          <a href="/contact/">Contact and licensing</a>
        </nav>
      </footer>
    </div>`;

const structuredData = (page) => {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: "Ligand-X",
      alternateName: ["Ligand X", "LigandX"],
      description:
        "Official website for the Ligand-X self-hosted computational drug discovery workbench.",
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${ORIGIN}/#software`,
      name: "Ligand-X",
      alternateName: ["Ligand X", "LigandX"],
      url: `${ORIGIN}/`,
      downloadUrl: `${ORIGIN}/download/`,
      sameAs: [
        "https://github.com/kon-218/ligand-x-launcher",
        "https://k-nom.com/portfolio/ligand-x/",
      ],
      applicationCategory: "ScienceApplication",
      applicationSubCategory: "Computational chemistry and computer-aided drug discovery",
      operatingSystem: ["Windows", "macOS", "Linux"],
      isAccessibleForFree: true,
      softwareHelp: `${ORIGIN}/docs/`,
      featureList: [
        "Protein preparation",
        "Ligand editing and management",
        "Molecular docking with AutoDock Vina",
        "Molecular dynamics with OpenMM",
        "Docking to MD workflows",
        "Binding-pocket detection",
        "Protein-ligand analysis",
      ],
      description:
        "A free, self-hosted workbench for protein preparation, ligand management, molecular docking, molecular dynamics, docking-to-MD pipelines, and computational drug discovery.",
      author: {
        "@type": "Person",
        name: "Konstantin Nomerotski",
        url: "https://k-nom.com/",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        category: "Free core use",
      },
    },
  ];

  if (page.id !== "home" || page.path !== "/") {
    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl(page)}#webpage`,
      url: pageUrl(page),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${ORIGIN}/#website` },
      about: { "@id": `${ORIGIN}/#software` },
      inLanguage: "en",
    });
  }

  if (page.faqs && page.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl(page)}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    });
  }

  if (page.guide) {
    graph.push({
      "@type": "HowTo",
      "@id": `${pageUrl(page)}#howto`,
      name: page.heading,
      description: page.intro,
      step: page.sections
        .filter(([heading]) => heading.startsWith("Step "))
        .map(([heading, text]) => ({
          "@type": "HowToStep",
          name: heading.replace(/^Step \d+:\s*/, ""),
          text,
        })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
};

const seoStyle = `
  <style id="seo-static-style">
    .seo-static{max-width:1120px;margin:0 auto;padding:0 28px;color:#16201e;font-family:"IBM Plex Sans",system-ui,sans-serif}
    .seo-static-header{min-height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dce2df}
    .seo-static-brand{color:inherit;font-size:20px;font-weight:700;text-decoration:none}
    .seo-static nav{display:flex;gap:22px;flex-wrap:wrap}.seo-static nav a,.seo-static footer a{color:#315f58;text-decoration:none}
    .seo-static nav a[aria-current="page"]{font-weight:700}.seo-static main{padding:80px 0}
    .seo-static-eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:13px;font-weight:700;color:#397c71}
    .seo-static h1{max-width:820px;margin:12px 0 22px;font-size:clamp(40px,6vw,72px);line-height:1.03;letter-spacing:-.04em}
    .seo-static-intro{max-width:780px;font-size:20px;line-height:1.65;color:#4f5d59}
    .seo-static-claim{max-width:780px;margin-top:18px;font-size:16px;line-height:1.6;color:#264d47;font-weight:600}
    .seo-static-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:28px;margin-top:64px}
    .seo-static-sections section{padding-top:22px;border-top:2px solid #397c71}
    .seo-static h2{font-size:20px}.seo-static h3{font-size:17px;margin:0 0 8px}
    .seo-static section p,.seo-static footer{line-height:1.65;color:#5f6b68}
    .seo-static-faqs{margin-top:56px;max-width:780px}.seo-static-faqs h2{margin-bottom:24px}
    .seo-static-faqs section{padding:18px 0;border-top:1px solid #dce2df}
    .seo-static-actions{display:flex;gap:14px;margin-top:48px;flex-wrap:wrap}.seo-static-actions a{padding:12px 18px;border-radius:6px;background:#1d6d60;color:#fff;text-decoration:none}
    .seo-static-actions a+ a{background:#edf2f0;color:#264d47}
    .seo-static footer{padding:28px 0 48px;border-top:1px solid #dce2df}
    .seo-static footer nav{display:flex;gap:18px;flex-wrap:wrap;margin-top:12px}
    @media(max-width:700px){.seo-static-header{align-items:flex-start;gap:18px;padding:20px 0}.seo-static nav{flex-wrap:wrap;gap:10px 16px}.seo-static main{padding:52px 0}.seo-static-actions{align-items:flex-start;flex-direction:column}}
  </style>`;

const replaceMeta = (template, page) => {
  const url = pageUrl(page);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      "</head>",
      `${seoStyle}\n  <script type="application/ld+json">${structuredData(page)}</script>\n</head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${staticContent(page)}\n  </div>`);

  return html;
};

const copyDirectory = (source, destination) => {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
    else fs.copyFileSync(sourcePath, destinationPath);
  }
};

const removeDirectory = (directory) => {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) removeDirectory(entryPath);
    else fs.unlinkSync(entryPath);
  }
  fs.rmdirSync(directory);
};

removeDirectory(DIST);
fs.mkdirSync(DIST, { recursive: true });

const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
for (const page of pages) {
  const outputDirectory =
    page.path === "/" ? DIST : path.join(DIST, page.path.replace(/^\/|\/$/g, ""));
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, "index.html"), replaceMeta(template, page));
}

copyDirectory(path.join(ROOT, "ligand-x-assets"), path.join(DIST, "ligand-x-assets"));
fs.copyFileSync(path.join(ROOT, "robots.txt"), path.join(DIST, "robots.txt"));
fs.copyFileSync(path.join(ROOT, "CNAME"), path.join(DIST, "CNAME"));
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

const lastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${pageUrl(page)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.id === "home" && page.path === "/" ? "weekly" : "monthly"}</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

const notFound = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Page not found — Ligand-X</title>
  <link rel="stylesheet" href="/ligand-x-assets/styles.css">
</head>
<body>
  <main style="max-width:720px;margin:15vh auto;padding:24px;font-family:system-ui,sans-serif">
    <p>404</p>
    <h1>Page not found</h1>
    <p>The requested Ligand-X page does not exist.</p>
    <p><a href="/">Return to Ligand-X</a> · <a href="/docs/">Read the documentation</a></p>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(DIST, "404.html"), notFound);

console.log(`Built ${pages.length} indexable pages in ${DIST}`);
