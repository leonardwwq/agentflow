"use client"

import { Fragment, useMemo } from "react"
import { cn } from "@/lib/utils"
import type { ScheduleRow, TaskProgress } from "@/lib/work-data"

interface ScheduleGanttProps {
  rows: ScheduleRow[]
}

const DAY_WIDTH = 52
const LABEL_WIDTH = 108
const AXIS_HEIGHT = 28
const ROW_HEIGHT = 36
const TIMELINE_PAD = DAY_WIDTH / 2

/** MM-DD → 当月日序（演示数据均在 6 月） */
function toDayIndex(value: string): number {
  const [, day] = value.split("-").map(Number)
  return day
}

function formatRange(start: string, end: string): string {
  return start === end ? start : `${start} – ${end}`
}

function buildTicks(rangeStart: number, rangeEnd: number): number[] {
  const ticks: number[] = []
  for (let day = rangeStart; day <= rangeEnd; day += 1) {
    if (day === rangeStart || day === rangeEnd || day % 2 === 0) {
      ticks.push(day)
    }
  }
  if (!ticks.includes(rangeEnd)) ticks.push(rangeEnd)
  return ticks.sort((a, b) => a - b)
}

function dayOffset(day: number, rangeStart: number): number {
  return TIMELINE_PAD + (day - rangeStart) * DAY_WIDTH
}

const progressBarClass: Record<TaskProgress, string> = {
  completed: "work-gantt-completed",
  in_progress: "work-gantt-in-progress",
  not_started: "work-gantt-not-started",
  pending: "work-gantt-pending",
}

const progressLegend: { progress: TaskProgress; label: string }[] = [
  { progress: "in_progress", label: "进行中" },
  { progress: "completed", label: "已完成" },
  { progress: "not_started", label: "未开始" },
  { progress: "pending", label: "待确认" },
]

function TimelineBar({ row, rangeStart }: { row: ScheduleRow; rangeStart: number }) {
  const start = toDayIndex(row.startDate)
  const end = toDayIndex(row.endDate)
  const left = (start - rangeStart) * DAY_WIDTH
  const width = Math.max((end - start + 1) * DAY_WIDTH, DAY_WIDTH * 0.4)

  return (
    <div className="group/bar relative h-full">
      <button
        type="button"
        aria-label={`${row.milestone}，负责人 ${row.owner}`}
        className={cn(
          "absolute top-1/2 h-6 -translate-y-1/2 cursor-default rounded-md transition-transform hover:scale-y-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]",
          progressBarClass[row.progress],
        )}
        style={{ left, width }}
      />

      <div
        className="pointer-events-none absolute z-20 hidden -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/bar:opacity-100 sm:block"
        style={{ left: left + width / 2, top: "-6px" }}
      >
        <div className="mb-2 -translate-y-full whitespace-nowrap rounded-lg border border-[var(--work-hairline)] bg-[var(--work-canvas)] px-3 py-2 shadow-sm">
          <p className="text-[13px] font-medium text-[var(--work-ink)]">{row.milestone}</p>
          <p className="work-caption mt-0.5 text-[12px]">
            负责人：<span className="font-medium text-[var(--work-ink)]">{row.owner}</span>
          </p>
          <p className="work-caption text-[11px]">{formatRange(row.startDate, row.endDate)}</p>
        </div>
      </div>
    </div>
  )
}

function TimelineAxis({
  ticks,
  rangeStart,
  rangeEnd,
}: {
  ticks: number[]
  rangeStart: number
  rangeEnd: number
}) {
  return (
    <div className="relative h-full" style={{ paddingInline: TIMELINE_PAD }}>
      {ticks.map((day) => {
        const offset = dayOffset(day, rangeStart)
        const isFirst = day === rangeStart
        const isLast = day === rangeEnd && day !== rangeStart

        return (
          <span
            key={day}
            className={cn(
              "work-caption absolute bottom-0 tabular-nums text-[11px]",
              isFirst ? "left-0 translate-x-0" : isLast ? "right-0 translate-x-0" : "-translate-x-1/2",
            )}
            style={isFirst || isLast ? undefined : { left: offset }}
          >
            06-{String(day).padStart(2, "0")}
          </span>
        )
      })}
    </div>
  )
}

function TimelineGrid({ ticks, rangeStart }: { ticks: number[]; rangeStart: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ paddingInline: TIMELINE_PAD }} aria-hidden>
      {ticks.map((day) => (
        <div
          key={day}
          className="absolute top-0 bottom-0 w-px bg-[var(--work-divider)]"
          style={{ left: dayOffset(day, rangeStart) }}
        />
      ))}
    </div>
  )
}

export function ScheduleGantt({ rows }: ScheduleGanttProps) {
  const { rangeStart, rangeEnd, ticks, sortedRows, timelineWidth } = useMemo(() => {
    const allStarts = rows.map((row) => toDayIndex(row.startDate))
    const allEnds = rows.map((row) => toDayIndex(row.endDate))
    const start = Math.min(...allStarts)
    const end = Math.max(...allEnds)
    const total = end - start + 1

    return {
      rangeStart: start,
      rangeEnd: end,
      ticks: buildTicks(start, end),
      sortedRows: [...rows].sort((a, b) => toDayIndex(a.startDate) - toDayIndex(b.startDate)),
      timelineWidth: total * DAY_WIDTH + DAY_WIDTH,
    }
  }, [rows])

  return (
    <section className="work-card flex h-full flex-col overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--work-divider)] px-5 py-4 sm:px-6">
        <h2 className="work-display text-[21px] text-[var(--work-ink)]">任务计划</h2>
        <div className="flex flex-wrap gap-3">
          {progressLegend.map(({ progress, label }) => (
            <span key={progress} className="flex items-center gap-1.5 text-[12px] text-[var(--work-ink-muted)]">
              <span className={cn("inline-block h-2.5 w-5 rounded-sm", progressBarClass[progress])} aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 sm:px-6">
        {/* 桌面：冻结横轴 + 冻结左列 */}
        <div className="work-gantt-viewport hidden max-h-[280px] overflow-auto sm:block">
          <div
            className="grid w-max"
            style={{
              gridTemplateColumns: `${LABEL_WIDTH}px ${timelineWidth}px`,
            }}
          >
            {/* 左上角 */}
            <div
              className="sticky left-0 top-0 z-30 border-b border-r border-[var(--work-hairline)] bg-[var(--work-canvas)]"
              style={{ width: LABEL_WIDTH, height: AXIS_HEIGHT }}
              aria-hidden
            />

            {/* 横轴：上下滚动固定，左右跟着动 */}
            <div
              className="sticky top-0 z-20 border-b border-[var(--work-hairline)] bg-[var(--work-canvas)]"
              style={{ width: timelineWidth, height: AXIS_HEIGHT }}
            >
              <TimelineAxis ticks={ticks} rangeStart={rangeStart} rangeEnd={rangeEnd} />
            </div>

            {sortedRows.map((row) => (
              <Fragment key={row.id}>
                {/* 左列：左右滚动固定，上下跟着动 */}
                <div
                  className="work-caption sticky left-0 z-10 flex items-center truncate border-r border-[var(--work-hairline)] bg-[var(--work-canvas)] pr-3 text-[13px]"
                  style={{ width: LABEL_WIDTH, height: ROW_HEIGHT }}
                  title={row.milestone}
                >
                  {row.milestone}
                </div>

                <div className="relative" style={{ width: timelineWidth, height: ROW_HEIGHT }}>
                  <div className="relative h-full" style={{ paddingInline: TIMELINE_PAD }}>
                    <TimelineGrid ticks={ticks} rangeStart={rangeStart} />
                    <TimelineBar row={row} rangeStart={rangeStart} />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* 手机：仅横向滚动时间轴 */}
        <div className="work-gantt-viewport overflow-x-auto sm:hidden">
          <div style={{ width: timelineWidth, minWidth: "100%" }}>
            <div
              className="border-b border-[var(--work-hairline)] bg-[var(--work-canvas)]"
              style={{ height: AXIS_HEIGHT }}
            >
              <TimelineAxis ticks={ticks} rangeStart={rangeStart} rangeEnd={rangeEnd} />
            </div>

            <div className="relative space-y-1 py-1">
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0" style={{ paddingInline: TIMELINE_PAD }} aria-hidden>
                <TimelineGrid ticks={ticks} rangeStart={rangeStart} />
              </div>

              {sortedRows.map((row) => (
                <div key={row.id} className="relative" style={{ height: ROW_HEIGHT, paddingInline: TIMELINE_PAD }}>
                  <TimelineBar row={row} rangeStart={rangeStart} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2 sm:hidden">
          {sortedRows.map((row) => (
            <div key={`m-${row.id}`} className="flex justify-between gap-2 text-[12px]">
              <span className="text-[var(--work-ink)]">{row.milestone}</span>
              <span className="work-caption shrink-0">{row.owner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
