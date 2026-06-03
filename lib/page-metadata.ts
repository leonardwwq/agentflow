import type { Metadata } from "next"
import { getSiteUrl, siteConfig } from "@/lib/site-config"

export function createPageMetadata(options: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const baseUrl = getSiteUrl()
  const canonical = `${baseUrl}${options.path.startsWith("/") ? options.path : `/${options.path}`}`
  const pageTitle = `${options.title} | ${siteConfig.name}`

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    openGraph: {
      title: pageTitle,
      description: options.description,
      url: canonical,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: options.description,
      images: ["/og-image.png"],
    },
    alternates: { canonical },
  }
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["AI 角色协作", "Dashboard", "工作流", "人确认", "项目主控", "Agent Flow", "多智能体"],
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: "/",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
  }
}
