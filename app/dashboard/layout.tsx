import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronDown, LogOut, User } from "../components/icons"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MYOBLogo from "../components/mmc-logo"
import PageTransition from "../components/page-transition"

export const metadata: Metadata = {
  title: "Dashboard | MYOB Migration Tool",
  description: "Data migration dashboard for Xero to MYOB",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-20 items-center gap-6 border-b border-border/50 bg-card/80 backdrop-blur-xl px-6 md:px-8 shadow-sm">
        <div className="transition-transform duration-200 hover:scale-105">
          <MYOBLogo size="sm" />
        </div>

        <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-muted-foreground">Powered by</span>
          <Link
            href="https://mmcconvert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ihUWFePEscYTEzqlHMJoc9mU9oDjxU.png"
              alt="MMC Convert"
              width={80}
              height={24}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden flex-1 md:flex">
          <Link
            href="/dashboard/new-migration"
            className="flex h-full items-center px-6 text-sm font-medium text-foreground/80 transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-lg"
          >
            Migration
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4 md:flex-none">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative h-10 gap-2 rounded-xl bg-card/50 border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-200 hover:scale-105"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">LS</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">Kylie Farr</span>
                <ChevronDown className="h-4 w-4 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card/95 backdrop-blur-xl border-border/50 shadow-xl rounded-xl"
            >
              <DropdownMenuLabel className="font-medium text-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem asChild className="rounded-lg transition-colors duration-200">
                <Link href="/dashboard/account" className="flex items-center">
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem
                asChild
                className="rounded-lg transition-colors duration-200 text-destructive focus:text-destructive"
              >
                <Link href="/login" className="flex items-center">
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-background">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
