"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

// Replica of the real MYOB password step (id.myob.com) for a convincing demo
const MYOB_PURPLE = "#7C1FF2"
const MYOB_PURPLE_DARK = "#6812D6"

export default function MYOBPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const email = searchParams.get("email") || "kylie.farr@myob.com"

  const [password, setPassword] = useState("myob-demo-2026")
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSignIn = () => {
    if (isSigningIn || password.length === 0) return
    setIsSigningIn(true)
    setTimeout(() => {
      router.push(`/login/myob/mfa?source=${source}`)
    }, 900)
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f4f4f5] p-4 pt-10 sm:pt-16">
      <div
        className="animate-fade-in-up w-full max-w-[620px] rounded-2xl bg-white px-6 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] sm:px-12"
        style={{ animationFillMode: "both" }}
      >
        <div className="mx-auto flex max-w-[470px] flex-col">
          {/* Logo */}
          <img src="/images/myob-logo.png" alt="MYOB" className="mx-auto h-12 w-auto" />

          <h1 className="mt-9 text-center text-[30px] font-medium leading-tight text-gray-900">Sign in to MYOB</h1>

          {/* Confirmed email with Edit link */}
          <div className="mt-10 flex h-[64px] items-center justify-between rounded-xl border border-gray-300 bg-white px-4">
            <span className="truncate text-base text-gray-900">{email}</span>
            <Link
              href={`/login/myob?source=${source}`}
              className="ml-3 shrink-0 text-[15px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
              style={{ color: MYOB_PURPLE }}
            >
              Edit
            </Link>
          </div>

          {/* Outlined password field with floating label and visibility toggle */}
          <div className="relative mt-5">
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
              autoComplete="current-password"
              className="peer h-[72px] w-full rounded-xl border-2 bg-white py-3 pl-4 pr-12 text-base text-gray-900 outline-none transition-colors duration-200"
              style={{ borderColor: MYOB_PURPLE }}
            />
            <label
              className="pointer-events-none absolute -top-2.5 left-4 bg-white px-1.5 text-[15px] font-medium"
              style={{ color: MYOB_PURPLE }}
            >
              Password*
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 transition-colors hover:text-gray-900"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-4 w-fit text-[15px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: MYOB_PURPLE }}
          >
            Forgotten your password?
          </a>

          {/* Primary CTA */}
          <button
            onClick={handleSignIn}
            disabled={isSigningIn || password.length === 0}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-lg text-lg font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] disabled:opacity-80"
            style={{ backgroundColor: isSigningIn ? MYOB_PURPLE_DARK : MYOB_PURPLE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MYOB_PURPLE_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSigningIn ? MYOB_PURPLE_DARK : MYOB_PURPLE)}
          >
            {isSigningIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <Link
            href={`/login/myob?source=${source}`}
            className="mx-auto mt-7 text-[15px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: MYOB_PURPLE }}
          >
            Use another method
          </Link>
        </div>
      </div>
    </div>
  )
}
