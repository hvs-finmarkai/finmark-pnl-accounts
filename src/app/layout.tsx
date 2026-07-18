import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Finmark.ai | Enterprise P&L Platform",
  description: "Real-time Project P&L Automation Platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')})()` }} />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
