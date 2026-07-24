import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Finding, ValidatorReport } from "../schemas/reports";
export function argValue(args: string[], name: string, fallback?: string): string | undefined { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; }
export function readJson(path: string): unknown { return JSON.parse(readFileSync(resolve(path), "utf8")); }
export function now(): string { return new Date().toISOString(); }
export function report(findings: Finding[], schemaVersion = "1"): ValidatorReport { return { schemaVersion, status: findings.some((f) => f.severity === "error") ? "failed" : "passed", generatedAt: now(), findings }; }
export function writeOutput(value: unknown, path?: string): void { const text = JSON.stringify(value, null, 2) + "\n"; if (path) Bun.write(resolve(path), text); else process.stdout.write(text); }
export function finding(code: string, message: string, gate: Finding["gate"] = "research", path?: string, artifactId?: string): Finding { return { code, severity: "error", gate, message, ...(path ? { path } : {}), ...(artifactId ? { artifactId } : {}) }; }
export function sha256(text: string): string { return createHash("sha256").update(text).digest("hex"); }
export function fullCommit(value: string): boolean { return /^[0-9a-f]{40}$/.test(value); }
export function pathExists(path: string): boolean { return existsSync(resolve(path)); }
