# 贡献指南

感谢你考虑为 AlanCodecoding 贡献！

## 项目结构

```
alan-codecoding/
├── SKILL.md                 # 核心流水线（主文件）
├── USAGE.md                 # 使用说明书
├── CAPABILITIES.md          # 核心能力手册
├── README.md                # 项目首页
├── package.json             # npm 元信息
├── sync_to_github.py        # 自动同步脚本
└── references/prompts/      # Agent 提示模板
    ├── 00-architect.md      # 架构师
    ├── 01-implementer.md    # 编码者
    ├── 02-reviewer.md       # 审查者
    ├── 03-auditor.md        # 审计者
    ├── 04-tester.md         # 测试者
    └── 05-devops.md         # DevOps
```

## 如何贡献

### 报告 Bug

1. 先搜索 [Issues](https://github.com/AlanHYL/kimi-alan-codecoding/issues) 看是否已被报告
2. 如果没有，创建新 Issue，使用 Bug 模板填写
3. 描述清楚：复现步骤、期望行为、实际行为、环境信息

### 提交改进

1. Fork 本仓库
2. 创建你的特性分支: `git checkout -b feat/xxx`
3. 修改文件
4. 测试：运行 `python sync_to_github.py --dry-run` 确认变更
5. 提交: `git commit -m "feat: 说明你的改进"`
6. 推送到你的 Fork
7. 创建 Pull Request

### 代码规范

- **SKILL.md**: 保持 YAML frontmatter 格式正确，Markdown 语法规范
- **Prompt 模板**: 保持统一的模板结构（Role → Responsibilities → Input → Workflow → Output）
- **Python 脚本**: 兼容 Python 3.8+
- **命名**: 使用英文命名，注释可用中文
- **不要硬编码 Token**: 所有 GitHub Token 从环境变量或配置文件读取

## 发布新版本

本项目的维护者会负责发布新版本：
1. 更新 `package.json` 中的版本号
2. 更新 `CHANGELOG.md`
3. 打 Git Tag
4. 同步到 GitHub
