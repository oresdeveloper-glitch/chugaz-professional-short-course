"use client"

import { Mail } from "lucide-react"
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"

export default function MessagesTab() {
  return (
    <GlassCard variant="elevated">
      <GlassCardHeader className="p-4 md:p-6">
        <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Contact Messages</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <div className="text-center py-8 md:py-12 text-gray-500">
          <Mail className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-gray-300" />
          <p className="text-base md:text-lg font-medium mb-1">No messages yet</p>
          <p className="text-xs md:text-sm">Messages from the contact form will appear here</p>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
