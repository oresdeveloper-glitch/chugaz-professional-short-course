"use client"

import {
  BookOpen, CheckCircle2, Award, Clock, Download,
  User, FileText
} from "lucide-react"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { courses } from "@/data/courses"
import type { DashboardTabProps } from "./types"

export default function DashboardTab({ user, studentData, setActiveTab }: DashboardTabProps) {
  return (
    <>
      <div >
        <GlassCard variant="elevated" className="rounded-[20px] border-0 bg-gradient-to-br from-[#0B1F4D] to-[#1a3a7a] text-white overflow-hidden">
          <GlassCardContent className="p-6 md:p-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4B400]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold mb-1">Welcome back, {user.firstName}!</h2>
              <p className="text-white/70">Reg No: {user.regNo}</p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Registered Courses", value: String(studentData.courses?.length || 0), color: "text-blue-600", bg: "bg-blue-100" },
          { icon: CheckCircle2, label: "Status", value: studentData.status, color: studentData.status === "approved" ? "text-green-600" : "text-[#F4B400]", bg: studentData.status === "approved" ? "bg-green-100" : "bg-yellow-100" },
          { icon: Award, label: "Training Mode", value: studentData.trainingMode || "N/A", color: "text-purple-600", bg: "bg-purple-100" },
          { icon: Clock, label: "Prefered Time", value: studentData.preferredTime || "N/A", color: "text-orange-600", bg: "bg-orange-100" },
        ].map((stat, i) => (
          <div key={stat.label}   >
            <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
              <GlassCardContent className="p-4 md:p-6 flex items-center gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bg} rounded-[20px] flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] md:text-sm text-gray-500">{stat.label}</p>
                  <p className="text-sm sm:text-base md:text-xl font-heading font-extrabold text-[#0B1F4D] dark:text-white break-words capitalize leading-tight">{stat.value}</p>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">My Courses</h3>
          {studentData.courses?.length > 0 ? studentData.courses.map((courseTitle: string, i: number) => {
            const course = courses.find(c => c.title === courseTitle)
            return (
              <div key={courseTitle}   >
                <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
                  <GlassCardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-[#0B1F4D] dark:text-white">{courseTitle}</h4>
                        <p className="text-sm text-gray-500">Fee: {course?.fee?.toLocaleString() || "N/A"} TZS</p>
                      </div>
                      <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                        {studentData.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={studentData.status === "approved" ? 100 : 30} className="flex-1 h-2 rounded-full" />
                      <span className="text-sm font-semibold">{studentData.status === "approved" ? "100%" : "30%"}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-4 h-4" /> Duration: 2 Months</span>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </div>
            )
          }) : (
            <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
              <GlassCardContent className="p-8 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No courses registered yet.</p>
                <Link href="/courses"><PremiumButton variant="gradient-gold" size="sm" className="mt-4">Browse Courses</PremiumButton></Link>
              </GlassCardContent>
            </GlassCard>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Quick Info</h3>
          <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
            <GlassCardContent className="p-4 md:p-6 space-y-4">
              {studentData.photo && (
                <div className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={studentData.photo} alt="Profile" className="w-20 h-20 rounded-[20px] object-cover border-2 border-[#F4B400]/40" />
                </div>
              )}
<div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Name</span>
                <span className="font-medium">{user.firstName} {user.lastName}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Email</span>
                <span className="font-medium break-words ml-2 text-right">{user.email}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Reg No.</span>
                <span className="font-medium">{user.regNo}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{studentData.status}</Badge>
              </div>
            </GlassCardContent>
          </GlassCard>

          <h3 className="text-lg font-heading font-bold text-[#0B1F4D] dark:text-white pt-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Download, label: "Receipt", color: "text-green-600", bg: "bg-green-100", tab: "downloads" as const },
              { icon: Award, label: "Certificate", color: "text-[#F4B400]", bg: "bg-yellow-100", tab: "downloads" as const },
              { icon: User, label: "Profile", color: "text-blue-600", bg: "bg-blue-100", tab: "settings" as const },
              { icon: FileText, label: "Reports", color: "text-purple-600", bg: "bg-purple-100", tab: "downloads" as const },
            ].map((action) => (
              <button key={action.label} onClick={() => setActiveTab(action.tab)} className={`p-4 rounded-[20px] ${action.bg} hover:shadow-md transition-all text-center min-h-[64px]`}>
                <action.icon className={`w-5 h-5 ${action.color} mx-auto mb-1`} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
