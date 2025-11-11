import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Maria Al-Daker - Architecture & Design",
  description:
    "Principal Architect specializing in residential, commercial, and interior design. Creating spaces that inspire through timeless design and sustainable innovation.",

  keywords: ["architecture", "architect", "interior design", "residential design", "commercial architecture"],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
