import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, FileSpreadsheet } from "lucide-react"
import Header from "./header"
import HeroSection from "./hero-section"
import { Button } from "@/components/ui/button"
import LogoCarousel from "./components/logo-carousel"
import Reveal from "./components/scroll-reveal"
import StatsBand from "./components/stats-band"

export const metadata: Metadata = {
  title: "Data Migration Tool | Xero to MYOB",
  description: "Enterprise-grade data migration from Xero to MYOB",
}

const features = [
  {
    icon: Database,
    title: "Visual Interface",
    body: "Intuitive dashboard with real-time progress tracking and beautiful data visualizations",
    tile: "bg-gradient-to-br from-sky-500 to-cyan-400",
    glow: "hover:shadow-[0_16px_40px_-16px_hsl(var(--brand-teal)/0.45)]",
  },
  {
    icon: FileSpreadsheet,
    title: "Smart Mapping",
    body: "Interactive field mapping with AI-powered suggestions and validation checks",
    tile: "bg-gradient-to-br from-purple-700 to-violet-500",
    glow: "hover:shadow-[0_16px_40px_-16px_hsl(var(--brand-purple)/0.45)]",
  },
  {
    icon: CheckCircle,
    title: "Live Updates",
    body: "Beautiful progress animations and real-time status updates during migration",
    tile: "bg-gradient-to-br from-fuchsia-600 to-pink-500",
    glow: "hover:shadow-[0_16px_40px_-16px_hsl(var(--brand-pink)/0.45)]",
  },
]

const steps = [
  { label: "Connect", desc: "Link Xero & MYOB securely" },
  { label: "Extract", desc: "Pull your complete records" },
  { label: "Map", desc: "Match fields intelligently" },
  { label: "Validate", desc: "Catch issues before import" },
  { label: "Import", desc: "Watch data flow live" },
  { label: "Report", desc: "Verify with comparisons" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />

      <main className="relative z-10 flex-1">
        {/* Features */}
        <section id="features" className="relative z-10 w-full scroll-mt-20 bg-background py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="google-display-medium gradient-text pb-1">Built for a Flawless Migration</h2>
              <p className="google-body-large max-w-2xl text-muted-foreground">
                Our migration process is designed to be simple, secure, and accurate with enterprise-grade reliability
              </p>
            </Reveal>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 120}>
                  <Card
                    className={`google-card group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${feature.glow}`}
                  >
                    <div className="journey-gradient-bg absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${feature.tile}`}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="google-title-large">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="google-body-medium leading-relaxed text-muted-foreground">{feature.body}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — mirrors the actual six-step wizard */}
        <section id="how-it-works" className="w-full scroll-mt-20 py-28 google-gradient">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="google-display-medium gradient-text pb-1">How It Works</h2>
              <p className="google-body-large max-w-2xl text-muted-foreground">
                Six guided steps from your first login to a fully verified migration report
              </p>
            </Reveal>

            <Reveal className="relative mx-auto max-w-5xl">
              <div className="journey-gradient-bg journey-line absolute left-[8%] right-[8%] top-6 hidden h-0.5 rounded-full md:block" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
                {steps.map((step, i) => (
                  <div
                    key={step.label}
                    className="step-chip flex flex-col items-center gap-3 text-center"
                    style={{ transitionDelay: `${250 + i * 140}ms` }}
                  >
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-card font-semibold text-primary shadow-md">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{step.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-16 flex justify-center" delay={200}>
              <Button asChild size="lg" className="premium-button rounded-full px-10 py-4 text-lg">
                <a href="/dashboard/new-migration">Start your migration</a>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Trusted by */}
        <section className="w-full bg-background py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-10 text-center">
              <Reveal className="space-y-4">
                <h2 className="google-display-medium gradient-text pb-1">Trusted by Leading Accounting Firms</h2>
                <p className="google-body-large max-w-2xl text-muted-foreground">
                  Join hundreds of businesses that have successfully migrated their financial data
                </p>
              </Reveal>
              <Reveal delay={150} className="flex w-full justify-center">
                <StatsBand />
              </Reveal>
              <Reveal direction="fade" delay={250} className="w-full">
                <LogoCarousel />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative w-full bg-card/50 py-12 backdrop-blur-sm">
        <div className="journey-gradient-bg absolute inset-x-0 top-0 h-0.5 opacity-60" />
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <p className="google-body-medium text-muted-foreground">© 2026 MYOB. All rights reserved.</p>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-muted-foreground/70">Powered by</span>
              <img
                src="/mmc-convert-logo.png"
                alt="MMC Convert"
                className="h-5 w-auto opacity-80 transition-opacity duration-200 hover:opacity-100"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
