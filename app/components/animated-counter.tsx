"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  /** Number of fraction digits to keep while counting (default 0) */
  decimals?: number
  onComplete?: () => void
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  onComplete,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const startTime = Date.now()
    let frame: number
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(from + (to - from) * easeOut)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setCount(to)
        onComplete?.()
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [from, to, duration, onComplete])

  return (
    <span className={className}>
      {prefix}
      <span>
        {count.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </span>
      {suffix}
    </span>
  )
}
