---
name: lesson-generator
description: Use when generating or quality-checking self-contained Obsidian Markdown lessons from a cloned repository or GitHub URL, especially when the user provides repo_path, language, depth, audience, pinned_version, check_chapters, or asks for lesson plans, course generation, chapter fixes, or acceptance-criteria validation.
---

# Lesson Generator

Generate pinned, self-contained Obsidian courses from a cloned repository or GitHub URL. The output is a complete markdown course package, not a partial scaffold. Do not reuse other course-state workflows.

## Mission

Lessons are self-contained books. The learner should be able to progress chapter by chapter without opening the source repo unless they choose to inspect it. Agents are only escalation teachers for blocked moments. Reduce future agent calls through source-backed explanations, checkpoints, self-checks, anti-patterns, and pre-answered failure modes.

## Inputs

Minimum contract:

```yaml
repo_path: string            # required; local path or GitHub URL
language: string             # default: th
depth: quick|standard|deep   # default: standard
audience: beginner|intermediate|advanced  # default: intermediate
pinned_version: string       # optional; for quality-check mode or explicit override when already pinned
check_chapters: string[]     # optional; quality-check mode only
```

Rules:
- `repo_path` is required.
- `language` controls prose only. Code, identifiers, filenames, URLs, and shell commands stay English.
- `depth=quick` targets 3-5 lessons.
- `depth=standard` targets 6-10 lessons.
- `depth=deep` targets 10+ lessons.
- `audience` adjusts pacing and prerequisite depth, not source accuracy.
- `pinned_version` and `check_chapters` are optional inputs for quality-check or stuck-learner support.

## Command Routing

| User command or prompt | Action |
|---|---|
| create/generate course with repo inputs | Run Phase 1 only. Explore repo, determine pinned version, draft the markdown lesson plan, then stop and wait for `go` or a plan-edit command. |
| `go` after a stored plan | Run Phase 2. Generate all chapters and supporting files from the approved plan. |
| `merge A,B` | Merge adjacent plan rows `A` and `B`. Recompute chapter IDs, prerequisites, and prev/next links before any generation. |
| `split N` | Split chapter `N` by real source-file responsibilities. Recompute chapter IDs, prerequisites, and prev/next links. |
| `skip N` | Remove chapter `N`. Recompute chapter IDs, prerequisites, and prev/next links. |
| `add <topic>` | Add one chapter only if `<topic>` maps to real discovered source files or repo-wide architecture. Otherwise explain that no source-backed chapter can be added. |
| quality-check prompt with `check_chapters` | Validate only the requested chapters against acceptance criteria. Report failures and exact fixes. Do not generate unrelated chapters. |
| stuck / escalation prompt | Inspect the referenced exercise files and answer against the pinned version. |

## Phase 1 — Explore And Plan

Perform these steps in order. Do not ask the user for facts the repository can reveal.

1. Resolve the repo.
   - If `repo_path` is a GitHub URL, clone it or reuse an existing local clone according to the active coding harness.
   - If `repo_path` is local, use it directly.
2. Read `package.json` first when present.
   - Extract `name`, `version`, `main`, `exports`, `dependencies`, `devDependencies`, and `scripts`.
3. Determine `pinned_version`.
   - First choice: `git tag --sort=-version:refname | head -1`.
   - If no tag exists, use `package.json.version`.
   - If neither exists, use the current commit SHA.
   - Never generate source links or install commands with `master`, `main`, `latest`, or an unpinned branch.
4. Map folder structure.
   - Prioritize `lib/`, `src/`, `core/`, `dist/`, `bin/`, tests, examples, docs, and documented entry points.
5. Find entry points.
   - Use `package.json.main`, `package.json.exports`, CLI `bin`, README usage snippets, and import/require roots.
6. Trace the dependency tree from entry points.
   - Prefer static imports/requires.
   - Group files by responsibility, not just by directory.
7. Extract core concepts from real files and functions.
   - Every lesson concept must map to at least one source file or repo-wide architecture responsibility.
8. Sort the lessons topologically.
   - Overview first.
   - Then prerequisite internals.
   - Then dependent concepts and integrations.
9. Large repo handling.
   - Propose module groups before detailed chapters when the repository is large.
   - Still do not ask the user to supply filenames, function names, pinned versions, or source responsibilities.

## Lesson Plan Output

Emit the plan in this exact shape:

1. Heading: `## 📋 Lesson Plan: {repo_name}`
2. Markdown table with columns:
   - `บท`
   - `หัวข้อ`
   - `Source Files (AI หาเอง)`
   - `ระดับ`
   - `เวลา`
   - `ต้องเรียนก่อน`
3. First row must be:
   - `00 | Overview & Architecture ⭐ | (ทั้ง repo)`
4. Include an ASCII dependency graph.
5. Include:
   - total chapter count
   - total time
   - module groups
6. End with this Thai confirmation command block:

```text
go
merge 3,4
split 2
skip 5
add {หัวข้อ}
```

Stop after presenting the plan unless the current user message already includes `go` for a previously proposed plan.

## Phase 2 — Generate Course After Confirmation

Run only after `go` or a plan edit has been applied and the plan is current.

1. Create `/course-{repo_name}/` in the current workspace or the explicitly requested output directory.
2. Create these root files:
   - `README.md`
   - `PREREQUISITES.md`
   - `COURSE_MAP.md`
3. Create `00-overview/lesson.md`.
4. Create one `NN-{topic-slug}/lesson.md` directory per approved plan row.
5. Create `exercises/` files inside a chapter only when runnable starter/solution files materially improve that chapter’s exercises.
   - The lesson must still remain self-contained.
6. Create:
   - `final-project/README.md`
   - `final-project/checkpoints/checkpoint-1.md`
   - `final-project/checkpoints/checkpoint-2.md`
7. Generate every lesson from the 15-section template in `docs/lesson-template.md`.

## Quality Gate

Before yielding any generated course or quality-check result, confirm all of the following:

- `pinned_version` comes from git tag, `package.json.version`, or commit SHA.
- No source links, install commands, or references use `master`, `main`, or `latest` as a version surrogate.
- Every generated `lesson.md` contains all 15 required sections in order.
- Lessons include both checkpoints.
- Exercise 1 includes predict-before-run and expected output.
- Exercise 2 and later include `diff` blocks with real `+` additions.
- Exercises and mini projects include self-check tables.
- Anti-pattern gallery includes four core sins, with extras moved into edge cases when needed.
- Time-boxes appear for every major section.
- Runnable mini-project setup exists.
- Escalation template exists.
- Explanations follow the requested prose language, while code stays English.
- Support docs exist.
- Folder structure matches the supporting-files contract.
- Quality-check mode reports failures plus exact fixes for only the requested chapters.

Do not claim completion without checking these items against the produced files.

## Common Mistakes

| Failure mode | Required correction |
|---|---|
| Asking the user for discoverable repo facts | Explore the repo and infer the answer from real files first. |
| Using `master`, `main`, or `latest` in links or install text | Replace with the pinned tag, package version, or commit SHA. |
| Generating the course before plan confirmation | Stop after the plan and wait for `go` or an edit command. |
| Adding a chapter with no source-file basis | Remove it or replace it with a source-backed concept. |
| Missing self-checks, checkpoints, or anti-patterns | Regenerate the affected lesson sections until all required teaching aids exist. |
| Writing code in Thai | Keep prose in the requested language, but keep code and inline code comments in English. |
| Writing lessons that require opening the repo to understand basics | Expand the lesson so it stands alone as a book chapter. |
| Skipping support files or final-project checkpoints | Generate the full folder contract, not just lessons. |

## References

- `docs/lesson-template.md`
- `docs/supporting-files.md`
- `docs/user-guide.md`
- `docs/gold-standard-checklist.md`
- `docs/pressure-scenarios.md`
