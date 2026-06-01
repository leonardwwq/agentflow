import { BlogHero } from "@/components/public/blog/blog-hero"
import { BlogList } from "@/components/public/blog/blog-list"
import { BlogSidebar } from "@/components/public/blog/blog-sidebar"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "更新日志",
  description: `${siteConfig.name} 产品更新与版本发布说明。`,
  path: "/blog",
  keywords: ["更新日志", "发布说明", "Agent Flow"],
})

export default function BlogPage() {
  return (
    <div className="pt-24">
      <BlogHero />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <BlogList />
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}
