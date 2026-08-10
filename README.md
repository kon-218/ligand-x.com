# Ligand-X website

Standalone static microsite for `www.ligand-x.com`.

## Local preview

```bash
npm run dev
```

Open `http://127.0.0.1:8080/`.

The development server rebuilds the site and refreshes the browser whenever
`index.html`, `ligand-x-assets/`, or the build metadata changes. It uses only
Node.js, so there are no packages to install.

For a one-time production build and a preview without automatic refresh, run:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

The build emits crawlable HTML for the homepage, product pages, topic landings
(`/molecular-docking/`, `/molecular-dynamics/`, `/docking-to-md/`), docs guides,
and benchmarks, along with the sitemap, structured data, `robots.txt`, and the
GitHub Pages `404.html`. The React interface replaces the static page content
after JavaScript starts.

Copy for titles, descriptions, and landings lives in
`ligand-x-assets/copy.js`. Routes live in `ligand-x-assets/routes.js`. Guide
bodies live in `ligand-x-assets/guides.js`. Getting Started sub-pages live in
`ligand-x-assets/getting-started.js`. `scripts/build-site.js` reads these so
crawlers and the SPA stay aligned.

## Deployment

Pushes to `main` build the site into `dist/` and deploy that directory through
GitHub Pages using `.github/workflows/deploy.yml`. The custom domain is set by
`CNAME`.

After a production deployment that changes public pages, submit
`https://www.ligand-x.com/sitemap.xml` in Google Search Console and Bing
Webmaster Tools. For major changes, use URL Inspection to test the live
homepage and the three topic landings, then request indexing.

## Off-site SEO playbook

On-page landings only go so far for competitive head terms. Follow up outside
this repo:

1. **Search Console** — resubmit the sitemap after deploy; request indexing for
   `/molecular-docking/`, `/molecular-dynamics/`, `/docking-to-md/`, and
   `/docs/guides/docking/`.
2. **Launcher README** (`kon-218/ligand-x-launcher`) — lead with free docking +
   MD + docking-to-MD; link the three topic URLs above.
3. **Community answers** — reply to 5–10 high-intent Reddit / ResearchGate /
   Stack Exchange / Discord questions with honest comparisons and a link to
   `/docking-to-md/` (not spam).
4. **Citable artifact** — keep the Astex Vina/Vinardo benchmark current, or add
   a short docking→MD methods note researchers can cite.
5. **Directories** — list on relevant awesome-lists and university software
   catalogs where appropriate.
6. **Brand consistency** — keep `Ligand-X` / `Ligand X` / `LigandX` aligned
   (already in JSON-LD `alternateName`).
