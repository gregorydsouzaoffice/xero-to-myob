"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Extra transition delay in ms, for staggering siblings */
  delay?: number
  direction?: "up" | "left" | "right" | "scale" | "fade"
  /** Reveal only the first time it enters the viewport (default true) */
  once?: boolean
}

/**
 * Reveals children when they scroll into view, instead of animating on page
 * load while still below the fold. Pairs with the .reveal utilities in
 * globals.css; prefers-reduced-motion collapses it to an instant show.
 */
export default function Reveal({ children, className = "", delay = 0, direction = "up", once = true }: RevealProps) {
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
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const directionClass = direction === "fade" ? "" : `reveal-${direction}`

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${visible ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
