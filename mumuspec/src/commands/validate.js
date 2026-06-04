// mumuspec validate — 门禁校验
const fs = require('fs');
const { resolveDir, findSpec, readSpec } = require('../utils');

function checkAC(d05) { return (d05.match(/AC-\d+/gi) || []).length; }
function checkTrace(d05, d09) { const ac = d05.match(/AC-\d+/gi) || []; const api = d09.match(/US-\d+/gi) || []; return ac.length > 0 && api.length > 0; }
function checkSize(content) { const body = content.replace(/#.*\n?/g,'').replace(/>.*\n?/g,'').trim(); return body.length; }

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  console.log('🔍 MumuSpec 门禁校验');
  console.log('');

  const checks = [
    { id: '01', label: '写作总则', fn: (c) => checkSize(c) > 80 },
    { id: '02', label: '需求采集', fn: (c) => checkSize(c) > 50 },
    { id: '03', label: '立项提案', fn: (c) => checkSize(c) > 100 },
    { id: '04', label: '产品需求 PRD', fn: (c) => checkSize(c) > 100 },
    { id: '05', label: '用户故事', fn: (c) => checkSize(c) > 80 && checkAC(c) >= 3 },
    { id: '06', label: '功能规格 FSD', fn: (c) => checkSize(c) > 80 },
    { id: '07', label: '非功能需求', fn: (c) => checkSize(c) > 50 },
    { id: '08', label: '架构选型', fn: (c) => checkSize(c) > 50 },
    { id: '09', label: 'API 契约', fn: (c) => checkSize(c) > 80 },
    { id: '10', label: '数据模型', fn: (c) => checkSize(c) > 50 },
    { id: '11', label: '安全设计', fn: (c) => checkSize(c) > 50 },
    { id: '12', label: '实施计划', fn: (c) => checkSize(c) > 50 },
    { id: '13', label: '测试策略', fn: (c) => checkSize(c) > 50 },
    { id: '14', label: '追溯矩阵', fn: (c) => checkSize(c) > 50 },
  ];

  let pass = 0, fail = 0;
  checks.forEach(ch => {
    const c = readSpec(dir, parseInt(ch.id));
    const ok = c && ch.fn(c);
    console.log((ok ? '  ✅' : '  ❌') + ' ' + ch.id.padStart(2,' ') + ' ' + ch.label + (!c ? ' (文件缺失)' : ok ? '' : ' (内容不足)'));
    ok ? pass++ : fail++;
  });

  // Cross-doc checks
  const s05 = readSpec(dir, 5) || '';
  const s09 = readSpec(dir, 9) || '';
  const s14 = readSpec(dir, 14) || '';
  const acCount = checkAC(s05);
  let crossOk = true;
  if (acCount > 0 && s09 && !checkTrace(s05, s09)) { console.log('  ⚠️  AC-API 追溯: 05 有 AC 但 09 未关联 US 编号'); crossOk = false; }
  if (s14.length < 50 && acCount > 0) { console.log('  ⚠️  RTM 追溯: 05 有 AC 但 14 追溯矩阵为空'); crossOk = false; }

  console.log('');
  if (pass === 14 && crossOk) { console.log('✅ 全部 14 份文档通过门禁校验'); }
  else { console.log(`📊 通过 ${pass}/14，未通过 ${fail}/14`); }
  process.exit(pass === 14 ? 0 : 1);
};
