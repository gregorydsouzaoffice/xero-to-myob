"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, CheckCircle, Database, FileText, Map, CheckSquare, Upload } from "lucide-react"

export default function MapData() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [currentStep, setCurrentStep] = useState(3)
  const [progress, setProgress] = useState(60)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNextStep = () => {
    router.push(`/dashboard/new-migration/validate?destination=${destination}`)
  }

  const handlePrevStep = () => {
    router.push(`/dashboard/new-migration/extract?destination=${destination}`)
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
            href={`/dashboard/new-migration/extract?destination=${destination}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-8 w-8 rounded-full bg-card border border-border/60 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Extract
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              New Migration: Xero to {destinationDetails.name}
            </h1>
            <p className="text-muted-foreground mt-1">Map data fields between Xero and {destinationDetails.name}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              <div>Migration Progress</div>
              <div className="text-primary font-bold">60%</div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-0 opacity-20 blur-sm rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>

              <div
                className="absolute inset-0 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>

              {/* Animated shine effect */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"
                style={{ width: `${mounted ? 60 : 0}%` }}
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
                  className={`flex flex-col items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 h-auto ${
                    isActive ? "text-primary font-semibold" : isCompleted ? "text-primary/80" : "text-muted-foreground"
                  } ${stepNum > 3 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5 hover:text-primary"}`}
                  disabled={stepNum > 3}
                  onClick={() => {
                    if (stepNum === 1) {
                      router.push(`/dashboard/new-migration/connect?destination=${destination}`)
                    } else if (stepNum === 2) {
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
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold tracking-tight text-foreground">
                <Map className="mr-2.5 h-5 w-5 text-primary" />
                Step 3: Map Data Fields
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">Map Xero fields to {destinationDetails.name} fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="accounts" className="w-full">
                <TabsList className="mb-6 w-full justify-start rounded-xl p-1 backdrop-blur-md bg-muted border border-border/50 overflow-x-auto">
                  <TabsTrigger
                    value="accounts"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Chart of Accounts
                  </TabsTrigger>
                  <TabsTrigger
                    value="customers"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Customers
                  </TabsTrigger>
                  <TabsTrigger
                    value="vendors"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Vendors
                  </TabsTrigger>
                  <TabsTrigger
                    value="items"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales-orders"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Sales Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="purchase-orders"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Purchase Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="invoices"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Invoices
                  </TabsTrigger>
                  <TabsTrigger
                    value="bills"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Bills
                  </TabsTrigger>
                  <TabsTrigger
                    value="invoice-payments"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Invoice Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="bill-payments"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Bill Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="credit-notes"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Credit Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value="bill-credits"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Bill Credits
                  </TabsTrigger>
                  <TabsTrigger
                    value="journals"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Journals
                  </TabsTrigger>
                  <TabsTrigger
                    value="attachments"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                  >
                    Attachments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="accounts" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Account Code", myob: "Account Number" },
                        { xero: "Account Name", myob: "Account Name" },
                        { xero: "Account Type", myob: "Account Type" },
                        { xero: "Tax Type", myob: "GST Code" },
                        { xero: "Description", myob: "Description" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Contact Name", myob: "Customer Name" },
                        { xero: "Email Address", myob: "Email" },
                        { xero: "Phone Number", myob: "Phone" },
                        { xero: "Billing Address", myob: "Address" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vendors" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Contact Name", myob: "Vendor Name" },
                        { xero: "Email Address", myob: "Email" },
                        { xero: "Phone Number", myob: "Phone" },
                        { xero: "Billing Address", myob: "Address" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Item Name", myob: "Item Name" },
                        { xero: "Item Code", myob: "Item Code" },
                        { xero: "Description", myob: "Description" },
                        { xero: "Unit Price", myob: "Unit Price" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sales-orders" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "SO Number", myob: "Sales Order Ref" },
                        { xero: "Customer", myob: "Customer" },
                        { xero: "Date", myob: "Date" },
                        { xero: "Expiry Date", myob: "Expiry Date" },
                        { xero: "Line Items", myob: "Line Items" },
                        { xero: "Total Amount", myob: "Total Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="purchase-orders" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "PO Number", myob: "Purchase Order Ref" },
                        { xero: "Supplier", myob: "Vendor" },
                        { xero: "Date", myob: "Date" },
                        { xero: "Delivery Date", myob: "Delivery Date" },
                        { xero: "Line Items", myob: "Line Items" },
                        { xero: "Total Amount", myob: "Total Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoices" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Invoice Number", myob: "Invoice Ref" },
                        { xero: "Customer", myob: "Customer" },
                        { xero: "Issue Date", myob: "Date" },
                        { xero: "Due Date", myob: "Due Date" },
                        { xero: "Line Items", myob: "Line Items" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bills" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Bill Number", myob: "Expense ID" },
                        { xero: "Supplier", myob: "Vendor" },
                        { xero: "Issue Date", myob: "Date" },
                        { xero: "Due Date", myob: "Due Date" },
                        { xero: "Line Items", myob: "Line Items" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoice-payments" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Payment ID", myob: "Payment Ref" },
                        { xero: "Invoice Number", myob: "Invoice Ref" },
                        { xero: "Payment Date", myob: "Date" },
                        { xero: "Amount", myob: "Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bill-payments" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Payment ID", myob: "Payment Ref" },
                        { xero: "Bill Number", myob: "Expense ID" },
                        { xero: "Payment Date", myob: "Date" },
                        { xero: "Amount", myob: "Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="credit-notes" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Credit Note Number", myob: "Credit Ref" },
                        { xero: "Customer", myob: "Customer" },
                        { xero: "Issue Date", myob: "Date" },
                        { xero: "Amount", myob: "Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bill-credits" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Credit Note Number", myob: "Credit Ref" },
                        { xero: "Supplier", myob: "Vendor" },
                        { xero: "Issue Date", myob: "Date" },
                        { xero: "Amount", myob: "Amount" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="journals" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "Journal Number", myob: "Journal Ref" },
                        { xero: "Date", myob: "Date" },
                        { xero: "Reference", myob: "Reference" },
                        { xero: "Journal Lines", myob: "Journal Lines" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4">
                  <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6">
                    <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                      <Map className="mr-2.5 h-5 w-5 text-primary" />
                      Field Mapping
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                        <div className="col-span-2">Xero Field</div>
                        <div className="col-span-2">{destinationDetails.name} Field</div>
                        <div className="text-right">Status</div>
                      </div>

                      {[
                        { xero: "File Name", myob: "File Name" },
                        { xero: "File Type", myob: "File Type" },
                        { xero: "File Size", myob: "File Size" },
                        { xero: "Linked Transaction", myob: "Linked Record" },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 gap-4 items-center py-3 text-sm border-b border-border/20 last:border-0`}
                        >
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5"></div>
                            {field.xero}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2.5"></div>
                            {field.myob}
                          </div>
                          <div className="text-right text-green-600 font-medium flex items-center justify-end text-xs">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mapped
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
                Continue to Validation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

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
