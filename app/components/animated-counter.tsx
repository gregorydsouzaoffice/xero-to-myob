"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  onComplete?: () => void
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  onComplete,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.round(from + (to - from) * easeOut)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    requestAnimationFrame(animate)
  }, [from, to, duration, onComplete])

  return (
    <span className={className}>
      {prefix}
      <span>{count}</span>
      {suffix}
    </span>
  )
}
