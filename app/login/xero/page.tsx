"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function XeroLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [email, setEmail] = useState("ankit@mmcconvert.com")
  const [password, setPassword] = useState("••••••••")

  const handleLogin = () => {
    // Simulate login process
    router.push(`/login/xero/organization?destination=${destination}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">xero</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Log in to Xero</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>

          <Button onClick={handleLogin} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Log in
          </Button>

          <div className="flex justify-between text-sm">
            <Link href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="#" className="text-blue-600 hover:underline">
              Can't log in?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
