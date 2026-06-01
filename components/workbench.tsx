import { cn } from "@/lib/utils"
import { roadmapItems } from "@/lib/marketing-data"
import { siteConfig } from "@/lib/site-config"

function RoadmapRow({
  item,
  index,
}: {
  item: (typeof roadmapItems)[number]
  index: number
}) {
  const content = (
    <>
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center gap-3">
          <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            $
          </span>
          <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
            {item.name}
          </h4>
        </div>
        <p className="pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">{item.description}</p>
      </div>

      <div className="flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
        <div className="flex items-center gap-3 flex-1 sm:flex-none">
          <div className="h-2 w-full sm:w-28 overflow-hidden rounded-full bg-secondary/80 relative">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                item.progress >= 80 ? "bg-primary" : item.progress >= 50 ? "bg-yellow-500" : "bg-orange-500",
              )}
              style={{ width: `${item.progress}%` }}
            />
            <div className="absolute inset-0 animate-shimmer opacity-30" />
          </div>
          <span
            className={cn(
              "font-mono text-xs w-10 shrink-0 transition-colors",
              item.progress >= 80 ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.progress}%
          </span>
        </div>

        <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
      </div>
    </>
  )

  const className =
    "group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between hover:bg-secondary/30 animate-fade-in"

  if (item.url) {
    return (
      <a
        href={item.url}
        className={className}
        style={{ animationDelay: `${index * 100 + 400}ms` }}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={className} style={{ animationDelay: `${index * 100 + 400}ms` }}>
      {content}
    </div>
  )
}

export function Workbench() {
  const { roadmap: section } = siteConfig.sections

  return (
    <section id="roadmap" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">{section.eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{section.title}</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">{section.subtitle}</p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">{section.terminalPath}</span>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs">roadmap</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {roadmapItems.map((item, index) => (
              <RoadmapRow key={item.id} item={item} index={index} />
            ))}
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">roadmap list --public</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
