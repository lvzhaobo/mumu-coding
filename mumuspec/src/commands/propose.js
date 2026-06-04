// R2·提案 — 03 立项提案 + 04 PRD
const { resolveDir, readSpec, findSpec } = require('../utils');
const path = require('path');

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  const s02 = readSpec(dir, 2);

  console.log('📋 R2·提案 — 生成 03 立项提案 + 04 PRD');
  console.log('');
  console.log('输入: 02 需求采集');
  console.log('输出: ' + path.join(dir, '03-proposal.md'));
  console.log('      ' + path.join(dir, '04-prd.md'));
  console.log('');
  console.log('请将以下 Prompt 复制到 AI 编码工具中执行：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`你是产品需求专家。请根据以下 02-需求采集文档，生成两份文档：

## 第一步：生成 03-立项提案
包含章节：执行摘要、问题陈述、方案概述、范围界定（含/不含）、成功标准（可度量指标）、时间线与里程碑、风险评估、干系人签批

## 第二步：生成 04-产品需求 PRD
包含章节：产品概述、用户画像（2-3个角色）、功能清单（ID/描述/优先级）、用户旅程（主流程+边缘场景）、业务规则、数据需求、集成点、验收标准

格式要求：
- 中文撰写，Markdown 表格
- 成功标准必须是可度量的（数字或明确的是/否判断）
- 用户故事用"作为[角色]，我想要[功能]，以便[价值]"格式
- 不要编造素材中不存在的信息，不确定的标注 [待确认]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (s02) {
    console.log('📎 02-需求采集（已自动附加）:');
    console.log(s02.substring(0, 800));
    if (s02.length > 800) console.log('...(已截断，完整内容见文件)');
  } else {
    console.log('⚠️  02-需求采集 内容为空或不存在。建议先运行 mumuspec elicit');
  }
  console.log('');
  console.log('💡 生成后保存为 03-proposal.md 和 04-prd.md');
};
