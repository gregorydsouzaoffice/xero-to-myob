"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Database,
  FileCheck,
  FileSpreadsheet,
  RefreshCw,
  User,
  ChevronRight,
  AlertTriangle,
  XCircle,
} from "lucide-react"

// Data categories to migrate
const dataCategories = [
  {
    name: "Chart of Accounts",
    total: 156,
    icon: <Database className="h-5 w-5" />,
    color: "bg-blue-500",
  },
  {
    name: "Customers",
    total: 87,
    icon: <User className="h-5 w-5" />,
    color: "bg-green-500",
  },
  {
    name: "Vendors",
    total: 42,
    icon: <User className="h-5 w-5" />,
    color: "bg-purple-500",
  },
  {
    name: "Items",
    total: 65,
    icon: <FileCheck className="h-5 w-5" />,
    color: "bg-cyan-500",
  },
  {
    name: "Invoices",
    total: 215,
    icon: <FileSpreadsheet className="h-5 w-5" />,
    color: "bg-amber-500",
  },
  {
    name: "Bills",
    total: 178,
    icon: <FileSpreadsheet className="h-5 w-5" />,
    color: "bg-red-500",
  },
  {
    name: "Invoice Payments",
    total: 142,
    icon: <FileCheck className="h-5 w-5" />,
    color: "bg-indigo-500",
  },
  {
    name: "Bill Payments",
    total: 89,
    icon: <FileCheck className="h-5 w-5" />,
    color: "bg-pink-500",
  },
  {
    name: "Credit Notes",
    total: 23,
    icon: <FileSpreadsheet className="h-5 w-5" />,
    color: "bg-orange-500",
  },
  {
    name: "Bill Credits",
    total: 15,
    icon: <FileSpreadsheet className="h-5 w-5" />,
    color: "bg-teal-500",
  },
  {
    name: "Journals",
    total: 62,
    icon: <FileCheck className="h-5 w-5" />,
    color: "bg-violet-500",
  },
]

// Create data elements for animation
const createDataElements = (count) => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      id: i,
      delay: i * 350, // perfectly staggered intervals to prevent crowding
      type: i % 3, // alternate document, database, and user icons
      lane: i % 3, // alternate lanes systematically
    }))
}

export default function ImportProgress() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Preparing import...")
  const [isComplete, setIsComplete] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [categoryProgress, setCategoryProgress] = useState(0)
  const [migratedItems, setMigratedItems] = useState({})
  const [errors, setErrors] = useState([])
  const [warnings, setWarnings] = useState([])
  const [logs, setLogs] = useState([])
  const [dataElements, setDataElements] = useState(createDataElements(15))
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)
  const payrollDone = isComplete

  const addLog = (message, type = "info") => {
    setLogs((prev) => [
      {
        id: Date.now(),
        message,
        type,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 49),
    ])
  }

  // Initial animation when the page loads
  useEffect(() => {
    if (showInitialAnimation) {
      // Add initial logs
      addLog("Starting migration process...", "info")
      addLog("Connecting to Xero API...", "info")
      addLog("Connection established", "success")
      addLog("Connecting to MYOB API...", "info")
      addLog("Connection established", "success")
      addLog("Preparing data for migration...", "info")

      // Hide initial animation after 2 seconds
      const timer = setTimeout(() => {
        setShowInitialAnimation(false)
        addLog("Ready to begin data transfer", "success")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showInitialAnimation])

  useEffect(() => {
    if (showInitialAnimation) return

    let currentCatIdx = 0
    let catProgress = 0
    let localMigratedItems: Record<string, number> = {}
    let localWarnings: { id: number; message: string; category: string }[] = []

    const interval = setInterval(() => {
      const category = dataCategories[currentCatIdx]
      if (!category) {
        clearInterval(interval)
        setIsComplete(true)
        addLog("Migration complete! All data has been transferred.", "success")
        return
      }

      // Increment progress
      catProgress += Math.random() * 6
      if (catProgress >= 100) {
        catProgress = 100

        // Mark category as complete
        localMigratedItems[category.name] = category.total
        setMigratedItems({ ...localMigratedItems })

        addLog(`Completed migrating ${category.name}`, "success")

        // Warnings / errors logic
        if (Math.random() > 0.85 && category.name !== "Chart of Accounts" && localWarnings.length < 3) {
          const warningMessages = [
            `Missing field in ${Math.floor(Math.random() * 5) + 1} ${category.name.toLowerCase()}`,
            `Incomplete data for some ${category.name.toLowerCase()}`,
            `Non-standard format detected in ${category.name.toLowerCase()}`,
            `Field mapping ambiguity in ${category.name.toLowerCase()}`,
          ]
          const randomWarning = warningMessages[Math.floor(Math.random() * warningMessages.length)]
          const newWarning = {
            id: Date.now(),
            message: randomWarning,
            category: category.name,
          }
          localWarnings.push(newWarning)
          setWarnings([...localWarnings])
          addLog(randomWarning, "warning")
        }

        // Move to next category
        currentCatIdx += 1
        catProgress = 0

        setCurrentCategory(currentCatIdx)
        setCategoryProgress(0)

        if (currentCatIdx < dataCategories.length) {
          setDataElements(createDataElements(15))
          addLog(`Starting migration of ${dataCategories[currentCatIdx].name}`)
        }
      } else {
        // Just update progress of current category
        setCategoryProgress(Math.round(catProgress))
      }

      // Calculate total progress
      const totalItems = dataCategories.reduce((acc, cat) => acc + cat.total, 0)
      const completedItemsCount = Object.values(localMigratedItems).reduce((acc, val) => acc + val, 0)
      const itemsInCurrentCategory = Math.min(Math.floor((catProgress * category.total) / 100), category.total)
      const newTotal = completedItemsCount + itemsInCurrentCategory
      setProgress(Math.min(Math.floor((newTotal * 100) / totalItems), 100))

      if (currentCatIdx < dataCategories.length) {
        setStatus(`Migrating ${dataCategories[currentCatIdx].name}...`)
      }

      if (Math.random() > 0.8 && currentCatIdx < dataCategories.length) {
        const actions = ["Processing", "Validating", "Mapping", "Transferring"]
        const randomAction = actions[Math.floor(Math.random() * actions.length)]
        addLog(`${randomAction} ${dataCategories[currentCatIdx].name.toLowerCase()} data...`)
      }
    }, 80) // 80ms for faster, smoother simulation

    return () => clearInterval(interval)
  }, [showInitialAnimation])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">MMC Convert Migration in Progress</h1>
            <p className="text-muted-foreground mt-1">Xero to MYOB data migration</p>
          </div>

          {showInitialAnimation ? (
            <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden relative">
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-32 w-32 animate-ping rounded-full bg-primary/20"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 animate-ping rounded-full bg-primary/40 animation-delay-200"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 animate-pulse rounded-full bg-primary"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Initializing Migration</h2>
                    <p className="text-muted-foreground">Connecting to APIs and preparing data...</p>
                  </div>
                  <Progress value={30} className="w-64 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden relative">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tight text-foreground">{isComplete ? "Migration Complete" : "Importing Data"}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      {isComplete
                        ? "Your data has been successfully migrated"
                        : "Please wait while your data is being imported"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {payrollDone ? (
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-10">
                          <div className="mb-6 rounded-full bg-green-100 p-4 text-green-600">
                            <CheckCircle className="h-16 w-16" />
                          </div>
                          <h3 className="text-2xl font-medium">Migration Successful</h3>
                          <p className="text-muted-foreground mt-1">
                            All your data has been successfully migrated to MYOB
                          </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <Card className="border border-border/40 bg-card shadow-sm">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-foreground">
                                  {dataCategories.reduce((acc, cat) => acc + cat.total, 0)}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Total Records</div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="border border-border/40 bg-card shadow-sm">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                  {dataCategories.reduce((acc, cat) => acc + cat.total, 0) - errors.length}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Records Migrated</div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="border border-border/40 bg-card shadow-sm">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-amber-600">{warnings.length}</div>
                                <div className="text-xs text-muted-foreground mt-1">Warnings</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="font-medium text-foreground">{status}</div>
                            <div className="font-bold text-primary">{Math.round(progress)}%</div>
                          </div>
                          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                            {/* Glow effect behind the progress bar */}
                            <div
                              className="absolute inset-0 opacity-20 blur-sm rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>


                            {/* Main progress bar with gradient */}
                            <div
                              className="absolute inset-0 rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>

                            {/* Animated shine effect */}
                            <div
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent import-shine-animation"
                              style={{ width: `${progress}%` }}
                            ></div>

                            {/* Data particles */}
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute top-0 h-full w-1 bg-primary/80 rounded-full import-data-particle-animation"
                                style={{
                                  left: `${Math.min(progress - 5, 95)}%`,
                                  animationDelay: `${i * 0.3}s`,
                                }}
                              ></div>
                            ))}

                            {/* Segmented markers */}
                            <div className="absolute inset-0 flex">
                              {[20, 40, 60, 80].map((segment) => (
                                <div
                                  key={segment}
                                  className="h-full flex-1 border-r border-background/20"
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="relative border border-border/40 rounded-2xl p-6 h-64 overflow-hidden bg-muted/20 backdrop-blur-sm shadow-inner flex items-center justify-between gap-4">
                          {/* Left node: Xero */}
                          <div className="flex flex-col items-center z-10 shrink-0">
                            <div className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Source</div>
                            <div className="relative group">
                              <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-sm group-hover:bg-blue-500/30 transition-all duration-300 animate-pulse"></div>
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-blue-500/20 bg-card flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                                <img alt="Xero Logo" className="h-12 sm:h-14 w-auto max-w-full object-contain px-2" src="/images/Xero-logo.png" />
                              </div>
                            </div>
                          </div>

                          {/* Center Channel: Data Pipeline */}
                          <div className="relative flex-1 h-32 flex flex-col justify-between mx-2 sm:mx-6">
                            {/* The glowing tracks */}
                            <div className="absolute inset-0 flex flex-col justify-between py-1">
                              {/* Lane 1 */}
                              <div className="relative w-full h-[1px] bg-gradient-to-r from-blue-500/10 via-primary/30 to-green-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-green-500 opacity-20 blur-[1px]"></div>
                              </div>
                              {/* Lane 2 */}
                              <div className="relative w-full h-[1px] bg-gradient-to-r from-blue-500/10 via-primary/30 to-green-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-green-500 opacity-20 blur-[1px]"></div>
                              </div>
                              {/* Lane 3 */}
                              <div className="relative w-full h-[1px] bg-gradient-to-r from-blue-500/10 via-primary/30 to-green-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-green-500 opacity-20 blur-[1px]"></div>
                              </div>
                            </div>

                            {/* Flying Data Packets */}
                            {dataElements.map((element) => {
                              const yPos = element.lane === 0 ? "0%" : element.lane === 1 ? "50%" : "100%"
                              const colorClass =
                                currentCategory < dataCategories.length
                                  ? dataCategories[currentCategory].color.replace("bg-", "text-")
                                  : "text-primary"
                              const bgClass =
                                currentCategory < dataCategories.length
                                  ? dataCategories[currentCategory].color
                                  : "bg-primary"

                              return (
                                <div
                                  key={element.id}
                                  className="absolute data-pipeline-packet"
                                  style={{
                                    top: `calc(${yPos} - 10px)`, // offset half packet height
                                    animationDelay: `${element.delay}ms`,
                                  }}
                                >
                                  <div className="relative flex items-center justify-center animate-bounce-slow">
                                    <div className={`absolute -inset-1 rounded-full ${bgClass} opacity-30 blur-[2px]`}></div>
                                    {element.type === 0 ? (
                                      <FileSpreadsheet className={`h-5 w-5 ${colorClass} relative z-10`} />
                                    ) : element.type === 1 ? (
                                      <Database className={`h-4.5 w-4.5 ${colorClass} relative z-10`} />
                                    ) : (
                                      <User className={`h-4.5 w-4.5 ${colorClass} relative z-10`} />
                                    )}
                                  </div>
                                </div>
                              )
                            })}

                            {/* Center Category Badge (positioned at top to avoid overlapping lanes) */}
                            {currentCategory < dataCategories.length && (
                              <div className="absolute z-20 left-1/2 -top-10 transform -translate-x-1/2 bg-background/95 backdrop-blur-md px-3.5 py-1.5 border border-primary/20 rounded-full text-[10px] sm:text-xs font-semibold shadow-md text-foreground flex items-center gap-1.5 animate-pulse-scale whitespace-nowrap">
                                <div className={`w-2 h-2 rounded-full ${dataCategories[currentCategory].color}`}></div>
                                <span>{dataCategories[currentCategory].name}</span>
                              </div>
                            )}
                          </div>

                          {/* Right node: MYOB */}
                          <div className="flex flex-col items-center z-10 shrink-0">
                            <div className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Destination</div>
                            <div className="relative group">
                              <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-sm group-hover:bg-primary/30 transition-all duration-300 animate-pulse"></div>
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-primary/20 bg-card flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                                <img alt="MYOB Logo" className="h-12 sm:h-14 w-auto max-w-full object-contain px-2" src="/images/myob-logo.png" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm">
                          <h3 className="mb-4 text-base font-semibold text-foreground">Migration Progress</h3>
                          <div className="space-y-4">
                            {dataCategories.map((category, index) => {
                              let status = "pending"
                              let completedCount = 0

                              if (index < currentCategory) {
                                status = "complete"
                                completedCount = category.total
                              } else if (index === currentCategory) {
                                status = "in-progress"
                                completedCount = Math.floor((categoryProgress * category.total) / 100)
                              }

                              return (
                                <div key={category.name} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-1.5 rounded-full ${category.color} text-white`}>
                                        {category.icon}
                                      </div>
                                      <span className="text-sm font-medium">{category.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-muted-foreground">
                                        {completedCount}/{category.total}
                                      </span>
                                      {status === "complete" ? (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      ) : status === "in-progress" ? (
                                        <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                                      ) : (
                                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20"></div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                      className="absolute inset-0 rounded-full bg-primary transition-all duration-300"
                                      style={{
                                        width:
                                          index < currentCategory
                                            ? "100%"
                                            : index === currentCategory
                                              ? `${categoryProgress}%`
                                              : "0%",
                                      }}
                                    ></div>
                                    {index === currentCategory && (
                                      <div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent import-shine-animation"
                                        style={{ width: `${categoryProgress}%` }}
                                      ></div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border/30 pt-6 mt-4">
                    {payrollDone ? (
                      <>
                        <Button variant="outline" className="rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200" asChild>
                          <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                          </Link>
                        </Button>
                        <Button className="google-button-primary" asChild>
                          <Link href="/dashboard/new-migration/report">
                            View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="ml-auto rounded-xl border-border text-muted-foreground bg-transparent" disabled>
                        Cancel
                      </Button>
                    )}
                  </CardFooter>

                </Card>
              </div>

              <div className="space-y-6">
                <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden relative">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-foreground">Migration Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl border border-border/50 bg-muted/40 p-3.5 shadow-inner">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <RefreshCw className={`h-4 w-4 text-primary ${payrollDone ? "" : "animate-spin"}`} />
                        <div>{payrollDone ? "Migration Complete" : "Migration in Progress"}</div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {payrollDone
                          ? "Your data has been successfully migrated to MYOB"
                          : "Please wait while your data is being migrated"}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 shadow-sm">
                        <div className="text-2xl font-bold text-foreground">
                          {Object.values(migratedItems).reduce((acc, val) => acc + val, 0)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">Successfully Migrated</div>
                      </div>
                      <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 shadow-sm">
                        <div className="text-2xl font-bold text-primary">{payrollDone ? "100%" : isComplete ? "90%" : `${Math.round(progress * 0.9)}%`}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Complete</div>
                      </div>
                      <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 shadow-sm">
                        <div className="text-2xl font-bold text-amber-600">{warnings.length}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Warnings</div>
                      </div>
                      <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 shadow-sm">
                        <div className="text-2xl font-bold text-destructive">{errors.length}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Errors</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground">Live Migration Log</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[360px] overflow-auto border border-border/30 rounded-xl bg-black/5 mx-6 mb-6">
                      <div className="space-y-0 p-1">
                        {logs.map((log) => (
                          <div
                            key={log.id}
                            className={`border-l-4 animate-fadeIn px-3 py-2.5 text-xs border-b border-border/10 last:border-b-0 ${
                              log.type === "error"
                                ? "border-destructive bg-destructive/10 text-destructive"
                                : log.type === "warning"
                                  ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-500"
                                  : log.type === "success"
                                    ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-500"
                                    : "border-primary bg-primary/10 text-primary"
                            }`}
                          >
                            <div className="flex gap-2">
                              <span className="font-mono opacity-70">{log.time}</span>
                              <span className="flex-1 font-medium">
                                {log.type === "error" ? (
                                  <XCircle className="inline-block mr-1 h-3.5 w-3.5 align-text-bottom" />
                                ) : log.type === "warning" ? (
                                  <AlertTriangle className="inline-block mr-1 h-3.5 w-3.5 align-text-bottom" />
                                ) : log.type === "success" ? (
                                  <CheckCircle className="inline-block mr-1 h-3.5 w-3.5 align-text-bottom" />
                                ) : (
                                  <ChevronRight className="inline-block mr-1 h-3.5 w-3.5 align-text-bottom" />
                                )}
                                {log.message}
                              </span>
                            </div>
                          </div>
                        ))}
                        {logs.length === 0 && (
                          <div className="p-4 text-center text-sm text-muted-foreground">No logs yet...</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {warnings.length > 0 && (
                  <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-amber-600">Warnings</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[200px] overflow-auto">
                      <div className="space-y-2">
                        {warnings.map((warning) => (
                          <div
                            key={warning.id}
                            className="rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-500 shadow-sm"
                          >
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 mt-0.5" />
                              <div>
                                <div className="font-semibold text-sm">{warning.category}</div>
                                <div className="text-xs opacity-90 mt-0.5">{warning.message}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {errors.length > 0 && (
                  <Card className="google-card bg-card/65 border border-border/50 backdrop-blur-md shadow-sm overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-destructive">Errors</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[200px] overflow-auto">
                      <div className="space-y-2">
                        {errors.map((error) => (
                          <div
                            key={error.id}
                            className="rounded-xl border-l-4 border-destructive bg-destructive/10 p-3 text-xs text-destructive shadow-sm"
                          >
                            <div className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 mt-0.5" />
                              <div>
                                <div className="font-semibold text-sm">{error.category}</div>
                                <div className="text-xs opacity-90 mt-0.5">{error.message}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes pipelineFlow {
          0% {
            left: 0%;
            opacity: 0;
            transform: scale(0.6);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            left: 100%;
            opacity: 0;
            transform: scale(0.6);
          }
        }
        
        .data-pipeline-packet {
          position: absolute;
          animation: pipelineFlow 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }

        @keyframes importShine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .import-shine-animation {
          animation: importShine 1.5s infinite;
        }

        @keyframes importDataParticle {
          0% {
            opacity: 0;
            transform: translateX(0) scaleY(0.5);
          }
          50% {
            opacity: 1;
            transform: translateX(100px) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: translateX(200px) scaleY(0.5);
          }
        }

        .import-data-particle-animation {
          animation: importDataParticle 1.2s infinite;
        }
      `}</style>
    </div>
  )
}
