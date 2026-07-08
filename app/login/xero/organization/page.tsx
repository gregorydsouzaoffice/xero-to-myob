"use client"

import Link from "next/link"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User } from "@/app/components/icons"

export default function XeroOrganization() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [searchTerm, setSearchTerm] = useState("Demo")
  const [selectedOrg, setSelectedOrg] = useState("demo-company")

  const handleConnect = () => {
    // Simulate organization selection and redirect back to connect page
    router.push(`/dashboard/new-migration/connect?source=xero&destination=${destination}&xero_connected=true`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">xero</span>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">MMC Excel Converter</h1>
          <p className="text-gray-600">wants access to:</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Select value={selectedOrg} onValueChange={setSelectedOrg}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select another organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo-company">Demo Company (Global)</SelectItem>
                <SelectItem value="test-company">Test Company</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 border-gray-200"
                placeholder="Search organizations"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-gray-900">Demo Company (Global)</div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">This will allow access to:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Chart of accounts</li>
              <li>• Contacts</li>
              <li>• Employees</li>
              <li>• Business transactions</li>
              <li>• Payroll settings</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Migrations MMC Convert</h4>
                <p className="text-sm text-gray-600">View your name, email, and user profile.</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 space-y-2">
            <p>
              By allowing access, you agree to the transfer of your data between Xero and this application in accordance
              with Xero's{" "}
              <Link href="#" className="text-blue-600 underline">
                Terms of use
              </Link>{" "}
              and the application provider's{" "}
              <Link href="#" className="text-blue-600 underline">
                terms of use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 underline">
                privacy policy
              </Link>
              .
            </p>
            <p>
              You can disconnect at any time by going to{" "}
              <Link href="#" className="text-blue-600 underline">
                Connected apps
              </Link>{" "}
              in your Xero settings.
            </p>
          </div>

          <Button onClick={handleConnect} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Allow access
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
