"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface MYOBLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function MYOBLogo({ className = "", size = "md" }: MYOBLogoProps) {
  const sizes = {
    sm: { width: 120, height: 32 },
    md: { width: 160, height: 42 },
    lg: { width: 200, height: 53 },
  }

  const { width, height } = sizes[size]
  const [imgSrc, setImgSrc] = useState("/images/myob-logo.png")

  const handleError = () => {
    setImgSrc(`/placeholder.svg?height=${height}&width=${width}&query=MYOB logo`)
  }

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt="MYOB"
        width={width}
        height={height}
        className="h-auto"
        priority
        onError={handleError}
      />
    </Link>
  )
}
