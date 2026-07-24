# Engine migration playbook

## Purpose and inputs
Migrate a generated course to a compatible Course Engine/schema version without changing lesson meaning. Inputs are the course repository, current and target engine/content schema versions, migration map, and pinned source/content manifests.

## Durable outputs
Write versioned migration metadata, deterministic migration report, updated engine-compatible content, and release review reports in the Course Repository. Preserve prior manifest/version and migration provenance. Transient prompts, logs, screenshots, and task files remain outside generated repositories in the gitignored skill workspace.

## Agent semantic responsibilities
The coding agent maps old contracts to new renderer/content contracts, identifies semantic risks, reviews route loaders/not-found behavior, copy links, quiz state, reduced motion, keyboard interaction, and read-only graph behavior, and records manual decisions. It must not alter source claims, lesson IDs, or answer meaning unless explicitly approved as a content change.

## Deterministic scripts
Use the repository's migration command (for example `bun run course engine:migrate`) to apply the checked-in migration map, then rerun engine tests, content validation, typecheck, and static build. Run `bun run course validate-course` and source-link validation. Scripts must be deterministic, local Bun/TypeScript, and contain no provider clients or orchestration.

## Preconditions and approval gates
Require a clean course, supported source/target versions, a complete migration map, passing baseline validation/build, and a backup or immutable prior artifact. Human approval is required for the migration plan and for any semantic-risk decision; release requires post-migration review and build approval.

## Failure handling
Fail closed on unsupported versions, unmapped fields, schema loss, route/anchor changes, test/type/build failures, or semantic drift. Keep the old artifact intact, emit a migration report with exact paths and diagnostics, and require map/code correction before retry. Never silently drop content.

## Non-goals
This phase does not research a source revision, redesign curriculum, add lesson-specific rendering, call providers, or create an agent runtime. Engine migration is separate from source update and must not conflate their approvals.
