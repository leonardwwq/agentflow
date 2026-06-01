/** Homepage and marketing page content — edit freely for your product narrative. */

export type FeatureStatus = "live" | "beta" | "planned"

export interface ProductFeature {
  id: number
  title: string
  description: string
  tags: string[]
  status: FeatureStatus
  year: string
  stars?: number
  forks?: number
  url?: string
  homepage?: string
  featured?: boolean
  highlight?: boolean
}

export const featureFilters: Array<"all" | FeatureStatus> = ["all", "live", "beta", "planned"]

export const featureFilterLabels: Record<(typeof featureFilters)[number], string> = {
  all: "全部",
  live: "已上线",
  beta: "内测",
  planned: "规划中",
}

export const featureStatusLabels: Record<FeatureStatus, string> = {
  live: "已上线",
  beta: "内测",
  planned: "规划中",
}

export const productFeatures: ProductFeature[] = [
  {
    id: 0,
    title: "可视化流程编排",
    description:
      "拖拽角色节点、连接协作步骤，像画流程图一样搭建多智能体工作流。支持条件分支、并行执行与人工审批节点。",
    tags: ["拖拽编排", "流程图", "零代码"],
    status: "live",
    year: "2026",
    stars: 12,
    forks: 4,
    url: "#docs-canvas",
    homepage: "#demo",
    featured: true,
    highlight: true,
  },
  {
    id: 1,
    title: "角色与智能体库",
    description:
      "预置产品经理、运营、分析师等业务角色模板，也可自定义角色职责、提示词与可用工具，快速复用最佳实践。",
    tags: ["角色模板", "Prompt", "工具绑定"],
    status: "live",
    year: "2026",
    stars: 8,
    forks: 3,
    url: "#docs-roles",
    homepage: "#demo",
    featured: true,
  },
  {
    id: 2,
    title: "多智能体协作运行",
    description:
      "一键启动工作流，多个智能体按编排顺序协作完成任务。支持任务传递、上下文共享与中间结果审查。",
    tags: ["多 Agent", "任务编排", "上下文"],
    status: "live",
    year: "2026",
    stars: 6,
    forks: 2,
    url: "#docs-run",
    featured: true,
  },
  {
    id: 3,
    title: "运行监控与日志",
    description:
      "实时查看每个角色的输入输出、耗时与状态。出错时可定位到具体节点，支持重试与从断点继续运行。",
    tags: ["可观测性", "日志", "重试"],
    status: "beta",
    year: "2026",
    stars: 4,
    forks: 1,
    url: "#docs-monitor",
    featured: false,
  },
  {
    id: 4,
    title: "流程模板市场",
    description:
      "浏览并一键复制行业场景模板：竞品分析、活动复盘、用户调研摘要、周报生成等，开箱即用。",
    tags: ["模板", "场景库", "最佳实践"],
    status: "beta",
    year: "2026",
    stars: 3,
    forks: 0,
    url: "#docs-templates",
    featured: false,
  },
  {
    id: 5,
    title: "团队与权限管理",
    description:
      "工作空间级别的流程共享、版本管理与协作编辑。为不同角色设置查看、编辑与运行权限。",
    tags: ["协作", "RBAC", "版本"],
    status: "planned",
    year: "2026",
    url: "#docs-teams",
    featured: false,
  },
]

export interface HighlightCard {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  color: string
}

export const highlightCards: HighlightCard[] = [
  {
    id: 1,
    title: "业务专家友好",
    excerpt: "产品经理、运营、分析师无需写代码，通过拖拽与配置即可搭建 AI 协作流程。",
    date: "2026 Q1",
    category: "易用性",
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 2,
    title: "角色驱动设计",
    excerpt: "以业务角色为中心组织智能体，每个角色职责清晰，协作边界一目了然。",
    date: "2026 Q1",
    category: "设计理念",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "从搭建到运行一体",
    excerpt: "同一平台完成流程设计、试运行、正式运行与日常管理，减少工具切换。",
    date: "2026 Q1",
    category: "工作流",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "可复用、可迭代",
    excerpt: "流程可保存为模板、复制改版、版本回溯，让团队知识沉淀为可执行的自动化。",
    date: "2025 Q4",
    category: "效率",
    color: "from-orange-500/20 to-amber-500/20",
  },
]

export interface RoadmapItem {
  id: number
  name: string
  description: string
  progress: number
  lastUpdated: string
  url?: string
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 1,
    name: "flow-canvas-v2",
    description: "增强画布交互：对齐辅助线、子流程折叠、快捷键与撤销重做",
    progress: 75,
    lastUpdated: "2026-06",
    url: "#roadmap-canvas",
  },
  {
    id: 2,
    name: "external-tools",
    description: "接入 Notion、飞书、Slack、邮件等外部工具，让智能体真正触达业务系统",
    progress: 40,
    lastUpdated: "2026-05",
    url: "#roadmap-integrations",
  },
  {
    id: 3,
    name: "team-workspace",
    description: "多人协作编辑、评论、审批流与流程发布机制",
    progress: 30,
    lastUpdated: "2026-04",
    url: "#roadmap-team",
  },
  {
    id: 4,
    name: "run-analytics",
    description: "运行数据分析：成功率、耗时分布、Token 消耗与成本估算",
    progress: 20,
    lastUpdated: "2026-03",
    url: "#roadmap-analytics",
  },
]
