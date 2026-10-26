# AI 采访教练

一个用于练习采访提问、模拟嘉宾回应和生成训练复盘的 Next.js MVP。

线上版本：

[https://ai-interview-coach-tawny-sigma.vercel.app](https://ai-interview-coach-tawny-sigma.vercel.app)

## 功能

- 选择训练模式、嘉宾类型、选题方向、采访风格和难度
- 自动生成采访提纲
- 在模拟采访页与 AI 嘉宾进行多轮问答
- 采访页内置提词板式大纲，可一键填入问题
- 生成复盘报告，包括总分、六项能力评分、证据、改进建议和可复练提纲
- 历史训练记录保存在当前浏览器本地

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react
- OpenAI SDK 兼容接口

当前默认接入智谱 GLM 兼容 OpenAI Chat Completions API。

## 本地开发

安装依赖：

```bash
npm install
```

复制环境变量示例：

```bash
cp .env.example .env.local
```

填写 `.env.local`：

```bash
GLM_API_KEY=
GLM_BASE_URL=https://open.bigmodel.cn/api/paas/v4
AI_MODEL=glm-5.2
GLM_THINKING_ENABLED=false
GLM_REASONING_EFFORT=high
NEXT_PUBLIC_USE_MOCK_AI=false
NEXT_PUBLIC_APP_NAME=AI采访教练
```

启动开发服务器：

```bash
npm run dev
```

打开：

[http://localhost:3000](http://localhost:3000)

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `GLM_API_KEY` | 服务端模型 API key，不要提交到 Git |
| `GLM_BASE_URL` | GLM/OpenAI 兼容接口地址 |
| `AI_MODEL` | 使用的模型名称 |
| `GLM_THINKING_ENABLED` | 是否启用 GLM thinking |
| `GLM_REASONING_EFFORT` | 推理强度，当前支持 `high` / `max` |
| `NEXT_PUBLIC_USE_MOCK_AI` | 是否强制使用本地兜底模板 |
| `NEXT_PUBLIC_APP_NAME` | 页面应用名 |

`GLM_API_KEY` 等私密变量只应放在：

- 本地 `.env.local`
- Vercel Environment Variables
- 其他部署平台的 Secret 配置

不要写入源码、README、issue、commit message 或浏览器端代码。

## 部署

推荐部署到 Vercel。

1. 在 Vercel 创建项目
2. Framework Preset 选择 `Next.js`
3. 添加 Production 环境变量
4. 部署

也可以使用 CLI：

```bash
npx vercel link
npx vercel deploy --prod
```

如果通过 GitHub 自动部署，需要在 Vercel Dashboard 中授权 GitHub Integration 访问这个仓库。

## 数据保留

当前 MVP 不使用数据库。

训练历史保存在用户浏览器的 `localStorage` 中：

- 同一浏览器刷新后仍可查看历史
- 换设备、换浏览器不会同步
- 用户清理浏览器数据后历史可能丢失
- 项目方默认无法查看用户历史对话

后续如果要正式产品化，可以加入登录系统和数据库，例如 Supabase、Postgres、Firebase 或 Vercel Postgres。

## API key 策略

当前第一阶段采用“部署方 API key”模式：

- 用户访问网站时不需要提供 API key
- 请求由服务端 API route 调用模型
- key 保存在 Vercel 环境变量中
- 浏览器端不会暴露 key

公开分享前建议增加限流、登录或配额控制，避免 API 调用成本失控。

## 常用命令

```bash
npm run dev
npm run build
npm run typecheck
npm run acceptance:smoke
```

注意：当前项目的 `next lint` 会进入 Next.js ESLint 初始化流程，尚未配置为非交互式 lint 命令。

## 项目状态

这是一个 MVP 阶段项目，适合小范围试用和训练流程验证。当前重点是：

- 采访提纲生成
- 模拟采访体验
- 基于真实对话的复盘反馈
- 可复练的问题清单

