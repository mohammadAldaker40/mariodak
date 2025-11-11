"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react"
import { storage } from "@/lib/storage"
import { useI18n } from "@/lib/i18n"

export function Contact() {
  const { t, messages } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      storage.addContact(formData)
      setFormData({ name: "", email: "", phone: "", message: "" })
      alert(t("contact.form.success"))
    } catch (error) {
      console.error("[v0] Error submitting contact form:", error)
      alert(t("contact.form.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm tracking-widest text-accent-warm uppercase mb-4">{t("contact.label")}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-balance">
            {t("contact.heading")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("contact.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">{t("contact.info")}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-accent-warm mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("contact.email")}</p>
                    <a
                      href="mailto:alex@architecturedesign.com"
                      className="text-foreground hover:text-accent-warm transition-colors"
                    >
                      alex@architecturedesign.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-accent-warm mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("contact.phone")}</p>
                    <a href="tel:+1234567890" className="text-foreground hover:text-accent-warm transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-accent-warm mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("contact.office")}</p>
                    <p className="text-foreground">{t("contact.address")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">{t("contact.follow")}</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-foreground hover:bg-muted transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-foreground hover:bg-muted transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-foreground hover:bg-muted transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.form.name")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("contact.form.namePh")}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("contact.form.emailPh")}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t("contact.form.phonePh")}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.form.message")}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("contact.form.messagePh")}
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {messages.hero.name}. {t("contact.footer")}
        </p>
      </div>
    </section>
  )
}
