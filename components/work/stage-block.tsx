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

export function StageBlock({ rows }: StageBlockProps) {
  const active = getActiveScheduleRow(rows)

  if (!active) {
    return (
      <section className="work-card flex h-full flex-col p-6">
        <p className="work-caption mb-2 text-[12px] uppercase tracking-wide">项目阶段</p>
        <p className="work-caption text-[15px]">暂无进行中的阶段</p>
      </section>
    )
  }

  const todos = active.todos ?? []
  const doneCount = todos.filter((todo) => todo.done).length

  return (
    <section className="work-card flex h-full flex-col p-6">
      <div>
        <p className="work-caption mb-2 text-[12px] uppercase tracking-wide">项目阶段</p>
        <h2 className="work-display text-[28px] leading-tight text-[var(--work-ink)]">{active.milestone}</h2>
        {active.summary && (
          <p className="work-body mt-3 text-[15px] text-[var(--work-ink-soft)]">{active.summary}</p>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="work-caption text-[12px] font-medium uppercase tracking-wide">待办清单</p>
            <span className="work-caption text-[12px] tabular-nums">
              {doneCount}/{todos.length}
            </span>
          </div>
          <ul className="space-y-0.5 overflow-y-auto">
            {todos.map((todo) => (
              <TodoItem key={todo.id} title={todo.title} content={todo.content} done={todo.done} />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-[var(--work-divider)] pt-4">
        <span className="inline-flex h-2 w-2 rounded-full bg-[var(--work-primary)]" aria-hidden />
        <span className="work-caption">
          负责人 {active.owner}
          {todos.length > 0 && ` · ${doneCount}/${todos.length} 已完成`}
        </span>
      </div>
    </section>
  )
}
