"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MYOBLogo from "@/components/mmc-logo"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Brand hairline: Xero teal → MYOB purple → magenta */}
      <div className="h-0.5 journey-gradient-bg" />

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-border/60 shadow-sm"
            : "bg-background/60 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="container flex h-16 items-center gap-4">
          <div className="transition-transform duration-200 hover:scale-105">
            <MYOBLogo size="sm" />
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-border/60 pl-4 text-xs text-muted-foreground">
            <span>Powered by</span>
            <img
              src="/mmc-convert-logo.png"
              alt="MMC Convert"
              className="h-5 w-auto opacity-80 transition-opacity duration-200 hover:opacity-100"
            />
          </div>

          <nav className="flex flex-1 items-center justify-end gap-1">
            <Button
              asChild
              variant="ghost"
              className="rounded-lg px-4 font-medium text-foreground/70 transition-colors duration-200 hover:bg-primary/5 hover:text-primary"
            >
              <a href="#features">Features</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-lg px-4 font-medium text-foreground/70 transition-colors duration-200 hover:bg-primary/5 hover:text-primary"
            >
              <a href="#how-it-works">How it works</a>
            </Button>
            <Button asChild className="premium-button ml-2 h-9 rounded-full px-5 text-sm font-medium">
              <Link href="/dashboard/new-migration">Start migration</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
