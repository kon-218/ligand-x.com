// ============================================================
// ApiReferencePage — REST API reference for the gateway
// ============================================================

// ── Method badge colours ────────────────────────────────────
const METHOD_STYLES = {
  GET:    { bg: '#e8f7f5', color: '#155650', border: '#b2e0db' },
  POST:   { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  PATCH:  { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  DELETE: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
  WS:     { bg: '#f5f3ff', color: '#5b21b6', border: '#ddd6fe' },
};

const MethodBadge = ({ method }) => {
  const s = METHOD_STYLES[method] || METHOD_STYLES.GET;
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: '0.04em',
      padding: '2px 8px',
      borderRadius: 4,
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      lineHeight: 1.5,
      flexShrink: 0,
    }}>
      {method}
    </span>
  );
};

// ── Endpoint row ────────────────────────────────────────────
const Endpoint = ({ method, path, desc, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <MethodBadge method={method} />
      <code style={{
        fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500,
        background: 'var(--bg-subtle)', padding: '3px 10px',
        border: '1px solid var(--border)', borderRadius: 6, color: 'var(--ink)',
      }}>{path}</code>
    </div>
    {desc && <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 12px', lineHeight: 1.6 }}>{desc}</p>}
    {children}
  </div>
);

// ── Params table ────────────────────────────────────────────
const ParamTable = ({ title = "Parameters", rows }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>{title}</div>
    <table className="port-table" style={{ fontSize: 13 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td><code style={{ fontSize: 12 }}>{r.name}</code></td>
            <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{r.type}</span></td>
            <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: r.req ? 'var(--accent-strong)' : 'var(--muted-2)' }}>{r.req ? 'required' : 'optional'}</span></td>
            <td style={{ fontSize: 13, color: 'var(--ink-2)' }}>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Inline JSON example ─────────────────────────────────────
const JsonExample = ({ label = "Response", json }) => (
  <CodeBlock label={label} copyText={json}>
    <span style={{ color: '#c9d1d9' }}>{json}</span>
  </CodeBlock>
);

// ── API group definitions ────────────────────────────────────
// Each group has: id, title, description, and an array of endpoint objects.
// Endpoints are rendered by the ApiSection component.

const API_GROUPS = [
  {
    id: 'authentication',
    title: 'Authentication',
    desc: 'Login and inspect the current user. The token returned by login should be passed as the X-API-Key header on subsequent requests.',
  },
  {
    id: 'health',
    title: 'Health',
    desc: 'Gateway and service liveness/readiness probes. These routes are always public.',
  },
  {
    id: 'projects',
    title: 'Projects',
    desc: 'Projects are the top-level container. All proteins, molecules, pockets, poses, and jobs belong to a project.',
  },
  {
    id: 'proteins',
    title: 'Proteins',
    desc: 'Proteins are fetched from RCSB by PDB accession code and stored per-project. Creating a protein automatically saves co-crystallised ligands to the molecule library.',
  },
  {
    id: 'molecules',
    title: 'Molecules',
    desc: 'The molecule library stores SMILES + 3D SDF per-project. Descriptors (MW, LogP, TPSA, etc.) are computed automatically via RDKit on creation.',
  },
  {
    id: 'library-folders',
    title: 'Library Folders',
    desc: 'Hierarchical folders for organising the molecule library. Molecules can be assigned to a folder at creation or moved via PATCH.',
  },
  {
    id: 'poses',
    title: 'Poses',
    desc: 'Saved molecular poses resulting from docking, MD, Boltz-2, QC, ABFE, or RBFE jobs. A pose stores the ligand SDF and optional full complex PDB.',
  },
  {
    id: 'pockets',
    title: 'Pockets',
    desc: 'Binding-site definitions (center + box dimensions in Å) saved per-protein. Used as search-box inputs for docking jobs.',
  },
  {
    id: 'jobs',
    title: 'Jobs',
    desc: 'The unified job queue. Long-running computations (docking, MD, Boltz-2, QC, ABFE, RBFE, REINVENT) are submitted here and executed by Celery workers. Pro job types require a valid license.',
  },
  {
    id: 'websocket',
    title: 'WebSocket',
    desc: 'Real-time job progress via Redis pub/sub. A single WebSocket connection can subscribe to any number of job IDs and receives live updates as Celery tasks progress.',
  },
  {
    id: 'workflows',
    title: 'Workflows',
    desc: 'Run a multi-step canvas workflow — a directed graph of boltz2, md, and docking nodes — as a single job. Ligand-X performs a topological sort and injects upstream outputs automatically.',
  },
  {
    id: 'service-routes',
    title: 'Service Routes',
    desc: 'The gateway proxies all /api/{service}/* paths to the corresponding backend microservice. Authentication applies to all proxied routes except where noted.',
  },
];

// ── Section content components ──────────────────────────────

const AuthenticationSection = () => (
  <>
    <div className="callout" style={{ marginBottom: 24 }}>
      <strong>Authentication:</strong> Pass your API key as the <code>X-API-Key</code> header on all authenticated requests. Obtain a key via <code>POST /api/auth/login</code>. The following routes are public (no key required): <code>GET /</code>, <code>GET /health</code>, <code>GET /api/services/health</code>, <code>POST /api/auth/login</code>, <code>GET /api/auth/me</code>, <code>GET /api/license/status</code>, and the WebSocket endpoint.
    </div>

    <Endpoint method="POST" path="/api/auth/login" desc="Exchange username and password for an API token.">
      <ParamTable title="Request body" rows={[
        { name: 'username', type: 'string', req: true,  desc: 'Configured via LIGANDX_USERNAME env var.' },
        { name: 'password', type: 'string', req: true,  desc: 'Configured via LIGANDX_PASSWORD env var.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "token": "sk-…",
  "license": { "tier": "academic", "expiry": "2027-05-20" }
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/auth/me" desc="Return the authenticated user's username, license tier, and enabled modules. Public — returns guest info when no key is provided.">
      <JsonExample label="200 Response" json={`{
  "username": "admin",
  "license": { "tier": "academic", "expiry": "2027-05-20" },
  "modules": ["docking", "md", "boltz2", "qc", "abfe", "rbfe"]
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/license/status" desc="Return the raw license record and list of enabled module keys. Public.">
      <JsonExample label="200 Response" json={`{
  "license": { "tier": "academic", "holder": "Local workstation", "expiry": "2027-05-20" },
  "modules": ["docking", "md", "boltz2", "qc", "abfe", "rbfe"]
}`} />
    </Endpoint>
  </>
);

const HealthSection = () => (
  <>
    <Endpoint method="GET" path="/" desc="Root liveness probe. Always returns 200 when the gateway process is running.">
      <JsonExample label="200 Response" json={`{
  "status": "ok",
  "message": "Ligand-X FastAPI Gateway is running",
  "version": "3.0",
  "frontend": "React app should be running on port 3000"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/health" desc="Readiness probe. Checks PostgreSQL connectivity in addition to gateway liveness.">
      <JsonExample label="200 / 503 Response" json={`{
  "status": "ok",
  "gateway": "running",
  "database": "ok"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/services/health" desc="Probe all microservices in parallel and return their individual statuses.">
      <JsonExample label="200 Response" json={`{
  "services": {
    "structure": true,
    "docking": true,
    "md": false,
    "boltz2": true,
    "qc": true
  }
}`} />
    </Endpoint>
  </>
);

const ProjectsSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects" desc="Create a new project. Returns 409 if a project with the same name already exists.">
      <ParamTable title="Request body" rows={[
        { name: 'name',            type: 'string', req: true,  desc: '1–255 characters. Must be unique.' },
        { name: 'description',     type: 'string', req: false, desc: 'Up to 2 000 characters.' },
        { name: 'target_protein',  type: 'string', req: false, desc: 'Free-text target description. Up to 1 000 characters.' },
        { name: 'molecule_series', type: 'string', req: false, desc: 'Series or chemotype label. Up to 1 000 characters.' },
      ]} />
      <JsonExample label="201 Response" json={`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "CDK2 Fragment Screen",
  "description": null,
  "target_protein": "CDK2",
  "molecule_series": null,
  "created_at": "2026-05-27T10:00:00Z",
  "updated_at": "2026-05-27T10:00:00Z"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects" desc="List all projects. Returns an array of all project records (no pagination).">
      <JsonExample label="200 Response" json={`[
  { "id": "550e…", "name": "CDK2 Fragment Screen", "created_at": "…" },
  { "id": "661f…", "name": "EGFR Lead Opt",        "created_at": "…" }
]`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}" desc="Return a single project by UUID.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Project UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="PATCH" path="/api/projects/{project_id}" desc="Partially update a project. All fields are optional.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Project UUID.' },
      ]} />
      <ParamTable title="Request body (all optional)" rows={[
        { name: 'name',            type: 'string', req: false, desc: 'New project name.' },
        { name: 'description',     type: 'string', req: false, desc: 'Updated description.' },
        { name: 'target_protein',  type: 'string', req: false, desc: 'Updated target label.' },
        { name: 'molecule_series', type: 'string', req: false, desc: 'Updated series label.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}" desc="Delete a project and cascade-delete all associated jobs. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Project UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/jobs" desc="List all jobs belonging to a project, with pagination.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Project UUID.' },
      ]} />
      <ParamTable title="Query parameters" rows={[
        { name: 'skip',  type: 'integer', req: false, desc: 'Records to skip. Default 0.' },
        { name: 'limit', type: 'integer', req: false, desc: '1–500. Default 50.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "jobs": [ /* JobResponse objects */ ],
  "total": 42,
  "skip": 0,
  "limit": 50
}`} />
    </Endpoint>
  </>
);

const ProteinsSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects/{project_id}/proteins" desc="Add a protein to the project by PDB accession code. Fetches structure metadata from RCSB and automatically saves co-crystallised ligands to the molecule library.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'name',   type: 'string', req: true, desc: '1–255 characters.' },
        { name: 'pdb_id', type: 'string', req: true, desc: 'PDB accession code, e.g. 4W52. 1–10 characters.' },
      ]} />
      <JsonExample label="201 Response" json={`{
  "id": "…",
  "project_id": "…",
  "name": "CDK2",
  "pdb_id": "4W52",
  "cocrystal_ligands_added": 2,
  "metadata": {
    "resolution": 1.8,
    "experimental_method": "X-RAY DIFFRACTION",
    "organism": "Homo sapiens",
    "chains": ["A", "B"],
    "residue_count": 298,
    "ligands": ["ATP", "MG"],
    "cofactors": []
  },
  "created_at": "2026-05-27T10:00:00Z"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/proteins" desc="List all proteins in the project.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="POST" path="/api/projects/{project_id}/proteins/{protein_id}/refresh-metadata" desc="Re-fetch and backfill RCSB metadata for a protein. Useful for proteins imported before metadata enrichment was added.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'protein_id', type: 'UUID', req: true, desc: 'Protein UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}/proteins/{protein_id}" desc="Delete a protein. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'protein_id', type: 'UUID', req: true, desc: 'Protein UUID.' },
      ]} />
    </Endpoint>
  </>
);

const MoleculesSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects/{project_id}/molecules" desc="Add a single molecule. SMILES is canonicalised via RDKit; a 3D SDF conformer and all descriptors are computed automatically. Returns 409 if the canonical SMILES already exists in the project.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'smiles',     type: 'string', req: true,  desc: 'SMILES string. 1–2 000 characters.' },
        { name: 'name',       type: 'string', req: false, desc: 'Display name. Up to 500 characters.' },
        { name: 'folder_id',  type: 'UUID',   req: false, desc: 'Target library folder.' },
        { name: 'molfile',    type: 'string', req: false, desc: 'Pre-computed MDL molfile (overrides RDKit 3D generation).' },
      ]} />
      <JsonExample label="201 Response" json={`{
  "id": "…",
  "project_id": "…",
  "name": "Compound 1",
  "smiles": "CC1=CC=CC=C1",
  "canonical_smiles": "Cc1ccccc1",
  "molecular_weight": 92.14,
  "logp": 2.73,
  "hbd": 0,
  "hba": 0,
  "tpsa": 0.0,
  "has_pains_alert": false,
  "created_at": "2026-05-27T10:00:00Z"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/molecules" desc="List molecules in a project with pagination. Optionally filter by folder.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Query parameters" rows={[
        { name: 'skip',      type: 'integer', req: false, desc: 'Records to skip. Default 0.' },
        { name: 'limit',     type: 'integer', req: false, desc: '1–500. Default 50.' },
        { name: 'folder_id', type: 'string',  req: false, desc: 'Filter to a folder UUID, or "root" for unfiled molecules.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "molecules": [ /* MoleculeResponse objects */ ],
  "total": 128,
  "skip": 0,
  "limit": 50
}`} />
    </Endpoint>

    <Endpoint method="POST" path="/api/projects/{project_id}/molecules/batch" desc="Import up to 500 molecules in a single request. Duplicate SMILES are skipped. Partial success is returned with HTTP 200.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'items',     type: 'array',  req: true,  desc: 'Up to 500 objects, each with name (string) and smiles (string).' },
        { name: 'folder_id', type: 'UUID',   req: false, desc: 'Target folder for all molecules in this batch.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "added": [ /* MoleculeResponse objects */ ],
  "skipped_duplicates": 3,
  "errors": [
    { "index": 7, "smiles": "invalid", "error": "could not parse SMILES" }
  ]
}`} />
    </Endpoint>

    <Endpoint method="PATCH" path="/api/projects/{project_id}/molecules/{molecule_id}" desc="Rename a molecule.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id',  type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'molecule_id', type: 'UUID', req: true, desc: 'Molecule UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'name', type: 'string', req: true, desc: 'New display name. 1–500 characters.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}/molecules/{molecule_id}" desc="Delete a molecule. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id',  type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'molecule_id', type: 'UUID', req: true, desc: 'Molecule UUID.' },
      ]} />
    </Endpoint>
  </>
);

const LibraryFoldersSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects/{project_id}/library-folders" desc="Create a folder. Nest folders by supplying a parent_id; omit it to create a root-level folder.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'name',      type: 'string', req: true,  desc: 'Folder name. 1–255 characters.' },
        { name: 'parent_id', type: 'UUID',   req: false, desc: 'Parent folder UUID. Omit for root-level folders.' },
      ]} />
      <JsonExample label="201 Response" json={`{
  "id": "…",
  "project_id": "…",
  "name": "Hits",
  "parent_id": null,
  "created_at": "2026-05-27T10:00:00Z"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/library-folders" desc="List folders. Filter by parent or return all folders in the project.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
      <ParamTable title="Query parameters" rows={[
        { name: 'parent_id',   type: 'UUID',    req: false, desc: 'Return only direct children of this folder. Omit for root-level folders.' },
        { name: 'all_folders', type: 'boolean', req: false, desc: 'If true, return all folders in the project (ignores parent_id).' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}/library-folders/{folder_id}" desc="Delete a folder. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'folder_id',  type: 'UUID', req: true, desc: 'Folder UUID.' },
      ]} />
    </Endpoint>
  </>
);

const PosesSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects/{project_id}/molecules/{molecule_id}/poses" desc="Save a molecular pose (docking, MD snapshot, Boltz-2 prediction, etc.) attached to a molecule.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id',  type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'molecule_id', type: 'UUID', req: true, desc: 'Molecule UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'source_tool', type: 'enum',   req: true,  desc: 'One of: docking, md, boltz2, qc, abfe, rbfe.' },
        { name: 'ligand_sdf',  type: 'string', req: true,  desc: 'Ligand coordinates in SDF format.' },
        { name: 'pose_type',   type: 'enum',   req: false, desc: '"protein_ligand_complex" (default) or "ligand_only".' },
        { name: 'job_id',      type: 'UUID',   req: false, desc: 'Originating job UUID.' },
        { name: 'name',        type: 'string', req: false, desc: 'Display name. Up to 255 characters.' },
        { name: 'ligand_pdb',  type: 'string', req: false, desc: 'Ligand as PDB format (optional).' },
        { name: 'complex_pdb', type: 'string', req: false, desc: 'Full protein+ligand complex in PDB format.' },
        { name: 'metadata',    type: 'object', req: false, desc: 'Arbitrary key/value: affinity, rmsd, rank, energy, confidence, etc.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/molecules/{molecule_id}/poses" desc="List all poses for a specific molecule.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id',  type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'molecule_id', type: 'UUID', req: true, desc: 'Molecule UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/poses" desc="List all poses across the entire project.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}/poses/{pose_id}" desc="Delete a pose. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'pose_id',    type: 'UUID', req: true, desc: 'Pose UUID.' },
      ]} />
    </Endpoint>
  </>
);

const PocketsSection = () => (
  <>
    <Endpoint method="POST" path="/api/projects/{project_id}/proteins/{protein_id}/pockets" desc="Save a binding-site definition for a protein. Coordinates are in Ångströms.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'protein_id', type: 'UUID', req: true, desc: 'Protein UUID.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'name',        type: 'string', req: true,  desc: '1–255 characters.' },
        { name: 'center_x',    type: 'float',  req: true,  desc: 'Box center X (Å).' },
        { name: 'center_y',    type: 'float',  req: true,  desc: 'Box center Y (Å).' },
        { name: 'center_z',    type: 'float',  req: true,  desc: 'Box center Z (Å).' },
        { name: 'size_x',      type: 'float',  req: true,  desc: 'Box width X (Å). Must be > 0.' },
        { name: 'size_y',      type: 'float',  req: true,  desc: 'Box height Y (Å). Must be > 0.' },
        { name: 'size_z',      type: 'float',  req: true,  desc: 'Box depth Z (Å). Must be > 0.' },
        { name: 'description', type: 'string', req: false, desc: 'Up to 1 000 characters.' },
        { name: 'metadata',    type: 'object', req: false, desc: 'Arbitrary metadata: method, druggability score, etc.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/proteins/{protein_id}/pockets" desc="List pockets defined for a specific protein.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'protein_id', type: 'UUID', req: true, desc: 'Protein UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/projects/{project_id}/pockets" desc="List all pockets across all proteins in the project.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
      ]} />
    </Endpoint>

    <Endpoint method="PATCH" path="/api/projects/{project_id}/pockets/{pocket_id}" desc="Update pocket name, description, or metadata. Box coordinates cannot be changed after creation.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'pocket_id',  type: 'UUID', req: true, desc: 'Pocket UUID.' },
      ]} />
      <ParamTable title="Request body (all optional)" rows={[
        { name: 'name',        type: 'string', req: false, desc: 'New display name.' },
        { name: 'description', type: 'string', req: false, desc: 'Updated description.' },
        { name: 'metadata',    type: 'object', req: false, desc: 'Updated metadata object.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/projects/{project_id}/pockets/{pocket_id}" desc="Delete a pocket definition. Returns 204 No Content.">
      <ParamTable title="Path parameters" rows={[
        { name: 'project_id', type: 'UUID', req: true, desc: 'Parent project UUID.' },
        { name: 'pocket_id',  type: 'UUID', req: true, desc: 'Pocket UUID.' },
      ]} />
    </Endpoint>
  </>
);

const JobsSection = () => (
  <>
    <div className="callout" style={{ marginBottom: 24 }}>
      <strong>Job types:</strong> <code>docking</code>, <code>docking_batch</code>, <code>md</code>, <code>boltz2</code>, <code>boltz2_batch</code>, <code>admet</code>, <code>qc</code>, <code>abfe</code>, <code>abfe_atm</code>, <code>rbfe</code>, <code>rbfe_mapping_preview</code>, <code>reinvent_campaign</code>. Pro job types (<code>abfe</code>, <code>abfe_atm</code>, <code>rbfe</code>, <code>rbfe_mapping_preview</code>, <code>reinvent_campaign</code>) require a valid Academic or Pro license.
    </div>

    <Endpoint method="POST" path="/api/jobs/submit/{job_type}" desc="Submit a new job. The request body is forwarded to the appropriate Celery task or microservice. Returns 403 if the job type requires a license you don't have.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_type', type: 'enum', req: true, desc: 'One of the job type strings listed above.' },
      ]} />
      <ParamTable title="Request body" rows={[
        { name: 'project_id',      type: 'UUID',    req: true,  desc: 'Project to associate the job with.' },
        { name: 'molecule_name',   type: 'string',  req: false, desc: 'Human-readable label. Up to 255 characters.' },
        { name: 'timeout_seconds', type: 'integer', req: false, desc: '30–14 400 seconds. Service-specific defaults apply.' },
      ]} />
      <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '0 0 8px' }}>Any additional fields in the body are passed through to the Celery task (protein paths, ligand SMILES, docking parameters, etc.).</p>
      <JsonExample label="201 Response" json={`{
  "job_id": "b3a7f…",
  "status": "pending",
  "job_type": "docking",
  "stream_url": "/api/jobs/ws",
  "message": "Job submitted"
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/status/{job_id}" desc="Lightweight status poll — returns current status, progress percentage, and stage label.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'Job ID returned by submit.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "job_id": "b3a7f…",
  "status": "running",
  "progress": 42,
  "stage": "md_production",
  "message": "Running production MD at step 420 / 1000",
  "result": null,
  "error": null
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/{job_id}" desc="Full job record with live Celery state sync. Also detects stale jobs (>60 min old with no Celery record) and marks them failed.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'Job ID.' },
      ]} />
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/list" desc="List jobs with optional filtering and pagination. Syncs live Celery state into results.">
      <ParamTable title="Query parameters" rows={[
        { name: 'job_type', type: 'string',  req: false, desc: 'Filter by job type.' },
        { name: 'status',   type: 'string',  req: false, desc: 'Filter by status: pending, running, completed, failed, cancelled.' },
        { name: 'limit',    type: 'integer', req: false, desc: '1–200. Default 50.' },
        { name: 'offset',   type: 'integer', req: false, desc: 'Records to skip. Default 0.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "jobs": [ /* JobResponse objects */ ],
  "total": 17,
  "limit": 50,
  "offset": 0
}`} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/resume/md/{job_id}" desc="Resume an MD job that has paused at the preview checkpoint. The job must be in preview_ready stage.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'MD job ID.' },
      ]} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/resume/rbfe/{job_id}" desc="Resume an RBFE job after docking validation. The job must be in docking_ready status.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'RBFE job ID.' },
      ]} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/{job_id}/cancel" desc="Request job cancellation. Sends a Celery revoke signal and updates the database record to cancelled. For QC jobs, also notifies the QC service.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'Job ID.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "job_id": "b3a7f…",
  "status": "cancelled",
  "message": "Cancellation requested"
}`} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/{job_id}/recompute-analytics" desc="Re-run post-hoc MD analytics (RMSD, thermodynamics) on the stored output files without re-running the simulation.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'MD job ID.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "success": true,
  "analytics": {
    "rmsd_mean": 1.2,
    "rmsd_max": 3.4,
    "potential_energy_mean": -123456.7
  }
}`} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/recover/{job_id}" desc="Recover an ABFE or RBFE job whose output files are complete on disk but whose database status shows failure.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'ABFE or RBFE job ID.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "job_id": "b3a7f…",
  "recovered": true,
  "status": "completed",
  "message": "Job recovered from disk results",
  "result": { /* parsed results */ }
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/{job_id}/log" desc="Return the last 512 KB of the job's log file as plain text (Content-Type: text/plain). A truncation notice is prepended if the log exceeds 512 KB.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'Job ID.' },
      ]} />
    </Endpoint>

    <Endpoint method="DELETE" path="/api/jobs/{job_id}" desc="Delete the job database record. Output files on disk are not removed.">
      <ParamTable title="Path parameters" rows={[
        { name: 'job_id', type: 'string', req: true, desc: 'Job ID.' },
      ]} />
      <JsonExample label="200 Response" json={`{ "job_id": "b3a7f…", "status": "deleted" }`} />
    </Endpoint>

    <Endpoint method="POST" path="/api/jobs/cleanup-stale" desc="Mark orphaned running/pending jobs from previous sessions as failed. A job is considered stale when its Celery task is no longer known to the broker.">
      <JsonExample label="200 Response" json={`{ "cleaned": 3, "message": "Marked 3 stale jobs as failed" }`} />
    </Endpoint>
  </>
);

const WebSocketSection = () => (
  <>
    <div className="callout" style={{ marginBottom: 24 }}>
      Authentication for the WebSocket is passed in the first message, not as an HTTP header. If <code>LIGANDX_API_KEY</code> is set, the first message must include a <code>token</code> field. The connection is closed after 10 seconds if authentication is not provided.
    </div>

    <Endpoint method="WS" path="/api/jobs/ws" desc="Subscribe to real-time job progress updates via Redis pub/sub. Send a JSON message as the first frame to authenticate and subscribe.">
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>First message (subscribe + auth)</div>
        <CodeBlock label="json" copyText={`{"type":"subscribe","job_ids":["id1","id2"],"token":"<api_key>","project_id":"<optional>"}`}>
          <span style={{ color: '#c9d1d9' }}>{`{
  "type": "subscribe",
  "job_ids": ["id1", "id2"],
  "token": "<api_key>",       // required if LIGANDX_API_KEY is set
  "project_id": "<optional>"  // subscribe to all jobs in a project
}`}</span>
        </CodeBlock>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Server → client messages</div>
        <CodeBlock label="json" copyText="">
          <span style={{ color: '#c9d1d9' }}>{`// Connected
{ "type": "connected", "client_id": "abc123", "message": "Connected" }

// Subscribed acknowledgement
{ "type": "subscribed", "count": 2 }

// Job update (main event)
{ "job_id": "b3a7f…", "status": "running", "progress": 55, "stage": "md_production" }

// Pong (response to ping)
{ "type": "pong" }

// Error
{ "type": "error", "message": "Unauthorized" }`}</span>
        </CodeBlock>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>Client → server messages</div>
        <CodeBlock label="json" copyText="">
          <span style={{ color: '#c9d1d9' }}>{`{ "type": "subscribe",   "job_ids": ["id3"] }
{ "type": "unsubscribe", "job_ids": ["id1"] }
{ "type": "ping" }
{ "type": "get_stats" }`}</span>
        </CodeBlock>
      </div>
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/ws/stats" desc="Return WebSocket connection statistics.">
      <JsonExample label="200 Response" json={`{
  "status": "ok",
  "connected_clients": 4,
  "subscribed_jobs": 12
}`} />
    </Endpoint>

    <Endpoint method="GET" path="/api/jobs/ws/health" desc="Detailed WebSocket health check including Redis connectivity.">
      <JsonExample label="200 Response" json={`{
  "status": "ok",
  "websocket_enabled": true,
  "redis_connected": true,
  "active_connections": 4,
  "listener_running": true
}`} />
    </Endpoint>
  </>
);

const WorkflowsSection = () => (
  <>
    <Endpoint method="POST" path="/api/workflows/run" desc="Execute a directed canvas workflow. Ligand-X topologically sorts the nodes, injects upstream outputs (protein, ligand SDF), and dispatches a single orchestrating Celery task. Supported node types: boltz2, md, docking.">
      <ParamTable title="Request body" rows={[
        { name: 'project_id', type: 'UUID',  req: true,  desc: 'Project to associate the workflow job with.' },
        { name: 'nodes',      type: 'array', req: true,  desc: 'React Flow node objects from the canvas.' },
        { name: 'edges',      type: 'array', req: true,  desc: 'React Flow edge objects defining the execution order.' },
        { name: 'campaign',   type: 'object', req: false, desc: 'Optional campaign metadata forwarded to REINVENT nodes.' },
      ]} />
      <JsonExample label="200 Response" json={`{
  "workflow_job_id": "wf-c8d2e…",
  "stream_url": "/api/jobs/ws",
  "step_count": 3,
  "label": "Docking → MD → Boltz-2"
}`} />
    </Endpoint>
  </>
);

const ServiceRoutesSection = () => (
  <>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 20 }}>
      The gateway transparently proxies all <code>/api/{'{service}'}/*</code> paths to the appropriate backend container. Authentication applies to all proxied routes. Request bodies are forwarded as-is; responses are streamed back.
    </p>

    <table className="port-table">
      <thead>
        <tr>
          <th>Path prefix</th>
          <th>Service</th>
          <th>Internal port</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['/api/structure/*', 'Structure',      '8001', 'PDB fetching, structure prep, file conversion'],
          ['/api/molecules/*', 'Structure',      '8001', 'Alias for molecule library operations'],
          ['/api/library/*',   'Structure',      '8001', 'Alias for library management'],
          ['/api/docking/*',   'Docking',        '8002', 'AutoDock Vina, Meeko ligand prep'],
          ['/api/md/*',        'MD Simulation',  '8003', '1 h proxy timeout; SSE streaming on /stream_optimize'],
          ['/api/admet/*',     'ADMET',          '8004', 'ADMET property prediction'],
          ['/api/boltz2/*',    'Boltz-2',        '8005', 'Structure prediction and binding affinity'],
          ['/api/qc/*',        'Quantum Chem.',  '8006', 'GFN2-xTB and ORCA DFT calculations'],
          ['/api/alignment/*', 'Alignment',      '8007', 'Protein structure alignment'],
          ['/api/ketcher/*',   'Ketcher',        '8008', 'Cheminformatics: convert, validate, generate3d'],
          ['/api/abfe/*',      'ABFE',           '8010', 'Pro · Absolute binding free energy (alchemical)'],
          ['/api/rbfe/*',      'RBFE',           '8011', 'Pro · Relative binding free energy (LOMAP)'],
          ['/api/pocket-finder/*', 'Pocket Finder', '8012', 'P2Rank / DeepPocket binding site prediction'],
          ['/api/reinvent/*',  'REINVENT',       '8013', 'Pro · Generative molecule design campaigns'],
          ['/api/msa/*',       'MSA',            '—',    '11 min proxy timeout; sequence alignment generation'],
        ].map(([prefix, service, port, notes]) => (
          <tr key={prefix}>
            <td><code style={{ fontSize: 12 }}>{prefix}</code></td>
            <td>{service}</td>
            <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{port}</span></td>
            <td style={{ fontSize: 13, color: 'var(--muted)' }}>{notes}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3>Common Ketcher endpoints</h3>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>These routes are explicitly registered in the gateway Ketcher router in addition to the catch-all proxy:</p>
    <table className="port-table">
      <thead><tr><th>Method</th><th>Path</th><th>Purpose</th></tr></thead>
      <tbody>
        {[
          ['GET',  '/api/ketcher/info',         'Server info and available operations'],
          ['POST', '/api/ketcher/convert',       'Convert between molecule formats (SMILES, MOL, SDF, InChI)'],
          ['POST', '/api/ketcher/validate',      'Validate a structure'],
          ['POST', '/api/ketcher/generate3d',    'Generate a 3D conformer'],
          ['POST', '/api/ketcher/clean2d',       'Clean up 2D layout'],
          ['POST', '/api/ketcher/aromatize',     'Aromatize structure'],
          ['POST', '/api/ketcher/dearomatize',   'Dearomatize structure'],
          ['POST', '/api/ketcher/properties',    'Compute molecular properties'],
          ['POST', '/api/ketcher/sdf',           'Export as SDF'],
          ['POST', '/api/ketcher/ket-to-smiles', 'Convert KET format to SMILES'],
        ].map(([m, p, d]) => (
          <tr key={p}>
            <td><MethodBadge method={m} /></td>
            <td><code style={{ fontSize: 12 }}>{p}</code></td>
            <td style={{ fontSize: 13, color: 'var(--ink-2)' }}>{d}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const ServiceRoutesCoreSection = () => (
  <>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>
      Core routes are available in the open edition and map directly to gateway prefixes in
      <code> ligand-x/gateway/routers/proxy.py</code>. These routes are expected to be stable entry points
      for first-time users and automation clients.
    </p>
    <table className="port-table">
      <thead>
        <tr>
          <th>Route prefix</th>
          <th>Backed by</th>
          <th>Purpose</th>
          <th>Source of truth</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['/api/projects/*', 'Gateway projects router', 'Project, protein, molecule, pocket, and pose records', 'ligand-x/gateway/routers/projects.py'],
          ['/api/structure/*', 'Structure service', 'PDB fetch, parsing, scaffold operations', 'ligand-x/services/structure/routers.py'],
          ['/api/molecules/*', 'Structure service alias', 'Molecule CRUD and structure conversion alias', 'ligand-x/services/structure/routers.py'],
          ['/api/library/*', 'Structure service alias', 'Library-oriented molecule operations', 'ligand-x/gateway/routers/proxy.py'],
          ['/api/docking/*', 'Docking service', 'Receptor prep, docking, batch docking', 'ligand-x/services/docking/routers.py'],
          ['/api/md/*', 'MD service', 'Optimization, trajectory analysis, streaming execution', 'ligand-x/services/md/routers.py'],
          ['/api/alignment/*', 'Alignment service', 'Pairwise and multi-pose structural alignment', 'ligand-x/services/alignment/routers.py'],
          ['/api/ketcher/*', 'Ketcher service', 'Cheminformatics conversion and editing helpers', 'ligand-x/services/ketcher/routers.py'],
          ['/api/msa/*', 'MSA service', 'Sequence alignment generation and cache access', 'ligand-x/services/msa/routers.py'],
          ['/api/pocket-finder/*', 'Pocket finder service', 'Binding-site prediction', 'ligand-x/services/pocket_finder/routers.py'],
          ['/api/jobs/*', 'Gateway jobs router', 'Job submission, status, cancellation, recovery', 'ligand-x/gateway/routers/jobs.py'],
          ['/api/workflows/*', 'Gateway workflows router', 'Canvas graph orchestration', 'ligand-x/gateway/routers/workflows.py'],
        ].map(([prefix, service, purpose, source]) => (
          <tr key={prefix}>
            <td><code style={{ fontSize: 12 }}>{prefix}</code></td>
            <td>{service}</td>
            <td style={{ fontSize: 13, color: 'var(--ink-2)' }}>{purpose}</td>
            <td><code style={{ fontSize: 11 }}>{source}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const ServiceRoutesProSection = () => (
  <>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>
      Pro routes are entitlement-gated in the gateway via <code>entitlement_for_path()</code> from
      <code> ligand-x/lib/licensing/module_registry.py</code>. Requests to these prefixes return
      <code> 403 license_required</code> when the license does not include the required module.
    </p>
    <table className="port-table">
      <thead>
        <tr>
          <th>Route prefix</th>
          <th>Module entitlement</th>
          <th>Service</th>
          <th>Typical operations</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['/api/admet/*', 'admet', 'ADMET', 'Property prediction endpoints'],
          ['/api/qc/*', 'qc', 'Quantum chemistry', 'Jobs, files, normal modes, presets'],
          ['/api/boltz2/*', 'boltz2', 'Boltz-2', 'Predict, batch predict, validation'],
          ['/api/abfe/*', 'free-energy', 'ABFE', 'Async submissions, status, detailed analysis'],
          ['/api/rbfe/*', 'free-energy', 'RBFE', 'Network preview, submissions, diagnostics'],
          ['/api/reinvent/*', 'reinvent', 'REINVENT', 'Campaign submit/status/results/cancel'],
        ].map(([prefix, entitlement, service, operations]) => (
          <tr key={prefix}>
            <td><code style={{ fontSize: 12 }}>{prefix}</code></td>
            <td><code style={{ fontSize: 12 }}>{entitlement}</code></td>
            <td>{service}</td>
            <td style={{ fontSize: 13, color: 'var(--ink-2)' }}>{operations}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const GatewayProxyRulesSection = () => (
  <>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>
      Route handling order is intentional: explicit gateway routers are included first, then the catch-all
      proxy router. This keeps high-value paths stable and allows route-specific behavior (timeouts, SSE,
      auth exceptions) before generic forwarding.
    </p>
    <CodeBlock label="Routing order" copyText={`# ligand-x/gateway/main.py\napp.include_router(projects.router)\napp.include_router(md.router)\napp.include_router(ketcher.router)\napp.include_router(msa.router)\napp.include_router(jobs.router)\napp.include_router(jobs_websocket.router)\napp.include_router(workflows.router)\napp.include_router(proxy.router)  # fallback catch-all`}>
      <span style={{ color: '#c9d1d9' }}>{`# ligand-x/gateway/main.py
app.include_router(projects.router)
app.include_router(md.router)
app.include_router(ketcher.router)
app.include_router(msa.router)
app.include_router(jobs.router)
app.include_router(jobs_websocket.router)
app.include_router(workflows.router)
app.include_router(proxy.router)  # fallback catch-all`}</span>
    </CodeBlock>

    <CodeBlock label="Proxy prefix map" copyText={`# ligand-x/gateway/routers/proxy.py\nAPI_PREFIX_ROUTES = {\n  "api/md": "md",\n  "api/boltz2": "boltz2",\n  "api/qc": "qc",\n  "api/alignment": "alignment",\n  "api/ketcher": "ketcher",\n  "api/admet": "admet",\n  "api/docking": "docking",\n  "api/structure": "structure",\n  "api/molecules": "structure",\n  "api/library": "structure",\n  "api/abfe": "abfe",\n  "api/rbfe": "rbfe",\n  "api/pocket-finder": "pocket_finder",\n  "api/reinvent": "reinvent",\n}`}>
      <span style={{ color: '#c9d1d9' }}>{`# ligand-x/gateway/routers/proxy.py
API_PREFIX_ROUTES = {
  "api/md": "md",
  "api/boltz2": "boltz2",
  "api/qc": "qc",
  "api/alignment": "alignment",
  "api/ketcher": "ketcher",
  "api/admet": "admet",
  "api/docking": "docking",
  "api/structure": "structure",
  "api/molecules": "structure",
  "api/library": "structure",
  "api/abfe": "abfe",
  "api/rbfe": "rbfe",
  "api/pocket-finder": "pocket_finder",
  "api/reinvent": "reinvent",
}`}</span>
    </CodeBlock>

    <table className="port-table">
      <thead>
        <tr>
          <th>Behavior</th>
          <th>Where configured</th>
          <th>Current value</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['MD proxy timeout', 'ligand-x/gateway/routers/md.py', '3600 seconds'],
          ['MSA proxy timeout', 'ligand-x/gateway/routers/msa.py', '660 seconds'],
          ['Default service timeout', 'ligand-x/lib/common/timeouts.py', '300 seconds'],
          ['HTTP read timeout', 'ligand-x/lib/common/timeouts.py', '600 seconds'],
          ['Auth-exempt routes', 'ligand-x/gateway/main.py', '/, /health, /api/services/health, /api/auth/*, /api/license/status, /api/jobs/ws*'],
          ['License gating', 'ligand-x/lib/licensing/module_registry.py', 'Longest matching pro prefix wins'],
        ].map(([rule, source, value]) => (
          <tr key={rule}>
            <td>{rule}</td>
            <td><code style={{ fontSize: 11 }}>{source}</code></td>
            <td style={{ fontSize: 13, color: 'var(--ink-2)' }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

// ── Section registry ────────────────────────────────────────
const SECTION_COMPONENTS = {
  authentication: AuthenticationSection,
  health: HealthSection,
  projects: ProjectsSection,
  proteins: ProteinsSection,
  molecules: MoleculesSection,
  'library-folders': LibraryFoldersSection,
  poses: PosesSection,
  pockets: PocketsSection,
  jobs: JobsSection,
  websocket: WebSocketSection,
  workflows: WorkflowsSection,
  'service-routes': ServiceRoutesSection,
  'service-routes-core': ServiceRoutesCoreSection,
  'service-routes-pro': ServiceRoutesProSection,
  'gateway-proxy-rules': GatewayProxyRulesSection,
};

// ── Error response reference ─────────────────────────────────
const ErrorsSection = () => (
  <>
    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>
      All error responses follow one of two formats:
    </p>
    <CodeBlock label="Standard HTTP error" copyText={`{ "detail": "Error message" }`}>
      <span style={{ color: '#c9d1d9' }}>{`// Standard FastAPI / HTTP exception
{ "detail": "Project not found" }`}</span>
    </CodeBlock>
    <CodeBlock label="Custom error (jobs / projects)" copyText={`{ "error": "error_code", "detail": "…", "status_code": 400 }`}>
      <span style={{ color: '#c9d1d9' }}>{`{
  "error": "invalid_job_type",
  "detail": "Unknown job type: foobar",
  "status_code": 400
}`}</span>
    </CodeBlock>
    <table className="port-table" style={{ marginTop: 20 }}>
      <thead><tr><th>Status code</th><th>Meaning</th></tr></thead>
      <tbody>
        {[
          ['200', 'Success'],
          ['201', 'Created'],
          ['204', 'No Content (successful delete)'],
          ['400', 'Bad request — validation error'],
          ['401', 'Unauthorized — auth failed'],
          ['403', 'Forbidden — license check failed'],
          ['404', 'Not found'],
          ['409', 'Conflict — duplicate name or SMILES'],
          ['422', 'Unprocessable entity — Pydantic validation'],
          ['500', 'Internal server error'],
          ['502', 'Bad gateway — microservice error'],
          ['503', 'Service unavailable — database or broker down'],
          ['504', 'Gateway timeout'],
        ].map(([code, meaning]) => (
          <tr key={code}>
            <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{code}</span></td>
            <td style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>{meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

SECTION_COMPONENTS.errors = ErrorsSection;

const BASE_SECTION_META = Object.fromEntries(
  API_GROUPS.map((group) => [group.id, { title: group.title, desc: group.desc }])
);

const SECTION_META = {
  ...BASE_SECTION_META,
  errors: {
    title: "Error codes",
    desc: "Shared response envelopes and HTTP status semantics used across gateway and proxied services.",
  },
  "service-routes-core": {
    title: "Core service routes",
    desc: "Open-edition route families and where they are implemented.",
  },
  "service-routes-pro": {
    title: "Pro service routes",
    desc: "Entitlement-gated route families and their corresponding modules.",
  },
  "gateway-proxy-rules": {
    title: "Gateway proxy behavior",
    desc: "How routing precedence, aliasing, auth exemptions, and timeout policies are applied.",
  },
};

const API_PAGES = [
  {
    id: "api-basics",
    title: "API Basics",
    caption: "Auth, liveness, and shared errors",
    sections: ["authentication", "health", "errors"],
  },
  {
    id: "project-data",
    title: "Project Data Model",
    caption: "Projects, proteins, molecules, pockets, poses",
    sections: ["projects", "proteins", "molecules", "library-folders", "pockets", "poses"],
  },
  {
    id: "jobs-realtime",
    title: "Jobs & Real-Time",
    caption: "Submission, monitoring, workflows",
    sections: ["jobs", "websocket", "workflows"],
  },
  {
    id: "service-routes-overview",
    title: "Service Routes Overview",
    caption: "Gateway prefixes and endpoint families",
    sections: ["service-routes"],
  },
  {
    id: "service-routes-core",
    title: "Service Routes · Core",
    caption: "Open-edition routes and source mapping",
    sections: ["service-routes-core"],
  },
  {
    id: "service-routes-pro",
    title: "Service Routes · Pro",
    caption: "License-gated routes and modules",
    sections: ["service-routes-pro"],
  },
  {
    id: "gateway-routing-rules",
    title: "Gateway Routing Rules",
    caption: "Proxy precedence, aliases, timeout policy",
    sections: ["gateway-proxy-rules"],
  },
];

const NAV_GROUPS = [
  { title: "Reference pages", pages: ["api-basics", "project-data", "jobs-realtime"] },
  {
    title: "Service routes",
    pages: [
      "service-routes-overview",
      "service-routes-core",
      "service-routes-pro",
      "gateway-routing-rules",
    ],
  },
];

const ApiReferencePage = ({ onBack }) => {
  const [activePage, setActivePage] = React.useState(API_PAGES[0].id);
  const [activeSection, setActiveSection] = React.useState(API_PAGES[0].sections[0]);
  const sectionRefs = React.useRef({});

  const pageById = React.useMemo(
    () => Object.fromEntries(API_PAGES.map((page) => [page.id, page])),
    []
  );
  const currentPage = pageById[activePage] || API_PAGES[0];

  React.useEffect(() => {
    const firstSection = currentPage.sections[0];
    setActiveSection(firstSection);
  }, [activePage]);

  React.useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY + 120;
      let current = currentPage.sections[0];
      for (const sectionId of currentPage.sections) {
        const el = sectionRefs.current[sectionId];
        if (el && el.offsetTop <= top) current = sectionId;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage]);

  const switchPage = (pageId) => {
    const nextPage = pageById[pageId];
    if (!nextPage) return;
    setActivePage(pageId);
    setActiveSection(nextPage.sections[0]);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
  };

  return (
    <div className="page-fade">
      <section style={{ padding: "var(--sp-8) 0 var(--sp-5)", borderBottom: "1px solid var(--border)" }}>
        <div className="container-wide">
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", gap: 6,
              color: "var(--muted)", fontSize: 13, marginBottom: 16,
              fontFamily: "var(--font-mono)",
            }}
          >
            ← Docs
          </button>
          <div className="eyebrow"><span className="dot" />Reference · REST API</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "12px 0 12px", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 600 }}>
            REST API Reference
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 700, margin: 0 }}>
            Left navigation moves between reference pages. The right sidebar stays focused on section anchors for the current page.
            All requests target port <code>8000</code>, and authenticated routes require <code>X-API-Key</code>.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap", alignItems: "center" }}>
            <span className="tag">Base URL: http://localhost:8000</span>
            <span className="tag">Content-Type: application/json</span>
            <span className="tag">OpenAPI at /docs</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--sp-7) 0 var(--sp-9)" }}>
        <div className="container-wide">
          <div className="docs-layout">
            <aside className="docs-side">
              {NAV_GROUPS.map((group) => (
                <React.Fragment key={group.title}>
                  <h6>{group.title}</h6>
                  <ul>
                    {group.pages.map((pageId) => {
                      const page = pageById[pageId];
                      return (
                        <li key={page.id}>
                          <button
                            className={activePage === page.id ? "active" : ""}
                            onClick={() => switchPage(page.id)}
                            title={page.caption}
                          >
                            {page.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </React.Fragment>
              ))}
            </aside>

            <main className="docs-main">
              {currentPage.sections.map((sectionId, index) => {
                const section = SECTION_META[sectionId];
                const SectionComp = SECTION_COMPONENTS[sectionId];
                if (!section || !SectionComp) return null;
                return (
                  <div key={sectionId}>
                    <h2
                      id={sectionId}
                      ref={(r) => { sectionRefs.current[sectionId] = r; }}
                      style={index === 0 ? { marginTop: 0, paddingTop: 0, borderTop: "none" } : {}}
                    >
                      {section.title}
                    </h2>
                    <p>{section.desc}</p>
                    <SectionComp />
                  </div>
                );
              })}
            </main>

            <aside className="docs-toc">
              <h6>On this page</h6>
              <ul>
                {currentPage.sections.map((sectionId) => {
                  const section = SECTION_META[sectionId];
                  if (!section) return null;
                  return (
                    <li key={sectionId}>
                      <a
                        className={activeSection === sectionId ? "active" : ""}
                        onClick={() => scrollToSection(sectionId)}
                        style={{ cursor: "pointer" }}
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { ApiReferencePage });
