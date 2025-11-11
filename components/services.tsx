"use client"

import { Card } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

export function Services() {
  const { messages } = useI18n()
  const items = messages.services
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm tracking-widest text-accent-warm uppercase mb-4 font-medium">
            Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">What We Do</h2>
          <p className="text-muted-foreground">
            We craft striking visuals across brand, motion, and content—designed to leave a lasting impression.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <Card
              key={s.title}
              className="p-6 bg-card/60 border-border/40 hover:bg-card transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <h3 className="font-serif text-2xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
 

