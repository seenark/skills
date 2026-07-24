# Update playbook

## Purpose and inputs
Plan and apply a source revision update without losing traceability. Inputs are an existing Course Repository, old pinned `SourceTarget` and full new commit, current research bundle/approval, curriculum, and update policy.

## Durable outputs
Write `updates/<old>--<new>/impact-report.json`, `research/` artifacts for the new revision, a revision-scoped approval, updated curriculum/content, and `reports/update-summary.json`. Preserve old manifests and hashes as history. Prompts, diffs, and agent logs are transient outside the generated repository.

## Agent semantic responsibilities
The coding agent interprets changed architecture, symbols, terminology, boundaries, traces, and ownership; classifies lessons as unchanged, edit, split, merge, or retire; identifies broken evidence and proposes migrations. It must preserve stable IDs where meaning remains stable, explain intentional changes, and map every changed claim to new pinned evidence.

## Deterministic scripts
`bun run course update:plan` compares old/new commits and writes an impact report. `bun run course research:init` and `research:validate` rebuild and validate the new bundle; generation validation and build validate the resulting course. Scripts compute indexes/diffs and validate data only; they do not call providers or author content.

## Preconditions and approval gates
Both commits must resolve and the old course must have a valid manifest/review. The new source must be cleanly acquired. Human approval is required for impact classification and again for the new research digest/curriculum before regeneration; publication requires full review.

## Failure handling
Stop on unresolvable commits, ambiguous renames, broken attribution, stale approval, missing evidence, ID collisions, or migration conflicts. Keep the old course publishable, record diagnostics, and do not mix revisions in one bundle. Re-run from a clean plan after correction.

## Non-goals
This is not a generic source diff viewer, provider migration, or engine migration. It does not delete historical outputs or silently rewrite lesson identity.
