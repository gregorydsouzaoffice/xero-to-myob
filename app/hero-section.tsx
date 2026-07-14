"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "./components/icons"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Brand aurora: Xero teal drifts into MYOB purple and magenta */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-background to-background" />
      <div className="absolute -top-24 left-[10%] h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--brand-teal)/0.13)] blur-3xl animate-blob-slow" />
      <div
        className="absolute top-1/4 right-[6%] h-[32rem] w-[32rem] rounded-full bg-[hsl(var(--brand-purple)/0.12)] blur-3xl animate-blob-slow"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[hsl(var(--brand-pink)/0.10)] blur-3xl animate-blob-slow"
        style={{ animationDelay: "-10s" }}
      />

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-pink" />
            </span>
            Enterprise-grade migration · Powered by MMC Convert
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
            <span className="animate-fade-in-up animation-delay-200 block">Seamless Data Migration</span>
            <span className="animate-fade-in-up animation-delay-400 mt-2 block gradient-text pb-1">
              Xero → MYOB, done right
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-400 mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Move your complete financial history between accounting platforms with bank-grade security, field-level
            accuracy and a verified comparison report at the end.
          </p>

          {/* Migration journey: Xero → data packets → MYOB */}
          <div className="animate-fade-in-up animation-delay-600 mx-auto mt-14 flex max-w-xl items-center gap-4 sm:gap-6">
            <div className="group flex flex-col items-center gap-2.5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-card p-3 shadow-lg shadow-[color:hsl(var(--brand-teal)/0.18)] transition-transform duration-300 group-hover:scale-105">
                <Image src="/images/Xero-logo.png" alt="Xero" width={56} height={56} className="h-full w-full object-contain" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Xero</span>
            </div>

            <div className="relative h-20 flex-1" aria-hidden="true">
              <div className="journey-gradient-bg absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full opacity-25" />
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="journey-gradient-bg absolute top-1/2 h-2.5 w-2.5 rounded-full shadow-md"
                  style={{
                    left: 0,
                    opacity: 0,
                    animation: "data-flow 2.7s linear infinite",
                    animationDelay: `${i * 0.9}s`,
                  }}
                />
              ))}
            </div>

            <div className="group flex flex-col items-center gap-2.5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-card p-3 shadow-lg shadow-[color:hsl(var(--brand-pink)/0.18)] transition-transform duration-300 group-hover:scale-105">
                <Image src="/images/myob-logo.png" alt="MYOB" width={56} height={56} className="h-full w-full object-contain" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">MYOB</span>
            </div>
          </div>

          <div className="animate-fade-in-up animation-delay-600 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="premium-button group rounded-full px-10 py-4 text-lg">
              <Link href="/dashboard/new-migration">
                Start Migration <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/70 bg-card/60 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:text-primary"
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>

          <a
            href="#features"
            className="animate-fade-in-up animation-delay-600 mt-16 inline-flex flex-col items-center gap-1 text-muted-foreground/60 transition-colors duration-200 hover:text-primary"
            aria-label="Scroll to features"
          >
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>

      <div className="journey-gradient-bg absolute bottom-0 left-0 right-0 h-0.5 opacity-80" />
    </section>
  )
}
