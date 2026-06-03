import { CheckCircle, GitBranch, LayoutDashboard, Shield, UserCog, Workflow } from "lucide-react"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "关于",
  description:
    "Agent Flow 是个人项目里的 AI 角色协作台：配置角色与工作流，Dashboard 看阶段、排程与交付，关键产出经你确认后再进入下一步。",
  path: "/introduction",
})

export default function IntroductionPage() {
  const { name, description, tagline } = siteConfig

  return (
    <div>
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                关于 {name}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                个人项目里的{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  AI 角色协作台
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">{tagline}</p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">{description}</p>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">产品定位</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">为谁解决什么问题</h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                一个人用多个 AI 角色做项目时，prompt 零散、交接混乱、进度靠脑子记——多 Agent 协作缺少「项目感」：无阶段、无排程视图、无交付记录、无人把关。
              </p>
              <p>
                Agent Flow 面向<strong className="text-foreground">个人 power user、独立 PM 与创作者</strong>
                ：在项目里配置角色（Prompt、知识、交付规范），用工作流定义协作；内置
                <strong className="text-foreground">项目主控</strong>
                与人对齐后产出排程；Dashboard 一眼看清阶段与交付。
              </p>
              <p>
                差异化不在「画流程图」，而在<strong className="text-foreground">岗位配置 + 交付纪律</strong>
                ：所有角色的产出都需你一定程度确认后，才视为正式结果并驱动下游——AI 协作，人做把关。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">演示场景</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">S1 · 个人竞品分析项目</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              默认演示路径：Dashboard 看进度 → 确认排程 → 确认角色交付 → 工作流 Tab 看交接
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: LayoutDashboard,
                title: "Dashboard 看进度",
                description: "阶段「分析中」；排程已确认；分析师卡片展示最近交付与状态角标。",
              },
              {
                icon: UserCog,
                title: "项目主控对齐排程",
                description: "主控提出排程草案 → 你确认 → 右侧排程表更新为当前共识视图。",
              },
              {
                icon: CheckCircle,
                title: "确认角色交付",
                description: "分析师交付 competitor-matrix-2026-06.md → 你确认 → 卡片更新为已确认结果。",
              },
              {
                icon: Workflow,
                title: "工作流定义协作",
                description: "工作流 Tab 展示分析师 → PM 的交接边；执行顺序以工作流为准。",
              },
              {
                icon: GitBranch,
                title: "角色有交付契约",
                description: "每个角色配置 Prompt、知识指针、命名规范与格式约定，交接有纪律。",
              },
              {
                icon: Shield,
                title: "人确认后再交接",
                description: "排程与交付物均经确认后才算正式结果，避免链式 Auto-run 无审核。",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed">
            本站点为高保真概念演示，界面与数据为 mock，不提供注册或真实 AI 运行。深度能力以交流为准。
          </p>
        </div>
      </section>
    </div>
  )
}
