"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Database,
  FileText,
  Map,
  CheckSquare,
  Upload,
  AlertTriangle,
  XCircle,
  Shield,
} from "lucide-react"

export default function ValidateData() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [currentStep, setCurrentStep] = useState(4)
  const [progress, setProgress] = useState(80)
  const [mounted, setMounted] = useState(false)
  const [validationComplete, setValidationComplete] = useState(false)
  const [validationProgress, setValidationProgress] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Simulate validation progress
    const interval = setInterval(() => {
      setValidationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setValidationComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const handleNextStep = () => {
    router.push(`/dashboard/new-migration/import?destination=${destination}`)
  }

  const handlePrevStep = () => {
    router.push(`/dashboard/new-migration/map?destination=${destination}`)
  }

  // Get destination software details
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
      "myob": {
        name: "MYOB",
        logo: "/images/myob-logo.png",
        color: "red",
      },
      freeagent: {
        name: "FreeAgent",
        logo: "https://www.freeagent.com/components/shared/svgs/logo-freeagent.svg",
        color: "red",
      },
      // Add other software details as needed
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

  // Validation results
  const validationResults = [
    {
      category: "Chart of Accounts",
      total: 156,
      valid: 156,
      warnings: 0,
      errors: 0,
      status: "success",
    },
    {
      category: "Customers",
      total: 87,
      valid: 85,
      warnings: 2,
      errors: 0,
      status: "warning",
    },
    {
      category: "Suppliers",
      total: 42,
      valid: 42,
      warnings: 0,
      errors: 0,
      status: "success",
    },
    {
      category: "Items",
      total: 65,
      valid: 64,
      warnings: 1,
      errors: 0,
      status: "warning",
    },
    {
      category: "Invoices",
      total: 215,
      valid: 215,
      warnings: 0,
      errors: 0,
      status: "success",
    },
    {
      category: "Bills",
      total: 178,
      valid: 178,
      warnings: 0,
      errors: 0,
      status: "success",
    },
    {
      category: "Payments",
      total: 93,
      valid: 93,
      warnings: 0,
      errors: 0,
      status: "success",
    },
    {
      category: "Journals",
      total: 64,
      valid: 64,
      warnings: 0,
      errors: 0,
      status: "success",
    },
  ]

  // Validation warnings
  const validationWarnings = [
    {
      id: 1,
      category: "Customers",
      message: "Missing phone number for customer 'ABC Corporation'. A placeholder has been used.",
      severity: "warning",
    },
    {
      id: 2,
      category: "Customers",
      message: "Incomplete address for customer 'XYZ Ltd'. Only partial address was imported.",
      severity: "warning",
    },
    {
      id: 3,
      category: "Items",
      message: "Item code mapping was ambiguous. Default code was applied for 'European Sales'.",
      severity: "warning",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/dashboard/new-migration/map?destination=${destination}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Map
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              New Migration: Xero to {destinationDetails.name}
            </h1>
            <p className="text-muted-foreground mt-1">Validate data before migration</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              <div>Migration Progress</div>
              <div className="text-primary font-bold">80%</div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-0 opacity-20 blur-sm rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 80 : 0}%` }}
              ></div>

              <div
                className="absolute inset-0 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 80 : 0}%` }}
              ></div>

              {/* Animated shine effect */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"
                style={{ width: `${mounted ? 80 : 0}%` }}
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
              style={{ width: `75%` }}
            ></div>

            {[
              { icon: <Database className="h-5 w-5" />, label: "Connect" },
              { icon: <FileText className="h-5 w-5" />, label: "Extract" },
              { icon: <Map className="h-5 w-5" />, label: "Map" },
              { icon: <CheckSquare className="h-5 w-5" />, label: "Validate" },
              { icon: <Upload className="h-5 w-5" />, label: "Import" },
            ].map((step, index) => {
              const stepNum = index + 1
              const isActive = stepNum === 4
              const isCompleted = stepNum < 4

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 h-auto ${
                    isActive ? "text-primary font-semibold" : isCompleted ? "text-primary/80" : "text-muted-foreground"
                  } ${stepNum > 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5 hover:text-primary"}`}
                  disabled={stepNum > 4}
                  onClick={() => {
                    if (stepNum === 1) {
                      router.push(`/dashboard/new-migration/connect?destination=${destination}`)
                    } else if (stepNum === 2) {
                      router.push(`/dashboard/new-migration/extract?destination=${destination}`)
                    } else if (stepNum === 3) {
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
                <CheckSquare className="mr-2.5 h-5 w-5 text-primary" />
                Step 4: Validate Data
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">Validate data before migration to {destinationDetails.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {!validationComplete ? (
                <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                  <h3 className="mb-4 text-base font-semibold flex items-center text-foreground">
                    <Shield className="mr-2.5 h-5 w-5 text-primary" />
                    Validating Data
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                      </div>
                      <div className="text-lg font-medium">Validating your data...</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        This may take a few moments. We're checking for any potential issues.
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <div>Validation Progress</div>
                        <div className="text-primary font-semibold">{validationProgress}%</div>
                      </div>
                      <Progress value={validationProgress} className="h-2" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-4 text-base font-semibold flex items-center text-foreground">
                      <Shield className="mr-2.5 h-5 w-5 text-primary" />
                      Validation Results
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Category</div>
                        <div>Records</div>
                        <div>Valid</div>
                        <div className="text-right">Status</div>
                      </div>

                      {validationResults.map((result, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0 hover:bg-muted/5 transition-colors"
                        >
                          <div className="col-span-2 font-medium text-foreground">{result.category}</div>
                          <div className="text-muted-foreground">{result.total}</div>
                          <div className="text-foreground">
                            {result.valid}{" "}
                            {result.warnings > 0 && (
                              <span className="text-amber-600 text-xs font-medium">({result.warnings} warnings)</span>
                            )}
                          </div>
                          <div className="text-right">
                            {result.status === "success" ? (
                              <div className="flex items-center justify-end text-green-600 font-medium text-xs">
                                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                Valid
                              </div>
                            ) : result.status === "warning" ? (
                              <div className="flex items-center justify-end text-amber-600 font-medium text-xs">
                                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                                Warnings
                              </div>
                            ) : (
                              <div className="flex items-center justify-end text-red-600 font-medium text-xs">
                                <XCircle className="h-4 w-4 mr-1 text-red-500" />
                                Errors
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {validationWarnings.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-6">
                      <h3 className="mb-4 text-base font-semibold flex items-center text-amber-800 dark:text-amber-500">
                        <AlertTriangle className="mr-2.5 h-5 w-5 text-amber-600" />
                        Warnings
                      </h3>
                      <div className="space-y-4">
                        {validationWarnings.map((warning) => (
                          <div
                            key={warning.id}
                            className="flex items-start gap-3 border-b border-amber-500/10 pb-3 last:border-0 last:pb-0"
                          >
                            <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-amber-800 dark:text-amber-500 text-sm">{warning.category}</div>
                              <div className="text-xs text-amber-800/80 dark:text-amber-500/80 mt-0.5 leading-relaxed">{warning.message}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-xs text-amber-800/70 dark:text-amber-500/70 font-medium">
                        * These warnings won't prevent migration, but you may want to review them.
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-md p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-green-800 dark:text-green-500">Ready for Migration</h3>
                        <p className="text-sm text-green-800/80 dark:text-green-500/80 mt-1 leading-relaxed">
                          Your data has been validated and is ready to be migrated to {destinationDetails.name}.
                        </p>
                        <p className="text-xs text-green-800/70 dark:text-green-500/70 mt-2 font-medium">
                          Total records: {validationResults.reduce((acc, result) => acc + result.total, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
                disabled={!validationComplete}
                className="google-button-primary disabled:opacity-50"
              >
                Continue to Import <ArrowRight className="ml-2 h-4 w-4" />
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
