// mumuspec freeze — 版本冻结
const { execSync } = require('child_process');
const { resolveDir } = require('../utils');

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  const tag = args[1] || 'spec-v' + new Date().toISOString().slice(0,10).replace(/-/g,'');

  console.log('🔒 版本冻结 — 锁定当前 Spec');
  console.log('');
  console.log('  Spec 目录: ' + dir);
  console.log('  Tag 名称:  ' + tag);
  console.log('');
  console.log('请执行以下操作完成冻结:');
  console.log('');
  console.log('  1. 确认所有 Spec 文档已通过校验: mumuspec validate');
  console.log('  2. 提交当前版本:');
  console.log('     git add ' + dir + '/');
  console.log('     git commit -m "freeze: ' + tag + '"');
  console.log('     git tag ' + tag);
  console.log('  3. 推送:');
  console.log('     git push origin main --tags');
  console.log('');
  console.log('  冻结后:');
  console.log('  - 代码生成必须以冻结版 Spec 为准');
  console.log('  - 变更需求必须先解锁 → 更新 Spec → 重新冻结');
  console.log('  - PR 必须关联 Spec 编号');
};
