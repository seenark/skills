# Curriculum playbook

## Purpose and inputs
Turn an approved Research Bundle into a reviewable curriculum proposal. Inputs are a valid revision-scoped approval digest, research artifacts, target audience, lesson budget, and Course Repository path. The bundle must be complete, validated, and unchanged.

## Durable outputs
Write `research/curriculum-proposal.md` and `content/curriculum.json` (or the versioned course equivalent), containing course/chapter/lesson IDs, outcomes, prerequisites, sequence, source symbols, execution traces, diagrams, quizzes, labs, and known gaps. Record source revision and research digest in the course manifest. Temporary task prompts and logs remain outside the generated repository in the gitignored skill workspace.

## Agent semantic responsibilities
The coding agent chooses a coherent progression, translates architecture into learner-facing questions, defines lesson mysteries and compact mental models, selects representative success/error traces, and maps every claim to pinned research evidence. It designs non-trivia checks and labs with observable completion criteria, flags duplication and unsupported claims, and preserves terminology from the bundle. It may revise prose and sequencing, but cannot weaken evidence requirements or approval status.

## Deterministic scripts
`bun run course generate:validate` checks curriculum/course schemas, unique IDs, route and anchor stability, source hashes, symbols, diagram/trace references, quiz answer validity, and lab requirements. `bun run course validate` (if exposed by the package) is the same deterministic content gate; scripts never invent curriculum or call providers.

## Preconditions and approval gates
Research approval and validator report must be current for the exact source digest. A human or designated reviewer approves curriculum scope before generation. Any changed source, audience, lesson budget, or evidence map requires a new proposal and approval.

## Failure handling
Reject missing evidence, circular prerequisites, duplicate IDs, inaccessible outcomes, unsupported claims, invalid references, or oversized scope with concrete diagnostics. Keep the prior approved proposal untouched; do not auto-fill gaps with placeholders or trivia.

## Non-goals
This phase does not fetch research, render React, implement engine components, publish artifacts, or decide provider/model behavior. It does not embed prompts, logs, or orchestration code in a generated course.
