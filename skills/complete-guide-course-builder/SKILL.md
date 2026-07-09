---
name: complete-guide-course-builder
description: "Use when converting a GitHub open-source repository into a full Thai Complete Guide course with repository analysis, complete modules, complete lessons, exercises, solutions, AI prompts, branch checkpoints, debugging, testing, production, and deployment guidance."
---

# Complete Guide Course Builder

## Overview

Convert any GitHub open-source repository into a full Thai **Complete Guide** course. The output is a complete file-based course, not a roadmap, outline, brief summary, or lesson plan.

Core principle: analyze the repository first, then write every module and every lesson in full detail so a Thai learner can read the course from start to finish and understand the project without extra explanation.

## Non-Negotiable Output Contract

The final course MUST be complete.

Do not stop at:

- course outline
- module list
- lesson titles
- brief summaries
- TODO placeholders
- “continue in next lesson”
- “lesson content goes here”
- “ask me to continue”

If the course is large, write the files directly and keep going until all required files exist.

## Input Requirements

Collect or infer these inputs before generating the course:

| Input | Required | Notes |
|---|---:|---|
| GitHub repository URL | Yes | Must be public/open-source or otherwise readable. |
| Target output directory | Yes | Default: `complete-guide/`. |
| Target learner level | Optional | Default: beginner-to-intermediate Thai software developer. |
| Course scope | Optional | Default: full repository, focused on important learning concepts. |
| Branch/checkpoint naming style | Optional | Default: `lesson-01-start`, `lesson-01-finished`, etc. |
| Runtime constraints | Optional | Capture package manager, language runtime, database, env vars, ports, and OS notes. |

If the repository is inaccessible, stop with the exact missing prerequisite. Do not invent repository contents.

## Repository Analysis Workflow

Before writing lessons, inspect the repository and produce `complete-guide/00-repository-analysis.md` in Thai.

### 1. Repository Inventory

Identify:

- entrypoints
- README and docs
- package/build files
- source folders
- test folders
- config files
- deployment files
- database or migration files
- examples, demos, or fixtures

Use repository files as evidence. Do not infer unsupported details.

### 2. Project Overview

Explain in Thai:

- what the project does
- who uses it
- what real-world problem it solves
- why this repository is useful to learn from

### 3. Technical Stack

Identify, when present:

- language
- framework
- frontend/backend/runtime
- database
- build tools
- package manager
- testing tools
- deployment tools
- important libraries
- environment variables and configuration patterns

### 4. Core Features

For each core feature, document:

- problem it solves
- files involved
- concepts students must understand first
- difficulty: beginner, intermediate, or advanced
- why it matters in real work

### 5. Architecture

Explain:

- where the app starts
- how the project is organized
- where UI logic lives
- where server logic lives
- where business logic lives
- where database logic lives
- where configuration lives
- how important files connect to each other

If a category does not exist, explicitly say so and explain what the repository uses instead.

### 6. Difficult Parts for Juniors

Flag likely confusion points:

- advanced TypeScript
- folder structure
- async logic
- state management
- database logic
- authentication
- authorization
- validation
- error handling
- build setup
- deployment setup
- hidden abstractions

## Course Planning Workflow

After analysis, create these planning files before lesson files:

```txt
complete-guide/
  00-repository-analysis.md
  01-course-roadmap.md
  02-module-plan.md
  03-branch-checkpoints.md
```

### Required Course Sections

The course should cover these sections, adjusted to fit repository size:

1. Course Introduction
2. What We Are Building
3. Repository Overview
4. Environment Setup
5. Core Fundamentals
6. Simplest Version of the Project
7. Feature-by-Feature Implementation
8. Refactoring From Naive Code to Better Code
9. Architecture Deep Dive
10. Common Mistakes
11. Debugging Guide
12. Testing
13. Production Usage
14. Deployment
15. AI Coding Workflow
16. Final Project Challenge
17. Final Summary and Next Steps

### Depth Rule

Create one full lesson for each major repository concept.

- 10 important concepts → at least 10 full lessons.
- 20 important concepts → at least 20 full lessons.
- Small repository → still create a complete focused course, not a shallow outline.

Lessons must progress easy to hard.

## Full Thai Course Generation Workflow

1. Clone or inspect the repository.
2. Run repository inventory and read only relevant files.
3. Produce `00-repository-analysis.md`.
4. Decide the module sequence from the project’s actual concepts.
5. Produce roadmap, module plan, and branch checkpoints.
6. Generate every module directory.
7. Generate every `lesson-NN.md` in full detail.
8. Generate supporting files in `exercises/`, `solutions/`, `ai-prompts/`, `common-mistakes/`, and `final-project/`.
9. Run the quality checklist against the created course.
10. Show the generated folder structure and verification notes.

## Language and Teaching Style

Write primarily in Thai. Keep English technical terms when natural for developers, including:

- component
- route
- service
- repository
- database
- request
- response
- validation
- deployment
- production
- refactor
- architecture
- state
- props
- API
- backend
- frontend
- middleware
- authentication
- authorization
- environment variable
- build
- test
- debug

Teaching style:

- clear roadmap
- problem-first explanation
- beginner-friendly mental model
- step-by-step coding
- simple example before real project code
- naive solution before better solution
- natural refactoring
- repetition of important ideas
- real-world workplace context
- common junior developer mistakes
- recap after each section
- AI coding workflow for modern developers

Do not copy any instructor’s exact voice or wording.

## Required Lesson Format

Every lesson file MUST use this exact structure and include complete content under every heading:

```md
# Lesson NN: <clear Thai title with English technical terms when useful>

## Lesson Goal

## Start from branch

## 1. Start With the Problem

## 2. Mental Model

## 3. Simplest Code Example

## 4. Naive Version

## 5. Limitation

## 6. Better Solution

## 7. Real Repository Usage

## 8. Common Mistakes

## 9. Real-World Context

## 10. AI Coding Workflow

## 11. Exercise

## 12. Solution

## 13. Recap

## Finished checkpoint
```

### Lesson Heading Requirements

- `Lesson Goal`: explain what the student will understand by the end.
- `Start from branch`: include `lesson-NN-start` or module-scoped equivalent.
- `Start With the Problem`: start from pain, not syntax.
- `Mental Model`: explain simply with analogies when useful.
- `Simplest Code Example`: smallest working example first.
- `Naive Version`: simple but imperfect solution; explain why it is okay for learning.
- `Limitation`: explain when/why the naive version becomes painful.
- `Better Solution`: refactor naturally, without jumping to advanced architecture too early.
- `Real Repository Usage`: name actual files and what students should focus on or ignore for now.
- `Common Mistakes`: explain why each mistake happens and how to avoid it.
- `Real-World Context`: explain how this appears in company projects.
- `AI Coding Workflow`: include useful prompts and warnings against blind copying.
- `Exercise`: practical and directly related to the lesson.
- `Solution`: complete solution, not “try it yourself”.
- `Recap`: summarize what was learned and what comes next.
- `Finished checkpoint`: include `lesson-NN-finished` or module-scoped equivalent.

## Code Explanation Rule

When showing code:

1. show a small code block
2. explain it in Thai
3. explain why it exists
4. explain what happens if it is removed
5. explain common mistakes
6. continue to the next code block

Never paste a huge code block without explanation.

## Refactoring Teaching Rule

Teach architecture by letting students feel the problem first:

```txt
Working code
→ messy code
→ notice the problem
→ extract function
→ extract module
→ extract service
→ add validation
→ add error handling
→ add tests
```

Do not begin with advanced architecture unless the lesson is explicitly in the architecture deep-dive section and prior lessons have built the context.

## Branch and Checkpoint System

Every lesson must include:

```txt
Start from branch: lesson-03-start
```

At the end:

```txt
Your code should now match branch: lesson-03-finished
```

For large courses, prefix with module number if clearer:

```txt
module-05-lesson-03-start
module-05-lesson-03-finished
```

`03-branch-checkpoints.md` must list every checkpoint and what changed at that checkpoint.

## File Output Structure

Create this structure, adjusting module and lesson counts to repository size:

```txt
complete-guide/
  00-repository-analysis.md
  01-course-roadmap.md
  02-module-plan.md
  03-branch-checkpoints.md

  modules/
    module-01-introduction/
      lesson-01.md
      lesson-02.md

    module-02-environment-setup/
      lesson-01.md
      lesson-02.md

    module-03-core-fundamentals/
      lesson-01.md
      lesson-02.md
      lesson-03.md

    module-04-simplest-version/
      lesson-01.md
      lesson-02.md

    module-05-feature-implementation/
      lesson-01.md
      lesson-02.md
      lesson-03.md

    module-06-refactoring/
      lesson-01.md
      lesson-02.md

    module-07-architecture-deep-dive/
      lesson-01.md
      lesson-02.md

    module-08-debugging-and-common-mistakes/
      lesson-01.md
      lesson-02.md

    module-09-testing/
      lesson-01.md
      lesson-02.md

    module-10-production-and-deployment/
      lesson-01.md
      lesson-02.md

    module-11-ai-coding-workflow/
      lesson-01.md
      lesson-02.md

    module-12-final-project/
      lesson-01.md
      lesson-02.md

  exercises/
  solutions/
  ai-prompts/
  common-mistakes/
  final-project/
```

Supporting directories must contain useful files, not empty placeholders.

## Supporting File Requirements

### `exercises/`

Include exercise collections by module or lesson. Each exercise must state:

- goal
- starting point
- task
- expected behavior
- hints
- related lesson

### `solutions/`

Include complete solutions for exercises. Explain:

- final code or answer
- why it works
- common wrong solutions
- how to verify it

### `ai-prompts/`

Include reusable Thai/English prompt templates for:

- explaining files line by line
- identifying project purpose
- tracing request/response flow
- suggesting safe refactors
- generating tests
- debugging errors
- reviewing architecture

Each prompt must include a warning about not copying blindly.

### `common-mistakes/`

Group common mistakes by topic. Each entry must explain:

- symptom
- why it happens
- how to debug
- safe fix
- prevention habit

### `final-project/`

Include a challenge that asks the learner to extend or rebuild part of the project. Include:

- requirements
- acceptance criteria
- suggested branch plan
- hints
- complete reference solution or solution walkthrough

## Quality Checklist

Before finishing, verify the course:

- [ ] Starts from the problem.
- [ ] Every section explains why.
- [ ] Written mainly in Thai.
- [ ] English technical terms are kept where useful.
- [ ] Simple example appears before real project code.
- [ ] Lessons are ordered from easy to hard.
- [ ] Students are told where they are in the course.
- [ ] Every lesson has a recap.
- [ ] Every lesson has an exercise.
- [ ] Every exercise has a complete solution.
- [ ] Common mistakes are explained.
- [ ] Real-world workplace examples are included.
- [ ] AI coding workflows are included.
- [ ] Branch checkpoints are prepared.
- [ ] Students can run or reason about the code after each lesson.
- [ ] Students can compare their code with finished checkpoints.
- [ ] Every lesson is fully written, not only outlined.
- [ ] No TODO placeholders remain.
- [ ] No “continue in next lesson” placeholders remain.

## Example Usage

User:

```txt
Use complete-guide-course-builder to create a Thai Complete Guide course for https://github.com/tinyhttp/tinyhttp.
Write files to ./complete-guide.
Target learner: junior TypeScript backend developer.
```

Agent response pattern:

```txt
Using complete-guide-course-builder to turn the repository into a full Thai Complete Guide course.
I will inspect the repository first, generate repository analysis, then write the full course files under ./complete-guide.
```

Then the agent creates the file structure and writes complete lessons.

## Testing Checklist With One Sample Repository

Use a small public repository for a smoke test, for example:

```txt
https://github.com/octocat/Hello-World
```

Test the skill by verifying the generated course has:

- [ ] `complete-guide/00-repository-analysis.md`
- [ ] `complete-guide/01-course-roadmap.md`
- [ ] `complete-guide/02-module-plan.md`
- [ ] `complete-guide/03-branch-checkpoints.md`
- [ ] at least one module directory under `complete-guide/modules/`
- [ ] complete lesson files using all required lesson headings
- [ ] Thai explanations in every lesson
- [ ] code or file-content explanation where the repository contains code/content
- [ ] exercises and complete solutions
- [ ] AI prompt files
- [ ] common mistakes files
- [ ] final project files
- [ ] no TODO placeholders
- [ ] no outline-only lessons
- [ ] generated folder structure can be shown with a directory listing

For a tiny repository, the course may be shorter, but it must still be complete and file-based.

## Common Mistakes

| Mistake | Why it fails | Fix |
|---|---|---|
| Generating only a roadmap | The learner cannot learn from titles alone. | Write every lesson file fully. |
| Asking whether to continue after each lesson | The skill requires one complete course run. | Keep generating files until complete. |
| Skipping repository analysis | Lessons become generic and ungrounded. | Create `00-repository-analysis.md` before lessons. |
| Translating technical terms unnaturally | Thai developers expect common English terms. | Keep common technical terms in English. |
| Starting with architecture diagrams | Beginners do not yet feel the problem. | Start with simple working code, then refactor. |
| Pasting large code blocks | Students get lost. | Use small blocks with line-by-line explanations. |
| Empty support folders | Output structure exists but course is incomplete. | Add useful exercise, solution, prompt, mistake, and final-project files. |

## Final Student Outcome

The final course should leave the learner feeling:

- ฉันเข้าใจว่า project นี้ทำอะไร
- ฉันเข้าใจว่า architecture นี้เกิดขึ้นมาเพื่อแก้ปัญหาอะไร
- ฉันสามารถ rebuild ส่วนสำคัญของ project ได้ทีละขั้น
- ฉันรู้ว่า junior developer มักพลาดตรงไหน
- ฉันรู้วิธี debug
- ฉันรู้ว่าสิ่งนี้ใช้ในงานจริงอย่างไร
- ฉันรู้วิธีใช้ AI ช่วยเขียน code โดยไม่ copy แบบไม่เข้าใจ
- ฉันสามารถเอาแนวคิดนี้ไปใช้กับ project ของตัวเองได้
