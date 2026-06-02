# AI Coding Landing Zone

> 复制到项目仓库，替换占位符（`<!-- ... -->`），即可开始。

---

## 目录

```
landing-zone/
├── AGENTS.md                          # AI 行为边界 + 技术栈 + 验证命令
├── quality-gates.md                   # CI 门禁契约
├── scripts/pre-commit.sh              # 提交前自动检查
├── Reference/java-spring/             # 代码风格示例（AI 照着形状写）
└── 企业知识/                           # 业务上下文
    ├── 业务术语表.md
    ├── 系统上下文.md
    └── 踩坑记录.md
```

---

## 30 分钟上手

### 1. 替换 AGENTS.md 占位符

打开 `AGENTS.md`，搜索 `<!--`：项目名、技术栈、包名、构建命令、Lint 命令。

### 2. 调整 Reference 示例

确认 `Reference/java-spring/` 下的示例代码的包名、返回体、异常类名与你的项目一致。如果是 Python 或其他栈，替换为对应语言的示例。

### 3. 填入企业知识

- `业务术语表.md` — 核心概念和状态枚举
- `系统上下文.md` — 上下游依赖和已有基础设施
- `踩坑记录.md` — 已有的坑（没有就先空着，第一次踩坑时开始记）

### 4. 安装 Pre-commit

```bash
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
# 取消注释脚本中对应你语言的检查命令
```

### 5. 接入 CI

把 `quality-gates.md` 里的命令逐条写入 CI 配置文件。确保命令与文档一致。

---

## 此后

- 每次踩坑 → 更新 `AGENTS.md` 和 `踩坑记录.md`
- 新增外部依赖 → 更新 `系统上下文.md`
- 新术语上线 → 更新 `业务术语表.md`
- 每季度 Review 一次 AGENTS.md
