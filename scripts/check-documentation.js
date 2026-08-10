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

console.log("Documentation hygiene check passed");
