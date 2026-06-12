"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ConfirmModalType = "schedule" | "delivery"

interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: ConfirmModalType
  title: string
  subtitle?: string
  items: { label: string; value: string }[]
  onConfirm: () => void
}

export function ConfirmModal({
  open,
  onOpenChange,
  type,
  title,
  subtitle,
  items,
  onConfirm,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[var(--work-radius-lg)] border border-[var(--work-hairline)] bg-[var(--work-canvas)] shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          <div className="border-b border-[var(--work-divider)] px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Dialog.Title className="work-display text-[19px] text-[var(--work-ink)]">{title}</Dialog.Title>
                {subtitle && (
                  <Dialog.Description className="work-caption mt-1 text-[14px]">{subtitle}</Dialog.Description>
                )}
              </div>
              <Dialog.Close
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--work-ink-muted)] transition-colors hover:bg-[var(--work-parchment)] hover:text-[var(--work-ink)]"
                aria-label="关闭"
              >
                <X className="h-4 w-4" aria-hidden />
              </Dialog.Close>
            </div>
          </div>

          <div className="space-y-3 px-5 py-4">
            {items.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 text-[14px]">
                <span className="work-caption shrink-0 text-[13px]">{item.label}</span>
                <span className="text-right font-medium text-[var(--work-ink)]">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-[var(--work-divider)] px-5 py-4">
            <Dialog.Close className="rounded-full px-4 py-2 text-[14px] text-[var(--work-ink-muted)] transition-colors hover:bg-[var(--work-parchment)] hover:text-[var(--work-ink)]">
              稍后
            </Dialog.Close>
            <button
              type="button"
              onClick={handleConfirm}
              className="work-btn-primary"
            >
              {type === "schedule" ? "确认排程" : "确认交付"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
