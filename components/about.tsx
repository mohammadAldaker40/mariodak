"use client"

import { useI18n } from "@/lib/i18n"

export function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative animate-fade-in-up">
            <div className="aspect-3/4 relative overflow-hidden rounded-2xl warm-shadow-lg">
              <img
                src="/professional-architect-in-natural-light-with-wood-.jpg"
                alt="Maria Al-daker"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up animation-delay-200">
            <div>
              <p className="text-sm tracking-widest text-accent-warm uppercase mb-4 font-medium">{t("navigation.about")}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
                {t("about.heading")}
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            <div className="pt-4 border-l-4 border-accent pl-6 bg-card/50 p-6 rounded-xl">
              <h3 className="text-sm tracking-widest text-accent-warm uppercase mb-4 font-medium">{t("about.designApproachLabel")}</h3>
              <p className="text-foreground leading-relaxed italic text-lg">
                "{t("about.designApproachQuote")}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
