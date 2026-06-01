import type { LucideIcon } from "lucide-react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

/** Central place to brand and configure the marketing site. Edit this file first. */
export const siteConfig = {
  name: "Agent Flow",
  logo: {
    prefix: "Agent ",
    highlight: "Flow",
    emoji: "⎇",
  },
  tagline: "让业务专家通过拖拽角色与自定义流程，轻松搭建、运行和管理多智能体协作工作流",
  description:
    "Agent Flow 是一个面向产品经理、运营、分析师等业务专家的多智能体协作平台。无需编写代码，通过拖拽角色、自定义流程，即可搭建、运行并管理 AI 工作流。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "zh_CN",
  statusLabel: "状态：内测中",

  contact: {
    email: "hello@agentflow.example.com",
    cta: "预约演示",
  },

  nav: [
    { label: "首页", href: "/" },
    { label: "功能", href: "/projects" },
    { label: "路线图", href: "/workbench" },
    { label: "更新日志", href: "/blog" },
    { label: "关于", href: "/introduction" },
  ] as const,

  social: [
    { label: "GitHub", href: "https://github.com", handle: "@agent-flow", icon: Github },
    { label: "Twitter", href: "https://twitter.com", handle: "@agentflow", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", handle: "/company/agent-flow", icon: Linkedin },
    { label: "Email", href: "mailto:hello@agentflow.example.com", handle: "hello@agentflow.example.com", icon: Mail },
  ] as const,

  hero: {
    eyebrow: "Agent Flow — 多智能体协作，业务专家也能上手",
    headlinePrefix: "拖拽角色，编排",
    rotatingPhrases: ["多智能体工作流", "自动化业务流程", "可复用 AI 协作", "可视化运行管理"],
    description:
      "面向产品经理、运营、分析师等业务专家：通过拖拽角色、自定义流程，轻松搭建、运行和管理多智能体协作工作流，无需依赖工程团队写代码。",
    primaryCta: { label: "查看功能", href: "#features" },
    secondaryCta: { label: "了解产品", href: "/introduction" },
    terminalTitle: "agent-flow://canvas",
    version: "v0.1.0",
    terminalBadge: "2026",
  },

  sections: {
    features: {
      eyebrow: "核心能力",
      title: "产品功能",
      subtitle: "从流程编排到运行监控，覆盖多智能体工作流的全生命周期。",
    },
    highlights: {
      eyebrow: "为什么选择 Agent Flow",
      title: "产品亮点",
      subtitle: "为业务专家设计，降低 AI 协作门槛，让流程真正跑起来。",
    },
    roadmap: {
      eyebrow: "产品路线图",
      title: "正在构建的能力",
      subtitle: "公开路线图，展示 Agent Flow 的演进方向。",
      terminalPath: "~/agent-flow/roadmap",
    },
    footer: {
      eyebrow: "联系我们",
      title: "准备好体验",
      titleHighlight: "Agent Flow",
      description: "预约演示或加入内测，亲手搭建你的第一个多智能体工作流。",
      cta: "预约演示",
    },
  },

  attribution: {
    basedOn: "https://github.com/ehsanghaffar/eincode",
    basedOnLabel: "EinCode template",
  },
} as const

export type NavItem = (typeof siteConfig.nav)[number]
export type SocialLink = (typeof siteConfig.social)[number] & { icon: LucideIcon }

export function getSiteUrl(): string {
  return siteConfig.url.replace(/\/$/, "")
}

export function getLogoText(): string {
  return `${siteConfig.logo.prefix}${siteConfig.logo.highlight}`
}
