---
chapter: "{chapter_number}"
title: "{topic}"
repo: "{repo}"
pinned_version: "{pinned_version}"
prerequisites:
  - "{prerequisite_1}"
prev_chapter: "{prev_chapter}"
next_chapter: "{next_chapter}"
last_updated: "{today}"
---

# Chapter {chapter_number}: {topic}

> ⚠️ **บทนี้อ้างอิง `{repo}` ที่เวอร์ชัน `{pinned_version}` เท่านั้น**
> ถ้าคุณเปิดไฟล์คนละ commit ให้หยุดก่อน แล้วสลับไปที่เวอร์ชันนี้ก่อนอ่านต่อ

## 🗺️ บทนี้อยู่ตรงไหนของภาพรวม ⏱️ 5 นาที

```mermaid
graph TD
  A[ก่อนหน้า: {prev_chapter}] --> B[บทนี้: {topic}]
  B --> C[ถัดไป: {next_chapter}]
  B --> D[{source_file_1}]
```

- บทนี้ผูกกับไฟล์ `{source_file_1}` และ `{source_file_2}`
- เป้าหมายคือเข้าใจ `{concept}` ก่อนลงมือแก้โค้ด

## 📖 Vocabulary ก่อนเริ่มเลย ⏱️ 5 นาที

- **{concept}**: คำหลักของบทนี้
- **Pinned source**: ลิงก์ที่ตรึงไว้กับ `{pinned_version}`
- **Diff exercise**: แบบฝึกที่แสดงเฉพาะบรรทัดที่เพิ่มจากขั้นก่อน

## 🤔 What? ⏱️ 7 นาที

บทนี้สอนว่า `{concept}` คืออะไร และมันเชื่อมกับ `{package}` ยังไง

อ้างอิงหลัก: https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5

```ts
const value = "{concept}" // ค่านี้แทนแนวคิดหลักของบท
console.log(value) // พิมพ์แนวคิดออกมาให้เห็นผลทันที
```

บรรทัดสำคัญต้องมีคอมเมนต์ไทยกำกับเสมอ เพื่อไม่ให้ผู้อ่านต้องเดาเอง

## ❓ Why? ⏱️ 6 นาที

ถ้าไม่เข้าใจ `{concept}` คุณจะอ่าน `{source_file_1}` แล้วไม่รู้ว่าบรรทัดไหนคือแกนของระบบ

- ช่วยลดการเดาเวลาตาม flow จริง
- ช่วยเชื่อมบทนี้กับ `{next_chapter}`

## 🌍 ของจริงใช้ที่ไหน ⏱️ 5 นาที

- ใช้ตอนต้องตาม request จริงใน `{repo_name}`
- ใช้ตอนรีวิว PR ที่แตะ `{source_file_1}` หรือ `{source_file_2}`
- ใช้ตอนแก้บั๊กที่ต้องย้อนดู source แบบ pin เวอร์ชันเดียวกัน

## 🖼️ เปรียบเทียบให้เห็นภาพ ⏱️ 4 นาที

ให้คิดว่า `{analogy}`

- source file คือแผนที่จริง
- lesson นี้คือคู่มืออ่านแผนที่แบบไม่ข้ามจุดสำคัญ

## ⚙️ How? ⏱️ 10 นาที

1. เปิดไฟล์ pinned ตามลิงก์ด้านบน
2. อ่านเฉพาะช่วงบรรทัดที่เกี่ยวกับ `{concept}`
3. รันแบบฝึกตามลำดับ

ถ้าเกิน 10 นาทีแล้วยังไม่เห็นภาพ ให้ข้ามไป Hands-On ก่อน แล้วค่อยย้อนกลับมาอ่านใหม่

## 🧠 Checkpoint #1 ⏱️ 3 นาที

- [ ] อธิบายได้ว่า `{concept}` คืออะไรในหนึ่งประโยค
- [ ] เปิด source link ที่ pin ด้วย `{pinned_version}` ได้จริง

## 💻 Hands-On ⏱️ 25 นาที

### Exercise 1 — อ่านแล้วเดาก่อน

> 🛑 **หยุดก่อน! เดาก่อนรัน**
<details><summary>คุณคิดว่าโปรแกรมนี้จะพิมพ์อะไร?</summary>
ตอบด้วยประโยคสั้นๆ ก่อนรันจริง
</details>

```js
const topic = "{topic}" // ตัวแปรนี้เก็บชื่อหัวข้อของบท
console.log(`Learning: ${topic}`) // คอมเมนต์ไทยบอกผลลัพธ์ที่คาดไว้
```

รัน:

```bash
node exercises/ex1-starter.js
```

**ผลที่ควรได้:**

```txt
Learning: {topic}
```

| ถ้าเห็น... | แปลว่า | แก้ยังไง |
| --- | --- | --- |
| `MODULE_NOT_FOUND` | รันผิดโฟลเดอร์ | `cd` ไปที่ chapter folder ก่อน |
| ข้อความไม่ตรง | แก้ string ไม่ครบ | เทียบกับโค้ดตัวอย่างแล้วรันใหม่ |

### Exercise 2 — เพิ่ม source link ที่ pin ไว้

```diff
+ const sourceUrl = "https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5"
+ console.log(sourceUrl)
```

รัน:

```bash
node exercises/ex2-starter.js
```

**ผลที่ควรได้:**

```txt
https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5
```

| ถ้าเห็น... | แปลว่า | แก้ยังไง |
| --- | --- | --- |
| default branch link | ใช้ลิงก์ผิด branch | เปลี่ยนเป็น `/blob/{pinned_version}/` |
| `undefined` | ยังไม่ได้ประกาศตัวแปร | เพิ่มบรรทัดตาม diff ให้ครบ |

### Exercise 3 — ต่อข้อความสรุป

```diff
+ const summary = `{concept} -> {next_chapter}`
+ console.log(summary)
```

รัน:

```bash
node exercises/ex2-starter.js
```

**ผลที่ควรได้:**

```txt
{concept} -> {next_chapter}
```

| ถ้าเห็น... | แปลว่า | แก้ยังไง |
| --- | --- | --- |
| ไม่มีบรรทัด summary | ยังไม่เพิ่ม diff ชุดล่าสุด | เติมบรรทัด `summary` แล้วรันใหม่ |
| พิมพ์ placeholder ผิด | แทนค่าหัวข้อไม่ครบ | เช็ก `{concept}` และ `{next_chapter}` |

## 🚫 4 บาปที่ห้ามทำ ⏱️ 8 นาที

- **บาปที่ 1**: ใช้ลิงก์ default branch แล้วคิดว่าเท่ากับ lesson นี้
- **บาปที่ 2**: อธิบาย source โดยไม่ใส่คอมเมนต์ไทยให้บรรทัดสำคัญ
- **บาปที่ 3**: ข้าม expected output แล้วปล่อยให้คนเรียนเดาเอง
- **บาปที่ 4**: พูดถึงความรู้ที่ไม่ได้อยู่ใน prerequisites

## 🔬 Deep Dive — Edge Cases ⏱️ 10 นาที

- ถ้าหา line number ไม่เจอ ให้เขียน `unverified — confirm first`
- ถ้า package name มาจาก monorepo metadata ให้อ่านเฉพาะไฟล์ metadata ที่ยืนยันชื่อแพ็กเกจได้
- ถ้า source snippet ยาวเกินจำเป็น ให้ตัดให้สั้นแล้วอธิบายทันที

## 🏗️ Mini Project ⏱️ 20 นาที

สร้างสคริปต์สั้นที่พิมพ์ chapter, pinned version, และ source link เดียวกัน

```js
console.log("Chapter {chapter_number}") // บอกเลขบทให้ตรงกับ lesson
console.log("{pinned_version}") // ยืนยันเวอร์ชันที่ pin ไว้
console.log("https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5") // ลิงก์ source ที่ต้องใช้จริง
```

รัน:

```bash
node final-project/mini-project.js
```

**ผลที่ควรได้:**

```txt
Chapter {chapter_number}
{pinned_version}
https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5
```

| ถ้าเห็น... | แปลว่า | แก้ยังไง |
| --- | --- | --- |
| เวอร์ชันไม่ตรง | pin คนละค่า | ใช้ค่าจาก frontmatter เท่านั้น |
| ลิงก์ไม่มี `#L` | อ้างอิงไม่ละเอียดพอ | เติมช่วงบรรทัดที่ตรวจสอบแล้ว |

## 🧠 Checkpoint #2 ⏱️ 4 นาที

- [ ] อธิบายได้ว่าทำไม lesson นี้ห้ามใช้ `main` หรือ `master`
- [ ] รู้ว่าถ้าตรวจ line number ไม่ได้ต้องเขียน `unverified — confirm first`

## ❓ 5 คำถามทบทวน ⏱️ 6 นาที

1. ทำไม `pinned_version` ต้องมาก่อนการเขียน lesson?
2. Exercise 2 ต่างจาก Exercise 1 ยังไง?
3. เมื่อไรควรใช้ `unverified — confirm first`?
4. ทำไม self-check table ต้องมีทุก exercise?
5. บทนี้พาไปเชื่อม `{next_chapter}` ยังไง?

## 💬 ถ้าติดจริงๆ ⏱️ 5 นาที

ส่งข้อความตามนี้:

```txt
สิ่งที่ทำ:
คาดว่าจะได้:
ได้จริง:
ลองแก้แล้ว:
Node version:
```

## 🔗 สรุปและเชื่อมบทถัดไป ⏱️ 4 นาที

สรุป: ตอนนี้คุณรู้แล้วว่า `{concept}` ต้องอ่านจาก source ที่ pin ไว้ยังไง และจะต่อยอดไป `{next_chapter}` ได้ยังไง

## 📎 Resources ⏱️ 3 นาที

- Repo: https://github.com/{repo}
- Pinned source: https://github.com/{repo}/blob/{pinned_version}/{source_file_1}#L1-L5
- Support docs: `README.md`, `PREREQUISITES.md`, `COURSE_MAP.md`
