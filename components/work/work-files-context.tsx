"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  addToFileTree,
  createEmptyNode,
  CURRENT_USER_ROLE_ID,
  deleteFromFileTree,
  findFileNode,
  findFileParent,
  getInitialProjectFiles,
  hasFilePermission,
  updateFileTree,
  type FileAccessRule,
  type FilePermission,
  type WorkFileNode,
  type WorkFileType,
} from "@/lib/work-files"
import { useWorkProject } from "@/components/work/work-project-context"

interface WorkFilesContextValue {
  files: WorkFileNode[]
  selectedId: string | null
  selectedNode: WorkFileNode | null
  expandedIds: Set<string>
  selectFile: (id: string | null) => void
  toggleExpanded: (id: string) => void
  createItem: (type: WorkFileType) => boolean
  renameSelected: (name: string) => boolean
  deleteSelected: () => boolean
  updatePermission: (roleId: string, permission: FilePermission) => void
  getCreateParentId: () => string | null
  canCreateAt: (parentId: string | null) => boolean
  canRename: () => boolean
  canDelete: () => boolean
  canManagePermissions: () => boolean
}

const WorkFilesContext = createContext<WorkFilesContextValue | null>(null)

export function WorkFilesProvider({ children }: { children: ReactNode }) {
  const { currentProjectId } = useWorkProject()
  const [store, setStore] = useState<Record<string, WorkFileNode[]>>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const files = store[currentProjectId] ?? getInitialProjectFiles(currentProjectId)

  useEffect(() => {
    setStore((prev) => {
      if (prev[currentProjectId]) return prev
      return { ...prev, [currentProjectId]: getInitialProjectFiles(currentProjectId) }
    })
    setSelectedId(null)
    setExpandedIds(new Set())
  }, [currentProjectId])

  const persist = useCallback(
    (nextFiles: WorkFileNode[]) => {
      setStore((prev) => ({ ...prev, [currentProjectId]: nextFiles }))
    },
    [currentProjectId],
  )

  const selectedNode = useMemo(
    () => (selectedId ? findFileNode(files, selectedId) : null),
    [files, selectedId],
  )

  const getCreateParentId = useCallback((): string | null => {
    if (selectedNode?.type === "folder") return selectedNode.id
    if (!selectedId) return null
    const parentInfo = findFileParent(files, selectedId)
    return parentInfo?.parent?.id ?? null
  }, [files, selectedId, selectedNode])

  const canCreateAt = useCallback(
    (parentId: string | null) => {
      if (parentId === null) return true
      const parent = findFileNode(files, parentId)
      if (!parent || parent.type !== "folder") return false
      return hasFilePermission(parent, CURRENT_USER_ROLE_ID, "write")
    },
    [files],
  )

  const canRename = useCallback(() => {
    if (!selectedNode) return false
    return hasFilePermission(selectedNode, CURRENT_USER_ROLE_ID, "write")
  }, [selectedNode])

  const canDelete = useCallback(() => {
    if (!selectedNode) return false
    return hasFilePermission(selectedNode, CURRENT_USER_ROLE_ID, "admin")
  }, [selectedNode])

  const canManagePermissions = useCallback(() => {
    if (!selectedNode) return false
    return hasFilePermission(selectedNode, CURRENT_USER_ROLE_ID, "admin")
  }, [selectedNode])

  const selectFile = useCallback((id: string | null) => setSelectedId(id), [])

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const createItem = useCallback(
    (type: WorkFileType) => {
      const parentId = getCreateParentId()
      if (!canCreateAt(parentId)) return false
      const name = type === "folder" ? "新建文件夹" : "新建文件.md"
      const newNode = createEmptyNode(type, name)
      persist(addToFileTree(files, parentId, newNode))
      if (parentId) {
        setExpandedIds((prev) => new Set(prev).add(parentId))
      }
      setSelectedId(newNode.id)
      return true
    },
    [canCreateAt, files, getCreateParentId, persist],
  )

  const renameSelected = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!selectedId || !trimmed || !canRename()) return false
      persist(
        updateFileTree(files, selectedId, (node) => ({
          ...node,
          name: trimmed,
          updatedAt: new Date().toISOString().slice(0, 10),
        })),
      )
      return true
    },
    [canRename, files, persist, selectedId],
  )

  const deleteSelected = useCallback(() => {
    if (!selectedId || !canDelete()) return false
    persist(deleteFromFileTree(files, selectedId))
    setSelectedId(null)
    return true
  }, [canDelete, files, persist, selectedId])

  const updatePermission = useCallback(
    (roleId: string, permission: FilePermission) => {
      if (!selectedId || !canManagePermissions()) return
      persist(
        updateFileTree(files, selectedId, (node) => ({
          ...node,
          accessRules: node.accessRules.map((rule: FileAccessRule) =>
            rule.roleId === roleId ? { ...rule, permission } : rule,
          ),
          updatedAt: new Date().toISOString().slice(0, 10),
        })),
      )
    },
    [canManagePermissions, files, persist, selectedId],
  )

  const value = useMemo(
    () => ({
      files,
      selectedId,
      selectedNode,
      expandedIds,
      selectFile,
      toggleExpanded,
      createItem,
      renameSelected,
      deleteSelected,
      updatePermission,
      getCreateParentId,
      canCreateAt,
      canRename,
      canDelete,
      canManagePermissions,
    }),
    [
      files,
      selectedId,
      selectedNode,
      expandedIds,
      selectFile,
      toggleExpanded,
      createItem,
      renameSelected,
      deleteSelected,
      updatePermission,
      getCreateParentId,
      canCreateAt,
      canRename,
      canDelete,
      canManagePermissions,
    ],
  )

  return <WorkFilesContext.Provider value={value}>{children}</WorkFilesContext.Provider>
}

export function useWorkFiles() {
  const context = useContext(WorkFilesContext)
  if (!context) {
    throw new Error("useWorkFiles must be used within WorkFilesProvider")
  }
  return context
}
