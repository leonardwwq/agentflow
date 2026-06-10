"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Check, ChevronDown, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  getAncestorIds,
  getL2Project,
  isBoardProject,
  projectStatusLabel,
  projectTree,
  type ProjectStatus,
  type WorkProjectNode,
} from "@/lib/work-projects"
import { useWorkProject } from "@/components/work/work-project-context"
import { WorkViewNav } from "@/components/work/work-view-nav"

function ProjectStatusDot({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full", `work-project-dot-${status}`, className)}
      title={projectStatusLabel[status]}
      aria-label={projectStatusLabel[status]}
    />
  )
}

function ProjectTreeBranch({
  node,
  depth,
  expandedIds,
  onToggle,
  currentProjectId,
  onSelect,
}: {
  node: WorkProjectNode
  depth: number
  expandedIds: Set<string>
  onToggle: (id: string) => void
  currentProjectId: string
  onSelect: (id: string) => void
}) {
  const hasChildren = (node.children?.length ?? 0) > 0
  const isExpanded = expandedIds.has(node.id)
  const isBoard = isBoardProject(node.id)
  const isSelected = node.id === currentProjectId

  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-1 rounded-lg py-2 pr-2",
          isSelected && "bg-[#f5f5f7]",
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="work-dropdown-muted flex h-6 w-6 shrink-0 items-center justify-center rounded-md hover:bg-[#ebebed] hover:!text-[#1d1d1f]"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `收起 ${node.name}` : `展开 ${node.name}`}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => onToggle(node.id)}
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-6 shrink-0" aria-hidden />
        )}

        {isBoard ? (
          <button
            type="button"
            className="work-dropdown-item flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-0.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0071e3]"
            onClick={() => onSelect(node.id)}
          >
            <ProjectStatusDot status={node.status} />
            <span className={cn("truncate text-[14px]", isSelected && "font-medium")}>
              {node.name}
            </span>
            {isSelected && <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-[#0066cc]" />}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2 px-1 py-0.5">
            <ProjectStatusDot status={node.status} />
            <span className="work-dropdown-item truncate text-[14px] font-medium">{node.name}</span>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="space-y-0.5">
          {node.children!.map((child) => (
            <ProjectTreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              currentProjectId={currentProjectId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function ProjectMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] text-[var(--work-ink-muted)]">{label}</span>
      <span className="text-[15px] font-medium tabular-nums text-[var(--work-ink)]">{value}</span>
    </div>
  )
}

export function ProjectSwitcher() {
  const { currentProjectId, projectPath, setCurrentProjectId } = useWorkProject()
  const [open, setOpen] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(getAncestorIds(currentProjectId)))

  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      for (const id of getAncestorIds(currentProjectId)) {
        next.add(id)
      }
      return next
    })
  }, [currentProjectId])

  const displayTitle = projectPath.at(-1)?.name ?? "未选择项目"
  const parentBreadcrumb =
    projectPath.length > 1 ? projectPath.slice(0, -1).map((node) => node.name).join(" / ") : ""
  const l2Project = getL2Project(currentProjectId)

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelect = (id: string) => {
    setCurrentProjectId(id)
    setOpen(false)
  }

  return (
    <div className="grid w-full grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
      <div className="min-w-0 justify-self-start">
        <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="max-w-full rounded-md px-0 py-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]"
            aria-label="切换项目"
          >
            <div className="flex items-center gap-2">
              <h1 className="work-display truncate text-[22px] leading-snug text-[var(--work-ink)]">{displayTitle}</h1>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--work-ink-muted)] transition-transform duration-200",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </div>
            {parentBreadcrumb && (
              <p className="work-caption mt-1 truncate text-[13px] leading-relaxed">{parentBreadcrumb}</p>
            )}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="work-dropdown-panel z-[200] w-[min(320px,calc(100vw-2rem))] rounded-xl border border-[var(--work-hairline)] p-2 outline-none"
            sideOffset={8}
            align="start"
            collisionPadding={12}
            onCloseAutoFocus={(event) => event.preventDefault()}
          >
            <p className="work-dropdown-muted px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide">
              切换项目
            </p>
            <ul className="max-h-[min(360px,60vh)] overflow-y-auto">
              <ProjectTreeBranch
                node={projectTree}
                depth={0}
                expandedIds={expandedIds}
                onToggle={toggleExpanded}
                currentProjectId={currentProjectId}
                onSelect={handleSelect}
              />
            </ul>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <WorkViewNav className="justify-self-center" />

      {l2Project && (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-self-end lg:justify-self-end">
          {l2Project.startDate && <ProjectMetaItem label="开始时间" value={l2Project.startDate} />}
          {l2Project.expectedEndDate && (
            <ProjectMetaItem label="预计完成" value={l2Project.expectedEndDate} />
          )}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[var(--work-ink-muted)]">项目状态</span>
            <span className="flex items-center gap-2 text-[15px] font-medium text-[var(--work-ink)]">
              <ProjectStatusDot status={l2Project.status} className="h-2.5 w-2.5" />
              {projectStatusLabel[l2Project.status]}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
