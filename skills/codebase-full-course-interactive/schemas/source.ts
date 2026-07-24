import { z } from "zod";

export const ownershipLabelSchema = z.enum([
  "UPSTREAM_CORE",
  "PROJECT_BUILT_IN",
  "PROJECT_EXTENSION",
  "OPTIONAL_PACKAGE",
  "USER_CONFIGURATION",
  "EXTERNAL_DEPENDENCY",
]);

export const licenseStatusSchema = z.enum([
  "resolved",
  "unknown",
  "unpublishable",
  "link-only",
]);

export const sourceTargetSchema = z.object({
  repositoryUrl: z.string().url(),
  browserUrl: z.string().url().nullable(),
  localPath: z.string().min(1),
  commit: z.string().regex(/^[0-9a-f]{40}$/),
  provider: z.enum(["github", "gitlab", "bitbucket", "generic", "local"]),
  pathPrefix: z.string().default(""),
  licenseStatus: licenseStatusSchema,
  licenseEvidence: z.string().min(1).nullable(),
});

export const sourceReferenceSchema = z.object({
  repository: z.string().url(),
  commit: z.string().regex(/^[0-9a-f]{40}$/),
  path: z.string().min(1),
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive(),
  symbolId: z.string().min(1).optional(),
  rangeHash: z.string().regex(/^[0-9a-f]{64}$/),
  ownership: ownershipLabelSchema,
});

export const attributionSchema = z.object({
  repositoryUrl: z.string().url(),
  browserUrl: z.string().url().nullable(),
  project: z.string().min(1),
  authors: z.array(z.string().min(1)),
  license: z.string().min(1),
  licenseEvidence: z.string().min(1),
  status: licenseStatusSchema,
  commit: z.string().regex(/^[0-9a-f]{40}$/),
  displayText: z.string().min(1),
});

export type OwnershipLabel = z.infer<typeof ownershipLabelSchema>;
export type SourceTarget = z.infer<typeof sourceTargetSchema>;
export type SourceReference = z.infer<typeof sourceReferenceSchema>;
export type Attribution = z.infer<typeof attributionSchema>;
