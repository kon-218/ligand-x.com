# Ligand-X website

Standalone static microsite for `www.ligand-x.com`.

## Local preview

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Open `http://127.0.0.1:8080/`.

The build emits crawlable HTML for the homepage and each primary product page,
along with the sitemap, structured data, `robots.txt`, and the GitHub Pages
`404.html`. The existing React interface replaces the static page content after
JavaScript starts.

## Deployment

Pushes to `main` build the site into `dist/` and deploy that directory through
GitHub Pages using `.github/workflows/deploy.yml`. The custom domain is set by
`CNAME`.

After a production deployment that changes public pages, submit
`https://www.ligand-x.com/sitemap.xml` in Google Search Console and Bing
Webmaster Tools. For major changes, use URL Inspection to test the live
homepage and request indexing.
