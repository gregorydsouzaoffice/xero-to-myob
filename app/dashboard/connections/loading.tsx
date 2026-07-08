"use client"

import { Link } from "@/app/components/icons"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-pulse">
          <Link className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">Loading connections...</p>
      </div>
    </div>
  )
}
