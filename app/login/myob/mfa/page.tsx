"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import MYOBLogo from "@/app/components/mmc-logo"

export default function MYOBMFA() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [code, setCode] = useState("")

  const handleContinue = () => {
    router.push(`/login/myob/books?source=${source}`)
  }

  return (
    <div className="min-h-screen bg-[#F0F0F4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl border-0 rounded-2xl p-6 md:p-8">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto flex justify-center">
            <MYOBLogo size="sm" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-4">Two factor authentication</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-3 leading-relaxed">
            We've sent an authentication code to your email <br />
            <span className="font-medium text-gray-700">- ****@mmcc**********</span>
          </p>
        </CardHeader>

        <CardContent className="p-0 mt-2 space-y-5">
          {/* Read-only email box */}
          <div className="w-full bg-[#EBEBEE] text-gray-600 text-center py-3 rounded-lg text-sm font-medium border border-gray-200/50 select-none">
            ****@mmcc**********
          </div>

          {/* Floating label input field */}
          <div className="relative mt-6 mb-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 border-gray-300 rounded focus:border-[#5C1D80] focus:ring-0 focus:ring-offset-0 text-sm bg-transparent px-3.5 pt-2"
              placeholder=""
              maxLength={8}
            />
            <label className="absolute left-3 -top-2 bg-white px-1 text-[11px] font-medium text-purple-700">
              Enter your authentication code*
            </label>
          </div>

          {/* Verify button */}
          <Button
            onClick={handleContinue}
            disabled={code.length < 4}
            className="w-full h-12 bg-[#5C1D80] hover:bg-[#45145f] text-white font-semibold rounded-lg text-sm shadow transition-colors disabled:opacity-50"
          >
            Verify code
          </Button>

          {/* Links */}
          <div className="text-center text-sm text-gray-600 mt-4 space-y-5">
            <div>
              Didn't receive an email?{" "}
              <button className="text-[#5C1D80] hover:underline font-semibold">
                Resend
              </button>
            </div>
            <div>
              <button className="text-[#5C1D80] hover:underline text-sm font-semibold">
                Try another method
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
