# Complete Guide Course Builder Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ปรับ skill ให้สร้างคอร์สภาษาไทยธรรมชาติแบบ self-contained ซึ่งผู้เรียนทำตามได้โดยไม่เปิด source repository คู่กัน

**Architecture:** แก้ output contract ใน `SKILL.md` โดยเพิ่มข้อกำหนดภาษาไทยธรรมชาติและ lesson artifact contract ที่บังคับ file tree, path, commands, incremental code, full final file state และ verification ทุกบท ใช้ pressure scenarios ตรวจพฤติกรรมก่อนและหลังการแก้ไข

**Tech Stack:** Agent Skill Markdown, YAML frontmatter, Python-based assertion scripts, stateless model completion tests

## Global Constraints

- ร้อยแก้ว หัวข้อทั่วไป แบบฝึกหัด เฉลย ข้อผิดพลาด และบทสรุปต้องเป็นภาษาไทยธรรมชาติ
- คง technical terms ภาษาอังกฤษเมื่อเป็นคำที่นักพัฒนาไทยใช้จริง
- ไม่แปลประโยคอังกฤษทีละคำหรือสร้างศัพท์ไทยที่ไม่เป็นธรรมชาติ
- ผู้เรียนต้องทำตามได้โดยไม่เปิด source repository คู่กัน
- ทุกไฟล์ที่สร้างหรือแก้ในบทต้องมี full final state ท้ายบท
- ทุกบทต้องมีคำสั่งตรวจสอบและ expected result

---

### Task 1: สร้าง Pressure Scenarios และยืนยัน Baseline Failure

**Files:**
- Modify: `skills/complete-guide-course-builder/SKILL.md`
- Reference: `docs/superpowers/specs/2026-07-10-complete-guide-course-builder-refinement-design.md`

**Interfaces:**
- Consumes: skill ปัจจุบันและ approved design spec
- Produces: baseline evidence สำหรับ language contract และ self-contained lesson contract

- [ ] **Step 1: สร้าง scenario ทดสอบภาษา**

ใช้ prompt ที่ขอให้ agent สร้าง `common-mistakes`, `solutions` และ final-project walkthrough แล้วตรวจว่าหัวข้อทั่วไปและคำอธิบายเป็นภาษาไทย แต่ technical terms ยังเป็นอังกฤษได้

- [ ] **Step 2: สร้าง scenario ทดสอบ self-contained lesson**

ใช้ prompt ที่ขอบทเรียนจาก repository ขนาดเล็ก แล้วตรวจว่ามี file tree, path, commands, incremental code, full final file state, verification command และ expected result

- [ ] **Step 3: รัน scenario กับ skill ปัจจุบัน**

Expected: FAIL เพราะ skill ปัจจุบันใช้ “primarily in Thai”, ไม่บังคับหัวข้อไทย และไม่บังคับ full final file state

- [ ] **Step 4: บันทึก failure pattern**

ระบุ exact omissions ที่เกิดซ้ำ เพื่อให้ guidance ใหม่แก้ output shape โดยตรง

### Task 2: เพิ่ม Thai-Native Language Contract

**Files:**
- Modify: `skills/complete-guide-course-builder/SKILL.md:189-230`
- Modify: `skills/complete-guide-course-builder/SKILL.md:424-473`
- Modify: `skills/complete-guide-course-builder/SKILL.md:475-556`

**Interfaces:**
- Consumes: baseline language failures จาก Task 1
- Produces: output contract ที่กำหนดตำแหน่งที่ต้องใช้ภาษาไทยและข้อยกเว้น technical terms อย่างชัดเจน

- [ ] **Step 1: แก้ language contract**

กำหนดว่าร้อยแก้ว หัวข้อทั่วไป คำอธิบาย exercise solution common mistakes และ walkthrough เป็นภาษาไทยธรรมชาติ โดยคง code, path, CLI, identifiers, API names และ technical terms ที่ใช้จริง

- [ ] **Step 2: เพิ่ม natural-language teaching rules**

กำหนดให้เขียนจากความเข้าใจ อธิบายเหตุผล ใช้ mental model ตัวอย่างและการเปรียบเทียบตามบริบท และห้ามแปลอังกฤษทีละประโยค

- [ ] **Step 3: แก้ supporting-file contracts**

กำหนด output shape ภาษาไทยสำหรับ `exercises/`, `solutions/`, `common-mistakes/`, `final-project/` และคำอธิบายของ `ai-prompts/`

- [ ] **Step 4: เพิ่ม quality assertions**

เพิ่ม checklist ว่าหัวข้อทั่วไปและคำอธิบายเป็นไทย technical terms ไม่ถูกแปลจนผิดธรรมชาติ และไม่มี paragraph ภาษาอังกฤษที่ไม่จำเป็น

### Task 3: เพิ่ม Self-Contained Lesson Artifact Contract

**Files:**
- Modify: `skills/complete-guide-course-builder/SKILL.md:176-187`
- Modify: `skills/complete-guide-course-builder/SKILL.md:232-305`
- Modify: `skills/complete-guide-course-builder/SKILL.md:518-556`

**Interfaces:**
- Consumes: baseline self-contained failures จาก Task 1
- Produces: lesson format ที่มีข้อมูลครบสำหรับทำตามโดยไม่เปิด upstream repository

- [ ] **Step 1: ขยาย required lesson format**

เพิ่มหัวข้อภาษาไทยสำหรับโครงสร้างไฟล์ก่อนเริ่ม path และคำสั่งทีละขั้น สภาพไฟล์ฉบับสมบูรณ์ท้ายบท วิธีตรวจสอบผล และผลลัพธ์ที่คาดหวัง

- [ ] **Step 2: เพิ่ม code inclusion rules**

กำหนดว่า code ที่จำเป็นต่อการ compile/run/test ต้องอยู่ในบท ระบุ path ก่อน code block และห้ามใช้ลิงก์หรือคำสั่งให้เปิด repository แทนเนื้อหาที่จำเป็น

- [ ] **Step 3: กำหนด incremental-to-final flow**

ระหว่างสอนใช้ code block เล็กพร้อมคำอธิบาย หลังจบบทแสดง full final state ของทุกไฟล์ที่แตะ แม้เกิด code duplication

- [ ] **Step 4: เพิ่ม source provenance**

เมื่อใช้ upstream code ให้ระบุ source path และ commit/tag ที่วิเคราะห์ แต่คัดเนื้อหาที่จำเป็นมาไว้ในบท

- [ ] **Step 5: เพิ่ม verification contract**

ทุกบทต้องมี exact run/build/test/debug command, expected result และวิธีแยก expected warning ออกจาก failure

### Task 4: เพิ่ม Quick Reference, Failure Counters และ Example

**Files:**
- Modify: `skills/complete-guide-course-builder/SKILL.md`

**Interfaces:**
- Consumes: contracts จาก Task 2–3
- Produces: guidance ที่ agent สแกนและปฏิบัติตามได้สม่ำเสมอ

- [ ] **Step 1: เพิ่ม quick-reference table**

สรุปภาษา เนื้อหา code final state verification exercises และ supporting files ในตารางเดียว

- [ ] **Step 2: เพิ่ม good/bad output example**

แสดงตัวอย่างที่ผิดเพราะบอกให้เปิด repository และตัวอย่างที่ถูกซึ่งระบุ path, code, explanation และ final state

- [ ] **Step 3: เพิ่ม observed rationalization counters**

เพิ่ม counter สำหรับ “code ยาวเกินไป”, “ลิงก์เพียงพอแล้ว”, “มี snippet แล้วจึงไม่ต้องมี final file”, “คำอังกฤษดู professional กว่า” เฉพาะกรณีที่พบจาก test

- [ ] **Step 4: เพิ่ม red-flags list**

ให้ agent หยุดตรวจใหม่เมื่อบทเรียนพึ่ง source repository, ไม่มี full file state, หรือมี prose อังกฤษที่ไม่ใช่ technical term

### Task 5: รัน GREEN และ REFACTOR Tests

**Files:**
- Verify: `skills/complete-guide-course-builder/SKILL.md`

**Interfaces:**
- Consumes: refined skill
- Produces: evidence ว่า skill ใหม่ผ่าน language และ self-contained contracts

- [ ] **Step 1: รัน scenario เดิมพร้อม refined skill**

Expected: output plan/lesson contract ครบทุก required slot

- [ ] **Step 2: รัน wording micro-tests อย่างน้อย 5 ครั้ง**

เทียบ no-guidance control กับ refined guidance และอ่านผลทุกครั้งเพื่อแยก template echo ออกจาก compliance จริง

- [ ] **Step 3: ตรวจ metadata และ required sections**

ตรวจ YAML name/description, discovery wording, quick reference, Thai contract, full final state, verification และ common mistakes

- [ ] **Step 4: ตรวจ placeholder และ contradiction**

ค้นหา TODO/TBD, กฎที่ขัดกันระหว่าง “small code block” กับ “full final state”, และข้อยกเว้นภาษาที่กว้างเกินไป

- [ ] **Step 5: แก้ loophole แล้ว re-test**

แก้เฉพาะ loophole ที่พบจริง และรัน scenario ซ้ำจนผ่าน

- [ ] **Step 6: Commit refined skill**

```bash
git add skills/complete-guide-course-builder/SKILL.md docs/superpowers/plans/2026-07-10-complete-guide-course-builder-refinement.md
git commit -m "feat: make Thai complete guides self-contained"
```
