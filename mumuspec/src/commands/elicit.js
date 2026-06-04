// mumuspec elicit — R1 采集：原始素材 → 02 需求采集
const fs = require('fs');
const path = require('path');
const { resolveDir } = require('../utils');

const PROMPT = `你是需求分析专家。请根据以下原始素材，生成 02-需求采集文档。

生成的文档应包含以下章节：
## 1. 需求来源 — 列出需求的来源方、类型和优先级
## 2. 干系人清单 — 每个干系人的角色、核心诉求、决策权限
## 3. 业务背景 — 为什么这个需求重要，不做的后果
## 4. 初步假设 — 当前对需求的假设，需后续验证

格式要求：
- 用中文撰写
- 表格用 Markdown 表格格式
- 不确定的内容标注 [待确认]
- 不要编造素材中不存在的信息`;

module.exports = function elicit(args) {
  const dir = resolveDir(args[0]);
  const filePath = path.join(dir, '02-elicitation.md');

  console.log('📋 R1·采集 — 生成 02 需求采集');
  console.log('');

  // Read existing raw materials if any
  const rawFiles = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.md') && f !== '02-elicitation.md');
  const rawContent = rawFiles.map(f => {
    const content = fs.readFileSync(path.join(process.cwd(), f), 'utf-8');
    return `### ${f}\n${content.substring(0, 3000)}`;
  }).join('\n\n');

  console.log('📄 已读取项目中的素材文件作为输入。');
  console.log('');
  console.log('请将以下 Prompt 复制到 AI 编码工具中执行：');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(PROMPT);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  if (rawContent) {
    console.log('📎 上下文素材（已自动附加）:');
    console.log(rawContent.substring(0, 500));
    if (rawContent.length > 500) console.log('...(已截断)');
  }
  console.log('');
  console.log('💡 提示：将 Prompt + 上下文素材一起发给 AI，让它生成 02-elicitation.md');
  console.log('   生成后保存到: ' + filePath);
};
