// ============================================================
// seo.js — client-side document title / meta sync for SPA navigations
// ============================================================

(function () {
  const ORIGIN = "https://www.ligand-x.com";

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  const applyPageSeo = ({ title, description, path }) => {
    if (!title || !description) return;
    const url = `${ORIGIN}${path || "/"}`;
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  };

  // Resolve SEO fields for a primary/landing route id from SITE_COPY.
  const seoForRoute = (routeId) => {
    const copy = typeof SITE_COPY !== "undefined" ? SITE_COPY : null;
    if (!copy) return null;
    if (copy[routeId] && copy[routeId].seo) {
      const block = copy[routeId];
      const route =
        typeof SITE_ROUTES !== "undefined"
          ? SITE_ROUTES.find((r) => r.id === routeId)
          : null;
      return {
        title: block.seo.title,
        description: block.seo.description,
        path: route ? route.path : "/",
      };
    }
    if (copy.landings && copy.landings[routeId]) {
      const block = copy.landings[routeId];
      return {
        title: block.seo.title,
        description: block.seo.description,
        path: block.path,
      };
    }
    return null;
  };

  const SEO_EXPORTS = { applyPageSeo, seoForRoute };

  if (typeof module !== "undefined" && module.exports) module.exports = SEO_EXPORTS;
  if (typeof window !== "undefined") Object.assign(window, SEO_EXPORTS);
})();
