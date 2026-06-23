# User Guide

ใช้คู่มือนี้เป็น prompt contract สำหรับผู้ใช้ของ skill `lesson-generator`.

## เริ่มคอร์สใหม่

ใช้ skill [lesson-generator] สร้างคอร์สให้ฉัน

```yaml
repo_path: "https://github.com/expressjs/express"
language: "th"
depth: "deep"
audience: "intermediate"
```

ไปสำรวจ repo เองทั้งหมด วางแผนบทเรียนเอง
เสนอ plan มาก่อน รอฉันยืนยันแล้วค่อยสร้าง

Expected compliant behavior:
- agent สำรวจ repo เอง
- agent หา `pinned_version` เอง
- agent เสนอ plan ก่อนเสมอ
- agent รอ `go` หรือคำสั่งแก้ plan ก่อนสร้าง course

## คำสั่งแก้แผน

ใช้คำสั่งสั้น ๆ หลังจากได้ plan แล้ว:

```text
go
merge 3,4
split 2
skip 5
add {หัวข้อ}
```

Rules:
- `merge A,B` ใช้กับบทที่ติดกันเท่านั้น
- `split N` ต้องแตกตาม source-file responsibility จริง
- `skip N` ต้องลบบทนั้นแล้ว reindex chapter IDs, prerequisites, prev/next
- `add {หัวข้อ}` ทำได้เฉพาะหัวข้อที่ผูกกับ source files หรือ architecture ที่ค้นพบจริง

## Quality Check

ใช้เมื่อมี chapter อยู่แล้วและต้องการตรวจคุณภาพแบบเจาะจง:

```yaml
repo_path: "./express"
pinned_version: "4.18.2"
check_chapters:
  - "00-overview"
  - "01-middleware"
```

Expected compliant behavior:
- ตรวจเฉพาะ chapter ที่ระบุ
- รายงาน acceptance-criteria failures แบบเป็นข้อ ๆ
- บอก exact fixes
- ไม่สร้าง chapter อื่นเพิ่ม

## Escalation Template For Stuck Learners

คัดลอกแล้วกรอกเฉพาะส่วนที่เกี่ยวข้อง:

````markdown
ฉันติดอยู่ที่ chapter `{chapter}` (`{title}`) step `{step}`
ใช้ pinned version `{pinned_version}` อยู่
ไฟล์ที่ฉันแก้:
- `...`

ผลลัพธ์ที่เห็น:
```text
...
```

ผลลัพธ์ที่คาดหวัง:
```text
...
```

ช่วยบอกหน่อยว่าควรกลับไปดู source file ไหนก่อน และควรตรวจอะไรเป็นลำดับแรก
````

Expected compliant behavior:
- agent อ่าน chapter หรือ exercise ที่อ้างถึงก่อน
- agent ตอบโดยอิง pinned version เท่านั้น
- agent ชี้ source files และ next inspection steps แบบเจาะจง

## Quick Reference

| สิ่งที่ผู้ใช้พิมพ์ | สิ่งที่ skill ต้องทำ |
|---|---|
| create/generate course + repo inputs | สำรวจ repo, pin version, เสนอ plan, รอคำยืนยัน |
| `go` | สร้าง course ทั้งหมดตาม plan ปัจจุบัน |
| `merge 3,4` | รวมสองบทที่ติดกันแล้ว reindex |
| `split 2` | แตกบทตาม source-file responsibilities จริง |
| `skip 5` | ลบบทแล้ว reindex |
| `add caching` | เพิ่มบทเฉพาะเมื่อหา source-backed scope ได้จริง |
| quality-check + `check_chapters` | ตรวจเฉพาะบทที่ระบุและรายงาน exact fixes |
| stuck/escalation prompt | ตอบแบบ teacher-on-demand จาก source ที่ pin ไว้ |
