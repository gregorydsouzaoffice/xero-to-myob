export { XeroLogo } from "./xero-logo"
export { QuickBooksLogo } from "./quickbooks-logo"
export { SageLogo } from "./sage-logo"
export { MYOBLogo } from "./myob-logo"
export { FreeAgentLogo } from "./freeagent-logo"

// Add more generic platform logos for other accounting software
export function IrisLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#6A1B9A" />
        <circle cx="20" cy="20" r="8" fill="#9C27B0" />
        <circle cx="20" cy="20" r="4" fill="#E1BEE7" />
        <path d="M20 12V16M20 24V28M12 20H16M24 20H28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function OdooLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#714B67" />
        <circle cx="16" cy="20" r="4" fill="#A24689" />
        <circle cx="24" cy="20" r="4" fill="#A24689" />
        <path d="M16 16V24M24 16V24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function ZohoLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#F44336" />
        <path d="M12 16H28L12 24H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function XLedgerLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#1976D2" />
        <path d="M14 14L26 26M14 26L26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function AccountsIQLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#009688" />
        <path d="M20 12V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 16L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 20L26 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 24L26 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function NomiLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#FF9800" />
        <path d="M14 14L14 26L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 20H20M20 14V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function KashflowLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#4CAF50" />
        <path d="M14 14V26H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 20H22L26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
