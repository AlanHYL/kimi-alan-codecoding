# AlanCodecoding 🤖✨ — AI 全自动多 Agent 协作编码流水线

> **一句话：你说需求，AI 自动完成需求分析→架构设计→编码→测试→审计→部署，交付可直接运行的代码。**
>
> 🏆 Kimi Code CLI 首款全自动化多 Agent 协作开发 Skill
> 🏆 内置心跳保活机制 | 三级记忆系统 | Codegraph 深度集成

[![GitHub release](https://img.shields.io/github/v/release/AlanHYL/kimi-alan-codecoding?logo=github&label=最新版本)](https://github.com/AlanHYL/kimi-alan-codecoding/releases)
[![License](https://img.shields.io/github/license/AlanHYL/kimi-alan-codecoding?logo=open-source-initiative&label=许可证)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/AlanHYL/kimi-alan-codecoding?logo=github&label=Stars)](https://github.com/AlanHYL/kimi-alan-codecoding/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/AlanHYL/kimi-alan-codecoding?logo=git&label=最近更新)](https://github.com/AlanHYL/kimi-alan-codecoding/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/AlanHYL/kimi-alan-codecoding?label=仓库大小)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![GitHub issues](https://img.shields.io/github/issues/AlanHYL/kimi-alan-codecoding?logo=github&label=Issues)](https://github.com/AlanHYL/kimi-alan-codecoding/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/AlanHYL/kimi-alan-codecoding?logo=github&label=PRs)](https://github.com/AlanHYL/kimi-alan-codecoding/pulls)
[![Platform](https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-blue?logo=windows)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![Kimi Code CLI](https://img.shields.io/badge/Kimi%20Code-CLI-blue?logo=read-the-docs)](https://kimi.ai)
[![AI 自动编程](https://img.shields.io/badge/AI-自动编程-brightgreen?logo=openai)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![多 Agent 协作](https://img.shields.io/badge/多Agent-协作-blueviolet?logo=matrix)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-orange?logo=git)](CONTRIBUTING.md)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow?logo=conventionalcommits)](https://conventionalcommits.org)
[![Semantic Versioning](https://img.shields.io/badge/SemVer-2.0.0-red?logo=semver)](https://semver.org)

---

## 📌 亮点速览

| 如果你 | 使用模式 | 效果 |
|---|---|---|
| 🧑 完全不懂编程 | `AlanCodecoding: quick 帮我建一个博客` | 说需求 → 直接出可运行的网站 |
| 👨‍💻 开发者想省时间 | `AlanCodecoding: new 做一个任务管理API` | 自动完成全部编码工作 |
| 🏢 做生产级项目 | `AlanCodecoding: pro 开发电商后台` | 含审计/安全/性能优化/部署配置 |
| 🔧 要改现有项目 | `AlanCodecoding: modify 加一个导出功能` | AI 先理解代码，精准修改不改坏 |

---

## 🚀 与其他方案的核心区别

| 对比维度 | 传统 AI 编码助手 | **AlanCodecoding** |
|---|---|---|
| 工作方式 | 问一句答一句，需要你懂技术 | **说需求就全自动完成** |
| 代码质量 | 凭运气，经常出 Bug | **7 道心跳检测 + 5 道质量门禁，有 Bug 自动回滚** |
| 项目经验 | 每次从零开始 | **三级记忆系统，越用越聪明** |
| 二次开发 | 需要自己理解现有代码 | **Codegraph 自动分析代码结构，精准修改不影响现有功能** |
| 小白友好 | 需要懂技术术语 | **纯中文交互 + 一键启动脚本，零术语** |
| 团队协作 | 单个 AI 单打独斗 | **多 Agent 像团队一样协作：架构师 + 编码者 + 审查者 + 审计者 + 测试者 + DevOps** |

---

## ✨ 五大核心优势

### ❤️ 心跳保活机制（业界首创）
每次代码变更后自动编译+测试验证。有 Bug 自动回滚到上一个健康版本。**确保交付的代码 100% 可运行。**

```
变更代码 → 编译验证 → 测试验证 → 通过 → 心跳提交 (git commit [HB-N])
                                        失败 → 自动回滚到上一个心跳 → 重新修复
```

### 🧠 三级记忆系统
- **项目记忆**：跨会话记住当前项目的架构决策和代码模式
- **经验记忆**：跨项目积累经验教训，避免重复踩坑
- **用户偏好**：记住你喜欢 TypeScript 还是 JavaScript、pnpm 还是 npm

### 👥 多 Agent 平等协作
不像传统 AI 单打独斗，AlanCodecoding 像一支**完整开发团队**：

```
需求分析 → 2-3 个 Agent 独立分析后合并
架构设计 → 2-3 个 Agent 分别提案后投票
并行编码 → 每个模块独立 Agent 同时编码（最多 8 个并行）
交叉审查 → 轮询审查（非双向，防同谋）
代码审计 → 双人独立审计后交叉核对
优化     → 优化 Agent + 验证 Agent 双保险
```

### 🔍 Codegraph 代码地图深度集成
- 修改代码前自动进行**影响分析**：找到所有调用者，评估修改范围
- 自然语言理解代码：问"这个项目的架构是怎样的？"自动返回完整上下文
- 精准回退：质量门禁失败时**只重跑失败模块**，不动其余代码

### 🚪 真正的开箱即用
- 纯中文交互，**零技术术语**
- 自动检测运行环境（Node/Python/Go），未安装时提示安装
- 代码交付后自动运行验证，**确保能启动**
- 提供 Windows `start.bat` 和 Unix `start.sh` **一键启动脚本**

### ⚙️ MCP Server 引擎（v1.1.0 新增）
新增 TypeScript MCP Server，提供确定性工具替代 AI"自觉"检查：

| 工具 | 功能 | 意义 |
|---|---|---|
| `scaffold_project` | 生成生产级项目骨架（JWT认证+日志+错误处理+CORS+优雅关闭+Dockerfile+CI/CD） | 每个项目从同一高标准起步 |
| `quality_gates` | 运行编译检查+测试+安全审计，返回 PASS/FAIL | **程序强制执行**质量门禁，不依赖 AI 自觉 |
| `code_check` | 扫描硬编码/console.log/CORS/认证缺失 | 捕捉 AI 可能遗漏的问题 |

这些工具通过 MCP 协议被 AI 直接调用，不需要经过 Bash 脚本解析文本。

---

## 📋 完整命令

| 命令 | 功能 | 适用场景 |
|---|---|---|
| `quick <需求>` | 小白快车道 — 模板化，1 次确认 | 简单项目、快速原型 |
| `new <需求>` | 标准新项目 — 含架构设计确认 | 正规开发 |
| `pro <需求>` | 专业完整流程 — 含审计/优化/部署 | 生产级项目 |
| `modify <需求>` | 二次开发 — Codegraph 分析后精准修改 | 给现有项目加功能 |
| `resume` | 从断点恢复开发 | 开发中断后继续 |
| `sync` | 同步本地修改到 GitHub | 更新 Skill 后发布 |
| `template` | 查看可用项目模板 | 了解能做什么 |

---

## 🛠️ 技术栈支持

| 类别 | 支持范围 |
|---|---|
| **运行时** | Node.js · Python · Go · Java · Rust · PHP |
| **前端框架** | React · Vue · HTML/CSS/JS |
| **后端框架** | Express · Fastify · Koa · Flask · FastAPI |
| **数据库** | SQLite · PostgreSQL · MySQL |
| **测试框架** | Vitest · Jest · Mocha · pytest · go test |
| **CI/CD** | GitHub Actions · GitLab CI |
| **容器化** | Docker · Docker Compose |
| **代码索引** | Codegraph MCP（强烈推荐） |

---

## 🔄 工作流程全景

```
你: "帮我做一个博客网站"
    ↓
[Phase -1] Codegraph 安装检查 + 记忆加载
[Phase 0]  项目初始化 + 心跳基础设施
[Phase 1]  需求确认 → AI 陈述假设 → 你确认 → 开始
    ↓  (以下全自动，无需你操作)
[Phase 2]  架构设计 → 多 Agent 技术选型 → 用户确认
[Phase 3]  并行编码 → 8 个 Agent 同时写代码 → 交叉审查 → ❤️心跳
[Phase 4]  全量测试 → 单元测试 + 集成测试 + E2E → 覆盖率≥80%
[Phase 5]  代码审计 → 双人独立审计 + 安全扫描 → ❤️心跳
[Phase 6]  优化 → 性能优化 + 代码精简 + 文档生成 → ❤️心跳
[Phase 7]  部署配置 → Dockerfile + CI/CD + 一键启动脚本
[Phase 8]  运行验证 → 启动应用 → 确认能跑 → 🎉 交付
    ↓
✅ "网站创建完成！运行: cd 目录 && npm start"
```

---

## 📦 交付质量承诺

每一份代码交付前都经过严格验证：

| 检查项 | 标准 | 失败处理 |
|---|---|---|
| 编译/类型检查 | ✅ 零错误 | 自动回退修复，不交付破损代码 |
| 单元测试覆盖率 | ✅ ≥ 80% | 精准回退到失败模块 |
| 安全漏洞 | ✅ 零高危 | 标注问题模块后回退 |
| 代码规范 | ✅ lint 零错误 | 自动修复后重验 |
| 应用运行 | ✅ 可正常启动 | 诊断修复后重新验证 |
| 文档 | ✅ README + API 文档 + 启动脚本 | 生成完整方可交付 |

### 生产级代码清单（NEW/PRO 模式）

| 类别 | 检查项 |
|---|---|
| **安全** | 用户认证（JWT/Session）· 输入校验（Joi/Zod）· CORS · 请求限流 · 错误不泄露堆栈 |
| **可观测性** | 结构化日志（winston/pino）· 统一错误处理 · 健康检查端点 |
| **可靠性** | 优雅关闭（SIGTERM）· API 超时 · 数据库连接池 |
| **配置** | 环境变量分环境加载 · 密钥外部化管理 |

---

## 🏗️ 项目结构

```
.kimi-code/skills/alan-codecoding/
├── SKILL.md                 # 核心流水线（1400+ 行）
├── README.md                # 本文件（英文）
├── README.zh-CN.md          # 本文件（中文）
├── USAGE.md                 # 使用说明书
├── CAPABILITIES.md          # 核心能力手册
├── AGENTS.md                # AI Agent 开发指南
├── CHANGELOG.md             # 版本历史
├── CONTRIBUTING.md          # 贡献指南
├── production-standards.md  # 生产级标准差距分析
├── LICENSE                  # MIT 许可证
├── package.json             # npm 包信息
├── sync_to_github.py        # 自动同步脚本
├── mcp-server/              # 🆕 TypeScript MCP Server 引擎
│   ├── package.json
│   └── src/index.js         # scaffold_project, quality_gates, code_check 工具
├── .github/                 # Issue + PR 模板
└── references/prompts/      # 6 个 Agent 角色提示模板
    ├── 00-architect.md      # 架构师
    ├── 01-implementer.md    # 编码者
    ├── 02-reviewer.md       # 审查者
    ├── 03-auditor.md        # 审计者
    ├── 04-tester.md         # 测试者
    └── 05-devops.md         # DevOps
```

---

## 📖 了解更多

| 文档 | 内容 |
|---|---|
| [使用说明书](USAGE.md) | 详细使用教程、场景示例、故障排除 |
| [核心能力手册](CAPABILITIES.md) | 技术架构、心跳机制、记忆系统详解 |
| [贡献指南](CONTRIBUTING.md) | 如何参与贡献、代码规范 |
| [更新日志](CHANGELOG.md) | 版本历史和变更说明 |

---

## 📄 许可证

[MIT License](LICENSE) © 2026 AlanHYL
