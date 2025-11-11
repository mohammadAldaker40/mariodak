"use client"

import { useEffect, useRef } from "react"

export function Marquee() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // no-op; CSS handles marquee
  }, [])

  const words = ["Designs", "Branding", "Motion", "Animations", "Visuals", "Photography", "Films", "Audios", "Prints", "Creatives"]

  return (
    <section className="py-8 md:py-10 overflow-hidden border-t border-border/40 border-b bg-card/50">
      <div ref={ref} className="whitespace-nowrap marquee group">
        <div className="inline-flex items-center gap-8 md:gap-12 tracking-wide text-muted-foreground text-sm md:text-base will-change-transform">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 md:gap-12">
              {words.map((w) => (
                <span key={`${i}-${w}`} className="uppercase hover:text-accent-warm transition-colors duration-300">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}


