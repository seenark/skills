---
name: complete-guide-course-builder
description: "Use when converting a GitHub open-source repository into a full Thai Complete Guide course with repository analysis, complete modules, complete lessons, exercises, solutions, AI prompts, copy-ready checkpoint files, debugging, testing, production, and deployment guidance."
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
| Checkpoint folder naming style | Optional | Default: `module-01-lesson-01-start`, `module-01-lesson-01-finished`, etc. |
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
  03-checkpoints.md
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

## ขั้นตอนสร้างคอร์สภาษาไทยฉบับสมบูรณ์

1. Clone หรือ inspect repository แล้วบันทึก commit/tag ที่ใช้วิเคราะห์
2. ทำ inventory ของไฟล์และอ่านเฉพาะส่วนที่เกี่ยวข้อง
3. สร้าง `00-repository-analysis.md` เป็นภาษาไทย
4. วางลำดับ module จากแนวคิดจริงของ project ไม่ใช่จาก template สำเร็จรูป
5. สร้าง roadmap, module plan และ checkpoint snapshots ที่เป็นไฟล์จริง
6. สร้างทุก module directory และทุก lesson file ให้ครบ
7. ทำให้ทุกบทอ่านและลงมือทำตามได้ด้วยตัวเอง โดยไม่ต้องเปิด source repository ควบคู่
8. สร้างไฟล์ใน `exercises/`, `solutions/`, `ai-prompts/`, `common-mistakes/` และ `final-project/` พร้อมเนื้อหาจริง
9. ตรวจ quality checklist และแสดง folder structure พร้อมหลักฐานการตรวจ

## สัญญาเรื่องภาษาและน้ำเสียง

เนื้อหาที่ผู้อ่านเห็นทั้งหมดต้องเป็นภาษาไทยธรรมชาติแบบผู้สอนชาวไทยอธิบายจากความเข้าใจ ไม่ใช่แปลประโยคภาษาอังกฤษทีละคำ

ส่วนต่อไปนี้ต้องเป็นภาษาไทย: ชื่อบท หัวข้อทั่วไป คำอธิบาย การเปรียบเทียบ แบบฝึกหัด เฉลย ข้อผิดพลาดที่พบบ่อย บทสรุป คำแนะนำการใช้ AI และ solution walkthrough

คงภาษาอังกฤษเฉพาะสิ่งที่ใช้จริงและควรคงรูปเดิม:

- technical terms ที่นักพัฒนาไทยใช้ทั่วไป: component, route, service, repository, database, request, response, validation, deployment, production, refactor, architecture, state, props, API, backend, frontend, middleware, authentication, authorization, environment variable, build, test, debug
- ชื่อไฟล์ path คำสั่ง CLI ชื่อ package ชื่อ symbol ชื่อ API และข้อความที่โปรแกรมต้องอ่าน
- prompt สำหรับ AI เมื่อภาษาอังกฤษทำให้ใช้กับเครื่องมือได้ตรงกว่า

ห้ามแปล technical terms แบบตรงตัวจนเกิดคำไทยที่คนทำงานจริงไม่พูด และห้ามปล่อย prose ภาษาอังกฤษไว้เพียงเพราะดู professional กว่า

สอนเหมือนมนุษย์กำลังพาเพื่อนร่วมทีมทำงาน: เริ่มจากเหตุผล ใช้ mental model ตัวอย่าง หรือการเปรียบเทียบเมื่อช่วยให้เข้าใจ และเชื่อมกับสถานการณ์ทำงานจริงโดยไม่ยัดตัวอย่างที่ไม่เกี่ยวข้อง

## Quick Reference: สิ่งที่ต้องมีในทุกบท

| สิ่งที่ผู้เรียนต้องได้ | รูปแบบบังคับ |
|---|---|
| จุดเริ่มต้น | path ของ checkpoint folder ที่ copy ได้ และโครงสร้างไฟล์ที่เกี่ยวข้องก่อนเริ่ม |
| ขั้นตอนทำ | path, คำสั่ง, code ทีละส่วน และคำอธิบายภาษาไทย |
| Code จาก repository | คัดเฉพาะส่วนที่จำเป็นมาไว้ในบท พร้อม source path และ commit/tag |
| สภาพหลังทำ | เนื้อหาเต็มล่าสุดของทุกไฟล์ที่สร้างหรือแก้ในบท |
| การยืนยันผล | คำสั่ง run/build/test/debug, ผลลัพธ์ที่คาดหวัง และวิธีอ่าน failure |
| การฝึก | แบบฝึกหัดที่ทำได้จริงและเฉลยสมบูรณ์ |

## รูปแบบบทเรียนที่ต้องใช้

ทุก lesson file ต้องใช้หัวข้อต่อไปนี้ตามลำดับ และต้องมีเนื้อหาจริงใต้ทุกหัวข้อ:

```md
# บทที่ NN: <ชื่อไทยที่ชัดเจน โดยคง technical terms ที่จำเป็น>

## เป้าหมายของบทเรียน

## เริ่มจาก checkpoint ไหน

## โครงสร้างไฟล์ก่อนเริ่ม

## 1. เริ่มจากปัญหา

## 2. Mental model

## 3. ตัวอย่างที่เล็กที่สุด

## 4. วิธีตรงไปตรงมาแบบแรก

## 5. ข้อจำกัดของวิธีแรก

## 6. ปรับเป็นวิธีที่ดูแลต่อได้ง่ายขึ้น

## 7. เชื่อมกับ code ใน repository จริง

## 8. ข้อผิดพลาดที่พบบ่อย

## 9. บริบทการทำงานจริง

## 10. ใช้ AI ช่วยเขียน code อย่างเข้าใจ

## 11. แบบฝึกหัด

## 12. เฉลยแบบละเอียด

## 13. สรุปท้ายบท

## สภาพไฟล์ฉบับสมบูรณ์ท้ายบท

## วิธีตรวจสอบผล

## Checkpoint ที่ควรได้
```

### ความหมายของแต่ละหัวข้อ

- `เป้าหมายของบทเรียน`: บอกสิ่งที่ผู้เรียนทำหรืออธิบายได้เมื่อจบบท
- `เริ่มจาก checkpoint ไหน`: ระบุ path เช่น `checkpoints/module-01-lesson-02-start/project/` พร้อมคำสั่ง copy ที่ใช้ได้จริง
- `โครงสร้างไฟล์ก่อนเริ่ม`: แสดง file tree ของไฟล์ที่บทนี้ใช้และสถานะที่ผู้เรียนควรมี
- `เริ่มจากปัญหา`: เริ่มจาก pain ที่เกิดจริง ไม่เริ่มจาก syntax
- `Mental model`: อธิบาย concept แบบเป็นธรรมชาติ ใช้ analogy เฉพาะเมื่อช่วยให้เข้าใจ
- `ตัวอย่างที่เล็กที่สุด`: แสดงตัวอย่างที่ทำงานได้ก่อนเชื่อมกับ project จริง
- `วิธีตรงไปตรงมาแบบแรก`: แสดงทางออกง่ายที่เหมาะสำหรับเรียน พร้อมเหตุผลที่ยังไม่ต้องซับซ้อน
- `ข้อจำกัดของวิธีแรก`: ให้ผู้เรียนเห็นว่าทำไม code นี้จะเริ่มดูแลยากเมื่อ project โต
- `ปรับเป็นวิธีที่ดูแลต่อได้ง่ายขึ้น`: refactor ทีละก้าวโดยไม่กระโดดไป architecture สูงเกินบริบท
- `เชื่อมกับ code ใน repository จริง`: ระบุ source path และ commit/tag ที่วิเคราะห์ พร้อมฝัง excerpt หรือ teaching version ที่จำเป็นไว้ในบท; ห้ามบอกให้ผู้เรียนเปิด repository เพื่อหา code ที่จำเป็นเอง
- `ข้อผิดพลาดที่พบบ่อย`: อธิบายสาเหตุ อาการ วิธีหลีกเลี่ยง และตัวอย่างผลกระทบ
- `บริบทการทำงานจริง`: เชื่อม concept กับงานทีม การ review การ debug หรือ production ตามที่เหมาะกับบท
- `ใช้ AI ช่วยเขียน code อย่างเข้าใจ`: ให้ prompt ที่ใช้ได้จริงและบอกวิธีตรวจคำตอบกับ code/behavior แทนการ copy ตาม
- `แบบฝึกหัด`: โจทย์ที่ทำได้จากเนื้อหาในบทโดยไม่ต้องเปิด source repository
- `เฉลยแบบละเอียด`: มี code หรือคำตอบสมบูรณ์ เหตุผล วิธีตรวจ และตัวอย่างแนวทางที่มักผิด
- `สภาพไฟล์ฉบับสมบูรณ์ท้ายบท`: แสดง full final state ของทุกไฟล์ที่สร้างหรือแก้ในบท แม้บางช่วงจะซ้ำกับ code ที่สอนไปแล้ว
- `วิธีตรวจสอบผล`: ระบุคำสั่ง run/build/test/debug, expected output และวิธีแยก warning ที่ยอมรับได้ออกจาก failure
- `Checkpoint ที่ควรได้`: ระบุ path เช่น `checkpoints/module-01-lesson-02-finished/project/` และวิธีเปรียบเทียบหรือ copy state นั้น

## กฎการใส่ code และ file state

1. ก่อนทุก code block ให้ระบุ path ของไฟล์หรือระบุว่าเป็นคำสั่ง CLI
2. สอนด้วย code block ขนาดเล็ก เรียงตามขั้นที่ผู้เรียนพิมพ์จริง
3. หลังทุก block อธิบายเป็นภาษาไทยว่า code ทำอะไร ทำไมต้องมี ถ้าเอาออกจะเกิดอะไร และ beginner มักพลาดอย่างไร
4. Code ทุกส่วนที่จำเป็นต่อ compile, run, test หรือ debug ต้องอยู่ในคอร์ส ห้ามแทนด้วยลิงก์หรือคำสั่งว่า “เปิด repository แล้วดูเอง”
5. หาก upstream file ใหญ่มาก ให้สร้าง teaching version ที่เล็กแต่ runnable ก่อน แล้วค่อยแสดง excerpt จาก upstream ที่จำเป็นพร้อม context ครบ
6. ท้ายบทต้องรวม full final state ของทุกไฟล์ที่แตะในบท และต้องสร้าง checkpoint snapshot ที่ copy แล้วได้ state เดียวกัน
7. ไฟล์ที่ไม่ได้แก้ในบทไม่ต้องคัดซ้ำ แต่ต้องบอก dependency และชี้ไปบทก่อนหน้าที่มี full state ของไฟล์นั้น

## Red Flags: หยุดและแก้ก่อนสร้างไฟล์ต่อ

- หัวข้อที่ผู้เรียนเห็นเป็น `Common Mistakes`, `Solution`, `Lesson Goal`, `Expected behavior` หรือ prose ภาษาอังกฤษอื่นที่ไม่ใช่ technical term
- บทเรียนบอกให้เปิด source repository หรือคลิกลิงก์เพื่อหา code ที่จำเป็นต่อขั้นตอน
- มี code snippet ระหว่างสอน แต่ไม่มี full final state ของไฟล์ที่แตะ
- ผู้เรียนไม่มี path, คำสั่ง run/build/test/debug หรือ expected result ที่ใช้ยืนยันงานของตน
- ใช้คำว่า “ดูไฟล์เดิม” หรือ “ทำเหมือน repository” โดยไม่แสดงเนื้อหาให้ครบ
- ลดรายละเอียดเพราะ upstream file ยาว โดยไม่สร้าง teaching version ที่ runnable
- สร้าง script ที่เอาไว้ generate คอร์สแทนการเขียน course files จริง เมื่อ agent มีสิทธิ์ write output directory; ให้เขียนไฟล์จริงตาม output structure โดยตรง

พบข้อใดข้อหนึ่ง ให้หยุดสร้างคอร์สและแก้บท/ไฟล์นั้นให้ครบก่อนดำเนินการต่อ

| ข้ออ้างที่มักเกิด | ความจริงที่ต้องทำ |
|---|---|
| “หัวข้ออังกฤษดู professional กว่า” | ผู้เรียนต้องได้หัวข้อและ prose ไทยธรรมชาติ; คงอังกฤษเฉพาะ technical terms และข้อความที่เครื่องมือต้องใช้ |
| “ให้ลิงก์ repository ก็พอ” | ลิงก์เป็นแหล่งอ้างอิงได้ แต่ไม่แทน code, path หรือ file state ที่ผู้เรียนต้องใช้ทำตาม |
| “ไฟล์ยาวเกินกว่าจะใส่” | สอนด้วย block เล็กแล้วรวม final state ของไฟล์ที่แตะ; สร้าง teaching version ถ้าจำเป็น |
| “ส่ง script สร้างคอร์สให้แทนได้” | เมื่อเขียนไฟล์ได้ ต้องสร้าง course files ตาม output structure โดยตรง |

## ตัวอย่างรูปแบบที่ถูกต้อง

ไม่ถูกต้อง: “เปิด `src/routes/health.ts` ใน repository แล้วเพิ่ม route ตามนี้” เพราะผู้เรียนไม่มี state เดิมของไฟล์

ถูกต้อง: เริ่มจากระบุ path, แสดง code ที่เพิ่มทีละส่วน, อธิบาย และจบบทด้วยไฟล์เต็ม:

````md
### ไฟล์: `src/routes/health.ts`

```ts
router.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});
```

`router.get` ผูก handler กับ request แบบ `GET` ที่ path `/health` ถ้าตัด handler นี้ออก server จะตอบ `404` เมื่อระบบ monitoring เรียก endpoint นี้

### สภาพไฟล์ฉบับสมบูรณ์ท้ายบท

#### `src/routes/health.ts`

```ts
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});
```
````

ตัวอย่างนี้เป็นรูปแบบการสอน ไม่ใช่ข้ออ้างว่า upstream repository ทุกแห่งใช้ Express หรือมีไฟล์นี้จริง.

## กฎการสอน Refactor

ให้ผู้เรียนรู้สึกถึงปัญหาก่อน แล้วค่อยปรับตามลำดับ:

```txt
code ที่ทำงานได้
→ code เริ่มรกหรือซ้ำ
→ เห็นต้นทุนของการดูแล
→ extract function
→ extract module
→ extract service
→ เพิ่ม validation
→ เพิ่ม error handling
→ เพิ่ม test
```

อย่าเริ่มด้วย architecture ขั้นสูง เว้นแต่เป็นบท architecture deep-dive และบทก่อนหน้าได้สร้างบริบทที่จำเป็นครบแล้ว.


## Checkpoint Snapshot System

ทุก lesson ต้องสร้าง checkpoint เป็นไฟล์จริงใต้ course folder ไม่ใช่ Git branch, tag, patch, diff, symlink หรือ reference ไปยัง repository ภายนอก

สำหรับทุก lesson ให้สร้าง snapshot อย่างน้อยสอง state:

```txt
complete-guide/
  checkpoints/
    module-03-lesson-02-start/
      README.md
      project/
        ...source tree ที่ใช้เริ่มบท...
    module-03-lesson-02-finished/
      README.md
      project/
        ...source tree หลังจบบท...
```

กฎของ snapshot:

- `project/` ต้องเป็น source tree ที่สมบูรณ์และใช้ได้จริงสำหรับ state นั้น ไม่ใช่เฉพาะไฟล์ที่เปลี่ยน
- ผู้เรียนต้องสามารถ copy `project/` ไปยัง working directory ใหม่แล้ว run/build/test ตามคำสั่งของบทได้ โดยไม่ต้อง checkout Git branch หรือ tag
- ไม่รวม `.git/`, secret จริง หรือไฟล์ build output ที่สร้างซ้ำได้; คงไฟล์ปกติที่จำเป็น เช่น source, config, lockfile, migration, fixture, `.env.example` และ test
- ทุก `README.md` ต้องบอกหมายเลขบท, state (`start` หรือ `finished`), สิ่งที่ต่างจาก checkpoint ก่อนหน้า, คำสั่ง copy และคำสั่ง verify พร้อม expected result
- หาก start state ซ้ำกับ finished state ของบทก่อนหน้า ต้องยังสร้าง folder จริงของ start state เพื่อให้ค้นหาและ copy ได้โดยตรง

ตัวอย่างใน lesson:

```txt
เริ่มจาก: checkpoints/module-03-lesson-02-start/project/
copy: cp -R checkpoints/module-03-lesson-02-start/project/. ./my-project/
```

ตอนจบบท:

```txt
Checkpoint ที่ควรได้: checkpoints/module-03-lesson-02-finished/project/
```

`03-checkpoints.md` ต้องเป็นดัชนีของ checkpoint ทุกตัว โดยระบุ path, บทเรียน, state, รายการไฟล์ที่เปลี่ยน, คำสั่ง copy และคำสั่ง verify ของ checkpoint นั้น

## File Output Structure

Create this structure, adjusting module and lesson counts to repository size:

```txt
complete-guide/
  00-repository-analysis.md
  01-course-roadmap.md
  02-module-plan.md
  03-checkpoints.md

  checkpoints/
    module-01-lesson-01-start/
      README.md
      project/
    module-01-lesson-01-finished/
      README.md
      project/

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

## ข้อกำหนดของไฟล์ประกอบ

ชื่อ directory ตาม output contract คงเป็น `exercises/`, `solutions/`, `ai-prompts/`, `common-mistakes/` และ `final-project/` เพื่อให้ structure คงที่ แต่ชื่อเอกสาร หัวข้อ และคำอธิบายภายในต้องเป็นภาษาไทยธรรมชาติ

### `exercises/`

จัดโจทย์ตาม module หรือบทเรียน แต่ละโจทย์ต้องมี:

- เป้าหมายของการฝึก
- จุดเริ่มต้นและไฟล์ที่ผู้เรียนควรมีอยู่แล้ว
- งานที่ต้องทำเป็นภาษาไทยชัดเจน
- พฤติกรรมหรือผลลัพธ์ที่คาดหวัง
- คำใบ้ที่ช่วยคิดโดยไม่เฉลยก่อนเวลา
- บทเรียนที่เกี่ยวข้อง
- คำสั่งตรวจสอบผลเมื่อโจทย์มี code ที่รันได้

### `solutions/`

ให้เฉลยครบทุก exercise เป็นภาษาไทย โดยมี:

- คำตอบหรือ code ฉบับสมบูรณ์
- path และ full final state ของไฟล์ที่เฉลยสร้างหรือแก้
- เหตุผลว่า code ทำงานอย่างไรและทำไมเลือกวิธีนี้
- ตัวอย่างวิธีที่มักผิด พร้อมผลที่ตามมา
- คำสั่ง verify และผลลัพธ์ที่คาดหวัง

### `ai-prompts/`

รวบรวม prompt ใช้ซ้ำสำหรับอธิบายไฟล์ทีละบรรทัด ทำความเข้าใจ project trace request/response flow เสนอ refactor ที่ปลอดภัย สร้าง test debug error และ review architecture

ตัว prompt อาจเป็นไทยหรืออังกฤษตามความเหมาะสมกับเครื่องมือ แต่คำอธิบายว่าใช้เมื่อไร input ที่ต้องให้ AI วิธีตรวจคำตอบ และคำเตือนไม่ให้ copy แบบไม่เข้าใจ ต้องเป็นภาษาไทย

### `common-mistakes/`

จัดข้อผิดพลาดตามหัวข้อ และอธิบายแต่ละข้อเป็นภาษาไทย:

- อาการที่ผู้เรียนเห็น
- สาเหตุที่มักทำให้เกิด
- วิธี debug แบบเป็นขั้นตอน
- วิธีแก้ที่ปลอดภัย
- พฤติกรรมป้องกันในงานจริง
- code หรือ command ตัวอย่างเมื่อจำเป็นต่อการทำตาม

### `final-project/`

ให้โจทย์ที่ต่อยอดหรือ rebuild ส่วนสำคัญของ project โดยมี:

- โจทย์และบริบทการใช้งานเป็นภาษาไทย
- requirements และ acceptance criteria ที่ตรวจได้
- checkpoint plan และ checkpoint folders ที่ copy ได้จริง
- โครงสร้างไฟล์เริ่มต้นและไฟล์ฉบับเต็มที่ผู้เรียนต้องสร้าง
- คำใบ้เป็นลำดับจากน้อยไปมาก
- เฉลยหรือ solution walkthrough ภาษาไทย พร้อม full final state และคำสั่ง verify

## Quality Checklist

ก่อนจบ ให้ตรวจคอร์สตามรายการนี้:

- [ ] เริ่มจากปัญหาและอธิบายเหตุผลของแต่ละส่วน
- [ ] หัวข้อทั่วไป ร้อยแก้ว แบบฝึกหัด เฉลย และ common mistakes เป็นภาษาไทยธรรมชาติ
- [ ] คง technical terms, code identifiers, path และ CLI commands ที่ควรเป็นภาษาอังกฤษโดยไม่แปลจนแปลก
- [ ] ไม่มี paragraph ภาษาอังกฤษที่ไม่ใช่ code, output, prompt หรือ technical term ที่จำเป็น
- [ ] มีตัวอย่างเล็กก่อนเชื่อมกับ code ใน repository จริง
- [ ] บทเรียนเรียงจากง่ายไปยากและบอกตำแหน่งของผู้เรียนในคอร์ส
- [ ] ทุกบทมี mental model, บริบทงานจริง และ recap
- [ ] ทุกบทแสดง file tree, path, คำสั่ง และ code ที่จำเป็นโดยไม่พึ่งให้ผู้เรียนเปิด source repository คู่กัน
- [ ] ทุกไฟล์ที่สร้างหรือแก้ในบทมี full final state ท้ายบท
- [ ] ทุกบทมี run/build/test/debug command, expected result และ finished checkpoint
- [ ] ทุกบทมีแบบฝึกหัดและเฉลยสมบูรณ์ที่ตรวจได้
- [ ] common mistakes มีสาเหตุ วิธี debug วิธีแก้ และวิธีป้องกัน
- [ ] AI coding workflow สอนให้ตรวจคำตอบ ไม่ copy แบบไม่เข้าใจ
- [ ] checkpoint snapshots เป็นไฟล์จริงครบทุกบท ค้นหา เปรียบเทียบ และ copy ได้โดยไม่ต้องใช้ Git branch หรือ tag
- [ ] ไม่มี TODO, placeholder, outline-only lesson หรือข้อความให้รอตอนถัดไป

## ตัวอย่างการใช้งาน

ผู้ใช้:

```txt
ใช้ complete-guide-course-builder สร้างคอร์ส Complete Guide ภาษาไทยจาก https://github.com/tinyhttp/tinyhttp
เขียนไว้ที่ ./complete-guide
กลุ่มผู้เรียน: junior TypeScript backend developer
ทุกบทต้องมี code และไฟล์ฉบับเต็มท้ายบท เพื่อให้เรียนโดยไม่ต้องเปิด repository คู่กัน
```

รูปแบบการตอบและการทำงานของ agent:

```txt
กำลังใช้ complete-guide-course-builder เพื่อสร้างคอร์ส Complete Guide ภาษาไทยแบบทำตามได้เอง
จะวิเคราะห์ repository ที่ระบุและ commit/tag ที่ใช้ก่อน จากนั้นสร้างไฟล์คอร์สครบใต้ ./complete-guide
ทุกบทจะมี path, คำสั่ง, code ทีละขั้น, ไฟล์ฉบับเต็มท้ายบท และวิธีตรวจสอบผล
```

จากนั้น agent ต้องสร้าง file structure และเขียนบทเรียนครบทั้งหมด ไม่ถามว่าต้องการให้สร้างบทถัดไปหรือไม่

## Checklist ทดสอบกับ Sample Repository

ใช้ repository ขนาดเล็ก เช่น:

```txt
https://github.com/octocat/Hello-World
```

ตรวจว่าคอร์สที่สร้างมี:

- [ ] `complete-guide/00-repository-analysis.md`
- [ ] `complete-guide/01-course-roadmap.md`
- [ ] `complete-guide/02-module-plan.md`
- [ ] `complete-guide/03-checkpoints.md`
- [ ] `complete-guide/checkpoints/` ที่มี `README.md` และ `project/` จริงสำหรับ start และ finished state ของทุก lesson
- [ ] module อย่างน้อยหนึ่ง directory ใต้ `complete-guide/modules/`
- [ ] lesson files ที่มีหัวข้อบังคับครบและมีคำอธิบายภาษาไทยธรรมชาติ
- [ ] file tree, path, commands, incremental code และ full final state ของไฟล์ที่แตะในทุกบท
- [ ] คำสั่ง verify และ expected result ในทุกบทที่มี code หรือ command
- [ ] exercises และ solutions ภาษาไทยพร้อมคำตอบครบ
- [ ] AI prompts พร้อมคำอธิบายภาษาไทยและคำเตือนไม่ copy แบบไม่เข้าใจ
- [ ] common mistakes ภาษาไทยที่อธิบายอาการ สาเหตุ debug fix และการป้องกัน
- [ ] final project ภาษาไทยพร้อม solution walkthrough และ full final state
- [ ] ไม่มี TODO, placeholder, outline-only lesson หรือคำสั่งให้เปิด source repository เองเพื่อหา code ที่จำเป็น
- [ ] folder structure แสดงได้ด้วย directory listing

สำหรับ repository ที่เล็กมาก คอร์สอาจมีจำนวนน้อยบทลงได้ แต่ต้องยังเป็นคอร์สแบบ file-based ที่ทำตามได้ครบ

## ข้อผิดพลาดที่ต้องหลีกเลี่ยง

| สิ่งที่ทำผิด | ทำไมจึงไม่พอ | วิธีแก้ |
|---|---|---|
| สร้างแค่ roadmap | ผู้เรียนเรียนจากชื่อบทอย่างเดียวไม่ได้ | เขียนทุก lesson file ให้ครบ |
| ถามว่าจะสร้างบทถัดไปหรือไม่ | คอร์สต้องเสร็จในรอบเดียว | เขียนไฟล์ให้ครบจนจบ |
| ข้าม repository analysis | บทเรียนจะกลายเป็น generic และไม่ตรง project | สร้าง `00-repository-analysis.md` ก่อน lessons |
| แปลศัพท์เทคนิคตรงตัว | ภาษาไทยฟังแปลกและไม่ตรงศัพท์งานจริง | คง technical terms ที่ทีมพัฒนาใช้จริง |
| ปล่อย prose หรือหัวข้อทั่วไปเป็นอังกฤษ | ผู้เรียนไทยอ่านสะดุดและได้คอร์สกึ่งแปล | เขียนหัวข้อและคำอธิบายเป็นไทยธรรมชาติ |
| บอกให้เปิด repository เอง | ผู้เรียนทำตามไม่ได้จากคอร์สเพียงอย่างเดียว | ฝัง code, path และ full final state ไว้ในบท |
| บอกว่า file ใหญ่เกินจะแสดง | ผู้เรียนประกอบ final state ไม่ครบ | สอนผ่าน block เล็ก แล้วรวม full final state ท้ายบท |
| วาง code block ใหญ่โดยไม่อธิบาย | ผู้เรียนจำได้แต่ยังไม่เข้าใจ | แบ่ง code และอธิบายเหตุผล ผลเมื่อเอาออก และข้อผิดพลาด |
| สร้าง supporting directories เปล่า | มี structure แต่คอร์สยังไม่สมบูรณ์ | ใส่ exercise, solution, prompt, mistake และ final project ที่ใช้งานได้จริง |

## ผลลัพธ์ที่ผู้เรียนควรรู้สึก

คอร์สที่เสร็จแล้วต้องทำให้ผู้เรียนรู้สึกว่า:

- ฉันเข้าใจว่า project นี้ทำอะไร
- ฉันเข้าใจว่า architecture นี้เกิดขึ้นมาเพื่อแก้ปัญหาอะไร
- ฉันสามารถ rebuild ส่วนสำคัญของ project ได้ทีละขั้น
- ฉันรู้ว่า junior developer มักพลาดตรงไหน
- ฉันรู้วิธี debug
- ฉันรู้ว่าสิ่งนี้ใช้ในงานจริงอย่างไร
- ฉันรู้วิธีใช้ AI ช่วยเขียน code โดยไม่ copy แบบไม่เข้าใจ
- ฉันสามารถเอาแนวคิดนี้ไปใช้กับ project ของตัวเองได้
