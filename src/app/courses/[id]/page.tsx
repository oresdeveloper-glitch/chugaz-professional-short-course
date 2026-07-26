"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Calendar,
  Wallet,
  BookOpen,
  CheckCircle2,
  Award,
  Clock,
  ChevronLeft,
  ArrowRight,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { getCourseById } from "@/data/courses"
import GradientMesh from "@/components/ui/GradientMesh"
import ParticleField from "@/components/ui/ParticleField"
import { PremiumButton } from "@/components/ui/PremiumButton"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import ScrollReveal from "@/components/ui/ScrollReveal"

const formatFee = (fee: number, currency: string) => {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(fee)
}

export default function CourseDetailPage() {
  const params = useParams()
  const course = getCourseById(params.id as string)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4 font-heading">Course Not Found</h1>
          <p className="text-gray-500 mb-6">The course you are looking for does not exist.</p>
          <Link href="/courses">
            <PremiumButton variant="gradient-gold">
              <ChevronLeft className="mr-2 w-4 h-4" /> Back to Courses
            </PremiumButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <GradientMesh />
      <ParticleField className="-z-10" color="#F4B400" count={30} connectDistance={100} speed={0.5} />
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D] via-[#0B1F4D]/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="gold" className="mb-4 shadow-md">{course.category}</Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading max-w-3xl">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                {course.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap items-center gap-6 md:gap-10 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold text-primary text-sm">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fee</p>
                <p className="font-semibold text-primary text-sm">{formatFee(course.fee, course.currency)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold text-primary text-sm">{course.category}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal direction="up">
                <GlassCard variant="elevated" className="p-6 md:p-8">
                  <GlassCardContent className="p-0">
                    <h2 className="text-2xl font-bold text-primary mb-4 font-heading">About This Course</h2>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </GlassCardContent>
                </GlassCard>
              </ScrollReveal>

              {course.requirements.length > 0 && (
                <ScrollReveal direction="up">
                  <GlassCard variant="elevated" className="p-6 md:p-8">
                    <GlassCardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Requirements</h2>
                      <div className="space-y-3">
                        {course.requirements.map((req, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green mt-0.5 shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </ScrollReveal>
              )}

              {course.outcomes.length > 0 && (
                <ScrollReveal direction="up">
                  <GlassCard variant="elevated" className="p-6 md:p-8">
                    <GlassCardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Learning Outcomes</h2>
                      <div className="space-y-3">
                        {course.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </ScrollReveal>
              )}

              {course.modules.length > 0 && (
                <ScrollReveal direction="up">
                  <GlassCard variant="elevated" className="p-6 md:p-8">
                    <GlassCardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Course Modules</h2>
                      <div className="space-y-3">
                        {course.modules.map((module, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-primary font-bold text-sm shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-gray-700 font-medium">{module}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </ScrollReveal>
              )}
            </div>

            <div className="space-y-6">
              <ScrollReveal direction="right">
                <GlassCard variant="elevated" className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-lg font-heading">{course.instructor.name}</h3>
                      <p className="text-gold text-sm">{course.instructor.title}</p>
                    </div>
                  </div>
                  <GlassCardContent className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{course.instructor.bio}</p>
                  </GlassCardContent>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <GlassCard variant="gold" className="p-6">
                  <GlassCardContent className="p-0 text-center">
                    <p className="text-3xl font-bold text-primary font-heading">{formatFee(course.fee, course.currency)}</p>
                    <p className="text-gray-500 text-sm mb-6">Full Course Fee</p>
                    <Link href="/register">
                      <PremiumButton variant="gradient-gold" size="lg" fullWidth iconRight={<ArrowRight className="w-4 h-4" />}>
                        Enroll Now
                      </PremiumButton>
                    </Link>
                  </GlassCardContent>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <GlassCard variant="dark" className="p-6">
                  <GlassCardContent className="p-0">
                    <h3 className="font-bold text-primary mb-4 font-heading">Course Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock className="w-4 h-4 text-gold" />
                          <span>Duration</span>
                        </div>
                        <span className="font-semibold text-primary text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span>Modules</span>
                        </div>
                        <span className="font-semibold text-primary text-sm">{course.modules.length}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Award className="w-4 h-4 text-green" />
                          <span>Outcomes</span>
                        </div>
                        <span className="font-semibold text-primary text-sm">{course.outcomes.length}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star className="w-4 h-4 text-gold" />
                          <span>Featured</span>
                        </div>
                        <span className={cn("font-semibold text-sm", course.featured ? "text-green" : "text-gray-400")}>
                          {course.featured ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal direction="up">
            <div className="mt-12 text-center">
              <Link href="/courses">
                <PremiumButton variant="glass" size="lg">
                  <ChevronLeft className="mr-2 w-4 h-4" /> Back to All Courses
                </PremiumButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
