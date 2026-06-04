// mumuspec create — 生成 Spec 项目骨架
const fs = require('fs');
const path = require('path');

const TEMPLATES = require('../templates');

module.exports = function(args) {
  const name = args[0];
  if (!name) { console.log('用法: mumuspec create <项目名>\n示例: mumuspec create my-project'); process.exit(1); }

  const root = path.resolve(name);
  if (fs.existsSync(root)) { console.error('❌ 目录已存在: ' + name); process.exit(1); }

  const specsDir = path.join(root, 'specs');
  fs.mkdirSync(specsDir, { recursive: true });

  let count = 0;
  Object.entries(TEMPLATES).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(specsDir, filename), content.trim() + '\n', 'utf-8'); count++;
  });

  const agentsMd = `# AGENTS.md — AI 编码助手角色定义

## 角色
你是本项目的 AI 编程助手。你的唯一输入是本项目的 Spec 文档（specs/ 目录）。

## 工作流程
1. 接到任务 → 先读取相关的 Spec 文档（03-13）
2. 理解需求 → 基于 Spec 中的 AC 确认验收标准
3. 生成代码 → 严格按 Spec 定义的 API 契约和数据模型
4. 自检 → 生成后对照 Spec 逐条验证 AC
5. 提交 PR → PR 描述中关联 Spec 编号

## 行为边界
- ✅ 可以：读写 src/ 目录下的代码文件
- ✅ 可以：运行测试和 Lint
- ❌ 禁止：直接修改 main/master 分支
- ❌ 禁止：删除未 git tracked 的文件
- ❌ 禁止：执行需要人工确认的系统命令`;
  fs.writeFileSync(path.join(root, 'AGENTS.md'), agentsMd.trim() + '\n', 'utf-8');

  fs.writeFileSync(path.join(root, '.gitignore'), 'node_modules/\n.env\n.DS_Store\nspecs/*.local.md\n', 'utf-8');

  console.log('');
  console.log('✨ MumuSpec 项目已创建: ' + name + '/');
  console.log('   specs/        — ' + count + ' 份 Spec 模板 (01-14)');
  console.log('   AGENTS.md    — AI 编码助手角色定义');
  console.log('');
  console.log('🚀 下一步:');
  console.log('   cd ' + name);
  console.log('   mumuspec elicit     # R1: 需求采集');
  console.log('   mumuspec propose    # R2: 立项提案');
  console.log('   mumuspec anchor     # R3: 锚定对齐');
  console.log('   mumuspec design     # R4: 设计生成');
  console.log('   mumuspec close      # R5: 收口');
  console.log('   mumuspec validate   # 门禁校验');
  console.log('');
};
