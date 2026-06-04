# MumuSpec CLI

AI Coding 企业 Spec 驱动开发工具链。一条命令生成 Spec、校验 Spec、联动 Spec。

## 安装

```bash
npm install -g mumuspec
```

或直接用 npx：

```bash
npx mumuspec create my-project
npx create-mumuspec my-project
```

## 命令

### 项目初始化

```bash
mumuspec create <name>       # 生成 Spec 项目骨架（14 份文档 + AGENTS.md）
mumuspec console [dir]       # 生成 Spec 可视化控制台 HTML
mumuspec status [dir]        # 查看项目整体状态
```

### Spec 内容生成 — 五轮工作流

```bash
mumuspec elicit              # R1·采集 — 原始素材 → 02 需求采集
mumuspec propose             # R2·提案 — 03 立项提案 + 04 PRD
mumuspec anchor              # R3·锚定 — 05 用户故事 ↔ 09 API 契约
mumuspec design              # R4·设计 — 06 FSD + 07 NFR + 08+10+11
mumuspec close               # R5·收口 — 12 实施计划 + 13 测试策略 + 14 RTM
```

### 维护与校验

```bash
mumuspec validate            # 门禁校验 — AC/TC 追溯、字段完整性、文档一致性
mumuspec impact <spec-id>    # 变更影响分析 — 改这份会波及哪些文档
mumuspec sync <spec-id>      # 变更联动 — 自动更新关联文档
mumuspec freeze              # 版本冻结 — 打 Git tag + 锁定 Spec
```

### 角色视图

```bash
mumuspec view --role pm      # 产品经理视角 (02-06)
mumuspec view --role dev     # 开发者视角 (05-06-09-10-12)
mumuspec view --role qa      # QA 视角 (05-06-09-13-14)
mumuspec view --role arch    # 架构师视角 (01-07-08-11)
```

## 典型工作流

```bash
# 1. 创建项目
mumuspec create ecommerce-promo
cd ecommerce-promo

# 2. 按五轮工作流生成 Spec（每轮将 Prompt 复制到 AI 工具执行）
mumuspec elicit     # → AI 生成 02
mumuspec propose    # → AI 生成 03-04
mumuspec anchor     # → AI 生成 05、09
mumuspec design     # → AI 生成 06-07-08-10-11
mumuspec close      # → AI 生成 12-13-14

# 3. 校验
mumuspec validate

# 4. 可视化
mumuspec console

# 5. 冻结
mumuspec freeze
```

## 更多

- [mumucoding.com](https://mumucoding.com)
- [GitHub](https://github.com/lvzhaobo/mumu-coding)
