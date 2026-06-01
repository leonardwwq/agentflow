import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "路线图",
  description: `${siteConfig.name} 产品路线图与即将推出的能力。`,
  path: "/workbench",
  keywords: ["路线图", "产品规划", "Agent Flow"],
})

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  )
}
