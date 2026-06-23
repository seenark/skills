---
name: self-contained-obsidian-lessons
description: Generate self-contained Obsidian Markdown source-code lessons from a pinned repository version, including course folders, exercises, self-check tables, checkpoints, anti-patterns, and validation. Use when a user asks to create Obsidian lessons, source-code course chapters, Thai self-contained tutorials, or lesson.md files from repo_url/pinned_version/chapter/topic inputs.
---

# Self-Contained Obsidian Lessons

Generate a static `course-{repo_name}/` package from pinned source files. Keep `SKILL.md` short; use [REFERENCE.md](REFERENCE.md) and `templates/` as the normative contract.

## Trigger

Use this skill when the user provides or asks for `repo_url`, `pinned_version`, `chapter_number`, `topic`, `source_files`, `prerequisites`, `prev_chapter`, `next_chapter`, and `language`.

If any required input is missing, ask only for the missing field. Never infer `pinned_version` from `main`, `master`, tags you did not verify, or the default branch.

## Input contract

```yaml
repo_url: "https://github.com/{owner}/{repo}"
pinned_version: "commit-sha-or-tag"
chapter_number: 1
topic: "What this chapter teaches"
source_files:
  - path: "src/example.ts"
    lines: "10-42"
prerequisites:
  - "Required learner knowledge"
prev_chapter: "Chapter 0: ..."
next_chapter: "Chapter 2: ..."
language: "th"
```

`language: "th"` means Thai prose only. Keep code, commands, package names, API names, and runtime errors in English.

## Generation workflow

1. Parse `repo_url` into `repo_owner`, `repo_name`, and package name.
2. Require `pinned_version` and build source links as `https://github.com/{owner}/{repo}/blob/{pinned_version}/{file}#L{line}`.
3. Inspect only the pinned source files plus package metadata needed to identify the install command or package name.
4. Create `course-{repo_name}/` with support docs, a chapter folder, `lesson.md`, `exercises/`, and `final-project/checkpoints/`.
5. Generate the lesson from `templates/lesson.md` and keep the 15-section order from [REFERENCE.md](REFERENCE.md).
6. Generate runnable `ex1-starter.js`, `ex2-starter.js`, and `mini-project.js` for the chapter.
7. Run the validator and fix every failure before yielding.

Source links must never use `master`, `main`, or any unpinned branch.

## Quality gates before final response

- Run `node skills/self-contained-obsidian-lessons/scripts/validate-lesson.mjs <path-to-lesson.md>`.
- Run the chapter exercise commands listed in the generated lesson when runtime dependencies are available.
- Grep the generated course for `/master/` and `/main/` links and replace them with pinned links.

## Output summary

Final answer must list generated files, the pinned version used, validator output, and any exercise command output.
