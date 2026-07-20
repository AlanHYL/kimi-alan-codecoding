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
| 17 | 压力测试 | 🔜 规划中（v1.3.0） | MCP 工具 `load_test`，用 autocannon |
| 18 | 依赖漏洞扫描 | ✅ `quality_gates` | MCP 工具运行 `npm audit` |
| 19 | Dockerfile 多阶段构建 | ✅ `scaffold_project` | 模板自带多阶段构建 Dockerfile |
| 20 | CI/CD 流水线 | ✅ `scaffold_project` | 模板自带 GitHub Actions 配置 |
| 21 | 部署运行手册 | 🟡 Agent 生成 | 交付报告中包含 |
| 22 | 回滚方案 | 🔜 规划中（v1.3.0） | 基于心跳日志生成 rollback.sh |
| 23 | 监控告警配置 | 🔜 规划中（v1.4.0） | Metrics 端点 + Prometheus + Grafana |
| 24 | 数据备份策略 | ✅ `scaffold_project` | 模板生成 backup.sh + backup.bat，支持 SQLite/PG/MySQL，保留 7 天 |

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

## 规划中的功能（Roadmap）

以下 4 项标记为"规划中"，按优先级排列：

### P0: 数据备份策略 ✅ 已完成（v1.1.0）
**方案**：`scaffold_project` 增加备份脚本生成
```
项目交付时自动生成 backup.sh / backup.bat：
  - 数据库：sqlite3 .dump / mysqldump / pg_dump
  - 文件：tar.gz 差异备份
  - 定时：添加到 cron / Windows Task Scheduler
  - 保留：最近 7 天滚动
```
**触发条件**：PRO 模式下项目包含数据库

### P1: 压力测试（v1.3.0）
**方案**：MCP Server 新增 `load_test` 工具
```
load_test({ project_path, endpoint, duration, concurrency })
  → 使用 autocannon（Node.js）或 k6
  → 返回: { rps, p99_latency, p50_latency, error_rate, passed: true/false }
```
**门禁标准**：P99 延迟 < 500ms + 错误率 < 1%
**触发条件**：PRO 模式 Phase 6 优化后

### P2: 回滚方案（v1.3.0）
**方案**：交付时生成 `rollback.sh` / `rollback.bat`
```
基于心跳机制：
  - 列出最近的健康心跳（git log --oneline | grep [HB-]）
  - 一键回滚: git revert <last-hb> --no-commit && git commit
  - Docker 回滚: docker-compose stop && checkout tag && docker-compose up
```
**前提**：心跳机制已记录所有健康版本，回滚有可靠基础

### P3: 监控告警配置（v1.4.0）
**方案**：`scaffold_project` 增加可观测性模块
```
模板新增：
  - src/middleware/metrics.js — Prometheus 指标端点 (/metrics)
  - docker-compose.monitoring.yml — Prometheus + Grafana 容器
  - alerting规则示例（CPU > 80%、内存 > 90%、错误率 > 5%）
```
**注意**：监控系统需要运维平台支撑，Skill 只生成配置，不上线运行
**触发条件**：PRO 模式 Phase 7 部署配置

## 可行性验证

以上 4 项已逐项通过技术可行性评估：

| 项目 | 技术可行 | 依赖可控 | 确定性 | 风险 |
|---|---|---|---|---|
| P0 备份 | ✅ 纯文件生成 | ✅ 数据库自带工具 | ✅ 模板固化 | 无 |
| P1 压力测试 | ✅ MCP 新增工具 | ⚠️ autocannon | ✅ 工具返回 | 需应用运行中 |
| P2 回滚 | ✅ 读心跳JSON | ✅ 仅需 Git | ✅ 日志驱动 | Git 模式依赖 |
| P3 监控 | ✅ 文件生成 | ⚠️ Docker可选 | ✅ 模板固化 | 分三层降级 |

**结论：四项全部可行。实施顺序为 P0 → P1+P2 → P3。**
