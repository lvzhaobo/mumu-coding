// mumuspec impact — 变更影响分析
const { resolveDir, readSpec, findSpec } = require('../utils');

const DEPENDENCIES = {
  '01': [], '02': ['01'], '03': ['02'], '04': ['03'],
  '05': ['04'], '06': ['05','04'], '07': ['04'],
  '08': ['07'], '09': ['05','06'], '10': ['08','09'],
  '11': ['07','08'], '12': ['08','09','10'],
  '13': ['05','06','09','10','11','12'],
  '14': ['01','02','03','04','05','06','07','08','09','10','11','12','13']
};
const REVERSE = {};
Object.entries(DEPENDENCIES).forEach(([k, deps]) => deps.forEach(d => { if (!REVERSE[d]) REVERSE[d] = []; REVERSE[d].push(k); }));

module.exports = function(args) {
  const dir = resolveDir(args[1]);
  const specId = args[0];
  if (!specId) { console.log('用法: mumuspec impact <spec-id> [dir]\n示例: mumuspec impact 05'); process.exit(1); }

  const pureId = specId.replace(/^0+/,'');
  const downstream = REVERSE[pureId] || [];

  console.log('💥 变更影响分析 — Spec ' + (String(pureId).padStart(2,'0')));
  console.log('');
  if (downstream.length === 0) {
    console.log('  ✅ 无下游依赖文档。此文档变更不影响其他 Spec。');
  } else {
    console.log('  📋 受影响的文档（需同步更新）:');
    const affected = [];
    function collect(id, depth) { if (!affected.includes(id)) { affected.push(id); (REVERSE[id]||[]).forEach(d => collect(d, depth+1)); } }
    downstream.forEach(d => collect(d, 1));

    affected.forEach(id => {
      const f = findSpec(dir, id);
      const status = f ? '存在' : '缺失';
      console.log('    ' + String(id).padStart(2,'0') + ' — ' + status + (f ? '' : ' ⚠️'));
    });
    console.log('');
    console.log(`  总计 ${affected.length} 份文档受影响`);
  }
  console.log('');
  console.log('💡 运行 mumuspec sync ' + specId + ' 自动更新关联文档');
};
