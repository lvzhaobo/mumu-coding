#!/usr/bin/env node
const cmd = process.argv[2];

const HELP = `
  MumuSpec — AI Coding 企业 Spec 驱动开发工具链

  用法:
    mumuspec <命令> [参数]

  项目初始化:
    create <name>            生成 Spec 项目骨架（14 份文档 + AGENTS.md）
    console [dir] [out]      生成 Spec 可视化控制台 HTML
    status [dir]             查看 Spec 项目状态

  Spec 内容生成（四轮工作流）:
    elicit [dir]             R1·采集 — 原始素材 → 02 需求采集
    propose [dir]            R2·提案 — 03 立项提案 + 04 PRD
    anchor [dir]             R3·锚定 — 05 用户故事 ↔ 09 API 契约
    design [dir]             R4·设计 — 06 FSD + 07 NFR + 08+10+11
    close [dir]              R5·收口 — 12 实施计划 + 13 测试策略 + 14 RTM

  维护与校验:
    validate [dir]           门禁校验 — AC/TC 追溯、字段完整性、冻结状态
    impact <spec-id> [dir]   变更影响分析 — 改这份会波及哪些文档
    sync <spec-id> [dir]     变更联动 — 更新关联文档
    freeze [dir]             版本冻结 — 打 Git tag + 锁定 Spec

  角色视图:
    view --role <role> [dir] 按角色查看 Spec（pm|dev|qa|arch）

  示例:
    mumuspec create my-project
    mumuspec propose
    mumuspec validate
    mumuspec view --role dev
`;
const CMDS = ['create','console','status','elicit','propose','anchor','design','close','validate','impact','sync','freeze','view','lint'];

if (!cmd || cmd === '--help' || cmd === '-h') { console.log(HELP); process.exit(0); }
if (cmd === '--version' || cmd === '-v') { console.log('mumuspec v'+require('../package.json').version); process.exit(0); }
if (!CMDS.includes(cmd)) { console.log(`未知命令: ${cmd}\n${HELP}`); process.exit(1); }

require(`../src/commands/${cmd}`)(process.argv.slice(3));
