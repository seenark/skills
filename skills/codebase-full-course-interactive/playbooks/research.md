# Research playbook

## Purpose and inputs
Inspect a source repository at an immutable full commit and establish the Research Bundle consumed downstream. Inputs are `SourceTarget` (local path, remote URL, full commit, attribution policy) and an empty or existing Course Repository path. The source must be readable, the commit must resolve, and the working tree must be clean or explicitly classified.

## Durable outputs
Write only course artifacts under `research/`: `repository.json`, `status.json`, `approval.json` (only during approval), `source-index.json`, `symbols.json`, `dependency-graph.json`, `architecture.md`, `boundaries.md`, `terminology.md`, `execution-traces.md`, `ownership.md`, `uncertainties.md`, and `curriculum-proposal.md`. Every bundle records schema version, bundle ID, source commit, hashes, blockers, and status. Prompts, scratch notes, and runtime logs live in a gitignored skill workspace, never in the Course Repository.

## Agent semantic responsibilities
The coding agent interprets architecture and boundaries, names domain terminology, traces important executions and error paths, labels ownership/attribution, records uncertainty and open questions, and proposes learning outcomes. It must cite indexed symbols and pinned source references, distinguish observation from inference, and never invent behavior. The agent does not run provider APIs or author reusable scripts.

## Deterministic scripts
`bun run course research:init` acquires/checks the revision and writes repository metadata plus source/symbol indexes. `bun run course research:validate` validates schemas, hashes, references, attribution, and blocking questions, then writes a validator report and bundle digest. No script performs semantic interpretation.

## Preconditions and approval gates
Initialization requires a valid repository, resolvable full commit, supported acquisition, and unambiguous dirty-tree policy. Validation must pass before approval. Human Approval is explicit and revision/digest scoped; `research/approval.json` is written only after the agent presents the digest, source commit, blockers, and summary. Generation is forbidden for draft, invalid, stale, or changed bundles.

## Failure handling
Stop on invalid commit, unsupported acquisition, dirty-source ambiguity, schema/hash/reference errors, missing artifacts, or blocking questions. Preserve valid draft artifacts and report actionable IDs; never silently substitute another revision. A changed source or bundle invalidates approval and requires revalidation.

## Non-goals
This phase does not generate lessons, render UI, call model/provider APIs, publish a course, or modify the target repository. It does not claim semantic completeness from indexes alone.
