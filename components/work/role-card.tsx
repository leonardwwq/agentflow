"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { RoleCardData } from "@/lib/work-data"
import { RoleAvatar } from "@/components/work/role-avatar"

interface RoleCardProps {
  role: RoleCardData
  onConfirm?: (roleId: string) => void
}

export function RoleCard({ role, onConfirm }: RoleCardProps) {
  const isPending = role.confirmStatus === "pending"

  return (
    <article
      className={cn(
        "work-role-card work-card group flex flex-col p-4 transition-all duration-200 sm:p-5",
        role.isController && "ring-1 ring-[var(--work-primary)]/20",
        isPending && "ring-1 ring-[var(--work-pending)]/25",
      )}
    >
      <div className="flex items-start gap-3">
        <RoleAvatar
          roleId={role.id}
          roleName={role.name}
          isController={role.isController}
          className="h-11 w-11 shrink-0"
        />

        <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="work-display text-[17px] leading-snug text-[var(--work-ink)]">{role.name}</h3>
              {role.isController && (
                <span className="work-pill bg-[var(--work-parchment)] px-2 py-0.5 text-[11px] text-[var(--work-ink-muted)]">
                  内置
                </span>
              )}
            </div>
            <p className="work-caption mt-0.5 line-clamp-2 leading-snug">{role.responsibility}</p>
          </div>
          {isPending && (
            <span className="work-pill work-badge-pending shrink-0 px-2.5 py-0.5 text-[11px] font-medium">待确认</span>
          )}
          {!isPending && role.confirmStatus === "confirmed" && (
            <span className="work-pill work-badge-confirmed shrink-0 px-2.5 py-0.5 text-[11px] font-medium">已确认</span>
          )}
        </div>
      </div>

      <dl className="mt-3 space-y-2.5 text-[14px]">
        <div>
          <dt className="work-caption text-[12px]">最近交付</dt>
          <dd className="mt-0.5 flex items-center justify-between gap-3">
            <span className="min-w-0 truncate font-medium text-[var(--work-ink)]">{role.recentDelivery}</span>
            {isPending && onConfirm && (
              <button
                type="button"
                onClick={() => onConfirm(role.id)}
                className="work-link shrink-0 text-[13px] no-underline hover:underline"
              >
                {role.isController ? "确认排程" : "确认交付"}
              </button>
            )}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <dt className="work-caption text-[12px]">交付时间</dt>
            <dd className="mt-0.5 tabular-nums text-[var(--work-ink-soft)]">{role.deliveryTime}</dd>
          </div>
          <div>
            <dt className="work-caption text-[12px]">下一步</dt>
            <dd className="mt-0.5 line-clamp-2 text-[var(--work-ink-soft)]">{role.nextStep}</dd>
          </div>
        </div>
      </dl>

      {!role.isController && (
        <div className="mt-3">
          <Link
            href={`/work/roles/${role.id}`}
            className="work-link inline-flex text-[14px] no-underline hover:underline"
          >
            查看角色配置 →
          </Link>
        </div>
      )}
    </article>
  )
}

interface RoleCardGridProps {
  roles: RoleCardData[]
  onConfirm?: (roleId: string) => void
}

export function RoleCardGrid({ roles, onConfirm }: RoleCardGridProps) {
  const sortedRoles = [...roles].sort((a, b) => {
    const aPending = a.confirmStatus === "pending" ? 0 : 1
    const bPending = b.confirmStatus === "pending" ? 0 : 1
    if (aPending !== bPending) return aPending - bPending
    if (a.isController) return -1
    if (b.isController) return 1
    return 0
  })

  const pendingCount = roles.filter((role) => role.confirmStatus === "pending").length

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="work-display text-[19px] text-[var(--work-ink)] sm:text-[21px]">最近交付与状态</h2>
        {pendingCount > 0 ? (
          <span className="work-pill work-badge-pending px-2.5 py-0.5 text-[11px] font-medium">
            {pendingCount} 项待确认
          </span>
        ) : (
          <p className="work-caption hidden sm:block">全部交付已确认</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sortedRoles.map((role) => (
          <RoleCard key={role.id} role={role} onConfirm={onConfirm} />
        ))}
      </div>
    </section>
  )
}
