// ============================================================
// getting-started.js — Getting Started sub-pages (shared by docs + build)
// ============================================================
//
// Loaded as a plain script before docs.jsx, and require()d by scripts/build-site.js.
// Keep responsibilities split:
//   requirements            → what you need before install
//   first-launch            → account, license, pull, Start, Open (everyday users)
//   configuration           → .env.production and launcher behaviour (technical)
//   first-configuration / custom-configuration → hubs for older URLs (hidden from nav)

(function () {
  const GETTING_STARTED_PAGES = [
    {
      id: "requirements",
      title: "Requirements",
      path: "/docs/requirements/",
      eyebrow: "Documentation · Getting started",
      time: "5 min",
      desc: "Hardware, Docker, GPU, disk, and network prerequisites for running Ligand-X on Windows, macOS, or Linux before you install.",
      seoTitle: "System requirements for Ligand-X — Docker, GPU, and disk",
      seoDescription:
        "Ligand-X system requirements: Docker Compose, RAM and disk, optional NVIDIA GPU, free ports, and platform notes for Windows, macOS, and Linux.",
      sections: [
        { id: "overview", title: "Overview" },
        { id: "hardware", title: "Hardware" },
        { id: "software", title: "Software" },
        { id: "gpu", title: "GPU" },
        { id: "disk", title: "Disk and downloads" },
        { id: "network", title: "Network and ports" },
        { id: "platforms", title: "Platform notes" },
        { id: "optional", title: "Optional Pro tools" },
        { id: "next", title: "Next steps" },
      ],
      overview: [
        "Check these prerequisites before you download the launcher or pull images. Ligand-X is self-hosted: it runs in Docker on hardware you control. A GPU is optional for the Core/Free workbench and required only for certain Pro modules.",
      ],
      hardwareRows: [
        ["OS", "Windows 10/11 (64-bit), macOS (Intel or Apple Silicon), or Linux", "Ubuntu 22.04+ or similar modern distro"],
        ["CPU", "4 cores / threads", "8+ cores for parallel docking or MD"],
        ["RAM", "16 GB", "32 GB+ when running GPU modules or large MD systems"],
        ["Disk (free)", "50 GB for a Core + Docking install", "100 GB+ if you pull MD or Pro images; trajectories need additional space"],
      ],
      software: [
        {
          title: "Docker",
          body: "Docker must be installed and running before you open the launcher. Use Docker Desktop on Windows and macOS, or Docker Engine on Linux. Compose v2 is required (bundled with Docker Desktop).",
          links: [
            { label: "Get Docker", href: "https://docs.docker.com/get-docker/" },
            { label: "Docker Desktop (Windows)", href: "https://docs.docker.com/desktop/setup/install/windows-install/" },
            { label: "Docker Desktop (macOS)", href: "https://docs.docker.com/desktop/setup/install/mac-install/" },
            { label: "Docker Engine (Linux)", href: "https://docs.docker.com/engine/install/" },
          ],
        },
        {
          title: "Linux docker group",
          body: "On Linux, your user should be in the docker group so the launcher can talk to the daemon without root: sudo usermod -aG docker $USER, then sign out and back in.",
        },
      ],
      gpuIntro:
        "A GPU is not required for protein prep, docking, or CPU MD. Only NVIDIA GPUs are supported for accelerated Pro modules.",
      gpuRows: [
        ["Not required", "Core, docking, structure tools, Ketcher, MSA/alignment, CPU MD"],
        ["Required", "Boltz-2 and Binding Free Energy (ABFE/RBFE)"],
        ["Optional acceleration", "MD short-GPU worker benefits from an NVIDIA GPU when available"],
      ],
      gpuPlatforms: [
        {
          title: "Linux",
          body: "Install the NVIDIA Container Toolkit and confirm docker run --rm --gpus all nvidia/cuda:12.0.0-base-ubuntu22.04 nvidia-smi works before selecting GPU modules.",
        },
        {
          title: "Windows",
          body: "Use Docker Desktop with the WSL 2 backend, enable GPU support for WSL 2, and install the NVIDIA Container Toolkit inside WSL as documented by NVIDIA.",
        },
        {
          title: "macOS",
          body: "NVIDIA GPU acceleration is not available. Core/Free modules run on CPU; GPU-only Pro modules will not run.",
        },
      ],
      diskIntro:
        "The figures below are the launcher's current compressed-download estimates, not installed sizes; some images expand to several times these values. Use the hardware recommendation above for capacity planning and leave additional space for structures, trajectories, and job outputs.",
      diskRows: [
        ["Core Services", "Free", "~5.5 GB", "Required for every install"],
        ["Molecular Docking", "Free", "~0.8 GB", "Default selection"],
        ["Molecular Dynamics", "Free", "~4.5 GB", "Default selection"],
        ["ADMET Prediction", "Pro", "~1.5 GB", "License entitlement: admet"],
        ["Binding Free Energy", "Pro", "~5.5 GB", "Needs NVIDIA GPU"],
        ["Quantum Chemistry", "Pro", "~3.0 GB", "Needs host ORCA install"],
        ["Boltz-2", "Pro", "~6.0 GB", "Needs NVIDIA GPU"],
        ["De Novo Design", "Pro", "~5.0 GB", "May need a separate model download"],
      ],
      networkIntro:
        "First install needs outbound HTTPS to download the signed runtime bundle and selected images from GitHub Releases and GHCR. After images are on disk, day-to-day work can stay local.",
      portRows: [
        ["8080", "APP_PORT", "Browser entry via reverse proxy (Open Ligand-X)"],
        ["3000", "FRONTEND_PORT", "Frontend container"],
        ["8000", "GATEWAY_PORT", "API gateway"],
        ["5555", "FLOWER_PORT", "Celery Flower"],
        ["15672", "RABBITMQ_MGMT_PORT", "RabbitMQ management UI"],
      ],
      portNote:
        "These are the five host ports published by the production Compose stack. If one is already taken, the launcher can move it on start. PostgreSQL, Redis, and RabbitMQ AMQP remain private to the Compose network and do not require free host ports.",
      platforms: [
        {
          title: "Windows",
          body: "The portable .exe needs no admin install. If SmartScreen warns, choose More info → Run anyway. Docker Desktop with WSL 2 must be running.",
        },
        {
          title: "macOS",
          body: "Open the DMG and drag the app to Applications. The build is not Apple Developer–signed: right-click → Open the first time, or allow it under Privacy & Security. Universal binary covers Intel and Apple Silicon (preview / lightly tested).",
        },
        {
          title: "Linux",
          body: "chmod +x the AppImage. Install FUSE if needed (e.g. libfuse2 on Ubuntu/Debian). Ensure the Docker daemon is running and your user is in the docker group.",
        },
      ],
      optional: [
        {
          title: "ORCA (Quantum Chemistry)",
          body: "Pro QC jobs expect an ORCA install on the host. The default mount path is /opt/orca; you will point ORCA_HOST_PATH at it under Configuration.",
        },
        {
          title: "License file",
          body: "Free edition needs no license. Academic and Pro licenses are signed files imported in the launcher. You can finish requirements and install Free first, then import a license later.",
        },
      ],
      tips: [
        "Confirm docker version and docker compose version before downloading Ligand-X — most first-run failures are Docker not running or missing group membership.",
        "For a first Free install, Core + Docking is enough to try the workbench; add MD when you have disk and RAM headroom.",
      ],
      seoSections: [
        [
          "Hardware and software",
          "Ligand-X needs Docker Compose v2, about 16 GB RAM minimum, and at least 50 GB free disk for a Core + Docking install. Ubuntu 22.04+, Windows with WSL 2, or macOS are supported.",
        ],
        [
          "GPU prerequisites",
          "A GPU is optional for free docking and structure workflows. Boltz-2 and binding free-energy modules require an NVIDIA GPU with the NVIDIA Container Toolkit; macOS cannot run those modules.",
        ],
        [
          "Disk and network",
          "Plan image download sizes from about 6 GB for Core alone to tens of gigabytes when MD and Pro modules are selected. First install needs HTTPS access to GitHub Releases and GHCR.",
        ],
        [
          "Ports",
          "The production stack publishes five host ports by default: 8080 for the app entry, plus 3000, 8000, 5555, and 15672. Database and broker traffic remains internal to Compose.",
        ],
      ],
    },
    {
      id: "first-launch",
      title: "First launch",
      path: "/docs/first-launch/",
      eyebrow: "Documentation · Getting started",
      time: "8 min",
      desc: "Open the Ligand-X launcher for the first time: create an account, choose a license and modules, download images, start services, and open the app.",
      seoTitle: "First launch — Ligand-X launcher setup",
      seoDescription:
        "First-time Ligand-X launcher setup: local account, license, module selection, Download & continue, Start services, and Open Ligand-X at localhost:8080.",
      sections: [
        { id: "overview", title: "Overview" },
        { id: "wizard", title: "First-run setup" },
        { id: "download", title: "Downloading images" },
        { id: "start", title: "Start and open" },
        { id: "files", title: "Where files live" },
        { id: "next", title: "Next steps" },
      ],
      overview: [
        "After Docker is ready and the launcher is installed, first run walks through local account, license, and module selection. The launcher installs the runtime if needed, writes secrets, pulls selected images, then lets you Start services and Open Ligand-X.",
        "For .env.production editing, port remapping behaviour, and worker tuning, use Configuration.",
      ],
      wizardSteps: [
        {
          title: "Account",
          body: "Create the local web UI username, optional email, and password (minimum 8 characters). Values are written to .env.production as LIGANDX_USERNAME and LIGANDX_PASSWORD. The default username suggestion is admin — you will use these credentials after Open Ligand-X.",
        },
        {
          title: "License",
          body: "Continue with Free, or import a signed Academic or Pro license. The launcher verifies the signature before unlocking Pro service groups. You can import a license later from the Free/edition badge without reinstalling.",
        },
        {
          title: "Services",
          body: "Choose which service groups to download. Core is always required. Docking and Molecular Dynamics are free and selected by default. Pro groups unlock only with the matching entitlement. See Requirements for download sizes and GPU needs before selecting heavy modules.",
        },
      ],
      pullSteps: [
        {
          title: "Install the runtime bundle (first run only)",
          body: "If runtime files are missing, the launcher downloads ligand-x-runtime.zip from the latest GitHub release, verifies the signed manifest, extracts into your runtime directory, and seeds .env.production from the template. Existing .env.production secrets are never overwritten.",
        },
        {
          title: "Generate production secrets",
          body: "Placeholder CHANGE_ME values are replaced with generated secrets for Postgres, RabbitMQ, Redis, Flower, QC, the internal worker callback secret, and related connection URLs.",
        },
        {
          title: "Save your local account",
          body: "The username and password from the Account step are written into .env.production and stored in the launcher config profile.",
        },
        {
          title: "Pull selected Docker images",
          body: "Click Download & continue (or Continue if images are already present). Only selected service groups are pulled from GHCR. Progress streams in the download log. GPU-required groups fail clearly if no NVIDIA GPU is detected — deselect them and retry.",
        },
        {
          title: "Ready to start",
          body: "When the download finishes, the launcher marks first-run complete, stores selectedGroups, and shows Ready to start. Images are installed; containers are not running yet.",
        },
      ],
      startSteps: [
        "Click Start services. The launcher resolves port conflicts if needed, fits CPU limits to your machine, brings selected Compose services up, and reconciles database credentials when volumes already exist.",
        "Wait until the status shows Ligand-X is running (services healthy).",
        "Click Open Ligand-X. The browser opens the reverse-proxy entry (APP_PORT, default 8080). Log in with the account you created in the Account step — do not bookmark localhost:3000.",
      ],
      filesIntro:
        "Runtime files live under the OS user config directory. You rarely need the absolute path for a normal first launch; use Settings in the launcher for worker concurrency and optional Pro paths.",
      filesPathRows: [
        ["Windows", "%AppData%\\ligandx-launcher\\runtime\\"],
        ["macOS", "~/Library/Application Support/ligandx-launcher/runtime/"],
        ["Linux", "~/.config/ligandx-launcher/runtime/"],
      ],
      tips: [
        "If Open Ligand-X fails, confirm Docker is still running and check the download or start error text in the launcher. Help opens the First launch docs.",
        "Need ports, secrets, or worker concurrency? Continue to Configuration rather than editing files blindly.",
      ],
      seoSections: [
        [
          "First-run setup",
          "On first launch the Ligand-X launcher walks through local account, license, and service selection. Free users continue without a license file; Academic and Pro licenses unlock entitled modules.",
        ],
        [
          "Downloading images",
          "Download & continue installs the signed runtime bundle if needed, generates production secrets, saves your UI credentials, pulls selected Docker images from GHCR, and stores module selection.",
        ],
        [
          "Start and Open Ligand-X",
          "After images are installed, Start services brings up the selected Compose services. Open Ligand-X opens the reverse-proxy entry (APP_PORT, default 8080) so you can log in with the account created earlier.",
        ],
        [
          "Runtime location",
          "Defaults are under the OS user config directory at ligandx-launcher/runtime on Windows, macOS, and Linux.",
        ],
      ],
    },
    {
      id: "configuration",
      title: "Configuration",
      path: "/docs/configuration/",
      eyebrow: "Documentation · Getting started",
      time: "12 min",
      desc: "Locate runtime files, edit .env.production, and understand what the launcher rewrites, preserves, or reconciles when you Start after customising.",
      seoTitle: "Configuration — Ligand-X .env.production and launcher behaviour",
      seoDescription:
        "Ligand-X configuration: find .env.production, edit ports and workers, and see what Start preserves, rewrites, or reconciles in the launcher.",
      sections: [
        { id: "overview", title: "Overview" },
        { id: "files", title: "Find your files" },
        { id: "customise", title: "Customise .env.production" },
        { id: "env-on-start", title: "Custom env on Start" },
        { id: "ports", title: "Ports and networking" },
        { id: "workers", title: "Workers and resources" },
        { id: "advanced", title: "Advanced options" },
        { id: "next", title: "Next steps" },
      ],
      overview: [
        "Use this page when you need to change production settings after first launch.",
        "Most day-to-day installs never need it — start with First launch, then come here for ports, secrets, concurrency, ORCA, or to understand launcher env behaviour. Launcher Settings covers worker concurrency and optional Pro paths; deeper .env edits are done on disk.",
      ],
      filesIntro:
        "All production customisation lives under the runtime project directory the launcher is using. By default that is the OS path below unless you set LIGANDX_RUNTIME_DIR.",
      filesUi: [
        {
          title: "Open the folder on disk",
          body: "Use the platform path table below, then open that folder in Finder, File Explorer, or your file manager. Edit .env.production with a text editor. Docker Compose reads only .env.production — not .env.production.txt.",
        },
        {
          title: "Launcher Settings",
          body: "In the launcher, Settings adjusts worker concurrency and optional integrations (ORCA path, Boltz MSA credentials). Restart services after saving for changes to take effect.",
        },
      ],
      filesPathsIntro:
        "By default the runtime is installed under your OS user config directory. Override the runtime location with LIGANDX_RUNTIME_DIR, or the launcher config directory with LIGANDX_LAUNCHER_CONFIG_DIR, before starting the app.",
      filesPathRows: [
        ["Windows", "%AppData%\\ligandx-launcher\\runtime\\", "Usually C:\\Users\\<you>\\AppData\\Roaming\\ligandx-launcher\\runtime\\"],
        ["macOS", "~/Library/Application Support/ligandx-launcher/runtime/", "Go's user config directory on macOS"],
        ["Linux", "~/.config/ligandx-launcher/runtime/", "Or $XDG_CONFIG_HOME/ligandx-launcher/runtime/"],
      ],
      filesImportant: [
        [".env.production", "Active production settings Compose reads on Start"],
        [".env.production.template", "Shipped template; do not edit this for day-to-day changes"],
        ["docker-compose.yml", "Service definitions for the runtime bundle"],
        ["data/license/ligandx-license.json", "Imported Academic/Pro license, if any"],
        ["../config.json", "Launcher preferences (selected modules, first-run flag, account profile) in the parent ligandx-launcher folder"],
      ],
      customiseIntro:
        "Most customisation lives in .env.production on disk under the runtime folder. Docker Compose reads only .env.production — not .env.production.txt. Do not duplicate a key; Compose uses the last definition.",
      envOnStartIntro:
        "Every Start (and any Compose call that loads .env.production) runs the launcher's ensureProductionEnv path. That does not mean your edits are wiped. The routine is mostly idempotent: it fills gaps, self-heals a few unsafe values, and leaves real customisations alone.",
      envOnStartPreserved:
        "These are written only when the current value is empty, still contains CHANGE_ME, or looks like an unresolved ${…} placeholder. Your real passwords, usernames, connection URLs, ORCA path, Boltz credentials, worker concurrency, and image pins stay as you set them.",
      envOnStartPreservedKeys: [
        "POSTGRES_PASSWORD, RABBITMQ_PASSWORD, REDIS_PASSWORD, FLOWER_PASSWORD, QC_SECRET_KEY, INTERNAL_WORKER_SECRET, LIGANDX_PASSWORD",
        "POSTGRES_USER, POSTGRES_DB, RABBITMQ_USER",
        "DATABASE_URL, CELERY_BROKER_URL, CELERY_RESULT_BACKEND, REDIS_URL",
        "VERSION (kept if it is already a concrete pin) and PRO_VERSION (seeded from the template only when missing)",
        "ORCA_HOST_PATH, Boltz MSA keys, LIGANDX_USERNAME, session timeouts, and other ordinary settings",
      ],
      envOnStartRewritten: [
        {
          title: "NEXT_PUBLIC_API_URL → empty",
          body: "Always rewritten to blank so the UI talks same-origin through the bundled reverse proxy. Do not put a hard-coded API URL here expecting it to stick.",
        },
        {
          title: "CORS_ORIGINS → derived from APP_PORT",
          body: "Always rewritten to http://localhost:<APP_PORT>,http://127.0.0.1:<APP_PORT> after port fitting. Custom CORS lists are not preserved across Start.",
        },
        {
          title: "Conflicting published ports",
          body: "Before Compose starts, fitPublishedPorts moves APP_PORT / GATEWAY_PORT / FRONTEND_PORT / FLOWER_PORT / RABBITMQ_MGMT_PORT to the next free port if something else holds them. Ports already bound by this stack's own containers are left alone so a restart does not walk every port up by one.",
        },
        {
          title: "Resource limits that exceed the host",
          body: "CPU and memory *_LIMIT / *_RES values that are above what Docker can create are lowered to fit the machine. Limits already within capacity are not raised. Celery concurrency knobs are only auto-fitted on the first fit for that CPU fingerprint — later Start calls leave your concurrency choices alone.",
        },
      ],
      envOnStartReconcile:
        "After production containers come up, the launcher reconciles Postgres and RabbitMQ data-volume passwords with the values currently in .env.production (via local admin paths that do not need the old password). Stateless services always read the file; those two databases remember first-boot secrets in their volumes. Reconciliation keeps them aligned if you change a password in .env.production or extract a fresh runtime over an existing volume.",
      envOnStartWarnings: [
        "Stray files such as .env.production.txt next to the real file are ignored — Docker only reads .env.production (common on Windows when Explorer hides extensions).",
        "Duplicate keys in .env.production: Compose uses the last definition. The launcher logs a warning; edits placed above a later duplicate do nothing.",
      ],
      customiseGroups: [
        {
          title: "Login and sessions",
          rows: [
            ["LIGANDX_USERNAME / LIGANDX_PASSWORD", "Web UI login (set by the wizard or edited here)."],
            ["LIGANDX_SESSION_LIFETIME_HOURS", "Absolute session lifetime (default 12)."],
            ["LIGANDX_SESSION_IDLE_MINUTES", "Idle timeout before re-login (default 30)."],
          ],
        },
        {
          title: "Images and editions",
          rows: [
            ["VERSION", "Pinned Core image tag. The launcher keeps this pinned on start/pull."],
            ["PRO_VERSION", "Pinned Pro image tag when Pro releases lag core."],
            ["LIGANDX_PRO_IMAGE_PREFIX", "Registry prefix for Pro images (default ghcr.io/kon-218/ligand-x-pro)."],
          ],
        },
        {
          title: "External tools (Pro)",
          rows: [
            ["ORCA_HOST_PATH", "Host path to ORCA, mounted read-only into QC containers (default /opt/orca)."],
            ["BOLTZ_MSA_USERNAME / BOLTZ_MSA_PASSWORD / MSA_API_KEY_VALUE", "Optional Boltz-2 MSA credentials."],
          ],
        },
      ],
      portsIntro:
        "Published host ports are configurable in .env.production. On every start the launcher checks for conflicts and, if needed, moves a port to the next free value and rewrites the file. CORS_ORIGINS and the Open buttons follow APP_PORT automatically. For which ports must be free before install, see Requirements.",
      portRows: [
        ["APP_PORT", "8080", "Reverse-proxy entry — open this in the browser"],
        ["FRONTEND_PORT", "3000", "Next.js frontend (usually via the proxy)"],
        ["GATEWAY_PORT", "8000", "API gateway"],
        ["FLOWER_PORT", "5555", "Celery Flower dashboard"],
        ["RABBITMQ_MGMT_PORT", "15672", "RabbitMQ management UI"],
      ],
      bindNote:
        "LIGANDX_BIND_ADDRESS defaults to 127.0.0.1 so the stack is local-only. Change it only if you intentionally expose services on another interface.",
      workersIntro:
        "Tune Celery pool sizes to your CPU/GPU after the first start. The launcher also lowers container CPU limits that exceed the Docker daemon's CPU count so a small machine can still boot.",
      workerRows: [
        ["CPU_WORKER_CONCURRENCY", "2", "Parallel CPU jobs (docking and similar)"],
        ["GPU_SHORT_CONCURRENCY", "2", "Short GPU queue (MD and related)"],
        ["GPU_LONG_CONCURRENCY", "1", "Long GPU queue (ABFE/RBFE)"],
        ["QC_WORKER_CONCURRENCY", "2", "Quantum chemistry workers"],
      ],
      advanced: [
        {
          title: "Custom runtime directory",
          body: "By default the runtime lives under your user config directory at ligandx-launcher/runtime. Set LIGANDX_RUNTIME_DIR to an absolute path before starting the launcher to relocate it.",
        },
        {
          title: "Change modules later",
          body: "Use Change services in the launcher to pull or adjust service groups. Locked Pro groups unlock after you import a license. Selection is saved in the launcher config and used on the next Start.",
        },
      ],
      tips: [
        "ensureProductionEnv only fills empty or CHANGE_ME secrets — it will not rotate a password you already set. If you change POSTGRES_PASSWORD or RABBITMQ_PASSWORD yourself, Start reconciles those values into the running database volumes.",
        "If a port was moved, use Open Ligand-X in the launcher rather than bookmarking localhost:3000; APP_PORT (default 8080) is the supported entry, and CORS_ORIGINS is rewritten to match it.",
        "After editing .env.production, restart the stack so app containers pick up the new values. Do not expect custom CORS_ORIGINS or NEXT_PUBLIC_API_URL to survive Start.",
      ],
      seoSections: [
        [
          "Where the files live",
          "Defaults are under the OS user config directory at ligandx-launcher/runtime, containing .env.production, docker-compose.yml, and optional license data. Launcher preferences live in config.json beside that runtime folder.",
        ],
        [
          "Edit .env.production",
          "Customise login, image pins, ORCA path, Boltz MSA credentials, ports, bind address, and worker concurrency on disk. Compose reads only .env.production. Launcher Settings covers concurrency and optional Pro paths.",
        ],
        [
          "Custom .env.production on Start",
          "Starting again does not wipe your edits. Secrets and most settings are only filled when still placeholders. The launcher always resets NEXT_PUBLIC_API_URL and CORS_ORIGINS, may move conflicting ports, may lower oversized resource limits, and reconciles Postgres/RabbitMQ volume passwords with .env.production.",
        ],
        [
          "Advanced options",
          "Relocate the runtime with LIGANDX_RUNTIME_DIR, or use Change services in the launcher to adjust modules after the first install.",
        ],
      ],
    },
    {
      id: "first-configuration",
      title: "First configuration",
      path: "/docs/first-configuration/",
      nav: false,
      kind: "hub",
      eyebrow: "Documentation · Getting started",
      time: "1 min",
      desc: "First-run setup is split into First launch for the wizard and Configuration for .env.production and advanced launcher behaviour.",
      seoTitle: "First configuration — Ligand-X setup guides",
      seoDescription:
        "Ligand-X first-run docs: follow First launch for the setup wizard, or Configuration for .env.production, ports, and launcher Start behaviour.",
      sections: [{ id: "overview", title: "Choose a guide" }],
      overview: [
        "The older single “First configuration” guide is now two pages so everyday first-run steps stay separate from technical env customisation.",
      ],
      hubCards: [
        {
          id: "first-launch",
          title: "First launch",
          desc: "Account, license, Download & continue, Start services, and Open Ligand-X.",
        },
        {
          id: "configuration",
          title: "Configuration",
          desc: "Find files, edit .env.production, and see what Start preserves or rewrites.",
        },
      ],
      seoSections: [
        [
          "First launch",
          "Use First launch for the Ligand-X launcher first-run flow and opening the app.",
        ],
        [
          "Configuration",
          "Use Configuration for .env.production, ports, worker concurrency, and launcher Start behaviour.",
        ],
      ],
    },
    {
      id: "custom-configuration",
      title: "Custom configuration",
      path: "/docs/custom-configuration/",
      nav: false,
      kind: "hub",
      eyebrow: "Documentation · Getting started",
      time: "1 min",
      desc: "This guide moved to Configuration.",
      seoTitle: "Custom configuration — moved to Configuration — Ligand-X",
      seoDescription:
        "The Custom configuration guide is now named Configuration. Find .env.production paths, ports, workers, and launcher Start behaviour there.",
      sections: [{ id: "overview", title: "Moved" }],
      overview: [
        "This page was renamed to Configuration. The content below is the same guide under the shorter name.",
      ],
      hubCards: [
        {
          id: "configuration",
          title: "Configuration",
          desc: "Find files, edit .env.production, and see what Start preserves or rewrites.",
        },
        {
          id: "first-launch",
          title: "First launch",
          desc: "Account, license, Download & continue, Start services, and Open Ligand-X.",
        },
      ],
      seoSections: [
        [
          "Configuration",
          "The Custom configuration guide now lives at /docs/configuration/.",
        ],
      ],
    },
  ];

  const EXPORTS = { GETTING_STARTED_PAGES };

  if (typeof module !== "undefined" && module.exports) module.exports = EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, EXPORTS);
})();
