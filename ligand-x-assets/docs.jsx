// ============================================================
// DocsPage — Getting Started + Guides
// ============================================================

const DOCS_SECTIONS = [
  { id: "overview",     title: "Overview" },
  { id: "requirements", title: "System requirements" },
  { id: "install",      title: "Installation" },
  { id: "first-run",    title: "First run" },
  { id: "config",       title: "Configuration" },
  { id: "dev-mode",     title: "Development mode" },
  { id: "ports",        title: "Service ports" },
  { id: "next",         title: "Next steps" },
];

const GUIDES = [
  {
    id: "protein-cleaning",
    title: "Protein cleaning",
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

// ============================================================
// VideoPlaceholder — shown until real walkthrough videos exist
// ============================================================

const VideoPlaceholder = ({ title }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    aspectRatio: '16 / 9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--accent) 8%, transparent), transparent 70%)',
      pointerEvents: 'none',
    }} />
    <div style={{
      width: 52, height: 52, borderRadius: '50%',
      background: 'var(--accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0.9,
    }}>
      <Icon name="play" size={22} style={{ color: '#fff', marginLeft: 4 }} />
    </div>
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{title} — walkthrough</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5, fontFamily: 'var(--font-mono)' }}>
        video coming soon
      </div>
    </div>
  </div>
);

// ============================================================
// Guide video embeds
// ============================================================

const GUIDE_VIDEOS = {
  "protein-cleaning": {
    id: "QjBEVPHYAHE",
    title: "Protein cleaning video",
  },
  docking: {
    id: "QI_l-w5ilUM",
    title: "Docking example video",
  },
};

const GuideVideo = ({ guide }) => {
  const video = GUIDE_VIDEOS[guide.id];
  if (!video) return null;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
        {video.title}
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    </div>
  );
};

// ============================================================
// GuideView — renders a single guide
// ============================================================

const GuideView = ({ guide, guideRefs, activeGuideSection }) => {
  const isProBadge = guide.isPro && (
    <span style={{
      display: 'inline-block', background: 'oklch(0.92 0.08 60)', color: '#b45309',
      borderRadius: 4, fontSize: 11, fontWeight: 600, padding: '2px 7px',
      fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginLeft: 8,
    }}>Pro</span>
  );

  return (
    <>
      <h2
        id="prereqs"
        ref={(r) => guideRefs.current.prereqs = r}
        style={{ marginTop: 0 }}
      >
        Prerequisites
      </h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        {guide.prereqs.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <GuideVideo guide={guide} />

      <h2 id="walkthrough" ref={(r) => guideRefs.current.walkthrough = r}>
        Walkthrough
      </h2>
      {guide.steps.map((step, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '36px 1fr', gap: '0 16px',
          marginBottom: 28, alignItems: 'start',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: guide.isPro ? 'oklch(0.92 0.08 60)' : 'color-mix(in oklch, var(--accent) 15%, transparent)',
            border: `1px solid ${guide.isPro ? '#e5c882' : 'color-mix(in oklch, var(--accent) 30%, transparent)'}`,
            color: guide.isPro ? '#b45309' : 'var(--accent-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)', flexShrink: 0,
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>
              {step.title}
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              {step.body}
            </p>
          </div>
        </div>
      ))}

      <h2 id="outputs" ref={(r) => guideRefs.current.outputs = r}>
        Expected outputs
      </h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        {guide.outputs.map((o, i) => <li key={i} style={{ fontFamily: o.includes('·') ? 'inherit' : 'inherit' }}>{o}</li>)}
      </ul>

      <h2 id="tips" ref={(r) => guideRefs.current.tips = r}>Tips</h2>
      {guide.tips.map((tip, i) => (
        <div key={i} className="callout" style={{ marginBottom: 12 }}>
          {tip}
        </div>
      ))}
    </>
  );
};

// ============================================================
// DocsPage
// ============================================================

const DocsPage = () => {
  const [activeSection, setActiveSection] = React.useState("overview");
  const [docView, setDocView] = React.useState("getting-started");
  const [activeGuideSection, setActiveGuideSection] = React.useState("prereqs");
  const sectionRefs = React.useRef({});
  const guideRefs = React.useRef({});

  // Expose a helper so the footer "API reference" link can navigate here directly
  React.useEffect(() => {
    window.__navDocs = (view) => {
      setDocView(view || "getting-started");
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    return () => { delete window.__navDocs; };
  }, []);

  const isApiRef = docView === "api-reference";
  const currentGuide = (!isApiRef && docView !== "getting-started")
    ? GUIDES.find((g) => g.id === docView)
    : null;

  const switchToGuide = (id) => {
    setDocView(id);
    setActiveGuideSection("prereqs");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchToApiRef = () => {
    setDocView("api-reference");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const switchToGettingStarted = (sectionId) => {
    setDocView("getting-started");
    if (sectionId) {
      setActiveSection(sectionId);
      // defer scroll until re-render populates refs
      requestAnimationFrame(() => {
        const el = sectionRefs.current[sectionId];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Scroll-spy for getting-started view
  React.useEffect(() => {
    if (docView !== "getting-started" || isApiRef) return;
    const onScroll = () => {
      const top = window.scrollY + 100;
      let current = "overview";
      for (const s of DOCS_SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.offsetTop <= top) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [docView]);

  // Scroll-spy for guide view
  React.useEffect(() => {
    if (!currentGuide) return;
    const GUIDE_SECTION_IDS = ["prereqs", "walkthrough", "outputs", "tips"];
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = "prereqs";
      for (const id of GUIDE_SECTION_IDS) {
        const el = guideRefs.current[id];
        if (el && el.offsetTop <= top) current = id;
      }
      setActiveGuideSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentGuide]);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const scrollToGuideSection = (id) => {
    const el = guideRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveGuideSection(id);
    }
  };

  return (
    <div className="page-fade">
      {/* API Reference — rendered as a self-contained view */}
      {isApiRef && (
        <ApiReferencePage onBack={() => switchToGettingStarted(null)} />
      )}

      {/* Header — only shown for getting-started and guide views */}
      {!isApiRef && <section style={{ padding: 'var(--sp-8) 0 var(--sp-5)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-wide">
          {currentGuide ? (
            <>
              <button
                onClick={() => switchToGettingStarted(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: 'var(--muted)', fontSize: 13, marginBottom: 16,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ← Docs
              </button>
              <div className="eyebrow">
                <span className="dot" />{currentGuide.eyebrow}
                {currentGuide.isPro && (
                  <span style={{
                    marginLeft: 8, background: 'oklch(0.92 0.08 60)', color: '#b45309',
                    borderRadius: 4, fontSize: 11, fontWeight: 600, padding: '1px 7px',
                    fontFamily: 'var(--font-mono)',
                  }}>Pro</span>
                )}
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '12px 0 12px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
                {currentGuide.title}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 640, margin: 0 }}>
                {currentGuide.desc}
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="read-time-pill">
                  <Icon name="clock" size={13} />
                  <span>{currentGuide.time} read</span>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow"><span className="dot" />Documentation · Getting started</div>
              <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', margin: '12px 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 600 }}>
                Install Ligand-X with the launcher or CLI.
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 680, margin: 0 }}>
                Current setup paths for desktop users, production servers, and developers.
                The launcher is the recommended route; the CLI is available for headless deployments.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => window.open('https://github.com/kon-218/ligand-x-launcher', '_blank')}>
                  <Icon name="github" size={13} />
                  github.com/kon-218/ligand-x-launcher
                  <Icon name="external" size={11} />
                </button>
                <span className="tag">v0.1.0 · current repo</span>
                <span className="tag">launcher-first install</span>
              </div>
            </>
          )}
        </div>
      </section>}

      {/* Body — getting-started and guide views only */}
      {!isApiRef && <section style={{ padding: 'var(--sp-7) 0 var(--sp-9)' }}>
        <div className="container-wide">
          <div className="docs-layout">

            {/* LEFT NAV */}
            <aside className="docs-side">
              <h6>Getting started</h6>
              <ul>
                <li>
                  <button
                    className={docView === "getting-started" ? "active" : ""}
                    onClick={() => switchToGettingStarted(null)}
                  >
                    Installation guide
                  </button>
                </li>
              </ul>

              <h6>Guides</h6>
              <ul>
                {GUIDES.map((g) => (
                  <li key={g.id}>
                    <button
                      className={docView === g.id ? "active" : ""}
                      onClick={() => switchToGuide(g.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}
                    >
                      <span>{g.title}</span>
                      {g.isPro && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)',
                          color: '#b45309', letterSpacing: '0.05em', flexShrink: 0,
                        }}>PRO</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <h6>Reference</h6>
              <ul>
                <li><button onClick={() => window.__nav('features')}>Capability reference</button></li>
                <li>
                  <button
                    className={docView === "api-reference" ? "active" : ""}
                    onClick={switchToApiRef}
                  >
                    REST API
                  </button>
                </li>
                <li><button>File formats</button></li>
                <li><button>CLI</button></li>
              </ul>
              <h6>Theory</h6>
              <ul>
                <li><button>Docking</button></li>
                <li><button>MD</button></li>
                <li><button>Free energy</button></li>
                <li><button>Quantum chemistry</button></li>
              </ul>
            </aside>

            {/* MAIN */}
            <main className="docs-main">
              {currentGuide ? (
                <GuideView
                  guide={currentGuide}
                  guideRefs={guideRefs}
                  activeGuideSection={activeGuideSection}
                />
              ) : (
                <>
                  {/* Overview */}
                  <h2 id="overview" ref={(r) => sectionRefs.current.overview = r}>Overview</h2>
                  <p>
                    <strong>Ligand-X</strong> is a containerized, self-hosted platform for computer-aided drug discovery.
                    It bundles structure preparation, docking, molecular dynamics, binding-site analysis,
                    sequence tools, molecule editing, and optional Pro modules behind a single web interface.
                  </p>
                  <p>
                    The stack runs locally in Docker. A Next.js frontend talks to a FastAPI gateway; jobs are
                    coordinated through PostgreSQL, Redis, RabbitMQ, and Celery workers.
                  </p>
                  {/* Requirements */}
                  <h2 id="requirements" ref={(r) => sectionRefs.current.requirements = r}>System requirements</h2>
                  <table className="port-table">
                    <thead>
                      <tr><th>Component</th><th>Minimum</th><th>Recommended</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>OS</td><td className="mono">Linux / macOS / WSL 2</td><td className="mono">Ubuntu 22.04+</td></tr>
                      <tr><td>Docker</td><td className="mono">20.10</td><td className="mono">Docker Compose v2</td></tr>
                      <tr><td>RAM</td><td className="mono">16 GB</td><td className="mono">32 GB+ for GPU services</td></tr>
                      <tr><td>Disk</td><td className="mono">20 GB free</td><td className="mono">50 GB+ for trajectories and Pro images</td></tr>
                      <tr><td>GPU</td><td className="mono">Optional</td><td className="mono">NVIDIA GPU + Container Toolkit</td></tr>
                    </tbody>
                  </table>

                  {/* Install */}
                  <h2 id="install" ref={(r) => sectionRefs.current.install = r}>Installation</h2>
                  <p>
                    For desktop use, install the Ligand-X launcher from GitHub Releases. The launcher downloads the
                    runtime bundle, pulls selected core and Pro images, and starts the app without requiring a git clone.
                  </p>
                  <CodeBlock
                    label="desktop"
                    copyText={`# Download from https://github.com/kon-218/ligand-x-launcher/releases\n# Windows: ligandx-launcher-windows-amd64-installer.exe\n# macOS: ligandx-launcher-darwin-universal.dmg\n# Linux: ligandx-launcher-linux-amd64.AppImage`}
                  >
                    <Comment># Download from https://github.com/kon-218/ligand-x-launcher/releases</Comment>{"\n"}
                    <Comment># Windows: ligandx-launcher-windows-amd64-installer.exe</Comment>{"\n"}
                    <Comment># macOS: ligandx-launcher-darwin-universal.dmg</Comment>{"\n"}
                    <Comment># Linux: ligandx-launcher-linux-amd64.AppImage</Comment>
                  </CodeBlock>

                  <h3>Production / headless CLI</h3>
                  <p>For servers, download the public runtime bundle, configure production environment variables, and pull images from GHCR.</p>
                  <CodeBlock
                    label="production"
                    copyText={`curl -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip\nunzip runtime.zip -d ligand-x && cd ligand-x\ncp .env.production.template .env.production   # then edit secrets\ndocker compose --env-file .env.production pull\ndocker compose --env-file .env.production up -d`}
                  >
                    <Cmd><Fn>curl</Fn> -L https://github.com/kon-218/ligand-x-launcher/releases/latest/download/ligand-x-runtime.zip -o runtime.zip</Cmd>{"\n"}
                    <Cmd><Fn>unzip</Fn> runtime.zip -d ligand-x && <Kw>cd</Kw> ligand-x</Cmd>{"\n"}
                    <Cmd><Fn>cp</Fn> .env.production.template .env.production   <Comment># then edit secrets</Comment></Cmd>{"\n"}
                    <Cmd><Fn>docker</Fn> compose --env-file .env.production pull</Cmd>{"\n"}
                    <Cmd><Fn>docker</Fn> compose --env-file .env.production up -d</Cmd>
                  </CodeBlock>

                  {/* First run */}
                  <h2 id="first-run" ref={(r) => sectionRefs.current['first-run'] = r}>First run</h2>
                  <p>
                    After startup, verify the containers and health endpoints. Core modules work immediately;
                    private Pro services are available when configured.
                  </p>
                  <CodeBlock
                    label="verify"
                    copyText={`docker compose ps\ncurl http://localhost:8000/health\ncurl http://localhost:8000/api/services/health\n# open http://localhost:3000`}
                  >
                    <Cmd><Fn>docker</Fn> compose ps</Cmd>{"\n"}
                    <Cmd><Fn>curl</Fn> http://localhost:8000/health</Cmd>{"\n"}
                    <Cmd><Fn>curl</Fn> http://localhost:8000/api/services/health</Cmd>{"\n"}
                    <span style={{ color: 'oklch(0.78 0.10 200)' }}>{"Open http://localhost:3000"}</span>
                  </CodeBlock>

                  {/* Configuration */}
                  <h2 id="config" ref={(r) => sectionRefs.current.config = r}>Configuration</h2>
                  <p>
                    Production configuration is read from <code>.env.production</code>. Required values include
                    database, RabbitMQ, Flower, QC, API URL, CORS, and optional ORCA path settings.
                  </p>
                  <CodeBlock
                    label=".env.production"
                    copyText={`POSTGRES_PASSWORD=change-me\nRABBITMQ_PASSWORD=change-me\nFLOWER_PASSWORD=change-me\nQC_SECRET_KEY=generate-a-random-secret\nNEXT_PUBLIC_API_URL=http://localhost:8000\nCORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000\nORCA_HOST_PATH=/opt/orca\nLIGANDX_PRO_IMAGE_PREFIX=ghcr.io/kon-218/ligand-x-pro`}
                  >
                    <span style={{ color: 'var(--code-comment)' }}># .env.production - required production settings</span>{"\n"}
                    <Kw>POSTGRES_PASSWORD</Kw>=<Str>change-me</Str>{"\n"}
                    <Kw>RABBITMQ_PASSWORD</Kw>=<Str>change-me</Str>{"\n"}
                    <Kw>FLOWER_PASSWORD</Kw>=<Str>change-me</Str>{"\n"}
                    <Kw>QC_SECRET_KEY</Kw>=<Str>generate-a-random-secret</Str>{"\n"}
                    <Kw>NEXT_PUBLIC_API_URL</Kw>=<Str>http://localhost:8000</Str>{"\n"}
                    <Kw>CORS_ORIGINS</Kw>=<Str>http://localhost:3000,http://127.0.0.1:3000</Str>{"\n"}
                    <Kw>ORCA_HOST_PATH</Kw>=<Str>/opt/orca</Str>{"\n"}
                    <Kw>LIGANDX_PRO_IMAGE_PREFIX</Kw>=<Str>ghcr.io/kon-218/ligand-x-pro</Str>
                  </CodeBlock>

                  {/* Dev mode */}
                  <h2 id="dev-mode" ref={(r) => sectionRefs.current['dev-mode'] = r}>Development mode</h2>
                  <p>
                    Requires source access to the private <code>ligand-x</code> repository (maintainers only).
                    <code> make dev</code> generates a local <code>.env</code>, mounts source into containers, and starts
                    the Next.js frontend with hot reload. Partial startup targets are available for focused work.
                  </p>
                  <CodeBlock label="dev" copyText="make dev">
                    <Cmd><Fn>make</Fn> dev</Cmd>{"\n"}
                    <Cmd><Fn>make</Fn> dev-core</Cmd>{"\n"}
                    <Cmd><Fn>make</Fn> dev-docking</Cmd>{"\n"}
                    <Cmd><Fn>make</Fn> dev-free-energy</Cmd>
                  </CodeBlock>

                  {/* Ports */}
                  <h2 id="ports" ref={(r) => sectionRefs.current.ports = r}>Service ports</h2>
                  <table className="port-table">
                    <thead>
                      <tr><th>Service</th><th>Port</th><th>Purpose</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Frontend</td><td className="mono">:3000</td><td>React UI + Mol* viewer</td></tr>
                      <tr><td>API Gateway</td><td className="mono">:8000</td><td>FastAPI · OpenAPI at <code>/docs</code></td></tr>
                      <tr><td>PostgreSQL</td><td className="mono">:5432</td><td>Job persistence and blob metadata</td></tr>
                      <tr><td>RabbitMQ</td><td className="mono">:15672</td><td>Management UI</td></tr>
                      <tr><td>Flower</td><td className="mono">:5555</td><td>Celery worker dashboard</td></tr>
                      <tr><td>Redis</td><td className="mono">:6379</td><td>WebSocket pub/sub and cache</td></tr>
                    </tbody>
                  </table>

                  {/* Next */}
                  <h2 id="next" ref={(r) => sectionRefs.current.next = r}>Next steps</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                    <NextCard
                      title="Run your first docking job"
                      desc="Prepare a receptor and ligand, configure the search box, and review ranked poses with interaction analysis."
                      icon="target"
                      onClick={() => switchToGuide("docking")}
                    />
                    <NextCard
                      title="Clean a protein structure"
                      desc="Import a raw PDB, remove waters and ions, add hydrogens, and produce a modeling-ready receptor."
                      icon="flask"
                      onClick={() => switchToGuide("protein-cleaning")}
                    />
                    <NextCard
                      title="Read the architecture spec"
                      desc="How the gateway, workers and microservices communicate via Redis and Celery."
                      icon="network"
                    />
                    <NextCard
                      title="Browse the capability reference"
                      desc="Full list of methods, parameters, supported file formats and theory links."
                      icon="book"
                      onClick={() => window.__nav('features')}
                    />
                  </div>
                </>
              )}
            </main>

            {/* RIGHT TOC */}
            <aside className="docs-toc">
              <h6>On this page</h6>
              {currentGuide ? (
                <ul>
                  {currentGuide.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        className={activeGuideSection === s.id ? "active" : ""}
                        onClick={() => scrollToGuideSection(s.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {DOCS_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        className={activeSection === s.id ? "active" : ""}
                        onClick={() => scrollTo(s.id)}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </aside>

          </div>
        </div>
      </section>}
    </div>
  );
};

const NextCard = ({ title, desc, icon, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 18,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 0.15s, transform 0.15s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <Icon name={icon} size={18} style={{ color: 'var(--accent-strong)' }} />
      <span style={{ fontWeight: 600, fontSize: 15 }}>{title}</span>
    </div>
    <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: 0, lineHeight: 1.55 }}>{desc}</p>
    {onClick && (
      <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-strong)', display: 'flex', alignItems: 'center', gap: 4 }}>
        Continue <Icon name="arrow" size={11} />
      </div>
    )}
  </div>
);

Object.assign(window, { DocsPage });
