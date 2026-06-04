// R5·收口 — 12 实施计划 + 13 测试策略 + 14 RTM
const { resolveDir, readSpec } = require('../utils');
const path = require('path');

module.exports = function(args) {
  const dir = resolveDir(args[0]);

  console.log('📋 R5·收口 — 生成 12 实施计划 + 13 测试策略 + 14 追溯矩阵');
  console.log('');
  console.log('输入: 全部已完成 Spec (01-11)');
  console.log('输出:');
  console.log('  ' + path.join(dir, '12-implementation-plan.md'));
  console.log('  ' + path.join(dir, '13-test-strategy.md'));
  console.log('  ' + path.join(dir, '14-traceability-matrix.md'));
  console.log('');
  console.log('请将以下 Prompt 复制到 AI 编码工具中执行：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`你是项目经理 + QA 专家。请根据项目全部 Spec 文档，生成以下三份收口文档：

## 12-实施计划
里程碑（含交付物和验收标准）、WBS 任务分解（含负责人和预估工时）、依赖关系、风险矩阵、回滚方案

## 13-测试策略
五层测试策略（单元/集成/E2E/性能/安全）、测试范围、通过标准（准入+准出）、自动化策略、追溯（每个测试用例关联 AC 和 API）

## 关键：14-RTM 追溯矩阵
遍历全部已写 Spec 文档：
- 从 04-PRD 提取功能列表
- 从 05-用户故事 提取 US 编号和 AC 编号
- 从 06-FSD 提取对应的章节
- 从 09-API 提取对应的端点
- 从 10-数据模型 提取对应的表
- 从 13-测试策略 提取对应的测试用例
- 填满一条完整的追溯链：需求→PRD→US→FSD→API→数据→测试
- 统计覆盖率，标注缺口

格式：中文 + Markdown 巨型表格

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log('');
  const counts = [];
  for (let i = 3; i <= 11; i++) { const c = readSpec(dir, i); if (c) counts.push('0'+i+': '+c.length+' 字符'); }
  if (counts.length) console.log('📎 已加载文档: ' + counts.join(', '));
  console.log('💡 建议先生成 12+13，最后生成 14（需要遍历全部文档）');
};
