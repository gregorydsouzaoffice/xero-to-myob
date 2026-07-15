"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckSquare,
  Database,
  FileText,
  Map,
  MoveRight,
  PenLine,
  RotateCcw,
  Settings2,
  SkipForward,
  Sparkles,
  Upload,
} from "lucide-react"

/* ---------------------------------------------------------------------------
   Mapping model
   - Every category has editable FIELD mappings and TREATMENT rules.
   - Chart of Accounts additionally has record-level ACCOUNT remapping.
--------------------------------------------------------------------------- */

const SKIP = "__skip__"
const STORAGE_KEY = "mmc-map-overrides-v1"

interface FieldDef {
  id: string
  xero: string
  suggested: string
  alternates: string[]
  /** AI could not confidently pick a target — user must map manually */
  needsReview?: boolean
}

interface RuleOption {
  value: string
  label: string
  hint?: string
}

interface RuleDef {
  id: string
  label: string
  description: string
  suggested: string
  options: RuleOption[]
}

interface MyobAccount {
  code: string
  name: string
  type: string
  tax: string
}

// Target MYOB chart of accounts available for remapping
const MYOB_ACCOUNTS: MyobAccount[] = [
  { code: "1-1100", name: "Business Bank Account", type: "Asset", tax: "N-T" },
  { code: "1-1200", name: "Accounts Receivable", type: "Asset", tax: "N-T" },
  { code: "1-2100", name: "Inventory", type: "Asset", tax: "N-T" },
  { code: "2-1200", name: "Accounts Payable", type: "Liability", tax: "N-T" },
  { code: "2-1400", name: "GST Collected", type: "Liability", tax: "GST" },
  { code: "3-1000", name: "Retained Earnings", type: "Equity", tax: "N-T" },
  { code: "4-1000", name: "Sales Income", type: "Income", tax: "GST on Income" },
  { code: "4-2000", name: "Service Income", type: "Income", tax: "GST on Income" },
  { code: "4-3000", name: "Other Income", type: "Income", tax: "GST on Income" },
  { code: "5-1000", name: "Cost of Goods Sold", type: "Cost of Sales", tax: "GST on Expenses" },
  { code: "6-1100", name: "Office Expenses", type: "Expense", tax: "GST on Expenses" },
  { code: "6-1200", name: "Travel Expenses", type: "Expense", tax: "GST on Expenses" },
  { code: "6-1300", name: "Marketing Expenses", type: "Expense", tax: "GST on Expenses" },
  { code: "6-9000", name: "Suspense / Unassigned", type: "Expense", tax: "N-T" },
]

const ACCOUNT_TYPE_ORDER = ["Asset", "Liability", "Equity", "Income", "Cost of Sales", "Expense"]

const myobAccount = (code: string) => MYOB_ACCOUNTS.find((a) => a.code === code)

const accountOptions = (codes?: string[]): RuleOption[] =>
  MYOB_ACCOUNTS.filter((a) => !codes || codes.includes(a.code)).map((a) => ({
    value: a.code,
    label: `${a.code} · ${a.name}`,
    hint: a.type,
  }))

// Sample Xero accounts with their suggested MYOB targets (record-level remapping)
const XERO_ACCOUNTS: { code: string; name: string; type: string; suggested: string; needsReview?: boolean }[] = [
  { code: "090", name: "Business Bank Account", type: "Bank", suggested: "1-1100" },
  { code: "200", name: "Sales", type: "Revenue", suggested: "4-1000" },
  { code: "260", name: "Other Revenue", type: "Revenue", suggested: "", needsReview: true },
  { code: "310", name: "Cost of Goods Sold", type: "Direct Costs", suggested: "5-1000" },
  { code: "400", name: "Advertising", type: "Expense", suggested: "6-1300" },
  { code: "493", name: "Travel - National", type: "Expense", suggested: "6-1200" },
  { code: "610", name: "Accounts Receivable", type: "Current Asset", suggested: "1-1200" },
  { code: "800", name: "Accounts Payable", type: "Current Liability", suggested: "2-1200" },
]

interface CategoryDef {
  key: string
  label: string
  fields: FieldDef[]
  rules: RuleDef[]
}

const f = (id: string, xero: string, suggested: string, alternates: string[] = []): FieldDef => ({
  id,
  xero,
  suggested,
  alternates,
})

// A field the AI flagged as ambiguous — no suggestion, user picks from candidates
const fr = (id: string, xero: string, candidates: string[]): FieldDef => ({
  id,
  xero,
  suggested: "",
  alternates: candidates,
  needsReview: true,
})

const CATEGORIES: CategoryDef[] = [
  {
    key: "accounts",
    label: "Chart of Accounts",
    fields: [
      f("code", "Account Code", "Account Number", ["Account Alias"]),
      f("name", "Account Name", "Account Name", ["Display Name"]),
      f("type", "Account Type", "Account Type", ["Account Classification"]),
      f("tax", "Tax Type", "GST Code", ["Tax Code Override", "No Tax (N-T)"]),
      f("desc", "Description", "Description", ["Notes"]),
    ],
    rules: [
      {
        id: "numbering",
        label: "Account numbering",
        description: "How Xero account codes become MYOB account numbers",
        suggested: "adopt",
        options: [
          { value: "adopt", label: "Adopt MYOB numbering (4-xxxx)", hint: "Recommended" },
          { value: "keep", label: "Keep Xero codes as aliases" },
        ],
      },
      {
        id: "inactive",
        label: "Inactive accounts",
        description: "Xero accounts that are archived or unused",
        suggested: "skip",
        options: [
          { value: "skip", label: "Skip inactive accounts", hint: "Recommended" },
          { value: "migrate", label: "Migrate all accounts" },
        ],
      },
    ],
  },
  {
    key: "customers",
    label: "Customers",
    fields: [
      f("name", "Contact Name", "Customer Name", ["Company Name", "Display Name"]),
      f("email", "Email Address", "Email", ["Billing Email"]),
      f("phone", "Phone Number", "Phone", ["Mobile", "Office Phone"]),
      f("address", "Billing Address", "Address", ["Billing Address", "Shipping Address"]),
    ],
    rules: [
      {
        id: "missing-contact",
        label: "Contacts with missing details",
        description: "Customers without an email or phone number",
        suggested: "placeholder",
        options: [
          { value: "placeholder", label: "Import with placeholder", hint: "Recommended" },
          { value: "flag", label: "Import and flag for review" },
          { value: "skip", label: "Skip these contacts" },
        ],
      },
      {
        id: "terms",
        label: "Credit terms",
        description: "Payment terms applied to each customer card",
        suggested: "map",
        options: [
          { value: "map", label: "Map from Xero terms", hint: "Recommended" },
          { value: "default", label: "Use MYOB default (30 days)" },
        ],
      },
    ],
  },
  {
    key: "vendors",
    label: "Vendors",
    fields: [
      f("name", "Contact Name", "Vendor Name", ["Supplier Name", "Display Name"]),
      f("email", "Email Address", "Email", ["Remittance Email"]),
      f("phone", "Phone Number", "Phone", ["Mobile", "Office Phone"]),
      f("address", "Billing Address", "Address", ["Postal Address"]),
    ],
    rules: [
      {
        id: "missing-contact",
        label: "Vendors with missing details",
        description: "Suppliers without an email or phone number",
        suggested: "placeholder",
        options: [
          { value: "placeholder", label: "Import with placeholder", hint: "Recommended" },
          { value: "flag", label: "Import and flag for review" },
          { value: "skip", label: "Skip these vendors" },
        ],
      },
      {
        id: "duplicates",
        label: "Possible duplicates",
        description: "Vendors whose names closely match an existing card",
        suggested: "merge",
        options: [
          { value: "merge", label: "Merge into existing card", hint: "Recommended" },
          { value: "separate", label: "Create separate cards" },
        ],
      },
    ],
  },
  {
    key: "items",
    label: "Items",
    fields: [
      f("name", "Item Name", "Item Name", ["Display Name"]),
      f("code", "Item Code", "Item Code", ["SKU", "Item Number"]),
      f("desc", "Description", "Description", ["Sales Description", "Notes"]),
      f("price", "Unit Price", "Unit Price", ["Base Selling Price", "Standard Cost"]),
    ],
    rules: [
      {
        id: "tracking",
        label: "Inventory tracking",
        description: "Xero tracked items and their quantities",
        suggested: "preserve",
        options: [
          { value: "preserve", label: "Preserve inventory tracking", hint: "Recommended" },
          { value: "flatten", label: "Convert to non-inventoried items" },
        ],
      },
      {
        id: "no-purchase-price",
        label: "Items without purchase price",
        description: "Sales-only items missing buy-side details",
        suggested: "sales-only",
        options: [
          { value: "sales-only", label: "Import as sales-only item", hint: "Recommended" },
          { value: "zero-cost", label: "Import with zero cost" },
        ],
      },
    ],
  },
  {
    key: "sales-orders",
    label: "Sales Orders",
    fields: [
      f("number", "SO Number", "Sales Order Ref", ["Order Number"]),
      f("customer", "Customer", "Customer", ["Customer Card"]),
      f("date", "Date", "Date", ["Order Date"]),
      fr("expiry", "Expiry Date", ["Expiry Date", "Promised Date"]),
      f("lines", "Line Items", "Line Items", ["Item Lines", "Service Lines"]),
      f("total", "Total Amount", "Total Amount", ["Order Total"]),
    ],
    rules: [
      {
        id: "open-orders",
        label: "Open sales orders",
        description: "Orders not yet invoiced at migration time",
        suggested: "orders",
        options: [
          { value: "orders", label: "Migrate as open orders", hint: "Recommended" },
          { value: "quotes", label: "Convert to quotes" },
          { value: "skip", label: "Skip open orders" },
        ],
      },
      {
        id: "numbering",
        label: "Order numbering",
        description: "Document numbers on migrated orders",
        suggested: "keep",
        options: [
          { value: "keep", label: "Keep Xero numbers", hint: "Recommended" },
          { value: "renumber", label: "Let MYOB renumber" },
        ],
      },
    ],
  },
  {
    key: "purchase-orders",
    label: "Purchase Orders",
    fields: [
      f("number", "PO Number", "Purchase Order Ref", ["PO Number"]),
      f("supplier", "Supplier", "Vendor", ["Supplier Card"]),
      f("date", "Date", "Date", ["Order Date"]),
      f("delivery", "Delivery Date", "Delivery Date", ["Promised Date"]),
      f("lines", "Line Items", "Line Items", ["Item Lines", "Service Lines"]),
      f("total", "Total Amount", "Total Amount", ["Order Total"]),
    ],
    rules: [
      {
        id: "open-orders",
        label: "Open purchase orders",
        description: "Orders not yet billed at migration time",
        suggested: "orders",
        options: [
          { value: "orders", label: "Migrate as open orders", hint: "Recommended" },
          { value: "skip", label: "Skip open orders" },
        ],
      },
      {
        id: "numbering",
        label: "Order numbering",
        description: "Document numbers on migrated orders",
        suggested: "keep",
        options: [
          { value: "keep", label: "Keep Xero numbers", hint: "Recommended" },
          { value: "renumber", label: "Let MYOB renumber" },
        ],
      },
    ],
  },
  {
    key: "invoices",
    label: "Invoices",
    fields: [
      f("number", "Invoice Number", "Invoice Ref", ["Invoice Number"]),
      f("customer", "Customer", "Customer", ["Customer Card"]),
      f("issue", "Issue Date", "Date", ["Invoice Date"]),
      f("due", "Due Date", "Due Date", ["Payment Due Date"]),
      f("lines", "Line Items", "Line Items", ["Item Lines", "Service Lines"]),
    ],
    rules: [
      {
        id: "income-account",
        label: "Default income account",
        description: "Where invoice lines post when no account is mapped",
        suggested: "4-1000",
        options: accountOptions(["4-1000", "4-2000", "4-3000"]),
      },
      {
        id: "rounding",
        label: "Rounding differences",
        description: "Cent-level differences from tax recalculation",
        suggested: "6-9000",
        options: accountOptions(["6-9000", "4-3000", "6-1100"]),
      },
      {
        id: "tax-fallback",
        label: "Lines with no tax code",
        description: "Tax treatment when a Xero line has no tax type",
        suggested: "gst",
        options: [
          { value: "gst", label: "Apply GST on Income", hint: "Recommended" },
          { value: "nt", label: "Apply No Tax (N-T)" },
        ],
      },
    ],
  },
  {
    key: "bills",
    label: "Bills",
    fields: [
      fr("number", "Bill Number", ["Expense ID", "Bill Ref", "Purchase Number"]),
      f("supplier", "Supplier", "Vendor", ["Supplier Card"]),
      f("issue", "Issue Date", "Date", ["Bill Date"]),
      f("due", "Due Date", "Due Date", ["Payment Due Date"]),
      f("lines", "Line Items", "Line Items", ["Item Lines", "Service Lines"]),
    ],
    rules: [
      {
        id: "expense-account",
        label: "Default expense account",
        description: "Where bill lines post when no account is mapped",
        suggested: "6-1100",
        options: accountOptions(["6-1100", "6-1200", "6-1300", "5-1000"]),
      },
      {
        id: "rounding",
        label: "Rounding differences",
        description: "Cent-level differences from tax recalculation",
        suggested: "6-9000",
        options: accountOptions(["6-9000", "6-1100"]),
      },
    ],
  },
  {
    key: "invoice-payments",
    label: "Invoice Payments",
    fields: [
      f("id", "Payment ID", "Payment Ref", ["Receipt Number"]),
      f("invoice", "Invoice Number", "Invoice Ref", ["Invoice Number"]),
      f("date", "Payment Date", "Date", ["Deposit Date"]),
      f("amount", "Amount", "Amount", ["Applied Amount"]),
    ],
    rules: [
      {
        id: "deposit-account",
        label: "Deposit to account",
        description: "Bank account receiving migrated customer payments",
        suggested: "1-1100",
        options: accountOptions(["1-1100", "1-1200", "6-9000"]),
      },
      {
        id: "overpayments",
        label: "Overpayments",
        description: "Payments exceeding the invoice balance",
        suggested: "credit",
        options: [
          { value: "credit", label: "Create customer credit", hint: "Recommended" },
          { value: "income", label: "Post to Other Income" },
        ],
      },
    ],
  },
  {
    key: "bill-payments",
    label: "Bill Payments",
    fields: [
      f("id", "Payment ID", "Payment Ref", ["Remittance Number"]),
      f("bill", "Bill Number", "Expense ID", ["Bill Ref"]),
      f("date", "Payment Date", "Date", ["Withdrawal Date"]),
      f("amount", "Amount", "Amount", ["Applied Amount"]),
    ],
    rules: [
      {
        id: "pay-from",
        label: "Pay from account",
        description: "Bank account funding migrated supplier payments",
        suggested: "1-1100",
        options: accountOptions(["1-1100", "6-9000"]),
      },
      {
        id: "discounts",
        label: "Supplier discounts taken",
        description: "Early-payment discounts recorded in Xero",
        suggested: "4-3000",
        options: accountOptions(["4-3000", "6-9000"]),
      },
    ],
  },
  {
    key: "credit-notes",
    label: "Credit Notes",
    fields: [
      f("number", "Credit Note Number", "Credit Ref", ["Adjustment Note Number"]),
      f("customer", "Customer", "Customer", ["Customer Card"]),
      f("issue", "Issue Date", "Date", ["Credit Date"]),
      f("amount", "Amount", "Amount", ["Credit Total"]),
    ],
    rules: [
      {
        id: "unapplied",
        label: "Unapplied credit balances",
        description: "Credit remaining after allocation to invoices",
        suggested: "credit",
        options: [
          { value: "credit", label: "Keep as customer credit", hint: "Recommended" },
          { value: "refund", label: "Record as pending refund" },
        ],
      },
    ],
  },
  {
    key: "bill-credits",
    label: "Bill Credits",
    fields: [
      f("number", "Credit Note Number", "Credit Ref", ["Debit Note Number"]),
      f("supplier", "Supplier", "Vendor", ["Supplier Card"]),
      f("issue", "Issue Date", "Date", ["Credit Date"]),
      f("amount", "Amount", "Amount", ["Credit Total"]),
    ],
    rules: [
      {
        id: "unapplied",
        label: "Unapplied credit balances",
        description: "Credit remaining after allocation to bills",
        suggested: "credit",
        options: [
          { value: "credit", label: "Keep as supplier credit", hint: "Recommended" },
          { value: "expense-offset", label: "Offset against expenses" },
        ],
      },
    ],
  },
  {
    key: "journals",
    label: "Journals",
    fields: [
      f("number", "Journal Number", "Journal Ref", ["General Journal Number"]),
      f("date", "Date", "Date", ["Transaction Date"]),
      f("reference", "Reference", "Reference", ["Memo"]),
      f("lines", "Journal Lines", "Journal Lines", ["GL Lines"]),
    ],
    rules: [
      {
        id: "unbalanced",
        label: "Unbalanced journals",
        description: "Entries whose debits and credits differ after mapping",
        suggested: "6-9000",
        options: accountOptions(["6-9000", "3-1000"]),
      },
      {
        id: "numbering",
        label: "Journal numbering",
        description: "Reference numbers on migrated journals",
        suggested: "keep",
        options: [
          { value: "keep", label: "Keep Xero references", hint: "Recommended" },
          { value: "renumber", label: "Let MYOB renumber" },
        ],
      },
    ],
  },
  {
    key: "attachments",
    label: "Attachments",
    fields: [
      f("name", "File Name", "File Name", ["Document Title"]),
      f("type", "File Type", "File Type", ["Document Category"]),
      f("size", "File Size", "File Size", []),
      fr("linked", "Linked Transaction", ["Linked Record", "In Tray Document"]),
    ],
    rules: [
      {
        id: "large-files",
        label: "Files over 10 MB",
        description: "Attachments exceeding MYOB's upload limit",
        suggested: "compress",
        options: [
          { value: "compress", label: "Compress and migrate", hint: "Recommended" },
          { value: "link", label: "Store externally and link" },
          { value: "skip", label: "Skip large files" },
        ],
      },
      {
        id: "unsupported",
        label: "Unsupported formats",
        description: "File types MYOB cannot store natively",
        suggested: "pdf",
        options: [
          { value: "pdf", label: "Convert to PDF", hint: "Recommended" },
          { value: "skip", label: "Skip unsupported files" },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------------- */

export default function MapData() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "myob"
  const [mounted, setMounted] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Overrides only store deviations from the suggestion — empty means all-auto
  const [fieldOverrides, setFieldOverrides] = useState<Record<string, string>>({})
  const [ruleOverrides, setRuleOverrides] = useState<Record<string, string>>({})
  const [accountOverrides, setAccountOverrides] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        setFieldOverrides(saved.fields ?? {})
        setRuleOverrides(saved.rules ?? {})
        setAccountOverrides(saved.accounts ?? {})
      }
    } catch {
      // corrupted storage — start clean
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ fields: fieldOverrides, rules: ruleOverrides, accounts: accountOverrides }),
    )
  }, [fieldOverrides, ruleOverrides, accountOverrides, hydrated])

  const customCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const cat of CATEGORIES) counts[cat.key] = 0
    for (const key of Object.keys(fieldOverrides)) counts[key.split(":")[0]] += 1
    for (const key of Object.keys(ruleOverrides)) counts[key.split(":")[0]] += 1
    counts["accounts"] += Object.keys(accountOverrides).length
    return counts
  }, [fieldOverrides, ruleOverrides, accountOverrides])

  // Ambiguous mappings the user has not resolved yet
  const reviewCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const cat of CATEGORIES) {
      counts[cat.key] = cat.fields.filter((fl) => fl.needsReview && !fieldOverrides[`${cat.key}:${fl.id}`]).length
    }
    counts["accounts"] += XERO_ACCOUNTS.filter((a) => a.needsReview && !accountOverrides[a.code]).length
    return counts
  }, [fieldOverrides, accountOverrides])

  const totalCustom = Object.values(customCounts).reduce((a, b) => a + b, 0)
  const totalReview = Object.values(reviewCounts).reduce((a, b) => a + b, 0)
  const totalMappings =
    CATEGORIES.reduce((acc, c) => acc + c.fields.length + c.rules.length, 0) + XERO_ACCOUNTS.length

  const resetAll = () => {
    setFieldOverrides({})
    setRuleOverrides({})
    setAccountOverrides({})
  }

  const setOverride = (
    map: Record<string, string>,
    setMap: (m: Record<string, string>) => void,
    key: string,
    value: string,
    suggested: string,
  ) => {
    const next = { ...map }
    if (value === suggested) delete next[key]
    else next[key] = value
    setMap(next)
  }

  const handleNextStep = () => router.push(`/dashboard/new-migration/validate?destination=${destination}`)
  const handlePrevStep = () => router.push(`/dashboard/new-migration/extract?destination=${destination}`)

  /* --- small render helpers ------------------------------------------------ */

  const StatusBadge = ({ state }: { state: "auto" | "custom" | "skipped" | "review" }) => (
    <span
      key={state}
      className={`animate-google-scale-in inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        state === "auto"
          ? "bg-green-500/10 text-green-600"
          : state === "custom"
            ? "bg-primary/10 text-primary"
            : state === "review"
              ? "bg-amber-500/15 text-amber-600 animate-pulse"
              : "bg-amber-500/10 text-amber-600"
      }`}
    >
      {state === "auto" ? (
        <>
          <CheckCircle className="h-3 w-3" /> Auto
        </>
      ) : state === "custom" ? (
        <>
          <PenLine className="h-3 w-3" /> Custom
        </>
      ) : state === "review" ? (
        <>
          <AlertTriangle className="h-3 w-3" /> Needs review
        </>
      ) : (
        <>
          <SkipForward className="h-3 w-3" /> Skipped
        </>
      )}
    </span>
  )

  const ResetButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      title="Reset to suggested"
      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
    >
      <RotateCcw className="h-3.5 w-3.5" />
    </button>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold tracking-tight gradient-text pb-1">New Migration: Xero to MYOB</h1>
            <p className="text-muted-foreground mt-1">
              Review the suggested mapping — every field, account and rule can be remapped to your preference
            </p>
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
                className="absolute inset-0 rounded-full journey-gradient-bg transition-all duration-500"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"
                style={{ width: `${mounted ? 60 : 0}%` }}
              ></div>
              <div className="absolute inset-0 flex">
                {[20, 40, 60, 80].map((segment) => (
                  <div key={segment} className="h-full flex-1 border-r border-background/20" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>

          {/* Step navigation */}
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
                    if (stepNum === 1) router.push(`/dashboard/new-migration/connect?destination=${destination}`)
                    else if (stepNum === 2) handlePrevStep()
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl font-bold tracking-tight text-foreground">
                    <Map className="mr-2.5 h-5 w-5 text-primary" />
                    Step 3: Map Data Fields
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">
                    We've suggested a mapping for everything — change any of it with the dropdowns
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {totalReview > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600">
                      <AlertTriangle className="h-3.5 w-3.5" /> {totalReview} need review
                    </span>
                  )}
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground tabular-nums">
                      {totalCustom} <span className="text-muted-foreground font-normal">of {totalMappings}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">mappings customized</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAll}
                    disabled={totalCustom === 0}
                    className="rounded-lg border-border/60 text-xs"
                  >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset all
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* How mapping works */}
              <div className="animate-fade-in-up rounded-xl border border-border/50 bg-accent/40 p-4" style={{ animationFillMode: "both" }}>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Auto-mapped by AI</div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                        Everything marked <span className="font-semibold text-green-600">Auto</span> is matched and
                        ready — no action needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Needs your decision</div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                        Highlighted rows marked{" "}
                        <span className="font-semibold text-amber-600">Needs review</span> couldn&apos;t be matched
                        confidently — pick the right target from the dropdown.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PenLine className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Remap anything</div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                        Change any dropdown to override the suggestion — rows turn{" "}
                        <span className="font-semibold text-primary">Custom</span>, with per-row reset or{" "}
                        <span className="font-semibold text-foreground">Reset all</span> above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="accounts" className="w-full">
                <TabsList className="mb-6 w-full justify-start rounded-xl p-1 backdrop-blur-md bg-muted border border-border/50 overflow-x-auto">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.key}
                      value={cat.key}
                      className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm whitespace-nowrap"
                    >
                      {cat.label}
                      {reviewCounts[cat.key] > 0 ? (
                        <span className="ml-1.5 inline-flex h-4 min-w-4 animate-pulse items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                          {reviewCounts[cat.key]}
                        </span>
                      ) : customCounts[cat.key] > 0 ? (
                        <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                          {customCounts[cat.key]}
                        </span>
                      ) : null}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {CATEGORIES.map((cat) => (
                  <TabsContent key={cat.key} value={cat.key} className="space-y-4">
                    {/* Field mapping */}
                    <div className="animate-fade-in-up rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6" style={{ animationFillMode: "both" }}>
                      <h3 className="mb-6 text-base font-semibold flex items-center text-foreground">
                        <Map className="mr-2.5 h-5 w-5 text-primary" />
                        Field Mapping
                      </h3>
                      <div className="space-y-1">
                        <div className="grid grid-cols-12 gap-3 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                          <div className="col-span-4">Xero Field</div>
                          <div className="col-span-1"></div>
                          <div className="col-span-5">MYOB Field</div>
                          <div className="col-span-2 text-right">Status</div>
                        </div>

                        {cat.fields.map((field, index) => {
                          const key = `${cat.key}:${field.id}`
                          const override = fieldOverrides[key]
                          const value = override ?? field.suggested
                          const state =
                            value === SKIP
                              ? "skipped"
                              : override
                                ? "custom"
                                : field.needsReview
                                  ? "review"
                                  : "auto"
                          return (
                            <div
                              key={field.id}
                              className={`animate-fade-in-up grid grid-cols-12 items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors duration-300 ${
                                state === "custom"
                                  ? "bg-accent/50"
                                  : state === "skipped"
                                    ? "bg-amber-500/5"
                                    : state === "review"
                                      ? "bg-amber-500/10 ring-1 ring-amber-500/40"
                                      : ""
                              }`}
                              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                            >
                              <div className="col-span-4 flex items-center min-w-0">
                                <div className="mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"></div>
                                <span className="truncate font-medium text-foreground">{field.xero}</span>
                              </div>
                              <div className="col-span-1 flex justify-center">
                                <MoveRight className="h-4 w-4 text-muted-foreground/50" />
                              </div>
                              <div className="col-span-5">
                                <Select
                                  key={value || "unset"}
                                  value={value || undefined}
                                  onValueChange={(v) =>
                                    setOverride(fieldOverrides, setFieldOverrides, key, v, field.suggested)
                                  }
                                >
                                  <SelectTrigger
                                    className={`h-9 rounded-lg bg-card text-sm transition-colors hover:border-primary/40 ${
                                      state === "review"
                                        ? "border-amber-500/60 text-amber-700 dark:text-amber-400"
                                        : "border-border/60"
                                    }`}
                                  >
                                    <SelectValue placeholder="Select MYOB field…" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.suggested && (
                                      <SelectItem value={field.suggested}>{field.suggested} · suggested</SelectItem>
                                    )}
                                    {field.alternates.map((alt) => (
                                      <SelectItem key={alt} value={alt}>
                                        {alt}
                                      </SelectItem>
                                    ))}
                                    <SelectSeparator />
                                    <SelectItem value={SKIP} className="text-amber-600">
                                      Do not migrate this field
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-2 flex items-center justify-end gap-1.5">
                                {(state === "custom" || state === "skipped") && (
                                  <ResetButton
                                    onClick={() =>
                                      setOverride(fieldOverrides, setFieldOverrides, key, field.suggested, field.suggested)
                                    }
                                  />
                                )}
                                <StatusBadge state={state} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Record-level account remapping — Chart of Accounts only */}
                    {cat.key === "accounts" && (
                      <div
                        className="animate-fade-in-up rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6"
                        style={{ animationDelay: "100ms", animationFillMode: "both" }}
                      >
                        <h3 className="mb-1 text-base font-semibold flex items-center text-foreground">
                          <Database className="mr-2.5 h-5 w-5 text-primary" />
                          Account Remapping
                        </h3>
                        <p className="mb-6 text-xs text-muted-foreground">
                          Choose the MYOB account each Xero account will migrate into — the treatment below updates
                          with your selection
                        </p>
                        <div className="space-y-1">
                          <div className="grid grid-cols-12 gap-3 border-b border-border/30 pb-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                            <div className="col-span-4">Xero Account</div>
                            <div className="col-span-1"></div>
                            <div className="col-span-5">MYOB Account</div>
                            <div className="col-span-2 text-right">Status</div>
                          </div>

                          {XERO_ACCOUNTS.map((account, index) => {
                            const override = accountOverrides[account.code]
                            const value = override ?? account.suggested
                            const target = value ? myobAccount(value) : undefined
                            const isCustom = Boolean(override)
                            const state = isCustom ? "custom" : account.needsReview ? "review" : "auto"
                            return (
                              <div
                                key={account.code}
                                className={`animate-fade-in-up rounded-lg px-2 py-2.5 transition-colors duration-300 ${
                                  state === "custom"
                                    ? "bg-accent/50"
                                    : state === "review"
                                      ? "bg-amber-500/10 ring-1 ring-amber-500/40"
                                      : ""
                                }`}
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                              >
                                <div className="grid grid-cols-12 items-center gap-3 text-sm">
                                  <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                                    <span className="shrink-0 rounded bg-[hsl(var(--brand-teal)/0.12)] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-brand-teal">
                                      {account.code}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="truncate font-medium text-foreground">{account.name}</div>
                                      <div className="text-[11px] text-muted-foreground">{account.type}</div>
                                    </div>
                                  </div>
                                  <div className="col-span-1 flex justify-center">
                                    <MoveRight className="h-4 w-4 text-muted-foreground/50" />
                                  </div>
                                  <div className="col-span-5">
                                    <Select
                                      key={value || "unset"}
                                      value={value || undefined}
                                      onValueChange={(v) =>
                                        setOverride(
                                          accountOverrides,
                                          setAccountOverrides,
                                          account.code,
                                          v,
                                          account.suggested,
                                        )
                                      }
                                    >
                                      <SelectTrigger
                                        className={`h-10 rounded-lg bg-card text-sm transition-colors hover:border-primary/40 ${
                                          state === "review"
                                            ? "border-amber-500/60 text-amber-700 dark:text-amber-400"
                                            : "border-border/60"
                                        }`}
                                      >
                                        <SelectValue placeholder="Choose MYOB account…" />
                                      </SelectTrigger>
                                      <SelectContent className="max-h-72">
                                        {ACCOUNT_TYPE_ORDER.map((type) => {
                                          const group = MYOB_ACCOUNTS.filter((a) => a.type === type)
                                          if (group.length === 0) return null
                                          return (
                                            <SelectGroup key={type}>
                                              <SelectLabel>{type}</SelectLabel>
                                              {group.map((a) => (
                                                <SelectItem key={a.code} value={a.code}>
                                                  <span className="font-mono text-xs">{a.code}</span> · {a.name}
                                                  {a.code === account.suggested ? " · suggested" : ""}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>
                                          )
                                        })}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                                    {isCustom && (
                                      <ResetButton
                                        onClick={() =>
                                          setOverride(
                                            accountOverrides,
                                            setAccountOverrides,
                                            account.code,
                                            account.suggested,
                                            account.suggested,
                                          )
                                        }
                                      />
                                    )}
                                    <StatusBadge state={state} />
                                  </div>
                                </div>
                                {target ? (
                                  <div
                                    key={value}
                                    className="animate-google-fade-in mt-1.5 ml-[37px] text-[11px] text-muted-foreground"
                                  >
                                    Treated in MYOB as{" "}
                                    <span className="font-semibold text-primary">{target.type}</span> · Tax code:{" "}
                                    <span className="font-semibold text-primary">{target.tax}</span>
                                  </div>
                                ) : (
                                  <div className="mt-1.5 ml-[37px] flex items-center gap-1.5 text-[11px] font-medium text-amber-600">
                                    <AlertTriangle className="h-3 w-3" />
                                    AI couldn&apos;t match this account — choose the MYOB account it should migrate
                                    into
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Treatment rules */}
                    <div
                      className="animate-fade-in-up rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md p-6"
                      style={{ animationDelay: "150ms", animationFillMode: "both" }}
                    >
                      <h3 className="mb-1 text-base font-semibold flex items-center text-foreground">
                        <Settings2 className="mr-2.5 h-5 w-5 text-primary" />
                        How MYOB Will Treat {cat.label}
                      </h3>
                      <p className="mb-6 text-xs text-muted-foreground">
                        Behavior applied during import — change any rule to control the outcome in MYOB
                      </p>
                      <div className="space-y-4">
                        {cat.rules.map((rule, index) => {
                          const key = `${cat.key}:${rule.id}`
                          const value = ruleOverrides[key] ?? rule.suggested
                          const isCustom = Boolean(ruleOverrides[key])
                          return (
                            <div
                              key={rule.id}
                              className={`animate-fade-in-up flex flex-col gap-3 rounded-lg px-2 py-2.5 sm:flex-row sm:items-center sm:justify-between transition-colors duration-300 ${
                                isCustom ? "bg-accent/50" : ""
                              }`}
                              style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
                            >
                              <div className="min-w-0 pr-4">
                                <div className="text-sm font-medium text-foreground">{rule.label}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{rule.description}</div>
                              </div>
                              <div className="flex shrink-0 items-center gap-1.5">
                                {isCustom && (
                                  <ResetButton
                                    onClick={() =>
                                      setOverride(ruleOverrides, setRuleOverrides, key, rule.suggested, rule.suggested)
                                    }
                                  />
                                )}
                                <Select
                                  value={value}
                                  onValueChange={(v) =>
                                    setOverride(ruleOverrides, setRuleOverrides, key, v, rule.suggested)
                                  }
                                >
                                  <SelectTrigger className="h-9 w-[260px] rounded-lg border-border/60 bg-card text-sm transition-colors hover:border-primary/40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {rule.options.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                        {opt.value === rule.suggested && opt.hint !== "Recommended" ? " · suggested" : ""}
                                        {opt.hint === "Recommended" ? " · recommended" : ""}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <StatusBadge state={isCustom ? "custom" : "auto"} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-border/30 pt-6 mt-4">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="rounded-xl border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <div className="flex items-center gap-4">
                {totalReview > 0 ? (
                  <span className="animate-google-fade-in hidden items-center gap-1.5 text-xs font-medium text-amber-600 sm:inline-flex">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Resolve the {totalReview} highlighted mapping{totalReview === 1 ? "" : "s"} to continue
                  </span>
                ) : totalCustom > 0 ? (
                  <span className="animate-google-fade-in hidden text-xs text-muted-foreground sm:inline">
                    <span className="font-semibold text-primary">{totalCustom}</span> custom mapping
                    {totalCustom === 1 ? "" : "s"} will be applied during import
                  </span>
                ) : null}
                <Button
                  onClick={handleNextStep}
                  disabled={totalReview > 0}
                  className="google-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Validation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
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
