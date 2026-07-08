"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Database,
  Plus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  Edit,
  Key,
  Lock,
  ExternalLink,
  Search,
} from "lucide-react"

// Import the platform logo components
import { XeroLogo, QuickBooksLogo, SageLogo, FreeAgentLogo } from "@/components/platform-logos"
import MYOBLogo from "@/app/components/mmc-logo"

// Sample connection data
const connections = [
  {
    id: "conn-1",
    name: "Xero Production",
    platform: "Xero",
    type: "source",
    status: "active",
    lastUsed: "2 hours ago",
    icon: "https://www.xero.com/content/dam/xero/pilot-images/brand/logo-blue.svg",
    color: "blue",
  },
  {
    id: "conn-2",
    name: "Xero Sandbox",
    platform: "Xero",
    type: "source",
    status: "active",
    lastUsed: "5 days ago",
    icon: "https://www.xero.com/content/dam/xero/pilot-images/brand/logo-blue.svg",
    color: "blue",
  },
  {
    id: "conn-3",
    name: "MYOB Production",
    platform: "MYOB",
    type: "destination",
    status: "active",
    lastUsed: "2 hours ago",
    icon: "/images/myob-logo.png",
    color: "blue",
  },
  {
    id: "conn-4",
    name: "QuickBooks Online",
    platform: "QuickBooks",
    type: "source",
    status: "expired",
    lastUsed: "30 days ago",
    icon: "https://quickbooks.intuit.com/cas/dam/IMAGE/A2Kh1bm0F/intuit-quickbooks-logo.svg",
    color: "green",
  },
  {
    id: "conn-5",
    name: "Sage Business Cloud",
    platform: "Sage",
    type: "source",
    status: "active",
    lastUsed: "15 days ago",
    icon: "https://www.sage.com/en-gb/-/media/images/logos/sage_logo.svg",
    color: "emerald",
  },
]

// Available platforms for new connections
const availablePlatforms = [
  {
    id: "xero",
    name: "Xero",
    icon: "https://www.xero.com/content/dam/xero/pilot-images/brand/logo-blue.svg",
    color: "blue",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    icon: "https://quickbooks.intuit.com/cas/dam/IMAGE/A2Kh1bm0F/intuit-quickbooks-logo.svg",
    color: "green",
  },
  {
    id: "sage",
    name: "Sage",
    icon: "https://www.sage.com/en-gb/-/media/images/logos/sage_logo.svg",
    color: "emerald",
  },
  {
    id: "myob",
    name: "MYOB",
    icon: "/images/myob-logo.png",
    color: "blue",
  },
  {
    id: "freeagent",
    name: "FreeAgent",
    icon: "https://www.freeagent.com/components/shared/svgs/logo-freeagent.svg",
    color: "red",
  },
  {
    id: "myob",
    name: "MYOB",
    icon: "https://www.myob.com/content/dam/public-website/images/logos/myob-logo.svg",
    color: "amber",
  },
  {
    id: "freshbooks",
    name: "FreshBooks",
    icon: "https://www.freshbooks.com/wp-content/uploads/2022/04/freshbooks-logo.svg",
    color: "cyan",
  },
  {
    id: "wave",
    name: "Wave",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Wave_logo.svg",
    color: "teal",
  },
]

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConnection, setSelectedConnection] = useState(null)

  // Filter connections based on active tab and search query
  const filteredConnections = connections.filter((conn) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "source" && conn.type === "source") ||
      (activeTab === "destination" && conn.type === "destination")

    const matchesSearch =
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.platform.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container py-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="mr-2 h-7 w-7 rounded-full bg-background/70 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight gradient-text">Connections</h1>
              <p className="text-muted-foreground">Manage your connections to accounting platforms</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 hover:opacity-90 transition-opacity">
                  <Plus className="mr-2 h-4 w-4" /> Add Connection
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] backdrop-blur-md bg-background/70 border border-white/10 rounded-xl">
                <DialogHeader>
                  <DialogTitle>Add New Connection</DialogTitle>
                  <DialogDescription>Connect to an accounting platform to import or export data.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Select Platform</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availablePlatforms.map((platform) => (
                        <div
                          key={platform.id}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all"
                        >
                          <div
                            className={`h-12 w-12 rounded-xl bg-${platform.color}-500/10 border border-${platform.color}-500/20 flex items-center justify-center`}
                          >
                            {platform.name === "Xero" ? (
                              <XeroLogo className="h-8 w-8" />
                            ) : platform.name === "MYOB" ? (
                              <MYOBLogo className="h-8 w-8" />
                            ) : platform.name === "QuickBooks" ? (
                              <QuickBooksLogo className="h-8 w-8" />
                            ) : platform.name === "Sage" ? (
                              <SageLogo className="h-8 w-8" />
                            ) : platform.name === "FreeAgent" ? (
                              <FreeAgentLogo className="h-8 w-8" />
                            ) : (
                              <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="h-8 w-8" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{platform.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Connection Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Xero Production"
                      className="bg-background/50 border-white/10 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Connection Type</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="source"
                          name="type"
                          className="h-4 w-4 text-primary border-white/20"
                          defaultChecked
                        />
                        <Label htmlFor="source" className="font-normal">
                          Source (Import From)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="destination"
                          name="type"
                          className="h-4 w-4 text-primary border-white/20"
                        />
                        <Label htmlFor="destination" className="font-normal">
                          Destination (Export To)
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sandbox">Use Sandbox Environment</Label>
                      <Switch id="sandbox" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Connect to a sandbox environment for testing purposes.
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" className="rounded-lg border-white/20 bg-transparent">
                    Cancel
                  </Button>
                  <Button className="rounded-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
                    Continue to Authorization
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="rounded-xl p-1 backdrop-blur-md bg-background/70 border border-white/10">
                  <TabsTrigger
                    value="all"
                    className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    All Connections
                  </TabsTrigger>
                  <TabsTrigger
                    value="source"
                    className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Sources
                  </TabsTrigger>
                  <TabsTrigger
                    value="destination"
                    className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Destinations
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search connections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background/50 border-white/10 focus-visible:ring-primary rounded-xl w-full md:w-[250px]"
                  />
                </div>
              </div>
            </div>

            <Card className="backdrop-blur-md bg-background/70 rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Your Connections
                </CardTitle>
                <CardDescription>Manage your connections to accounting platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredConnections.length > 0 ? (
                    filteredConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-12 w-12 rounded-xl bg-${connection.color}-500/10 border border-${connection.color}-500/20 flex items-center justify-center`}
                          >
                            {connection.platform === "Xero" ? (
                              <XeroLogo className="h-8 w-8" />
                            ) : connection.platform === "MYOB" ? (
                              <MYOBLogo className="h-8 w-8" />
                            ) : connection.platform === "QuickBooks" ? (
                              <QuickBooksLogo className="h-8 w-8" />
                            ) : connection.platform === "Sage" ? (
                              <SageLogo className="h-8 w-8" />
                            ) : (
                              <img
                                src={connection.icon || "/placeholder.svg"}
                                alt={connection.platform}
                                className="h-8 w-8"
                              />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{connection.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>{connection.platform}</span>
                              <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                              <span className="capitalize">{connection.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                          <div className="flex items-center">
                            {connection.status === "active" ? (
                              <div className="flex items-center text-green-500 text-sm">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Active
                              </div>
                            ) : connection.status === "expired" ? (
                              <div className="flex items-center text-amber-500 text-sm">
                                <XCircle className="mr-1 h-4 w-4" />
                                Expired
                              </div>
                            ) : (
                              <div className="flex items-center text-red-500 text-sm">
                                <XCircle className="mr-1 h-4 w-4" />
                                Error
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg border-white/20 hover:bg-primary/5 hover:text-primary h-8 px-2 bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg border-white/20 hover:bg-primary/5 hover:text-primary h-8 px-2 bg-transparent"
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Refresh</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg border-white/20 hover:bg-red-100 hover:text-red-500 h-8 px-2 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                        <Database className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No connections found</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        {searchQuery
                          ? `No connections match "${searchQuery}"`
                          : "Add a connection to get started with data migration"}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="rounded-xl bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
                            <Plus className="mr-2 h-4 w-4" /> Add Connection
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] backdrop-blur-md bg-background/70 border border-white/10 rounded-xl">
                          <DialogHeader>
                            <DialogTitle>Add New Connection</DialogTitle>
                            <DialogDescription>
                              Connect to an accounting platform to import or export data.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-6 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="platform">Select Platform</Label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {availablePlatforms.map((platform) => (
                                  <div
                                    key={platform.id}
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all"
                                  >
                                    <div
                                      className={`h-12 w-12 rounded-xl bg-${platform.color}-500/10 border border-${platform.color}-500/20 flex items-center justify-center`}
                                    >
                                      {platform.name === "Xero" ? (
                                        <XeroLogo className="h-8 w-8" />
                                      ) : platform.name === "MYOB" ? (
                                        <MYOBLogo className="h-8 w-8" />
                                      ) : platform.name === "QuickBooks" ? (
                                        <QuickBooksLogo className="h-8 w-8" />
                                      ) : platform.name === "Sage" ? (
                                        <SageLogo className="h-8 w-8" />
                                      ) : platform.name === "FreeAgent" ? (
                                        <FreeAgentLogo className="h-8 w-8" />
                                      ) : (
                                        <img
                                          src={platform.icon || "/placeholder.svg"}
                                          alt={platform.name}
                                          className="h-8 w-8"
                                        />
                                      )}
                                    </div>
                                    <span className="text-sm font-medium">{platform.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="name">Connection Name</Label>
                              <Input
                                id="name"
                                placeholder="e.g. Xero Production"
                                className="bg-background/50 border-white/10 focus-visible:ring-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="type">Connection Type</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="source"
                                    name="type"
                                    className="h-4 w-4 text-primary border-white/20"
                                    defaultChecked
                                  />
                                  <Label htmlFor="source" className="font-normal">
                                    Source (Import From)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="destination"
                                    name="type"
                                    className="h-4 w-4 text-primary border-white/20"
                                  />
                                  <Label htmlFor="destination" className="font-normal">
                                    Destination (Export To)
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="sandbox">Use Sandbox Environment</Label>
                                <Switch id="sandbox" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Connect to a sandbox environment for testing purposes.
                              </p>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" className="rounded-lg border-white/20 bg-transparent">
                              Cancel
                            </Button>
                            <Button className="rounded-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
                              Continue to Authorization
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-background/70 rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5 text-primary" />
                  API Keys
                </CardTitle>
                <CardDescription>Manage your API keys for direct integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Key className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <div className="font-medium">Production API Key</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>••••••••••••••••</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Show
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <div className="flex items-center text-green-500 text-sm">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Active
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-white/20 hover:bg-primary/5 hover:text-primary h-8 bg-transparent"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Key className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">Sandbox API Key</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>••••••••••••••••</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Show
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <div className="flex items-center text-green-500 text-sm">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Active
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg border-white/20 hover:bg-primary/5 hover:text-primary h-8 bg-transparent"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="rounded-xl border-white/20 hover:bg-primary/5 hover:text-primary bg-transparent"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Manage API Security
                </Button>
              </CardFooter>
            </Card>

            <Card className="backdrop-blur-md bg-background/70 rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="mr-2 h-5 w-5 text-primary" />
                  Connection Resources
                </CardTitle>
                <CardDescription>Helpful resources for setting up and troubleshooting connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-all">
                    <h3 className="font-medium mb-2">Xero API Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Official documentation for the Xero API, including authentication and endpoints.
                    </p>
                    <Button variant="outline" size="sm" className="rounded-lg border-white/20 w-full bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Documentation
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-all">
                    <h3 className="font-medium mb-2">QuickBooks API Guide</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive guide to using the QuickBooks API for data integration.
                    </p>
                    <Button variant="outline" size="sm" className="rounded-lg border-white/20 w-full bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 hover:border-primary/20 hover:bg-primary/5 transition-all">
                    <h3 className="font-medium mb-2">Troubleshooting Connections</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Common issues and solutions for connection problems.
                    </p>
                    <Button variant="outline" size="sm" className="rounded-lg border-white/20 w-full bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Help Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
