"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers } from "lucide-react"

export default function NewMigrationPage() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState<string | null>("xero") // Pre-select Xero as source
  const [selectedDestination, setSelectedDestination] = useState<string | null>("myob") // Pre-select MYOB as destination

  const handleConnectSource = (platformId: string) => {
    if (platformId === "xero") {
      // Mock Xero login - in real app this would redirect to Xero OAuth
      router.push(
        `/dashboard/new-migration/connect?source=${platformId}&destination=${selectedDestination}&step=xero-login`,
      )
    }
  }

  const handleConnectDestination = (platformId: string) => {
    if (platformId === "myob") {
      // Mock MYOB login - in real app this would redirect to MYOB OAuth
      router.push(
        `/dashboard/new-migration/connect?source=${selectedSource}&destination=${platformId}&step=myob-login`,
      )
    }
  }

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
  ]

  return (
    <div className="container py-6 max-w-6xl mx-auto">
      <div className="w-full bg-background/70 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden p-6">
        <div className="pb-4 mb-6 border-b border-border/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-md border border-primary/20">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Start a New Migration</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Migrate from Xero to MYOB</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground/80">Source Platform</h3>
            <div className="grid gap-3">
              {sourcePlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                    ${
                      selectedSource === platform.id
                        ? "border-primary/50 bg-primary/5 shadow-sm"
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
                    variant={selectedSource === platform.id ? "default" : "outline"}
                    size="sm"
                    className={`ml-auto rounded-lg ${
                      selectedSource === platform.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/50 border-white/10"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleConnectSource(platform.id)
                    }}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground/80">Destination Platform</h3>
            <div className="grid gap-3">
              {destinationPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                    ${
                      selectedDestination === platform.id
                        ? "border-primary/50 bg-primary/5 shadow-sm"
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
                    variant={selectedDestination === platform.id ? "default" : "outline"}
                    size="sm"
                    className={`ml-auto rounded-lg ${
                      selectedDestination === platform.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/50 border-white/10"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleConnectDestination(platform.id)
                    }}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-4 flex justify-end border-t border-border/40">
          <Button
            onClick={handleContinue}
            disabled={!selectedSource || !selectedDestination}
            className="premium-button rounded-lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
