# AGENTS.md

> AI 每次对话首先读取此文件。本节定义边界、技术栈和必须遵守的规则。

---

## 项目

| 项 | 值 |
|----|-----|
| 名称 | <!-- 填写 --> |
| 技术栈 | <!-- 如 Java 17 + Spring Boot 3.x + MySQL --> |
| 包/命名空间 | <!-- 如 com.example.order --> |
| 构建命令 | <!-- 如 ./mvnw clean verify --> |
| Lint/格式化命令 | <!-- 如 ./mvnw spotless:check --> |

---

## 禁止

- 修改 `*.properties`、`*.yml`、`.env*`（配置文件）
- 修改 `*.sql`（已有迁移脚本）
- `git push` 或修改远程分支
- 引入未经评审的新依赖
- 删除已有注释和文档
- 提交包含密钥、Token、密码的代码
- `System.out.println` / `print()`——用日志框架
- 空 catch 块——必须记录日志

---

## 编码

命名：类名 PascalCase、方法/变量 camelCase、常量 UPPER_SNAKE_CASE。

所有 public 方法有 Javadoc/docstring。方法 ≤ 50 行，类 ≤ 300 行。

Controller → Service → Repository 三层。禁止 Controller 直调 Repository，禁止拼接 SQL。

生成代码的风格和分层参照 `Reference/` 下的示例。

---

## 协作

分支命名：`feature/<描述>`、`fix/<描述>`、`docs/<描述>`、`refactor/<模块>`。

PR：标题 `[类型] 简述`，描述含变更说明 + AI 辅助声明，至少 1 人 Approve，CI 全绿后 Squash merge。

Commit：`feat/fix/docs/refactor/test/chore: 简述`。

---

## 验证

```bash
# 替换为实际命令
./mvnw clean verify      # 构建 + 测试
./mvnw spotless:check    # 格式化检查
```

---

每季度 Review 一次。踩坑后立即更新。
