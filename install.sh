#!/usr/bin/env bash
# ติดตั้งสกิล + ทีม AI ของ Skills Lab เข้า Claude Code (~/.claude)
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/.claude/skills"
mkdir -p "$DEST"
cp -R "$ROOT/skills/"* "$DEST/"
echo "✅ ติดตั้งสกิลเรียบร้อย!"
if [ -d "$ROOT/agents" ]; then
  ADEST="$HOME/.claude/agents"
  mkdir -p "$ADEST"
  cp -R "$ROOT/agents/"* "$ADEST/"
  echo "✅ ติดตั้งทีม AI (นักวางแผน/ช่างสร้าง/ผู้ตรวจงาน) เรียบร้อย!"
fi
echo "เปิด Claude Code แล้วพิมพ์ /skills ดูสกิล · /agents ดูทีม"
