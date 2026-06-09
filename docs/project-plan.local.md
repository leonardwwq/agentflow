# Agent Flow 项目计划（本地）

> **说明**：本文件仅保存在本地，已加入 `.gitignore`，不会提交到 Git。  
> **产品内容与基调**见 [product-brief.local.md](./product-brief.local.md)；**功能模块与页面清单**见 [product-roadmap.local.md](./product-roadmap.local.md)。  
> 模板遗留文档（architecture / deployment 等）已改为本地参考，不进 Git；技术债清单见本地 `docs/improvement-checklist.md`（若保留）。

**最后更新**：2026-06-03

**生产地址**：https://agentflow.weipm.com

---

## 项目定位

**Agent Flow** — 多智能体协作平台的**拟真静态演示站**。

面向场景：路演、客户演示、作品集、内部分享。访客应感觉「像在用一个真实产品」，但**全程无后端、无真实 AI、无账号与数据持久化**。

叙事定位（对外话术）：个人项目里的 AI 角色协作台——Dashboard 看阶段/排程/交付，工作流定义协作，**项目主控**产出排程且需人确认；内容由 mock 承载，**不要求功能可执行**。详见 product-brief §1、§3 与 product-roadmap §2 页面清单。

当前仓库：**Next.js 静态/半静态营销站 + 若干拟真界面页**，一切以「好看、可信、可讲清故事」为准。

---

## 范围边界

### 要做

- 品牌统一的官网与多页面叙事（首页、功能、路线图、关于、更新日志等）
- **拟真 UI**：终端动效、假画布、假运行状态、假日志/进度（可用静态数据 + 轻量前端交互）
- 演示用截图、示意图、循环动画（CSS / 客户端 state，不接 API）
- 联系入口（邮件 / Telegram / 电话等，链到真实联系方式即可）
- 静态部署（Vercel 等），`build` 即可上线

### 不做

- 产品 MVP、真实工作流引擎、Agent 运行时
- 用户注册登录、权限、团队空间
- 数据库、后端 API、WebSocket、文件上传
- 真实 LLM 调用、工具集成、Webhook
- 内测招募、表单落库（除非以后单独加，**不在本计划内**）

---

## 阶段概览

| 阶段 | 目标 | 状态 |
|------|------|------|
| P0 | 品牌与信息架构（文案、导航、元数据、图标） | **已完成** |
| P1 | 拟真演示内容（各页 mock 与「像真产品」的界面） | 待办（营销站文案已有初版） |
| P2 | 演示体验打磨（动效、一致性、无障碍与性能够用即可） | 待办 |
| P3 | 静态发布与对外演示（域名、SEO、分享预览） | **部分完成** |

---

## P0 — 品牌与站点基础 ✅

### 已完成

- [x] 统一品牌名与文案：`lib/site-config.ts`
- [x] 页头 / 页脚 / Hero 与站点配置联动
- [x] 终端风格展示组件 `components/terminal-box.tsx`
- [x] Favicon / PWA 图标集（`app/icon.png`、`public/favicon-*`、`icon-192/512`、`site.webmanifest`）
- [x] OG 图与社交分享预览（`public/og-image.png`，首页截图，全站共用）
- [x] 各营销页 `metadata` 与 `site-config` 一致（`lib/page-metadata.ts` + `app/layout.tsx`）
- [x] 导航与各路由命名统一：首页 / 功能 `/projects` / 路线图 `/workbench` / 更新日志 `/blog` / 关于 `/introduction`
- [x] `NEXT_PUBLIC_SITE_URL` 生产环境已设为 `https://agentflow.weipm.com`（Vercel）
- [x] 动态 `app/robots.ts`、`app/sitemap.ts`；已删除模板残留的 `public/robots.txt`（原指向 eindev.ir）
- [x] 下线模板页 `/notes`（路由、sitemap、组件已移除）
- [x] 营销文案 v0.2 对齐（`lib/marketing-data.ts`、`lib/blog-data.tsx`）；页脚已去掉 EinCode attribution 链接
- [x] 博客 Markdown 渲染改进（`@tailwindcss/typography` + 行级解析）
- [x] `.env.example` 已进仓库；模板说明文档已加入 `.gitignore` 并不再远程跟踪
- [x] `npm run build` 通过

### 有意保留 / 未改

- [ ] `README.md` 仍为模板英文说明（GitHub 仓库首页；可后续改成 Agent Flow 简短 README）
- [ ] `site.webmanifest` 描述与 marketing 中「内测」标签——**按决定保留，不改为「演示中」**
- [ ] 每页独立 OG 图（`public/og-images/`）——全站一张默认图已够用

---

## P1 — 拟真静态演示内容

目标：每个**产品内页面**（见 product-roadmap §2）都能**讲 30 秒故事**，界面像「已经能跑」的产品。页面内细节与 UI 随设计用例补充；**路由由工程单独规划**。

### 营销站（非产品模块）

- [x] **首页**：功能区块、亮点、路线图摘要与 Hero 终端文案一致（内容在 `marketing-data` + `site-config`；CTA 仍可指向演示重点页优化）
- [x] **功能页**（`/projects`）：能力卡片 + 文案（可选后续加 1～2 屏「假界面」）
- [x] **路线图页**（`/workbench`）：叙事用里程碑（非真实排期承诺）
- [x] **关于页**（`/introduction`）：产品愿景 + 演示说明
- [x] **更新日志**（`/blog`）：v0.1 / v0.2 拟真版本说明（2 篇）

### 产品内页面（按 product-roadmap §7 优先级）— **下一阶段重点**

- [ ] **P1-a · P-1 Dashboard**（M1、M2、M3、M5）：Tab 壳（概览 | 工作流 | 文档 | 资料库）；阶段方块 + 大排程表 + 角色卡片（含项目主控）
- [ ] **P1-b · P-6 确认流**（M5）：至少 1 次「确认排程」+ 1 次「确认交付物」拟真交互
- [ ] **P1-c · P-5 角色详情**（M3）：prompt、知识指针、交付规范、角色内规范（≥1 完整角色）
- [ ] **P1-d · P-2 工作流**（M4）：工作流页（UI 形态待设计用例）
- [ ] **P1-e · P-3 / P-4 文档 & 资料库**（M6、M7）：列表 + 各 1 条 mock 详情
- [ ] **P1-f · P-7 运行**（M8，可选）：终端日志 → 卡片「待确认」

素材原则：**宁可少而精**；默认演示路径 Dashboard → 确认 → 工作流 → 角色详情。

---

## P2 — 演示体验与工程质量

演示站不必做完 improvement-checklist 全部项，但以下影响「像不像真的」：

- [ ] 视觉一致：色板、圆角、终端/面板组件复用（`terminal-box` 等）
- [x] 响应式：笔记本投屏 + 手机浏览——营销站前端已人工验收，无重大问题
- [x] 构建稳定：本地 `npm run build` 通过
- [ ] 关键 accessibility 项（焦点可见、按钮有 label），避免演示现场翻车
- [ ] 首屏与动效不过重（演示环境网络可能一般）

非目标：为真实产品做的 Server Components 大重构、完整测试覆盖——**除非阻塞 build 或演示**。

---

## P3 — 静态发布与对外演示

- [x] 部署到 Vercel + 自定义域名 `agentflow.weipm.com`
- [x] OG 图已配置（链接分享时应显示标题 + 描述 + 预览图；可用 OpenGraph.xyz 或微信/Slack 自测）
- [ ] 准备 **离线演示包**（可选）：关键页 PDF 或录屏 30s，防现场断网
- [x] 页脚联系渠道可用（邮件 / Telegram / 电话 / LinkedIn / GitHub）
- [x] 中文 SEO 基础（标题、描述、JSON-LD、sitemap）

---

## 近期两周（可勾选）

- [x] P0 收尾：图标、metadata、清模板残留（notes / robots / 远程模板 doc）
- [ ] 至少 1 个「拟真 Dashboard」上线（路由待定，见 product-roadmap P-1）
- [ ] 通读演示脚本：从首页点 3 次能讲完核心价值
- [x] `npm run build` + 部署预览链接；营销站前端已浏览验收
- [ ] 用手机扫一遍线上站（https://agentflow.weipm.com）做最终 smoke test

---

## 决策记录

| 日期 | 决策 | 备注 |
|------|------|------|
| 2026-06-02 | 官网品牌定为 Agent Flow | 配置集中在 `site-config.ts` |
| 2026-06-02 | **不做 MVP，仅拟真静态演示站** | 无后端、无真实 AI；界面与叙事优先 |
| 2026-06-02 | 产品主模型 v0.2 | Dashboard 主界面；工作流核心；项目主控产出排程；全员确认；Tab 导航 |
| 2026-06-02 | product-roadmap v0.2 | M0–M10 模块 + P-1～P-10 页面清单；P1 任务按页面级映射 |
| 2026-06-03 | **P0 收尾完成** | OG 图、SEO、notes 下线、营销文案 v0.2 |
| 2026-06-03 | 生产域名 | `https://agentflow.weipm.com`；`NEXT_PUBLIC_SITE_URL` 已在 Vercel 配置 |
| 2026-06-03 | `/notes` 暂不需要 | 模板 Lab Notes 已删除 |
| 2026-06-03 | OG 策略 | 首页截图一张，全站共用；不做 per-page OG |
| 2026-06-03 | 保留「内测」标签 | manifest / marketing 中 beta 文案 intentionally 不改 |
| 2026-06-03 | 模板文档本地化 | CUSTOMIZE / NOTICE / docs/*.md 等不进 Git；`.env.example` 进 Git |

---

## 备注

- 模板来源历史上自 EinCode；页脚 attribution 已移除，本地仍可保留 `NOTICE.md` 作参考。
- 若观众追问「能否试用」：统一口径为概念演示 / 预约交流，**本仓库不提供可注册产品**。
- 需要协作时，可复制「阶段概览」到 Issue/Notion；**勿将本文件 push 到远程**。
- Git push 需终端走 ClashX 代理（混合端口随重启可能变化；或对 GitHub 单独 `git config http.https://github.com.proxy`）。
