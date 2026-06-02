#!/bin/bash
# ============================================
# Pre-commit Hook — AI Coding Landing Zone
# ============================================
#
# 功能：提交前自动执行 lint + 格式化检查。
# 安装：将此文件复制到 .git/hooks/pre-commit，或通过 pre-commit 框架安装。
#
# 使用方法：
#   chmod +x scripts/pre-commit.sh
#   cp scripts/pre-commit.sh .git/hooks/pre-commit
#   # 或通过 pre-commit 框架:
#   #   pip install pre-commit
#   #   创建 .pre-commit-config.yaml 引用此脚本逻辑
# ============================================

set -e

echo "🔍 Pre-commit: 开始检查..."

# -------------------------------------------
# 根据项目语言选择检查命令（按需取消注释）
# -------------------------------------------

# --- Java / Maven ---
# echo "→ 运行 checkstyle + spotless..."
# ./mvnw spotless:check -q || {
#     echo "❌ 格式化检查未通过。运行 './mvnw spotless:apply' 修复后重新提交。"
#     exit 1
# }

# --- Java / Gradle ---
# echo "→ 运行 checkstyle..."
# ./gradlew checkstyleMain checkstyleTest || exit 1

# --- Python / ruff ---
# echo "→ 运行 ruff lint + format check..."
# ruff check . || {
#     echo "❌ Lint 检查未通过。运行 'ruff check --fix .' 修复。"
#     exit 1
# }
# ruff format --check . || {
#     echo "❌ 格式化检查未通过。运行 'ruff format .' 修复。"
#     exit 1
# }

# --- Python / black + isort + flake8 ---
# echo "→ 运行 isort + black + flake8..."
# isort --check-only . || exit 1
# black --check . || exit 1
# flake8 . || exit 1

# --- Node.js / ESLint + Prettier ---
# echo "→ 运行 ESLint + Prettier..."
# npx eslint . --max-warnings 0 || exit 1
# npx prettier --check . || exit 1

# --- 通用：检查敏感信息（始终启用） ---
echo "→ 扫描敏感信息..."
SENSITIVE_PATTERNS=(
  "password\s*=\s*['\"][^'\"]+['\"]"
  "api_key\s*=\s*['\"][^'\"]+['\"]"
  "secret\s*=\s*['\"][^'\"]+['\"]"
  "token\s*=\s*['\"][^'\"]+['\"]"
  "-----BEGIN.*PRIVATE KEY-----"
  "sk-[a-zA-Z0-9]{20,}"
)

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if git diff --cached --name-only | xargs grep -lE "$pattern" 2>/dev/null; then
    echo "⚠️  警告：检测到可能的敏感信息（密钥/密码/Token），请确认是否误提交。"
  fi
done

echo "✅ Pre-commit: 检查通过"
