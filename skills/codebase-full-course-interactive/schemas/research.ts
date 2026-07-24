import { z } from "zod";
import { attributionSchema, ownershipLabelSchema, sourceReferenceSchema, sourceTargetSchema } from "./source";

export const researchStatusSchema = z.enum(["missing", "draft", "validated", "approved"]);

export const repositoryMetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  source: sourceTargetSchema,
  generatedAt: z.string().datetime(),
  packageManager: z.enum(["bun", "npm", "pnpm", "yarn", "unknown"]),
  languages: z.array(z.string().min(1)),
  workspaces: z.array(z.string().min(1)),
  entryPoints: z.array(z.string().min(1)),
});

export const symbolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(["function", "class", "method", "interface", "type", "constant", "module"]),
  path: z.string().min(1),
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive(),
  ownership: ownershipLabelSchema,
});

export const traceStepSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().positive(),
  action: z.string().min(1),
  data: z.string().min(1),
  stateChange: z.string().min(1),
  symbolId: z.string().min(1),
  source: sourceReferenceSchema,
  branch: z.string().min(1).optional(),
  errorPath: z.string().min(1).optional(),
});

export const executionTraceSchema = z.object({
  id: z.string().min(1),
  scenario: z.string().min(1),
  observableResult: z.string().min(1),
  entryPoint: sourceReferenceSchema,
  steps: z.array(traceStepSchema).min(1),
  finalResult: z.string().min(1),
});

export const researchArtifactSchema = z.object({
  id: z.string().min(1),
  path: z.string().min(1),
  sha256: z.string().regex(/^[0-9a-f]{64}$/),
  required: z.boolean(),
});

export const researchBundleSchema = z.object({
  bundleId: z.string().min(1),
  schemaVersion: z.string().min(1),
  sourceCommit: z.string().regex(/^[0-9a-f]{40}$/),
  status: researchStatusSchema,
  artifactInventory: z.array(researchArtifactSchema),
  blockingQuestionIds: z.array(z.string().min(1)),
  repository: repositoryMetadataSchema,
  attribution: attributionSchema,
  symbols: z.array(symbolSchema),
  traces: z.array(executionTraceSchema),
});

export const approvalSchema = z.object({
  bundleId: z.string().min(1),
  bundleDigest: z.string().regex(/^[0-9a-f]{64}$/),
  sourceCommit: z.string().regex(/^[0-9a-f]{40}$/),
  researchSchemaVersion: z.string().min(1),
  approver: z.string().min(1),
  approvedAt: z.string().datetime(),
  blockingQuestionCount: z.number().int().nonnegative(),
});

export type ResearchBundle = z.infer<typeof researchBundleSchema>;
export type ExecutionTrace = z.infer<typeof executionTraceSchema>;
export type TraceStep = z.infer<typeof traceStepSchema>;
export type SymbolRecord = z.infer<typeof symbolSchema>;
export type Approval = z.infer<typeof approvalSchema>;
