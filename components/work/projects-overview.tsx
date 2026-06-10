"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  getAncestorIds,
  isBoardProject,
  projectStatusLabel,
  projectTree,
  type ProjectStatus,
  type WorkProjectNode,
} from "@/lib/work-projects"
import { useWorkProject } from "@/components/work/work-project-context"

function ProjectStatusDot({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn("inline-block h-2 w-2 shrink-0 rounded-full", `work-project-dot-${status}`)}
      title={projectStatusLabel[status]}
      aria-label={projectStatusLabel[status]}
    />
  )
}

function OverviewRowWithSelect({
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
  const isCurrent = node.id === currentProjectId

  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-transparent px-3 py-2.5",
          isCurrent && "border-[var(--work-primary)]/25 bg-[var(--work-parchment)]",
        )}
        style={{ marginLeft: depth * 16 }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--work-ink-muted)] hover:bg-[var(--work-divider)]"
            aria-expanded={isExpanded}
            onClick={() => onToggle(node.id)}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-7 shrink-0" aria-hidden />
        )}

        {isBoard ? (
          <Link
            href="/work/dashboard"
            onClick={() => onSelect(node.id)}
            className="flex min-w-0 flex-1 items-center gap-2 hover:text-[var(--work-primary)]"
          >
            <ProjectStatusDot status={node.status} />
            <span className={cn("truncate text-[15px]", isCurrent && "font-medium text-[var(--work-primary)]")}>
              {node.name}
            </span>
            <span className="work-caption ml-auto shrink-0 text-[12px]">{projectStatusLabel[node.status]}</span>
          </Link>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <ProjectStatusDot status={node.status} />
            <span className="truncate text-[15px] font-medium">{node.name}</span>
            <span className="work-caption ml-auto shrink-0 text-[12px]">{projectStatusLabel[node.status]}</span>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="mt-1 space-y-1">
          {node.children!.map((child) => (
            <OverviewRowWithSelect
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

export function ProjectsOverview() {
  const { currentProjectId, setCurrentProjectId } = useWorkProject()
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set([projectTree.id, ...getAncestorIds(currentProjectId)]),
  )

  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.add(projectTree.id)
      for (const id of getAncestorIds(currentProjectId)) {
        next.add(id)
      }
      return next
    })
  }, [currentProjectId])

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="work-card overflow-hidden">
      <div className="border-b border-[var(--work-divider)] px-5 py-4 sm:px-6">
        <h2 className="work-display text-[21px] text-[var(--work-ink)]">全部项目</h2>
        <p className="work-caption mt-1 text-[14px]">总项目与子项目层级一览，点击进入对应画板</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {(["not_started", "in_progress", "pending", "completed"] as ProjectStatus[]).map((status) => (
            <span key={status} className="flex items-center gap-1.5 text-[12px] text-[var(--work-ink-muted)]">
              <span className={cn("inline-block h-2 w-2 rounded-full", `work-project-dot-${status}`)} aria-hidden />
              {projectStatusLabel[status]}
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-1 p-3 sm:p-4">
        <OverviewRowWithSelect
          node={projectTree}
          depth={0}
          expandedIds={expandedIds}
          onToggle={toggleExpanded}
          currentProjectId={currentProjectId}
          onSelect={setCurrentProjectId}
        />
      </ul>
    </section>
  )
}
