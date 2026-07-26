"use client"

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function SettingsTab() {
  return (
    <GlassCard variant="elevated">
      <GlassCardHeader className="p-4 md:p-6">
        <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Settings</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-4 md:space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-sm md:text-base">Admin Profile</h3>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-[20px]">
            <Avatar className="w-12 h-12 md:w-16 md:h-16 rounded-[20px]">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm md:text-base">Administrator</p>
              <p className="text-xs md:text-sm text-gray-500 truncate">admin@chugazstationery.com</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sm md:text-base">Institution Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div><label className="text-xs md:text-sm text-gray-500">Institution Name</label><p className="font-medium text-sm md:text-base">CHUGAZ STATIONERY</p></div>
            <div><label className="text-xs md:text-sm text-gray-500">Tagline</label><p className="font-medium text-sm md:text-base">Empowering Minds, Building Futures</p></div>
            <div><label className="text-xs md:text-sm text-gray-500">Location</label><p className="font-medium text-sm md:text-base">Mbeya, Tanzania</p></div>
            <div><label className="text-xs md:text-sm text-gray-500">Deadline</label><p className="font-medium text-sm md:text-base">31 August 2026</p></div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
