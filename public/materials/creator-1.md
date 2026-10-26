# 自媒体 AI 工作台

一个 PC 优先、平板可用的创作者工作流应用。未配置 Supabase 时可直接使用浏览器 Mock 数据；配置后启用账号认证、Postgres、RLS 与服务端持久化。

## 已实现

- 11 个可直接访问的页面路由与全局文件夹导航
- 账号画像：定位、核心受众、表达声音、内容支柱、红线与主要平台
- 可追溯来源库：网页元信息读取、SSRF 防护、原文链接、作者、摘录和标签
- 跨来源、素材和稿件的加权检索，并显示匹配原因
- 稿件中心：母稿、多平台版本、原始引用、审阅状态和自动版本号
- 快速记录灵感、灵感/选题转项目
- 素材文件头校验、私有云端上传、TXT/Markdown/PDF 正文提取、图片视觉解析、失败重试、笔记与项目双向关联
- 五阶段项目看板、任务清单、进度自动计算
- 动态月历排期、已发布内容真实快照录入、CSV 全量预检与事务导入、时间/平台趋势筛选、快照历史与互动率摘要
- 灵感、选题、项目、任务、素材、排期和数据快照的完整维护与删除
- 全局搜索、主要列表关键词检索与 20 条分页、JSON/Markdown 导出
- 全局工作流 Agent 侧栏、按页面切换角色与 Mock 降级模式
- Agent 可读取账号画像、来源库与稿件，事实性内容优先使用可追溯来源
- LocalStorage 持久化、1440 桌面与 900 平板响应式布局
- Supabase 邮箱认证、核心业务表、逐表 RLS 与统一服务端 mutation
- 灵感/选题转项目的原子、幂等数据库函数
- Supabase/Mock 双模式数据层

## 本地启动

需要 Node.js 22 或更新版本。

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。

## 质量检查

```bash
npm run typecheck
npm run lint
npm test
npm run build
node tests/smoke.mjs
```

`tests/smoke.mjs` 使用本机 Chrome 执行完整的前端冒烟流程，包括画像保存、来源检索、引用稿件和刷新持久化，并将桌面、AI 展开和平板截图写入 `artifacts/`。

## 环境变量

复制 `.env.example` 为 `.env.local`。不填写 Supabase 参数时，应用自动使用 LocalStorage Mock 模式；填写后自动启用登录与云端工作区。将 `NEXT_PUBLIC_DEMO_MODE=true` 后，即使配置了 Supabase 也会关闭登录注册，直接展示带完整示例数据的公开演示工作台。

## Supabase 配置

1. 创建 Supabase 项目，并取得 Project URL 与 anon key。
2. 使用 Supabase CLI 将 `supabase/migrations/` 应用到项目：

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

3. 在 `.env.local` 填写：

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. 在 Supabase Auth 的 URL Configuration 中加入 `http://localhost:3000/auth/callback`，然后启动应用并注册账号。

新账号登录后可以在“设置”中点击“初始化示例工作区”。该操作只允许空工作区执行，不会覆盖已有数据。

`SUPABASE_SECRET_KEY`（旧项目也可使用 `SUPABASE_SERVICE_ROLE_KEY`）只在服务端用于写入不可由用户篡改的 Agent 运行与审计记录；常规业务 CRUD 仍使用登录用户 JWT 和 RLS。不要把 secret/service-role 或千问密钥添加到 `NEXT_PUBLIC_` 环境变量。

## 千问 AI 配置

AI 侧栏通过服务端调用阿里云百炼千问的 OpenAI 兼容接口。复制 `.env.example` 为 `.env.local`，填写以下配置：

```dotenv
DASHSCOPE_API_KEY=sk-你的百炼APIKey
QWEN_MODEL=qwen-plus
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
AI_MOCK_MODE=false
```

也可以通过 `AI_PROVIDER`、`AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` 与 `AI_EMBEDDING_MODEL` 接入其他 OpenAI-compatible 模型；这些通用配置优先于千问配置。未配置 Embedding 模型时使用关键词检索，配置后自动切换为关键词 + 语义混合检索。

保存后必须重启开发服务器。`DASHSCOPE_API_KEY` 只能写在项目根目录的 `.env.local`，不要写进组件、浏览器代码或任何 `NEXT_PUBLIC_` 变量。若使用百炼新版本的 Workspace 专属域名，请把 `QWEN_BASE_URL` 改为控制台提供的 `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1`。

未填写 Key 或将 `AI_MOCK_MODE` 设为 `true` 时，AI 侧栏自动使用本地降级回复，不影响其他业务功能。

## 工作流 Agent

Supabase 与千问同时启用时，侧边栏使用有边界的工作流 Agent：只读工具和草稿工具可以自动执行；创建灵感、选题、项目、任务、排期或指标等数据变更只会先生成计划，必须由当前用户确认后才会调用原有 `/api/mutations`。

- 单次运行最多 5 个写步骤、8 次工具调用、90 秒
- 确认内容使用 SHA-256 计划快照校验，确认后不会让模型重新生成参数
- 运行通过 `ai_runs`、`ai_tool_calls`、`ai_approvals` 审计，刷新页面后可恢复待确认计划
- 禁止 Agent 删除、批量覆盖、创建虚假素材文件或向外部平台直接发布
- `POST /api/agent/runs` 与确认接口使用类型化 SSE；状态可通过 `GET /api/agent/runs/:id` 恢复

本地 Mock 工作区不具备服务端身份和审计存储，因此继续使用只生成文本的 AI 模式，不执行工作区写操作。

## 当前架构边界

核心结构化数据、私有 Storage 文件上传、PDF/图片解析、CSV 两阶段原子导入和真实数据快照看板已具备 Supabase 服务端模式。大文件异步解析队列、扫描版 PDF OCR、OpenAI Responses API、`pgvector` 与双账号云端隔离 E2E 仍在后续里程碑。
