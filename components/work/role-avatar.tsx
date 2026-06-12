import type { ComponentType } from "react"
import { cn } from "@/lib/utils"

interface RoleAvatarProps {
  roleId: string
  roleName: string
  isController?: boolean
  className?: string
}

const roleThemes: Record<string, { bg: string; accent: string }> = {
  controller: { bg: "#e8f1fb", accent: "#0066cc" },
  analyst: { bg: "#f0ebfa", accent: "#6e4ec4" },
  researcher: { bg: "#e8f6ef", accent: "#1d7d43" },
  pm: { bg: "#fff4e8", accent: "#bf4800" },
}

function fallbackTheme(roleId: string) {
  const hash = roleId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const hues = ["#0066cc", "#6e4ec4", "#1d7d43", "#bf4800", "#c41e5a"]
  const accent = hues[hash % hues.length]
  return { bg: `${accent}14`, accent }
}

function ControllerPortrait({ accent }: { accent: string }) {
  return (
    <>
      <ellipse cx="32" cy="52" rx="18" ry="6" fill={accent} opacity="0.12" />
      <path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10v2H22v-2z" fill="#f5c9a8" />
      <path d="M24 30c2-4 6-6 10-6s8 2 10 6" fill="#3d2314" />
      <circle cx="28" cy="36" r="1.2" fill="#1d1d1f" />
      <circle cx="36" cy="36" r="1.2" fill="#1d1d1f" />
      <path d="M29 39.5c2 1.5 4 1.5 6 0" stroke="#c47a5a" strokeWidth="1" fill="none" strokeLinecap="round" />
      <rect x="18" y="40" width="28" height="16" rx="6" fill={accent} />
      <path d="M20 44h24" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="44" cy="34" r="4" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M47 34v-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
    </>
  )
}

function AnalystPortrait({ accent }: { accent: string }) {
  return (
    <>
      <ellipse cx="32" cy="52" rx="18" ry="6" fill={accent} opacity="0.12" />
      <path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10v2H22v-2z" fill="#f0d0b0" />
      <path d="M23 29c2.5-4.5 7-6.5 11-6.5 3 0 6 1.5 8 4.5" fill="#2a1810" />
      <rect x="24" y="34" width="16" height="5" rx="2.5" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="28" cy="36" r="1" fill="#1d1d1f" />
      <circle cx="36" cy="36" r="1" fill="#1d1d1f" />
      <path d="M18 42h8l2 6h16l2-6h8" fill={accent} opacity="0.85" />
      <rect x="40" y="30" width="10" height="14" rx="2" fill="white" stroke={accent} strokeWidth="1.2" />
      <path d="M42 36h6M42 39h4" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </>
  )
}

function ResearcherPortrait({ accent }: { accent: string }) {
  return (
    <>
      <ellipse cx="32" cy="52" rx="18" ry="6" fill={accent} opacity="0.12" />
      <path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10v2H22v-2z" fill="#e8c4a0" />
      <path d="M24 30c1.5-3.5 5-6 10-6 4 0 7.5 2 9 5.5" fill="#4a3020" />
      <circle cx="28" cy="36" r="1.2" fill="#1d1d1f" />
      <circle cx="36" cy="36" r="1.2" fill="#1d1d1f" />
      <path d="M29 39.5c2 1 4 1 6 0" stroke="#b08060" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M20 43h24l-2 10H22l-2-10z" fill={accent} opacity="0.9" />
      <circle cx="46" cy="33" r="6" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M50.5 37.5L54 41" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

function PmPortrait({ accent }: { accent: string }) {
  return (
    <>
      <ellipse cx="32" cy="52" rx="18" ry="6" fill={accent} opacity="0.12" />
      <path d="M22 38c0-5.5 4.5-10 10-10s10 4.5 10 10v2H22v-2z" fill="#f5c9a8" />
      <path d="M25 29c2-4 6-6 9-6 3.5 0 6.5 2 8 5" fill="#3a2218" />
      <circle cx="28" cy="36" r="1.2" fill="#1d1d1f" />
      <circle cx="36" cy="36" r="1.2" fill="#1d1d1f" />
      <path d="M20 42h24l-1.5 11H21.5L20 42z" fill={accent} />
      <rect x="40" y="28" width="12" height="10" rx="1.5" fill="white" stroke={accent} strokeWidth="1.2" />
      <path d="M42 31h8M42 34h6M42 37h4" stroke={accent} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </>
  )
}

function GenericPortrait({ accent, initial }: { accent: string; initial: string }) {
  return (
    <>
      <ellipse cx="32" cy="52" rx="18" ry="6" fill={accent} opacity="0.12" />
      <circle cx="32" cy="34" r="12" fill={accent} opacity="0.18" />
      <circle cx="32" cy="34" r="10" fill={accent} opacity="0.35" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill={accent}
        fontFamily="system-ui, sans-serif"
      >
        {initial}
      </text>
      <path d="M20 42h24l-2 10H22l-2-10z" fill={accent} opacity="0.75" />
    </>
  )
}

const portraitMap: Record<string, ComponentType<{ accent: string }>> = {
  controller: ControllerPortrait,
  analyst: AnalystPortrait,
  researcher: ResearcherPortrait,
  pm: PmPortrait,
}

export function RoleAvatar({ roleId, roleName, isController, className }: RoleAvatarProps) {
  const theme = roleThemes[roleId] ?? fallbackTheme(roleId)
  const Portrait = portraitMap[roleId]

  return (
    <div
      className={cn(
        "work-role-avatar relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--work-radius-md)]",
        className,
      )}
      style={{ backgroundColor: theme.bg }}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" role="img" aria-label={`${roleName} 形象`}>
        {Portrait ? (
          <Portrait accent={theme.accent} />
        ) : (
          <GenericPortrait accent={theme.accent} initial={roleName.slice(0, 1)} />
        )}
      </svg>
      {isController && (
        <span
          className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-white bg-[var(--work-primary)]"
          title="内置角色"
        />
      )}
    </div>
  )
}
