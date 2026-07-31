// ============================================================
// routes.js — SINGLE SOURCE OF TRUTH for site navigation
// ============================================================
//
// Keep the React router, the static crawler nav, and the build script aligned.
// If a page is added or renamed, update it here first.

const SITE_ROUTES = [
  { id: "home", label: "Home", path: "/", primary: true },
  { id: "features", label: "Capabilities", path: "/features/", primary: true },
  { id: "docs", label: "Docs", path: "/docs/", primary: true },
  { id: "pro", label: "Editions", path: "/pro/", primary: true },
  { id: "download", label: "Download", path: "/download/", primary: true },
  { id: "contact", label: "Request license", path: "/contact/", primary: false },
];

const routeFor = (id) => SITE_ROUTES.find((route) => route.id === id) || SITE_ROUTES[0];

const ROUTE_EXPORTS = { SITE_ROUTES, routeFor };

if (typeof module !== "undefined" && module.exports) module.exports = ROUTE_EXPORTS;
if (typeof window !== "undefined") Object.assign(window, ROUTE_EXPORTS);
