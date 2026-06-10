"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { workTabs } from "@/lib/work-nav"
import { demoProject } from "@/lib/work-data"
import { getLogoText, siteConfig } from "@/lib/site-config"

interface WorkShellProps {
  children: React.ReactNode
}

export function WorkShell({ children }: WorkShellProps) {
  const pathname = usePathname()

  return (
    <div className="work-app">
      <header className="sticky top-0 z-50 border-b border-[var(--work-hairline)] bg-[var(--work-parchment)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="work-caption text-[13px] hover:text-[var(--work-ink)]">
            ← {getLogoText()}
          </Link>
          <span className="work-caption text-[12px]">概念演示</span>
        </div>

        <div className="border-t border-[var(--work-divider)] bg-[var(--work-canvas)]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h1 className="work-display text-[21px] leading-tight text-[var(--work-ink)]">{demoProject.name}</h1>
              <p className="work-caption mt-0.5">{siteConfig.statusLabel} · S1 竞品分析</p>
            </div>
            <nav className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide" aria-label="工作台导航">
              {workTabs.map((tab) => {
                const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      "shrink-0 px-4 py-2 text-[14px] transition-colors",
                      isActive
                        ? "work-tab-active font-medium"
                        : "text-[var(--work-ink-muted)] hover:text-[var(--work-ink)]",
                    )}
                  >
                    {tab.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  )
}
