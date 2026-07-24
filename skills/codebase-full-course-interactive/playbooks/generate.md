# Generate playbook

## Purpose and inputs
Generate a standalone static React course from an approved Research Bundle and approved curriculum. Inputs include course manifest, curriculum/content schemas, pinned source references and hashes, the selected Course Engine/template, and output directory.

## Durable outputs
Write only the generated Course Repository: versioned content, source excerpts, diagrams/traces, quiz/lab data, manifest, and standalone build assets. Store source commit, research digest, content version, engine version, and attribution metadata. Task prompts, agent logs, provider configuration, and orchestration scripts remain in the gitignored skill workspace and are never copied into the course.

## Agent semantic responsibilities
The coding agent authors lesson explanations, code/English translations, terminology, questions, traces, diagrams, quizzes, and labs from approved evidence. It preserves stable IDs/routes/anchors and marks uncertainty; it must not fabricate APIs, symbols, execution results, or answer keys. Engine/template code supplies rendering and interaction; lesson-specific rendering logic is prohibited.

## Deterministic scripts
`bun run course generate:validate` validates schemas, approval digest, source hashes, links, routes/anchors, diagram/trace references, quizzes, and labs. `bun run course build` runs the static build. `bun run course validate` may be run as the aggregate gate. Scripts are local deterministic TypeScript/Bun utilities only; no provider API or orchestration code is generated.

## Preconditions and approval gates
Require current research approval, passing research and curriculum validation, writable clean output, and compatible engine/template versions. Generation proceeds only after a generation approval gate confirms the digest and planned output. Review/build approval is required before publication.

## Failure handling
Fail closed on stale approval, changed source hashes, schema errors, collisions, unresolved references, inaccessible routes, or build failures. Write diagnostics outside the generated repository, leave the prior output intact, and require regeneration from corrected inputs. Never emit partial content as publishable.

## Non-goals
No source acquisition, semantic research, provider calls, telemetry, server runtime, or full Oh My Pi course. The output is a standalone static course, not an agent runtime.
