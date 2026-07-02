---
name: mini-app-context
description: >
  สร้างหรืออัปเดตไฟล์ CONTEXT.md เก็บคำเฉพาะ ศัพท์เทคนิค และข้อตกลง
  ของ mini app project — ป้องกัน Claude หลุดเรียกชื่อผิดในแชทถัดไป
  ใช้ skill นี้เมื่อ: เพิ่งผ่าน mini-app-grill มาและมี Skill Brief แล้ว,
  อยากเก็บคำเฉพาะของ project, สร้าง CONTEXT.md, อัปเดต CONTEXT.md,
  เพิ่มศัพท์ใหม่ลง CONTEXT, จด glossary, จดข้อตกลงโครงการ,
  เก็บชื่อ Sheet/column/role ไว้ใช้ทั้ง project
  แม้ผู้ใช้จะไม่พูดคำเหล่านี้ตรงๆ ถ้าเพิ่งจบ grill และยังไม่ได้ออกแบบ
  architecture ให้ใช้ skill นี้เป็นขั้นถัดไปเสมอ
  ผลลัพธ์: ไฟล์ CONTEXT.md ที่ Claude Code / AI ตัวอื่นโหลดเป็น
  reference ได้ทุกครั้งที่ทำงานบน project นี้
tags: [context, glossary, mini-app, persistence]
---

# Mini App Context — เก็บคำเฉพาะของ project

หน้าที่: สร้าง `CONTEXT.md` ที่ทุก AI / Claude Code โหลดอ่านก่อนทำงาน
เพื่อให้เรียกชื่อ Sheet, column, role ตรงกันทุกแชท ไม่หลุด

หลักการ: **"ระบบนี้เรียก customer ว่า 'ลูกค้า' ไม่ใช่ 'user'
เรียก order ว่า 'ออเดอร์' ไม่ใช่ 'transaction'"**
ถ้าไม่จดไว้ Claude ตัวถัดไปจะใช้คำมั่ว เปลือง token แก้ทีหลัง

---

## ขั้นตอน

### STEP 1 — เช็ค Input

ต้องมี Skill Brief คือไฟล์ `SKILL_BRIEF.md` (จาก mini-app-grill) — อ่านจากไฟล์ได้
ถ้าไม่มีไฟล์และไม่มีในแชท → กลับไปใช้ mini-app-grill ก่อน แล้วตอบ:
"ต้องผ่าน `mini-app-grill` ก่อนครับ จะรู้ว่าจะเก็บอะไรลง CONTEXT
ให้ผมช่วย grill เลยไหม?"

ถ้ามีแล้ว → ทำ STEP 2

---

### STEP 2 — สกัดคำเฉพาะจาก Skill Brief

ดึง 5 ส่วนนี้จาก Skill Brief:

```
1. ชื่อ project (kebab-case + ไทย)
2. Glossary — คำที่ผู้ใช้ใช้ vs คำเทคนิค
3. Roles — บทบาทผู้ใช้และสิทธิ์
4. Data — Sheet + columns
5. Conventions — กฎที่ต้องตามทั้ง project
```

---

### STEP 3 — สร้างไฟล์ CONTEXT.md

ตอบในแชทเป็น Markdown ที่ผู้ใช้ copy ไปวาง GitHub root ได้ทันที:

````markdown
# CONTEXT.md — [ชื่อ Project]

> **สำคัญ:** AI / Claude Code ต้องอ่านไฟล์นี้ก่อนทำงานบน project นี้
> ทุกครั้ง ห้ามใช้ศัพท์ที่ไม่ตรงกับที่จดไว้ในนี้

---

## 1. Project Identity

- **ชื่อ:** [app-name (kebab-case)]
- **ชื่อไทย:** [ชื่อภาษาไทย]
- **Description:** [1 ประโยคบอกว่าระบบนี้ทำอะไร]
- **Type:** Mini app (ไม่ใช่ enterprise)
- **Stack:** [(ก) เว็บแอป HTML + Cloudflare Pages / (ข) Google Sheets + Apps Script — ตามที่เลือกใน architecture]

---

## 2. Glossary — ศัพท์ที่ใช้ใน project นี้

| คำที่ใช้ในระบบ | คำเทคนิค (ห้ามใช้) | ความหมาย |
|---|---|---|
| ลูกค้า | user / customer | คนซื้อสินค้า |
| ออเดอร์ | transaction / order | รายการซื้อ 1 ครั้ง |
| สถานะ | state / phase | สถานะของออเดอร์ |
| ... | ... | ... |

**กฎ:** ใน code, comment, doc, message ทั้งหมดให้ใช้คอลัมน์ซ้าย
ห้ามใช้คอลัมน์กลางเด็ดขาด

---

## 3. Roles & Permissions

| Role | จำนวน | ทำอะไรได้ | ทำไม่ได้ |
|---|---|---|---|
| [role 1] | [n] | [permissions] | [restricted] |
| [role 2] | [n] | [permissions] | [restricted] |

---

## 4. Data Model

### Sheet: [name]
| Column | Type | ตัวอย่าง | หมายเหตุ |
|---|---|---|---|
| [col] | [type] | [example] | [note] |

(เพิ่ม sheet อื่นๆ ตาม Skill Brief)

---

## 5. Conventions

1. **ภาษา:** Comment ใน code = ไทย, ตัวแปร = อังกฤษ
2. **Error handling:** ทุก function try-catch + log ลง Sheet "Logs"
3. **Idempotent:** trigger รันซ้ำต้องไม่สร้างข้อมูลซ้ำ
4. **Timeout:** Apps Script function ต้องจบภายใน 6 นาที
5. **Secrets:** ใส่ใน Script Properties (หรือ environment ของ Cloudflare) เท่านั้น
   ห้ามใส่ใน code

---

## 6. ห้ามทำ (Out of Scope)

- ❌ Authentication เกินกว่า Google account
- ❌ Real-time websocket
- ❌ Mobile native app
- ❌ Custom domain / SSL
- ❌ เปลี่ยน stack เป็น Firebase / Supabase / AWS

ถ้าผู้ใช้ขอเหล่านี้ → ตอบว่า "ออก scope mini app แล้ว phase 2"

---

## 7. ขั้นต่อไป

หลัง CONTEXT.md เสร็จแล้ว:
1. Copy ไฟล์นี้ไปวาง GitHub repo root (ตั้งชื่อว่า `CONTEXT.md`)
2. ใช้ skill `mini-app-architect` ออกแบบ architecture
3. ใช้ skill `mini-app-tasks` ตัด TODO ส่ง Claude Code
````

---

### STEP 4 — Hand off

```
✅ CONTEXT.md เสร็จแล้ว

ขั้นต่อไป:
- Copy ไปวาง GitHub repo root → ตั้งชื่อ `CONTEXT.md`
- ใช้ skill `mini-app-architect` ออกแบบ architecture ต่อ
  พิมพ์: "ออกแบบ architecture จาก CONTEXT นี้"

ถ้าระหว่าง project มีคำใหม่/ตัด field ออก → กลับมาอัปเดตไฟล์นี้ก่อน
อย่าแก้ใน code อย่างเดียว
```

---

## Rules

### ❌ ห้าม

- ห้ามทำถ้ายังไม่มี Skill Brief จาก grill
- ห้ามเดาคำที่ผู้ใช้ไม่ได้บอก
- ห้ามใส่ default convention ที่ผู้ใช้ไม่ได้ confirm
- ห้ามออกแบบ architecture (หน้าที่ของ architect skill)

### ✅ ต้อง

- ดึงคำมาจาก Skill Brief ตรงๆ ห้ามแปล
- Glossary ต้องมีอย่างน้อย 5 คำ ถ้าน้อยกว่า → ถามผู้ใช้เพิ่ม
- มี Out of Scope ชัดเจน (ป้องกัน scope creep)
- จบด้วย hand off ไป architect

---

## Edge Cases

**ผู้ใช้บอก "ไม่ต้องทำ CONTEXT.md ก็ได้":**
"แนะนำให้ทำครับ — Claude Code แชทใหม่จะไม่จำคำเฉพาะของ project
ถ้าไม่มีไฟล์นี้ ต้องอธิบายใหม่ทุกครั้ง เปลือง token + ผิดง่าย"

**Glossary มีแค่ 1-2 คำ:**
"ขอเพิ่มอีกหน่อยครับ — มีคำไหนอีกที่ใช้ในร้าน/ทีม
ที่คนนอกอาจไม่เข้าใจ? เช่น คำเรียกสถานะ คำเรียกประเภทลูกค้า"

**ผู้ใช้ขออัปเดต CONTEXT.md เดิม:**
ถามว่าจะเพิ่ม/แก้/ลบส่วนไหน แล้วออก version ใหม่ทั้งไฟล์
(ไม่ patch ทีละจุด — ป้องกัน inconsistency)
