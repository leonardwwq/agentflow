"use client"

import {
  ChevronDown,
  ChevronRight,
  File,
  FilePlus,
  Folder,
  FolderPlus,
  Pencil,
  Search,
  Shield,
  Trash2,
} from "lucide-react"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  countPendingConfirmFiles,
  fileManagerRoles,
  filePermissionLabel,
  filterFileTree,
  hasPendingConfirmInTree,
  type FilePermission,
  type WorkFileNode,
} from "@/lib/work-files"
import { useWorkFiles } from "@/components/work/work-files-context"

function FileTreeItem({
  node,
  depth,
  forceExpand,
}: {
  node: WorkFileNode
  depth: number
  forceExpand?: boolean
}) {
  const { selectedId, expandedIds, selectFile, toggleExpanded } = useWorkFiles()
  const isSelected = selectedId === node.id
  const isFolder = node.type === "folder"
  const isExpanded = forceExpand || expandedIds.has(node.id)
  const isPendingFile = node.type === "file" && node.confirmStatus === "pending"
  const folderHasPending = isFolder && hasPendingConfirmInTree(node)

  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-md pr-1",
          isSelected && "bg-[var(--work-parchment)]",
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        {isFolder ? (
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[var(--work-ink-muted)] hover:text-[var(--work-ink)]"
            aria-expanded={isExpanded}
            onClick={() => toggleExpanded(node.id)}
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-7 shrink-0" aria-hidden />
        )}

        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md py-1.5 pr-2 text-left hover:text-[var(--work-primary)]"
          onClick={() => selectFile(node.id)}
        >
          {isFolder ? (
            <Folder
              className={cn(
                "h-4 w-4 shrink-0",
                folderHasPending ? "text-[var(--work-pending)]" : "text-[var(--work-primary)]",
              )}
              aria-hidden
            />
          ) : (
            <File
              className={cn(
                "h-4 w-4 shrink-0",
                isPendingFile ? "text-[var(--work-pending)]" : "text-[var(--work-ink-muted)]",
              )}
              aria-hidden
            />
          )}
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-[13px]",
              isSelected && "font-medium text-[var(--work-ink)]",
              isPendingFile && !isSelected && "text-[var(--work-ink)]",
            )}
          >
            {node.name}
          </span>
          {isPendingFile && (
            <span className="work-pill work-badge-pending shrink-0 px-1.5 py-0 text-[10px] font-medium leading-5">
              待确认
            </span>
          )}
        </button>
      </div>

      {isFolder && isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <FileTreeItem key={child.id} node={child} depth={depth + 1} forceExpand={forceExpand} />
          ))}
        </ul>
      )}
    </li>
  )
}

function PermissionPanel() {
  const { selectedNode, updatePermission, canManagePermissions } = useWorkFiles()

  if (!selectedNode) {
    return (
      <p className="work-caption px-1 py-2 text-[12px] leading-relaxed">
        选中文件或文件夹后，可在此配置各角色访问权限。
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 px-1">
        <Shield className="h-3.5 w-3.5 text-[var(--work-ink-muted)]" aria-hidden />
        <p className="text-[12px] font-medium text-[var(--work-ink)]">权限控制</p>
      </div>
      <p className="work-caption truncate px-1 text-[11px]">{selectedNode.name}</p>
      <ul className="space-y-1">
        {fileManagerRoles.map((role) => {
          const rule = selectedNode.accessRules.find((item) => item.roleId === role.id)
          const permission = rule?.permission ?? "read"

          return (
            <li key={role.id} className="flex items-center justify-between gap-2 rounded-md px-1 py-0.5">
              <span className="truncate text-[12px] text-[var(--work-ink-soft)]">{role.name}</span>
              <select
                value={permission}
                disabled={!canManagePermissions()}
                onChange={(event) => updatePermission(role.id, event.target.value as FilePermission)}
                className="rounded-md border border-[var(--work-hairline)] bg-[var(--work-canvas)] px-1.5 py-0.5 text-[11px] text-[var(--work-ink)] disabled:opacity-50"
                aria-label={`${role.name} 权限`}
              >
                {(Object.keys(filePermissionLabel) as FilePermission[]).map((key) => (
                  <option key={key} value={key}>
                    {filePermissionLabel[key]}
                  </option>
                ))}
              </select>
            </li>
          )
        })}
      </ul>
      {!canManagePermissions() && (
        <p className="work-caption px-1 text-[11px]">你没有管理权限，仅可查看</p>
      )}
    </div>
  )
}

export function ProjectFileManager() {
  const {
    files,
    selectedNode,
    createItem,
    renameSelected,
    deleteSelected,
    getCreateParentId,
    canCreateAt,
    canRename,
    canDelete,
  } = useWorkFiles()

  const [searchQuery, setSearchQuery] = useState("")
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState("")

  const canCreate = canCreateAt(getCreateParentId())
  const isSearching = searchQuery.trim().length > 0
  const filteredFiles = useMemo(() => filterFileTree(files, searchQuery), [files, searchQuery])
  const pendingFileCount = useMemo(() => countPendingConfirmFiles(files), [files])

  const startRename = () => {
    if (!selectedNode || !canRename()) return
    setRenameValue(selectedNode.name)
    setRenaming(true)
  }

  const commitRename = () => {
    if (renameSelected(renameValue)) {
      setRenaming(false)
    }
  }

  return (
    <aside className="work-file-manager flex h-full w-full flex-col bg-[var(--work-parchment)]">
      <div className="border-b border-[var(--work-divider)] px-3 py-2.5">
        {pendingFileCount > 0 && (
          <p className="mb-2 flex items-center gap-1.5 text-[11px] text-[var(--work-pending)]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--work-pending)]" aria-hidden />
            {pendingFileCount} 个文件待确认
          </p>
        )}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--work-ink-muted)]"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索文件…"
            className="w-full rounded-md border border-[var(--work-hairline)] bg-[var(--work-canvas)] py-1.5 pl-8 pr-2 text-[13px] text-[var(--work-ink)] outline-none placeholder:text-[var(--work-ink-muted)] focus:border-[var(--work-primary)]"
            aria-label="搜索文件"
          />
        </div>
      </div>

      <div className="flex gap-1 border-b border-[var(--work-divider)] px-3 py-2">
        <button
          type="button"
          title="新建文件夹"
          disabled={!canCreate}
          onClick={() => createItem("folder")}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--work-ink-muted)] hover:bg-[var(--work-divider)] hover:text-[var(--work-ink)] disabled:opacity-40"
        >
          <FolderPlus className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="新建文件"
          disabled={!canCreate}
          onClick={() => createItem("file")}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--work-ink-muted)] hover:bg-[var(--work-divider)] hover:text-[var(--work-ink)] disabled:opacity-40"
        >
          <FilePlus className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="重命名"
          disabled={!canRename()}
          onClick={startRename}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--work-ink-muted)] hover:bg-[var(--work-divider)] hover:text-[var(--work-ink)] disabled:opacity-40"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="删除"
          disabled={!canDelete()}
          onClick={() => deleteSelected()}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--work-ink-muted)] hover:bg-[#fdecec] hover:text-[#c93434] disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {renaming && (
        <div className="border-b border-[var(--work-divider)] px-3 py-2">
          <input
            value={renameValue}
            onChange={(event) => setRenameValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") commitRename()
              if (event.key === "Escape") setRenaming(false)
            }}
            className="w-full rounded-md border border-[var(--work-hairline)] bg-[var(--work-canvas)] px-2 py-1.5 text-[13px] text-[var(--work-ink)] outline-none focus:border-[var(--work-primary)]"
            autoFocus
          />
          <div className="mt-2 flex gap-2">
            <button type="button" className="work-btn-primary px-3 py-1 text-[12px]" onClick={commitRename}>
              保存
            </button>
            <button
              type="button"
              className="text-[12px] text-[var(--work-ink-muted)] hover:text-[var(--work-ink)]"
              onClick={() => setRenaming(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {filteredFiles.length === 0 ? (
          <p className="work-caption px-2 py-4 text-[12px]">
            {isSearching ? "无匹配结果" : "暂无文件，可新建文件夹或文件"}
          </p>
        ) : (
          <ul>
            {filteredFiles.map((node) => (
              <FileTreeItem key={node.id} node={node} depth={0} forceExpand={isSearching} />
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-[var(--work-divider)] px-3 py-3">
        <PermissionPanel />
      </div>
    </aside>
  )
}
