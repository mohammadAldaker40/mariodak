"use client"

import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { useTheme } from "next-themes"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, locale, setLocale, messages } = useI18n()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 backdrop-blur-md warm-shadow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-serif tracking-wide text-foreground hover:text-accent-warm transition-colors duration-300 transform-gpu hover:scale-[1.01]"
          >
            {messages.hero.name}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors duration-300"
            >
              {t("navigation.about")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors duration-300"
            >
              {t("navigation.projects")}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors duration-300"
            >
              {t("navigation.testimonials")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm tracking-wide bg-accent text-accent-foreground px-6 py-2 rounded-full hover:bg-accent-warm transition-all duration-300 warm-shadow"
            >
              {t("navigation.contact")}
            </button>
            {/* <div className="pl-3">
              <Button variant="outline" size="sm" onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
                {locale === "en" ? "AR" : "EN"}
              </Button>
            </div> */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors py-2"
            >
              {t("navigation.about")}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors py-2"
            >
              {t("navigation.projects")}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors py-2"
            >
              {t("navigation.testimonials")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-sm tracking-wide text-muted-foreground hover:text-accent-warm transition-colors py-2"
            >
              {t("navigation.contact")}
            </button>
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
                {locale === "en" ? "AR" : "EN"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
