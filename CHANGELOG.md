# Changelog

## v1.0.0 (2026-07-20)

### 初始发布

全自动化多 Agent 协作编码流水线首次发布。

**核心特性：**
- 四模式入口：`quick`（小白快车道）/ `new`（标准新项目）/ `pro`（专业完整）/ `modify`（二次开发）
- 9 阶段流水线：从 Codegraph 安装检查到最终交付运行验证
- ❤️ 心跳机制：7 个检测点 + 自动回滚，确保每次提交都是健康代码
- 🧠 三级记忆系统：项目记忆（跨会话）/ 经验教训（跨项目）/ 全局用户偏好
- 🔍 Codegraph MCP 深度集成：`codegraph_explore` / `codegraph_node` / `codegraph_callers` 全流程覆盖
- 👥 多 Agent 平等协作：需求分析、架构设计、并行编码、交叉审查、双人审计
- 5 道质量门禁：编译 → 测试覆盖率 ≥ 80% → 安全零高危 → 回归无破坏 → 部署语法校验
- 6 层错误处理：从自动重试到人工介入的完整降级体系
- 12 个项目模板（CRUD、博客、API、CLI、Dashboard 等）
- 面向小白：纯中文交互 + 零术语沟通 + 一键启动脚本

**技术栈支持：**
- 运行时：Node.js、Python、Go
- 前端：React、Vue、HTML/CSS
- 后端：Express、Fastify
- 数据库：SQLite、PostgreSQL、MySQL
- CI/CD：GitHub Actions、GitLab CI

### 第 2-9 轮审查修复

累计修复 72 个业务逻辑问题，包括：
- 反馈闭环缺失（测试失败无法回退编码阶段）
- 时序倒置（CI/CD 优化发生在配置创建之前）
- 同谋风险（A↔B 双向审查改为轮询模式）
- 锁文件冲突（并行 Agent 的依赖管理）
- 缺少 Codegraph 集成（影响分析、代码理解）
- 缺少心跳机制（无持续验证和自动回滚）
- 缺少面向小白的纯中文交互
- Git 授权与系统指令矛盾

### v1.0.0 第 10 轮修复（发布后补丁）

修复 10 个业务逻辑 Bug：
- **B-1** QUICK 模式模板匹配无降级路径
- **B-2** Phase 8 CLI 验证硬编码 Node.js
- **B-3** Phase 5 依赖漏洞审查仅支持 npm
- **B-4** Phase 6 安全复查时 codegraph 索引过时
- **B-5** QUICK 模式假设陈述与模板匹配脱节
- **B-6** Phase 2 环境检查仅覆盖 3 种语言
- **B-7** Phase 3 无 Agent 数量上限
- **B-8** MODIFY 模式无 codegraph 降级路径
- **B-9** Phase 6 安全复查无结构化清单
- **B-10** npm audit 无 registry 配置提示
## v1.1.0 (2026-07-21)

### 架构升级：MCP Server (TypeScript) 引擎

**核心变更：从纯 SKILL.md 升级为 SKILL.md + MCP Server 混合架构**

纯提示词约束被证明是不足以保证生产级代码质量的。新增 TypeScript MCP Server 提供确定性工具：

- **scaffold_project** — 生成生产级项目骨架，自带 JWT 认证、结构化日志、统一错误处理、CORS 白名单、优雅关闭、Dockerfile、CI/CD
- **quality_gates** — 确定性质量门禁（编译/测试/安全审计），返回 PASS/FAIL，不再依赖 AI 自觉
- **code_check** — 代码违规扫描（硬编码端口/密钥/URL、console.log、CORS 配置）
- **template_list** — 项目模板列表

**新增文件：**
- `mcp-server/package.json`
- `mcp-server/src/index.js`

**文档更新：**
- `production-standards.md` — 新增 24 项生产级交付标准差距分析
- `references/prompts/01-implementer.md` — 生产级代码要求从"建议"升级为"强制"
- `references/prompts/00-architect.md` — 新增 17 项生产级架构检查项
- `references/prompts/02-reviewer.md` — 新增安全/生产级审查项
