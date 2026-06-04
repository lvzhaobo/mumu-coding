// R3·锚定 — 05 用户故事 ↔ 09 API 契约 双向对齐
const { resolveDir, readSpec } = require('../utils');
const path = require('path');

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  const s04 = readSpec(dir, 4);

  console.log('📋 R3·锚定 — 生成 05 用户故事 + 09 API 契约（双向对齐）');
  console.log('');
  console.log('输入: 04 PRD');
  console.log('输出: ' + path.join(dir, '05-user-stories.md'));
  console.log('      ' + path.join(dir, '09-api-spec.md'));
  console.log('');
  console.log('请将以下 Prompt 复制到 AI 编码工具中执行：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`你是需求分析 + 接口设计专家。请根据 04-PRD，同时生成 05-用户故事 和 09-API契约，确保两者字段级对齐。

## 第一步：生成 05-用户故事
- 按角色拆分用户故事（作为[角色]，我想要[功能]，以便[价值]）
- 每个故事附带 AC（验收条件）
- 用 MoSCoW 排序（Must/Should/Could/Won't）
- 标注故事间的依赖关系

## 第二步：生成 09-API契约
- 为每个用户故事推导 API 端点
- 列出每个端点的请求/响应格式（JSON）
- 错误码和错误响应格式
- 标注每个端点关联的用户故事和 AC

## 关键约束：双向对齐
- 05 中的每个 AC → 09 中必须有对应的 API 端点或字段
- 09 中的每个端点 → 05 中必须有对应的用户故事
- AC 中的字段名 = API 中的字段名（不允许不一致）

格式：中文描述 + JSON 示例，Markdown 表格

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (s04) { console.log('📎 04-PRD（已加载）: ' + s04.length + ' 字符'); }
  else { console.log('⚠️  04-PRD 内容为空。建议先运行 mumuspec propose'); }
  console.log('');
  console.log('💡 生成后保存为 05-user-stories.md 和 09-api-spec.md');
};
