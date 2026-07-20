# 生产级代码交付标准 — AlanCodecoding 能力矩阵

> 本文档说明 AlanCodecoding 在生产级代码交付各维度的覆盖情况。
> 对比基准：顶尖开发团队（Gemini 级别）的交付标准。

## 能力覆盖矩阵

| # | 交付物 | 状态 | 实现方式 |
|---|---|---|---|
| 1 | 架构文档 + ADR | 🟡 Prompt 约束 | Architect Agent 在 Phase 2 产出 ADR |
| 2 | OpenAPI/Swagger 接口文档 | 🟡 Agent 生成 | DevOps Agent 在 Phase 6 生成 API 文档 |
| 3 | 本地开发环境一键启动 | ✅ `scaffold_project` | MCP 工具自动生成 `start.bat` + `start.sh` |
| 4 | 环境配置（dev/staging/prod） | 🟡 .env.example | 模板生成 `.env.example`，多环境手动配置 |
| 5 | 密钥管理方案 | ✅ `code_check` | MCP 工具扫描硬编码密钥，强制走环境变量 |
| 6 | 结构化日志 | ✅ `scaffold_project` | 模板自带 winston/pino 日志中间件 |
| 7 | 统一错误处理中间件 | ✅ `scaffold_project` | 模板自带 errorHandler 中间件 |
| 8 | 健康检查 + 就绪检查 | ✅ `scaffold_project` | 模板自带 `/health` 端点 |
| 9 | 优雅关闭 | ✅ `scaffold_project` | 模板自带 SIGTERM/SIGINT 处理 |
| 10 | 用户认证 | ✅ `scaffold_project` | 模板自带 JWT 认证中间件 |
| 11 | 输入校验 | 🟡 `code_check` 监督 | Agent 编写时使用 Joi/Zod，code_check 验证 |
| 12 | CORS + 安全头 | ✅ `scaffold_project` | 模板自带 CORS 白名单中间件 |
| 13 | 请求限流 | 🟡 `scaffold_project` | 模板提供 rateLimiter 骨架，需安装依赖 |
| 14 | 单元测试 | ✅ `quality_gates` 强制 | 覆盖率 ≥ 80%，不达标不允许提交 |
| 15 | 集成测试 | 🟡 Agent 编写 | Tester Agent 在 Phase 4 编写 |
| 16 | E2E 测试 | 🟡 Agent 编写 | Tester Agent 在 Phase 4 编写 |
| 17 | 压力测试 | 🔜 规划中 | — |
| 18 | 依赖漏洞扫描 | ✅ `quality_gates` | MCP 工具运行 `npm audit` |
| 19 | Dockerfile 多阶段构建 | ✅ `scaffold_project` | 模板自带多阶段构建 Dockerfile |
| 20 | CI/CD 流水线 | ✅ `scaffold_project` | 模板自带 GitHub Actions 配置 |
| 21 | 部署运行手册 | 🟡 Agent 生成 | 交付报告中包含 |
| 22 | 回滚方案 | 🔜 规划中 | — |
| 23 | 监控告警配置 | 🔜 规划中 | — |
| 24 | 数据备份策略 | 🔜 规划中 | — |

## 实现方式说明

| 状态 | 含义 |
|---|---|
| ✅ `scaffold_project` | **模板固化** — MCP 工具生成，每次一致，不依赖 AI 发挥 |
| ✅ `quality_gates` | **程序强制** — MCP 工具执行实际命令，PASS/FAIL 由代码决定 |
| ✅ `code_check` | **自动扫描** — MCP 工具扫描违规，客观准确 |
| 🟡 Prompt 约束 | Agent 根据 prompt 执行，质量取决于模型遵循程度 |
| 🟡 Agent 生成 | Agent 在对应阶段动态生成 |
| 🔜 规划中 | 尚未实现，计划后续版本添加 |

## 架构演进

```
v1.0.0 ─── 纯 SKILL.md（全部靠 prompt 约束）
              ↓ 发现：17/24 项不达标
v1.1.0 ─── SKILL.md + MCP Server（确定性工具 + prompt 约束）
              ↓ MCP 模板固化 10 项，quality_gates 强制 3 项
              ✅ 达标项从 4 → 17
```

MCP Server 的加入将硬性标准从 prompt 中抽离为可执行工具，大幅提升了交付质量的一致性。
