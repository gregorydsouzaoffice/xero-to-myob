"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  variant?: "default" | "dots" | "pulse"
}

export default function LoadingSpinner({ size = "md", className, variant = "default" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn("bg-primary rounded-full animate-bounce", dotSizes[size])}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div
        className={cn(
          "rounded-full bg-primary animate-pulse",
          sizeClasses[size].replace("border-", "").replace("h-", "w-").replace("w-", "h-"),
        )}
      />
    )
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn("animate-spin rounded-full border-t-transparent border-primary", sizeClasses[size], className)}
      />
    </div>
  )
}
