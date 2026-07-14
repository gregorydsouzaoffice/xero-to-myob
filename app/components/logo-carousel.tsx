const firms = ["KPMG", "Deloitte", "PwC", "EY", "Grant Thornton", "RSM", "BDO", "Mazars"]

/**
 * Seamless marquee: the track holds two identical lists and shifts by exactly
 * 50% of its own width, so the loop never jumps. Pauses on hover; edges fade
 * out via .marquee-mask.
 */
export default function LogoCarousel() {
  const list = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex items-center gap-8 pr-8 md:gap-14 md:pr-14"
    >
      {firms.map((firm) => (
        <li key={firm} className="flex-shrink-0">
          <div className="flex items-center justify-center rounded-xl border border-border/60 bg-card px-6 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary">
              {firm}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee-mask marquee-paused mt-12 w-full overflow-hidden">
      <div className="animate-marquee flex w-max">
        {list(false)}
        {list(true)}
      </div>
    </div>
  )
}
