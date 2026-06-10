export type ProjectStatus = "not_started" | "in_progress" | "pending" | "completed"

export interface WorkProjectNode {
  id: string
  name: string
  status: ProjectStatus
  startDate?: string
  expectedEndDate?: string
  /** 可作为画板打开的子项目 */
  children?: WorkProjectNode[]
}

export const DEFAULT_PROJECT_ID = "competitive-analysis-q2-2026"

/** 三级项目树 mock：L1 总项目 → L2 子项目 → L3 示例子项 */
export const projectTree: WorkProjectNode = {
  id: "product-design",
  name: "Agent自动化智能投放平台",
  status: "in_progress",
  children: [
    {
      id: "competitive-analysis-q2-2026",
      name: "竞品分析 26Q2",
      status: "in_progress",
      startDate: "2026-06-01",
      expectedEndDate: "2026-06-14",
      children: [
        { id: "ca-matrix", name: "对比矩阵整理", status: "in_progress" },
        { id: "ca-data-check", name: "数据源核验", status: "completed" },
        { id: "ca-report", name: "结论报告撰写", status: "not_started" },
      ],
    },
    {
      id: "user-research-h1",
      name: "用户调研 H1",
      status: "not_started",
      startDate: "2026-07-01",
      expectedEndDate: "2026-07-31",
      children: [
        { id: "ur-interview", name: "深度访谈", status: "not_started" },
        { id: "ur-survey", name: "问卷回收", status: "not_started" },
      ],
    },
    {
      id: "requirements-pool",
      name: "需求池梳理",
      status: "completed",
      startDate: "2026-04-01",
      expectedEndDate: "2026-05-15",
      children: [
        { id: "req-triage", name: "需求分拣", status: "completed" },
        { id: "req-priority", name: "优先级对齐", status: "completed" },
      ],
    },
    {
      id: "prototype-v2",
      name: "原型迭代 v2",
      status: "pending",
      startDate: "2026-05-20",
      expectedEndDate: "2026-06-30",
      children: [
        { id: "proto-wireframe", name: "线框评审", status: "pending" },
        { id: "proto-handoff", name: "交付开发", status: "not_started" },
      ],
    },
  ],
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  not_started: "未开始",
  in_progress: "进行中",
  pending: "待确认",
  completed: "已完成",
}

export function findProjectNode(
  id: string,
  node: WorkProjectNode = projectTree,
): WorkProjectNode | null {
  if (node.id === id) return node
  for (const child of node.children ?? []) {
    const found = findProjectNode(id, child)
    if (found) return found
  }
  return null
}

export function getProjectPath(
  id: string,
  node: WorkProjectNode = projectTree,
  trail: WorkProjectNode[] = [],
): WorkProjectNode[] | null {
  const nextTrail = [...trail, node]
  if (node.id === id) return nextTrail
  for (const child of node.children ?? []) {
    const found = getProjectPath(id, child, nextTrail)
    if (found) return found
  }
  return null
}

/** 画板层级：L2 与 L3 均可作为当前项目打开 */
export function isBoardProject(id: string): boolean {
  const path = getProjectPath(id)
  return path !== null && path.length >= 2
}

export function listBoardProjects(node: WorkProjectNode = projectTree): WorkProjectNode[] {
  const boards: WorkProjectNode[] = []

  for (const l2 of node.children ?? []) {
    boards.push(l2)
    for (const l3 of l2.children ?? []) {
      boards.push(l3)
    }
  }

  return boards
}

export function getAncestorIds(id: string): string[] {
  const path = getProjectPath(id)
  if (!path) return []
  return path.slice(0, -1).map((node) => node.id)
}

/** 当前画板所属的二级项目（用于展示项目元信息） */
export function getL2Project(id: string): WorkProjectNode | null {
  const path = getProjectPath(id)
  if (!path || path.length < 2) return null
  return path[1]
}
