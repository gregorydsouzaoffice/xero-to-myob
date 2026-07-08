"use client"

import { cn } from "@/lib/utils"

interface ProgressBarAnimatedProps {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
  color?: "blue" | "green" | "orange" | "red"
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export default function ProgressBarAnimated({
  value,
  max = 100,
  className,
  showPercentage = false,
  color = "blue",
  size = "md",
  animated = true,
}: ProgressBarAnimatedProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  }

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("bg-gray-200 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-1500 ease-out", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-right animate-fade-in-delayed">{Math.round(percentage)}%</div>
      )}
    </div>
  )
}
