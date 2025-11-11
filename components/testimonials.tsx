"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { storage } from "@/lib/storage"
import { useI18n } from "@/lib/i18n"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  image: string
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const { t } = useI18n()

  useEffect(() => {
    const loadedTestimonials = storage.getTestimonials()
    setTestimonials(loadedTestimonials)
  }, [])

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm tracking-widest text-accent-warm uppercase mb-4">{t("testimonialsSection.label")}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
            {t("testimonialsSection.heading")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-warm text-accent-warm" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
