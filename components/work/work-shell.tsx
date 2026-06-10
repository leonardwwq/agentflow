"use client"

import { LayoutGrid } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState, type UIEvent } from "react"
import { cn } from "@/lib/utils"
import { AgentChatPanel } from "@/components/work/agent-chat-panel"
import { ProjectFileManager } from "@/components/work/project-file-manager"
import { ProjectSwitcher } from "@/components/work/project-switcher"
import { WorkPlatformBrand } from "@/components/work/work-platform-brand"

interface WorkShellProps {
  children: React.ReactNode
}

export function WorkShell({ children }: WorkShellProps) {
  const pathname = usePathname()
  const isProjectsOverview = pathname === "/work/projects"
  const showProjectChrome = !isProjectsOverview
  const [isScrolled, setIsScrolled] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const handleMainScroll = (event: UIEvent<HTMLElement>) => {
    setIsScrolled(event.currentTarget.scrollTop > 4)
  }

  return (
    <div className="work-app flex h-screen flex-col overflow-hidden">
      <header className="z-50 shrink-0">
        {/* 顶栏：平台标识 */}
        <div className="border-b border-[var(--work-hairline)] bg-[var(--work-canvas)]/95 backdrop-blur-md">
          <div className="flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
            <WorkPlatformBrand />
            <Link
              href="/work/projects"
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]",
                isProjectsOverview
                  ? "border-[var(--work-primary)]/30 bg-[var(--work-parchment)] font-medium text-[var(--work-primary)]"
                  : "border-[var(--work-hairline)] bg-[var(--work-canvas)] text-[var(--work-ink-soft)] hover:border-[var(--work-ink-muted)] hover:text-[var(--work-ink)]",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              全部项目
            </Link>
          </div>
        </div>

        {/* 次栏：项目信息 + 中部视图切换 */}
        {showProjectChrome && (
          <div
            className={cn(
              "w-full border-b border-[var(--work-hairline)] bg-[var(--work-parchment)] transition-shadow duration-300",
              isScrolled && "work-project-bar-scrolled",
            )}
          >
            <div className="w-full px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
              <ProjectSwitcher />
            </div>
          </div>
        )}
      </header>

      <div className="flex min-h-0 flex-1">
        {showProjectChrome && (
          <div className="hidden h-full w-72 shrink-0 lg:block">
            <ProjectFileManager />
          </div>
        )}

        <main
          ref={mainRef}
          onScroll={handleMainScroll}
          className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8"
        >
          <div className={cn(showProjectChrome ? "w-full" : "mx-auto max-w-6xl")}>{children}</div>
        </main>

        {showProjectChrome && (
          <div className="hidden h-full w-80 shrink-0 lg:block">
            <AgentChatPanel />
          </div>
        )}
      </div>
    </div>
  )
}
