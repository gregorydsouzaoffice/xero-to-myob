"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Database, FileText, Map, CheckSquare, Upload } from "lucide-react"

export default function ConnectAccounts() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const destination = searchParams.get("destination") || "myob" // Default to myob
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNextStep = () => {
    router.push(`/dashboard/new-migration/extract?source=${source}&destination=${destination}`)
  }

  const handlePrevStep = () => {
    router.push("/dashboard/new-migration")
  }

  const handleXeroConnect = () => {
    router.push(`/login/xero?destination=${destination}`)
  }

  const handleMYOBConnect = () => {
    router.push(`/login/myob?source=${source}`)
  }

  // Get source software details
  const getSourceDetails = () => {
    const softwareMap = {
      xero: {
        name: "Xero",
        logo: "/images/Xero-logo.png",
        color: "blue",
      },
      quickbooks: {
        name: "QuickBooks Online",
        logo: "/images/Qbo-logo.png",
        color: "green",
      },
      sage: {
        name: "Sage",
        logo: "/images/Sage-50-logo.png",
        color: "emerald",
      },
    }

    return (
      softwareMap[source] || {
        name: "Selected Software",
        logo: "/placeholder.svg?height=60&width=120",
        color: "primary",
      }
    )
  }

  const getDestinationDetails = () => {
    const softwareMap = {
      xero: {
        name: "Xero",
        logo: "/images/Xero-logo.png",
        color: "blue",
      },
      quickbooks: {
        name: "QuickBooks Online",
        logo: "/images/Qbo-logo.png",
        color: "green",
      },
      sage: {
        name: "Sage",
        logo: "/images/Sage-50-logo.png",
        color: "emerald",
      },
      capium: {
        name: "Capium",
        logo: "/images/Capium-logo.png",
        color: "purple",
      },
      freeagent: {
        name: "FreeAgent",
        logo: "/images/FreeAgent_logo.png",
        color: "red",
      },
      "myob": {
        name: "MYOB",
        logo: "/images/myob-logo.png",
        color: "red",
      },
    }

    return (
      softwareMap[destination] || {
        name: "Selected Software",
        logo: "/placeholder.svg?height=60&width=120",
        color: "primary",
      }
    )
  }

  const sourceDetails = getSourceDetails()
  const destinationDetails = getDestinationDetails()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard/new-migration"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Software Selection
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              New Migration: To {destinationDetails.name}
            </h1>
            <p className="text-muted-foreground mt-1">Connect your accounts to begin migration</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              <div>Migration Progress</div>
              <div className="text-primary font-bold">20%</div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-0 opacity-20 blur-sm rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 20 : 0}%` }}
              ></div>

              <div
                className="absolute inset-0 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 20 : 0}%` }}
              ></div>

              {/* Animated shine effect */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"
                style={{ width: `${mounted ? 20 : 0}%` }}
              ></div>

              {/* Segmented markers */}
              <div className="absolute inset-0 flex">
                {[20, 40, 60, 80].map((segment) => (
                  <div key={segment} className="h-full flex-1 border-r border-background/20" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>

          {/* Step navigation with improved visual styling */}
          <div className="relative flex justify-between border-b border-border/40 pb-6">
            <div
              className="absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `0%` }}
            ></div>

            {[
              { icon: <Database className="h-5 w-5" />, label: "Connect" },
              { icon: <FileText className="h-5 w-5" />, label: "Extract" },
              { icon: <Map className="h-5 w-5" />, label: "Map" },
              { icon: <CheckSquare className="h-5 w-5" />, label: "Validate" },
              { icon: <Upload className="h-5 w-5" />, label: "Import" },
            ].map((step, index) => {
              const stepNum = index + 1
              const isActive = stepNum === 1
              const isCompleted = false

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 h-auto ${
                    isActive ? "text-primary font-semibold" : isCompleted ? "text-primary/80" : "text-muted-foreground"
                  } ${stepNum > 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5 hover:text-primary"}`}
                  disabled={stepNum > 1}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 shadow-sm ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-inner"
                        : isCompleted
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : "border-border/60 bg-card"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5 text-primary" /> : step.icon}
                  </div>
                  <span className="text-xs font-medium mt-1">{step.label}</span>
                </Button>
              )
            })}
          </div>

          <Card className="google-card bg-card/65 backdrop-blur-md shadow-sm border border-border/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl font-bold tracking-tight text-foreground">
                <Database className="mr-2.5 h-5 w-5 text-primary" />
                Step 1: Connect Your Accounts
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Securely connect to your source and {destinationDetails.name} accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card/50 rounded-2xl border border-border/40 overflow-hidden relative transition-all duration-300 hover:shadow-md hover:border-border">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-[80px] -z-10"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Source Platform</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-sm">
                          <img
                            alt={`${sourceDetails.name} Logo`}
                            className="h-8 w-auto object-contain"
                            src={sourceDetails.logo || "/placeholder.svg"}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{sourceDetails.name}</div>
                          <div className="text-xs text-muted-foreground">Source Platform</div>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/45 bg-muted/20 backdrop-blur-sm p-3.5">
                      <div className="text-xs text-muted-foreground">Connected as:</div>
                      <div className="font-semibold text-sm text-foreground mt-0.5">{"luke.sorbara@myob.com"}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      onClick={handleXeroConnect}
                      variant="outline"
                      className="w-full rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
                    >
                      {searchParams.get("xero_connected") ? "Reconnect Account" : "Connect Account"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card/50 rounded-2xl border border-border/40 overflow-hidden relative transition-all duration-300 hover:shadow-md hover:border-border">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[80px] -z-10"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Destination Platform</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
                          <img
                            alt={`${destinationDetails.name} Logo`}
                            className="h-8 w-auto object-contain"
                            src={destinationDetails.logo || "/placeholder.svg"}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{destinationDetails.name}</div>
                          <div className="text-xs text-muted-foreground">Destination Platform</div>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/45 bg-muted/20 backdrop-blur-sm p-3.5">
                      <div className="text-xs text-muted-foreground">Connected as:</div>
                      <div className="font-semibold text-sm text-foreground mt-0.5">luke.sorbara@myob.com</div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      onClick={handleMYOBConnect}
                      variant="outline"
                      className="w-full rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
                    >
                      {searchParams.get("myob_connected") ? "Reconnect Account" : "Connect Account"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border/30 pt-6 mt-4">
              <Button
                onClick={handleNextStep}
                className="google-button-primary"
              >
                Continue to Extraction <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .shine-animation {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  )
}
