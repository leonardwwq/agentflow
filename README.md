# Agent Flow

多智能体协作平台的**拟真静态演示站**——面向路演、客户演示与作品集展示。界面与叙事像真实产品，但**无后端、无真实 AI、无账号与数据持久化**。

**线上地址**：https://agentflow.weipm.com

## 包含什么

- 品牌统一的营销站：首页、功能、路线图、关于、更新日志
- 拟真 UI 与 mock 数据（终端动效、假运行状态等，纯前端）
- 静态部署，`build` 即可上线

## 技术栈

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Radix UI

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run start` — 运行构建产物
- `npm run lint` — ESLint

环境变量见 `.env.example`（生产需配置 `NEXT_PUBLIC_SITE_URL`）。

## 内容配置

文案与站点信息主要在：

- `lib/site-config.ts` — 品牌、导航、联系方式
- `lib/marketing-data.ts` — 首页与各营销页内容
- `lib/blog-data.tsx` — 更新日志

## 说明

本仓库是**概念演示**，不提供可注册的产品或真实工作流引擎。若需交流，请通过站点页脚联系方式预约演示。
