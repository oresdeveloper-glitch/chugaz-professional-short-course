"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle2, Key, Lock, Copy, Terminal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-[20px] p-8 shadow-xl">
          {step === "done" ? (
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-[#0B1F4D] dark:text-white mb-2">Password Reset</h1>
              <p className="text-gray-500 mb-6">Your password has been reset successfully.</p>
              <Link href="/login"><Button variant="gradient-gold" className="rounded-[20px]"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Login</Button></Link>
            </div>
          ) : step === "code" ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setStep("email")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-[10px]"><ArrowLeft className="w-4 h-4" /></button>
                <h1 className="text-2xl font-heading font-bold text-[#0B1F4D] dark:text-white">Reset Password</h1>
              </div>
              {devCode ? (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-[16px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">Development Mode</span>
                  </div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-2">SMTP not configured — your reset code:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-[8px] text-[#0B1F4D] dark:text-white font-mono">{devCode}</span>
                    <button onClick={copyCode} className="p-1.5 hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-[8px]"><Copy className="w-4 h-4 text-yellow-600" /></button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mb-6">A 6-digit code was sent to <strong>{email}</strong>.</p>
              )}
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <Label>Reset Code</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="text" inputMode="numeric" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} className="pl-10 rounded-[20px] h-12 text-center text-2xl tracking-[8px] font-bold" placeholder="000000" required />
                  </div>
                </div>
                <div>
                  <Label>New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 rounded-[20px] h-12" placeholder="Min. 8 characters" required minLength={8} />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="gradient-gold" size="xl" className="w-full rounded-[20px]" disabled={loading || code.length !== 6 || password.length < 8}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Link href="/login"><Button variant="ghost" size="sm" className="rounded-[20px]"><ArrowLeft className="w-4 h-4" /></Button></Link>
                <h1 className="text-2xl font-heading font-bold text-[#0B1F4D] dark:text-white">Forgot Password</h1>
              </div>
              <p className="text-gray-500 mb-6">Enter your email and we&apos;ll send you a 6-digit reset code.</p>
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 rounded-[20px] h-12" placeholder="you@example.com" required />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="gradient-gold" size="xl" className="w-full rounded-[20px]" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
