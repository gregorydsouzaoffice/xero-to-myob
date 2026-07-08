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
