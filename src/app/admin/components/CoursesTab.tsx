"use client"

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from "@/components/ui/GlassCard"
import type { Student } from "./types"

interface Props { students: Student[] }

const catCourses: Record<string, string[]> = {
  "Programming Languages": ["C Programming", "C++", "Python", "Java", "JavaScript", "HTML & CSS"],
  "Engineering & Design": ["AutoCAD", "ArchiCAD", "SolidWorks"],
  "Creative Skills": ["Graphic Design", "Website Design"],
  "Computer Skills": ["Computer Basics", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
}

export default function CoursesTab({ students }: Props) {
  return (
    <GlassCard variant="elevated">
      <GlassCardHeader className="p-4 md:p-6">
        <GlassCardTitle className="text-base md:text-lg font-heading font-bold text-[#0B1F4D] dark:text-white">Course Management</GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="p-4 md:p-6 pt-0 md:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {Object.keys(catCourses).map(cat => (
            <GlassCard key={cat} variant="outlined">
              <GlassCardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-[#0B1F4D] dark:text-white mb-2 text-sm md:text-base">{cat}</h3>
                <p className="text-lg md:text-2xl font-heading font-extrabold text-[#F4B400]">
                  {students.filter(s => s.courses.some(c => catCourses[cat]?.includes(c))).length}
                </p>
                <p className="text-xs md:text-sm text-gray-500">Registered students</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
        <div className="mt-4 md:mt-6 text-center text-gray-500 text-xs md:text-sm">Course editing available in the full Laravel backend.</div>
      </GlassCardContent>
    </GlassCard>
  )
}
