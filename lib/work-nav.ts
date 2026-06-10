export const workViewTabs = [
  { label: "概览", href: "/work/dashboard", slug: "dashboard" },
  { label: "工作流", href: "/work/workflow", slug: "workflow" },
  { label: "文件", href: "/work/docs", slug: "docs" },
] as const

/** @deprecated 使用 workViewTabs */
export const workTabs = workViewTabs

export type WorkTabSlug = (typeof workViewTabs)[number]["slug"]
