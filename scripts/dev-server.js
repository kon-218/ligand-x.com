const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8080);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdb": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const liveReloadScript = `
  <script>
    (() => {
      const updates = new EventSource('/__live_reload');
      updates.addEventListener('reload', () => window.location.reload());
    })();
  </script>`;

const clients = new Set();
let rebuildTimer;
let rebuilding = false;
let rebuildQueued = false;

const build = () => {
  rebuilding = true;
  const result = spawnSync(process.execPath, [path.join(__dirname, "build-site.js")], {
    cwd: ROOT,
    stdio: "inherit",
  });
  rebuilding = false;

  if (result.status === 0) {
    for (const client of clients) client.write("event: reload\ndata: now\n\n");
    console.log("Changes built; refreshing connected browsers.");
  } else {
    console.error("Build failed; waiting for the next file change.");
  }

  if (rebuildQueued) {
    rebuildQueued = false;
    scheduleBuild();
  }
};

const scheduleBuild = () => {
  if (rebuilding) {
    rebuildQueued = true;
    return;
  }
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(build, 100);
};

const initialBuild = spawnSync(process.execPath, [path.join(__dirname, "build-site.js")], {
  cwd: ROOT,
  stdio: "inherit",
});

if (initialBuild.status !== 0) process.exit(initialBuild.status || 1);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || HOST}`);

  if (requestUrl.pathname === "/__live_reload") {
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });
    response.write("retry: 500\n\n");
    clients.add(response);
    request.on("close", () => clients.delete(response));
    return;
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  let filePath = path.resolve(DIST, relativePath || "index.html");
  if (filePath !== DIST && !filePath.startsWith(`${DIST}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(DIST, "404.html");
    response.statusCode = 404;
  }

  let body = fs.readFileSync(filePath);
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".html") {
    body = Buffer.from(body.toString("utf8").replace("</body>", `${liveReloadScript}\n</body>`));
  }

  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", mimeTypes[extension] || "application/octet-stream");
  response.setHeader("Content-Length", body.length);
  response.end(request.method === "HEAD" ? undefined : body);
});

const watchedFiles = ["index.html", "robots.txt", "CNAME", "scripts/build-site.js"];
for (const relativeFile of watchedFiles) {
  fs.watch(path.join(ROOT, relativeFile), scheduleBuild);
}
fs.watch(path.join(ROOT, "ligand-x-assets"), { recursive: true }, scheduleBuild);

server.listen(PORT, HOST, () => {
  console.log(`Live preview: http://${HOST}:${PORT}/`);
  console.log("Watching index.html, ligand-x-assets/, and build metadata for changes.");
});
