# 产品工作台（/work）推进记录

> **用途**：记录产品内拟真页面（`/work/*`）的阶段性进展——上一步做了什么、下一步做什么。  
> **关联文档**：[project-plan.local.md](./project-plan.local.md) · [product-roadmap.local.md](./product-roadmap.local.md) · [product-brief.local.md](./product-brief.local.md)  
> **设计参照**：[apple/DESIGN.md](../apple/DESIGN.md)（Apple 风格设计分析；产品页 UI 以此为基础适配，非营销站现有终端风）

**最后更新**：2026-06-10（Sprint 1 工作台壳层 + Dashboard 打磨）

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
- 项目栏：三级项目切换下拉、L2 元信息（开始 / 预计完成 / 状态）、中部视图切换（概览 / 工作流 / 文件）；滚动主内容区时项目栏 parchment 底色 + 底边线 + 外阴影
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

**Agent 对话窗（`components/work/agent-chat-panel.tsx`）**

- 右侧固定面板，演示对话 + 输入发送（Mock 回复）

**Dashboard 内容区**

- **项目阶段**：与任务计划「进行中」里程碑联动，展示待办清单（完成态 + 悬浮说明）
- **任务计划**（原项目排程）：甘特图；四色块（进行中 / 已完成 / 未开始 / 待确认）；横轴局部滚动 + 冻结表头 / 左列
- **角色卡片**：含项目主控（Mock S1 数据未改）

**工程**

- `WorkProjectProvider` · `WorkFilesProvider` 注入 `app/work/layout.tsx`
- Apple-inspired 产品 UI：`app/work/work.css`

### 5. 当前缺口（明确未做）

- **确认流 Modal**（排程确认 + 交付确认）未实现
- **角色详情完整 Tab**（Prompt / 知识 / 交付契约）未实现
- 工作流 / 文件 Tab 仍为占位页（路由已通）
- 手机端：文件管理器、Agent 窗待抽屉化；仅项目栏保留视图切换
- Agent 对话、文件 CRUD 均为前端 Mock，无后端持久化

---

## 下一步待做

> **当前优先级**：**确认流 Modal** → 角色详情 → 工作流 / 文件 Tab 内容填充。

### Sprint 2 — 确认流 + 角色详情（P1-b / P1-c）

| 任务 | 路径 / 组件 |
|------|-------------|
| 排程确认 Modal | 挂接任务计划 / 主控卡片 |
| 交付确认 Modal | 挂接分析师卡片「待确认」 |
| Mock state | `lib/work-state.tsx` 或 Context，Confirm 后更新 UI |
| 角色详情 | `/work/roles/analyst`：Prompt / 知识 / 交付契约 / 角色内规范 |

### Sprint 3 — 其余 Tab + 打磨（P1-d / P2 / P3）

| 任务 | 说明 |
|------|------|
| 工作流 Tab | `/work/workflow` 步骤列表或流程图 |
| 文件 Tab | `/work/docs` 与左侧文件管理器联动或文档阅读态 |
| 运行日志（可选） | `/work/runs` |
| 体验 | 手机抽屉、无障碍（Modal 焦点）、Agent 真实接入（远期） |

---

## 当前 Dashboard 布局（已实现）

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [AF AgentFlow]                                    [ 全部项目 ]           │
├──────────────────────────────────────────────────────────────────────────┤
│  竞品分析 26Q2 ▼     [ 概览 ] [ 工作流 ] [ 文件 ]     开始·完成·状态      │
├──────────┬───────────────────────────────────────────────┬───────────────┤
│ 文件管理  │  项目阶段          │  任务计划（甘特）           │  Agent 对话  │
│ 搜索+树  │  ─────────────────┴────────────────────────── │               │
│ 权限面板  │  角色卡片 × N                                    │               │
└──────────┴───────────────────────────────────────────────┴───────────────┘
```

---

## 设计适配要点（参照 apple/DESIGN.md）

| 维度 | Agent Flow 产品页用法 |
|------|------------------------|
| 交互色 | Action Blue `#0066cc` |
| 背景 | `#f5f5f7` parchment + `#ffffff` 卡片 |
| 阴影 | 卡片 hairline；项目栏滚动时轻外阴影 |
| 导航 | 顶栏平台标识 + 项目栏中部 pill Tab |

---

## 默认演示路径（S1）

1. `/work/dashboard` — 阶段待办、任务计划、角色卡片、文件树、Agent  
2. 切换项目下拉 / `/work/projects` 总览  
3. 确认排程（Modal）— **待做**  
4. 确认分析师交付（Modal）— **待做**  
5. `/work/workflow` — 分析师 → PM 交接  
6. `/work/roles/analyst` — 角色配置详情  

---

## 修订记录

| 日期 | 修订 |
|------|------|
| 2026-06-10 | 初稿：上一步 / 下一步；路由定为 `/work/*`；设计参照 `apple/DESIGN.md` |
| 2026-06-10 | Sprint 1 进展：Shell 三栏、项目树、文件管理器、Agent 窗、Dashboard 甘特/阶段/任务计划打磨 |
