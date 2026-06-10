export function WorkPlatformBrand() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[var(--work-primary)] text-[11px] font-semibold tracking-tight text-white"
        aria-hidden
      >
        AF
      </span>
      <span className="work-display text-[15px] text-[var(--work-ink)]">AgentFlow</span>
    </div>
  )
}
