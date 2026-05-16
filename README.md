# Mumu Coding | AI Coding Playbook — 企业级 Spec Coding 方法论与实战资产

> **Any tool, any team. Ship specs before code.**
> 
> 一套经过企业实战验证的 AI Coding 落地方法论与资料包。不是教程，是**可以直接拿去用的工程资产**。

---

## 🎯 为什么需要这个仓库

AI Coding 工具（ Qoder / 通义灵码 / Kiro / Trae / Claude Code / Codex / Copilot / Cursor /）已经足够好，但**企业落地仍然失败率高**——原因不在工具，在：

- ❌ 团队把 AI 当"更快的打字机"，不先对齐需求
- ❌ 改一处需求，API / 数据 / 测试 / 追溯全不同步
- ❌ 没有方法论文档，新人上手全凭感觉
- ❌ 管理层问"ROI 在哪"，答不出来

**这个仓库解决的就是"工具之外的部分"**：如何先写 Spec 再写代码；如何让 14 份文档互相咬合；如何度量团队成熟度并设计进阶路径。

---

## 📦 仓库里有什么

### 1️⃣ 企业级 AI Coding 成熟度模型（E-ACMM）

5 级能力演进模型，帮你回答：**"我的团队现在在哪一级，下一步该做什么"**

| 级别 | 名称 | 典型特征 |
|------|------|----------|
| L1 | 个人探索 | 团队在用 AI，但无统一方法 |
| L2 | 团队试点 | 有工具链，但未系统化 |
| L3 | 企业广泛使用与沉淀 | Context Engineering 落地，Spec 先行 |
| L4 | 量化驱动 | ROI 可量化，持续改进 |
| L5 | 研发范式 | AI Coding 成为组织基因 |

> 📄 [阅读白皮书完整版（PDF）](见PDF文件)  
> 📝 [在线自评问卷（H5）](待补充)

### 2️⃣ 14 文档 Spec 矩阵体系

不是"写个 PRD 就完"，而是一套**可追溯、可校验、可交付**的工程规约体系：

```
┌─────────────────────────────────────────────────────┐
│  Meta        01 写作总则  ·  02 需求采集             │
│  Proposal    03 立项提案  ·  04 产品需求 PRD         │
│  Spec        05 用户故事  ·  06 功能规格  ·  07 NFR  │
│  Design      08 架构选型  ·  09 API契约  ·  10 数据  │
│              11 安全设计                             │
│  Plan        12 实施计划                             │
│  Test        13 测试策略                             │
│  Trace       14 追溯矩阵                             │
└─────────────────────────────────────────────────────┘
```

> 每份文档都经过真实客户项目验证，配套 [Spec Console 可视化控制台](spec-console.html) 和 [spec-manifest.json](Spec模板-投研助手/spec-manifest.json) 字段级追溯。

### 3️⃣ WAF 六大支柱方法论

Well-Architected Framework for AI Coding，覆盖从意图到规模化的完整治理体系：

| 支柱 | 内容 |
|------|------|
| P1 意图与规范 | 需求对齐 · RFC 用词 · 质量门禁 |
| P2 上下文与记忆 | Context Engineering · Rot 诊断 · 记忆分层 |
| P3 人机协作 | Agent 编排 · Harness 工程 · 审批回滚 · CLI 集成 |
| P4 质量与安全 | 35 种坏味道诊断 · 分层测试 · 安全设计 |
| P5 效能与 ROI | 度量体系 · 成本优化 · ROI 计算器 |
| P6 组织与文化 | 成熟度演进 · Skill Hub · 知识中台 |

> 📂 详见 [WAF 目录](WAF/)，稍后补充

### 4️⃣ 87 个标准化 Lab 实验库

四维分区，覆盖从理论验证到垂直场景的全谱系：

```
Labs/
├── dim1-sdlc/          ← SDLC 全生命周期实验
├── dim2-ai-app-dev/    ← AI 应用开发实验
├── dim3-vertical-scenes/ ← 垂直行业场景
├── 1-SpecCoding/       ← Spec 专项
├── 2-代码准确度/
├── 3-代码审核与安全性/
├── 4-加载企业知识/
└── 5-Skills&MCP/
```

### 5️⃣ 企业 Skill Hub 方案

Anthropic Skill 格式标准化 + 企业内部共享平台搭建指南：

> 📂 详见 [skillhub/](skillhub/)

---

## 🔥 与 OpenSpec 的关系

| 维度 | OpenSpec | 本仓库（SDAC 体系） |
|------|----------|-------------------|
| **核心问题** | 单文件 Spec 的版本治理 | 14 文档矩阵的内容生成与对齐 |
| **artifact 粒度** | 4 个通用文件 | 14 个专用文档（PRD/US/FSD/NFR/API/Data/Test/RTM...） |
| **跨文档追溯** | ❌ | ✅ REQ↔US↔AC↔API↔TC 四向矩阵 |
| **企业成熟度评估** | ❌ | ✅ E-ACMM 5 级模型 + 自评问卷 |
| **坏味道诊断** | ❌ | ✅ 35 种 AI Coding 坏味道分类 |
| **客户交付包** | ❌ | ✅ 脱敏案例 + 诊断流程 + 培训资料 |

> **你已经在用 OpenSpec？这个仓库是它的企业级扩展包。**

---

## 🚀 快速开始

### 场景 1：团队想用 AI Coding，但不知道从哪开始

1. 打开 [成熟度自评问卷](成熟度模型/自评问卷-H5完整源码.html)，花 5 分钟测一下
2. 对照 [白皮书](sdac-whitepaper.html) 的"典型现状与进阶路径"章节
3. 从 `Spec模板-投研助手/` 挑一份模板，按 `01-Spec写作总则与文档编号索引.md` 的顺序开始

### 场景 2：已经在用 AI，但代码质量不稳定

1. 看 [WAF 支柱 4：质量与安全](WAF/支柱4-质量与安全/) 的 35 种坏味道清单
2. 跑 [Spec R4 交叉校验](Spec模板-投研助手/R4交叉校验清单.md)，检查跨文档一致性
3. 从 [Lab 实验库](labs/) 挑一个相关实验做团队 workshop

### 场景 3：管理层要 ROI 数据

1. 打开 [支柱 5：效能与 ROI](WAF/支柱5-效率与成本/) 
2. 用 [Lab-12 ROI 计算器](go/Lab-12-ROI计算器Demo.md) 做测算
3. 输出成 PPT 给管理层

---

## 🤝 如何贡献

| 你可以 | 怎么做 |
|--------|--------|
| 提 Issue | 发现坏味道清单漏了某种？提交！ |
| 补 Lab | 有企业实战案例？按 `labs/` 目录结构提 PR |
| 改 Skill | 优化 [.qoder/skills/](.qoder/skills/) 下的 Skill 格式？欢迎！ |
| 翻译 | 想贡献英文版？建 `en/` 目录，我来 review |

> **Good First Issues** 标签适合新手，**Help Wanted** 标签需要你！

---

## 📄 License

MIT License — 企业可商用、可 fork、可改。如果对你有帮助，**留个 Star ⭐ 就是对方法论最大的支持**。

---

<p align="center">
  <strong>Spec it first. Ship it right.</strong>
</p>
