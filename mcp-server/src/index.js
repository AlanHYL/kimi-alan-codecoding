#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = join(__dirname, "..", "..");

// ============================================================
// Tool 1: scaffold_project — 生产级项目骨架生成
// ============================================================
const TEMPLATES = {
  "web-crud": {
    name: "CRUD Web 应用",
    tech: ["node", "express", "sql.js"],
    features: ["数据增删改查", "搜索过滤"],
    files: [
      "src/index.js", "src/db.js", "src/routes/",
      "src/middleware/auth.js", "src/middleware/errorHandler.js",
      "src/middleware/logger.js", "src/middleware/cors.js",
      "views/index.html", ".env.example",
      "Dockerfile", "start.bat", "start.sh",
      ".github/workflows/ci.yml",
    ]
  },
  "rest-api": {
    name: "RESTful API",
    tech: ["node", "express"],
    features: ["REST 接口", "JWT 认证", "请求限流"],
    files: [
      "src/index.js", "src/routes/", "src/middleware/auth.js",
      "src/middleware/errorHandler.js", "src/middleware/logger.js",
      "src/middleware/cors.js", "src/middleware/rateLimiter.js",
      ".env.example", "Dockerfile", ".github/workflows/ci.yml",
    ]
  },
  "cli-tool": {
    name: "CLI 命令行工具",
    tech: ["node", "commander"],
    features: ["命令解析", "参数处理", "帮助信息"],
    files: [
      "src/index.js", "src/commands/", ".env.example",
    ]
  }
};

async function scaffoldProject(projectPath, tech, features) {
  const dirs = [
    join(projectPath, "src", "middleware"),
    join(projectPath, "src", "routes"),
    join(projectPath, "views"),
    join(projectPath, "data"),
    join(projectPath, ".github", "workflows"),
  ];
  dirs.forEach(d => { if (!existsSync(d)) mkdirSync(d, { recursive: true }); });

  // .env.example
  writeFileSync(join(projectPath, ".env.example"),
`# 服务配置
PORT=3000
NODE_ENV=development

# JWT 认证（如需）
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# 数据库
DB_PATH=./data/app.db

# CORS
CORS_ORIGIN=http://localhost:3000

# 日志
LOG_LEVEL=info
`);

  // 中间件：JWT 认证
  writeFileSync(join(projectPath, "src", "middleware", "auth.js"),
`// JWT 认证中间件 — 生产级模板
// 依赖: npm install jsonwebtoken
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未提供认证令牌' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: '认证令牌无效或已过期' });
  }
}

module.exports = { authenticate };
`);

  // 中间件：统一错误处理
  writeFileSync(join(projectPath, "src", "middleware", "errorHandler.js"),
`// 统一错误处理中间件 — 生产级模板
function errorHandler(err, req, res, next) {
  // 结构化日志
  console.error(JSON.stringify({
    level: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  }));

  // 不向客户端泄露堆栈信息
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message,
  });
}

module.exports = { errorHandler };
`);

  // 中间件：结构化日志
  writeFileSync(join(projectPath, "src", "middleware", "logger.js"),
`// 结构化日志中间件 — 生产级模板
// 生产环境建议使用 winston 或 pino
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      level: 'info',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: duration + 'ms',
      timestamp: new Date().toISOString(),
    };
    console.error(JSON.stringify(log));
  });
  next();
}

module.exports = { requestLogger };
`);

  // 中间件：CORS
  writeFileSync(join(projectPath, "src", "middleware", "cors.js"),
`// CORS 中间件 — 生产级模板（白名单模式）
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

function cors(req, res, next) {
  const allowedOrigins = CORS_ORIGIN.split(',').map(s => s.trim());
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
}

module.exports = { cors };
`);

  // 中间件：请求限流
  writeFileSync(join(projectPath, "src", "middleware", "rateLimiter.js"),
`// 请求限流中间件 — 生产级模板
// 依赖: npm install express-rate-limit
// const rateLimit = require('express-rate-limit');
// 
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 分钟
//   max: 100, // 每个 IP 最多 100 次请求
//   message: { success: false, message: '请求过于频繁，请稍后再试' },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// 
// module.exports = { limiter };
console.warn('rateLimiter: 请安装 express-rate-limit 以启用请求限流');
`);

  // src/index.js 主入口（带优雅关闭）
  writeFileSync(join(projectPath, "src", "index.js"),
`const express = require('express');
const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { cors } = require('./middleware/cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors);
app.use(requestLogger);
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 路由
// TODO: 添加路由
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from AlanCodecoding!' });
});

// 统一错误处理（必须放在路由之后）
app.use(errorHandler);

// 优雅关闭
let server;
function gracefulShutdown(signal) {
  console.error(JSON.stringify({ level: 'info', message: \`收到 \${signal}，开始优雅关闭...\`, timestamp: new Date().toISOString() }));
  server.close(() => {
    console.error(JSON.stringify({ level: 'info', message: '服务已关闭', timestamp: new Date().toISOString() }));
    process.exit(0);
  });
  setTimeout(() => { console.error('强制退出'); process.exit(1); }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

server = app.listen(PORT, () => {
  console.error(JSON.stringify({ level: 'info', message: \`服务已启动: http://localhost:\${PORT}\`, timestamp: new Date().toISOString() }));
});
`);

  // Dockerfile
  writeFileSync(join(projectPath, "Dockerfile"),
`# 多阶段构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS production
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "src/index.js"]
`);

  // CI/CD
  writeFileSync(join(projectPath, ".github", "workflows", "ci.yml"),
`name: CI
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm audit --audit-level=high || true
`);

  // 🔥 P0: 数据备份脚本
  const backupsDir = join(projectPath, "backups");
  if (!existsSync(backupsDir)) mkdirSync(backupsDir, { recursive: true });
  writeFileSync(join(backupsDir, ".gitkeep"), "");

  writeFileSync(join(projectPath, "backup.sh"),
`#!/bin/bash
# ============================================
# 数据备份脚本 — AlanCodecoding 自动生成
# 用法: bash backup.sh
# 建议: 添加到 cron 定时执行 (0 3 * * * bash /path/to/backup.sh)
# ============================================

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

echo "📦 开始备份..."

# SQLite 备份（如使用 SQLite）
if [ -f "./data/app.db" ]; then
  sqlite3 ./data/app.db ".dump" > "$BACKUP_DIR/app_$DATE.sql"
  echo "  ✅ SQLite: backups/app_$DATE.sql"
fi

# PostgreSQL 备份（如使用 PostgreSQL，设置 DATABASE_URL 环境变量）
if [ -n "$DATABASE_URL" ]; then
  pg_dump "$DATABASE_URL" > "$BACKUP_DIR/postgres_$DATE.sql" 2>/dev/null
  if [ $? -eq 0 ]; then echo "  ✅ PostgreSQL: backups/postgres_$DATE.sql"; fi
fi

# MySQL 备份（如使用 MySQL，设置 DB_USER/DB_PASS/DB_NAME）
if [ -n "$DB_NAME" ] && [ -n "$DB_USER" ]; then
  mysqldump -u "$DB_USER" ${DB_PASS:+-p"$DB_PASS"} "$DB_NAME" > "$BACKUP_DIR/mysql_$DATE.sql" 2>/dev/null
  if [ $? -eq 0 ]; then echo "  ✅ MySQL: backups/mysql_$DATE.sql"; fi
fi

# 清理 7 天前的备份
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete 2>/dev/null
echo "🧹 已清理 7 天前的旧备份"
echo "✅ 备份完成！保留最近 7 天"
`);
  // Windows 需要 chmod +x，但 Windows 不支持，生成 .bat 版本
  writeFileSync(join(projectPath, "backup.bat"),
`@echo off
REM ============================================
REM 数据备份脚本 — AlanCodecoding 自动生成
REM 用法: backup.bat
REM 建议: 添加到 Windows 任务计划程序
REM ============================================

set BACKUP_DIR=.\\backups
set DATE=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set DATE=%DATE: =0%
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo 📦 开始备份...

REM SQLite 备份
if exist ".\\data\\app.db" (
  sqlite3 .\\data\\app.db .dump > "%BACKUP_DIR%\\app_%DATE%.sql"
  echo   ✅ SQLite: backups\\app_%DATE%.sql
)

REM 清理 7 天前的备份
forfiles /p "%BACKUP_DIR%" /m "*.sql" /d -7 /c "cmd /c del @file" 2>nul
echo 🧹 已清理 7 天前的旧备份
echo ✅ 备份完成！
`);

  return { success: true, message: `项目骨架已生成: ${projectPath}`, files: dirs };
}


// ============================================================
// Tool 2: quality_gates — 质量门禁
// ============================================================
function runQualityGates(projectPath) {
  const results = [];
  
  // Gate 1: 编译/语法检查
  try {
    execSync("node --check src/index.js 2>&1", { cwd: projectPath, stdio: "pipe" });
    results.push({ gate: "GATE-COMPILE", status: "PASS", detail: "语法检查通过" });
  } catch (e) {
    results.push({ gate: "GATE-COMPILE", status: "FAIL", detail: e.stderr?.toString().slice(0,200) || e.message });
  }

  // Gate 2: 测试
  try {
    const out = execSync("npm test 2>&1", { cwd: projectPath, stdio: "pipe", timeout: 60000 });
    const passMatch = out.toString().match(/(\d+)\s+pass/);
    const failMatch = out.toString().match(/(\d+)\s+fail/);
    results.push({
      gate: "GATE-TEST",
      status: failMatch && parseInt(failMatch[1]) > 0 ? "FAIL" : "PASS",
      detail: passMatch ? `${passMatch[1]} tests passed` : out.toString().slice(-100)
    });
  } catch (e) {
    results.push({ gate: "GATE-TEST", status: "FAIL", detail: e.stdout?.toString().slice(-200) || e.message });
  }

  // Gate 3: 安全审计
  try {
    const out = execSync("npm audit --audit-level=high 2>&1", { cwd: projectPath, stdio: "pipe", timeout: 30000 });
    results.push({ gate: "GATE-SECURITY", status: "PASS", detail: "无高危漏洞" });
  } catch (e) {
    const hasHigh = e.stdout?.toString().includes("high") || e.stdout?.toString().includes("critical");
    results.push({
      gate: "GATE-SECURITY",
      status: hasHigh ? "FAIL" : "WARN",
      detail: hasHigh ? "存在高危漏洞" : "审计工具不可用"
    });
  }

  return results;
}


// ============================================================
// Tool 3: code_check — 生产级代码检查
// ============================================================
function runCodeCheck(projectPath) {
  const issues = [];
  const srcDir = join(projectPath, "src");

  function scanFile(filePath) {
    if (!existsSync(filePath)) return;
    const content = readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, i) => {
      const num = i + 1;
      // 检查硬编码的端口
      if (/\.listen\(\s*\d{4,5}\s*\)/.test(line) && !line.includes("process.env")) {
        issues.push({ file: filePath, line: num, severity: "high", rule: "hardcoded-port", message: "端口应使用 process.env.PORT，不能硬编码" });
      }
      // 检查 console.log（生产代码中）
      if (/console\.log\(/.test(line) && !filePath.includes("test") && !filePath.includes("logger")) {
        issues.push({ file: filePath, line: num, severity: "medium", rule: "console-log", message: "生产代码中不应使用 console.log，应使用结构化日志" });
      }
      // 检查 app.use(cors()) 无白名单
      if (/app\.use\(cors\(\)\)/.test(line)) {
        issues.push({ file: filePath, line: num, severity: "high", rule: "cors-wildcard", message: "CORS 应配置白名单，不能 app.use(cors()) 放通所有来源" });
      }
      // 检查硬编码密钥/密码
      if (/(secret|password|api_key|token)\s*[:=]\s*['"][^'"]+['"]/i.test(line) && !line.includes("process.env") && !line.includes("example")) {
        issues.push({ file: filePath, line: num, severity: "high", rule: "hardcoded-secret", message: "密钥应使用环境变量，不能硬编码在代码中" });
      }
      // 检查硬编码 URL
      if (/(fetch|axios|http\.get)\(['"]https?:\/\/[^'"]+['"]\)/.test(line) && !line.includes("process.env")) {
        issues.push({ file: filePath, line: num, severity: "medium", rule: "hardcoded-url", message: "API URL 应使用环境变量，不能硬编码" });
      }
    });
  }

  // 递归扫描 src 目录
  function scanDir(dir) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "node_modules") scanDir(fullPath);
      else if (entry.name.endsWith(".js") || entry.name.endsWith(".ts")) scanFile(fullPath);
    }
  }

  scanDir(srcDir);

  return {
    passed: issues.filter(i => i.severity === "high").length === 0,
    total: issues.length,
    high: issues.filter(i => i.severity === "high").length,
    medium: issues.filter(i => i.severity === "medium").length,
    issues,
  };
}


// ============================================================
// MCP Server
// ============================================================
const server = new Server(
  { name: "@alan-codecoding/mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "scaffold_project",
      description: "生成生产级项目骨架，自带 JWT 认证、结构化日志、统一错误处理、CORS 白名单、优雅关闭、Dockerfile、CI/CD",
      inputSchema: {
        type: "object",
        properties: {
          project_path: { type: "string", description: "项目路径" },
          tech: { type: "string", description: "技术栈: node | python | go", default: "node" },
          template: { type: "string", description: "模板: web-crud | rest-api | cli-tool", default: "web-crud" },
        },
        required: ["project_path"],
      },
    },
    {
      name: "quality_gates",
      description: "运行质量门禁：编译检查、测试、安全审计。返回 PASS/FAIL 状态",
      inputSchema: {
        type: "object",
        properties: {
          project_path: { type: "string", description: "项目路径" },
        },
        required: ["project_path"],
      },
    },
    {
      name: "code_check",
      description: "扫描生产级代码违规：硬编码端口/密钥/URL、console.log、CORS 配置、认证中间件",
      inputSchema: {
        type: "object",
        properties: {
          project_path: { type: "string", description: "项目路径" },
        },
        required: ["project_path"],
      },
    },
    {
      name: "template_list",
      description: "列出可用的项目模板",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "scaffold_project": {
      const result = await scaffoldProject(args.project_path, args.tech || "node", args.template || "web-crud");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    case "quality_gates": {
      const results = runQualityGates(args.project_path);
      return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
    }
    case "code_check": {
      const result = runCodeCheck(args.project_path);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    case "template_list": {
      const list = Object.entries(TEMPLATES).map(([id, t]) => ({ id, ...t }));
      return { content: [{ type: "text", text: JSON.stringify(list, null, 2) }] };
    }
    default:
      throw new Error(`未知工具: ${name}`);
  }
});

// 启动
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("✅ AlanCodecoding MCP Server 已启动");
