import "./work.css"
import { WorkFilesProvider } from "@/components/work/work-files-context"
import { WorkProjectProvider } from "@/components/work/work-project-context"
import { WorkShell } from "@/components/work/work-shell"

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkProjectProvider>
      <WorkFilesProvider>
        <WorkShell>{children}</WorkShell>
      </WorkFilesProvider>
    </WorkProjectProvider>
  )
}
