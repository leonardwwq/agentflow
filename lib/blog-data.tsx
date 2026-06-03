import { siteConfig } from "@/lib/site-config"

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

const defaultAuthor = {
  name: siteConfig.name,
  avatar: "/icon-512.png",
  role: "王伟权",
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "v0-2-dashboard-confirmation-narrative",
    title: "v0.2 演示版：叙事故事与产品规划",
    excerpt: "Agent Flow v0.2 规划：Dashboard 主界面、项目主控排程、全员确认、工作流引擎叙事全站统一。",
    content: `
## 产品模型更新

Agent Flow v0.2 完成主模型产品规划与叙事对齐：

1. **Dashboard** — 项目阶段、大排程表、角色卡片三区域同屏  
2. **项目主控** — 内置项目角色产出排程草案  
3. **人机协同机制** — 所有角色交付物均需确认  
4. **工作流是引擎** — 以工作流为核心，以可视化排程为看板管理项目进度  

## 术语统一

- 内置协调者统一为 **项目主控**  
- 对外主词 **角色**（智能体作括注）  
- 避免「画流程图」「100% 自动」等误导表述  

## 营销站更新

首页、功能页、路线图与关于页文案已同步 v0.2 叙事。拟真 Dashboard 产品页后续单独上线。
    `,
    date: "2026-06-02",
    readTime: "3 分钟",
    category: "发布",
    tags: ["v0.2", "Dashboard", "确认流", "项目主控"],
    author: defaultAuthor,
    featured: true,
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 2,
    slug: "v0-1-concept-demo-launch",
    title: "v0.1 概念演示站上线",
    excerpt: "Agent Flow 高保真静态演示站首发：营销叙事 + 拟真 UI 框架，无后端、无真实 AI。",
    content: `
## 首发内容

Agent Flow v0.1 概念演示站上线，包含：

1. **营销站** — 首页、功能、路线图、关于、更新日志  
2. **拟真 UI 框架** — 终端风格组件、玻璃态面板、响应式布局  
3. **静态部署** — Next.js 构建即可上线，适合路演与作品集展示  

## 定位说明

本站点为**概念演示**，界面与数据均为 mock：

- 无用户注册登录  
- 无真实 LLM 调用或工作流引擎  
- 深度能力以交流为准  

## 下一步

v0.2 将 Dashboard 主界面与确认流叙事对齐，并逐步上线拟真产品屏。
    `,
    date: "2026-06-01",
    readTime: "2 分钟",
    category: "发布",
    tags: ["v0.1", "概念演示", "静态站"],
    author: defaultAuthor,
    featured: false,
    color: "from-blue-500/20 to-cyan-500/20",
  },
]

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter(
      (post) =>
        post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)),
    )
    .slice(0, limit)
}
