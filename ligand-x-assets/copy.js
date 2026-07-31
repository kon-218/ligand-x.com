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

// One verb per action, everywhere on the site. Previously there were four names
// for the download action alone.
//
// Wrapped in an IIFE: a top-level `const` in a classic script claims a name in
// the global lexical scope, which collides with same-named page constants. These
// files publish through window / module.exports only.

(function () {
  const CTA = {
    download: "Download Ligand-X",
    docs: "Read the docs",
    features: "See all capabilities",
    editions: "Compare editions",
    license: "Request a license",
    github: "Star on GitHub",
  };

  // Canonical phrasings for claims that recur. Use the constant; do not re-word.
  // Each page states the self-hosted claim AT MOST ONCE — it previously appeared
  // eight times in near-identical wording across three pages.
  const CLAIMS = {
    selfHosted: "Every structure, job, and result stays on hardware you control.",
    freeCore:
      "Preparation, pocket finding, docking, and molecular dynamics are free and always will be.",
    academic: "Academic licenses unlock every Pro module at no cost.",
    singleUser:
      "Ligand-X is a single-user workbench. It runs on your machine, bound to localhost by default.",
  };

  const SITE_COPY = {
    home: {
      eyebrow: "Official Ligand-X website",
      // h1Parts renders as separate lines; `em` is set in Instrument Serif.
      h1Parts: ["The whole discovery pipeline,", "on hardware "],
      h1Em: "you own",
      h1: "The whole discovery pipeline, on hardware you own.",
      lede:
        "A free desktop workbench for computational drug discovery. Prepare targets, dock libraries, run simulations, and keep every structure and result together in one local project.",
      seo: {
        title: "Ligand-X | Official computational drug discovery platform",
        description:
          "Official Ligand-X website. Download the free, self-hosted computational drug discovery platform for molecular docking, molecular dynamics, and protein-ligand analysis.",
        // Keyword-bearing tail appended to the shared lede for the crawler copy.
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
      // Wry and peer-voiced: everyone in this audience has a half-finished
      // version of this in a repo somewhere. The emphasis lands on "eventually".
      h1Parts: ["The pipeline you were going to", "build "],
      h1Em: "eventually",
      h1: "The pipeline you were going to build eventually.",
      lede:
        "One project, not another messy folder. Preparation, screening, simulation, and design in one place — and everything it takes to get from a raw PDB to a finished trajectory is free.",
      seo: {
        title: "Features — Ligand-X computational drug discovery software",
        description:
          "Complete Ligand-X capability reference: protein preparation, pocket finding, molecular docking, molecular dynamics, ADMET, quantum chemistry, binding free energy, and generative design.",
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
          "Ligand-X documentation for installation, configuration, protein preparation, molecular docking, molecular dynamics, API usage, and advanced workflows.",
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
            "Free — the open-core workbench",
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
      h1: "Download Ligand-X for your machine.",
      lede:
        "The desktop launcher installs and manages the local containerized services for you. Advanced users can run the same stack directly with Docker Compose.",
      seo: {
        title: "Download Ligand-X for Windows, macOS, and Linux",
        description:
          "Download the free Ligand-X launcher for Windows, macOS, or Linux and install a self-hosted computational drug discovery workbench.",
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
  };

  const COPY_EXPORTS = { CTA, CLAIMS, SITE_COPY };

  if (typeof module !== "undefined" && module.exports) module.exports = COPY_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, COPY_EXPORTS);
})();
