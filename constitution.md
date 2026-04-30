# 项目宪法 (Constitution)

## 测试要求
- 所有核心业务功能必须有对应的 E2E 测试（Playwright）。
- 测试必须包含断言，验证业务成功结果。
- CI 必须运行 E2E 测试，失败则阻止合并。

## 技术栈
- 前端/后端：TypeScript + Node.js
- E2E 测试：Playwright
- 单元测试：Jest

## 工作流
- 使用 spec-kit 规范驱动开发：每个功能先写 spec 文档（`specs/` 目录）。
- 使用 superpowers TDD：先写失败测试，再实现代码。