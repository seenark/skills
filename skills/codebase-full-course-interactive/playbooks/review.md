# Review playbook

## Purpose and inputs
Evaluate a generated course for source fidelity, learning quality, accessibility, and engine correctness. Inputs are the generated Course Repository, manifest, approved research digest/curriculum, validator report, and build output.

## Durable outputs
Write `reports/validator-report.json`, `reports/learning-review.md`, `reports/accessibility-report.json`, and `reports/review-summary.json` with course/content/engine versions, tested routes, evidence references, severity, and disposition. Keep reviewer prompts, screenshots, and execution logs transient in the gitignored skill workspace, never in the generated repository.

## Agent semantic responsibilities
The coding agent checks each lesson's question, mystery, execution evidence, error path, terminology, mental model, non-trivia checks, and duplication. It verifies claims against pinned source excerpts and flags unsupported or stale content. It also reviews navigation, keyboard behavior, reduced motion, quiz state, copy links, not-found routes, and read-only graph behavior; findings must identify stable IDs and actionable fixes.

## Deterministic scripts
Run `bun run course generate:validate`, `bun run course source:validate`, and `bun run build`. These scripts deterministically check schemas, hashes, links, routes, anchors, diagrams, quizzes, labs, typecheck/build behavior. They do not make semantic decisions or call providers.

## Preconditions and approval gates
Review starts only after generation validation passes and the manifest identifies the approved research digest. Publication requires no blocking validator findings, resolved critical learning/accessibility findings, and explicit human review approval. A source or engine change reopens review.

## Failure handling
Classify findings as blocking, high, medium, or informational; fail publication on blocking/high unresolved issues. Preserve reports and the prior publishable artifact, never hide failures, and rerun only affected gates after fixes.

## Non-goals
Review does not rewrite source research, silently change curriculum, add provider code, or publish despite failed gates. It is not a substitute for browser/runtime behavior checks required by the engine migration playbook.
