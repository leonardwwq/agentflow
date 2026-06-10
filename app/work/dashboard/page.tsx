import { createPageMetadata } from "@/lib/page-metadata"
import { demoProject } from "@/lib/work-data"
import { RoleCardGrid } from "@/components/work/role-card"
import { ScheduleGantt } from "@/components/work/schedule-gantt"
import { StageBlock } from "@/components/work/stage-block"

export const metadata = createPageMetadata({
  title: "Dashboard",
  description: "Agent Flow 项目 Dashboard：阶段、排程与角色交付一览。",
  path: "/work/dashboard",
})

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(240px,1fr)_minmax(0,2fr)] lg:items-stretch">
        <StageBlock stage={demoProject.stage} />
        <ScheduleGantt
          rows={demoProject.scheduleRows}
          confirmedVersion={demoProject.scheduleVersion}
          draftVersion={demoProject.scheduleDraftVersion}
        />
      </div>
      <RoleCardGrid roles={demoProject.roles} />
    </div>
  )
}
