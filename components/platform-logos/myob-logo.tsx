export function MYOBLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size * 4, height: size }}>
      <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" width={size * 4} height={size}>
        <text x="0" y="28" fill="#5F259F" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold">
          MYOB
        </text>
      </svg>
    </div>
  )
}
