import { z } from "zod";

export const severitySchema = z.enum(["error", "warning", "info"]);
export const lifecycleGateSchema = z.enum(["research", "approval", "generation", "publication"]);

export const findingSchema = z.object({
  code: z.string().min(1),
  severity: severitySchema,
  gate: lifecycleGateSchema,
  message: z.string().min(1),
  artifactId: z.string().min(1).optional(),
  path: z.string().min(1).optional(),
  line: z.number().int().positive().optional(),
});

export const validatorReportSchema = z.object({
  schemaVersion: z.string().min(1),
  status: z.enum(["passed", "failed"]),
  generatedAt: z.string().datetime(),
  findings: z.array(findingSchema),
});

export const impactReportSchema = z.object({
  schemaVersion: z.string().min(1),
  fromCommit: z.string().regex(/^[0-9a-f]{40}$/),
  toCommit: z.string().regex(/^[0-9a-f]{40}$/),
  affected: z.array(z.object({ id: z.string().min(1), classification: z.enum(["unaffected", "verify", "regenerate", "invalid"]), reason: z.string().min(1) })),
  approvalInvalidated: z.boolean(),
});

export type Finding = z.infer<typeof findingSchema>;
export type ValidatorReport = z.infer<typeof validatorReportSchema>;
export type ImpactReport = z.infer<typeof impactReportSchema>;
