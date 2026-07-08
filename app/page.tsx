import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, FileSpreadsheet } from "lucide-react"
import Header from "./header"
import HeroSection from "./hero-section"
import { Button } from "@/components/ui/button"
import LogoCarousel from "./components/logo-carousel"

export const metadata: Metadata = {
  title: "Data Migration Tool | Xero to MYOB",
  description: "Enterprise-grade data migration from Xero to MYOB",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      <main className="flex-1 relative z-10">
        {/* Features Section */}
        <section id="features" className="w-full py-32 bg-background relative z-10">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
              <div className="space-y-4">
                <h2 className="google-display-medium gradient-text animate-google-fade-in">How It Works</h2>
                <p className="max-w-2xl google-body-large text-muted-foreground animate-google-fade-in animate-delay-150">
                  Our migration process is designed to be simple, secure, and accurate with enterprise-grade reliability
                </p>
              </div>
            </div>
            <div className="grid max-w-6xl mx-auto grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="google-card animate-google-slide-up">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="google-title-large">Visual Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="google-body-medium text-muted-foreground leading-relaxed">
                    Intuitive dashboard with real-time progress tracking and beautiful data visualizations
                  </p>
                </CardContent>
              </Card>
              <Card className="google-card animate-google-slide-up animate-delay-150">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg shadow-lg">
                    <FileSpreadsheet className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="google-title-large">Smart Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="google-body-medium text-muted-foreground leading-relaxed">
                    Interactive field mapping with AI-powered suggestions and validation checks
                  </p>
                </CardContent>
              </Card>
              <Card className="google-card animate-google-slide-up animate-delay-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="google-title-large">Live Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="google-body-medium text-muted-foreground leading-relaxed">
                    Beautiful progress animations and real-time status updates during migration
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* "Trusted by" Section */}
        <section className="w-full py-32 google-gradient">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="google-display-medium gradient-text animate-google-fade-in">
                  Trusted by Leading Accounting Firms
                </h2>
                <p className="max-w-2xl google-body-large text-muted-foreground animate-google-fade-in animate-delay-150">
                  Join hundreds of businesses that have successfully migrated their financial data
                </p>
              </div>
              <div className="animate-google-scale-in animate-delay-300">
                <LogoCarousel />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-card/50 backdrop-blur-sm py-12">
        <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <p className="google-body-medium text-muted-foreground">© 2025 MYOB. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground/70">Powered by</span>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ihUWFePEscYTEzqlHMJoc9mU9oDjxU.png"
                alt="MMC Convert"
                className="h-5 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-primary/10 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
