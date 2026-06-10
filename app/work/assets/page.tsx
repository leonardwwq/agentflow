import { createPageMetadata } from "@/lib/page-metadata"
import { PlaceholderTab } from "@/components/work/placeholder-tab"

export const metadata = createPageMetadata({
  title: "资料库",
  description: "Agent Flow 项目资料库：数据、文件与链接。",
  path: "/work/assets",
})

export default function AssetsPage() {
  return (
    <PlaceholderTab
      title="资料库"
      description="原始数据、文件与外部链接集中管理。将在 Sprint 3 补充列表与一条 mock 详情。"
    />
  )
}
