"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await login(email, password)
      if (user) {
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch {
      setError("Connection failed. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row">
      <motion.div
        className="w-full lg:w-1/2 bg-gradient-to-br from-[#0B1F4D] via-[#0B1F4D] to-[#1a3a7a] relative overflow-hidden flex items-center justify-center py-10 lg:py-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 text-center px-6 md:px-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gold mb-4 font-heading">
              CHUGAZ
              <br />
              <span className="text-white text-xl md:text-3xl font-light">STATIONERY</span>
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-6 rounded-full" />
            <p className="text-white/80 text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Empowering Minds, Building Futures
            </p>
            <div className="mt-6 md:mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
              {["1", "2", "3"].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-gold" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 bg-white">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-primary font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-primary font-heading">CHUGAZ</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-heading">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your student account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-xl border-gray-200 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-xl border-gray-200 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-[20px] text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                  className="rounded-md border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-gold hover:text-gold/80 font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" variant="gradient-gold" size="xl" className="w-full shadow-lg shadow-gold/20" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-gold hover:text-gold/80 font-semibold transition-colors">
                Register here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
