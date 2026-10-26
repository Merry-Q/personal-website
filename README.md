# 张嘉琪 · 产品经理作品集

2026-10-27 已完成“黑胶 × 编辑印刷”视觉改版：A/B 吸附目录、真实截图跨页、主次排版、纸面细节与轻量滚动反馈。完整修改说明、截图及验证结果见 [改版说明](../docs/portfolio-design-2026-10-27/改版说明.md)。项目档案与已有案例页内容保持原样。

当前栏目按 2026-10-26 的项目取舍调整：

- **全面落地**：OfferOS、PaperMind、宝宝成长相册、桌面便签板，按此顺序展示。
- **探索创新**：自媒体 AI 工作台、AI 采访教练、知音智能定调、AI 级数谱插件、PRD 结构化生成脚本、星空粒子手势交互、产品与 AI 学习笔记。

栏目用于组织作品；具体能力、依赖和验证边界仍以项目详情为准。个人介绍、经历、联系方式与 ROOTED 视觉风格保留。

## 本地启动

在 `产品经理` 根目录执行：

```powershell
node personal-website/local-dev.mjs home
```

打开 http://localhost:4310/ 。不传 ID 时默认启动主页、OfferOS 和宝宝相册；`--list` 查看入口，`--all` 启动所有保留的可运行网页演示。端口冲突会报错，不杀已有进程、不自动换端口。

| 项目 | ID | 地址 |
|---|---|---|
| 个人主页 | home | http://localhost:4310/ |
| 自媒体 AI 工作台 | creator | http://localhost:4312/ |
| OfferOS 本地演示 | offeros | http://localhost:4316/ |
| AI 采访教练 | interview | http://localhost:4317/ |
| 宝宝相册本地预览 | baby | http://localhost:4318/ |
| 知音概念原型 | dingdiao | http://localhost:4322/ |
| 手势实验 | gesture | http://localhost:4323/ |

PaperMind 使用其当前 README 中记录的体验地址：https://papermind.47.237.109.221.sslip.io/ 。本轮没有复验在线服务，也未修改部署。其本地完整启动方法见 `paperMind/README.md`，新生成依赖模型配置。

桌面便签板是 Windows 应用：在 `桌面便签板/app` 执行 `npm start`；没有伪造网页入口。

保留原技术栈和依赖。启动器只监听本机，子进程使用隔离的本地/演示配置，不修改原 `.env`。OfferOS 测试数据与远程环境分离；宝宝相册完整上传/家庭协作仍需要数据库和 OSS。

## 内容维护与验证

`portfolio.json` 是项目档案，`local-services.json` 是本地入口配置。更新后执行：

```powershell
python personal-website/prepare-portfolio.py
node personal-website/local-check.mjs home
node personal-website/verify-local.mjs
```

本机系统 Node 24.13.0 在本轮 Vite 构建中曾发生原生进程崩溃；已使用机器上现有 Node 24.22.1 完成构建，无需改动系统安装：

```powershell
& 'C:/Users/Tina/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' personal-website/local-check.mjs home
```

生产包包含主页和四个已有案例页。构建保留 Three.js 大包提示；案例页经典脚本由配置显式复制，其 Vite 提示不影响脚本产物。主站已通过桌面、平板和手机浏览器验证，在线产品和案例页外部 CDN 能力不在本次视觉改版验收范围内。

浏览器检查需要主页已启动，使用现有 `playwright-core` 和 Windows Chrome。当前共 11 个档案、23 个资料入口。准备脚本只复制白名单资料，不复制环境配置或整个研究目录。本轮已构建并定向清理删除项目的旧构建资料和截图残留。

本次项目删除清单与验证记录见 `docs/portfolio-update-2026-10-26/`；`docs/portfolio-audit-2026-10-10/` 是历史验收记录，不代表当前目录或分类。根目录 `local-*-fix.py`、`local-*-edit.py` 等是上轮一次性迁移脚本，勿重复执行。

仓库：https://github.com/Merry-Q/personal-website 。在线入口：http://47.237.109.221/ 。原先的 `https://home.47.237.109.221.sslip.io/` 会跳到 IP 根路径。OfferOS 在 `https://offeros.47.237.109.221.sslip.io/`。

构建静态包后，把 `dist/` 同步到服务器 `/opt/1panel/apps/openresty/openresty/www/personal-website`，并将 `deploy/home.nginx.conf` 放到 OpenResty `conf.d/home.conf` 后重载。证书与相册、PaperMind 一样走 Let's Encrypt webroot，续期沿用 `papermind-cert-renew.timer`。
