"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setSent(true)
      else setError("Email not found")
    } catch {
      setError("Connection failed")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-[20px] p-8 shadow-xl">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-[#0B1F4D] dark:text-white mb-2">Check Your Email</h1>
              <p className="text-gray-500 mb-6">If an account with {email} exists, you'll receive a password reset link.</p>
              <Link href="/login"><Button variant="outline" className="rounded-[20px]"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Login</Button></Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Link href="/login"><Button variant="ghost" size="sm" className="rounded-[20px]"><ArrowLeft className="w-4 h-4" /></Button></Link>
                <h1 className="text-2xl font-heading font-bold text-[#0B1F4D] dark:text-white">Forgot Password</h1>
              </div>
              <p className="text-gray-500 mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 rounded-[20px] h-12" placeholder="you@example.com" required />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="gradient-gold" size="xl" className="w-full rounded-[20px]" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
