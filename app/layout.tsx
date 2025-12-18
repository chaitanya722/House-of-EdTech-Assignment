import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "House of EdTech Assignment",
  description: "A secure task management app built with Next.js and PostgreSQL",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t py-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium">Chaitanya Pawar</span> ·{" "}
            <Link
              href="https://github.com/chaitanya722"
              target="_blank"
              className="underline hover:text-black"
            >
              GitHub
            </Link>{" "}
            ·{" "}
            <Link
              href="https://www.linkedin.com/in/chaitanya-pawar-094b7a234/"
              target="_blank"
              className="underline hover:text-black"
            >
              LinkedIn
            </Link>
          </p>
        </footer>
      </body>
    </html>
  )
}
