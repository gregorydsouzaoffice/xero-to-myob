import { Users, FileText, DollarSign, Building2, Calendar, Receipt, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const payrollStats = [
  { label: "Employees",         value: 7,   icon: Users },
  { label: "Pay Templates",     value: 4,   icon: FileText },
  { label: "Pay Items",         value: 19,  icon: DollarSign },
  { label: "Super Memberships", value: 2,   icon: Building2 },
  { label: "Leave Types",       value: 3,   icon: Calendar },
  { label: "Payslips (YTD)",    value: 164, icon: Receipt },
  { label: "Bank Accounts",     value: 7,   icon: CreditCard },
]

const employees = [
  { name: "Bryce Guignon",  role: "Director",   type: "Full-time", super: "AustralianSuper" },
  { name: "Sarah Mitchell", role: "Accountant",  type: "Full-time", super: "AustralianSuper" },
  { name: "James Tan",      role: "Developer",   type: "Part-time", super: "REST Super"      },
  { name: "Emily Chen",     role: "Manager",     type: "Full-time", super: "AustralianSuper" },
  { name: "Tom Nguyen",     role: "Analyst",     type: "Full-time", super: "Cbus"            },
  { name: "Lisa Park",      role: "Designer",    type: "Casual",    super: "Sunsuper"        },
  { name: "Mark O'Brien",   role: "Sales",       type: "Full-time", super: "REST Super"      },
]

const typeColor: Record<string, string> = {
  "Full-time": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Part-time": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Casual":    "bg-muted text-muted-foreground border-border",
}

export function PayrollSnapshot() {
  return (
    <div className="mt-8 space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Payroll Data</h3>
          <p className="text-xs text-muted-foreground">7 employees detected in Xero</p>
        </div>
        <Badge className="ml-auto border-green-500/20 bg-green-500/10 text-green-600">
          ✓ Ready
        </Badge>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {payrollStats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground leading-none">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee table */}
      <Card className="backdrop-blur-md bg-card/70 border-border/50 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3 pt-4 border-b border-border/30">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Employee Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Role</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Super Fund</th>
                <th className="px-4 py-3 text-right font-medium text-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr
                  key={emp.name}
                  className="border-b border-border/30 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-4 py-3.5 font-medium text-foreground">{emp.name}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{emp.role}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{emp.super}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColor[emp.type]}`}>
                      {emp.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
