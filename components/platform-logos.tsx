export function XeroLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#13B5EA" />
        <path
          d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20Z"
          fill="#0B2E4F"
        />
        <path d="M15 15L25 25M15 25L25 15" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function QuickBooksLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#2CA01C" />
        <path
          d="M12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28C15.582 28 12 24.418 12 20Z"
          fill="#FFFFFF"
        />
        <path
          d="M16 20C16 17.791 17.791 16 20 16C22.209 16 24 17.791 24 20C24 22.209 22.209 24 20 24C17.791 24 16 22.209 16 20Z"
          fill="#2CA01C"
        />
      </svg>
    </div>
  )
}

export function SageLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#00DC06" />
        <path
          d="M10 20L15 15H25L30 20L25 25H15L10 20Z"
          fill="#00A400"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function FreeAgentLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#FF5722" />
        <path d="M10 15H30V25H10V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 20H25" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function MYOBLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#5F259F" />
        <text x="6" y="26" fill="white" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold">
          M
        </text>
      </svg>
    </div>
  )
}
