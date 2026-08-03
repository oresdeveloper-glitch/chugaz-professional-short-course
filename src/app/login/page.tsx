"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
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
<div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,180,0,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.10),transparent_40%),linear-gradient(135deg,#0B1F4D_0%,#1a3a7a_50%,#0B1F4D_100%)]">

      <div
        className="w-full max-w-md z-10"
      >
        <GlassCard variant="elevated" padding="lg" borderRadius="2xl">
          <GlassCardHeader className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
<div className="w-48 sm:w-60 lg:w-72 aspect-[515/195] relative overflow-hidden">
                <Image src="/images/chugaz-logo.png" alt="CHUGAZ" fill className="object-fill" />
              </div>
            </div>
<GlassCardTitle as="h1" className="text-2xl md:text-3xl text-[#F4B400] mb-1">
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
                placeholder="Enter your email address"
                required
              />

              <div className="relative">
                <PremiumInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  iconLeft={<ShieldCheck className="w-5 h-5" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  required
                />
<button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors z-20"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[16px] text-red-400 text-sm"
                >
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
                    className="rounded-md border-gray-500 data-[state=checked]:bg-[#F4B400] data-[state=checked]:border-[#F4B400]"
                  />
<Label htmlFor="remember" className="text-sm text-gray-200 cursor-pointer">Remember me</Label>
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
<span className="text-sm text-gray-300">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

<p className="text-center text-gray-300 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#F4B400] hover:text-[#ffc933] font-semibold transition-colors">
                  Register here
                </Link>
              </p>
            </form>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  )
}