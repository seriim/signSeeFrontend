import type React from "react"
import type { Metadata } from "next"
import { Poppins, Comfortaa } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "SignSee - Learn Jamaican Sign Language",
  description: "Bridging communication one sign at a time. Learn JSL through gamified, AI-powered lessons.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${comfortaa.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
