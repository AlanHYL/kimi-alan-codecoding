# AlanCodecoding 🤖✨

> 全自动化多 Agent 协作编码流水线 — 从需求到生产级代码，一键完成。

---

## 简介

**AlanCodecoding** 是一个 Kimi Code CLI Skill，实现**全自动化多 Agent 协作开发**。你只需要描述需求，剩下的全部由 AI 自动完成。

### 一句话概括

> 你说需求 → AlanCodecoding 自动完成需求分析→架构设计→编码→测试→审计→部署 → 交付可直接运行的代码

### 适合谁用

| 用户类型 | 推荐模式 | 原因 |
|---|---|---|
| 不懂编程的小白 | `quick` | 说需求就能出可用网站 |
| 普通开发者 | `new` | 节省重复编码时间 |
| 专业开发者 | `pro` | 生产级质量保障 |
| 维护老项目 | `modify` | 安全地加功能不改坏 |

---

## 快速开始

### 安装

本 Skill 已安装在 Kimi Code CLI 环境中，直接使用即可。

### 基础用法

```
AlanCodecoding: quick 帮我建一个图书管理网站
```

等待完成 → 按提示运行项目。

### 完整命令列表

| 命令 | 功能 | 适用场景 |
|---|---|---|
| `quick <需求>` | 快车道模式 | 简单项目、快速原型 |
| `new <需求>` | 标准新项目 | 正规开发 |
| `pro <需求>` | 专业完整流程 | 生产级项目 |
| `modify <需求>` | 二次开发 | 给现有项目加功能 |
| `resume` | 恢复中断 | 开发中断后继续 |
| `sync` | 同步本地修改到 GitHub | 修改 Skill 后发布更新 |
| `template` | 查看模板 | 了解可用项目模板 |

---

## 核心特性

### ❤️ 心跳机制

每次代码变更后自动验证健康状态，有 Bug 自动回滚。**确保交付的代码是健康可运行的。**

### 🧠 三级记忆

项目记忆（跨会话） + 经验教训（跨项目） + 用户偏好（全局） — 越用越聪明。

### 👥 多 Agent 平等协作

需求分析、架构设计、并行编码、交叉审查、双人审计 — 多个 AI Agent 像团队一样协作。

### 🔍 Codegraph 深度集成

修改代码前自动分析影响范围，精确理解代码结构，避免改坏现有功能。

### 🚪 开箱即用

纯中文交互 + 一键启动脚本 + 零术语沟通 + 自动检测运行环境。

---

## 工作流程

```
你: "帮我做一个博客网站"
    ↓
AI: 展示功能清单 → 你确认
    ↓  (全自动)
AI: 设计方案 → 多 Agent 并行编码 → 测试 → 审计 → 优化 → 部署
    ↓
AI: ✅ 交付完成！运行命令: cd 目录 && npm start
```

---

## 技术栈支持

- **运行时**: Node.js, Python, Go
- **前端**: React, Vue, HTML/CSS
- **后端**: Express, Fastify
- **数据库**: SQLite, PostgreSQL, MySQL
- **测试**: Vitest, Jest, Mocha, pytest
- **CI/CD**: GitHub Actions, GitLab CI
- **容器**: Docker, Docker Compose

---

## 项目结构

```
.kimi-code/skills/alan-codecoding/
├── SKILL.md                 # 核心流水线编排
├── USAGE.md                 # 使用说明书
├── CAPABILITIES.md          # 核心能力手册
└── references/prompts/      # Agent 提示模板
    ├── 00-architect.md      # 架构师
    ├── 01-implementer.md    # 编码者
    ├── 02-reviewer.md       # 审查者
    ├── 03-auditor.md        # 审计者
    ├── 04-tester.md         # 测试者
    └── 05-devops.md         # DevOps
```

---

## 质量保障

每一份交付的代码都经过：

- ✅ 编译/类型检查零错误
- ✅ 测试覆盖率 ≥ 80%
- ✅ 零高危安全漏洞
- ✅ 应用可正常启动
- ✅ 提供一键运行脚本
- ✅ 提供完整 README 文档

---

## 更多

- 📖 [使用说明书](USAGE.md) — 详细使用教程和场景示例
- 📋 [核心能力手册](CAPABILITIES.md) — 技术架构和设计原理
