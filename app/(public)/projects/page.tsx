import { ProjectsPageContent } from "@/components/public/projects/projects-page-content"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "功能",
  description: `${siteConfig.name} 核心功能：可视化编排、角色库、多智能体运行与监控。`,
  path: "/projects",
  keywords: ["多智能体", "工作流", "拖拽编排", "Agent Flow"],
})

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  )
}
