# 01 — Spec 写作总则 & 文档编号索引

---

| 项 | 值 |
|---|---|
| 模块编号 | 【填写：如 M1-XXX，按项目自定义编号规则】 |
| 模块名称 | 【填写：你的模块名称】 |
| 文档版本 | |
| 文档状态 | Draft / Review / Approved / Deprecated |

---

## 编号与阶段对照（01 ~ 14）

| 编号 | 阶段 | 分类 | 文档名称 |
|------|------|------|----------|
| `01` | Meta | 总则 + 编号 | Spec 写作规则、RFC 规范词、编号命名 |
| `02` | Meta | Elicitation | 需求来源与采集记录 |
| `03` | Proposal | Proposal | 立项提案与范围说明 |
| `04` | Proposal | PRD | 产品需求说明 |
| `05` | Spec | UserStory | 用户故事与验收标准 |
| `06` | Spec | FSD | 功能规格说明 |
| `07` | Spec | NFR | 非功能需求与约束 |
| `08` | Design | Architecture | 系统架构与技术选型 |
| `09` | Design | API | 接口规格（契约真源） |
| `10` | Design | Data | 数据模型与存储规格 |
| `11` | Design | Security | 安全设计规格 |
| `12` | Plan | Plan | 实施计划与里程碑 |
| `13` | Test | Test | 测试策略与质量门禁 |
| `14` | Trace | Traceability | 需求追踪矩阵（四向对齐） |

## 二、基本原则

1. **单一真相**：对外行为以 `09` API 与 `10` 数据模型为准
2. **先行为后实现**：先定义 `05` 用户故事，再写 `06/09/10`
3. **可验证**：所有 MUST 条目必须能被测试或监控验证
4. **不混层**：PRD 不写 SQL，API 不写像素，Test 不重复规则
5. **无歧义**：禁止「可选其一 / 建议 / 大概 / 尽量」等表述

## 三、规范词（RFC 风格）

| 词 | 含义 |
|----|------|
| **MUST** | 必须，违反即缺陷 |
| **SHOULD** | 建议，不满足需说明理由 |
| **MAY** | 可选，不影响基线验收 |
| **MUST NOT** | 严禁 |

## 四、文档元数据（每页必填）

> 模块编号 · 模块名称 · 文档版本 · 文档状态 · Owner · Reviewer · 生效日期 · 变更影响级别

## 五、统一编号规范

> 全部文档 **MUST** 使用以下统一编号格式，禁止各文档自创格式。

| 对象 | 格式 | 示例 |
|------|------|------|
| 需求编号 | `REQ-{模块号}-{NNN}` | REQ-M1-001 |
| 用户故事 | `US-{NNN}` | US-001 |
| 验收标准 | `AC-{US编号}-{NN}` | AC-001-01 |
| 测试用例 | `TC-{模块号}-{NNN}` | TC-M1-001 |
| 规则约束 | `RULE-{NNN}` | RULE-001 |

## 六、写作约束

- 时间统一 `ISO-8601 UTC`
- 所有 API 字段名一律在 `09` 冻结，其他文档只引用不另起别名
- 所有业务规则必须关联 `REQ-ID`、`UserStory-ID`
- 所有 AC 必须可映射到 `TC-ID`
- 所有跨模块依赖必须写明「依赖类型 / 影响范围 / 回退策略」

## 七、版本与变更

1. 变更流程：`05`（行为）→ `09/10`（契约）→ `13/14`（验证追踪）
2. 修改 API 字段名/类型 **MUST** 升级小版本，记录 breaking / non-breaking
3. 每次变更文末维护变更记录

## 八、质量门禁（文档侧）

- `05` 每条 P0 US 在 `14` 有映射
- `14` 每条 REQ 在 `13` 存在至少 1 个 TC
- `09` 有示例请求 / 响应 / 错误体
- `10` 有索引与约束说明

> 不满足任一条，文档状态不得置为 Approved

## 九、文件命名 & 目录

格式：`<编号>-<分类英文>-<中文主题>-v<主>.<次>.md`

| 示例 | 对应 |
|------|------|
| `03-Proposal-立项提案与范围-v2.0.md` | Proposal |
| `09-API-接口规格-v2.0.md` | API Spec |

**分类词表**：Elicitation · Proposal · PRD · UserStory · FSD · NFR · Architecture · API · Data · Security · Plan · Test · Traceability

---

## 十、术语表（Glossary）

| 缩写 | 英文全称 | 中文含义 |
|------|----------|----------|
| **FSD** | Functional Specification Document | 功能规格说明 |
| **NFR** | Non-Functional Requirement | 非功能需求 |
| **PRD** | Product Requirements Document | 产品需求说明 |
| **US** | User Story | 用户故事 |
| **AC** | Acceptance Criteria | 验收标准 |
| **API** | Application Programming Interface | 应用程序接口 |
| **DTO** | Data Transfer Object | 数据传输对象 |
| **RTM** | Requirements Traceability Matrix | 需求追踪矩阵 |
| **TDD** | Test-Driven Development | 测试驱动开发 |
| **WBS** | Work Breakdown Structure | 工作分解结构 |
| **SLO** | Service Level Objective | 服务等级目标 |
| **LLM** | Large Language Model | 大语言模型 |

## 十一、六阶段流程

```
Proposal(03-04) → Spec(05-06-07) → Design(08-09-10-11) → Plan(12) → Test(13) → Trace(14)
  Why              What              How             When/Who     OK?      All linked?
```

| 阶段 | 编号 | 完整问题 | 产出物 |
|------|------|----------|--------|
| **Proposal** | 03 + 04 | 为什么要做？做什么不做什么？ | 立项提案 + PRD |
| **Spec** | 05 + 06 + 07 | 用户要什么？功能什么样？约束底线？ | 用户故事 + FSD + NFR |
| **Design** | 08 + 09 + 10 + 11 | 怎么架构？接口契约？数据怎么存？ | 架构 + API + 数据模型 + 安全 |
| **Plan** | 12 | 什么时候交付？谁来做？ | 里程碑 + WBS |
| **Test** | 13 | 做对了没？门禁是什么？ | TC + 质量门禁 |
| **Trace** | 14 | 全对得上吗？有没有漏？ | 四向追溯矩阵 |

## 十二、文档写作顺序（非阅读顺序）

> 编号是阅读顺序，实际写作分四轮螺旋推进：

| 轮次 | 文档 | 做什么 | 清晰度 |
|------|------|--------|--------|
| **1. 起点** | 03 → 04 | 提炼原始素材 → 立项 → 产品需求 | 30% |
| **2. 锚定** | 05 + 09 | 用户故事与 API 接口互相校准 | 60% |
| **3. 展开** | 08 + 10 → 06 + 07 | 架构+数据展开；06/07 被倒逼补全 | 85% |
| **4. 收口** | 12 + 13 → 14 | 计划+测试并行；14 终检全链路 | 95% |

## 十三、源码目录参考

> 请根据你的实际项目填写源码目录结构。格式参考：

```
your-project/
├── backend/
│   ├── app.py                      # 后端入口
│   ├── routes/                     # API 路由
│   ├── services/                   # 业务逻辑层
│   ├── models/                     # 数据模型
│   ├── storage/                    # 存储层
│   └── tests/                      # 测试文件
├── frontend/
│   └── src/
│       ├── App.jsx                 # 主组件
│       ├── api.js                  # API 客户端
│       └── components/             # 子组件
└── README.md
```
