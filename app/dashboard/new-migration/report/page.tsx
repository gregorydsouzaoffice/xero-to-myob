"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ArrowLeft, CheckCircle, FileText, ExternalLink } from "lucide-react"
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
      ["INV-2024-001", "Amazon", "09/07/2024", "£2,500.00", "Imported"],
      ["INV-2024-002", "Azure Training", "09/07/2024", "£1,850.00", "Imported"],
      ["INV-2024-003", "DIRECTOR", "09/07/2024", "£3,200.00", "Imported"],
      ["INV-2024-004", "EE LIMITED", "09/07/2024", "£1,750.00", "Imported"],
    ]
  },
  bills: {
    title: "Bills",
    headers: ["Bill #", "Vendor", "Date", "Amount", "Status"],
    rows: [
      ["BILL-2024-001", "Office Supplies Ltd", "09/07/2024", "£450.00", "Imported"],
      ["BILL-2024-002", "Tech Solutions Inc", "09/07/2024", "£1,200.00", "Imported"],
      ["BILL-2024-003", "Marketing Agency", "09/07/2024", "£850.00", "Imported"],
      ["BILL-2024-004", "Legal Services", "09/07/2024", "£2,100.00", "Imported"],
    ]
  },
  invoicePayments: {
    title: "Invoice Payments",
    headers: ["Payment #", "Invoice", "Date", "Amount", "Status"],
    rows: [
      ["PAY-2024-001", "INV-2024-001", "09/07/2024", "£2,500.00", "Imported"],
      ["PAY-2024-002", "INV-2024-002", "09/07/2024", "£1,850.00", "Imported"],
      ["PAY-2024-003", "INV-2024-003", "09/07/2024", "£3,200.00", "Imported"],
      ["PAY-2024-004", "INV-2024-004", "09/07/2024", "£1,750.00", "Imported"],
    ]
  },
  billPayments: {
    title: "Bill Payments",
    headers: ["Payment #", "Bill", "Date", "Amount", "Status"],
    rows: [
      ["BPAY-2024-001", "BILL-2024-001", "09/07/2024", "£450.00", "Imported"],
      ["BPAY-2024-002", "BILL-2024-002", "09/07/2024", "£1,200.00", "Imported"],
      ["BPAY-2024-003", "BILL-2024-003", "09/07/2024", "£850.00", "Imported"],
      ["BPAY-2024-004", "BILL-2024-004", "09/07/2024", "£2,100.00", "Imported"],
    ]
  },
  creditNotes: {
    title: "Credit Notes",
    headers: ["Credit Note #", "Customer", "Date", "Amount", "Status"],
    rows: [
      ["CN-2024-001", "Amazon", "09/07/2024", "£150.00", "Imported"],
      ["CN-2024-002", "Azure Training", "09/07/2024", "£75.00", "Imported"],
      ["CN-2024-003", "EE LIMITED", "09/07/2024", "£200.00", "Imported"],
    ]
  },
  billCredits: {
    title: "Bill Credits",
    headers: ["Credit #", "Bill", "Date", "Amount", "Status"],
    rows: [
      ["BC-2024-001", "BILL-2024-001", "09/07/2024", "£50.00", "Imported"],
      ["BC-2024-002", "BILL-2024-003", "09/07/2024", "£100.00", "Imported"],
    ]
  },
  journals: {
    title: "Journals",
    headers: ["Journal #", "Date", "Description", "Status"],
    rows: [
      ["JE-2024-001", "09/07/2024", "Month-end accruals", "Imported"],
      ["JE-2024-002", "09/07/2024", "Depreciation adjustment", "Imported"],
      ["JE-2024-003", "09/07/2024", "Bank reconciliation", "Imported"],
      ["JE-2024-004", "09/07/2024", "Tax provision", "Imported"],
    ]
  }
}

export default function MigrationReport() {
  const [activeTab, setActiveTab] = useState("summary")
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({
    trialBalance: false,
    agedReceivable: false,
    agedPayable: false,
  })

  const migrationData = {
    completed: {
      "Chart of Accounts": 156,
      Customers: 85,
      Vendors: 42,
      Items: 65,
      Invoices: 215,
      Bills: 178,
      "Invoice Payments": 142,
      "Bill Payments": 89,
      "Credit Notes": 23,
      "Bill Credits": 15,
      Journals: 62, // Changed from 64 to 62 to match import page
    },
    total: {
      "Chart of Accounts": 156,
      Customers: 87,
      Vendors: 42,
      Items: 65,
      Invoices: 215,
      Bills: 178,
      "Invoice Payments": 142,
      "Bill Payments": 89,
      "Credit Notes": 23,
      "Bill Credits": 15,
      Journals: 62, // Changed from 64 to 62 to match import page
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
    ],
    errors: [],
  }

  const totalRecords = Object.values(migrationData.total).reduce((a, b) => a + b, 0)
  const completedRecords = Object.values(migrationData.completed).reduce((a, b) => a + b, 0)

  const handleViewReport = (reportType: string) => {
    try {
      setIsDownloading({ ...isDownloading, [reportType]: true })

      // Map report types to filenames
      const fileMap: Record<string, string> = {
        trialBalance: "Comparative-Trial-Balance",
        agedReceivable: "Comparative-Aged-Receivable",
        agedPayable: "Comparative-Aged-Payable",
      }

      const fileName = fileMap[reportType]

      if (!fileName) {
        throw new Error(`Unknown report type: ${reportType}`)
      }

      // Open the report in a new tab
      window.open(`/reports/${fileName}.html`, "_blank")
    } catch (error) {
      console.error(`Error opening report:`, error)
      alert(`Error opening report. Please try again.`)
    } finally {
      setIsDownloading({ ...isDownloading, [reportType]: false })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-6 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Migration Report</h1>
              <p className="text-muted-foreground">
                Xero to MYOB migration completed on{" "}
                {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <div className="flex items-center mt-2.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-semibold text-green-500 w-fit">
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Successfully completed
              </div>
            </div>
            <ModuleComparisonModal className="shadow-sm hover:shadow transition-all" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="border-border/50 bg-card/70 backdrop-blur-md hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-foreground">{totalRecords}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">Total Records</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/70 backdrop-blur-md hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-green-500">{completedRecords}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">Successfully Imported</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/70 backdrop-blur-md hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-amber-500">{migrationData.warnings.length}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">Warnings</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/70 backdrop-blur-md hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-extrabold tracking-tight text-red-500">{migrationData.errors.length}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">Errors</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 bg-card/70 backdrop-blur-md shadow-sm">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-xl font-bold">Comparative Reports</CardTitle>
              <CardDescription className="text-muted-foreground">View comparative reports to analyze your migrated data consistency</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/5 hover:scale-[1.01] hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="font-semibold text-foreground">Comparative Trial Balance</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Compare your trial balance between Xero and MYOB to ensure financial data consistency.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto border-border/50 bg-background/50 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => handleViewReport("trialBalance")}
                    disabled={isDownloading.trialBalance}
                  >
                    {isDownloading.trialBalance ? (
                      <>Opening...</>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" /> View Report
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex flex-col p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/5 hover:scale-[1.01] hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="font-semibold text-foreground">Comparative Aged Receivable</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Compare customer outstanding balances between Xero and MYOB systems.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto border-border/50 bg-background/50 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => handleViewReport("agedReceivable")}
                    disabled={isDownloading.agedReceivable}
                  >
                    {isDownloading.agedReceivable ? (
                      <>Opening...</>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" /> View Report
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex flex-col p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/5 hover:scale-[1.01] hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="font-semibold text-foreground">Comparative Aged Payable</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Compare supplier outstanding balances between Xero and MYOB systems.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto border-border/50 bg-background/50 hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={() => handleViewReport("agedPayable")}
                    disabled={isDownloading.agedPayable}
                  >
                    {isDownloading.agedPayable ? (
                      <>Opening...</>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" /> View Report
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/70 backdrop-blur-md shadow-sm">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-xl font-bold">Detailed Report</CardTitle>
              <CardDescription className="text-muted-foreground">Review the details of your migration</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 flex flex-wrap h-auto gap-1 bg-muted/40 p-1 rounded-xl border border-border/50">
                  {["summary", "accounts", "customers", "vendors", "items", "invoices", "bills", "invoicePayments", "billPayments", "creditNotes", "billCredits", "journals", "warnings"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium capitalize data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
                    >
                      {tab === "invoicePayments" ? "Invoice Payments" : tab === "billPayments" ? "Bill Payments" : tab === "creditNotes" ? "Credit Notes" : tab === "billCredits" ? "Bill Credits" : tab === "accounts" ? "Chart of Accounts" : tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="summary" className="space-y-6 mt-4">
                  <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Migration Overview</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm">
                        <div className="font-medium text-muted-foreground">Migration ID</div>
                        <div className="text-foreground font-mono">MIG-{new Date().toISOString().slice(0, 10).replace(/-/g, "")}-001</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm">
                        <div className="font-medium text-muted-foreground">Start Time</div>
                        <div className="text-foreground">{new Date().toLocaleDateString("en-GB")} - 10:15:22</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm">
                        <div className="font-medium text-muted-foreground">End Time</div>
                        <div className="text-foreground">{new Date().toLocaleDateString("en-GB")} - 10:18:47</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm">
                        <div className="font-medium text-muted-foreground">Duration</div>
                        <div className="text-foreground">3 minutes, 25 seconds</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-border/30 pb-2.5 text-sm">
                        <div className="font-medium text-muted-foreground">Source</div>
                        <div className="text-foreground">Xero (API v3.0)</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-medium text-muted-foreground">Destination</div>
                        <div className="text-foreground">MYOB (API v2.0)</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Data Categories</h3>
                    <div className="space-y-3">
                      {Object.keys(migrationData.total).map((category) => (
                        <div key={category} className="flex items-center justify-between border-b border-border/30 pb-2.5 text-sm hover:bg-muted/5 transition-colors">
                          <div className="text-foreground font-medium">{category}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                              {migrationData.completed[category]}/{migrationData.total[category]} Imported
                            </span>
                            {migrationData.completed[category] === migrationData.total[category] ? (
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
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
                      {migrationData.warnings.map((warning) => (
                        <div key={warning.id} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 hover:bg-amber-500/10 transition-colors">
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
                              <tr key={rIndex} className="border-b border-border/30 hover:bg-muted/5 transition-colors">
                                {row.map((cell, cIndex) => (
                                  <td key={cIndex} className={`px-4 py-3 ${cIndex === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'} ${cIndex === row.length - 1 ? 'text-right' : 'text-left'}`}>
                                    {cIndex === row.length - 1 && cell === "Imported" ? (
                                      <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-xs font-semibold text-green-500">
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

          <Card className="border border-primary/20 bg-primary/5 hover:border-primary/30 transition-all duration-300 shadow-sm rounded-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="text-xl font-bold text-foreground">Your financial migration is 99% complete!</div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Want MMC to do a manual QA to ensure 100% accuracy? Our experts can review your migrated data for
                  complete peace of mind.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 rounded-lg shadow-sm hover:shadow-md transition-all"
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
