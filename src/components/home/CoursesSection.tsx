"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, DollarSign, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { getFeaturedCourses } from "@/data/courses"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import { PremiumButton } from "@/components/ui/PremiumButton"
import ScrollReveal from "@/components/ui/ScrollReveal"
import type { Course } from "@/types"

const featuredCourses = getFeaturedCourses()

export default function CoursesSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0B1F4D]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/5 via-transparent to-[#F4B400]/5" />
      <div className="absolute right-[-8%] top-[12%] h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Featured Programs
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Courses Designed for <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
            Industry-aligned curriculum with hands-on projects, expert instructors, and real-world applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredCourses.map((course: Course, index: number) => (
            <ScrollReveal
              key={course.id}
              direction="up"
              distance={40}
              delay={index * 0.1}
              stagger={0.08}
            >
              <CourseCard course={course} index={index} />
            </ScrollReveal>
          ))}
        </div>

        <div
          className="text-center mt-12 lg:mt-16"
        >
          <PremiumButton variant="gradient-primary" size="lg" asChild iconRight={<ArrowRight className="w-4 h-4" />}>
            <Link href="/courses">View All Courses</Link>
          </PremiumButton>
        </div>
      </div>
    </section>
  )
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const categories: Record<string, { color: string; bg: string }> = {
    "Programming Languages": { color: "text-blue-400", bg: "bg-blue-500/20" },
    "Engineering & Design": { color: "text-purple-400", bg: "bg-purple-500/20" },
    "Creative Skills": { color: "text-pink-400", bg: "bg-pink-500/20" },
    "Computer Skills": { color: "text-green-400", bg: "bg-green-500/20" },
  }
  const cat = categories[course.category] || { color: "text-white/70", bg: "bg-white/10" }

  return (
    <GlassCard variant="elevated" hover padding="none" borderRadius="xl" className="group overflow-hidden h-full flex flex-col shadow-3d">
      <div className="relative h-52 lg:h-56 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/80 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-block px-3 py-1.5 rounded-full ${cat.bg} ${cat.color} text-xs font-button font-bold backdrop-blur-sm border border-white/10`}>
            {course.category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center gap-4 text-[#F4B400] text-sm">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#F4B400]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <DollarSign className="w-3.5 h-3.5 text-[#F4B400]" />
              {course.currency} {course.fee.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <GlassCardContent className="flex-1 flex flex-col p-6 lg:p-7">
        <h3 className="text-xl lg:text-2xl font-heading font-bold text-white mb-3 group-hover:text-[#F4B400] transition-colors duration-300 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-[#F4B400] text-sm leading-relaxed flex-1 mb-6 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Course highlights">
          {course.highlights?.slice(0, 3).map((h: string, i: number) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-xs"
            >
              <CheckCircle2 className="w-3 h-3 text-[#F4B400]" />
              {h}
            </span>
          ))}
        </div>

        <Link href={`/courses/${course.id}`}>
          <PremiumButton 
            variant="glass-gold" 
            size="md" 
            fullWidth
            iconRight={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          >
            View Details
          </PremiumButton>
        </Link>
      </GlassCardContent>
    </GlassCard>
  )
}