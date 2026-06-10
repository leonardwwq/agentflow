import "./work.css"
import { WorkShell } from "@/components/work/work-shell"

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <WorkShell>{children}</WorkShell>
}
