// mumuspec view — 角色视图
const { resolveDir, readSpec } = require('../utils');

const ROLE_DOCS = {
  pm:    { label:'产品经理', docs:[2,3,4,5,6], desc:'需求采集→立项→PRD→用户故事→FSD' },
  dev:   { label:'开发者', docs:[5,6,9,10,12], desc:'用户故事→FSD→API→数据→实施计划' },
  qa:    { label:'QA', docs:[5,6,9,13,14], desc:'用户故事→FSD→API→测试策略→RTM' },
  arch:  { label:'架构师', docs:[1,7,8,11], desc:'写作总则→NFR→架构→安全' },
};

module.exports = function(args) {
  const roleArg = args.indexOf('--role') > -1 ? args[args.indexOf('--role')+1] : null;
  let dir = process.cwd();
  for (const a of args) { if (!a.startsWith('--') && a !== roleArg) { dir = require('../utils').resolveDir(a); break; } }

  if (!roleArg || !ROLE_DOCS[roleArg]) {
    console.log('用法: mumuspec view --role <pm|dev|qa|arch> [dir]');
    console.log('  pm   — 产品经理视角 (02-06)');
    console.log('  dev  — 开发者视角 (05-06-09-10-12)');
    console.log('  qa   — QA 视角 (05-06-09-13-14)');
    console.log('  arch — 架构师视角 (01-07-08-11)');
    process.exit(1);
  }

  const role = ROLE_DOCS[roleArg];
  console.log('👤 ' + role.label + '视角');
  console.log('   ' + role.desc);
  console.log('');

  role.docs.forEach(n => {
    const c = readSpec(dir, n);
    const status = c ? (c.replace(/#.*\n?/g,'').replace(/>.*\n?/g,'').trim().length > 50 ? '✅' : '⚠️') : '❌';
    const file = (require('../utils').findSpec(dir, n) || '').replace(dir+'/','');
    console.log('  ' + status + ' ' + String(n).padStart(2,'0') + '  ' + (file || '(缺失)'));
  });
  console.log('');
  console.log('💡 用 AI 工具打开上述文件，让 AI 基于这些文档开始工作');
};
