/** Homepage and marketing page content — edit freely for your product narrative. */

export type FeatureStatus = "live" | "beta" | "planned"

export interface ProductFeature {
  id: number
  title: string
  description: string
  tags: string[]
  status: FeatureStatus
  year: string
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
    title: "项目 Dashboard",
    description:
      "项目主控驾驶舱：一眼看清项目节奏、已确认排程与各角色最近交付。项目主控可以随时调整排程，确保项目按时完成。",
    tags: ["Dashboard", "阶段", "排程", "角色卡片"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: true,
    highlight: true,
  },
  {
    id: 1,
    title: "角色配置",
    description:
      "以角色出发：配置 Prompt、角色独立工作知识与角色内规范，像维护岗位说明书一样维护 Agent。",
    tags: ["角色", "Prompt", "交付契约", "规范"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: true,
  },
  {
    id: 2,
    title: "工作流协作",
    description:
      "定义Agent工作流：定义角色之间的协作步骤、触发条件与产物传递。自己定义Agent角色的协作新范式。",
    tags: ["工作流", "步骤", "触发", "交接"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: true,
  },
  {
    id: 3,
    title: "由你确认",
    description:
      "质量把控：由你决定是否可交付，避免AI产出低质量内容。并非完全黑盒，过程细节也可以全程把握。",
    tags: ["确认", "交付物", "人把关"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: true,
  },
  {
    id: 4,
    title: "项目主控",
    description:
      "项目主控：项目中的CEO，帮你把控整个项目。帮你制定角色、规划工作流以及管理项目进度。",
    tags: ["项目主控", "排程", "共识视图"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: false,
  },
  {
    id: 5,
    title: "文档与资料库",
    description:
      "多Agent协作基石：文档与资料仓库为角色提供工作知识引用，演示中以静态列表呈现。",
    tags: ["文档", "资料库", "项目容器"],
    status: "beta",
    year: "2026",
    homepage: "/projects",
    featured: false,
  },
  {
    id: 6,
    title: "运行与监控",
    description:
      "终端日志展示运行态，角色卡片出现「待确认」角标。演示增强项，可选接入默认演示路径。",
    tags: ["运行日志", "监控", "待确认"],
    status: "planned",
    year: "2026",
    homepage: "/projects",
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
    title: "由你做决策",
    excerpt: "重要结果由你决定，Agent辅助决策，定义人机协同的新范式。",
    date: "2026 Q2",
    category: "掌控感",
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 2,
    title: "角色资产化",
    excerpt: "像维护岗位说明书一样维护 Agent：Prompt、知识指针、交付契约与角色内规范，可复用可迭代。",
    date: "2026 Q2",
    category: "设计理念",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Dashboard 一眼看清",
    excerpt: "以项目管理进度，让你对多Agent协作流程更清晰。项目阶段、已确认排程、各角色最近交付同屏呈现。",
    date: "2026 Q2",
    category: "可感知进度",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "工作流驱动与排程可视化",
    excerpt: "以工作流为核心驱动项目推进，自动生成可视化排程表，让你对项目进度一目了然。",
    date: "2026 Q2",
    category: "产品模型",
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
    name: "demo-core",
    description: "Dashboard、角色配置、工作流、确认流 — 核心演示能力已就绪",
    progress: 90,
    lastUpdated: "2026-06",
    url: "/projects",
  },
  {
    id: 2,
    name: "demo-run-log",
    description: "运行日志 → 角色卡片「待确认」— 演示增强项",
    progress: 60,
    lastUpdated: "2026-06",
    url: "/projects",
  },
  {
    id: 3,
    name: "beta-runtime",
    description: "真实运行、登录、数据持久化 — 规划中",
    progress: 20,
    lastUpdated: "2026-06",
  },
  {
    id: 4,
    name: "vision-team-integrations",
    description: "团队协作、外部集成、模板市场 — 远景",
    progress: 10,
    lastUpdated: "2026-06",
  },
]
