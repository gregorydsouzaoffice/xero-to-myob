"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Search, User } from "@/app/components/icons"
import Link from "next/link"

export default function MYOBBooks() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [searchTerm, setSearchTerm] = useState("MMC New")
  const [selectedBook, setSelectedBook] = useState("mmc-new-tool-1")

  const handleConnect = () => {
    // Simulate book selection and redirect back to connect page
    router.push(`/dashboard/new-migration/connect?source=${source}&destination=myob&myob_connected=true`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Select a book</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-10 border-gray-200"
              placeholder="Search books"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">✕</button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
              Active
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
              Inactive
            </Button>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">BOOK ↑</div>

            <div className="space-y-2">
              <div
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedBook === "mmc-new-tool-1"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedBook("mmc-new-tool-1")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Kylie & Co</div>
                    <div className="font-medium text-gray-900">MMC New Tool - Book 1</div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    Shared with me
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedBook === "mmc-new-tool-2"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedBook("mmc-new-tool-2")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Kylie & Co</div>
                    <div className="font-medium text-gray-900">MMC New Tool - Book 2</div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    Shared with me
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 text-sm">
            <Link href="#" className="block text-blue-600 hover:underline">
              Manage your subscriptions in Portal ↗
            </Link>
            <Link href="#" className="block text-blue-600 hover:underline">
              Don't see your book here? ↗
            </Link>
          </div>

          <Button
            onClick={handleConnect}
            disabled={!selectedBook}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
          >
            Connect to Selected Book
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
