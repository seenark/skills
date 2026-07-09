# Lesson Template

Use this file as the authoritative template for every generated `lesson.md`. Every lesson must contain the 15 required sections below in this exact order. Do not collapse, rename, or reorder them.

## 1. YAML Frontmatter

Required frontmatter keys:

```yaml
---
chapter: "00"
title: "Overview & Architecture"
repo: "{owner}/{repo}"
pinned_version: "{pinned_version}"
difficulty: "{beginner|intermediate|advanced}"
time_estimate: "90 นาที"
prerequisites:
  - "พื้นฐาน Node.js"
prev_chapter: null
next_chapter: "01-entrypoints"
last_updated: "{YYYY-MM-DD}"
---
```

Rules:
- `last_updated` must use the generation date in `YYYY-MM-DD`.
- `pinned_version` must be a real tag, package version fallback, or commit SHA.
- Internal navigation values must match the final chapter map.

## 2. Version Warning Callout

Start the body with a pinned-version warning callout.

```markdown
> [!warning] Version Pin
> บทนี้อ้างอิง source จาก `{owner}/{repo}` ที่เวอร์ชัน `{pinned_version}` เท่านั้น
> ลิงก์ทั้งหมดต้องชี้ไปที่ `https://github.com/{owner}/{repo}/tree/{pinned_version}` หรือ `https://github.com/{owner}/{repo}/blob/{pinned_version}/...`
> ห้ามใช้ `master`, `main`, `latest` หรือ branch ที่ไม่ pin เวอร์ชัน
```

Rules:
- Every source URL must be rooted at `https://github.com/{owner}/{repo}/tree/{pinned_version}` or `/blob/{pinned_version}/...`.
- Never use branch names in generated source links.
- If install text references npm and `package.json.version` exists, use `{pkg}@{package_json.version}`.
- If the pinned tag starts with `v`, strip only the leading `v` for npm install text.

## 3. Visual Map + Dependency Graph

Include both:
- a short visual chapter map
- an ASCII dependency graph for the concept in this chapter

Example shape:

```text
Input → Parser → Normalizer → Output
          │
          └── Error Path
```

Add source-backed bullet points that map the graph nodes to real files.

## 4. Vocabulary Table

Add a markdown table for the minimum vocabulary needed to read the chapter.

| คำศัพท์ | หมายถึงอะไร | ดูจากไฟล์ไหน |
|---|---|---|
| entry point | จุดเริ่มต้นของ flow | `src/index.ts` |

Keep prose in the requested lesson language. File paths and code symbols remain English.

## 5. What?

Explain what the chapter concept is, what problem it solves, and which source files define it. This section must stand on its own for a learner who has not opened the repo.

Add `⏱️` time-box text.

## 6. Why?

Explain why the repository needs this concept, what breaks without it, and what trade-off the maintainers accepted.

Add `⏱️` time-box text.

## 7. Real-World Usage

Show how a real user or integrator encounters this concept.
- Include at least one pinned usage snippet or command.
- Include a source link or README link pinned to `{pinned_version}`.

Add `⏱️` time-box text.

## 8. Thai Analogy + ASCII Diagram

Use the requested prose language for the analogy. When `language: th`, this section must explain the concept with a Thai analogy plus an ASCII diagram.

```text
[Client] -> [Router] -> [Handler]
```

Code blocks, identifiers, and comments inside code remain English.

## 9. How? Source Code Deep Dive

Walk through the real implementation.
- Anchor each major sub-section to real files/functions.
- Use pinned GitHub links.
- Explain control flow, data flow, and failure paths.
- Quote only the minimum source needed.

Add `⏱️` time-box text.

## 10. Checkpoint #1

Add an explicit checkpoint with at least two unchecked checklist items.

```markdown
## Checkpoint #1
- [ ] อธิบาย flow จาก input ถึง output ได้
- [ ] ชี้ไฟล์หลักที่รับผิดชอบ concept นี้ได้
```

The learner must be able to self-verify before continuing.

## 11. Hands-On Exercises

Provide at least three source-backed exercises.

### Exercise 1 requirements
- Must include a `🛑 Predict-Before-Run` prompt.
- Must include a collapsible `<details>` block with expected output.
- Must include a three-column Self-Check table.

```markdown
### Exercise 1 — Trace the entry flow

🛑 Predict-Before-Run: ก่อนรัน ให้เดาก่อนว่า function ไหนถูกเรียกก่อนและเพราะอะไร

```bash
npm install {pkg}@{package_json.version}
npm test -- path/to/example
```

<details>
<summary>Expected output</summary>

```text
handler initialized
request normalized
response sent
```

</details>

| ถ้าเห็น | แปลว่า | แก้ดังนี้ |
|---|---|---|
| `Cannot find module` | ติดตั้ง dependency ไม่ครบ | รัน install ตามเวอร์ชันที่ pin |
```

### Exercise 2+ requirements
- Each exercise after the first must include a fenced `diff` block.
- The `diff` block must show only changed lines.
- The `diff` block must include at least one `+` line.
- Each exercise must include the same three-column Self-Check table.

```markdown
### Exercise 2 — Add logging around normalization

```diff
+ console.log('before normalize')
  const normalized = normalize(input)
+ console.log('after normalize')
```

| ถ้าเห็น | แปลว่า | แก้ดังนี้ |
|---|---|---|
| output ไม่เปลี่ยน | วาง log ผิดตำแหน่ง | ย้ายไปก่อนและหลัง `normalize` |
```

## 12. Anti-Pattern Gallery

Add exactly four numbered sins unless the source concept genuinely has more. If there are more than four, keep the first four most harmful here and move extra pitfalls to Edge Cases.

Each sin must contain:
- wrong code
- corrected code
- explanation of why the wrong version fails

Structure:

```markdown
1. **Sin: Skip normalization**

Wrong:
```ts
return handle(input)
```

Correct:
```ts
return handle(normalize(input))
```

Why it fails: ...
```

## 13. Edge Cases Deep Dive

Cover version-sensitive behavior, odd control-flow branches, failure states, and extra pitfalls that did not fit inside the four anti-pattern slots.

Add `⏱️` time-box text.

## 14. Mini Project

End with a runnable mini project that combines the chapter’s main ideas.
- Must be source-backed.
- Must include setup steps.
- Must include verification steps.
- Must include the same Self-Check table.

```markdown
## Mini Project — Build a tiny request pipeline

Goal: สร้าง flow ขนาดเล็กที่เลียนแบบการทำงานจาก `src/router.ts` และ `src/handler.ts`

Steps:
1. ...
2. ...

Verification:
```bash
npm test -- mini-project
```

| ถ้าเห็น | แปลว่า | แก้ดังนี้ |
|---|---|---|
| test fail at parser | parser contract ยังไม่ตรง | เทียบกับ source ที่ pin แล้วแก้ signature |
```

## 15. Checkpoint #2 + Q&A + Escalation Template + Summary + Resources

This final section must include all five parts in one closing section, in this order:
1. `Checkpoint #2` with at least two unchecked checklist items.
2. `Q&A` with likely learner questions.
3. `Escalation Template` for when the learner is blocked.
4. `Summary` of the chapter.
5. `Resources` with pinned links and Obsidian wiki links.

Required escalation template:

```markdown
### Escalation Template

I am stuck in chapter `{chapter}` (`{title}`) at step `{step}`.
I used pinned version `{pinned_version}`.
Files I touched:
- `...`
Observed output:
```text
...
```
Expected output:
```text
...
```
Question:
- What should I inspect next in the pinned source?
```

Required resource rule:
- Internal lesson references must use Obsidian wiki links, for example `[[00-overview]]`.
- External references must stay pinned to `{pinned_version}`.

## Global Rules

- Prose uses the requested `language`; code blocks use English identifiers and English comments.
- Every major section must include `⏱️` time-box text.
- Every concept must map to real source files or repo-wide architecture.
- The lesson must be understandable without requiring the learner to open the repo.
- Exercise starter files are optional; the markdown lesson is not optional.
