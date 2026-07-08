export function FreeAgentLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#FF5722" />
        <path d="M14 14H26V26H14V14Z" fill="#E64A19" />
        <path d="M20 14V26M14 20H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 16L24 24M16 24L24 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
