"use client"

import type { ReactNode } from "react"

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  gradientColors?: string
  borderRadius?: string
  animationDuration?: string
}

export default function AnimatedGradientBorder({
  children,
  className = "",
  gradientColors = "from-orange-500 via-orange-400 to-yellow-400",
  borderRadius = "rounded-lg",
  animationDuration = "duration-1000",
}: AnimatedGradientBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradientColors} ${borderRadius} blur opacity-30 group-hover:opacity-50 transition ${animationDuration} group-hover:duration-200 animate-gradient-xy`}
      ></div>
      {children}
    </div>
  )
}
