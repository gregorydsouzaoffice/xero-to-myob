"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedCounter from "./animated-counter"

const stats = [
  { to: 12000, suffix: "+", decimals: 0, label: "Successful migrations" },
  { to: 99.98, suffix: "%", decimals: 2, label: "Data accuracy" },
  { to: 4.9, suffix: "/5", decimals: 1, label: "Customer rating" },
]

/**
 * Stat counters that only start counting once the band scrolls into view,
 * so the count-up is never wasted below the fold.
 */
export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-1">
          <span className="text-4xl font-bold tracking-tight gradient-text">
            {visible ? (
              <AnimatedCounter from={0} to={stat.to} decimals={stat.decimals} suffix={stat.suffix} duration={1.8} />
            ) : (
              <span>0{stat.suffix}</span>
            )}
          </span>
          <span className="text-sm text-muted-foreground">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
