"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent, GlassCardFooter } from "@/components/ui/GlassCard"
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
      <GlassCard variant="elevated" className="max-w-md w-full relative z-10">
        <GlassCardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <GlassCardTitle className="text-center">Course not found</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="text-center">
          <p className="text-muted-foreground font-body text-sm">
            This course could not be loaded. It may have been removed or a technical error occurred.
          </p>
        </GlassCardContent>
        <GlassCardFooter className="flex justify-center gap-3">
          <PremiumButton variant="glass" iconLeft={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push("/courses")}>
            All Courses
          </PremiumButton>
          <PremiumButton variant="glass" iconLeft={<RefreshCw className="w-4 h-4" />} onClick={reset}>
            Try Again
          </PremiumButton>
        </GlassCardFooter>
      </GlassCard>
    </div>
  )
}
