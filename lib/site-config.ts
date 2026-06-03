import type { LucideIcon } from "lucide-react"
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react"

/** 个人联系方式：留空字符串的项不会出现在页脚/导航社交区 */
const contactDetails = {
  email: "Oldschooldevotee@Foxmail.com",
  phone: "13502508112",
  telegram: "https://t.me/+8613502508112",
  linkedin: "https://www.linkedin.com/in/伟权-王-780885360",
  github: "https://github.com/leonardwwq",
  cta: "预约演示",
} as const

export type ContactDetails = typeof contactDetails

export type SocialLink = {
  label: string
  href: string
  handle: string
  icon: LucideIcon
}

function buildSocialLinks(contact: ContactDetails): SocialLink[] {
  const links: SocialLink[] = []

  if (contact.email) {
    links.push({
      label: "Email",
      href: `mailto:${contact.email}`,
      handle: contact.email,
      icon: Mail,
    })
  }
  if (contact.phone) {
    links.push({
      label: "Phone",
      href: `tel:${contact.phone}`,
      handle: contact.phone,
      icon: Phone,
    })
  }
  if (contact.telegram) {
    links.push({
      label: "Telegram",
      href: contact.telegram,
      handle: "Telegram",
      icon: Send,
    })
  }
  if (contact.linkedin) {
    links.push({
      label: "LinkedIn",
      href: contact.linkedin,
      handle: "伟权·王",
      icon: Linkedin,
    })
  }
  if (contact.github) {
    links.push({
      label: "GitHub",
      href: contact.github,
      handle: "@leonardwwq",
      icon: Github,
    })
  }

  return links
}

/** Central place to brand and configure the marketing site. Edit this file first. */
export const siteConfig = {
  name: "Agent Flow",
  logo: {
    prefix: "Agent ",
    highlight: "Flow",
    emoji: "⎇",
  },
  tagline:
    "个人项目里的 AI 角色协作台——配置角色与工作流，Dashboard 看阶段、排程与交付；关键产出经你确认后再进入下一步。",
  description:
    "配置 AI 角色，用工作流协作；Dashboard 看排程与交付，重要结果你来确认。当前为高保真静态演示，深度能力以交流为准。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "zh_CN",
  statusLabel: "概念演示",

  contact: contactDetails,

  nav: [
    { label: "首页", href: "/" },
    { label: "功能", href: "/projects" },
    { label: "路线图", href: "/workbench" },
    { label: "更新日志", href: "/blog" },
    { label: "关于", href: "/introduction" },
  ] as const,

  social: buildSocialLinks(contactDetails),

  hero: {
    eyebrow: "Agent Flow — 个人项目里的 AI 角色协作台",
    headlineLine1: "Agent-Flow",
    headlineLine2: "一站看清",
    rotatingPhrases: ["阶段与排程", "可确认的交付", "工作流协作", "项目主控对齐"],
    description:
      "一个人用多个 AI 角色做项目时，prompt 零散、交接混乱、进度靠脑子记。Agent Flow 让你在项目里配置角色与工作流，项目主控与人对齐排程，Dashboard 一眼看清阶段与交付——所有产出经你确认后再进入下一步。",
    primaryCta: { label: "查看产品演示", href: "/projects" },
    secondaryCta: { label: "预约演示", href: `mailto:${contactDetails.email}` },
    terminalTitle: "agent-flow://dashboard",
    version: "v0.2.0",
    terminalBadge: "2026",
  },

  sections: {
    features: {
      eyebrow: "核心能力",
      title: "产品功能",
      subtitle: "Dashboard 驾驶舱、角色配置、工作流引擎与由你确认——四层能力覆盖个人 AI 项目协作全流程。",
    },
    highlights: {
      eyebrow: "为什么选择 Agent Flow",
      title: "产品亮点",
      subtitle: "AI 协作，人做把关——角色有交付纪律，排程是共识视图，进度与产出同屏可见。",
    },
    roadmap: {
      eyebrow: "产品路线图",
      title: "演进方向",
      subtitle: "叙事用路线图，展示演示完成度与后续规划，非真实排期承诺。",
      terminalPath: "~/agent-flow/roadmap",
    },
    footer: {
      eyebrow: "联系我们",
      title: "准备好了解",
      titleHighlight: "Agent Flow",
      description: "预约演示，了解 Agent Flow 概念演示与后续能力。",
      cta: contactDetails.cta,
    },
  },

  attribution: {
    basedOn: "https://github.com/ehsanghaffar/eincode",
    basedOnLabel: "EinCode template",
  },
} as const

export type NavItem = (typeof siteConfig.nav)[number]

export function isExternalHref(href: string): boolean {
  return href.startsWith("http")
}

export function getSiteUrl(): string {
  return siteConfig.url.replace(/\/$/, "")
}

export function getLogoText(): string {
  return `${siteConfig.logo.prefix}${siteConfig.logo.highlight}`
}
