# 产品工作台（/work）推进记录

> **用途**：记录产品内拟真页面（`/work/*`）的阶段性进展——上一步做了什么、下一步做什么。  
> **关联文档**：[project-plan.local.md](./project-plan.local.md) · [product-roadmap.local.md](./product-roadmap.local.md) · [product-brief.local.md](./product-brief.local.md)  
> **设计参照**：[apple/DESIGN.md](../apple/DESIGN.md)（Apple 风格设计分析；产品页 UI 以此为基础适配，非营销站现有终端风）

**最后更新**：2026-06-10（Sprint 1 Dashboard 首版已上线）

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
| 文档 | `/work/docs` |
| 资料库 | `/work/assets` |
| 角色详情 | `/work/roles/[roleId]` |
| 运行日志（可选） | `/work/runs` |

### 3. 设计参照入库

- 已添加 [apple/DESIGN.md](../apple/DESIGN.md)：Apple 官网设计分析（色板、字阶、圆角、组件语法、Do's & Don'ts）
- **产品页视觉方向**：参照 Apple 的「UI 退后、内容清晰、单一 Action Blue 交互色、低装饰阴影」原则；与当前营销站终端/scanlines 风格**分离**——营销站保持现有调性，**`/work/*` 单独一套产品 UI**

### 4. Sprint 1 Dashboard 首版（2026-06-10 ✅ 部分完成）

- `/work/dashboard`：阶段方块 + 排程表 + 角色卡片（含项目主控）
- 路由壳：`app/work/layout.tsx` + Tab 导航（概览 / 工作流 / 文档 / 资料库）
- Mock 数据：`lib/work-data.ts`（S1 竞品分析）
- Apple-inspired 产品 UI：`app/work/work.css`（与营销站终端风分离）
- 占位 Tab：`/work/workflow`、`/work/docs`、`/work/assets`
- 角色详情占位：`/work/roles/[roleId]`
- 入口：`site-config` CTA → `/work/dashboard`；sitemap 已加入

### 5. 当前缺口（明确未做）

- ~~**无任何 `/work/*` 路由或组件**~~ → Dashboard 首版已上线
- **确认流 Modal**（排程确认 + 交付确认）未实现
- **角色详情完整 Tab**（Prompt / 知识 / 交付契约）未实现
- 工作流 / 文档 / 资料库 Tab 仍为占位页

---

## 下一步待做

> **当前优先级**：先做 **Dashboard**（`/work/dashboard`）。确认流、角色详情、其余 Tab 按序跟进。  
> **视觉**：实现时参照 [apple/DESIGN.md](../apple/DESIGN.md)；若你有补充设计稿（Figma / 截图），在开工 Dashboard 组件前提供即可。

### Sprint 1 — Dashboard 可演示（P1-a）

**目标**：从首页 1～2 次点击进入拟真 Dashboard，30 秒讲清「阶段 + 排程 + 角色卡片 + 项目主控」。

| # | 任务 | 产出 |
|---|------|------|
| 1 | 路由壳 | `app/work/layout.tsx`、`app/work/page.tsx`（redirect → dashboard）、`app/work/dashboard/page.tsx` |
| 2 | 产品 Shell | `components/work/work-shell.tsx`：项目名 Header + Tab（概览 / 工作流 / 文档 / 资料库） |
| 3 | Mock 数据 | `lib/work-data.ts`：S1 竞品分析（阶段「分析中」、排程 v3 已确认 + v4 草案、3～4 角色卡片） |
| 4 | Dashboard 三区域 | `stage-block` · `schedule-table` · `role-card`（含项目主控特殊卡片） |
| 5 | 设计适配 | 将 Apple 令牌映射到 Tailwind/CSS 变量（见下方「设计适配要点」） |
| 6 | 入口打通 | `site-config` CTA → `/work/dashboard`；`marketing-data` roadmap url；`sitemap` 加入产品路由 |
| 7 | 占位 Tab | `/work/workflow`、`/work/docs`、`/work/assets` 可先空壳，避免 Tab 404 |

**Dashboard 布局**（[product-brief §3.1](./product-brief.local.md)）：

```
┌─────────────────────────────────────────────────────────┐
│  [ 概览 ] [ 工作流 ] [ 文档 ] [ 资料库 ]                  │
├──────────────┬──────────────────────────────────────────┤
│  项目阶段     │           项目排程表（大）                  │
├──────────────┴──────────────────────────────────────────┤
│  角色卡片 × N（含项目主控）                               │
└─────────────────────────────────────────────────────────┘
```

**验收**：

- [x] `npm run build` 通过
- [x] `/work/dashboard` 笔记本 + 手机可读（待线上 smoke test）
- [x] 首页 CTA 直达 Dashboard
- [x] 能演示：阶段、已确认 vs 待确认排程、角色卡片、项目主控

### Sprint 2 — 确认流 + 角色详情（P1-b / P1-c）

| 任务 | 路径 / 组件 |
|------|-------------|
| 排程确认 Modal | 挂接 Dashboard 排程区 / 主控卡片 |
| 交付确认 Modal | 挂接分析师卡片「待确认」 |
| Mock state | `lib/work-state.tsx` 或 Context，Confirm 后更新 UI |
| 角色详情 | `/work/roles/analyst`：Prompt / 知识 / 交付契约 / 角色内规范 |

### Sprint 3 — 其余 Tab + 打磨（P1-d / P1-e / P2 / P3）

| 任务 | 说明 |
|------|------|
| 工作流 Tab | `/work/workflow`（UI 形态待你排期；先占位或步骤列表） |
| 文档 / 资料库 | `/work/docs`、`/work/assets`：列表 + 各 1 条 mock 详情 |
| 运行日志（可选） | `/work/runs`：终端日志 → 卡片「待确认」 |
| 体验 | 无障碍（Modal 焦点）、手机 smoke test、离线演示包（可选） |

---

## 设计适配要点（参照 apple/DESIGN.md）

产品页 `/work/*` 建议从 Apple 规范抽取以下原则，**不必照搬营销页**：

| 维度 | Apple 参照 | Agent Flow 产品页用法 |
|------|------------|------------------------|
| 交互色 | Action Blue `#0066cc` | 主按钮、链接、Tab 选中、待确认 CTA |
| 背景 | `#ffffff` / `#f5f5f7` parchment | 页面底 + 卡片区交替，低噪音 |
| 正文 | SF Pro Text 17px / `#1d1d1f` | 系统字体栈 `-apple-system, system-ui`；Geist 可保留为 fallback |
| 标题 | Display 600 + 负字距 | 区域标题、项目名 |
| 圆角 | pill（CTA）· lg 18px（卡片）· sm 8px（utility） | 角色卡片、Modal、排程表容器 |
| 阴影 | 仅产品图；UI 无装饰阴影 | 卡片用 1px hairline `#e0e0e0`，不用 glow/scanlines |
| 导航 | global-nav 44px + sub-nav 52px frosted | 产品 Header：项目名 + Tab，parchment 半透明底 |

**与营销站边界**：

- 营销站（`/`、`/projects` 等）：保留现有终端风、primary 绿色、scanlines
- 产品工作台（`/work/*`）：Apple-inspired 清爽工作台，叙事一致、视觉独立

若你提供补充设计稿，可在此文档追加「页面级标注」小节（间距、组件态、截图链接）。

---

## 默认演示路径（S1）

1. `/work/dashboard` — 阶段、排程、角色卡片  
2. 确认排程（Modal）  
3. 确认分析师交付（Modal）  
4. `/work/workflow` — 分析师 → PM 交接  
5. `/work/roles/analyst` — 角色配置详情  

---

## 修订记录

| 日期 | 修订 |
|------|------|
| 2026-06-10 | 初稿：上一步 / 下一步；路由定为 `/work/*`；设计参照 `apple/DESIGN.md` |
