import { createPageMetadata } from "@/lib/page-metadata"
import { DashboardContent } from "@/components/work/dashboard-content"

export const metadata = createPageMetadata({
  title: "Dashboard",
  description: "Agent Flow 项目 Dashboard：阶段、排程与角色交付一览。",
  path: "/work/dashboard",
})

export default function DashboardPage() {
  return <DashboardContent />
}
