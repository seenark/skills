---
name: rebuild-to-learn
description: Use when a user provides a GitHub repo or local codebase and wants a stateful, course-like learning path to deeply understand architecture, execution flows, source code, or contribution points by building simplified versions first.
---

# Rebuild To Learn

Turn a repository into a stateful apprenticeship course. The learner rebuilds tiny versions of core mechanisms before reading production code.

Core principle: build the small thing first, prove understanding, then compare with the real implementation.

## Required State

Store durable learning state in the target repo under `.learning/`. Never rely on chat memory for course position, learner profile, or completion evidence.

Required MVP structure:

```txt
.learning/
  MISSION.md
  LEARNER-PROFILE.md
  REPO-INTAKE.md
  COURSE.md
  PROGRESS.md
  SESSION-SUMMARY.md
  learning-records/
  lessons/
  labs/
```

Optional when useful:

```txt
.learning/
  GLOSSARY.md
  QUESTIONS.md
  architecture/REPO-MAP.md
  architecture/EXECUTION-FLOWS.md
  architecture/KEY-CONCEPTS.md
  reference/
```

If `.learning/` exists, read it before teaching. If it does not exist, run first-session setup before deep teaching unless the user explicitly asks for a quick explanation.

## First Session Protocol

1. Confirm repo URL/path, learner goal, skill level, preferred language, desired depth, and preferred style: guided exercises, quizzes, explanations, or pair-programming.
2. Inspect the repo: README, package/build files, entry points, test command, source layout, and obvious architecture.
3. Create `.learning/` state from the templates.
4. Write `REPO-INTAKE.md`: purpose, run/test commands, important directories, entry points, concepts, flows, dependencies, difficulty, and risks.
5. Write `COURSE.md`: modules and lessons that rebuild core mechanisms before source walkthrough.
6. Write `PROGRESS.md` with current module, lesson, status, and next recommended action.
7. Recommend Lesson 1. Do not mark anything complete yet.

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
- current module/lesson/lab,
- demonstrated understanding,
- active weak points and open questions,
- next recommended action.

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
| Production comparison | Compare toy code with real files after an attempt. |
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

## Command Intents

| User says | Do this |
|---|---|
| `Use rebuild-to-learn on this repo: <url/path>` | Inspect repo, create `.learning/`, write intake/course/progress, recommend Lesson 1. |
| `Continue my repo learning` | Read `.learning/`, summarize state, continue next recommended action. |
| `Next lesson` | Load progress, create/load lesson, teach with the loop. |
| `Explain this file/function` | Explain purpose, concepts, inputs/outputs, course connection, and optionally create a mini exercise. |
| `Trace how X works` | Follow entry point and calls, update `architecture/EXECUTION-FLOWS.md`, then teach the flow. |
| `Help me rebuild X` | Define a minimal toy target, create a lab, provide requirements, hint before solution, compare after attempt. |
| `Quiz me` | Ask checkpoint questions based on current module and update progress only from answers. |
| `End session` | Update summary, progress, questions, learning records, and next-session prompt. |

## Understand Anything Integration

If the repo contains `.understand-anything/knowledge-graph.json` or the user mentions Understand Anything, use it as a codebase map for repo maps, dependency order, architecture tours, source traces, and learning path. Do not treat it as the whole curriculum. The course still needs rebuilding, verification, comparison, reflection, and learning records.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Explaining files before creating state | Create/read `.learning/` first unless user asks for a quick explanation. |
| Marking lessons complete after an explanation | Require evidence from implementation, answers, debugging, or comparison. |
| Showing production code too early | Use spoiler levels; start with hints or pseudocode. |
| Making labs too large | Build one tiny mechanism with clear expected behavior. |
| Teaching build config first | Start with user-facing behavior and smallest vertical slice unless config is central. |
| Forgetting continuity | Update `SESSION-SUMMARY.md`, `PROGRESS.md`, and records at session end. |

## Baseline Failure Counters

| Pressure | Required response |
|---|---|
| “I only have an hour, start now.” | Still create durable state; keep Lesson 1 tiny instead of skipping setup. |
| “I forgot where we left off.” | Read `.learning/` before choosing the next file. |
| “Mark the previous lesson complete.” | Refuse without demonstrated evidence; record unknown status. |
| “Show the full solution so we move faster.” | Prefer hints and ask for the learner's attempt; only reveal full solution under spoiler policy. |
| “Say I understand it.” | Do not claim understanding without evidence. |

## Red Flags

Stop and correct course when you notice:

- teaching from chat memory while `.learning/` exists,
- no `MISSION.md`, `COURSE.md`, or `PROGRESS.md` for a new repo,
- source walkthrough before toy exercise,
- full production implementation before an attempt,
- lesson completion without evidence,
- progress tracked only in the conversation,
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
