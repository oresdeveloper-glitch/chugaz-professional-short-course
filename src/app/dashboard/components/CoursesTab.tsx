"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/badge"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { courses } from "@/data/courses"
import type { DashboardTabProps } from "./types"

export default function CoursesTab({ studentData }: DashboardTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading font-bold text-[#0B1F4D] dark:text-white">My Courses</h3>
      {studentData.courses?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {studentData.courses.map((courseTitle: string, i: number) => {
            const course = courses.find(c => c.title === courseTitle)
            return (
              <motion.div key={courseTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
                  <GlassCardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-[#0B1F4D] dark:text-white">{courseTitle}</h4>
                        <p className="text-sm text-gray-500">Fee: {course?.fee?.toLocaleString() || "N/A"} TZS</p>
                      </div>
                      <Badge className={cn("rounded-[20px]", studentData.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{studentData.status}</Badge>
                    </div>
                    <Progress value={studentData.status === "approved" ? 100 : 30} className="h-2 rounded-full mb-2" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span><Clock className="w-4 h-4 inline mr-1" /> 2 Months</span>
                      <span>{studentData.status === "approved" ? "100%" : "30%"}</span>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <GlassCard variant="elevated" className="rounded-[20px] border-0 shadow-md">
          <GlassCardContent className="p-8 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No courses registered yet.</p>
            <Link href="/courses"><PremiumButton variant="gradient-gold" size="sm" className="mt-4">Browse Courses</PremiumButton></Link>
          </GlassCardContent>
        </GlassCard>
      )}
    </div>
  )
}
