"use client"

import { Bot, Send } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  role: "agent" | "user"
  content: string
}

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "agent",
    content: "你好，我是本项目的 Agent 助手。可以帮你梳理排程、解读交付物或协调角色任务。",
  },
  {
    id: "m2",
    role: "user",
    content: "竞品分析目前进行到哪一步了？",
  },
  {
    id: "m3",
    role: "agent",
    content: "矩阵评审与修订进行中，分析师有 1/3 待办已完成。排程 v4 草案待你确认。",
  },
]

export function AgentChatPanel() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "agent",
          content: "已记录你的问题。当前为演示模式，后续可接入真实 Agent 推理与项目上下文。",
        },
      ])
    }, 600)
  }

  return (
    <aside className="work-agent-panel flex h-full w-80 shrink-0 flex-col border-l border-[var(--work-hairline)] bg-[var(--work-canvas)]">
      <div className="flex items-center gap-2 border-b border-[var(--work-divider)] px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--work-primary)]/10 text-[var(--work-primary)]">
          <Bot className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[var(--work-ink)]">Agent</p>
          <p className="work-caption truncate text-[11px]">项目上下文助手</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[90%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                message.role === "user"
                  ? "bg-[var(--work-primary)] text-white"
                  : "bg-[var(--work-parchment)] text-[var(--work-ink-soft)]",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--work-divider)] p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                sendMessage()
              }
            }}
            rows={2}
            placeholder="向 Agent 提问…"
            className="min-h-[44px] flex-1 resize-none rounded-xl border border-[var(--work-hairline)] bg-[var(--work-parchment)] px-3 py-2 text-[13px] text-[var(--work-ink)] outline-none placeholder:text-[var(--work-ink-muted)] focus:border-[var(--work-primary)]"
            aria-label="Agent 对话输入"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--work-primary)] text-white transition-opacity disabled:opacity-40"
            aria-label="发送"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
