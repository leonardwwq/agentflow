import { createPageMetadata } from "@/lib/page-metadata"
import { PlaceholderTab } from "@/components/work/placeholder-tab"

export const metadata = createPageMetadata({
  title: "文档",
  description: "Agent Flow 项目文档列表。",
  path: "/work/docs",
})

export default function DocsPage() {
  return (
    <PlaceholderTab
      title="文档"
      description="项目协作文档索引与 mock 详情页。将在 Sprint 3 补充列表与一篇示例文档。"
    />
  )
}
