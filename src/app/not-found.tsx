"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumButton } from "@/components/ui/PremiumButton"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] relative flex items-center justify-center px-4 overflow-hidden bg-[#0B1F4D]">
      <div className="relative z-10">
        <GlassCard variant="elevated" className="max-w-lg w-full text-center p-8 md:p-12">
          <GlassCardContent className="p-0 space-y-6">
            <div>
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#F4B400] to-[#ffc933] flex items-center justify-center shadow-2xl">
                <span className="text-5xl font-extrabold text-[#0B1F4D]">404</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-extrabold text-white mb-2">Page Not Found</h1>
              <p className="text-white/60 text-sm max-w-sm mx-auto">
                The page you are looking for does not exist or has been moved to a new location.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/">
                <PremiumButton variant="glass" size="md" iconLeft={<ArrowLeft className="w-4 h-4" />}>
                  Go Home
                </PremiumButton>
              </Link>
              <Link href="/courses">
                <PremiumButton variant="gradient-gold" size="md" iconLeft={<BookOpen className="w-4 h-4" />}>
                  Browse Courses
                </PremiumButton>
              </Link>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  )
}