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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCourseById } from "@/data/courses"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
}

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
            <Button variant="gradient-gold">
              <ChevronLeft className="mr-2 w-4 h-4" /> Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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

      <section className="py-8 bg-white border-b border-gray-100">
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

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-8">
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                <Card className="p-6 md:p-8 border-primary/5">
                  <CardContent className="p-0">
                    <h2 className="text-2xl font-bold text-primary mb-4 font-heading">About This Course</h2>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {course.requirements.length > 0 && (
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                  <Card className="p-6 md:p-8 border-primary/5">
                    <CardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Requirements</h2>
                      <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="whileInView">
                        {course.requirements.map((req, index) => (
                          <motion.li key={index} variants={fadeInUp} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green mt-0.5 shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {course.outcomes.length > 0 && (
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                  <Card className="p-6 md:p-8 border-primary/5">
                    <CardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Learning Outcomes</h2>
                      <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="whileInView">
                        {course.outcomes.map((outcome, index) => (
                          <motion.li key={index} variants={fadeInUp} className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {course.modules.length > 0 && (
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                  <Card className="p-6 md:p-8 border-primary/5">
                    <CardContent className="p-0">
                      <h2 className="text-2xl font-bold text-primary mb-6 font-heading">Course Modules</h2>
                      <motion.div className="space-y-3" variants={staggerContainer} initial="initial" whileInView="whileInView">
                        {course.modules.map((module, index) => (
                          <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-primary font-bold text-sm shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-gray-700 font-medium">{module}</span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <Card className="overflow-hidden border-primary/5">
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
                  <CardContent className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{course.instructor.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Card className="p-6 border-primary/5">
                  <CardContent className="p-0 text-center">
                    <p className="text-3xl font-bold text-primary font-heading">{formatFee(course.fee, course.currency)}</p>
                    <p className="text-gray-500 text-sm mb-6">Full Course Fee</p>
                    <Link href="/register">
                      <Button variant="gradient-gold" size="lg" className="w-full shadow-lg shadow-gold/20">
                        Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Card className="p-6 border-primary/5">
                  <CardContent className="p-0">
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
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <motion.div className="mt-12 text-center" variants={fadeInUp} initial="initial" whileInView="whileInView">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back to All Courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
