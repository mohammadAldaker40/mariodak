"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useI18n } from "@/lib/i18n"

type Project = {
  id: string
  title: string
  description: string
  category: string
  image: string
}

type ProjectsGalleryProps = {
  projects: Project[]
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { t } = useI18n()

  const categories = [
    { id: "all", label: t("portfolio.categories.all") },
    { id: "residential", label: t("portfolio.categories.residential") },
    { id: "commercial", label: t("portfolio.categories.commercial") },
    { id: "interior", label: t("portfolio.categories.interior") },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <p className="text-sm tracking-widest text-accent-warm uppercase mb-4 font-medium">{t("portfolio.label")}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
            {t("portfolio.heading")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("portfolio.intro")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full transition-all duration-300 hover:scale-105"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl warm-shadow hover:warm-shadow-lg transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-4/5 relative overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-accent-warm/90 via-accent-warm/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs tracking-widest uppercase mb-2 opacity-90 font-medium">{project.category}</p>
                <h3 className="font-serif text-2xl mb-2 text-balance">{project.title}</h3>
                <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-95 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
