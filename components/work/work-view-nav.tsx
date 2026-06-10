"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { workViewTabs } from "@/lib/work-nav"

interface WorkViewNavProps {
  className?: string
}

export function WorkViewNav({ className }: WorkViewNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="项目视图">
      {workViewTabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-[14px] transition-colors",
              isActive
                ? "bg-[var(--work-canvas)] font-medium text-[var(--work-primary)] shadow-sm ring-1 ring-[var(--work-hairline)]"
                : "text-[var(--work-ink-muted)] hover:bg-[var(--work-canvas)]/60 hover:text-[var(--work-ink)]",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
