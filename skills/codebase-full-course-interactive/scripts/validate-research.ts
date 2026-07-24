import { researchBundleSchema } from "../schemas/research";
import { argValue, finding, readJson, report, writeOutput } from "./common";

const args = Bun.argv.slice(2);
const input = argValue(args, "--input") ?? args[0];
const output = argValue(args, "--output");
const findings = [];
if (!input) findings.push(finding("INPUT_MISSING", "Provide --input <research-bundle.json>."));
else {
  try {
    const parsed = researchBundleSchema.safeParse(readJson(input));
    if (!parsed.success) findings.push(finding("SCHEMA_INVALID", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "), "research", input));
    else {
      const bundle = parsed.data;
      if (bundle.status === "draft") findings.push({ ...finding("RESEARCH_DRAFT", "Research bundle is draft and cannot pass approval gate."), severity: "warning" as const, gate: "approval" as const });
      if (bundle.status === "missing") findings.push(finding("RESEARCH_MISSING", "Research bundle is marked missing."));
      if (bundle.blockingQuestionIds.length) findings.push(finding("BLOCKING_QUESTIONS", `${bundle.blockingQuestionIds.length} blocking research question(s) remain.`));
      if (bundle.sourceCommit !== bundle.repository.source.commit) findings.push(finding("SOURCE_COMMIT_MISMATCH", "sourceCommit does not match repository.source.commit."));
      if (bundle.sourceCommit !== bundle.attribution.commit) findings.push(finding("ATTRIBUTION_COMMIT_MISMATCH", "sourceCommit does not match attribution.commit."));
      for (const artifact of bundle.artifactInventory) if (artifact.required && !Bun.file(artifact.path).size) findings.push(finding("ARTIFACT_MISSING", `Required artifact is missing or empty: ${artifact.path}`, "research", artifact.path, artifact.id));
    }
  } catch (error) { findings.push(finding("READ_FAILED", error instanceof Error ? error.message : String(error))); }
}
const result = report(findings);
writeOutput(result, output);
process.exitCode = result.status === "failed" ? 1 : 0;
