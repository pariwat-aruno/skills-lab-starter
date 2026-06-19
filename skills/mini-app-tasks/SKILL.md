---
name: mini-app-tasks
description: >
  ตัด architecture document เป็น TODO ย่อยที่ Claude Code ทำได้ทีละชิ้น
  พร้อม acceptance criteria ของแต่ละ task — ป้องกัน Claude Code ทำพร้อมกัน
  หลายอย่างจนพัง
  ใช้ skill นี้เมื่อ: เพิ่งทำ architecture เสร็จและพร้อมส่ง Claude Code,
  ตัด task ให้หน่อย, แตก architecture เป็น issue, ทำ TODO list,
  ทำ task breakdown, สร้าง issue list, ตัดงานให้ Claude Code,
  ทำ checklist build, แตกงานเป็นชิ้นเล็กๆ, จาก architecture → tasks
  แม้ผู้ใช้จะไม่พูดคำเหล่านี้ตรงๆ ถ้าผ่าน mini-app-architect แล้ว
  และพร้อม implement ให้ใช้ skill นี้เป็นขั้นสุดท้ายก่อน hand off Claude Code
  ⚠️ ถ้ายังไม่มี architecture ให้กลับไปใช้ mini-app-architect ก่อน
  ผลลัพธ์: ไฟล์ TASKS.md ที่มี task ย่อยพร้อม acceptance criteria
  Claude Code หยิบไป build ทีละชิ้นได้ทันที
tags: [tasks, breakdown, mini-app, claude-code]
---

# Mini App Tasks — แตก architecture เป็น TODO ย่อย

หน้าที่: รับ Architecture Document → ตัดเป็น task ย่อยที่:
1. ทำได้ทีละชิ้น (ไม่ depend อันอื่นแบบงง)
2. มี acceptance criteria ชัด
3. มีลำดับ (อันไหนต้องทำก่อน)
4. Claude Code อ่านแล้วเริ่ม build ได้ทันที

หลักการ: **"task ใหญ่ทำให้ AI หลุด — task เล็กทำให้ AI โฟกัส"**
(จาก Matt /to-issues)

---

## ขั้นตอน

### STEP 1 — เช็ค Input

ต้องมี Architecture Document จาก mini-app-architect
ถ้าไม่มี → "ต้องผ่าน `mini-app-architect` ก่อนครับ ออกแบบเสร็จแล้วค่อยตัด task"

ถ้ามี → STEP 2

---

### STEP 2 — สกัด Task จาก Setup Plan

หยิบ Setup Plan จาก architecture แล้วแตกแต่ละข้อให้ละเอียดขึ้น:

ตัวอย่าง:
```
Setup Plan ข้อ 3: Extensions → Apps Script → ใส่โค้ด
   ↓ แตกเป็น
- TASK-03a: ตั้ง Script Properties (SHEET_ID, N8N_WEBHOOK_URL)
- TASK-03b: เขียน function getConfig()
- TASK-03c: เขียน function onFormSubmit()
- TASK-03d: เขียน helper logError()
```

**กฎการตัด:**
- 1 task = 1 function หรือ 1 config หรือ 1 deployment step
- 1 task ควรทำเสร็จใน 5-15 นาที (สำหรับ Claude Code)
- Task ที่ใหญ่กว่านี้ → แตกย่อยอีก
- ทุก task ต้องมี **acceptance criteria** เช็คได้ว่าเสร็จไหม

---

### STEP 3 — สร้างไฟล์ TASKS.md

ตอบเป็น Markdown ที่ copy ไปวาง GitHub root ได้:

````markdown
# TASKS.md — [ชื่อ Project]

> **สำคัญ:** Claude Code อ่านไฟล์นี้คู่กับ CONTEXT.md + architecture.md
> ทำทีละ task ตามลำดับ ห้ามทำพร้อมกัน

## วิธีใช้

1. หยิบ task แรกที่ยังไม่ติ๊ก
2. อ่าน acceptance criteria ให้เข้าใจ
3. Implement
4. ทดสอบตาม criteria
5. ติ๊ก ✅ แล้วไป task ถัดไป

ห้ามข้าม dependency — ถ้า TASK-03 require TASK-02
ต้องเสร็จ TASK-02 ก่อน

---

## Phase 1: Setup ฐานข้อมูล

### TASK-01: สร้าง Google Sheet
- **ทำ:** สร้าง spreadsheet ใหม่ ตั้ง sheet ตาม CONTEXT § 4
- **Acceptance:**
  - [ ] มี sheet ชื่อ `Orders` พร้อม header ครบ
  - [ ] มี sheet ชื่อ `Logs` พร้อม header ครบ
  - [ ] copy Sheet ID ไว้ใช้ TASK-03
- **Depends on:** —

### TASK-02: สร้าง Google Form
- **ทำ:** สร้างฟอร์มที่ field ตรงกับ Sheet `Orders`
- **Acceptance:**
  - [ ] field ครบตาม CONTEXT § 4
  - [ ] ลิงก์ form กับ Sheet `Orders` ที่ TASK-01 สร้างไว้
- **Depends on:** TASK-01

---

## Phase 2: Apps Script

### TASK-03a: ตั้ง Script Properties
- **ทำ:** เปิด Project Settings → Script Properties → เพิ่ม
- **Acceptance:**
  - [ ] `SHEET_ID` มีค่า (จาก TASK-01)
  - [ ] `N8N_WEBHOOK_URL` มีค่า (จาก TASK-05)
- **Depends on:** TASK-01, TASK-05

### TASK-03b: เขียน getConfig()
- **ทำ:** เขียน function อ่าน Script Properties
- **Acceptance:**
  - [ ] return object ที่มี sheetId + n8nWebhookUrl
  - [ ] handle กรณี property ไม่มีค่า (throw error)
- **Depends on:** TASK-03a

### TASK-03c: เขียน onFormSubmit(e)
- **ทำ:** trigger handler ตอน form submit
- **Acceptance:**
  - [ ] validate `e.values` มีครบทุก field required
  - [ ] เช็ค duplicate ตาม edge case ใน architecture
  - [ ] เขียน row ลง Sheet `Orders`
  - [ ] ส่ง webhook ไป n8n
  - [ ] ทุก error ถูก log ลง Sheet `Logs`
- **Depends on:** TASK-03b

### TASK-03d: ตั้ง trigger
- **ทำ:** Triggers → Add → onFormSubmit → From form
- **Acceptance:**
  - [ ] form submit ทำให้ onFormSubmit รัน
  - [ ] ทดสอบด้วย dummy data 1 ชุด ผ่าน
- **Depends on:** TASK-03c

---

## Phase 3: n8n

### TASK-04: Import workflow template
- **ทำ:** สร้าง workflow ที่มี Webhook node
- **Acceptance:**
  - [ ] webhook URL คัดลอกได้
  - [ ] active = true
- **Depends on:** —

### TASK-05: ต่อ LINE Messaging API
- **ทำ:** เพิ่ม HTTP Request node ส่งไป LINE
- **Acceptance:**
  - [ ] credential LINE Channel Access Token ถูกต้อง
  - [ ] ส่ง dummy message ผ่าน
- **Depends on:** TASK-04

---

## Phase 4: ทดสอบ end-to-end

### TASK-06: Test happy path
- **ทำ:** กรอก form ด้วยข้อมูลถูกต้อง
- **Acceptance:**
  - [ ] row เพิ่มใน Sheet `Orders`
  - [ ] LINE message ถึงปลายทาง
  - [ ] เวลาทั้ง flow < 5 วินาที

### TASK-07: Test edge cases
- **ทำ:** ทดสอบ 3 เคสจาก architecture § 5
- **Acceptance:**
  - [ ] เบอร์ซ้ำ → update ไม่ insert
  - [ ] n8n down → retry queue ทำงาน
  - [ ] timeout → ส่งต่อ n8n สำเร็จ

---

## Definition of Done (ของทั้ง project)

- [ ] ทุก task ติ๊กครบ
- [ ] Test happy path + edge cases ผ่าน
- [ ] CONTEXT.md ตรงกับ implementation จริง
- [ ] architecture.md อัปเดตตามที่เปลี่ยนแปลงระหว่าง build
- [ ] commit + push GitHub แล้ว
````

---

### STEP 4 — Hand off

```
✅ TASKS.md เสร็จแล้ว — มี [N] task ใน [M] phase

ขั้นต่อไป:
1. Copy ไปวาง `TASKS.md` ใน GitHub repo root
2. เปิด Claude Code ใน folder
3. บอก Claude Code:
   "อ่าน CONTEXT.md, architecture.md, TASKS.md
   แล้วเริ่มจาก TASK-01 — ทำทีละชิ้น"

Claude Code จะมี 3 ไฟล์ครบในการทำงาน:
- CONTEXT.md       (จำคำเฉพาะ)
- architecture.md  (รู้ design)
- TASKS.md         (รู้จะทำอะไรก่อน)
```

---

## Rules

### ❌ ห้าม

- ห้ามทำถ้าไม่มี architecture document
- ห้ามใส่ task ที่ใหญ่เกิน 15 นาที — แตกย่อย
- ห้ามใส่ task ที่ไม่มี acceptance criteria
- ห้ามใส่ task ที่ depend ย้อนกลับ (TASK-03 depend TASK-05 ที่ depend TASK-03)
- ห้ามรวม task หลาย function ในข้อเดียว

### ✅ ต้อง

- 1 task = 1 unit of work
- ทุก task มี: ทำอะไร / acceptance / depends on
- จัดกลุ่มเป็น Phase ทำตามลำดับได้
- Task ใน Phase เดียวกันต้องทำขนานกันได้
- Phase ต้อง dependency-free (ทำ Phase 1 ให้เสร็จก่อนเริ่ม Phase 2)
- จบด้วย Definition of Done ทั้ง project

---

## Edge Cases

**Architecture เล็กเกินไป (Setup Plan แค่ 3 ข้อ):**
ตัด task ตามนั้น ไม่ต้องบังคับทำให้ครบ phase 4 phase
ขั้นต่ำ: 5 task

**Architecture ใหญ่เกินไป (Setup Plan 20+ ข้อ):**
"architecture นี้ใหญ่เกิน mini app แล้วครับ
ขอตัดเหลือ phase 1 ที่จำเป็นก่อน phase 2 ค่อยทำทีหลัง"

**ผู้ใช้บอก "ไม่ต้องละเอียด ทำคร่าวๆ":**
"คร่าวเกินไป Claude Code จะหลุดครับ
ขอ acceptance criteria อย่างน้อยทุก task — ไม่งั้นไม่รู้ว่าทำเสร็จหรือยัง"
