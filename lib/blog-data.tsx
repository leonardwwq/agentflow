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
  avatar: "/placeholder.svg",
  role: "产品团队",
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "agent-flow-product-vision",
    title: "Agent Flow 产品愿景：让业务专家驾驭多智能体协作",
    excerpt: "为什么我们要做 Agent Flow，以及它如何帮助非工程角色搭建 AI 工作流。",
    content: `
## 背景

多智能体（Multi-Agent）能力正在快速成熟，但真正能用起来的，往往是工程团队。产品经理、运营、分析师有大量重复性、协作性的工作，却缺少顺手的工具。

## Agent Flow 是什么

Agent Flow 是一个让**业务专家**通过**拖拽角色**、**自定义流程**，轻松**搭建、运行和管理**多智能体协作工作流的平台。

## 为谁而做

- **产品经理**：竞品分析、需求梳理、PRD 辅助
- **运营**：活动复盘、内容策划、数据解读
- **分析师**：调研摘要、报告生成、跨源信息整合

## 下一步

我们正在完善可视化编排画布与角色库，欢迎预约演示体验内测版本。
    `,
    date: "2026-06-01",
    readTime: "3 分钟",
    category: "产品",
    tags: ["愿景", "多智能体", "业务专家"],
    author: defaultAuthor,
    featured: true,
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 2,
    slug: "visual-flow-builder-preview",
    title: "预览：可视化流程编排画布",
    excerpt: "拖拽角色、连接步骤、一键运行——流程编排的核心体验即将上线。",
    content: `
## 新能力

可视化流程编排是 Agent Flow 的核心模块：

1. **拖拽角色节点** — 从角色库拖入画布  
2. **连接协作步骤** — 定义信息如何流转  
3. **配置运行参数** — 输入、审批、重试策略  
4. **一键运行** — 多智能体按流程协作执行  

## 适用场景示例

- 竞品分析：研究员 → 分析师 → 撰写者  
- 活动复盘：数据采集 → 归因分析 → 报告输出  

## 状态

当前处于内测阶段，完整功能将在后续版本逐步开放。
    `,
    date: "2026-05-15",
    readTime: "2 分钟",
    category: "发布",
    tags: ["编排", "画布", "内测"],
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
