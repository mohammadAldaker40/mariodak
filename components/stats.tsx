"use client"

import { useI18n } from "@/lib/i18n"

export function Stats() {
  const { messages } = useI18n()
  const items = messages.stats
  return (
    <section className="py-16 md:py-20 bg-secondary/20 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((it, i) => (
            <div key={it.label} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="font-serif text-4xl md:text-5xl text-accent-warm">{it.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 

