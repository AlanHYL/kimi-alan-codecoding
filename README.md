# AlanCodecoding 🤖✨ — AI-Powered Multi-Agent Collaborative Coding Pipeline

> **From requirements to production-grade code in one command.** Describe what you need, and AlanCodecoding automatically handles requirement analysis → architecture design → coding → testing → auditing → deployment → delivering runnable code.
>
> 🇨🇳 [中文版本 (Chinese Version)](README.zh-CN.md)

[![GitHub release](https://img.shields.io/github/v/release/AlanHYL/kimi-alan-codecoding?logo=github)](https://github.com/AlanHYL/kimi-alan-codecoding/releases)
[![License](https://img.shields.io/github/license/AlanHYL/kimi-alan-codecoding?logo=open-source-initiative)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/AlanHYL/kimi-alan-codecoding?logo=github)](https://github.com/AlanHYL/kimi-alan-codecoding/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/AlanHYL/kimi-alan-codecoding?logo=git)](https://github.com/AlanHYL/kimi-alan-codecoding/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/AlanHYL/kimi-alan-codecoding)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![GitHub issues](https://img.shields.io/github/issues/AlanHYL/kimi-alan-codecoding?logo=github)](https://github.com/AlanHYL/kimi-alan-codecoding/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/AlanHYL/kimi-alan-codecoding?logo=github)](https://github.com/AlanHYL/kimi-alan-codecoding/pulls)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?logo=windows)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![Kimi Code CLI](https://img.shields.io/badge/Kimi%20Code-CLI-blue?logo=read-the-docs)](https://kimi.ai)
[![AI Coding](https://img.shields.io/badge/AI-Coding-brightgreen?logo=openai)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![Multi-Agent](https://img.shields.io/badge/Multi-Agent-blueviolet?logo=matrix)](https://github.com/AlanHYL/kimi-alan-codecoding)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-orange?logo=git)](CONTRIBUTING.md)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow?logo=conventionalcommits)](https://conventionalcommits.org)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-red?logo=semver)](https://semver.org)

---

## 📌 Quick Overview

| Your Profile | Recommended Mode | What You Get |
|---|---|---|
| 🧑 No coding experience | `AlanCodecoding: quick build me a blog` | Say requirements → get a working website |
| 👨‍💻 Developer saving time | `AlanCodecoding: new build a task API` | Fully automated coding pipeline |
| 🏢 Production project | `AlanCodecoding: pro build an e-commerce backend` | Audit + security + optimization + deployment |
| 🔧 Modify existing project | `AlanCodecoding: modify add export feature` | AI understands your code first, makes precise changes |

---

## 🚀 Why AlanCodecoding?

| Aspect | Traditional AI Assistant | **AlanCodecoding** |
|---|---|---|
| Workflow | Q&A style, you need technical knowledge | **Full automation from requirements to delivery** |
| Code Quality | Hit-or-miss, frequent bugs | **7 heartbeat checks + 5 quality gates, auto-rollback on failure** |
| Project Memory | Starts fresh every time | **3-tier memory system — gets smarter with use** |
| Modifications | You must understand existing code | **Codegraph auto-analyzes code structure, precise changes** |
| Beginner Friendliness | Technical jargon required | **Zero jargon, one-click run scripts** |
| Teamwork | Single AI works alone | **Multi-Agent team: Architect + Implementer + Reviewer + Auditor + Tester + DevOps** |

---

## ✨ 5 Core Advantages

### ❤️ Heartbeat Health Mechanism (Industry First)
Every code change triggers automatic compile + test verification. Bugs trigger auto-rollback to the last healthy state. **100% guarantee that delivered code runs.**

```
Change Code → Compile Check → Test Pass → Heartbeat Commit (git commit [HB-N])
                                         Fail → Auto-rollback to last heartbeat → Fix
```

### 🧠 3-Tier Memory System
- **Project Memory**: Cross-session retention of architecture decisions and code patterns
- **Lessons Learned**: Cross-project accumulation of experience, avoiding repeated mistakes
- **User Preferences**: Remembers your tech preferences (TypeScript vs JS, pnpm vs npm, etc.)

### 👥 Multi-Agent Equal Collaboration
Instead of a single AI working alone, AlanCodecoding operates like a **full development team**:

```
Requirements → 2-3 agents analyze independently then merge
Architecture → 2-3 agents propose solutions then vote
Parallel Coding → Each module gets a dedicated agent (up to 8 concurrent)
Cross Review → Round-robin review (non-bidirectional, prevents collusion)
Code Audit → Dual independent auditors cross-check results
Optimization → Optimization agent + Verification agent dual assurance
```

### 🔍 Codegraph Deep Integration
- **Impact analysis before changes**: `codegraph_callers` finds all callers to assess change scope
- **Natural language code understanding**: Ask "how does this module work?" and get full context
- **Precise rollback**: Quality gate failures only re-run the failed module, not everything

### 🚪 True Out-of-the-Box Experience
- Auto-detects runtime environment (Node/Python/Go)
- Post-delivery run verification ensures the app actually starts
- Generates Windows `start.bat` and Unix `start.sh` **one-click scripts**
- Full Chinese language interface available (see [Chinese version](README.zh-CN.md))

### ⚙️ MCP Server Engine (v1.1.0+)
AlanCodecoding now includes a **TypeScript MCP Server** that provides deterministic tools:

| Tool | What it does | Why it matters |
|---|---|---|
| `scaffold_project` | Generates production-grade project skeleton with JWT auth, structured logging, error handling, CORS, graceful shutdown, Dockerfile, CI/CD, **backup scripts** built-in | Every project starts from the same high-quality foundation, not written from scratch by AI |
| `quality_gates` | Runs compile check + tests + security audit, returns PASS/FAIL deterministically | Quality is **enforced by code**, not by AI self-check |
| `github_search` 🆕 | Searches GitHub for open-source projects matching your requirements | Find battle-tested solutions instead of building from scratch |
| `github_analyze` 🆕 | Clones and analyzes a repo's architecture, tech stack, and structure | Learn from production systems before coding |

---

## 📋 Available Commands

| Command | Function | Best For |
|---|---|---|
| `quick <requirements>` | Template-based fast track, 1 confirmation | Small projects, rapid prototypes |
| `new <requirements>` | Standard new project with architecture confirmation | Full projects |
| `pro <requirements>` | Professional full pipeline with audit/optimization/deploy | Production-grade projects |
| `modify <requirements>` | Modify existing project based on Codegraph analysis | Adding features to existing code |
| `resume` | Resume pipeline from checkpoint | Continue interrupted development |
| `sync` | Sync local skill changes to GitHub | Publish skill updates |
| `template` | List available project templates | See what you can build |

---

## 🛠️ Supported Tech Stack

| Category | Support |
|---|---|
| **Runtime** | Node.js · Python · Go · Java · Rust · PHP |
| **Frontend** | React · Vue · HTML/CSS/JS |
| **Backend** | Express · Fastify · Koa · Flask · FastAPI |
| **Database** | SQLite · PostgreSQL · MySQL |
| **Testing** | Vitest · Jest · Mocha · pytest · go test |
| **CI/CD** | GitHub Actions · GitLab CI |
| **Container** | Docker · Docker Compose |
| **Code Index** | Codegraph MCP (recommended) |

---

## 🔄 Pipeline Overview

```
You: "Build me a blog website"
    ↓
[Phase -1] Codegraph setup check + memory load
[Phase 0]  Project initialization + heartbeat infrastructure
[Phase 1]  Requirements confirmation → AI states assumptions → You confirm
    ↓  (fully automatic from here)
[Phase 2]  Architecture design → Multi-agent tech selection → User confirm
[Phase 3]  Parallel coding → Up to 8 agents coding simultaneously → Cross review → ❤️Heartbeat
[Phase 4]  Full test suite → Unit + Integration + E2E → Coverage ≥ 80%
[Phase 5]  Code audit → Dual independent auditors + security scan → ❤️Heartbeat
[Phase 6]  Optimization → Performance + code cleanup + documentation → ❤️Heartbeat
[Phase 7]  Deployment → Dockerfile + CI/CD + one-click start scripts
[Phase 8]  Run verification → Start app → Confirm it works → 🎉 Deliver
    ↓
✅ "Website created! Run: cd project && npm start"
```

---

## 📦 Quality Guarantees

Every delivered project passes these gates:

| Check | Standard | Failure Handling |
|---|---|---|
| Compile/Type Check | ✅ Zero errors | Auto-fix, never deliver broken code |
| Unit Test Coverage | ✅ ≥ 80% | Precise rollback to failed module |
| Security Vulnerabilities | ✅ Zero high-severity | Mark affected modules, rollback |
| Code Style | ✅ Zero lint errors | Auto-fix then re-verify |
| Application Runtime | ✅ Starts successfully | Diagnose, fix, re-verify |
| Documentation | ✅ README + API docs + start scripts | Complete before delivery |

### Production-Grade Checklist (NEW/PRO modes)

| Category | Items |
|---|---|
| **Security** | Authentication (JWT/Session) · Input validation (Joi/Zod) · CORS · Rate limiting · Safe error messages |
| **Observability** | Structured logging (winston/pino) · Unified error middleware · Health check endpoint |
| **Reliability** | Graceful shutdown (SIGTERM) · API timeout · Connection pool |
| **Configuration** | Environment-specific configs (`.env.development`/`.production`) · Externalized secrets |

---

## 📂 Project Structure

```
.kimi-code/skills/alan-codecoding/
├── SKILL.md                 # Core pipeline (1400+ lines)
├── README.md                # This file (English)
├── README.zh-CN.md          # Chinese version
├── USAGE.md                 # Usage guide (Chinese)
├── CAPABILITIES.md          # Capabilities handbook (Chinese)
├── AGENTS.md                # AI agent development guide
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Contribution guide
├── production-standards.md  # Production-grade standard gap analysis
├── LICENSE                  # MIT License
├── package.json             # npm package info
├── sync_to_github.py        # Auto-sync script
├── mcp-server/              # 🆕 TypeScript MCP Server engine
│   ├── package.json
│   └── src/index.js         # scaffold_project, quality_gates, code_check tools
├── .github/                 # Issue + PR templates
└── references/prompts/      # 6 Agent role prompt templates
    ├── 00-architect.md      # Architect
    ├── 01-implementer.md    # Implementer
    ├── 02-reviewer.md       # Reviewer
    ├── 03-auditor.md        # Auditor
    ├── 04-tester.md         # Tester
    └── 05-devops.md         # DevOps
```

---

## 📖 Documentation

| Document | Description |
|---|---|
| [Chinese Version](README.zh-CN.md) | Full Chinese documentation |
| [Usage Guide (中文)](USAGE.md) | Detailed usage tutorial with scenarios |
| [Capabilities (中文)](CAPABILITIES.md) | Architecture, heartbeat system, memory system |
| [Contributing](CONTRIBUTING.md) | How to contribute |
| [Changelog](CHANGELOG.md) | Version history |

---

## 📄 License

[MIT License](LICENSE) © 2026 AlanHYL
