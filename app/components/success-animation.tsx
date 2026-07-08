"use client"

import { Check } from "@/app/components/icons"

interface SuccessAnimationProps {
  size?: "sm" | "md" | "lg"
  className?: string
  onComplete?: () => void
}

export default function SuccessAnimation({ size = "md", className, onComplete }: SuccessAnimationProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-green-500 flex items-center justify-center animate-google-scale-in ${className}`}
      onAnimationEnd={onComplete}
    >
      <div className="animate-google-fade-in animate-delay-150">
        <Check className={`${iconSizes[size]} text-white`} />
      </div>
    </div>
  )
}
