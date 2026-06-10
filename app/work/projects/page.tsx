import { createPageMetadata } from "@/lib/page-metadata"
import { ProjectsOverview } from "@/components/work/projects-overview"

export const metadata = createPageMetadata({
  title: "全部项目",
  description: "Agent Flow 项目总览：查看与管理全部子项目。",
  path: "/work/projects",
})

export default function ProjectsPage() {
  return <ProjectsOverview />
}
