import { CheckCircle2, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const payrollSummary = [
  { label: "Employees migrated",    value: "7 / 7"  },
  { label: "Pay templates",         value: "4"      },
  { label: "Pay items",             value: "19"     },
  { label: "Super memberships",     value: "2"      },
  { label: "Leave entitlements",    value: "3 types"},
  { label: "YTD records",           value: "164"    },
  { label: "Bank allocations",      value: "7"      },
  { label: "Tax profiles",          value: "7"      },
]

const checkpoints = [
  "7 employees migrated across 9 payroll modules",
  "YTD balances, super memberships and leave entitlements preserved",
  "Bank details and pay templates configured in MYOB",
  "TFN, tax scale and withholding variations transferred",
  "Payroll data integrity validation passed — 0 errors",
]

export function PayrollCompletionSummary() {
  return (
    <Card className="mt-4 border-border/50 bg-card/70 backdrop-blur-md shadow-sm">
      <CardHeader className="pb-3 pt-4 border-b border-border/30 flex flex-row items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold text-foreground">
            Payroll Migration Summary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {payrollSummary.map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-card border border-border/50 p-4 shadow-sm hover:shadow transition-all">
              <p className="text-xl md:text-2xl font-bold text-foreground leading-none">{value}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <ul className="space-y-2 pt-2">
          {checkpoints.map((text) => (
            <li key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
