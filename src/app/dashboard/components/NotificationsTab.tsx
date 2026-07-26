"use client"

import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DashboardTabProps } from "./types"

export default function NotificationsTab({ notifications, setNotifications }: DashboardTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">Notifications</h3>
        {notifications.length > 0 && (
          <button onClick={() => { setNotifications([]) }} className="text-sm text-gray-500 hover:text-red-500">Clear all</button>
        )}
      </div>
      {notifications.length === 0 ? (
        <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
          <GlassCardContent className="p-8 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No notifications</p>
          </GlassCardContent>
        </GlassCard>
      ) : (
        notifications.map((n: any) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard variant="elevated" className={cn("rounded-[20px] border-0 shadow-md", !n.read && "border-l-4 border-l-[#F4B400]")}>
              <GlassCardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[#0B1F4D] dark:text-white">{n.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                  </div>
                  <Badge className={cn("rounded-[20px]", n.read ? "bg-gray-100 text-gray-500" : "bg-[#F4B400] text-[#0B1F4D]")}>{n.read ? "Read" : "New"}</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">{new Date(n.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        ))
      )}
    </div>
  )
}
