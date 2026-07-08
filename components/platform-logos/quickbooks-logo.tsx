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
          fill="white"
        />
        <path d="M20 12V28M12 20H28" stroke="#2CA01C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
