export type FilePermission = "read" | "write" | "admin"

export type WorkFileType = "folder" | "file"

export type FileConfirmStatus = "pending" | "confirmed"

export interface FileAccessRule {
  roleId: string
  permission: FilePermission
}

export interface WorkFileNode {
  id: string
  name: string
  type: WorkFileType
  children?: WorkFileNode[]
  accessRules: FileAccessRule[]
  updatedAt: string
  /** 需人确认的文件（如交付物、排程草案） */
  confirmStatus?: FileConfirmStatus
}

/** 与 Dashboard 确认流对应的文件 ID */
export const confirmFileIds = {
  scheduleDraft: "f-sch-v4",
  analystDelivery: "f-matrix",
} as const

export interface FileManagerRole {
  id: string
  name: string
  isHuman?: boolean
}

export const CURRENT_USER_ROLE_ID = "human"

export const fileManagerRoles: FileManagerRole[] = [
  { id: "human", name: "你", isHuman: true },
  { id: "controller", name: "项目主控" },
  { id: "analyst", name: "分析师" },
  { id: "researcher", name: "研究员" },
  { id: "pm", name: "PM" },
]

export const filePermissionLabel: Record<FilePermission, string> = {
  read: "只读",
  write: "读写",
  admin: "管理",
}

const defaultRules = (overrides: Partial<Record<string, FilePermission>> = {}): FileAccessRule[] =>
  fileManagerRoles.map((role) => ({
    roleId: role.id,
    permission: overrides[role.id] ?? (role.id === "human" || role.id === "controller" ? "admin" : "read"),
  }))

function cloneTree(nodes: WorkFileNode[]): WorkFileNode[] {
  return nodes.map((node) => ({
    ...node,
    accessRules: node.accessRules.map((rule) => ({ ...rule })),
    children: node.children ? cloneTree(node.children) : undefined,
  }))
}

const projectFileSeeds: Record<string, WorkFileNode[]> = {
  "competitive-analysis-q2-2026": [
    {
      id: "f-deliverables",
      name: "交付物",
      type: "folder",
      updatedAt: "2026-06-10",
      accessRules: defaultRules({ analyst: "write", researcher: "read", pm: "read" }),
      children: [
        {
          id: "f-matrix",
          name: "competitor-matrix-2026-06.md",
          type: "file",
          updatedAt: "2026-06-10",
          confirmStatus: "pending",
          accessRules: defaultRules({ analyst: "write", researcher: "read", pm: "read" }),
        },
        {
          id: "f-raw",
          name: "raw-data-pack-2026-06.zip",
          type: "file",
          updatedAt: "2026-06-05",
          accessRules: defaultRules({ researcher: "write", analyst: "read" }),
        },
      ],
    },
    {
      id: "f-assets",
      name: "资料",
      type: "folder",
      updatedAt: "2026-06-04",
      accessRules: defaultRules({ researcher: "write", analyst: "read" }),
      children: [
        {
          id: "f-screenshots",
          name: "竞品官网截图",
          type: "folder",
          updatedAt: "2026-06-04",
          accessRules: defaultRules({ researcher: "write", analyst: "read" }),
          children: [
            {
              id: "f-shot-1",
              name: "notion-home.png",
              type: "file",
              updatedAt: "2026-06-04",
              accessRules: defaultRules({ researcher: "write", analyst: "read" }),
            },
          ],
        },
      ],
    },
    {
      id: "f-schedule",
      name: "排程",
      type: "folder",
      updatedAt: "2026-06-03",
      accessRules: defaultRules({ controller: "admin", pm: "read" }),
      children: [
        {
          id: "f-sch-v3",
          name: "schedule-v3.json",
          type: "file",
          updatedAt: "2026-06-03",
          accessRules: defaultRules({ controller: "admin", pm: "read" }),
        },
        {
          id: "f-sch-v4",
          name: "schedule-v4-draft.json",
          type: "file",
          updatedAt: "2026-06-09",
          confirmStatus: "pending",
          accessRules: defaultRules({ controller: "admin" }),
        },
      ],
    },
  ],
}

export function getInitialProjectFiles(projectId: string): WorkFileNode[] {
  const seed = projectFileSeeds[projectId] ?? projectFileSeeds["competitive-analysis-q2-2026"]
  return cloneTree(seed)
}

export function findFileNode(nodes: WorkFileNode[], id: string): WorkFileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findFileNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

export function findFileParent(
  nodes: WorkFileNode[],
  id: string,
  parent: WorkFileNode | null = null,
): { parent: WorkFileNode | null; index: number } | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    if (node.id === id) return { parent, index }
    if (node.children) {
      const found = findFileParent(node.children, id, node)
      if (found) return found
    }
  }
  return null
}

export function getRolePermission(node: WorkFileNode, roleId: string): FilePermission {
  return node.accessRules.find((rule) => rule.roleId === roleId)?.permission ?? "read"
}

const permissionRank: Record<FilePermission, number> = {
  read: 1,
  write: 2,
  admin: 3,
}

export function hasFilePermission(
  node: WorkFileNode,
  roleId: string,
  required: FilePermission,
): boolean {
  return permissionRank[getRolePermission(node, roleId)] >= permissionRank[required]
}

export function updateFileTree(
  nodes: WorkFileNode[],
  id: string,
  updater: (node: WorkFileNode) => WorkFileNode,
): WorkFileNode[] {
  return nodes.map((node) => {
    if (node.id === id) return updater({ ...node, accessRules: node.accessRules.map((r) => ({ ...r })) })
    if (node.children) {
      return { ...node, children: updateFileTree(node.children, id, updater) }
    }
    return node
  })
}

export function deleteFromFileTree(nodes: WorkFileNode[], id: string): WorkFileNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) =>
      node.children ? { ...node, children: deleteFromFileTree(node.children, id) } : node,
    )
}

export function addToFileTree(
  nodes: WorkFileNode[],
  parentId: string | null,
  newNode: WorkFileNode,
): WorkFileNode[] {
  if (parentId === null) return [...nodes, newNode]
  return updateFileTree(nodes, parentId, (node) => {
    if (node.type !== "folder") return node
    return {
      ...node,
      children: [...(node.children ?? []), newNode],
      updatedAt: new Date().toISOString().slice(0, 10),
    }
  })
}

export function createFileId(): string {
  return `f-${Date.now().toString(36)}`
}

export function filterFileTree(nodes: WorkFileNode[], query: string): WorkFileNode[] {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return nodes

  return nodes.reduce<WorkFileNode[]>((acc, node) => {
    const nameMatch = node.name.toLowerCase().includes(keyword)
    if (node.type === "folder" && node.children) {
      const filteredChildren = filterFileTree(node.children, query)
      if (nameMatch || filteredChildren.length > 0) {
        acc.push({ ...node, children: filteredChildren })
      }
    } else if (nameMatch) {
      acc.push(node)
    }
    return acc
  }, [])
}

export function hasPendingConfirmInTree(node: WorkFileNode): boolean {
  if (node.confirmStatus === "pending") return true
  return node.children?.some(hasPendingConfirmInTree) ?? false
}

export function countPendingConfirmFiles(nodes: WorkFileNode[]): number {
  return nodes.reduce((count, node) => {
    const self = node.type === "file" && node.confirmStatus === "pending" ? 1 : 0
    const children = node.children ? countPendingConfirmFiles(node.children) : 0
    return count + self + children
  }, 0)
}

export function getFolderIdsWithPendingDescendants(nodes: WorkFileNode[]): string[] {
  const ids: string[] = []
  for (const node of nodes) {
    if (node.type === "folder" && node.children?.some(hasPendingConfirmInTree)) {
      ids.push(node.id)
    }
    if (node.children) {
      ids.push(...getFolderIdsWithPendingDescendants(node.children))
    }
  }
  return ids
}

export function createEmptyNode(type: WorkFileType, name: string): WorkFileNode {
  return {
    id: createFileId(),
    name,
    type,
    updatedAt: new Date().toISOString().slice(0, 10),
    accessRules: defaultRules(),
    children: type === "folder" ? [] : undefined,
  }
}
