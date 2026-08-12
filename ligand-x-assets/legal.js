// ============================================================
// legal.js — Legal documents (shared by the React page + the build)
// ============================================================
//
// Loaded as a plain script before legal.jsx, and require()d by
// scripts/build-site.js. Same reason as copy.js: the React page and the
// pre-rendered crawlable HTML must never be able to state different terms for
// the same URL. There is exactly one copy of this text and both renderers read
// it.
//
// Every claim here was checked against the code, not assumed. In particular:
//   - the contact form posts to formsubmit.co (contact.jsx)
//   - the only browser storage is the ligandx-theme key (index.html)
//   - the desktop app verifies a signed license FILE offline
//     (ligand-x/lib/licensing/license.py) and sends no telemetry
//   - the hosted licensing service (machine binding + heartbeat) exists in
//     source but is deployed nowhere, so it is described as future, not live
// If any of those change, this file changes with them.

(function () {
  const { COMPANY, companyAddressLine } =
    typeof require === "function" ? require("./company.js") : window;

  const UPDATED = COMPANY.effectiveDate;

  const privacy = {
    id: "privacy",
    path: "/legal/privacy/",
    title: "Privacy Policy",
    eyebrow: "Legal · Privacy",
    updated: UPDATED,
    desc: `How ${COMPANY.legalName} handles personal data on this website and in the Ligand-X application.`,
    seoTitle: "Privacy Policy — Ligand-X",
    seoDescription:
      "How Ligand-X Inc. handles personal data: no analytics, no tracking cookies, no telemetry in the desktop application. Contact-form data only, with GDPR and California rights.",
    sections: [
      {
        id: "summary",
        title: "The short version",
        body: [
          "This website has no analytics, no advertising, no tracking pixels, and no tracking cookies. We do not build a profile of you, and we do not sell or share personal data.",
          "The only personal data we collect is what you type into the license request form. The Ligand-X application itself sends us nothing: your structures, jobs, and results stay on hardware you control.",
          "The sections below say the same thing precisely, and describe your rights.",
        ],
      },
      {
        id: "controller",
        title: "Who is responsible",
        body: [
          `${COMPANY.legalName} (“Ligand-X”, “we”, “us”) is ${COMPANY.jurisdiction} and is the controller of personal data described in this policy.`,
          companyAddressLine(),
          `For any privacy question or request, contact ${COMPANY.contactEmail}.`,
        ],
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        body: [
          "We collect personal data in one place only: the license request form at /contact/. When you submit it, we receive:",
        ],
        list: [
          "your first and last name",
          "your work email address",
          "your organization (lab, university, or company)",
          "the request type you selected",
          "anything you write in the message field",
        ],
        after: [
          "We also receive standard server logs from our hosting provider, which include IP addresses, as an unavoidable part of serving a web page. We do not use those logs to identify or profile visitors.",
          "If you email us directly, we hold that correspondence for as long as it takes to answer you and to keep a record of any licensing agreement.",
        ],
      },
      {
        id: "why-we-collect",
        title: "Why we are allowed to hold it",
        body: [
          "Under the EU and UK GDPR, we rely on the following lawful bases:",
        ],
        list: [
          "Steps taken at your request before entering into a contract (Art. 6(1)(b)) — where you ask us for an academic or commercial licence.",
          "Our legitimate interests (Art. 6(1)(f)) — answering general enquiries about the software, and keeping our own records of who we have licensed. We have weighed this against your interests; the data involved is business contact data you chose to send us.",
          "Compliance with a legal obligation (Art. 6(1)(c)) — where tax, accounting, or export-control rules require us to keep records of a transaction.",
        ],
        after: [
          "We do not rely on consent for any of the above, and we do not use your data for automated decision-making or profiling.",
        ],
      },
      {
        id: "recipients",
        title: "Who else sees it",
        body: [
          "We keep the list of third parties as short as we can. Today it is:",
        ],
        list: [
          "FormSubmit — delivers the license request form to our inbox. Your form contents pass through their servers (United States). We do not use their analytics or tracking features.",
          "Our email provider — receives and stores the resulting message.",
          "GitHub — hosts this website and the application downloads. GitHub records standard server and download logs, including IP addresses, under its own privacy statement.",
        ],
        after: [
          "That is the complete list. This site loads no fonts, scripts, or other assets from third-party servers, so simply reading these pages does not disclose your IP address to anyone but our host.",
          "We do not sell personal data, we do not share it for cross-context behavioural advertising, and we do not disclose it to anyone else except where the law requires it.",
        ],
      },
      {
        id: "no-tracking",
        title: "Cookies, storage, and tracking",
        body: [
          "This website sets no cookies of any kind.",
          "The only thing stored in your browser is a single localStorage entry, ligandx-theme, which remembers whether you chose light or dark mode. It is strictly functional, contains no identifier, is never transmitted to us, and disappears when you clear site data. Because it is strictly necessary to provide the feature you asked for, it does not require consent under the ePrivacy Directive or the UK PECR — which is why this site has no cookie banner. Its absence is deliberate, not an oversight.",
          "We run no analytics product, no heat-mapping, no session recording, no advertising or retargeting tags, and no social media pixels.",
        ],
      },
      {
        id: "application",
        title: "The Ligand-X application",
        body: [
          "Ligand-X is self-hosted software that runs on your own machine or infrastructure. This is the core of the product and it is also the core of its privacy posture.",
          "Your protein structures, compounds, projects, job inputs, calculation results, and trajectories are written to storage you control. They are never transmitted to us. We have no ability to read them, and there is no account system, no cloud sync, and no usage telemetry in the application.",
          "Licensed features are unlocked by a cryptographically signed licence file stored on your own machine and verified locally against a public key that ships with the software. Verification is entirely offline: running a licensed Ligand-X installation involves no contact with our servers.",
          "The application does make a small number of clearly bounded outbound connections, all to third parties rather than to us:",
        ],
        list: [
          "GitHub — to check for launcher updates and to download the runtime package.",
          "Container registries — to pull the software images your installation runs.",
          "Zenodo — only when you fetch a public dataset record through the application.",
          "Cloudflare — only if you deliberately enable the optional remote-access tunnel. Doing so exposes your installation over the network; consider carefully who can reach it.",
        ],
        after: [
          "Each of those parties will see your IP address in the course of serving the request, under their own privacy terms. None of them tells us anything about you.",
        ],
      },
      {
        id: "licensing-service",
        title: "Future licence activation service",
        body: [
          "We are building a hosted licence activation service. It is not in operation today: no version of Ligand-X currently contacts it, and no data has been collected through it.",
          "We are telling you about it now so the change is not a surprise. When it is activated, and only for installations that use it, it will process a machine identifier, hostname, and platform name to bind a licence to the machines it was issued for, together with periodic check-ins recording that the licence is still in use and which version is installed. The lawful basis will be performance of the licence contract, the purpose will be limited to licence enforcement and support, and the data will be deleted when the licence ends.",
          "We will update this policy and the effective date before that service processes any data, and we will not repurpose it for analytics.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep it",
        body: [
          "Licence enquiries that do not lead to an agreement: up to 24 months, so we can pick up a conversation you return to, then deleted.",
          "Records relating to an issued licence: for the life of the licence and for as long afterwards as tax, accounting, and export-control record-keeping rules require.",
          "Server and download logs: for the retention period of our hosting provider; we do not maintain our own copy.",
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        body: [
          "If the EU or UK GDPR applies to you, you have the right to ask us for a copy of your personal data, to correct it, to have it deleted, to restrict or object to how we use it, and to receive it in a portable format. Where we rely on legitimate interests, you can object and we will stop unless we have compelling grounds not to.",
          `Write to ${COMPANY.contactEmail} and we will respond within one month. We will not charge you or make you justify the request.`,
          "You also have the right to complain to your national data protection authority — in the UK, the Information Commissioner's Office. We would appreciate the chance to put things right first.",
        ],
      },
      {
        id: "transfers",
        title: "International transfers",
        body: [
          `${COMPANY.legalName} is based in ${COMPANY.jurisdictionShort}, and the service providers listed above are US-based. If you contact us from the EU, the UK, or elsewhere, your enquiry will be transferred to and stored in the United States.`,
          "Where such a transfer requires a safeguard under the GDPR, we rely on the European Commission's Standard Contractual Clauses (and the UK Addendum) with the providers concerned. You can ask us for details of the safeguards that apply.",
        ],
      },
      {
        id: "security",
        title: "Security",
        body: [
          "We apply administrative, technical, and physical safeguards appropriate to the small amount of personal data we hold, as required of a New York business under the SHIELD Act, including access control on the mailbox that receives licence requests and encryption in transit.",
          "No system is perfectly secure. If a breach affects your personal data we will notify you and the relevant authorities as the law requires.",
          `If you believe you have found a security problem in this website or in Ligand-X, please report it to ${COMPANY.contactEmail} before disclosing it publicly. We will not pursue good-faith security research.`,
        ],
      },
      {
        id: "children",
        title: "Children",
        body: [
          "Ligand-X is a professional and academic research tool. It is not directed at children, and we do not knowingly collect personal data from anyone under 16. If you believe a child has sent us personal data, contact us and we will delete it.",
        ],
      },
      {
        id: "california",
        title: "California and other US state rights",
        body: [
          "If you are a California resident, you may request access to, correction of, or deletion of the personal information we hold about you, and you may ask what categories we have collected and disclosed. The only category we collect is identifiers and professional information you provide in the licence request form, collected for the business purpose of responding to it.",
          "We have not sold personal information and have not shared it for cross-context behavioural advertising in the preceding twelve months, and we do not do so now. We will not discriminate against you for exercising any of these rights.",
          `Residents of other US states with comparable privacy laws may exercise equivalent rights. Use the same address: ${COMPANY.contactEmail}.`,
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          "If we change how we handle personal data, we will update this page and the effective date at the top. For a material change — in particular, activating the licence service described above — we will make the change clear rather than relying on you to re-read the page.",
        ],
      },
    ],
  };

  const terms = {
    id: "terms",
    path: "/legal/terms/",
    title: "Terms of Use",
    eyebrow: "Legal · Terms",
    updated: UPDATED,
    desc: `The terms on which ${COMPANY.legalName} provides this website and the Ligand-X software.`,
    seoTitle: "Terms of Use — Ligand-X",
    seoDescription:
      "Terms of use for the Ligand-X website and software from Ligand-X Inc., including the scientific-use disclaimer, warranty disclaimer, limitation of liability, and governing law.",
    sections: [
      {
        id: "acceptance",
        title: "Agreement to these terms",
        body: [
          `This website is operated by ${COMPANY.legalName}, ${COMPANY.jurisdiction}. By using it you agree to these terms. If you do not agree, please do not use the site.`,
          "These terms cover the website and the general relationship between us. Your right to run the Ligand-X software is governed separately by the licence that applies to it — see the Software Licence page — and, for Pro modules, by any written agreement we sign with you. Where a signed agreement and these terms conflict, the signed agreement wins.",
        ],
      },
      {
        id: "scientific-use",
        title: "Scientific use — read this one",
        body: [
          "Ligand-X produces computational predictions. Docking scores, poses, simulated trajectories, predicted properties, and calculated affinities are model outputs, not experimental measurements, and not statements of fact about any molecule.",
          "Every method the software implements has a domain of applicability and a documented error profile, and results depend heavily on structure preparation, parameter choices, sampling, and the system studied. You are responsible for judging whether a method is appropriate for your problem and for validating any result experimentally before relying on it.",
          "Ligand-X is not a medical device. It is not validated, certified, or intended for clinical diagnosis, treatment decisions, patient care, or for submission to any medicines or regulatory agency as evidence. Do not use it for those purposes.",
          "Benchmark figures published on this site describe the specific datasets and protocols named alongside them. They are not a guarantee of performance on your targets.",
        ],
      },
      {
        id: "website",
        title: "Website content",
        body: [
          "We work to keep the documentation, benchmarks, and capability descriptions on this site accurate and current, but we provide them for information only and they may become out of date or contain errors. Software behaviour is defined by the software you actually run, not by this website.",
          "The site, its text, design, and the Ligand-X name and marks belong to us or our licensors. You may quote and link to the material with attribution; you may not republish it as your own or use our marks in a way that suggests we endorse you.",
        ],
      },
      {
        id: "licensing",
        title: "Licences, quotes, and payment",
        body: [
          `${COMPANY.legalName} is the contracting party for every Ligand-X licence, academic or commercial.`,
          "Nothing on this site is a binding offer. Pricing is quoted per organization based on the modules, installations, and support you need; a quote becomes an agreement only when both sides sign one. Payment terms, licence duration, permitted installations, and support scope are set out in that agreement.",
          "Academic licences are issued at our discretion to individuals at recognised academic and non-profit research institutions, for non-commercial research. If your use becomes commercial, tell us and we will move you to the appropriate licence.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable use",
        body: ["When using this site or the software, you agree not to:"],
        list: [
          "circumvent, disable, or tamper with licence verification, or use Pro modules without a valid licence",
          "reverse engineer, decompile, or attempt to derive the source of compiled or proprietary components, except to the extent that law expressly permits it despite this restriction",
          "redistribute, resell, sublicense, or host the software as a service to third parties without a written agreement permitting it",
          "use the site or software to break the law, infringe anyone's rights, or attempt to gain unauthorised access to systems",
          "misrepresent the origin of results, or present Ligand-X output as experimental data",
        ],
      },
      {
        id: "third-party",
        title: "Third-party components and links",
        body: [
          "Ligand-X incorporates third-party scientific software under its own licences, listed on the Software Licence page. Those components carry their own terms and their own warranty disclaimers, and we are not responsible for them.",
          "This site links to external resources, including GitHub, scientific databases, and published literature. We do not control them and are not responsible for their content or their privacy practices.",
        ],
      },
      {
        id: "warranty",
        title: "Disclaimer of warranties",
        body: [
          "To the fullest extent permitted by law, this website and the Ligand-X software are provided “as is” and “as available”, without warranties of any kind, whether express, implied, or statutory — including any implied warranty of merchantability, fitness for a particular purpose, accuracy, or non-infringement.",
          "We do not warrant that the software will be uninterrupted or error-free, that results will be accurate or reliable, or that any defect will be corrected.",
          "Some jurisdictions do not allow the exclusion of certain warranties. Where that is the case, the exclusions above apply only as far as the law allows, and nothing here affects consumer rights that cannot be waived.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        body: [
          "To the fullest extent permitted by law, neither Ligand-X Inc. nor its directors, employees, or suppliers will be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, lost research time, wasted experimental cost, or business interruption, arising out of or relating to the website or the software, whether in contract, tort, or otherwise, and even if we have been advised that such damages are possible.",
          "Our total aggregate liability arising out of or relating to the website or the software will not exceed the greater of the amounts you paid us in the twelve months before the claim arose, or one hundred US dollars.",
          "Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by negligence, or for fraud.",
        ],
      },
      {
        id: "indemnity",
        title: "Indemnity",
        body: [
          "You agree to indemnify and hold us harmless against claims, losses, and reasonable legal costs arising from your use of the website or software in breach of these terms or of applicable law, or from any decision you take on the basis of results the software produced.",
        ],
      },
      {
        id: "export",
        title: "Export control and sanctions",
        body: [
          "Ligand-X is distributed from the United States and is subject to US export control and sanctions law, as well as the law of the country you are in. You confirm that you are not located in, and are not a national of or controlled by, a country or party subject to US embargo or restricted-party designation, and that you will not export, re-export, or make the software available in breach of those rules.",
        ],
      },
      {
        id: "termination",
        title: "Suspension and termination",
        body: [
          "We may suspend or withdraw access to this website at any time, and may terminate a licence in accordance with the agreement governing it. The sections on scientific use, warranties, liability, indemnity, export control, and governing law survive termination.",
        ],
      },
      {
        id: "governing-law",
        title: "Governing law and disputes",
        body: [
          `These terms are governed by the laws of the ${COMPANY.governingLaw}, without regard to its conflict-of-laws rules. The state and federal courts located in New York will have exclusive jurisdiction, and you consent to that jurisdiction and venue.`,
          "If you are a consumer resident in the EU or UK, this does not deprive you of the protection of mandatory provisions of your local law or of your right to bring proceedings in your local courts.",
          "If any provision of these terms is held unenforceable, the rest remains in force.",
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        body: [
          "We may update these terms. The effective date at the top of this page shows when they last changed, and continuing to use the site after a change means you accept the updated terms. Changes do not retroactively alter a signed licence agreement.",
        ],
      },
    ],
  };

  const license = {
    id: "license",
    path: "/legal/license/",
    title: "Software Licence",
    eyebrow: "Legal · Licensing",
    updated: UPDATED,
    desc: "Which parts of Ligand-X are free, what noncommercial means in practice, and how Pro and academic licences work.",
    seoTitle: "Software Licence — Ligand-X core, Pro, and academic licensing",
    seoDescription:
      "How Ligand-X is licensed: the core platform and launcher under PolyForm Noncommercial 1.0.0, proprietary Pro modules from Ligand-X Inc., free academic licences, and third-party component licences.",
    sections: [
      {
        id: "overview",
        title: "Two licences, one product",
        body: [
          "Ligand-X ships as a free core platform with optional Pro modules. They are licensed differently, and this page explains which is which in plain terms. The licence texts themselves are authoritative; this page is a guide to them, not a substitute.",
          `All Ligand-X licences are granted by ${COMPANY.legalName}.`,
        ],
      },
      {
        id: "core",
        title: "Core platform and launcher",
        body: [
          "The Ligand-X core platform and the desktop launcher are licensed under the PolyForm Noncommercial License 1.0.0. That covers structure preparation, pocket finding, molecular docking, molecular dynamics, alignment, and the workbench itself.",
          "Under that licence you may use, copy, modify, and share the software freely for any noncommercial purpose, provided you keep the licence and attribution notices intact.",
          "The full licence text ships with the software and is published at polyformproject.org.",
        ],
      },
      {
        id: "noncommercial",
        title: "What “noncommercial” actually means",
        body: [
          "This is the part worth being clear about, because “free” on its own is ambiguous.",
          "Noncommercial means use that is not primarily intended for or directed toward commercial advantage. Academic research, teaching, personal study, and evaluation are covered. Using Ligand-X as part of the work of a for-profit company — including drug discovery programmes, contract research, and consulting deliverables — is not.",
          `If your use is commercial, the core platform needs a commercial licence too. Tell us what you are doing and we will sort out the right agreement: ${COMPANY.contactEmail}.`,
        ],
      },
      {
        id: "pro",
        title: "Pro modules",
        body: [
          "The Pro modules — including ADMET, quantum chemistry, structure and affinity prediction, absolute and relative binding free energy, reaction kinetics, QM/MM, and generative design — are proprietary software owned by Ligand-X Inc.",
          "They are distributed as private container images and are not open source. No licence to use, copy, modify, or distribute them is granted except under a valid Ligand-X licence or a separate written agreement. Access to the private image registry is part of that licence.",
        ],
      },
      {
        id: "academic",
        title: "Academic licences",
        body: [
          "Academic licences include every Pro module, free of charge. They are not a reduced tier and not a time-limited trial.",
          "They are issued to individuals at recognised academic and non-profit research institutions for noncommercial research and teaching, and they carry the same obligations as any other licence: no redistribution, no sublicensing, and no commercial use. Industry-funded work at an academic institution may still be commercial — if you are unsure, ask us.",
        ],
      },
      {
        id: "verification",
        title: "How licence verification works",
        body: [
          "Licensed features are unlocked by a signed licence file placed on your own machine, which the software verifies locally against a public key it ships with. Verification is offline: your installation does not contact us to run.",
          "That design is deliberate. It keeps installations working on air-gapped and restricted networks, and it means running Ligand-X discloses nothing about your work to us. Do not share your licence file — it is issued to you and its terms bind you.",
        ],
      },
      {
        id: "third-party",
        title: "Third-party scientific components",
        body: [
          "Ligand-X builds on open scientific software, which remains under its own licences and copyright. Those licences continue to apply to those components, and nothing in a Ligand-X licence overrides them. The principal ones:",
        ],
        list: [
          "AutoDock Vina (Apache-2.0) — molecular docking",
          "OpenMM (LGPL-3.0-or-later) — molecular dynamics",
          "RDKit (BSD-3-Clause) — cheminformatics",
          "Open Force Field toolkit (MIT; force-field data CC-BY-4.0) — parameterisation",
          "OpenFE, gufe, kartograf (MIT) — binding free energy",
          "MDAnalysis and MDTraj (LGPL) — trajectory analysis",
          "PLIP (GPL-2.0) and ProLIF (Apache-2.0) — interaction profiling",
          "fpocket and p2rank (MIT) — binding-site detection",
          "Open Babel (GPL-2.0) — chemical file conversion",
          "PyMOL open source (Schrödinger open-source licence) and Mol* (MIT) — visualisation",
          "Ketcher (Apache-2.0) — structure editing",
          "PyTorch (BSD-3-Clause), Boltz-2 (MIT), ADMET-AI (MIT), REINVENT4 (Apache-2.0) — model-based Pro modules",
          "PySCF (Apache-2.0), xtb (LGPL-3.0), ASH (GPL-2.0), AmberTools (GPL-3.0 and others) — quantum chemistry and QM/MM",
          "NVIDIA CUDA runtime, cuDNN, and related GPU libraries (NVIDIA terms) — GPU-accelerated modules",
        ],
        after: [
          "A complete component-by-component list, including transitive dependencies, ships inside each image as /app/THIRD_PARTY_NOTICES.md and with the launcher as a GitHub release asset. It can be regenerated from any released image.",
          "Some of these components are licensed under the GNU GPL or LGPL. As required by those licences, Ligand-X Inc. will supply the complete corresponding source code for them to any recipient of an image containing them, for three years from the date of distribution. Write to support@ligand-x.com. We redistribute them unmodified.",
          "NVIDIA components remain under NVIDIA's licence agreements. Ligand-X does not sublicense them except as those agreements allow.",
        ],
      },
      {
        id: "bring-your-own",
        title: "Software you supply yourself",
        body: [
          "Two scientific engines are not redistributed with Ligand-X, because their own licences do not permit it. Ligand-X integrates with them; you license and install them yourself, and Ligand-X mounts them from a path you provide.",
        ],
        list: [
          "ORCA (FAccTs GmbH) — quantum chemistry. Free for academic use under FAccTs' terms; commercial use requires a licence from FAccTs.",
          "NAMD (University of Illinois) — optional, used only for kinetics pre-seeding. Free for academic, research and internal business use; commercial use requires a licence from Illinois. Without it, kinetics uses RAMD pre-seeding instead, which needs nothing external.",
        ],
        after: [
          "Where a module you are licensing depends on software you have to supply, we will tell you before you buy, not after.",
        ],
      },
      {
        id: "request",
        title: "Requesting a licence",
        body: [
          "Academic and commercial licences are both requested through the licence request form. Tell us the modules you need, your deployment target, and your timeline, and we will come back with a scope.",
        ],
      },
    ],
  };

  const LEGAL_PAGES = [privacy, terms, license];

  // The /legal/ hub lists the documents; kept here so the index and the pages
  // cannot drift apart.
  const LEGAL_INDEX = LEGAL_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    desc: page.desc,
  }));

  const LEGAL_EXPORTS = { LEGAL_PAGES, LEGAL_INDEX };

  if (typeof module !== "undefined" && module.exports) module.exports = LEGAL_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, LEGAL_EXPORTS);
})();
