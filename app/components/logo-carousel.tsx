"use client"

import { useEffect, useState } from "react"

interface Logo {
  id: number
  src: string
  alt: string
}

export default function LogoCarousel() {
  const logos: Logo[] = [
    { id: 1, src: "/placeholder.svg?height=40&width=120&text=KPMG", alt: "KPMG" },
    { id: 2, src: "/placeholder.svg?height=40&width=120&text=Deloitte", alt: "Deloitte" },
    { id: 3, src: "/placeholder.svg?height=40&width=120&text=PwC", alt: "PwC" },
    { id: 4, src: "/placeholder.svg?height=40&width=120&text=EY", alt: "Ernst & Young (EY)" },
    { id: 5, src: "/placeholder.svg?height=40&width=120&text=Grant+Thornton", alt: "Grant Thornton" },
    { id: 6, src: "/placeholder.svg?height=40&width=120&text=RSM", alt: "RSM" },
    { id: 7, src: "/placeholder.svg?height=40&width=120&text=BDO", alt: "BDO" },
    { id: 8, src: "/placeholder.svg?height=40&width=120&text=Mazars", alt: "Mazars" },
  ]

  const [isClient, setIsClient] = useState(false)

  const TextLogo = ({ text, className }: { text: string; className?: string }) => (
    <div
      className={`flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 ${className}`}
    >
      <span className="text-sm font-semibold text-gray-700 tracking-wide">{text}</span>
    </div>
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 mt-12">
        {logos.slice(0, 4).map((logo) => (
          <div key={logo.id} className="flex items-center justify-center p-4">
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden w-full mt-12">
      <div className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll-left">
        {/* Double the logos to create seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0">
            <div
              className="flex items-center justify-center p-4 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <TextLogo
                text={logo.alt === "Ernst & Young (EY)" ? "EY" : logo.alt}
                className="h-10 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
