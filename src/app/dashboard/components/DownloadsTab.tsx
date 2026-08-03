"use client"

import { Download, Award, FileText, User, ArrowUpRight } from "lucide-react"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { cn } from "@/lib/utils"
import type { DashboardTabProps } from "./types"

export default function DownloadsTab({ studentData }: DashboardTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Downloads</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { icon: Download, label: "Registration Receipt", desc: "Download your registration receipt", color: "text-green-600", bg: "bg-green-100" },
          { icon: Award, label: "Certificate", desc: "Download your course certificate", color: "text-[#F4B400]", bg: "bg-yellow-100", disabled: studentData.status !== "approved" },
          { icon: FileText, label: "Course Materials", desc: "Download course materials", color: "text-purple-600", bg: "bg-purple-100" },
          { icon: User, label: "Student ID", desc: "Download your student ID card", color: "text-blue-600", bg: "bg-blue-100" },
        ].map((item, i) => (
          <div key={item.label}   >
            <GlassCard variant="elevated" className={cn("rounded-[20px] border-0 shadow-md", item.disabled && "opacity-50")}>
              <GlassCardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 ${item.bg} rounded-[20px] flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0B1F4D] dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </GlassCardContent>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}
