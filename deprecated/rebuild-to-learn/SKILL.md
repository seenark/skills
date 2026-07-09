---
name: rebuild-to-learn
description: Use when a user provides a GitHub repo or local codebase and wants a stateful, course-like learning path to deeply understand architecture, execution flows, source code, or contribution points by building simplified versions first.
---

# Rebuild To Learn

Turn a repository into a stateful apprenticeship course. The learner rebuilds tiny versions of core mechanisms before reading production code.

Core principle: build the small thing first, prove understanding, then compare with the real implementation.

## Required State

Store durable course state in the target repo under `.learning/`. Never rely on chat memory for course position, learner profile, storage preferences, or completion evidence.

Required repo-local state:

```txt
.learning/
  MISSION.md
  LEARNER-PROFILE.md
  REPO-INTAKE.md
  COURSE.md
  PROGRESS.md
  SESSION-SUMMARY.md
  learning-records/
```

Configurable lesson/lab content location:

- Default: store lesson and lab markdown in the target repo under `.learning/lessons/` and `.learning/labs/`.
- If the user wants another markdown location, ask for the exact path and use it for lesson/lab files.
- Obsidian is valid. If the user says "store it in Obsidian", ask for the vault path unless they already gave one.
- If repo-local lesson/lab files already exist and the user chooses another location, ask whether to keep them in place, copy them, or move them.
- Record the chosen locations and move policy in `.learning/LEARNER-PROFILE.md`. Do not ask again in later sessions unless the user explicitly asks to change or move them.

Optional when useful:

```txt
.learning/
  lessons/
  labs/
  GLOSSARY.md
  QUESTIONS.md
  architecture/REPO-MAP.md
  architecture/EXECUTION-FLOWS.md
  architecture/KEY-CONCEPTS.md
  reference/
```

If `.learning/` exists, read it before teaching. If it does not exist, run first-session setup before deep teaching unless the user explicitly asks for a quick explanation.

## First Session Protocol

1. Confirm repo URL/path, learner goal, skill level, preferred language, desired depth, preferred style, and lesson/lab storage location.
2. If the user wants an external markdown location such as an Obsidian vault, ask for the exact path unless they already provided it.
3. Inspect the repo: README, package/build files, entry points, test command, source layout, obvious architecture, and whether lesson/lab files already exist in the project folder.
4. If repo-local lesson/lab files already exist and the preferred location is elsewhere, ask whether to keep them in place, copy them, or move them.
5. Create `.learning/` state from the templates and record the storage preference plus any move decision in `LEARNER-PROFILE.md`.
6. Write `REPO-INTAKE.md`: purpose, run/test commands, important directories, entry points, concepts, flows, dependencies, difficulty, and risks.
7. Write `COURSE.md`: modules and lessons that rebuild core mechanisms before source walkthrough.
8. Write `PROGRESS.md` with current module, lesson, status, and next recommended action.
9. Recommend Lesson 1. Do not mark anything complete yet.

## New Session Protocol

At session start, read:

- `.learning/MISSION.md`
- `.learning/LEARNER-PROFILE.md`
- `.learning/COURSE.md`
- `.learning/PROGRESS.md`
- `.learning/SESSION-SUMMARY.md`
- recent `.learning/learning-records/*.md`

Then summarize:

- repo being learned,
- learner goal and preferences,
- recorded lesson/lab storage location and move policy,
- current module/lesson/lab,
- demonstrated understanding,
- active weak points and open questions,
- next recommended action.

Reuse the recorded storage preference. Do not ask where to store lessons/labs again unless the user explicitly asks to change or move them.

Ask whether to continue the recommended lesson unless the user already gave a specific command.

## Teaching Loop

Every substantial lesson follows this order:

| Step | Action |
|---|---|
| What | Name the concept or mechanism. |
| Why | Explain the problem it solves in this repo. |
| Mental model | Give a small model the learner can hold. |
| Tiny example | Show a minimal example outside production code. |
| Rebuild exercise | Ask the learner to implement a small version. |
| Verify | Run tests, inspect output, or reason through expected behavior. |
| Production comparison | After an attempt, write the comparison into the recorded lesson location; include source snippets when the learner should not open the codebase. |
| Reflection | Ask what changed in their understanding. |
| Learning record | Save only demonstrated understanding. |

Do not teach by summarizing files top-to-bottom unless the user explicitly requests a source walkthrough.

## Course Shape

Use modules like this unless the repo suggests a clearer order:

1. **Orientation** — purpose, local run, repo map, entry points.
2. **Prerequisites** — only the concepts needed to read the source.
3. **Tiny Clone** — smallest useful version of the main idea.
4. **Core Mechanisms** — rebuild parsers, routers, caches, schedulers, state managers, query builders, protocols, renderers, CLIs, or dependency graphs as appropriate.
5. **Production Source Walkthrough** — compare toy implementation with real source and edge cases.
6. **Extension / Contribution** — modify a small feature and record what changed.

Each lesson needs: id, title, goal, prerequisites, source files, toy target, expected output, checkpoint question, and status.

## Completion Rule

A lesson is complete only when the learner demonstrates understanding through at least one of:

- implementing the toy lab,
- explaining the concept back,
- answering checkpoint questions,
- debugging a mistake,
- comparing toy and production behavior correctly.

Never mark progress complete because the agent explained something. Evidence beats exposure.

Minor output mismatches do not block completion when the learner demonstrates the invariant and explicitly declines more reruns. Record the mismatch, explain the correction, and continue.

## Spoiler Policy

Default to Level 1 or Level 2 while the learner is building.

| Level | Meaning |
|---|---|
| 0 | Concept only |
| 1 | Hint |
| 2 | Pseudocode |
| 3 | Partial implementation |
| 4 | Full toy solution |
| 5 | Production source walkthrough |

Show Level 4 or 5 only when the learner asks, is stuck after hints, has attempted the exercise, or the lesson has reached comparison.

## Source Reading Policy

When reading production source:

1. Start from behavior and purpose.
2. Identify entry points.
3. Identify core data structures.
4. Trace the main flow.
5. Name edge cases.
6. Explain why production code is more complex than the toy version.
7. Convert important mechanisms into rebuild labs.

Prefer: input, output, transformation, reason for complexity. Avoid line-by-line explanation unless requested.

## Production Comparison Notes

After the learner completes a toy lab or asks for production comparison:

1. Read only the production source needed for the mechanism.
2. Compare toy invariant → production invariant.
3. Explain why production is more complex than the toy.
4. For each production point, explain: what it is, why it exists, why production needs it, and one use case, example, or analogy.
5. Write the comparison into the lesson markdown at the recorded lesson location.
6. Update `.learning/SESSION-SUMMARY.md`.

If the learner says they do not want to open the codebase while reading, make the note self-contained:

- put production comparison and code excerpts in the learner's markdown location, not only in chat,
- embed short production code excerpts,
- name each source file above its excerpt,
- explain each excerpt immediately after it,
- include only code needed for the lesson invariant,
- avoid dumping whole files or unrelated implementation detail.

When unfamiliar production terms appear, define them in place before continuing. Examples: streaming, provider, provider quirks, abort, multiple tool calls, validation, telemetry, session persistence, UI events.

Production comparison does not by itself prove lesson completion. Use the completion rule.

If the learner requests a teaching style for comparison, preserve it in the lesson note. Common shape: `คืออะไร` → `ทำไปทำไม` → `เพราะอะไร production ต้องมี` → `ตัวอย่าง/use case/เปรียบเทียบ`.


## Command Intents

| User says | Do this |
|---|---|
| `Use rebuild-to-learn on this repo: <url/path>` | Inspect repo, confirm lesson/lab storage location, record it in `.learning/LEARNER-PROFILE.md`, write intake/course/progress, and recommend Lesson 1. |
| `Continue my repo learning` | Read `.learning/`, recover the recorded storage preference, summarize state, and continue the next recommended action. |
| `Next lesson` | Load progress, create/load lesson, teach with the loop. |
| `Explain this file/function` | Explain purpose, concepts, inputs/outputs, course connection, and optionally create a mini exercise. |
| `Trace how X works` | Follow entry point and calls, update `architecture/EXECUTION-FLOWS.md`, then teach the flow. |
| `Help me rebuild X` | Define a minimal toy target, create a lab, provide requirements, hint before solution, compare after attempt. |
| `Quiz me` | Ask checkpoint questions based on current module and update progress only from answers. |
| `End session` | Update summary, progress, questions, learning records, and next-session prompt. |
| `Add production comparison for <lesson>` | Read relevant production source, append a self-contained comparison to the lesson file, include concise code excerpts when useful, and update `.learning/SESSION-SUMMARY.md`. |
| `I do not want to open the codebase while reading` | Embed necessary production snippets in the lesson note and explain them inline. |
| `I do not know these terms` | Define each term inline at first occurrence and point later repetitions back to that inline definition. |
| `I understand; this minor mismatch does not need another rerun` | If the invariant is demonstrated, record the mismatch and continue instead of blocking on cosmetic output. |
| `Explain each production point more deeply` | For each point, write what it is, why it exists, why production needs it, plus an example, use case, or analogy. |

## Understand Anything Integration

If the repo contains `.understand-anything/knowledge-graph.json` or the user mentions Understand Anything, use it as a codebase map for repo maps, dependency order, architecture tours, source traces, and learning path. Do not treat it as the whole curriculum. The course still needs rebuilding, verification, comparison, reflection, and learning records.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Explaining files before creating state | Create/read `.learning/` first unless user asks for a quick explanation. |
| Re-asking where lessons/labs go every session | Record the storage preference in `LEARNER-PROFILE.md` and reuse it until the user asks to move it. |
| Ignoring existing repo lesson/lab files | If the preferred location changes, ask whether to keep, copy, or move existing materials. |
| Marking lessons complete after an explanation | Require evidence from implementation, answers, debugging, or comparison. |
| Showing production code too early | Use spoiler levels; start with hints or pseudocode. |
| Making labs too large | Build one tiny mechanism with clear expected behavior. |
| Teaching build config first | Start with user-facing behavior and smallest vertical slice unless config is central. |
| Leaving production comparison only in chat | Write it into the lesson markdown so future sessions retain it. |
| Forcing learner to open codebase while reading | Embed the minimal source excerpts in the lesson note. |
| Using unexplained production vocabulary | Define terms inline at first occurrence. |
| Blocking on cosmetic mismatches after demonstrated understanding | Record the mismatch, explain the correction, and continue. |
| Production comparison lacks why/use cases | Add what/why/production reason/example per point. |

## Baseline Failure Counters

| Pressure | Required response |
|---|---|
| “I only have an hour, start now.” | Still create durable state; keep Lesson 1 tiny instead of skipping setup. |
| “I use Obsidian.” | Ask for the exact vault path if missing, then record it in `LEARNER-PROFILE.md`. |
| “I already have lessons in the repo.” | Ask whether to keep, copy, or move them before changing locations. |
| “I forgot where we left off.” | Read `.learning/` before choosing the next file. |
| “Mark the previous lesson complete.” | Refuse without demonstrated evidence; record unknown status. |
| “Show the full solution so we move faster.” | Prefer hints and ask for the learner's attempt; only reveal full solution under spoiler policy. |
| “Say I understand it.” | Do not claim understanding without evidence. |
| “I do not want to open the codebase while reading.” | Embed short source excerpts and explanations in the lesson note. |
| “What do these production terms mean?” | Add inline definitions where the terms first appear. |
| “I understand; the capitalization fix is not worth another answer.” | Accept if invariant is demonstrated; record the cosmetic mismatch. |
| “Explain what/why/why production/use case.” | Use that structure for every production point. |

## Red Flags

Stop and correct course when you notice:

- teaching from chat memory while `.learning/` exists,
- no `MISSION.md`, `COURSE.md`, or `PROGRESS.md` for a new repo,
- no recorded storage preference after the user mentioned Obsidian, a vault, or another lesson/lab location,
- moving or duplicating existing lesson/lab files without asking,
- source walkthrough before toy exercise,
- full production implementation before an attempt,
- lesson completion without evidence,
- progress tracked only in the conversation,
- production comparison delivered only in chat,
- learner asked for self-contained notes but source snippets are absent,
- unfamiliar vocabulary appears without an inline explanation,
- every lesson framed as “explain this file”.

## Session End Protocol

On session end:

1. Update `.learning/SESSION-SUMMARY.md`.
2. Update `.learning/PROGRESS.md`.
3. Create learning records for demonstrated understanding.
4. Record unresolved questions in `.learning/QUESTIONS.md` when present.
5. Write this next-session prompt:

```txt
Continue my rebuild-to-learn course for this repo. Read `.learning/` first, especially PROGRESS.md and SESSION-SUMMARY.md. Continue from the next recommended lesson.
```
