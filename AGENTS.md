# AlanCodecoding — AI Agent 开发指南

**本文件管辖范围：** 本仓库（kimi-alan-codecoding）及其所有子目录。

---

## 仓库概述

这是一个 **Kimi Code CLI Skill**，提供全自动化多 Agent 协作编码流水线。安装后，用户可以通过以下命令使用：

```
AlanCodecoding: quick <需求>
AlanCodecoding: new <需求>
AlanCodecoding: pro <需求>
AlanCodecoding: modify <需求>
AlanCodecoding: resume
AlanCodecoding: sync
```

---

## 项目结构

```
├── SKILL.md                         # 核心流水线编排（主文件）
├── USAGE.md                         # 使用说明书（面向用户）
├── CAPABILITIES.md                  # 核心能力手册（技术概览）
├── README.md                        # 项目首页（英文）
├── README.zh-CN.md                  # 项目首页（中文）
├── AGENTS.md                        # 本文件
├── CONTRIBUTING.md                  # 贡献指南
├── CHANGELOG.md                     # 版本历史
├── production-standards.md          # 生产级标准能力矩阵
├── LICENSE                          # MIT
├── package.json                     # npm 元信息
├── sync_to_github.py                # 自动同步脚本
├── push_all_docs.py                 # 文档批量推送脚本
├── mcp-server/                      # 🆕 MCP Server（TypeScript）
│   ├── package.json
│   └── src/index.js                 # 4 个 MCP 工具
├── .github/
│   ├── ISSUE_TEMPLATE/              # Issue 模板
│   └── PULL_REQUEST_TEMPLATE.md     # PR 模板
└── references/prompts/              # Agent 提示模板
    ├── 00-architect.md
    ├── 01-implementer.md
    ├── 02-reviewer.md
    ├── 03-auditor.md
    ├── 04-tester.md
    └── 05-devops.md
```

---

## MCP Server（主动调用）

SKILL.md 中会通过 MCP 协议调用以下工具执行**确定性任务**：

| MCP 工具名 | 功能 | SKILL.md 中的使用阶段 |
|---|---|---|
| `scaffold_project` | 生成项目骨架（认证/日志/错误处理/CORS/优雅关闭/Dockerfile/CI/CD） | Phase 3 Step 3 |
| `quality_gates` | 运行编译检查 + 测试 + 安全审计 | Phase 4 Step 5, Phase 5 Step 4 |
| `code_check` | 扫描硬编码/console.log/CORS 配置 | Phase 4 Step 5, Phase 5 Step 4 |
| `template_list` | 列出可用模板 | Phase 1 QUICK 模式 |

MCP Server 位于 `mcp-server/src/index.js`。修改这些工具的逻辑需要编辑该文件，然后重启 Kimi Code CLI。

---

## 开发本 Skill 的规则

1. **主逻辑在 SKILL.md**：所有流水线编排、命令入口、阶段定义都在 SKILL.md 中。修改功能先改 SKILL.md。
2. **Prompt 模板在 references/prompts/**：每个 Agent 角色的详细指令。修改 Agent 行为改对应模板。
3. **MCP 工具在 mcp-server/src/index.js**：确定性工具（scaffold_project / quality_gates / code_check）的逻辑在这里。修改后需重启 Kimi Code CLI 生效。
4. **文档同步更新**：修改 SKILL.md 或 mcp-server 后，同步更新 USAGE.md、CAPABILITIES.md、README.md、README.zh-CN.md。
5. **YAML 格式注意**：SKILL.md 的 YAML frontmatter 必须使用 ASCII 冒号 `:`（不是中文冒号 `：`）。
6. **不要硬编码 Token**：所有 GitHub Token 从环境变量或 `.github-token` 文件读取。
7. **提交信息规范**：使用 Conventional Commits 格式 — `feat:`、`fix:`、`docs:`、`refactor:`。

---

## 技能加载路径

当在项目中安装本 Skill 后，AI agent 通过以下路径加载：

1. `~/.kimi-code/skills/alan-codecoding/SKILL.md` — 主流水线
2. `~/.kimi-code/skills/alan-codecoding/references/prompts/*.md` — Agent 提示模板

---

## 测试方式

```bash
# 预览变更（不推送）
cd ~/.kimi-code/skills/alan-codecoding
python sync_to_github.py --dry-run

# 手动同步到 GitHub
python sync_to_github.py

# 或在 Kimi Code CLI 中执行
AlanCodecoding: sync
```
