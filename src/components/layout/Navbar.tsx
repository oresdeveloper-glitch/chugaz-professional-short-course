"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { getCurrentUser, logout as authLogout } from "@/lib/auth"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Registration", href: "/register" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setUser(getCurrentUser())
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const latest = window.scrollY
      const direction = latest - lastScrollY.current
      if (latest > 100 && direction > 0) {
        setVisible(false)
      } else if (direction < 0) {
        setVisible(true)
      }
      lastScrollY.current = latest
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await authLogout()
    setUser(null)
    router.push("/")
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ top: visible ? 0 : -120, transition: "top 0.3s ease-in-out" }}
    >
      <nav className="bg-white/80 dark:bg-[#0B1F4D]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
<Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative rounded-[20px] overflow-hidden flex-shrink-0">
                <Image src="/images/chugaz-logo.png" alt="CHUGAZ" fill className="object-contain" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-xl font-heading font-extrabold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent leading-tight truncate">
                  CHUGAZ
                </span>
                <span className="text-[6px] sm:text-[8px] font-heading font-semibold text-primary dark:text-gray-300 tracking-[0.1em] sm:tracking-[0.15em] leading-tight hidden sm:block truncate">
                  ICT SERVICES OFFICE SUPPLIES
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href={user.role === "admin" ? "/admin" : "/dashboard"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-button border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <PremiumButton variant="glass" size="md" iconLeft={<LogOut className="w-4 h-4" />} onClick={handleLogout}>
                    Logout
                  </PremiumButton>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-button border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                  >
                    Login
                  </Link>
                  <PremiumButton variant="gradient-gold" size="md" onClick={() => router.push("/register")}>
                    Get Started
                  </PremiumButton>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0B1F4D]/95 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gold hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {user ? (
                  <>
                    <Link
                      href={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-button border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <PremiumButton variant="gradient-primary" size="lg" className="w-full" iconLeft={<LogOut className="w-4 h-4" />} onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                      Logout
                    </PremiumButton>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-button border border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
                    >
                      Login
                    </Link>
                    <PremiumButton variant="gradient-gold" size="lg" className="w-full" onClick={() => { router.push("/register"); setMobileMenuOpen(false); }}>
                      Get Started
                    </PremiumButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}