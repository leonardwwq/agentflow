import { ExternalLink, Heart } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const { sections, contact, social, name } = siteConfig
  const footer = sections.footer
  const emailLink = social.find((s) => s.label === "Email")

  return (
    <footer id="contact" className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                {footer.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {footer.title}{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text ">
                  {footer.titleHighlight}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">{footer.description}</p>

            <div className="pt-2">
              <a
                href={emailLink?.href ?? `mailto:${contact.email}`}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-primary bg-primary/10 px-8 py-4 sm:py-4 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="relative z-10">{footer.cta}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </div>
          </div>

          <div className="space-y-6 lg:text-right animate-fade-in-up stagger-2">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              Links
            </p>
            <div className="space-y-2">
              {social.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 lg:flex-row-reverse active:bg-secondary/30 hover:border-border/50 hover:bg-card/50 glass animate-fade-in"
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="flex items-center gap-3 lg:flex-row-reverse">
                    <link.icon className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                    <span className="font-mono text-sm font-medium transition-colors group-hover:text-gradient">
                      {link.label}
                    </span>
                    {link.label !== "Email" && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground truncate">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-between gap-6 border-t border-border/30 pt-8 sm:pt-10 sm:flex-row animate-fade-in stagger-4">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-destructive animate-pulse" />
            <span>个人案例作品</span>
          </div>

          <div className="flex items-center gap-4">
            {social
              .filter((l) => l.label !== "Email")
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} {name}
            <span className="hidden sm:inline"> — </span>
            <span className="block sm:inline text-muted-foreground/80">
              UI adapted from{" "}
              <a
                href={siteConfig.attribution.basedOn}
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.attribution.basedOnLabel}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
