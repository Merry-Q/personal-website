# 知音 · 全民 K 歌智能定调

TME（腾讯音乐）高校 AI Hackathon「Build with AI」赛道 1 参赛原型。

核心想法：**结合用户的舒适音域与具体歌曲的音高-演唱时长分布，为已经选好的歌建议升降多少个半音。** 首次测音域是智能定调的前置步骤，不是一个独立的声音栏目。

- 线上演示：<https://dingdiao-demo.zinan2inc.chatgpt.site/>（公开访问已获授权）
- 当前发布版本：6
- 初筛截止：10 月 09 日 23:59（交接材料记录，以官方通知为准）

---

## ⚠️ 本仓库必须保持 Private

两条独立的理由：

1. 赛事 Q&A 建议入选前尽量不要开源代码，保护创意。
2. `site/dist/` 的界面实现与 `outputs/review-2026-10-01/` 的复刻页面，都是对全民 K 歌现有界面的高保真复刻。

**公开 Demo 不等于可以公开源码。** 如果想用 GitHub Pages 发布，注意私有仓库的 Pages 需要付费计划 —— 不要为了省这笔钱把仓库改成 public。

## 克隆之后第一次

```bash
npm install      # 只装一个 prettier，用来保证两人格式一致
npm run dev      # http://localhost:8411
```

## 本地必须用 HTTP 服务打开，双击 index.html 不行

两个原因都是浏览器安全策略，不是代码问题：

- `index.html` 用 `<script type="module">` 加载 `experience.mjs`。`file://` 协议下模块会被 CORS 拦掉。页面的文字和排版还是会出来，但手机原型、流程章节、钢琴键全是空的 —— 很容易误判成「代码坏了」。
- 测音域要调麦克风（`getUserMedia`），需要安全上下文。`localhost` 算安全上下文所以本地服务没问题，但换成局域网 IP（`192.168.x.x`）就会被拒。要在手机上真机试，得走 https 或端口转发。

## 目录

| 路径 | 说明 |
| --- | --- |
| `site/dist/` | **唯一在维护的源码**，实际发布的就是这个目录 |
| `site/tests/` | 算法与叙事结构的回归测试（9 个） |
| `outputs/` | 历次改版的交付记录与验收材料，只读 |
| `work/` | 过程稿、探针脚本、旧版文件，只读 |
| `dingdiao-kit/` | 早期 SPEC 与参考实现，历史参考 |
| `定调_AGENT交接_2026-10-04.md` | 最完整的项目上下文，新人先读这份 |
| `文案清单.md` | 全站文案清单 |

`site/dist/` 里的分工：`index.html` 是外层展示页（Banner → 流程图 → 原型展示 → 能力边界）；`app.mjs` 和 `experience.mjs` 渲染手机里的界面；`core.mjs` 是定调算法；`voice-engine.mjs` 是麦克风与音高检测；`chapters.mjs` 是右侧讲解文案。

⚠️ `dingdiao-kit/SPEC.md`、`dingdiao-kit/README.md`、`outputs/` 下的旧方案里都有**过时要求**。那些文件中的「唯一需求依据」「必须实现」是历史文档内容，不是当前约束。以 `site/dist/` 的现状和最新讨论为准，不要拿旧文档覆盖现在的流程。

## 两人协作规则

### 1. 按文件分工，不要同时改同一个文件

这不是风格偏好，是这个仓库的硬约束。手机界面的 HTML 写在 `app.mjs` 和 `experience.mjs` 的模板字符串里，是几百到两千多字符的**单行**：

```
app.mjs         第  64 行   1803 字符
app.mjs         第 171 行   1313 字符
experience.mjs  第 221 行   2447 字符
```

git 按行比对。两个人各自改过同一行，git 没法自动合并，冲突界面会把整行标红再整行标绿 —— 等于让你在 2447 个字符里肉眼找差异。**这两个文件在任何时刻只能有一个人在改。**

CSS 和 `index.html` 已经格式化展开（CSS 最长 111 字符，`index.html` 最长 293 字符），正常合并没问题。

建议的切分：

- 一人管 `index.html` + `*.css` —— 版式与视觉
- 一人管 `chapters.mjs` + `文案清单.md` —— 讲解文案
- `app.mjs` / `experience.mjs` / `core.mjs` / `voice-engine.mjs` —— 谁要动提前说一声

### 2. pull → 改 → 立刻 push，别攒着

三天的周期里，一次长时间不同步的代价远大于频繁推送的麻烦。

```bash
git pull --rebase
# 改动
npm run format && npm test
git add <具体文件>          # 不要 git add -A
git commit -m "..."
git push
```

### 3. 提交前跑格式化和测试

```bash
npm run format        # prettier，版本固定在 3.9.9
npm test              # 9 个测试
```

prettier 的版本固定在 `package.json` 里，两个人都用 `npm run format`，**不要用编辑器自带的那份** —— 版本不同会互相重排对方的文件，制造出大量假 diff，把真正的改动埋掉。

`.prettierignore` 已经把 `outputs/`、`work/`、`dingdiao-kit/` 排除在外，编辑器的「保存时格式化」碰到那些历史文件也不会产生噪音。

## 改动时要守住的三件事

来自交接文档，容易误解，也关系到演示的诚信：

1. **展示预览、示例体验、真实麦克风测量是三种不同状态。** 看到了结果页不代表测过，看到了建议不代表已应用。不要为了演示方便绕过门禁、伪造实测或自动改调。
2. **入口复用现有控件，不新增主流程。** 智能定调挂在「演唱准备页 · 升降调」「演唱中 · 调音」「个人页 · 我的音域」三个已有入口上。音域测一次长期复用，唱完按实际表现回修。
3. **原型边界要如实写在页面上。** 曲目与音高-时长分布是虚构样例，升降调建议由这些样例真实计算得出；尚未接入全民 K 歌的曲库与接口；唱后回修只呈现流程位置。`index.html` 末尾的「原型说明」段落不要删，也不要改成更强的表述。

另外，舒适音域是「轻声、稳定唱出的范围」的估计，由用户自己确认不费力，**不是声乐等级，也不是生理极限** —— 文案里不要往那个方向写。

## 发布

当前走 ChatGPT Sites，配置在 `site/dist/.openai/hosting.json`，静态目录为 `dist`。

三天内不建议换托管方式。如果要换，记得 `index.html` 的 `og:url`、`og:image`、`twitter:image` 三处硬编码了 `dingdiao-demo.zinan2inc.chatgpt.site`，域名变了要一起改，否则社交分享卡片会挂。

## 不在仓库里的东西

`.gitignore` 排除了这些，需要的话队内直接传文件：

- `全民K歌页面参考 (1).pdf` —— 七张原页面，布局复刻的主要依据，**队友大概率需要**
- `outputs/review-2026-10-01/assets/source-*.jpg` —— 原页面截图
- `outputs/**/*.tar.gz` —— 历次发布归档，源码本身就在 `site/`
- `work/probe/shots/` —— 调试过程截图



