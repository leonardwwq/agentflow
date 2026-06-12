"use client"

import { useMemo, useState } from "react"
import { AlertCircle } from "lucide-react"
import { ConfirmModal, type ConfirmModalType } from "@/components/work/confirm-modal"
import { RoleCardGrid } from "@/components/work/role-card"
import { ScheduleGantt } from "@/components/work/schedule-gantt"
import { StageBlock } from "@/components/work/stage-block"
import { useWorkFiles } from "@/components/work/work-files-context"
import { confirmFileIds } from "@/lib/work-files"
import {
  demoProject,
  type RoleCardData,
  type ScheduleRow,
  type WorkProject,
} from "@/lib/work-data"

interface PendingConfirm {
  type: ConfirmModalType
  roleId: string
  title: string
  subtitle: string
  items: { label: string; value: string }[]
}

function buildPendingConfirms(project: WorkProject, roles: RoleCardData[]): PendingConfirm[] {
  const items: PendingConfirm[] = []

  const controller = roles.find((role) => role.isController && role.confirmStatus === "pending")
  if (controller && project.scheduleDraftVersion) {
    const draftRows = project.scheduleRows.filter((row) => row.version === project.scheduleDraftVersion)
    items.push({
      type: "schedule",
      roleId: controller.id,
      title: `确认排程 ${project.scheduleDraftVersion}`,
      subtitle: "项目主控提交了新版排程草案，确认后将更新任务计划。",
      items: [
        { label: "当前版本", value: project.scheduleVersion },
        { label: "草案版本", value: project.scheduleDraftVersion },
        {
          label: "变更节点",
          value: draftRows.map((row) => row.milestone).join("、") || "—",
        },
        { label: "提交方", value: controller.name },
      ],
    })
  }

  const analyst = roles.find((role) => role.id === "analyst" && role.confirmStatus === "pending")
  if (analyst) {
    items.push({
      type: "delivery",
      roleId: analyst.id,
      title: "确认分析师交付",
      subtitle: "审阅交付物后确认，方可进入下一阶段。",
      items: [
        { label: "交付物", value: analyst.recentDelivery ?? "—" },
        { label: "交付时间", value: analyst.deliveryTime ?? "—" },
        { label: "下一步", value: analyst.nextStep ?? "—" },
        { label: "提交方", value: analyst.name },
      ],
    })
  }

  return items
}

export function DashboardContent() {
  const { confirmFile } = useWorkFiles()
  const [roles, setRoles] = useState<RoleCardData[]>(demoProject.roles)
  const [scheduleRows, setScheduleRows] = useState<ScheduleRow[]>(demoProject.scheduleRows)
  const [scheduleVersion, setScheduleVersion] = useState(demoProject.scheduleVersion)
  const [scheduleDraftVersion, setScheduleDraftVersion] = useState(demoProject.scheduleDraftVersion)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeConfirm, setActiveConfirm] = useState<PendingConfirm | null>(null)

  const pendingConfirms = useMemo(
    () =>
      buildPendingConfirms(
        { ...demoProject, scheduleVersion, scheduleDraftVersion, scheduleRows, roles },
        roles,
      ),
    [roles, scheduleRows, scheduleVersion, scheduleDraftVersion],
  )

  const pendingCount = pendingConfirms.length

  const openConfirm = (confirm: PendingConfirm) => {
    setActiveConfirm(confirm)
    setModalOpen(true)
  }

  const handleRoleConfirm = (roleId: string) => {
    const confirm = pendingConfirms.find((item) => item.roleId === roleId)
    if (confirm) openConfirm(confirm)
  }

  const handleConfirm = () => {
    if (!activeConfirm) return

    if (activeConfirm.type === "schedule") {
      confirmFile(confirmFileIds.scheduleDraft)
      setScheduleVersion(scheduleDraftVersion ?? scheduleVersion)
      setScheduleDraftVersion(undefined)
      setScheduleRows((prev) =>
        prev.map((row) =>
          row.version === scheduleDraftVersion
            ? { ...row, progress: row.progress === "pending" ? "not_started" : row.progress }
            : row,
        ),
      )
      setRoles((prev) =>
        prev.map((role) =>
          role.isController
            ? {
                ...role,
                confirmStatus: "confirmed",
                recentDelivery: `排程 ${scheduleDraftVersion} · 已确认`,
                nextStep: "跟进各角色交付进度",
              }
            : role,
        ),
      )
    }

    if (activeConfirm.type === "delivery") {
      confirmFile(confirmFileIds.analystDelivery)
      setRoles((prev) =>
        prev.map((role) =>
          role.id === activeConfirm.roleId
            ? {
                ...role,
                confirmStatus: "confirmed",
                nextStep: "等待 PM 汇总报告",
              }
            : role,
        ),
      )
    }
  }

  return (
    <div className="space-y-5">
      {pendingCount > 0 && (
        <div className="work-pending-banner flex flex-wrap items-center justify-between gap-3 rounded-[var(--work-radius-md)] border border-[var(--work-pending)]/20 bg-[var(--work-pending-bg)] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-[var(--work-pending)]" aria-hidden />
            <p className="text-[14px] text-[var(--work-ink)]">
              <span className="font-medium">{pendingCount} 项待你确认</span>
              <span className="text-[var(--work-ink-soft)]"> — 排程或交付物需审阅后进入下一步</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {pendingConfirms.map((confirm) => (
              <button
                key={confirm.roleId}
                type="button"
                onClick={() => openConfirm(confirm)}
                className="rounded-full border border-[var(--work-pending)]/30 bg-[var(--work-canvas)] px-3 py-1 text-[13px] font-medium text-[var(--work-pending)] transition-colors hover:bg-[var(--work-canvas)]/80"
              >
                {confirm.type === "schedule" ? "审阅排程" : "审阅交付"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(260px,1fr)_minmax(0,2.2fr)] lg:items-stretch">
        <StageBlock rows={scheduleRows} />
        <ScheduleGantt
          rows={scheduleRows}
          scheduleVersion={scheduleVersion}
          scheduleDraftVersion={scheduleDraftVersion}
        />
      </div>

      <RoleCardGrid roles={roles} onConfirm={handleRoleConfirm} />

      {activeConfirm && (
        <ConfirmModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          type={activeConfirm.type}
          title={activeConfirm.title}
          subtitle={activeConfirm.subtitle}
          items={activeConfirm.items}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
