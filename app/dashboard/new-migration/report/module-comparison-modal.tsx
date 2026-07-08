"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Compass as Compare } from "lucide-react"

interface ModuleComparisonProps {
  className?: string
}

export function ModuleComparisonModal({ className }: ModuleComparisonProps) {
  const [open, setOpen] = useState(false)

  const modules = [
    {
      id: "bills",
      name: "Bills",
      xeroImage: "/images/screenshots/Xero Bill 202-9171566-7320302.png",
      myobImage: "/images/screenshots/MYOB Bill 202-9171566-7320302.png", // Updated from Capium to MYOB
      description: "Compare bill entry between Xero and MYOB", // Updated description
    },
    {
      id: "bank-accounts",
      name: "Bank Accounts",
      xeroImage: "/images/screenshots/Xero Bank Account.jpg",
      myobImage: "/images/screenshots/MYOB Bank Account.png", // Updated from Capium to MYOB
      description: "Compare bank account setup between Xero and MYOB", // Updated description
    },
    {
      id: "chart-of-accounts",
      name: "Chart of Accounts",
      xeroImage: "/images/screenshots/Xero Coa Sales account code.jpg",
      myobImage: "/images/screenshots/MYOB Sale Account code.jpg", // Updated from Capium to MYOB
      description: "Compare chart of accounts setup between Xero and MYOB", // Updated description
    },
    {
      id: "customers",
      name: "Customers",
      xeroImage: "/images/screenshots/Xero Customer.png",
      myobImage: "/images/screenshots/MYOB Customer.jpg", // Updated from Capium to MYOB
      description: "Compare customer management between Xero and MYOB", // Updated description
    },
    {
      id: "suppliers",
      name: "Suppliers",
      xeroImage: "/images/screenshots/Xero Supplier.png",
      myobImage: "/images/screenshots/MYOB Supplier.png", // Updated from Capium to MYOB
      description: "Compare supplier management between Xero and MYOB", // Updated description
    },
    {
      id: "invoices",
      name: "Invoices",
      xeroImage: "/images/screenshots/Xero Inv 11.png",
      myobImage: "/images/screenshots/MYOB Inv 11.png", // Updated from Capium to MYOB
      description: "Compare invoice creation and management between Xero and MYOB", // Updated description
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Compare className="mr-2 h-4 w-4" /> Compare Modules
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto border-border/50 bg-background/95 backdrop-blur-md shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4 text-foreground">Module Comparison: Xero vs MYOB</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="bills" className="w-full">
          <TabsList className="mb-4 flex flex-wrap h-auto">
            {modules.map((module) => (
              <TabsTrigger key={module.id} value={module.id} className="px-4 py-2">
                {module.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="mt-0">
              <div className="text-sm text-muted-foreground mb-4">{module.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="font-semibold mb-2 p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-t-md border-b border-blue-500/20">Xero</div>
                  <div className="border border-border/50 rounded-b-md p-1 bg-card/50 backdrop-blur-md">
                    <div className="relative aspect-auto w-full overflow-hidden rounded-sm">
                      <Image
                        src={module.xeroImage || "/placeholder.svg"}
                        alt={`Xero ${module.name}`}
                        width={600}
                        height={400}
                        className="object-contain w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="font-semibold mb-2 p-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-t-md border-b border-red-500/20">MYOB</div>
                  <div className="border border-border/50 rounded-b-md p-1 bg-card/50 backdrop-blur-md">
                    <div className="relative aspect-auto w-full overflow-hidden rounded-sm">
                      <Image
                        src={module.myobImage || "/placeholder.svg"}
                        alt={`MYOB ${module.name}`}
                        width={600}
                        height={400}
                        className="object-contain w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
