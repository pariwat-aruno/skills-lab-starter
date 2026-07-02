// ════════════════════════════════════════════════════════════
//  FM-HR-001 v3.0 — Employment Contract Builder
//  Font: Angsana New 12pt | Monochrome | Template กลาง
//  แก้เฉพาะ DATA BLOCK ด้านล่างนี้
// ════════════════════════════════════════════════════════════

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak
} = require('docx');
const fs = require('fs');

// ════════════════════════════════════════════════════════════
//  DATA BLOCK — แก้ตรงนี้เท่านั้น
// ════════════════════════════════════════════════════════════
const D = {
  // ── บริษัท ──────────────────────────────────────────────
  companyTH:      "บริษัท ……………………………………………… จำกัด",
  companyEN:      "...............",
  companyAddr:    "...............",
  companyTaxID:   "...............",
  companyPhone:   "...............",
  signerName:     "...............",   // ชื่อผู้ลงนามฝ่ายบริษัท
  signerTitle:    "...............",   // ตำแหน่ง
  contractDate:   "……… เดือน ………………… พ.ศ. …………",  // วันที่ทำสัญญา
  contractPlace:  "...............",   // สถานที่ทำสัญญา

  // ── พนักงาน ─────────────────────────────────────────────
  empNameTH:      "...............",
  empNameEN:      "...............",
  empIDCard:      "...............",
  empIDExpiry:    "...............",
  empDOB:         "...............",
  empNationality: "...............",
  empReligion:    "...............",
  empPhone:       "...............",
  empEmail:       "...............",
  empAddrRegist:  "...............",   // ที่อยู่ตามทะเบียนบ้าน
  empAddrContact: "...............",   // ที่อยู่ที่ติดต่อได้
  empAddrDoc:     "...............",   // ที่อยู่จัดส่งเอกสาร
  empEmergName:   "...............",   // ผู้ติดต่อฉุกเฉิน
  empEmergRel:    "...............",   // ความสัมพันธ์
  empEmergPhone:  "...............",   // เบอร์โทร

  // ── ตำแหน่ง ─────────────────────────────────────────────
  position:       "...............",
  department:     "...............",
  workLocation:   "...............",
  reportTo:       "...............",   // ชื่อผู้บังคับบัญชา
  reportToTitle:  "...............",   // ตำแหน่งผู้บังคับบัญชา
  empType:        "...............",   // ประจำ / สัญญาจ้าง

  // ── ประเภทสัญญา ─────────────────────────────────────────
  // "fixed" = มีกำหนดเวลา | "permanent" = ไม่มีกำหนดเวลา
  contractType:   "fixed",
  startDate:      "...............",
  endDate:        "...............",   // เฉพาะ fixed-term
  probationDays:  "...............",   // จำนวนวันทดลองงาน
  renewalCond:    "...............",   // เงื่อนไขต่อสัญญา

  // ── ค่าตอบแทน ───────────────────────────────────────────
  salary:         "...............",   // จำนวนเงิน
  salaryType:     "...............",   // รายวัน / รายสัปดาห์ / รายเดือน
  salaryPer:      "...............",   // ต่อวัน / ต่อเดือน
  paymentCycle:   "...............",   // ทุกวัน / ทุกสัปดาห์ / ทุกเดือน / อื่นๆ
  paymentDate:    "...............",   // วันจ่าย เช่น ทุกวันที่ 30
  paymentMethod:  "โอนเข้าบัญชีธนาคาร",  // โอนเข้าบัญชีธนาคาร / เงินสด
  bankName:       "...............",
  bankBranch:     "...............",
  bankAccName:    "...............",
  bankAccNo:      "...............",
  extraComp:      "ไม่มี",            // OT / Commission / อื่นๆ

  // ── หน้าที่ความรับผิดชอบ (สูงสุด 6 ข้อ) ─────────────────
  duties: [
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
  ],
};

// ════════════════════════════════════════════════════════════
//  CONSTANTS
// ════════════════════════════════════════════════════════════
const FONT  = "Angsana New";
const SZ    = 24;   // 12pt body
const SZ_SM = 20;   // 10pt header/footer
const SZ_H1 = 56;   // 28pt title
const SZ_LB = 22;   // 11pt label
const PW    = 9120; // content width DXA (US Letter, margins 1560)

const C = {
  white:     "FFFFFF",
  paleGray:  "F2F2F2",
  lineGray:  "D4D4D4",
  midGray:   "595959",
  darkGray:  "2D2D2D",
  nearBlack: "1A1A1A",
};

// ════════════════════════════════════════════════════════════
//  BORDERS
// ════════════════════════════════════════════════════════════
const bdr    = { style: BorderStyle.SINGLE, size: 1, color: C.lineGray };
const allBdr = { top: bdr, bottom: bdr, left: bdr, right: bdr };
const noBdr  = {
  top:    { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left:   { style: BorderStyle.NONE },
  right:  { style: BorderStyle.NONE },
};

// ════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════
const tx = (text, opts = {}) => new TextRun({
  text:    text || "",
  font:    FONT,
  size:    opts.size  || SZ,
  bold:    opts.bold  || false,
  italics: opts.ital  || false,
  color:   opts.color || C.darkGray,
});

const p = (runs, opts = {}) => new Paragraph({
  spacing:   { before: opts.before || 40, after: opts.after || 40 },
  alignment: opts.align || AlignmentType.LEFT,
  border:    opts.border || undefined,
  children:  Array.isArray(runs) ? runs : [runs],
});

const rule = () => new Paragraph({
  spacing: { before: 100, after: 0 },
  border:  { bottom: { style: BorderStyle.SINGLE, size: 1, color: C.lineGray } },
  children: [tx("")],
});

const sTitle = (label) => new Paragraph({
  spacing: { before: 300, after: 80 },
  border:  { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.lineGray } },
  children: [tx(label, { bold: true, size: SZ + 2, color: C.nearBlack })],
});

const subLabel = (text) => new Paragraph({
  spacing: { before: 160, after: 40 },
  children: [tx(text, { bold: true, size: SZ + 2, color: C.nearBlack })],
});

const legalP = (text) => new Paragraph({
  spacing:   { before: 60, after: 60 },
  alignment: AlignmentType.JUSTIFIED,
  children:  [tx(text)],
});

const clauseT = (num, title) => new Paragraph({
  spacing: { before: 180, after: 40 },
  children: [
    tx(`ข้อ ${num}  `, { bold: true, size: SZ + 2, color: C.nearBlack }),
    tx(title,          { bold: true, size: SZ + 2, color: C.nearBlack }),
  ],
});

const sectionHead = (label) => new Paragraph({
  spacing: { before: 200, after: 60 },
  children: [tx(label, { bold: true, size: SZ + 2, color: C.nearBlack })],
});

const sp = (n = 1) => new Paragraph({
  spacing: { before: 0, after: n * 80 },
  children: [tx("")],
});

// ── Cell helpers ─────────────────────────────────────────────
const lbCell = (text, w) => new TableCell({
  borders: allBdr,
  width:   { size: w, type: WidthType.DXA },
  margins: { top: 80, bottom: 80, left: 160, right: 160 },
  shading: { fill: C.paleGray, type: ShadingType.CLEAR },
  verticalAlign: VerticalAlign.CENTER,
  children: [new Paragraph({
    children: [tx(text, { bold: true, size: SZ_LB, color: C.nearBlack })]
  })]
});

const valCell = (text, w, opts = {}) => new TableCell({
  borders: allBdr,
  width:   { size: w, type: WidthType.DXA },
  margins: { top: 80, bottom: 80, left: 160, right: 160 },
  verticalAlign: VerticalAlign.CENTER,
  columnSpan: opts.span || 1,
  children: [new Paragraph({
    children: [tx(text || "...............", { size: SZ, color: opts.ital ? C.midGray : C.darkGray, ital: opts.ital || false })]
  })]
});

const row = (...cells) => new TableRow({ children: cells });

const tbl = (rows, colWidths) => new Table({
  width:        { size: PW, type: WidthType.DXA },
  columnWidths: colWidths,
  rows,
});

// ════════════════════════════════════════════════════════════
//  HEADER (generic — ใส่ข้อมูลบริษัทจาก D)
// ════════════════════════════════════════════════════════════
const makeHeader = () => new Header({ children: [
  sp(1),
  new Paragraph({
    spacing: { before: 0, after: 20 },
    children: [tx(D.companyTH, { bold: true, size: SZ_SM + 4, color: C.nearBlack })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [tx(
      `${D.companyAddr}  |  เลขภาษี: ${D.companyTaxID}  |  โทร: ${D.companyPhone}`,
      { size: SZ_SM, color: C.midGray }
    )],
  }),
  new Paragraph({
    border:  { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.nearBlack } },
    spacing: { before: 80, after: 80 },
    children: [tx("")],
  }),
]});

// ════════════════════════════════════════════════════════════
//  FOOTER
// ════════════════════════════════════════════════════════════
const makeFooter = () => new Footer({ children: [
  new Paragraph({
    border:    { top: { style: BorderStyle.SINGLE, size: 6, color: C.nearBlack } },
    tabStops:  [{ type: "right", position: PW }],
    spacing:   { before: 80, after: 0 },
    children: [
      tx(`สัญญาจ้างพนักงาน  |  FM-HR-001 v3.0`, { size: SZ_SM, color: C.midGray }),
      new TextRun({ text: "\t", font: FONT }),
      tx("หน้า ", { size: SZ_SM, color: C.midGray }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SZ_SM, color: C.midGray }),
    ],
  }),
]});

// ════════════════════════════════════════════════════════════
//  HELPERS — checkbox display
// ════════════════════════════════════════════════════════════
const chk = (checked) => checked ? "☑" : "☐";

const contractTypeTH = D.contractType === "fixed"
  ? `${chk(true)} มีกำหนดเวลา (Fixed-Term)     ${chk(false)} ไม่มีกำหนดเวลา (Permanent)`
  : `${chk(false)} มีกำหนดเวลา (Fixed-Term)     ${chk(true)} ไม่มีกำหนดเวลา (Permanent)`;

const payMethodText = D.paymentMethod === "เงินสด"
  ? `${chk(false)} โอนเข้าบัญชีธนาคาร   ${chk(true)} จ่ายเป็นเงินสด`
  : `${chk(true)} โอนเข้าบัญชีธนาคาร   ${chk(false)} จ่ายเป็นเงินสด`;

// ════════════════════════════════════════════════════════════
//  CONTENT
// ════════════════════════════════════════════════════════════

// Widths
const L2 = 2280, V2 = 2280; // 4-col
const LH = 2400, VH = 6720; // 2-col

const children = [

  // ── TITLE ───────────────────────────────────────────────
  sp(1),
  new Paragraph({
    spacing:   { before: 0, after: 16 },
    alignment: AlignmentType.CENTER,
    children:  [tx("สัญญาจ้างพนักงาน", { size: SZ_H1, bold: true, color: C.nearBlack })],
  }),
  new Paragraph({
    spacing:   { before: 0, after: 0 },
    alignment: AlignmentType.CENTER,
    children:  [tx("Employment Agreement", { size: SZ + 2, color: C.midGray })],
  }),
  new Paragraph({
    spacing:   { before: 0, after: 160 },
    alignment: AlignmentType.CENTER,
    children:  [tx("FM-HR-001 v3.0", { size: SZ - 2, ital: true, color: C.midGray })],
  }),
  rule(),
  sp(1),

  // คำนำ
  legalP(
    `สัญญาฉบับนี้ทำขึ้น ณ ${D.contractPlace} เมื่อวันที่ ${D.contractDate} ` +
    `ระหว่าง ${D.companyTH} โดย ${D.signerName} ตำแหน่ง ${D.signerTitle} ` +
    `ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้ว่าจ้าง" ฝ่ายหนึ่ง ` +
    `กับ ${D.empNameTH} ซึ่งต่อไปในสัญญานี้จะเรียกว่า "ผู้รับจ้าง" อีกฝ่ายหนึ่ง ` +
    `คู่สัญญาทั้งสองฝ่ายได้ตกลงกันมีข้อความดังต่อไปนี้`
  ),
  sp(1),

  // ══════════════════════════════════════════════════════════
  // SECTION 1
  // ══════════════════════════════════════════════════════════
  sTitle("ส่วนที่ 1 : ข้อมูลสำหรับสัญญาฉบับนี้"),
  sp(1),

  // ── 1.1 ประเภทสัญญา ──────────────────────────────────────
  subLabel("1.1  ประเภทสัญญาจ้าง"),
  tbl([
    row(
      lbCell("ประเภทสัญญา", 1800),
      valCell(contractTypeTH, PW - 1800),
    ),
  ], [1800, PW - 1800]),
  sp(1),

  // ── 1.2 ข้อมูลพนักงาน ────────────────────────────────────
  subLabel("1.2  ข้อมูลพนักงาน"),
  tbl([
    row(lbCell("ชื่อ-นามสกุล (ไทย)", L2),       valCell(D.empNameTH, V2),    lbCell("ชื่อ-นามสกุล (อังกฤษ)", L2), valCell(D.empNameEN, V2)),
    row(lbCell("เลขบัตรประชาชน", L2),             valCell(D.empIDCard, V2),    lbCell("วันหมดอายุบัตร", L2),          valCell(D.empIDExpiry, V2)),
    row(lbCell("วันเดือนปีเกิด", L2),              valCell(D.empDOB, V2),       lbCell("สัญชาติ / ศาสนา", L2),         valCell(`${D.empNationality} / ${D.empReligion}`, V2)),
    row(lbCell("เบอร์โทรศัพท์", L2),               valCell(D.empPhone, V2),     lbCell("E-mail", L2),                   valCell(D.empEmail, V2)),
    row(lbCell("ที่อยู่ตามทะเบียนบ้าน", L2),    new TableCell({ borders: allBdr, columnSpan: 3, width: { size: V2+L2+V2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, children: [new Paragraph({ children: [tx(D.empAddrRegist)] })] })),
    row(lbCell("ที่อยู่ที่ติดต่อได้", L2),        new TableCell({ borders: allBdr, columnSpan: 3, width: { size: V2+L2+V2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, children: [new Paragraph({ children: [tx(D.empAddrContact)] })] })),
    row(lbCell("ที่อยู่จัดส่งเอกสาร", L2),       new TableCell({ borders: allBdr, columnSpan: 3, width: { size: V2+L2+V2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, children: [new Paragraph({ children: [tx(D.empAddrDoc)] })] })),
    row(lbCell("ผู้ติดต่อฉุกเฉิน", L2),           valCell(`${D.empEmergName} / ${D.empEmergRel}`, V2), lbCell("เบอร์โทรผู้ติดต่อฉุกเฉิน", L2), valCell(D.empEmergPhone, V2)),
  ], [L2, V2, L2, V2]),
  sp(1),

  // ── 1.3 ตำแหน่ง ──────────────────────────────────────────
  subLabel("1.3  ตำแหน่งและโครงสร้างการรายงาน"),
  tbl([
    row(lbCell("ตำแหน่งงาน", L2),              valCell(D.position, V2),        lbCell("ฝ่าย / แผนก", L2),              valCell(D.department, V2)),
    row(lbCell("สถานที่ทำงาน", L2),             valCell(D.workLocation, V2),    lbCell("รายงานตรงต่อ (ชื่อ)", L2),      valCell(D.reportTo, V2)),
    row(lbCell("ตำแหน่งผู้บังคับบัญชา", L2),   valCell(D.reportToTitle, V2),  lbCell("ประเภทพนักงาน", L2),             valCell(D.empType, V2)),
  ], [L2, V2, L2, V2]),
  sp(1),

  // ── 1.4 ระยะเวลาสัญญา ────────────────────────────────────
  subLabel("1.4  ระยะเวลาสัญญา"),
  tbl([
    row(lbCell("วันเริ่มต้นสัญญา", L2),    valCell(D.startDate, V2),       lbCell("วันสิ้นสุดสัญญา", L2),  valCell(D.contractType === "permanent" ? "ไม่มีกำหนดเวลา" : D.endDate, V2)),
    row(lbCell("รวมระยะเวลา", L2),          valCell("...............", V2),  lbCell("ช่วงทดลองงาน", L2),     valCell(`${D.probationDays} วัน นับจากวันเริ่มงาน`, V2)),
    row(lbCell("เงื่อนไขต่อสัญญา", L2),    new TableCell({ borders: allBdr, columnSpan: 3, width: { size: V2+L2+V2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, children: [new Paragraph({ children: [tx(D.renewalCond)] })] })),
  ], [L2, V2, L2, V2]),
  sp(1),

  // ── 1.5 ค่าตอบแทน ────────────────────────────────────────
  subLabel("1.5  ค่าตอบแทนและการจ่ายเงิน"),
  tbl([
    row(lbCell("อัตราค่าจ้าง", L2),          valCell(`${D.salary} บาท`, V2),   lbCell("ประเภทค่าจ้าง", L2),         valCell(D.salaryType, V2)),
    row(lbCell("จ่ายค่าจ้างต่อ", L2),         valCell(D.salaryPer, V2),          lbCell("งวดการจ่ายค่าจ้าง", L2),    valCell(D.paymentCycle, V2)),
    row(lbCell("วันจ่ายค่าจ้าง", L2),         valCell(D.paymentDate, V2),        lbCell("วิธีการจ่ายค่าจ้าง", L2),  valCell(payMethodText, V2)),
    ...(D.paymentMethod !== "เงินสด" ? [
      row(lbCell("ธนาคาร", L2),               valCell(D.bankName, V2),           lbCell("สาขา", L2),                  valCell(D.bankBranch, V2)),
      row(lbCell("ชื่อบัญชี", L2),            valCell(D.bankAccName, V2),        lbCell("เลขที่บัญชี", L2),           valCell(D.bankAccNo, V2)),
    ] : []),
    row(lbCell("ค่าตอบแทนเพิ่มเติม\n(OT/Commission/อื่นๆ)", L2),
      new TableCell({ borders: allBdr, columnSpan: 3, width: { size: V2+L2+V2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, children: [new Paragraph({ children: [tx(D.extraComp)] })] })),
  ], [L2, V2, L2, V2]),
  sp(1),

  // ── 1.6 หน้าที่ ───────────────────────────────────────────
  subLabel("1.6  หน้าที่ความรับผิดชอบหลัก"),
  new Table({
    width: { size: PW, type: WidthType.DXA },
    columnWidths: [500, PW - 500],
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 500, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("#", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 500, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ children: [tx("รายละเอียดหน้าที่ความรับผิดชอบ", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
      ]}),
      ...D.duties.map((duty, i) => new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 500, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(String(i + 1), { color: C.midGray })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 500, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ children: [tx(duty || "...")] })] }),
      ]})),
    ]
  }),
  sp(1),

  // ── 1.7 คำรับรอง ─────────────────────────────────────────
  subLabel("1.7  คำรับรองจากผู้รับจ้าง"),
  legalP("ผู้รับจ้างขอรับรองว่าข้อความต่อไปนี้เป็นความจริงทุกประการ ณ วันลงนามในสัญญา"),
  sp(1),
  new Table({
    width: { size: PW, type: WidthType.DXA },
    columnWidths: [1200, PW - 1200],
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 1200, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("ทำเครื่องหมาย ✓", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 1200, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ children: [tx("รายการรับรอง", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
      ]}),
      ...[
        "มีสุขภาพร่างกายแข็งแรงสมบูรณ์ ไม่เป็นโรคติดต่อร้ายแรง หรือโรคที่เป็นอุปสรรคต่อการปฏิบัติงาน",
        "ไม่มีประวัติเคยถูกดำเนินคดีอาญา หรืออยู่ระหว่างถูกดำเนินคดีใดๆ",
        "ไม่เคยถูกเลิกจ้างเนื่องจากการกระทำผิดวินัยร้ายแรง หรือทุจริตต่อหน้าที่",
        "ไม่มีประวัติการติดสารเสพติด หรืออยู่ระหว่างการบำบัด",
        "ไม่มีภาระผูกพันทางสัญญากับนายจ้างเดิมที่ขัดต่อสัญญาฉบับนี้",
        "ข้อมูลและเอกสารที่ยื่นประกอบการสมัครงานทั้งหมดเป็นความจริง",
        "*(เฉพาะกรณีที่เกี่ยวข้อง)* ไม่ได้อยู่ในภาวะตั้งครรภ์ ณ วันที่เริ่มงาน",
      ].map(t => new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 1200, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("☐", { size: SZ })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 1200, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [tx(t)] })] }),
      ]})),
    ]
  }),
  sp(1),

  // ── เอกสารแนบ ─────────────────────────────────────────────
  subLabel("เอกสารแนบท้ายสัญญา"),
  new Table({
    width: { size: PW, type: WidthType.DXA },
    columnWidths: [1100, PW - 1900, 800],
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 1100, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("เอกสารแนบ", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 1900, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ children: [tx("รายการ", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
        new TableCell({ borders: allBdr, width: { size: 800, type: WidthType.DXA }, shading: { fill: C.paleGray, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 160, right: 160 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("แนบแล้ว", { bold: true, size: SZ_LB, color: C.nearBlack })] })] }),
      ]}),
      ...[
        ["แนบ 1", "สำเนาหนังสือรับรองบริษัท + สำเนาบัตรประชาชนกรรมการผู้มีอำนาจ"],
        ["แนบ 2", "สำเนาบัตรประชาชน + สำเนาทะเบียนบ้านผู้รับจ้าง"],
        ["แนบ 3", "สำเนาหน้าสมุดบัญชีธนาคารที่ใช้รับค่าจ้าง"],
        ["แนบ 4", "สำเนาวุฒิการศึกษา / ใบรับรองผลการทำงาน (ถ้ามี)"],
        ["แนบ 5", "อื่นๆ (ระบุ): ..............."],
      ].map(([no, desc]) => new TableRow({ children: [
        new TableCell({ borders: allBdr, width: { size: 1100, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(no, { color: C.midGray })] })] }),
        new TableCell({ borders: allBdr, width: { size: PW - 1900, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [tx(desc)] })] }),
        new TableCell({ borders: allBdr, width: { size: 800, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 160, right: 160 }, verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("☐")] })] }),
      ]})),
    ]
  }),
  sp(1),

  // ── Offer Letter cut line ─────────────────────────────────
  rule(),
  new Paragraph({
    spacing:   { before: 80, after: 80 },
    alignment: AlignmentType.CENTER,
    children:  [tx("⚡  Offer Letter: ส่งให้พนักงานเฉพาะส่วนที่ 1 ด้านบนนี้เท่านั้น  ⚡", { size: SZ - 2, ital: true, color: C.midGray, bold: true })],
  }),
  rule(),
  sp(1),

  // PAGE BREAK
  new Paragraph({ children: [new PageBreak()] }),

  // ══════════════════════════════════════════════════════════
  // SECTION 2 — ข้อตกลง (ไม่ต้องแก้ไข)
  // ══════════════════════════════════════════════════════════
  sTitle("ส่วนที่ 2 : ข้อตกลงและเงื่อนไขการจ้างงาน"),
  legalP("ข้อกำหนดต่อไปนี้มีผลบังคับใช้กับสัญญาจ้างทุกฉบับ — ห้ามดัดแปลงโดยไม่ได้รับอนุมัติจากฝ่าย HR"),

  sectionHead("หมวด A  เงื่อนไขทั่วไป"),

  clauseT(1, "การสิ้นสุดของสัญญา"),
  legalP("สัญญาฉบับนี้จะสิ้นสุดลงตามเงื่อนไขดังต่อไปนี้"),
  legalP("(ก) กรณีที่มีการกำหนดวันสิ้นสุดสัญญาไว้ในส่วนที่ 1 ข้อ 1.4 — สัญญาจะสิ้นสุดลงโดยอัตโนมัติในวันที่กำหนด โดยไม่จำเป็นต้องมีการบอกกล่าวล่วงหน้าจากฝ่ายใดฝ่ายหนึ่ง และผู้ว่าจ้างไม่มีหน้าที่ต้องจ่ายค่าชดเชยใดๆ อันเนื่องมาจากการสิ้นสุดตามกำหนดเวลาดังกล่าว"),
  legalP("(ข) กรณีที่ไม่ได้กำหนดวันสิ้นสุดสัญญาไว้ในส่วนที่ 1 ข้อ 1.4 — คู่สัญญาฝ่ายใดฝ่ายหนึ่งสามารถบอกเลิกสัญญาได้โดยแจ้งเป็นหนังสือให้อีกฝ่ายทราบล่วงหน้าไม่น้อยกว่าหนึ่งงวดการจ่ายค่าจ้าง หรือจ่ายค่าจ้างแทนการบอกกล่าวล่วงหน้า ตามมาตรา 17 แห่งพระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541"),

  clauseT(2, "ผลประโยชน์และสวัสดิการ"),
  legalP("ผู้รับจ้างจะได้รับสวัสดิการตามที่ระบุในคู่มือพนักงานและตามนโยบายของผู้ว่าจ้าง ซึ่งอาจรวมถึงประกันสังคม ประกันสุขภาพ วันลาพักร้อน และสวัสดิการอื่นๆ สวัสดิการเหล่านี้ไม่ถือเป็นส่วนหนึ่งของค่าจ้างตามกฎหมายคุ้มครองแรงงาน และผู้ว่าจ้างสงวนสิทธิ์ในการปรับเปลี่ยนได้ตามความเหมาะสม"),

  clauseT(3, "ค่าจ้างและภาษี"),
  legalP("ผู้ว่าจ้างจะหักภาษีเงินได้บุคคลธรรมดา ณ ที่จ่าย และเงินสมทบประกันสังคมจากค่าจ้างของผู้รับจ้างตามที่กฎหมายกำหนด ค่าจ้างที่ระบุในส่วนที่ 1 ข้อ 1.5 เป็นค่าจ้างก่อนหักภาษีและประกันสังคม"),

  clauseT(4, "สิทธิในการลาพักผ่อนและวันหยุด"),
  legalP("ผู้รับจ้างมีสิทธิลาพักผ่อนประจำปี ลาป่วย ลากิจ และวันหยุดนักขัตฤกษ์ตามที่กฎหมายคุ้มครองแรงงานกำหนด และตามนโยบายของผู้ว่าจ้างที่ระบุในคู่มือพนักงาน"),

  clauseT(5, "สุขภาพและความสามารถในการทำงาน"),
  legalP("ผู้รับจ้างมีหน้าที่แจ้งผู้ว่าจ้างทันทีหากมีปัญหาสุขภาพที่กระทบต่อความสามารถในการปฏิบัติงาน หากปรากฏภายหลังว่าผู้รับจ้างปกปิดข้อมูลสุขภาพที่มีนัยสำคัญ ผู้ว่าจ้างมีสิทธิ์บอกเลิกสัญญาได้ทันทีโดยไม่ต้องจ่ายค่าชดเชย"),

  clauseT(6, "ความสามารถและคุณสมบัติ"),
  legalP("หากปรากฏว่าผู้รับจ้างอวดอ้างความรู้ความสามารถหรือคุณสมบัติที่ไม่มีจริง ผู้ว่าจ้างมีสิทธิ์บอกเลิกสัญญาได้ทันทีตามมาตรา 578 แห่งประมวลกฎหมายแพ่งและพาณิชย์ โดยไม่ต้องบอกกล่าวล่วงหน้าและไม่ต้องจ่ายค่าชดเชยใดๆ"),

  clauseT(7, "ความซื่อสัตย์และการปฏิบัติหน้าที่"),
  legalP("หากผู้รับจ้างกระทำการทุจริตหรือประพฤติมิชอบต่อหน้าที่ ผู้ว่าจ้างมีสิทธิ์เลิกจ้างได้ทันทีโดยไม่ต้องบอกกล่าวล่วงหน้า และไม่ต้องจ่ายค่าชดเชยใดๆ ตามมาตรา 583 แห่งประมวลกฎหมายแพ่งและพาณิชย์ และมาตรา 119 แห่งพระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541"),

  clauseT(8, "การปฏิบัติตามกฎระเบียบของบริษัท"),
  legalP("การฝ่าฝืนข้อบังคับโดยไม่มีเหตุอันสมควร หลังจากที่ได้รับการตักเตือนเป็นหนังสือแล้ว ถือเป็นเหตุให้ผู้ว่าจ้างเลิกจ้างได้โดยไม่ต้องจ่ายค่าชดเชย ตามมาตรา 119(4) แห่งพระราชบัญญัติคุ้มครองแรงงาน พ.ศ. 2541"),

  clauseT(9, "การประเมินผลการปฏิบัติงาน"),
  legalP("ผู้ว่าจ้างจะทำการประเมินผลการปฏิบัติงานของผู้รับจ้างตามรอบระยะเวลาที่กำหนด ผลการประเมินจะเป็นปัจจัยสำคัญในการพิจารณาต่อสัญญา การปรับเงินเดือน และโอกาสความก้าวหน้าในการทำงาน"),

  clauseT(10, "การรับรองข้อมูลและเอกสาร"),
  legalP("หากปรากฏในภายหลังว่าเอกสาร ข้อมูล หรือคำรับรองที่ผู้รับจ้างยื่นประกอบสัญญาเป็นเท็จหรือคลาดเคลื่อน ผู้ว่าจ้างมีสิทธิ์บอกเลิกสัญญาได้ทันทีโดยไม่ต้องจ่ายค่าชดเชยใดๆ และสงวนสิทธิ์เรียกร้องค่าเสียหาย"),

  clauseT(11, "อุปกรณ์และทรัพยากรของบริษัท"),
  legalP("ผู้รับจ้างมีหน้าที่ดูแลรักษาทรัพย์สินของผู้ว่าจ้างอย่างระมัดระวัง และต้องส่งคืนในสภาพดีเมื่อสิ้นสุดสัญญา ความเสียหายที่เกิดจากการใช้งานโดยไม่ระมัดระวังจะถูกหักจากค่าตอบแทนตามที่กฎหมายอนุญาต"),

  sectionHead("หมวด B  การห้ามค้าแข่ง ผลประโยชน์ทับซ้อน และการรับงานนอก"),

  clauseT(12, "การไม่ค้าแข่งขัน"),
  legalP("ตลอดระยะเวลาของสัญญาฉบับนี้ ผู้รับจ้างจะไม่ประกอบกิจการ ทำงาน หรือให้คำปรึกษาแก่บุคคลหรือนิติบุคคลที่ประกอบธุรกิจในลักษณะเดียวกันหรือแข่งขันกับผู้ว่าจ้าง โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากผู้ว่าจ้างก่อน"),

  clauseT(13, "การรับงานหรือประกอบอาชีพเสริมนอกเวลางาน"),
  legalP("ผู้รับจ้างที่ประสงค์จะรับจ้างทำงาน ประกอบอาชีพเสริม หรือให้บริการใดๆ แก่บุคคลภายนอกในเวลานอกเหนือจากเวลาทำงานปกติ จะต้องแจ้งให้ผู้ว่าจ้างทราบเป็นลายลักษณ์อักษรล่วงหน้าก่อน และต้องได้รับการอนุมัติจากผู้ว่าจ้างก่อนดำเนินการ ทั้งนี้ งานดังกล่าวต้องไม่กระทบต่อประสิทธิภาพการปฏิบัติงานหลัก ไม่ขัดต่อผลประโยชน์ของผู้ว่าจ้าง และไม่เป็นการนำความลับทางการค้าหรือทรัพย์สินทางปัญญาของผู้ว่าจ้างไปใช้ในทางใดทางหนึ่ง"),

  clauseT(14, "การไม่แสวงหาผลประโยชน์ส่วนตัว"),
  legalP("ผู้รับจ้างจะไม่ใช้ทรัพยากร ข้อมูล ความสัมพันธ์ทางธุรกิจ หรือชื่อเสียงของผู้ว่าจ้างเพื่อแสวงหาประโยชน์ส่วนตัว หรือเพื่อประโยชน์ของบุคคลที่สาม โดยไม่ได้รับอนุญาตจากผู้ว่าจ้างก่อน"),

  sectionHead("หมวด C  กรรมสิทธิ์และทรัพย์สินทางปัญญา"),

  clauseT(15, "ความเป็นเจ้าของทรัพย์สินทางปัญญา"),
  legalP("ผลงานทุกชิ้นที่ผู้รับจ้างสร้างขึ้นในระหว่างการปฏิบัติงาน หรือที่เกี่ยวข้องกับธุรกิจของผู้ว่าจ้าง ถือเป็นทรัพย์สินของผู้ว่าจ้างทั้งสิ้น ผู้รับจ้างสละสิทธิ์ทุกอย่างในทรัพย์สินทางปัญญาดังกล่าว"),

  clauseT(16, "การรักษาความลับทางการค้า"),
  legalP("ผู้รับจ้างตกลงที่จะรักษาความลับของข้อมูลทางธุรกิจ ข้อมูลลูกค้า กลยุทธ์ทางการตลาด และข้อมูลอื่นๆ ที่เป็นความลับทางการค้า ข้อผูกมัดนี้ยังคงมีผลบังคับใช้ต่อไปแม้จะสิ้นสุดสัญญาแล้วเป็นเวลาไม่น้อยกว่า 3 ปี"),

  clauseT(17, "การจัดเก็บและการส่งคืนทรัพย์สินทางปัญญา"),
  legalP("ผู้รับจ้างจะไม่ลบ ทำลาย หรือนำทรัพย์สินทางปัญญาออกไปโดยไม่ได้รับอนุญาต เมื่อสิ้นสุดสัญญา ผู้รับจ้างต้องส่งคืนทรัพย์สินทางปัญญาทั้งหมด และลบข้อมูลของผู้ว่าจ้างออกจากอุปกรณ์ส่วนตัว"),

  clauseT(18, "การรับประกันทรัพย์สินทางปัญญา"),
  legalP("ผู้รับจ้างรับรองว่าผลงานที่ส่งมอบจะไม่ละเมิดสิทธิ์ในทรัพย์สินทางปัญญาของบุคคลที่สาม หากมีการเรียกร้องหรือดำเนินคดีอันเกิดจากการละเมิดดังกล่าว ผู้รับจ้างจะรับผิดชอบค่าเสียหายทุกอย่างแก่ผู้ว่าจ้าง"),

  clauseT(19, "การส่งมอบทรัพย์สินเมื่อสิ้นสุดสัญญา"),
  legalP("ผู้รับจ้างต้องส่งมอบทรัพย์สิน อุปกรณ์ เอกสาร และข้อมูลทั้งหมดที่เกี่ยวข้องกับงานของผู้ว่าจ้างคืนในสภาพสมบูรณ์ ก่อนพ้นจากการปฏิบัติหน้าที่ในวันสุดท้ายของสัญญา"),

  sectionHead("หมวด D  การคุ้มครองข้อมูลส่วนบุคคล (PDPA)"),

  clauseT(20, "การเก็บรวบรวมข้อมูลส่วนบุคคล"),
  legalP("ผู้รับจ้างยินยอมให้ผู้ว่าจ้างเก็บรวบรวม ใช้ และประมวลผลข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อการบริหารงานบุคคล ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562"),

  clauseT(21, "ระยะเวลาการเก็บรักษาข้อมูล"),
  legalP("ผู้ว่าจ้างจะเก็บข้อมูลส่วนบุคคลไว้ไม่เกิน 5 ปีนับจากวันสิ้นสุดสัญญา เว้นแต่กฎหมายกำหนดให้เก็บรักษาเป็นระยะเวลาที่นานกว่า"),

  clauseT(22, "การห้ามใช้ข้อมูลส่วนบุคคลในทางมิชอบ"),
  legalP("ผู้รับจ้างต้องไม่เปิดเผยหรือใช้ข้อมูลส่วนบุคคลของเพื่อนร่วมงาน ลูกค้า หรือบุคคลอื่นที่ตนล่วงรู้จากการปฏิบัติหน้าที่ เพื่อวัตถุประสงค์อื่นนอกเหนือจากที่กำหนด"),

  sectionHead("หมวด E  ค่าเสียหายและบทบัญญัติทั่วไป"),

  clauseT(23, "ค่าเสียหายและการหักเงิน"),
  legalP("หากผู้รับจ้างก่อให้เกิดความเสียหายแก่ผู้ว่าจ้างอันเนื่องมาจากการจงใจหรือประมาทเลินเล่ออย่างร้ายแรง ผู้ว่าจ้างมีสิทธิ์เรียกร้องค่าเสียหาย และอาจหักจากเงินประกัน ค่าคอมมิชชั่น หรือสวัสดิการอื่นๆ นอกเหนือจากค่าจ้างพื้นฐาน ตามที่กฎหมายคุ้มครองแรงงานอนุญาต"),

  clauseT(24, "กฎหมายที่ใช้บังคับและการระงับข้อพิพาท"),
  legalP("สัญญาฉบับนี้อยู่ภายใต้บังคับและให้ตีความตามกฎหมายไทย ข้อพิพาทที่เกิดขึ้นให้นำเสนอต่อศาลแรงงานที่มีเขตอำนาจ"),

  clauseT(25, "ความสมบูรณ์ของสัญญา"),
  legalP("สัญญาฉบับนี้เป็นข้อตกลงทั้งหมดระหว่างคู่สัญญา และมีผลแทนที่ข้อตกลงก่อนหน้าทั้งหมด หากข้อใดตกเป็นโมฆะ ข้ออื่นๆ ยังคงมีผลบังคับใช้ต่อไปอย่างสมบูรณ์"),
  sp(1),

  // ── ลายมือชื่อ ────────────────────────────────────────────
  rule(),
  sp(1),
  legalP("คู่สัญญาทั้งสองฝ่ายได้อ่านและเข้าใจข้อความในสัญญาฉบับนี้โดยละเอียดแล้ว จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน"),
  sp(1),

  new Table({
    width: { size: PW, type: WidthType.DXA },
    columnWidths: [PW / 2, PW / 2],
    rows: [
      new TableRow({ children: [
        new TableCell({ borders: noBdr, width: { size: PW / 2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 0, right: 40 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("ผู้ว่าจ้าง", { bold: true, color: C.nearBlack })] }),
            new Paragraph({ spacing: { before: 400, after: 80 }, alignment: AlignmentType.CENTER, children: [tx("ลายมือชื่อ  ………………………………………………")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(`(${D.signerName || "……………………………………………………"})`)] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(`ตำแหน่ง ${D.signerTitle || "………………………………………………"}`)] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("วันที่ ……… / ……………………… / …………")] }),
          ]
        }),
        new TableCell({ borders: noBdr, width: { size: PW / 2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 40, right: 0 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("ผู้รับจ้าง", { bold: true, color: C.nearBlack })] }),
            new Paragraph({ spacing: { before: 400, after: 80 }, alignment: AlignmentType.CENTER, children: [tx("ลายมือชื่อ  ………………………………………………")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx(`(${D.empNameTH || "……………………………………………………"})`)] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("ตำแหน่ง ………………………………………………………")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("วันที่ ……… / ……………………… / …………")] }),
          ]
        }),
      ]}),
      new TableRow({ children: [
        new TableCell({ borders: noBdr, columnSpan: 2, width: { size: PW, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 0, right: 0 },
          children: [
            new Paragraph({ spacing: { before: 320 }, alignment: AlignmentType.CENTER, children: [tx("พยาน", { bold: true, color: C.nearBlack })] }),
            new Paragraph({ spacing: { before: 400, after: 80 }, alignment: AlignmentType.CENTER, children: [tx("ลายมือชื่อ  ………………………………………………")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("(……………………………………………………………)")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [tx("วันที่ ……… / ……………………… / …………")] }),
          ]
        }),
      ]}),
    ]
  }),
];

// ════════════════════════════════════════════════════════════
//  BUILD
// ════════════════════════════════════════════════════════════
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: {
      page: {
        size:   { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1560, bottom: 1080, left: 1560 }
      }
    },
    headers: { default: makeHeader() },
    footers: { default: makeFooter() },
    children,
  }]
});

const outName = D.empNameTH && D.empNameTH !== "..............."
  ? `สัญญาจ้าง-${D.empNameTH}.docx`
  : "FM-HR-001-filled.docx";

Packer.toBuffer(doc)
  .then(buf => { fs.writeFileSync(`/home/claude/${outName}`, buf); console.log(`done: ${outName}`); })
  .catch(e => { console.error(e); process.exit(1); });
