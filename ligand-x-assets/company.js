// ============================================================
// company.js — SINGLE SOURCE OF TRUTH for legal entity identity
// ============================================================
//
// Ligand-X was incorporated as a New York corporation. Before that, the site
// attributed the product to an individual in four different places that had
// already drifted apart (React footer, pre-rendered static footer, schema.org
// author, Pro page copy). Everything that names the legal entity now reads from
// here so the next change is one edit, not four.
//
// Values marked __PLACEHOLDER_* are not yet known. scripts/check-documentation.js
// fails the build on any placeholder that is not listed in its KNOWN_GAPS set —
// so an unfilled value is a deliberate, visible decision rather than a silent
// deploy. Fill `address` and delete it from KNOWN_GAPS once the registered
// office is settled.
//
// Loaded as a plain script before the Babel-transpiled pages, and require()d by
// scripts/build-site.js — hence the dual export footer.

(function () {
  const COMPANY = {
    legalName: "Ligand-X Inc.",
    shortName: "Ligand-X",
    jurisdiction: "a New York corporation",
    jurisdictionShort: "New York, USA",
    address: "__PLACEHOLDER_REGISTERED_ADDRESS__",
    contactEmail: "support@ligand-x.com",
    website: "https://www.ligand-x.com",
    // Author credit stays accurate — authorship and ownership are different claims.
    founder: "Konstantin Nomerotski",
    founderUrl: "https://k-nom.com/",
    effectiveDate: "11 August 2026",
    copyrightYear: "2026",
    governingLaw: "State of New York, United States",
  };

  // Renders the registered address, or an honest interim line while it is unset.
  // Legal pages must never print the raw placeholder token to a visitor.
  const companyAddressLine = () =>
    COMPANY.address.startsWith("__PLACEHOLDER_")
      ? `${COMPANY.legalName}, ${COMPANY.jurisdiction}. Registered office address available on request at ${COMPANY.contactEmail}.`
      : `${COMPANY.legalName}, ${COMPANY.address}`;

  const COMPANY_EXPORTS = { COMPANY, companyAddressLine };

  if (typeof module !== "undefined" && module.exports) module.exports = COMPANY_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, COMPANY_EXPORTS);
})();
