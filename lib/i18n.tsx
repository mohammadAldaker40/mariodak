"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import en from "@/content/site.en.json"
import ar from "@/content/site.ar.json"

type Messages = typeof en
type Locale = "en" | "ar"

const LOCALE_KEY = "site_locale"

const I18nContext = createContext<{
  locale: Locale
  messages: Messages
  setLocale: (l: Locale) => void
  t: (path: string) => string
}>({
  locale: "en",
  messages: en,
  setLocale: () => {},
  t: (k) => k,
})

function get(messages: any, path: string): any {
  return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), messages)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem(LOCALE_KEY) as Locale | null) : null
    if (saved === "ar" || saved === "en") {
      setLocale(saved)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_KEY, locale)
      const html = document.documentElement
      html.lang = locale
      html.dir = locale === "ar" ? "rtl" : "ltr"
    }
  }, [locale])

  const messages = locale === "ar" ? ar : en

  const t = useMemo(() => {
    return (path: string) => {
      const v = get(messages, path)
      return typeof v === "string" ? v : path
    }
  }, [messages])

  const value = useMemo(() => ({ locale, messages, setLocale, t }), [locale, messages, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}


