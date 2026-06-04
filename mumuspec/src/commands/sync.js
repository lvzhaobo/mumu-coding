// mumuspec sync — 变更联动
const { resolveDir } = require('../utils');

module.exports = function(args) {
  const dir = resolveDir(args[1]);
  const specId = args[0];
  if (!specId) { console.log('用法: mumuspec sync <spec-id> [dir]\n示例: mumuspec sync 04'); process.exit(1); }

  console.log('🔄 变更联动 — Spec ' + specId);
  console.log('');
  console.log('此命令将分析 ' + specId + ' 的变更内容，并更新与之关联的下游文档。');
  console.log('');
  console.log('💡 在 AI 编码工具中执行以下 Prompt：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`我修改了 Spec-${specId}。请读取这份文档的最新内容，然后遍历所有依赖它的下游 Spec 文档，逐一检查是否需要更新。

更新原则：只修改受影响的字段和章节，保留其他内容不变。每个修改标注理由。

修改完成后运行 mumuspec validate 验证一致性。`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
};
