export const workTabs = [
  { label: "概览", href: "/work/dashboard", slug: "dashboard" },
  { label: "工作流", href: "/work/workflow", slug: "workflow" },
  { label: "文档", href: "/work/docs", slug: "docs" },
  { label: "资料库", href: "/work/assets", slug: "assets" },
] as const

export type WorkTabSlug = (typeof workTabs)[number]["slug"]
