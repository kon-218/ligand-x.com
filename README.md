# Ligand-X website

Standalone static microsite for `www.ligand-x.com`.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Deployment

Pushes to `main` deploy through GitHub Pages using `.github/workflows/deploy.yml`.
The custom domain is set by `CNAME`.
