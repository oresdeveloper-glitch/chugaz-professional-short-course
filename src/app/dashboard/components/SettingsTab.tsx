"use client"

import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { DashboardTabProps } from "./types"

export default function SettingsTab({ user, studentData }: DashboardTabProps) {
  const initials = `${(user.firstName || "")[0] || ""}${(user.lastName || "")[0] || ""}` || user.email[0].toUpperCase()
  const photo = studentData.photo || user.photo || null

  return (
    <div className="space-y-4 max-w-2xl">
      <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Account Settings</h3>
      <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
        <GlassCardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 rounded-[20px]">
              {photo ? (
                <AvatarImage src={photo} alt={user.firstName} className="object-cover w-full h-full" />
              ) : (
                <AvatarFallback className="text-xl bg-[#F4B400] text-[#0B1F4D]">{initials}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-semibold text-base md:text-lg text-[#0B1F4D] dark:text-white">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <Separator />
<div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-600 dark:text-gray-400">Registration No</span><p className="font-medium">{user.regNo}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Phone</span><p className="font-medium">{studentData.phone || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Gender</span><p className="font-medium capitalize">{studentData.gender || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Nationality</span><p className="font-medium">{studentData.nationality || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Occupation</span><p className="font-medium">{studentData.occupation || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Education Level</span><p className="font-medium">{studentData.educationLevel || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">Region</span><p className="font-medium">{studentData.region || "—"}</p></div>
            <div><span className="text-gray-600 dark:text-gray-400">District</span><p className="font-medium">{studentData.district || "—"}</p></div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
