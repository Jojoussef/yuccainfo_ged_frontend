"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, FileText, Upload, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-xs">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#1E3A8A]" />
            <span className="text-xl font-bold text-[#1E3A8A]">GED System</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-[#38BDF8] ${
              isActive("/dashboard") ? "text-[#1E3A8A]" : "text-[#334155]"
            }`}
          >
            Documents
          </Link>
          <Link
            href="/dashboard/upload"
            className={`text-sm font-medium transition-colors hover:text-[#38BDF8] ${
              isActive("/dashboard/upload") ? "text-[#1E3A8A]" : "text-[#334155]"
            }`}
          >
            Upload
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#334155] hover:text-[#EF4444] hover:bg-transparent"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-3 bg-white">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 p-2 rounded-md ${
                isActive("/dashboard") ? "bg-[#F1F5F9] text-[#1E3A8A]" : "text-[#334155] hover:bg-[#F1F5F9]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Documents
            </Link>
            <Link
              href="/dashboard/upload"
              className={`flex items-center gap-2 p-2 rounded-md ${
                isActive("/dashboard/upload") ? "bg-[#F1F5F9] text-[#1E3A8A]" : "text-[#334155] hover:bg-[#F1F5F9]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Upload className="h-5 w-5" />
              Upload
            </Link>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2 p-2 rounded-md text-[#334155] hover:bg-[#F1F5F9] hover:text-[#EF4444]"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
