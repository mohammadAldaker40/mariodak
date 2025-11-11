"use client"

import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectsGallery } from "@/components/projects-gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { storage } from "@/lib/storage"
import { Marquee } from "@/components/marquee"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"

type Project = {
  id: string
  title: string
  description: string
  category: string
  image: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadedProjects = storage.getProjects()
    setProjects(loadedProjects)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <ProjectsGallery projects={projects} />
      <Stats />
      <Testimonials />
      <Contact />
    </div>
  )
}
