// ============================================================
// routes.js — SINGLE SOURCE OF TRUTH for site navigation
// ============================================================
//
// Keep the React router, the static crawler nav, and the build script aligned.
// If a page is added or renamed, update it here first.
//
// Wrapped in an IIFE: a top-level `const` in a classic script claims a name in
// the global lexical scope, which collides with same-named page constants. These
// files publish through window / module.exports only.

(function () {
  const SITE_ROUTES = [
    { id: "home", label: "Home", path: "/", primary: true },
    { id: "features", label: "Features", path: "/features/", primary: true },
    { id: "docs", label: "Docs", path: "/docs/", primary: true },
    { id: "pro", label: "Editions", path: "/pro/", primary: true },
    { id: "download", label: "Download", path: "/download/", primary: true },
    { id: "contact", label: "Request license", path: "/contact/", primary: false },
    // primary:false deliberately keeps legal out of the header and mobile menu;
    // it belongs in the footer. Sub-documents live under /legal/ and are
    // resolved by path prefix in app.jsx, the same way /docs/ is.
    { id: "legal", label: "Legal", path: "/legal/", primary: false },
    {
      id: "molecular-docking",
      label: "Molecular docking",
      path: "/molecular-docking/",
      primary: false,
      landing: true,
    },
    {
      id: "molecular-dynamics",
      label: "Molecular dynamics",
      path: "/molecular-dynamics/",
      primary: false,
      landing: true,
    },
    {
      id: "docking-to-md",
      label: "Docking to MD",
      path: "/docking-to-md/",
      primary: false,
      landing: true,
    },
  ];

  const routeFor = (id) => SITE_ROUTES.find((route) => route.id === id) || SITE_ROUTES[0];

  const ROUTE_EXPORTS = { SITE_ROUTES, routeFor };

  if (typeof module !== "undefined" && module.exports) module.exports = ROUTE_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, ROUTE_EXPORTS);
})();
