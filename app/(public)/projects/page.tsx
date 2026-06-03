import { ProjectsPageContent } from "@/components/public/projects/projects-page-content"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "功能",
  description: `${siteConfig.name} 核心功能：Dashboard 驾驶舱、角色配置、工作流协作、人确认交付与项目主控排程。`,
  path: "/projects",
  keywords: ["Dashboard", "角色配置", "工作流", "人确认", "项目主控", "Agent Flow"],
})

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  )
}
