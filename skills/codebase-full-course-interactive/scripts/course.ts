const command = Bun.argv[2];
const scripts: Record<string, string> = {
  "research:validate": "validate-research.ts",
  "generate:validate": "validate-course.ts",
  "source:validate": "validate-source-links.ts",
  "update:impact": "compute-impact.ts",
};
if (!command || command === "--help" || command === "help") {
  console.log("Usage: bun run course <command> [options]\n\nCommands:\n  research:validate   Validate research bundle\n  generate:validate   Validate structured course\n  source:validate     Verify source references and range hashes\n  update:impact       Emit deterministic impact report");
  process.exit(0);
}
const target = scripts[command];
if (!target) { console.error(`Unknown command: ${command}`); process.exit(2); }
const proc = Bun.spawn(["bun", "run", new URL(target, import.meta.url).pathname, ...Bun.argv.slice(3)], { stdout: "inherit", stderr: "inherit" });
process.exit(await proc.exited);
