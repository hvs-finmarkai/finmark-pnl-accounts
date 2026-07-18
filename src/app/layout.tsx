import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Finmark.ai | Enterprise P&L Platform",
  description: "Real-time Project P&L Automation Platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
