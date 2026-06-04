// R4·设计 — 06 FSD + 07 NFR + 08 架构 + 10 数据 + 11 安全
const { resolveDir, readSpec } = require('../utils');
const path = require('path');

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  const s05 = readSpec(dir, 5);
  const s09 = readSpec(dir, 9);

  console.log('📋 R4·设计 — 生成功能规格 + 非功能需求 + 架构 + 数据 + 安全');
  console.log('');
  console.log('输入: 05 用户故事 + 09 API 契约');
  console.log('输出:');
  console.log('  ' + path.join(dir, '06-fsd.md'));
  console.log('  ' + path.join(dir, '07-nfr.md'));
  console.log('  ' + path.join(dir, '08-architecture.md'));
  console.log('  ' + path.join(dir, '10-data-model.md'));
  console.log('  ' + path.join(dir, '11-security.md'));
  console.log('');
  console.log('请将以下 Prompt 复制到 AI 编码工具中执行：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`你是全栈技术专家。请根据 05-用户故事 和 09-API契约，生成以下五份文档：

## 06-FSD 功能规格
每个功能：交互流程（步骤级）、界面说明（布局+组件）、异常处理（场景+提示）、状态机（如有）、边界条件

## 07-NFR 非功能需求
性能（响应时间/吞吐量/并发）、可用性（SLA/容灾）、安全（认证/授权）、兼容性、可维护性

## 08-架构选型
技术栈选型对比、ADR（架构决策记录）、部署架构、依赖关系

## 10-数据模型
ER 图（Mermaid）、表结构（字段/类型/约束）、索引策略、数据流

## 11-安全设计
攻击面分析、权限模型、数据加密、安全控制措施、审计日志、合规映射

格式：中文 + Mermaid 图 + Markdown 表格。所有技术决策要写理由。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (s05) console.log('📎 05-用户故事: ' + s05.length + ' 字符');
  if (s09) console.log('📎 09-API契约: ' + s09.length + ' 字符');
  if (!s05 && !s09) console.log('⚠️  输入文档为空。建议先运行 mumuspec anchor');
  console.log('');
  console.log('💡 建议分步生成：先 06+07，再 08+10，最后 11');
};
