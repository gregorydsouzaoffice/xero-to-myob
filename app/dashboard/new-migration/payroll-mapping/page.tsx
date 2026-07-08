"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, ArrowLeft, Database, FileText, Map, CheckSquare, Upload, User, Briefcase, Landmark, ClipboardList, Palmtree, CreditCard, TrendingUp, Notebook, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ─── All 9 payroll modules — direct-map fields only ──────────────────────────
const PAYROLL_MODULES = [
  {
    id: "employee",
    label: "Employee Basic Details",
    icon: "User",
    fields: [
      { xero: "First name",           myob: "First name" },
      { xero: "Last name",            myob: "Last name" },
      { xero: "Date of birth",        myob: "Date of birth" },
      { xero: "Job title",            myob: "Job title" },
      { xero: "Gender",               myob: "Gender" },
      { xero: "Address (line 1)",     myob: "Street address" },
      { xero: "Address line 2",       myob: "Street address 2" },
      { xero: "Suburb",               myob: "Suburb" },
      { xero: "State",                myob: "State" },
      { xero: "Postcode",             myob: "Postcode" },
      { xero: "Mobile number",        myob: "Contact number" },
      { xero: "Phone number",         myob: "Mobile number" },
      { xero: "Email",                myob: "Email address" },
    ],
  },
  {
    id: "employment",
    label: "Employment Details",
    icon: "Briefcase",
    fields: [
      { xero: "Employment type",         myob: "Employment type" },
      { xero: "Income type",             myob: "Income type" },
      { xero: "Employment basis",        myob: "Employment type" },
      { xero: "Start date",              myob: "Start date" },
      { xero: "Classification",          myob: "Agreement classification" },
      { xero: "Pay frequency",           myob: "Pay schedule / Pay frequency" },
      { xero: "Employee group",          myob: "Classifications" },
      { xero: "Ordinary earnings rate",  myob: "Pay items (Ordinary)" },
    ],
  },
  {
    id: "super",
    label: "Superannuation Details",
    icon: "Landmark",
    fields: [
      { xero: "Super fund name",            myob: "Super fund" },
      { xero: "Member number",              myob: "Member number" },
      { xero: "Contribution type (SGC)",    myob: "Super guarantee" },
      { xero: "Multiple memberships",       myob: "Add super details" },
    ],
  },
  {
    id: "tax",
    label: "Tax Details",
    icon: "ClipboardList",
    fields: [
      { xero: "Tax File Number (TFN)",                  myob: "TFN" },
      { xero: "TFN exemption",                          myob: "Employee has provided TFN (Yes/No)" },
      { xero: "Residency status",                       myob: "Residency" },
      { xero: "Tax scale type",                         myob: "Tax scale" },
      { xero: "Claim tax-free threshold",               myob: "Tax scale (Scale 2)" },
      { xero: "Payee has study/training loans",         myob: "Employee has student debt" },
      { xero: "Other tax offset claimed",               myob: "Employee claimed other tax offset" },
      { xero: "Has approved withholding variation",     myob: "Withholding variations" },
      { xero: "Increase amount of tax withheld",        myob: "Employee requested upward variation" },
      { xero: "Income type",                            myob: "Income type" },
    ],
  },
  {
    id: "leave",
    label: "Leave Balance",
    icon: "Palmtree",
    fields: [
      { xero: "Annual Leave (hours)",           myob: "Annual leave — annual entitlement (hours)" },
      { xero: "Personal/Carer's Leave (hours)", myob: "Add other leave entitlement" },
      { xero: "Opening Balance",                myob: "Current leave balances" },
      { xero: "Leave calculation method",       myob: "Accrual period" },
      { xero: "Hours accrued annually (FT)",    myob: "Annual entitlement (hours)" },
      { xero: "Hours FT works per week",        myob: "Accrual rate per time worked" },
      { xero: "On termination (paid out)",      myob: "Pay on termination" },
    ],
  },
  {
    id: "bank",
    label: "Bank Details",
    icon: "CreditCard",
    fields: [
      { xero: "Account name",                myob: "Account name" },
      { xero: "BSB number",                  myob: "BSB" },
      { xero: "Account number",              myob: "Account number" },
      { xero: "Statement text (reference)",  myob: "Reference" },
      { xero: "Multiple bank accounts",      myob: "Multiple allocations" },
    ],
  },
  {
    id: "ytd",
    label: "YTD Balance",
    icon: "TrendingUp",
    fields: [
      { xero: "Ordinary Hours YTD (earnings)", myob: "Earnings & leave → Ordinary" },
      { xero: "PAYG (tax withheld YTD)",        myob: "PAYG tax → Tax withheld" },
      { xero: "Upwards variation YTD",          myob: "PAYG tax → Tax withheld (variation)" },
      { xero: "Superannuation YTD",             myob: "Superannuation → Super guarantee" },
      { xero: "Financial year selector",        myob: "FY selector (e.g. FY2025-26)" },
    ],
  },
  {
    id: "paytemplate",
    label: "Pay Templates",
    icon: "Notebook",
    fields: [
      { xero: "Earnings rate (Ordinary Hours)", myob: "Earnings → Pay item (Ordinary)" },
      { xero: "Hours",                          myob: "Quantity" },
      { xero: "Rate",                           myob: "Rate" },
      { xero: "Total",                          myob: "Amount" },
      { xero: "Deduction type (FBT)",           myob: "Deductions → Add deduction items" },
      { xero: "Superannuation fund",            myob: "Company contributions (super)" },
    ],
  },
  {
    id: "payitems",
    label: "Pay Items",
    icon: "Coins",
    fields: [
      { xero: "Earnings name",                      myob: "Pay item name" },
      { xero: "Earnings category",                  myob: "Type" },
      { xero: "Rate (Fixed Amount / Rate per Unit)", myob: "Pay basis (Fixed Amount / Hourly)" },
      { xero: "Account",                            myob: "Account" },
      { xero: "Reportable as W1",                   myob: "Tax applicable" },
      { xero: "Allowances exempt from tax/super",   myob: "Allowances tab" },
      { xero: "Directors Fees",                     myob: "Directors Fees" },
      { xero: "ETP Leave Earning",                  myob: "ETP Leave Earning (Termination)" },
      { xero: "iCare/QBE weekly payments",          myob: "iCare/QBE weekly payments" },
      { xero: "Lump Sum A/B Adjustment",            myob: "Lump Sum A/B Adjustment" },
      { xero: "Ordinary Hours",                     myob: "Ordinary (Ordinary earnings)" },
      { xero: "Overtime Hours (exempt from super)",  myob: "Overtime Hours (exempt from super)" },
      { xero: "Redundancy",                         myob: "Redundancy / Redundancy pay" },
    ],
  },
]

const totalFields = PAYROLL_MODULES.reduce((sum, m) => sum + m.fields.length, 0)

export default function PayrollMappingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [expanded, setExpanded] = useState<string | null>("employee") // first open by default
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id)

  const handleNextStep = () => {
    router.push(`/dashboard/new-migration/validate?destination=${destination}`)
  }

  const handlePrevStep = () => {
    router.push(`/dashboard/new-migration/map?destination=${destination}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container py-8">
        <div className="mb-8">
          <Link
            href={`/dashboard/new-migration/map?destination=${destination}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-7 w-7 rounded-full bg-background/70 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Accounting Mapping
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight gradient-text">
              New Migration: Xero to MYOB
            </h1>
            <p className="text-muted-foreground">Map payroll data fields between Xero and MYOB</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <div>Progress</div>
              <div className="font-medium">60%</div>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-black/20 backdrop-blur-md">
              <div
                className="absolute inset-0 opacity-30 blur-md rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>

              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>

              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent shine-animation"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>

              <div className="absolute inset-0 flex">
                {[20, 40, 60, 80].map((segment) => (
                  <div key={segment} className="h-full flex-1 border-r border-white/20" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>

          {/* Step navigation */}
          <div className="relative flex justify-between border-b border-white/10 pb-6">
            <div
              className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transition-all duration-500"
              style={{ width: `50%` }}
            ></div>

            {[
              { icon: <Database className="h-5 w-5" />, label: "Connect" },
              { icon: <FileText className="h-5 w-5" />, label: "Extract" },
              { icon: <Map className="h-5 w-5" />, label: "Map" },
              { icon: <CheckSquare className="h-5 w-5" />, label: "Validate" },
              { icon: <Upload className="h-5 w-5" />, label: "Import" },
            ].map((step, index) => {
              const stepNum = index + 1
              const isActive = stepNum === 3
              const isCompleted = stepNum < 3

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 ${
                    isActive ? "text-primary" : isCompleted ? "text-primary/80" : "text-muted-foreground"
                  } ${stepNum > 3 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5"}`}
                  disabled={stepNum > 3}
                  onClick={() => {
                    if (stepNum === 1) {
                      router.push(`/dashboard/new-migration/connect?destination=${destination}`)
                    } else if (stepNum === 2) {
                      router.push(`/dashboard/new-migration/extract?destination=${destination}`)
                    }
                  }}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : isCompleted
                          ? "border-primary/50 bg-primary/5"
                          : "border-white/10 bg-background/50"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-5 w-5 text-primary" /> : step.icon}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                </Button>
              )
            })}
          </div>

          <Card className="google-card bg-card/65 backdrop-blur-md shadow-sm border border-border/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl font-bold tracking-tight text-foreground">
                <Map className="mr-2.5 h-5 w-5 text-primary" />
                Step 3b: Map Payroll Fields
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Review how payroll data from Xero maps to MYOB — 7 employees across 9 modules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {/* Column headers */}
              <div className="mb-3 grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                <div className="col-span-2">Xero Field</div>
                <div className="col-span-2">MYOB Field</div>
                <div className="text-right">Status</div>
              </div>

              {/* Module accordions */}
              <div className="space-y-3">
                {PAYROLL_MODULES.map((mod) => {
                  const isOpen = expanded === mod.id
                  const IconComponent = {
                    User,
                    Briefcase,
                    Landmark,
                    ClipboardList,
                    Palmtree,
                    CreditCard,
                    TrendingUp,
                    Notebook,
                    Coins,
                  }[mod.icon] || User

                  return (
                    <Card
                      key={mod.id}
                      className="overflow-hidden border border-border/40 bg-card/45 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
                    >
                      {/* Accordion header */}
                      <button
                        onClick={() => toggle(mod.id)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <span className="text-sm font-semibold text-foreground">{mod.label}</span>
                          <Badge className="border-green-500/20 bg-green-500/10 text-green-600 text-[10px] font-medium rounded-full px-2">
                            <CheckCircle2 className="mr-1 h-2.5 w-2.5 text-green-600" />
                            {mod.fields.length} fields mapped
                          </Badge>
                        </div>
                        {isOpen
                          ? <ChevronUp className="h-4 w-4 text-muted-foreground/60" />
                          : <ChevronDown className="h-4 w-4 text-muted-foreground/60" />}
                      </button>

                      {/* Accordion body */}
                      {isOpen && (
                        <div className="border-t border-border/30 bg-muted/5">
                          {mod.fields.map((field, fi) => (
                            <div
                              key={fi}
                              className="grid grid-cols-5 gap-4 items-center px-5 py-3.5 text-sm border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors"
                            >
                              <div className="col-span-2 flex items-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                                <span className="text-muted-foreground font-medium text-xs md:text-sm">{field.xero}</span>
                              </div>
                              <div className="col-span-2 flex items-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                                <span className="text-muted-foreground font-medium text-xs md:text-sm">{field.myob}</span>
                              </div>
                              <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-500" />
                                Mapped
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>

              {/* Summary bar */}
              <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 px-5 py-3">
                <p className="text-xs text-green-600 font-medium flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  All 9 payroll modules mapped — {totalFields} fields · 7 employees ready for migration
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-border/30 pt-6 mt-4">
              <Button
                variant="outline"
                className="rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
                onClick={handlePrevStep}
              >
                ← Back
              </Button>
              <Button
                className="google-button-primary"
                onClick={handleNextStep}
              >
                Continue to Validation <ArrowRight className="ml-2 h-4 w-4" />
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
