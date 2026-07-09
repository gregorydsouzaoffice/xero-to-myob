"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "@/app/components/icons"
import MYOBLogo from "@/app/components/mmc-logo"

interface Business {
  id: string
  name: string
  initials: string
}

const BUSINESSES: Business[] = [
  { id: "mmc-new-tool-1", name: "MMC New Tool - Book 1", initials: "MN" },
  { id: "mmc-new-tool-2", name: "MMC New Tool - Book 2", initials: "MN" },
  { id: "alc-family-trust", name: "The Trustee for ALC Family Trust", initials: "TT" },
  { id: "empty-file", name: "#Empty File", initials: "#E" },
  { id: "gold-maintenance", name: "GOLD MAINTENANCE AND CARPENTRY PTY LTD", initials: "GO" },
  { id: "lc-holdings", name: "L C Holdings Joint Venture", initials: "LC" },
  { id: "pacific-health", name: "Pacific Health Care Pty Ltd", initials: "PH" },
  { id: "ritzers-accountancy", name: "Ritzers Accountancy - 611205413205", initials: "RA" },
  { id: "susan-warrington", name: "Susan Warrington T/A Landscape Design", initials: "SW" },
  { id: "kitchen-installation", name: "*The Kitchen Installation Company Pty Ltd", initials: "*T" },
  { id: "heysham-trust", name: "14 HEYSHAM TRUST", initials: "1H" },
  { id: "foote-st-trust", name: "194 FOOTE ST TRUST", initials: "1F" }
]

export default function MYOBBooks() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [searchTerm, setSearchTerm] = useState("MMC New")
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConnect = (bookName: string) => {
    router.push(`/dashboard/new-migration/connect?source=${source}&destination=myob&myob_connected=true&book=${encodeURIComponent(bookName)}`)
  }

  const filteredBusinesses = BUSINESSES.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F0F0F4] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-3xl bg-white shadow-xl border-0 rounded-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-850">My businesses</h1>
          <div className="opacity-90">
            <MYOBLogo size="sm" />
          </div>
        </div>

        <CardContent className="p-0 space-y-6">
          {/* Search bar */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-10 pr-8 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-sm rounded bg-gray-50/50"
              placeholder="Search"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* List content */}
          <div className="space-y-1.5">
            <div className="border-b border-gray-200/80 pb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center select-none">
                Business name <span className="ml-1 text-[10px] text-gray-400">▲</span>
              </span>
            </div>

            <div className="divide-y divide-gray-100/70 max-h-[400px] overflow-y-auto pr-1">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => (
                  <div 
                    key={business.id} 
                    className="flex items-center gap-3.5 py-3 hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Initials block */}
                    <div className="h-8 w-8 rounded bg-[#802bb1] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm">
                      {business.initials}
                    </div>
                    {/* Business link */}
                    <button
                      onClick={() => {
                        setSelectedBook(business.name)
                        setIsModalOpen(true)
                      }}
                      className="text-left text-[#5C1D80] hover:text-[#45145f] hover:underline text-sm font-semibold transition-colors flex-grow"
                    >
                      {business.name}
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-gray-500">
                  No businesses found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-100 animate-in fade-in duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Connection</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              You are selecting <strong className="text-gray-800 font-semibold">{selectedBook}</strong> to proceed with the migration. Would you like to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  handleConnect(selectedBook)
                }}
                className="px-4 py-2 rounded-lg bg-[#5C1D80] text-white text-sm font-semibold hover:bg-[#45145f] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
