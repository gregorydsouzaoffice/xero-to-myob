"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { KeyRound, Loader2, User } from "lucide-react"

// Replica of the real MYOB sign-in screen (id.myob.com) for a convincing demo
const MYOB_PURPLE = "#7C1FF2"
const MYOB_PURPLE_DARK = "#6812D6"

export default function MYOBLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "xero"
  const [email, setEmail] = useState("kylie.farr@myob.com")
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handlePasswordSignIn = () => {
    if (isSigningIn) return
    setIsSigningIn(true)
    setTimeout(() => {
      router.push(`/login/myob/password?source=${source}&email=${encodeURIComponent(email)}`)
    }, 600)
  }

  // Passkey skips the password step, like the real thing
  const handlePasskeySignIn = () => {
    if (isSigningIn) return
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

          {/* Outlined email field with floating label, MYOB-style */}
          <div className="relative mt-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSignIn()}
              autoComplete="email"
              className="peer h-[72px] w-full rounded-xl border-2 bg-white px-4 pt-3 text-base text-gray-900 outline-none transition-colors duration-200"
              style={{ borderColor: MYOB_PURPLE }}
            />
            <label
              className="pointer-events-none absolute -top-2.5 left-4 bg-white px-1.5 text-[15px] font-medium"
              style={{ color: MYOB_PURPLE }}
            >
              Email address*
            </label>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-4 w-fit text-[15px] font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: MYOB_PURPLE }}
          >
            Can&apos;t log in to your account?
          </a>

          {/* Primary CTA */}
          <button
            onClick={handlePasswordSignIn}
            disabled={isSigningIn}
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
              "Sign in with password"
            )}
          </button>

          {/* OR divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm font-medium text-gray-800">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Passkey option */}
          <button
            onClick={handlePasskeySignIn}
            disabled={isSigningIn}
            className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white text-lg font-medium text-gray-900 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] disabled:opacity-60"
          >
            <span className="relative inline-flex" style={{ color: MYOB_PURPLE }}>
              <User className="h-5 w-5" fill="currentColor" />
              <KeyRound className="absolute -bottom-1 -right-1.5 h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            Sign in with passkey
          </button>

          <div className="mt-6 text-center text-[15px] text-gray-900">
            Don&apos;t have a passkey?
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-1 block font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
              style={{ color: MYOB_PURPLE }}
            >
              Learn how to add one
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
