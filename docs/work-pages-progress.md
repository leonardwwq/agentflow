# 产品工作台（/work）推进记录



> **用途**：记录产品内拟真页面（`/work/*`）的阶段性进展——上一步做了什么、下一步做什么。  

> **关联文档**：[project-plan.local.md](./project-plan.local.md) · [product-roadmap.local.md](./product-roadmap.local.md) · [product-brief.local.md](./product-brief.local.md)  

> **设计参照**：[apple/DESIGN.md](../apple/DESIGN.md)（Apple 风格设计分析；产品页 UI 以此为基础适配，非营销站现有终端风）



**最后更新**：2026-06-12（Dashboard / 角色卡片 / 文件管理器待确认联动）



---



## 上一步已完成



### 1. 营销站与站点基础（P0 ✅）



- 品牌与文案统一：`lib/site-config.ts`、`lib/marketing-data.ts`、`lib/blog-data.tsx`

- 营销五页上线：首页、`/projects`（功能介绍）、`/workbench`（营销路线图）、`/introduction`、`/blog`

- 页头 / 页脚 / Hero、Favicon、OG 图、metadata、sitemap、robots

- 模板残留清理（`/notes` 下线、robots 修正）

- `npm run build` 通过；生产部署 [agentflow.weipm.com](https://agentflow.weipm.com)



### 2. 产品与工程规划（文档层 ✅）



- **产品模型 v0.2** 已确认：Dashboard 主界面、工作流引擎、项目主控排程、人确认、Tab 导航

- **页面清单 P-1～P-7** 已确认（Demo 范围）；P-8～P-10 留 Beta

- **默认演示场景 S1**：个人竞品分析项目（叙事见 `/introduction`）

- **路由约定已确认**：产品内页面使用 **`/work/{页面名称}`**（非 `/demo`，非营销站 `/projects` / `/workbench`）



| 页面 | 路径 |

|------|------|

| Dashboard · 概览 | `/work/dashboard` |

| 工作流 | `/work/workflow` |

| 文件 | `/work/docs` |

| 全部项目 | `/work/projects` |

| 角色详情 | `/work/roles/[roleId]` |

| 运行日志（可选） | `/work/runs` |



### 3. 设计参照入库



- 已添加 [apple/DESIGN.md](../apple/DESIGN.md)：Apple 官网设计分析（色板、字阶、圆角、组件语法、Do's & Don'ts）

- **产品页视觉方向**：参照 Apple 的「UI 退后、内容清晰、单一 Action Blue 交互色、低装饰阴影」原则；与当前营销站终端/scanlines 风格**分离**



### 4. Sprint 1 — 工作台壳层 + Dashboard（2026-06-10 ✅ 大部分完成）



**产品 Shell（`components/work/work-shell.tsx`）**



- 顶栏：AgentFlow 平台标识 +「全部项目」入口（全宽铺满）

- 三栏布局：左文件管理器 · 中主内容（独立滚动）· 右 Agent 对话窗

- 移除营销站「回到首页 / 概念演示」顶栏



**项目体系（`lib/work-projects.ts` + Context）**



- L1「Agent自动化智能投放平台」→ L2 子项目（当前：竞品分析 26Q2）→ L3 示例子项

- 项目状态色点：未开始 / 进行中 / 待确认 / 已完成

- `/work/projects` 全部项目总览页



**文件管理器（`components/work/project-file-manager.tsx`）**



- 每项目独立文件树（Mock：`lib/work-files.ts`）

- 搜索、新建文件夹 / 文件、重命名、删除

- 按角色配置只读 / 读写 / 管理权限



**Dashboard 内容区**



- **项目阶段**：与任务计划「进行中」里程碑联动，展示待办清单（完成态 + 悬浮说明）

- **任务计划**（原项目排程）：甘特图；四色块（进行中 / 已完成 / 未开始 / 待确认）；横轴局部滚动 + 冻结表头 / 左列

- **角色卡片**：含项目主控（Mock S1 数据）



**工程**



- `WorkProjectProvider` · `WorkFilesProvider` 注入 `app/work/layout.tsx`

- Apple-inspired 产品 UI：`app/work/work.css`



### 5. Shell 布局重构 + Agent 对话窗打磨（2026-06-12 ✅）



**Shell 布局调整（`work-shell.tsx` · `project-switcher.tsx` · `project-file-manager.tsx`）**



- 移除原全宽「项目栏」次顶栏，主内容与右侧 Agent 面板顶格对齐，减少纵向占用

- **左侧栏 `w-72` 合一**：顶部项目切换器 + 元信息（开始 / 预计完成 / 状态三列紧凑排列），下方文件管理器同宽衔接

- **视图切换**（概览 / 工作流 / 文件）移至中间主内容区顶部；手机端在主内容顶部展示项目信息 + 视图切换

- 中间主内容区滚动条改为浅色样式（`.work-main-scroll`，`#e0e0e5`）



**Agent 对话窗（`components/work/agent-chat-panel.tsx`）**



- **顶行标签栏**：左侧可关闭的对话标签页（横向滚动）；竖线分隔；右侧仅图标——`+` 新建对话、`时钟` 历史对话列表（Mock）

- **角色区**：标题显示当前角色名（默认 **项目主控**），名称右侧下拉箭头切换角色；再右侧 **书本图标** 跳转角色知识库（主控 → `/work/docs`，其他角色 → `/work/roles/[roleId]`）

- 下拉含项目全部角色 +「添加新角色」（前端 Mock，可动态增角色）

- 每标签页独立维护对话内容与所选角色；演示发送仍为 Mock 回复

- Mock 数据：`lib/work-data.ts` 项目主控 `responsibility` 更新为「负责项目规划」（Dashboard 角色卡片同步）



### 6. Dashboard 中间工作台优化 + 确认流 Modal（2026-06-12 ✅）



**Dashboard 内容区（`dashboard-content.tsx` · `stage-block` · `schedule-gantt` · `role-card`）**



- **待确认横幅**：顶部展示待审阅项数量，快捷入口「审阅排程 / 审阅交付」

- **项目阶段**：日期范围徽章、待办进度条、统一 `work-section-label` 字阶

- **任务计划**：版本徽章（v3 已确认 / v4 待确认）、进行中行高亮、「今天」竖线标记、图例紧凑化

- **角色卡片**：待确认项置顶排序、橙色描边强调；确认操作改为「最近交付」行右侧文字链



**确认流 Modal（`confirm-modal.tsx`）**



- 排程确认：项目主控 v4 草案 → 确认后更新版本徽章、主控卡片状态

- 交付确认：分析师交付物 → 确认后更新卡片为「已确认」

- Mock state 在 `dashboard-content.tsx` 客户端维护，确认后 UI 即时刷新



### 7. 角色卡片形象 + 文件管理器待确认标记（2026-06-12 ✅）



**角色卡片（`role-card.tsx` · `role-avatar.tsx`）**



- 移除「角色卡片」小标题，保留「最近交付与状态」

- 左侧 SVG 角色半身像（主控 / 分析师 / 研究员 / PM 四色区分）；动态新增角色首字母 fallback

- 头像缩小至 44px，仅与名称 + 职责同行；交付信息左边界与头像左对齐

- 「确认排程 / 确认交付」为蓝色文字按钮，置于最近交付物名称右侧



**文件管理器待确认（`project-file-manager.tsx` · `lib/work-files.ts`）**



- 文件节点 `confirmStatus`：`competitor-matrix-2026-06.md`、`schedule-v4-draft.json` 初始为待确认

- 待确认文件：橙色图标 +「待确认」徽章；父文件夹橙色图标 + 自动展开

- 搜索区上方摘要「N 个文件待确认」

- Dashboard 确认后与文件树联动（`confirmFile` · `confirmFileIds`），标记即时清除



### 8. 当前缺口（明确未做）



- **角色详情完整 Tab**（Prompt / 知识 / 交付契约）未实现

- 工作流 / 文件 Tab 仍为占位页（路由已通）

- 手机端：文件管理器、Agent 窗待抽屉化

- Agent 历史对话、多标签持久化、知识库跳转后的阅读态均为前端 Mock，无后端持久化



---



## 下一步待做



> **当前优先级**：**角色详情** → 工作流 / 文件 Tab 内容填充 → Agent 体验打磨。



### Sprint 2 — 角色详情 + 确认流深化（P1-b / P1-c）



| 任务 | 路径 / 组件 |

|------|-------------|

| ~~排程确认 Modal~~ | ✅ `confirm-modal.tsx` + 主控卡片 |

| ~~交付确认 Modal~~ | ✅ `confirm-modal.tsx` + 分析师卡片 |

| ~~Mock state~~ | ✅ `dashboard-content.tsx` 客户端 state |

| 确认流深化 | 拒绝/修订路径、无障碍焦点陷阱、全局 Context 抽离 |

| 角色详情 | `/work/roles/analyst`：Prompt / 知识 / 交付契约 / 角色内规范 |



### Sprint 3 — 其余 Tab + 打磨（P1-d / P2 / P3）



| 任务 | 说明 |

|------|------|

| 工作流 Tab | `/work/workflow` 步骤列表或流程图 |

| 文件 Tab | `/work/docs` 与左侧文件管理器联动或文档阅读态 |

| 运行日志（可选） | `/work/runs` |

| Agent 体验 | 标签页重命名/关闭策略、历史对话恢复、知识库侧栏或抽屉（替代跳转） |

| 体验 | 手机抽屉、无障碍（Modal 焦点）、Agent 真实接入（远期） |



---



## 当前 Dashboard 布局（已实现）



```

┌──────────────────────────────────────────────────────────────────────────┐

│  [AF AgentFlow]                                    [ 全部项目 ]           │

├──────────┬───────────────────────────────────────────────┬───────────────┤

│ 竞品分析▼│  [ 概览 ] [ 工作流 ] [ 文件 ]                  │ [对话1 ×][+]🕐│

│ 开始·完成│                                               │ 项目主控▼  📖 │

│ ·状态    │  项目阶段          │  任务计划（甘特）           │               │

│──────────│  ─────────────────┴────────────────────────── │  （对话区）    │

│ 文件管理  │  [待确认横幅] 阶段 │ 甘特                         │               │

│ 待确认标记│  角色卡片（头像+交付状态）                         │               │

│ 搜索+树  │                                               │               │

│ 权限面板  │                                               │               │

└──────────┴───────────────────────────────────────────────┴───────────────┘

```



---



## 设计适配要点（参照 apple/DESIGN.md）



| 维度 | Agent Flow 产品页用法 |

|------|------------------------|

| 交互色 | Action Blue `#0066cc` |

| 背景 | `#f5f5f7` parchment + `#ffffff` 卡片 |

| 阴影 | 卡片 hairline；顶栏 backdrop-blur |

| 导航 | 顶栏平台标识；主内容区 pill Tab；左栏项目切换 |

| 滚动条 | 主内容区 / Agent 对话区浅色细滚动条 |



---



## 默认演示路径（S1）



1. `/work/dashboard` — 阶段待办、任务计划、角色卡片、文件树、Agent  

2. 切换项目下拉 / `/work/projects` 总览  

3. Agent 窗：切换角色、新建对话标签、查看知识库入口  

4. 确认排程（Modal）— **可做**（横幅 / 主控卡片「确认排程」文字链 / 文件树 `schedule-v4-draft.json`）  

5. 确认分析师交付（Modal）— **可做**（分析师卡片「确认交付」文字链 / 文件树矩阵 md）  

6. `/work/workflow` — 分析师 → PM 交接  

7. `/work/roles/analyst` — 角色配置详情  



---



## 修订记录



| 日期 | 修订 |

|------|------|

| 2026-06-10 | 初稿：上一步 / 下一步；路由定为 `/work/*`；设计参照 `apple/DESIGN.md` |

| 2026-06-10 | Sprint 1 进展：Shell 三栏、项目树、文件管理器、Agent 窗、Dashboard 甘特/阶段/任务计划打磨 |

| 2026-06-12 | Shell 布局重构：项目信息并入左栏、视图切换入主区；Agent 窗标签栏/角色切换/知识库入口；主区浅色滚动条 |

| 2026-06-12 | Dashboard 工作台：待确认横幅、阶段进度条、甘特版本/今天标记、角色卡片确认流 Modal |

| 2026-06-12 | 角色卡片 SVG 头像与布局打磨；文件管理器待确认标记与 Dashboard 确认联动 |
