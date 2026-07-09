"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "@/app/components/icons"
import Link from "next/link"
import MYOBLogo from "@/app/components/mmc-logo"

export default function MYOBMFA() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [code, setCode] = useState("")

  const handleContinue = () => {
    // Simulate MFA verification
    router.push(`/login/myob/books?source=${source}`)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6">
            <MYOBLogo size="sm" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Multi-factor authentication</h1>
          <p className="text-gray-600 mt-4">
            Open the authentication app on your device to view authentication code and enter it here.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6-digit code from the authentication app
            </label>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="h-12 text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <Button
            onClick={handleContinue}
            disabled={code.length !== 6}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 shadow-md hover:shadow-lg transition-all"
          >
            Continue
          </Button>

          <div className="text-center space-y-4">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center text-purple-600 hover:underline text-sm mx-auto font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Go back
            </button>

            <Link href="#" className="block text-purple-600 hover:underline text-sm font-medium">
              Can't access your multi-factor device?
            </Link>
          </div>

          <div className="text-xs text-gray-500 text-center space-y-2">
            <p>
              By continuing, you agree to our{" "}
              <Link href="#" className="text-purple-600 underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-purple-600 underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>

        <div className="text-center pb-6">
          <MYOBLogo size="sm" className="opacity-60" />
          <p className="text-xs text-gray-500 mt-1">Made for every small business</p>
        </div>
      </Card>
    </div>
  )
}
