# Stack ที่เราใช้ — เริ่มฟรี โตค่อยจ่าย

> เวอร์ชันหน้าเว็บ (สวยกว่า): https://skills-lab.co/workshop/stack

เลือกตามขนาดงาน — งานเล็ก/เริ่มไว ใช้ฝั่ง Google · ของจริง/หลายผู้ใช้ ใช้ฝั่ง Cloudflare

## กรณีที่ 1 — Google + Apps Script (เริ่มไว ฟรี)
*mini-app · ฟอร์ม · ทีมเล็ก · prototype*

| ส่วน | ใช้ | ราคา |
|---|---|---|
| โค้ด / AI | Claude Code | $ รายเดือน |
| หน้าเว็บ | Apps Script HTML / LIFF | ฟรี |
| Backend | Google Apps Script | ฟรี |
| Database | Google Sheets | ฟรี |
| Storage | Google Drive | ฟรี |
| Auth | Google / LINE LIFF | ฟรี |
| อัตโนมัติ | Apps Script Triggers / n8n | ฟรี |
| Version | GitHub | ฟรี |
| Deploy | Web App (/exec) | ฟรี |

## กรณีที่ 2 — Cloudflare + Supabase (โปรดักชัน สเกลได้)
*SaaS · แอปลูกค้า · ระบบหลายผู้ใช้*

| ส่วน | ใช้ | ราคา |
|---|---|---|
| โค้ด / AI | Claude Code + Claude API | $ รายเดือน |
| หน้าเว็บ | Cloudflare Pages | ฟรี |
| API / Backend | Cloudflare Workers (itty-router) | ฟรี → ใช้จริงจ่าย |
| Database | Supabase (Postgres + RLS) | ฟรี tier |
| Auth | Supabase / LINE Login | ฟรี |
| Storage | Cloudflare R2 | ฟรี tier |
| Cache / KV | Cloudflare KV | ฟรี tier |
| Payments | PromptPay (QR) | ตามรายการ |
| Cron | Workers Scheduled | ฟรี |
| Version | GitHub | ฟรี |
| Deploy | wrangler (pages / deploy) | ฟรี |

## เลือกแบบไหน?
- **กรณี 1** — งานภายใน, ฟอร์ม/ทะเบียน, คนใช้หลักสิบ, อยากได้วันนี้, งบ 0
- **กรณี 2** — แอป/SaaS, คนใช้หลักร้อย-พัน+, ต้องเร็ว+ปลอดภัย, แยกข้อมูลตามลูกค้า (RLS)

> 💡 เริ่มด้วย free tier ไปก่อน จ่ายเมื่อโตจริง — เริ่มเล็ก ๆ แล้วค่อยโต
