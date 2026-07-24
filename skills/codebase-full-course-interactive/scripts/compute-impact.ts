import { argValue, finding, fullCommit, readJson, writeOutput } from "./common";
import { impactReportSchema } from "../schemas/reports";
const args = Bun.argv.slice(2), input = argValue(args, "--input"), output = argValue(args, "--output");
const findings = [];
let result: unknown;
try {
  if (!input) throw new Error("Provide --input <impact.json> containing fromCommit, toCommit, and affected.");
  const data = readJson(input) as Record<string, unknown>;
  const parsed = impactReportSchema.safeParse({ schemaVersion: "1", approvalInvalidated: data.fromCommit !== data.toCommit, ...data });
  if (!parsed.success) { findings.push(finding("SCHEMA_INVALID", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "), "research", input)); result = { schemaVersion: "1", fromCommit: data.fromCommit ?? "0".repeat(40), toCommit: data.toCommit ?? "0".repeat(40), affected: [], approvalInvalidated: true }; }
  else result = parsed.data;
} catch (error) { findings.push(finding("READ_FAILED", error instanceof Error ? error.message : String(error))); result = { schemaVersion: "1", fromCommit: "0".repeat(40), toCommit: "0".repeat(40), affected: [], approvalInvalidated: true }; }
if (findings.length) { (result as Record<string, unknown>).findings = findings; process.exitCode = 1; }
writeOutput(result, output);
