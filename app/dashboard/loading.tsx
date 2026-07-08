"use client"

import LoadingSpinner from "@/app/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="text-center animate-fade-in-up">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-lg text-gray-600 animate-fade-in-delayed">Loading your dashboard...</p>
      </div>
    </div>
  )
}
