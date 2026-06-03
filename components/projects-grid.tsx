"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, Sparkles } from "lucide-react"
import { featureFilters, featureFilterLabels, featureStatusLabels, productFeatures, type FeatureStatus } from "@/lib/marketing-data"
import { siteConfig } from "@/lib/site-config"

function statusStyles(status: FeatureStatus) {
  switch (status) {
    case "live":
      return { dot: "bg-primary shadow-sm shadow-primary/50", label: featureStatusLabels.live }
    case "beta":
      return { dot: "bg-yellow-500 animate-pulse shadow-sm shadow-yellow-500/50", label: featureStatusLabels.beta }
    case "planned":
      return { dot: "bg-muted-foreground", label: featureStatusLabels.planned }
  }
}

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<(typeof featureFilters)[number]>("all")
  const { features: section } = siteConfig.sections

  const filtered =
    activeFilter === "all" ? productFeatures : productFeatures.filter((p) => p.status === activeFilter)

  return (
    <section id="features" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              {section.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{section.title}</h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">{section.subtitle}</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide animate-fade-in-up stagger-2">
            {featureFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {featureFilterLabels[filter]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => {
            const status = statusStyles(project.status)
            return (
              <article
                key={project.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up",
                  project.highlight
                    ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                    : "border-border/60",
                  project.featured && !project.highlight && "sm:col-span-2 lg:col-span-1",
                )}
                style={{ animationDelay: `${(index % 6) * 100 + 200}ms` }}
              >
                {project.highlight && (
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                      推荐
                    </span>
                  </div>
                )}

                <div className={cn("absolute right-5 top-5 flex items-center gap-2.5", project.highlight && "top-5")}>
                  <span className={cn("h-2.5 w-2.5 rounded-full transition-shadow duration-300", status.dot)} />
                  <span className="font-mono text-xs text-muted-foreground">{status.label}</span>
                </div>

                <div className={cn("mb-5 font-mono text-xs text-muted-foreground", project.highlight && "mt-10")}>
                  {project.year}
                </div>

                <h3
                  className={cn(
                    "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                    project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                  )}
                >
                  {project.title}
                </h3>

                <p
                  className={cn(
                    "mb-5 text-sm leading-relaxed text-muted-foreground",
                    project.highlight ? "line-clamp-3" : "line-clamp-2",
                  )}
                >
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.url && (
                    <a
                      href={project.url}
                      className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 group/link"
                    >
                      <span className="underline-animate">文档</span>
                    </a>
                  )}
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                      <span className="underline-animate">了解详情</span>
                    </a>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
