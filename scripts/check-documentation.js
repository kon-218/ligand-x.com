const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EXCLUDED_DIRECTORIES = new Set([".git", ".superpowers", "dist", "node_modules"]);
const AGENT_FILENAMES = new Set(["AGENTS.md", "CLAUDE.md"]);
const violations = [];

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(ROOT, absolute);

    if (entry.isDirectory()) {
      if (entry.name === "superpowers") {
        violations.push(`${relative}/ (agent planning directory)`);
      } else {
        visit(absolute);
      }
    } else if (AGENT_FILENAMES.has(entry.name)) {
      violations.push(`${relative} (agent instruction file)`);
    }
  }
}

visit(ROOT);

if (violations.length) {
  console.error("Agent-only documentation must not ship in the product website:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

// ------------------------------------------------------------
// Placeholder guard
// ------------------------------------------------------------
// The legal pages carry company identity that was not fully known when they
// were written. A half-filled privacy policy is worse than none, so an
// unresolved __PLACEHOLDER_* token fails the build unless it is listed here as
// a deliberate, tracked gap. Delete an entry once the real value lands in
// ligand-x-assets/company.js.
const KNOWN_GAPS = new Set([
  // No registered office address yet; companyAddressLine() renders an honest
  // "available on request" line instead of printing the token to visitors.
  "__PLACEHOLDER_REGISTERED_ADDRESS__",
]);

const PLACEHOLDER_PATTERN = /__PLACEHOLDER_[A-Z0-9_]+__/g;
const SCANNED_EXTENSIONS = new Set([".js", ".jsx", ".html", ".css"]);
const placeholderViolations = [];

function scanPlaceholders(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      scanPlaceholders(absolute);
      continue;
    }
    if (!SCANNED_EXTENSIONS.has(path.extname(entry.name))) continue;
    // check-documentation.js declares the known-gap tokens itself.
    if (absolute === __filename) continue;

    const matches = fs.readFileSync(absolute, "utf8").match(PLACEHOLDER_PATTERN) || [];
    for (const token of new Set(matches)) {
      if (KNOWN_GAPS.has(token)) continue;
      placeholderViolations.push(`${path.relative(ROOT, absolute)} — ${token}`);
    }
  }
}

scanPlaceholders(path.join(ROOT, "ligand-x-assets"));

if (placeholderViolations.length) {
  console.error("Unresolved placeholders must not ship (add to KNOWN_GAPS only if deliberate):");
  for (const violation of placeholderViolations) console.error(`- ${violation}`);
  process.exit(1);
}

if (KNOWN_GAPS.size) {
  console.log(
    `Documentation hygiene check passed (${KNOWN_GAPS.size} tracked placeholder gap${KNOWN_GAPS.size === 1 ? "" : "s"}: ${[...KNOWN_GAPS].join(", ")})`,
  );
} else {
  console.log("Documentation hygiene check passed");
}
