"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { getActiveScheduleRow, type ScheduleRow } from "@/lib/work-data"

interface StageBlockProps {
  rows: ScheduleRow[]
}

function TodoItem({ title, content, done }: { title: string; content: string; done: boolean }) {
  return (
    <li className="group/todo relative">
      <div
        className="flex items-start gap-2.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-[var(--work-parchment)]"
        title={content}
      >
        <span
          className={cn(
            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
            done
              ? "border-[var(--work-confirmed)] bg-[var(--work-confirmed)] text-white"
              : "border-[var(--work-hairline)] bg-[var(--work-canvas)]",
          )}
          aria-hidden
        >
          {done && <Check className="h-2.5 w-2.5 stroke-[3]" />}
        </span>
        <span
          className={cn(
            "text-[14px] leading-snug",
            done ? "text-[var(--work-ink-muted)] line-through" : "text-[var(--work-ink)]",
          )}
        >
          {title}
        </span>
        <span className="sr-only">{done ? "已完成" : "未完成"}</span>
      </div>

      <div className="pointer-events-none absolute left-0 top-full z-20 hidden w-[min(280px,calc(100vw-3rem))] pt-1 opacity-0 transition-opacity duration-150 group-hover/todo:opacity-100 sm:block">
        <div className="rounded-lg border border-[var(--work-hairline)] bg-[var(--work-canvas)] px-3 py-2 shadow-sm">
          <p className="text-[13px] leading-relaxed text-[var(--work-ink-soft)]">{content}</p>
        </div>
      </div>
    </li>
  )
}

function formatDateRange(start: string, end: string): string {
  return start === end ? start : `${start} – ${end}`
}

export function StageBlock({ rows }: StageBlockProps) {
  const active = getActiveScheduleRow(rows)

  if (!active) {
    return (
      <section className="work-card flex h-full min-h-[280px] flex-col p-5 sm:p-6">
        <p className="work-section-label mb-2">项目阶段</p>
        <p className="work-caption text-[15px]">暂无进行中的阶段</p>
      </section>
    )
  }

  const todos = active.todos ?? []
  const doneCount = todos.filter((todo) => todo.done).length
  const progressPercent = todos.length > 0 ? Math.round((doneCount / todos.length) * 100) : 0

  return (
    <section className="work-card flex h-full min-h-[280px] flex-col p-5 sm:p-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="work-section-label">项目阶段</p>
          <span className="work-pill bg-[var(--work-parchment)] px-2 py-0.5 text-[11px] tabular-nums text-[var(--work-ink-muted)]">
            {formatDateRange(active.startDate, active.endDate)}
          </span>
        </div>
        <h2 className="work-display text-[22px] leading-snug text-[var(--work-ink)] sm:text-[24px]">
          {active.milestone}
        </h2>
        {active.summary && (
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--work-ink-soft)]">{active.summary}</p>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="work-section-label">待办清单</p>
            <span className="work-caption text-[12px] tabular-nums">
              {doneCount}/{todos.length}
            </span>
          </div>

          <div
            className="mb-3 h-1 overflow-hidden rounded-full bg-[var(--work-parchment)]"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`待办完成 ${doneCount}/${todos.length}`}
          >
            <div
              className="h-full rounded-full bg-[var(--work-primary)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <ul className="space-y-0.5 overflow-y-auto">
            {todos.map((todo) => (
              <TodoItem key={todo.id} title={todo.title} content={todo.content} done={todo.done} />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 border-t border-[var(--work-divider)] pt-4">
        <span className="inline-flex h-2 w-2 rounded-full bg-[var(--work-primary)]" aria-hidden />
        <span className="work-caption text-[13px]">
          负责人 {active.owner}
          {todos.length > 0 && ` · ${doneCount}/${todos.length} 已完成`}
        </span>
      </div>
    </section>
  )
}
