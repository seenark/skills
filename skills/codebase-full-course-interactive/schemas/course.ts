import { z } from "zod";
import { ownershipLabelSchema, sourceReferenceSchema } from "./source";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const nonEmpty = z.string().min(1);

export const engineManifestSchema = z.object({
  engineVersion: nonEmpty,
  templateRevision: nonEmpty,
  contentSchemaVersion: nonEmpty,
  supportedContentSchemaRange: nonEmpty,
  generatedBySkillVersion: nonEmpty,
});

export const repositoryReferenceSchema = z.object({
  owner: nonEmpty,
  name: nonEmpty,
  url: z.string().url(),
  commit: z.string().regex(/^[0-9a-f]{40}$/),
  generatedAt: z.string().datetime(),
});

const baseSection = z.object({ id, title: nonEmpty, sourceReferences: z.array(sourceReferenceSchema).default([]) });

export const conceptSectionSchema = baseSection.extend({ type: z.literal("concept"), body: nonEmpty });
export const problemSectionSchema = baseSection.extend({ type: z.literal("problem"), observableBehavior: nonEmpty, whyItMatters: nonEmpty });
export const predictionSectionSchema = baseSection.extend({ type: z.literal("prediction"), prompt: nonEmpty, options: z.array(nonEmpty).min(2), answer: z.number().int().nonnegative(), explanation: nonEmpty });
export const codeSectionSchema = baseSection.extend({ type: z.literal("code"), path: nonEmpty, language: nonEmpty, code: nonEmpty, startLine: z.number().int().positive(), endLine: z.number().int().positive(), focusedLines: z.array(z.number().int().positive()).default([]), annotations: z.array(z.object({ line: z.number().int().positive(), explanation: nonEmpty })).default([]) });
export const flowSectionSchema = baseSection.extend({ type: z.literal("flow"), steps: z.array(z.object({ id, label: nonEmpty, description: nonEmpty, sourceReferences: z.array(sourceReferenceSchema).default([]) })).min(1) });
export const sequenceSectionSchema = baseSection.extend({ type: z.literal("sequence"), actors: z.array(z.object({ id, label: nonEmpty, ownership: ownershipLabelSchema })).min(1), messages: z.array(z.object({ from: id, to: id, label: nonEmpty, step: z.number().int().positive() })).min(1) });
export const quizSectionSchema = baseSection.extend({ type: z.literal("quiz"), prompt: nonEmpty, options: z.array(z.object({ id, label: nonEmpty, correct: z.boolean(), explanation: nonEmpty })).min(2) });
export const investigationSectionSchema = baseSection.extend({ type: z.literal("investigation"), prompt: nonEmpty, files: z.array(nonEmpty).min(1), expectedFinding: nonEmpty });
export const labSectionSchema = baseSection.extend({ type: z.literal("lab"), goal: nonEmpty, context: nonEmpty, startingPoint: nonEmpty, instructions: z.array(nonEmpty).min(1), expectedResult: nonEmpty, verificationCommand: nonEmpty, commonFailures: z.array(nonEmpty).min(1), finishedReference: nonEmpty, sourceFiles: z.array(nonEmpty).min(1) });
export const takeawaySectionSchema = baseSection.extend({ type: z.literal("takeaway"), points: z.array(nonEmpty).min(1) });

export const lessonSectionSchema = z.discriminatedUnion("type", [conceptSectionSchema, problemSectionSchema, predictionSectionSchema, codeSectionSchema, flowSectionSchema, sequenceSectionSchema, quizSectionSchema, investigationSectionSchema, labSectionSchema, takeawaySectionSchema]);

export const lessonSchema = z.object({
  id,
  chapterId: id,
  title: nonEmpty,
  question: nonEmpty,
  estimatedMinutes: z.number().int().min(8).max(20),
  objectives: z.array(nonEmpty).min(1),
  prerequisites: z.array(id).default([]),
  sections: z.array(lessonSectionSchema).min(3),
  summary: z.array(nonEmpty).min(1),
  mentalModel: nonEmpty,
  nextLessonId: id.optional(),
});

export const chapterSchema = z.object({ id, title: nonEmpty, question: nonEmpty, description: nonEmpty, lessonIds: z.array(id).min(1) });

export const courseSchema = z.object({
  id,
  title: nonEmpty,
  description: nonEmpty,
  repository: repositoryReferenceSchema,
  engine: engineManifestSchema,
  chapters: z.array(chapterSchema).min(1),
  lessons: z.array(lessonSchema).min(1),
});

export type Course = z.infer<typeof courseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonSection = z.infer<typeof lessonSectionSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
