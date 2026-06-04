// mumuspec status — 项目状态
const fs = require('fs');
const { resolveDir, readSpec } = require('../utils');

module.exports = function(args) {
  const dir = resolveDir(args[0]);
  const phases = [
    { name:'Meta', docs:[1,2] },
    { name:'Proposal', docs:[3,4] },
    { name:'Spec', docs:[5,6,7] },
    { name:'Design', docs:[8,9,10,11] },
    { name:'Plan & Test', docs:[12,13] },
    { name:'Trace', docs:[14] }
  ];

  console.log('📊 MumuSpec 项目状态');
  console.log('   Spec 目录: ' + dir);
  console.log('');

  let total = 0, filled = 0;
  phases.forEach(p => {
    const d = p.docs.map(n => { const c = readSpec(dir, n); const ok = c && c.replace(/#.*\n?/g,'').replace(/>.*\n?/g,'').trim().length > 50; total++; if(ok) filled++; return {n,ok}; });
    const pFilled = d.filter(x=>x.ok).length;
    const bar = '█'.repeat(pFilled) + '░'.repeat(d.length - pFilled);
    console.log('  ' + p.name.padEnd(12) + ' ' + bar + ' ' + pFilled + '/' + d.length);
  });

  console.log('');
  console.log('  总计: ' + filled + '/' + total + ' 份已填写');
  console.log('  进度: ' + Math.round(filled/total*100) + '%');
  if (filled === 14) console.log('  ✅ 全部就绪，可以冻结了: mumuspec freeze');
  else if (filled >= 8) console.log('  📝 进度过半，继续加油');
  else console.log('  🚀 刚开始，可以先跑 mumuspec elicit → propose → anchor');
};
