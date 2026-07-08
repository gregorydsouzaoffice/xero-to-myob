"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "./components/icons"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950/30 dark:via-gray-950/30 dark:to-green-950/30" />

      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-premium-shimmer" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-premium-shimmer animation-delay-2000" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-black animate-fade-in-up">
            <span className="block">Seamless Data Migration</span>
            <span className="mt-2 block gradient-text font-black">Xero → MYOB Migration Tool</span>
          </h1>

          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Enterprise-grade migration tool that simplifies the process of transferring your financial data between
            accounting platforms with precision and ease.
          </p>

          <div className="mt-12 flex justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Button
              asChild
              size="lg"
              className="premium-button text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/dashboard/new-migration">
                Start Migration <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 gradient-bg" />
    </section>
  )
}
