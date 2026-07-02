---
name: sme-jd-writer
description: >
  เขียน Job Description สำหรับประกาศ + ดึงผู้สมัครที่ fit + filter ผู้ไม่ fit
  ใช้ skill นี้ทุกครั้งที่พูดถึง เขียน JD, job description,
  ประกาศรับสมัครงาน, เปิดตำแหน่ง, recruit, รับพนักงาน,
  hiring, job posting, ประกาศงาน, job listing, หาคนเข้าทีม
  แม้ไม่พูดตรงๆ ถ้าจะ open role ใหม่ ให้ใช้เสมอ
  ผลลัพธ์: JD 1 หน้า (role/responsibilities/qualifications/benefits) + channel plan + filter tips
tags: [type-2, sme, hr, recruiting, document]
---

# SME JD Writer — JD ที่ดึงคนที่ fit + filter ที่ไม่ fit

JD ที่เขียนดี = candidates self-filter 80% ก่อนส่ง resume
เพราะ generic "looking for passionate team player" = ได้ resume 500 ที่ไม่ fit

---

## Input ที่ต้องได้ก่อนทำงาน

1. **ตำแหน่ง + ระดับ** — "Junior Marketing" / "Senior Sales Manager"
2. **Business context** — บริษัททำอะไร, stage (seed / series A / profitable SME)
3. **Main responsibilities** — 3-5 core things this role owns
4. **Skills required** — must-have + nice-to-have แยกชัด
5. **Salary range** — ตัวเลขจริง (฿X - ฿Y) ไม่รับ "negotiable" เฉยๆ
6. **Reporting line** — manager + team size

### 🚨 กฎเหล็ก: ถ้าข้อใดข้อหนึ่งไม่ครบ → ถามก่อน อย่าเดา

- ❌ ห้ามเดา salary range จาก "ตำแหน่งนี้ตลาดให้เท่าไหร่"
- ❌ ห้ามเดา reporting line จาก org chart generic
- ❌ ห้ามเดา stage บริษัท (seed / series A / profitable)
- ❌ ถ้า responsibilities ไม่ specific → clarify ก่อน อย่าเขียน generic
- ✅ ถามเป็น bullet list ชัดเจน ไม่ถามรวมกันยาวๆ

---

## References

- `references/jd-templates.md` — JD by role type
- `references/brand-voice.md` — tone for JD
- `references/org-structure.md` — reporting + growth paths
- `references/salary-benchmarks.md` — market rate (optional)
- `references/past-jds.md` — successful JDs + metrics (optional)

---

## Workflow

### STEP 0 — /intake (ข้ามไม่ได้)

1. เช็ค input ครบ 6 ข้อไหม — ถ้าขาด → ถามก่อน ห้ามเริ่มเขียน
2. ระบุ seniority ชัดเจน (Junior / Mid / Senior / Lead)
3. ยืนยัน role summary กับ user ก่อน draft

### STEP 1 — โหลด references

โหลด `jd-templates.md` + `brand-voice.md` + `org-structure.md`

### STEP 2 — เขียน Role Summary (3-Sentence Test)

ถ้าอธิบาย role ใน 3 ประโยคไม่ได้ = role ยังสับสน → กลับไป intake

### STEP 3 — เขียน 5-7 Responsibilities (Specific + Measurable)

ทุกข้อต้องมี: action verb + outcome + frequency/metric

### STEP 4 — Qualifications (Must-have ≤ 5 vs Nice-to-have ≤ 5)

### STEP 5 — Transparent Compensation + Benefits

### STEP 6 — เขียน "Not a Fit If..." (Honest Reverse Filter)

### STEP 7 — /verify (ข้ามไม่ได้ก่อน deliver)

Claude เช็คเองทุกข้อก่อนส่ง:

- [ ] Salary range มีตัวเลขจริง (ไม่ใช่ "negotiable")
- [ ] Must-have ≤ 5 items
- [ ] ทุก responsibility มี metric หรือ frequency
- [ ] มี "Not a fit if" section (3-5 ข้อ)
- [ ] ไม่มี gender-specific language
- [ ] ไม่มีคำ platitude: "passionate", "dynamic", "rockstar", "ninja", "family"
- [ ] มี application process + timeline ชัดเจน
- [ ] Channel plan มีราคา + expected apps

**ถ้าข้อใดไม่ผ่าน → กลับไปแก้ก่อน deliver อย่าส่งผ่าน**

---

## ตัวอย่าง Responsibility (ดี vs แย่)

- ❌ "Contribute to marketing team"
- ✅ "Plan and execute content calendar: 12 posts/month across IG + TikTok + Blog, target 10% engagement"

- ❌ "Support sales activities"
- ✅ "Run outbound campaign to 50 leads/week, book 10 discovery calls, target 3 qualified opps"

- ❌ "Dynamic team player with passion"
- ✅ "Work cross-functional with Product + CS on weekly sync, own 2-3 customer escalations/month"

---

## Output Format (Type 2 Document)

```
📋 Job Description: [Role Title]
Department: [...] | Reports to: [...] | Location: [...]
Employment: Full-time / Part-time / Contract
Salary: ฿[X] - ฿[Y] DOE

═══ About [Company] ═══

[1-2 paragraphs about company + stage + culture]

═══ Role Summary ═══

"[3 sentences that make someone say — this is me OR this is not for me]"

**Success in this role**: ภายใน 6 เดือนแรก, คุณจะ [2-3 key outcomes]

═══ What You'll Do ═══

1. **[Action verb] [specific outcome]** — [context + frequency + metric]
2. **[Action verb] [specific outcome]** — [context + frequency + metric]
3. [...]
4. [...]
5. [...]

═══ What You Bring (Must-have) ═══

- ✅ [Specific experience X years in Y]
- ✅ [Specific skill, measurable]
- ✅ [Certification if required]
- ✅ [Language: Thai native + English intermediate]

═══ Bonus (Nice-to-have) ═══

- [Industry-specific experience]
- [Tool: HubSpot/Salesforce]
- [Past role similar]

═══ What We Offer ═══

**Compensation**:
- Salary: ฿[X] - ฿[Y] (based on experience)
- Performance bonus: up to [X]% annual
- Health insurance + dental
- 15 days annual leave + sick

**Work Style**:
- Hybrid (3 days office, 2 remote)
- Flexible hours (core 10am-4pm)
- Office: [location + perks]

**Growth**:
- Training budget ฿[X]/year
- Career path: Junior → Mid → Senior + timeline
- Direct mentorship
- Conference attendance

**Culture**:
- [Value 1 reflected in specific practice]
- [Value 2]
- [Team ritual that makes us unique]

═══ Not a Fit If... ═══

- You prefer 100% remote (we need 3 days office)
- You want to specialize in only [narrow area] (this is broad)
- You need senior title immediately (we have growth path)
- You dislike data/metrics (this role is analytical)

═══ How to Apply ═══

**Required**:
1. Resume (PDF)
2. Cover letter OR 3-question form
3. [Portfolio link if applicable]

**Application Questions**:
1. "Why this role, at this company, now?" (300 words max)
2. "Describe a project that excited you — what was your role?" (300 words)
3. "What's one question you'd ask us?" (100 words)

**Process**:
- Resume screen: within 5 days
- Phone screen: 30 min
- 1st interview: 60 min
- Final + task: 90 min
- Decision: within 2 weeks

**Apply to**: hiring@[company].com
**Subject**: "[Role name] - [Your Name]"

═══ Channel Posting Plan ═══

| Channel | Cost | Expected apps |
|---------|------|---------------|
| LinkedIn | ฿[X] | 50-100 |
| JobsDB | ฿[Y] | 100-200 |
| FB Groups | free | 20-50 |
| Referral | ฿[Z]/hire | variable |
| Website career | free | 10-30 |

**Budget total**: ฿[X]
**Timeline**: 2-4 weeks

═══ Filter Tips for Screening ═══

Self-filter via application Q:
- Q1 generic "looking for opportunity" = pass
- Q2 vague "we" answers = pass; specific "I" with outcome = good

Red flags:
- 5+ positions concurrently (inconsistency)
- Cover letter not customized
- Salary request 50%+ above posted range

═══ User Pre-Post Checklist ═══

- [ ] Reviewed by current employee in same team
- [ ] Salary range matches internal band
- [ ] Hiring manager approved JD
- [ ] HR legal check done (non-discriminatory)
- [ ] Posted date + deadline set

Next Action: → post to channels → monitor applications → /sme-resume-screener after 1 week
```

---

## Rules

- ❌ ห้ามเขียน JD generic — "dynamic team", "passionate", "rockstar", "ninja", "family" = meaningless
- ❌ ห้ามลิสต์ must-have > 5 items — unrealistic จะ filter คน fit ออกหมด
- ❌ ห้ามซ่อน salary range — transparency attracts qualified
- ❌ ห้ามใช้ gender-specific language — ผิดกฎหมายแรงงาน
- ❌ ห้ามคัดลอก JD ของ competitor
- ❌ ห้ามเดา input 6 ข้อ — ขาดข้อไหนให้ถามก่อน
- ❌ ห้ามข้าม /verify ก่อน deliver
- ✅ "Not a fit if" section — filters upfront
- ✅ Specific + measurable > vague
- ✅ Written for the person you want to attract
- ✅ จบด้วย Next Action เสมอ

---

## Skill Chain

จบแล้ว → post ประกาศ → wait 1 สัปดาห์ → `sme-resume-screener` → `sme-interview-question-gen`

---

## Next Action (หลัง skill จบ)

1. User copy JD ไป post ตาม channel plan
2. ตั้ง calendar reminder 1 สัปดาห์ เพื่อ review applications
3. เรียก `sme-resume-screener` เมื่อมี resume ≥ 10 คน
