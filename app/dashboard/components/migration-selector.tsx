"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Layers } from "lucide-react"

export function MigrationSelector() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedSource && selectedDestination) {
      router.push(`/dashboard/new-migration/connect?source=${selectedSource}&destination=${selectedDestination}`)
    }
  }

  const sourcePlatforms = [
    {
      id: "xero",
      name: "Xero",
      description: "Cloud accounting software",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/Xero-logo.png" alt="Xero" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
    {
      id: "quickbooks",
      name: "QuickBooks Online",
      description: "Financial management software",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/Qbo-logo.png" alt="QuickBooks" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
    {
      id: "sage",
      name: "Sage 50",
      description: "Business management software",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/Sage-50-logo.png" alt="Sage" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
  ]

  const destinationPlatforms = [
    {
      id: "myob",
      name: "MYOB",
      description: "Cloud accounting platform",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/myob-logo.png" alt="MYOB" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
    {
      id: "freeagent",
      name: "FreeAgent",
      description: "Accounting software",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/FreeAgent_logo.png" alt="FreeAgent" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
    {
      id: "xero",
      name: "Xero",
      description: "Cloud accounting software",
      logo: (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img src="/images/Xero-logo.png" alt="Xero" className="w-10 h-10 object-contain" />
        </div>
      ),
    },
  ]

  return (
    <Card className="w-full bg-background/70 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-md border border-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold">Start a New Migration</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Select your source and destination platforms</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Source Platform</h3>
            <div className="grid gap-3">
              {sourcePlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                    ${
                      selectedSource === platform.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-white/10 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  onClick={() => setSelectedSource(platform.id)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">{platform.logo}</div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`ml-auto rounded-lg ${
                      selectedSource === platform.id
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-background/50 border-white/10"
                    }`}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Destination Platform</h3>
            <div className="grid gap-3">
              {destinationPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                    ${
                      selectedDestination === platform.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-white/10 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  onClick={() => setSelectedDestination(platform.id)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">{platform.logo}</div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`ml-auto rounded-lg ${
                      selectedDestination === platform.id
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-background/50 border-white/10"
                    }`}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedSource || !selectedDestination}
            className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
