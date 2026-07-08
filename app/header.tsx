"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import MYOBLogo from "@/components/mmc-logo"

export default function Header() {
  const [particles, setParticles] = useState<Array<{ id: number; top: string; left: string; delay: string }>>([])

  useEffect(() => {
    // Generate subtle particles for premium feel
    const newParticles = Array(2)
      .fill(0)
      .map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${i * 1}s`,
      }))
    setParticles(newParticles)
  }, [])

  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-accent/60 to-primary/80 animate-premium-shimmer overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/20 blur-[60px] -top-[200px] -left-[100px] animate-blob-slow"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-accent/20 blur-[60px] -top-[100px] right-[20%] animate-blob-slow animation-delay-2000"></div>
      </div>

      <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="container flex h-16 items-center">
          <div className="mr-4 transition-transform duration-200 hover:scale-105">
            <MYOBLogo size="md" />
          </div>

          <div className="flex items-center space-x-2 text-white/70 text-sm">
            <span>Powered by</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ihUWFePEscYTEzqlHMJoc9mU9oDjxU.png"
              alt="MMC Convert"
              className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </div>

          <nav className="flex flex-1 items-center justify-end space-x-2">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:scale-105"
            >
              Features
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
