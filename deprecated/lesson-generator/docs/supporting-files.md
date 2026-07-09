# Supporting Files And Folder Contract

Every generated course must match this folder structure.

```text
/course-{repo_name}/
├── README.md
├── PREREQUISITES.md
├── COURSE_MAP.md
├── 00-overview/
│   └── lesson.md
├── 01-{topic-slug}/
│   ├── lesson.md
│   └── exercises/              # only when runnable starter/solution files are needed
├── 02-{topic-slug}/
│   └── lesson.md
├── ...
└── final-project/
    ├── README.md
    └── checkpoints/
        ├── checkpoint-1.md
        └── checkpoint-2.md
```

Rules:
- Always create `README.md`, `PREREQUISITES.md`, `COURSE_MAP.md`, `final-project/README.md`, `final-project/checkpoints/checkpoint-1.md`, and `final-project/checkpoints/checkpoint-2.md`.
- `exercises/` exists only when runnable files materially help the chapter.
- The markdown lesson remains the primary artifact even when extra exercise files exist.

## `/course-{repo_name}/README.md`

```markdown
# {repo_name} Course

## What this course teaches
คอร์สนี้อธิบาย `{repo_name}` จาก source code จริงที่ pin ไว้ที่ `{pinned_version}` โดยเรียงจากภาพรวมไปยัง module ภายในและการใช้งานจริง

## Who this is for
- Audience: `{audience}`
- Depth: `{depth}`
- Recommended language for explanations: `{language}`

## Course structure
- `00-overview` — ภาพรวมสถาปัตยกรรมทั้ง repo
- `{first_core_chapter}` ถึง `{last_core_chapter}` — แนวคิดหลักที่อ้างอิงจาก source files จริง
- `final-project/` — งานสรุปที่รวมหลาย concept เข้าด้วยกัน

## Version policy
- Repository: `{owner}/{repo}`
- Pinned version: `{pinned_version}`
- ห้ามสลับไปใช้ branch ล่าสุดระหว่างเรียน

## How to study
1. เริ่มจาก `[[00-overview]]`
2. เรียนตาม `COURSE_MAP.md`
3. ทำ Checkpoint #1 และ #2 ให้ผ่านก่อนข้ามบท
4. ถ้าติด ให้ใช้ escalation template ในท้ายบท

## Outputs
- Self-contained lessons
- Runnable exercises where needed
- Final project checkpoints
```

## `/course-{repo_name}/PREREQUISITES.md`

```markdown
# Prerequisites

## Required background
- `{external_prereq_1}`
- `{external_prereq_2}`

## Required tools
- Git
- Runtime/package manager required by `{repo_name}`
- Ability to open markdown in Obsidian or another markdown viewer

## Setup
```bash
git clone {repo_url}
cd {repo_dir}
# install dependencies pinned to the course version expectations
```

## Before starting chapter 00
- [ ] เปิด `README.md` ของคอร์สแล้ว
- [ ] เข้าใจว่า source links ทั้งหมดต้องอ้างอิง `{pinned_version}`
- [ ] พร้อมรันคำสั่งพื้นฐานของ repo

## If the learner is missing background
หยุดก่อน แล้วเติมพื้นฐานที่ระบุไว้ด้านบน เพราะแต่ละบทจะถือว่าพื้นฐานนี้มีอยู่แล้ว
```

## `/course-{repo_name}/COURSE_MAP.md`

```markdown
# Course Map

## Module Groups
- `{module_group_1}`
- `{module_group_2}`
- `{module_group_3}`

## Chapter Order
| Chapter | Topic | Source Files | Prerequisites |
|---|---|---|---|
| 00 | Overview & Architecture ⭐ | (ทั้ง repo) | - |
| 01 | {chapter_title_1} | `{source_files_1}` | 00 |
| 02 | {chapter_title_2} | `{source_files_2}` | 00, 01 |

## Dependency Graph
```text
00-overview
  ├── 01-{topic-slug-1}
  └── 02-{topic-slug-2}
```

## Study guidance
- Follow the chapter order unless a chapter explicitly marks optional review material.
- Revisit prerequisites before attempting the final project.
- Use wiki links like `[[00-overview]]` for internal navigation.
```

## `/course-{repo_name}/final-project/README.md`

```markdown
# Final Project — {repo_name}

## Goal
Build a small source-backed feature or miniature reimplementation that combines the main concepts from chapters {first_core_chapter} through {last_core_chapter}.

## Requirements
- [ ] Use pinned source references from `{pinned_version}` only.
- [ ] Include at least one behavior from each core module group: {module_groups}.
- [ ] Run the verification command from the relevant chapter before marking complete.

## Deliverable
A short markdown note explaining what was built, what source files inspired it, and which checkpoints passed.
```

## `/course-{repo_name}/final-project/checkpoints/checkpoint-1.md`

```markdown
# Final Project Checkpoint 1

- [ ] I chose a project shape that maps to real source files.
- [ ] I listed the pinned source files I am copying ideas from.

| ถ้าเห็น | แปลว่า | แก้ดังนี้ |
|---|---|---|
| ยังบอก source files ไม่ได้ | project ยังไม่ source-backed | ลด scope แล้วผูกกับ chapter ที่ชัดเจน |
| ใช้ branch ล่าสุด | เวอร์ชันไม่ถูก pin | กลับไปใช้ `{pinned_version}` เท่านั้น |
```

## `/course-{repo_name}/final-project/checkpoints/checkpoint-2.md`

```markdown
# Final Project Checkpoint 2

- [ ] I ran the verification command for the main behavior.
- [ ] I documented which chapter checkpoints passed.

| ถ้าเห็น | แปลว่า | แก้ดังนี้ |
|---|---|---|
| behavior ยังไม่ผ่าน | implementation ยังไม่ตรง source | เทียบ flow กับ lesson ที่เกี่ยวข้องแล้วแก้ใหม่ |
| อธิบายแรงบันดาลใจจาก source ไม่ได้ | เรียนข้ามขั้น | กลับไปอ่านบท prerequisite ที่ขาด |
```
