export type ScheduleStatus = "confirmed" | "draft"

export type DeliveryConfirmStatus = "confirmed" | "pending"

export interface ProjectStage {
  name: string
  description: string
}

export interface ScheduleRow {
  id: string
  /** 里程碑节点标签（通常等于 endDate） */
  date: string
  startDate: string
  endDate: string
  milestone: string
  owner: string
  status: ScheduleStatus
  version?: string
}

export interface RoleCardData {
  id: string
  name: string
  responsibility: string
  isController?: boolean
  recentDelivery?: string
  deliveryTime?: string
  nextStep?: string
  confirmStatus?: DeliveryConfirmStatus
}

export interface WorkProject {
  id: string
  name: string
  stage: ProjectStage
  scheduleVersion: string
  scheduleDraftVersion?: string
  scheduleRows: ScheduleRow[]
  roles: RoleCardData[]
}

export const demoProject: WorkProject = {
  id: "competitive-analysis-q2-2026",
  name: "竞品分析 · 2026 Q2",
  stage: {
    name: "分析中",
    description: "竞品数据收集与对比矩阵整理",
  },
  scheduleVersion: "v3",
  scheduleDraftVersion: "v4",
  scheduleRows: [
    {
      id: "s1",
      date: "06-03",
      startDate: "06-01",
      endDate: "06-03",
      milestone: "竞品清单确认",
      owner: "项目主控",
      status: "confirmed",
      version: "v3",
    },
    {
      id: "s2",
      date: "06-05",
      startDate: "06-04",
      endDate: "06-05",
      milestone: "数据采集完成",
      owner: "研究员",
      status: "confirmed",
      version: "v3",
    },
    {
      id: "s3",
      date: "06-08",
      startDate: "06-06",
      endDate: "06-08",
      milestone: "对比矩阵初稿",
      owner: "分析师",
      status: "confirmed",
      version: "v3",
    },
    {
      id: "s4",
      date: "06-10",
      startDate: "06-09",
      endDate: "06-10",
      milestone: "矩阵评审与修订",
      owner: "分析师",
      status: "confirmed",
      version: "v3",
    },
    {
      id: "s5",
      date: "06-12",
      startDate: "06-11",
      endDate: "06-12",
      milestone: "PM 汇总报告",
      owner: "PM",
      status: "draft",
      version: "v4",
    },
    {
      id: "s6",
      date: "06-14",
      startDate: "06-13",
      endDate: "06-14",
      milestone: "结论交付",
      owner: "PM",
      status: "draft",
      version: "v4",
    },
  ],
  roles: [
    {
      id: "controller",
      name: "项目主控",
      responsibility: "对齐目标 · 维护排程",
      isController: true,
      recentDelivery: "排程 v3 · 已确认",
      deliveryTime: "06-03 14:20",
      nextStep: "排程 v4 草案待你确认",
      confirmStatus: "pending",
    },
    {
      id: "analyst",
      name: "分析师",
      responsibility: "竞品对比矩阵 · 洞察提炼",
      recentDelivery: "competitor-matrix-2026-06.md",
      deliveryTime: "06-10 09:45",
      nextStep: "等待你确认交付物",
      confirmStatus: "pending",
    },
    {
      id: "researcher",
      name: "研究员",
      responsibility: "原始资料采集与清洗",
      recentDelivery: "raw-data-pack-2026-06.zip",
      deliveryTime: "06-05 16:30",
      nextStep: "支持分析师修订",
      confirmStatus: "confirmed",
    },
    {
      id: "pm",
      name: "PM",
      responsibility: "结论汇总 · 对外交付",
      recentDelivery: "—",
      deliveryTime: "—",
      nextStep: "预计 06-12 提交初稿",
      confirmStatus: "confirmed",
    },
  ],
}

export function getRoleById(roleId: string): RoleCardData | undefined {
  return demoProject.roles.find((role) => role.id === roleId)
}
