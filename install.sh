#!/usr/bin/env bash
# ติดตั้งสกิล Skills Lab เข้า Claude Code (ก๊อปเข้า ~/.claude/skills)
set -e
DEST="$HOME/.claude/skills"
mkdir -p "$DEST"
cp -R "$(cd "$(dirname "$0")" && pwd)/skills/"* "$DEST/"
echo "✅ ติดตั้งสกิลเรียบร้อย!"
echo "เปิด Claude Code แล้วพิมพ์ /skills เพื่อดูรายการ"
