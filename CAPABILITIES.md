# AlanCodecoding 核心能力手册

> 全自动化多 Agent 协作编码流水线
> 版本: 1.0.0

---

## 一、核心架构能力

### 1. 四模式自适应流水线

根据用户场景自动选择最优开发路径：

```
                   ┌─ quick  ── 模板化快车道，1 次确认，无模板匹配时降级为 new
                   │
用户输入需求 ────┼─ new    ── 标准流程，2 次确认，8-15 轮完成
                   │
                   ├─ pro    ── 专业流程，含审计/优化/部署
                   │
                   └─ modify ── 二次开发，基于 Codegraph 理解现有代码，无 codegraph 时自动降级
```

### 2. 多 Agent 平等协作

每个开发阶段使用多个 Agent 协作完成：

| 阶段 | 协作方式 | Agent 数量 |
|---|---|---|
| 需求分析 | 独立分析 → 合并结果 | 2-3 |
| 架构设计 | 分别提案 → 讨论 → 投票 | 2-3 |
| 并行编码 | 每个模块独立 Agent | 5-8（上限，超限任务排队） |
| 交叉审查 | 轮询模式（非双向） | 按 Agent 数，<3 时派独立 Reviewer |
| 代码审计 | 双人独立审计 → 交叉核对 | 2 |
| 优化 | 优化 Agent + 验证 Agent | 2 |

### 3. 自适应路径矩阵

| 项目类型 | 推荐模式 | 走哪些阶段 | 预计轮数 |
|---|---|---|---|
| 静态页面 | quick | init→需求→编码→测试→交付 | 3-5 |
| CRUD 应用 | new | init→需求→架构→编码→测试→交付 | 8-15 |
| 全栈应用 | new/pro | 全部阶段 | 15-30 |
| 微服务 | pro | 全部阶段 + 额外 | 20-40 |
| 修改现有项目 | modify | 代码理解→需求→编码→测试→交付 | 5-12 |

---

## 二、❤️ 心跳机制（核心创新）

### 设计理念

把代码视为"活的" — 有 Bug 就是"死亡"，心跳机制确保代码始终健康。

### 7 个心跳检测点

| 心跳 | 阶段 | 检测 | 死亡判定 | 复活 |
|---|---|---|---|---|
| HB-1 | 单模块编码 | 编译 + 测试 | 编译/测试失败 | Agent 修复 |
| HB-2 | 交叉审查 | Code Review | 致命问题 | 修复重审 |
| HB-3 | 集成合并 | 全量编译 + 接口 | 冲突/不匹配 | 回滚到 HB-2 |
| HB-4 | 全量测试 | 全部测试 + 覆盖率≥80% | 测试失败 | 回滚到 HB-3 |
| HB-5 | 安全审计 | 漏洞 + lint | 高危/lint 错误 | 回滚到 HB-3 |
| HB-6 | 优化后 | 回归测试 | 优化破坏功能 | 回滚到 HB-5 |
| HB-7 | 部署验证 | CI/CD 语法 | 语法错误 | 修改重验 |
| HB-FINAL | 最终验证 | 应用运行 | 无法启动 | 修复重验 |

### 保活机制

```
变更代码 → 编译验证 → 通过 → 心跳提交 git commit [HB-N]
                          ↓
                      失败 → 修复/回滚到上一个心跳 → 重新验证
```

每次心跳都是一个 Git 提交，commit message 标记 `[HB-N]`，可追溯可回滚。

---

## 三、🧠 三级记忆系统

### 第一级: 项目记忆

**存储**: `.alan-codecoding/project-memory.json`
**作用**: 跨会话保持项目连续性
**内容**: 架构决策、代码模式、技术偏好

**示例**:
```json
{
  "project": {"name": "book-manager", "tech": ["node", "express", "sqlite"]},
  "decisions": [{"decision": "选择 SQLite", "reason": "单用户应用无需复杂数据库"}],
  "patterns": ["错误处理统一在 middleware 层"]
}
```

### 第二级: 经验记忆

**存储**: `.alan-codecoding/lessons.json`
**作用**: 跨项目积累经验，避免重复踩坑
**内容**: 有效做法、无效做法、Bug 记录、解决方案

**读取时机**: 每次启动流水线时自动加载
**写入时机**: 每次项目完成时追加

### 第三级: 用户偏好

**存储**: `.kimi-code/skills/alan-codecoding/user-preferences.json`
**作用**: 记住用户的技术偏好
**内容**: 喜好语言、框架、数据库、工具链

### 自适应学习

每次启动加载历史经验 → AI 融入到当前决策 → 项目完成后更新经验库 → 下次启动时更加聪明。这不是"自我进化"（在 Skill 层面不可行），但这是最实用的经验积累方式。

---

## 四、Codegraph MCP 深度集成

| Codegraph 工�� | 在流水线中的用途 | 使用阶段 |
|---|---|---|
| `codegraph_explore` | 自然语言理解代码架构、查找相关代码 | M0, M3, M5 |
| `codegraph_node` | 读取文件/符号 + 依赖上下文 | Phase 3, M3 |
| `codegraph_search` | 快速搜索符号位置 | Phase 2, M2 |
| `codegraph_callers` | 修改前影响分析、找到所有调用者 | **每个修改前** |
| `codegraph sync` | 修改后同步索引 | 每个修改代码的阶段后 |

### 未安装时的降级

如果 Codegraph 未安装：
- 询问用户是否安装
- 用户拒绝 → 降级运行（用 Read/Grep/Glob 替代）
- 功能完全可用，但效率降低

### 安装方式

```bash
# npm 安装（推荐）
npm install -g @colbymchenry/codegraph

# Git 安装（备选）
git clone https://github.com/colbymchenry/codegraph
cd codegraph && npm install -g
```

---

## 五、五道质量门禁

| 门禁 | 阶段 | 检查项 | 失败处理 | 最大重试 |
|---|---|---|---|---|
| GATE-COMPILE | 编码 | 编译/类型检查零错误 | 精准回退失败模块 | 3 次 |
| GATE-TEST | 测试 | 覆盖率≥80%+全通过 | 精准回退 | 3 次 |
| GATE-SECURITY | 审计 | 零高危漏洞+lint零错误+架构合规 | 精准回退 | 3 次 |
| GATE-REGRESSION | 优化 | 优化后测试全量通过 | 回退优化前代码 | 3 次 |
| GATE-DEPLOY | 部署 | CI/CD 配置语法正确 | 修改后重验 | 3 次 |

### 精准回退

失败时只重跑失败模块对应的 Agent，不是全部 Agent，避免浪费。

---

## 六、六层错误处理体系

| 层级 | 场景 | 处理方式 |
|---|---|---|
| L1 | 工具异常（命令失败、超时） | 自动重试 3 次 |
| L2 | Agent BLOCKED | 补充上下文重新派发 3 次 |
| L3 | 质量门禁失败 | 精准回退最多 3 轮 |
| L4 | 架构偏差 | 暂停 → 升级用户决策 |
| L5 | 资源耗尽 | 保存 checkpoint → resume |
| L6 | 全部失败 | 报告用户 → 人工介入 |

---

## 七、12 个项目模板

| 模板 | 复杂度 | 典型功能 | 技术栈 |
|---|---|---|---|
| 静态个人主页 | 简单 | 个人信息、作品集 | HTML/CSS |
| Landing Page | 简单 | 产品介绍、CTA | HTML/CSS/JS |
| CRUD 数据管理 | 中等 | 增删改查、搜索 | Node+Express+SQLite |
| RESTful API | 中等 | REST 接口、验证 | Node+Express |
| CLI 工具 | 简单 | 命令解析、参数 | Node+Commander |
| 博客系统 | 中等 | Markdown、分类、评论 | Node+React |
| 用户认证 | 中等 | 注册/登录/权限 | Node+Passport |
| 管理后台 | 中等 | 仪表盘、图表、表格 | React+Chart.js |
| 电商前台 | 中等 | 商品、购物车 | React |
| 实时应用 | 中等 | WebSocket | Node+WS |
| 定时任务 | 简单 | 定时、通知 | Node+node-cron |
| 全栈博客 | 中等 | 前后端分离 | React+Node+SQLite |

---

## 八、生产级交付标准

所有通过 AlanCodecoding 交付的代码满足：

- ✅ 编译/类型检查零错误
- ✅ 测试覆盖率 ≥ 80%
- ✅ 零高危安全漏洞
- ✅ 代码规范合规
- ✅ 架构与设计一致
- ✅ 应用可正常启动运行
- ✅ 文档完整（README + API 文档 + 架构图）
- ✅ 提供一键启动脚本
- ✅ 提供 Git 版本管理（如授权）
- ✅ 提供 CHANGELOG

---

## 九、技术栈支持

| 类别 | 支持情况 |
|---|---|
| **前端框架** | React, Vue, HTML/CSS/JS, EJS, Handlebars |
| **后端框架** | Express, Fastify, Koa |
| **运行时** | Node.js, Python, Go |
| **数据库** | SQLite, PostgreSQL, MySQL（需安装驱动） |
| **测试框架** | Vitest, Jest, Mocha, pytest, go test |
| **CI/CD** | GitHub Actions, GitLab CI |
| **容器化** | Docker, Docker Compose |
| **代码索引** | Codegraph MCP（推荐安装） |

---

## 十、架构设计原则

1. **YAGNI** — 只写当下需要的代码，不做过度设计
2. **心跳保活** — 每次变更都保持代码健康
3. **精准回退** — 失败时只影响失败模块，不动其余
4. **面向小白** — 所有沟通零术语纯中文
5. **经验累积** — 每次交付都更新记忆库
6. **Codegraph 优先** — 任何修改前先用代码地图理解
7. **最小侵入** — MODIFY 模式下不做不必要重构
8. **自动降级** — 没有 Codegraph 也能运行
