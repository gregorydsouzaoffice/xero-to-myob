export function SageLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <rect width="40" height="40" rx="8" fill="#00DC06" />
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#00871E" />
        <path
          d="M16 20L18.5 22.5L24 17"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
