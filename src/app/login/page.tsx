"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import GradientMesh from "@/components/ui/GradientMesh"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
    } catch (e: any) {
      setError(e?.message || "Connection failed. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <GradientMesh />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard variant="elevated" padding="lg" borderRadius="2xl">
          <GlassCardHeader className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4B400] to-[#ffc933] flex items-center justify-center">
                <span className="text-[#0B1F4D] font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-white font-heading">CHUGAZ</span>
            </motion.div>
            <GlassCardTitle as="h1" className="text-2xl md:text-3xl text-white mb-1">
              Welcome Back
            </GlassCardTitle>
            <p className="text-gray-400">Sign in to your student account</p>
          </GlassCardHeader>

          <GlassCardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <PremiumInput
                label="Email Address"
                type="email"
                iconLeft={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

              <div className="relative">
                <PremiumInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  iconLeft={<Lock className="w-5 h-5" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors z-20"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[16px] text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(checked as boolean)}
                    className="rounded-md border-gray-500 data-[state=checked]:bg-[#F4B400] data-[state=checked]:border-[#F4B400]"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">Remember me</Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#F4B400] hover:text-[#ffc933] font-medium transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <PremiumButton
                type="submit"
                variant="gradient-gold"
                size="lg"
                fullWidth
                loading={loading}
                iconRight={<ArrowRight className="w-5 h-5" />}
              >
                {loading ? "Signing in..." : "Sign In"}
              </PremiumButton>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <p className="text-center text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#F4B400] hover:text-[#ffc933] font-semibold transition-colors">
                  Register here
                </Link>
              </p>
            </form>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
