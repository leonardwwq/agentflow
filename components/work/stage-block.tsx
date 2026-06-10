import type { ProjectStage } from "@/lib/work-data"

interface StageBlockProps {
  stage: ProjectStage
}

export function StageBlock({ stage }: StageBlockProps) {
  return (
    <section className="work-card flex h-full flex-col justify-between p-6">
      <div>
        <p className="work-caption mb-2 text-[12px] uppercase tracking-wide">项目阶段</p>
        <h2 className="work-display text-[28px] leading-tight text-[var(--work-ink)]">{stage.name}</h2>
        <p className="work-body mt-3 text-[15px] text-[var(--work-ink-soft)]">{stage.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-[var(--work-primary)]" aria-hidden />
        <span className="work-caption">当前节奏正常</span>
      </div>
    </section>
  )
}
