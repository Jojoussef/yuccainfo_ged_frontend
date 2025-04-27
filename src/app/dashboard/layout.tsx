import type React from "react"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">{children}</main>
    </div>
  )
}
