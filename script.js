import * as THREE from "three";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const storyData = [
  {
    booklet: 0,
    url: "http://123.56.217.207/",
    visual: "offer",
    image: new URL("./images/demo/offeros-demo.png", import.meta.url).href, imageAlt: "OfferOS 岗位分析真实 Demo 界面", stageTitle: "岗位分析 · 匹配报告", stageCaption: "真实 Demo · 决策 → 证据 → 行动",
    workflow: ["问题定义","规则与 Agent","原型验证","部署上线"],
    side: "SIDE A", title: "OfferOS",
    hook: "把“我适不适合这个岗位”，变成可解释、可行动的决策。",
    description: "从简历解析、JD 解码、三维评分到六模块行动报告，独立完成 PRD、产品设计、多 Agent 职责边界与云服务器上线。",
    credits: [["ROLE","独立产品设计与落地"],["METHOD","多 Agent / 可解释评分"],["OUTPUT","0 → 1 上线"]],
    lyric: "硬门槛独立校正，不让加权平均掩盖关键风险。"
  },
  {
    booklet: 1,
    visual: "paper",
    workflow: ["研究痛点","RAG 链路","溯源交互","验收验证"],
    side: "SIDE A", title: "PaperMind",
    hook: "让论文阅读从“摘抄信息”，走向“建立观点”。",
    description: "面向硕博研究生设计单篇速读、多篇综述和引用溯源链路，把幻觉控制做成用户可感知、可核验的核心体验。",
    credits: [["ROLE","产品定义 / 原型"],["METHOD","RAG / 引用溯源"],["GOAL","阅读时间缩短 50%"]],
    lyric: "每一句生成内容，都应该知道自己从哪里来。"
  },
  {
    booklet: 2,
    url: "http://101.201.246.63/",
    visual: "baby",
    image: new URL("./images/demo/baby-album-demo.png", import.meta.url).href, imageAlt: "宝宝成长相册真实 Demo 首页", stageTitle: "家庭时间轴 · 成长记录", stageCaption: "真实 Demo · 私密记录 · 家庭共写",
    workflow: ["家庭场景","权限设计","全栈实现","部署验收"],
    side: "SIDE A", title: "宝宝成长相册",
    hook: "把散落在聊天记录里的成长瞬间，收成家人共用的一本私密相册。",
    description: "独立完成家庭相册的产品定义与上线：两步记录、时间轴浏览、限时邀请与角色权限，照片默认私有、仅家庭可见。",
    credits: [["ROLE","独立产品设计与落地"],["METHOD","家庭权限 / 私密存储"],["OUTPUT","0 → 1 上线"]],
    lyric: "记录不是发朋友圈，而是家人一起续写孩子的时间。"
  },
  {
    booklet: 3,
    visual: "emotion",
    image: new URL("./images/demo/emotion-archive-demo.png", import.meta.url).href, imageAlt: "未言档案馆真实 Demo 首页", stageTitle: "未言档案馆 · 倾诉入口", stageCaption: "真实 Demo · 倾诉 → 提纯 → 私密归档",
    workflow: ["问题重写","人群比较","访谈设计","决策信号"],
    side: "SIDE A", title: "情绪档案馆",
    hook: "不急着做功能，先找到真正值得被记录的情绪。",
    description: "比较产后母亲、长期照护者、求职受挫青年等高压场景，收窄目标人群，定义访谈样本和进入产品阶段的决策信号。",
    credits: [["ROLE","方向研究"],["METHOD","用户细分 / 机会识别"],["BOUNDARY","隐私与危机干预"]],
    lyric: "数据证明问题存在，访谈判断用户是否愿意这样解决。"
  },
  {
    visual: "creator", image: new URL("./images/demo/creator-workbench-demo.png", import.meta.url).href, imageAlt: "自媒体 AI 工作台真实 Demo 工作台", stageTitle: "创作编辑部 · 今日工作台", stageCaption: "真实 Demo · 灵感 → 制作 → 排期 → 复盘",
    workflow: ["灵感收集","内容制作","发布排期","数据复盘"], side: "SIDE B", title: "自媒体 AI 工作台",
    hook: "把散落的灵感、素材和排期，收进一条可持续运转的创作流水线。",
    description: "完成灵感池、素材管理、制作看板、发布日历与数据后台，并设计有确认边界的工作流 Agent。",
    credits: [["ROLE","独立产品设计与开发"],["METHOD","工作流 Agent / 数据闭环"],["OUTPUT","8 个核心页面"]], lyric: "AI 不替创作者拍板，而是让每个下一步更清楚。"
  },
  {
    visual: "sticky", image: new URL("./images/demo/desktop-sticky-demo.png", import.meta.url).href, imageAlt: "桌面便签板真实 Demo 新建便签界面", stageTitle: "桌面便签板 · 快速记录", stageCaption: "真实 Demo · 悬浮入口 · 桌面常驻",
    workflow: ["快速唤起","输入内容","选择颜色","贴到桌面"], side: "SIDE B", title: "桌面便签板",
    hook: "把一闪而过的念头，直接贴在每天都会看见的桌面上。",
    description: "基于 Electron 实现桌面悬浮入口、便签创建编辑、拖拽缩放、多色主题与本地持久化。",
    credits: [["ROLE","产品设计与客户端开发"],["METHOD","Electron / 本地存储"],["OUTPUT","Windows 桌面应用"]], lyric: "记录动作越短，想法留下来的机会就越大。"
  }
];

function projectStage(data) {
  if (data.image) return `
    <div class="project-stage is-${data.visual}" aria-label="${data.title} 产品效果预览">
      <div class="stage-window image-window">
        <div class="stage-chrome"><i></i><i></i><i></i><span>${data.stageTitle}</span></div>
        <img src="${data.image}" alt="${data.imageAlt}">
      </div>
      <div class="stage-caption"><span>LIVE PRODUCT CAPTURE</span><strong>${data.stageCaption}</strong></div>
    </div>`;
  if (data.visual === "baby") return `
    <div class="project-stage is-baby" aria-label="宝宝成长相册产品效果预览">
      <div class="stage-window image-window">
        <div class="stage-chrome"><i></i><i></i><i></i><span>宝宝成长相册 · 家庭时间轴</span></div>
        <img src="/images/baby-album/home-concept.png" alt="宝宝成长相册首页时间轴界面">
      </div>
      <div class="stage-caption"><span>真实产品设计稿</span><strong>私密记录 · 家庭共写 · 时间回看</strong></div>
    </div>`;
  if (data.visual === "paper") return `
    <div class="project-stage is-paper" aria-label="PaperMind 产品效果预览">
      <div class="stage-window paper-window">
        <div class="stage-chrome"><i></i><i></i><i></i><span>PaperMind · 论文速读</span></div>
        <div class="paper-preview"><aside><strong>论文库</strong><span class="active">Attention Is All You Need</span><span>RAG Survey</span><span>Agent Systems</span></aside><main><span class="paper-tag">STRUCTURED NOTE</span><h4>核心方法与结论</h4><p>将本文提出的方法、实验结论与创新点分开呈现。</p><div class="citation-line"><i></i><span>原文证据 · Page 4</span></div><div class="citation-line"><i></i><span>原文证据 · Page 7</span></div></main></div>
      </div>
      <div class="stage-caption"><span>单篇速读到多篇综述</span><strong>结构 → 对比 → 引用溯源</strong></div>
    </div>`;
  if (data.visual === "emotion") return `
    <div class="project-stage is-emotion" aria-label="情绪档案馆研究效果预览">
      <div class="stage-window emotion-window">
        <div class="stage-chrome"><i></i><i></i><i></i><span>情绪档案馆 · 机会研究</span></div>
        <div class="emotion-preview"><header><span>人群机会矩阵</span><strong>谁的哪种情绪值得被记录？</strong></header><div class="matrix"><i></i><i></i><span class="dot one">产后母亲</span><span class="dot two">家庭照护者</span><span class="dot three">求职青年</span><span class="dot four">辅助生殖</span></div></div>
      </div>
      <div class="stage-caption"><span>研究交付物</span><strong>人群比较 · 访谈方案 · 决策标准</strong></div>
    </div>`;
  return `
    <div class="project-stage is-offer" aria-label="OfferOS 产品效果预览">
      <div class="stage-window offer-window">
        <div class="stage-chrome"><i></i><i></i><i></i><span>OfferOS · 岗位行动报告</span></div>
        <div class="offer-preview"><aside><strong>OfferOS</strong><span>今日工作台</span><span>岗位匹配</span><span>投递看板</span><span>个人资产</span></aside><main><p>AI 产品经理 · 匹配报告</p><div class="offer-score"><strong>86</strong><span>值得冲刺</span></div><div class="score-bars"><i style="--score:82%"></i><i style="--score:76%"></i><i style="--score:88%"></i></div><div class="offer-actions"><span>必须修改 3 项</span><span>面试重点 4 项</span></div></main></div>
      </div>
      <div class="stage-caption"><span>从岗位导入到行动报告</span><strong>决策 → 证据 → 行动</strong></div>
    </div>`;
}

const note = $("#track-notes");
function renderTrack(button) {
    const index = Number(button.dataset.track);
    const data = storyData[index];
    $$("#story-tracks li").forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
    note.animate([{ opacity: .35, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 360, easing: "ease-out" });
    note.innerHTML = `
      <div class="note-top"><span>TRACK ${String(index + 1).padStart(2,"0")}</span><span>${data.side}</span></div>
      ${(Number.isInteger(data.booklet) || data.url) ? `<div class="note-actions note-actions-top">
        ${Number.isInteger(data.booklet) ? `<button class="booklet-trigger" type="button" data-booklet="${data.booklet}"><span>打开项目歌词本</span><i>↗</i></button>` : ""}
        ${data.url ? `<a class="booklet-trigger" href="${data.url}" target="_blank" rel="noopener noreferrer"><span>访问线上版本</span><i>↗</i></a>` : ""}
      </div>` : ""}
      ${projectStage(data)}
      <h3>${data.title}</h3>
      <p class="track-hook">${data.hook}</p>
      <p class="track-description">${data.description}</p>
      <div class="credit-grid">${data.credits.map(([label,value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>
      <div class="workflow-strip" aria-label="项目工作流程">${data.workflow.map((step, stepIndex) => `${stepIndex ? "<i></i>" : ""}<span>${step}</span>`).join("")}</div>
      <div class="lyric-line"><i></i><span>“${data.lyric}”</span></div>`;
    note.querySelectorAll("[data-booklet]").forEach((button) => {
      button.addEventListener("click", (event) => openBooklet(Number(event.currentTarget.dataset.booklet)));
    });
}

$$("[data-track]").forEach((button) => {
  button.addEventListener("mouseenter", () => renderTrack(button));
  button.addEventListener("focus", () => renderTrack(button));
  button.addEventListener("click", () => renderTrack(button));
});

const bookletData = [
  {
    title: "OfferOS",
    catalog: "PROJECT BOOKLET · TRACK 01 · SIDE A",
    spreads: [
      {
        left: ["项目序曲","为什么做","求职者手里有简历和 JD，却很难回答一个更重要的问题：我现在应该投吗？","现有工具常给出一个看似精确的匹配分，但无法解释差距，更无法告诉用户下一步该做什么。",["匹配结果缺少证据，用户无法信任","岗位硬门槛被平均分掩盖","分析结束后没有行动承接"]],
        right: ["PROJECT BRIEF","产品定位","一位面向求职者的专属求职顾问。它不替用户做决定，而是把岗位要求、个人证据与竞争风险整理成可解释的行动建议。","从“生成一个分数”转向“支持一次求职决策”。",["目标用户：需要判断投递优先级的求职者","核心任务：看清胜任度、证明力与竞争风险","产品边界：不承诺录用，不编造简历证据"]]
      },
      {
        left: ["工作流程","完整主链路","把一次求职决策压成连续动作，用户始终知道自己在哪一步、下一步该做什么。","今日工作台 → 统一导入 JD → 确认岗位 → 批量决策 → 行动报告 → 投递看板 → 面试准备。",["工作台汇聚今日进度、优先待办和未完成批次","支持链接、文本 JD 与截图 OCR 混合导入","规则优先切分岗位，低置信度再交给快模型","确认页合并重复岗位，避免重复判分"]],
        right: ["工作流程","从判断到行动","分析结束后必须接到真实求职动作，而不是停在一份长报告上。","批量决策可刷新恢复、失败重试；报告完成后进入投递看板推进状态。",["多简历粗排，Top 2 并行真实 Judge","报告含行动摘要、必须修改项和面试重点","看板六态：待决策、待改简历、待投、已投、面试中、结束","个人资产沉淀证据池、故事库和改写草稿"]]
      },
      {
        left: ["关键段落","可解释评分","评分由胜任、证明与竞争三个维度组成，硬门槛独立校正，不参与简单加权。","这避免“整体得分不错”掩盖学历、经验或技能等一票否决风险。",["胜任 40%：能不能做","证明 25%：能不能被相信","竞争 35%：和候选人相比是否突出","映射为保、稳、冲、不建议投四档决策"]],
        right: ["制作说明","Agent 分工","将长链路拆成职责清晰的协作单元，减少上下文污染和重复判断。","每个 Agent 只负责一个稳定任务，并输出可被下一节点校验的结构化结果。",["Resume Agent：提取经历与证据","JD Agent：拆解要求与硬门槛","Judge Agent：执行评分与校正","Action Agent：生成行动建议"]]
      },
      {
        left: ["效果展示","上线后能看见什么","用户完成注册后，可以导入岗位、拿到四档决策，并沿着报告改简历、推进投递。","管理端同时观察激活、回访、匹配质量与用量，避免只追求模型调用次数。",[], { metrics: [["四档","保 / 稳 / 冲 / 不建议投"],["三维","胜任 · 证明 · 竞争"],["六态","投递看板闭环"],["1 条","从导入到行动的主链路"]], quote: "先给决策，再给证据；每一条建议回到简历或 JD 原文。" }],
        right: ["LIVE DEMO","线上版本","公网环境已完成注册、登录、产品主链路和管理端入口。","可从登录页进入完整求职工作台，验证导入、判分与报告生成。",["产品主页需登录后使用","管理端单独鉴权，查看漏斗与质量"], { link: { href: "http://123.56.217.207/", label: "打开 OfferOS  http://123.56.217.207", note: "用户入口 /login，注册 /register；管理端 /admin/login。" } }]
      },
      {
        left: ["结果副歌","结果与指标","北极星指标不是报告生成次数，而是时间窗口内生成报告的去重用户数。","同时拆分新用户激活、回访和质量护栏，避免只追求模型调用量。",["激活：完成首份有效报告","留存：回看或生成新的岗位报告","质量：解析成功率、报告完整率","成本：单份报告 Token 与延迟"]],
        right: ["AFTER LISTENING","复盘","最难的不是让 AI 给建议，而是让建议具有边界、证据和决策价值。","下一版需要用真实求职者验证四档决策是否改变投递行为。",["验证用户是否理解三个评分维度","比较解释前后对结果的信任差异","观察报告是否真正促成简历修改或投递","继续降低长报告的阅读负担"]]
      }
    ]
  },
  {
    title: "PaperMind",
    catalog: "PROJECT BOOKLET · TRACK 02 · SIDE A",
    spreads: [
      {
        left: ["项目序曲","研究现场","硕博研究生需要在大量论文中筛选信息，却常在通读、摘抄与反复核对中消耗时间。","真正困难的不是获得摘要，而是区分前人工作与本文贡献，并逐步形成领域观点。",["筛选相关论文耗时","方法和结论容易混淆","多篇笔记难以形成逻辑主线"]],
        right: ["PROJECT BRIEF","产品愿景","基于 RAG 的学术速读与综述助手，把文献输入到知识输出的时间缩短 50%。","输出不止是答案，还必须携带可以回到原文的依据。",["目标用户：开题、写综述、跟踪前沿的硕博研究生","核心任务：单篇速读、多篇观点组织、引用核验","产品边界：不编造未上传的参考文献"]]
      },
      {
        left: ["工作流程","单篇速读","用户上传 PDF 后，系统解析文本并输出结构化笔记，再允许继续向本文提问。","一句话概括、本文方法、结论数据、创新点分开呈现，避免把背景文献写成“本文贡献”。",["上传 → 解析 → 结构化笔记","提问框只基于当前论文作答","方法与结论必须可区分","解析结果保存在本地，便于回看"]],
        right: ["工作流程","多篇综述","用户确认论文集合和研究方向后，系统先给出可调整大纲，再生成带引用的正文。","综述要识别共识、对比分歧、勾勒趋势，而不是把摘要拼接成段落。",["先圈定范围，再生成结构","用户可拖拽调整逻辑主线","每句话附带来源标记","证据不足时明确提示，而不是补全"]]
      },
      {
        left: ["PRODUCT DECISION","把幻觉做进界面","当检索相似度不足时，不隐藏不确定性，而是在句子层提示证据不足。","引用悬停显示原文片段，让验证动作发生在阅读流中。",["每句话带来源标记","保存文件名、页码与段落映射","低置信内容使用明确警告","禁止生成用户未上传的参考文献"]],
        right: ["制作说明","MVP 边界","第一阶段专注于桌面端、文本型 PDF 和不超过五篇的综述。","主动排除账号、协作、云同步和复杂图表解析，集中验证核心价值。",["手动上传 PDF","本地保存解析结果","限制单次综述论文数","优先保证引用可追溯"]]
      },
      {
        left: ["效果展示","如何验收这条链路","把“AI 看起来很聪明”改写为可观察的任务结果。","用户必须能完成速读、形成对比，并找到每句话的来源。",[], { metrics: [["10 秒","输出方法与结论"],["2–5 篇","一次综述的论文上限"],["1 处","至少包含观点对比"],["0 篇","虚构参考文献"]], quote: "速度、结构和可信度必须同时成立。" }],
        right: ["LIVE DEMO","线上版本","PaperMind 目前仍在本地验证引用定位与大纲编辑，公网地址尚未发布。","作品集里先完整公开工作流程、界面原则和验收标准，待部署后再补链接。",["当前没有可访问的网页地址","下一步优先验证引用点击回原文","比较自动大纲与可编辑大纲的完成质量"], { quote: "学术场景中的信任来自可验证性，而不是模型语气。" }]
      },
      {
        left: ["结果副歌","核心价值","PaperMind 的差异不是更快生成文字，而是让研究者更快建立可核验的认识。","从摘要堆叠转向观点组织，从黑盒回答转向证据导航。",["从一次生成转向人机共同编排","冲突观点需要并排看见","证据不足时允许“无法回答”"]],
        right: ["AFTER LISTENING","复盘","下一步应重点测试引用定位的准确度，以及大纲编辑是否真的改善综述质量。","同时建立论文类型与解析失败样本，避免只在“干净 PDF”上显得有效。",["测试不同学科的结构差异","衡量用户核验一次引用所需时间","评估跨论文检索是否被单篇淹没","补齐可运行原型后再发布地址"]]
      }
    ]
  },
  {
    title: "宝宝成长相册",
    catalog: "PROJECT BOOKLET · TRACK 03 · SIDE A",
    spreads: [
      {
        left: ["项目序曲","为什么做","宝宝的照片散落在家庭群、网盘和手机相册里，想按成长顺序回看时，总要翻很久。","真正要解决的不是“再做一个云盘”，而是让家人用很低的成本，共同维护一本只属于孩子的相册。",["聊天记录里的照片难以按时间回看","公开社交不适合家庭私密瞬间","隔代家人需要更简单的记录方式"]],
        right: ["PROJECT BRIEF","产品定位","成长相册帮助家庭成员低成本记录、浏览和共同维护宝宝的成长照片。","两步完成记录，时间轴按日期和年龄展开，邀请家人加入同一本私密相册。",["目标用户：需要共同记录宝宝成长的家庭","核心任务：拍照、写寄语、按时间回看","产品边界：不做公开社区、滤镜和实体印刷"]]
      },
      {
        left: ["工作流程","从进入到第一页","登录后按家庭状态分流：已有家庭进首页，没有家庭则创建或凭邀请加入。","创建家庭时必须填写宝宝昵称和出生日期，头像可选；加入前选择家庭关系称谓。",["注册 / 登录 → 创建家庭或接受邀请","维护宝宝信息后进入时间轴","移动端底部导航：首页、添加、我的","PC 端左侧导航完成同样三件事"]],
        right: ["工作流程","记录、回看、共写","添加页只保留必要字段：日期、照片、可选寄语。保存后回到首页并定位到新卡片。","时间轴按日期倒序、按年月分组，可切换为宝宝年龄；照片支持轮播和灯箱。",["最多 9 张图，可排序、删除、看上传进度","EXIF 拍摄日期可建议，不静默覆盖","无寄语时提供快捷补充，而不是空白","草稿保存在本地，刷新或断网后可恢复"]]
      },
      {
        left: ["关键段落","家庭权限","每个家庭一位 Owner。成员都能记录和留言，但邀请与移除只留给 Owner。","移除成员后历史记录保留，对方立即失去访问权。这是家庭相册而不是个人网盘。",["Owner：宝宝信息、邀请、成员管理","Member：创建记录、补充寄语、查看相册","邀请默认 7 天有效、最多使用 10 次","用户同时只属于一个家庭"]],
        right: ["PRODUCT DECISION","默认私有","所有照片放在私有对象存储中，前端只能使用服务端签发的短时访问地址。","未登录或跨家庭请求拿不到有效读取链接。隐私是产品能力，不是上线后的补丁。",["对象键带家庭隔离前缀","上传限制类型、大小和文件头","邀请 token 只存哈希","生产环境使用安全 Cookie 与 HTTPS"]]
      },
      {
        left: ["效果展示","首页时间轴","家人按时间倒序续写成长记录，卡片上能看到记录人、年龄、照片和寄语。","PC 端时间轴偏左，照片轮播和灯箱让回看保持在同一条故事线上。",[], { images: [{ src: "/images/baby-album/home-concept.png", alt: "成长相册首页时间轴", caption: "PC · 首页时间轴 / 按年月与年龄回看" }] }],
        right: ["效果展示","两步记录","选择日期、上传照片，寄语可选。上传进度、失败重试和拖拽排序都在同一页完成。","草稿自动保存，避免补一张图时把已经写好的话弄丢。",[], { images: [{ src: "/images/baby-album/new-record-concept.png", alt: "添加成长记录页", caption: "PC · 添加成长记录 / 上传进度与草稿" }] }]
      },
      {
        left: ["效果展示","家庭与邀请","我的页集中处理宝宝信息、限时邀请和成员名单。","Owner 可以复制邀请码或链接，让爸爸、妈妈、爷爷奶奶进入同一本相册。",[], { images: [{ src: "/images/baby-album/profile-concept.png", alt: "我的家庭页", caption: "PC · 我的家庭 / 邀请与成员角色" }] }],
        right: ["LIVE DEMO","线上版本","移动端用底部导航完成看、记、管；灯箱支持滑动查看多图。","当前公网地址可直接试用，登录后创建或加入一个家庭。",[], { layout: "phones", images: [{ src: "/images/baby-album/mobile-home-concept.png", alt: "移动端首页", caption: "移动 · 首页", phone: true }, { src: "/images/baby-album/mobile-new-record-concept.png", alt: "移动端添加记录", caption: "移动 · 添加", phone: true }], link: { href: "http://101.201.246.63/", label: "打开宝宝成长相册  http://101.201.246.63", note: "照片默认私有，需登录后查看；适合用手机走完记录闭环。" } }]
      }
    ]
  },
  {
    title: "情绪档案馆",
    catalog: "PROJECT BOOKLET · TRACK 04 · SIDE A",
    spreads: [
      {
        left: ["项目序曲","问题重写","“让所有人记录所有情绪”不是一个足够清晰的产品方向。","调研首先寻找的是：哪些情绪无法公开表达、会被重复触发，并且值得随时间观察。",["表达是否具有禁忌","问题是否持续发生","记录是否真的产生价值"]],
        right: ["RESEARCH BRIEF","研究目标","从广泛的情绪人群中识别一个可以安全验证的垂直场景。","用户痛点强烈并不等于适合快速产品化，还要同时考虑触达、隐私和危机风险。",["痛点强度与发生频率","现有替代方案的不足","主动记录意愿","产品安全边界"]]
      },
      {
        left: ["工作流程","完整研究路径","先比较人群，再设计访谈，最后用明确信号决定是否进入产品阶段。","没有真实事件材料前，不定义 AI 能力、核心功能或商业模式。",["重写问题：谁的哪种情绪值得被记录","统一维度比较候选人群","设计访谈脚本与样本结构","用决策信号判断能否产品化"]],
        right: ["工作流程","访谈怎么做","每个方向先访谈 8–12 人，覆盖不同严重程度和产品使用经验。","围绕最近一次具体事件，而不是功能愿望；高风险方向补充专业人员。",["不只招募愿意公开表达的人","覆盖使用与未使用情绪产品的人","追问当时为何不能表达","记录冒犯性语言和安全触发点"]]
      },
      {
        left: ["关键段落","人群比较","建立统一维度比较产后母亲、家庭照护者、求职受挫青年和辅助生殖女性。","不同方向分别代表角色突变、长期责任、社会身份受挫与周期性医疗不确定。",["产后母亲：高强度、强禁忌","照护者：长期负担与道德愧疚","求职青年：易触达、可低门槛验证","辅助生殖：周期明确、情绪复杂"]],
        right: ["PRODUCT DECISION","先研究，不做功能","通过用户语言判断需求，而不是用公开数据替代用户意愿。","记录会减负还是增加任务，必须由真实事件回答。",["访谈最近一次具体事件","理解现有替代行为","确认记录是否产生持续价值","危机表达必须有转介路径"]]
      },
      {
        left: ["效果展示","研究产出","这次研究的交付物不是 App 界面，而是一份可以推翻方向的证据标准。","进入产品前必须同时满足场景重复、替代方案不足、记录有价值和安全边界清晰。",[], { metrics: [["4 类","候选人群对照"],["8–12 人","每个方向访谈规模"],["4 条","进入产品的信号"],["0 个","提前锁定的功能"]], quote: "数据证明问题存在，访谈判断用户是否愿意这样解决。" }],
        right: ["LIVE DEMO","当前判断","优先研究产后母亲、长期照护者和求职受挫青年；资源允许时补充辅助生殖女性。","若强调低门槛验证，求职受挫青年最适合作为首轮对象。本项目没有线上产品地址。",["问题强度不是唯一排序依据","数字触达能力影响验证成本","伦理风险决定产品推进速度","不愿记录本身也是研究结果"]]
      },
      {
        left: ["DECISION SIGNAL","进入产品的信号","同一人群中需要出现高度重复的具体场景，并且用户已经存在主动处理或保存情绪的行为。","还必须能够建立清晰的隐私与危机处理机制。",["场景重复且可清楚描述","替代方案明显不足","记录后对用户有持续价值","产品不依赖医疗诊断"]],
        right: ["AFTER LISTENING","复盘","研究最重要的产出不是一个漂亮方向，而是一组可以推翻方向的证据标准。","下一阶段必须让真实访谈决定“情绪档案”是否值得存在。",["不要同时验证过多人群","先确认记录行为，再谈智能分析","为高风险表达准备转介路径","将不愿记录视为重要研究结果"]]
      }
    ]
  }
];

const bookletDialog = $("#booklet-dialog");
const bookletSpread = $("#booklet-spread");
let activeBooklet = 0;
let activeSpread = 0;

function pageMarkup(page) {
  const [label, title, lead, body, bullets = [], extras = {}] = page;
  const images = extras.images || [];
  const layout = extras.layout || "single";
  const gallery = images.length ? `<div class="booklet-gallery is-${layout}">${images.map((img) => `
    <figure class="booklet-shot${img.phone ? " is-phone" : ""}">
      <img src="${img.src}" alt="${img.alt || ""}" loading="lazy">
      ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
    </figure>`).join("")}</div>` : "";
  const metrics = extras.metrics?.length ? `<div class="booklet-metric">${extras.metrics.map(([value, caption]) => `<div><strong>${value}</strong><span>${caption}</span></div>`).join("")}</div>` : "";
  const quote = extras.quote ? `<p class="booklet-quote">${extras.quote}</p>` : "";
  const link = extras.link ? `<a class="booklet-link" href="${extras.link.href}" target="_blank" rel="noopener noreferrer"><span>${extras.link.label}</span><i>↗</i></a>${extras.link.note ? `<p class="booklet-link-note">${extras.link.note}</p>` : ""}` : "";
  const list = bullets.length ? `<ul>${bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : "";
  return `
    <span class="booklet-label">${label}</span>
    <h3>${title}</h3>
    ${lead ? `<p class="booklet-lead">${lead}</p>` : ""}
    ${body ? `<p>${body}</p>` : ""}
    ${gallery}
    ${metrics}
    ${list}
    ${quote}
    ${link}`;
}

function renderBooklet(direction = "next") {
  const booklet = bookletData[activeBooklet];
  const spread = booklet.spreads[activeSpread];
  $("#booklet-catalog").textContent = booklet.catalog;
  $("#booklet-title").textContent = booklet.title;
  $("#booklet-left").innerHTML = pageMarkup(spread.left);
  $("#booklet-right").innerHTML = pageMarkup(spread.right);
  $("#booklet-left").classList.toggle("has-shots", Boolean(spread.left[5]?.images));
  $("#booklet-right").classList.toggle("has-shots", Boolean(spread.right[5]?.images));
  $("#booklet-left").dataset.page = String(activeSpread * 2 + 1).padStart(2, "0");
  $("#booklet-right").dataset.page = String(activeSpread * 2 + 2).padStart(2, "0");
  $("#booklet-page-number").textContent = `${String(activeSpread + 1).padStart(2, "0")} / ${String(booklet.spreads.length).padStart(2, "0")}`;
  $("#booklet-prev").disabled = activeSpread === 0;
  $("#booklet-next").disabled = activeSpread === booklet.spreads.length - 1;
  $("#booklet-dots").innerHTML = booklet.spreads.map((_, index) =>
    `<button type="button" data-spread="${index}" class="${index === activeSpread ? "active" : ""}" aria-label="打开第 ${index + 1} 章"></button>`
  ).join("");
  $$("#booklet-dots button").forEach((button) => button.addEventListener("click", () => {
    const next = Number(button.dataset.spread);
    const directionToUse = next > activeSpread ? "next" : "prev";
    activeSpread = next;
    renderBooklet(directionToUse);
  }));
  bookletSpread.classList.remove("turning-next", "turning-prev");
  void bookletSpread.offsetWidth;
  bookletSpread.classList.add(direction === "next" ? "turning-next" : "turning-prev");
}

function openBooklet(index) {
  activeBooklet = index;
  activeSpread = 0;
  renderBooklet();
  bookletDialog.showModal();
  document.body.style.overflow = "hidden";
}
function closeBooklet() {
  bookletDialog.close();
  document.body.style.overflow = "";
}
function moveBooklet(direction) {
  const last = bookletData[activeBooklet].spreads.length - 1;
  const next = Math.max(0, Math.min(last, activeSpread + direction));
  if (next === activeSpread) return;
  activeSpread = next;
  renderBooklet(direction > 0 ? "next" : "prev");
}

$(".booklet-trigger")?.addEventListener("click", (event) => openBooklet(Number(event.currentTarget.dataset.booklet)));
$("#booklet-close").addEventListener("click", closeBooklet);
$("#booklet-prev").addEventListener("click", () => moveBooklet(-1));
$("#booklet-next").addEventListener("click", () => moveBooklet(1));
bookletDialog.addEventListener("click", (event) => {
  if (event.target === bookletDialog) closeBooklet();
});
bookletDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeBooklet();
});
addEventListener("keydown", (event) => {
  if (!bookletDialog.open) return;
  if (event.key === "ArrowLeft") moveBooklet(-1);
  if (event.key === "ArrowRight") moveBooklet(1);
});

const audio = $("#audio");
const playButton = $("#play");
const heroPlay = $("#hero-play");
const vinyl = $("#vinyl");
const tonearm = $("#tonearm");
const audioTitle = $("#audio-title");
const seek = $("#seek");
const seekFill = $("#seek-fill");
const volume = $("#volume");
const musicModules = import.meta.glob("/music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default"
});
const trackMetadata = {
  "DM_20260728165035_001 (V0)": { title: "A Rose for Epona", artist: "Eluveitie" },
  "DM_20260728170518_001 (V0)": { title: "水之湄", artist: "惘闻" },
  "DM_20260728170923_001 (V0)": { title: "From The Edge Of The Deep Green Sea", artist: "The Cure" },
  "DM_20260728171057_001 (V0)": { title: "Marooned", artist: "Pink Floyd" },
  "DM_20260728171238_001 (V0)": { title: "Epitaph", artist: "King Crimson" },
  "DM_20260728171550_001 (V0)": { title: "妳的烟熏到我没关系", artist: "绿橄榄" },
  "DM_20260728171722_001 (V0)": { title: "←M→", artist: "惘闻" }
};
const playlist = Object.entries(musicModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "zh-CN", { numeric: true }))
  .map(([path, url], index) => {
    const filename = decodeURIComponent(path.split("/").pop().replace(/\.mp3$/i, ""));
    const timestamp = filename.match(/_(\d{8})(\d{4})\d{2}_/);
    return {
      url,
      filename,
      title: trackMetadata[filename]?.title || filename,
      artist: trackMetadata[filename]?.artist || "未知歌手",
      subtitle: timestamp ? `${timestamp[1].slice(0,4)}.${timestamp[1].slice(4,6)}.${timestamp[1].slice(6,8)} · ${timestamp[2].slice(0,2)}:${timestamp[2].slice(2)}` : filename,
      duration: 0
    };
  });
let audioIndex = 0;
let audioContext;
let analyser;
let source;
let audioLevel = 0;

function loadAudio(autoplay = false) {
  if (!playlist.length) return;
  audio.src = playlist[audioIndex].url;
  audioTitle.textContent = playlist[audioIndex].title;
  $("#audio-artist").textContent = playlist[audioIndex].artist;
  audio.load();
  updatePlaylistState();
  if (autoplay) audio.play().then(initAudioGraph).catch(() => {});
}

function initAudioGraph() {
  if (audioContext) {
    if (audioContext.state === "suspended") audioContext.resume();
    return;
  }
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 128;
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
}
function togglePlayback() {
  if (!playlist.length) return;
  initAudioGraph();
  audio.paused ? audio.play() : audio.pause();
}
playButton.addEventListener("click", togglePlayback);
heroPlay.addEventListener("click", togglePlayback);
$("#previous").addEventListener("click", () => changeAudio(-1));
$("#next").addEventListener("click", () => changeAudio(1));
function changeAudio(direction) {
  if (!playlist.length) return;
  audioIndex = (audioIndex + direction + playlist.length) % playlist.length;
  loadAudio(true);
}
audio.addEventListener("ended", () => changeAudio(1));
audio.addEventListener("play", () => setPlaybackUI(true));
audio.addEventListener("pause", () => setPlaybackUI(false));
function setPlaybackUI(playing) {
  document.body.classList.toggle("is-playing", playing);
  vinyl.classList.toggle("playing", playing && !reducedMotion);
  tonearm.classList.toggle("playing", playing);
  playButton.textContent = playing ? "Ⅱ" : "▶";
  playButton.setAttribute("aria-label", playing ? "暂停" : "播放");
  $(".button-icon").textContent = playing ? "Ⅱ" : "▶";
  $(".button-label").textContent = playing ? "暂停音乐" : "播放专辑";
}
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,"0")}`;
}
audio.addEventListener("timeupdate", () => {
  const percent = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
  seek.value = percent;
  seekFill.style.width = `${percent}%`;
  $("#current-time").textContent = formatTime(audio.currentTime);
  $("#duration").textContent = formatTime(audio.duration);
});
seek.addEventListener("input", () => { if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration; });
volume.addEventListener("input", () => { audio.volume = volume.value; });
audio.volume = volume.value;
$("#volume-icon").addEventListener("click", () => {
  audio.muted = !audio.muted;
  $("#volume-icon").textContent = audio.muted ? "×" : "◖";
});

let dragRotation = 0;
let dragStart = 0;
vinyl.addEventListener("pointerdown", (event) => {
  dragStart = event.clientX;
  vinyl.setPointerCapture(event.pointerId);
  vinyl.classList.add("dragging");
});
vinyl.addEventListener("pointermove", (event) => {
  if (!vinyl.classList.contains("dragging")) return;
  dragRotation += (event.clientX - dragStart) * .9;
  dragStart = event.clientX;
  vinyl.style.transform = `rotate(${dragRotation}deg)`;
  if (playlist.length && audio.duration) audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + event.movementX * .08));
});
vinyl.addEventListener("pointerup", () => {
  vinyl.classList.remove("dragging");
  vinyl.style.transform = "";
});

const playlistPanel = $("#playlist-panel");
const playlistBackdrop = $("#playlist-backdrop");
const playlistButtons = [$("#playlist-toggle"), $("#sound-pill")];
function setPlaylistOpen(open) {
  playlistPanel.classList.toggle("open", open);
  playlistBackdrop.classList.toggle("open", open);
  playlistPanel.setAttribute("aria-hidden", String(!open));
  playlistButtons.forEach((button) => button.setAttribute("aria-expanded", String(open)));
}
playlistButtons.forEach((button) => button.addEventListener("click", () => setPlaylistOpen(!playlistPanel.classList.contains("open"))));
$("#playlist-close").addEventListener("click", () => setPlaylistOpen(false));
playlistBackdrop.addEventListener("click", () => setPlaylistOpen(false));
addEventListener("keydown", (event) => {
  if (event.key === "Escape") setPlaylistOpen(false);
});

function renderPlaylist() {
  $("#playlist-count").textContent = `${String(playlist.length).padStart(2,"0")} TRACKS`;
  $("#audio-playlist").innerHTML = playlist.map((track, index) => `
    <li data-audio-index="${index}">
      <button type="button" aria-label="播放 ${track.title}">
        <span class="list-no">${String(index + 1).padStart(2,"0")}</span>
        <span class="list-title">
          <strong>${track.title}</strong>
          <span class="list-artist">${track.artist}</span>
          <small>${track.subtitle}</small>
        </span>
        <time class="list-time">${track.duration ? formatTime(track.duration) : "--:--"}</time>
      </button>
    </li>`).join("");
  $$("#audio-playlist button").forEach((button, index) => button.addEventListener("click", () => {
    audioIndex = index;
    loadAudio(true);
  }));
  updatePlaylistState();
}
function updatePlaylistState() {
  $$("#audio-playlist li").forEach((item, index) => item.classList.toggle("active", index === audioIndex));
}
playlist.forEach((track) => {
  const probe = new Audio();
  probe.preload = "metadata";
  probe.src = track.url;
  probe.addEventListener("loadedmetadata", () => {
    track.duration = probe.duration;
    renderPlaylist();
  }, { once: true });
});
renderPlaylist();
if (playlist.length) loadAudio(false);

$$(".root-button").forEach((button) => button.addEventListener("pointermove", (event) => {
  const rect = button.getBoundingClientRect();
  button.style.setProperty("--x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--y", `${event.clientY - rect.top}px`);
}));

// Three.js: 以封面中的根系、光点和矿物色块为视觉语汇。
const canvas = $("#root-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x112d18, .055);
const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, .1, 100);
camera.position.set(0, 0, 14);

const rootGroup = new THREE.Group();
scene.add(rootGroup);
const rootMaterial = new THREE.LineBasicMaterial({ color: 0xfff0a8, transparent: true, opacity: .16 });
for (let branch = 0; branch < 38; branch++) {
  const points = [];
  let x = (Math.random() - .5) * 16;
  let y = -8 - Math.random() * 2;
  let z = (Math.random() - .5) * 5;
  for (let p = 0; p < 18; p++) {
    x += (Math.random() - .5) * .55 + Math.sin(branch * .8) * .05;
    y += .55;
    z += (Math.random() - .5) * .22;
    points.push(new THREE.Vector3(x, y, z));
  }
  rootGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), rootMaterial));
}
const particleCount = innerWidth < 700 ? 340 : 720;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const palette = [new THREE.Color(0xfff0a8), new THREE.Color(0x9dacfc), new THREE.Color(0xb65d16)];
for (let i = 0; i < particleCount; i++) {
  positions[i*3] = (Math.random()-.5)*24;
  positions[i*3+1] = (Math.random()-.5)*17;
  positions[i*3+2] = (Math.random()-.5)*8;
  const color = palette[Math.floor(Math.random()*palette.length)];
  colors.set([color.r,color.g,color.b],i*3);
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
particleGeometry.setAttribute("color",new THREE.BufferAttribute(colors,3));
const particles = new THREE.Points(particleGeometry,new THREE.PointsMaterial({size:.055,vertexColors:true,transparent:true,opacity:.5,blending:THREE.AdditiveBlending}));
scene.add(particles);

const pointer = { x:0, y:0 };
addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / innerWidth - .5;
  pointer.y = event.clientY / innerHeight - .5;
});
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
});
const clock = new THREE.Clock();
const frequencyData = new Uint8Array(64);
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  if (analyser && !audio.paused) {
    analyser.getByteFrequencyData(frequencyData);
    audioLevel += ((frequencyData.reduce((a,b)=>a+b,0)/frequencyData.length/255) - audioLevel) * .12;
  } else audioLevel *= .94;
  if (!reducedMotion) {
    particles.rotation.y = t * .008 + pointer.x * .1;
    particles.rotation.x += (-pointer.y * .06 - particles.rotation.x) * .025;
    rootGroup.rotation.y += (pointer.x * .08 - rootGroup.rotation.y) * .018;
    rootGroup.position.y = Math.sin(t*.25)*.15;
    const scale = 1 + audioLevel * .65;
    particles.scale.setScalar(scale);
    rootMaterial.opacity = .13 + audioLevel * .45;
  }
  renderer.render(scene,camera);
}
animate();
