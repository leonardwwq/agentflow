import Link from "next/link"
import { notFound } from "next/navigation"
import { createPageMetadata } from "@/lib/page-metadata"
import { getRoleById } from "@/lib/work-data"

interface RoleDetailPageProps {
  params: Promise<{ roleId: string }>
}

export async function generateMetadata({ params }: RoleDetailPageProps) {
  const { roleId } = await params
  const role = getRoleById(roleId)
  if (!role) return {}

  return createPageMetadata({
    title: role.name,
    description: `${role.name} — ${role.responsibility}`,
    path: `/work/roles/${roleId}`,
  })
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
  const { roleId } = await params
  const role = getRoleById(roleId)
  if (!role || role.isController) notFound()

  return (
    <div className="work-card p-6 sm:p-8">
      <Link href="/work/dashboard" className="work-link text-[14px] no-underline hover:underline">
        ← 返回 Dashboard
      </Link>
      <div className="mt-6">
        <p className="work-caption text-[12px] uppercase tracking-wide">角色详情</p>
        <h1 className="work-display mt-1 text-[34px] leading-tight">{role.name}</h1>
        <p className="work-body mt-2 text-[15px] text-[var(--work-ink-muted)]">{role.responsibility}</p>
      </div>
      <p className="work-body mt-8 text-[15px] text-[var(--work-ink-soft)]">
        Prompt、工作知识、交付契约与角色内规范将在 Sprint 2 补充完整 Tab 内容。
      </p>
    </div>
  )
}
