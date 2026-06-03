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
      "主界面驾驶舱：左侧项目阶段、右侧大排程表、下方角色卡片。一眼看清项目节奏、已确认排程与各角色最近交付。",
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
      "角色是一等公民：共用 Prompt、工作知识指针、交付契约（交给谁、命名规范、格式约定）与角色内规范，像维护岗位说明书一样维护 Agent。",
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
      "工作流是引擎：定义角色之间的步骤、触发条件与产物传递。执行顺序与交接以工作流为准，而非排程表驱动。",
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
      "所有角色产出均需用户确认：AI 起草 → 人审阅 → 确认 → 进入交付记录或传给下一角色。排程草案与角色交付物均适用。",
    tags: ["确认", "交付物", "人把关"],
    status: "live",
    year: "2026",
    homepage: "/projects",
    featured: true,
  },
  {
    id: 4,
    title: "项目主控 · 排程",
    description:
      "每个项目内置项目主控：与人沟通目标与约束，整理排程草案。经你确认后写入 Dashboard 右侧大排程表——排程是共识视图，不替代工作流执行。",
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
      "项目容器内的协作底座：文档与资料仓库为角色提供工作知识引用，演示中以静态列表呈现。",
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
    title: "你做最终确认",
    excerpt: "AI 起草，人审阅，确认后再交接。重要结果我说了算——不是全自动黑盒。",
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
    excerpt: "项目阶段、已确认排程、各角色最近交付同屏呈现——有项目感，不再靠脑子记进度。",
    date: "2026 Q2",
    category: "可感知进度",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "工作流驱动，排程给人看",
    excerpt: "执行靠工作流，排程是项目主控与人对齐后的共识视图。改排程走主控产出并确认，而非直接改日期即改执行。",
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
