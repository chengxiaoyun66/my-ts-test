# 项目宪法 v1.0

## 1. 技术栈强制规范
- **后端**：Node.js 18+（无后端则忽略）
- **前端**：React 18 + TypeScript
- **测试工具**：Playwright（E2E）+ Jest（单元测试）
- **版本控制**：Git + GitHub，主分支为 `main`

## 2. 测试纪律（核心）
- **每个核心业务功能**必须有至少一个 E2E 测试。
- **测试必须使用 Page Object Model（POM）**：页面元素和操作封装在 `pages/` 目录。
- **禁止硬编码**：敏感数据（手机号、密码）必须使用环境变量（`.env` 或 GitHub Secrets）。
- **选择器优先级**：`data-testid` > `getByRole` > `getByText` > CSS 类名。
- **断言必须存在**：每个测试至少包含一个业务断言（如成功提示、数据出现）。

## 3. 代码规范
- **TypeScript**：严禁使用 `any`，所有函数参数和返回值必须定义类型。
- **提交信息**：遵循 Conventional Commits（`feat:`、`fix:`、`test:`、`docs:` 等）。
- **格式化**：使用 Prettier + ESLint（可选，推荐）。

## 4. CI 门禁
- 所有 push 到 `main` 或 PR 到 `main`，必须自动运行 Playwright 测试。
- 测试失败时禁止合并。
- CI 必须上传测试报告（如 `playwright-report`）作为 Artifact。

## 5. 异常处理
- 紧急热修复可跳过测试，但需在 PR 描述中说明原因，并在 24 小时内补上测试。

## 工作流
- 使用 spec-kit 规范驱动开发：每个功能先写 spec 文档（`specs/` 目录）。
- 使用 superpowers TDD：先写失败测试，再实现代码。