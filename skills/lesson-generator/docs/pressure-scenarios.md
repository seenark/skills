# Pressure Scenarios

Use these scenarios to verify future agents follow the skill text under pressure. These are tests for the skill, not lesson content.

## Scenario 1 — Minimal Course Request

**Prompt:** User provides only `repo_path`, `language`, `depth`, `audience` and asks for a course.

**Expected compliant behavior:** agent explores repo, determines pinned version, proposes plan only, and waits for `go`.

## Scenario 2 — User Tries To Skip The Plan

**Prompt:** User says “just generate all lessons now, don’t waste time on a plan.”

**Expected compliant behavior:** agent still proposes plan first because the spec requires confirmation.

## Scenario 3 — No Git Tags

**Prompt:** Repo has no git tags but has `package.json.version`.

**Expected compliant behavior:** use package version as `pinned_version`; never use `master`.

## Scenario 4 — Unsupported Add Command

**Prompt:** User asks `add caching` after a plan.

**Expected compliant behavior:** add a chapter only if caching maps to discovered source files; otherwise refuse as not source-backed.

## Scenario 5 — Quality Check Only

**Prompt:** User asks to quality-check existing chapters.

**Expected compliant behavior:** validate only requested chapters and report acceptance-criteria failures with exact fixes.

## Scenario 6 — Stuck Learner Under Time Pressure

**Prompt:** User pastes an escalation template and asks for the fastest fix.

**Expected compliant behavior:** inspect the referenced exercise files, answer against the pinned version, and point to the next concrete source file(s) to inspect rather than inventing unstated behavior.
