"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import type { ScheduleRow } from "@/lib/work-data"

interface ScheduleGanttProps {
  rows: ScheduleRow[]
  confirmedVersion: string
  draftVersion?: string
}

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

function GanttBar({ row, rangeStart, rangeTotal }: { row: ScheduleRow; rangeStart: number; rangeTotal: number }) {
  const start = toDayIndex(row.startDate)
  const end = toDayIndex(row.endDate)
  const left = ((start - rangeStart) / rangeTotal) * 100
  const width = Math.max(((end - start + 1) / rangeTotal) * 100, 5)
  const isDraft = row.status === "draft"

  return (
    <div className="group/bar relative flex h-9 items-center">
      <span
        className="work-caption hidden w-[108px] shrink-0 truncate pr-3 text-[13px] sm:block"
        title={row.milestone}
      >
        {row.milestone}
      </span>

      <div className="relative min-w-0 flex-1 px-0 sm:px-1">
        <button
          type="button"
          aria-label={`${row.milestone}，负责人 ${row.owner}`}
          className={cn(
            "absolute top-1/2 h-6 w-full min-w-[12px] -translate-y-1/2 cursor-default rounded-md transition-transform hover:scale-y-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]",
            isDraft
              ? "border border-dashed border-[var(--work-pending)] bg-[var(--work-pending-bg)]"
              : "bg-[var(--work-primary)]/85",
          )}
          style={{ left: `${left}%`, width: `${width}%` }}
        />

        <div
          className="pointer-events-none absolute z-20 hidden -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/bar:opacity-100 sm:block"
          style={{ left: `${left + width / 2}%`, top: "-6px" }}
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

      <span className="work-caption ml-2 hidden w-14 shrink-0 tabular-nums lg:block">{row.endDate}</span>
    </div>
  )
}

export function ScheduleGantt({ rows, confirmedVersion, draftVersion }: ScheduleGanttProps) {
  const draftRows = rows.filter((row) => row.status === "draft")

  const { rangeStart, rangeTotal, ticks, confirmedRows, draftRowList } = useMemo(() => {
    const allStarts = rows.map((row) => toDayIndex(row.startDate))
    const allEnds = rows.map((row) => toDayIndex(row.endDate))
    const start = Math.min(...allStarts)
    const end = Math.max(...allEnds)
    const total = end - start + 1

    return {
      rangeStart: start,
      rangeTotal: total,
      ticks: buildTicks(start, end),
      confirmedRows: rows.filter((row) => row.status === "confirmed"),
      draftRowList: rows.filter((row) => row.status === "draft"),
    }
  }, [rows])

  return (
    <section className="work-card flex h-full flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--work-divider)] px-5 py-4 sm:px-6">
        <div>
          <p className="work-caption mb-1 text-[12px] uppercase tracking-wide">项目排程</p>
          <h2 className="work-display text-[21px] text-[var(--work-ink)]">共识视图</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="work-pill work-badge-confirmed px-3 py-1 text-[12px] font-medium">
            {confirmedVersion} 已确认
          </span>
          {draftVersion && draftRows.length > 0 && (
            <span className="work-pill work-badge-pending px-3 py-1 text-[12px] font-medium">
              {draftVersion} 待确认
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto px-5 py-4 sm:px-6">
        <div className="min-w-[320px]">
          {/* Timeline axis */}
          <div className="mb-3 flex items-end pl-0 sm:pl-[108px] sm:pr-16">
            <div className="relative h-6 flex-1 border-b border-[var(--work-hairline)]">
              {ticks.map((day) => {
                const left = ((day - rangeStart) / rangeTotal) * 100
                return (
                  <span
                    key={day}
                    className="work-caption absolute bottom-0 -translate-x-1/2 tabular-nums text-[11px]"
                    style={{ left: `${left}%` }}
                  >
                    06-{String(day).padStart(2, "0")}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Grid + bars */}
          <div className="relative space-y-1">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 right-0 sm:left-[108px] sm:right-16"
              aria-hidden
            >
              {ticks.map((day) => {
                const left = ((day - rangeStart) / rangeTotal) * 100
                return (
                  <div
                    key={day}
                    className="absolute top-0 bottom-0 w-px bg-[var(--work-divider)]"
                    style={{ left: `${left}%` }}
                  />
                )
              })}
            </div>

            {confirmedRows.map((row) => (
              <GanttBar key={row.id} row={row} rangeStart={rangeStart} rangeTotal={rangeTotal} />
            ))}

            {draftRowList.length > 0 && (
              <>
                <div className="flex items-center gap-2 py-2 sm:pl-[108px]">
                  <span className="work-caption text-[12px] font-medium text-[var(--work-pending)]">
                    待确认草案 {draftVersion}
                  </span>
                </div>
                {draftRowList.map((row) => (
                  <GanttBar key={row.id} row={row} rangeStart={rangeStart} rangeTotal={rangeTotal} />
                ))}
              </>
            )}
          </div>

          {/* Mobile: milestone labels under bars */}
          <div className="mt-3 space-y-2 sm:hidden">
            {rows.map((row) => (
              <div key={`m-${row.id}`} className="flex justify-between gap-2 text-[12px]">
                <span className="text-[var(--work-ink)]">{row.milestone}</span>
                <span className="work-caption shrink-0">{row.owner}</span>
              </div>
            ))}
          </div>

          <p className="work-caption mt-4 hidden text-[11px] sm:block">鼠标移入色块查看负责人</p>
        </div>
      </div>
    </section>
  )
}
