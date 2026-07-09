# Lesson 01: Final Project: ปรับ Hello-World ให้เป็น onboarding repository

## Lesson Goal

เมื่อจบบทนี้ นักเรียนจะเข้าใจว่า นำสิ่งที่เรียนมาสร้าง README ที่ใช้สื่อสารกับทีมได้จริง

## Start from branch

Start from branch: module-03-lesson-01-start

## 1. Start With the Problem

ปัญหาไม่ใช่ว่าเราเขียน code ไม่เป็น แต่คือคนอื่นเปิด repository แล้วไม่รู้ว่า project นี้มีไว้ทำอะไร ถ้าไม่มีคำอธิบายที่ดี คนในทีมจะเสียเวลาเดา context และอาจใช้งาน project ผิด

## 2. Mental Model

ให้คิดว่า repository คือ “แฟ้มงานของทีม” ส่วน README คือ “หน้าปกแฟ้ม” หน้าปกที่ดีบอกได้ทันทีว่าแฟ้มนี้คืออะไร ใครควรอ่าน และควรเริ่มจากตรงไหน

## 3. Simplest Code Example

```txt
Hello World!
```

บรรทัดนี้คือเนื้อหาเดิมในไฟล์ `README` ของ repository ตัวอย่าง มันบอกว่ามีข้อความทักทาย แต่ยังไม่บอก purpose, usage หรือ learning context ถ้าลบบรรทัดนี้ออก repository จะไม่มีคำอธิบายหลักให้ GitHub แสดง

ข้อผิดพลาดที่ beginner มักทำคือคิดว่า README ต้องยาวเสมอ จริง ๆ README ต้อง “ตอบคำถามแรกของคนอ่าน” ให้ได้ก่อน

## 4. Naive Version

```txt
My first repository on GitHub!
```

เวอร์ชันนี้เรียบง่ายและดีสำหรับเริ่มเรียน เพราะบอกเจตนาว่านี่คือ repository แรก แต่ยังไม่พอสำหรับงานจริง เพราะคนอ่านยังไม่รู้ว่าจะเรียนรู้อะไรหรือควรทำอะไรต่อ

## 5. Limitation

เมื่อ project โตขึ้น README สั้นเกินไปจะทำให้ onboarding ยากขึ้น Junior developer อาจไม่รู้วิธี setup, วิธี run test, หรือไฟล์ไหนสำคัญ

## 6. Better Solution

```md
# Hello World

Repository นี้ใช้ฝึกอ่าน GitHub repository ขั้นพื้นฐาน

## What you will learn

- repository คืออะไร
- README ช่วยอธิบาย project อย่างไร
- branch checkpoint ใช้ติดตามการเรียนอย่างไร
```

โครงนี้ดีขึ้นเพราะเริ่มจากชื่อ project ตามด้วย purpose และ learning outcomes ถ้าลบส่วน `What you will learn` ออก คนเรียนจะยังอ่านได้ แต่จะไม่รู้เป้าหมายชัดเจน

## 7. Real Repository Usage

ใน repository จริงมีไฟล์ `README` เพียงไฟล์เดียว ให้โฟกัสที่บทบาทของไฟล์นี้: เป็น entrypoint ของคนอ่าน ส่วนเรื่อง framework, database, API หรือ deployment ให้ ignore ก่อน เพราะ repository นี้ไม่มีส่วนเหล่านั้น

## 8. Common Mistakes

- เขียน README เป็นแค่ slogan: คนอ่านยังไม่รู้วิธีใช้งาน
- ไม่บอก purpose: คนในทีมต้องถามซ้ำ
- ใส่รายละเอียดเยอะก่อนภาพรวม: beginner จะหลงก่อนเข้าใจ project

## 9. Real-World Context

ในบริษัท README ที่ดีช่วยลดเวลาของ onboarding, code review และ support ถ้า project มีหลาย service README คือจุดแรกที่ developer ใช้ตัดสินใจว่าจะ run, test หรือ debug อย่างไร

## 10. AI Coding Workflow

ใช้ prompt เหล่านี้ได้:

```txt
Explain this README like I am a junior developer.
```

```txt
What information is missing before a new teammate can use this repository?
```

```txt
Suggest a safer README refactor without changing the project meaning.
```

อย่า copy คำตอบ AI ทันที ให้เช็คกับไฟล์จริงใน repository ก่อนเสมอ

## 11. Exercise

เปิดไฟล์ `README` แล้วเขียนคำอธิบายเพิ่ม 3 ส่วน: purpose, what you will learn, และ next step

## 12. Solution

```md
# Hello World

Repository นี้ใช้ฝึกเริ่มต้นกับ GitHub repository

## Purpose

ใช้เป็นตัวอย่างเล็ก ๆ สำหรับเข้าใจว่า README คือ entrypoint ของ project

## What you will learn

- อ่าน repository จากไฟล์หลัก
- อธิบาย project แบบสั้นและชัด
- ใช้ branch checkpoint ระหว่างเรียน

## Next step

ลองแก้ README ใน branch ใหม่ แล้ว compare กับ finished checkpoint
```

Solution นี้ทำงานเพราะตอบคำถามแรกของคนอ่านครบ: project คืออะไร เรียนอะไร และควรทำอะไรต่อ

## 13. Recap

บทนี้สอนว่า README ไม่ใช่ไฟล์ตกแต่ง แต่เป็น interface แรกระหว่าง project กับคนอ่าน บทถัดไปจะใช้แนวคิดนี้ทำ final challenge ให้เหมือนงานจริงมากขึ้น

## Finished checkpoint

Your code should now match branch: module-03-lesson-01-finished
