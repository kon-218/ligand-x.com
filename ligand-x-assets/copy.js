// ============================================================
// copy.js — SINGLE SOURCE OF TRUTH for headlines, ledes, and CTAs
// ============================================================
//
// The React pages and the pre-rendered SEO HTML in scripts/build-site.js both
// read from this file. Before it existed the two had drifted into completely
// different headlines for the same URL — crawlers and humans saw different
// products. Anything a crawler should agree with a human about belongs here.
//
// Loaded as a plain script before the Babel-transpiled pages, and require()d by
// scripts/build-site.js — hence the dual export footer.

(function () {
  const CTA = {
    download: "Download Ligand-X",
    docs: "Read the docs",
    features: "See all capabilities",
    editions: "Compare editions",
    license: "Request a license",
    github: "Star on GitHub",
  };

  const CLAIMS = {
    selfHosted: "Every structure, job, and result stays on hardware you control.",
    freeCore:
      "Preparation, pocket finding, docking, and molecular dynamics are free and always will be.",
    academic: "Academic licenses include every Pro module, free.",
    singleUser:
      "Ligand-X is a single-user workbench. It runs on your machine, bound to localhost by default.",
  };

  const SITE_COPY = {
    home: {
      eyebrow: "Official Ligand-X website",
      h1Parts: ["Ligand-X.", "Integrated.", "Self-hosted.", "Reliable."],
      h1Em: "Ligand-X.",
      h1: "Ligand-X. Integrated. Self-hosted. Reliable.",
      lede:
        "A free desktop app for computational drug discovery. Dock, simulate, and keep your structures and results on your own hardware.",
      seo: {
        title: "Ligand-X | Free molecular docking and MD on your hardware",
        description:
          "Free, self-hosted computational drug discovery: AutoDock Vina docking, OpenMM molecular dynamics, and docking-to-MD workflows in one local project. No account required.",
        introTail:
          "Ligand-X — also written Ligand X or LigandX — is free to download for Windows, macOS, and Linux.",
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
            "Free core, optional Pro modules",
            "Structure preparation, pocket finding, docking, and molecular dynamics are free. Add licensed modules for ADMET, quantum chemistry, affinity prediction, binding free energy, and generative design when the work calls for them.",
          ],
        ],
      },
    },

    features: {
      eyebrow: "Capabilities",
      h1Parts: ["The pipeline you were going to", "build "],
      h1Em: "eventually",
      h1: "The pipeline you were going to build eventually.",
      lede:
        "One project, not another messy folder. Preparation, screening, simulation, and design in one place — and everything it takes to get from a raw PDB to a finished trajectory is free.",
      seo: {
        title: "Features — Ligand-X docking, MD, and discovery modules",
        description:
          "Ligand-X capabilities: free protein preparation, pocket finding, AutoDock Vina docking, OpenMM molecular dynamics, plus optional ADMET, quantum chemistry, free energy, and generative design.",
        sections: [
          [
            "Prepare structures and binding sites",
            "Fetch or import protein structures, inspect chains, ligands, waters, ions, and metals, repair and clean the structure, align series, and detect candidate binding pockets before any calculation runs.",
          ],
          [
            "Screen and simulate",
            "Prepare receptors and ligands for AutoDock Vina, run single or batch docking, inspect ranked poses and interactions, and continue selected complexes into OpenMM molecular dynamics.",
          ],
          [
            "Extend with licensed modules",
            "Pro modules add ADMET screening, ORCA quantum chemistry, Boltz-2 affinity prediction, ABFE and RBFE binding free energy, and REINVENT generative design — all running locally.",
          ],
        ],
      },
    },

    docs: {
      eyebrow: "Documentation",
      h1: "Install Ligand-X and run your first workflow.",
      lede:
        "Install the workbench with the desktop launcher or Docker Compose, configure its services, and follow a guide through your first calculation.",
      seo: {
        title: "Documentation — Install and use Ligand-X",
        description:
          "Ligand-X documentation for system requirements, installation, first launch, configuration, protein preparation, molecular docking, molecular dynamics, and API usage.",
        sections: [
          [
            "Installation and configuration",
            "Check system requirements, install the desktop launcher or container runtime, complete first launch, optionally edit configuration, and start the application on your workstation.",
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
    },

    pro: {
      eyebrow: "Editions & licensing",
      h1: "Which edition of Ligand-X do you need?",
      lede:
        "The workbench is free forever. Academic licenses unlock every Pro module at no cost. Commercial Pro licenses cover the modules in your agreement.",
      seo: {
        title: "Ligand-X editions and Pro licensing",
        description:
          "Compare the free, academic, and commercial Pro editions of Ligand-X, see which modules each unlocks, and find out how to request a license.",
        sections: [
          [
            "Free — the core workbench",
            "Structure preparation, pocket finding, molecular docking, molecular dynamics, the molecule library, and alignment tools are free with no license file and no account.",
          ],
          [
            "Academic — every module, no cost",
            "A signed academic license entitles you to all Pro modules: ADMET, quantum chemistry, Boltz-2, binding free energy, and generative design.",
          ],
          [
            "Commercial Pro — licensed per module",
            "A commercial license unlocks the modules listed in your agreement. Private container images integrate with an existing installation so sensitive structures, ligands, and results stay on infrastructure you control.",
          ],
        ],
      },
    },

    download: {
      eyebrow: "Download",
      h1: "Get Ligand-X with the desktop launcher.",
      lede:
        "The desktop launcher installs and manages the local containerized services for you. Open Ligand-X at localhost:8080 by default. Advanced users can run the same stack directly with Docker Compose.",
      seo: {
        title: "Download Ligand-X for Windows, macOS, and Linux",
        description:
          "Download the free Ligand-X launcher for Windows, macOS, or Linux. Install Docker, complete first launch, then open the app at localhost:8080.",
        sections: [
          [
            "Desktop launcher",
            "Choose the release for your operating system, install Docker, complete account and module setup, then Start services and Open Ligand-X.",
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
    },

    contact: {
      eyebrow: "Contact",
      h1: "Request a Ligand-X Pro license.",
      lede:
        "Tell us about your organization and which modules you need. Academic licenses are free; commercial licenses are scoped to your agreement.",
      seo: {
        title: "Contact and request a Ligand-X Pro license",
        description:
          "Contact the Ligand-X team to request an academic or commercial Pro license for local advanced computational chemistry and molecular-design modules.",
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
    },

    // The /legal/ hub. The documents themselves live in legal.js — this block
    // exists because build-site.js pageFromCopy() throws for any non-landing
    // route without an seo block.
    legal: {
      eyebrow: "Legal",
      h1: "Terms, privacy, and licensing.",
      lede:
        "These are the documents that govern this website, your personal data, and your right to run Ligand-X.",
      seo: {
        title: "Legal — privacy, terms, and licensing — Ligand-X",
        description:
          "Legal documents for Ligand-X Inc.: privacy policy, terms of use, and how the free core platform and proprietary Pro modules are licensed.",
        sections: [
          [
            "Privacy policy",
            "How Ligand-X Inc. handles personal data: no analytics, no tracking cookies, and no telemetry in the desktop application. Contact-form data only, with GDPR and California rights.",
          ],
          [
            "Terms of use",
            "The terms covering this website and the Ligand-X software, including the scientific-use disclaimer, warranty disclaimer, limitation of liability, and governing law.",
          ],
          [
            "Software licence",
            "The core platform and launcher are licensed under PolyForm Noncommercial 1.0.0; Pro modules are proprietary and licensed by Ligand-X Inc. Academic licences include every Pro module free.",
          ],
        ],
      },
    },

    landings: {
      "molecular-docking": {
        path: "/molecular-docking/",
        eyebrow: "Molecular docking",
        h1: "Molecular docking with AutoDock Vina, free on your hardware.",
        lede:
          "Prepare receptors, find pockets, dock single ligands or libraries, and inspect ranked poses in one self-hosted workbench — no account, no cloud upload.",
        seo: {
          title: "Molecular docking with AutoDock Vina — free, self-hosted — Ligand-X",
          description:
            "Free molecular docking software with AutoDock Vina: protein prep, pocket finding, batch docking, pose review, and Send to MD — self-hosted on Windows, macOS, or Linux.",
        },
        sections: [
          [
            "From raw PDB to ranked poses",
            "Clean the receptor, detect or draw a search box, prepare ligands with Meeko, and run AutoDock Vina with live job progress.",
          ],
          [
            "Batch screening in one project",
            "Dock a library against a target, compare affinities and interactions in Mol*, and keep every pose attached to the experiment that produced it.",
          ],
          [
            "Continue into dynamics",
            "Send a docked complex straight into OpenMM molecular dynamics — the same free workbench, not a second tool chain.",
          ],
        ],
        faqs: [
          {
            q: "Is molecular docking free forever?",
            a: "Yes. Preparation, pocket finding, docking, and molecular dynamics are free and always will be.",
          },
          {
            q: "Do I need an account or internet for docking?",
            a: "No account is required. Ligand-X runs locally; after images are pulled you can work offline on your own hardware.",
          },
          {
            q: "Which docking engine does Ligand-X use?",
            a: "AutoDock Vina with Meeko ligand preparation, plus optional Vinardo scoring.",
          },
        ],
        primaryCta: { label: "Download Ligand-X", href: "/download/", nav: "download" },
        secondaryCta: { label: "Docking guide", href: "/docs/guides/docking/", nav: "docs" },
      },

      "molecular-dynamics": {
        path: "/molecular-dynamics/",
        eyebrow: "Molecular dynamics",
        h1: "Molecular dynamics with OpenMM, free on your machine.",
        lede:
          "Solvate protein–ligand complexes, run minimization and production MD on your CPU or GPU, and review trajectories in the browser — self-hosted, no managed cloud.",
        seo: {
          title: "Molecular dynamics with OpenMM — free, self-hosted — Ligand-X",
          description:
            "Free molecular dynamics software built on OpenMM and OpenFF: prepare complexes, run GPU MD with live progress, and inspect trajectories — including docked poses sent from Vina.",
        },
        sections: [
          [
            "Protein–ligand systems without shell scripts",
            "Choose force field and water model, set temperature and length, and let Ligand-X build, minimize, equilibrate, and run production.",
          ],
          [
            "Live jobs and durable runs",
            "Watch energy and progress over WebSocket. Checkpoints let long simulations resume if the machine sleeps or the page refreshes.",
          ],
          [
            "Start from a docked pose",
            "Use Send to MD from docking results, or start from a cleaned receptor — prep and docking are part of the same free core.",
          ],
        ],
        faqs: [
          {
            q: "Is molecular dynamics free?",
            a: "Yes. OpenMM molecular dynamics is part of the free Ligand-X core, along with preparation, pocket finding, and docking.",
          },
          {
            q: "Do I need a GPU?",
            a: "GPU is optional but strongly recommended for longer production runs. Short systems can run on CPU.",
          },
          {
            q: "Can I run MD offline?",
            a: "Yes. Ligand-X is self-hosted and bound to localhost by default. Structures and trajectories stay on hardware you control.",
          },
        ],
        primaryCta: { label: "Download Ligand-X", href: "/download/", nav: "download" },
        secondaryCta: {
          label: "MD guide",
          href: "/docs/guides/molecular-dynamics/",
          nav: "docs",
        },
      },

      "docking-to-md": {
        path: "/docking-to-md/",
        eyebrow: "Docking → MD",
        h1: "From docked pose to molecular dynamics in one project.",
        lede:
          "Most free tools stop at docking or start at MD. Ligand-X connects protein prep, AutoDock Vina, and OpenMM so you can screen, pick a pose, and press Send to MD — or wire the path on a canvas and run it.",
        seo: {
          title: "Docking to MD pipeline — free automated workflow — Ligand-X",
          description:
            "Automated docking-to-MD pipeline: prepare a target, dock with AutoDock Vina, send poses to OpenMM molecular dynamics, or run a canvas workflow — free and self-hosted.",
        },
        sections: [
          [
            "One workbench, not a glue script",
            "Conversions, job history, and results stay on the project. No hand-copying PDBQT, SDF, and trajectory folders between programs.",
          ],
          [
            "Send to MD or canvas workflows",
            "Hand off a pose from docking results, or define protein → docking → MD nodes and run the graph as a single job with upstream outputs injected automatically.",
          ],
          [
            "Free where the loop matters",
            "Preparation, pocket finding, docking, and molecular dynamics are free forever. Optional Pro modules extend the same project when you need free energy or generative design.",
          ],
        ],
        faqs: [
          {
            q: "Is the docking → MD path free?",
            a: "Yes. The structure-based loop from preparation through docking into MD is free with no license file and no account.",
          },
          {
            q: "How is this different from a docking-only GUI?",
            a: "Docking-only tools leave you to rebuild MD elsewhere. Ligand-X keeps the complex, parameters, and trajectory in the same local project.",
          },
          {
            q: "Can I automate multi-step runs?",
            a: "Yes. Canvas workflows run directed graphs of modules (including docking and MD) as one job with topological ordering and automatic input injection.",
          },
        ],
        primaryCta: { label: "Download Ligand-X", href: "/download/", nav: "download" },
        secondaryCta: { label: "See capabilities", href: "/features/", nav: "features" },
      },
    },
  };

  const COPY_EXPORTS = { CTA, CLAIMS, SITE_COPY };

  if (typeof module !== "undefined" && module.exports) module.exports = COPY_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, COPY_EXPORTS);
})();
