interface PlaceholderTabProps {
  title: string
  description: string
}

export function PlaceholderTab({ title, description }: PlaceholderTabProps) {
  return (
    <div className="work-card flex min-h-[320px] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="work-caption mb-2 text-[12px] uppercase tracking-wide">即将上线</p>
      <h2 className="work-display text-[28px] text-[var(--work-ink)]">{title}</h2>
      <p className="work-body mt-3 max-w-md text-[15px] text-[var(--work-ink-muted)]">{description}</p>
    </div>
  )
}
