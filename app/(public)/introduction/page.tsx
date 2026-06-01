import { Bot, GitBranch, Layout, LineChart, Play, Users } from "lucide-react"
import { createPageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = createPageMetadata({
  title: "关于",
  description: siteConfig.description,
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
                多智能体协作，{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  业务专家也能上手
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
                传统多智能体工具往往面向开发者。Agent Flow 则面向<strong className="text-foreground">产品经理、运营、分析师</strong>
                等业务专家：通过拖拽角色、自定义流程，在可视化界面中完成工作流的搭建、运行与管理。
              </p>
              <p>
                你不需要写 Prompt 工程代码，也不需要理解 Agent 框架细节——只需像画流程图一样组织协作步骤，让多个 AI
                角色按你的业务逻辑协同工作。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">典型场景</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">业务专家在用 Agent Flow 做什么</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layout,
                title: "竞品与调研分析",
                description: "研究员采集信息 → 分析师提炼洞察 → 撰写者输出报告，一条流程跑完。",
              },
              {
                icon: GitBranch,
                title: "运营活动复盘",
                description: "数据解读、归因分析、改进建议由不同角色智能体分工协作完成。",
              },
              {
                icon: LineChart,
                title: "定期报告生成",
                description: "周报、月报、数据摘要——固定流程一键运行，减少重复劳动。",
              },
              {
                icon: Bot,
                title: "自定义角色协作",
                description: "按你的团队分工定义角色职责，绑定工具与输出格式。",
              },
              {
                icon: Play,
                title: "试运行与正式运行",
                description: "先小范围验证流程，再投入日常业务，运行过程全程可追踪。",
              },
              {
                icon: Users,
                title: "团队流程沉淀",
                description: "优秀流程保存为模板，在新项目中复制、微调、复用。",
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
    </div>
  )
}
