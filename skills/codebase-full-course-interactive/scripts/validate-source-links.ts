import { sourceReferenceSchema } from "../schemas/source";
import { argValue, finding, readJson, report, sha256, writeOutput } from "./common";
const args = Bun.argv.slice(2), input = argValue(args, "--input") ?? args[0], sourceRoot = argValue(args, "--source-root", "."), output = argValue(args, "--output");
const findings = [];
async function walk(value: unknown, path = "root"): Promise<void> {
  if (Array.isArray(value)) { for (const [i, v] of value.entries()) await walk(v, `${path}[${i}]`); return; }
  if (!value || typeof value !== "object") return;
  const object = value as Record<string, unknown>;
  if ("repository" in object && "rangeHash" in object && "startLine" in object) {
    const parsed = sourceReferenceSchema.safeParse(object);
    if (!parsed.success) { findings.push(finding("REFERENCE_INVALID", `${path}: ${parsed.error.issues.map((i) => i.message).join(", ")}`, "generation", path)); return; }
    const ref = parsed.data, file = `${sourceRoot}/${ref.path}`.replace(/\/+/g, "/"), text = Bun.file(file);
    if (!text.size) { findings.push(finding("SOURCE_FILE_MISSING", `Referenced source file not found: ${ref.path}`, "generation", ref.path)); return; }
    const lines = (await text.text()).split(/\r?\n/);
    if (ref.endLine > lines.length) findings.push(finding("SOURCE_RANGE_OUT_OF_BOUNDS", `${ref.path}:${ref.startLine}-${ref.endLine} exceeds ${lines.length} lines.`, "generation", ref.path));
    else if (sha256(lines.slice(ref.startLine - 1, ref.endLine).join("\n")) !== ref.rangeHash) findings.push(finding("SOURCE_RANGE_HASH_MISMATCH", `Pinned range hash mismatch: ${ref.path}:${ref.startLine}-${ref.endLine}.`, "generation", ref.path));
  }
  for (const [k, v] of Object.entries(object)) await walk(v, `${path}.${k}`);
}
if (!input) findings.push(finding("INPUT_MISSING", "Provide --input <artifact.json>."));
else try { await walk(readJson(input)); } catch (error) { findings.push(finding("READ_FAILED", error instanceof Error ? error.message : String(error))); }
const result = report(findings); writeOutput(result, output); process.exitCode = result.status === "failed" ? 1 : 0;
