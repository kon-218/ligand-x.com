// ============================================================
// guides.js — scientific walkthrough data (shared by docs + build)
// ============================================================
//
// Loaded as a plain script before docs.jsx, and require()d by scripts/build-site.js.

(function () {
  const GUIDES = [
  {
    id: "protein-cleaning",
    title: "Protein cleaning",
    path: "/docs/guides/protein-cleaning/",
    eyebrow: "Guide · Target preparation",
    time: "5 min",
    desc: "Import a raw PDB structure, remove unwanted components, add hydrogens, and produce a modeling-ready receptor.",
    isPro: false,
    prereqs: [
      "A raw PDB file or PDB accession code (e.g. 4W52)",
      "A project already created in Ligand-X",
    ],
    steps: [
      {
        title: "Open or create a project",
        body: "From the Ligand-X dashboard, click New project and give it a name. Your proteins, molecules, pockets, and job results will all live inside this project.",
      },
      {
        title: "Import your protein",
        body: "In the project sidebar, click Proteins → Import. Paste a PDB accession code to fetch directly from the RCSB, or upload a local .pdb or .cif file. Ligand-X parses the structure and lists all detected components (chains, waters, ions, metals, co-crystallised ligands).",
      },
      {
        title: "Review detected components",
        body: "The component panel shows every non-protein entity. Check which waters, ions, and co-ligands you want to keep or remove. Hover any component to highlight it in the Mol* viewer.",
      },
      {
        title: "Configure cleaning options",
        body: "Click Clean protein to open the job form. Toggle the options you need: Remove waters, Remove ions, Add missing hydrogens, Fix missing residues (PDBFixer), Remove original ligands. You can keep co-crystallised metals when they are part of the active site.",
      },
      {
        title: "Submit the job",
        body: "Click Run cleaning. The job is dispatched to the FastAPI gateway and processed by the protein-prep worker. A progress banner appears in the top bar; the job is also listed under Jobs in the sidebar.",
      },
      {
        title: "Review and use the output",
        body: "When the job completes, the cleaned structure appears in the Mol* viewer. Check the summary panel for a diff of removed/added atoms. Click Download to save cleaned.pdb, or click Find pockets to proceed directly to pocket detection.",
      },
    ],
    outputs: [
      "cleaned.pdb — hydrogens added, unwanted components stripped",
      "Job record with input/output metadata in the project",
    ],
    tips: [
      "If residues are missing from a loop, enable Fix missing residues before docking — gaps cause steric clashes.",
      "Keep crystallographic waters in the binding site if they mediate key contacts; disable Remove waters selectively per-residue.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
  {
    id: "docking",
    title: "Molecular docking",
    path: "/docs/guides/docking/",
    eyebrow: "Guide · Screening",
    time: "10 min",
    desc: "Prepare a receptor and one or more ligands, define the binding site search box, run AutoDock Vina, and review ranked poses.",
    isPro: false,
    prereqs: [
      "A cleaned protein in your project (see the Protein cleaning guide)",
      "At least one ligand — SMILES string, SDF file, or drawn in Ketcher",
    ],
    steps: [
      {
        title: "Add a ligand to the molecule library",
        body: "Go to Molecules → Import. Paste a SMILES string (e.g. CC1=CC=CC=C1) or upload an SDF file. For a new structure, click Edit in Ketcher to draw the molecule from scratch. Ligand-X generates a 3D conformer automatically using RDKit.",
      },
      {
        title: "Run pocket finding (or define a custom box)",
        body: "From your cleaned protein, click Find pockets. The pocket finder (fpocket) ranks candidate binding sites by druggability score and marks each with a transparent surface in the viewer. Select the pocket you want to target, or click Manual box to drag a custom search volume directly in the viewer.",
      },
      {
        title: "Open the docking job form",
        body: "With a pocket selected, click Dock. The form pre-fills the receptor path, search box coordinates, and box size from the pocket. Verify they look correct in the preview panel.",
      },
      {
        title: "Select ligands and configure Vina",
        body: "Choose one or more ligands from your molecule library for this run. Under Vina parameters, set exhaustiveness (default 8), max poses (default 9), and energy range. Higher exhaustiveness is slower but finds more diverse poses.",
      },
      {
        title: "Submit the docking job",
        body: "Click Run docking. Each ligand is prepared with Meeko (adds charges, sets rotatable bonds) and docked independently. Job progress streams to the jobs panel.",
      },
      {
        title: "Review poses and interactions",
        body: "When complete, click Results. Poses are ranked by Vina affinity score (kcal/mol). Click any pose to load it in the Mol* viewer. The interactions panel lists predicted hydrogen bonds, hydrophobics, and pi contacts. Use the pose switcher to compare conformations.",
      },
      {
        title: "Export and continue",
        body: "Download a pose as .sdf for external analysis, or click Send to MD to use this docked complex as the starting structure for a molecular dynamics simulation.",
      },
    ],
    outputs: [
      "Ranked pose list with Vina affinity scores",
      "SDF files for each pose",
      "Interaction summary (H-bonds, hydrophobics, pi contacts)",
    ],
    tips: [
      "If scores are all worse than −5 kcal/mol, the search box may be misplaced — try increasing box size or running pocket finding again.",
      "For fragment screening, set exhaustiveness to 4 to increase throughput; for lead optimisation, use 16+.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
  {
    id: "molecular-dynamics",
    title: "Molecular dynamics",
    path: "/docs/guides/molecular-dynamics/",
    eyebrow: "Guide · Simulation",
    time: "15 min setup",
    desc: "Solvate a protein-ligand complex, run energy minimization and equilibration, then produce an MD trajectory with live progress tracking.",
    isPro: false,
    prereqs: [
      "A docked complex or a cleaned protein in your project",
      "At least 16 GB RAM (32 GB recommended); GPU optional but strongly recommended for long runs",
    ],
    steps: [
      {
        title: "Select the system to simulate",
        body: "From your project, open the docked complex you want to simulate (or just the cleaned receptor for apo-protein MD). Click Start MD to open the simulation form.",
      },
      {
        title: "Choose a force field and water model",
        body: "Select a force field for the protein (AMBER ff14SB is the default). For the ligand, GAFF2 parameters are generated automatically via OpenFF. Choose a water model (TIP3P default) and set the solvent box padding (1.2 nm recommended).",
      },
      {
        title: "Set simulation parameters",
        body: "Configure: total simulation time (ns), timestep (2 fs default), temperature (310 K default), pressure coupling (NPT for production). For a first run, 10–50 ns is a reasonable target; you can extend or restart from a checkpoint later.",
      },
      {
        title: "Submit and monitor",
        body: "Click Run MD. The system is built (solvation, ionisation, force field assignment), then minimised, equilibrated in NVT then NPT, and finally run in production. A live chart shows energy, RMSD, and temperature as they update via WebSocket. Each phase checkpoint is saved so you can resume if the job is interrupted.",
      },
      {
        title: "Review the trajectory",
        body: "When production is complete, click View trajectory. The trajectory player streams frames into the Mol* viewer. Use the timeline scrubber to jump to any frame. The analytics panel shows RMSD, RMSF, radius of gyration, and ligand contact plots.",
      },
      {
        title: "Download outputs",
        body: "Download the trajectory (.dcd), final frame (.pdb), and energy CSV. These can be used directly with MDAnalysis, VMD, or as input for ABFE/RBFE calculations.",
      },
    ],
    outputs: [
      "trajectory.dcd — full production trajectory",
      "final_frame.pdb — last snapshot",
      "energy.csv — potential/kinetic/total energy over time",
      "RMSD and RMSF plots",
    ],
    tips: [
      "Check the RMSD plot for the first 5–10 ns — if the protein is still drifting, allow longer equilibration before interpreting results.",
      "Use the checkpoint resume feature if a long simulation is interrupted; you do not need to restart from the beginning.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
  {
    id: "abfe",
    title: "Absolute binding free energy",
    path: "/docs/guides/abfe/",
    eyebrow: "Guide · Pro · Free energy",
    time: "30 min setup",
    desc: "Calculate the absolute binding free energy ΔG for a single ligand using alchemical decoupling with Boresch restraints.",
    isPro: true,
    prereqs: [
      "A docked ligand pose in your project",
      "Access to the private Pro module image",
      "GPU strongly recommended (each lambda window is an independent MD run)",
    ],
    steps: [
      {
        title: "Select the ligand and complex",
        body: "From your project, select the docked pose you want to calculate ΔG for. Click Calculate ABFE to open the job form. The receptor and ligand structures are pre-filled from your project.",
      },
      {
        title: "Review the binding pose",
        body: "The form shows the ligand in the binding site. Inspect the pose in the Mol* viewer. If the pose looks unreasonable, go back and select a better-ranked docking pose first.",
      },
      {
        title: "Configure the ABFE protocol",
        body: "Set the number of lambda windows (12 for a fast estimate, 20 for production), equilibration time per window, and production time per window. Boresch restraints are applied automatically to the ligand to maintain its orientation during decoupling. The default protocol is a good starting point.",
      },
      {
        title: "Submit the calculation",
        body: "Click Run ABFE. Ligand-X dispatches one Celery worker per lambda window. The jobs panel shows all windows with individual progress bars. Total wall-clock time depends on GPU availability and the number of windows.",
      },
      {
        title: "Monitor convergence",
        body: "As windows complete, the free-energy estimate and its uncertainty update in real time. Watch for the ΔG error bar to shrink below 0.5 kcal/mol — if it stays high, extend the production time per window.",
      },
      {
        title: "Review the result",
        body: "The results page reports ΔG (kcal/mol) with uncertainty, computed via MBAR across all lambda windows. A per-window overlap matrix plot helps diagnose insufficient sampling. The corresponding Kd estimate is shown alongside.",
      },
    ],
    outputs: [
      "ΔG (kcal/mol) with MBAR uncertainty estimate",
      "Corresponding Kd estimate",
      "Per-window overlap matrix",
      "Per-window trajectory files",
    ],
    tips: [
      "Run a short test with 8 windows and 1 ns/window to verify the setup is correct before committing to a full production run.",
      "If the overlap matrix shows poor overlap between adjacent windows, increase the number of lambda windows.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
  {
    id: "rbfe",
    title: "Relative binding free energy",
    path: "/docs/guides/rbfe/",
    eyebrow: "Guide · Pro · Free energy",
    time: "30 min setup",
    desc: "Calculate relative ΔΔG values across a series of congeneric ligands using a perturbation network generated by LOMAP.",
    isPro: true,
    prereqs: [
      "Two or more docked ligands sharing a common scaffold",
      "Access to the private Pro module image",
      "GPU strongly recommended",
    ],
    steps: [
      {
        title: "Select your ligand series",
        body: "From the molecule library, select two or more ligands with a common scaffold. Click Calculate RBFE. Ligand-X builds a perturbation network automatically using LOMAP, which scores pairs by structural similarity and plans the most efficient set of edges.",
      },
      {
        title: "Review the perturbation network",
        body: "The network viewer shows ligands as nodes and planned perturbations as edges, colour-coded by LOMAP score. High-score edges (green) will give reliable ΔΔG estimates. You can add or remove edges manually before submitting.",
      },
      {
        title: "Configure the RBFE protocol",
        body: "Set lambda windows per edge, equilibration time, and production time. The soft-core potentials used for non-bonded interactions are pre-configured with proven defaults. For each edge, Ligand-X runs both a complex leg (protein-bound) and a solvent leg (free ligand) to compute ΔΔG.",
      },
      {
        title: "Submit the calculation",
        body: "Click Run RBFE. Each edge dispatches multiple independent lambda-window jobs. The total number of workers scales with the number of edges and windows. Monitor progress in the jobs panel.",
      },
      {
        title: "Review results and cycle closure",
        body: "When all edges complete, the results page shows ΔΔG for every pair, plus cycle-closure error for any closed loops in the network. Low cycle-closure error (< 1 kcal/mol) indicates good convergence. Ligand-X ranks ligands by predicted relative binding affinity.",
      },
    ],
    outputs: [
      "ΔΔG (kcal/mol) per perturbation edge",
      "Relative ligand ranking",
      "Cycle-closure error for closed network loops",
      "Per-edge trajectory files",
    ],
    tips: [
      "Include at least one closed cycle in the network to get cycle-closure error as a convergence check.",
      "If a LOMAP score is below 0.3, consider excluding that edge — poor-overlap perturbations have high variance.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
  {
    id: "quantum-chemistry",
    title: "Quantum chemistry",
    path: "/docs/guides/quantum-chemistry/",
    eyebrow: "Guide · Pro · QC",
    time: "5–30 min",
    desc: "Run semiempirical or DFT calculations on a ligand to obtain optimised geometry, partial charges, Fukui indices, or vibrational frequencies.",
    isPro: true,
    prereqs: [
      "A ligand in your molecule library (SMILES or 3D SDF)",
      "Access to the private Pro module image",
      "ORCA installed at the path configured in .env.production (for DFT calculations)",
    ],
    steps: [
      {
        title: "Select a molecule",
        body: "From the molecule library, click a ligand and then click Calculate QC. The molecule's current 3D conformer is used as the starting geometry. If only a SMILES is stored, Ligand-X generates a 3D conformer first.",
      },
      {
        title: "Choose the calculation type",
        body: "Select one of: Geometry optimisation (find the minimum-energy structure), Single point energy (energy at the current geometry), Frequency (vibrational modes and thermochemistry), or Fukui indices (reactivity and charge analysis).",
      },
      {
        title: "Select the method",
        body: "For fast approximate results, choose GFN2-xTB (semiempirical, runs in seconds). For higher accuracy, choose a DFT functional such as B3LYP-D3 or ωB97X-D. Set the basis set (def2-SVP for optimisation, def2-TZVP for single-point accuracy). Set the charge and multiplicity to match your molecule.",
      },
      {
        title: "Set the solvent (optional)",
        body: "Enable the CPCM implicit solvation model and select a solvent (water, DMSO, chloroform) to include solvent effects in the calculation.",
      },
      {
        title: "Submit the job",
        body: "Click Run QC. GFN2-xTB jobs complete in seconds; DFT jobs may take minutes to hours depending on molecule size and basis set. Progress is streamed to the jobs panel.",
      },
      {
        title: "Review results",
        body: "The results page shows: optimised geometry (viewable in Mol*), orbital energies, partial charges (Mulliken and RESP), Fukui indices mapped onto the molecular surface, and vibrational frequencies with a simulated IR spectrum if a frequency calculation was run.",
      },
    ],
    outputs: [
      "Optimised geometry (.xyz)",
      "Partial charges (Mulliken / RESP)",
      "Frontier molecular orbital energies (HOMO, LUMO, gap)",
      "Fukui f+ / f− indices",
      "Vibrational frequencies and IR spectrum (frequency jobs)",
    ],
    tips: [
      "For charge generation before docking, use GFN2-xTB — it is fast and gives good partial charges for most drug-like molecules.",
      "If a DFT job fails with SCF convergence errors, try increasing the SCF iterations or switching to a smaller basis set for the initial optimisation.",
    ],
    sections: [
      { id: "prereqs",    title: "Prerequisites" },
      { id: "walkthrough", title: "Walkthrough" },
      { id: "outputs",    title: "Expected outputs" },
      { id: "tips",       title: "Tips" },
    ],
  },
];

  const GUIDE_EXPORTS = { GUIDES };

  if (typeof module !== "undefined" && module.exports) module.exports = GUIDE_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, GUIDE_EXPORTS);
})();
