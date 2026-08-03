"use client"

import { useState } from "react"
import { Mail, ArrowLeft, CheckCircle2, Key, Lock, Copy, AtSign, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { PremiumInput } from "@/components/ui/PremiumInput"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardTitle } from "@/components/ui/GlassCard"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "code" | "done">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [devCode, setDevCode] = useState("")

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await api.post("/auth/forgot-password", { email }) as any
      if (res.devCode) {
        setDevCode(res.devCode)
        setCode(res.devCode)
      }
      setStep("code")
    } catch (err: any) {
      setError(err?.message || "Email not found")
    }
    setLoading(false)
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await api.post("/auth/reset-password", { email, code, password })
      setStep("done")
    } catch (err: any) {
      setError(err?.message || "Reset failed")
    }
    setLoading(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  return (
<div className="dark relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,201,51,0.30),transparent_40%),linear-gradient(135deg,#F4B400_0%,#FFC933_50%,#E8A200_100%)]">

      <div
        
        
        
        className="w-full max-w-md z-10"
      >
        <GlassCard variant="dark" padding="lg" borderRadius="2xl">
            {step === "done" ? (
              <div
                key="done"
                
                
                className="text-center"
              >
                <div
                  
                  
                  
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <GlassCardTitle as="h1" className="text-2xl text-white mb-2">Password Reset</GlassCardTitle>
<p className="text-gray-300 mb-6">Your password has been reset successfully.</p>
                <Link href="/login">
                  <PremiumButton variant="gradient-gold" size="lg" iconLeft={<ArrowLeft className="w-4 h-4" />}>
                    Back to Login
                  </PremiumButton>
                </Link>
              </div>
            ) : step === "code" ? (
              <div
                key="code"
                
                
                
              >
                <div className="flex items-center gap-3 mb-6">
<button onClick={() => setStep("email")} className="p-2 hover:bg-white/10 rounded-[10px] transition-colors">
                    <ArrowLeft className="w-4 h-4 text-gray-300" />
                  </button>
                  <GlassCardTitle as="h1" className="text-2xl text-white">Reset Password</GlassCardTitle>
                </div>
                <div className="mb-6 p-4 bg-[#F4B400]/10 border border-[#F4B400]/20 rounded-[16px]">
                  <p className="text-sm text-[#F4B400] mb-2">Your reset code:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-[8px] text-white font-mono">{devCode || code}</span>
                    <button onClick={copyCode} className="p-1.5 hover:bg-white/10 rounded-[8px] transition-colors">
                      <Copy className="w-4 h-4 text-[#F4B400]" />
                    </button>
                  </div>
                </div>
                <form onSubmit={handleReset} className="space-y-4">
                  <PremiumInput
                    label="Reset Code"
                    iconLeft={<Key className="w-5 h-5" />}
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "8px", fontFamily: "monospace" }}
                    inputMode="numeric"
                    required
                  />
                  <PremiumInput
                    label="New Password"
                    type="password"
                    iconLeft={<ShieldCheck className="w-5 h-5" />}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Create a strong new password"
                    required
                    minLength={8}
                  />
                  {error && (
                    <p className="text-red-400 text-sm">
                      {error}
                    </p>
                  )}
                  <PremiumButton
                    type="submit"
                    variant="gradient-gold"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={code.length !== 6 || password.length < 8}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </PremiumButton>
                </form>
              </div>
            ) : (
              <div
                key="email"
                
                
                
              >
                <div className="flex items-center gap-3 mb-6">
                  <Link href="/login">
                    <PremiumButton variant="glass" size="sm" className="!p-2 !min-h-0">
                      <ArrowLeft className="w-4 h-4" />
                    </PremiumButton>
                  </Link>
                  <GlassCardTitle as="h1" className="text-2xl text-white">Forgot Password</GlassCardTitle>
                </div>
<p className="text-gray-300 mb-6">Enter your email and we&apos;ll send you a 6-digit reset code.</p>
                <form onSubmit={handleSendCode} className="space-y-4">
                  <PremiumInput
                    label="Email Address"
                    type="email"
                    iconLeft={<AtSign className="w-5 h-5" />}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                  {error && (
                    <p className="text-red-400 text-sm">
                      {error}
                    </p>
                  )}
                  <PremiumButton
                    type="submit"
                    variant="gradient-gold"
                    size="lg"
                    fullWidth
                    loading={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Code"}
                  </PremiumButton>
                </form>
              </div>
            )}
        </GlassCard>
      </div>
    </div>
  )
}