import Link from "next/link"
import { cn } from "@/lib/utils"
import type { RoleCardData } from "@/lib/work-data"

interface RoleCardProps {
  role: RoleCardData
}

export function RoleCard({ role }: RoleCardProps) {
  const isPending = role.confirmStatus === "pending"

  return (
    <article
      className={cn(
        "work-card flex flex-col p-5 transition-shadow hover:shadow-sm",
        role.isController && "ring-1 ring-[var(--work-primary)]/20",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="work-display text-[17px] text-[var(--work-ink)]">{role.name}</h3>
            {role.isController && (
              <span className="work-pill bg-[var(--work-parchment)] px-2 py-0.5 text-[11px] text-[var(--work-ink-muted)]">
                内置
              </span>
            )}
          </div>
          <p className="work-caption mt-1">{role.responsibility}</p>
        </div>
        {isPending && (
          <span className="work-pill work-badge-pending shrink-0 px-2.5 py-0.5 text-[11px] font-medium">待确认</span>
        )}
        {!isPending && role.confirmStatus === "confirmed" && (
          <span className="work-pill work-badge-confirmed shrink-0 px-2.5 py-0.5 text-[11px] font-medium">已确认</span>
        )}
      </div>

      <dl className="mt-auto space-y-3 text-[14px]">
        <div>
          <dt className="work-caption text-[12px]">最近交付</dt>
          <dd className="mt-0.5 font-medium text-[var(--work-ink)]">{role.recentDelivery}</dd>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <dt className="work-caption text-[12px]">交付时间</dt>
            <dd className="mt-0.5 tabular-nums text-[var(--work-ink-soft)]">{role.deliveryTime}</dd>
          </div>
          <div>
            <dt className="work-caption text-[12px]">下一步</dt>
            <dd className="mt-0.5 text-[var(--work-ink-soft)]">{role.nextStep}</dd>
          </div>
        </div>
      </dl>

      {!role.isController && (
        <Link
          href={`/work/roles/${role.id}`}
          className="work-link mt-4 inline-flex text-[14px] no-underline hover:underline"
        >
          查看角色配置 →
        </Link>
      )}
    </article>
  )
}

interface RoleCardGridProps {
  roles: RoleCardData[]
}

export function RoleCardGrid({ roles }: RoleCardGridProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="work-caption text-[12px] uppercase tracking-wide">角色卡片</p>
          <h2 className="work-display text-[21px] text-[var(--work-ink)]">最近交付与状态</h2>
        </div>
        <p className="work-caption hidden sm:block">点击卡片查看角色配置</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  )
}
