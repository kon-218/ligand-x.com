const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://www.ligand-x.com";

const pages = [
  {
    id: "home",
    path: "/",
    title: "Ligand-X | Official computational drug discovery platform",
    description:
      "Official Ligand-X website. Download the free, self-hosted computational drug discovery platform for molecular docking, molecular dynamics, and protein-ligand analysis.",
    eyebrow: "Official Ligand-X website",
    heading: "Ligand-X: computational drug discovery on hardware you control.",
    intro:
      "Ligand-X—also written Ligand X or LigandX—is a free desktop workbench for computer-aided drug discovery. Prepare proteins, manage ligands, run molecular docking and molecular dynamics, and keep every structure and result connected in one local project.",
    sections: [
      [
        "One integrated scientific workspace",
        "Import proteins and molecules, find binding pockets, compare docking poses, launch simulations, and review results without rebuilding the workflow across disconnected scripts and folders.",
      ],
      [
        "Private by design",
        "Ligand-X is self-hosted. Structures, compounds, calculations, and results remain on your own workstation or compute infrastructure.",
      ],
      [
        "Free for academic use",
        "Install the Ligand-X launcher on Windows, macOS, or Linux and add optional Pro modules when your work requires advanced affinity, quantum chemistry, ADMET, or generative-design workflows.",
      ],
    ],
  },
  {
    id: "features",
    path: "/features/",
    title: "Features — Ligand-X computational drug discovery software",
    description:
      "Explore Ligand-X features for protein preparation, molecular docking, molecular dynamics, ligand management, pocket finding, free-energy calculations, and more.",
    eyebrow: "Ligand-X capabilities",
    heading: "One workbench for the computational discovery loop.",
    intro:
      "Ligand-X connects protein and ligand preparation, docking, simulation, and analysis in a single self-hosted computational chemistry workspace.",
    sections: [
      [
        "Prepare structures and binding sites",
        "Inspect chains, ligands, waters, ions, and metals; clean protein structures; align molecules and structures; and identify candidate binding pockets before calculation.",
      ],
      [
        "Dock, simulate, and compare",
        "Prepare receptors and ligands for AutoDock Vina, run single or batch docking, inspect ranked poses and interactions, and continue selected complexes into OpenMM molecular dynamics.",
      ],
      [
        "Extend the workflow",
        "Optional modules support quantum chemistry, ADMET prediction, Boltz-2 affinity prediction, ABFE and RBFE calculations, and REINVENT generative molecular design.",
      ],
    ],
  },
  {
    id: "docs",
    path: "/docs/",
    title: "Documentation — Install and use Ligand-X",
    description:
      "Ligand-X documentation for installation, configuration, protein preparation, molecular docking, molecular dynamics, API usage, and advanced workflows.",
    eyebrow: "Ligand-X documentation",
    heading: "Install Ligand-X and run your first workflow.",
    intro:
      "Use these guides to install the self-hosted Ligand-X workbench, configure its services, prepare structures, run calculations, and understand the generated outputs.",
    sections: [
      [
        "Installation and configuration",
        "Review system requirements, install the desktop launcher or container runtime, configure local services, and start the application on your workstation.",
      ],
      [
        "Scientific walkthroughs",
        "Follow practical guides for protein cleaning, molecular docking, molecular dynamics, absolute and relative binding free energy, and quantum chemistry.",
      ],
      [
        "API reference",
        "Explore the Ligand-X interfaces for projects, proteins, molecules, poses, pockets, jobs, health checks, authentication, and live job updates.",
      ],
    ],
  },
  {
    id: "pro",
    path: "/pro/",
    title: "Ligand-X Pro — Advanced local computational chemistry modules",
    description:
      "Add local quantum chemistry, ADMET, Boltz-2 affinity prediction, ABFE, RBFE, and generative molecular design modules to Ligand-X.",
    eyebrow: "Ligand-X Pro",
    heading: "Advanced calculations in the same private workspace.",
    intro:
      "Ligand-X Pro adds licensed computational chemistry and molecular-design modules to the same self-hosted interface used for structure preparation, docking, and simulation.",
    sections: [
      [
        "Affinity and free-energy workflows",
        "Run Boltz-2 binding-affinity prediction and licensed absolute or relative binding free-energy calculations without moving project data into a separate system.",
      ],
      [
        "Property and electronic analysis",
        "Add ADMET screening and quantum chemistry workflows for geometry, charge, reactivity, and other molecular properties.",
      ],
      [
        "Local deployment",
        "Private module containers integrate with an existing Ligand-X installation so sensitive structures, ligands, and results stay on infrastructure you control.",
      ],
    ],
  },
  {
    id: "download",
    path: "/download/",
    title: "Download Ligand-X for Windows, macOS, and Linux",
    description:
      "Download the free Ligand-X launcher for Windows, macOS, or Linux and install a self-hosted computational drug discovery workbench.",
    eyebrow: "Download Ligand-X",
    heading: "Run Ligand-X on your own computer.",
    intro:
      "Download the Ligand-X desktop launcher for Windows, macOS, or Linux. The launcher installs and manages the local containerized services used by the computational drug discovery workbench.",
    sections: [
      [
        "Desktop launcher",
        "Choose the release for your operating system, install Docker when required, select the modules you need, and start the local Ligand-X application.",
      ],
      [
        "Command-line installation",
        "Advanced users can download the runtime bundle, configure environment settings, pull the required containers, and start the stack with Docker Compose.",
      ],
      [
        "Project source and releases",
        "Release files, changelogs, issue reporting, and installation resources are available from the official Ligand-X launcher repository on GitHub.",
      ],
    ],
  },
  {
    id: "contact",
    path: "/contact/",
    title: "Contact and request a Ligand-X Pro license",
    description:
      "Contact the Ligand-X team to request a Pro license for local advanced computational chemistry and molecular-design modules.",
    eyebrow: "Contact Ligand-X",
    heading: "Request access to Ligand-X Pro.",
    intro:
      "Tell us about your organization and the advanced Ligand-X modules you need. Pro licensing adds selected private computational services to your local installation.",
    sections: [
      [
        "What to include",
        "Provide your name, organization, email address, intended use, and the modules or workflows you want to evaluate.",
      ],
      [
        "Keep computation local",
        "A Pro license unlocks selected module containers while scientific inputs and calculation results remain on your own infrastructure.",
      ],
    ],
  },
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pageUrl = (page) => `${ORIGIN}${page.path}`;

const navigation = (currentId) =>
  pages
    .filter((page) => page.id !== "contact")
    .map(
      (page) =>
        `<a href="${page.path}"${page.id === currentId ? ' aria-current="page"' : ""}>${page.id === "home" ? "Home" : page.id[0].toUpperCase() + page.id.slice(1)}</a>`,
    )
    .join("\n          ");

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
        <p class="seo-static-actions">
          <a href="/download/">Download Ligand-X</a>
          <a href="https://github.com/kon-218/ligand-x-launcher">View Ligand-X on GitHub</a>
        </p>
      </main>
      <footer>
        <p>Ligand-X is a self-hosted computational chemistry platform created by Konstantin Nomerotski.</p>
        <a href="/contact/">Contact and licensing</a>
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
        "Binding-pocket detection",
        "Protein-ligand analysis",
      ],
      description:
        "A free, self-hosted workbench for protein preparation, ligand management, molecular docking, molecular dynamics, and computational drug discovery.",
      author: {
        "@type": "Person",
        name: "Konstantin Nomerotski",
        url: "https://k-nom.com/",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        category: "Academic use",
      },
    },
  ];

  if (page.id !== "home") {
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

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
};

const seoStyle = `
  <style id="seo-static-style">
    .seo-static{max-width:1120px;margin:0 auto;padding:0 28px;color:#16201e;font-family:"IBM Plex Sans",system-ui,sans-serif}
    .seo-static-header{min-height:72px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dce2df}
    .seo-static-brand{color:inherit;font-size:20px;font-weight:700;text-decoration:none}
    .seo-static nav{display:flex;gap:22px}.seo-static nav a,.seo-static footer a{color:#315f58;text-decoration:none}
    .seo-static nav a[aria-current="page"]{font-weight:700}.seo-static main{padding:80px 0}
    .seo-static-eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:13px;font-weight:700;color:#397c71}
    .seo-static h1{max-width:820px;margin:12px 0 22px;font-size:clamp(40px,6vw,72px);line-height:1.03;letter-spacing:-.04em}
    .seo-static-intro{max-width:780px;font-size:20px;line-height:1.65;color:#4f5d59}
    .seo-static-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:28px;margin-top:64px}
    .seo-static-sections section{padding-top:22px;border-top:2px solid #397c71}
    .seo-static h2{font-size:20px}.seo-static section p,.seo-static footer{line-height:1.65;color:#5f6b68}
    .seo-static-actions{display:flex;gap:14px;margin-top:48px}.seo-static-actions a{padding:12px 18px;border-radius:6px;background:#1d6d60;color:#fff;text-decoration:none}
    .seo-static-actions a+ a{background:#edf2f0;color:#264d47}.seo-static footer{padding:28px 0 48px;border-top:1px solid #dce2df}
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

const lastModified = "2026-07-28";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${pageUrl(page)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.id === "home" ? "weekly" : "monthly"}</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);

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
