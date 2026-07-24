# codebase-full-course-interactive

A reusable coding-agent skill for producing a source-grounded, interactive static React course from a pinned repository revision.

## What it promises

Given a repository, an immutable full commit SHA, and explicit approval of a validated Research Bundle, the skill guides an agent through research, curriculum planning, structured content authoring, deterministic validation, review, updates, and Course Engine migration. The generated Course Repository is standalone and ships its own copied Engine, TypeScript/Zod content, reports, source attribution, and research artifacts.

The learner follows stable routes and anchors through architecture, terminology, execution traces, source snippets, diagrams, quizzes, and practical exercises. Traces explain ordered source locations, symbols, data/state transitions, branches, errors, and observable outcomes.

## Trigger and non-trigger cases

Trigger for requests to make an interactive codebase course, repository walkthrough, architecture learning experience, or to review/update/migrate an existing generated course. Do not use for an unpinned code summary, generic README, backend implementation, or provider/API orchestration. This package explicitly does **not** generate the full Oh My Pi course.

## Research gate and uncertainty

Research always precedes generation. `research:init` records source metadata and creates a draft bundle; `research:validate` checks schemas, references, source ranges, links, and blockers. The agent records uncertainty and confidence rather than guessing. License uncertainty blocks copied excerpts. Only explicit human approval may produce `approval.json`; its digest and commit binding make approval revision-scoped. Any semantic change invalidates it.

Pinned commits are used consistently for local excerpts and remote links. The dependency graph links source ranges to symbols, traces, learning artifacts, lessons, and route anchors, allowing update impact classification as `unaffected`, `verify`, `regenerate`, or `invalid`.

## Workflow commands

```bash
bun run course research:init       # acquire and index a pinned source
bun run course research:validate   # validate the Research Bundle
bun run course research:approve    # record explicit human approval
bun run course generate:plan       # propose curriculum from approved research
bun run course generate:validate   # validate structured course content
bun run course review              # deterministic report + agent semantic review
bun run course update:plan         # compare old/new commits and compute impact
bun run course update:validate     # validate refreshed artifacts
bun run course engine:migrate      # migrate Engine/schema versions separately
bun run typecheck && bun run test && bun run build
```

The Bun/TypeScript scripts are deterministic and never call an AI provider. They validate, index, diff, analyze impact, test, typecheck, and build. The coding agent writes interpretation and learning content. Phase-specific instructions are in `playbooks/`.

## Structured content and Course Engine

Course content is TypeScript parsed and validated through Zod-derived discriminated unions. `LessonRenderer` is the primary seam: it receives validated `Lesson` data and dispatches section discriminants to reusable layout, learning, code, visualization, interaction, and practical primitives. Generated lessons must not define custom React renderers or free-form HTML/CSS/JS.

The Course Repository includes the Engine and does not depend on this skill at runtime. Browser history URLs and stable anchors are canonical; static hosts need an SPA fallback to `index.html`. Engine migration emits a report and reruns Engine tests, content validation, typecheck, and build.

## Repository boundaries

The **Skill Repository** owns this README/SKILL, schemas, deterministic scripts, playbooks, templates, examples, and reusable workflow knowledge. The **Course Repository** owns the standalone app, copied Engine, generated content, reports, and complete Research Bundle. It must not contain orchestration/provider scripts, transient prompts or logs, reusable generators, or runtime source-repository access.

## Better-T-Stack bootstrap

Use a disposable staging directory:

```bash
bun create better-t-stack@latest <staging-path> \
  --frontend tanstack-router \
  --backend none \
  --runtime none \
  --api none \
  --auth none \
  --payments none \
  --database none \
  --orm none \
  --db-setup none \
  --package-manager bun \
  --no-git \
  --web-deploy docker \
  --server-deploy none \
  --no-install \
  --addons oxlint \
  --examples none
```

Curate the verified result into `templates/react-course/`. Remove nested Git metadata and forbidden orchestration/provider pieces; retain only static-course functionality. Commit the Bun lockfile and verify direct-route hosting fallback before using the template.

## Retained and removed

Retained from the original skill: warm developer-notebook design language, execution-first learning, interactive teaching, and source-linked repository explanations. Removed: HTML/CSS/JS assembly, ad-hoc lesson markup, runtime source fetching, unpinned generation, provider API orchestration, and the full Oh My Pi-generation claim. These are replaced by a copied Course Engine, Zod-validated TypeScript content, pinned research, approval gates, deterministic commands, execution traces, and review/update workflows.

## Limitations and Oh My Pi next step

This is an MVP workflow with no backend, auth, database, progress tracking, runtime source access, or automatic semantic authoring. The fixture demonstrates the workflow; it is not the full Oh My Pi course. The next step is to choose and pin an Oh My Pi commit, define its ownership taxonomy and execution-trace scope, research it into a complete bundle, secure explicit approval, and generate it in a separate Course Repository.
