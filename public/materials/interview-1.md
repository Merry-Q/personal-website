# AI 采访教练 MVP PRD

## 1. Summary

本 PRD 定义一个面向内容创作者和职场表达训练者的 AI 采访陪练 MVP。产品通过选择式配置，帮助用户快速生成一次采访训练任务、采访提纲、模拟嘉宾对话，并在训练后给出复盘反馈。

MVP 的核心目标不是做“AI 名人聊天”，而是帮助用户练习提问、追问、倾听承接、控场和表达能力。首版重点验证：用户是否愿意为了练好一次采访，完成选择、生成提纲、模拟对话和查看复盘。

## 2. Contacts

| Name | Role | Comment |
| --- | --- | --- |
| Product Owner | AI 产品经理 | 负责产品方向、MVP 范围、验收标准 |
| AI Agent Engineer | 开发执行方 | 根据本 PRD 完成前端、后端、AI 编排和基础测试 |
| UX Designer | 可选 | 若无人设岗，由开发按本文交互要求实现基础界面 |
| Prompt Engineer | 可选 | 若无人设岗，由 AI Agent Engineer 根据本文 prompt 规范实现 |
| Legal Reviewer | 后续需要 | 在上线真实名人、声音、肖像前进行合规审查 |

## 3. Background

### 3.1 问题背景

很多普通人想做采访、播客、视频访谈或深度沟通，但没有足够的练习对象，也缺少专业导师反馈。用户常见问题包括：

- 不知道怎么设计采访问题。
- 采访开场尴尬，不会破冰。
- 只会照着提纲问，不会根据回答追问。
- 问题太大、太空、太长，嘉宾难以回答。
- 遇到嘉宾回避、跑题、冷场时不会控场。
- 练完不知道自己哪里做得好、哪里需要改。

过去用户只能通过看访谈节目、读采访稿、找朋友练习或报课提升。这些方式要么缺少互动，要么成本高，要么反馈不稳定。

### 3.2 为什么现在可以做

大语言模型、语音识别、语音合成和角色扮演能力已经足够支撑低成本的模拟对话训练。AI 可以承担三个角色：

- 采访策划助手：生成采访目标和提纲。
- 模拟嘉宾：根据人物类型和主题进行回答。
- 采访教练：对用户的提问、追问和表达进行复盘。

### 3.3 MVP 定位

产品名称暂定：AI 采访教练。

一句话定位：

> 面向内容创作者和职场人士的 AI 采访陪练工具，帮助用户在真实采访前完成提纲设计、模拟彩排和能力复盘。

MVP 不做强名人拟真，不使用真人声音、肖像或未经授权的名人身份。首版只提供“人物类型”和“风格化嘉宾”。

## 4. Objective

### 4.1 产品目标

MVP 目标是验证以下假设：

1. 用户愿意通过选择式配置快速开始一次采访训练。
2. 自动生成的采访提纲能让用户感到有用。
3. 模拟嘉宾对话能让用户产生真实练习感。
4. 训练后的复盘反馈能帮助用户改善提问和追问。
5. 用户愿意重复使用，甚至为高级训练能力付费。

### 4.2 用户收益

用户完成一次训练后，应获得：

- 一份可用于练习或真实采访的采访提纲。
- 一次模拟嘉宾对话体验。
- 一份针对本次表现的复盘报告。
- 一组更好的替代问法和追问建议。
- 对自己采访能力的明确认知。

### 4.3 业务收益

若 MVP 验证成功，产品可向以下方向发展：

- C 端订阅：面向内容创作者、学生、职场人。
- 训练包付费：播客采访训练、创业者访谈训练、用户访谈训练。
- B 端培训：面向传媒院校、企业培训、销售和咨询团队。

### 4.4 Key Results

MVP 发布后 4 周内建议观察以下指标：

| Metric | Target |
| --- | --- |
| 首次训练完成率 | 进入产品的用户中，至少 50% 完成一次完整训练 |
| 提纲生成完成率 | 完成配置的用户中，至少 80% 成功生成提纲 |
| 模拟对话完成率 | 生成提纲的用户中，至少 60% 完成 6 轮以上对话 |
| 复盘查看率 | 完成对话的用户中，至少 70% 查看复盘报告 |
| 7 日复训率 | 完成首次训练的用户中，至少 20% 在 7 日内再次训练 |
| 复盘有用率 | 用户主观反馈中，至少 60% 认为复盘“有帮助” |

北极星指标：

> 每周完成的有效采访训练次数。

有效训练定义：

- 用户完成训练配置。
- 系统生成采访提纲。
- 用户与模拟嘉宾完成至少 6 轮对话。
- 用户查看复盘报告。

## 5. Market Segments

### 5.1 首发用户

首发用户应聚焦在“想做访谈内容但缺少训练机会的人”。

#### Segment A: 知识型内容创作者

代表用户：

- 播客主。
- 视频号博主。
- B 站 UP 主。
- 小红书知识博主。
- 想做人物访谈的新手创作者。

核心任务：

- 准备一期访谈节目。
- 设计采访问题。
- 练习开场、追问和控场。
- 让内容更有深度和信息量。

为什么优先：

- 需求具体。
- 有内容产出压力。
- 愿意尝试 AI 工具。
- 有一定付费意愿。
- 训练成果容易感知。

#### Segment B: 职场深度沟通人群

代表用户：

- 产品经理。
- 用户研究员。
- 咨询顾问。
- 投资经理。
- 创业者。
- 销售和商务人员。

核心任务：

- 做用户访谈。
- 做专家访谈。
- 做客户访谈。
- 在商务场景中提出好问题。

适合后续扩展：

- 该人群付费能力更强。
- 可以发展成 B 端培训场景。
- 但 MVP 首版不应为所有职场场景同时服务。

#### Segment C: 传媒和表达训练学生

代表用户：

- 新闻传播专业学生。
- 播音主持学生。
- 演讲、辩论、社团成员。

核心任务：

- 低成本反复练习。
- 获得即时反馈。
- 准备课堂作业、比赛或实习。

适合后续做校园版或低价版。

### 5.2 MVP 首选人群

MVP 首选：

> 想做播客、视频访谈、人物采访的知识型内容创作者。

首版文案和默认场景都应围绕这个人群设计。

## 6. Value Propositions

### 6.1 核心价值

用户不用自己写 prompt，也不用先想清楚完整主题。用户只需选择几个维度，系统就能生成一次专业采访训练。

价值表达：

> 点选几个选项，生成一场可练习、可复盘、可改进的模拟采访。

### 6.2 用户当前替代方案

| 替代方案 | 问题 |
| --- | --- |
| 直接问通用 AI | 需要会写 prompt，训练流程不稳定，复盘不专业 |
| 看访谈节目学习 | 只能被动学习，无法练习 |
| 找朋友模拟 | 对方不专业，反馈不稳定 |
| 报表达或采访课程 | 成本高，频次低 |
| AI 面试陪练 | 主要训练“回答问题”，不是训练“提出问题” |
| AI 角色聊天 | 偏娱乐陪伴，缺少训练目标和复盘 |

### 6.3 差异化

本产品和相邻产品的差异：

- 不做开放式陪聊，而做有目标的采访训练。
- 不要求用户写长 prompt，而用选择式配置启动。
- 不只生成提纲，还提供模拟对话和复盘。
- 不训练“怎么回答问题”，而训练“怎么提出好问题”。
- 不追求名人拟真，而追求人物类型、对话难度和训练效果。

### 6.4 用户完成训练后的理想状态

用户完成一次训练后，应能说出：

- “我知道这次采访可以怎么开场了。”
- “我知道哪些问题太空，应该怎么改。”
- “我发现自己没有追问嘉宾刚才提到的关键细节。”
- “我拿到了一版更好的采访提纲。”
- “我愿意在正式采访前再练一次。”

## 7. Solution

## 7.1 MVP Scope

### 7.1.1 In Scope

MVP 必须包含：

- 选择式采访训练配置。
- 自动生成采访任务和采访提纲。
- 模拟嘉宾文字对话。
- 结束训练并生成复盘报告。
- 训练记录本地保存或数据库保存。
- 基础反馈入口。

### 7.1.2 Out of Scope

MVP 不做：

- 真人名人模拟。
- 真人声音克隆。
- 名人头像或数字人。
- 开放角色广场。
- 社区功能。
- 直播功能。
- 多人协作。
- 复杂课程体系。
- 支付系统。
- 移动端原生 App。
- 企业后台。

## 7.2 User Flow

### 7.2.1 主流程

1. 用户进入首页。
2. 用户选择训练模式。
3. 用户选择模拟嘉宾类型。
4. 用户选择主题方向。
5. 用户选择采访风格。
6. 用户选择难度等级。
7. 系统生成采访任务卡和采访提纲。
8. 用户点击“开始模拟采访”。
9. 用户向 AI 嘉宾提问。
10. AI 嘉宾根据设定回答。
11. 用户完成至少 6 轮对话，或主动结束训练。
12. 系统生成复盘报告。
13. 用户查看优化后的问题清单和下一次训练建议。

### 7.2.2 异常流程

- 若 AI 生成失败，显示“生成失败，请重试”，保留用户已选配置。
- 若用户未完成选择，生成按钮不可点击。
- 若用户在对话少于 3 轮时结束，复盘报告应提示“样本较少，反馈仅供参考”。
- 若 AI 回复超时，提供“重新生成回答”按钮。
- 若用户刷新页面，若已保存训练，应能回到最近一次训练记录。

## 7.3 Information Architecture

MVP 页面建议如下：

1. Home / Training Setup
2. Outline Preview
3. Interview Simulation
4. Review Report
5. History

### 7.3.1 Home / Training Setup

目标：

让用户在 30 秒内完成训练配置。

页面模块：

- 产品标题：AI 采访教练
- 副标题：选择几个选项，生成一次采访训练
- 训练模式选择
- 嘉宾类型选择
- 主题方向选择
- 采访风格选择
- 难度等级选择
- 生成采访提纲按钮

### 7.3.2 Outline Preview

目标：

让用户确认本次训练任务，并看到可用的采访提纲。

页面模块：

- 采访任务名称
- 训练目标
- 模拟嘉宾设定
- 采访主线
- 推荐开场白
- 主问题列表
- 关键追问列表
- 风险提醒
- 开始模拟采访按钮
- 重新生成按钮

### 7.3.3 Interview Simulation

目标：

让用户和模拟嘉宾完成一场文字采访。

页面模块：

- 左侧或顶部：本次训练目标、嘉宾设定、提纲简表
- 主区域：对话消息流
- 输入框：用户输入问题
- 操作按钮：发送、结束训练、重新生成本轮回答
- 训练进度：当前轮次、建议至少 6 轮

### 7.3.4 Review Report

目标：

帮助用户知道哪里问得好、哪里需要改。

页面模块：

- 总体评分
- 六项能力评分
- 本次最佳问题
- 本次最弱问题
- 错过的追问机会
- 替代问法建议
- 优化后的采访提纲
- 下一次训练建议
- 再练一次按钮

### 7.3.5 History

目标：

让用户回看过去的训练。

页面模块：

- 训练时间
- 任务名称
- 嘉宾类型
- 主题方向
- 对话轮次
- 总体评分
- 查看详情按钮

MVP 可先用浏览器 localStorage 保存历史。若项目已有后端和数据库，则使用数据库保存。

## 7.4 Configuration Options

### 7.4.1 训练模式

| ID | Label | Description | Review Focus |
| --- | --- | --- | --- |
| full_rehearsal | 完整彩排 | 模拟一次完整采访 | 综合表现 |
| opening | 练开场 | 训练破冰和建立信任 | 开场自然度、问题铺垫 |
| questioning | 练提问 | 训练清晰、具体、有信息量的问题 | 问题质量 |
| follow_up | 练追问 | 训练根据回答继续深入 | 追问深度 |
| control | 练控场 | 训练处理跑题、冷场和回避 | 控场能力 |

默认推荐：full_rehearsal。

### 7.4.2 模拟嘉宾类型

| ID | Label | Description |
| --- | --- | --- |
| founder | 创业者 | 有创业经历，能聊失败、增长、团队、选择 |
| investor | 投资人 | 关注行业趋势、商业判断、项目筛选 |
| writer | 作家 | 关注创作、人生经验、表达和观察 |
| scientist | 科学家 | 关注研究、发现、理性思维和长期探索 |
| executive | 企业高管 | 关注组织、管理、战略和商业结果 |
| creator | 自媒体创作者 | 关注内容、流量、个人品牌和平台变化 |
| expert | 行业专家 | 关注专业洞察、行业变化和实践经验 |
| ordinary_story | 有故事的普通人 | 关注人生经历、转折和真实情感 |

### 7.4.3 主题方向

| ID | Label | Description |
| --- | --- | --- |
| growth | 成长经历 | 挖掘人物成长路径 |
| turning_point | 关键转折 | 聚焦人生或事业的重要变化 |
| failure | 失败复盘 | 挖掘失败原因和教训 |
| success_method | 成功方法 | 总结方法论和可复用经验 |
| industry_trend | 行业趋势 | 讨论行业变化和未来判断 |
| career_choice | 职业选择 | 探讨选择、机会和代价 |
| low_point | 人生低谷 | 挖掘困难时期的感受和行动 |
| values | 价值观冲突 | 探讨选择背后的价值判断 |
| product_story | 作品/产品背后 | 挖掘创作或产品的幕后过程 |
| controversy | 争议问题 | 训练尖锐但有边界的提问 |
| advice | 给年轻人的建议 | 面向新手或年轻人的经验建议 |

### 7.4.4 采访风格

| ID | Label | Description |
| --- | --- | --- |
| relaxed | 轻松聊天型 | 语气自然，适合破冰和故事 |
| deep | 深度访谈型 | 关注洞察、细节和长期思考 |
| sharp | 犀利追问型 | 更直接，更强调矛盾和证据 |
| story | 故事挖掘型 | 引导嘉宾讲具体事件 |
| business | 商业洞察型 | 聚焦判断、策略和结果 |
| documentary | 人物纪录片型 | 关注人生路径、处境和情绪 |

### 7.4.5 难度等级

| ID | Label | Description | Guest Behavior |
| --- | --- | --- | --- |
| beginner | 新手 | 适合第一次练习 | 嘉宾配合，回答较完整 |
| intermediate | 进阶 | 适合有基础用户 | 嘉宾回答适中，需要追问 |
| challenge | 挑战 | 适合强化训练 | 嘉宾会回避、反问或表达模糊 |
| pressure | 高压 | 适合进阶控场 | 嘉宾强势、冷淡、容易跑题 |

MVP 可先实现 beginner、intermediate、challenge 三档。pressure 可作为后续扩展。

## 7.5 Core Feature Requirements

### 7.5.1 Feature: 选择式训练配置

User Story:

> 作为一个新手采访者，我想通过选择几个选项开始训练，这样我不用自己想完整采访主题。

Functional Requirements:

- 系统展示 5 组配置项：训练模式、嘉宾类型、主题方向、采访风格、难度等级。
- 每组配置只能单选。
- 每组都有默认值。
- 用户可以在 30 秒内完成配置。
- 所有必选项完成后，生成按钮可点击。
- 点击生成按钮后，进入提纲生成 loading 状态。

Acceptance Criteria:

- 用户首次进入页面时，能看到默认推荐配置。
- 用户可以修改任一配置。
- 生成按钮在配置完整时可点击。
- 点击生成后，系统能获得完整配置对象。

### 7.5.2 Feature: 采访任务和提纲生成

User Story:

> 作为一个准备采访的人，我想自动得到一份采访提纲，这样我能快速开始练习。

Functional Requirements:

- 系统基于用户配置生成采访任务。
- 输出必须包含：
  - 任务名称。
  - 训练目标。
  - 模拟嘉宾设定。
  - 采访主线。
  - 推荐开场白。
  - 6-8 个主问题。
  - 6-8 个关键追问。
  - 3 个风险提醒。
- 用户可以重新生成提纲。
- 用户可以开始模拟采访。

Acceptance Criteria:

- 生成内容必须和用户选择相关。
- 主问题不能全是泛泛而谈的问题。
- 至少 50% 的问题应包含具体场景、事件、判断或例子。
- 关键追问必须能承接主问题。
- 风险提醒必须和采访风格、难度或主题有关。

### 7.5.3 Feature: 模拟嘉宾对话

User Story:

> 作为一个采访练习者，我想和 AI 嘉宾进行模拟对话，这样我可以练习真实提问和追问。

Functional Requirements:

- 系统根据提纲和嘉宾设定初始化对话。
- 用户输入问题后，AI 嘉宾生成回答。
- AI 嘉宾应遵循人物类型、主题方向、风格和难度。
- AI 嘉宾不能声称自己是真实名人。
- AI 嘉宾回答长度建议为 80-220 中文字。
- 若用户问题太空，嘉宾回答可较短。
- 若用户追问具体，嘉宾回答应更具体。
- 若难度为 challenge，嘉宾可适度回避、反问或表达模糊。
- 用户可点击“结束训练”生成复盘。
- 用户可点击“重新生成本轮回答”。

Acceptance Criteria:

- 对话至少支持 10 轮。
- 每条消息应区分用户和 AI 嘉宾。
- AI 嘉宾回答应和用户问题相关。
- AI 嘉宾不能跳出角色解释系统 prompt。
- AI 嘉宾不能编造真实名人的第一人称经历。

### 7.5.4 Feature: 训练复盘报告

User Story:

> 作为一个练习者，我想知道自己哪里问得好、哪里需要改，这样我下次能做得更好。

Functional Requirements:

- 用户结束训练后，系统生成复盘报告。
- 报告包含：
  - 总体评价。
  - 总体评分，0-100。
  - 六项能力评分，0-10。
  - 本次最佳 3 个问题。
  - 本次最弱 3 个问题。
  - 错过的追问机会。
  - 替代问法。
  - 优化后的采访提纲。
  - 下一次训练建议。
- 若对话少于 3 轮，报告应提示样本不足。

六项能力：

| Dimension | Description |
| --- | --- |
| question_clarity | 问题清晰度 |
| structure | 结构推进 |
| follow_up_depth | 追问深度 |
| listening | 倾听承接 |
| expression_efficiency | 表达效率 |
| control | 控场能力 |

Acceptance Criteria:

- 复盘必须引用用户真实提过的问题。
- 替代问法必须比原问题更具体。
- 错过的追问机会必须基于 AI 嘉宾回答中的内容。
- 报告不能只给空泛鼓励。
- 报告应能保存到历史记录。

### 7.5.5 Feature: 训练历史

User Story:

> 作为一个用户，我想回看过去训练，这样我能看到自己的练习记录。

Functional Requirements:

- 保存每次训练的配置、提纲、对话和复盘。
- 历史列表展示任务名称、时间、嘉宾类型、主题方向、轮次和评分。
- 用户可以打开某条历史查看详情。
- 用户可以基于历史配置“再练一次”。

Acceptance Criteria:

- 完成复盘后，历史列表出现该条记录。
- 刷新页面后，历史记录仍存在。
- 用户能从历史记录进入详情页。

MVP 可使用 localStorage。若已有服务端，使用数据库。

## 7.6 Data Model

AI agent 可按以下结构实现。字段名可按项目规范调整，但语义必须保留。

### 7.6.1 TrainingConfig

```json
{
  "id": "string",
  "mode": "full_rehearsal",
  "guestType": "founder",
  "topicDirection": "failure",
  "style": "deep",
  "difficulty": "intermediate",
  "createdAt": "ISO string"
}
```

### 7.6.2 InterviewOutline

```json
{
  "id": "string",
  "configId": "string",
  "title": "string",
  "trainingGoal": "string",
  "guestProfile": "string",
  "mainThread": "string",
  "openingLine": "string",
  "mainQuestions": ["string"],
  "followUpQuestions": ["string"],
  "riskTips": ["string"],
  "createdAt": "ISO string"
}
```

### 7.6.3 ChatMessage

```json
{
  "id": "string",
  "role": "user",
  "content": "string",
  "createdAt": "ISO string"
}
```

Role values:

- user
- guest
- system

### 7.6.4 ReviewReport

```json
{
  "id": "string",
  "sessionId": "string",
  "overallScore": 82,
  "summary": "string",
  "scores": {
    "questionClarity": 8,
    "structure": 7,
    "followUpDepth": 6,
    "listening": 7,
    "expressionEfficiency": 8,
    "control": 6
  },
  "bestQuestions": [
    {
      "original": "string",
      "whyGood": "string"
    }
  ],
  "weakQuestions": [
    {
      "original": "string",
      "problem": "string",
      "betterVersion": "string"
    }
  ],
  "missedFollowUps": [
    {
      "guestSignal": "string",
      "missedOpportunity": "string",
      "suggestedFollowUp": "string"
    }
  ],
  "improvedOutline": ["string"],
  "nextPractice": "string",
  "createdAt": "ISO string"
}
```

### 7.6.5 TrainingSession

```json
{
  "id": "string",
  "config": {},
  "outline": {},
  "messages": [],
  "reviewReport": {},
  "status": "completed",
  "createdAt": "ISO string",
  "updatedAt": "ISO string"
}
```

Status values:

- configuring
- outline_ready
- interviewing
- reviewing
- completed

## 7.7 AI Behavior Requirements

### 7.7.1 General AI Rules

All AI outputs must follow these rules:

- Use Chinese by default.
- Do not claim to be a real person or real celebrity.
- Do not use real celebrity name, voice, portrait, or first-person biography unless user has legal authorization.
- Do not fabricate factual claims about real people.
- If user asks to simulate a real celebrity, respond with a safer alternative: “可以模拟某类人物风格或公开观点类型，但不会冒充本人。”
- Keep answers useful, specific, and tied to the training goal.

### 7.7.2 Outline Generation Prompt Template

The implementation can use this prompt as a starting point:

```text
你是一个资深访谈策划和采访教练。请基于用户选择，生成一次采访训练任务。

用户配置：
- 训练模式：{{modeLabel}}，说明：{{modeDescription}}
- 模拟嘉宾类型：{{guestTypeLabel}}，说明：{{guestTypeDescription}}
- 主题方向：{{topicDirectionLabel}}，说明：{{topicDirectionDescription}}
- 采访风格：{{styleLabel}}，说明：{{styleDescription}}
- 难度等级：{{difficultyLabel}}，说明：{{difficultyDescription}}

要求：
1. 不要模拟真实名人。
2. 生成的内容必须适合一次 10-15 分钟的模拟采访。
3. 问题要具体，避免空泛。
4. 至少一半问题要引导嘉宾讲具体事件、判断依据或关键选择。
5. 追问要能承接主问题。
6. 输出 JSON，不要输出 Markdown。

JSON 字段：
{
  "title": "任务名称",
  "trainingGoal": "训练目标",
  "guestProfile": "模拟嘉宾设定",
  "mainThread": "采访主线",
  "openingLine": "推荐开场白",
  "mainQuestions": ["6-8 个主问题"],
  "followUpQuestions": ["6-8 个关键追问"],
  "riskTips": ["3 个风险提醒"]
}
```

### 7.7.3 Guest Simulation Prompt Template

```text
你正在扮演一个模拟采访训练中的嘉宾。你不是现实中的真实名人，也不能声称自己是真实人物。

本次训练配置：
- 训练模式：{{modeLabel}}
- 嘉宾类型：{{guestTypeLabel}}
- 主题方向：{{topicDirectionLabel}}
- 采访风格：{{styleLabel}}
- 难度等级：{{difficultyLabel}}

嘉宾设定：
{{guestProfile}}

采访主线：
{{mainThread}}

行为规则：
1. 你只作为模拟嘉宾回答，不要评价用户问题，除非训练已经结束。
2. 回答要像真实嘉宾，不要像助手讲课。
3. 如果用户问题具体，你可以给出更具体的经历、判断和细节。
4. 如果用户问题空泛，你可以回答得简短或泛一些。
5. 如果难度是“挑战”，你可以适度回避、反问或要求用户问得更具体。
6. 不要编造真实名人的经历。
7. 每次回答 80-220 个中文字符。
8. 不要输出 Markdown。

当前对话：
{{messages}}

请回答用户的最后一个问题。
```

### 7.7.4 Review Prompt Template

```text
你是一个严格但有帮助的采访教练。请基于用户和模拟嘉宾的对话，生成训练复盘。

本次训练配置：
- 训练模式：{{modeLabel}}
- 嘉宾类型：{{guestTypeLabel}}
- 主题方向：{{topicDirectionLabel}}
- 采访风格：{{styleLabel}}
- 难度等级：{{difficultyLabel}}

采访提纲：
{{outline}}

完整对话：
{{messages}}

评价重点：
1. 问题清晰度：问题是否具体、单一、可回答。
2. 结构推进：是否有从背景到细节再到洞察的推进。
3. 追问深度：是否抓住嘉宾回答中的关键词继续追问。
4. 倾听承接：是否根据嘉宾回答调整问题，而不是机械照念。
5. 表达效率：是否啰嗦、铺垫过长、问题过大。
6. 控场能力：是否能处理跑题、回避、冷场。

要求：
1. 必须引用用户真实提过的问题。
2. 不要空泛鼓励。
3. 每个弱问题都要给出更好的替代问法。
4. 找出错过的追问机会，基于嘉宾回答里的具体信号。
5. 输出 JSON，不要输出 Markdown。

JSON 字段：
{
  "overallScore": 0-100,
  "summary": "总体评价",
  "scores": {
    "questionClarity": 0-10,
    "structure": 0-10,
    "followUpDepth": 0-10,
    "listening": 0-10,
    "expressionEfficiency": 0-10,
    "control": 0-10
  },
  "bestQuestions": [
    {
      "original": "用户原问题",
      "whyGood": "为什么好"
    }
  ],
  "weakQuestions": [
    {
      "original": "用户原问题",
      "problem": "问题在哪里",
      "betterVersion": "更好的问法"
    }
  ],
  "missedFollowUps": [
    {
      "guestSignal": "嘉宾回答中的信号",
      "missedOpportunity": "错过了什么",
      "suggestedFollowUp": "建议追问"
    }
  ],
  "improvedOutline": ["优化后的问题清单"],
  "nextPractice": "下一次训练建议"
}
```

## 7.8 UX Requirements

### 7.8.1 Design Principles

- 首页直接进入训练，不做大段营销页。
- 主路径以卡片选择为主，不让用户先写长文本。
- 每一步都要让用户知道自己在选择什么。
- 页面文案短，避免教育用户太多理论。
- 生成结果要让用户觉得“可以直接拿去练”。
- 复盘要具体，不只给分。

### 7.8.2 UI Components

AI agent 应实现以下基础组件：

- OptionCard：用于选择训练模式、嘉宾类型、主题方向、风格、难度。
- PrimaryButton：主要操作，如生成提纲、开始采访、生成复盘。
- SecondaryButton：重新生成、返回修改。
- OutlineCard：展示提纲。
- ChatMessageBubble：展示对话。
- ScoreBar 或 ScoreBadge：展示评分。
- ReportSection：展示复盘各模块。
- HistoryItem：展示历史记录。

### 7.8.3 Copy Requirements

产品内建议文案：

- 首页标题：AI 采访教练
- 首页副标题：选择几个选项，生成一次可练习、可复盘的模拟采访。
- 生成按钮：生成采访提纲
- 开始按钮：开始模拟采访
- 结束按钮：结束并复盘
- 历史入口：训练记录

错误文案：

- 生成失败：生成失败，请稍后重试。你的选择已保留。
- 回复失败：嘉宾暂时没有回答，请重新生成本轮回答。
- 样本不足：本次对话轮次较少，复盘仅供参考。

## 7.9 Non-Functional Requirements

### 7.9.1 Performance

- 提纲生成建议在 15 秒内完成。
- 单轮嘉宾回复建议在 10 秒内完成。
- 复盘生成建议在 20 秒内完成。
- 生成中必须显示 loading 状态。

### 7.9.2 Reliability

- AI 返回 JSON 时，应做解析校验。
- 若 JSON 解析失败，应尝试修复或重新请求。
- 若生成失败，不能丢失用户配置。
- 对话和复盘生成失败时，应允许用户重试。

### 7.9.3 Privacy

- MVP 不要求登录时，不应收集用户个人敏感信息。
- 若保存历史到本地，应提示“训练记录保存在本机浏览器”。
- 若后续保存到云端，必须增加隐私说明。

### 7.9.4 Safety and Legal

- 禁止默认提供真实名人拟真选项。
- 禁止使用真实名人声音、肖像和身份冒充。
- 若用户手动输入真实名人姓名，系统应改写为“某类人物风格”或提示仅做公开资料分析。
- 不输出诽谤、隐私、未经证实的真实人物信息。

## 7.10 Suggested Technical Approach

技术方案不强制，但建议如下。

### 7.10.1 Frontend

适合用：

- React / Next.js / Vue 任一现代前端框架。
- 单页应用即可。
- 首版优先桌面和移动 Web 自适应。

### 7.10.2 Backend

可选两种：

#### Option A: Frontend-only MVP

适合快速验证。

- 前端直接调用 AI API。
- 使用 localStorage 保存历史。
- 环境变量保存 API Key。
- 不做登录。

注意：公开部署时不应把 API Key 暴露在浏览器。

#### Option B: Simple Backend MVP

适合更接近真实上线。

- 前端调用后端接口。
- 后端负责 AI API 调用。
- 后端保存训练记录。
- 可使用 SQLite / PostgreSQL / Supabase。

推荐接口：

```text
POST /api/outlines
POST /api/guest-replies
POST /api/reviews
GET /api/sessions
GET /api/sessions/:id
POST /api/sessions/:id/retry
```

### 7.10.3 API Contracts

#### POST /api/outlines

Request:

```json
{
  "config": {
    "mode": "full_rehearsal",
    "guestType": "founder",
    "topicDirection": "failure",
    "style": "deep",
    "difficulty": "intermediate"
  }
}
```

Response:

```json
{
  "outline": {
    "title": "采访一位连续创业者：第一次失败真正教会了什么",
    "trainingGoal": "训练如何围绕失败经历进行具体追问。",
    "guestProfile": "一位经历过两次创业的模拟嘉宾...",
    "mainThread": "从失败事件进入，追问判断失误、团队压力和复盘方法。",
    "openingLine": "今天我们不聊成功经验，想先从一次你不太愿意回忆的失败开始。",
    "mainQuestions": [],
    "followUpQuestions": [],
    "riskTips": []
  }
}
```

#### POST /api/guest-replies

Request:

```json
{
  "config": {},
  "outline": {},
  "messages": [
    {
      "role": "user",
      "content": "你第一次创业失败，最直接的原因是什么？"
    }
  ]
}
```

Response:

```json
{
  "message": {
    "role": "guest",
    "content": "如果只说最直接的原因，是我们太晚承认销售出了问题..."
  }
}
```

#### POST /api/reviews

Request:

```json
{
  "config": {},
  "outline": {},
  "messages": []
}
```

Response:

```json
{
  "reviewReport": {}
}
```

## 7.11 Analytics Events

MVP 应埋点或至少在代码中预留事件：

| Event | Trigger |
| --- | --- |
| setup_started | 用户进入配置页 |
| option_selected | 用户选择任一配置项 |
| outline_generate_clicked | 点击生成提纲 |
| outline_generated | 提纲生成成功 |
| outline_regenerated | 用户重新生成提纲 |
| interview_started | 点击开始模拟采访 |
| user_message_sent | 用户发送问题 |
| guest_reply_generated | 嘉宾回复生成成功 |
| interview_ended | 用户结束训练 |
| review_generated | 复盘生成成功 |
| history_opened | 用户打开历史 |
| retrain_clicked | 用户点击再练一次 |

关键属性：

- mode
- guestType
- topicDirection
- style
- difficulty
- messageCount
- overallScore
- generationLatency
- errorType

## 7.12 AI Output Quality Specification

本章节是 AI 生成质量的核心规范。AI agent 开发时，不能只让流程跑通，还必须让提纲、嘉宾回复和复盘达到本章节定义的质量标准。

### 7.12.1 Output Quality Goals

AI 输出必须满足三个目标：

1. 具体：问题、回答和反馈都要落到事件、场景、判断、冲突、代价或例子。
2. 可练：输出必须服务于采访训练，而不是普通聊天或知识问答。
3. 可改：复盘必须告诉用户哪里不好，以及下一次怎么问更好。

不可接受的 AI 输出：

- 大量使用“你怎么看”“能不能分享一下”“有什么建议”这类泛问题。
- 嘉宾回答像 AI 助手讲课，而不像被采访的人。
- 复盘只说“表现不错”“可以更深入”，但不给证据和替代问法。
- 不同配置生成的内容差异很小。
- 难度等级没有影响嘉宾行为。
- 冒充真实名人或伪造真实人物经历。

### 7.12.2 Good Interview Question Standard

好采访问题必须尽量符合以下标准：

| Standard | Description | Example |
| --- | --- | --- |
| 单一 | 一次只问一件事 | “你第一次意识到现金流危险，是在哪一天？” |
| 具体 | 包含时间、场景、事件、选择、冲突或代价 | “当时哪一个客户反馈让你开始怀疑方向？” |
| 可回答 | 嘉宾能基于经历或判断回答 | “你当时为什么没有接受团队的反对意见？” |
| 可追问 | 回答后能自然继续深入 | “这个判断后来造成了什么具体后果？” |
| 贴合角色 | 符合嘉宾类型和主题方向 | 投资人问题应追问判断依据、案例和风险 |
| 有张力 | 能触及矛盾、选择或真实代价 | “你说是市场问题，但你自己承担哪部分责任？” |

坏采访问题特征：

- 太大：“你怎么看 AI 创业？”
- 太空：“你能分享一下你的经历吗？”
- 太多：“你当时怎么想、团队怎么反应、后来又发生了什么？”
- 太像作文题：“请谈谈你的成功方法论。”
- 没有承接：“刚才嘉宾提到现金流，用户却直接跳到个人爱好。”
- 带有审判：“你是不是因为能力不够才失败？”

生成提纲时的硬性规则：

- 主问题 6-8 个。
- 主问题中最多允许 2 个泛化问题。
- 至少 50% 的主问题必须包含具体场景、事件、判断、冲突、代价或例子。
- 每个主问题应只包含一个主要问题。
- 关键追问必须能承接主问题或嘉宾可能给出的回答。
- 开场白必须是用户可以直接说出口的一句话。

### 7.12.3 Outline Field Quality Rules

提纲生成的每个字段必须符合以下规则：

| Field | Quality Rule |
| --- | --- |
| title | 不超过 24 个中文字符，能表达嘉宾类型和主题 |
| trainingGoal | 必须包含训练能力，如练追问、练控场、练开场 |
| guestProfile | 必须包含身份背景、经历、性格、回答倾向 |
| mainThread | 必须说明采访推进顺序，不只复述主题 |
| openingLine | 必须像真实采访开场，不能像系统说明 |
| mainQuestions | 按采访顺序排列，从进入场景到深入冲突再到总结 |
| followUpQuestions | 能承接主问题或嘉宾可能回答，不是另一组主问题 |
| riskTips | 提醒用户本次采访中容易犯的具体错误 |

建议扩展结构：

如果开发成本允许，`mainQuestions` 和 `followUpQuestions` 不应只用字符串数组，而应使用对象数组。

```json
{
  "question": "你第一次意识到公司可能撑不下去，是在哪一个具体时刻？",
  "type": "事件挖掘",
  "purpose": "让嘉宾进入具体场景，而不是泛泛总结"
}
```

MVP 可以先使用字符串数组，但 prompt 中仍应要求 AI 在内部按“问题类型”和“提问目的”来组织输出。

### 7.12.4 Configuration Impact Matrix

AI 生成必须体现用户配置差异。不能只是把配置文本塞进 prompt。

#### Training Mode Impact

| Mode | Output Impact |
| --- | --- |
| 完整彩排 | 提纲要覆盖开场、背景、冲突、洞察、收尾 |
| 练开场 | 多给破冰、建立信任、进入主题的问题 |
| 练提问 | 主问题要更清晰，复盘重点看问题质量 |
| 练追问 | 减少泛问题，增加连续追问链和错过追问识别 |
| 练控场 | 嘉宾更容易跑题、回避或反问，复盘重点看拉回主题 |

#### Guest Type Impact

| Guest Type | Question Focus |
| --- | --- |
| 创业者 | 失败、增长、团队、现金流、关键选择、复盘 |
| 投资人 | 判断依据、案例、风险、反共识、行业周期 |
| 作家 | 观察、创作过程、人生经验、表达选择 |
| 科学家 | 研究问题、证据、失败实验、长期探索 |
| 企业高管 | 组织、战略、管理、取舍、业务结果 |
| 自媒体创作者 | 内容定位、平台变化、流量、个人品牌 |
| 行业专家 | 专业洞察、行业变化、误区、实践经验 |
| 有故事的普通人 | 人生事件、情绪、关系、转折和选择 |

#### Topic Direction Impact

| Topic | Question Focus |
| --- | --- |
| 成长经历 | 早期影响、关键人物、习惯形成 |
| 关键转折 | 转折前后、触发事件、代价和后果 |
| 失败复盘 | 错误判断、责任、代价、复盘方法 |
| 成功方法 | 可复用动作、反直觉经验、限制条件 |
| 行业趋势 | 变化信号、判断依据、案例和风险 |
| 职业选择 | 机会、取舍、长期影响、后悔点 |
| 人生低谷 | 情绪、压力、支撑系统、恢复过程 |
| 价值观冲突 | 冲突双方、选择依据、真实代价 |
| 作品/产品背后 | 创作过程、关键决策、用户反馈 |
| 争议问题 | 边界、证据、回应、责任 |
| 给年轻人的建议 | 具体情境、适用条件、常见误区 |

#### Style Impact

| Style | Output Impact |
| --- | --- |
| 轻松聊天型 | 问题更自然，有生活化切入，但不能松散 |
| 深度访谈型 | 问题更关注原因、结构、长期影响 |
| 犀利追问型 | 问题更直接，追问责任和证据，但不能羞辱 |
| 故事挖掘型 | 多问具体场景、人物、对话、情绪 |
| 商业洞察型 | 多问判断、策略、指标、结果和代价 |
| 人物纪录片型 | 多问人生路径、处境、关系和内心变化 |

#### Difficulty Impact

| Difficulty | Guest Behavior |
| --- | --- |
| 新手 | 嘉宾配合，主动补充信息，帮助用户练起来 |
| 进阶 | 嘉宾正常回答，但不会主动展开太多 |
| 挑战 | 嘉宾会模糊表达、回避、反问，需要用户追问 |
| 高压 | 嘉宾可能强势、冷淡、质疑问题本身，需要用户控场 |

### 7.12.5 Guest Persona Schema

每个模拟嘉宾都应基于以下结构生成。即使 UI 不展示全部字段，AI prompt 也应使用这些字段。

```json
{
  "background": "嘉宾背景",
  "expertise": "擅长领域",
  "personality": "性格特点",
  "speakingStyle": "表达风格",
  "sensitiveTopics": ["不愿轻易回答的话题"],
  "defaultAttitude": "友好/谨慎/强势",
  "answerDepth": "浅/中/深",
  "commonAvoidancePattern": "遇到尖锐问题时如何回避"
}
```

嘉宾行为规则：

- 训练中只扮演嘉宾，不主动教用户怎么采访。
- 只有在复盘阶段才评价用户表现。
- 回答应有人的语气，不要像百科解释。
- 可以有停顿、保留、修正和不确定，但不能胡编真实人物事实。
- 如果用户问题很空，嘉宾可以回答得短一些。
- 如果用户问题具体，嘉宾应给出更具体的细节。
- 如果用户追问到关键点，嘉宾可以暴露更深层的原因、情绪或代价。

### 7.12.6 Follow-up Opportunity Detection

追问训练是本产品的核心差异化。复盘必须识别用户是否抓住了嘉宾回答中的“可追问信号”。

可追问信号包括：

| Signal Type | Examples | Suggested Follow-up |
| --- | --- | --- |
| 时间信号 | 第一次、当时、后来、某个阶段 | “具体是哪个时刻？” |
| 情绪信号 | 后悔、害怕、压力、犹豫 | “当时这种压力具体来自哪里？” |
| 冲突信号 | 团队分歧、客户反对、家人不理解 | “那次分歧最激烈的点是什么？” |
| 模糊判断 | 很难、很多、没办法、不适合 | “能举一个具体例子吗？” |
| 关键选择 | 放弃、转型、裁员、融资、换方向 | “你做这个选择时放弃了什么？” |
| 责任归因 | 市场原因、团队原因、自己判断失误 | “你自己承担哪一部分责任？” |
| 数据信号 | 增长下滑、转化低、现金流紧张 | “那个数据具体低到什么程度？” |
| 他人反馈 | 客户提醒、团队反对、投资人质疑 | “对方原话大概是什么？” |

复盘时必须检查：

- 嘉宾是否给出了可追问信号。
- 用户下一轮是否承接该信号。
- 如果用户没有承接，给出错过的追问机会。
- 如果用户承接了，说明这次追问为什么有效。

示例：

嘉宾说：

> 当时其实有一个客户提醒过我们，但我们没有太当回事。

如果用户下一轮没有追问客户提醒，复盘应指出：

> 这里错过了关键追问点。你可以问：“那个客户具体提醒了什么？你们当时为什么没有听进去？”

### 7.12.7 Review Scoring Rubric

复盘评分必须有证据。不能只输出分数。

建议将 `scores` 扩展为对象结构：

```json
{
  "questionClarity": {
    "score": 8,
    "evidence": "第 2 轮问题聚焦现金流节点，比较具体。",
    "improvement": "第 5 轮问题同时问了团队、销售和融资，应拆开。"
  }
}
```

如果 MVP 暂时只实现数字分数，也必须在 `summary`、`weakQuestions` 和 `missedFollowUps` 中体现证据。

#### Question Clarity

| Score | Standard |
| --- | --- |
| 0-3 | 问题过长、过散、难回答 |
| 4-6 | 多数问题能回答，但较泛 |
| 7-8 | 问题具体、单一、有方向 |
| 9-10 | 问题短、有力，能自然引出高价值回答 |

#### Structure

| Score | Standard |
| --- | --- |
| 0-3 | 问题顺序混乱，频繁跳题 |
| 4-6 | 有基本顺序，但推进较弱 |
| 7-8 | 能从背景进入细节，再到洞察 |
| 9-10 | 结构清晰，有层层深入和自然收束 |

#### Follow-up Depth

| Score | Standard |
| --- | --- |
| 0-3 | 几乎没有追问，只照提纲问 |
| 4-6 | 有追问，但多停留在表层 |
| 7-8 | 能抓住嘉宾关键词继续深入 |
| 9-10 | 能连续追问，逼近具体事件、原因和代价 |

#### Listening

| Score | Standard |
| --- | --- |
| 0-3 | 基本不承接嘉宾回答 |
| 4-6 | 偶尔承接，但容易跳到下一个问题 |
| 7-8 | 多数时候能基于回答调整问题 |
| 9-10 | 能准确抓住信号，并自然改变采访路径 |

#### Expression Efficiency

| Score | Standard |
| --- | --- |
| 0-3 | 铺垫太长，问题不清 |
| 4-6 | 能表达意图，但有冗余 |
| 7-8 | 表达清楚，问题长度适中 |
| 9-10 | 简洁、有节奏、让嘉宾容易进入回答 |

#### Control

| Score | Standard |
| --- | --- |
| 0-3 | 遇到回避、跑题、冷场时无法处理 |
| 4-6 | 能尝试拉回，但方式生硬 |
| 7-8 | 能较自然地拉回主题或重问 |
| 9-10 | 能在保持尊重的同时推进关键问题 |

### 7.12.8 JSON Validation and Fallback

所有结构化 AI 输出必须做 JSON 校验。

要求：

- 优先使用 JSON mode 或 schema validation。
- 解析失败时，自动清理 Markdown 包裹、前后解释文本和多余符号。
- 清理后仍失败，最多自动重试 1 次。
- 重试仍失败，使用本地 fallback 模板生成基础内容。
- fallback 时向用户展示温和提示：“已使用基础模板生成，可稍后重新生成。”

提纲生成校验：

- 必须包含所有必需字段。
- `mainQuestions` 数量必须为 6-8。
- `followUpQuestions` 数量必须为 6-8。
- `riskTips` 数量必须为 3。
- 字段为空时必须重试或用 fallback 补齐。

复盘生成校验：

- `overallScore` 必须为 0-100。
- 六项能力评分必须为 0-10。
- `weakQuestions` 中每项必须包含 `betterVersion`。
- `missedFollowUps` 中每项必须包含 `suggestedFollowUp`。
- 如果用户对话少于 3 轮，必须包含样本不足提示。

### 7.12.9 Safety Rules for Real People

产品训练对象永远是“模拟嘉宾”，不是“真实人物本人”。

如果用户输入真实人物姓名，系统可以做：

- 基于公开资料帮用户设计采访问题。
- 生成未具名的“某类人物风格”模拟嘉宾。
- 讨论该人物公开表达过的观点，但要避免声称代表本人。

系统不可以做：

- 用第一人称冒充真实人物。
- 伪造真实人物私密经历。
- 模仿真实人物声音。
- 使用未经授权的肖像或数字人形象。
- 对真实人物输出未经证实的争议事实。

推荐安全改写：

> 可以模拟一位“强观点科技创业者”类型的嘉宾，用于采访训练，但不会冒充某位真实人物本人。

### 7.12.10 Model Settings

建议按场景设置不同生成参数。

| Scenario | Suggested Temperature | Reason |
| --- | ---: | --- |
| 提纲生成 | 0.6 | 需要有创意，但不能发散 |
| 嘉宾回复 | 0.7 | 需要自然、有人味和角色感 |
| 复盘报告 | 0.3 | 需要稳定、严格、可复现 |
| JSON 修复 | 0.1 | 只做格式修复，不增加新内容 |

Prompt 应集中管理，便于版本迭代。每个 prompt 应有版本号，例如：

- outline_prompt_v1
- guest_prompt_v1
- review_prompt_v1

### 7.12.11 AI Acceptance Test Cases

开发完成后，必须用以下固定配置做人工验收。

| Case | Config | Expected Result |
| --- | --- | --- |
| 1 | 创业者 + 失败复盘 + 深度访谈 + 进阶 | 提纲能追问失败原因、责任、代价和复盘 |
| 2 | 投资人 + 行业趋势 + 犀利追问 + 挑战 | 问题关注判断依据、案例和风险，嘉宾会适度回避 |
| 3 | 作家 + 成长经历 + 故事挖掘 + 新手 | 问题能引导具体故事、人物和情绪 |
| 4 | 企业高管 + 价值观冲突 + 控场训练 + 挑战 | 嘉宾可能回避，复盘能评价控场和重问 |
| 5 | 自媒体创作者 + 作品背后 + 轻松聊天 + 新手 | 语气自然，但问题仍要具体 |

每个 case 的验收项：

- 提纲是否具体。
- 主问题是否按顺序推进。
- 至少 50% 的问题是否包含具体场景、事件、判断、冲突、代价或例子。
- 嘉宾回复是否符合人物类型和难度。
- 复盘是否引用用户真实问题。
- 复盘是否指出错过的追问机会。
- 替代问法是否比原问题更具体。
- 是否没有冒充真实名人。

### 7.12.12 Examples and Anti-examples

#### Bad Question

> 你怎么看创业失败？

Problem:

- 太大。
- 没有场景。
- 难以引出具体故事。

Better:

> 你第一次意识到公司可能撑不下去，是在哪一个具体时刻？

#### Bad Guest Reply

> 创业失败是一个复杂的问题，通常涉及市场、团队、资金等多个因素。创业者应该保持学习心态。

Problem:

- 像 AI 助手讲课。
- 没有嘉宾经历感。
- 无法训练追问。

Better:

> 真正让我意识到危险的不是账上没钱，而是连续三周销售会都没有新进展。那时候团队还在讨论产品细节，但我心里已经知道，问题可能不是功能不够，而是客户根本没有那么急。

#### Bad Review

> 你表现不错，问题比较清楚，但还可以更深入。

Problem:

- 没有证据。
- 没有引用用户问题。
- 没有替代问法。

Better:

> 第 3 轮嘉宾提到“连续三周销售没有新进展”，这是一个很好的追问信号。但你下一轮直接问了团队管理，错过了销售失败原因。可以改问：“那三周里，你们具体尝试了哪些销售动作？是哪一步最早失效？”

## 7.13 MVP Quality Bar

MVP 可接受：

- UI 简洁，不需要视觉特别复杂。
- 只支持文字对话。
- 只支持本地历史。
- 不支持登录。
- 不支持支付。

MVP 不可接受：

- 用户必须自己写长 prompt 才能开始。
- 生成的问题全部空泛。
- AI 嘉宾一直像助手讲课。
- 复盘只给鼓励，不指出具体问题。
- 出现冒充真实名人的表达。
- 刷新页面后当前训练完全丢失，且没有任何保护。

## 8. Release

### 8.1 MVP Release Plan

建议分 4 个阶段开发。

#### Phase 1: Static Product Shell

目标：

- 完成基础页面和选择式配置。
- 不接 AI，先用 mock 数据展示流程。

交付：

- Home / Training Setup
- Outline Preview mock
- Interview Simulation mock
- Review Report mock
- History mock

验收：

- 用户能从配置走到复盘完整流程。
- 页面在桌面和手机宽度可用。

#### Phase 2: AI Outline and Guest Chat

目标：

- 接入 AI 生成采访提纲。
- 接入 AI 模拟嘉宾对话。

交付：

- POST /api/outlines 或前端等价方法。
- POST /api/guest-replies 或前端等价方法。
- loading、error、retry 状态。

验收：

- 用户选择配置后能生成相关提纲。
- 用户能和嘉宾完成至少 10 轮对话。
- 嘉宾不会冒充真实名人。

#### Phase 3: AI Review and History

目标：

- 接入 AI 复盘。
- 保存训练历史。

交付：

- POST /api/reviews 或前端等价方法。
- Review Report 页面。
- History 页面。
- 再练一次功能。

验收：

- 复盘引用用户真实问题。
- 复盘包含评分、弱问题、替代问法和错过追问。
- 历史记录刷新后仍可查看。

#### Phase 4: Polish and Validation

目标：

- 优化体验，准备给早期用户试用。

交付：

- 基础埋点。
- 体验文案优化。
- 生成失败重试。
- 移动端适配。
- 简单反馈入口。

验收：

- 新用户无需说明即可完成一次训练。
- 完整训练成功率达到可测试状态。

### 8.2 Future Versions

MVP 之后可以扩展：

- 语音输入和语音输出。
- 真实采访前资料整理。
- 用户自定义嘉宾背景。
- 高级追问训练模式。
- 采访片段逐句点评。
- 用户能力成长曲线。
- 付费训练包。
- 团队版和企业版。
- 合规授权的人物 IP。

### 8.3 Open Questions

需要在 MVP 测试中回答：

- 用户更愿意练“完整采访”还是“专项能力”？
- 哪类嘉宾最吸引用户？
- 哪类主题最容易带来复训？
- 用户是否愿意为复盘报告付费？
- 用户是否需要语音，还是文字已能验证核心价值？
- 复盘评分是否能被用户理解和信任？
- 选择维度是否太多，是否需要进一步简化？

### 8.4 Critical Assumptions

以下假设必须被验证：

1. 选择式启动比自由输入更适合新手用户。
2. 用户认为采访提纲本身有价值。
3. 用户愿意完成至少 6 轮模拟对话。
4. 具体替代问法比单纯评分更有价值。
5. 不使用真实名人拟真，也能满足首批用户训练需求。
6. 文字 MVP 足以验证核心需求。

### 8.5 Success Criteria for MVP

MVP 可判定成功的条件：

- 首批测试用户能无指导完成一次训练。
- 用户主动保存或复制采访提纲。
- 用户认为复盘指出了自己没意识到的问题。
- 用户愿意用同一配置再练一次，或换一个主题继续练。
- 至少一部分用户表达明确付费意愿。

MVP 可判定失败的信号：

- 用户只生成提纲，不愿进入模拟对话。
- 用户觉得模拟嘉宾不真实，无法练习。
- 用户觉得复盘太空泛。
- 用户更想要“名人聊天”而不是“采访训练”。
- 用户需要大量手动输入才能得到满意结果。

## Appendix A: Default MVP Option Set

首版默认推荐配置：

```json
{
  "mode": "full_rehearsal",
  "guestType": "founder",
  "topicDirection": "failure",
  "style": "deep",
  "difficulty": "intermediate"
}
```

默认生成任务示例：

> 模拟采访一位经历过创业失败的连续创业者，围绕第一次失败展开，训练用户如何从表层原因追问到真实决策、团队压力和个人反思。

## Appendix B: Example Generated Outline

```json
{
  "title": "采访一位连续创业者：第一次失败真正教会了什么",
  "trainingGoal": "训练如何围绕失败经历进行具体追问，避免停留在泛泛的成功学总结。",
  "guestProfile": "一位经历过两次创业的模拟嘉宾。第一次创业因销售和现金流问题失败，第二次创业后开始重视客户验证和组织节奏。",
  "mainThread": "从失败事件进入，追问判断失误、团队压力、现金流危机和后来的复盘方法。",
  "openingLine": "今天我们不从成功经验聊起，我想先请你回到第一次创业失败的那个阶段。",
  "mainQuestions": [
    "你第一次意识到那家公司可能撑不下去，是在哪一个具体时刻？",
    "如果只能选一个最关键的失败原因，你会选产品、销售、团队还是现金流？为什么？",
    "当时有没有一个数据或客户反馈，其实已经提醒你们方向错了，但你们没有重视？",
    "你作为创始人，在哪个判断上承担最大责任？",
    "团队里第一次出现明显动摇时，你是怎么处理的？",
    "这次失败后来具体改变了你第二次创业的哪三个动作？"
  ],
  "followUpQuestions": [
    "你刚才说太晚重视销售，具体晚在了哪个阶段？",
    "当时为什么没有更早承认这个问题？",
    "有没有人提醒过你？你当时为什么没有听进去？",
    "如果重来一次，你会在第一个月就验证什么？",
    "你说团队压力很大，最典型的一次冲突是什么？",
    "这件事对你个人性格有什么影响？"
  ],
  "riskTips": [
    "不要只问'你学到了什么'，要追问具体事件。",
    "嘉宾可能会把失败归因于市场，需要追问自己的责任。",
    "如果嘉宾回答抽象，要求他举一个真实场景。"
  ]
}
```

## Appendix C: Development Checklist for AI Agent

AI agent 开发时建议按以下顺序执行：

1. 建立项目结构。
2. 实现配置项常量。
3. 实现选择式配置页面。
4. 实现提纲预览页面，先用 mock 数据。
5. 实现对话页面，先用 mock 回复。
6. 实现复盘页面，先用 mock 报告。
7. 实现历史保存。
8. 建立 prompt 管理模块，并为 outline、guest、review prompt 添加版本号。
9. 实现 AI JSON schema 校验和 fallback 模板。
10. 接入提纲生成 AI，并按 7.12 的提纲质量标准验收。
11. 接入嘉宾回复 AI，并按嘉宾类型、风格、难度验证差异。
12. 接入复盘 AI，并确保复盘引用用户真实问题。
13. 实现追问信号识别和错过追问机会输出。
14. 增加 loading、error、retry。
15. 增加真实人物安全规则。
16. 增加基础埋点。
17. 做移动端检查。
18. 用默认配置完成一次端到端测试。
19. 用 7.12.11 的 5 个 AI 验收用例完成输出质量检查。
