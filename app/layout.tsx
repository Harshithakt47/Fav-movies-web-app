import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Favorite Movies & TV Shows",
  description: "Manage your favorite movies and TV shows with ease",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#7c3aed",
  openGraph: {
    title: "Favorite Movies & TV Shows",
    description: "Manage your favorite movies and TV shows with ease",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>{children}</body>
    </html>
  )
}
