// ============================================================
// modules.js — SINGLE SOURCE OF TRUTH for Ligand-X capabilities
// ============================================================
//
// Mirrors ligand-x/lib/licensing/module_registry.py. That file is the product's
// canonical registry; this is its marketing-facing projection. When a module is
// added, renamed, or changes edition/maturity there, update it here too.
//
// Rules this file exists to enforce:
//   1. ONE canonical `name` per module. No page invents its own label.
//   2. `edition` and `maturity` come from the registry, never from a page.
//   3. Every capability claim lives here, so it can only be written once.
//
// Loaded as a plain script before the Babel-transpiled pages, and require()d by
// scripts/build-site.js — hence the dual export footer.

// Workflow-ordered taxonomy. Doubles as the /features/ filter row.
//
// Wrapped in an IIFE: a top-level `const` in a classic script claims a name in
// the global lexical scope, which collides with same-named page constants. These
// files publish through window / module.exports only.

(function () {
  const MODULE_CATEGORIES = [
    { id: "all", label: "All capabilities" },
    { id: "prepare", label: "Prepare" },
    { id: "screen", label: "Screen" },
    { id: "simulate", label: "Simulate" },
    { id: "design", label: "Design" },
  ];

  const EDITION_FILTERS = [
    { id: "any", label: "Any edition" },
    { id: "free", label: "Free" },
    { id: "pro", label: "Pro" },
  ];

  // Ordered as the discovery loop runs, so the reference reads as a pipeline.
  const MODULES = [
    // ---------------------------------------------------------- prepare
    {
      id: "structure",
      registryId: "core",
      name: "Structure Preparation",
      short: "Structure prep",
      icon: "funnel",
      edition: "free",
      maturity: "stable",
      category: "prepare",
      summary:
        "Fetch or import a protein and clean it up for modeling — chains, waters, ions, and missing atoms resolved before anything downstream runs.",
      details: [
        "Fetch by PDB ID or import PDB / mmCIF",
        "Identify chains, ligands, waters, ions, and metals",
        "Repair missing atoms and incomplete residues",
        "Optional water and ion removal",
        "Export simulation-ready structures into the project",
      ],
      tools: ["PDBFixer", "BioPython", "RDKit", "OpenBabel"],
      io: "PDB / mmCIF → cleaned, simulation-ready PDB",
      apiPrefixes: ["/api/structure", "/api/projects"],
      guide: "protein-cleaning",
    },
    {
      id: "pocket-finder",
      registryId: "pocket_finder",
      name: "Pocket Finding",
      short: "Pockets",
      icon: "search",
      edition: "free",
      maturity: "stable",
      category: "prepare",
      summary:
        "Detect candidate binding sites on an imported structure and reuse them as search regions for docking.",
      details: [
        "Pocket prediction across four independent detectors",
        "Ranked binding-site summaries with residue context",
        "Pocket coordinates saved to the project and reusable",
        "Feeds the docking box directly — no manual coordinates",
      ],
      tools: ["fpocket", "P2Rank", "DeepPocket", "Pocketeer"],
      io: "Cleaned PDB → ranked pocket candidates",
      apiPrefixes: ["/api/pocket-finder"],
      guide: null,
    },
    {
      id: "editor",
      registryId: "core",
      name: "Molecule Editor & Library",
      short: "Editor",
      icon: "atom",
      edition: "free",
      maturity: "stable",
      category: "prepare",
      summary:
        "Draw, import, and organize ligands in a project library that every other module reads from.",
      details: [
        "Ketcher 2D drawing and editing, backed by a real Indigo service",
        "SMILES, SDF, and PDB import and export",
        "Batch compound import with folders and depictions",
        "Persistent project library shared across all modules",
        "Chemical-space map of the library via Morgan fingerprints + UMAP",
      ],
      tools: ["Ketcher", "Indigo", "RDKit", "PostgreSQL"],
      io: "SMILES / SDF / PDB → project molecule library",
      apiPrefixes: ["/api/ketcher", "/api/molecules", "/api/library"],
      guide: null,
    },
    {
      id: "alignment",
      registryId: "core",
      name: "Structure & Pose Alignment",
      short: "Alignment",
      icon: "network",
      edition: "free",
      maturity: "stable",
      category: "prepare",
      summary:
        "Align structures and ligand series so poses, targets, and free-energy inputs are directly comparable.",
      details: [
        "Pairwise protein structure and sequence alignment",
        "Multi-pose alignment for ligand series",
        "Geometry and RMSD outputs",
        "Prepared inputs for docking and free-energy workflows",
      ],
      tools: ["RDKit", "Kartograf", "OpenFE helpers"],
      io: "Structures / SDF series → aligned coordinates + RMSD",
      apiPrefixes: ["/api/alignment"],
      guide: null,
    },
    {
      id: "msa",
      registryId: "core",
      name: "Multiple Sequence Alignment",
      short: "MSA",
      icon: "book",
      edition: "free",
      maturity: "stable",
      category: "prepare",
      summary:
        "Build MMseqs2 alignments for protein-family context, with results cached by sequence hash.",
      details: [
        "MMseqs2 multiple sequence alignment",
        "Results cached and reused across projects",
        "Downloadable alignments and metadata",
        "Context for target comparison and reporting",
      ],
      tools: ["MMseqs2"],
      io: "FASTA / sequence → cached alignment + metadata",
      apiPrefixes: ["/api/msa"],
      guide: null,
    },

    // ---------------------------------------------------------- screen
    {
      id: "docking",
      registryId: "docking",
      name: "Molecular Docking",
      short: "Docking",
      icon: "target",
      edition: "free",
      maturity: "stable",
      category: "screen",
      summary:
        "Dock single ligands or whole libraries with AutoDock Vina, then review ranked poses and interactions in the viewer.",
      details: [
        "Automatic receptor and ligand PDBQT preparation",
        "Grid box from a detected pocket or the whole protein",
        "Single, batch, and streaming async docking",
        "Ranked poses with affinity scores and interaction summaries",
        "Redocking validation against a known crystal pose",
      ],
      tools: ["AutoDock Vina", "Meeko", "RDKit", "OpenBabel", "Mol*"],
      io: "Receptor + ligand library → ranked poses + interactions",
      apiPrefixes: ["/api/docking"],
      guide: "docking",
    },
    {
      id: "admet",
      registryId: "admet",
      name: "ADMET Prediction",
      short: "ADMET",
      icon: "flask",
      edition: "pro",
      maturity: "stable",
      category: "screen",
      summary:
        "Screen a library for drug-likeness and ADMET liabilities before committing synthesis effort.",
      details: [
        "Batch SMILES screening across a project library",
        "Drug-likeness and property risk summaries",
        "Predictions cached at project level",
        "Runs locally from a private Pro container image",
      ],
      tools: ["PyTorch", "RDKit"],
      io: "SMILES / SDF → ADMET property table",
      apiPrefixes: ["/api/admet"],
      guide: null,
    },
    {
      id: "boltz2",
      registryId: "boltz2",
      name: "Boltz-2 Affinity Prediction",
      short: "Boltz-2",
      icon: "atom",
      edition: "pro",
      maturity: "stable",
      category: "screen",
      summary:
        "Predict complex structure and binding affinity with Boltz-2 on your own GPU.",
      details: [
        "Protein–ligand structure and affinity prediction",
        "Single and batch submission",
        "GPU-backed execution on your hardware",
        "Results and reports attached to the project record",
      ],
      tools: ["Boltz-2", "CUDA"],
      io: "Target + ligand → predicted complex + affinity",
      apiPrefixes: ["/api/boltz2"],
      guide: null,
    },

    // ---------------------------------------------------------- simulate
    {
      id: "md",
      registryId: "md",
      name: "Molecular Dynamics",
      short: "MD",
      icon: "wave",
      edition: "free",
      maturity: "stable",
      category: "simulate",
      summary:
        "Run OpenMM simulations on a docked complex without leaving the app or writing setup scripts.",
      details: [
        "Automatic protein–ligand system construction",
        "OpenMM / OpenFF force-field setup and parameterization",
        "Minimization, NVT, and NPT stages",
        "GPU acceleration when CUDA is available",
        "In-browser trajectory frames, PCA, and interaction analysis",
        "Pause and resume long-running simulations",
      ],
      tools: ["OpenMM", "OpenFF", "AmberTools", "MDAnalysis"],
      io: "Complex → trajectory (DCD) + analysis metrics",
      apiPrefixes: ["/api/md"],
      guide: "molecular-dynamics",
    },
    {
      id: "free-energy",
      registryId: "free-energy",
      name: "Binding Free Energy",
      short: "Free energy",
      icon: "scale",
      edition: "pro",
      maturity: "stable",
      category: "simulate",
      summary:
        "Alchemical ABFE and RBFE campaigns for absolute affinities and lead-optimization series.",
      details: [
        "Absolute binding free energy with Boresch restraints",
        "Relative binding free energy networks over a ligand series",
        "Mapping previews and MBAR overlap analysis",
        "Runs on the dedicated long-GPU worker queue",
      ],
      tools: ["OpenFE", "OpenMM", "LOMAP", "MBAR"],
      io: "Target + ligand series → ΔG / ΔΔG with overlap diagnostics",
      apiPrefixes: ["/api/abfe", "/api/rbfe"],
      guide: "abfe",
    },
    {
      id: "qc",
      registryId: "qc",
      name: "Quantum Chemistry",
      short: "QC",
      icon: "sigma",
      edition: "pro",
      maturity: "stable",
      category: "simulate",
      summary:
        "ORCA-backed calculations for geometries, energetics, charges, and spectroscopic properties.",
      details: [
        "Geometry optimization and single-point energies",
        "Frequencies and IR spectra",
        "Atomic charges, Fukui indices, and bond dissociation energies",
        "Micro and macro pKa, torsion scans, orbital visualization",
        "Runs on a dedicated QC worker queue",
      ],
      tools: ["ORCA", "RDKit"],
      io: "SDF / XYZ → energies, charges, spectra, properties",
      apiPrefixes: ["/api/qc"],
      guide: "quantum-chemistry",
    },
    {
      id: "qmmm",
      registryId: "qmmm",
      name: "QM/MM",
      short: "QM/MM",
      icon: "sigma",
      edition: "pro",
      maturity: "preview",
      category: "simulate",
      summary:
        "Hybrid quantum/classical calculations on a protein-embedded active site.",
      details: [
        "ASH-driven QM/MM setup over a prepared complex",
        "Configurable QM region selection",
        "Shares the Quantum Chemistry entitlement",
      ],
      tools: ["ASH", "ORCA", "OpenMM"],
      io: "Complex + QM region → QM/MM energies and geometries",
      apiPrefixes: ["/api/qmmm"],
      guide: null,
    },
    {
      id: "kinetics",
      registryId: "kinetics",
      name: "Unbinding Kinetics",
      short: "Kinetics",
      icon: "wave",
      edition: "pro",
      maturity: "preview",
      category: "simulate",
      summary:
        "Residence-time and unbinding-pathway estimation with weighted-ensemble and steered methods.",
      details: [
        "WESTPA weighted-ensemble unbinding",
        "RAMD random-acceleration MD",
        "Runs on a dedicated kinetics worker queue",
      ],
      tools: ["WESTPA", "RAMD", "OpenMM"],
      io: "Complex → unbinding pathways and residence-time estimates",
      apiPrefixes: ["/api/kinetics"],
      guide: null,
    },

    // ---------------------------------------------------------- design
    {
      id: "reinvent",
      registryId: "reinvent",
      name: "De Novo Design",
      short: "De novo",
      icon: "sigma",
      edition: "pro",
      maturity: "stable",
      category: "design",
      summary:
        "Generate and optimize new molecules against your objectives with REINVENT, then feed them straight back into docking.",
      details: [
        "Guided configuration for REINVENT campaigns",
        "Worker-backed generation over multi-objective scoring",
        "Generated molecules land in the project library",
        "Dedicated campaign viewer for run inspection",
      ],
      tools: ["REINVENT", "RDKit"],
      io: "Objective config → generated, scored molecules",
      apiPrefixes: ["/api/reinvent"],
      guide: null,
    },
  ];

  // Named pipelines — shows how modules compose, which single cards cannot.
  const WORKFLOW_PRESETS = [
    {
      id: "preset-docking",
      name: "Structure-based screen",
      desc: "Clean a target, find its pocket, dock a library, then triage the hits on ADMET risk.",
      modules: ["structure", "pocket-finder", "docking", "admet"],
    },
    {
      id: "preset-triage",
      name: "Ligand triage",
      desc: "Bring in a series, screen it for liabilities, and check the questionable ones with QC.",
      modules: ["editor", "admet", "qc"],
    },
    {
      id: "preset-fep",
      name: "Lead-optimization campaign",
      desc: "Align a congeneric series, equilibrate with MD, then run an RBFE network over it.",
      modules: ["alignment", "md", "free-energy"],
    },
    {
      id: "preset-gen",
      name: "Generative loop",
      desc: "Generate candidates, dock them, predict affinity, and re-score — then generate again.",
      modules: ["reinvent", "docking", "boltz2", "admet"],
    },
  ];

  // ---------------------------------------------------------------- helpers

  const moduleById = (id) => MODULES.find((m) => m.id === id);
  const freeModules = () => MODULES.filter((m) => m.edition === "free");
  const proModules = () => MODULES.filter((m) => m.edition === "pro");
  const shippingModules = () => MODULES.filter((m) => m.maturity === "stable");

  const matchesModuleFilter = (module, category, edition) => {
    if (category !== "all" && module.category !== category) return false;
    if (edition !== "any" && module.edition !== edition) return false;
    return true;
  };

  const MODULE_EXPORTS = {
    MODULES,
    MODULE_CATEGORIES,
    EDITION_FILTERS,
    WORKFLOW_PRESETS,
    moduleById,
    freeModules,
    proModules,
    shippingModules,
    matchesModuleFilter,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = MODULE_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, MODULE_EXPORTS);
})();
