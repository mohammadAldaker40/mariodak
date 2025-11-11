// @ts-nocheck
"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { t, messages } = useI18n()

  useEffect(() => {
    let cleanup: (() => void) | undefined
    if (typeof window !== "undefined") {
      const loadGsap = () => (new Function("m", "return import(m)"))("gsap") as Promise<any>
      loadGsap()
        .then((mod) => {
          const gs = mod?.gsap ?? mod?.default
          if (!gs) return
          const ctx = gs.context(() => {
            gs.fromTo(
              ".hero-headline",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
            )
            gs.fromTo(
              ".hero-sub",
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15 }
            )
            gs.fromTo(
              ".hero-cta",
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.3 }
            )
          }, sectionRef)
          cleanup = () => ctx.revert()
        })
        .catch(() => {
          // GSAP not available (likely not installed yet) — fail silently
        })
    }
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/warm-sunlit-modern-architecture-with-natural-wood-.jpg"
          alt="Architecture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div>
          <h1 className="hero-headline font-serif text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 tracking-tight text-balance">
            {messages.hero.name}
          </h1>
          <p className="hero-sub text-lg md:text-xl text-accent-warm tracking-wide mb-8 max-w-2xl mx-auto font-medium">
            {t("hero.title")}
          </p>
          <p className="hero-sub text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            {t("hero.tagline")}
          </p>
        </div>

        <button
          onClick={scrollToAbout}
          className="hero-cta inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border-2 border-accent hover:bg-accent hover:border-accent-warm transition-all duration-300 hover:scale-110 warm-shadow"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-5 w-5 text-accent-warm animate-bounce" />
        </button>
      </div>
    </section>
  )
}
