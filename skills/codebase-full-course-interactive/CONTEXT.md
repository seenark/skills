# Interactive Developer Course Generation

This context defines the vocabulary for the reusable skill that researches software repositories and generates interactive static courses for developers with basic programming literacy.

## Course Architecture

**Course Engine**:
The reusable React application layer that provides routing, layout, learning components, visualizations, code rendering, interaction primitives, and validation-facing runtime contracts.
_Avoid_: Generated course, lesson content

**Generated Course Content**:
Structured TypeScript data produced for one repository and rendered by the Course Engine; it includes manifests, chapters, lessons, traces, diagrams, snippets, exercises, quizzes, labs, glossary entries, and source references.
_Avoid_: Custom lesson HTML, one-shot document
 
**Content Contract**:
The discriminated-union TypeScript model plus Zod schemas that define valid Generated Course Content and reject malformed content during generation, review, and build.
_Avoid_: Unvalidated JSON, free-form lesson data

**Research Artifact**:
A source-of-truth record about a pinned repository revision, including maps, terminology, boundaries, symbols, source references, execution traces, and explicit uncertainties.
_Avoid_: Notes, generated content
 
**Demo Fixture Repository**:
A tiny included sample codebase with its own pinned commit, used to prove cross-repository research, source references, execution traces, interactive lessons, labs, validation, and static build behavior without generating the full target course.
_Avoid_: Mock source, Course Engine source
 
**Pinned Source Reference**:
A source citation validated against a local checkout at the course's pinned commit and rendered as a remote repository link targeting that same commit, path, and line range.
_Avoid_: Floating source link, copied source snapshot
 
**Pinned Revision Gate**:
A validation rule requiring all source excerpts, symbols, traces, and claims to resolve against the declared pinned checkout; mismatch with a working tree or another commit is a blocking error, not a warning.
_Avoid_: Floating revision, working-tree source
 
**Attribution Record**:
Research metadata describing the source repository's license, authorship/project attribution, repository URL, pinned commit, and the attribution shown by the course's SourcesPage; unclear licensing is an explicit blocking question for publishing source snippets.
_Avoid_: Unattributed excerpt, link-only provenance
 
**Course Repository**:
A versioned repository containing one generated static course, its Course Engine copy, generated course content, and the research bundle that explains and supports that content; it does not contain the reusable skill's orchestration scripts.
_Avoid_: Skill repository, generated output directory
 
**Skill Repository**:
The reusable source repository containing the main skill, internal Phase Playbooks, deterministic scripts, references, contracts, and Course Engine template; it is not the runtime repository for a generated course.
_Avoid_: Course Repository, deployed course
 
**Canonical Skill Identity**:
The reusable skill is named `codebase-full-course-interactive`; its main entry point orchestrates research, generation, review, and update for interactive developer courses.
_Avoid_: codebase-to-course, single-page HTML skill
 
**Semantic Trigger**:
A request phrase that clearly asks to turn a repository into an interactive course or explain its codebase through an interactive walkthrough; legacy wording remains supported, but generic mentions of “course” alone do not trigger the skill.
_Avoid_: Name-only trigger, generic course request
 
**Retained Design Language**:
The original skill's warm developer-notebook visual identity and learning principles, re-expressed through React, Tailwind, shadcn/ui, Motion, and structured content instead of copied HTML/CSS/JavaScript.
_Avoid_: Ported legacy implementation, single-page styling

**Clean Static Route**:
A browser-history URL such as `/course/agent-loop/tool-result` served by a static host configured to fall back unknown paths to `index.html`; hash URLs are not the canonical route form.
_Avoid_: Hash route, server-rendered route
 
**Engine Test Suite**:
The focused tests copied with the Course Engine into each Course Repository to protect routing, rendering, interaction contracts, source-link behavior, and other reusable runtime behavior without shipping workflow orchestration scripts.
_Avoid_: Generator test suite, end-to-end repository tests

**Research Bundle**:
The research artifacts committed alongside a course so its repository revision, source evidence, execution traces, terminology, and update history remain inspectable without including the skill's workflow implementation.
_Avoid_: Internal notes, runtime content
 
**Research Status**:
The explicit lifecycle state of a Research Bundle, at minimum `draft` or `approved`; `draft` artifacts may be committed for transparency, but generation cannot consume them until approved.
_Avoid_: Build status, course quality
 
**Human Approval**:
The user's explicit confirmation, recorded by the Content Orchestrator with timestamp and pinned commit, that a draft Research Bundle is sufficiently accurate for generation; deterministic validation alone cannot grant this state.
_Avoid_: Automatic approval, build success

**Execution Trace**:
An ordered, source-pinned account of a user-visible workflow through the repository, including involved symbols, data, state changes, branches, error paths, and the final observable result.
_Avoid_: Module outline, folder tour
 
**Research Agent**:
A coding agent responsible for interpreting repository behavior, architecture, boundaries, terminology, execution traces, and learning content; it produces artifacts under explicit output contracts.
_Avoid_: Validator, parser

**Deterministic Script**:
A tool that performs reproducible operations with mechanically checkable results, such as indexing, diffing, schema validation, source-link validation, typechecking, and building.
_Avoid_: Semantic analyst, autonomous course author

 
**Phase Playbook**:
An internal instruction contract for one course lifecycle phase, invoked by the main skill's coding-agent orchestrator rather than exposed as an independently discoverable skill.
_Avoid_: Standalone skill, public command
**Agent Handoff**:
A contract-driven transfer in which a workflow creates scoped tasks and input artifacts for a Research Agent, then validates the agent's output instead of embedding a provider-specific model API in the workflow.
_Avoid_: Uncontrolled generation, provider integration
 
**Content Orchestrator**:
The single coding agent that coordinates the approved research, curriculum design, structured content generation, validation, and build for the MVP before lesson-level parallelism is introduced.
_Avoid_: Independent lesson agents, uncontrolled parallel generation
 
**Committed Contract**:
A durable schema, research artifact, decision record, validation report, or generated content artifact kept in the Course Repository; transient prompts, task files, and runtime logs are not part of the committed course contract.
_Avoid_: Agent transcript, temporary handoff

## Learning Model

**Canonical Learner**:
A developer with basic programming literacy who needs precise explanations of architecture, execution flows, boundaries, and source investigation without syntax-level instruction for every concept.
_Avoid_: Vibe coder, nontechnical learner

**Lesson Question**:
The single concrete mystery or problem a lesson resolves through observable behavior, prediction, execution evidence, and a compact mental model.
_Avoid_: Topic, folder, module overview
 
## Lifecycle

**Research Workflow**:
The workflow that inspects a pinned repository revision and produces source-of-truth research artifacts, including explicit unresolved questions.
_Avoid_: Course generation

**Generation Workflow**:
The workflow that converts approved research artifacts into structured TypeScript course content rendered by the Course Engine.
_Avoid_: Free-form HTML generation

**Review Workflow**:
The workflow that checks technical source fidelity, structural validity, buildability, and learning quality of generated course content.
_Avoid_: Visual spot-check

**Update Workflow**:
The workflow that compares repository revisions and identifies affected research artifacts, traces, lessons, and snippets before regenerating and validating impacted content.
_Avoid_: Full-course regeneration
 
**Semantic Impact**:
A repository change that can alter a course's terminology, boundaries, execution traces, source excerpts, diagrams, lesson claims, or learning conclusions; semantic impact returns the Research Bundle to `draft` and requires Human Approval before regeneration.
_Avoid_: Any file change, metadata-only update
