"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, BookOpen, TrendingUp, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { newsItems } from "@/data/news"
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard"
import ScrollReveal from "@/components/ui/ScrollReveal"
import { PremiumButton } from "@/components/ui/PremiumButton"
import type { NewsItem } from "@/types"

const categoryIcons: Record<string, React.ElementType> = {
  Courses: BookOpen,
  Announcements: TrendingUp,
  "Success Stories": Award,
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Courses: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  Announcements: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  "Success Stories": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
}

function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.date)
  const formatted = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const cat = categoryColors[item.category] || { bg: "bg-white/10", text: "text-white/70", border: "border-white/10" }
  const CatIcon = categoryIcons[item.category] || BookOpen

  return (
    <GlassCard variant="elevated" hover padding="none" borderRadius="xl" className="group relative overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4D]/80 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-button font-bold ${cat.bg} ${cat.text} ${cat.border} backdrop-blur-sm`}>
            <CatIcon className="w-3.5 h-3.5" />
            {item.category}
          </span>
        </div>
      </div>

      <GlassCardContent className="flex-1 flex flex-col p-6 lg:p-7">
        <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
        </div>
        
        <h3 className="text-lg lg:text-xl font-heading font-bold text-white mb-4 group-hover:text-[#F4B400] transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed flex-1 mb-6 line-clamp-3">
          {item.excerpt}
        </p>
        
        <Link href="/courses" className="w-full">
          <PremiumButton
            variant="glass-gold"
            size="sm"
            fullWidth
            iconRight={<ArrowRight className="group-hover:translate-x-1 transition-transform" />}
          >
            Read More
          </PremiumButton>
        </Link>
      </GlassCardContent>
    </GlassCard>
  )
}

export default function News() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4D]/3 via-transparent to-[#F4B400]/3" />
      <div className="absolute bottom-[8%] right-[2%] h-64 w-64 rounded-full bg-[#F4B400]/10 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4B400]/10 border border-[#F4B400]/30 text-[#F4B400] text-sm font-button font-semibold mb-6">
            News & Updates
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6">
            Latest <span className="bg-gradient-to-r from-[#F4B400] to-[#ffc933] bg-clip-text text-transparent">Updates</span>
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
            Stay informed about the latest happenings, course offerings, and success stories from CHUGAZ.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {newsItems.map((item) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              distance={40}
              delay={0.1}
              stagger={0.08}
            >
              <NewsCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        <div
          className="text-center mt-12 lg:mt-16"
        >
          <PremiumButton variant="gradient-primary" size="lg" asChild iconRight={<ArrowRight className="w-4 h-4" />}>
            <Link href="/courses">View Courses</Link>
          </PremiumButton>
        </div>
      </div>
    </section>
  )
}