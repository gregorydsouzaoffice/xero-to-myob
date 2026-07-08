"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff } from "@/app/components/icons"
import Link from "next/link"
import MYOBLogo from "@/app/components/mmc-logo"

export default function MYOBLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [email, setEmail] = useState("MYOB@mmcconvert.com")
  const [password, setPassword] = useState("••••••••")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    // Simulate login process
    router.push(`/login/myob/mfa?source=${source}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6">
            <MYOBLogo size="sm" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Sign in to your MYOB account</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address or username</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-blue-50 border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-blue-50 border-blue-100 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium"
          >
            Continue
          </Button>

          <div className="text-center">
            <span className="text-gray-500">- OR -</span>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full h-12 border-gray-200 bg-transparent">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-12 border-gray-200 bg-transparent">
              <div className="w-5 h-5 mr-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-sm"></div>
              Continue with Microsoft
            </Button>
          </div>

          <div className="text-center space-y-2 text-sm">
            <div>
              <span className="text-gray-600">New to MYOB? </span>
              <Link href="#" className="text-blue-600 hover:underline font-medium">
                Create a new account
              </Link>
            </div>
            <Link href="#" className="block text-blue-600 hover:underline">
              Forgotten password
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
