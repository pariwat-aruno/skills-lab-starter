---
name: mini-app-architect
description: >
  ออกแบบสถาปัตยกรรม mini app เป็น Architecture Document พร้อม Mermaid diagram
  + Data Flow + Setup Plan ใช้ stack Google Sheets / Apps Script / GitHub / n8n
  ใช้ skill นี้เมื่อ: เพิ่งทำ CONTEXT.md เสร็จและพร้อมออกแบบ,
  ออกแบบ architecture, วาง diagram ให้, ทำ data flow, ทำ Mermaid diagram,
  วาง setup plan, ออกแบบระบบ จาก CONTEXT, ทำ architecture.md
  แม้ผู้ใช้จะไม่พูดคำเหล่านี้ตรงๆ ถ้าผ่าน mini-app-grill +
  mini-app-context มาแล้ว และยังไม่มี architecture diagram
  ให้ใช้ skill นี้เป็นขั้นถัดไป
  ⚠️ ถ้ายังไม่มี Skill Brief ให้กลับไปใช้ mini-app-grill ก่อน
  ผลลัพธ์: ไฟล์ architecture.md (Mermaid + Data Flow + Sheet Structure
  + Setup Plan) พร้อม copy ไปวาง GitHub
tags: [architect, design, mermaid, mini-app]
---

# Mini App Architect — ออกแบบจาก Brief

หน้าที่: รับ Skill Brief + CONTEXT.md → ออก Architecture Document
**ไม่ถามใหม่** (ของถูกถามใน grill ไปแล้ว) — ใช้ข้อมูลที่มีออกแบบเลย

---

## ขั้นตอน

### STEP 1 — เช็ค Input

ต้องมี 2 อย่าง:
1. Skill Brief (จาก mini-app-grill)
2. CONTEXT.md (จาก mini-app-context) — ใช้ดึงชื่อ Sheet/column/role

ถ้าขาด → บอกผู้ใช้:
"ต้องผ่าน `mini-app-grill` แล้ว `mini-app-context` ก่อนครับ
ขอเริ่มจาก grill เลยไหม?"

ถ้ามีครบ → STEP 2

---

### STEP 2 — Confirm scope ก่อนวาด

แสดงสรุปสั้นๆ ก่อนวาด diagram:

```markdown
ขอ confirm ก่อนวาด:

**Flow โดยรวม:** [INPUT] → [PROCESS] → [STORAGE] → [OUTPUT]
**Stack:** [list]
**Trigger:** [event]

ตรงตาม Skill Brief ไหม? โอเค → วาด architecture เลย
ไม่ตรง → บอกตรงไหนผิด
```

**กฎ:** วาด diagram ผิด = ต้องวาดใหม่ทั้งหมด — confirm ก่อนเสมอ

---

### STEP 3 — สร้าง Architecture Document

ตอบในแชทเป็น Markdown ที่ผู้ใช้ copy ไปวาง GitHub ได้ทันที:

````markdown
# Architecture — [ชื่อ App]

> **Status:** Draft v1
> **สร้างเมื่อ:** [วันที่]
> **อ่านก่อน:** [CONTEXT.md](CONTEXT.md)

---

## 1. ภาพรวมระบบ

```mermaid
graph TD
    A[ผู้ใช้กรอกฟอร์ม] -->|submit| B[Google Form]
    B -->|trigger| C[Apps Script]
    C -->|insert row| D[(Google Sheet)]
    C -->|webhook| E[n8n]
    E -->|push| F[LINE OA]

    style D fill:#34a853,color:#fff
    style E fill:#ff6d5a,color:#fff
```

**Legend:**
- 🟢 Google Sheet = ฐานข้อมูลหลัก
- 🟧 n8n = automation
- ลูกศร = ทิศทางข้อมูล

---

## 2. Data Flow

| # | Step | ใครทำ | ข้อมูลที่ส่ง | ปลายทาง |
|---|------|-------|-----------|--------|
| 1 | กรอกฟอร์ม | ลูกค้า | ชื่อ, เบอร์ | Google Form |
| 2 | submit | Google | row ใหม่ | Sheet "Orders" |
| 3 | trigger | Apps Script | row + payload | n8n webhook |
| 4 | ส่ง LINE | n8n | ข้อความขอบคุณ | LINE OA |

---

## 3. Sheet Structure

(ดึงจาก CONTEXT.md — ไม่เขียนซ้ำ ลิงก์ไปแทน)

ดู [CONTEXT.md § 4 Data Model](CONTEXT.md#4-data-model)

---

## 4. Setup Plan (checklist ทำตามลำดับ)

- [ ] **Step 1:** สร้าง Google Sheet ตาม CONTEXT § 4
- [ ] **Step 2:** สร้าง Google Form ที่ลิงก์มา Sheet
- [ ] **Step 3:** Extensions → Apps Script → ใส่โค้ด
- [ ] **Step 4:** ตั้ง trigger onFormSubmit
- [ ] **Step 5:** สร้าง n8n workflow รับ webhook
- [ ] **Step 6:** ต่อ n8n → LINE Messaging API
- [ ] **Step 7:** ทดสอบด้วย dummy data 3 ชุด
- [ ] **Step 8:** ทดสอบ edge cases (ข้อ 5)

---

## 5. Edge Cases

| สถานการณ์ | วิธีรับมือ | implement ที่ |
|---|---|---|
| n8n down | retry queue ใน Sheet "Retry" | Apps Script |
| เบอร์ซ้ำ | update แทน insert | Apps Script |
| Apps Script timeout 6 นาที | งานยาว → ส่งต่อ n8n | Apps Script |

---

## 6. Next Steps

1. Copy ไฟล์นี้ไปวาง GitHub: `docs/architecture.md`
2. ใช้ skill `mini-app-tasks` ตัดเป็น TODO ย่อยให้ Claude Code
3. ระหว่าง build เจอเรื่องที่ architecture ไม่ครอบคลุม
   → กลับมาอัปเดตไฟล์นี้ก่อน อย่าแก้ใน code อย่างเดียว
````

---

### STEP 4 — Hand off

```
✅ Architecture Document เสร็จแล้ว

ขั้นต่อไป:
- Copy ไปวาง `docs/architecture.md` ใน GitHub repo
- ใช้ skill `mini-app-tasks` ตัด TODO ย่อยส่ง Claude Code
  พิมพ์: "ตัด task จาก architecture นี้"

ถ้าจุดไหนใน diagram ไม่ตรงกับที่คิด → บอกได้
```

---

## Rules

### ❌ ห้าม

- ห้ามถามใหม่ — ของถามใน grill แล้ว
- ห้ามทำถ้าไม่มี Skill Brief + CONTEXT
- ห้ามวาด diagram ก่อน confirm scope (STEP 2)
- ห้ามเขียนโค้ด — ออกแบบอย่างเดียว
- ห้ามแนะนำ stack อื่น
- ห้ามเขียน Sheet structure ซ้ำใน architecture — link ไป CONTEXT แทน

### ✅ ต้อง

- ใช้ Mermaid syntax ที่ render บน GitHub ได้
- Setup Plan ต้องเป็น checklist ทำตามลำดับได้จริง
- Edge cases ต้องบอกว่า implement ที่ไหน
- จบด้วย hand off ไป tasks

---

## Edge Cases

**ผู้ใช้ขอเปลี่ยน stack ระหว่างวาด:**
"เปลี่ยน stack = ต้องกลับไป grill ใหม่ครับ
diagram ผูกกับ stack ที่เลือกไว้"

**Diagram ซับซ้อนเกิน mini app (>10 nodes):**
"diagram นี้ใหญ่เกิน mini app แล้ว ลองตัด phase 2 ออกได้ไหม?
diagram ที่ดีของ mini app ควรอยู่ที่ 5-8 nodes"

**ผู้ใช้บอก "วาดเลย ไม่ต้อง confirm":**
"ขอ 30 วินาที confirm ก่อนครับ — diagram ที่วาดผิดต้องวาดใหม่ทั้งหมด
นานกว่า confirm 1 ครั้ง"
