import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "路线图",
  description: `${siteConfig.name} 演进方向：演示完成度与后续规划（叙事用，非真实排期承诺）。`,
  path: "/workbench",
  keywords: ["路线图", "产品规划", "Agent Flow", "概念演示"],
})

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  )
}
