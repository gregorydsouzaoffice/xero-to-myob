"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Loader2, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const PAYROLL_MODULES = [
  "Employee Basic Details",
  "Employment Details",
  "Superannuation Details",
  "Tax Details",
  "Leave Balance",
  "Bank Details",
  "YTD Balance",
  "Pay Templates",
  "Pay Items",
]

interface Props {
  accountingComplete: boolean
  onComplete?: () => void
}

export function PayrollMigrationPhase({ accountingComplete, onComplete }: Props) {
  const [progress, setProgress] = useState(0)          // 0-100
  const [currentModuleIdx, setCurrentModuleIdx] = useState(-1)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!accountingComplete) return   // wait for accounting to finish first

    let p = 0
    const interval = setInterval(() => {
      p += 1 + Math.random() * 2
      if (p >= 100) {
        p = 100
        setDone(true)
        clearInterval(interval)
        onComplete?.()
      }
      setProgress(Math.round(p))
      setCurrentModuleIdx(Math.floor((p / 100) * PAYROLL_MODULES.length))
    }, 80)

    return () => clearInterval(interval)
  }, [accountingComplete, onComplete])

  return (
    <div className="mt-4 rounded-xl border border-border/50 bg-card/70 backdrop-blur-md p-5 shadow-sm">
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Payroll Data</span>
          <span className="text-xs text-muted-foreground">7 employees</span>
        </div>
        {done ? (
          <Badge className="border-green-500/20 bg-green-500/10 text-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Complete
          </Badge>
        ) : !accountingComplete ? (
          <Badge className="border-border bg-muted/50 text-muted-foreground">Pending</Badge>
        ) : (
          <Badge className="border-primary/20 bg-primary/10 text-primary">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Migrating
          </Badge>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status text */}
      <p className="mb-4 text-xs text-muted-foreground">
        {!accountingComplete
          ? "Waiting for accounting migration to complete…"
          : done
          ? `All ${PAYROLL_MODULES.length} payroll modules migrated successfully`
          : `${progress}% — Processing: ${PAYROLL_MODULES[Math.min(currentModuleIdx, PAYROLL_MODULES.length - 1)] ?? "…"}`}
      </p>

      {/* Module pill grid */}
      {accountingComplete && (
        <div className="flex flex-wrap gap-1.5">
          {PAYROLL_MODULES.map((mod, i) => {
            const finished = i < currentModuleIdx
            const active   = i === currentModuleIdx && !done
            return (
              <span
                key={mod}
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300 ${
                  finished || done
                    ? "border-green-500/20 bg-green-500/10 text-green-600"
                    : active
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground"
                }`}
              >
                {(finished || done) && "✓ "}{mod}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
