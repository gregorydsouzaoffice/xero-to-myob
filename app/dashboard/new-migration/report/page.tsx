"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedCounter from "@/app/components/animated-counter"
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  ShieldCheck,
  XCircle,
} from "lucide-react"
import { ModuleComparisonModal } from "./module-comparison-modal"

const tabData = {
  accounts: {
    title: "Chart of Accounts",
    headers: ["Account Code", "Account Name", "Type", "Status"],
    rows: [
      ["1000", "Sales Revenue", "Revenue", "Imported"],
      ["2000", "Cost of Goods Sold", "Expense", "Imported"],
      ["3000", "Accounts Receivable", "Asset", "Imported"],
      ["4000", "Accounts Payable", "Liability", "Imported"],
      ["6200", "Travel Expenses", "Expense", "Imported"],
    ]
  },
  customers: {
    title: "Customers",
    headers: ["Name", "Email", "Phone", "Status"],
    rows: [
      ["Amazon", "amazon@gmail.com", "078 6565 1529", "Imported"],
      ["Azure Training", "info@azure.com", "+44 20 1234 5678", "Imported"],
      ["DIRECTOR", "director@abc.com", "+44 20 9876 5432", "Imported"],
      ["EE LIMITED", "accounts@ee.com", "+44 20 1111 2222", "Imported"],
    ]
  },
  vendors: {
    title: "Vendors",
    headers: ["Name", "Email", "Phone", "Status"],
    rows: [
      ["Office Supplies Ltd", "accounts@officesupplies.com", "+44 20 3333 4444", "Imported"],
      ["Tech Solutions Inc", "billing@techsolutions.com", "+44 20 5555 6666", "Imported"],
      ["Marketing Agency", "invoices@marketing.com", "+44 20 7777 8888", "Imported"],
      ["Legal Services", "admin@legalservices.com", "+44 20 9999 0000", "Imported"],
    ]
  },
  items: {
    title: "Items",
    headers: ["Item Code", "Item Name", "Type", "Status"],
    rows: [
      ["CONS-001", "Consulting Services", "Service", "Imported"],
      ["SOFT-001", "Software License", "Service", "Imported"],
      ["TRAIN-001", "Training Workshop", "Service", "Imported"],
      ["MAINT-001", "Maintenance Contract", "Service", "Imported"],
    ]
  },
  invoices: {
    title: "Invoices",
    headers: ["Invoice #", "Customer", "Date", "Amount", "Status"],
    rows: [
      ["INV-2024-001", "Amazon", "09/07/2026", "£2,500.00", "Imported"],
      ["INV-2024-002", "Azure Training", "09/07/2026", "£1,850.00", "Imported"],
      ["INV-2024-003", "DIRECTOR", "09/07/2026", "£3,200.00", "Imported"],
      ["INV-2024-004", "EE LIMITED", "09/07/2026", "£1,750.00", "Imported"],
    ]
  },
  bills: {
    title: "Bills",
    headers: ["Bill #", "Vendor", "Date", "Amount", "Status"],
    rows: [
      ["BILL-2024-001", "Office Supplies Ltd", "09/07/2026", "£450.00", "Imported"],
      ["BILL-2024-002", "Tech Solutions Inc", "09/07/2026", "£1,200.00", "Imported"],
      ["BILL-2024-003", "Marketing Agency", "09/07/2026", "£850.00", "Imported"],
      ["BILL-2024-004", "Legal Services", "09/07/2026", "£2,100.00", "Imported"],
    ]
  },
  invoicePayments: {
    title: "Invoice Payments",
    headers: ["Payment #", "Invoice", "Date", "Amount", "Status"],
    rows: [
      ["PAY-2024-001", "INV-2024-001", "09/07/2026", "£2,500.00", "Imported"],
      ["PAY-2024-002", "INV-2024-002", "09/07/2026", "£1,850.00", "Imported"],
      ["PAY-2024-003", "INV-2024-003", "09/07/2026", "£3,200.00", "Imported"],
      ["PAY-2024-004", "INV-2024-004", "09/07/2026", "£1,750.00", "Imported"],
    ]
  },
  billPayments: {
    title: "Bill Payments",
    headers: ["Payment #", "Bill", "Date", "Amount", "Status"],
    rows: [
      ["BPAY-2024-001", "BILL-2024-001", "09/07/2026", "£450.00", "Imported"],
      ["BPAY-2024-002", "BILL-2024-002", "09/07/2026", "£1,200.00", "Imported"],
      ["BPAY-2024-003", "BILL-2024-003", "09/07/2026", "£850.00", "Imported"],
      ["BPAY-2024-004", "BILL-2024-004", "09/07/2026", "£2,100.00", "Imported"],
    ]
  },
  creditNotes: {
    title: "Credit Notes",
    headers: ["Credit Note #", "Customer", "Date", "Amount", "Status"],
    rows: [
      ["CN-2024-001", "Amazon", "09/07/2026", "£150.00", "Imported"],
      ["CN-2024-002", "Azure Training", "09/07/2026", "£75.00", "Imported"],
      ["CN-2024-003", "EE LIMITED", "09/07/2026", "£200.00", "Imported"],
    ]
  },
  billCredits: {
    title: "Bill Credits",
    headers: ["Credit #", "Bill", "Date", "Amount", "Status"],
    rows: [
      ["BC-2024-001", "BILL-2024-001", "09/07/2026", "£50.00", "Imported"],
      ["BC-2024-002", "BILL-2024-003", "09/07/2026", "£100.00", "Imported"],
    ]
  },
  journals: {
    title: "Journals",
    headers: ["Journal #", "Date", "Description", "Status"],
    rows: [
      ["JE-2024-001", "09/07/2026", "Month-end accruals", "Imported"],
      ["JE-2024-002", "09/07/2026", "Depreciation adjustment", "Imported"],
      ["JE-2024-003", "09/07/2026", "Bank reconciliation", "Imported"],
      ["JE-2024-004", "09/07/2026", "Tax provision", "Imported"],
    ]
  },
  salesOrders: {
    title: "Sales Orders",
    headers: ["Order #", "Customer", "Date", "Amount", "Status"],
    rows: [
      ["SO-2024-001", "Amazon", "09/07/2026", "£1,250.00", "Imported"],
      ["SO-2024-002", "Azure Training", "09/07/2026", "£950.00", "Imported"],
      ["SO-2024-003", "DIRECTOR", "09/07/2026", "£4,100.00", "Imported"],
    ]
  },
  purchaseOrders: {
    title: "Purchase Orders",
    headers: ["Order #", "Vendor", "Date", "Amount", "Status"],
    rows: [
      ["PO-2024-001", "Office Supplies Ltd", "09/07/2026", "£320.00", "Imported"],
      ["PO-2024-002", "Tech Solutions Inc", "09/07/2026", "£1,500.00", "Imported"],
      ["PO-2024-003", "Marketing Agency", "09/07/2026", "£600.00", "Imported"],
    ]
  },
  attachments: {
    title: "Attachments",
    headers: ["File Name", "Size", "Type", "Linked To", "Status"],
    rows: [
      ["signed-contract.pdf", "1.2 MB", "PDF", "INV-2024-001", "Imported"],
      ["receipt-office.png", "340 KB", "PNG", "BILL-2024-001", "Imported"],
      ["invoice-details.docx", "850 KB", "DOCX", "INV-2024-003", "Imported"],
      ["product-spec.xlsx", "2.1 MB", "XLSX", "SO-2024-001", "Imported"],
    ]
  }
}

const comparativeReports = [
  {
    key: "trialBalance",
    title: "Comparative Trial Balance",
    body: "Compare your trial balance between Xero and MYOB to ensure financial data consistency.",
    tile: "bg-gradient-to-br from-sky-500 to-cyan-400",
  },
  {
    key: "agedReceivable",
    title: "Comparative Aged Receivable",
    body: "Compare customer outstanding balances between Xero and MYOB systems.",
    tile: "bg-gradient-to-br from-purple-700 to-violet-500",
  },
  {
    key: "agedPayable",
    title: "Comparative Aged Payable",
    body: "Compare supplier outstanding balances between Xero and MYOB systems.",
    tile: "bg-gradient-to-br from-fuchsia-600 to-pink-500",
  },
]

const RING_CIRCUMFERENCE = 2 * Math.PI * 52

export default function MigrationReport() {
  const [activeTab, setActiveTab] = useState("summary")
  const [ringDrawn, setRingDrawn] = useState(false)
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({
    trialBalance: false,
    agedReceivable: false,
    agedPayable: false,
  })

  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  useEffect(() => {
    const end = new Date()
    const start = new Date(end.getTime() - (3 * 60 + 25) * 1000) // 3m 25s ago
    const formatTime = (date: Date) => date.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const formatDate = (date: Date) => date.toLocaleDateString("en-GB")

    setEndTime(`${formatDate(end)} - ${formatTime(end)}`)
    setStartTime(`${formatDate(start)} - ${formatTime(start)}`)

    const t = setTimeout(() => setRingDrawn(true), 300)
    return () => clearTimeout(t)
  }, [])

  const migrationData: {
    completed: Record<string, number>
    total: Record<string, number>
    warnings: { id: number; category: string; message: string }[]
    errors: { id: number; category: string; message: string }[]
  } = {
    completed: {
      "Chart of Accounts": 156,
      Customers: 85,
      Vendors: 42,
      Items: 65,
      "Sales Orders": 123,
      "Purchase Orders": 89,
      Invoices: 215,
      Bills: 178,
      "Invoice Payments": 142,
      "Bill Payments": 89,
      "Credit Notes": 23,
      "Bill Credits": 15,
      Journals: 62,
      Attachments: 284,
    },
    total: {
      "Chart of Accounts": 156,
      Customers: 87,
      Vendors: 42,
      Items: 65,
      "Sales Orders": 124,
      "Purchase Orders": 89,
      Invoices: 215,
      Bills: 178,
      "Invoice Payments": 142,
      "Bill Payments": 89,
      "Credit Notes": 23,
      "Bill Credits": 15,
      Journals: 62,
      Attachments: 284,
    },
    warnings: [
      {
        id: 1,
        category: "Customers",
        message: "Missing phone number for customer 'ABC Corporation'. A placeholder has been used.",
      },
      {
        id: 2,
        category: "Customers",
        message: "Incomplete address for customer 'XYZ Ltd'. Only partial address was imported.",
      },
      {
        id: 3,
        category: "Invoice Payments",
        message: "Payment method mapping was ambiguous. Default payment method was applied.",
      },
      {
        id: 4,
        category: "Sales Orders",
        message: "Sales order 'SO-2026-0043' maps to a customer with missing contact details. Defaulting to customer record.",
      },
    ],
    errors: [],
  }

  const totalRecords = Object.values(migrationData.total).reduce((a, b) => a + b, 0)
  const completedRecords = Object.values(migrationData.completed).reduce((a, b) => a + b, 0)
  const successRate = (completedRecords / totalRecords) * 100
  const successRateLabel = successRate.toFixed(1)

  const handleViewReport = (reportType: string) => {
    try {
      setIsDownloading({ ...isDownloading, [reportType]: true })

      const fileMap: Record<string, string> = {
        trialBalance: "Comparative-Trial-Balance",
        agedReceivable: "Comparative-Aged-Receivable",
        agedPayable: "Comparative-Aged-Payable",
      }

      const fileName = fileMap[reportType]
      if (!fileName) {
        throw new Error(`Unknown report type: ${reportType}`)
      }

      window.open(`/reports/${fileName}.html`, "_blank")
    } catch (error) {
      console.error(`Error opening report:`, error)
      alert(`Error opening report. Please try again.`)
    } finally {
      setIsDownloading({ ...isDownloading, [reportType]: false })
    }
  }

  const stagger = (i: number, base = 0) =>
    ({ animationDelay: `${base + i * 100}ms`, animationFillMode: "both" }) as React.CSSProperties

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-6 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 animate-fade-in-up" style={{ animationFillMode: "both" }}>
          <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {/* Victory header */}
          <div
            className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-6 shadow-sm backdrop-blur-md sm:p-8"
            style={{ animationFillMode: "both" }}
          >
            <div className="journey-gradient-bg absolute inset-x-0 top-0 h-0.5" />
            <div className="pointer-events-none absolute -top-20 right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[hsl(var(--brand-pink)/0.08)] blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="check-pop flex h-11 w-11 items-center justify-center rounded-full journey-gradient-bg shadow-lg">
                    <Check className="h-6 w-6 text-white" strokeWidth={3} />
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight gradient-text pb-1">Migration Report</h1>
                </div>
                <p className="text-muted-foreground">
                  Xero to MYOB migration completed on{" "}
                  {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                    <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Successfully completed
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Clock className="mr-1.5 h-3.5 w-3.5" /> 3 min 25 sec
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Layers className="mr-1.5 h-3.5 w-3.5" /> {totalRecords.toLocaleString()} records
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> 14 data categories
                  </span>
                </div>
              </div>

              {/* Success-rate ring */}
              <div className="relative mx-auto shrink-0 lg:mx-0">
                <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--brand-purple))" />
                      <stop offset="100%" stopColor="hsl(var(--brand-pink))" />
                    </linearGradient>
                  </defs>
                  <circle cx="66" cy="66" r="52" fill="none" strokeWidth="9" className="stroke-secondary" />
                  <circle
                    cx="66"
                    cy="66"
                    r="52"
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={ringDrawn ? RING_CIRCUMFERENCE * (1 - successRate / 100) : RING_CIRCUMFERENCE}
                    style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.2, 0, 0, 1)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold tabular-nums text-foreground">
                    <AnimatedCounter from={0} to={Number(successRateLabel)} decimals={1} duration={1.6} suffix="%" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Success rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Count-up stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                label: "Total Records",
                value: totalRecords,
                icon: Layers,
                color: "text-foreground",
                accent: "bg-primary",
              },
              {
                label: "Successfully Imported",
                value: completedRecords,
                icon: CheckCircle,
                color: "text-green-600",
                accent: "bg-green-500",
              },
              {
                label: "Warnings",
                value: migrationData.warnings.length,
                icon: AlertTriangle,
                color: "text-amber-500",
                accent: "bg-amber-500",
              },
              {
                label: "Errors",
                value: migrationData.errors.length,
                icon: XCircle,
                color: "text-muted-foreground",
                accent: "bg-border",
              },
            ].map((stat, i) => (
              <Card
                key={stat.label}
                className="animate-fade-in-up group relative overflow-hidden border-border/50 bg-card/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={stagger(i, 100)}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 ${stat.accent} opacity-60`} />
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <stat.icon
                      className={`mb-2 h-5 w-5 ${stat.color} opacity-70 transition-transform duration-300 group-hover:scale-110`}
                    />
                    <div className={`text-3xl font-extrabold tracking-tight tabular-nums ${stat.color}`}>
                      <AnimatedCounter from={0} to={stat.value} duration={1.4} />
                    </div>
                    <div className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparative reports */}
          <Card
            className="animate-fade-in-up border-border/50 bg-card/70 backdrop-blur-md shadow-sm"
            style={stagger(0, 400)}
          >
            <CardHeader className="flex flex-col gap-4 border-b border-border/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Comparative Reports</CardTitle>
                <CardDescription className="text-muted-foreground">
                  View comparative reports to analyze your migrated data consistency
                </CardDescription>
              </div>
              <ModuleComparisonModal className="shadow-sm hover:shadow transition-all" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                {comparativeReports.map((report, i) => (
                  <div
                    key={report.key}
                    className="animate-fade-in-up group flex flex-col rounded-xl border border-border/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    style={stagger(i, 500)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${report.tile}`}
                      >
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="font-semibold text-foreground">{report.title}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{report.body}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto border-border/50 bg-background/50 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      onClick={() => handleViewReport(report.key)}
                      disabled={isDownloading[report.key]}
                    >
                      {isDownloading[report.key] ? (
                        <>Opening…</>
                      ) : (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />{" "}
                          View Report
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed report */}
          <Card
            className="animate-fade-in-up border-border/50 bg-card/70 backdrop-blur-md shadow-sm"
            style={stagger(0, 600)}
          >
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-xl font-bold">Detailed Report</CardTitle>
              <CardDescription className="text-muted-foreground">Review the details of your migration</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 flex flex-wrap h-auto gap-1 bg-muted/40 p-1 rounded-xl border border-border/50">
                  {["summary", "accounts", "customers", "vendors", "items", "salesOrders", "purchaseOrders", "invoices", "bills", "invoicePayments", "billPayments", "creditNotes", "billCredits", "journals", "attachments", "warnings"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                    >
                      {tab === "invoicePayments"
                        ? "Invoice Payments"
                        : tab === "billPayments"
                          ? "Bill Payments"
                          : tab === "creditNotes"
                            ? "Credit Notes"
                            : tab === "billCredits"
                              ? "Bill Credits"
                              : tab === "accounts"
                                ? "Chart of Accounts"
                                : tab === "salesOrders"
                                  ? "Sales Orders"
                                  : tab === "purchaseOrders"
                                    ? "Purchase Orders"
                                    : tab === "attachments"
                                      ? "Attachments"
                                      : tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="summary" className="space-y-6 mt-4">
                  <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Migration Overview</h3>
                    <div className="space-y-3">
                      {[
                        ["Migration ID", <span key="id" className="font-mono">MIG-{new Date().toISOString().slice(0, 10).replace(/-/g, "")}-001</span>],
                        ["Start Time", startTime],
                        ["End Time", endTime],
                        ["Duration", "3 minutes, 25 seconds"],
                        ["Source", "Xero (API v3.0)"],
                        ["Destination", "MYOB (API v2.0)"],
                      ].map(([label, value], i) => (
                        <div
                          key={i}
                          className="animate-fade-in-up grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm last:border-0"
                          style={stagger(i, 0)}
                        >
                          <div className="font-medium text-muted-foreground">{label}</div>
                          <div className="text-foreground">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Data Categories</h3>
                    <div className="space-y-3">
                      {Object.keys(migrationData.total).map((category, i) => {
                        const done = migrationData.completed[category]
                        const total = migrationData.total[category]
                        const pct = (done / total) * 100
                        return (
                          <div key={category} className="animate-fade-in-up space-y-1.5" style={stagger(i, 0)}>
                            <div className="flex items-center justify-between text-sm">
                              <div className="text-foreground font-medium">{category}</div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                    done === total
                                      ? "text-green-600 bg-green-500/10"
                                      : "text-amber-600 bg-amber-500/10"
                                  }`}
                                >
                                  {done}/{total} Imported
                                </span>
                                {done === total ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                                )}
                              </div>
                            </div>
                            <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                              <div
                                className={`h-full rounded-full ${done === total ? "bg-primary/60" : "bg-amber-500/70"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {migrationData.warnings.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">Warnings</div>
                          <p className="text-xs text-muted-foreground">
                            {migrationData.warnings.length} records were imported with warnings. See the Warnings tab for details.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="warnings" className="space-y-4 mt-4">
                  <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Warning Details</h3>
                    <div className="space-y-3">
                      {migrationData.warnings.map((warning, i) => (
                        <div
                          key={warning.id}
                          className="animate-fade-in-up rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 hover:bg-amber-500/10 transition-colors"
                          style={stagger(i, 0)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                              <AlertTriangle className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">{warning.category}</div>
                              <p className="text-xs text-muted-foreground mt-1">{warning.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {Object.entries(tabData).map(([key, data]) => (
                  <TabsContent key={key} value={key} className="space-y-6 mt-4">
                    <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm">
                      <h3 className="mb-4 text-base font-semibold text-foreground">{data.title}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-border/50 text-muted-foreground">
                              {data.headers.map((h, i) => (
                                <th key={i} className={`px-4 py-3 font-semibold text-xs uppercase tracking-wider ${i === data.headers.length - 1 ? 'text-right' : 'text-left'}`}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {data.rows.map((row, rIndex) => (
                              <tr
                                key={rIndex}
                                className="animate-fade-in-up border-b border-border/30 hover:bg-muted/5 transition-colors"
                                style={{ animationDelay: `${rIndex * 60}ms`, animationFillMode: "both" }}
                              >
                                {row.map((cell, cIndex) => (
                                  <td key={cIndex} className={`px-4 py-3 ${cIndex === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'} ${cIndex === row.length - 1 ? 'text-right' : 'text-left'}`}>
                                    {cIndex === row.length - 1 && cell === "Imported" ? (
                                      <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        {cell}
                                      </span>
                                    ) : cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border/30 pt-4">
              <Button variant="outline" asChild className="border-border/50 hover:bg-muted/30">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* QA callout */}
          <Card
            className="animate-fade-in-up relative overflow-hidden border border-primary/20 shadow-sm rounded-2xl"
            style={stagger(0, 700)}
          >
            <div className="google-gradient absolute inset-0" />
            <div className="journey-gradient-bg absolute inset-x-0 top-0 h-0.5" />
            <CardContent className="relative p-8">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg shadow-lg">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div className="text-xl font-bold text-foreground">
                  Your financial migration is {successRateLabel}% complete!
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Want MMC to do a manual QA to ensure 100% accuracy? Our experts can review your migrated data for
                  complete peace of mind.
                </p>
                <Button
                  size="lg"
                  className="premium-button rounded-full px-8 font-semibold"
                  onClick={() => {
                    alert("The MMC team has been notified and will reach out within 24 hours.")
                  }}
                >
                  Request Manual QA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
