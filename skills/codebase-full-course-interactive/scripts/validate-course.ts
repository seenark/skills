import { courseSchema } from "../schemas/course";
import { argValue, finding, readJson, report, writeOutput } from "./common";

const args = Bun.argv.slice(2), input = argValue(args, "--input") ?? args[0], output = argValue(args, "--output");
const findings = [];
if (!input) findings.push(finding("INPUT_MISSING", "Provide --input <course.json>."));
else try {
  const parsed = courseSchema.safeParse(readJson(input));
  if (!parsed.success) findings.push(finding("SCHEMA_INVALID", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "), "generation", input));
  else {
    const course = parsed.data;
    const chapters = new Set(course.chapters.map((c) => c.id));
    const lessons = new Map(course.lessons.map((l) => [l.id, l]));
    for (const chapter of course.chapters) for (const id of chapter.lessonIds) if (!lessons.has(id)) findings.push(finding("LESSON_MISSING", `Chapter ${chapter.id} references missing lesson ${id}.`, "generation", input, chapter.id));
    for (const lesson of course.lessons) {
      if (!chapters.has(lesson.chapterId)) findings.push(finding("CHAPTER_MISSING", `Lesson ${lesson.id} references missing chapter ${lesson.chapterId}.`, "generation", input, lesson.id));
      if (lesson.nextLessonId && !lessons.has(lesson.nextLessonId)) findings.push(finding("NEXT_LESSON_MISSING", `Lesson ${lesson.id} references missing next lesson ${lesson.nextLessonId}.`, "generation", input, lesson.id));
      for (const section of lesson.sections) for (const ref of section.sourceReferences) if (ref.startLine > ref.endLine) findings.push(finding("RANGE_INVALID", `Invalid source range in ${section.id}.`, "generation", input, section.id));
    }
  }
} catch (error) { findings.push(finding("READ_FAILED", error instanceof Error ? error.message : String(error))); }
const result = report(findings);
writeOutput(result, output); process.exitCode = result.status === "failed" ? 1 : 0;
