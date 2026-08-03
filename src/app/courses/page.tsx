"use client"

import { useState, useMemo } from "react"
import { Search, Clock, Wallet, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { courses, categories } from "@/data/courses"
import { PremiumInput } from "@/components/ui/PremiumInput"
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

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = activeCategory === "All" || course.category === activeCategory
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const allCategories = ["All", ...categories.map((c) => c.name)]

  return (
    <div className="min-h-screen relative">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F4D] via-[#0B1F4D] to-[#1a3a7a] py-16 lg:py-28">
        <div className="absolute top-[-10%] left-[-6%] h-96 w-96 rounded-full bg-[#F4B400]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-[#1a3a7a]/50 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-gold/80 text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">Courses</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                Courses
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Choose from {courses.length}+ professional courses designed to equip you with in-demand skills
              for the modern workforce.
            </p>
          </div>
        </div>
      </section>

<section className="dark sticky top-20 z-30 bg-[#0B1F4D]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-start md:justify-center w-full md:w-auto pb-1 md:pb-0">
              {allCategories.map((category) => (
                <PremiumButton
                  key={category}
                  variant={activeCategory === category ? "gradient-gold" : "glass"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm"
                >
                  {category}
                </PremiumButton>
              ))}
            </div>
            <div className="relative w-full md:w-64 shrink-0">
              <PremiumInput
                label="Search courses"
                placeholder="Search by title or topic"
                iconLeft={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50/80 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4 text-primary">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
              <PremiumButton variant="outline-3d" className="mt-4" onClick={() => { setActiveCategory("All"); setSearchQuery("") }}>
                Clear Filters
              </PremiumButton>
            </div>
          ) : (
            <ScrollReveal direction="up" stagger={0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredCourses.map((course) => (
                  <GlassCard key={course.id} variant="elevated" className="group h-full overflow-hidden flex flex-col">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4B400] to-[#ffc933] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    <div className="relative h-40 md:h-48 overflow-hidden rounded-t-xl">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="gold" className="shadow-md">{course.category}</Badge>
                      </div>
                    </div>
                    <GlassCardContent className="p-4 md:p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-primary mb-3 font-heading group-hover:text-gold transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gold" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Wallet className="w-4 h-4 text-green" />
                          <span className="font-semibold text-primary">{formatFee(course.fee, course.currency)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href="/register" className="flex-1">
                          <PremiumButton variant="gradient-gold" size="sm" fullWidth iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                            Register Now
                          </PremiumButton>
                        </Link>
                        <Link href={`/courses/${course.id}`}>
                          <PremiumButton variant="glass" size="sm" className="bg-white border-2 border-primary/20 text-primary hover:border-[#F4B400] hover:bg-white hover:text-primary">
                            View Details
                          </PremiumButton>
                        </Link>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  )
}
