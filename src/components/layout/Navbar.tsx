"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const { scrollY } = useScroll()

  useEffect(() => {
    setUser(getCurrentUser())
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await authLogout()
    setUser(null)
    router.push("/")
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY.current
    if (latest > 100 && direction > 0) {
      setVisible(false)
    } else if (direction < 0) {
      setVisible(true)
    }
    lastScrollY.current = latest
  })

  return (
    <motion.header
      initial={false}
      animate={{ top: visible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: "easeInOut" as const }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="bg-white/80 dark:bg-[#0B1F4D]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-[20px] bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg">
                <span className="text-white font-heading font-extrabold text-sm">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-extrabold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent leading-tight">
                  CHUGAZ
                </span>
                <span className="text-[10px] font-heading font-semibold text-primary dark:text-gray-300 tracking-[0.2em] leading-tight hidden sm:block">
                  STATIONERY
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
                  <Button variant="outline" size="md" className="font-button border-gray-300 dark:border-gray-600" asChild>
                    <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" size="md" className="font-button text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="md" className="font-button border-gray-300 dark:border-gray-600" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="gradient-gold" size="md" className="font-button text-white shadow-lg shadow-gold/25" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#0B1F4D]/95 backdrop-blur-xl"
            >
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
                      <Button variant="outline" size="lg" className="w-full font-button border-gray-300 dark:border-gray-600" asChild>
                        <Link href={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="danger" size="lg" className="w-full font-button" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg" className="w-full font-button border-gray-300 dark:border-gray-600" asChild>
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button variant="gradient-gold" size="lg" className="w-full font-button text-white shadow-lg shadow-gold/25" asChild>
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
