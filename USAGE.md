# AlanCodecoding 使用说明书

> 全自动化多 Agent 协作编码流水线
> 版本: 1.0.0 | 适用: Kimi Code CLI

---

## 目录

1. [快速开始](#快速开始)
2. [命令详解](#命令详解)
3. [四种模式](#四种模式)
4. [场景示例](#场景示例)
5. [故障排除](#故障排除)
6. [高级用法](#高级用法)

---

## 快速开始

### 我什么都不会，就想做一个能用的网站

只需要说一句话：

```
AlanCodecoding: quick 帮我建一个图书管理网站
```

AI 会自动：
1. 展示功能清单给你确认
2. 一键创建完整项目
3. 测试确保质量
4. 告诉你怎么运行

全程你只需要回答"确认"或提出修改意见。不需要写任何代码。

### 运行生成的代码

项目创建完成后，按 AI 给的提示操作即可。通常是：

**Windows 用户:**
```
cd 项目目录
npm start
```
然后浏览器访问 `http://localhost:3000`

**一键启动（如果生成了）:**
双击 `start.bat` 即可。

---

## 命令详解

### `AlanCodecoding: quick <需求描述>`

**小白快车道** — 最快速得到结果。

- 使用项目模板，自动匹配最合适的方案
- 只需要 **1 次确认**（展示功能清单问你是否满意）
- 跳过架构设计环节，直接用模板内置方案
- 适合: 个人主页、简单的 CRUD 应用、API、CLI 工具

```
示例:
  AlanCodecoding: quick 帮我建一个个人主页
  AlanCodecoding: quick 做一个记账本
  AlanCodecoding: quick 写一个批量重命名文件的命令行工具
```

---

### `AlanCodecoding: new <需求描述>`

**新项目标准流程** — 适合认真做一个项目。

- 多 Agent 讨论需求，输出完整需求文档
- 架构设计环节让你确认技术方案
- 完整的编码 + 测试流程
- 适合: 需要定制化的项目、想了解技术方案的项目

```
示例:
  AlanCodecoding: new 做一个博客系统，支持 Markdown 编辑
  AlanCodecoding: new 开发一个任务管理小程序
```

---

### `AlanCodecoding: pro <需求描述>`

**专业完整流程** — 做生产级项目。

- 包含 new 模式的所有环节
- 额外增加: 双人代码审计、安全审查、性能优化、部署配置
- 适合: 要上线运行的项目、商业项目

```
示例:
  AlanCodecoding: pro 开发一个电商网站后台
  AlanCodecoding: pro 做一个支持支付的知识付费平台
```

---

### `AlanCodecoding: modify <需求描述>`

**二次开发** — 给已有项目加功能。

- AI 先用 Codegraph 理解你现有的代码
- 精准定位需要修改的地方
- 最小化改动，不破坏现有功能

```
示例:
  AlanCodecoding: modify 帮我加一个导出 Excel 的功能
  AlanCodecoding: modify 给用户列表加上搜索和分页
```

---

### `AlanCodecoding: resume`

**恢复中断的流水线**。

- 如果开发过程中断（关闭窗口、超时等）
- 在同一个项目目录再次输入命令
- AI 会自动检测 checkpoint 从中断处继续

```
示例:
  AlanCodecoding: resume
```

---

### `AlanCodecoding: template`

**查看可用模板列表**。

```
AlanCodecoding: template
```

会展示所有可用的项目模板，包括模板名称、技术栈、功能说明。

---

## 四种模式速览

| 模式 | 谁用 | 交互次数 | 包含环节 |
|---|---|---|---|
| **quick** | 小白、快速原型 | 最少（1次确认） | 需求确认 → 编码 → 测试 → 交付 |
| **new** | 普通用户 | 中等（2次确认） | 需求 → 架构 → 编码 → 测试 → 交付 |
| **pro** | 专业开发者 | 较多（2次确认+审计） | 全部环节: 需求→架构→编码→测试→审计→优化→部署→交付 |
| **modify** | 所有用户 | 较少（1-2次确认） | 代码理解→需求→增量架构→编码→测试→交付 |

---

## 场景示例

### 场景 1: 我想做一个博客网站，但完全不懂编程

```
你: AlanCodecoding: quick 帮我建一个博客网站

AI: 好的！我帮您建一个博客网站，功能包括：
   - 发表文章（支持 Markdown 编辑）
   - 文章列表浏览
   - 文章分类和标签
   技术方案：网页版，用浏览器打开就能用。
   这个方案您满意吗？

你: 满意

AI: ✅ 博客网站创建完成！
    运行方法:
    1. 打开终端
    2. cd 博客目录
    3. npm start
    4. 浏览器访问: http://localhost:3000
```

### 场景 2: 我有一个项目，想加一个导出功能

```
你: AlanCodecoding: modify 帮我加一个导出 Excel 的功能

AI: 好的，我先了解您的项目结构...
    （AI 用 Codegraph 分析代码）
    
    我了解了，您的项目中数据列表在 src/routes/books.js，
    需要在列表页面加一个"导出 Excel"按钮。
    需要修改 2 个文件，新增 1 个文件。
    
    这个方案您满意吗？

你: 可以，开始吧

AI: ✅ 导出功能已添加！
    在图书列表页面可以看到"导出 Excel"按钮。
    原有功能不受影响，52 个测试全部通过。
```

### 场景 3: 中断了想继续

```
你: AlanCodecoding: resume

AI: 检测到项目 book-manager 之前已完成:
   - ✅ 需求确认
   - ✅ 架构设计
   - 当前进度: 编码阶段（已完成 2/4 个模块）
   
   从编码阶段继续...
```

---

## 故障排除

### Codegraph 安装

首次使用时，AI 会询问是否要安装 Codegraph（代码索引工具，强烈推荐）。

如果选择安装但安装失败：

**手动安装:**
```bash
npm install -g @colbymchenry/codegraph
```

**或从 Git 安装:**
```bash
git clone https://github.com/colbymchenry/codegraph
cd codegraph
npm install -g
```

如果选择不安装，流水线会降级运行（没有 Codegraph 辅助），仍然可以完成开发。

### 运行时未安装

如果 AI 检测到你的电脑没有安装 Node.js/Python/Go 等运行环境，会提示你安装。

**Node.js 下载:** https://nodejs.org （推荐 LTS 版本）
**Python 下载:** https://www.python.org
**Go 下载:** https://go.dev

### 端口冲突

如果运行项目时遇到"端口已被占用"的提示：

1. 找到占用端口的程序并关闭
2. 或者修改项目中的端口号（通常在 `src/index.js` 或 `.env` 文件中）

### 开发中断

如果流水线因为各种原因中断：

1. 不要慌
2. 在同一个项目目录再次输入 `AlanCodecoding: resume`
3. AI 会自动检测进度并从中断处继续

---

## 高级用法

### 自定义模板

当前内置了 12 个常用模板。如果想创建其他类型的项目，直接描述需求即可：
- AI 会自动理解需求并生成对应的项目
- 不需要局限于模板列表

### 记忆系统

AI 会自动记录：
- 你的技术偏好（喜欢 TypeScript 还是 JavaScript）
- 过去项目中的有效做法
- 常见问题的解决方案

每次使用时，AI 会从过往经验中学习，做得越来越好。

### 心跳回滚

如果某次修改导致代码出问题，AI 会自动回滚到上一个健康版本。你也可以手动查看心跳历史：

```
项目目录/.alan-codecoding/heartbeat-log.json
```

每个心跳对应一个 Git 提交，commit message 中包含 `[HB-N]` 标签。

---

## 技术架构

```
流程图:

用户输入需求
    ↓
Phase -1: Codegraph 检查 + 记忆加载
    ↓
Phase 0: 项目初始化 + 心跳基础设施
    ↓
Phase 1: 需求确认 [用户确认]
    ↓
Phase 2: 架构设计 [用户确认] (quick 模式跳过)
    ↓
Phase 3: 多 Agent 并行编码 (❤️ 心跳核心)
    ↓
Phase 4: 全量测试 + 质量门禁
    ↓
Phase 5-7: 审计/优化/部署 (pro 模式)
    ↓
Phase 8: 运行验证 + 交付
    ↓
✅ 交付物: 生产级代码 + 运行说明
```
