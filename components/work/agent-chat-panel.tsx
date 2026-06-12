"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { BookOpen, Bot, Check, ChevronDown, Clock, Plus, Send, X } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { demoProject, type RoleCardData } from "@/lib/work-data"

const DEFAULT_ROLE_ID = "controller"

interface ChatMessage {
  id: string
  role: "agent" | "user"
  content: string
}

interface AgentTab {
  id: string
  title: string
  messages: ChatMessage[]
  selectedRoleId: string
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

const historyItems = [
  { id: "h1", title: "排程 v4 确认", date: "06-10" },
  { id: "h2", title: "矩阵修订讨论", date: "06-09" },
  { id: "h3", title: "竞品清单对齐", date: "06-03" },
]

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function createTab(index: number, messages: ChatMessage[] = []): AgentTab {
  return {
    id: createId(),
    title: `对话 ${index}`,
    messages,
    selectedRoleId: DEFAULT_ROLE_ID,
  }
}

export function AgentChatPanel() {
  const [roles, setRoles] = useState<RoleCardData[]>(demoProject.roles)
  const [tabs, setTabs] = useState<AgentTab[]>(() => {
    const firstTab = createTab(1, initialMessages)
    return [firstTab]
  })
  const [activeTabId, setActiveTabId] = useState(() => tabs[0]?.id ?? "")
  const [input, setInput] = useState("")
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [addingRole, setAddingRole] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [historyOpen, setHistoryOpen] = useState(false)

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [tabs, activeTabId],
  )

  const selectedRoleId = activeTab?.selectedRoleId ?? DEFAULT_ROLE_ID
  const messages = activeTab?.messages ?? []

  const selectedRole = roles.find((role) => role.id === selectedRoleId)
  const agentName = selectedRole?.name ?? "项目主控"
  const knowledgeHref = selectedRole?.isController
    ? "/work/docs"
    : `/work/roles/${selectedRoleId}`

  const updateActiveTab = (patch: Partial<AgentTab>) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === activeTabId ? { ...tab, ...patch } : tab)),
    )
  }

  const handleAddTab = () => {
    const newTab = createTab(tabs.length + 1, [
      {
        id: createId(),
        role: "agent",
        content: "新对话已开启，有什么可以帮你的？",
      },
    ])
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
    setInput("")
  }

  const handleCloseTab = (tabId: string) => {
    if (tabs.length <= 1) return

    const closingIndex = tabs.findIndex((tab) => tab.id === tabId)
    const nextTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(nextTabs)

    if (activeTabId === tabId) {
      const nextActive = nextTabs[Math.min(closingIndex, nextTabs.length - 1)]
      setActiveTabId(nextActive.id)
      setInput("")
    }
  }

  const handleOpenHistory = (item: (typeof historyItems)[number]) => {
    const newTab = createTab(tabs.length + 1, [
      {
        id: createId(),
        role: "agent",
        content: `已打开历史对话「${item.title}」（${item.date}）。当前为演示模式。`,
      },
    ])
    newTab.title = item.title
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
    setInput("")
    setHistoryOpen(false)
  }

  const handleAddRole = () => {
    const name = newRoleName.trim()
    if (!name) return

    const newRole: RoleCardData = {
      id: createId(),
      name,
      responsibility: "待配置职责说明",
      confirmStatus: "confirmed",
    }
    setRoles((prev) => [...prev, newRole])
    updateActiveTab({ selectedRoleId: newRole.id })
    setNewRoleName("")
    setAddingRole(false)
    setRoleMenuOpen(false)
  }

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed || !activeTab) return

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed }
    const nextMessages = [...messages, userMsg]
    updateActiveTab({ messages: nextMessages })
    setInput("")

    const replyPrefix = `【${agentName}】已收到：`

    window.setTimeout(() => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                messages: [
                  ...nextMessages,
                  {
                    id: `a-${Date.now()}`,
                    role: "agent",
                    content: `${replyPrefix}当前为演示模式，后续可接入真实 Agent 推理与项目上下文。`,
                  },
                ],
              }
            : tab,
        ),
      )
    }, 600)
  }

  return (
    <aside className="work-agent-panel flex h-full w-80 shrink-0 flex-col border-l border-[var(--work-hairline)] bg-[var(--work-canvas)]">
      <div className="flex items-stretch border-b border-[var(--work-divider)]">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1.5 py-1.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId
            return (
              <div
                key={tab.id}
                className={cn(
                  "group flex max-w-[120px] shrink-0 items-center rounded-md border transition-colors",
                  isActive
                    ? "border-[var(--work-hairline)] bg-[var(--work-parchment)]"
                    : "border-transparent hover:border-[var(--work-hairline)] hover:bg-[var(--work-parchment)]/60",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveTabId(tab.id)
                    setInput("")
                  }}
                  className={cn(
                    "min-w-0 flex-1 truncate px-2 py-1 text-left text-[11px]",
                    isActive ? "font-medium text-[var(--work-ink)]" : "text-[var(--work-ink-muted)]",
                  )}
                  title={tab.title}
                >
                  {tab.title}
                </button>
                {tabs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleCloseTab(tab.id)}
                    className={cn(
                      "mr-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[var(--work-ink-muted)] transition-opacity hover:bg-[var(--work-divider)] hover:text-[var(--work-ink)]",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                    aria-label={`关闭 ${tab.title}`}
                  >
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="w-px shrink-0 self-stretch bg-[var(--work-hairline)]" aria-hidden />

        <div className="flex shrink-0 items-center gap-0.5 px-1.5 py-1.5">
          <button
            type="button"
            onClick={handleAddTab}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--work-ink-muted)] transition-colors hover:bg-[var(--work-parchment)] hover:text-[var(--work-ink)]"
            aria-label="添加对话"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>

          <DropdownMenu.Root open={historyOpen} onOpenChange={setHistoryOpen} modal={false}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--work-ink-muted)] transition-colors hover:bg-[var(--work-parchment)] hover:text-[var(--work-ink)]"
                aria-label="历史对话"
              >
                <Clock className="h-4 w-4" aria-hidden />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="work-dropdown-panel z-[200] w-52 rounded-xl border border-[var(--work-hairline)] p-1.5 outline-none"
                sideOffset={6}
                align="end"
                collisionPadding={12}
                onCloseAutoFocus={(event) => event.preventDefault()}
              >
                <p className="work-dropdown-muted px-2 py-1 text-[11px] font-medium uppercase tracking-wide">
                  历史对话
                </p>
                {historyItems.map((item) => (
                  <DropdownMenu.Item
                    key={item.id}
                    className="work-dropdown-item flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-[13px] outline-none hover:bg-[#f5f5f7] focus:bg-[#f5f5f7]"
                    onSelect={() => handleOpenHistory(item)}
                  >
                    <span className="min-w-0 truncate">{item.title}</span>
                    <span className="work-dropdown-muted shrink-0 text-[11px] tabular-nums">{item.date}</span>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="border-b border-[var(--work-divider)] px-4 py-3">
        {addingRole ? (
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-[var(--work-ink-muted)]">添加新角色</p>
            <input
              value={newRoleName}
              onChange={(event) => setNewRoleName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAddRole()
                if (event.key === "Escape") {
                  setAddingRole(false)
                  setNewRoleName("")
                }
              }}
              placeholder="角色名称"
              className="w-full rounded-lg border border-[var(--work-hairline)] bg-[var(--work-parchment)] px-2.5 py-1.5 text-[13px] text-[var(--work-ink)] outline-none placeholder:text-[var(--work-ink-muted)] focus:border-[var(--work-primary)]"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddRole}
                disabled={!newRoleName.trim()}
                className="work-btn-primary px-3 py-1 text-[12px] disabled:opacity-40"
              >
                添加
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddingRole(false)
                  setNewRoleName("")
                }}
                className="text-[12px] text-[var(--work-ink-muted)] hover:text-[var(--work-ink)]"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--work-primary)]/10 text-[var(--work-primary)]">
              <Bot className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <DropdownMenu.Root open={roleMenuOpen} onOpenChange={setRoleMenuOpen} modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex min-w-0 items-center gap-1 rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]"
                      aria-label={`切换角色，当前 ${agentName}`}
                    >
                      <span className="truncate text-[13px] font-semibold text-[var(--work-ink)]">{agentName}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-[var(--work-ink-muted)] transition-transform duration-200",
                          roleMenuOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="work-dropdown-panel z-[200] w-56 rounded-xl border border-[var(--work-hairline)] p-1.5 outline-none"
                      sideOffset={6}
                      align="start"
                      collisionPadding={12}
                      onCloseAutoFocus={(event) => event.preventDefault()}
                    >
                      <p className="work-dropdown-muted px-2 py-1 text-[11px] font-medium uppercase tracking-wide">
                        切换角色
                      </p>

                      {roles.map((role) => (
                        <DropdownMenu.Item
                          key={role.id}
                          className="work-dropdown-item flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-[13px] outline-none hover:bg-[#f5f5f7] focus:bg-[#f5f5f7]"
                          onSelect={() => updateActiveTab({ selectedRoleId: role.id })}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{role.name}</span>
                            <span className="work-dropdown-muted block truncate text-[11px]">{role.responsibility}</span>
                          </span>
                          {selectedRoleId === role.id && (
                            <Check className="h-3.5 w-3.5 shrink-0 text-[#0066cc]" aria-hidden />
                          )}
                        </DropdownMenu.Item>
                      ))}

                      <DropdownMenu.Separator className="my-1 h-px bg-[var(--work-hairline)]" />

                      <DropdownMenu.Item
                        className="work-dropdown-item flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-[13px] text-[#0066cc] outline-none hover:bg-[#f5f5f7] focus:bg-[#f5f5f7]"
                        onSelect={(event) => {
                          event.preventDefault()
                          setRoleMenuOpen(false)
                          setAddingRole(true)
                        }}
                      >
                        <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        添加新角色
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Link
                  href={knowledgeHref}
                  className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--work-ink-muted)] transition-colors hover:bg-[var(--work-parchment)] hover:text-[var(--work-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--work-primary-focus)]"
                  title="查看角色知识库"
                  aria-label={`查看 ${agentName} 知识库`}
                >
                  <BookOpen className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="work-main-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
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
            placeholder={`向 ${agentName} 提问…`}
            className="min-h-[44px] flex-1 resize-none rounded-xl border border-[var(--work-hairline)] bg-[var(--work-parchment)] px-3 py-2 text-[13px] text-[var(--work-ink)] outline-none placeholder:text-[var(--work-ink-muted)] focus:border-[var(--work-primary)]"
            aria-label={`${agentName} 对话输入`}
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
