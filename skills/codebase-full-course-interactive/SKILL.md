# Codebase Full Course Interactive

## Identity

`codebase-full-course-interactive` is a research-first coding-agent skill. It turns a **specific, immutable commit** of a software repository into a standalone static React course for developers with basic programming literacy. The output teaches how the repository works through source-grounded execution traces, structured lessons, diagrams, quizzes, and labs.

This is not a general HTML tutorial generator, an autonomous provider/API orchestrator, or the full Oh My Pi course.

## Semantic triggers

Use this skill when a user asks to:

- turn a codebase or GitHub repository into an interactive course or walkthrough;
- explain architecture and runtime behavior with source-linked lessons;
- review, refresh, or migrate an existing generated course against a new commit;
- bootstrap a course repository from the supplied React/Course Engine template.

Do not trigger for a generic README, an unpinned repository summary, a full Oh My Pi course, backend/auth/database implementation, or provider API orchestration. Ask for a repository and an exact commit (or resolve one before research).

## Non-negotiable boundaries

There are two repositories:

- **Skill Repository:** this directory, its playbooks, deterministic Bun scripts, schemas, templates, and examples. Reusable orchestration lives here.
- **Course Repository:** the generated standalone app. It contains the copied Course Engine, validated TypeScript content, reports, and the complete Research Bundle. It must not contain provider clients, research orchestration, reusable generator scripts, agent prompts, transient logs, or runtime access to the source repository.

Scripts are deterministic only: acquisition checks, indexing, diffing, impact analysis, schema/source validation, typechecking, tests, and builds. A coding agent performs semantic interpretation and writes architecture, terminology, execution traces, curriculum, lessons, diagrams, quizzes, labs, and review prose. No script calls an AI provider.

## Required workflow

1. **Pin and acquire.** Record repository URL, license evidence, full commit SHA, acquisition method, and dirty-source policy. Never mix revisions.
2. **Research before generation.** Run `research:init`, inspect the source, indexes, and license. Build a Research Bundle containing architecture notes, terminology, symbol references, execution traces, open questions, and source excerpts. Validate it. Research may be committed as `draft`.
3. **Resolve uncertainty.** Record unknown behavior, competing interpretations, and confidence in the bundle. Unresolved licensing or source-fidelity questions block copied excerpts. Do not silently invent behavior.
4. **Obtain approval.** Generation requires explicit human approval relayed by the agent. `approval.json` binds bundle ID, complete bundle digest, source commit, schema version, approver, timestamp, and blocker count. Any semantic edit invalidates approval and returns the bundle to `draft`.
5. **Plan and author.** Generate a curriculum proposal, then author structured content. Preserve a stable graph: `source file/range → symbol → execution trace → snippet/diagram/exercise → lesson → route/anchor`.
6. **Validate and review.** Run generation validation, Engine tests, typecheck, and build. The agent performs semantic learning review; deterministic reports check structure, routes, anchors, diagrams, quizzes, snippets, and source links.
7. **Update safely.** For an old/new commit, run update planning and impact analysis. Classify artifacts `unaffected`, `verify`, `regenerate`, or `invalid`; invalidate stale approval when meaning changes; refresh research and reports before rendering.
8. **Migrate separately.** Engine/schema migration is independent of a source update and must emit a migration report, then rerun tests, content validation, typecheck, and build.

### Stable commands

Run from the Course Repository (or the skill package when exercising its fixture):

```bash
bun run course research:init
bun run course research:validate
bun run course research:approve
bun run course generate:plan
bun run course generate:validate
bun run course review
bun run course update:plan
bun run course update:validate
bun run course engine:migrate
bun run typecheck
bun run test
bun run build
```

Each workflow refuses missing, stale, mismatched, or unresolved inputs; deterministic validation cannot grant approval. Use the phase playbooks in `playbooks/` for the required handoff and review sequence.

## Content and Course Engine contract

Content is TypeScript derived from Zod schemas and uses discriminated unions. Validate before rendering; do not put lesson-specific free-form HTML/CSS/JS or custom React renderers in generated lessons. `LessonRenderer` accepts a validated `Lesson` and dispatches section discriminants to reusable Engine primitives for layout, learning, code, visualization, interaction, and practical work. Browser-history URLs and stable section anchors are canonical. Deployment must provide an SPA fallback to `index.html`.

Every source excerpt links to the same immutable local and remote revision. Every execution trace states ordered source locations, symbols, data/state changes, branches, errors, and final observable result. Preserve attribution and license evidence in `attribution.json`; unknown licensing blocks copied excerpts (link-only policy must be explicit).

## Better-T-Stack bootstrap

Bootstrap in a disposable staging directory, then curate into `templates/react-course/`; never copy a staging `.git` directory or provider/orchestration code. The baseline uses Better-T-Stack with TanStack Router, no backend, and no runtime, followed by committed Bun lockfile and the Course Engine dependencies. Static hosting must support direct lesson routes through an SPA fallback.

## Retained and removed from the original skill

**Retained:** the warm developer-notebook visual direction, execution-first learning, interactive explanations, source-linked examples, and the promise of learning a real repository by following behavior.

**Removed:** the original HTML/CSS/JavaScript assembly implementation, ad-hoc lesson markup, runtime source fetching, provider/API orchestration, unpinned generation, and any claim that this skill generates the complete Oh My Pi course. The replacement is a reusable schema-driven Course Engine plus deterministic validation and explicit research/approval gates.

## Limitations and next step

The MVP has no backend, authentication, database, progress tracking, runtime source access, or automatic semantic authoring. It proves the workflow with a small fixture; it does not generate the full Oh My Pi course. After this skill is stable, choose and pin an Oh My Pi commit, define ownership and trace scope, create its Research Bundle, obtain revision-scoped approval, and run the same workflow in a separate Course Repository.
