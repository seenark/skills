# Gold Standard Checklist

Apply this checklist after planning, after lesson generation, and during quality-check mode.

## Plan-Stage Checks

- [ ] `pinned_version` comes from `git tag --sort=-version:refname | head -1`, `package.json.version`, or commit SHA.
- [ ] No chapter except overview has an empty source-file column.
- [ ] Every prerequisite is either an earlier chapter or an external topic discovered from code and repo docs.
- [ ] Chapter order is topological.
- [ ] `00 | Overview & Architecture ⭐ | (ทั้ง repo)` is the first row.
- [ ] Module groups are present for large repos.
- [ ] The plan ends with the confirmation command block: `go`, `merge 3,4`, `split 2`, `skip 5`, `add {หัวข้อ}`.

## Lesson-Stage Checks

- [ ] All 15 sections appear in order.
- [ ] No `master`, `main`, or `latest` appear in source links or install commands as version placeholders.
- [ ] Exercise 1 includes `🛑 Predict-Before-Run` and an expected-output `<details>` block.
- [ ] Exercises 1-3 and the mini project each include a Self-Check table with columns `ถ้าเห็น`, `แปลว่า`, `แก้ดังนี้`.
- [ ] Exercise 2 and later include a fenced `diff` block with at least one `+` line.
- [ ] Two checkpoints exist and each has at least two `[ ]` checklist items.
- [ ] Anti-pattern gallery contains four sins with wrong and corrected code.
- [ ] Every major section contains `⏱️` time-box text.
- [ ] Escalation template is present.
- [ ] Thai prose / English code rule is satisfied when `language: th`.
- [ ] Every lesson remains understandable without opening the repo.

## Course-Stage Checks

- [ ] Required support files exist.
- [ ] Folder structure matches the supporting-files contract.
- [ ] `final-project/checkpoints/checkpoint-1.md` exists.
- [ ] `final-project/checkpoints/checkpoint-2.md` exists.
- [ ] `README.md`, `PREREQUISITES.md`, and `COURSE_MAP.md` exist at the course root.
- [ ] `00-overview/lesson.md` exists.
- [ ] Each approved plan row has a chapter directory and `lesson.md`.

## Quality-Check Mode Output Rules

- [ ] Validate only the requested chapters.
- [ ] Report each failure against an explicit acceptance criterion.
- [ ] Provide exact fixes, not vague feedback.
- [ ] Do not generate unrelated chapters while quality-checking.
