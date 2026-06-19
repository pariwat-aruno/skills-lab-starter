# Skills Lab — Starter Kit 🧪

ชุดเริ่มต้นสำหรับผู้เรียนคอร์ส **Claude Code สำหรับเจ้าของกิจการ** (Skills Lab)
ก๊อปไปใช้ต่อกับธุรกิจของคุณได้เลย — ไม่ต้องเริ่มจากศูนย์

> เว็บคอร์ส + เอกสารทั้งหมด: **https://skills-lab.co**

---

## 📦 มีอะไรในนี้

| โฟลเดอร์ | คืออะไร |
|---|---|
| `skills/` | ชุดสกิลสร้าง **mini-app** ครบ pipeline (ใช้ใน Claude Code) |
| `starter-kits/` | เทมเพลตระบบ + คลัง prompt ก๊อปไปสั่งงานได้เลย |
| `CLAUDE.md` | ตัวอย่างไฟล์ตั้งต้น ก๊อปไปวางในโปรเจกต์คุณ |
| `install.sh` | ติดตั้งสกิลทั้งหมดเข้า Claude Code ปุ่มเดียว |

---

## 🚀 เริ่มใช้ (3 ขั้น)

```bash
# 1) โหลด repo นี้
git clone https://github.com/pariwat-aruno/skills-lab-starter.git
cd skills-lab-starter

# 2) ติดตั้งสกิลเข้า Claude Code
bash install.sh

# 3) เปิด Claude Code แล้วพิมพ์
/skills
```

> ติดตั้งเองก็ได้: ก๊อปโฟลเดอร์ใน `skills/` ไปวางที่ `~/.claude/skills/`

---

## 🛠️ Pipeline สร้าง mini-app (ใช้ตามลำดับ)

สั่งใน Claude Code เป็นภาษาคน เดี๋ยวมันเรียกสกิลให้เอง — หรือเรียกตรง ๆ ตามนี้:

| ลำดับ | สกิล | ทำอะไร | ได้ไฟล์ |
|---|---|---|---|
| 1️⃣ | **mini-app-grill** | ขุดความต้องการ ถามให้ครบก่อนสร้าง | Skill Brief |
| 2️⃣ | **mini-app-context** | สรุปเป็นบริบทโปรเจกต์ | `CONTEXT.md` |
| 3️⃣ | **mini-app-architect** | ออกแบบสถาปัตยกรรม + Mermaid + Data Flow | `architecture.md` |
| 4️⃣ | **mini-app-tasks** | แตกเป็นงานย่อยลงมือทำ | `tasks.md` |

Stack ที่ใช้: **Google Sheets · Apps Script · GitHub · n8n** (ไม่ต้องเขียนโค้ดเอง)

---

## 💡 ทิปสำหรับมือใหม่

- พิมพ์สั่งเป็น **ภาษาไทย** ได้เลย
- เริ่มจากปัญหาจริง 1 อย่างในธุรกิจคุณ
- ติดตรงไหน ถามในกลุ่มไลน์ของคอร์สได้ตลอด
- ดู **Cheat Sheet / คลัง Prompt / แผน 7 วัน** ได้ที่ https://skills-lab.co/workshop

---

© Skills Lab · by HumanAI — แจกให้ผู้เรียนนำไปใช้ต่อได้
