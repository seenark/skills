# Reference

## Required lesson order

Use this exact order:

1. `# Chapter`
2. `> ⚠️ **บทนี้อ้างอิง`
3. `## 🗺️ บทนี้อยู่ตรงไหนของภาพรวม`
4. `## 📖 Vocabulary ก่อนเริ่มเลย`
5. `## 🤔 What?`
6. `## ❓ Why?`
7. `## 🌍 ของจริงใช้ที่ไหน`
8. `## 🖼️ เปรียบเทียบให้เห็นภาพ`
9. `## ⚙️ How?`
10. `## 🧠 Checkpoint #1`
11. `## 💻 Hands-On`
12. `## 🚫 4 บาปที่ห้ามทำ`
13. `## 🔬 Deep Dive — Edge Cases`
14. `## 🏗️ Mini Project`
15. `## 🧠 Checkpoint #2`
16. `## ❓ 5 คำถามทบทวน`
17. `## 💬 ถ้าติดจริงๆ`
18. `## 🔗 สรุปและเชื่อมบทถัดไป`
19. `## 📎 Resources`

## Mandatory content rules

- Pin every source link and install command to the requested version or verified package release.
- Add a self-check table for every exercise and the mini project.
- Exercise 1 must include Predict-Before-Run using `<details>`.
- Include at least two checklist checkpoints using `- [ ]`.
- Add an anti-pattern gallery with four bugs.
- Exercise 2 and later must use `diff` blocks with added lines only.
- Every major section must include `⏱️` on the heading line.
- The How section must include an escape hatch.
- Include a Real-World section.
- Include a Visual Map dependency graph.
- Include an Escalation Template.

## Forbidden output

- No `master` links.
- No exercise without expected output.
- No exercise or mini project without a self-check table.
- No code explanation without Thai comments on important lines.
- No assumed knowledge beyond prerequisites.
- No major section without a time-box.
- Thai prose only when `language: "th"`; code, error text, and commands stay English.

## Source deep-dive rules

- Source snippets must be short, pinned, line-linked, and immediately explained.
- Every important code line in snippets must have a Thai comment, inline or directly below.
- If exact source lines cannot be verified, mark the link `unverified — confirm first` instead of inventing line numbers.

## Exercise rules

- Exercise 1 shows full code plus Predict-Before-Run.
- Exercise 2 and Exercise 3 are diffs from the prior exercise and show only `+` added lines.
- Every exercise must include exact commands and exact expected output.
- Every self-check table uses columns exactly `ถ้าเห็น... | แปลว่า | แก้ยังไง`.

## Folder structure contract

```txt
course-{repo_name}/
├── README.md
├── PREREQUISITES.md
├── COURSE_MAP.md
└── chapters/
    └── chapter-{chapter_number}-{topic_slug}/
        ├── lesson.md
        ├── exercises/
        │   ├── ex1-starter.js
        │   └── ex2-starter.js
        └── final-project/
            ├── mini-project.js
            └── checkpoints/
                ├── checkpoint-1.md
                └── checkpoint-2.md
```
