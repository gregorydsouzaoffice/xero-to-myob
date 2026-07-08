"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Database, FileText, Map, CheckSquare, Upload } from "lucide-react"

export default function ExtractData() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [currentStep, setCurrentStep] = useState(2)
  const [progress, setProgress] = useState(40)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNextStep = () => {
    router.push(`/dashboard/new-migration/map?destination=${destination}`)
  }

  const handlePrevStep = () => {
    router.push(`/dashboard/new-migration/connect?destination=${destination}`)
  }

  const getDestinationDetails = () => {
    const softwareMap = {
      xero: {
        name: "Xero",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Xero_software_logo.svg/1200px-Xero_software_logo.svg.png",
        color: "blue",
      },
      quickbooks: {
        name: "QuickBooks Online",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Intuit_QuickBooks_logo.svg/2560px-Intuit_QuickBooks_logo.svg.png",
        color: "green",
      },
      sage: {
        name: "Sage",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sage_Group_logo.svg/2560px-Sage_Group_logo.svg.png",
        color: "emerald",
      },
      capium: {
        name: "MYOB",
        logo: "/images/myob-logo.png",
        color: "red",
      },
      freeagent: {
        name: "FreeAgent",
        logo: "https://www.freeagent.com/components/shared/svgs/logo-freeagent.svg",
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

  const destinationDetails = getDestinationDetails()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/dashboard/new-migration/connect?destination=${destination}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Connect
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              New Migration: Xero to {destinationDetails.name}
            </h1>
            <p className="text-muted-foreground mt-1">Review the data to be migrated</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              <div>Migration Progress</div>
              <div className="text-primary font-bold">40%</div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-0 opacity-20 blur-sm rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 40 : 0}%` }}
              ></div>
              <div
                className="absolute inset-0 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 40 : 0}%` }}
              ></div>
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"
                style={{ width: `${mounted ? 40 : 0}%` }}
              ></div>
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
              style={{ width: `25%` }}
            ></div>
            {[
              { icon: <Database className="h-5 w-5" />, label: "Connect" },
              { icon: <FileText className="h-5 w-5" />, label: "Extract" },
              { icon: <Map className="h-5 w-5" />, label: "Map" },
              { icon: <CheckSquare className="h-5 w-5" />, label: "Validate" },
              { icon: <Upload className="h-5 w-5" />, label: "Import" },
            ].map((step, index) => {
              const stepNum = index + 1
              const isActive = stepNum === 2
              const isCompleted = stepNum < 2

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 h-auto ${
                    isActive ? "text-primary font-semibold" : isCompleted ? "text-primary/80" : "text-muted-foreground"
                  } ${stepNum > 2 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5 hover:text-primary"}`}
                  disabled={stepNum > 2}
                  onClick={() => {
                    if (stepNum === 1) {
                      handlePrevStep()
                    }
                  }}
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
                <FileText className="mr-2.5 h-5 w-5 text-primary" />
                Step 2: Extract Data from Xero
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Review the data to be migrated from Xero to {destinationDetails.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                <h3 className="mb-4 text-base font-semibold flex items-center text-foreground">
                  <FileText className="mr-2.5 h-5 w-5 text-primary" />
                  Data Preview
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/30">
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Records</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { category: "Chart of Accounts", records: 156, status: "Ready" },
                        { category: "Customers", records: 87, status: "Ready" },
                        { category: "Suppliers", records: 42, status: "Ready" },
                        { category: "Items", records: 65, status: "Ready" },
                        { category: "Invoices", records: 215, status: "Ready" },
                        { category: "Bills", records: 178, status: "Ready" },
                        { category: "Invoice Payments", records: 142, status: "Ready" },
                        { category: "Bill Payments", records: 89, status: "Ready" },
                        { category: "Credit Notes", records: 23, status: "Ready" },
                        { category: "Bill Credits", records: 15, status: "Ready" },
                        { category: "Journals", records: 64, status: "Ready" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">{item.category}</td>
                          <td className="px-4 py-3 text-muted-foreground">{item.records}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-green-600 font-medium">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                              {item.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/30 pt-6 mt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleNextStep}
                className="google-button-primary"
              >
                Continue to Mapping <ArrowRight className="ml-2 h-4 w-4" />
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
