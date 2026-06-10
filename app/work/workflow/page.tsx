import { createPageMetadata } from "@/lib/page-metadata"
import { PlaceholderTab } from "@/components/work/placeholder-tab"

export const metadata = createPageMetadata({
  title: "工作流",
  description: "Agent Flow 工作流：定义角色协作顺序与交接。",
  path: "/work/workflow",
})

export default function WorkflowPage() {
  return (
    <PlaceholderTab
      title="工作流"
      description="展示分析师 → PM 的协作交接与步骤顺序。首版 Dashboard 已上线，工作流页将在下一迭代补充。"
    />
  )
}
