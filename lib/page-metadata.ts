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
    keywords: ["多智能体", "工作流", "SaaS", "Agent Flow", "低代码", "营销站点"],
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
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    manifest: "/site.webmanifest",
  }
}
